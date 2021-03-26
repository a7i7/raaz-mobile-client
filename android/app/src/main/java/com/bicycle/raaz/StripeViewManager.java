package com.bicycle.raaz;

import android.util.AttributeSet;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import androidx.annotation.NonNull;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.stripe.android.view.CardInputWidget;
import com.stripe.android.view.CardMultilineWidget;

public class StripeViewManager extends SimpleViewManager<CardMultilineWidget> implements View.OnClickListener {


  @NonNull
  @Override
  public String getName() {
    return "ButtonView";
  }

  @NonNull
  @Override
  protected CardMultilineWidget createViewInstance(@NonNull ThemedReactContext reactContext) {
    CardMultilineWidget cardInputWidget = new CardMultilineWidget(reactContext);
    cardInputWidget.setShouldShowPostalCode(false);
    cardInputWidget.setUsZipCodeRequired(true);
      // cardInputWidget.setOrientation(LinearLayout.VERTICAL);
    // Button button = new Button(reactContext);
    // button.setOnClickListener(this);
    return cardInputWidget;
  }

  // @ReactProp(name = "buttonText")
  // public void setButtonText(Button button, String buttonText) {
  //   button.setText(buttonText);
  // }


  @Override
  public void onClick(View v) {

  }
}
