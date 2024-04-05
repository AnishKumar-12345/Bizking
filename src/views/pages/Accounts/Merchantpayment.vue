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
       <VCard title="Merchant Payment Details" class="mb-4">       

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6 " ref="purchaseOrderForm">
            <VRow>
                <!-- {{selectedmerchants}} -->
              <VCol
                md="6"
                cols="12"
              >
                <VAutocomplete
                   v-model="selectedmerchants"
                    :items="merchantName" 
                    item-value="value"
                    item-title="text"
                    :rules="storeMerchant"
                    label="Merchant"
                    :menu-props="{ maxHeight: 200 }"        
                    no-underline  
                    @update:model-value="handleMerchantSelection(selectedmerchants)"            
                  />
               
              </VCol>

            <VCol  md="6"
                cols="12">
            </VCol>
            
              <VCol
                cols="12"
                md="4"
              >
              <div class="styled-div">
                <span>TOTAL AMOUNT :&#8377;{{this.Merchantpayment.total_amount}}</span>
              </div>
                <!-- <VTextField
                  v-model=" this.Merchantpayment.total_amount"
                  label="Total Ammount"
                  readonly
                /> -->
              </VCol>      
            
            <VCol
                md="4"
                cols="12"
              >
              <div class="styled-div1">
                <span>TOTAL PAID :&#8377;{{this.Merchantpayment.total_paid}}</span>
              </div>
                <!-- <VTextField
                  v-model=" this.Merchantpayment.total_paid"
               
                  label="Total Pending"
                  readonly
                   
                /> -->
              </VCol>

              <VCol
                md="4"
                cols="12"
              >
                <div class="styled-div2">
                <span>TOTAL PENDING :&#8377;{{this.Merchantpayment.total_pending}}</span>
              </div>
                <!-- <VTextField
                  v-model=" this.Merchantpayment.total_pending"
               
                  label="Total Paid"
                  readonly
                   
                /> -->
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
              <VTable
              :headers="headers"
              :items="store_data"
                
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
     
       <tr
        v-for="(item,index) in this.store_data"
        :key="index"
      >
      <td class="text-center">
        {{item.so_number}}
      </td>
       <td class="text-center">
           &#8377;{{item.invoice_amount}}
          </td>
            <td  class="text-center">
           &#8377;{{item.return_amount}}
          </td>
            <td class="text-center">
          &#8377;{{ item.paid_amount }}
        </td>
        <td class="text-center">
            <VBtn
             
              icon
              variant="text"
              color="default"
              class="me-2"
              size="x-small"
              @click="viewrow(item.payments)"
            >
              <VIcon
                color="success"
                icon="streamline:bag-rupee-solid"
                size="22"
              />
            </VBtn>
        </td>
        <!-- <td class="text-center">{{ item.exchange == "" ? 0 : item.exchange }}</td>
      
        <td class="text-center">
          <VChip
        :color="resolveStatusVariant(item).color"
        class="font-weight-medium"
        size="small"
      >
        {{ item.warehouse_quantity >= 0 ? item.warehouse_quantity : 0}}
      </VChip>
     
        </td> -->
      
        
        
       
  
      </tr>
      </tbody>   
    
        </VTable>

              </VCol>
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
              <!-- :disabled="validquan" -->
                <VBtn @click="validateForm()" >Save</VBtn>

                <!-- <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
               
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

   <VDialog v-model="dialog" max-width="800px" persistent>
    <VCard>
      <VCardTitle>Invoice Payments</VCardTitle>
      <VCardContent>       

          <VTable      
       :headers="headers"
       :items="this.Invoice_Payments"
        
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

      <tr v-for="(item,index) in this.Invoice_Payments" :key="index">
       <td class="text-center">{{item.payment_created_date}}</td>

       <td class="text-center">{{item.payment_mode}}</td>
        <td  class="text-center">{{item.payment_type}}</td>
         <td  class="text-center">{{item.reference_no}}</td>
         <td  class="text-center">&#8377;{{item.paid_amount}}</td>
         
           
          
      </tr>
      </tbody>
         
        </VTable>
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
        <!-- <VBtn @click="validateForm()">Save</VBtn> -->
        <VBtn @click="dialog = false">Close</VBtn>
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
              dialog:false,
              Invoice_Payments:[],
              headers:[
               {text:'SO Number',value:'so_number'},
                {text:'Invoice Amount',value:'invoice_amount'},
                {text:'Return Amount',value:'return_amount'},
                {text:'Paid Amount',value:'paid_amount'},
                // {text:'MRP',value:'mrp'},
                             
                {text:'Action',value:'actions'},
            ],
             headers2:[
                {text:'Payment Created Date',value:'payment_created_date'},

               {text:'Payment Mode',value:'payment_mode'},
                {text:'Payment Type',value:'payment_type'},
                {text:'Reference No',value:'reference_no'},
                {text:'Paid Amount',value:'paid_amount'},
                // {text:'MRP',value:'mrp'},
                             
                // {text:'Action',value:'actions'},
            ],
            Merchantpayment:{
                total_amount:"",
                total_paid:"",
                total_pending:""
            },
            loading2:false,
            store_data:[],
            loading:true,
            merchantName:[],
            storeMerchant: [
            (v) => !!v || 'Merchant is required',
          ],
          selectedmerchants:null,
        }
    },
    mounted(){
           this.getMerchantdetails()
            .then(() => {             
              this.loading = false;
            }) 
            .catch((error) => {             
              console.error('Error fetching merchants:', error);            
            });
    },
    methods:{
        viewrow(item){
            console.log('ste',item);
            this.Invoice_Payments = item;
            this.dialog=true;

        },
        handleMerchantSelection(item){
             this.loading2 = true; 
            this.getMerchantpayments(item).then((response)=>{
                console.log('check the response',response)
                if(response.data.status == 1){
                     this.Merchantpayment.total_amount = response.data.data.total_amount;
                    this.Merchantpayment.total_paid = response.data.data.total_paid;
                    this.Merchantpayment.total_pending = response.data.data.total_pending;
                    this.store_data = response.data.data.so_data;
             this.loading2 = false; 
              this.snackbar = true;
            this.snackbarText = response.data.message;
            this.color = "primary";
                }else{
             this.loading2 = false; 
                    this.snackbar = true;
            this.snackbarText = response.data.message;
            this.color = "on-background";
                }
               
            });
        },
    getMerchantdetails(){
            // this.getMerchants().then((response)=>{            
            //     this.merchantName = response.data.data.map(brand => ({
            //         value: brand.merchant_id,
            //         text: brand.merchant_uid
            //     }))     
            // })
                return new Promise((resolve, reject) => {
                this.getMerchants()
                  .then((response) => {
                     this.merchantName = response.data.data.map(brand => ({
                        value: brand.merchant_id,
                        text: brand.merchant_uid
                    }))   
                    console.log('mer',this.merchantName);
                    resolve();
                  })
                  .catch((error) => {
                    console.error('Error fetching merchants:', error);
                    reject(error); // Reject the promise if there's an error
                  });
              });
        },
    }
}
</script>
<style scoped>
.styled-div {
    background-color: #bbb80b; /* Light grey background color */
    border: 2px solid #333; /* Dark border */
    border-radius: 8px; /* Rounded corners */
    padding: 10px; /* Some padding around the content */
    display: inline-block; /* Make the div fit its content */
    font-size: 20px; /* Adjust font size as needed */
    color: #ffffff; /* Text color */
}
.styled-div1 {
    background-color: #2abb10; /* Light grey background color */
    border: 2px solid #333; /* Dark border */
    border-radius: 8px; /* Rounded corners */
    padding: 10px; /* Some padding around the content */
    display: inline-block; /* Make the div fit its content */
    font-size: 20px; /* Adjust font size as needed */
    color: #ffffff; /* Text color */
}
.styled-div2 {
    background-color: #d84619; /* Light grey background color */
    border: 2px solid #333; /* Dark border */
    border-radius: 8px; /* Rounded corners */
    padding: 10px; /* Some padding around the content */
    display: inline-block; /* Make the div fit its content */
    font-size: 20px; /* Adjust font size as needed */
    color: #ffffff; /* Text color */
}
</style>