<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <TrainingSessionsTable />
      </div>
    </div>
  </div>
</template>

<script>
import TrainingSessionsTable from "./components/TrainingSessionsTable.vue";

export default {
  components: {
    TrainingSessionsTable,
  },
};
</script>