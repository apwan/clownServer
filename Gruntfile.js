/**
 * Created by WuYijie on 1/15/15.
 */

module.exports = function(grunt) {
    grunt.initConfig({
//our JSHint options
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                newcap: true,
                noarg: true,
                sub: false,
                undef: true,
                unused: false,
                boss: true,
                node: true
            },
            globals: {
                exports: true
            },
            all: ['ctrl/db.js', 'ctrl/sc.js']

        },
        jsdoc: {
            dist : {
                src: ['ctrl/*.js', 'routes/*.js'],
                options: {
                    destination: 'jsDoc'
                }
            }
        },
//our concat options
        concat: {
            options: {
                separator: ';' //separates scripts
            },
            dist: {
                src: ['public/javascripts/lib/modern.js','public/javascripts/lib/application.js', 'public/javascripts/front/SL.js', 'public/javascripts/lib/acetex.js',
                    'public/javascripts/front/SLeditor.js'], //Grunt mini match for your scripts to concatenate
                dest: 'public/js/front/clown.js' //where to output the script
            }
        },
//our uglify options
        uglify: {
            build: {
                files: {
                    'public/js/front/clown.min.js': ['public/js/front/clown.js'],
                    'public/js/front/ckeditor.min.js': ['public/javascripts/front/ckeditor.js'] //save over the newly created script
                }
            }
        }
    });
//load our tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');
// default tasks to run
    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('docgen', ['jsdoc']);
    grunt.registerTask('development', ['jshint']);
    grunt.registerTask('production', ['concat', 'uglify']);
};