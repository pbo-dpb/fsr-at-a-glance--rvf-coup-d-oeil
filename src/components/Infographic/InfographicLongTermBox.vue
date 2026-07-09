<template>
    <div
        class="to-dodger-blue-50 flex flex-col items-center gap-2 rounded-sm bg-linear-to-b from-gray-50 p-4 dark:from-gray-900 dark:to-gray-800">
        <img
            :src="glyph"
            class="h-12 w-12"
            aria-hidden="true"
            role="presentation" />
        <div class="text-center text-lg font-thin">{{ title }}</div>
        <div
            class="text-center text-sm leading-snug"
            v-html="contentHtml"></div>
    </div>
</template>
<script>
    import sustainabilityGlyphFalse from "../../assets/glyphs/sustainability-glyph-false.svg?url";
    import sustainabilityGlyphNull from "../../assets/glyphs/sustainability-glyph-null.svg?url";
    import sustainabilityGlyphTrue from "../../assets/glyphs/sustainability-glyph-true.svg?url";

    import { marked } from "marked";

    export default {
        data() {
            return {
                sustainabilityGlyphFalse,
                sustainabilityGlyphTrue,
                sustainabilityGlyphNull,
            };
        },
        props: {
            isSustainable: Boolean,
            title: String,
            content: String,
        },
        computed: {
            contentHtml() {
                return marked.parse(this.content ? this.content : "");
            },
            glyph() {
                if (this.isSustainable) {
                    return this.sustainabilityGlyphTrue;
                } else if (this.isSustainable === false) {
                    this.sustainabilityGlyphFalse;
                }
                return this.sustainabilityGlyphNull;
            },
        },
    };
</script>
