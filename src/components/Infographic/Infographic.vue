<template>
    <div class=" flex flex-col gap-2">
        <div
            class="flex-none max-w-max px-2 py-1 text-sm font-semibold border-l-4 bg-gray-100 dark:bg-gray-950 border-gray-800 text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-200 text-xs">
            {{ strings.infographic_type }}
        </div>
        <h2 class="text-4xl font-thin">

            {{ strings.infographic_title }}
        </h2>
        <div class="text-sm font-semibold">{{ strings.infographic_legend }}</div>
    </div>
    <div v-if="selectedYear" class="">
        <InfographicLongTerm />
    </div>
    <div class="my-4 text-2xl font-thin text-center">{{ strings.infographic_subsus_title }}</div>
    <div class="flex flex-col gap-4 md:flex-row justify-around items-center mb-4 md:-mb-16" v-if="selectedYear">
        <InfographicTextBox v-html="content.tl"></InfographicTextBox>
        <InfographicTextBox v-html="content.tr"></InfographicTextBox>
    </div>
    <SubnationalSustainabilityInfographic></SubnationalSustainabilityInfographic>
    <div class="flex flex-col gap-4 md:flex-row justify-around items-center mt-4 md:mt-0" v-if="selectedYear">
        <InfographicTextBox>
            <InfographicLegend />
        </InfographicTextBox>
        <InfographicTextBox v-html="content.br"></InfographicTextBox>
    </div>

    <div v-if="selectedYear">
        <InfographicFiscalGap />
    </div>
</template>
<script>
import InfographicTextBox from './InfographicTextBox.vue';
import InfographicLegend from "./InfographicLegend.vue"
import SubnationalSustainabilityInfographic from './SubnationalSustainabilityInfographic.vue';
import { mapState } from 'pinia'
import store from "../../Store.js"
import { marked } from 'marked';
import InfographicFiscalGap from './InfographicFiscalGap.vue';
import InfographicLongTerm from './InfographicLongTerm.vue';
export default {
    components: {
        InfographicTextBox,
        SubnationalSustainabilityInfographic,
        InfographicLegend,
        InfographicFiscalGap,
        InfographicLongTerm,
    },
    computed: {
        ...mapState(store, ['language', 'strings', 'selectedYear']),
        content() {
            return {
                tl: marked.parse(this.selectedYear.infographic_subsus_tl?.[this.language] ?? ""),
                tr: marked.parse(this.selectedYear.infographic_subsus_tr?.[this.language] ?? ""),
                br: marked.parse(this.selectedYear.infographic_subsus_br?.[this.language] ?? "")
            }
        }
    }
}
</script>