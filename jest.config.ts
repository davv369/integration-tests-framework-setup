export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        'node_modules/variables/.+\\.(j|t)s?$': 'ts-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
    setupFilesAfterEnv: ['./jest.setup.ts'],
    reporters: [
        'default',
        [
            './node_modules/jest-html-reporter',
            {
                pageTitle: 'Test Report',
                includeFailureMsg: true,
                collapseSuitesByDefault: true,
                includeConsoleLog: true,
                outputPath: 'reports/test-report.html',
            },
        ],
    ],
};
