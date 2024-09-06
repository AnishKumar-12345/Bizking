<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard
          title="Check Delivery Status"
          class="mb-4"
        >
          <VCardText>
            <!-- 👉 Form -->
            <VForm
             
              class="mt-6"
            >
              <VRow>
                <VCol
                  md="6"
                  cols="12"
                >
                  <!-- @update:model-value="locationdetails" -->
                  <VAutocomplete
                    v-model="locationdata"
                    label="Location"
                    :items="cityLoaction"               
                    item-value="value"
                    item-title="text"                
                    :menu-props="{ maxHeight: 200 }"
                    @update:model-value="Toggletab(storename)"
                  />
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <VCard v-if="togglecard"> 
          <VCardText> 
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
                <VForm                        
                  class="mt-6"
                >
                  <VRow>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <!-- @update:model-value="locationdetails" -->
                      <VAutocomplete
                        v-model="storename"
                        label="Store Name"
                        :items="['Zepto','D-Mart']"           
                                       
                        :menu-props="{ maxHeight: 200 }"
                        @update:model-value="getDelivered(storename)"
                      />
                    </VCol>
                  </VRow>
                </VForm>

                <div style="max-width:400px;">
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
                  <VSpacer />

                  <VBtn
                    type="reset"
                    color="primary" 
                    variant="tonal"
                    @click="resetAvatar(storename)"
                  >
                    <span class="d-none d-sm-block">Refresh</span>
                    <VIcon
                      icon="mdi-refresh"
                      class="d-sm-none"
                    />
                  </VBtn>
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
                
                <VTable> 
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
                    <tr v-if="filtereddata.length === 0">
                      <td
                        colspan="16"
                        class="text-center"
                      >
                        <h1>No data found !</h1>
                      </td>
                    </tr>    
                   
                   
                    <tr
                      v-for="item in sortDeliver"
                      :key="item.so_status"
                    >
                      <td class="text-center">
                        {{ item.created_date }}
                      </td>
                      <td class="text-center">
                        {{ item.merchant_name }}
                      </td><td class="text-center">
                        {{ item.po_number }}
                      </td>
                      <td class="text-center">
                        {{ item.so_number }}
                      </td><td class="text-center">
                        {{ item.status }}
                      </td>
                    </tr>
                  </tbody>
                </VTable>
                <!--
                  <VBtn
                  type="reset"
                  color="primary" 
                  variant="tonal"
                  @click="resetAvatar"
                  >
                  <span class="d-none d-sm-block">Refresh</span>
                  <VIcon
                  icon="mdi-refresh"
                  class="d-sm-none"
                  />
                  </VBtn> 
                -->
                <VPagination
                  v-model="page"
                  :length="Math.ceil(filtereddata.length / pageSize)"
                  @input="updatePagination"
                />
              </VWindowItem>  

              <VWindowItem value="attach">
                <VForm                        
                  class="mt-6"
                >
                  <VRow>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <!-- @update:model-value="locationdetails" -->
                      <VAutocomplete
                        v-model="storename2"
                        label="Store Name"
                        :items="['Zepto','D-Mart']"             
                                       
                        :menu-props="{ maxHeight: 200 }"
                        @update:model-value="getnotdelivereddata(storename2)"
                      />
                    </VCol>
                  </VRow>
                </VForm>

                <div style="max-width:400px;">
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

                <div
                  v-if="loading2"
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
                
                <VTable> 
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
                    <tr v-if="filtereddata2.length === 0">
                      <td
                        colspan="16"
                        class="text-center"
                      >
                        <h1>No data found !</h1>
                      </td>
                    </tr>    
                   
                   
                    <tr
                      v-for="item in sortDeliver2"
                      :key="item.so_status"
                    >
                      <td class="text-center">
                        {{ item.created_date }}
                      </td>
                      <td class="text-center">
                        {{ item.merchant_name }}
                      </td><td class="text-center">
                        {{ item.po_number }}
                      </td>
                      <td class="text-center">
                        {{ item.so_number }}
                      </td> 
                      <td class="text-center">
                        {{ item.remarks }}
                      </td>
                      <td class="text-center">
                        {{ item.status }}
                      </td>
                    </tr>
                  </tbody>
                </VTable>
                
                <VPagination
                  v-model="page2"
                  :length="Math.ceil(filtereddata2.length / pageSize2)"
                  @input="updatePagination2"
                />
              </VWindowItem>
            </VWindow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>   
    <VSnackbar
      v-model="snackbar"
      :timeout="3000"
      :color="color"
    >
      {{ snackbarText }}
      <!-- <VBtn text @click="snackbar = false">Close</VBtn> -->
    </VSnackbar> 
  </div>
</template>

<script>
import servicescall from '@/Services'

