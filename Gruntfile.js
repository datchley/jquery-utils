/* global module */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
                        'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
                    ],
                    keepRunner: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('default', ['jasmine', 'concat', 'uglify']);
};
