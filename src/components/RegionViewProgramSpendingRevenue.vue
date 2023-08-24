<template>
  <LineChart :chartData="chartData" :options="options" class="dark:bg-white dark:p-4 dark:rounded  h-96" />
  <Details :label="strings.alt_version_handle" class="mt-2">
    <RegionChartAltTable :datatable="datatable" />
  </Details>
</template>

<script>
import { mapState } from 'pinia'
import store from "../Store.js"
import { defineComponent, ref } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import Region from '../Models/Region';
import Localizer from "../Localizer"
import Details from '../components/Details'
import RegionChartAltTable from '../components/RegionChartAltTable'

Chart.register(...registerables);

export default defineComponent({
  components: { LineChart, Details, RegionChartAltTable },
  props: {
    region: { type: Region, required: true },
  },
  computed: {
    ...mapState(store, ['language', 'strings', 'selectedYear']),
    options() {
      return {
        maintainAspectRatio: false,
        responsive: true,
        aspectRatio: 3,
        interaction: {
          intersect: false
        },
        radius: 0,
        plugins: {
          legend: {
            display: true,
            position: "bottom"
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
                  label += localizer.__('percentage_of_tooltip_label', { percentage: new Intl.NumberFormat(`${this.language}-CA`, { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(context.parsed.y / 100) });
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

    chartData() {
      return {
        labels: this.region.datasets['revenue'].range,
        datasets: [
          {
            data: this.region.datasets['revenue'].values,
            label: this.strings.revenue_label,
            borderColor: "#2d5071",
            cubicInterpolationMode: 'monotone',
            segment: {
              borderDash: ctx => {
                if (ctx.p0.parsed.x > this.region.datasets['revenue'].range.indexOf(this.selectedYear.fsr_year)) return [3, 2];
                return undefined;
              },
            },
          },
          {
            data: this.region.datasets['program_spending'].values,
            label: this.strings.program_spending_label,
            borderColor: "#c85c7a",
            cubicInterpolationMode: 'monotone',
            segment: {
              borderDash: ctx => {
                if (ctx.p0.parsed.x > this.region.datasets['revenue'].range.indexOf(this.selectedYear.fsr_year)) return [3, 2];
                return undefined;
              },
            },
          },
        ],
      }
    },
    datatable() {
      let table = {};
      table[this.strings.year_label] = this.chartData.labels;
      table[`${this.chartData.datasets[0].label
        } (${this.strings.percentage_of_gdp_axis_label})`] = this.chartData.datasets[0].data.map(num => num.toLocaleString(this.language, { minimumFractionDigits: 1, maximumFractionDigits: 1 }));
      table[`${this.chartData.datasets[1].label
        } (${this.strings.percentage_of_gdp_axis_label})`] = this.chartData.datasets[1].data.map(num => num.toLocaleString(this.language, { minimumFractionDigits: 1, maximumFractionDigits: 1 }));

      return table;
    }
  }
});
</script>