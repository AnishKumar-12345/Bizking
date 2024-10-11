<template>
  <div>
    <VCard
        
      class="mb-4"
    >
      <VCardText>
        <!-- 👉 Form -->
   
        <VRow>
          <!-- {{this.saveBrand.city_id}} -->
          <!-- @update:model-value="handleBrandSelection(this.saveBrand.city_id)" -->
          <VCol
            cols="12"
            md="6"
          >
            <VAutocomplete
              v-model="cityID"
              label="City Names"              
              :items="locationsdata"
              item-title="text"
              item-value="value"
              :rules="locationrules"
              required
              :menu-props="{ maxHeight: 200 }"
              @update:model-value="getSAvisittarck(cityID)"
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
    <div style="max-width: 400px">
      <VTextField
        v-model="searchQuery"
        class="mb-3" 
        density="compact"
        variant="solo"
        label="Search"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
      />
    </div>
  
    <div
      v-if="loading"
      id="app"
    >
      <div id="loading-bg">
        <div class="loading-logo">
          <img
            src="../../../assets/images/logos/comlogo.jpeg"
            height="60"
            width="68"
            alt="Logo"
          >
        </div>
        <div class="loading">
          <div class="effect-1 effects" />
          <div class="effect-2 effects" />
          <div class="effect-3 effects" />
        </div>
      </div>
    </div>
  
    <VTable
      :headers="headers"
      :items="paginatedItems"
      item-key="dessert"
      class="table-rounded"
      height="500"
      fixed-header
    >
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header"
            class="text-center"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredvisithealth.length === 0">
          <td
            colspan="16"
            class="text-center"
          >
            <h1>No data found !</h1>
          </td>
        </tr>  
         
         
          
        <tr
          v-for="(item, index) in paginatedItems"
          :key="index"
        >
          <td class="text-center">
            {{ item.sa_name }}
          </td>
          <td class="text-center">
            {{ item.route_name }}
          </td>  <td class="text-center">
            {{ item.status }}
          </td>  <td class="text-center">
            {{ item.so_deliveries_planed }}
          </td>  <td class="text-center">
            {{ item.visited_stores_count }}
          </td>  <td class="text-center">
            {{ item.so_deliveries_on_route }}
          </td>
          <td class="text-center">
            {{ item.so_deliveries_rejected_onhold }}
          </td>
          <td class="text-center">
            {{ item.login_time }}
          </td>  <td class="text-center">
            {{ item.logout_time }}
          </td>
        </tr>
      </tbody>
    </VTable>
      
    <VPagination
      v-model="page"
      :length="Math.ceil(filteredvisithealth.length / pageSize)"
      @input="updatePagination"
    /> 
     
    <!-- Dialog for visit age 3 -->
    <!--
      <VDialog
      v-model="dialog"
      max-width="1000px"
      >
      <VCard>
      <VCardTitle class="m-10">
      Visit age Gap Lessthan 3 days
      </VCardTitle>
      <VCardContent>
      <div style="max-width: 400px;padding: 20px">
      <VTextField
      v-model="searchQuery2"
      class="mb-3" 
      density="compact"
      variant="solo"
      label="Search"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      />
      </div>
  
      <VTable
      :headers="headers"         
      >
      <thead>
      <tr>
      <th
      v-for="header in headers2"
      :key="header"
      class="text-center"
      >
      {{ header.text }}
      </th>
      </tr>
      </thead>
  
      <tbody>
      <tr v-if="filteredvisitagegap3.length === 0">
      <td
      colspan="16"
      class="text-center"
      >
      <h1>No Data Found !</h1>
      </td>
      </tr>   
               
  
      <tr
      v-for="(item, index) in paginatedItems2"
      :key="index"
      >
      <td class="text-center">
      {{ item.merchant_name }}
      </td>
      <td class="text-center">
      {{ item.merchant_uid }}
      </td>
      <td class="text-center">
      {{ item.last_visited_date }}
      </td>        
      </tr>
      </tbody>
      </VTable>    
      <VPagination
      v-model="page2"
      :length="Math.ceil(filteredvisitagegap3.length / pageSize2)"
      @input="updatePagination2"
      />     
      </VCardContent>
      <VCardActions>
          
      <VBtn
      variant="elevated"
      @click="dialog = false"
      >
      Close
      </VBtn>
      </VCardActions>
      </VCard>
      </VDialog> 
    -->
  
    <!-- Dialog for visit age 5 -->
    <!--
      <VDialog
      v-model="dialog2"
      max-width="1000px"
      >
      <VCard>
      <VCardTitle>Visit age Gap Lessthan 5 days</VCardTitle>
      <VCardContent>
      <div style="max-width: 400px;padding:20px">
      <VTextField
      v-model="searchQuery3"
      class="mb-3" 
      density="compact"
      variant="solo"
      label="Search"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      />
      </div>
  
      <VTable
      :headers="headers"         
      >
      <thead>
      <tr>
      <th
      v-for="header in headers3"
      :key="header"
      class="text-center"
      >
      {{ header.text }}
      </th>
      </tr>
      </thead>
  
      <tbody>
      <tr v-if="filteredvisitagegap5.length === 0">
      <td
      colspan="16"
      class="text-center"
      >
      <h1>No Data Found !</h1>
      </td>
      </tr>   
               
  
      <tr
      v-for="(item, index) in paginatedItems3"
      :key="index"
      >
      <td class="text-center">
      {{ item.merchant_name }}
      </td>
      <td class="text-center">
      {{ item.merchant_uid }}
      </td>
      <td class="text-center">
      {{ item.last_visited_date }}
      </td>        
      </tr>
      </tbody>
      </VTable>    
      <VPagination
      v-model="page3"
      :length="Math.ceil(filteredvisitagegap5.length / pageSize3)"
      @input="updatePagination3"
      />     
      </VCardContent>
      <VCardActions>
          
      <VBtn
      variant="elevated"
      @click="dialog2 = false"
      >
      Close
      </VBtn>
      </VCardActions>
      </VCard>
      </VDialog> 
    -->
  
    <!-- Dialog for above 5 days -->
    <!--
      <VDialog
      v-model="dialog3"
      max-width="1000px"
      >
      <VCard>
      <VCardTitle>Visit age Gap Greater than and Equal to 5 days</VCardTitle>
      <VCardContent>
      <div style="max-width: 400px;padding:20px">
      <VTextField
      v-model="searchQuery4"
      class="mb-3" 
      density="compact"
      variant="solo"
      label="Search"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      />
      </div>
  
      <VTable
      :headers="headers"         
      >
      <thead>
      <tr>
      <th
      v-for="header in headers4"
      :key="header"
      class="text-center"
      >
      {{ header.text }}
      </th>
      </tr>
      </thead>
  
      <tbody>
      <tr v-if="filteredvisitagegapabove5.length === 0">
      <td
      colspan="16"
      class="text-center"
      >
      <h1>No Data Found !</h1>
      </td>
      </tr>   
               
  
      <tr
      v-for="(item, index) in paginatedItems4"
      :key="index"
      >
      <td class="text-center">
      {{ item.merchant_name }}
      </td>
      <td class="text-center">
      {{ item.merchant_uid }}
      </td>
      <td class="text-center">
      {{ item.last_visited_date }}
      </td>        
      </tr>
      </tbody>
      </VTable>    
      <VPagination
      v-model="page4"
      :length="Math.ceil(filteredvisitagegapabove5.length / pageSize4)"
      @input="updatePagination4"
      />     
      </VCardContent>
      <VCardActions>
          
      <VBtn
      variant="elevated"
      @click="dialog3 = false"
      >
      Close
      </VBtn>
      </VCardActions>
      </VCard>
      </VDialog> 
    -->
  
    <VSnackbar
      v-model="snackbar"
      :timeout="3500"
      :color="color"
    >
      {{ snackbarText }}
    </VSnackbar> 
  </div>
