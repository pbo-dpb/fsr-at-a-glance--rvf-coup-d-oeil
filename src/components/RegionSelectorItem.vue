<template>
    <li class="cursor-pointer leading-tight">
        <a @click="selectRegion"
            class="rounded-sm border-blue-800 border border-solid p-4 w-fit lg:w-full lg:border-0 lg:px-4 lg:py-2 block  text-blue-800 dark:text-blue-200 underline hover:text-blue-900 dark:hover:text-blue-100 select-none"
            :class="isSelectedRegion ? 'bg-blue-100 dark:bg-blue-900 lg:rounded-none lg:rounded-tl lg:rounded-bl' : 'hover:bg-blue-50 dark:hover:bg-blue-950'">
            <span class="hidden lg:block">{{
                region ?
                    region.name[language] :
                    strings.infographic_type }}</span><span class="lg:hidden font-semibold">{{ region ?
                    region.id.toUpperCase()
                    :
                strings.infographic_type
                }}</span></a>
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
        }
    },
    computed: {
        ...mapState(store, ['language', 'selectedRegion', 'strings']),
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