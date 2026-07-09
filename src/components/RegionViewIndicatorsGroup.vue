<template>
    <figure
        class="grid gap-4"
        :class="columnClass">
        <div
            class="col-span-3 col-start-3 hidden border-b border-solid border-gray-300 text-center text-sm font-semibold lg:block"
            :aria-hidden="!compareWith"
            :class="{
                'opacity-0': !compareWith,
            }">
            {{ region.name[language] }}
        </div>

        <div
            class="col-span-3 hidden border-b border-solid border-purple-700 text-center text-sm font-semibold lg:block"
            v-if="compareWith">
            <span v-if="compareWith === selectedYear">{{
                strings.indicator_comparison_label_nat_avg
            }}</span>
            <span v-else>{{ compareWith.name[language] }}</span>
        </div>

        <div class="col-span-3 font-semibold lg:col-span-2">
            {{ strings[`indicators_group_${group}`] }}
        </div>

        <div
            class="hidden text-center font-semibold lg:block"
            v-for="column in dataColumnLabels">
            {{ column }}
        </div>

        <div
            class="hidden text-center font-semibold lg:block"
            v-if="compareWith"
            v-for="column in dataColumnLabels">
            {{ column }}
        </div>
        <RegionViewIndicatorsGroupIndicator
            v-for="indicatorKey in indicators"
            :indicator-key="indicatorKey"
            :key="indicatorKey"
            :region="region"
            :compare-with="compareWith">
        </RegionViewIndicatorsGroupIndicator>
    </figure>
</template>
<script>
    import Region from "../Models/Region";
    import Indicators from "../Models/Indicators";

    import { mapState } from "pinia";
    import store from "../Store.js";
    import RegionViewIndicatorsGroupIndicator from "./RegionViewIndicatorsGroupIndicator.vue";

    export default {
        props: {
            region: {
                type: Region,
                required: true,
            },
            group: {
                type: String,
                required: true,
            },
            compareWith: {
                type: Object,
                required: false,
            },
            compareWith: {
                type: Object,
                required: false,
            },
        },
        computed: {
            ...mapState(store, ["language", "strings", "selectedYear"]),
            indicators() {
                return Indicators.structure[this.group];
            },
            dataColumnLabels() {
                return this.selectedYear.indicators_headers;
            },
            dataColumnCount() {
                return this.dataColumnLabels.length;
            },
            columnCount() {
                return (
                    2 +
                    this.dataColumnCount +
                    (this.compareWith ? this.dataColumnCount : 0)
                );
            },
            columnClass() {
                switch (this.columnCount) {
                    case 5:
                        return ["grid-cols-3", `lg:grid-cols-5`];
                    case 8:
                        return ["grid-cols-3", `lg:grid-cols-8`];
                }
            },
        },
        components: { RegionViewIndicatorsGroupIndicator },
    };
</script>
