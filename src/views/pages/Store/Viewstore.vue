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

              <!-- <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="validateForm">Save</VBtn>
  
                <VBtn 
                  color="secondary"
                  variant="tonal"
                  @click="resetdetails()"
                
                >
                  Reset
                </VBtn>
              </VCol> -->
            </VRow>
          </VForm>

        </VCardText>
      </VCard>
    </VCol>  
  </VRow>

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
      loading:true,
      loading2:false,
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
      marchantstocksdata:[],
     selectedmerchants:null,
      merchantName:[],
      stockUpdatedate:null,  
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

    }
   },
  
     computed: {  
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
    }
    
    },
    
    mounted(){
      this.getMerchantdetails();
     setTimeout(() => {
              this.loading = false; // Set loading to false when the operation is complete
            }, 4000);
     
    },
    
   methods:{ 
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
     getMerchantdetails(){
      this.getMerchants().then((response)=>{
        
        this.merchantName = response.data.data;
        // console.log('mer',this.merchantName)
      })
     }
   },
 
}
</script>
<style scoped>

</style>