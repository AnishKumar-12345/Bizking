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
      <VWindowItem value="basicdata">
        <UpdateOppertunity/>
      </VWindowItem>

     <VWindowItem value="workinfohistory">
        <Workinfo/>
      </VWindowItem>

      <VWindowItem value="quote">
        <GenerateQuote/>
      </VWindowItem>
    </VWindow>
    </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';
import UpdateOppertunity from '@/views/pages/Oppertunity/UpdateOppertunity.vue'
import Workinfo from '@/views/pages/Oppertunity/Workinfo.vue'
import GenerateQuote from '@/views/pages/Oppertunity/GenerateQuote.vue'

export default {
    components:{
        UpdateOppertunity,
   Workinfo,
   GenerateQuote,
    },
    data(){
        return{
            currentroute:'',
            activeTab:'',
             tabs : [
                {
                    title: 'Opp Basic Data',
                    icon: 'mdi-account-outline',
                    tab: 'basicdata',
                }, 
                 {
                    title: 'Work Info History',
                    icon: 'mdi-account-outline',
                    tab: 'workinfohistory',
                },     
                {
                    title: 'Quote',
                    icon: 'mdi-account-outline',
                    tab: 'quote',
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