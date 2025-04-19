# EpochVer

[![npm version](https://img.shields.io/npm/v/epochver.svg)](https://www.npmjs.com/package/epochver)
[![Build Status](https://github.com/yourusername/epochver/workflows/Node.js%20Package/badge.svg)](https://github.com/yourusername/epochver/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test Coverage](https://img.shields.io/codecov/c/github/yourusername/epochver)](https://codecov.io/gh/yourusername/epochver)

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

### JavaScript/TypeScript

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

### CLI

```bash
# Install globally
npm install -g epochver

# Get current version
epochver current

# Convert date to version
epochver to-version "2025-04-19T10:30:00Z"

# Convert version to date
epochver to-date "55.109.37800"

# Compare versions
epochver compare "55.100.0" "55.109.37800"
```

## Why EpochVer?

Unlike semantic versioning (SemVer), EpochVer is:

- **Unambiguous**: Each version has exactly one corresponding moment in time
- **Sortable**: Versions can be compared chronologically using simple string comparison
- **Automatic**: No need to decide what constitutes a major/minor change
- **Informative**: The version itself tells you when the software was released

## API

### `dateToVersion(date?: Date): string`

Converts a Date object to an EpochVer string. Uses the current date if none provided.

### `versionToDate(version: string): Date`

Converts an EpochVer string back to a Date object.

### `getCurrentVersion(): string`

Gets the current version based on the current time.

### `compareVersions(v1: string, v2: string): number`

Compares two version strings. Returns -1 if v1 < v2, 0 if v1 === v2, 1 if v1 > v2.

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute.

## License

MIT