</template>
  
<script>
import servicescall from "@/Services"
  
export default {
  mixins: [servicescall],
  
  data(){
    return{     
      searchQuery: '',
      searchQuery2: '',
      searchQuery3: '',
      searchQuery4: '',
      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,
      loading:false,
      deliveryTrack:[],
  
      //   visitagegap3:[],
      //   visitagegap5:[],
      visitagegapabove5:[],
      interval: null,
      cityID:'',
      page: 1,
      pageSize: 10,
      page2: 1,
      pageSize2: 10,
      dialog:false,
      dialog2:false,
      dialog3:false,
      locationsdata:[],
  
      page3: 1,
      pageSize3: 10,
      page4: 1,
      pageSize4: 10,
      headers: [
        { text: 'Driver Name', value: 'sa_name' },
        { text: 'Route Name', value: 'route_name' },
        { text: 'Status', value: 'status' },  
        { text: 'SO Deliveries as Planned', value: 'so_deliveries_planed' },
        { text: 'SO Deliveries Completed', value: 'visited_stores_count' },
        { text: 'SO Deliveries On Route', value: 'so_deliveries_on_route' },
        { text: 'SO Deliveries Rejected/Onhold', value: 'so_deliveries_rejected_onhold' },

  
        { text: 'Login Time', value: 'login_time' },        
        { text: 'Logout Time', value: 'logout_time' },        
  
      ],
  
      //   headers2: [
      //     { text: 'Merchant Name', value: 'brand_name' },
      //     { text: 'Merchant UID', value: 'sku_name' },
      //     { text: 'Last Visited Date', value: 'uom' },
             
      //   ],
      //   headers3: [
      //     { text: 'Merchant Name', value: 'brand_name' },
      //     { text: 'Merchant UID', value: 'sku_name' },
      //     { text: 'Last Visited Date', value: 'uom' },
             
      //   ],
      //   headers4: [
      //     { text: 'Merchant Name', value: 'brand_name' },
      //     { text: 'Merchant UID', value: 'sku_name' },
      //     { text: 'Last Visited Date', value: 'uom' },
             
      //   ],
    }
  },
  computed:{
    // filteredvisitagegapabove5() {
    //   const lowerCaseQuery = this.searchQuery4.toLowerCase().trim()
        
    //   return this.visitagegapabove5.filter(item => {
    //     return (
    //       (item.merchant_name && item.merchant_name.toLowerCase().includes(lowerCaseQuery)) ||
    //       (item.merchant_uid && item.merchant_uid.toLowerCase().includes(lowerCaseQuery)) ||
    //       (item.last_visited_date && item.last_visited_date.toLowerCase().includes(lowerCaseQuery))
    //     )
    //   })
    // },
    // paginatedItems4() {
    //   const startIndex = (this.page4 - 1) * this.pageSize4
    //   const endIndex = startIndex + this.pageSize4      
        
    //   return this.filteredvisitagegapabove5.slice(startIndex, endIndex)
    // },
    // filteredvisitagegap5() {
    //   const lowerCaseQuery = this.searchQuery3.toLowerCase().trim()
        
    //   return this.visitagegap5.filter(item => {
    //     return (
    //       (item.merchant_name && item.merchant_name.toLowerCase().includes(lowerCaseQuery)) ||
    //       (item.merchant_uid && item.merchant_uid.toLowerCase().includes(lowerCaseQuery)) ||
    //       (item.last_visited_date && item.last_visited_date.toLowerCase().includes(lowerCaseQuery))
    //     )
    //   })
    // },
    // paginatedItems3() {
    //   const startIndex = (this.page3 - 1) * this.pageSize3
    //   const endIndex = startIndex + this.pageSize3      
        
    //   return this.filteredvisitagegap5.slice(startIndex, endIndex)
    // },
  
    // filteredvisitagegap3() {
    //   const lowerCaseQuery = this.searchQuery2.toLowerCase().trim()
        
    //   return this.visitagegap3.filter(item => {
    //     return (
    //       (item.merchant_name && item.merchant_name.toLowerCase().includes(lowerCaseQuery)) ||
    //       (item.merchant_uid && item.merchant_uid.toLowerCase().includes(lowerCaseQuery)) ||
    //       (item.last_visited_date && item.last_visited_date.toLowerCase().includes(lowerCaseQuery))
    //     )
    //   })
    // },
    // paginatedItems2() {
    //   const startIndex = (this.page2 - 1) * this.pageSize2
    //   const endIndex = startIndex + this.pageSize2      
        
    //   return this.filteredvisitagegap3.slice(startIndex, endIndex)
    // },
    filteredvisithealth() {
      const lowerCaseQuery = this.searchQuery.toLowerCase().trim()
        
      return this.deliveryTrack.filter(item => {
        return (
          (item.sa_name && item.sa_name.toLowerCase().includes(lowerCaseQuery)) ||
            (item.route_name && item.route_name.toLowerCase().includes(lowerCaseQuery)) ||
            (item.stores_count && item.stores_count.toString().includes(lowerCaseQuery)) ||
            (item.visited_stores_count && item.visited_stores_count.toString().includes(lowerCaseQuery)) ||          
            (item.status && item.status.toLowerCase().includes(lowerCaseQuery)) ||
            (item.login_time && item.login_time.toLowerCase().includes(lowerCaseQuery)) ||
            (item.logout_time && item.logout_time.toLowerCase().includes(lowerCaseQuery)) ||
            (item.so_deliveries_on_route && item.so_deliveries_on_route.toString().includes(lowerCaseQuery)) ||
            (item.so_deliveries_rejected_onhold && item.so_deliveries_rejected_onhold.toString().includes(lowerCaseQuery)) 

  
        )
      })
    },
    paginatedItems() {
      const startIndex = (this.page - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
        
      return this.filteredvisithealth.slice(startIndex, endIndex)
    },
  
    
  },
  mounted(){
    // this.cityID  = localStorage.getItem("city_id")
    // this.getvisithealthdata() 
    //   .then(() => {             
    //     this.loading = false
    //   }) 
    //   .catch(error => {             
    //     // console.error('Error fetching merchants:', error)            
    //   })
  
    // this.interval = setInterval(this.getvisithealthdata, 3600000)
  
    this.getBranchnames()
      
  },
  beforeUnmount() {
    // Clear the interval when the component is destroyed
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods:{
    // openDialog(itm){
    //   this.dialog = true
    //   this.visitagegap3 = itm
    // },
    // openDialog2(itm){
    //   this.dialog2 = true
    //   this.visitagegap5 = itm
    // },
    // openDialog3(itm){
    //   this.dialog3 = true
    //   this.visitagegapabove5 = itm
    // },
    getSAvisittarck(itm){
      this.deliveryTrack=[]
      this.loading = true
      this.getDeliveryTrack(itm).then(response => {
        console.log({response})
        if(response.data.status == 1){
          this.snackbarText = response.data.message
          this.color = "primary"
          this.snackbar = true
  
          this.deliveryTrack = response.data.data
      
          this.loading = false
           
        }else{
          this.snackbarText = response.data.message
          this.color = "on-background"
          this.snackbar = true
          this.loading = false
  
        }
  
      })
  
      //   return new Promise((resolve, reject) => {
      //     this.getVisithealth(this.cityID)
      //       .then(response => {           
      //         this.visithealth = response.data.data
  
      //         // console.log("set",  this.visithealth)          
      //         resolve() // Resolve the promise when API call is successful
      //       })
      //       .catch(error => {
      //         // console.error('Error fetching merchants:', error)
      //         reject(error) // Reject the promise if there's an error
      //       })
      //   })
    },
    updatePagination(page) {
      this.page = page
    },
  
    // updatePagination2(page) {
    //   this.page2 = page
    // },
    // updatePagination3(page) {
    //   this.page3 = page
    // },
    // updatePagination4(page) {
    //   this.page4 = page
    // },
    getBranchnames(){
      this.Locationdata().then(response=>{
     
        this.locationsdata = response.data.data.map(sales => ({
          value: sales.city_id,
          text: sales.city,
        }))
        console.log('ceck tye res',this.locationsdata)
      })
    },
  },
}
</script>