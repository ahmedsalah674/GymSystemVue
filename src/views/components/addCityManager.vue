<template>
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
      <label for="email" class="form-label">Email address</label>
      <input
        v-model="form.email"
        type="email"
        class="form-control"
        id="email"
        name="email"
        placeholder="Email"
        :class="{ 'is-invalid': errors.email }"
      />
      <span v-if="errors.email">{{ errors.email }}</span>
    </div>

    <div class="mb-3 form-group">
      <label for="password" class="form-label">Password</label>
      <input
        v-model="form.password"
        type="password"
        name="password"
        class="form-control"
        id="password"
        :class="{ 'is-invalid': errors.password }"
      />
      <span v-if="errors.password">{{ errors.password }}</span>
    </div>

    <div class="mb-3 form-group">
      <label for="password_confirmation" class="form-label"
        >Password confirmation</label
      >
      <input
        v-model="form.password_confirmation"
        type="password"
        name="password_confirmation"
        class="form-control"
        id="password_confirmation"
        :class="{ 'is-invalid': errors.password_confirmation }"
      />
      <span v-if="errors.password_confirmation">{{
        errors.password_confirmation
      }}</span>
    </div>

    <div class="mb-3 form-group" v-if="!formImage">
      <label for="avatar_image" class="form-label">User image</label>
      <input
        @change="handleFileUpload($event)"
        class="form-control"
        placeholder="avatar_image"
        name="avatar_image"
        type="file"
        id="avatar_image"
        :class="{ 'is-invalid': errors.avatar_image }"
      />
      <span v-if="errors.avatar_image">{{ errors.avatar_image }}</span>
    </div>
    <div v-else class="justify-content-center">
      <img :src="formImage" width="200" height="200" />
      <button class="btn btn-danger d-block btn-sm mt-2" @click="removeImage">
        Remove image
      </button>
    </div>

    <!-- <div class="mb-3 form-group">
      <label for="role" class="form-label">Role</label>
      <select class="form-control" name="role" id="role" :class="{ 'is-invalid': errors.role }">
        <option value="">Select role</option>
        <option value="admin">Admin</option>
        <option value="city_manager">City manager</option>
        <option value="user">User</option>
      </select> -->

    <button type="submit" class="btn btn-primary">Add</button>
  </form>
</template>
<script>
// import VsudAvatar from "@/components/VsudAvatar.vue";
// import VsudBadge from "@/components/VsudBadge.vue";
// import { Form, Field, ErrorMessage } from "vee-validate";
import CityManagersService from "../../services/CityManagers/CityManagersService";
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
  name: "add/edit-user",
  data() {
    return {
      editmode: false,
      errors: {},
      formImage: "",
      // token: "2|6kfynCaHfYggdULaqx7Kl5NEwvWIi465094zlUCF",
      form: {
        id: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        avatar_image: "",
      },
    };
  },
  methods: {
    getUsers: function () {
      CityManagersService.getAll()
        .then((response) => {
          this.cityManagers = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handleFileUpload: function (event) {
      this.form.avatar_image = event.target.files[0];
      // console.log("--------------------------------------")
      // console.log(event.target.files[0])
      var reader = new FileReader();
      reader.onload = (e) => {
        this.formImage = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    },

    removeImage: function () {
      this.formImage = "";
      this.avatar_image = "";
    },

    submit: function () {
      this.formValidation();
      if (!Object.keys(this.errors).length) {
        let formData = new FormData(this.$refs["form"]);
        formData.append("avatar_image", this.form.avatar_image);
        CityManagersService.create(formData)
          .then((response) => {
            console.log("response",response);
            if (response.data.error) {
              this.errors = response.data.error;
              console.log(this.errors);
            } else {
              Toast.fire({
                icon: "success",
                title: "Created successfully",
              });
              this.form = {
                id: "",
                name: "",
                email: "",
                password: "",
                password_confirmed: "",
                avatar_image: "",
                cityName: "",
              };
              this.image = "";
              this.errors = [];
              this.$refs["myform"].reset();
              formData.delete("avatar_image");
              this.removeImage();
            }
          })
          .catch((err) => {
            console.log(err);
            console.log("error");
          });
      }else{
        console.log(this.errors);
      }

    },
    formValidation: function () {
      this.errors = {};
      for (const key in this.form) {
        if (key != "avatar_image" && key != "id" && this.form[key] === "") {
          this.errors[key] = "This field is required";
        }
      }
      if (this.form.password.length < 8) {
        this.errors["password"] =
          "password must be at least 8 characters or numbers";
      } else if (
        this.form.password &&
        this.form.password_confirmation != this.form.password
      ) {
        this.errors["password_confirmation"] =
          "password confirmation must be same as password";
      }
    },
  },
};
</script>
