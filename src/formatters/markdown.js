import {getHeaderRow, getDependencyRows} from './common';

const printMarkdown = (dependencyInfo) => {
  printHeader(dependencyInfo);
  printSeparator(dependencyInfo);
  printInfo('dependencies', dependencyInfo);
  printInfo('peerDependencies', dependencyInfo);
  printInfo('devDependencies', dependencyInfo);  
};

const printHeader = (info) => {
  const fields = getHeaderRow(info);
  printRow(fields);
};

const printSeparator = (info) => {
  const fields = getHeaderRow(info).map(dummy => '--');
  printRow(fields);
};

const printInfo = (type, info) => {
  const dependencies = info[type];
  const {packageLabels} = info;
  const rows = getDependencyRows(type, info);
  rows.forEach(printRow);
};

const printRow = (fields) =>
  console.log(`|${fields.join('|')}|`);

export default printMarkdown;
