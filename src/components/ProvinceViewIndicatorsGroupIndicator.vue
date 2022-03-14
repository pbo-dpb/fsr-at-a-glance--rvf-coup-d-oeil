<template>
    
    <div class="col-span-2">
        {{ $root.strings[`indicators_keys_${indicatorKey}`] }}
    </div>

    <div class="text-center" v-for="column in indicatorProvincesValues">
        {{ new Intl.NumberFormat(`${this.$root.strings.language}-CA`, ).format(column) }}
    </div>

    <div v-for="column in indicatorValues" v-if="displayComparisonToNationalAverage" class="text-center" >
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
            return Object.keys(this.indicatorValues)
        },
        dataColumnCount() {
            return this.dataColumnLabels.length;
        },
        columnCount() {
            return 2 + this.dataColumnCount;
        },
        indicatorProvincesValues() {
            return this.province.indicators[this.indicatorKey];
        }
    }
}
</script>