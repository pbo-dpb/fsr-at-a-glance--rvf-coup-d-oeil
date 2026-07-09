<template>
    <div
        class="my-4 flex w-full flex-col items-center gap-2 border-t border-solid border-gray-300 p-4 pt-8 text-center">
        <a :href="selectedYear.fsr_url[language]"
            ><img
                :src="selectedYear.fsr_poster_url?.[language]"
                alt=""
                aria-hidden="true"
                class="h-32 border border-solid border-blue-100 shadow-sm"
                loading="lazy" />
        </a>
        <p class="leading-snug font-semibold">
            {{ strings.report_poster_blurb }}
        </p>

        <a
            :href="selectedYear.fsr_url[language]"
            class="rounded-sm bg-white p-2 font-semibold hover:bg-blue-100 dark:bg-blue-900"
            >{{ strings.report_poster_cta }}</a
        >
    </div>
</template>
<script>
    import { mapState } from "pinia";
    import store from "../Store.js";

    export default {
        computed: {
            ...mapState(store, ["language", "strings", "selectedYear"]),
        },
    };
</script>
