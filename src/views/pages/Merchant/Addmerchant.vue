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
       <VCard title="Merchant vs Products Mapping" class="mb-4">       

       
        <VCardText>
          
          <!-- 👉 Form -->
          <VForm class="mt-6" ref="purchaseOrderForm">
           
            <VRow>
    
              <VCol
                md="6"
                cols="12"
              >
              <!-- {{this.selectedMerchantId}} -->
                <VAutocomplete
                  v-model="selectedmerchants"
                  label="Store or Merchant"
                  :items="merchants"               
                 :menu-props="{ maxHeight: 200 }"
                  @update:model-value="handleMerchantSelection"
                />
              </VCol>


            
            
      
              <!-- <VCol
                cols="12"
                md="6"
              >
         
                <VTextField
           
                 v-model=" this.stockUpdatedate "
                  label="Stock Updated Date"
                  
                  readonly
                />
              </VCol> -->
            
          
              
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
      <VTable
      
       :headers="headers"
       :items="this.paginatedItems "
        
      >
           
       <thead>
        <tr>
           <th class="text-center">
                          <!-- <VCheckbox v-model="selectAll" @change="toggleSelectAll"></VCheckbox> -->
                        </th>
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
        <td class="text-center">
          <!-- {{item.selected}} -->
          <!-- @change="toggleItemSelection(item)" -->
                          <VCheckbox v-model="item.selected"       
        ></VCheckbox>
                        </td>
       <td class="text-center">{{item.brand_name}}</td>
        <td  class="text-center">{{item.sku_name}}</td>
         <td  class="text-center">{{item.uom}}</td>
          <td  class="text-center"> &#8377;{{item.mrp}}</td>
           <td  class="text-center">
            <VTextField  
            v-model="item.margin"   style="min-width:80px;"  
              :rules="computedmarginRules()"
               @input="updatemargin()"
             
          />
            <!-- {{item.margin}} -->
            </td>
            <!-- <td  class="text-center">{{item.opening}}</td> -->
              <!-- @click="openproductdialog()" -->
            <!-- <td class="text-center" style="display:flex;justify-content:center;align-items:center;">
              <V-btn
                  icon
                  variant="text"
                  color="default"
                  class="mb-1 mt-2"
                  size="x-small"
                  style="margin-left: auto; display: block;"
                
                  >
                  
                      <VIcon
                        icon="ri-pencil-line"
                        size="22"        
                        color="#BA8B32"       
                        />   
                      </V-btn>     
                       <V-btn
                  icon
                  variant="text"
                  color="default"
                  class="mb-1 mt-2"
                  size="x-small"
                  style="margin-left: auto; display: block;"
                
                  >
                  
                      <VIcon
                        icon="material-symbols:delete"
                        size="22"        
                        color="error"       
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

              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="validateForm()">Save</VBtn>
  
                <!-- <VBtn 
                  color="secondary"
                  variant="tonal"
                  @click="resetdetails()"
                
                >
                  Reset
                </VBtn> -->
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
       selectedItems: [],
     postMerchant:{       
          "merchant_id":"",
          "products":
              [
                  {
                      "brand_product_id":"",
                      "margin":"",
                      "created_date":"",
                      "updated_date":"",
                      "status":"",
                      "selling_price":"",
                      "brand_id":""
                  },
              ]
     },
     marginrules:[ (v) => !!v || 'Margin is required'],
      selectedMerchantId:'',
       selectAll: false,
     
      loading:true,
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
      merchantBrand:[],
      headers: [
        // { text: 'Actions', value: 'action' }, 
        // { text: 'Purchase Order', value: 'po' },
        { text: 'Brand Name', value: 'brand_name' },
        { text: 'SKU', value: 'sku_name' },
        { text: 'UOM', value: 'uom' },
     

        { text: 'MRP', value: 'mrp'},
        { text: 'Margin', value: 'margin' },
        // { text: 'Opening', value: 'opening' },        
      
     


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
          (item.mrp && item.mrp.toLowerCase().includes(lowerCaseQuery)) ||
          (item.margin && item.margin.toLowerCase().includes(lowerCaseQuery))
          // (item.opening && item.opening.toLowerCase().includes(lowerCaseQuery))  
        );
      });
    },
   paginatedItems() {  
 
 const startIndex = (this.page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredMerchant.slice(startIndex, endIndex)
},

       merchants(){
        return this.merchantName.map(a => a.merchant_uid
           );
    },
    allFilteredItems() {
      return this.filteredMerchant;
    },
    
    },
    
    mounted(){
      this.getMerchantdetails();
      // this.getmerchantbrand();
     setTimeout(() => {
              this.loading = false; // Set loading to false when the operation is complete
            }, 4000);
     
    },
    
   methods:{
     computedmarginRules() {
    const hasPercentage = (value) => {
      const regex = /^(0|([1-9]\d*))(?:\.\d+)?%$/;
      return regex.test(String(value));
    };

    return [
      (v) => !!v || 'Margin is required',
      (v) => {
        if (!v.startsWith('0%')) {
          return hasPercentage(v) || 'Give numerical value with percentage ';
        } else {
          return v === '0%' || 'Give numerical value with percentage ';
        }
      },
    ];
  },

   updatemargin(value) {
    if (value === '0%' || value === '0') {
      this.Addbrand.total_given_margin = '0%';
    } else if (value.startsWith('0%')) {
      // User tried to enter something after 0%, reset to 0%
      value = '0%';
    } else {
      // Handle other cases as needed, possibly show an error message
      value = value;
    }
  },

    validateForm(){
   this.$refs.purchaseOrderForm.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
         
          this.saveMerchants();
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      }); 
 },
