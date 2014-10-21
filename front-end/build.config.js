module.exports = {
  build_dir: 'build',
  compile_dir: 'bin',

  app_files: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
    jsunit: [ 'src/**/*.spec.js' ],
    
    coffee: [ 'src/**/*.coffee', '!src/**/*.spec.coffee' ],
    coffeeunit: [ 'src/**/*.spec.coffee' ],

    atpl: [ 'src/app/**/*.tpl.html' ],
    ctpl: [ 'src/common/templates-ui/**/*.html' ],

    html: [ 'src/index.html' ],
    sass: 'src/sass/main.scss'
  },

  test_files: {
    js: [
      'vendor/angular-mocks/angular-mocks.js'
    ]
  },

  vendor_files: {
    js: [
      // 'vendor/jquery/dist/jquery.min.js',
      // 'vendor/bootstrap/js/button.js',
            
      //'vendor/angular/angular.min.js',
      //'vendor/angular/angular.min.js.map',
      'vendor/angular/angular.js',

      'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',

      'vendor/angular-ui-router/release/angular-ui-router.min.js',
      'vendor/angular-resource/angular-resource.js',
      'vendor/angular-permission/dist/angular-permission.js',
      'vendor/angular-growl-v2/build/angular-growl.js',

      //'vendor/angular-animate/angular-animate.min.js',
      //'vendor/angular-animate/angular-animate.min.js.map',            
      'vendor/angular-animate/angular-animate.js',

      //'vendor/angular-messages/angular-messages.min.js',
      //'vendor/angular-messages/angular-messages.min.js.map',
      'vendor/angular-messages/angular-messages.js',
      

      'vendor/satellizer/satellizer.min.js',
      'vendor/angular-loading-bar/build/loading-bar.min.js',

      'vendor/angular-sanitize/angular-sanitize.js',
      'vendor/videogular/videogular.min.js',
    ],
    css: [
      //'vendor/angular-growl-v2/build/angular-growl.min.css'
    ],
    assets: [
    ]
  },
};
