<template>
    <div>
      <div v-if="loading"  class="loading-container">
      <VProgressLinear
            height="5"
            color="primary"
            indeterminate
            class="custom-loader"  
            full-width              
        />          
     </div>
         <VRow>
      <VCol cols="12">
       <VCard title="Merchants" class="mb-4">       

       
        <VCardText>
          
          <!-- 👉 Form -->
          <VForm class="mt-6" ref="purchaseOrderForm">
           
            <VRow>
    
              <VCol
                md="6"
                cols="12"
              >
              <!-- {{selectedmerchants}} -->
                <VAutocomplete
                  v-model="selectedmerchants"
                  label="Store or Merchant"
                  :items="merchants"               
                    :menu-props="{ maxHeight: 200 }"
                  @update:model-value="handleMerchantSelection"
                />
              </VCol>


            
            
      
              <VCol
                cols="12"
                md="6"
              >
              <!-- {{formData.created_date}} -->
                <VTextField
           
                 v-model=" this.stockUpdatedate "
                  label="Stock Updated Date"
                  
                  readonly
                />
              </VCol>
            
          
              
              <VDivider />
                 
              <VCol cols="12">
                <!-- {{AllBrandproducts}} -->
                 <div style="max-width:400px;" >
                    <VTextField
                    class="mb-3"
                      v-model="searchQuery"        
                      density="compact"
                      variant="solo"
                      label="Search"
                      append-inner-icon="mdi-magnify"
                      single-line
                      hide-details
          
                  />
              </div>

              <div v-if="loading2" id="app">
          <div id="loading-bg">
            <div class="loading-logo">
              <img src="../../../assets/images/logos/comlogo.jpeg" height="60" width="68" alt="Logo" />
            </div>
            <div class="loading">
              <div class="effect-1 effects"></div>
              <div class="effect-2 effects"></div>
              <div class="effect-3 effects"></div>
            </div>
          </div>
        </div>

         <div class="d-flex justify-end mt-4">
              <VBtn
                  v-if="selectedmerchants !== null"
                  color="primary"
                  @click="openEditDialog(this.selectedMerchantId )"
                >
                  Edit Merchant
                </VBtn>
          </div>

      <VTable      
       :headers="headers"
       :items="this.paginatedItems "
        
      >
           
       <thead>
        <tr>
          <th
           class="text-center"
            v-for="header in headers"
            :key="header"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>

      <tbody>

        <tr v-if="filteredMerchant.length === 0">
          <td colspan="16" class="text-center"><h1>No data found !</h1></td>
        </tr>  

      <tr v-for="(item,index) in this.paginatedItems" :key="index">
       <td class="text-center">{{item.brand_name}}</td>
        <td  class="text-center">{{item.sku_name}}</td>
         <td  class="text-center">{{item.uom}}</td>
          <td  class="text-center">{{item.physical_soh}}</td>
           <td  class="text-center">{{item.closing}}</td>
            <td  class="text-center">{{item.opening}}</td>
           
            <!-- <td class="text-center">
              <V-btn
                  icon
                  variant="text"
                  color="default"
                  class="mb-1 mt-2"
                  size="small"
                  style="margin-left: auto; display: block;"
                  @click="openproductdialog()"
                  >
                  
                      <VIcon
                        icon="ri-pencil-line"
                        size="22"        
                        color="#BA8B32"       
                        />   
                      </V-btn>     
            </td> -->
      </tr>
      </tbody>
         
        </VTable>

        <VPagination
          v-model="page"
          :length="Math.ceil(filteredMerchant.length / pageSize)"
          @input="updatePagination"
        />
              </VCol>
          
            </VRow>
          </VForm>

        </VCardText>
      </VCard>
    </VCol>  
  </VRow>

 <VDialog v-model="editDialog" max-width="800px" persistent>
    <VCard>
      <VCardTitle>Edit Stock Data</VCardTitle>
      <VCardContent>
         <div v-if="loading3" id="app">
          <div id="loading-bg">
            <div class="loading-logo">
              <img src="../../../assets/images/logos/comlogo.jpeg" height="60" width="68" alt="Logo" />
            </div>
            <div class="loading">
              <div class="effect-1 effects"></div>
              <div class="effect-2 effects"></div>
              <div class="effect-3 effects"></div>
            </div>
          </div>
        </div>
          <VForm
                class="mt-6"
                ref="purchaseOrderForm"
              >
                <VRow>
                  <VCol cols="12">
          <VTable      
       :headers="headers"
       :items="this.marchantstocksdata "
        
      >
           
       <thead>
        <tr>
          <th
           class="text-center"
            v-for="header in headers2"
            :key="header"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>

      <tbody>

        <!-- <tr v-if="filteredMerchant.length === 0">
          <td colspan="16" class="text-center"><h1>No data found !</h1></td>
        </tr>   -->

      <tr v-for="(item,index) in this.marchantstocksdata" :key="index">
       <td class="text-center">{{item.brand_name}}</td>
        <td  class="text-center">{{item.sku_name}}</td>
         <td  class="text-center">{{item.uom}}</td>
          <td  class="text-center">
            <VTextField
             v-model="item.physical_soh"
             @keydown="preventDecimal"
                              @paste="preventPaste"
                              type="number"
                              min="0"
                              max="20000"
                               outlined
                              dense
                              :rules="physical_sohrule"
            />
            <!-- {{item.physical_soh}} -->
          </td>
           <td  class="text-center">
             <VTextField
             v-model="item.closing"
              @keydown="preventDecimal"
                              @paste="preventPaste"
                              type="number"
                              min="0"
                              max="20000"
                               outlined
                              dense
                              :rules="closingrule"

            />
            <!-- {{item.closing}} -->
            </td>
            <td  class="text-center">
               <VTextField
               v-model="item.opening"
                 @keydown="preventDecimal"
                              @paste="preventPaste"
                            
                             
                               outlined
                              dense
                              :rules="openingrule"
            />
              <!-- {{item.opening}} -->
              </td>
           
          
      </tr>
      </tbody>
         
        </VTable>
                  </VCol>
                </VRow>
          </VForm>
        <!-- Table to display item's data -->
        <!-- <VTable :items="[selectedMerchantData]">
          <template v-slot:items="props">
            <tr v-for="(value, key) in props.item" :key="key">
              <td>{{ key }}</td>
              <td>{{ value }}</td>
            </tr>
          </template>
        </VTable> -->
      </VCardContent>
      <VCardActions>
        <VBtn @click="validateForm()">Save</VBtn>
        <VBtn @click="closedialogs()">Close</VBtn>
           <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress"
                    >
                    </VProgressCircular>
      </VCardActions>
    </VCard>
  </VDialog>

     <VSnackbar
      v-model="snackbar" :timeout="3500"
      :color="color"
      
    >
      {{ snackbarText }}
     <!-- <VBtn text @click="snackbar = false">Close</VBtn> -->
    </VSnackbar> 



    </div>