//     toggleItemSelection: function(item) {
//   // Toggle the selected property of the item
//   item.selected = !item.selected;
// },

    saveMerchants(){
       const selectedMargins = this.marchantstocksdata
        .filter(item => item.selected)
        .map((item) => ({
          brand_product_id: item.brand_product_id, // Replace with actual property name
          margin: `${item.margin}`, // Replace with actual property name
          created_date: "", // Replace with actual date if needed
          updated_date: "", // Replace with actual date if needed
          status: "", // Replace with actual status if needed
          selling_price: "", // Replace with actual price if needed
          brand_id: item.brand_id, // Replace with actual property name
        }));

          // Prepare data to post
          const postData = {
            merchant_id: this.selectedMerchantId,
            products: selectedMargins,
          };
      console.log('check brand da',postData)
          // Call your API method to save the data
          this.postmerchantbrandproducts(postData)
            .then((response) => {
              // Handle success if needed
              console.log("Saved items:", response);
              if(response.data.status == 1){
              this.snackbarText = response.data.message;
              this.color = "primary";
              this.snackbar = true;
              // this.getmerchantbrand();
              // this.getmerchantbrand();
              setTimeout(() => {
                window.location.reload(true);
            }, 1300);
              }else{
              this.snackbarText = response.data.message;
              this.color = "on-background";
              this.snackbar = true;
              }
              // Optionally show a success message
            
            })
            .catch((error) => {
              // Handle error if needed
              console.error("Error saving items:", error);
              // Show an error message
              this.snackbarText = "Error saving items.";
              this.color = "error";
              this.snackbar = true;
            });
        },
  
 
    // getmerchantbrand(){
    //   this.getmerchantbrandproducts().then((response)=>{
    //     console.log('check rhe resp brand',response);
    //     this.merchantBrand = response.data.data;
    //   })
    // },
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
    this.getmerchantbrandproducts(this.selectedMerchantId)
      .then((response) => {
        console.log("Merchant Products:", response);
       
        // Handle the response accordingly
        if(response.data.status == 1){
          //  this.stockUpdatedate = response.data.stock_updated_date;
           this.snackbarText = response.data.message;
            this.color = "success";
            this.marchantstocksdata = response.data.data.map(item => ({
        ...item,
        selected: item.checked === "checked"
      }));
            console.log("Merchant Products:", this.marchantstocksdata);
        }else{
           this.marchantstocksdata = [];
             this.snackbar = true;
            this.snackbarText = response.data.message;
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
        // console.log('mer',response)
        this.merchantName = response.data.data;
        console.log('mer',this.merchantName)
      })
     }
   },
 
}
</script>
<style scoped>

</style>