<template>
  <LineChart :chartData="chartData" :options="options" />
</template>

<script>
import { mapState } from 'pinia'
import store from "../Store.js"
import { defineComponent, ref } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import Region from '../Models/Region';
import Localizer from "../Localizer"

Chart.register(...registerables);

export default defineComponent({
  components: { LineChart },
  props: {
    region: { type: Region, required: true },
  },
  computed: {
    ...mapState(store, ['language', 'strings', 'selectedYear']),
    options() {
      return {
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
    }
  }
});
</script>