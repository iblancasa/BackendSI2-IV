module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: [
                    'app/static/index/js/*'
                ],
                dest: 'app/static/index/js/inicio.js'
            }
        },
        cssmin: {
            css: {
                src: 'app/static/index/css/agency.css',
                dest: 'app/static/index/css/iniciomini.css'
            }
        },
        uglify: {
            js: {
                files: {
                    'app/static/index/js/inicio.js': ['app/static/index/js/inicio.js']
                }
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', [ 'cssmin:css', 'concat:js', 'uglify:js']);
};
