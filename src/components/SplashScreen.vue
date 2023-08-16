<template>
    <div>
        <div class="flex flex-col-reverse lg:flex-col items-center justify-center align-middle gap-4 text-teal-800 dark:text-teal-100 border-2 bg-teal-100 dark:bg-teal-900 border-teal-600 p-4 rounded mb-4"
            v-if="selectedYear">

            <p class="leading-snug max-w-none">{{ selectedYear.fsr_intro[language] }}</p>

            <p class="lg:hidden text-xl font-thin ">{{ strings.splash_cta }}</p>

            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                class="lg:hidden rotate-90 lg:rotate-0 h-14 w-14 self-end lg:self-auto text-teal-600" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>

        </div>

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