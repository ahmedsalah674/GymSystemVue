<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Cities</h6>
      <div class="card-tools">
        <button class="btn btn-success" ref="triggerModal" data-bs-toggle="modal" data-bs-target="#exampleModal"
        >Add City <i class="fas fa-user-plus fa-fw"></i> </button>
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table mb-0">
          <thead>
            <tr>
              <th class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">City Name</th>
              <th class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Edit</th>
              <th class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="city in Cities" :key="city.id">
              <td class="text-center align-middle">
                {{ city.name }}
              </td>
              <td class="align-middle text-center">
                <i class="fa fa-edit text-info cursor-pointor" @click.prevent="editModal(city)"/>
              </td>
              <td class="align-middle text-center">
                <i class="fa fa-trash text-danger cursor-pointor" @click="deleteCity(city.id)"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" v-show="!editmode" id="addNewLabel">
            Add New City
          </h5>
          <h5 class="modal-title" v-show="editmode" id="addNewLabel">
            Update City's Info
          </h5>
          <button @click="editmode=false" type="button" class="close btn btn-danger" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">
              <i class="fas fa-times fa-fw"></i>
            </span>
          </button>
        </div>
        <form @submit.prevent="editmode ? updateCity() :  createCity()" ref="myform">
          <div class="modal-body">
            <div class="form-group">
              <input v-model="form.name" type="text" name="name" placeholder="Name" class="form-control" :class="{ 'is-invalid': errors.name }"/>
              <span v-if="errors.name" class="text-danger">{{errors.name[0]}}</span>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" ref="closebtn">
              Close
            </button>
            <button v-show="editmode" type="submit" class="btn btn-success">
              Update
            </button>
            <button v-show="!editmode" type="submit" class="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import CityService from "../../services/City/CityService";
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
  name: "Cities-Table",
  data() {
    return {
      editmode: false,
      form: {
        id: "",
        name: "",
      },
      errors: {},
      Cities: [],
    };
  },
  components: {},
  methods: {
    getCities: function () {
      CityService.getAll()
        .then((response) => {
          this.Cities = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    createCity: function () {
      this.FrontVlidation();
      if (!Object.keys(this.errors).length) {
        let myform = this.$refs["myform"];
        let formData = new FormData(myform);
        CityService.create(formData).then((response) => {
            console.log(response);
            if (response.data.error) {
              this.errors = response.data.error;
            } else {
              this.Cities.push(response.data);
              Toast.fire({
                icon: "success",
                title: "Created successfully",
              });
              this.form = {id: "",name: ""};
              this.errors = [];
              myform.reset();
              this.$refs["closebtn"].click();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    updateCity: function () {
      this.FrontVlidation();
      if (!Object.keys(this.errors).length) {
        let myform = this.$refs["myform"];
        let formData = new FormData(myform);
         CityService.update(this.form.id, formData)
         .then((response) => {
            console.log(response)
            if (response.data.error) {
              this.errors = response.data.errors;
              console.log(this.errors);
            } else if (response.status == 200) {
              this.Cities.forEach((city) => {
                if (city.id == this.form.id) {
                  city.name = this.form.name;
                }
              });
              console.log(this.Cities);
              Toast.fire({
                icon: "success",
                title: "updated successfully",
              });
              this.form = {
                id: "",
                name: "",
              };
              this.errors = [];
              myform.reset();
              this.$refs["closebtn"].click();
            }
          })
            .catch((err) => {
            console.log(err);
          });
      }
    },
    deleteCity: function (cityId) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          CityService.delete(cityId).then((response) => {
            console.log(response);
            if (response.status == 204) {
              Swal.fire("Deleted!", "city has been deleted.", "success");
              this.Cities = this.Cities.filter(
                (city) => city.id != cityId
              );
            }
          });
        }
      });
    },
    editModal: function (city) {
      this.editmode = true;
      this.$refs["triggerModal"].click();
      this.form.name = city.name;
      this.form.id = city.id;
    },
    FrontVlidation() {
      this.errors = {};
      if (!this.form.name) {
        this.errors["name"] = ["name is required"];
      }
    },
  },
  created() {
    this.getCities();
  },
};
</script>

