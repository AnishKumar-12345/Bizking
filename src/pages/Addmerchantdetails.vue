<template>
    <div>
        <VTabs v-model="activeTab" show-arrows>
      <VTab v-for="item in tabs" :key="item.icon" :value="item.tab">
        <VIcon size="20" start :icon="item.icon" />
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
        <Addmerchant/>
      </VWindowItem>

    
    </VWindow>
    </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';
import Addmerchant from '@/views/pages/Merchant/Addmerchant.vue'

export default {
    components:{
        Addmerchant,
   
    },
    data(){
        return{
            currentroute:'',
            activeTab:'',
             tabs : [
                {
                    title: 'Add Merchant Products',
                    icon: 'mdi-account-outline',
                    tab: 'account',
                },                
]
        }
    },
    mounted(){
        this.currentroute = useRoute()
        this.activeTab = ref(this.currentroute.params.tab);
         this.activeTab = this.tabs[0].tab;
    }
}
</script>
<style lang="scss">

</style>