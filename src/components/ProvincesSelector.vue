<template>
<nav class="lg:border-r lg:border-gray-300 lg:pr-2 lg:flex flex-col gap-2">
<div class="flex flex-row items-center gap-2 uppercase tracking-wide font-semibold justify-between">
  {{ $root.strings.title }}


  <button @click="expanded=!expanded" class="lg:hidden text-blue-600 underline w-2/3 text-xs text-right">
    <span v-if="!$root.selectedProvince && !expanded">
    {{ $root.strings.expand_toggle_prompt }}
    </span>
    <span v-if="$root.selectedProvince && !expanded">
    {{ $root.selectedProvince.name }}
    </span>
    </button>
  </div>
  <ul :class="{'hidden': !expanded}" class='lg:block'>
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
  data() {
    return {
      expanded: false,
    }
  },
  computed: {
      provinces() {
          return this.$root.payload.provinces;
      }
  },
  methods: {
      pickProvince(province) {
        this.expanded = false;
          this.$emit("pick", province)
      }
  }
}
</script>