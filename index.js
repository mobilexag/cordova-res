var fs     = require('fs');
var xml2js = require('xml2js');
var ig     = require('imagemagick');
var colors = require('colors');
var _      = require('underscore');
var Q      = require('q');
var fse    = require('fs-extra');

/**
 * Check which platforms are added to the project and return their splash screen names and sizes
 *
 * @param  {String} projectName
 * @return {Promise} resolves with an array of platforms
 */
var getPlatforms = function (projectName) {
  var deferred = Q.defer();
  var platforms = [];
  platforms.push({
    name : 'ios',
    // TODO: use async fs.exists
    isAdded : fs.existsSync('platforms/ios'),
    splashPath : 'res/screen/ios/',
    splash : [
      { name: 'Default-568h@2x~iphone.png',           width: 640,  height: 1136 },
      { name: 'Default-667h.png',                     width: 750,  height: 1334 },
      { name: 'Default-736h.png',                     width: 1242, height: 2208 },
      { name: 'Default-Landscape-736h.png',           width: 2208, height: 1242 },
      { name: 'Default@2x~iphone.png',                width: 640,  height: 960  },
      { name: 'Default~iphone.png',                   width: 320,  height: 480  },

      { name: 'Default-Portrait~iphone.png',          width: 320,  height: 480  },
      { name: 'Default-Portrait@2x~iphone.png',       width: 640,  height: 960  },
      { name: 'Default-Portrait-568h@2x~iphone.png',  width: 640,  height: 1136 },
      { name: 'Default-Portrait-667h@2x~iphone.png',  width: 750,  height: 1334 },
      { name: 'Default-Portrait-736h@3x~iphone.png',  width: 1242, height: 2208 },

      { name: 'Default-Landscape~iphone.png',         width: 480,  height: 320  },
      { name: 'Default-Landscape@2x~iphone.png',      width: 960,  height: 640  },
      { name: 'Default-Landscape-568h@2x~iphone.png', width: 1136, height: 640  },
      { name: 'Default-Landscape-667h@2x~iphone.png', width: 1334, height: 750  },
      { name: 'Default-Landscape-736h@3x~iphone.png', width: 2208, height: 1242 },

      { name: 'Default-Portrait~ipad.png',            width: 768,  height: 1024 },
      { name: 'Default-Portrait@2x~ipad.png',         width: 1536, height: 2048 },
      { name: 'Default-Portrait@2x~ipad-pro.png',     width: 2048, height: 2732 },

      { name: 'Default-Landscape~ipad.png',           width: 1024, height: 768  },
      { name: 'Default-Landscape@2x~ipad.png',        width: 2048, height: 1536 },
      { name: 'Default-Landscape@2x~ipad-pro.png',    width: 2732, height: 2048 }
    ],
    iconPath: 'res/icon/ios/',
    icon: [
      { name: 'icon-60@3x.png', width: 180 , height: 180 },
      { name: 'icon-60.png', width: 60, height: 60 },
      { name: 'icon-60@2x.png', width: 120, height: 120 },
      { name: 'icon-76.png', width: 76, height: 76 },
      { name: 'icon-76@2x.png', width: 152, height: 152 },
      { name: 'icon-40.png', width: 40, height: 40 },
      { name: 'icon-40@2x.png', width: 80, height: 80 },
      { name: 'icon.png', width: 57, height: 57 },
      { name: 'icon@2x.png', width: 114, height: 114 },
      { name: 'icon-72.png', width: 72, height: 72 },
      { name: 'icon-72@2x.png', width: 144, height: 144 },
      { name: 'icon-small@2x.png', width: 58, height: 58 },
      { name: 'icon-50.png', width: 50, height: 50 },
      { name: 'icon-50@2x.png', width: 100, height: 100 },
    ]
  });
  platforms.push({
    name : 'android',
    isAdded : fs.existsSync('platforms/android'),
    splashPath : 'res/screen/android/',
    splash : [
      { name: 'splash-land-ldpi.png',  width: 320,  height: 200  },
      { name: 'splash-land-mdpi.png',  width: 480,  height: 320  },
      { name: 'splash-land-hdpi.png',  width: 800,  height: 480  },
      { name: 'splash-land-xhdpi.png', width: 1280, height: 720  },
      { name: 'splash-port-ldpi.png',  width: 200,  height: 320  },
      { name: 'splash-port-mdpi.png',  width: 320,  height: 480  },
      { name: 'splash-port-hdpi.png',  width: 480,  height: 800  },
      { name: 'splash-port-xhdpi.png', width: 720,  height: 1280 }
    ],
    iconPath: 'res/icon/android/',
    icon: [
      { name: 'icon-ldpi.png', width: 36 , height: 36 },
      { name: 'icon-mdpi.png', width: 48, height: 48 },
      { name: 'icon-hdpi.png', width: 72, height: 72 },
      { name: 'icon-xhdpi.png', width: 96, height: 96 },
      { name: 'icon-xxhdpi.png', width: 144, height: 144 },
      { name: 'icon-xxxhdpi.png', width: 192, height: 192 }
    ]
  });
  platforms.push({
    name : 'windows',
    isAdded : fs.existsSync('platforms/windows'),
    splashPath : 'res/screen/windows/',
    splash : [
      { name: 'SplashScreen.scale-100.png', width: 620,  height: 300  },
      { name: 'SplashScreen.scale-125.png', width: 775,  height: 375  },
      { name: 'SplashScreen.scale-150.png', width: 930,  height: 450  },
      { name: 'SplashScreen.scale-200.png', width: 1240, height: 600  },
      { name: 'SplashScreen.scale-400.png', width: 2480, height: 1200 }
    ],
    iconPath: 'res/icon/windows/',
    icon: [
      { name: 'logo.png', width: 150 , height: 150 },
      { name: 'smalllogo.png', width: 30, height: 30 },
      { name: 'storelogo.png', width: 50, height: 50 },
      { name: 'Square44x44Logo.scale-100.png', width: 44, height: 44 },
      { name: 'Square44x44Logo.scale-240.png', width: 106, height: 106 },
      { name: 'Square70x70Logo.scale-100.png', width: 70, height: 70 },
      { name: 'Square71x71Logo.scale-100.png', width: 71 , height: 71 },
      { name: 'Square71x71Logo.scale-240.png', width: 170, height: 170 },
      { name: 'Square150x150Logo.scale-240.png', width: 360, height: 360 },
      { name: 'Square310x310Logo.scale-100.png', width: 310, height: 310 },
      { name: 'Wide310x150Logo.scale-100.png', width: 310, height: 150 },
      { name: 'Wide310x150Logo.scale-240.png', width: 744, height: 360 }
    ]
  });
  deferred.resolve(platforms);
  return deferred.promise;
};

