<template>
  <div>
    <VTabs
      v-model="activeTab"
      show-arrows
    >
      <VTab
        v-for="item in tabsWithDate"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="30"
          start
          :icon="item.icon"
        />
        <h2>
          <span class="title-text">{{ item.title }}</span> &nbsp;&nbsp;
          <span class="date-text">[{{ currentDate }}]</span> 
        </h2>
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
        <Deliveryhealth />
      </VWindowItem>
    </VWindow>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import Deliveryhealth from '@/views/pages/LivedataTracking/Deliveryhealth.vue'

export default {
  components:{
    Deliveryhealth,
 
  },
  data(){
    return{
      currentroute:'',
      activeTab:'',
      tabs : [
        {
          title: 'STORE RETAIL CHAIN LEVEL DELIVERY HEALTH STATUS',
          icon: 'ic:baseline-connect-without-contact',
          tab: 'account',
        },                
      ],
      currentDate: '',
    }
  },
  computed: {
    // Compute the tabs with the current date in the format 11th October 2024
    tabsWithDate() {
      this.currentDate = this.formatDate(new Date())
      
      return this.tabs.map(tab => ({
        ...tab,
        title: tab.title, // Keep title as it is
      }))
    },
  },
  mounted(){
    this.currentroute = useRoute()
    this.activeTab = ref(this.currentroute.params.tab)
    this.activeTab = this.tabs[0].tab
  },
  methods: {
    // Format date as 11th October 2024
    formatDate(date) {
      const day = date.getDate()
      const month = date.toLocaleString('default', { month: 'long' })
      const year = date.getFullYear()
      
      const dayWithSuffix = this.getDayWithSuffix(day)

      return `${dayWithSuffix} ${month} ${year}`
    },

    // Get the day with the correct suffix (st, nd, rd, th)
    getDayWithSuffix(day) {
      if (day > 3 && day < 21) return day + 'th'
      switch (day % 10) {
      case 1: return day + 'st'
      case 2: return day + 'nd'
      case 3: return day + 'rd'
      default: return day + 'th'
      }
    },
  },
}
</script>

<style lang="scss">
.title-text {
  color: #ba8b32; /* Change this to your desired title color */
}

.date-text {
  color: #138acf; /* Change this to your desired date color */
}
</style>