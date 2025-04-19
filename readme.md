# EpochVer

A time-based versioning system using Unix epoch reference.

## Format

```
years.days.seconds
```

Where:
- `years`: Years since 1970 (Unix epoch)
- `days`: Day of year (1-366)
- `seconds`: Seconds since start of day in UTC

## Installation

```bash
npm install epochver
```

## Usage

```js
const epochver = require('epochver');

// Get current version
const version = epochver.getCurrentVersion();
console.log(version); // e.g. "55.109.3600" (55 years since 1970, 109th day, 3600 seconds)

// Convert date to version
const date = new Date('2025-04-19T10:30:00Z');
const versionFromDate = epochver.dateToVersion(date);

// Convert version back to date
const parsedDate = epochver.versionToDate('55.109.37800');

// Compare versions
const comparison = epochver.compareVersions('55.100.0', '55.109.37800');
// Returns: -1 (first version is earlier than second)
```

## Why EpochVer?

Unlike semantic versioning (SemVer), EpochVer is:

- **Unambiguous**: Each version has exactly one corresponding moment in time
- **Sortable**: Versions can be compared chronologically using simple string comparison
- **Automatic**: No need to decide what constitutes a major/minor change
- **Informative**: The version itself tells you when the software was released

## License

MIT