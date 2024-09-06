<template>
  <div>
    <VTabs
      v-model="activeTab"
      show-arrows
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>
    <VDivider />
     
    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
      :touch="false"
    >
      <!-- Account -->
      <VWindowItem value="account">
        <Zeptopagedata />
      </VWindowItem>
    </VWindow>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import Zeptopagedata from '@/views/pages/Zepto/zeptopagedata.vue'

export default {
  components:{
    Zeptopagedata,
   
  },
  data(){
    return{
      currentroute:'',
      activeTab:'',
      tabs : [
        {
          title: 'Delivery Status',
          icon: 'mdi-account-outline',
          tab: 'account',
        },                
      ],
    }
  },
  mounted(){
    this.currentroute = useRoute()
    this.activeTab = ref(this.currentroute.params.tab)
    this.activeTab = this.tabs[0].tab
  },
}
</script>

<style lang="scss">

</style>