<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Gyms</h6>
      <div class="card-tools">
        <router-link :to="'/gyms/create'" class="btn btn-success"
          >Add New Gym <i class="fas fa-user-plus fa-fw"></i
        ></router-link>
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="
                  text-center text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                Name
              </th>
              <th
                class="
                  text-center text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                City
              </th>
              <th
                class="
                  text-center text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                City Manager
              </th>
              <th class="text-center text-secondary opacity-7">Gym Managers</th>
              <th class="text-center text-secondary opacity-7">Edit</th>
              <th class="text-center text-secondary opacity-7">Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="gym in gyms" :key="gym.id">
              <td class="align-middle text-center">
                {{ gym.name }}
              </td>
              <td v-if="gym.city" class="align-middle text-center">
                {{ gym.city.name }}
              </td>
              <td class="align-middle text-center">
                {{ gym.city.city_manager ? gym.city.city_manager.name : "" }}
              </td>
              <td class="text-center w-5 text-success">
                <i
                  class="fa fa-eye cursor-pointer"
                  ref="triggerModal"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  @click="viewManagers(gym.gym_managers)"
                ></i>
              </td>

              <td class="text-center text-center">
                <router-link
                  :to="'/gyms/' + gym.id + '/edit'"
                  class="text-info"
                >
                  <i class="fas fa-edit"></i>
                </router-link>
              </td>

              <td class="align-middle text-center text-danger">
                <i class="fa fa-trash" @click="deleteGym(gym.id)"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Gym Managers</h5>
            <button
              type="button"
              class="btn btn-light close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true"><i class="fa fa-close"></i></span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th class="text-center" v-if="gym_managers.length === 1">
                    Gym Manager Name
                  </th>
                  <th class="text-center" v-if="gym_managers.length > 1">
                    Gym Managers Names -- {{ gym_managers.length }}
                  </th>
                  <th class="text-center" v-if="gym_managers.length === 0">
                    No Gym Managers
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="gym_managers.length === 0">
                  <td>---</td>
                </tr>
                <tr v-for="gym_manager in gym_managers" :key="gym_manager.id">
                  <td>{{ gym_manager.name }}</td>
                </tr>
              </tbody>
            </table>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GymService from '../../services/Gym/GymService';
import Swal from "sweetalert2";
export default {
  name: "city-managers-table",
  data() {
    return {
      errors: {},
      gyms: [],
      gym_managers:[],
    };
  },
  methods: {
    getGyms: function () {
      GymService.getAll()
        .then((response) => {
          this.gyms = response.data.data;
          // console.log(this.gyms);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    viewManagers:function(gym_managers){
      console.log(gym_managers);
      this.gym_managers = gym_managers;
    },
    deleteGym: function (gymid) {
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
          GymService.delete(gymid).then((response) => {
            console.log(response);
            if (response.data.status == 'success') {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              this.gyms = this.gyms.filter(
                (gym) => gym.id != gymid
              );
            }
            else{
              Swal.fire("Error!", response.data.console.error, "error");
            }
          });
        }
      });
    },
  },
  created() {
    this.getGyms();
  },
};
</script>