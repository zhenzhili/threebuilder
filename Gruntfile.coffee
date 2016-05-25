fs = require 'fs'

stylish = require 'jshint-stylish'
open = require 'open'

config = require './config'

platform = process.platform

module.exports = (grunt)->

  require('load-grunt-tasks') grunt
  require('time-grunt') grunt

  @initConfig
    pkg: grunt.file.readJSON 'package.json'

    watch:
      js:
        files: [
          'client/scripts/**/*.js'
        ]
        tasks: [
          'newer:jshint:client'
          'client_unit'
          'client_e2e'
        ]
        options:
          livereload: true
      css:
        files: [
          'client/styles/**/*.css'
          'client/.tmp/styles/**/*.css'
        ]
        options:
          livereload: true
      html:
        files: [
          'client/**/*.html'
        ]
        options:
          livereload: true
      sass:
        files: [
          'client/styles/**/*.{scss,sass,css}'
        ]
        tasks: [
          'compass:server'
          'autoprefixer'
        ]
      nodemon:
        files: [
          '.nodemon'
        ]
        options:
          livereload: true
      clientSpecs:
        files: [
          'test/client/spec/{,*/}*.js'
        ]
        tasks: [
          'newer:jshint:clientSpecs'
          'unit'
          'e2e'
        ]
      gruntfile:
        files: [
          'Gruntfile.coffee'
        ]

    nodemon:
      dev:
        script: 'starter.js'
        options:
          nodeArgs: [
            '--harmony'
          ]
          ignore: [
            'node_modules/**'
            'client/**'
          ]
          callback: (nodemon)->
            fs.writeFileSync '.nodemon', 'started'
            nodemon.on 'log', (event)->
              console.log event.colour
            nodemon.on 'config:update', ->
              console.log 'The default browser will open, wait a moment please.'
              setTimeout ->
                open config.domain
              , 2000 # 时间太短的话, server还没启动完毕, 浏览器就打开了
            nodemon.on 'restart', ->
              setTimeout ->
                fs.writeFileSync '.nodemon', 'restarted'
              , 2000 # 时间太短的话, server还没启动完毕, 浏览器就刷新了

    concurrent:
      dev: [
        'nodemon'
        'watch'
      ]
      options:
        logConcurrentOutput: true

    wiredep:
      html:
        src: [
          'client/index.html'
        ]
        exclude: [
          'bootstrap-social'
        ]
        fileTypes:
          html:
            replace:
              js: '<script src="/{{filePath}}"></script>'
              css: '<link rel="stylesheet" href="/{{filePath}}" />'

    autoprefixer:
      options:
        browsers: [
          'last 1 version'
        ]
      dist:
        expand: true
        cwd: 'client/.tmp/styles/'
        src: '**/*.css'
        dest: 'client/.tmp/styles/'
    compass:
      options:
        sassDir: 'client/styles'
        cssDir: 'client/.tmp/styles'
        generatedImagesDir: 'client/.tmp/images/generated'
        imagesDir: 'client/images'
        javascriptsDir: 'client/scripts'
        fontsDir: 'client/styles/fonts'
        importPath: 'client/bower_components'
        httpImagesPath: '/images'
        httpGeneratedImagesPath: '/images/generated'
        httpFontsPath: '/styles/fonts'
        relativeAssets: false
        assetCacheBuster: false
        raw: 'Sass::Script::Number.precision = 10\n'
      dist:
        options:
          generatedImagesDir: 'dist/client/images/generated'
      server:
        options:
          debugInfo: true

  @registerTask 'dev', [
    'wiredep'
    'compass:server'
    'concurrent'
  ]