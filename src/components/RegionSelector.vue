<template>
  <nav class="lg:border-r lg:border-gray-300 lg:pr-2 lg:flex flex-col gap-2 lg:mb-4">
    <div class="flex flex-row items-center gap-2 uppercase tracking-wide font-semibold justify-between">
      {{ strings.title }}


      <button @click="expanded = !expanded" class="lg:hidden text-blue-600 underline w-2/3 text-xs text-right">
        <span v-if="!selectedRegion && !expanded">
          {{ strings.expand_toggle_prompt }}
        </span>
        <span v-if="selectedRegion && !expanded">
          {{ selectedRegion.name[language] }}
        </span>
      </button>
    </div>
    <ul :class="{ 'hidden': !expanded }" class='lg:block'>
      <region-selector-item :region="null" @pick="pickRegion(null)"></region-selector-item>
      <hr class="mb-4 mt-4">
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