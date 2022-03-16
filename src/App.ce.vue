<template>
<LoadingIndicator v-if="!payload" class="h-8 w-8"></LoadingIndicator>  
  <aside v-else class="lg:grid grid-cols-4 gap-4">

    <div>
      <provinces-selector @pick="setSelectedProvince"></provinces-selector>
    </div>
  <div class="col-span-3 pt-4 lg:pt-0">
    
    <province-view v-if="selectedProvince" :province="selectedProvince"></province-view>
    <SplashScreen v-else></SplashScreen>
  </div>

  </aside>

</template>

<script>
import Localizer from "./Localizer.js";
import ProvincesSelector from './components/ProvincesSelector.vue';
import ProvinceView from "./components/ProvinceView.vue";
import Province from "./Models/Province.js"
import payloadUrl from "./assets/payload.json?url";
import LoadingIndicator from "./components/LoadingIndicator.vue";
import SplashScreen from "./components/SplashScreen.vue";


export default {
   data() {
    return {
      strings: new Localizer(),
      payload: null,
      selectedProvince: null
    };
  },
  components: {
    ProvincesSelector,
    LoadingIndicator,
    ProvinceView,
    SplashScreen
},
props: {
  publicPath: String,
},
mounted() {
  let fetchUrl;
    if (this.publicPath) {
      fetchUrl = new URL(payloadUrl, this.publicPath);
    } else {
      fetchUrl = payloadUrl;
    }

fetch(fetchUrl)
      .then((r) => r.json())
      .then((j) => {
        j.provinces = j.provinces.map((province) => new Province(province));
        this.payload = j;
      });
  },
  methods:  {
    setSelectedProvince(province) {
      this.selectedProvince = province;
    }
  }
};
</script>
<style>
@import "./index.css";
</style>
