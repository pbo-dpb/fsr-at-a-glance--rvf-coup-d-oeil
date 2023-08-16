<template>
    <div
        class="flex flex-col gap-2 items-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 rounded">
        <img :src="glyph" class="w-12 h-12" aria-hidden="true" role="presentation">
        <div class="font-thin text-lg text-center">{{ title }}</div>
        <div class="leading-snug text-sm text-center" v-html="contentHtml"></div>
    </div>
</template>
<script>
import sustainabilityGlyphFalse from "../../assets/glyphs/sustainability-glyph-false.svg?url"
import sustainabilityGlyphNull from "../../assets/glyphs/sustainability-glyph-null.svg?url"
import sustainabilityGlyphTrue from "../../assets/glyphs/sustainability-glyph-true.svg?url"

import { Remarkable } from 'remarkable';

export default {
    data() {
        return {
            sustainabilityGlyphFalse,
            sustainabilityGlyphTrue,
            sustainabilityGlyphNull
        }
    },
    props: {
        "isSustainable": Boolean,
        "title": String,
        "content": String
    },
    computed: {
        contentHtml() {
            var md = new Remarkable();
            return md.render(this.content ? this.content : "")
        },
        glyph() {
            if (this.isSustainable) {
                return this.sustainabilityGlyphTrue
            } else if (this.isSustainable === false) {
                this.sustainabilityGlyphFalse
            }
            return this.sustainabilityGlyphNull;
        }
    }
}
</script>