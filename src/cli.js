#!/usr/bin/env node

import minimist from 'minimist';
import path from 'path';

import compare from './index';
import getFormatter from './formatters';

const argv = minimist(process.argv.slice(2));

const formatter = getFormatter(argv.format);

const packagePaths = argv._;
const packages = packagePaths
  .map(p => path.resolve(p))
  .map(require);

const dependencyInfo = compare(packages);

formatter(dependencyInfo);
