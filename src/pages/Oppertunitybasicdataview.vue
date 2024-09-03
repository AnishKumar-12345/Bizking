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
        <Oppertunitybasicdata />
      </VWindowItem>

      <!-- Security -->
      <!--
        <VWindowItem value="security">
        <AccountSettingsSecurity />
        </VWindowItem> 
      -->

      <!-- Notification -->
      <VWindowItem value="notification">
        <Oppertunityworkinfo />
      </VWindowItem>
      <VWindowItem value="quote">
        <GenerateQuote />
      </VWindowItem>
      <VWindowItem value="attach">
        <Attachment />
      </VWindowItem>
    </VWindow>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import Oppertunitybasicdata from '@/views/pages/Oppertunity/Oppertunitybasicdata.vue'
import Oppertunityworkinfo from '@/views/pages/Oppertunity/Oppertunityworkinfo.vue'
import GenerateQuote from '@/views/pages/Oppertunity/GenerateQuote.vue'
import Attachment from '@/views/pages/Oppertunity/Attachment.vue'

// import AccountSettingsAccount from '@/views/pages/account-settings/AccountSettingsAccount.vue'
// import AccountSettingsNotification from '@/views/pages/account-settings/AccountSettingsNotification.vue'
export default {
  components:{
    Oppertunitybasicdata,
    Oppertunityworkinfo,
    GenerateQuote,
    Attachment,
  },
  data(){
    return{
      currentroute:'',
      activeTab:'',
      tabs : [
        {
          title: 'Opportunity Basic Data',
          icon: 'mdi-account-outline',
          tab: 'account',
        },
        { 
          title: 'Opportunity Work Info History',
          icon: 'mdi-lock-open-outline',
          tab: 'notification',
        },
        {
          title: 'Quote generation',
          icon: 'mdi-bell-outline',
          tab: 'quote',
        },
        {
          title: 'Attachment',
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