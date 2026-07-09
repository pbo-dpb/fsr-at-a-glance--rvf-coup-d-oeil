<template>
    <div
        class="my-4 flex grid-cols-3 flex-col gap-4 rounded-sm bg-gray-100 p-4 text-gray-800 lg:grid lg:gap-16 dark:bg-gray-700 dark:text-gray-100">
        <div class="flex flex-col gap-2">
            <div class="text-2xl font-thin">
                {{ strings.infographic_fg_title }}
            </div>
            <div
                class="prose dark:prose-invert text-sm"
                v-html="content.fg_def"></div>
        </div>
        <div>
            <div class="flex flex-row items-center gap-2">
                <img
                    :src="sustainabilityGlyphFalse"
                    class="h-12 w-12"
                    aria-hidden="true"
                    role="presentation" />
                <div
                    class="flex flex-col text-xl"
                    v-html="content.infographic_fg_pos_title"></div>
            </div>
            <div
                class="prose dark:prose-invert text-left text-sm"
                v-html="content.fg_pos_def"></div>
        </div>
        <div>
            <div class="flex flex-row items-center gap-2">
                <img
                    :src="sustainabilityGlyphTrue"
                    class="h-12 w-12"
                    aria-hidden="true"
                    role="presentation" />
                <div
                    class="flex flex-col text-xl"
                    v-html="content.infographic_fg_neg_title"></div>
            </div>
            <div
                class="prose dark:prose-invert text-sm"
                v-html="content.fg_neg_def"></div>
        </div>
    </div>
</template>
<script>
    import { marked } from "marked";
    import { mapState } from "pinia";
    import store from "../../Store.js";

    import sustainabilityGlyphFalse from "../../assets/glyphs/sustainability-glyph-false.svg?url";
    import sustainabilityGlyphTrue from "../../assets/glyphs/sustainability-glyph-true.svg?url";

    export default {
        data() {
            return {
                sustainabilityGlyphFalse,
                sustainabilityGlyphTrue,
            };
        },
        computed: {
            ...mapState(store, ["language", "strings", "selectedYear"]),
            content() {
                return {
                    fg_def: marked.parse(
                        this.selectedYear.infographic_fg_definition?.[
                            this.language
                        ] ?? "",
                    ),
                    fg_pos_def: marked.parse(
                        this.selectedYear.infographic_fg_pos_definition?.[
                            this.language
                        ] ?? "",
                    ),
                    fg_neg_def: marked.parse(
                        this.selectedYear.infographic_fg_neg_definition?.[
                            this.language
                        ] ?? "",
                    ),
                    infographic_fg_neg_title: marked.parseInline(
                        this.strings.infographic_fg_neg_title,
                    ),
                    infographic_fg_pos_title: marked.parseInline(
                        this.strings.infographic_fg_pos_title,
                    ),
                };
            },
        },
    };
</script>
