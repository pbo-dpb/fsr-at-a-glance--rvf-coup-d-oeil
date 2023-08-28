<template>
  <section class="font-semibold border border-gray-300 p-4 rounded mb-16 bg-gray-100 dark:bg-gray-950" v-if="debug">
    <div class="font-mono mb-4 text-gray-800 dark:text-white text-center border-b border-gray-300 pb-2">DEBUG 🔧‍</div>
    <div class="flex flex-row justify-between">

      <legend class="w-1/3"><a :href="Object.values(yearSpreadsheetUrls).slice(-1)">XLSX</a> overwrite<br><input
          type="file" name="file" @change="handleDebugFile" ref="debugFileInput" /></legend>

      <button @click="language = language == 'en' ? 'fr' : 'en'" class="w-12 border border-gray-800 p-2 rounded">{{
        language ==
        'en'
        ? 'fr' : 'en' }}</button>
    </div>
  </section>

  <LoadingIndicator v-if="!latestFsrYear" class="h-8 w-8"></LoadingIndicator>
  <div v-else>

    <div v-if="selectedYear" class="border-b border-gray-300 pb-4 mb-4 text-lg prose dark:prose-invert max-w-none">
      <p class=" max-w-none">{{ selectedYear.fsr_intro[language] }}</p>
    </div>
    <div class="lg:grid grid-cols-4 gap-4">

      <RegionSelector v-if="selectedYear"></RegionSelector>

      <div class="col-span-3 pt-4 lg:pt-0">

        <RegionView v-if="selectedRegion" :region="selectedRegion" />
        <SplashScreen v-show="!selectedRegion"></SplashScreen>
      </div>
    </div>


  </div>
</template>

<script>
import RegionSelector from './components/RegionSelector.vue';
import SplashScreen from "./components/SplashScreen.vue";
import RegionView from "./components/RegionView.vue";
import WrapperEventDispatcher from "./WrapperEventDispatcher.js"

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
  watch: {
    "strings.title": function () {
      this.updatePageTitle()
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

    this.updatePageTitle();
  },
  methods: {
    handleDebugFile(e) {
      store().instanciateYearFromFile(e.target.files[0])
      this.selectedFsrYear = this.latestFsrYear;
      this.$refs.debugFileInput.value = null;
      this.selectedRegion = null
    },
    updatePageTitle() {
      if (!this.strings) return;
      (new WrapperEventDispatcher(this.strings.title, null)).dispatch();
    }
  },
};
</script>
<style>
@import "./index.css";
</style>
