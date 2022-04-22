<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>GymMembers table</h6>
      <div class="card-tools">
        <button class="btn btn-success" @click="newModal()">
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
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Member</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Gender</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Added at</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Edit</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="GymMember in GymMembers" :key="GymMember.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar :img="GymMember.avatar_image" size="md" border-radius="lg" class="me-3" alt="user image"/>
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ GymMember.name }}</h6>
                    <p class="text-xs text-secondary mb-0">{{ GymMember.email }}</p>
                  </div>
                </div>
              </td>
               <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">
                  {{GymMember.gender}}
                </span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">
                  {{GymMember.created_at}}
                </span>
              </td>
              <td class="text-center align-middle text-center ">
                <a href="#" @click="editModal(GymMember)">
                  <i class="fa fa-edit text-info cursor-pointer"></i>
                </a>
              </td>
              <td class="text-center align-middle text-center">
                <a @click.prevent="deleteUser(GymMember.id)">
                  <i class="fa fa-trash text-danger cursor-pointer"></i>
                </a>
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
            Add New
          </h5>
          <h5 class="modal-title" v-show="editmode" id="addNewLabel">
            Update User's Info
          </h5>
          <button
            type="button"
            class="btn btn-danger "
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true"><i class="fa fa-times"/></span>
          </button>
        </div>
        <form
          @submit.prevent="editmode ? updateUser() : createUser()"
          ref="myform"
        >
          <div class="modal-body">
            <div class="form-group">
              <input
                v-model="form.name"
                type="text"
                name="name"
                placeholder="Name"
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
              />
              <span v-if="errors.name" class="text-danger">{{
                errors.name[0]
              }}</span>
            </div>

            <div class="form-group">
              <input
                v-model="form.email"
                type="email"
                name="email"
                placeholder="Email Address"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
              />
              <span v-if="errors.email" class="text-danger">{{
                errors.email[0]
              }}</span>
            </div>

            <div class="form-group">
              <select
                name="gender"
                v-model="form.gender"
                id="gender"
                class="form-control"
                :class="{ 'is-invalid': errors.gender }"
              >
                <option value="" disabled selected hidden style="color: #999">
                  Select User gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <span v-if="errors.gender" class="text-danger">{{
                errors.gender[0]
              }}</span>
            </div>

            <div v-if="!editmode" class="form-group">
              <input
                v-model="form.password"
                placeholder="Pssword"
                type="password"
                name="password"
                id="password"
                class="form-control"
                :class="{ 'is-invalid': errors.password }"
              />
              <span v-if="errors.password" class="text-danger">{{
                errors.password[0]
              }}</span>
            </div>
            <div v-if="!editmode" class="form-group">
              <input
                v-model="form.password_confirmed"
                type="password"
                placeholder="Confirmed Password"
                name="password_confirmed"
                id="password_confirmed"
                class="form-control"
                :class="{ 'is-invalid': errors.password_confirmed }"
              />
              <span v-if="errors.password_confirmed" class="text-danger">{{
                errors.password_confirmed[0]
              }}</span>
            </div>
            <div class="form-group">
              <input
                v-model="form.date_of_birth"
                type="date"
                placeholder="Date Of Birth"
                ref="birthdaydate"
                name="date_of_birth"
                id="date_of_birth"
                class="form-control"
                :class="{ 'is-invalid': errors.date_of_birth }"
              />
              <span v-if="errors.date_of_birth" class="text-danger">{{
                errors.date_of_birth[0]
              }}</span>
            </div>
            <div v-if="!editmode" class="form-group">
              <div v-if="!image">
                <h4>Select an image</h4>
                <input
                  @change="handleFileUpload($event)"
                  type="file"
                  placeholder="avatar_image"
                  name="avatar_image"
                  id="avatar_image"
                  class="form-control"
                  :class="{ 'is-invalid': errors.avatar_image }"
                />
               
              </div>
              <div v-else >
                <img :src="image" width="200" height="200" />
                <button class="btn btn-danger d-block btn-sm mt-2" @click="removeImage">Remove image</button>
              </div>
               <span v-if="errors.avatar_image" class="text-danger">{{
                  errors.avatar_image[0]
                }}</span>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              ref="closebtn"
            >
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
import GymMemberService from "../../services/GymMembers/GymMemberService";
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
  name: "GymMembers-Table",
  data() {
    return {
      editmode: false,
      image: '',
      form: {
        id: "",
        name: "",
        email: "",
        password: "",
        password_confirmed: "",
        gender: "",
        date_of_birth: "",
        avatar_image: "",
      },
      errors: {},
      GymMembers: [],
    };
  },
  components: {
    VsudAvatar
  },
  methods: {
    getUsers: function () {
      GymMemberService.getAll()
        .then((response) => {
          this.GymMembers = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleFileUpload:function(event) {
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
      this.image = '';
      this.form.avatar_image="";
    },
    createUser: function () {
      this.FrontVlidation();
      if (!Object.keys(this.errors).length) {
        let myform = this.$refs["myform"];
        let formData = new FormData();
        formData.append("name", this.form.name);
        formData.append("email", this.form.email);
        formData.append("password", this.form.password);
        formData.append("password_confirmed", this.form.password_confirmed);
        formData.append("gender", this.form.gender);
        formData.append("date_of_birth", this.form.date_of_birth);
        formData.append("avatar_image", this.form.avatar_image);
        GymMemberService.create(formData)
          .then((response) => {
            console.log(response);
            if (response.data.status == "error") {
              this.errors = response.data.errors;
              console.log(this.errors);
            } else if (response.data.status == "success") {
              this.GymMembers.push(response.data.data)
              // this.GymMembers = response.data.data;
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
              this.image="";
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
      this.FrontVlidation();
      if (!Object.keys(this.errors).length) {
        let myform = this.$refs["myform"];
        let formData = new FormData();
        formData.append("id", this.form.id);
        formData.append("name", this.form.name);
        formData.append("email", this.form.email);
        // formData.append("password", this.form.password);
        // formData.append("password_confirmed", this.form.password_confirmed);
        formData.append("gender", this.form.gender);
        formData.append("date_of_birth", this.form.date_of_birth);
        // formData.append("avatar_image", this.form.avatar_image);
        GymMemberService.update(this.form.id, formData)
          .then((response) => {
            console.log(response);
            if (response.data.status == "error") {
              this.errors = response.data.errors;
              console.log(this.errors);
            } else if (response.data.status == "success") {
                this.GymMembers.forEach((user) => {
                if (user.id == this.form.id) {
                   user.name = this.form.name;
                   user.email= this.form.email;
                   user.date_of_birth= this.form.date_of_birth;
                   user.gender = this.form.gender; 
                }
              });
              console.log("GymMembers",this.GymMembers);
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
              this.image="";
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
          GymMemberService.delete(userid).then((response) => {
            if (response.data.message == "deleted") {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              let targetid = 0;
              for (let i = 0; i < this.GymMembers.length; i++) {
                if (this.GymMembers[i].user_id == userid) {
                  targetid = i;
                  break;
                }
              }
              this.GymMembers.splice(targetid, 1);
            }
          });
        }
      });
    },
    editModal: function (GymMember) {
      this.editmode = true;
      let triggerModal = this.$refs["triggerModal"];
      triggerModal.click();
      this.image=GymMember.avatar_image;
      this.form.id = GymMember.id;
      this.form.name = GymMember.name;
      this.form.email = GymMember.email;
      // this.form.password = GymMember.password;
      // this.form.password_confirmed = GymMember.password;
      this.form.gender = GymMember.gender;
      this.form.date_of_birth = GymMember.date_of_birth;
      // this.form.avatar_image = GymMember.avatar_image;
    },
    newModal() {
      this.editmode = false;
      let triggerModal = this.$refs["triggerModal"];
      triggerModal.click();
    },
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
      if (!this.form.gender) {
        this.errors["gender"] = ["gender is required"];
      }
      if (!this.form.date_of_birth) {
        this.errors["date_of_birth"] = ["date_of_birth is required"];
      }
      if (!this.editmode&&!this.form.password) {
        this.errors["password"] = ["password is required"];
      } else if (!this.editmode&&this.form.password.length < 8) {
        this.errors["password"] = ["password must be at least 8 characters"];
      }
      if (!this.editmode&&!this.form.password_confirmed) {
        this.errors["password_confirmed"] = ["password_confirmed is required"];
      } else if (
        !this.editmode&&
        this.form.password &&
        this.form.password_confirmed != this.form.password
      ) {
        this.errors["password_confirmed"] = ["two password must be equal"];
      }
    },
    validEmail: function (email) {
      var emailRegExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegExp.test(email);
    },
    setMaxDateToToday: function () {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }

      today = yyyy + "-" + mm + "-" + dd;
      let mydate = this.$refs["birthdaydate"];
      mydate.setAttribute("max", today);
    },
  },
  created() {
    this.getUsers();
  },
  mounted() {
    this.setMaxDateToToday();
  },
};
</script>

