<template>
  <li class="cursor-pointer leading-tight">
      <a @click="selectProvince" class="px-4 py-2 -mx-2 block  text-blue-800 underline hover:text-blue-900 "
      :class="isSelectedProvince ? 'bg-blue-100 lg:rounded-tl lg:rounded-bl' : ''"
      >{{ province.name }}</a>
      </li>
</template>
<script>
import Province from "../Models/Province";


export default {
    props: {
        province: {
            type: Province,
            required: true
        }
    },
    computed: {
        isSelectedProvince() {
            return this.$root.selectedProvince === this.province;
        }
    },
    methods: {
        selectProvince(){
            this.$emit("pick", this.province)
        }
    }
}
</script>