<template>
    <div class="col-span-3 lg:col-span-2">
        {{ strings[`indicators_keys_${indicatorKey}`] }}
    </div>

    <div
        class="flex flex-col gap-1 text-center"
        v-for="(column, index) in regionValue">
        <div class="block text-xs font-semibold tabular-nums lg:hidden">
            {{ dataColumnLabels[index] }}
        </div>
        <span>{{
            new Intl.NumberFormat(`${language}-CA`, {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
            }).format(column)
        }}</span>
        <div
            v-if="compareWith"
            class="block rounded-sm bg-purple-50 text-sm text-purple-800 tabular-nums lg:hidden">
            {{
                new Intl.NumberFormat(`${language}-CA`, {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                }).format(compareValues[index])
            }}
        </div>
    </div>

    <div
        v-for="column in compareValues"
        v-if="compareWith"
        class="hidden text-center tabular-nums lg:block">
        {{
            new Intl.NumberFormat(`${language}-CA`, {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
            }).format(column)
        }}
    </div>
</template>
<script>
    import Region from "../Models/Region";
    import Indicators from "../Models/Indicators";

    import { mapState } from "pinia";
    import store from "../Store.js";

    export default {
        props: {
            region: {
                type: Region,
                required: true,
            },
            indicatorKey: {
                type: String,
                required: true,
            },
            compareWith: {
                type: Object,
                default: null,
            },
        },
        computed: {
            ...mapState(store, ["language", "strings", "selectedYear"]),
            dataColumnLabels() {
                return this.selectedYear.indicators_headers;
            },
            regionValue() {
                return this.region[this.indicatorKey];
            },
            compareValues() {
                return this.selectedYear[this.indicatorKey];
            },
        },
    };
</script>
