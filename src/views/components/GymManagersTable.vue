<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Gym Managers</h6>
      <div class="card-tools">
        <button class="btn btn-success" @click="newModal(true)">
          Add New <i class="fas fa-user-plus fa-fw"></i>
        </button>
        <button
          class="btn btn-success"
          ref="triggerModal"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          hidden
        ></button>
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Manager</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Status</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Gym</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Added at</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Edit</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="gym_manager in gym_managers" :key="gym_manager.gym_manager_id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar :img="gym_manager.avatar_image" size="md" border-radius="lg" class="me-3" alt="user image"/>
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ gym_manager.name }}</h6>
                    <p class="text-xs text-secondary mb-0">{{ gym_manager.email }}</p>
                  </div>
                </div>
              </td>
              <td class="align-middle text-center text-md cursor-pointer">
                <vsud-badge :color="gym_manager.ban ? 'secondary' : 'success'" variant="gradient" size="sm">
                  {{ gym_manager.ban ? "unBan" : "Ban" }}
                </vsud-badge>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">
                  {{gym_manager.gym ? gym_manager.gym.name : ""}}
                </span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">
                  {{gym_manager.created_at}}
                </span>
              </td>
              <td class="align-middle text-center">
                  <i class="fa fa-edit text-info cursor-pointer" @click="editModal(gym_manager, false)"></i>
              </td>
              <td class="align-middle text-center">
                  <i class="fa fa-trash text-danger cursor-pointer" @click="deleteUser(gym_manager.gym_manager_id)"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" v-show="!editmode" id="addNewLabel">
            Add New
          </h5>
          <h5 class="modal-title" v-show="editmode" id="addNewLabel">
            Update User's Info
          </h5>
          <button
            type="button"
            class="close btn btn-danger"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">X</span>
          </button>
        </div>
        <form @submit.prevent="editmode ? updateUser() : createUser()" ref="myform">
          <div class="modal-body">
            <div class="form-group">
              <input v-model="form.name" type="text" name="name" placeholder="Name" class="form-control" :class="{ 'is-invalid': errors.name }"/>
              <span v-if="errors.name" class="text-danger">{{errors.name[0]}}</span>
            </div>
            <div class="form-group">
              <input v-model="form.email" type="email" name="email" placeholder="Email Address" class="form-control" :class="{ 'is-invalid': errors.email }"/>
              <span v-if="errors.email" class="text-danger">{{errors.email[0]}}</span>
            </div>

            <div class="form-group">
              <input v-model="form.password" v-show="isAddUser == true" placeholder="Pssword" type="password" name="password" id="password" class="form-control" :class="{ 'is-invalid': errors.password }"/>
              <span v-if="errors.password" class="text-danger">{{errors.password[0]}}</span>
            </div>
            <div class="form-group">
              <input v-show="isAddUser == true" v-model="form.password_confirmed" type="password" placeholder="Confirmed Password" name="password_confirmed" id="password_confirmed" class="form-control" :class="{ 'is-invalid': errors.password_confirmed }"/>
              <span v-if="errors.password_confirmed" class="text-danger">{{errors.password_confirmed[0]}}</span>
            </div>
            <div class="form-group">
              <div v-if="!image">
                <h4>Select an image</h4>
                <input @change="handleFileUpload($event)" type="file" placeholder="avatar_image" name="avatar_image" id="avatar_image" class="form-control" :class="{ 'is-invalid': errors.avatar_image }"/>
              </div>
              <div v-else>
                <img :src="image" width="200" height="200" />
                <button class="btn btn-danger d-block btn-sm mt-2" @click="removeImage">
                  Remove image
                </button>
              </div>
              <span v-if="errors.avatar_image" class="text-danger">{{errors.avatar_image[0]}}</span>
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
import VsudAvatar from "@/components/VsudAvatar.vue";
import VsudBadge from "@/components/VsudBadge.vue";
import GymManagersService from "../../services/GymManagers/GymManagersService";
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
  name: "GymManagers-Table",
  data() {
    return {
      editmode: false,
      isAddUser: false,
      image: "",
      form: {
        gym_manager_id: "",
        name: "",
        email: "",
        password: "",
        password_confirmed: "",
        avatar_image: "",
      },
      formTest: {
        name: "",
        email: "",
      },
      errors: {},
      gym_managers: [],
    };
  },
  components: {
    VsudAvatar,
    VsudBadge
  },
  methods: {
    getUsers: function () {
      GymManagersService.getAll()
        .then((response) => {
          this.gym_managers = response.data;
          console.log(this.gym_managers);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleFileUpload: function (event) {
      this.form.avatar_image = event.target.files[0];
      this.createImage(event.target.files[0]);
    },
    createImage(file) {
      // var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function () {
      this.image = "";
      this.form.avatar_image = "";
    },












    createUser: function () {
      // this.isAddUser=true;
      this.FrontVlidation();
      if (!Object.keys(this.errors).length) {
        let myform = this.$refs["myform"];
        let formData = new FormData(myform);
        formData.append("avatar_image", this.form.avatar_image);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        GymManagersService.create(formData, config)
          .then((response) => {
            console.log(response);
            if (response.data.error) {
              this.errors = response.data.error;
              console.log(this.errors);
            } else {
              this.gym_managers.push(response.data);
              // this.gym_managers = response.data;
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
                gender: "",
                date_of_birth: "",
                avatar_image: "",
              };
              this.image = "";
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
    updateUser: function () {
       this.isAddUser=false;
      this.FrontVlidation();
      if (!Object.keys(this.errors).length) {
        let myform = this.$refs["myform"];
        let formData = new FormData();
         console.log(this.form)
        console.log(formData)
        formData.append("avatar_image", this.form.avatar_image);
        formData.append("email", this.form.email);
        formData.append("name", this.form.name);
        formData.append("id", this.form.gym_manager_id);
       
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
         GymManagersService.update(this.form.gym_manager_id, formData, config)
          .then((response) => {
            console.log(response)
            if (response.data.error) {
              this.errors = response.data.errors;
              console.log(this.errors);
            } else if (response.status == 200) {
              this.gym_managers.forEach((user) => {
                if (user.gym_manager_id == this.form.gym_manager_id) {
                  user.name = this.form.name;
                  user.email = this.form.email;
                }
              });
              console.log(this.gym_managers);
              Toast.fire({
                icon: "success",
                title: "updated successfully",
              });
              this.form = {
                id: "",
                name: "",
                email: "",
                password: "",
                password_confirmed: "",
                gender: "",
                date_of_birth: "",
                avatar_image: "",
              };
              this.image = "";
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
    deleteUser: function (userid) {
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
          GymManagersService.delete(userid).then((response) => {
            console.log(response);
            if (response.data.status == "success") {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              this.gym_managers = this.gym_managers.filter(
                (user) => user.gym_manager_id != userid
              );
            }
            else{
              Swal.fire("Error", response.data.error, "error");
            }
          });
        }
      });
    },
    editModal: function (gym_manager, isAddUser) {
      this.isAddUser = isAddUser;
      this.editmode = true;
      let triggerModal = this.$refs["triggerModal"];
      triggerModal.click();
      this.image =gym_manager.avatar_image;
        // "http://drive.google.com/uc?export=view&id=" + gym_manager.avatar_image;
      this.form.gym_manager_id = gym_manager.gym_manager_id;
      this.form.name = gym_manager.name;
      this.form.email = gym_manager.email;
      //   this.form.password = gym_manager.password;
      //   this.form.password_confirmed = gym_manager.password;
      //   this.form.gender = gym_manager.gender;
      //   this.form.date_of_birth = gym_manager.date_of_birth;
      this.form.avatar_image = gym_manager.avatar_image;
    },
    newModal(isAddUser) {
      this.isAddUser = isAddUser;
      this.editmode = false;
      let triggerModal = this.$refs["triggerModal"];
      triggerModal.click();
    },
    // getImageUrl(avatar_image_id) {
    //   return "http://drive.google.com/uc?export=view&id=" + avatar_image_id;
    // },
    FrontVlidation() {
      this.errors = {};
      if (!this.form.name) {
        this.errors["name"] = ["name is required"];
      }
      if (!this.form.email) {
        this.errors["email"] = ["email is required"];
      } else if (!this.validEmail(this.form.email)) {
        this.errors["email"] = ["email should be a valid one"];
      }

      //   if (!this.form.password) {
      //     this.errors["password"] = ["password is required"];
      //   } else if (this.form.password.length < 8) {
      //     this.errors["password"] = ["password must be at least 8 characters"];
      //   }
      //   if (!this.form.password_confirmed) {
      //     this.errors["password_confirmed"] = ["password_confirmed is required"];
      //   } else if (
      //     this.form.password &&
      //     this.form.password_confirmed != this.form.password
      //   ) {
      //     this.errors["password_confirmed"] = ["two password must be equal"];
      //   }

      // if (!this.form.avatar_image) {
      //   this.errors["avatar_image"] = ["avatar_image is required"];
      // }
    },
    validEmail: function (email) {
      var emailRegExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegExp.test(email);
    },
  },
  created() {
    this.getUsers();
  },
};
</script>