/**
 * @var {Object} settings - names of the config file and of the splash image
 * TODO: add option to get these values as CLI params
 */
var settings = {};
settings.CONFIG_FILE = 'config.xml';
settings.DEST_DIR = 'res/';
settings.SPLASH_PNG = settings.DEST_DIR + 'splash.png';
settings.SPLASH_SVG = 'splash.svg';
settings.ICON_SVG = 'icon.svg';
settings.ICON_PNG = settings.DEST_DIR + 'icon.png';

/**
 * @var {Object} console utils
 */
var display = {};
display.success = function (str) {
  str = '✓  '.green + str;
  console.log('  ' + str);
};
display.error = function (str) {
  str = '✗  '.red + str;
  console.log('  ' + str);
};
display.header = function (str) {
  console.log('');
  console.log(' ' + str.cyan.underline);
  console.log('');
};

/**
 * read the config file and get the project name
 *
 * @return {Promise} resolves to a string - the project's name
 */
var getProjectName = function () {
  var deferred = Q.defer();
  var parser = new xml2js.Parser();
  data = fs.readFile(settings.CONFIG_FILE, function (err, data) {
    if (err) {
      deferred.reject(err);
    }
    parser.parseString(data, function (err, result) {
      if (err) {
        deferred.reject(err);
      }
      var projectName = result.widget.name[0];
      deferred.resolve(projectName);
    });
  });
  return deferred.promise;
};

var converSVGToPNG = function (src, dest) {
  var deferred = Q.defer();
  ig.convert(['-density', '4800', '-resize', '2208x2208', src, dest],
    function(err, stdout, sdterr) {
      if (err) {
        throw err;
        deferred.reject(err);
      } else {
        deferred.resolve();
        display.success(dest + ' created');
      }
    });
  return deferred.promise;
}

var generatePNGFromSVG = function () {
  var deferred = Q.defer();
  fse.emptyDir(settings.DEST_DIR, function(err) {
    if (!err) display.success(settings.DEST_DIR + ' exists');
  });
  var all = [
    converSVGToPNG(settings.SPLASH_SVG, settings.SPLASH_PNG),
    converSVGToPNG(settings.ICON_SVG, settings.ICON_PNG)
  ];
  Q.all(all).then(function () {
    deferred.resolve();
  }).catch(function (err) {
    console.log(err);
  });
  return deferred.promise;
}

