/**
 * Gather together dependency information from multiple packages.
 *
 * @param {string} dependenciesProperty - specific name of the property to gather
 * @param {object[]} packages - collection of packages to merge
 *
 * @return A map from dependency name to a map of the versions used by each package:
 *   const pkg1 = {name: 'pkg1', deps: {foo: 1, bar: 8}};
 *   const pkg2 = {name: 'pkg2', deps: {foo: 2}};
 *   gather('deps')([pkg1, pkg2])
 *   // {foo: {pkg1: 1, pkg2: 2}, bar: {pkg1: 8}};
 */
export const gather = (dependenciesProperty) => (packages=[]) =>
  packages
    .map(pakage => {
      const {[dependenciesProperty]: dependencies = {}} = pakage;
      const packageLabel = getPackageLabel(pakage);
      return Object.keys(dependencies)
        .reduce((packageInfo, dependencyName) => {
          const dependencyVersion = dependencies[dependencyName];
          packageInfo[dependencyName] = { [packageLabel]: dependencyVersion };
          return packageInfo;
        }, {});
    })
    .reduce((acc, packageInfo) => {
      // Add all the dependencies in this package
      return Object.keys(packageInfo)
        .reduce((combinedInfo, dependencyName) => {
          combinedInfo[dependencyName] = {
            // Merge this package's details in with the others for this dependency
            ...combinedInfo[dependencyName],
            ...packageInfo[dependencyName],
          };
          return combinedInfo;
        }, acc);
      }, {});

const getPackageLabel = ({name, version}) =>
  `${name}@${version||'?'}`;

/**
 * Gather dependency info from the standard dependencies fields.
 * 
 * @param {object[]} packages - collection of packages to merge
 */
export default (packages, opts={}) => {
  const types = opts.types || [
    'dependencies',
    'peerDependencies',
    'devDependencies',
  ];

  return {
    packageLabels: packages.map(getPackageLabel),
    ...types.reduce((acc, type) => {
      acc[type] = gather(type)(packages);
      return acc;
    }, {}),
  };
};
