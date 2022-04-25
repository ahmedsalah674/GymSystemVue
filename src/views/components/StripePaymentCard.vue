<template>
  <div>
    <stripe-checkout
      ref="checkoutRef"
      mode="subscription"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="v => loading = v"
    />
    <button @click="submit">Subscribe!</button>
  </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
  components: {
    StripeCheckout,
  },
  data () {
    this.publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    return {
      loading: false,
      lineItems: [
        {
          price: 'price_1Kor2aBh9t4Pr0TyzihS3EKg', // The id of the recurring price you created in your Stripe dashboard
          quantity: 20,
        },
        {
          price: 'price_1Kor6ABh9t4Pr0Ty2LyG05jl', // The id of the recurring price you created in your Stripe dashboard
          quantity: 20,
        },
        {
          price: 'price_1Kor6ABh9t4Pr0TyroGvxeb7', // The id of the recurring price you created in your Stripe dashboard
          quantity: 20,
        },
      ],
      successURL: 'sucess',
      cancelURL: 'cancel',
    };
  },
  methods: {
    submit () {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>