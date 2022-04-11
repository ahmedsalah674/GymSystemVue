<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <GymManagersTable />
        <!-- "hello" -->
      </div>
    </div>
  </div>
</template>

<script>
import GymManagersTable from "./components/GymManagersTable.vue";

export default {
//   name:"GymMembers",
  components: {
    GymManagersTable,
  },
};
</script>