<template>
    <div>
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
                <VSelect
                  v-model="selectedmerchants"
                  label="Store or Merchant"
                  :items="merchants"               
                
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
      <VTable
      
       :headers="headers"
       :items="this.marchantstocksdata "
        
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
      <tr v-for="(item,index) in this.marchantstocksdata" :key="index">
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
                        size="30"        
                        color="#BA8B32"       
                        />   
                      </V-btn>     
            </td> -->
      </tr>
      </tbody>
         
        </VTable>
              </VCol>

              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="validateForm">Save</VBtn>
  <!-- @click="resetdetails" -->
                <VBtn
                  color="secondary"
                  variant="tonal"
                  @click="resetdetails()"
                
                >
                  Reset
                </VBtn>
              </VCol>
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
       merchants(){
        return this.merchantName.map(a => a.merchant_uid
           );
    }
    
    },
    
    mounted(){
      this.getMerchantdetails();
     
     
    },
    
   methods:{ 
   handleMerchantSelection() {
     console.log("Selected Merchant:", this.selectedmerchants);
     const selectedMerchant = this.merchantName.find(
     (brand) => brand.merchant_uid === this.selectedmerchants
  );

  console.log("Selected Brand Details:", selectedMerchant);

  if (selectedMerchant) {
    this.selectedMerchantId = selectedMerchant.merchant_id;
    console.log('Selected Merchant ID:', this.selectedMerchantId);

    // Now that you have the selected merchant ID, you can perform further actions, such as calling an API method to get brand details.
    this.getMerchantproductsstock(this.selectedMerchantId)
      .then((response) => {
        console.log("Merchant Products:", response);
       
        // Handle the response accordingly
        if(response.status == 1){
           this.stockUpdatedate = response.data.stock_updated_date;
        this.marchantstocksdata = response.data.products;
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
        console.log('mer',this.merchantName)
      })
     }
   },
 
}
</script>
<style scoped>

</style>