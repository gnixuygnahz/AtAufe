##更新修改记录
### LeanCloud修复
文件位置: ./node_modules/leancloud-storage/dist/node/browserify-wrapper/localstorage-browser.js
```JavaScript
/**
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
**/

'use strict';


var Promise = require('../promise');
var _ = require('underscore');
// interface Storage {
//   readonly attribute boolean async;
//   string getItem(string key);
//   void setItem(string key, string value);
//   void removeItem(string key);
//   void clear();
//   Promise getItemAsync(string key);
//   Promise setItemAsync(string key, string value);
//   Promise removeItemAsync(string key);
//   Promise clearAsync();
// }
var Storage = {};
var apiNames = ['getItem', 'setItem', 'removeItem', 'clear'];

if (global.localStorage) {

  var localStorage = global.localStorage;

  try {
    var testKey = '__storejs__';
    localStorage.setItem(testKey, testKey);
    if (localStorage.getItem(testKey) != testKey) {
      throw new Error();
    }
    localStorage.removeItem(testKey);
  } catch (e) {
    localStorage = require('localstorage-memory');
  }

  // in browser, `localStorage.async = false` will excute `localStorage.setItem('async', false)`
  _(apiNames).each(function (apiName) {
    Storage[apiName] = function () {
      return global.localStorage[apiName].apply(global.localStorage, arguments);
    };
  });
  Storage.async = false;
} else {
  var AsyncStorage = require(12).AsyncStorage; //此处的'react-native'换为模块ID
  _(apiNames).each(function (apiName) {
    Storage[apiName + 'Async'] = function () {
      return Promise.as(AsyncStorage[apiName].apply(AsyncStorage, arguments));
    };
  });
  Storage.async = true;
}

module.exports = Storage;

```

### react-native-scrollable-tab-view错误修改
文件位置: ./node_modules/react-native-scrollable-tab-view/Button.android.js
```
 const ReactNative = require('react-native');
 const {
   TouchableNativeFeedback,
-  View,
+  View, Platform
 } = ReactNative;
 
+const API21 = (Platform.OS === "android" && Platform["Version"] >= 21);
+
 const Button = (props) => {
   return <TouchableNativeFeedback
     delayPressIn={0}
-    background={TouchableNativeFeedback.SelectableBackgroundBorderless()} // eslint-disable-line new-cap
+    background={API21 ? TouchableNativeFeedback.SelectableBackgroundBorderless() : TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
     {...props}
   >
     {props.children}

```

### react-native-busy-indicator修改zIndex
解决方法:在源码中修改

