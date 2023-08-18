<template>
    <div>
        <Infographic />

        <InfographicReportPoster class="flex lg:hidden" v-if="selectedYear"></InfographicReportPoster>

    </div>
</template>
<script>

import { mapState } from 'pinia'
import store from "../Store.js"
import Infographic from './Infographic/Infographic.vue';
import InfographicReportPoster from "./InfographicReportPoster.vue"

export default {
    computed: {
        ...mapState(store, ['strings', 'selectedYear', 'language']),
    },
    components: { Infographic, InfographicReportPoster }
}
</script>