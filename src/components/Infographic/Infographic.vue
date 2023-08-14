<template>
    <div class="flex flex-col gap-4 md:flex-row justify-around items-center mb-4 md:-mb-16" v-if="selectedYear">
        <InfographicTextBox v-html="content.tl"></InfographicTextBox>
        <InfographicTextBox v-html="content.tr"></InfographicTextBox>
    </div>
    <SubnationalSustainabilityInfographic></SubnationalSustainabilityInfographic>
    <div class="flex flex-col gap-4 md:flex-row justify-around items-center mt-4 md:mt-0" v-if="selectedYear">
        <InfographicTextBox>
            <InfographicLegend></InfographicLegend>
        </InfographicTextBox>
        <InfographicTextBox v-html="content.br"></InfographicTextBox>
    </div>
</template>
<script>
import InfographicTextBox from './InfographicTextBox.vue';
import InfographicLegend from "./InfographicLegend.vue"
import SubnationalSustainabilityInfographic from './SubnationalSustainabilityInfographic.vue';
import { mapState } from 'pinia'
import store from "../../Store.js"
import { Remarkable } from 'remarkable';
export default {
    components: {
        InfographicTextBox,
        SubnationalSustainabilityInfographic,
        InfographicLegend
    },
    computed: {
        ...mapState(store, ['language', 'strings', 'selectedYear']),
        content() {
            var md = new Remarkable();
            return {
                tl: md.render(this.selectedYear.infographic_subsus_tl?.[this.language] ?? ""),
                tr: md.render(this.selectedYear.infographic_subsus_tr?.[this.language] ?? ""),
                br: md.render(this.selectedYear.infographic_subsus_br?.[this.language] ?? "")
            }
        }
    }
}
</script>