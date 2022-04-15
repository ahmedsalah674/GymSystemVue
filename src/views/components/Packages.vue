<!-- eslint-disable prettier/prettier -->
<template>
  <div class="card mb-4">
      <div class="card-header pb-0">
        <div class="nav-wrapper position-relative end-0">
          <ul class="nav nav-pills nav-fill p-1" role="tablist">
            <li class="nav-item">
              <a class="nav-link mb-0 px-0 py-1 active" data-bs-toggle="tab" v-on:click="toggleTabs(1)" role="tab" aria-controls="code" aria-selected="true">
                <i class="ni ni-laptop text-sm me-2"></i> Create Package
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link mb-0 px-0 py-1" data-bs-toggle="tab" v-on:click="toggleTabs(2)" role="tab" aria-controls="preview" aria-selected="true">
              <i class="ni ni-badge text-sm me-2"></i> Buy Package
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div class="tab-content tab-space">
            <div v-if="openTab===1">
                <CreatePackage></CreatePackage>
            </div>
            <div v-if="openTab===2">
                <BuyPackage></BuyPackage>
            </div>
          </div>
        </div>


      </div>
  </div>
</template>
<script>
/*eslint-disable prettier/prettier*/
import setNavPills from "@/assets/js/nav-pills.js";
import CreatePackage from "@/views/components/CreatePackage.vue";
import BuyPackage from "@/views/components/BuyPackage.vue";

export default {
  name: "Packages",
  components: {
    CreatePackage,
    BuyPackage,
  },
  data() {
    return {
      openTab: 1
    }
  },
  methods: {
    toggleTabs: function(tabNumber){
      this.openTab = tabNumber
    }
  },
  mounted() {
    setNavPills();
  },
};
</script>
