<template>
    <div class="flex flex-col lg:grid grid-cols-3 gap-4 lg:gap-16 bg-dodger-blue-800 rounded text-white  p-4 my-4">
        <div class="flex flex-col gap-2">
            <div class="text-2xl font-thin">{{ strings.infographic_fg_title }}</div>
            <div class="prose prose-invert text-sm" v-html="content.fg_def"></div>
        </div>
        <div>
            <div class="flex flex-row gap-2 items-center">
                <img :src="sustainabilityGlyphFalse" class="w-12 h-12" aria-hidden="true" role="presentation" />
                <div class="text-xl flex flex-col" v-html="content.infographic_fg_pos_title"></div>
            </div>
            <div class="prose prose-invert text-sm text-left" v-html="content.fg_pos_def"></div>
        </div>
        <div>
            <div class="flex flex-row gap-2 items-center">
                <img :src="sustainabilityGlyphTrue" class="w-12 h-12" aria-hidden="true" role="presentation" />
                <div class="text-xl flex flex-col" v-html="content.infographic_fg_neg_title"></div>
            </div>
            <div class="prose prose-invert text-sm" v-html="content.fg_neg_def"></div>
        </div>
    </div>
</template>
<script>
import { Remarkable } from 'remarkable';
import { mapState } from 'pinia'
import store from "../../Store.js"

import sustainabilityGlyphFalse from "../../assets/glyphs/sustainability-glyph-false.svg?url"
import sustainabilityGlyphTrue from "../../assets/glyphs/sustainability-glyph-true.svg?url"

export default {
    data() {
        return {
            sustainabilityGlyphFalse,
            sustainabilityGlyphTrue
        }
    },
    computed: {
        ...mapState(store, ['language', 'strings', 'selectedYear']),
        content() {
            var md = new Remarkable();
            return {
                fg_def: md.render(this.selectedYear.infographic_fg_definition?.[this.language] ?? ""),
                fg_pos_def: md.render(this.selectedYear.infographic_fg_pos_definition?.[this.language] ?? ""),
                fg_neg_def: md.render(this.selectedYear.infographic_fg_neg_definition?.[this.language] ?? ""),
                infographic_fg_neg_title: md.renderInline(this.strings.infographic_fg_neg_title),
                infographic_fg_pos_title: md.renderInline(this.strings.infographic_fg_pos_title)
            }
        }
    }
}
</script>