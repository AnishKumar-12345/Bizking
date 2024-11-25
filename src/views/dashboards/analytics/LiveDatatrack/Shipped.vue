<script setup>
// import VueApexCharts from 'vue3-apexcharts'
// import { useTheme } from 'vuetify'
// import { hexToRgb } from '@layouts/utils'

// const vuetifyTheme = useTheme()
// const options = computed(() => {
//   const currentTheme = ref(vuetifyTheme.current.value.colors)
//   const variableTheme = ref(vuetifyTheme.current.value.variables)
//   const disabledColor = `rgba(${ hexToRgb(currentTheme.value['on-surface']) },${ variableTheme.value['disabled-opacity'] })`
//   const borderColor = `rgba(${ hexToRgb(String(variableTheme.value['border-color'])) },${ variableTheme.value['border-opacity'] })`
  
//   return {
//     chart: {
//       parentHeightOffset: 0,
//       toolbar: { show: false },
//     },
//     plotOptions: {
//       bar: {
//         borderRadius: 9,
//         distributed: true,
//         columnWidth: '40%',
//         endingShape: 'rounded',
//         startingShape: 'rounded',
//       },
//     },
//     stroke: {
//       width: 2,
//       colors: [currentTheme.value.surface],
//     },
//     legend: { show: false },
//     grid: {
//       borderColor,
//       strokeDashArray: 7,
//       padding: {
//         top: -1,
//         right: 0,
//         left: -12,
//         bottom: 5,
//       },
//     },
//     dataLabels: { enabled: false },
//     colors: [
//       currentTheme.value.background,
//       currentTheme.value.background,
//       currentTheme.value.background,
//       currentTheme.value.primary,
//       currentTheme.value.background,
//       currentTheme.value.background,
//     ],
//     states: {
//       hover: { filter: { type: 'none' } },
//       active: { filter: { type: 'none' } },
//     },
//     xaxis: {
//       categories: [
//         'Sun',
//         'Mon',
//         'Tue',
//         'Wed',
//         'Thu',
//         'Fri',
//         'Sat',
//       ],
//       tickPlacement: 'on',
//       labels: { show: false },
//       crosshairs: { opacity: 0 },
//       axisTicks: { show: false },
//       axisBorder: { show: false },
//     },
//     yaxis: {
//       show: true,
//       tickAmount: 4,
//       labels: {
//         offsetX: -17,
//         style: {
//           colors: disabledColor,
//           fontSize: '12px',
//         },
//         formatter: value => `${ value > 999 ? `${ (value / 1000).toFixed(0) }` : value }k`,
//       },
//     },
//   }
// })
// const series = [{
//   data: [
//     37,
//     57,
//     45,
//     75,
//     57,
//     40,
//     65,
//   ],
// }]

// Anish UI
import triangleDark from '@/assets/images/misc/triangle-dark.png';
import triangleLight from '@/assets/images/misc/triangle-light.png';
import { useTheme } from 'vuetify';

// import trophy from '@/assets/images/misc/trophy.png'
 
const vuetifyTheme = useTheme()
const triangleBg = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
})
</script>

<template>
  <!-- subtitle="Best seller of the month" -->
  <VCard
    title="Shipped - On Route "
    
    class="position-relative"
  >
    <VCardText>
      <h4 class="text-4xl font-weight-medium text-primary me-2">
        100
      </h4>
      <!-- <v-space></v-space> --> 
      <p>🎉</p>
      <!-- <p>78% of target 🚀</p> -->
      <VBtn size="small">
        View 
      </VBtn>
    </VCardText>

    <!-- Triangle Background -->
    <VImg
      :src="triangleBg"
      class="triangle-bg flip-in-rtl"
    />
    <img
      src="@/assets/images/avatars/avatar-11.png"
      class="trophy"
    >

    <!-- Trophy -->
    <!--
      <VImg
      :src="avatar"
      class="trophy"
      /> 
    --> 
  </VCard>
<!-- default UI -->
  <!--
    <VCard>
    <VCardItem>
    <VCardTitle>Weekly Overview</VCardTitle>

    <template #append>
    <div class="me-n3">
    <VBtn
    icon
    size="x-small"
    color="default"
    variant="text"
    >
    <VIcon
    size="24"
    icon="mdi-dots-vertical"
    />
    </VBtn>
    </div>
    </template>
    </VCardItem>

    <VCardText>
    <VueApexCharts
    type="bar"
    :options="options"
    :series="series"
    :height="220"
    />

    <div class="d-flex align-center mb-3">
    <h5 class="text-h5 me-4">
    45%
    </h5>
    <p>
    Your sales performance is 45% 😎 better compared to last month
    </p>
    </div>

    <VBtn block>
    Details
    </VBtn>
    </VCardText>
    </VCard> 
  -->
</template>

<style lang="scss">
.triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.trophy {
  position: absolute;
  inline-size: 5.8rem;
  inset-block-end: -1rem;
  inset-inline-end: 0.6rem;
}
</style>

