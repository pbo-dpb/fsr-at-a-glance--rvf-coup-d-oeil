<template>
<nav class="md:border-r md:border-gray-300 md:pr-2 md:flex flex-col gap-2">
<div class="flex flex-row gap-2 uppercase tracking-wide font-semibold justify-between">{{ $root.strings.title }}</div>
  <ul>
      <provinces-selector-item v-for="province in provinces" :key="province.name" :province="province" @pick="pickProvince"></provinces-selector-item>
  </ul>
  </nav>
</template>
<script>
import ProvincesSelectorItem from './ProvincesSelectorItem.vue'

export default {
  components: {
    ProvincesSelectorItem
  },
  computed: {
      provinces() {
          return this.$root.payload.provinces;
      }
  },
  methods: {
      pickProvince(province) {
          this.$emit("pick", province)
      }
  }
}
</script>