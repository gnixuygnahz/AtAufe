package com.ataufe;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.beefe.picker.PickerViewPackage;

import cn.jpush.reactnativejpush.JPushPackage;
import cn.reactnative.modules.update.UpdateContext;
import io.realm.react.RealmReactPackage;
import com.burnweb.rnwebview.RNWebViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import cn.reactnative.modules.update.UpdatePackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.rnfs.RNFSPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private boolean SHUTDOWN_TOAST = false;
  private boolean SHUTDOWN_LOG = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected String getJSBundleFile() {
      return UpdateContext.getBundleUrl(MainApplication.this);
    }
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new PickerViewPackage(),
            new RealmReactPackage(),
            new RNWebViewPackage(),
            new VectorIconsPackage(),
            new UpdatePackage(),
            new ReactNativePushNotificationPackage(),
              new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
            new ImageResizerPackage(),
            new ImagePickerPackage(),
            new RNFSPackage(),
            new RNFetchBlobPackage(),
              new AtAufePackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
