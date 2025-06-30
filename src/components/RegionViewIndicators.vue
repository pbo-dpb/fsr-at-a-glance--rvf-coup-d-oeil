<template>
    <figure class="flex flex-col gap-4">
        <div class="flex flex-row justify-end ">




            <label
                class="bg-purple-50 text-sm font-semibold border border-solid rounded-sm border-purple-800 text-purple-800 px-2 py-1 flex flex-row items-center gap-2 select-none">
                <input type="checkbox" :checked="compareWith" @change="setCompareWith(null)"> {{
                    strings.indicators_comparison_toggle }}
            </label>



        </div>
        <RegionViewIndicatorsGroup :region="region" v-for="(indicators, group) in groups" :key="group" :group="group"
            :compare-with="compareWith">
        </RegionViewIndicatorsGroup>

    </figure>
</template>
<script>
import Region from "../Models/Region";
import { mapState } from 'pinia'
import store from "../Store.js"
import Indicators from "../Models/Indicators";

import RegionViewIndicatorsGroup from "./RegionViewIndicatorsGroup.vue";
const localStorageKey = 'ca.pbo-dpb.pbo-dpb_fsr-at-a-glance--rvf-coup-d-oeil.displayComparisonTo';
export default {
    props: {
        region: {
            type: Region,
            required: true
        }
    },
    data() {
        return {
            compareWith: null
        }
    },
    created() {
        const val = window.localStorage.getItem(localStorageKey);
        if (val && val == 'nat_avg')
            this.compareWith = this.selectedYear
    },
    computed: {
        ...mapState(store, ['strings', 'selectedYear']),
        groups() {
            return Indicators.structure
        },
    },
    components: {
        RegionViewIndicatorsGroup
    },
    methods: {
        setCompareWith(alternative) {
            if (this.compareWith) {
                window.localStorage.removeItem(localStorageKey)
                this.compareWith = null
            } else {
                window.localStorage.setItem(localStorageKey, 'nat_avg');
                this.compareWith = this.selectedYear
            }
        }
    }
}
</script>