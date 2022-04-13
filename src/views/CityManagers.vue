<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <CityManagersTable />
      </div>
    </div>
  </div>
</template>

<script>
import CityManagersTable from "./components/CityManagersTable.vue";

export default {
  components: {
    CityManagersTable,
  },
};
</script>