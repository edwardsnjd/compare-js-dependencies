#!/usr/bin/env node

import path from 'path';
import minimist from 'minimist';
import compare from './index';

const argv = minimist(process.argv.slice(2));

const packagePaths = argv._;

const packages = packagePaths
  .map(p => path.resolve(p))
  .map(require);

const result = compare(packages);

console.log(result);
