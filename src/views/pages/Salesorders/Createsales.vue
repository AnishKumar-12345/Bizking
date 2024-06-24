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
       <VCard title="Sales Order" class="mb-4">       
 
       
        <VCardText>
          
          <!-- 👉 Form -->
          <VForm class="mt-6" ref="purchaseOrderForm">
           
            <VRow>
    
              <VCol
                md="6"
                cols="12"
              >
              <!-- {{selectedSalesOrder}} -->
              <!-- @update:model-value="handleBrandSelection" -->
              <!-- @update:model-value="handleBrandSelection(selectedSalesOrder)" -->
                <VAutocomplete
                  v-model="selectedSalesOrder"
                  label="Merchants"
                  :items="merchantsdata"               
                  item-value="value"
                  item-title="text"
                  :rules="merchantrules"
                  :menu-props="{ maxHeight: 200 }"                  
                />
              </VCol>  

             <VCol
                md="6"
                cols="12"
              >
              <!-- {{selectSodata}} -->
              <!-- {{selectedSalesOrder}} -->
              <!-- @update:model-value="handleBrandSelection" -->
                <VAutocomplete
                  v-model="selectSodata"
                  label="SO Details"
                  :items="this.soDetailsd"               
                  item-value="value"
                  item-title="text"
                  :rules="sorules"

                  :menu-props="{ maxHeight: 200 }"
                  
                />
              </VCol>  
                     <VCol cols="12" md="6">
      <VTextField
        v-model="selectedDate"
        type="date"
        label="Select Date"
        @input="updateDateTime"
        :rules="dateRules"
         :min="minDate"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VTextField
        v-model="selectedDateTime"
        label="Selected Date and Time"
        readonly
      />
    </VCol>

              <VCol cols="12">

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

                 <div style="max-width:400px" >
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
            :items="filteredSalesOrder"
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
                   <tr v-if="filteredSalesOrder.length === 0">
                    <td colspan="16" class="text-center"><h1>No data found !</h1></td>
                    </tr>  

                    <tr  v-for="(item,index) in filteredSalesOrder"
                     :key="index">
                     <td class="text-center">{{item.sku_name}}</td>
                     <td class="text-center">{{item.brand_name}}</td>
                     <td class="text-center">{{item.uom}}</td>
                     <td class="text-center">{{item.hsn_code}}</td>
                     <td class="text-center">{{item.mrp}}</td>
                       <td class="text-center">
          <VTextField  @keydown="preventDecimal" @paste="preventPaste"   
          v-model="item.quantity" type="number" min="0" style="min-width:80px;"     
         
          />
          
          <!-- {{ item.Quantity }} -->
        </td>
         <td class="text-center">
          <VTextField  @keydown="preventDecimal" @paste="preventPaste"   
          v-model="item.return" type="number" min="0" style="min-width:80px;"     
         
          />
          
          <!-- {{ item.Quantity }} -->
        </td>
         <td class="text-center">
          <VTextField  @keydown="preventDecimal" @paste="preventPaste"   
          v-model="item.exchange" type="number" min="0" style="min-width:80px;"     
         
          />
          
          <!-- {{ item.Quantity }} -->
        </td>
                     <!-- <td class="text-center">{{item.quantity}}</td> -->
                     <!-- <td class="text-center">{{item.return}}</td> -->
                     <!-- <td class="text-center">{{item.exchange}}</td> -->
                     <!-- <td class="text-center">{{item.cgst}}</td> -->
                     <!-- <td class="text-center">{{item.sgst}}</td> -->
                     <!-- <td class="text-center">{{item.total_given_margin}}</td> -->

                    </tr>
            </tbody>
            </VTable>
            </VCol>
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="validateform">Save</VBtn>

                <!-- <VBtn
                  color="secondary"
                  variant="tonal"
                  @click="resetdetails()"
                
                >
                  Reset
                </VBtn> -->

                 <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress"
                    >
                    </VProgressCircular>

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
            selectedSalesOrder:"",
            Merchants:[],
            loading:true,
            cityID:null,
            merchantProducts:[],
            searchQuery:'',
            loading2:false,
            soData:[],
            selectSodata:'',
            soDetailsd:[],
            Locationids:'',
            useriddata:'',
            cityiddata:'',
            CreatedDate:'',
       today: this.getFormattedDate(new Date()),

             merchantrules: [
         (v) => !!v || 'Merchnat is required',
      ],
       sorules: [
         (v) => !!v || 'SOData is required',
      ],
       dateRules: [
         (v) => !!v || 'Date is required',
      ],
      userIds:'',
       selectedDate: '', // Holds the date selected by the user
      selectedDateTime: '', // Holds the date with appended time
      dateRules: [(v) => !!v || 'Date is required'],
            headers: [
       
        { text: 'Product Name', value: 'sku_name' },
        { text: 'Brand Name', value: 'brand_name' },

          { text: 'UOM', value: 'uom' },
        { text: 'HSN', value: 'hsn_code' },
        { text: 'MRP', value: 'mrp' },
        // { text: 'MRPD', value: 'TaxDeductMRP' },

        { text: 'Quantity', value: 'quantity'},
      
        { text: 'Return', value: 'return' },        
        { text: 'Exchange', value: 'exchange' },   
        // { text: 'CGST', value: 'cgst' },  
        // { text: 'SGST Tax', value: 'TaxfromSgst' }, 

        // { text: 'SGST', value: 'sgst' },  
        // { text: 'Total Given Margin', value: 'total_given_margin' },  

        // { text: 'Amount', value: 'calculateTotalamount' }, 
        // { text: 'Actions', value: 'action' }, 


      ],
        }
    },
    computed:{
       minDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
         filteredmerchantProducts() {
      // Filter out items with undefined quantity
       return this.merchantProducts.filter(item => item.quantity !== undefined);
      },  

        filteredSalesOrder() {
      const lowerCaseQuery = this.searchQuery.toLowerCase().trim(); 
      // console.log('log in',lowerCaseQuery)
    return this.filteredmerchantProducts.filter((item) => {
    return (
      (item.brand_name && item.brand_name.toLowerCase().includes(lowerCaseQuery)) ||
      (item.hsn_code && item.hsn_code.toLowerCase().includes(lowerCaseQuery)) ||
      (item.mrp && item.mrp.toString().toLowerCase().includes(lowerCaseQuery)) ||
      (item.quantity && item.quantity.toString().toLowerCase().includes(lowerCaseQuery)) ||
      (item.uom && item.uom.toLowerCase().includes(lowerCaseQuery)) ||
      (item.total_given_margin && item.total_given_margin.toString().toLowerCase().includes(lowerCaseQuery)) ||
      (item.cgst && item.cgst.toString().toLowerCase().includes(lowerCaseQuery)) ||
      (item.sgst && item.sgst.toString().toLowerCase().includes(lowerCaseQuery)) || 
       (item.return && item.return.toString().toLowerCase().includes(lowerCaseQuery)) ||
        (item.sku_name && item.sku_name.toLowerCase().includes(lowerCaseQuery)) ||
         (item.exchange && item.exchange.toLowerCase().includes(lowerCaseQuery))
    );
  });
},
        merchantsdata(){
           return this.Merchants.map(a => ({
             value :  a.merchant_id,
             text : a.merchant_uid
            })          
          );          
        },
    },
    mounted(){
      this.userIds = localStorage.getItem('userId');

      this.cityID = localStorage.getItem("city_id");
         const storedSoData = localStorage.getItem("sodetails");
            if (storedSoData) {
            try {
                this.soData = JSON.parse(storedSoData);
               this.soDetailsd =  this.soData.map(a => ({
                    value: a.entity_id,
                    text: a.name
                }))
                // console.log('set',);
                if (!Array.isArray(this.soData)) {
                this.soData = [];
                }
            } catch (e) {
                console.error('Error parsing sodetails from localStorage:', e);
                this.soData = [];
            }
            }
        this.getMerchantdetails().then(() => {             
              this.loading = false;
            }) 
            .catch((error) => {             
              // console.error('Error fetching merchants:', error);            
        });
        // this.getMerchantdetails();

    },
    watch:{
        selectedSalesOrder(newVal){
             this.handleBrandSelection(newVal);
            this.handlestockSelection(newVal);
        }
    },
    methods:{
        handlestockSelection(id){
            this.getStcksdata(id).then((response)=>{
                console.log('fret',response);
                  this.merchantProducts.forEach(product => {
                    const stockData = response.data.products.find(stock => stock.merchant_product_id === product.brand_product_id);
                    if (stockData) {
                        product.closing = stockData.closing;
                    }
                });
            })
        },
         updateDateTime() {
      if (this.selectedDate) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        this.selectedDateTime = `${this.selectedDate} ${hours}:${minutes}:${seconds}`;
      }
    },
        getFormattedDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
         validateform() {
      this.$refs.purchaseOrderForm.validate().then(valid => {
        if (valid.valid) {
          // Check if at least one product has a non-zero quantity, return, or exchange
          const hasValidProduct = this.merchantProducts.some(product =>
            product.quantity > 0 || product.return > 0 || product.exchange > 0
          );

          if (hasValidProduct) {
            this.SaveSO();
          } else {
            this.snackbar = true;
            this.snackbarText = "Please provide quantities for quantity, return, or exchange.";
            this.color = "on-background";
          }
        } else {
          this.snackbar = true;
          this.snackbarText = "Please fill all mandatory fields.";
          this.color = "on-background";
        }
      });
    },
         SaveSO(){
         // Validation check for return and exchange quantities
    let isValid = true;
    const invalidProducts = [];

    this.merchantProducts.forEach(product => {
      if (product.return > product.closing || product.exchange > product.closing) {
        isValid = false;
        invalidProducts.push(product);
      }
    });

    if (!isValid) {
      // Show an error message and prevent the save operation
      this.snackbar = true;
      this.snackbarText = `The return or exchange quantity for some products exceeds the closing stock. Please correct the quantities.`;
      this.color = "error";
      return;
    }

    // Filter products with quantity > 0 or return > 0 or exchange > 0
    // const filteredProducts = this.merchantProducts.filter(product => product.quantity > 0 || product.return > 0 || product.exchange > 0);

    const postData = {
      "merchant_id": this.selectedSalesOrder,
      "user_id": this.useriddata,
      "entity_id": this.selectSodata,
      "city_id": this.cityiddata,
      "location_id": this.Locationids,
      "so_status": 3,
      "created_date": this.selectedDateTime,
      "device": "CRM-WEB",
      "products": this.merchantProducts.map(product => {
        return {
          "merchant_product_id": product.brand_product_id,
          "brand_name": product.brand_name,
          "sku_name": product.sku_name,
          "uom": product.uom,
          "mrp": product.mrp,
          "hsn_code": product.hsn_code,
          "quantity": `${product.quantity}`,
          "return": `${product.return}`,
          "rtv_reason": "",
          "exchange": `${product.exchange}`,
        };
      })
    };
    console.log({ postData });
    this.saveSorder(postData).then((response)=>{
        console.log({response});
        if(response.data.status == 1){
             this.snackbar = true;
                    this.snackbarText = response.data.message
                    this.color = "primary";
                    // window.location.reload();
        }else{
             this.snackbar = true;
                    this.snackbarText = response.data.message
                    this.color = "on-background";
        }
    })
      }, 
         preventDecimal(event) {     
            if (event.key === '.' || event.key === ',' ||  event.key === '+' ||  event.key === '-' || event.keyCode === 189 || event.keyCode === 109) {
                event.preventDefault();
            }
            },
       preventPaste(event){
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedData = clipboardData.getData('text');

      // Validate pasted data (you can modify this regex as needed)
      const isValid = /^[0-9]+$/.test(pastedData);

      if (!isValid) {
        event.preventDefault();
      }
    },
        handleBrandSelection(id){
            this.loading2 = true;
            this.salesMerchantProducts(id).then((response)=>{
                console.log('check the response',response);
            if(response.data.status == 1 ){
                this.merchantProducts = response.data.merchant_product_details.products;
                 this.snackbar = true;
                    this.snackbarText = response.data.message
                    this.color = "primary";
            this.loading2 = false;

            }else{
                 this.snackbar = true;
                this.snackbarText =  response.data.message
                this.color = "primary";
            this.loading2 = false;

            }
        })
        },
         getMerchantdetails(){
             return new Promise((resolve, reject) => {
          this.getMerchants(this.cityID)
            .then((response) => {
              console.log('check the resp',response);
              this.Merchants = response.data.data;
              this.Locationids =   this.Merchants[0].location_id;
              this.useriddata =   this.Merchants[0].user_id;
              this.cityiddata =   this.Merchants[0].city_id;

            //   console.log("mer",this.Locationids);
              
              // this.opportunity.reverse();
              resolve(); // Resolve the promise when API call is successful
            })
            .catch((error) => {
              // console.error('Error fetching merchants:', error);
              reject(error); // Reject the promise if there's an error
            });
        });

    //   this.getMerchants(this.cityID).then((response)=>{
    //     // console.log('mer',response)
    //     this.Merchants = response.data.data;
    //     // this.locationdata = this.merchantName.map(loc => loc.location_id)
    //     // console.log('mer',this.locationdata)
    //   })
     }
    }
}
</script>
<style scoped>

</style>