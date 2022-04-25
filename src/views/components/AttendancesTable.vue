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
                  text-center
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
                Training Session
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                  text-center
                "
              >
                Attendance Time
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                  text-center
                "
              >
                Attendance Date
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
            <tr v-for="Attendance in array " :key="Attendance.id">
               <td class="text-center align-middle">
                 <span class="text-secondary text-xs font-weight-bold">
                  {{ Attendance.user_id }}
                </span>
              </td>
              <td class="text-center align-middle">
                 <span class="text-secondary text-xs font-weight-bold">
                  {{ Attendance.training_session_id }}
                </span>
              </td>
              <td class="text-center align-middle">
                 <span class="text-secondary text-xs font-weight-bold">
                  {{ Attendance.attendance_time }}
                </span>
              </td>
              <td class="text-center align-middle">
                 <span class="text-secondary text-xs font-weight-bold">
                   {{ Attendance.attendance_date }}
                </span>
              </td>
               <td class="align-middle text-center">
                  <i class="fa fa-trash text-danger cursor-pointer"  @click="deleteAttend(Attendance.id)"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AttendancesServices from "../../services/Attendances/AttendancesServices";
import Swal from "sweetalert2";

export default {
  name: "Attendances-table",
  data() {
    return {
      Attendances: [],
      search:'',
      array:[]
    };
  },
  methods: {
    getAttendances: function () {
      AttendancesServices.getAllFormat()
        .then((response) => {
          this.Attendances = response.data;
           this.array = response.data;

        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAttendancesFormat: function () {
        this.array=[...this.Attendances] ; 
        this.array= this.Attendances.filter(attend=> (attend.user_id).startsWith(this.search))
        if (this.search=='' ){
             this.getAttendances()
        } 
    },
    deleteAttend: function (AttendID) {
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
          AttendancesServices.delete(AttendID).then((response) => {
            console.log(response);
            if (response.status == 204) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              this.array = this.Attendances.filter(
                (attend) => attend.id != AttendID
              );
            }
          });
        }
      });
    },
  },
  created() {
    this.getAttendances();
  },
  watch : {
      search : function (){
          this.getAttendancesFormat();
      }
      
  }
};
</script>