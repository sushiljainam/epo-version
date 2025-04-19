/**
 * EpochVer - Version format based on Unix epoch time
 * Format: years.days.seconds (since Jan 1, 1970 UTC)
 */

/**
 * Converts a Date object to an EpochVer string
 * @param {Date} date - The date to convert (defaults to current time)
 * @returns {string} Version string in format "years.days.seconds"
 */
function dateToVersion(date = new Date()) {
    // Ensure we're working with UTC
    const years = date.getUTCFullYear() - 1970;
    
    // Calculate day of year (1-366)
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const dayOfYear = Math.floor((date - yearStart) / (1000 * 60 * 60 * 24)) + 1;
    
    // Calculate seconds since start of day
    const dayStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    const secondsInDay = Math.floor((date - dayStart) / 1000);
    
    return `${years}.${dayOfYear}.${secondsInDay}`;
}

/**
 * Converts an EpochVer string back to a Date object
 * @param {string} version - Version string in format "years.days.seconds"
 * @returns {Date} The corresponding Date object
 */
function versionToDate(version) {
    const [years, days, seconds] = version.split('.').map(Number);
    
    if (isNaN(years) || isNaN(days) || isNaN(seconds)) {
    throw new Error('Invalid version format. Expected "years.days.seconds"');
    }
    
    if (years < 0 || days < 1 || seconds < 0) {
    throw new Error('Invalid version values. Years must be ≥0, days must be ≥1, seconds must be ≥0');
    }
    
    // Create date for Jan 1 of the year
    const date = new Date(Date.UTC(1970 + years, 0, 1));
    
    // Add days (subtract 1 since days start at 1)
    date.setUTCDate(date.getUTCDate() + days - 1);
    
    // Add seconds
    date.setUTCSeconds(seconds);
    
    return date;
}

/**
 * Gets current version string
 * @returns {string} Current version string
 */
function getCurrentVersion() {
    return dateToVersion(new Date());
}

/**
 * Compare two version strings
 * @param {string} v1 - First version
 * @param {string} v2 - Second version
 * @returns {number} -1 if v1 < v2, 0 if v1 === v2, 1 if v1 > v2
 */
function compareVersions(v1, v2) {
    const d1 = versionToDate(v1);
    const d2 = versionToDate(v2);
    
    if (d1 < d2) return -1;
    if (d1 > d2) return 1;
    return 0;
}

module.exports = {
    dateToVersion,
    versionToDate,
    getCurrentVersion,
    compareVersions
};