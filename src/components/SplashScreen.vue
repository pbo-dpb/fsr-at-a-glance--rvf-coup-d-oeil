<template>
    <div>
        <div
            class="mb-4 flex flex-col-reverse items-center justify-center gap-4 rounded-sm border-2 border-solid border-teal-600 bg-teal-100 p-4 align-middle text-teal-800 lg:hidden lg:flex-col dark:bg-teal-900 dark:text-teal-100"
            v-if="selectedYear">
            <p class="text-xl font-thin lg:hidden">{{ strings.splash_cta }}</p>

            <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                class="h-14 w-14 rotate-90 text-teal-600 lg:hidden lg:rotate-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
        </div>

        <Infographic />

        <InfographicReportPoster
            class="flex lg:hidden"
            v-if="selectedYear"></InfographicReportPoster>
    </div>
</template>
<script>
    import { mapState } from "pinia";
    import store from "../Store.js";
    import Infographic from "./Infographic/Infographic.vue";
    import InfographicReportPoster from "./InfographicReportPoster.vue";

    export default {
        computed: {
            ...mapState(store, ["strings", "selectedYear", "language"]),
        },
        components: { Infographic, InfographicReportPoster },
    };
</script>
