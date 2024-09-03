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
        <Outputstockupdate />
      </VWindowItem>

      <VWindowItem value="attach">
        <Outputstockreport />
      </VWindowItem>
    </VWindow>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import Outputstockupdate from '@/views/pages/Ware-house/Outputstockupdate.vue'
import Outputstockreport from '@/views/pages/Ware-house/Outputstockreport.vue'


export default {
  components:{
    Outputstockupdate,
    Outputstockreport,
   
  },
  data(){
    return{
      currentroute:'',
      activeTab:'',
      tabs : [
        {
          title: 'Acknowledged Sales Orders',
          icon: 'mdi-account-outline',
          tab: 'account',
        }, 
        {
          title: 'Acknowledged Sales Orders Report',
          icon: 'teenyicons:attachment-outline',
          tab: 'attach',
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