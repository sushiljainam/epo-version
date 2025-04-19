/**
 * Converts a Date object to an EpochVer string
 * @param date - The date to convert (defaults to current time)
 * @returns Version string in format "years.days.seconds"
 */
export function dateToVersion(date?: Date): string;

/**
 * Converts an EpochVer string back to a Date object
 * @param version - Version string in format "years.days.seconds"
 * @returns The corresponding Date object
 * @throws Error if the version string is invalid
 */
export function versionToDate(version: string): Date;

/**
 * Gets current version string
 * @returns Current version string
 */
export function getCurrentVersion(): string;

/**
 * Compare two version strings
 * @param v1 - First version
 * @param v2 - Second version
 * @returns -1 if v1 < v2, 0 if v1 === v2, 1 if v1 > v2
 * @throws Error if either version string is invalid
 */
export function compareVersions(v1: string, v2: string): number;
