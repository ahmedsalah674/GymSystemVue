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
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Status</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">City</th>
              <th class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Added at</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">update</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">delete</th>
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
              <td class="align-middle text-center text-md cursor-pointer">
                <vsud-badge :color="cityManager.ban ? 'secondary' : 'success'" variant="gradient" size="sm">
                  <!-- @click="editUserBan(cityManager.id)" -->
                  {{ cityManager.ban ? "unBan" : "Ban" }}
                </vsud-badge>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">
                  {{ cityManager.city }}
                </span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">
                  {{ cityManager.created_at }}
                </span>
              </td>
              <td class="align-middle text-center">
                <router-link :to="'/citymanagers/' + cityManager.id + '/edit'">
                  <i class="fa fa-edit text-info cursor-pointer"></i>
                </router-link>
              </td>

              <td class="align-middle text-center">
                  <i class="fa fa-trash text-danger cursor-pointer" @click="deleteUser(cityManager.id)"></i>
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
export default {
  name: "city-managers-table",
  data() {
    return {
      editmode: false,
      errors: {},
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
            if (response.data.status == "sucsess") {
              Swal.fire("Deleted!", response.data.message, "success");
              this.cityManagers = this.cityManagers.filter(
                (user) => user.id != userid
              );
            }
            else {
              Swal.fire("Error!", response.data.error, "error");
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