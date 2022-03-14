<template>
    
    

    <div class="col-span-3 lg:col-span-2">
        {{ $root.strings[`indicators_keys_${indicatorKey}`] }}
    </div>

    <div class="text-center flex flex-col gap-1" v-for="(column, year) in indicatorProvincesValues">
        <div class="block lg:hidden text-xs font-semibold">
           {{ year }}
        </div>
        <span>{{ new Intl.NumberFormat(`${this.$root.strings.language}-CA`, ).format(column) }}</span>
        <div v-if="displayComparisonToNationalAverage" class="block lg:hidden  border rounded border-red-800 text-red-800 text-sm ">
            {{ new Intl.NumberFormat(`${this.$root.strings.language}-CA`, ).format(indicatorValues[year]) }}
        </div>
    </div>

    <div v-for="column in indicatorValues" v-if="displayComparisonToNationalAverage" class="hidden lg:block text-center" >
        {{ new Intl.NumberFormat(`${this.$root.strings.language}-CA`, ).format(column) }}
    </div>

</template>
<script>
import Province from "../Models/Province";

export default {
    props: {
        province: {
            type: Province,
            required: true
        },
        indicatorKey: {
            type: String,
            required: true
        },
        indicatorValues: {
            type: Object,
            required: true
        },
        displayComparisonToNationalAverage: {
            type: Boolean
        }
    },
    computed: {
        dataColumnLabels() {
            return Object.keys(this.province.indicators[this.indicatorKey]);
        },
        indicatorProvincesValues() {
            return this.province.indicators[this.indicatorKey];
        }
    }
}
</script>