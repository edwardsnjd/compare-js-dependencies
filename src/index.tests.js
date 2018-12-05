import tape from 'tape';

import {gather} from './index';

tape('gather is a factory', (t) => {
  t.equal(typeof gather('dependencies'), 'function');
  t.end();
});

const assertDependencies = (t, pkgs, expected) => {
  const actual = gather('dependencies')(pkgs);
  t.deepEqual(actual, expected);
};

tape('gather returns empty object for no packages', (t) => {
  assertDependencies(t, [], {});
  t.end(); 
});

tape('gather returns empty object for package without dependencies', (t) => {
  const pkg1 = {name: 'pkg1', non_deps: {foo: 123}};
  assertDependencies(t, [pkg1], {});
  t.end(); 
});

tape('gather collects dependencies for single package', (t) => {
  const pkg1 = {name: 'pkg1', dependencies: {foo: 123}};
  const expected = {foo: {pkg1: 123}};
  assertDependencies(t, [pkg1], expected);
  t.end(); 
});

tape('gather merges non-overlapping dependencies', (t) => {
  const pkg1 = {name: 'pkg1', dependencies: {foo: 123}};
  const pkg2 = {name: 'pkg2', dependencies: {bar: 456}};
  const expected = {foo: {pkg1: 123}, bar: {pkg2: 456}};
  assertDependencies(t, [pkg1, pkg2], expected);
  t.end(); 
});

tape('gather merges overlapping dependencies', (t) => {
  const pkg1 = {name: 'pkg1', dependencies: {foo: 123}};
  const pkg2 = {name: 'pkg2', dependencies: {foo: 456}};
  const expected = {foo: {pkg1: 123, pkg2: 456}};
  assertDependencies(t, [pkg1, pkg2], expected);
  t.end(); 
});
