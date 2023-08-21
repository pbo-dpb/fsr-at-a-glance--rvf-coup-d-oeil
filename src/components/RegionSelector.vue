<template>
  <nav class="lg:border-r lg:border-gray-300 lg:flex flex-col gap-2 lg:mb-4">


    <ul class='lg:block overflow-x-auto flex lg:overflow-x-hidden gap-4 items-center text-lg lg:text-base'>
      <region-selector-item :region="null" @pick="pickRegion(null)"></region-selector-item>
      <hr class="mb-4 mt-4 hidden lg:block">
      <region-selector-item v-for="region in regions" :key="region.id" :region="region"
        @pick="pickRegion(region)"></region-selector-item>
    </ul>

    <InfographicReportPoster v-if="selectedYear" class="hidden lg:flex"></InfographicReportPoster>
  </nav>
</template>
<script>
import InfographicReportPoster from "./InfographicReportPoster.vue"

import RegionSelectorItem from './RegionSelectorItem.vue'
import { mapWritableState, mapState } from 'pinia'
import store from "../Store.js"

export default {
  components: {
    RegionSelectorItem,
    InfographicReportPoster
  },
  data() {
    return {
      expanded: false,
    }
  },
  computed: {
    ...mapWritableState(store, ['selectedRegion']),
    ...mapState(store, ['language', 'strings', 'selectedYear']),
    regions() {

      return this.selectedYear.regions;
    }
  },
  methods: {
    pickRegion(region) {
      this.expanded = false;
      this.selectedRegion = region;
    }
  }
}
</script>