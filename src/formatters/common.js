export const getHeaderRow = (info) => [
  'Type',
  'Dependency',
  ...info.packageLabels,
];

export const getDependencyRows = (type, info) => {
  const dependencies = info[type];
  return Object.keys(dependencies)
    .map(dependency => getDependencyRow(type, dependency, info));
};

export const getDependencyRow = (type, dependency, info) => {
  const {packageLabels, [type]: dependencies} = info;
  return [
    type,
    dependency,
    ...packageLabels.map(packageLabel => dependencies[dependency][packageLabel] || null),
  ];
};
