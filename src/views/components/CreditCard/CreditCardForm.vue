<!-- eslint-disable prettier/prettier  -->
<template>
  <div class="card-form col-6">
    <div class="card-form__inner">
      <div class="card-container m-5">
        <credit-card
        :expireYear="expireYear"
        :expireMonth="expireMonth"
        :cardNumber="cardNumber"
        :name="name"
        :cvv="cvv"
        :showBack="showBack"
        :symbolImage="'/img/' + symbolImage + '.png'"
        />
      </div>
      <div class="card-input">
        <label for="cardNumber" class="card-input__label">
          Card Number
        </label>
        <input
          :value="cardNumber"
          required
          autofocus
          id="cardNumber"
          name="cardNumber"
          class="card-input__input"
          autocomplete="off"
          v-imask="cardMasks"
          @accept="onAcceptCardType"
        />
      </div>
      <div class="card-input">
        <label for="cardName" class="card-input__label">
          Card Owner
        </label>
        <input
          id="cardName"
          required
          name="cardName"
          class="card-input__input"
          v-model="name"
          autocomplete="off"
        />
      </div>
      <div class="card-form__row">
        <div class="card-form__col">
          <div class="card-form__group">
            <label for="cardMonth" class="card-input__label">
              Expiration Date
            </label>
            <select
              class="card-input__input -select"
              id="cardMonth"
              name="cardMonth"
              v-model="expireMonth"
              required
            >
              <option value="" disabled selected>Month</option>
              <option
                v-for="n in 12"
                :value="n < 10 ? '0' + n : n"
                :key="n"
              >
                {{ 10 > n ? "0" + n : n }}
              </option>
            </select>
            <select
              class="card-input__input -select"
              id="cardYear"
              name="cardYear"
              v-model="expireYear"
              required
            >
              <option value="" disabled selected>Year</option>
              <option
                v-for="(n, $index) in 12"
                :value="$index + currentYear"
                :key="n"
              >
                {{ $index + currentYear }}
              </option>
            </select>
          </div>
        </div>
        <div class="card-form__col -cvv">
          <div class="card-input">
            <label for="cardCvv" class="card-input__label">CVV</label>
            <input
            class="card-input__input"
            id="cardCvv"
            name="cardCvv"
            :value="cvv"
            autocomplete="off"
            v-imask="cvvMask"
            @accept="onAcceptCvv"
            @focus="showBack = true"
            @blur="showBack = false"
            required
            />
          </div>
        </div>
      </div>
      <button @click="submitCard" class="card-form__button">
        Submit
      </button>
    </div>
  </div>
</template>
<script>
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import CreditCard from "./CreditCard.vue";
import { IMaskDirective } from "../../../../node_modules/vue-imask";
import { cardMasks, cvvMask } from "@/masks";
import StripeService from "../../../services/Stripe/StripeService";
import StripeOperationService from "../../../services/Stripe/StripeOperationService";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});


