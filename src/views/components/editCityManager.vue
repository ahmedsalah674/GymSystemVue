<template>
  <form @submit.prevent="submit" ref="form" autocomplete="off">
    <div class="mb-3 form-group">
      <label for="name" class="form-label">Name</label>
      <input v-model="form.name" type="text" class="form-control" id="name" name="name" :class="{ 'is-invalid': errors.name }"/>
      <span v-if="errors.name"> {{ errors.name }} </span>
    </div>

    <div class="mb-3 form-group">
      <label for="email" class="form-label">Email address</label>
      <input v-model="form.email" type="email" class="form-control" id="email" name="email" placeholder="Email" :class="{ 'is-invalid': errors.email }"/>
      <span v-if="errors.email">{{ errors.email }}</span>
    </div>
    <!-- <div class="mb-3 form-group">
      <label for="role" class="form-label">Role</label>
      <select class="form-control" name="role" id="role" :class="{ 'is-invalid': errors.role }">
        <option value="">Select role</option>
        <option value="admin">Admin</option>
        <option value="city_manager">City manager</option>
        <option value="user">User</option>
      </select> -->

    <button type="submit" class="btn btn-primary">Edit</button>
  </form>
</template>
<script>
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
  name: "edit-city-manager",
  data() {
    return {
      errors: {},
      // token: "2|6kfynCaHfYggdULaqx7Kl5NEwvWIi465094zlUCF",
      form: { id: this.$route.params.id, name: "", email: "" },
    };
  },
  methods: {
    getUser: function () {
      CityManagersService.get(this.form.id)
        .then((response) => {
            if(response.data.error){
              console.log("not found message");
            }
          this.form.name = response.data.name;
          this.form.email = response.data.email;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    submit: function () {
      this.formValidation();
      if (!Object.keys(this.errors).length) {
        let formData = new FormData(this.$refs["form"]);
        CityManagersService.update(this.form.id,formData)
          .then((response) => {
            if (response.data.error) {
              this.errors = response.data.error;
            } else {
              Toast.fire({
                icon: "success",
                title: "Updated successfully",
              });
              setTimeout(() => {
                this.$router.push("/citymanagers");}, 3000);   // Redirect to the city managers page after 3 seconds
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    formValidation() {
      this.errors = {};
      for (const key in this.form) {
        if (this.form[key] === "") {
          this.errors[key] = "This field is required";
        }
      }
    },
  },

  created() {
    this.getUser();
  },
};
</script>