package com.bicycle.raaz;

import android.widget.Toast;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


class StripeModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactApplicationContext;

    public StripeModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
        this.reactApplicationContext = reactApplicationContext;
    }

    @ReactMethod
    public void show() {
        Toast.makeText(reactApplicationContext, "Hi hello hi!", Toast.LENGTH_LONG).show();
    }

    @Override
    public String getName() {
        return "ABC";
    }

}