</template>
<script>

import servicescall from "@/Services";

export default {
  mixins: [servicescall],
  components:{

  },
   data(){
    return{
      // saveStorestock:{
      // "store_level_asis_stock_id": "",
      // "merchant_id": "",
      // "stock_updated_date": "",
      // "sales_updated_date": "",
      // "products": [
      //   {
      //      "merchant_product_id": "",
      //       "physical_soh": "",
      //       "closing": "",
      //       "opening": ""
      //   }
      // ]
    
      
      //   },
      // saveStorestock:{
      //   "merchant_product_id": "",
      //   "physical_soh": "",
      //   "closing": "",
      //   "opening": ""
      // },
      dialogHeaders: [
        { text: 'Brand Name', value: 'brand_name' },
        { text: 'SKU', value: 'sku_name' },
        { text: 'UOM', value: 'uom' },
        { text: 'Physical SOH', value: 'physical_soh' },
        { text: 'Closing', value: 'closing' },
        { text: 'Opening', value: 'opening' },
      ],
      editDialog: false,
      editedItem: {
        physical_soh: null,
        closing: null,
        opening: null,
      },
      loading:true,
      loading2:false,
      loading3:false,

        searchQuery:'',
       page: 1,
    pageSize: 10,
        snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,
      isProgress:false,
      marchantstocksdata:[],
      editmarchantstocksdata:[],
     selectedmerchants:null,
      merchantName:[],
      stockUpdatedate:null,  
      MerchantNo:null,
      storelevelstockid:null,
      closingrule: [v => v === 0 || (!!v && `${v}`.trim() !== '') || 'Closing Is Required'],
      openingrule: [v => v === 0 || (!!v && `${v}`.trim() !== '') || 'Opening Is Required'],
      physical_sohrule: [v => v === 0 || (!!v && `${v}`.trim() !== '') || 'Physical soh Is Required'],

      headers: [
        // { text: 'Purchase Order', value: 'po' },
        { text: 'Brand Name', value: 'brand_name' },
        { text: 'SKU', value: 'sku_name' },
        { text: 'UOM', value: 'uom' },
     

        { text: 'Physical SOH', value: 'physical_soh'},
        { text: 'Closing', value: 'closing' },
        { text: 'Opening', value: 'opening' },        
      
        // { text: 'Actions', value: 'action' }, 


      ],
      cityID:null,
 headers2: [
        // { text: 'Purchase Order', value: 'po' },
        { text: 'Brand Name', value: 'brand_name' },
        { text: 'SKU', value: 'sku_name' },
        { text: 'UOM', value: 'uom' },
     

        { text: 'Physical SOH', value: 'physical_soh'},
        { text: 'Closing', value: 'closing' },
        { text: 'Opening', value: 'opening' },        
      
        // { text: 'Actions', value: 'action' }, 


      ],
    }
   },
  
     computed: {  
        filterededitMerchant(){
         const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
      return this.editmarchantstocksdata.filter((item) => {
        return (
          (item.brand_name && item.brand_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.sku_name && item.sku_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.uom && item.uom.toLowerCase().includes(lowerCaseQuery)) ||
          (item.physical_soh && item.physical_soh.toLowerCase().includes(lowerCaseQuery)) ||
          (item.closing && item.closing.toLowerCase().includes(lowerCaseQuery)) || 
          (item.opening && item.opening.toLowerCase().includes(lowerCaseQuery))  
        );
      });
    },
     paginatededitItems() {  
 
  const startIndex = (this.page - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return this.filterededitMerchant.slice(startIndex, endIndex);
},

      filteredMerchant(){
         const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
      return this.marchantstocksdata.filter((item) => {
        return (
          (item.brand_name && item.brand_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.sku_name && item.sku_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.uom && item.uom.toLowerCase().includes(lowerCaseQuery)) ||
          (item.physical_soh && item.physical_soh.toLowerCase().includes(lowerCaseQuery)) ||
          (item.closing && item.closing.toLowerCase().includes(lowerCaseQuery)) || 
          (item.opening && item.opening.toLowerCase().includes(lowerCaseQuery))  
        );
      });
    },
   paginatedItems() {  
 
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredMerchant.slice(startIndex, endIndex);
  },
       merchants(){
        return this.merchantName.map(a => a.merchant_uid
           );
    },   
    
    },
    
    mounted(){
      this.cityID = localStorage.getItem("city_id");

      this.getMerchantdetails()
        .then(() => {             
              this.loading = false;
            }) 
            .catch((error) => {             
              console.error('Error fetching merchants:', error);            
            });
    //  setTimeout(() => {
    //           this.loading = false; // Set loading to false when the operation is complete
    //         }, 4000);
     
    },
    
   methods:{ 
     validateForm() {
      this.$refs.purchaseOrderForm.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
          this.createMerchantstock()
        } else {
          this.snackbar = true
          this.snackbarText = 'Please give all mandatory fields'
          this.color = 'on-background'
        }
      })
    },
    createMerchantstock(){
      const postData = {
         "store_level_asis_stock_id": this.storelevelstockid,
         "merchant_id": this.MerchantNo,
         "stock_updated_date": this.stockUpdatedate,
          // "sales_updated_date": "",
         "products": this.marchantstocksdata.map((product) => ({
          "merchant_product_id": product.merchant_product_id,
          "physical_soh": product.physical_soh.toString(),
          "closing": product.closing.toString(),
          "opening":  product.opening.toString(),
         }))
      }
      console.log({postData});
      this.isProgress = true;
      this.updateMerchantstock(postData).then((response)=>{
        console.log({response});
        if(response.data.status == 1){
            this.snackbar = true;
            this.color = 'primary';
            this.snackbarText = response.data.message;
            this.isProgress = false;
            this.editDialog = false;
            // this.marchantstocksdata;
        }else{
           this.snackbar = true;
           this.isProgress = false;
           this.editDialog = true;
          
          //  this.marchantstocksdata;
           this.color = 'on-background';
           this.snackbarText = response.data.message;
        }
      })
    },
     preventDecimal(event) {
      if (
        event.key === '.' ||
        event.key === ',' ||
        event.key === '+' ||
        event.key === '-' ||
        event.keyCode === 189 ||
        event.keyCode === 109
      ) {
        event.preventDefault()
      }
    },
     preventPaste(event) {
      const clipboardData = event.clipboardData || window.clipboardData
      const pastedData = clipboardData.getData('text')

      // Validate pasted data (you can modify this regex as needed)
      const isValid = /^[0-9]+$/.test(pastedData)

      if (!isValid) {
        event.preventDefault()
      }
    },
     openEditDialog(id) {
      console.log("Merchant_id",id);
       this.editDialog = true;
        this.loading3 = true;
          this.getMerchantproductsstock(id)
            .then((response) => {
              console.log("Merchant Products:", response);
            
              // Handle the response accordingly
              if(response.status == 1){
                // this.stockUpdatedate = response.data.stock_updated_date;
                this.editmarchantstocksdata = response.data.products;
                  this.loading3 = false; 
              }else{
                this.editmarchantstocksdata = [];
                  this.snackbar = true;
                  this.snackbarText = response.message;
                  this.color = "on-background";
              }
            })
            .catch((error) => {
              console.error("Error fetching merchant products:", error);
              // Handle errors
            });
    },
    //  saveChanges() {
    //   if (this.selectedMerchantData) {
    //     // Update the selected merchant's data with edited values
    //     this.selectedMerchantData.physical_soh = this.editedItem.physical_soh;
    //     this.selectedMerchantData.closing = this.editedItem.closing;
    //     this.selectedMerchantData.opening = this.editedItem.opening;

    //     // Close the dialog
    //     this.editDialog = false;
    //   }
    // },
   handleMerchantSelection() {
    //  console.log("Selected Merchant:", this.selectedmerchants);
     const selectedMerchant = this.merchantName.find(
     (brand) => brand.merchant_uid === this.selectedmerchants
  );

  // console.log("Selected Brand Details:", selectedMerchant);

  if (selectedMerchant) {
    this.selectedMerchantId = selectedMerchant.merchant_id;
    // console.log('Selected Merchant ID:', this.selectedMerchantId);
    this.loading2 = true;
    // Now that you have the selected merchant ID, you can perform further actions, such as calling an API method to get brand details.
    this.getMerchantproductsstock(this.selectedMerchantId)
      .then((response) => {
        console.log("Merchant Products:", response);
       
        // Handle the response accordingly
        if(response.status == 1){
           this.stockUpdatedate = response.data.stock_updated_date;
            this.MerchantNo = response.data.merchant_id;
            this.storelevelstockid = response.data.store_level_asis_stock_id;
            this.marchantstocksdata = response.data.products;
            this.loading2 = false; 
          }else{
            this.marchantstocksdata = [];
            this.snackbar = true;
            this.snackbarText = response.message;
            this.color = "on-background";
        }
      })
      .catch((error) => {
        console.error("Error fetching merchant products:", error);
        // Handle errors
      });
  }
},
closedialogs(){
  this.editDialog = false;
  location.reload();
  // this.marchantstocksdata;
},
updatePagination(page) {
          this.page = page;
        },
          
     getMerchantdetails(){
      // this.getMerchants().then((response)=>{
        
      //   this.merchantName = response.data.data;
      //   // console.log('mer',this.merchantName)
      // })

        return new Promise((resolve, reject) => {
          this.getMerchants(this.cityID)
            .then((response) => {
              this.merchantName = response.data.data;
              // this.opportunity.reverse();
              resolve(); // Resolve the promise when API call is successful
            })
            .catch((error) => {
              console.error('Error fetching merchants:', error);
              reject(error); // Reject the promise if there's an error
            });
        });

     }
   },
 
}
</script>
<style scoped>

</style>