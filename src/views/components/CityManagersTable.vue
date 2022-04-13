<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>City Manager</h6>
      <div class="card-tools">
        <router-link :to="'/citymanagers/create'"
        class="btn btn-success"
        >Add New <i class="fas fa-user-plus fa-fw"></i></router-link>
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Manager</th>
              <!-- <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Function</th> -->
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Status</th>
              <th class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">created at</th>
              <th class="text-secondary opacity-7"></th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cityManager in cityManagers" :key="cityManager.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar :img="cityManager.avatar_image" size="md" border-radius="lg" class="me-3" alt="user1"/>
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ cityManager.name }}</h6>
                    <p class="text-xs text-secondary mb-0">{{ cityManager.email }}</p>
                  </div>
                </div>
              </td>
              <!-- <td>
                <p class="text-xs font-weight-bold mb-0">Manager</p>
                <p class="text-xs text-secondary mb-0">Organization</p>
              </td> -->
              <td class="align-middle text-center text-md cursor-pointer">
                <vsud-badge :color="cityManager.ban ? 'secondary' : 'success'" variant="gradient" size="sm">
                  <!-- @click="editUserBan(cityManager.id)" -->
                  {{ cityManager.ban ? "unBan" : "Ban" }}
                </vsud-badge>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">
                  {{ cityManager.created_at }}
                </span>
              </td>
              <td class="align-middle">
                <router-link :to="'/citymanagers/' + cityManager.id + '/edit'">Edit</router-link>
              </td>

              <td class="align-middle text-center">
                <a
                  href="#"
                  @click="deleteUser(cityManager.id)"
                  style="color: red"
                >
                  <i class="fa fa-trash red"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import VsudAvatar from "@/components/VsudAvatar.vue";
import VsudBadge from "@/components/VsudBadge.vue";
import CityManagersService from "../../services/CityManagers/CityManagersService";
import Swal from "sweetalert2";
// const Toast = Swal.mixin({
//   toast: true,
//   position: "top-end",
//   showConfirmButton: false,
//   timer: 3000,
//   timerProgressBar: true,
//   didOpen: (toast) => {
//     toast.addEventListener("mouseenter", Swal.stopTimer);
//     toast.addEventListener("mouseleave", Swal.resumeTimer);
//   },
// });
export default {
  name: "city-managers-table",
  data() {
    return {
      editmode: false,
      errors: {},
      // token: "2|6kfynCaHfYggdULaqx7Kl5NEwvWIi465094zlUCF",
      cityManagers: [],
    };
  },
  components: {
    VsudAvatar,
    VsudBadge,
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
          CityManagersService.delete(userid).then((response) => {
            console.log(response);
            if (response.status == 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              this.cityManagers = this.cityManagers.filter(
                (user) => user.id != userid
              );
            }
          });
        }
      });
    },
  },
  created() {
    this.getUsers();
  },
};
</script>