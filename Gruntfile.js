/* global module */
module.exports = function(grunt) {
    grunt.initConfig({
        jasmine: {
            custom: {
                src: 'src/**/*.js',
                options: {
                    specs: 'test/**/*.spec.js',
                    vendor: [
                        'http://code.jquery.com/jquery-1.11.1.min.js',
                        'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
                    ],
                    keepRunner: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', 'jasmine');
};
