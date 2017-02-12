module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      css: [
        'scss/style.scss'
      ],
      js: [
        'src/*.js'
      ]
    },
    uglify: {
      options: {
        banner: '/*!\n' +
          ' * <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>\n' +
          ' * <%= pkg.url %>\n' +
          ' * @author <%= pkg.author %>\n' +
          ' * @version <%= pkg.version %>\n' +
          ' * Copyright <%= pkg.copyright %>.\n' +
          ' */\n'
      },
      build: {
        src: 'src/*.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: false
        },
        files: {
          'css/style.css': '<%= project.css %>'
        }
      },
      dist: {
        options: {
          style: 'compressed',
          compass: false
        },
        files: {
          'css/style.css': '<%= project.css %>'
        }
      }
    },
    watch: {
      js: {
        files: ['src/*.js'],
        tasks: ['uglify']
      },
        sass: {
            files: 'scss/*.{scss,sass}',
            tasks: ['sass:dev']
        }
    }
 

      
  });
    

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['sass:dev','watch']);

};