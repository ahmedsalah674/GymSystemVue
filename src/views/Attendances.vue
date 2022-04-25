<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <AttendancesTable />
        <!-- "hello" -->
      </div>
    </div>
  </div>
</template>

<script>
import AttendancesTable from "./components/AttendancesTable.vue";

export default {
//   name:"GymMembers",
  components: {
    AttendancesTable,
  },
};
</script>