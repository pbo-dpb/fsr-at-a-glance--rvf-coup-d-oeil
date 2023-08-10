<template>
  <section class="bg-blue-100 text-blue-800 font-semibold border border-blue-300 p-4 flex flex-col gap-4 rounded mb-16"
    v-if="debug">

    <legend>xlsx<br><input type="file" name="file" @change="handleDebugFile" /></legend>

  </section>

  <LoadingIndicator v-if="!latestFsrYear" class="h-8 w-8"></LoadingIndicator>
  <aside v-else class="lg:grid grid-cols-4 gap-4">

    <div>
      <RegionSelector v-if="selectedYear"></RegionSelector>
    </div>
    <div class="col-span-3 pt-4 lg:pt-0">

      <!--<province-view v-if="selectedProvince" :province="selectedProvince"></province-view>-->
      <div v-if="selectedRegion">Region</div>
      <SplashScreen v-else></SplashScreen>
    </div>

  </aside>
</template>

<script>
import RegionSelector from './components/RegionSelector.vue';
import SplashScreen from "./components/SplashScreen.vue";
/*import ProvinceView from "./components/ProvinceView.vue";
*/
const yearSpreadsheetUrls = import.meta.glob('./assets/years/*.xlsx', { as: 'url', eager: true })
import store from "./Store.js"
import { mapWritableState, mapState } from 'pinia'

import LoadingIndicator from "./components/LoadingIndicator.vue";

export default {
  components: {
    LoadingIndicator,
    RegionSelector,
    /*ProvinceView,*/
    SplashScreen
  },
  props: {
    publicPath: String,
  },
  computed: {
    ...mapWritableState(store, ['selectedFsrYear']),
    ...mapState(store, ['strings', 'years', 'selectedRegion', 'latestFsrYear', 'selectedYear']),
    debug() {
      return this.$root.debug;
    }
  },
  mounted() {

    Promise.all(
      Object.values(yearSpreadsheetUrls).map(spreadsheetUrl => {
        return new Promise((resolve, reject) => {
          fetch(spreadsheetUrl)
            .then(response => response.blob())
            .then(blob => store().instanciateYearFromFile(blob))
            .then(() => {
              resolve();
            })
        });
      })).then(() => {
        if (this.latestFsrYear)
          this.selectedFsrYear = this.latestFsrYear;
      });



  },
  methods: {
    handleDebugFile(e) {
      store().instanciateYearFromFile(e.target.files[0])
      this.selectedFsrYear = this.latestFsrYear;
    }
  },
};
</script>
<style>
@import "./index.css";
</style>
