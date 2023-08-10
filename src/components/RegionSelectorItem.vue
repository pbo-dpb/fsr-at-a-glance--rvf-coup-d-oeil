<template>
    <li class="cursor-pointer leading-tight">
        <a @click="selectRegion" class="px-4 py-2 -mx-2 block  text-blue-800 underline hover:text-blue-900 "
            :class="isSelectedRegion ? 'bg-blue-100 lg:rounded-tl lg:rounded-bl' : ''">{{ region.name[language] }}</a>
    </li>
</template>
<script>
import Region from "../Models/Region";
import { mapState } from 'pinia'
import store from "../Store.js"

export default {
    props: {
        region: {
            type: Region,
            required: true
        }
    },
    computed: {
        ...mapState(store, ['language', 'selectedRegion']),
        isSelectedRegion() {
            return this.selectedRegion === this.region;
        }
    },
    methods: {
        selectRegion() {
            this.$emit("pick", this.region)
        }
    }
}
</script>