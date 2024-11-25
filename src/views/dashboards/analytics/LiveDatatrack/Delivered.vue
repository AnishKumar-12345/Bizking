<script setup>
// default UI
// import aviato from '@/assets/images/logos/aviato.png'
// import bitbank from '@/assets/images/logos/bitbank.png'
// import zipcar from '@/assets/images/logos/zipcar.png'

// const earnings = [
//   { 
//     avatar: zipcar,
//     title: 'Zipcar',
//     subtitle: 'Vuejs, React & HTML',
//     amount: '$24,895.65',
//     progress: 'primary',
//   },
//   {
//     avatar: bitbank,
//     title: 'Bitbank',
//     subtitle: 'Sketch, Figma & XD',
//     amount: '$8,6500.20',
//     progress: 'info',
//   },
//   {
//     avatar: aviato,
//     title: 'Aviato',
//     subtitle: 'HTML & Anguler',
//     amount: '$1,2450.80',
//     progress: 'secondary',
//   },
// ]
import triangleDark from '@/assets/images/misc/triangle-dark.png'
import triangleLight from '@/assets/images/misc/triangle-light.png'
import { useTheme } from 'vuetify'

// import trophy from '@/assets/images/misc/trophy.png'
 
const vuetifyTheme = useTheme()
const triangleBg = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
})
</script>

<template>
  <VCard
    title="Delivered"
    
    class="position-relative" 
  >
    <VCardText>
      <h4 class="text-4xl font-weight-medium text-primary">
        50
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
      src="@/assets/images/avatars/avatar-15.png"
      class="trophy1"
    >

    <!-- Trophy -->
    <!--
      <VImg
      :src="avatar"
      class="trophy1"
      /> 
    -->
  </VCard>

<!-- deafault UI -->
  <!--
    <VCard>
    <VCardItem>
    <VCardTitle>Total Earning</VCardTitle>

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

    <VCardText class="pt-4">
    <div class="d-flex align-center">
    <h4 class="text-h4 me-2">
    $24,895
    </h4>

    <span class="text-success">
    <VIcon
    size="30"
    icon="mdi-menu-up"
    />
    <span>10%</span>
    </span>
    </div>
    <span class="text-xs">Compared to $84,325 last year</span>

    <VList class="card-list mt-9">
    <VListItem
    v-for="earning in earnings"
    :key="earning.title"
    >
    <template #prepend>
    <VAvatar
    rounded
    :image="earning.avatar"
    />
    </template>

    <VListItemTitle class="text-sm font-weight-semibold mb-1">
    {{ earning.title }}
    </VListItemTitle>
    <VListItemSubtitle class="text-xs">
    {{ earning.subtitle }}
    </VListItemSubtitle>

    <template #append>
    <div>
    <h6 class="text-sm mb-2">
    {{ earning.amount }}
    </h6>
    <VProgressLinear
    :color="earning.progress"
    model-value="80"
    />
    </div>
    </template>
    </VListItem>
    </VList>
    </VCardText>
    </VCard> 
  -->
</template>

<style lang="scss" scoped>
// deafault UI
// .card-list {
//   --v-card-list-gap: 2.625rem;
// }
.triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.trophy1 {
  position: absolute;
  inline-size: 6rem;
  inset-block-end: 0.5rem;
  inset-inline-end: 1rem;
}
</style>
