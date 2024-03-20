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
        <LeadBasicdata/>
      </VWindowItem>

      <!-- Security -->
      <!-- <VWindowItem value="security">
        <AccountSettingsSecurity />
      </VWindowItem> -->

      <!-- Notification -->
      <VWindowItem value="notification">
        <Leadworkinfo />
      </VWindowItem>
    </VWindow>
    </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';
import LeadBasicdata from '@/views/pages/Lead/LeadBasicdata.vue'
import Leadworkinfo from '@/views/pages/Lead/Leadworkinfo.vue'

// import AccountSettingsAccount from '@/views/pages/account-settings/AccountSettingsAccount.vue'
// import AccountSettingsNotification from '@/views/pages/account-settings/AccountSettingsNotification.vue'
export default {
    components:{
        LeadBasicdata,
        Leadworkinfo
    },
    data(){
        return{
            currentroute:'',
            activeTab:'',
             tabs : [
                {
                    title: 'Lead Basic Data',
                    icon: 'mdi-account-outline',
                    tab: 'account',
                },
                { 
                  title: 'Work Info History',
                  icon: 'mdi-lock-open-outline',
                  tab: 'notification',
                },
                // {
                //     title: 'Work Info History',
                //     icon: 'mdi-bell-outline',
                //     tab: 'notification',
                // },
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