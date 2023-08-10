import { defineStore } from 'pinia'
import Year from './Models/Year';
import blStrings from "./assets/strings.json?json";
import readXlsxFile from 'read-excel-file'
import Region from './Models/Region';
import Indicators from './Models/Indicators';



export default defineStore('fsr', {
    state: () => ({
        selectedRegion: null,
        selectedFsrYear: null,
        years: [],
        language: document.documentElement.lang
    }),
    actions: {
        async instanciateYearFromFile(xlsxBytes) {

            /**
             * Vars
             */
            let vars = await readXlsxFile(xlsxBytes, { sheet: 'VARS' });
            vars = vars.reduce((accumulator, item) => {
                accumulator[item[0]] = item[1];
                return accumulator;
            }, {});


            /**
             * Indicators
             */
            let indicators = await readXlsxFile(xlsxBytes, { sheet: 'INDICATORS' });

            let indicatorsNationalAverage = Indicators.initRegionIndicatorsFromRows('nat_avg', indicators);

            let year = new Year({
                ...vars,
                ...indicatorsNationalAverage
            })

            let sustainability = await readXlsxFile(xlsxBytes, { sheet: 'SUSTAINABILITY' });
            let bullets = await readXlsxFile(xlsxBytes, { sheet: 'BULLETS' });
            let charts = await readXlsxFile(xlsxBytes, { sheet: 'CHARTS' });


            year.regions = Region.buildRegionsFromRows(indicators, sustainability, bullets, charts);

            let years = [
                ...this.years.filter(yr => yr.fsr_year != year.fsr_year),
                year
            ];

            this.years = years;
        },

    },

    getters: {

        latestFsrYear(state) {
            return Math.max(0, ...state.years.map(year => year.fsr_year));
        },

        selectedYear(state) {
            return state.years.find(year => year.fsr_year == state.selectedFsrYear);
        },

        strings(state) {
            let loc = {}
            for (const [key, value] of Object.entries(blStrings)) {
                loc[key] = value[state.language]
            }
            return loc;
        }

    }


})