<script setup>
import AnalyticsAward from '@/views/dashboards/analytics/AnalyticsAward.vue'
import AnalyticsBarCharts from '@/views/dashboards/analytics/AnalyticsBarCharts.vue'
import AnalyticsDatatable from '@/views/dashboards/analytics/AnalyticsDatatable.vue'
import AnalyticsDepositWithdraw from '@/views/dashboards/analytics/AnalyticsDepositWithdraw.vue'
import AnalyticsSalesByCountries from '@/views/dashboards/analytics/AnalyticsSalesByCountries.vue'
import AnalyticsTotalEarning from '@/views/dashboards/analytics/AnalyticsTotalEarning.vue'
import AnalyticsTotalProfitLineCharts from '@/views/dashboards/analytics/AnalyticsTotalProfitLineCharts.vue'
import AnalyticsTransactions from '@/views/dashboards/analytics/AnalyticsTransactions.vue'
import AnalyticsWeeklyOverview from '@/views/dashboards/analytics/AnalyticsWeeklyOverview.vue'
import CardStatisticsVertical from '@core/components/CardStatisticsVertical.vue'
import PoSoCreate from '@/views/dashboards/analytics/LiveDatatrack/PoSoCreate.vue'
import Notshipped from '@/views/dashboards/analytics/LiveDatatrack/Notshipped.vue'
import Shipped from '@/views/dashboards/analytics/LiveDatatrack/Shipped.vue'
import Delivered from '@/views/dashboards/analytics/LiveDatatrack/Delivered.vue'
import Rejected from '@/views/dashboards/analytics/LiveDatatrack/Rejected.vue'


import { ref } from 'vue'

const storedValue = ref(localStorage.getItem('userRole'))
console.log('set',storedValue)

const totalProfit = {
  title: 'Total Profit',
  color: 'secondary',
  icon: 'mdi-poll',
  stats: '$25.6k',
  change: 42,
  subtitle: 'Weekly Project',
}
const newProject = {
  title: 'New Project',
  color: 'primary',
  icon: 'mdi-briefcase-variant-outline',
  stats: '862',
  change: -18,
  subtitle: 'Yearly Project',
}
</script>

<template>
  <VRow>
    <VCol
      v-if="storedValue != 'Brand Associate'"     
      cols="12"
      md="4"
    >
      <AnalyticsAward /> 
    </VCol>

    <VCol
      v-if="storedValue === 'Brand Associate'"     
      cols="12"
      md="4"
    >
      <PoSoCreate /> 
    </VCol>

    <VCol
      v-if="storedValue != 'Brand Associate'"     

      cols="12"
      md="4"
    >
      <AnalyticsTransactions />
    </VCol>

    <VCol
      v-if="storedValue === 'Brand Associate'"     

      cols="12"
      md="4"
    >
      <Notshipped />
    </VCol>

    <VCol
      v-if="storedValue != 'Brand Associate'"
      cols="12" 
      md="4"
    >
      <AnalyticsWeeklyOverview />
    </VCol>

    <VCol
      v-if="storedValue === 'Brand Associate'"
      cols="12" 
      md="4"
    >
      <Shipped />
    </VCol>

    <VCol
      v-if="storedValue != 'Brand Associate'"
      cols="12"
      md="4"
    >
      <AnalyticsTotalEarning />
    </VCol>
    <VCol
      v-if="storedValue === 'Brand Associate'"
      cols="12"
      md="4"
    >
      <Delivered />
    </VCol>

    <!--
      <VCol
      cols="12"
      md="4"
      >
      <VRow class="match-height">
      <VCol
      cols="12"
      sm="6"
      >
      <AnalyticsTotalProfitLineCharts />
      </VCol>

      <VCol
      cols="12"
      sm="6"
      >
      <CardStatisticsVertical v-bind="totalProfit" /> 
      </VCol>

      <VCol
      cols="12"
      sm="6"
      >
      <CardStatisticsVertical v-bind="newProject" /> 
      </VCol>

      <VCol
      cols="12"
      sm="6"
      >
      <AnalyticsBarCharts /> 
      </VCol>
      </VRow>
      </VCol> 
    -->

    <VCol
      v-if="storedValue != 'Brand Associate'"
      cols="12"
      md="4"
    >
      <AnalyticsSalesByCountries />
    </VCol>

    <VCol
      v-if="storedValue === 'Brand Associate'"
      cols="12"
      md="4"
    >
      <Rejected />
    </VCol>

    <VCol
      v-if="storedValue != 'Brand Associate'"
      cols="12"
      md="4"
    >
      <AnalyticsDepositWithdraw />
    </VCol>

    <!--
      <VCol cols="12">
      <AnalyticsDatatable />
      </VCol> 
    -->
  </VRow>
</template>
