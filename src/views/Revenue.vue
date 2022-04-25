<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <RevenueTable />
        <!-- "hello" -->
      </div>
    </div>
  </div>
</template>

<script>
import RevenueTable from "./components/RevenueTable.vue";
export default {
//   name:"GymMembers",
  components: {
    RevenueTable,
  },
};
</script> 