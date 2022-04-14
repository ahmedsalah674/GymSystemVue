<!-- eslint-disable prettier/prettier -->
<template>
  <form
    @submit.prevent="submit"
    ref="form"
    autocomplete="off"
    enctype="multipart/form-data"
  >

    <div class="mb-3 form-group">
      <label for="day" class="form-label">Date</label>
      <input
        v-model="form.session_date"
        type="date"
        class="form-control"
        id="day"
        name="day"
        placeholder="day"
        :class="{ 'is-invalid': errors.day }"
      />
      <span v-if="errors.day">{{ errors.day }}</span>
    </div>

    <div class="mb-3 form-group">
      <label for="start_time" class="form-label">Start time</label>
      <input
        type="time"
        name="start_time"
        class="form-control"
        id="start_time"
        v-model="form.start_time"
        :class="{ 'is-invalid': errors.start_time }"
      />
      <span v-if="errors.start_time">{{ errors.start_time }}</span>
    </div>

    <div class="mb-3 form-group">
      <label for="finish_time" class="form-label">Finish time</label>
      <input
        type="time"
        name="end_time"
        class="form-control"
        id="end_time"
        v-model="form.end_time"
        :class="{ 'is-invalid': errors.end_time }"
      />
      <span v-if="errors.end_time">{{ errors.end_time }}</span>
    </div>

    <button type="submit" class="btn btn-primary">Edit</button>
  </form>
</template>
<script>
/* eslint-disable prettier/prettier */
// import VsudAvatar from "@/components/VsudAvatar.vue";
// import VsudBadge from "@/components/VsudBadge.vue";
// import { Form, Field, ErrorMessage } from "vee-validate";]
import TrainingSessionsService from "../../services/GymManagers/TrainingSessionService";
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
  name: "edit-session",
  data() {
    return {
      editmode: false,
      errors: {},
      // token: "2|6kfynCaHfYggdULaqx7Kl5NEwvWIi465094zlUCF",
      form: {
        id: this.$route.params.id,
        session_date: "",
        start_time: "",
        end_time: "",
      },
      sessions: [],
    };
  },
  methods: {
    getSession:function(){
      TrainingSessionsService.get(this.form.id).then((response) => {
          if(response.data.error){
            console.log("not found message");
          }
          this.form.session_date = response.data.session_date;
          this.form.start_time = response.data.start_time;
          this.form.end_time = response.data.end_time;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    submit: function () {
      this.formValidation();
      if (!(Object.keys(this.errors).length > 0)) {
        TrainingSessionsService.update(this.form.id,this.form).then((response) => {
            if (response.data.error) {
              console.log(response.data.error);
              this.errors = response.data.error;
            } else {
              Toast.fire({
                icon: "success",
                title: "Updated successfully",
              });
              setTimeout(() => {
              this.$router.push("/TrainingSessions");
              }, 3000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    formValidation: function () {
      this.errors = {};
      for (const key in this.form) {
        if (this.form[key] === "") {
          this.errors[key] = "This " + key + "field is required";
        }
      }
    },
  },
  created() {
    this.getSession();
  },
};
</script>
