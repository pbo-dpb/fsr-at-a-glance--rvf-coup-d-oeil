<template>
  <section class="font-semibold border border-gray-300 p-4 rounded mb-16 bg-gray-100" v-if="debug">
    <div class="font-mono mb-4 text-gray-800 text-center border-b border-gray-300 pb-2">DEBUG 🔧‍</div>
    <div class="flex flex-row justify-between">

      <legend class="w-1/3"><a :href="Object.values(yearSpreadsheetUrls).slice(-1)">XLSX</a> overwrite<br><input
          type="file" name="file" @change="handleDebugFile" ref="debugFileInput" /></legend>

      <button @click="language = language == 'en' ? 'fr' : 'en'" class="w-12 border border-gray-800 p-2">{{ language ==
        'en'
        ? 'fr' : 'en' }}</button>
    </div>
  </section>

  <LoadingIndicator v-if="!latestFsrYear" class="h-8 w-8"></LoadingIndicator>
  <aside v-else class="lg:grid grid-cols-4 gap-4">

    <div>
      <RegionSelector v-if="selectedYear"></RegionSelector>
    </div>
    <div class="col-span-3 pt-4 lg:pt-0">

      <RegionView v-if="selectedRegion" :region="selectedRegion" />
      <SplashScreen v-show="!selectedRegion"></SplashScreen>
    </div>

  </aside>
</template>

<script>
import RegionSelector from './components/RegionSelector.vue';
import SplashScreen from "./components/SplashScreen.vue";
import RegionView from "./components/RegionView.vue";

const yearSpreadsheetUrls = import.meta.glob('./assets/years/*.xlsx', { as: 'url', eager: true })
import store from "./Store.js"
import { mapWritableState, mapState } from 'pinia'

import LoadingIndicator from "./components/LoadingIndicator.vue";

export default {
  components: {
    LoadingIndicator,
    RegionSelector,
    RegionView,
    SplashScreen
  },
  props: {
    publicPath: String,
  },
  data() {
    return {
      yearSpreadsheetUrls
    }
  },
  computed: {
    ...mapWritableState(store, ['selectedRegion', 'selectedFsrYear', 'language']),
    ...mapState(store, ['strings', 'years', 'latestFsrYear', 'selectedYear']),
    debug() {
      return this.$root.debug;
    }
  },
  mounted() {

    Promise.all(
      Object.values(this.yearSpreadsheetUrls).map(spreadsheetUrl => {
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
      this.$refs.debugFileInput.value = null;
      this.selectedRegion = null
    }
  },
};
</script>
<style>
@import "./index.css";
</style>
