<script setup>
// Inbuilt UI
// import VueApexCharts from 'vue3-apexcharts'
// import { useTheme } from 'vuetify'
// import { hexToRgb } from '@layouts/utils'

// const vuetifyTheme = useTheme()
// const currentTheme = computed(() => {
//   return vuetifyTheme.current.value.colors
// })
// const variableTheme = computed(() => {
//   return vuetifyTheme.current.value.variables
// })
// const series = [{
//   data: [
//     0,
//     20,
//     5,
//     30,
//     15,
//     45,
//   ],
// }]
// const chartOptions = computed(() => {
//   return {
//     chart: {
//       parentHeightOffset: 0,
//       toolbar: { show: false },
//     },
//     tooltip: { enabled: false },
//     grid: {
//       borderColor: `rgba(${ hexToRgb(String(variableTheme.value['border-color'])) },${ variableTheme.value['border-opacity'] })`,
//       strokeDashArray: 6,
//       xaxis: { lines: { show: true } },
//       yaxis: { lines: { show: false } },
//       padding: {
//         top: -10,
//         left: -7,
//         right: 5,
//         bottom: 5,
//       },
//     },
//     stroke: {
//       width: 3,
//       lineCap: 'butt',
//       curve: 'straight',
//     },
//     colors: [currentTheme.value.primary],
//     markers: {
//       size: 6,
//       offsetY: 4,
//       offsetX: -2,
//       strokeWidth: 3,
//       colors: ['transparent'],
//       strokeColors: 'transparent',
//       discrete: [{
//         size: 5.5,
//         seriesIndex: 0,
//         strokeColor: currentTheme.value.primary,
//         fillColor: currentTheme.value.surface,
//         dataPointIndex: series[0].data.length - 1,
//       }],
//       hover: { size: 7 },
//     },
//     xaxis: {
//       labels: { show: false },
//       axisTicks: { show: false },
//       axisBorder: { show: false },
//     },
//     yaxis: { labels: { show: false } },
//   }
// })

// Anish UI
import { useTheme } from 'vuetify'
import triangleDark from '@/assets/images/misc/triangle-dark.png'
import triangleLight from '@/assets/images/misc/triangle-light.png'
import trophy from '@/assets/images/misc/trophy.png'
 
const vuetifyTheme = useTheme()
const triangleBg = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
})
</script>

<template>
<!-- Ibuilt UI -->
  <!-- <VCard>
    <VCardText>
      <h6 class="text-h6">
        $86.4k
      </h6>
      <VueApexCharts
        type="line"
        :options="chartOptions"
        :series="series"
        :height="100"
      />

      <p class="text-center font-weight-semibold mb-0">
        Total Profit
      </p>
    </VCardText>
  </VCard> -->

<!-- Anish UI -->
   <VCard
    title="Ongoing Opportunities!"
    
    class="position-relative"
  >
    <VCardText>
      <h1 class="text-2xl font-weight-medium text-primary">
        2
      </h1>
        <p>🎉</p>
      <!-- <p>78% of target 🚀</p> -->
      <VBtn size="small">
        View Opportunities
      </VBtn>
    </VCardText>

    <!-- Triangle Background -->
    <VImg
      :src="triangleBg"
      class="triangle-bg flip-in-rtl"
    />

    <!-- Trophy -->
    <!-- <VImg
      :src="trophy"
      class="trophy"
    /> -->
  </VCard>
</template>

<style lang="scss">
// Anish defined style
.triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.trophy {
  position: absolute;
  inline-size: 4.9375rem;
  inset-block-end: 2rem;
  inset-inline-end: 2rem;
}
</style>
