package com.bicycle.raaz;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.stripe.android.PaymentConfiguration;
import com.stripe.android.ApiResultCallback;
import com.stripe.android.PaymentIntentResult;
import com.stripe.android.Stripe;
import com.stripe.android.model.ConfirmPaymentIntentParams;
import com.stripe.android.model.PaymentIntent;
import com.stripe.android.model.PaymentMethodCreateParams;
import com.stripe.android.view.CardInputWidget;
import java.util.HashMap;
import java.util.Map;


class StripeModule extends ReactContextBaseJavaModule {

  private static final String TAG = "StripeModule";

  private static final String PUBLISHABLE_API_KEY = "pk_test_51IXRCzGeJAhDxBASDPRqkZSAKlbuzTa7RgFxpaLBlkkNmQuPLzC8E3iLW1qXoxWzhLq2XdXJcc0Ys8qVcMEdNUNO00Kj0bmecI";

  private final ReactApplicationContext reactApplicationContext;
  private final Stripe stripe;

  private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
      stripe.onPaymentResult(requestCode, data, new PaymentResultCallback(getCurrentActivity()));
    }
  };


  public StripeModule(ReactApplicationContext reactApplicationContext) {
    super(reactApplicationContext);
    this.reactApplicationContext = reactApplicationContext;

    PaymentConfiguration.init(
        reactApplicationContext,
        PUBLISHABLE_API_KEY
    );
    stripe = new Stripe(reactApplicationContext,
        PaymentConfiguration.getInstance(reactApplicationContext).getPublishableKey());

    reactApplicationContext.addActivityEventListener(mActivityEventListener);
  }

  private static final class PaymentResultCallback
      implements ApiResultCallback<PaymentIntentResult> {

    private final Activity activity;

    PaymentResultCallback(@NonNull Activity activity) {
      this.activity = activity;
    }

    @Override
    public void onSuccess(@NonNull PaymentIntentResult result) {

      PaymentIntent.Status status = result.getIntent().getStatus();

      if (status == PaymentIntent.Status.Succeeded) {
        Toast.makeText(activity, "Succ!", Toast.LENGTH_LONG).show();

      } else if (status == PaymentIntent.Status.RequiresPaymentMethod) {
        Toast.makeText(activity, "Fail!", Toast.LENGTH_LONG).show();

      }
    }

    @Override
    public void onError(@NonNull Exception e) {
      // Payment request failed – allow retrying using the same payment method
      Toast.makeText(activity, "Fail but worse " + e.toString(), Toast.LENGTH_LONG).show();

    }
  }


  @ReactMethod
  public void show(String pan, String expiryDate, String cvc, String clientSecret) {
    startCheckout(pan, expiryDate, cvc, clientSecret);
  }

  @Override
  public String getName() {
    return "Stripe";
  }

  private void startCheckout(String pan, String expiryDate, String cvc, String clientSecret) {
    CardInputWidget cardInputWidget = new CardInputWidget(getCurrentActivity());
    cardInputWidget.setCardNumber(pan);
    cardInputWidget.setExpiryDate(Integer.parseInt(expiryDate.substring(0, 2)),
        2000 + Integer.parseInt(expiryDate.substring(3, 5)));
    cardInputWidget.setCvcCode(cvc);

    // Hook up the pay button to the card widget and stripe instance
    PaymentMethodCreateParams params = cardInputWidget.getPaymentMethodCreateParams();

    if (params != null) {
      Map<String, String> extraParams = new HashMap<>();
      extraParams.put("setup_future_usage", "off_session");

      ConfirmPaymentIntentParams confirmParams = ConfirmPaymentIntentParams
          .createWithPaymentMethodCreateParams(params,
              clientSecret, null, false,
              extraParams);
      stripe.confirmPayment(getCurrentActivity(), confirmParams);
    }
  }

}