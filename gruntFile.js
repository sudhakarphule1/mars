module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**'],
          dest: 'test/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['copy']);
};/**
 * Created by waqar on 1/4/16.
 */
