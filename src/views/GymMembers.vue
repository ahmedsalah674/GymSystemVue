<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <GymMembers-Table />
        <!-- "hello" -->
      </div>
    </div>
  </div>
</template>

<script>
import GymMembersTable from "./components/GymMembersTable.vue";

export default {
//   name:"GymMembers",
  components: {
    GymMembersTable,
  },
};
</script>