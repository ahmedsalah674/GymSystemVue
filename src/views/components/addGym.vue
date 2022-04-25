<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <form @submit.prevent="submit" ref="form" autocomplete="off">
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
          <span v-if="errors.name"> {{ errors.name[0] }}</span>
        </div>

        <div class="mb-3 form-group">
          <label for="city" class="form-label">City</label>
           <select v-model="form.city_id" class="form-control" name="city_id" id="city_id" :class="{ 'is-invalid': errors.city_id }">
            <option disabled>Select City</option>
            <option v-for="city in cities" :key="city.id" :value="city" >
              {{ city.name }}
            </option>
          </select>
          <span v-if="errors.city_id">{{ errors.city_id[0] }}</span>
        </div>

        <div v-if="form.city_id" class="mb-3 form-group">
          <label for="name" class="form-label">City Manager Name</label>
          <input
            v-if="form.city_id.city_manager"
            v-model="form.city_id.city_manager.name"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.city_manager_id }"
            disabled
          />
        </div>

        <div class="mb-3 form-group">
          <label for="coaches" class="form-label">Select Gym Managers</label>
          <Multiselect name="gym_managers" v-model="form.gym_managers" mode="tags" :searchable="true" 
           :close-on-select="false" :options="gym_managers" :multiple="true"  
          ></Multiselect>
          <span v-if="errors.gym_managers">{{ errors.gym_managers[0] }}</span>
        </div>

        <div class="text-center">
          <button type="submit" class="form-control btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import GymManagersService from "../../services/GymManagers/GymManagersService";
import CityService from "../../services/City/CityService";
// import CoachService from "../../services/Coaches/CoachesService";
import GymService from "../../services/Gym/GymService";
import Swal from "sweetalert2";
import Multiselect from "@vueform/multiselect";
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
  name: "add-gym",
  components: {
    Multiselect,
  },
  data() {
    return {
        form: {
            name: "",
            city_id: "",
            gym_managers: [],
        },
      value: null,
      errors: {},
      gym_managers: [],
      cities: [],
    };
  },
  methods: {
    submit: function () {
      this.formValidation();
      if (!(Object.keys(this.errors).length > 0)) {
        this.form.city_id=this.form.city_id.id
        console.log(this.form)
        GymService.create(this.form)
          .then((response) => {
            if (response.data.status=="error") {
              console.log(response.data.errors);
              console.log("error henaa")
              this.errors = response.data.errors;
            } else {
              Toast.fire({
                icon: "success",
                title: "Created successfully",
              });
              this.form= {
                name: "",
                city_id: "",
                gym_managers: [],
              },
              this.errors = [];
              this.$refs["form"].reset();
              setTimeout(() => {
                console.log("henaaa");
                this.$router.push("/gyms");
              }, 3000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log(this.errors);
      }
    },
    formValidation: function () {
      this.errors = {};
      for (const key in this.form) {
        if (key != "id" && (this.form[key]==="" ||this.form[key].length==0) ) {
          this.errors[key] = "This field is required";
        }
      }
    },
    getCities: function () {
      CityService.getAll()
        .then((response) => {
          this.cities = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    formatGymManagers: function (gym_managers) {
      return gym_managers.map((manager) => {
        console.log(manager);
        return {
          value: manager.gym_manager_id,
          label: manager.name,
          // manager: city.city_manager.name,
        };
      });
    },
    getGymManangers: function () {
      GymManagersService.getWithoutGyms()
        .then((response) => {
          this.gym_managers = this.formatGymManagers(response.data);
          // console.log(this.gym_managers);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.getCities();
    this.getGymManangers();
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
