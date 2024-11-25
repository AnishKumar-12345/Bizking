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
      :items="filteredvisithealth"
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
          v-for="(item, index) in filteredvisithealth"
          :key="index"
        >
          <td class="text-center">
            {{ item.sku_name }}
          </td>
          <td class="text-center">
            {{ item.today_sold_qty }}
          </td>  <td class="text-center">
            &#8377;{{ !isNaN(parseFloat(item.today_sold_amount))
              ? parseFloat(item.today_sold_amount).toFixed(2)
              : '0.00' }} 
            <!-- {{ item.today_sold_amount }} -->
          </td>  <td class="text-center">
            {{ item.monthly_sold_qty }}
          </td>  <td class="text-center">
            &#8377;{{ !isNaN(parseFloat(item.monthly_sold_amount))
              ? parseFloat(item.monthly_sold_amount).toFixed(2)
              : '0.00' }}
            <!-- {{ item.monthly_sold_amount }} -->
          </td>  <td class="text-center">
            {{ item.tomorrow_sold_qty }}
          </td>
          <td class="text-center">
            &#8377; 
            {{ !isNaN(parseFloat(item.tomorrow_sold_amount))
              ? parseFloat(item.tomorrow_sold_amount).toFixed(2)
              : '0.00' }}
            <!-- {{ item.tomorrow_sold_amount }} -->
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td
            class="text-center"
            style="font-weight:Bold"
          >
            Total
          </td>
          <td
            class="text-center"
            style="font-weight:Bold"
          >
            {{ todaysoldquanity }}
          </td>
          <td
            class="text-center"
            style="font-weight:Bold"
          >
            &#8377; {{ todaysoldvalue }}
          </td>
          <td
            class="text-center"
            style="font-weight:Bold"
          >
            {{ monthsellquan }}
          </td>
          <td
            class="text-center"
            style="font-weight:Bold"
          >
            &#8377; {{ monthsellammount }}
          </td>
          <td
            class="text-center"
            style="font-weight:Bold"
          >
            {{ tomorrowsellquanity }}
          </td>
          <td
            class="text-center"
            style="font-weight:Bold"
          >
            &#8377;  {{ tomorrowsellvalue }}
          </td>
        </tr>
      </tfoot>
    </VTable>
      
    <!--
      <VPagination
      v-model="page"
      :length="Math.ceil(filteredvisithealth.length / pageSize)"
      @input="updatePagination"
      />  
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
      SAsumskulevel:[],
  
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
        { text: 'SKU Name', value: 'sku_name' },
        { text: 'Today Sold Quantity', value: 'today_sold_qty' },        
        { text: 'Today Sold Value', value: 'today_sold_amount' },
        { text: 'Month Till Date Sold Quantity', value: 'monthly_sold_qty' },
        { text: 'Month Till Date Sold Value', value: 'monthly_sold_amount' },  
        { text: 'Tomorrow Sale Quantity', value: 'tomorrow_sold_qty' },        
        { text: 'Tomorrow Sale Value', value: 'tomorrow_sold_amount' },        
  
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
    monthsellammount(){
      const AllBproducts = this.SAsumskulevel.reduce((total, item) => {
        const quantity = parseFloat(item.monthly_sold_amount)

      
        if (!isNaN(quantity)) {
          return total + quantity
        }

        return total
      }, 0)

      return isNaN(AllBproducts) ? 0 : AllBproducts.toFixed(0)
    },
    monthsellquan(){
      const AllBproducts = this.SAsumskulevel.reduce((total, item) => {
        const quantity = parseFloat(item.monthly_sold_qty)

      
        if (!isNaN(quantity)) {
          return total + quantity
        }

        return total
      }, 0)

      return isNaN(AllBproducts) ? 0 : AllBproducts.toFixed(0)
    },
    todaysoldquanity(){
    
      const AllBproducts = this.SAsumskulevel.reduce((total, item) => {
        const quantity = parseFloat(item.today_sold_qty)

      
        if (!isNaN(quantity)) {
          return total + quantity
        }

        return total
      }, 0)

      return isNaN(AllBproducts) ? 0 : AllBproducts.toFixed(0)
    },
    todaysoldvalue(){
      const AllBproducts = this.SAsumskulevel.reduce((total, item) => {
        const quantity = parseFloat(item.today_sold_amount)

      
        if (!isNaN(quantity)) {
          return total + quantity
        }

        return total
      }, 0)

      return isNaN(AllBproducts) ? 0 : AllBproducts.toFixed(0)
    },
    tomorrowsellquanity(){
      const AllBproducts = this.SAsumskulevel.reduce((total, item) => {
        const quantity = parseFloat(item.tomorrow_sold_qty)

      
        if (!isNaN(quantity)) {
          return total + quantity
        }

        return total
      }, 0)

      return isNaN(AllBproducts) ? 0 : AllBproducts.toFixed(0)
    },
    tomorrowsellvalue(){
      const AllBproducts = this.SAsumskulevel.reduce((total, item) => {
        const quantity = parseFloat(item.tomorrow_sold_amount)

      
        if (!isNaN(quantity)) {
          return total + quantity
        }

        return total
      }, 0)

      return isNaN(AllBproducts) ? 0 : AllBproducts.toFixed(0)
    },
    filteredvisithealth() {
      const lowerCaseQuery = this.searchQuery.toLowerCase().trim()
        
      return this.SAsumskulevel.filter(item => {
        return (
          (item.sku_name && item.sku_name.toLowerCase().includes(lowerCaseQuery)) ||
            (item.today_sold_qty && item.today_sold_qty.toString().includes(lowerCaseQuery)) ||
            (item.today_sold_amount && item.today_sold_amount.toString().includes(lowerCaseQuery)) ||
            (item.monthly_sold_qty && item.monthly_sold_qty.toString().includes(lowerCaseQuery)) ||          
            (item.monthly_sold_amount && item.monthly_sold_amount.toString().includes(lowerCaseQuery)) ||
            (item.tomorrow_sold_qty && item.tomorrow_sold_qty.toString().includes(lowerCaseQuery)) ||
            (item.tomorrow_sold_amount && item.tomorrow_sold_amount.toString().includes(lowerCaseQuery)) 
  
        )
      })
    },

    // paginatedItems() {
    //   const startIndex = (this.page - 1) * this.pageSize
    //   const endIndex = startIndex + this.pageSize
        
    //   return this.filteredvisithealth.slice(startIndex, endIndex)
    // },
  
    
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
      this.SAsumskulevel=[]
      this.loading = true
      this.getSAlevelsumtrack(itm).then(response => {
        console.log({response})
        if(response.data.status == 1){
          this.snackbarText = response.data.message
          this.color = "primary"
          this.snackbar = true
  
          this.SAsumskulevel = response.data.data
      
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