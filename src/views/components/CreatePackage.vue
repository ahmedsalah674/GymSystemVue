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
          <label for="name" class="form-label">Name</label>
          <input
            v-model="form.name"
            type="text"
            class="form-control"
            id="name"
            name="name"
            :class="{ 'is-invalid': errors.name }"
          />
          <span v-if="errors.name">
            {{ errors.name }}
          </span>
        </div>

        <div class="mb-3 form-group">
          <label for="name" class="form-label">Price</label>
          <input
            v-model="form.price"
            type="number"
            min="1"
            step="any"
            class="form-control"
            id="name"
            name="name"
            :class="{ 'is-invalid': errors.price }"
          />
          <span v-if="errors.price">
            {{ errors.price }}
          </span>
        </div>

        <div class="mb-3 form-group">
          <label for="name" class="form-label">Session Count</label>
          <input
            v-model="form.session_count"
            type="number"
            min="1"
            step="1"
            max="1460"
            class="form-control"
            id="name"
            name="name"
            :class="{ 'is-invalid': errors.session_count }"
          />
          <span v-if="errors.session_count">
            {{ errors.session_count }}
          </span>
        </div>

        <div class="mb-3 form-group">
          <label for="coaches" class="form-label">Select Gym</label>
          <select v-model="form.gym_id" class="form-control" name="gym" id="gym" :class="{ 'is-invalid': errors.gym }">
            <option disabled>Select gym</option>
            <option v-for="gym in gyms" :key="gym.id" :value="gym.id">
              {{ gym.name }}
            </option>
          </select>
          <span v-if="errors.gyms">{{ errors.gyms }}</span>
        </div>
        <div class="mb-3 form-group">
          <label for="name" class="form-label ">Discount</label>
          <input
            v-model="form.discount"
            type="number"
            min="1"
            step="any"
            max="100"
            class="form-control"
            id="name"
            name="name"
            :class="{ 'is-invalid': errors.discount }"
          />
          <span v-if="errors.discount">
            {{ errors.discount }}
          </span>
        </div>

        <div class="text-center">
        <button type="submit" class="btn btn-primary">Create</button>
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
import GymService from "../../services/Gym/GymService";
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
  name: "Create Package",
  data() {
    return {
      errors: {},
      // token: "2|6kfynCaHfYggdULaqx7Kl5NEwvWIi465094zlUCF",
      form: {
        name: "",
        price: "",
        session_count: "",
        gym_id: "",
        discount: null,
      },
      gyms: [],
    };
  },
  methods: {
    submit: function () {
      this.formValidation();
      console.log(this.coaches);
      if (!(Object.keys(this.errors).length > 0)) {
        PackagesService.create(this.form)
          .then((response) => {
            if (response.data.error) {
              this.errors = response.data.error;
            } else {
              Toast.fire({
                icon: "success",
                title: "Created successfully",
              });
              this.form = {
                name: "",
                price: "",
                session_count: "",
                gym_id: "",
                discount: null,
              };
              this.errors = [];
              this.$refs["form"].reset();
              setTimeout(() => {
                this.$router.push("/");
              }, 3000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }else{
        console.log(this.errors);
      }
    },
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
  },
  created() {
    this.getGyms();
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
