import printCsv from './printCsv';
import printMarkdown from './printMarkdown';

const getFormatter = (format='markdown') => {
  switch (format.toLowerCase()) {
    case 'csv':
      return printCsv;
    case 'markdown':
    case 'md':
      return printMarkdown;
    default:
      process.stderr.write(`Unknown format: ${format}\n`);
      process.exit(1);
  }
};

export default getFormatter;
