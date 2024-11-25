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
              @update:model-value="getvisithealthdata(cityID)"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <h2 class="stores-count">
              STORES COUNT <span style="color:rgb(13, 180, 13)">{{ todaysoldquanity }}</span>
            </h2> 
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
          <td
  
            class="text-center"
          >
            {{ item.merchant_name }}
          </td> 
          <td
        
            class="text-center"
          >
            {{ item.stores_count }}
          </td> 
          <td
        
            class="text-center"
          >
            <a @click="openDialog(item.sa_visit_age_gap_3_merchants)">   
              
              <VChip
                color="success"
                class="font-weight-medium"
                size="small"
              >  {{ item.sa_visit_age_gap_3 }}    </VChip>
             
            </a>
          </td> <td
        
            class="text-center"
          >
            <a @click="openDialog2(item.sa_visit_age_gap_5_merchants)"> <VChip
              color="warning"
              class="font-weight-medium"
              size="small"
            >{{ item.sa_visit_age_gap_5 }}</VChip></a>
          </td> <td
        
            class="text-center"
          >
            <a @click="openDialog3(item.sa_visit_age_gap_above_merchants)"> <VChip
              color="error"
              class="font-weight-medium"
              size="small"
            >{{ item.sa_visit_age_gap_above }} </VChip> </a>
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
    <VDialog
      v-model="dialog"
      max-width="1000px"
    >
      <VCard>
        <VCardTitle
          class="mt-5 text-h5 text-center"
        >
          <span style="background-color: #bf9442; border-radius: 8px; padding: 10px; box-shadow: 0 2px 5px rgba(185, 178, 178, 0.1);color:#ffffff"> VISIT AGE GAP LESS THAN 3 DAYS </span>
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
          <!-- <VBtn @click="validateForm()">Save</VBtn> -->
          <VBtn
            variant="elevated"
            @click="dialog = false"
          >
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Dialog for visit age 5 -->
    <VDialog
      v-model="dialog2"
      max-width="1000px"
    >
      <VCard>
        <VCardTitle class="mt-5 text-h5 text-center">
          <span style="background-color: #bf9442; border-radius: 8px; padding: 10px; box-shadow: 0 2px 5px rgba(185, 178, 178, 0.1);color:#ffffff">VISIT AGE GAP LESS THAN 5 DAYS</span>
        </VCardTitle>
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
          <!-- <VBtn @click="validateForm()">Save</VBtn> -->
          <VBtn
            variant="elevated"
            @click="dialog2 = false"
          >
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Dialog for above 5 days -->
    <VDialog
      v-model="dialog3"
      max-width="1000px"
    >
      <VCard>
        <VCardTitle class="mt-5 text-h5 text-center">
          <span style="background-color: #bf9442; border-radius: 8px; padding: 10px; box-shadow: 0 2px 5px rgba(185, 178, 178, 0.1);color:#ffffff">VISIT AGE GAP GREATER THAN EQUAL AND EQUAL TO 5 DAYS</span>
        </VCardTitle>
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
          <!-- <VBtn @click="validateForm()">Save</VBtn> -->
          <VBtn
            variant="elevated"
            @click="dialog3 = false"
          >
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VSnackbar
      v-model="snackbar"
      :timeout="3500"
      :color="color"
    >
      {{ snackbarText }}
      <!-- <VBtn text @click="snackbar = false">Close</VBtn> -->
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
      visithealth:[],
      visitagegap3:[],
      visitagegap5:[],
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
        { text: 'Retail Chain', value: 'brand_name' },
        { text: 'Stores Count', value: 'sku_name' },
        { text: 'Visit Age < 3Days', value: 'uom' },
        { text: 'Visit Age < 5Days', value: 'hsn_code' },
        { text: 'Visit Age >= 5Days', value: 'available_qty' },        
      ],
      headers2: [
        { text: 'Merchant Name', value: 'brand_name' },
        { text: 'Merchant UID', value: 'sku_name' },
        { text: 'Last Visited Date', value: 'uom' },
           
      ],
      headers3: [
        { text: 'Merchant Name', value: 'brand_name' },
        { text: 'Merchant UID', value: 'sku_name' },
        { text: 'Last Visited Date', value: 'uom' },
           
      ],
      headers4: [
        { text: 'Merchant Name', value: 'brand_name' },
        { text: 'Merchant UID', value: 'sku_name' },
        { text: 'Last Visited Date', value: 'uom' },
           
      ],
    }
  },
  computed:{
    todaysoldquanity(){
      
      const AllBproducts = this.visithealth.reduce((total, item) => {
        const quantity = parseFloat(item.stores_count)
  
        
        if (!isNaN(quantity)) {
          return total + quantity
        }
  
        return total
      }, 0)
  
      return isNaN(AllBproducts) ? 0 : AllBproducts.toFixed(0)
    },

    filteredvisitagegapabove5() {
      const lowerCaseQuery = this.searchQuery4.toLowerCase().trim()
      
      return this.visitagegapabove5.filter(item => {
        return (
          (item.merchant_name && item.merchant_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.merchant_uid && item.merchant_uid.toLowerCase().includes(lowerCaseQuery)) ||
          (item.last_visited_date && item.last_visited_date.toLowerCase().includes(lowerCaseQuery))
        )
      })
    },
    sortedItems3() {
      return this.filteredvisitagegapabove5
        .slice() // Create a shallow copy of the array
        .sort((a, b) => new Date(b.last_visited_date) - new Date(a.last_visited_date)) // Sort in descending order
    },
    paginatedItems4() {
      const startIndex = (this.page4 - 1) * this.pageSize4
      const endIndex = startIndex + this.pageSize4      
      
      return this.sortedItems3.slice(startIndex, endIndex)
    },
    filteredvisitagegap5() {
      const lowerCaseQuery = this.searchQuery3.toLowerCase().trim()
      
      return this.visitagegap5.filter(item => {
        return (
          (item.merchant_name && item.merchant_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.merchant_uid && item.merchant_uid.toLowerCase().includes(lowerCaseQuery)) ||
          (item.last_visited_date && item.last_visited_date.toLowerCase().includes(lowerCaseQuery))
        )
      })
    },

    sortedItems2() {
      return this.filteredvisitagegap5
        .slice() // Create a shallow copy of the array
        .sort((a, b) => new Date(b.last_visited_date) - new Date(a.last_visited_date)) // Sort in descending order
    },
    paginatedItems3() {
      const startIndex = (this.page3 - 1) * this.pageSize3
      const endIndex = startIndex + this.pageSize3      
      
      return this.sortedItems2.slice(startIndex, endIndex)
    },
   
    filteredvisitagegap3() {
      const lowerCaseQuery = this.searchQuery2.toLowerCase().trim()
      
      return this.visitagegap3.filter(item => {
        return (
          (item.merchant_name && item.merchant_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.merchant_uid && item.merchant_uid.toLowerCase().includes(lowerCaseQuery)) ||
          (item.last_visited_date && item.last_visited_date.toLowerCase().includes(lowerCaseQuery))
        )
      })
    },
    sortedItems() {
      return this.filteredvisitagegap3
        .slice() // Create a shallow copy of the array
        .sort((a, b) => new Date(b.last_visited_date) - new Date(a.last_visited_date)) // Sort in descending order
    },
    paginatedItems2() {
      const startIndex = (this.page2 - 1) * this.pageSize2
      const endIndex = startIndex + this.pageSize2      
      
      return this.sortedItems.slice(startIndex, endIndex)
    },
    filteredvisithealth() {
      const lowerCaseQuery = this.searchQuery.toLowerCase().trim()
      
      return this.visithealth.filter(item => {
        return (
          (item.merchant_name && item.merchant_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.sa_delivery_age_gap_3 && item.sa_delivery_age_gap_3.toString().includes(lowerCaseQuery)) ||
          (item.sa_delivery_age_gap_5 && item.sa_delivery_age_gap_5.toString().includes(lowerCaseQuery)) ||
          (item.sa_delivery_age_gap_above && item.sa_delivery_age_gap_above.toString().includes(lowerCaseQuery)) ||          
          (item.stores_count && item.stores_count.toString().includes(lowerCaseQuery))
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
    openDialog(itm){
      this.dialog = true
      this.visitagegap3 = itm
    },
    openDialog2(itm){
      this.dialog2 = true
      this.visitagegap5 = itm
    },
    openDialog3(itm){
      this.dialog3 = true
      this.visitagegapabove5 = itm
    },
    getvisithealthdata(itm){
      this.visithealth=[]
      this.loading = true
      this.getVisithealth(itm).then(response => {
        console.log({response})
        if(response.data.status == 1){
          this.snackbarText = response.data.message
          this.color = "primary"
          this.snackbar = true
          this.visithealth = response.data.data
    
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
    updatePagination2(page) {
      this.page2 = page
    },
    updatePagination3(page) {
      this.page3 = page
    },
    updatePagination4(page) {
      this.page4 = page
    },
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

<style>
.stores-count {
    background-color: #f0f0f0; /* Light gray background */
    border: 1px solid #ccc; /* Light gray border */
    border-radius: 5px; /* Rounded corners */
    padding: 12px; /* Padding around the text */
    text-align: center; /* Center the text */
    font-weight: bold; /* Make the text bold */
    color: #333; /* Darker text color */
}
</style>