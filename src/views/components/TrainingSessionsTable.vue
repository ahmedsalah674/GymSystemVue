<!-- eslint-disable prettier/prettier -->
<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6 class=" text-center">Current Training Sessions</h6>
      <div class="card-tools text-center">
        <router-link :to="'/TrainingSessions/create'"
        class="btn btn-success">Add New <i class="fas fa-user-plus fa-fw"></i></router-link>
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Day</th>
              <th class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Start Time</th>
              <th class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Finish Time</th>
              <th class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Coaches</th>
              <th class="text-secondary opacity-7"></th> 
            </tr>
          </thead>
          <tbody>
            <tr v-for="TrainingSession in TrainingSessions" :key="TrainingSession.id">
              <td class="text-center">
                {{ TrainingSession.name }}
              </td>
              <td class="text-center">
                {{ TrainingSession.session_date }}
              </td>
              <td class="text-center">
                {{ TrainingSession.start_time }}
              </td>
              <td class="text-center">
                {{ TrainingSession.end_time }}
              </td>
              <td class="text-center text-center">
                <button
                  class="btn btn-success"
                  ref="triggerModal"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  @click="viewCoaches(TrainingSession)"
                  ><i class="fa fa-eye"></i>
                </button>
              </td>
              <td class="text-center text-center">
                <router-link :to="'/TrainingSessions/' + TrainingSession.id + '/update'">
                  <i class="fa fa-edit blue"></i>
                </router-link>
              </td>
              <td class="text-center text-center">
                <a
                  href="#"
                  @click="deleteSession(TrainingSession.id)"
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

  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6 class="text-center">Previous Sessions</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Day</th>
              <th class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Start Time</th>
              <th class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Finish Time</th>
              <th class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Coaches</th>
              <th class="text-secondary opacity-7"></th> 
            </tr>
          </thead>
          <tbody>
            <tr v-for="HistoryTrainingSession in HistoryTrainingSessions" :key="HistoryTrainingSession.id">
              <td class="text-center">
                {{ HistoryTrainingSession.name }}
              </td>
              <td class="text-center">
                {{ HistoryTrainingSession.session_date }}
              </td>
              <td class="text-center">
                {{ HistoryTrainingSession.start_time }}
              </td>
              <td class="text-center">
                {{ HistoryTrainingSession.end_time }}
              </td>
              <td class="text-center text-center">
                <button
                  class="btn btn-success"
                  ref="triggerModal"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  @click="viewCoaches(HistoryTrainingSession)"
                  ><i class="fa fa-eye"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

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
          <h5 class="modal-title" id="exampleModalLabel">Coaches</h5>
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
                <th class="text-center" v-if="coaches.length===1">Coach Name</th>
                <th class="text-center" v-if="coaches.length>1">Coaches Names -- {{coaches.length}}</th>
                <th class="text-center" v-if="coaches.length===0">No Coaches</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="coaches.length===0">
                <td>
                  ---
                </td>
              </tr>
              <tr v-for="coach in coaches" :key="coach">
                <td>{{ coach }}</td>
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

</template>

<script>
/*eslint-disable prettier/prettier*/

// import VsudAvatar from "@/components/VsudAvatar.vue";
// import VsudBadge from "@/components/VsudBadge.vue";
import TrainingSessionsService from "../../services/GymManagers/TrainingSessionService";
import Swal from "sweetalert2";
export default {
  name: "TrainingSessionsTable",
  data() {
    return {
      editmode: false,
      errors: {},
      // token: "2|6kfynCaHfYggdULaqx7Kl5NEwvWIi465094zlUCF",
      TrainingSessions: [],
      HistoryTrainingSessions: [],
      coaches: [],
    };
  },
  // components: {
  //   VsudAvatar,
  //   VsudBadge,
  // },
  methods: {
    getSessions: function () {
      TrainingSessionsService.getAll()
        .then((response) => {
          this.SplitSessions(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    SplitSessions: function ($sessions) {
      $sessions.forEach((session) => {
        if (session.session_date < new Date().toISOString().split('T')[0]) {
          this.HistoryTrainingSessions.push(session);
        } else {
          this.TrainingSessions.push(session);
        }
      });
    },
    deleteSession: function (sessionId) {
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
          TrainingSessionsService.delete(sessionId).then((response) => {
            console.log(response);
            if (response.status == 204) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              this.TrainingSessions = this.TrainingSessions.filter(
                (session) => session.id != sessionId
              );
            }
          });
        }
      });
    },
    viewCoaches: function (session) {
      this.coaches = session.coaches;
    },
  },
  created() {
    this.getSessions();
  },
};
</script>