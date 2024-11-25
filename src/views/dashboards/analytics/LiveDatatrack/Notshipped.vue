<script setup>
// Anish defined UI
import triangleDark from '@/assets/images/misc/triangle-dark.png';
import triangleLight from '@/assets/images/misc/triangle-light.png';
import { useTheme } from 'vuetify';

// import trophy from '@/assets/images/misc/trophy.png'

const vuetifyTheme = useTheme()
const triangleBg = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
})

// predefined UI
// const statistics = [
//   {
//     title: 'Sales',
//     stats: '245k',
//     icon: 'mdi-trending-up',
//     color: 'primary',
//   },
//   {
//     title: 'Customers',
//     stats: '12.5k',
//     icon: 'mdi-account-outline',
//     color: 'success',
//   },
//   {
//     title: 'Product',
//     stats: '1.54k',
//     icon: 'mdi-cellphone-link',
//     color: 'warning',
//   },
//   {
//     title: 'Revenue',
//     stats: '$88k',
//     icon: 'mdi-currency-usd',
//     color: 'info',
//   },
// ]
</script>

<template>
  <VCard
    title="Not Shipped " 
    
    class="position-relative"
  >
    <VCardText>
      <h4 class="text-4xl font-weight-medium text-primary">
        2
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
    <img
      src="@/assets/images/avatars/avatar-10.png"
      class="avatarbo"
    >
    <!--
      <VImg
      :src="avatar"
      class="avatarbo"
      /> 
    -->
    <!-- Trophy -->
    <!--
      <VImg
      :src="trophy"
      class="trophy"
      /> 
    -->
  </VCard>

  <!-- predefined UI -->
  <!--
    <VCard>
    <VCardItem>
    <VCardTitle>Transactions</VCardTitle>

    <template #append>
    <div class="me-n3">
    <VBtn
    icon
    color="default"
    size="x-small"
    variant="text"
    >
    <VIcon
    size="24"
    icon="mdi-dots-vertical"
    />
    </VBtn>
    </div> 
  -->
  <!--
    </template>
    </VCardItem>

    <VCardText>
    <h6 class="text-sm mb-12">
    <span>Total 48.5% Growth 😎</span>
    <span class="font-weight-regular"> this month</span>
    </h6>

    <VRow>
    <VCol
    v-for="item in statistics"
    :key="item.title"
    cols="6"
    sm="3"
    >
    <div class="d-flex align-center">
    <div class="me-3">
    <VAvatar
    :color="item.color"
    rounded
    size="42"
    class="elevation-1"
    >
    <VIcon
    size="24"
    :icon="item.icon"
    />
    </VAvatar>
    </div>

    <div class="d-flex flex-column">
    <span class="text-caption">
    {{ item.title }}
    </span>
    <span class="text-h6 font-weight-medium">{{ item.stats }}</span>
    </div>
    </div>
    </VCol>
    </VRow>
    </VCardText>
    </VCard> 
  -->
</template>

<style lang="scss">
// Anish defined style
.triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.avatarbo {
  position: absolute;
  inline-size: 5.7rem;
  inset-block-end: -1rem;
  inset-inline-end: 0.8rem;
}
</style>