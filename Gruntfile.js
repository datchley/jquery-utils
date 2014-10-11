/* global module, process */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    base: "",
                    port: 9999
                }
            }
        },
        jshint: {
            allFiles: [
                'Gruntfile.js',
                'src/**/*.js',
                'test/**/*.spec.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jasmine: {
            custom: {
                src: 'src/**/*.js',
                options: {
                    specs: 'test/**/*.spec.js',
                    vendor: [
                        'http://code.jquery.com/jquery-1.11.1.min.js',
                        'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
                        'test/jasmine-jsreporter.js'
                    ],
                    keepRunner: true
                }
            }
        },
        'saucelabs-jasmine': {
            all: {
                options: {
                    // username: process.env.SAUCE_USERNAME,
                    tunneltimeout: 5,
                    // key: process.env.SAUCE_ACCESS_KEY, 
                    urls: [ 'http://127.0.0.1:9999/_SpecRunner.html' ],
                    build: process.env.TRAVIS_JOB_ID || '<%= pkg.version %>',
                    concurrency: 3,
                    testname: 'Sauce Unit Tests for Jquery Utils',
                    tags: ['master'],
                    browsers: [
                        { browserName: 'firefox', version: '32', platform: 'OS X 10.6' },
                        { browserName: 'chrome', version: '37', platform: 'OS X 10.6' },
                        { browserName: 'firefox', version: '32', platform: 'Windows 7' },
                        { browserName: 'chrome', version: '37', platform: 'Windows 7' },
                        { browserName: 'internet explorer', version: '9', platform: 'Windows 7' },
                        { browserName: 'internet explorer', version: '10', platform: 'Windows 7' }
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-saucelabs');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('local-test', ['jshint','jasmine']);
    grunt.registerTask('test', ['jshint', 'jasmine', 'connect', 'saucelabs-jasmine']);
    grunt.registerTask('default', ['jshint', 'jasmine', 'concat', 'uglify']);
};
