<template>
  <section class="bg-blue-100 text-blue-800 font-semibold border border-blue-300 p-4 flex flex-col gap-4 rounded mb-16"
    v-if="debug">

    <legend>xlsx<br><input type="file" name="file" @change="handleDebugFile" /></legend>

  </section>

  <LoadingIndicator v-if="!payload" class="h-8 w-8"></LoadingIndicator>
  <aside v-else class="lg:grid grid-cols-4 gap-4">

    <div>
      <!--<provinces-selector @pick="setSelectedProvince"></provinces-selector>-->
    </div>
    <div class="col-span-3 pt-4 lg:pt-0">

      <!--<province-view v-if="selectedProvince" :province="selectedProvince"></province-view>
      <SplashScreen v-else></SplashScreen>-->
    </div>

  </aside>
</template>

<script>
/*import ProvincesSelector from './components/ProvincesSelector.vue';
import ProvinceView from "./components/ProvinceView.vue";
import Province from "./Models/Province.js"
import SplashScreen from "./components/SplashScreen.vue";*/
const years = import.meta.glob('./assets/years/*.xlsx', { as: 'url', eager: true })
import store from "./Store.js"
import { mapState } from 'pinia'

import LoadingIndicator from "./components/LoadingIndicator.vue";

export default {
  data() {
    return {
      /*strings: new Localizer(),*/
      selectedProvince: null
    };
  },
  components: {
    LoadingIndicator,
    /*ProvincesSelector,
   
    ProvinceView,
    SplashScreen*/
  },
  props: {
    publicPath: String,
  },
  computed: {
    debug() {
      return this.$root.debug;
    }
  },
  mounted() {
    Object.values(years).forEach(yearUrl => {

      fetch(yearUrl)
        .then(response => response.blob())
        .then(blob => store().instanciateYearFromFile(blob))
    });
  },
  methods: {
    handleDebugFile(e) {
      store().instanciateYearFromFile(e.target.files[0])
    }
  },
};
</script>
<style>
@import "./index.css";
</style>