/**
 * Crops and creates a new asset in the res folder.
 *
 * @param  {Object} srcPath
 * @param  {String} destPath
 * @param  {Object} asset
 * @return {Promise}
 */
var generateAssets = function (srcPath, destPath, asset) {
  var deferred = Q.defer();
  ig.crop({
    srcPath: srcPath,
    dstPath: destPath + asset.name,
    quality: 1,
    format: 'png',
    width: asset.width,
    height: asset.height
  } , function(err, stdout, stderr){
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve();
      display.success(asset.name + ' created');
    }
  });
  return deferred.promise;
};

/**
 * Generates splash based on the platform object
 *
 * @param  {Object} platform
 * @return {Promise}
 */
var generateSplashForPlatform = function (platform) {
  var deferred = Q.defer();
  display.header('Generating splash screen for ' + platform.name);
  fse.emptyDir(platform.splashPath, function(err) {
    if (!err) display.success(platform.splashPath + ' exists');
  });
  fse.emptyDir(platform.iconPath, function(err) {
    if (!err) display.success(platform.iconPath + ' exists');
  });
  var all = [];
  var splashes = platform.splash;
  splashes.forEach(function (splash) {
    all.push(generateAssets(settings.SPLASH_PNG, platform.splashPath, splash));
  });
  var icons = platform.icon;
  icons.forEach(function (icon) {
    all.push(generateAssets(settings.ICON_PNG, platform.iconPath, icon))
  });
  Q.all(all).then(function () {
    deferred.resolve();
  }).catch(function (err) {
    console.log(err);
  });
  return deferred.promise;
};

/**
 * Goes over all the platforms and triggers splash screen generation
 *
 * @param  {Array} platforms
 * @return {Promise}
 */
var generateSplashes = function (platforms) {
  var deferred = Q.defer();
  var sequence = Q();
  var all = [];
  _(platforms).where({ isAdded : true }).forEach(function (platform) {
    sequence = sequence.then(function () {
      return generateSplashForPlatform(platform);
    });
    all.push(sequence);
  });
  Q.all(all).then(function () {
    deferred.resolve();
  });
  return deferred.promise;
};

/**
 * Checks if at least one platform was added to the project
 *
 * @return {Promise} resolves if at least one platform was found, rejects otherwise
 */
var atLeastOnePlatformFound = function () {
  var deferred = Q.defer();
  getPlatforms().then(function (platforms) {
    var activePlatforms = _(platforms).where({ isAdded : true });
    if (activePlatforms.length > 0) {
      display.success('platforms found: ' + _(activePlatforms).pluck('name').join(', '));
      deferred.resolve();
    } else {
      display.error('No cordova platforms found. Make sure you are in the root folder of your Cordova project and add platforms with \'cordova platform add\'');
      deferred.reject();
    }
  });
  return deferred.promise;
};

/**
 * Checks if a valid splash file exists
 *
 * @return {Promise} resolves if exists, rejects otherwise
 */
var validSplashExists = function () {
  var deferred = Q.defer();
  fs.exists(settings.SPLASH_SVG, function (exists) {
    if (exists) {
      display.success(settings.SPLASH_SVG + ' exists');
      deferred.resolve();
    } else {
      display.error(settings.SPLASH_SVG + ' does not exist in the root folder');
      deferred.reject();
    }
  });
  return deferred.promise;
};

/**
 * Checks if a config.xml file exists
 *
 * @return {Promise} resolves if exists, rejects otherwise
 */
var configFileExists = function () {
  var deferred = Q.defer();
  fs.exists(settings.CONFIG_FILE, function (exists) {
    if (exists) {
      display.success(settings.CONFIG_FILE + ' exists');
      deferred.resolve();
    } else {
      display.error('cordova\'s ' + settings.CONFIG_FILE + ' does not exist in the root folder');
      deferred.reject();
    }
  });
  return deferred.promise;
};

display.header('Checking Project & Splash');

atLeastOnePlatformFound()
.then(validSplashExists)
.then(configFileExists)
.then(generatePNGFromSVG)
.then(getProjectName)
.then(getPlatforms)
.then(generateSplashes)
.catch(function (err) {
  if (err) {
    console.log(err);
  }
}).then(function () {
  console.log('');
});
