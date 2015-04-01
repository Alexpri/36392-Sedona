module.exports = function(grunt) {



  require('load-grunt-tasks')(grunt);



  grunt.initConfig({


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
              cwd: 'img',
              src: ['app/svg/*.svg'],
              dest: 'img/min/',
              ext: '.svg'
          }]
        }
    },

    csscomb: {
      style: {
        expand: true,
        src: ["less/**/*.less"]
      }
    },

    less: {
      style: {
        files: {
          'css/style.css': ['less/style.less']
        }
      }
    },



    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      style: {
        src: 'css/style.css'
      }
    },

    notify: {
      less:{
        options:{
            title: "CSS Files built",
            message: "Less task complete"
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
        tasks: ['style'],
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
    'autoprefixer',
    'notify',
    'connect',
    'watch'
  ]);



  grunt.registerTask('style', [
    'less',
    'autoprefixer',
    'notify'
  ]);

};