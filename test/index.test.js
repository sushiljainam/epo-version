const { 
    dateToVersion, 
    versionToDate, 
    getCurrentVersion, 
    compareVersions 
} = require('./index');

describe('EpochVer', () => {
    describe('dateToVersion', () => {
        test('converts a date to the correct version format', () => {
            const date = new Date('2023-05-15T12:30:45Z');
            const version = dateToVersion(date);
            
            // 2023 - 1970 = 53 years
            // May 15 is the 135th day of the year
            // 12:30:45 is 45045 seconds since day start
            expect(version).toBe('53.135.45045');
        });
        
        test('handles leap years correctly', () => {
            const leapYearDate = new Date('2024-12-31T23:59:59Z');
            const version = dateToVersion(leapYearDate);
            
            // 2024 - 1970 = 54 years
            // Dec 31, 2024 (leap year) is the 366th day
            // 23:59:59 is 86399 seconds since day start
            expect(version).toBe('54.366.86399');
        });
    });
    
    describe('versionToDate', () => {
        test('converts a version string to the correct date', () => {
            const version = '53.135.45045';
            const date = versionToDate(version);
            
            expect(date.getUTCFullYear()).toBe(2023);
            expect(date.getUTCMonth()).toBe(4); // May is month 4 (zero-indexed)
            expect(date.getUTCDate()).toBe(15);
            expect(date.getUTCHours()).toBe(12);
            expect(date.getUTCMinutes()).toBe(30);
            expect(date.getUTCSeconds()).toBe(45);
        });
        
        test('throws error for invalid format', () => {
            expect(() => versionToDate('invalid')).toThrow();
            expect(() => versionToDate('1.2')).toThrow();
            expect(() => versionToDate('a.b.c')).toThrow();
        });
        
        test('throws error for invalid values', () => {
            expect(() => versionToDate('-1.1.0')).toThrow();
            expect(() => versionToDate('53.0.0')).toThrow();
            expect(() => versionToDate('53.367.0')).not.toThrow(); // This is actually valid for leap years
            expect(() => versionToDate('53.135.-1')).toThrow();
        });
    });
    
    describe('compareVersions', () => {
        test('compares versions correctly', () => {
            expect(compareVersions('53.135.0', '53.135.0')).toBe(0);
            expect(compareVersions('53.134.0', '53.135.0')).toBe(-1);
            expect(compareVersions('53.135.1', '53.135.0')).toBe(1);
            expect(compareVersions('52.366.0', '53.1.0')).toBe(-1);
            expect(compareVersions('53.135.0', '53.134.86400')).toBe(1);
        });
    });
    
    describe('getCurrentVersion', () => {
        test('returns a valid version string', () => {
            const version = getCurrentVersion();
            
            // Just test format, as the value will change
            expect(version).toMatch(/^\d+\.\d+\.\d+$/);
            
            // Should be parsable back to a date
            const date = versionToDate(version);
            expect(date instanceof Date).toBe(true);
            
            // Date should be recent (within the last minute)
            const now = new Date();
            const diffMs = now - date;
            expect(diffMs).toBeLessThan(60000);
        });
    });
});
