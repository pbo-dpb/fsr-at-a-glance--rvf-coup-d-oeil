<template>
    <strong>{{ selectedYear.infographic_subsus_legend_fg_title[language] }}</strong>
    <dl class="grid grid-cols-4 gap-1 items-center">

        <template v-if="hasSustainable">
            <dt class="flex justify-center my-0">
                <img :src="sustainabilityGlyphTrue" :alt="strings?.infographic_subsus_legend_true" class="h-10 w-10" />
            </dt>
            <dd class="col-span-3 text-left my-0">
                {{ selectedYear.infographic_subsus_legend_fg_range_sunny?.[language] }}
            </dd>
        </template>

        <template v-if="hasSustainabilityPartly">
            <dt class="flex justify-center my-0">
                <img :src="sustainabilityGlyphNull" :alt="strings?.infographic_subsus_legend_null" class="h-10 w-10" />
            </dt>
            <dd class="col-span-3 text-left my-0">
                {{ selectedYear.infographic_subsus_legend_fg_range_partly?.[language] }}
            </dd>
        </template>

        <template v-if="hasUnsustainable">
            <dt class="flex justify-center my-0">
                <img :src="sustainabilityGlyphFalse" :alt="strings?.infographic_subsus_legend_false" class="h-10 w-10" />
            </dt>
            <dd class="col-span-3 text-left my-0">
                {{ selectedYear.infographic_subsus_legend_fg_range_cloudy?.[language] }}
            </dd>
        </template>
    </dl>
</template>
<script>
import { mapState } from 'pinia'
import store from "../../Store.js"

import sustainabilityGlyphFalse from "../../assets/glyphs/sustainability-glyph-false.svg?url"
import sustainabilityGlyphNull from "../../assets/glyphs/sustainability-glyph-null.svg?url"
import sustainabilityGlyphTrue from "../../assets/glyphs/sustainability-glyph-true.svg?url"
import useStore from "../../Store.js"

export default {
    data() {
        return {
            sustainabilityGlyphFalse,
            sustainabilityGlyphTrue,
            sustainabilityGlyphNull
        }
    },
    computed: {
        ...mapState(store, ['language', 'strings', 'selectedYear']),
        hasSustainable() {
            if (!this.selectedYear) return false;
            return this.selectedYear.regions?.some(reg => reg.is_sustainable)
        },
        hasUnsustainable() {
            if (!this.selectedYear) return false;
            return this.selectedYear.regions?.some(reg => reg.is_sustainable === false)
        },
        hasSustainabilityPartly() {
            if (!this.selectedYear) return false;
            return this.selectedYear.regions?.some(reg => reg.is_sustainable === null)
        }
    },
}

</script>