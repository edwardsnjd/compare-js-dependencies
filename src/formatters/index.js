import csv from './csv';
import json from './json';
import markdown from './markdown';

const getFormatter = (format='json') => {
  switch (format.toLowerCase()) {
    case 'csv':
      return csv;
    case 'markdown':
    case 'md':
      return markdown;
    case 'js':
    case 'json':
      return json;
    default:
      process.stderr.write(`Unknown format: ${format}\n`);
      process.exit(1);
  }
};

export default getFormatter;
