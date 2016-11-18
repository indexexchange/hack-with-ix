'use strict';

module.exports = function eslint(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-eslint');

    // Options
    return {
        options: {
            configFile: '.eslintrc.json',
            ruleCreator: [ 'node_modules/eslint/lib/rules' ]
        },
        target: [
            'server.js',
            'controllers/**/*.js',
            'lib/**/*.js',
            'models/**/*.js',
            'test/**/*.js'
        ]
    };
};
