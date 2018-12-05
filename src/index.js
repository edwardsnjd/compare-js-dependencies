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
      const label = getPackageLabel(pakage);
      return Object.keys(dependencies)
        .reduce((packageDependencies, dependencyName) => {
          packageDependencies[dependencyName] = {
            [label]: dependencies[dependencyName]
          };
          return packageDependencies;
        }, {});
    })
    .reduce((acc, packageDependencies) => {
      return Object.keys(packageDependencies)
        // Add all the dependencies in this package
        .reduce((acc2, dependencyName) => {
          acc2[dependencyName] = {
            // Merge this package's details in with the others for this dependency
            ...acc2[dependencyName],
            ...packageDependencies[dependencyName],
          };
          return acc2;
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
    ...types.reduce((acc, type) => ({
      ...acc,
      [type]: gather(type)(packages),
    }), {}),
  };
};
