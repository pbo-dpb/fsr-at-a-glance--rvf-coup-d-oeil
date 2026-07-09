<template>
    <li class="cursor-pointer leading-tight">
        <a
            @click="selectRegion"
            class="block w-fit rounded-sm border border-solid border-blue-800 p-4 text-blue-800 underline select-none hover:text-blue-900 lg:w-full lg:border-0 lg:px-4 lg:py-2 dark:text-blue-200 dark:hover:text-blue-100"
            :class="
                isSelectedRegion
                    ? 'bg-blue-100 lg:rounded-none lg:rounded-tl lg:rounded-bl dark:bg-blue-900'
                    : 'hover:bg-blue-50 dark:hover:bg-blue-950'
            ">
            <span class="hidden lg:block">{{
                region ? region.name[language] : strings.infographic_type
            }}</span
            ><span class="font-semibold lg:hidden">{{
                region ? region.id.toUpperCase() : strings.infographic_type
            }}</span></a
        >
    </li>
</template>
<script>
    import Region from "../Models/Region";
    import { mapState } from "pinia";
    import store from "../Store.js";

    export default {
        props: {
            region: {
                type: Region,
            },
        },
        computed: {
            ...mapState(store, ["language", "selectedRegion", "strings"]),
            isSelectedRegion() {
                return this.selectedRegion === this.region;
            },
        },
        methods: {
            selectRegion() {
                this.$emit("pick", this.region);
            },
        },
    };
</script>
