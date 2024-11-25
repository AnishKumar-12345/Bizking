<script setup>
import triangleDark from '@/assets/images/misc/triangle-dark.png'
import triangleLight from '@/assets/images/misc/triangle-light.png'
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const dialog = ref(false)
const opendialog = () => {
  dialog.value = true
}

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th' // For 11th to 20th
  switch (day % 10) {
  case 1: return 'st'
  case 2: return 'nd'
  case 3: return 'rd'
  default: return 'th'
  }
}

// Function to get the last 8 days formatted as '16th Oct'
function getLastDays() {
  const days = []
  const today = new Date()

  // Generate the last 8 days
  for (let i = 7; i >= 0; i--) {
    const pastDate = new Date(today)
    pastDate.setDate(today.getDate() - i)
    
    const day = pastDate.getDate()
    const suffix = getOrdinalSuffix(day) // Get the ordinal suffix
    const month = pastDate.toLocaleString('default', { month: 'short' }) // Get the month abbreviation

    const formattedDate = `${day}${suffix} ${month}` // Format as '16th Oct'
    days.push(formattedDate)
  }

  return days
}

const series = ref([{
  name: 'Sales',
  data: [30, 40, 35, 20, 50, 70, 57, 90],
}])
const chartOptions = ref({
  xaxis: {
    categories : getLastDays(),
  },
})
const vuetifyTheme = useTheme()
const triangleBg = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
})
</script>

<template>
  <!-- subtitle="Best seller of the month" -->
  <VCard
    title="PO/SO Created"
    
    class="position-relative"
  >
    <VCardText>
      <h4 class="text-4xl font-weight-medium text-primary">
        2
      </h4>
      <p>🎉</p>
      <!-- <p>78% of target 🚀</p> -->
      <VBtn
        size="small" 
        @click="opendialog"
      >
        View 
      </VBtn>
    </VCardText>

    <!-- Triangle Background -->
    <VImg
      :src="triangleBg"
      class="triangle-bg flip-in-rtl"
    />
    <img
      src="@/assets/images/avatars/avatar-9.png"
      class="avatarg"
    >

    <!-- Trophy -->
    <!--
      <VImg
      :src="avatarg"
      class="avatarg"
      /> 
    -->
  </VCard> 
  <VDialog
    v-model="dialog"
    max-width="600px"
  > 
    <VCard> 
      <VCardText>
        <h4> Bengaluru </h4>
        <div>
          <VueApexCharts
            type="line"
            :series="series"
            :options="chartOptions"
          />
        </div>
      </VCardText>
    </VCard>
  </VDialog> 
</template>

<style lang="scss">
.triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.avatarg {
  position: absolute;
  inline-size: 7rem;
  inset-block-end: -1rem;
  inset-inline-end: 0.8rem;
}
</style>
