<template>
    <div class="col-span-3 lg:col-span-2">
        {{ strings[`indicators_keys_${indicatorKey}`] }}
    </div>

    <div class="text-center flex flex-col gap-1" v-for="(column, index) in regionValue">
        <div class="block lg:hidden text-xs font-semibold tabular-nums">
            {{ dataColumnLabels[index] }}
        </div>
        <span>{{ new Intl.NumberFormat(`${language}-CA`,).format(column) }}</span>
        <div v-if="compareWith" class="block lg:hidden  tabular-nums rounded  text-purple-800 text-sm bg-purple-50">
            {{ new Intl.NumberFormat(`${language}-CA`,).format(compareValues[index]) }}
        </div>
    </div>

    <div v-for="column in compareValues" v-if="compareWith" class="hidden tabular-nums lg:block text-center">
        {{ new Intl.NumberFormat(`${language}-CA`,).format(column) }}
    </div>
</template>
<script>
import Region from "../Models/Region";
import Indicators from "../Models/Indicators";

import { mapState } from 'pinia'
import store from "../Store.js"

export default {
    props: {
        region: {
            type: Region,
            required: true
        },
        indicatorKey: {
            type: String,
            required: true
        },
        compareWith: {
            type: Object,
            default: null
        }
    },
    computed: {
        ...mapState(store, ['language', 'strings', 'selectedYear']),
        dataColumnLabels() {
            return this.selectedYear.indicators_headers;
        },
        regionValue() {
            return this.region[this.indicatorKey];
        },
        compareValues() {
            return this.selectedYear[this.indicatorKey]
        }
    }
}
</script>