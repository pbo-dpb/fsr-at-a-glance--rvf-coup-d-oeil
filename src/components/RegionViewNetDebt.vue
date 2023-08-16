<template>
  <BarChart :chartData="chartData" :options="options" class="dark:bg-white dark:p-4 dark:rounded" />
  <Details :label="strings.alt_version_handle" class="mt-2">
    <RegionChartAltTable :datatable="datatable" />
  </Details>
</template>

<script >
import { mapState } from 'pinia'
import store from "../Store.js"
import { defineComponent, ref } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import Region from '../Models/Region';
import Localizer from "../Localizer"
import Details from '../components/Details'
import RegionChartAltTable from '../components/RegionChartAltTable'

Chart.register(...registerables);

export default defineComponent({
  components: { BarChart, Details, RegionChartAltTable },
  props: {
    region: { type: Region, required: true },
  },

  computed: {
    ...mapState(store, ['language', 'strings', 'selectedYear']),
    options() {
      return {
        responsive: true,
        aspectRatio: 3,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {

                let localizer = new Localizer(this.strings);
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += localizer.__('percentage_of_tooltip_label', { percentage: new Intl.NumberFormat(`${this.language}-CA`, { style: 'percent' }).format(context.parsed.y / 100) });
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            display: true,
            title: {
              display: true,
              text: this.strings.percentage_of_gdp_axis_label,
            }
          }
        }
      }
    },
    backgroundColors() {
      return this.region.datasets['net_debt'].range.map(label => {
        return label <= this.selectedYear.fsr_year ? '#002140' : '#a2b8e1';
      });
    },
    chartData() {
      return {
        labels: this.region.datasets['net_debt'].range,
        datasets: [
          {
            data: this.region.datasets['net_debt'].values,
            backgroundColor: this.backgroundColors,
          },
        ],
      }
    },
    datatable() {
      let table = {};
      table[this.strings.year_label] = this.chartData.labels;
      table[this.strings.percentage_of_gdp_axis_label] = this.chartData.datasets[0].data.map(num => num.toLocaleString(this.language));

      return table;
    }
  }
});
</script>