<template>
<figure class="grid gap-4" :class="columnClass">
    

    <div class="text-sm font-semibold col-start-3 col-span-3 text-center border-b border-gray-300" v-if="displayComparisonToNationalAverage">
    {{ province.name }}
    </div>

    <div class="text-sm font-semibold col-span-3 text-center border-b border-red-800" v-if="displayComparisonToNationalAverage">
    {{ $root.strings.indicator_comparison_label }}
    </div>
    
    <div class="col-span-2 font-semibold">
        {{ $root.strings[`indicators_group_${group}`] }}
    </div>

    <div class="font-semibold text-center" v-for="column in dataColumnLabels">
        {{ column }}
    </div>

    <div class="font-semibold text-center" v-if="displayComparisonToNationalAverage" v-for="column in dataColumnLabels">
        {{ column }}
    </div>

    <ProvinceViewIndicatorsGroupIndicator v-for="(indVals, indKey) in $root.payload.indicators[this.group]" :indicator-values="indVals" :indicator-key="indKey" :province="province" :display-comparison-to-national-average="displayComparisonToNationalAverage"></ProvinceViewIndicatorsGroupIndicator>


</figure>
</template>
<script>
import Province from "../Models/Province";
import ProvinceViewIndicatorsGroupIndicator from "./ProvinceViewIndicatorsGroupIndicator.vue";

export default {
    props: {
        province: {
            type: Province,
            required: true
        },
        group: {
            type: String,
            required: true
        },
        displayComparisonToNationalAverage: {
            type: Boolean
        }
    },
    computed: {
        dataColumnLabels() {
            return Object.keys(Object.values(this.$root.payload.indicators[this.group])[0]);
        },
        dataColumnCount() {
            return this.dataColumnLabels.length;
        },
        columnCount() {
            return 2 + this.dataColumnCount + (this.displayComparisonToNationalAverage ? this.dataColumnCount : 0);
        },
        columnClass() {
            switch (this.columnCount) {
                case 5:
                    return `grid-cols-5`
                case 8:
                    return `grid-cols-8`
            }
        }
    },
    components: { ProvinceViewIndicatorsGroupIndicator }
}
</script>