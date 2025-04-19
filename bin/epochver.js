#!/usr/bin/env node

const { dateToVersion, versionToDate, getCurrentVersion, compareVersions } = require('../index');

const args = process.argv.slice(2);
const command = args[0];

function printHelp() {
  console.log(`
EpochVer CLI - Time-based versioning

Usage:
  epochver current                   - Get current version
  epochver to-version [ISO-date]     - Convert date to version (default: now)
  epochver to-date <version>         - Convert version to date
  epochver compare <v1> <v2>         - Compare two versions
  epochver help                      - Show this help
`);
}

function handleError(error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}

try {
  switch (command) {
    case 'current':
      console.log(getCurrentVersion());
      break;
      
    case 'to-version':
      if (args[1]) {
        const date = new Date(args[1]);
        if (isNaN(date.getTime())) {
          throw new Error('Invalid date format. Use ISO format (e.g., 2025-04-19T10:30:00Z)');
        }
        console.log(dateToVersion(date));
      } else {
        console.log(getCurrentVersion());
      }
      break;
      
    case 'to-date':
      if (!args[1]) {
        throw new Error('Version argument is required');
      }
      const date = versionToDate(args[1]);
      console.log(date.toISOString());
      break;
      
    case 'compare':
      if (!args[1] || !args[2]) {
        throw new Error('Two version arguments are required');
      }
      const result = compareVersions(args[1], args[2]);
      if (result < 0) {
        console.log(`${args[1]} is earlier than ${args[2]}`);
      } else if (result > 0) {
        console.log(`${args[1]} is later than ${args[2]}`);
      } else {
        console.log(`${args[1]} is the same as ${args[2]}`);
      }
      break;
      
    case 'help':
    case '--help':
    case '-h':
    default:
      printHelp();
      break;
  }
} catch (error) {
  handleError(error);
}
