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
          <select
            v-model="form.city_id"
            class="form-control"
            name="city_id"
            id="city_id"
            :class="{ 'is-invalid': errors.city_id }"
          >
            <option disabled>Select City</option>
            <option v-for="city in cities" :key="city.id" :value="city">
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
        <div class="text-center">
          <button type="submit" class="form-control btn btn-primary">
            Edit
          </button>
        </div>
      </form>
    </div>
  </div>

 <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Gym Managers</h6>
      <div class="card-tools">
        <button class="btn btn-success" ref="triggerModal" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add Manager 
        <i class="fas fa-user-plus fa-fw"></i>
        </button>
      </div>
    </div>
    <div class="card-body pl-1 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class=" text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Manager</th>
              <th class=" text-center text-secondary opacity-7">Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="gym_manager in gym_managers" :key="gym_manager.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar :img="gym_manager.avatar_image" size="md" border-radius="lg" class="me-3" alt="manager image"/>
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ gym_manager.name }}</h6>
                    <p class="text-xs text-secondary mb-0">{{ gym_manager.email }}</p>
                  </div>
                </div>
              </td>
              <td class="align-middle text-center">
                  <i v-if="gym_managers.length>1" class="fa fa-trash text-danger cursor-pointer " @click="deleteGymManager(gym_manager.gym_manager_id)"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addNewLabel" >
            Add Manager
          </h5>
          <button type="button" class="close btn btn-danger" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">X</span>
          </button>
        </div>
        <form @submit.prevent="addManager()" ref="myform">
          <div class="modal-body">
            <div class="mb-3 form-group">
              <label for="city" class="form-label">Gym Manager</label>
              <select v-model="form.gym_manager" class="form-control" name="gym_manager_id" id="gym_manager_id" :class="{ 'is-invalid': errors.gym_manager_id }">
                <option disabled>Select Manager</option>
                <option v-for="manager in all_gym_managers" :key="manager.id" :value="manager" >
                  {{ manager.name }}
                </option>
              </select>
              <span v-if="errors.gym_manager_id">{{ errors.gym_manager_id[0] }}</span>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" ref="closebtn">
              Close
            </button>
            <button type="submit" class="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>
<script>
import CityService from "../../services/City/CityService";
import GymService from "../../services/Gym/GymService";
import GymManagersService from "../../services/GymManagers/GymManagersService";
import VsudAvatar from "@/components/VsudAvatar.vue";
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
  name: "add-gym",
  components: { VsudAvatar },
  data() {
    return {
      form: { id: this.$route.params.id, name: "", city_id: "" , gym_manager: ""},
      errors: {},
      gym_managers: [],
      all_gym_managers: [],
      cities: [],
      new_manager:{gym_manager_id:"",gym_id:""} ,
    };
  },
  methods: {
    getGym: function () {
      GymService.get(this.form.id)
        .then((response) => {
          if (response.data.status == "error") {
            Toast.fire({ icon: "error", title: response.data.error });
            setTimeout(() => {
              this.$router.push("/gyms");
            }, 3000);
          }
          console.log("response", response.data);
          this.form.name = response.data.name;
          this.form.city_id = response.data.city;
          for (let i = 0; i < response.data.gym_managers.length; i++) {
            this.gym_managers.push(response.data.gym_managers[i]);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    submit: function () {
      this.formValidation();
      if (!(Object.keys(this.errors).length > 0)) {
        this.form.city_id = this.form.city_id.id;
        console.log(this.form);
        GymService.update(this.form.id, this.form)
          .then((response) => {
            if (response.data.status == "error") {
              console.log(response.data.errors);
              console.log("error henaa");
              this.errors = response.data.errors;
            } else {
              Toast.fire({ icon: "success", title: "Updated successfully" });
              this.form = { id: this.form.id, name: "", city_id: "" };
              this.errors = [];
              this.$refs["form"].reset();
              setTimeout(() => {
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
        if (
          key != "id" && this.form[key] === "" && this.form[key] === null){
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
    deleteGymManager: function (id) {
      GymService.removeManager({
        gym_manager_id: id,
        gym_id: this.form.id,
      }).then((response) => {
        if (response.data.status == "error") {
          Toast.fire({ icon: "error", title: response.data.error });
        } else {
          Toast.fire({ icon: "success", title: "Removed successfully" });
          this.gym_managers = this.gym_managers.filter(
            (gym_manager) => gym_manager.gym_manager_id != id
          );
          this.getAllManagers();
        }
      });
    },
    getAllManagers:function(){
      GymManagersService.getWithoutGyms().then((response) => {
        this.all_gym_managers = response.data;
      });  
    },
    addManager:function(){
      // console.log(this.form.gym_manager);
      this.new_manager={gym_manager_id:this.form.gym_manager.gym_manager_id,gym_id:this.form.id}
      GymService.addManager(this.new_manager)
      .then((response) => {
        if (response.data.status == "error") {
          this.errors = response.data.errors;
        } else {
          Toast.fire({ icon: "success", title: "Added successfully" });
          this.gym_managers.push(this.form.gym_manager);
          this.form.gym_manager_id = "";
          this.getAllManagers();
        }
      });
    }
  },
  created() {
    this.getGym();
    this.getCities();
    this.getAllManagers();
  },
};
</script>