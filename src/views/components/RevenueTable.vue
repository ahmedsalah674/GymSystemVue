<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Revenue</h6>
      <div class="card-tools">
        <input
          v-model="search"
          type="search"
          class="form-control my-3"
          placeholder="Search by userName ..."
        />
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
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                User
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                  text-center
                "
              >
                Package
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                  text-center
                "
              >
                Gym
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                  text-center
                "
              >
                Paid Amount
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                  text-center
                "
              >
                delete
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="revenue in array" :key="revenue.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar
                      :img="revenue.avatar_image"
                      size="md"
                      border-radius="lg"
                      class="me-3"
                      alt="user1"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ revenue.name }}</h6>
                    <p class="text-xs text-secondary mb-0">
                      {{ revenue.email }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="text-center align-middle">
                 <span class="text-secondary text-xs font-weight-bold">
                {{ revenue.package_name }}
                </span>
              </td>
              <td class="text-center align-middle">
                 <span class="text-secondary text-xs font-weight-bold">
                {{ revenue.gym_name }}
                </span>
              </td>
              <td class="text-center align-middle">
                 <span class="text-secondary text-xs font-weight-bold">
                {{ revenue.paid_amount }}
                </span>
              </td>

              <td class="align-middle text-center">
                  <i class="fa fa-trash text-danger cursor-pointer"  @click="deleteRevenue(revenue.id)"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import revenueServices from "../../services/Revenue/revenueServices";
import Swal from "sweetalert2";
import VsudAvatar from "@/components/VsudAvatar.vue";

export default {
  name: "Revenues-table",
  data() {
    return {
      Revenues: [],
      search: "",
      array: [],
    };
  },
  methods: {
    getRevenues: function () {
      revenueServices
        .getAllFormat()
        .then((response) => {
          this.Revenues = response.data.data;
          this.array = response.data.data;
          console.log(this.Revenues);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getRevenuesFormat: function () {
      this.array = [...this.Revenues];
      this.array = this.Revenues.filter((reven) =>
        reven.name.startsWith(this.search)
      );
      if (this.search == "") {
        this.getRevenues();
      }
    },
    deleteRevenue: function (RevenueID) {
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
          revenueServices.delete(RevenueID).then((response) => {
            console.log(response);
            if (response.status == 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              this.array = this.Revenues.filter(
                (reven) => reven.id != RevenueID
              );
            }
          });
        }
      });
    },
  },
  components: {
    VsudAvatar,
  },
  created() {
    this.getRevenues();
  },
  watch: {
    search: function () {
      this.getRevenuesFormat();
    },
  },
};
</script>