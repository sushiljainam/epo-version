const epochver = require('epochver');

// Get the current version
const currentVersion = epochver.getCurrentVersion();
console.log(`Current version: ${currentVersion}`);

// Create a version from a specific date
const releaseDate = new Date('2025-01-15T08:30:00Z');
const releaseVersion = epochver.dateToVersion(releaseDate);
console.log(`Release version: ${releaseVersion}`);

// Convert version back to date
const parsedDate = epochver.versionToDate(releaseVersion);
console.log(`Parsed date: ${parsedDate.toUTCString()}`);

// Compare versions
const v1 = '55.15.3600';  // Year 2025, day 15, 1 hour into the day
const v2 = '55.16.0';     // Year 2025, day 16, start of day

const comparison = epochver.compareVersions(v1, v2);
console.log(`Comparison result: ${comparison}`); // Will be -1 (v1 is earlier than v2)

// Real-world usage:
console.log(`Is my application outdated? ${epochver.compareVersions(currentVersion, '55.100.0') < 0 ? 'Yes' : 'No'}`);