### react-native-swipeout错误修改
```
import React from 'react';
var tweenState = require('react-tween-state')
import {PanResponder, TouchableHighlight, StyleSheet, Text, View} from 'react-native';
var styles = require('./styles.js')

var SwipeoutBtn = React.createClass({
  getDefaultProps: function() {
    return {
      backgroundColor: null,
      color: null,
      component: null,
      underlayColor: null,
      height: 0,
      key: null,
      onPress: null,
      text: 'Click me',
      type: '',
      width: 0,
    }
  }
, render: function() {
    var btn = this.props

    var styleSwipeoutBtn = [styles.swipeoutBtn]

    //  apply "type" styles (delete || primary || secondary)
    if (btn.type === 'delete') styleSwipeoutBtn.push(styles.colorDelete)
    else if (btn.type === 'primary') styleSwipeoutBtn.push(styles.colorPrimary)
    else if (btn.type === 'secondary') styleSwipeoutBtn.push(styles.colorSecondary)

    //  apply background color
    if (btn.backgroundColor) styleSwipeoutBtn.push([{ backgroundColor: btn.backgroundColor }])

    styleSwipeoutBtn.push([{
      height: btn.height,
      width: btn.width,
    }])

    var styleSwipeoutBtnComponent = []

    //  set button dimensions
    styleSwipeoutBtnComponent.push([{
      height: btn.height,
      width: btn.width,
    }])

    var styleSwipeoutBtnText = [styles.swipeoutBtnText]

    //  apply text color
    if (btn.color) styleSwipeoutBtnText.push([{ color: btn.color }])

    return  (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={styles.swipeoutBtnTouchable}
        underlayColor={this.props.underlayColor}
      >
        <View style={styleSwipeoutBtn}>
          {btn.component ?
            <View style={styleSwipeoutBtnComponent}>{btn.component}</View>
          : <Text style={styleSwipeoutBtnText}>{btn.text}</Text>
          }
        </View>
      </TouchableHighlight>
    )
  }
})

var Swipeout = React.createClass({
  mixins: [tweenState.Mixin]
, getDefaultProps: function() {
    return {
      onOpen: function(sectionID, rowID) {console.log('onOpen: '+sectionID+" "+rowID)},
      rowID: -1,
      sectionID: -1,
    }
  }
, getInitialState: function() {
    return {
      autoClose: this.props.autoClose || false,
      btnWidth: 0,
      btnsLeftWidth: 0,
      btnsRightWidth: 0,
      contentHeight: 0,
      contentPos: 0,
      contentWidth: 0,
      openedRight: false,
      swiping: false,
      tweenDuration: 160,
      timeStart: null,
    }
  }
, componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => !(gestureState.dx === 0 || gestureState.dy === 0),
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
      onShouldBlockNativeResponder: (event, gestureState) => true,
    });
  }
, componentWillReceiveProps: function(nextProps) {
    if (nextProps.close) this._close()
  }
, _handlePanResponderGrant: function(e: Object, gestureState: Object) {
    this.props.onOpen(this.props.sectionID, this.props.rowID)
    this.refs.swipeoutContent.measure((ox, oy, width, height) => {
      this.setState({
        btnWidth: (width/5),
        btnsLeftWidth: this.props.left ? (width/5)*this.props.left.length : 0,
        btnsRightWidth: this.props.right ? (width/5)*this.props.right.length : 0,
        swiping: true,
        timeStart: (new Date()).getTime(),
      })
    })
  }
, _handlePanResponderMove: function(e: Object, gestureState: Object) {
    var posX = gestureState.dx
    var posY = gestureState.dy
    var leftWidth = this.state.btnsLeftWidth
    var rightWidth = this.state.btnsRightWidth
    if (this.state.openedRight) var posX = gestureState.dx - rightWidth
    else if (this.state.openedLeft) var posX = gestureState.dx + leftWidth

    //  prevent scroll if moveX is true
    var moveX = Math.abs(posX) > Math.abs(posY)
    if (this.props.scroll) {
      if (moveX) this.props.scroll(false)
      else this.props.scroll(true)
    }
    if (this.state.swiping) {
      //  move content to reveal swipeout
      if (posX < 0 && this.props.right) this.setState({ contentPos: Math.min(posX, 0) })
      else if (posX > 0 && this.props.left) this.setState({ contentPos: Math.max(posX, 0) })
    }
  }
, _handlePanResponderEnd: function(e: Object, gestureState: Object) {
    var posX = gestureState.dx
    var contentPos = this.state.contentPos
    var contentWidth = this.state.contentWidth
    var btnsLeftWidth = this.state.btnsLeftWidth
    var btnsRightWidth = this.state.btnsRightWidth

    //  minimum threshold to open swipeout
    var openX = contentWidth*0.33

    //  should open swipeout
    var openLeft = posX > openX || posX > btnsLeftWidth/2
    var openRight = posX < -openX || posX < -btnsRightWidth/2

    //  account for open swipeouts
    if (this.state.openedRight) var openRight = posX-openX < -openX
    if (this.state.openedLeft) var openLeft = posX+openX > openX

    //  reveal swipeout on quick swipe
    var timeDiff = (new Date()).getTime() - this.state.timeStart < 200
    if (timeDiff) {
      var openRight = posX < -openX/10 && !this.state.openedLeft
      var openLeft = posX > openX/10 && !this.state.openedRight
    }

    if (this.state.swiping) {
      if (openRight && contentPos < 0 && posX < 0) {
        // open swipeout right
        this._tweenContent('contentPos', -btnsRightWidth)
        this.setState({ contentPos: -btnsRightWidth, openedLeft: false, openedRight: true })
      } else if (openLeft && contentPos > 0 && posX > 0) {
        // open swipeout left
        this._tweenContent('contentPos', btnsLeftWidth)
        this.setState({ contentPos: btnsLeftWidth, openedLeft: true, openedRight: false })
      }
      else {
        // close swipeout
        this._tweenContent('contentPos', 0)
        this.setState({ contentPos: 0, openedLeft: false, openedRight: false })
      }
    }

    //  Allow scroll
    if (this.props.scroll) this.props.scroll(true)
  }
, _tweenContent: function(state, endValue) {
    this.tweenState(state, {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: endValue === 0 ? this.state.tweenDuration*1.5 : this.state.tweenDuration,
      endValue: endValue
    })
  }
, _rubberBandEasing: function(value, limit) {
    if (value < 0 && value < limit) return limit - Math.pow(limit - value, 0.85);
    else if (value > 0 && value > limit) return limit + Math.pow(value - limit, 0.85);
    return value;
  }

//  close swipeout on button press
, _autoClose: function(btn) {
    var onPress = btn.onPress
    if (onPress) onPress()
    if (this.state.autoClose) this._close()
  }
, _close: function() {
    this._tweenContent('contentPos', 0)
    this.setState({
      openedRight: false,
      openedLeft: false,
    })
  }
, render: function() {
    var contentWidth = this.state.contentWidth
    var posX = this.getTweeningValue('contentPos')

    var styleSwipeout = [styles.swipeout]
    if (this.props.backgroundColor) {
      styleSwipeout.push([{ backgroundColor: this.props.backgroundColor }])
    }

    var limit = -this.state.btnsRightWidth
    if (posX > 0) var limit = this.state.btnsLeftWidth

    var styleLeftPos = StyleSheet.create({
      left: {
        left: 0,
        overflow: 'hidden',
        width: Math.min(limit*(posX/limit), limit),
      }
    })
    var styleRightPos = StyleSheet.create({
      right: {
        left: Math.abs(contentWidth + Math.max(limit, posX)),
        right: 0,
      }
    })
    var styleContentPos = StyleSheet.create({
      content: {
        left: this._rubberBandEasing(posX, limit),
      }
    })

    var styleContent = [styles.swipeoutContent]
    styleContent.push(styleContentPos.content)

    var styleRight = [styles.swipeoutBtns]
    styleRight.push(styleRightPos.right)

    var styleLeft = [styles.swipeoutBtns]
    styleLeft.push(styleLeftPos.left)

    var isRightVisible = posX < 0;
    var isLeftVisible = posX > 0;

    return (
      <View style={styleSwipeout}>
        <View
          ref="swipeoutContent"
          style={styleContent}
          onLayout={this._onLayout}
          {...this._panResponder.panHandlers}>
          {this.props.children}
        </View>
        { this._renderButtons(this.props.right, isRightVisible, styleRight) }
        { this._renderButtons(this.props.left, isLeftVisible, styleLeft) }
      </View>
    )},

    _onLayout: function(event) {
      var { width, height } = event.nativeEvent.layout;
      this.setState({
        contentWidth: width,
        contentHeight: height
      });
    },

    _renderButtons: function(buttons, isVisible, style) {
      if (buttons && isVisible) {
        return( <View style={style}>
          { buttons.map(this._renderButton) }
        </View>);
      } else {
        return (
          <View/>
        );
      }
    },

    _renderButton: function(btn, i) {
      return (
        <SwipeoutBtn
            backgroundColor={btn.backgroundColor}
            color={btn.color}
            component={btn.component}
            height={this.state.contentHeight}
            key={i}
            onPress={() => this._autoClose(btn)}
            text={btn.text}
            type={btn.type}
            underlayColor={btn.underlayColor}
            width={this.state.btnWidth}/>
      )
    }
})

module.exports = Swipeout
```

