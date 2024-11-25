<script setup>
import { useTheme } from 'vuetify'
import triangleDark from '@/assets/images/misc/triangle-dark.png'
import triangleLight from '@/assets/images/misc/triangle-light.png'
import avatarg from '@/assets/images/avatars/avatar-9.png'
 
const vuetifyTheme = useTheme()
const triangleBg = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
})
</script>

<template>
  <!-- subtitle="Best seller of the month" -->
  <VCard
    title="Active Appointments!"
    
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
