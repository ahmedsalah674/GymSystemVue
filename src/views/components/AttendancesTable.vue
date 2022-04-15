<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Attendances</h6>
      <div class="card-tools">
          <h6 for="serach">Search</h6>
          <h6 for="serach">{{search}}</h6>
          <div class="col-md-6">
        <input v-model="search" type="search" class="form-control" placeholder="Search by userName ..." >
          </div>
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
                Id
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                  ps-2
                "
              >
                Training Session Name
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                User Name
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                attendance_time
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                attendance_date
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                delete
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="Attendance in array " :key="Attendance.id">
              <td class="">
                {{ Attendance.id }}
              </td>
              <td class="">
                {{ Attendance.training_session_id }}
              </td>
              <td class="">
                {{ Attendance.user_id }}
              </td>
              <td class="">
                {{ Attendance.attendance_time }}
              </td>
              <td class="">
                {{ Attendance.attendance_date }}
              </td>

              <td class="align-middle">
                <a
                  href="#"
                  @click="deleteAttend(Attendance.id)"
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
              this.Attendances = this.Attendances.filter(
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