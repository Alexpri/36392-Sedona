module.exports = function(grunt) {



  require('load-grunt-tasks')(grunt);



  grunt.initConfig({

    clean: {
      build: ['build']
    },


    copy: {
      build: {
        files: [{
          expand: true,
          cwd: 'source',
          src: [
            'img/**',
            'js/**',
            'index.html'
          ],
          dest: 'build'
        }]
      }
    },


    sprite:{
      all: {
        src: 'build/img/app/sprite/*.png',
        dest: 'build/img/app/sprite.png',
        imgPath: '../img/min/sprite.png',
        destCss: 'source/less/helpers/sprite.less',
        algorithm: 'binary-tree',
        padding: 10
      }
    },


    imagemin: {
      images: {
        files: [{
          expand: true,
          cwd: 'build/img/app',
          src: ['**/*.{png,jpg,gif,svg}', '!sprite/**/*'],
          dest: 'build/img/min'
        }]
      }
    },


    csscomb: {
      style: {
        expand: true,
        src: ['source/less/**/*.less']
      }
    },


    less: {
      style: {
        files: {
          'build/css/style.css': ['source/less/style.less']
        }
      }
    },


    cmq: {
      style: {
        files: {
          'build/css/style.css': ['build/css/style.css']
        }
      }
    },


    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      style: {
        src: 'build/css/style.css'
      }
    },


    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0,
          report: 'gzip'
        },
        files: {
          'build/css/style.min.css': ['build/css/style.css']
        }
      }
    },


    concat: {
      options: {
        separator: ';'
      },
      style: {
        src: ['build/js/**/*.js'],
        dest: 'build/js/min/scripts.js'
      }
    },


    uglify: {
      js: {
        files: {
          'build/js/min/scripts.js': ['build/js/min/scripts.js']
        }
      }
    },


    notify: {
      less:{
        options:{
            title: 'CSS Files built',
            message: 'Less task complete'
        }
      }
    },


    connect: {
      server: {
        options: {
            port: 8000,
            base: '.'
        }
      }
    },


    watch: {
      style: {
        files: ['source/less/**/*.less'],
      //tasks: ['default'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      html: {
        files: ['build/*.html'],
        options: {
          spawn: false,
          livereload: true
        },
      },
    }

  });


  grunt.registerTask('default', [
    'clean',
    'copy',
    'sprite',
    'imagemin',
    'csscomb',
    'less',
    'cmq',
    'autoprefixer',
    'cssmin',
    'concat',
    'uglify',
    'notify',
    'connect',
    'watch'
  ]);

};