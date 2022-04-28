<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          isBlur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow"
          btnBackground="bg-gradient-success"
          v-bind:darkMode="true"
        />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-info text-gradient">
                    Welcome back
                  </h3>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <form role="form" class="text-start" @submit.prevent="login()">
                     <div class="mb-3">
                      <label for="inputEmail" class="form-label">Email</label>
                      <input 
                      v-model="email"
                       :class="{ 'is-invalid': errors.email }" 
                       type="email" 
                       class="form-control"
                        id="inputEmail">
                      <span v-if="errors.email" class="text-danger">{{
                      errors.email[0]
                     }}</span>  
                    </div>
  
                    <div class="mb-3">
                      <label for="inputPassword" class="form-label">Password</label>
                      <input 
                      v-model="password"
                       :class="{ 'is-invalid': errors.password }"
                       type="password"
                       class="form-control" 
                       id="inputPassword"
                       >
                      <span v-if="errors.password" class="text-danger">{{
                      errors.password[0]
                     }}</span>
                    </div>
                    <vsud-switch id="rememberMe" checked>
                      Remember me
                    </vsud-switch>
                     <p v-if="errors.authError" class="text-danger">{{
                      errors.authError[0]
                     }}</p>

                    <div class="text-center">
                      <vsud-button
                        class="my-4 mb-2"
                        variant="gradient"
                        color="info"
                        fullWidth
                        >Sign in
                      </vsud-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a
                      href="javascript:;"
                      class="text-info text-gradient font-weight-bold"
                      >Sign up</a
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8"
              >
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage:
                      'url(' +
                      require('@/assets/img/curved-images/curved9.jpg') +
                      ')',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <app-footer />
</template>

<script>
import AuthService from "../services/Auth/AuthService";

import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import VsudSwitch from "@/components/VsudSwitch.vue";
import VsudButton from "@/components/VsudButton.vue";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    Navbar,
    AppFooter,
    VsudSwitch,
    VsudButton,
  },
  data() {
      return {
        email:"",
        password:"",
        errors:{}
      }
  },
  methods:{
    login(){
      this.FrontVlidation();
    
      if (!Object.keys(this.errors).length) {
      AuthService.login(this.email,this.password).then((res)=>{
         if (res.data.status == "error") {
              this.errors = res.data.errors;
              console.log(this.errors);
            } else if (res.data.status == "success") {
                localStorage["userToken"]=res.data.token;
                this.$store.commit('setUserData', res.data.user)
               this.$router.push("/profile");
            }
       
      }).catch(
        err=>{console.log(err)}
      );
      }
    },
    FrontVlidation() {
      this.errors = {};
   
      if (!this.email) {
        this.errors["email"] = ["email is required"];
      } else if (!this.validEmail(this.email)) {
        this.errors["email"] = ["email should be a valid one"];
      }
    
      if (!this.password) {
        this.errors["password"] = ["password is required"];
      } else if (this.password.length < 8) {
        this.errors["password"] = ["password must be at least 8 characters"];
      }
   
    },
    validEmail: function (email) {
      var emailRegExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegExp.test(email);
    },
  }
  ,
  beforeMount() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push("/profile");
    }
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
