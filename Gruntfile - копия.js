module.exports = function(grunt) {



  require('load-grunt-tasks')(grunt);



  grunt.initConfig({

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
          dest: "build"
        }]
      }
    },


    sprite:{
      all: {
        src: 'img/app/sprite/*.png',
        dest: 'img/app/sprite.png',
        imgPath: '../img/min/sprite.png',
        destCss: 'less/helpers/sprite.less',
        algorithm: 'binary-tree',
        padding: 10
      }
    },


    imagemin: {
      images: {
        files: [{
          expand: true,
          cwd: 'img/app',
          src: ['**/*.{png,jpg,gif}', '!sprite/**/*'],
          dest: 'img/min'
        }]
      }
    },

    svgmin: {
        options: {
            plugins: [
                {
                    removeViewBox: false
                }, {
                    removeUselessStrokeAndFill: false
                }
            ]
        },
        dist: {
          files: [{
              expand: true,
              cwd: 'build/img',
              src: ['app/svg/*.svg'],
              dest: 'build/img/min/',
              ext: '.svg'
          }]
        }
    },

    csscomb: {
      style: {
        expand: true,
        cwd: "source",
        src: ['less/**/*.less']
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
          cwd: "build",
          'css/style.css': ['css/style.css']
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
        files: ['less/**/*.less'],
        tasks: ['default'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      html: {
        files: ['*.html'],
        options: {
          spawn: false,
          livereload: true
        },
      },
    }

  });



  grunt.registerTask('default', [
    'sprite',
    'imagemin',
    'svgmin',
    'csscomb',
    'less',
    'cmq',
    'autoprefixer',
    'notify',
    'connect',
    'watch'
  ]);

};