export default {
  props: {
    user_id: String,
    gym_id: String,
    package_id: String,
    selected_user:{
      type: Object,
    },
    selected_gym:{
      type:Object,
    },
    selected_package:{
      type: Object,
    },
    customername: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    country: String,
    zip: String,
    method: { type: Function },
  },
  components: {
    CreditCard,
  },
  data() {
    return {
      CustomerToken: "",
      CustomerId: "",
      wasCharged: false,
      cardMasks: cardMasks,
      cvvMask: cvvMask,
      currentYear: new Date().getFullYear(),
      showBack: false,
      symbolImage: "mastercard",
      cardNumber: "",
      expireMonth: "",
      expireYear: "",
      name: "",
      cvv: "",
      FormData: {
        cardNumber: "",
        expireMonth: "",
        expireYear: "",
        name: "",
        cvv: "",
      },
      chargeData:{
        amount:"",
        source:"",
        customer:"",
      },
      CustomerData:{
        name:"",
        email:"",
        phone:"",
        address:{
          address:"",
          city:"",
          country:"",
          postal_code:"",
        },
      },
    };
  },
  directives: {
    imask: IMaskDirective
  },
  methods: {
    Success() {
      Toast.fire({
        icon: "success",
        title: "Payment Successful",
      });
    },
    Error() {
      Toast.fire({
        icon: "error",
        title: "Payment Failed",
      });
    },
    MissingElements() {
      Toast.fire({
        icon: "info",
        title: "All fields needs to be filled",
      });
    },
    MissingPaymentInfo(){
      Toast.fire({
        icon: "info",
        title: "Please fill in all payment information",
      });
    },
    CreateCustomerToken: function (CardForm){
      StripeService.CreateToken(CardForm)
      .then((response) => {
        let token = response.data.token.id;
        if(token.includes("tok_")){
          this.CreateCustomerDetails(token);
        }else{
          this.Error();
        }
      })
      .catch((error) => {
        this.Error();
      });
    },
    CreateCustomerDetails: function(token){
      this.CustomerData = {
        name: this.customername,
        email: this.email,
        phone: this.phone,
        address:{
          address: this.address,
          city: this.city,
          country: this.country,
          postal_code: this.zip,
        },
      };
      StripeService.CreateCustomer(this.CustomerData)
      .then((response) => {
        let customer = response.data.customer.id;
        if(customer.includes("cus_")){
          this.CreateCustomerCharge(token,customer);
        }
        else{
          this.Error();
        }
      })
      .catch((error) => {
        this.Error();
      });
    },
    CreateCustomerCharge: function(token,customer){
      this.chargeData = {
        amount:this.selected_package.price,
        source:token,
        customer:customer,
      }
      StripeService.CreateCharge(this.chargeData)
      .then((response) => {
        let charge = response.data.success;
        if(charge===true){
          let formData = {
            gym_member_id: this.selected_user.id,
            gym_id: this.selected_gym.id,
            package_id: this.selected_package.id,
            paid_amount: this.chargeData.amount,
          };
          this.IntoDatabase(formData);
        }
        else{
          this.Error();
        }
      })
      .catch((error) => {
        this.Error();
      });
    },

    IntoDatabase: function(formData){
      StripeOperationService.create(formData)
      .then((response) => {
        this.Success();
      })
      .catch((error) => {
        this.Error();
      });
    },

    async submitCard(){
      this.FormData = {
        card_number: this.cardNumber,
        card_expiry_month: this.expireMonth,
        card_expiry_year: this.expireYear,
        card_cvc: this.cvv,
      };
      let isParentValidated = await this.method();
      isParentValidated ? this.CreateCustomerToken(this.FormData) : this.MissingElements();
    },

    onAcceptCardType(e) {
      const maskRef = e.detail;
      const type = maskRef.masked.currentMask.cardtype;

      if (type !== "Unknown") {
        this.symbolImage = type;
      }

      this.cardNumber = maskRef.value;
    },
    onAcceptCvv(e) {
      const maskRef = e.detail;
      this.cvv = maskRef.value;
    },
  },
};
</script>

<style scoped lang="scss">
.card-container {
  margin: 30px auto 50px auto;
}

.card-form {
  max-width: 570px;
  margin: auto;
  width: 100%;

  &__inner {
    background: #fff;
    box-shadow: 0 30px 60px 0 rgba(90, 116, 148, 0.4);
    border-radius: 10px;
    padding: 20px;
  }

  &__row {
    display: flex;
    align-items: flex-start;
  }

  &__col {
    flex: auto;
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }

    &.-cvv {
      max-width: 150px;
    }
  }

  &__group {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    .card-input__input {
      flex: 1;
      margin-right: 15px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__button {
    width: 100%;
    height: 55px;
    background: #38a294;
    border: none;
    border-radius: 5px;
    font-size: 22px;
    font-weight: 500;
    box-shadow: 3px 10px 20px 0px rgba(35, 100, 210, 0.3);
    color: #fff;
    margin-top: 20px;
    cursor: pointer;

    &:hover {
      background: darken(#38a294, 5%);
    }
  }
}

.card-input {
  margin-bottom: 20px;
  &__label {
    margin-bottom: 5px;
    color: #1a3b5d;
    width: 100%;
    display: block;
    text-align: left;
  }
  &__input {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    box-shadow: none;
    border: 1px solid #ced6e0;
    transition: all 0.3s ease-in-out;
    font-size: 18px;
    padding: 5px 15px;
    background: none;
    color: #1a3b5d;

    &:hover,
    &:focus {
      border-color: #38a294;
    }

    &:focus {
      box-shadow: 0px 10px 20px -13px rgba(32, 56, 117, 0.35);
    }
    &.-select {
      -webkit-appearance: none;
      background-image: url("/img/select.png");
      background-size: 12px;
      background-position: 90% center;
      background-repeat: no-repeat;
      padding-right: 30px;
    }
  }
}
</style>