export default {
  mixins: [servicescall],

  data(){
    return{
      cityLoaction:[],
      locationdata:'',
      activeTab:'',
      storename:'',
      storename2:'',
      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,
      loading:false,
      Delivereddatas:[],
      searchQuery:'',
      searchQuery2:'',
      Delivereddatas2:[],
      loading2:false,
      tabs : [
        {
          title: 'Delivered',
          icon: 'mdi-account-outline',
          tab: 'account',
        }, 
        {
          title: 'Not Delivered',
          icon: 'teenyicons:attachment-outline',
          tab: 'attach',
        },               
      ],
      headers:[
        { text: 'Created date', value: 'PO Store' },
        { text: 'Merchant Name', value: 'PO Received Date' },
        { text: 'PO Number', value: 'SO BKAP' },
        { text: 'SO Number', value: 'Store Name' },
        { text: 'Status', value: 'Status' },

        // { text: 'Remarks', value: 'Remarks' },

      ],
      headers2:[
        { text: 'Created date', value: 'PO Store' },
        { text: 'Merchant Name', value: 'PO Received Date' },
        { text: 'PO Number', value: 'SO BKAP' },
        { text: 'SO Number', value: 'Store Name' },
        { text: 'Remarks', value: 'Remarks' },

        { text: 'Status', value: 'Status' },

        // { text: 'Remarks', value: 'Remarks' },

      ],
      page: 1,
      pageSize: 10,
      page2: 1,
      pageSize2: 10,
      togglecard: false,
    }
  },
  computed:{
    filtereddata2(){
      const lowerCaseQuery = this.searchQuery2.toLowerCase().trim()
      
      return this.Delivereddatas2.filter(item => {
        return (
          (item.created_date && item.created_date.toLowerCase().includes(lowerCaseQuery)) ||
          (item.merchant_name && item.merchant_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.po_number && item.po_number.toLowerCase().includes(lowerCaseQuery)) ||
          (item.so_number && item.so_number.toLowerCase().includes(lowerCaseQuery)) ||
          (item.remarks && item.remarks.toLowerCase().includes(lowerCaseQuery)) ||
          (item.status && item.status.toLowerCase().includes(lowerCaseQuery)) 
        )
      })
    },

    paginatedItems2() {  
    
      const startIndex = (this.page2 - 1) * this.pageSize2
      const endIndex = startIndex + this.pageSize
  
      return this.filtereddata2.slice(startIndex, endIndex)
    },
    sortDeliver2(){
      return this.paginatedItems2.sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
     
    },
    filtereddata(){
      const lowerCaseQuery = this.searchQuery.toLowerCase().trim()
      
      return this.Delivereddatas.filter(item => {
        return (
          (item.created_date && item.created_date.toLowerCase().includes(lowerCaseQuery)) ||
          (item.merchant_name && item.merchant_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.po_number && item.po_number.toLowerCase().includes(lowerCaseQuery)) ||
          (item.so_number && item.so_number.toLowerCase().includes(lowerCaseQuery)) ||
          (item.status && item.status.toLowerCase().includes(lowerCaseQuery)) 
        )
      })
    },   
    paginatedItems() {  
    
      const startIndex = (this.page - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
    
      return this.filtereddata.slice(startIndex, endIndex)
    },
    sortDeliver(){
      return this.paginatedItems.sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
     
    },
  },
  watch: {
    activeTab(newTab) {
      if (newTab === 'account' && !this.storename) {     
        this.snackbar = true
        this.color = 'on-background'
        this.snackbarText = 'Please select Store Name '
      } else if (newTab === 'attach' && !this.storename2) {      
        this.snackbar = true
        this.color = 'on-background'
        this.snackbarText = 'Please select Store Name '
      }
    },
  },

  mounted(){
    this.cityID  = localStorage.getItem("city_id")

    this.handleBrandSelection()
  },
  methods:{
    resetAvatar(itm){
        
      this.getDelivered(itm)
    },
    getnotdelivereddata(item){
      const postdata = {
        'Zepto':'zepto',
        'D-Mart':'dmart',
      }
      this.loading2 = true

      this.Notdelivereddata(postdata[item],this.locationdata).then(response =>{
        // console.log({response})
        if(response.data.status == 1){
          this.Delivereddatas2 = response.data.data
          

          //   this.Delivereddatas2
          this.snackbar = true
          this.color = 'primary'
          this.snackbarText = response.data.message    
          this.loading2 = false

        }else{
          this.loading = false
          this.snackbar = true
          this.color = 'on-background'
          this.snackbarText = "Please select Store Name"         
        
        }
      })
    },

    Toggletab(itm){
        
      this.togglecard = true
      this.getDelivered(itm)
      this.getnotdelivereddata(itm)
    },
    updatePagination(page) {
      this.page = page
    },
    updatePagination2(page2) {
      this.page2 = page2
    },
    getDelivered(item){
      const postData = {
        'Zepto':'zepto',
        'D-Mart':'dmart',
      }
      this.loading = true

      this.Delivereddata(postData[item],this.locationdata).then(response =>{
        // console.log({response})
        if(response.data.status == 1){
          this.Delivereddatas = response.data.data
          this.snackbar = true
          this.color = 'primary'
          this.snackbarText = response.data.message    
          this.loading = false

        }else{
          this.loading = false

          this.snackbar = true
          this.color = 'on-background'
          this.snackbarText = "Please select Store Name"           
        
        }
      })
    },
    handleBrandSelection(){ 
      // console.log('check hjandle',id);
      this.getCitylocation(this.cityID ).then(response=>{
        // console.log('check the response',response);
        this.cityLoaction = response.data.data.map(sales => ({
          value: sales.location_id,
          text: sales.location,
        }))

        // console.log('ceck tye res',this.cityLoaction)
      })
    },


  },
}
</script>

<style>

</style>