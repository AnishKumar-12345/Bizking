<script setup>
// Anish UI

import { useTheme } from 'vuetify'
import triangleDark from '@/assets/images/misc/triangle-dark.png'
import triangleLight from '@/assets/images/misc/triangle-light.png'

// import trophy from '@/assets/images/misc/trophy.png'
import avatar from '@/assets/images/avatars/avatar-14.png'
 
const vuetifyTheme = useTheme()
const triangleBg = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
})

// Inbuilt UI
// const salesByCountries = [
//   {
//     abbr: 'US',
//     amount: '$8,656k',
//     country: 'United states of america',
//     change: '+25.8%',
//     sales: '894k',
//     color: 'success',
//   },
//   {
//     abbr: 'UK',
//     amount: '$2,415k',
//     country: 'United kingdom',
//     change: '-6.2%',
//     sales: '645k',
//     color: 'error',
//   },
//   {
//     abbr: 'IN',
//     amount: '$865k',
//     country: 'India',
//     change: '+12.4%',
//     sales: '148k',
//     color: 'warning',
//   },
//   {
//     abbr: 'JA',
//     amount: '$745k',
//     country: 'Japan',
//     change: '-11.9%',
//     sales: '86k',
//     color: 'secondary',
//   },
//   {
//     abbr: 'KO',
//     amount: '$45k',
//     country: 'Korea',
//     change: '+16.2%',
//     sales: '42k',
//     color: 'error',
//   },
// ]
</script>

<template>
  <!-- Anish UI -->
  <VCard
    title="Services!"
    
    class="position-relative"
  >
    <VCardText>
      <h4 class="text-4xl font-weight-medium text-primary">
        4
      </h4>
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

    <!-- Trophy -->
    <img
      src="@/assets/images/avatars/avatar-14.png"
      class="trophy2"
    >
    <!--
      <VImg
      :src="avatar"
      
      /> 
    -->
  </VCard>
<!-- Inbuilt UI -->
  <!--
    <VCard>
    <VCardItem>
    <VCardTitle>Sales by Countries</VCardTitle>

    <template #append>
    <div class="me-n3">
    <VBtn
    icon
    size="x-small"
    variant="text"
    color="default"
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
    <VList class="card-list">
    <VListItem
    v-for="data in salesByCountries"
    :key="data.country"
    >
    <template #prepend>
    <VAvatar
    size="40"
    variant="tonal"
    :color="data.color"
    class="me-3"
    >
    {{ data.abbr }}
    </VAvatar>
    </template>

    <VListItemTitle class="mb-1">
    <span class="text-sm font-weight-semibold">{{ data.amount }}</span>
    <VIcon
    size="22"
    :color="data.change.charAt(0) === '+' ? 'success' : 'error'"
    class="mx-1"
    >
    {{ data.change.charAt(0) === '+' ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
    </VIcon>
    <span :class="`text-xs ${data.change.charAt(0) === '+' ? 'text-success' : 'text-error'}`">
    {{ data.change.slice(1) }}
    </span>
    </VListItemTitle>

    <VListItemSubtitle class="text-xs">
    {{ data.country }}
    </VListItemSubtitle>

    <template #append>
    <div>
    <h4 class="font-weight-semibold">
    {{ data.sales }}
    </h4>
    <span class="text-xs text-medium-emphasis">Sales</span>
    </div>
    </template>
    </VListItem>
    </VList>
    </VCardText>
    </VCard> 
  -->
</template>

  <style lang="scss" scoped>
// Anish defined style
.triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.trophy2 {
  position: absolute;
  inline-size: 12rem;
  inset-block-end: -1rem;
  inset-inline-end: -1rem;
}

  // .card-list {
  //   --v-card-list-gap: 1.5rem;
  // }
  </style>

