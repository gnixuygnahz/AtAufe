package com.ataufe;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * Created by anytime on 16/11/15.
 */
public class AtAufeModule extends ReactContextBaseJavaModule {
    public AtAufeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "AtAufe";
    }

    @ReactMethod
    public void curl(String url,String body,String cookie, Promise promise){
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder().url(url)
                .post(RequestBody.create(MediaType.parse("application/x-www-form-urlencoded;"),body))
                .addHeader("Cookie",cookie)
                .build();

        try{
            Response response = client.newCall(request).execute();
            if (response.isSuccessful()) {
                WritableMap map = Arguments.createMap();
                map.putString("response",response.body().string());
                promise.resolve(map);
            } else {
                throw new IOException("Unexpected code " + response);
            }
        }catch (IOException e){
            promise.reject(e.getMessage());
        }

    }



}
