<template>
    <div class="">
        <div class="my-4 text-center text-2xl font-thin">
            {{ strings.infographic_lt_title }}
        </div>
        <div class="flex grid-cols-3 flex-col gap-4 md:grid">
            <InfographicLongTermBox
                v-for="lv in ['fed', 'ppp', 'sub']"
                :title="strings[`infographic_lt_${lv}_title`]"
                :is-sustainable="
                    selectedYear[
                        `infographic_lt_perspective_${lv}_is_sustainable`
                    ]
                "
                :content="
                    selectedYear[`infographic_lt_perspective_${lv}_legend`][
                        language
                    ]
                ">
            </InfographicLongTermBox>
        </div>
    </div>
</template>
<script>
    import { mapState } from "pinia";
    import store from "../../Store.js";
    import InfographicLongTermBox from "./InfographicLongTermBox.vue";

    export default {
        components: { InfographicLongTermBox },
        computed: {
            ...mapState(store, ["language", "strings", "selectedYear"]),
        },
    };
</script>