###androidmanifest
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.ataufe"
    android:versionCode="1"
    android:versionName="1.0">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>

    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-feature android:name="android.hardware.camera" android:required="true"/>
    <uses-feature android:name="android.hardware.camera.autofocus" />

    <permission
        android:name="${applicationId}.permission.C2D_MESSAGE"
        android:protectionLevel="signature" />
    <uses-permission android:name="${applicationId}.permission.C2D_MESSAGE" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>

    <uses-sdk
        android:minSdkVersion="16"
        android:targetSdkVersion="23" />

    <application
      android:name=".MainApplication"
      android:allowBackup="true"
      android:label="@string/app_name"
      android:icon="@mipmap/shadow2"
      android:theme="@style/AppTheme">
      <activity
        android:name=".MainActivity"
        android:label="@string/app_name"
          android:windowSoftInputMode="adjustResize"
        android:configChanges="keyboard|keyboardHidden|orientation|screenSize">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
      </activity>
      <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />


        <receiver
            android:name="com.google.android.gms.gcm.GcmReceiver"
            android:exported="true"
            android:permission="com.google.android.c2dm.permission.SEND" >
            <intent-filter>
                <action android:name="com.google.android.c2dm.intent.RECEIVE" />
                <category android:name="${applicationId}" />
            </intent-filter>
        </receiver>

        <receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationPublisher" />
        <receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationBootEventReceiver">
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED" />
            </intent-filter>
        </receiver>
        <service android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationRegistrationService"/>
        <service
            android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerService"
            android:exported="false" >
            <intent-filter>
                <action android:name="com.google.android.c2dm.intent.RECEIVE" />
            </intent-filter>
        </service>


    </application>

</manifest>
```

###REACT-NATIVE-LOADING-GIF
```
dependencies {
  // If your app supports Android versions before Ice Cream Sandwich (API level 14)
  compile 'com.facebook.fresco:animated-base-support:0.11.0'

  // For animated GIF support
  compile 'com.facebook.fresco:animated-gif:0.11.0'

  // For WebP support, including animated WebP
  compile 'com.facebook.fresco:animated-webp:0.11.0'
  compile 'com.facebook.fresco:webpsupport:0.11.0'

  // For WebP support, without animations
  compile 'com.facebook.fresco:webpsupport:0.11.0'
}
```

###android
```
在blob中做了修改,允许getCookie,其次添加了ataufe模块,允许自定义cookie
```

---
##迁移操作

###APP签名操作  复制签名文件  
参考:http://reactnative.cn/docs/0.37/signed-apk-android.html#content

###拷贝package安装依赖并link 

###react-native-scrollable-tab-view 修改

### react-native-busy-indicator修改zIndex

### react-native-swipeout错误修改

### androidmanifest中添加权限  修改targetSdkVersion  修改icon和label

### jpush修改

### react-native-update 原生配置

### pushy login

### 拷贝app和ReadMe 

### 配置index.android.js和...

### 配置react-native-loading-gif

### 修改了webview 原生