# cordova-res

Automatic splash screen and icon generator for Cordova. Create a splash screen and icon as SVG once in the root folder of your Cordova project and use cordova-res to automatically crop and copy it for all the platforms your project supports (currenty works with iOS, Android and Windows 10).

### Installation

    $ sudo npm install cordova-res -g

### Requirements

- ImageMagick installed (*Mac*: `brew install imagemagick`, *Debian/Ubuntu*: `sudo apt-get install imagemagick`, *Windows*: [See here](http://www.imagemagick.org/script/binary-releases.php#windows))
- At least one platform was added to your project ([cordova platforms docs](http://cordova.apache.org/docs/en/edge/guide_platforms_index.md.html#Platform%20Guides))
- Cordova's config.xml file must exist in the root folder ([cordova config.xml docs](http://cordova.apache.org/docs/en/edge/config_ref_index.md.html#The%20config.xml%20File))

### Usage

Create a `splash.svg` and `icon.svg` file in the root folder of your cordova project and run:

    $ cordova-res

Assets are save to e.g. `res/icon/android` etc.

### config.xml
Add the following lines to your [`config.xml`](https://cordova.apache.org/docs/en/latest/config_ref/images.html) in the root folder of your Cordova project.

```xml
<platform name="android">
    <allow-intent href="market:*" />
    <splash src="res/screen/android/splash-land-ldpi.png" density="land-ldpi"/>
    <splash src="res/screen/android/splash-port-ldpi.png" density="port-ldpi"/>
    <splash src="res/screen/android/splash-port-mdpi.png" density="port-mdpi"/>
    <splash src="res/screen/android/splash-land-mdpi.png" density="land-mdpi"/>
    <splash src="res/screen/android/splash-port-hdpi.png" density="port-hdpi"/>
    <splash src="res/screen/android/splash-land-hdpi.png" density="land-hdpi"/>
    <splash src="res/screen/android/splash-port-xhdpi.png" density="port-xhdpi"/>
    <splash src="res/screen/android/splash-land-xhdpi.png" density="land-xhdpi"/>
    <!--
      ldpi    : 36x36 px
      mdpi    : 48x48 px
      hdpi    : 72x72 px
      xhdpi   : 96x96 px
      xxhdpi  : 144x144 px
      xxxhdpi : 192x192 px
    -->
    <icon src="res/icon/android/icon-ldpi.png" density="ldpi" />
    <icon src="res/icon/android/icon-mdpi.png" density="mdpi" />
    <icon src="res/icon/android/icon-hdpi.png" density="hdpi" />
    <icon src="res/icon/android/icon-xhdpi.png" density="xhdpi" />
    <icon src="res/icon/android/icon-xxhdpi.png" density="xxhdpi" />
    <icon src="res/icon/android/icon-xxxhdpi.png" density="xxxhdpi" />
</platform>
<platform name="ios">
    <preference name="AutoHideSplashScreen" value="false" />
    <allow-intent href="itms:*" />
    <allow-intent href="itms-apps:*" />
    <preference name="StatusBarOverlaysWebView" value="false" />
    <preference name="StatusBarBackgroundColor" value="#204056" />
    <preference name="StatusBarStyle" value="lightcontent" />
    <preference name="DisallowOverscroll" value="true" />
    <splash src="res/screen/ios/Default~iphone.png" width="320" height="480"/>
    <splash src="res/screen/ios/Default@2x~iphone.png" width="640" height="960"/>
    <splash src="res/screen/ios/Default-Portrait~ipad.png" width="768" height="1024"/>
    <splash src="res/screen/ios/Default-Portrait@2x~ipad.png" width="1536" height="2048"/>
    <splash src="res/screen/ios/Default-Landscape~ipad.png" width="1024" height="768"/>
    <splash src="res/screen/ios/Default-Landscape@2x~ipad.png" width="2048" height="1536"/>
    <splash src="res/screen/ios/Default-568h@2x~iphone.png" width="640" height="1136"/>
    <splash src="res/screen/ios/Default-667h.png" width="750" height="1334"/>
    <splash src="res/screen/ios/Default-736h.png" width="1242" height="2208"/>
    <splash src="res/screen/ios/Default-Landscape-736h.png" width="2208" height="1242"/>
    <!-- iOS 8.0+ -->
    <!-- iPhone 6 Plus  -->
    <icon src="res/icon/ios/icon-60@3x.png" width="180" height="180" />
    <!-- iOS 7.0+ -->
    <!-- iPhone / iPod Touch  -->
    <icon src="res/icon/ios/icon-60.png" width="60" height="60" />
    <icon src="res/icon/ios/icon-60@2x.png" width="120" height="120" />
    <!-- iPad -->
    <icon src="res/icon/ios/icon-76.png" width="76" height="76" />
    <icon src="res/icon/ios/icon-76@2x.png" width="152" height="152" />
    <!-- iOS 6.1 -->
    <!-- Spotlight Icon -->
    <icon src="res/icon/ios/icon-40.png" width="40" height="40" />
    <icon src="res/icon/ios/icon-40@2x.png" width="80" height="80" />
    <!-- iPhone / iPod Touch -->
    <icon src="res/icon/ios/icon.png" width="57" height="57" />
    <icon src="res/icon/ios/icon@2x.png" width="114" height="114" />
    <!-- iPad -->
    <icon src="res/icon/ios/icon-72.png" width="72" height="72" />
    <icon src="res/icon/ios/icon-72@2x.png" width="144" height="144" />
    <!-- iPhone Spotlight and Settings Icon -->
    <icon src="res/icon/ios/icon-small.png" width="29" height="29" />
    <icon src="res/icon/ios/icon-small@2x.png" width="58" height="58" />
    <!-- iPad Spotlight and Settings Icon -->
    <icon src="res/icon/ios/icon-50.png" width="50" height="50" />
    <icon src="res/icon/ios/icon-50@2x.png" width="100" height="100" />
</platform>
```

### License

MIT
