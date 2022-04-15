<!-- eslint-disable prettier/prettier -->
<template>
<div class="card mb-4">
    <div class="card-header pb-0">
      <form
        @submit.prevent="submit"
        ref="form"
        autocomplete="off"
        enctype="multipart/form-data"
      >
        <div class="mb-3 form-group">
          <label for="coaches" class="form-label">Select User</label>
          <select v-model="form.user_id" class="form-control" name="user" id="user" :class="{ 'is-invalid': errors.users }">
            <option disabled>Select user</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
          <span v-if="errors.users">{{ errors.users }}</span>
        </div>

        <div class="mb-3 form-group">
          <label for="coaches" class="form-label">Select Gym</label>
          <select v-model="form.gym_id" class="form-control" name="gym" id="gym" :class="{ 'is-invalid': errors.gyms }">
            <option disabled>Select gym</option>
            <option v-for="gym in gyms" :key="gym.id" :value="gym.id">
              {{ gym.name }}
            </option>
          </select>
          <span v-if="errors.gyms">{{ errors.gyms }}</span>
        </div>

        <div class="mb-3 form-group">
          <label for="coaches" class="form-label">Select Package</label>
          <select v-model="form.package_id" class="form-control" name="package" id="package" :class="{ 'is-invalid': errors.packages }">
            <option disabled>Select package</option>
            <option v-for="pack in packages" :key="pack.id" :value="pack.id">
              {{ pack.name }}
            </option>
          </select>
          <span v-if="errors.packages">{{ errors.packages }}</span>
        </div>

        <StripePaymentCard></StripePaymentCard>

        <div class="text-center">
        <button type="submit" class="btn btn-primary">Buy</button>
        </div>
        

      </form>
  </div>
</div>
</template>
<script>
/*eslint-disable prettier/prettier*/
// import VsudAvatar from "@/components/VsudAvatar.vue";
// import VsudBadge from "@/components/VsudBadge.vue";
// import { Form, Field, ErrorMessage } from "vee-validate";]
import PackagesService from "../../services/GymManagers/PackagesService";
import GymMembers from "../../services/GymMembers/GymMemberService";
import GymService from "../../services/Gym/GymService";
import StripePaymentCard from "./StripePaymentCard";
// import Swal from "sweetalert2";
// const Toast = Swal.mixin({
//   toast: true,
//   position: "top-end",
//   showConfirmButton: false,
//   timer: 3000,
//   timerProgressBar: true,
//   didOpen: (toast) => {
//     toast.addEventListener("mouseenter", Swal.stopTimer);
//     toast.addEventListener("mouseleave", Swal.resumeTimer);
//   },
// });

export default {
  name: "Buy Package",
  components: {
    StripePaymentCard,
  },
  data() {
    return {
      errors: {},
      // token: "2|6kfynCaHfYggdULaqx7Kl5NEwvWIi465094zlUCF",
      form: {
        user_id: "",
        gym_id: "",
        package_id: "",
      },
      users:[],
      gyms: [],
      packages: [],
    };
  },
  methods: {
    // submit: function () {
    //   this.formValidation();
    //   if (!(Object.keys(this.errors).length > 0)) {
    //   Toast.fire({
    //     icon: "success",
    //     title: "Created successfully",
    //   });
    //   this.form = {
    //     name: "",
    //     price: "",
    //     session_count: "",
    //     gym_id: "",
    //     discount: null,
    //   };
    //   this.errors = [];
    //   this.$refs["form"].reset();
    //   setTimeout(() => {
    //     this.$router.push("/");
    //   }, 3000);
    //   }else{
    //     console.log(this.errors);
    //   }
    // },
    formValidation: function () {
      this.errors = {};
      for (const key in this.form) {
        if (!this.form[key]=="discount" && this.form[key] === "") {
          this.errors[key] = "This " + key + " field is required";
        }
      }
    },
    getGyms: function () {
      GymService.getAll()
        .then((response) => {
          this.gyms = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getPackages: function () {
      PackagesService.getAll()
        .then((response) => {
          this.packages = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getUsers: function () {
      GymMembers.getAll()
        .then((response) => {
          this.users = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.getGyms();
    this.getPackages();
    this.getUsers();
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
