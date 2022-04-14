<!-- eslint-disable prettier/prettier -->
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

    <div class="mb-3 form-group">
      <label for="coaches" class="form-label">Select Coaches</label>
      <Multiselect
        v-model="form.coaches"
        mode="multiple"
        :close-on-select="false"
        :options="coaches"
      ></Multiselect>
      <!-- <select @change="functionz" class="form-control" name="coaches" id="coaches" multiple :class="{ 'is-invalid': errors.coaches }">
        <option disabled>Select coach</option>
        <option v-for="coach in coaches" :key="coach.id" :value="coach.id">
          {{ coach.name }}
        </option>
      </select> -->
      <span v-if="errors.coaches">{{ errors.coaches }}</span>
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
    <button type="submit" class="btn btn-primary">Add</button>
  </form>
</template>
<script>
// eslint-disable prettier/prettier
// import VsudAvatar from "@/components/VsudAvatar.vue";
// import VsudBadge from "@/components/VsudBadge.vue";
// import { Form, Field, ErrorMessage } from "vee-validate";]
import TrainingSessionsService from "../../services/GymManagers/TrainingSessionService";
import CoachService from "../../services/Coaches/CoachesService";
import GymService from "../../services/Gym/GymService";
import Swal from "sweetalert2";
import Multiselect from "@vueform/multiselect";
<style src="@vueform/multiselect/themes/default.css"></style>
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
  name: "add/edit-session",
  components: {
    Multiselect,
  },
  data() {
    return {
      value: null,
      editmode: false,
      errors: {},
      // token: "2|6kfynCaHfYggdULaqx7Kl5NEwvWIi465094zlUCF",
      form: {
        name: "",
        session_date: "",
        start_time: "",
        end_time: "",
        coaches: [],
        gym_id: "",
      },
      coaches: [],
      gyms: [],
    };
  },
  methods: {
    submit: function () {
      this.formValidation();
      // console.log(Object.keys(this.errors).length);
      // console.log(this.form.gym_id);
      console.log(this.coaches);
      if (!(Object.keys(this.errors).length > 0)) {
        TrainingSessionsService.create(this.form)
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
                session_date: "",
                start_time: "",
                end_time: "",
                coaches: [],
                gym_id: "",
              };
              this.errors = [];
              this.$refs["form"].reset();
              setTimeout(() => {
                this.$router.push("/TrainingSessions");
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
        if (key != "id" && this.form[key] === "") {
          this.errors[key] = "This " + key + "field is required";
        }
      }
    },
    getCoaches: function () {
      CoachService.getAll()
        .then((response) => {
          this.coaches = this.formatCoaches(response.data);
          console.log("hna");
          console.log(this.coaches);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    formatCoaches: function (coaches) {
      return coaches.map((coach) => {
        return {
          value: coach.id,
          label: coach.name,
        };
      });
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
    functionz: function (e) {
      console.log(e.target.value);
      this.form.coaches.push(e.target.value);
    },
  },
  created() {
    this.getCoaches();
    this.getGyms();
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
