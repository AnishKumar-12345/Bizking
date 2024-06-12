<template>
  <div>
    <div
      v-if="loading"
      class="loading-container"
    >
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
        <VCard
          title="Merchant Payment Details"
          class="mb-4"
        >
          <VCardText>
            <!-- 👉 Form -->
            <VForm
              class="mt-6"
              ref="purchaseOrderForm"
            >
              <VRow>
                <!-- {{selectedmerchants}} -->
                <VCol
                  md="6"
                  cols="12"
                >
                 <!-- @update:model-value="handleMerchantSelection(selectedmerchants)" -->
                  <VAutocomplete
                    v-model="selectedmerchants"
                    :items="merchantName"
                    item-value="value"
                    item-title="text"
                    :rules="storeMerchant"
                    label="Merchant"
                    :menu-props="{ maxHeight: 200 }"
                    no-underline
                   
                  />
                  <VProgressCircular
                      :size="20"
                      color="primary"
                      indeterminate
                      v-show="isProgress"
                    >
                    </VProgressCircular>
                </VCol>
                 
                 <VCol
                  md="6"
                  cols="12"
                >
                  <!-- @update:model-value="handleReturnSelection(selectedReturnsales)" -->
                  <VAutocomplete
                    v-model="selectedReturnsales"
                    :items="returnName"
                    item-value="value"
                    item-title="text"
                    :rules="storeMerchant2"
                    label="Return Sales Orders"
                    :menu-props="{ maxHeight: 200 }"
                    no-underline
                  
                  />
                </VCol>
                 <VCol
                  md="6"
                  cols="12"
                >
                <!-- {{selectedInvoicesales}} -->
                 <!-- @update:model-value="handleReturnSelection(selectedReturnsales)" -->
                  <VAutocomplete
                    v-model="selectedInvoicesales"
                    :items="invoiceName"
                    item-value="value"
                    item-title="text"
                    :rules="storeMerchant3"
                    label="Invoice Sales Orders"
                    :menu-props="{ maxHeight: 200 }"
                    no-underline
                    multiple
                  />
                </VCol>
                  <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="validateForm()">Save</VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
               
                >
                  Reset
                </VBtn>
                  <VProgressCircular
                      :size="30"
                      color="primary"
                      indeterminate
                      v-show="isProgress2"
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
import servicescall from '@/Services'

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
            selectedmerchants:'',
            merchantName:[],
            storeMerchant: [v => !!v || 'Merchant is required'],
            storeMerchant2: [v => !!v || 'Return Sales Order is required'],
            storeMerchant3: [v => !!v || 'Invoice Sales Order is required'],
            
            cityID:"",
            loading: true,
            selectedReturnsales:'',
            returnName:[],
            isProgress:false,
            isProgress2:false,

            selectedInvoicesales:'',
            invoiceName:[],
        }
    },
    watch:{
        selectedmerchants(newVal){
            this.handleMerchantSelection(newVal);
            this.handleInvoiceSelection(newVal);
        },

    },
    mounted(){
      this.cityID = localStorage.getItem("city_id");
        this.getMerchantdetails()
        .then(() => {
            this.loading = false
        })
        .catch(error => {
            console.error('Error fetching merchants:', error)
        })
    },
    methods:{
        validateForm(){
             this.$refs.purchaseOrderForm.validate().then(valid => {
        // console.log("form valid", valid.valid);
                if (valid.valid == true) {
                
                this.saveInvoiceformat();
                }else{
                this.snackbar = true;
                    this.snackbarText = "Please give all mandatory fields"
                    this.color = "on-background";
                }
            }); 
        },
        saveInvoiceformat(){
            const postData = {
            "so_id": this.selectedReturnsales,
            "invoices": this.selectedInvoicesales.map(invoice => ({
                "invoice_number": invoice
                    }))
                };
            console.log({postData});
            this.isProgress2 = true;
            this.saveCreditnote(postData).then((response)=>{
                console.log({response});
                if(response.data.status == 1){
                     this.snackbar = true;
                    this.snackbarText = response.data.message
                    this.color = "primary";
            this.isProgress2 = false;

                window.location.reload(true);   

                }else{
              this.isProgress2 = false;

                this.snackbar = true;
                this.snackbarText =  response.data.message
                this.color = "on-background";
            }
            })
        },
        handleInvoiceSelection(id){
            // console.log('set',id);
            this.isProgress = true;
            this.getinvoiceorders(id).then((response)=>{
                console.log('check the response', response)
                if (response.data.status == 1) {
                this.isProgress = false;
                this.invoiceName = response.data.data.map(brand => ({
                    value: brand.invoice_number,
                    text: brand.invoice_number,
                }))             
                } else {
                this.isProgress = false;
                }
            })
        },
        handleMerchantSelection(id){
            this.isProgress = true;
            this.getReturnsalesorders(id).then((response)=>{
                // console.log('check the response', response)
                if (response.data.status == 1) {
                this.isProgress = false;
                this.returnName = response.data.data.map(brand => ({
                    value: brand.so_id,
                    text: brand.so_number,
                }))
               
                } else {
                this.isProgress = false;

                }
            })
        },
           getMerchantdetails() {     
            return new Promise((resolve, reject) => {
                this.getMerchants(this.cityID) 
                .then(response => {
                    this.merchantName = response.data.data.map(brand => ({
                    value: brand.merchant_id,
                    text: brand.merchant_uid,
                    }))
                    // console.log('mer', this.merchantName)
                    resolve()
                })
                .catch(error => {
                    // console.error('Error fetching merchants:', error)
                    reject(error) // Reject the promise if there's an error
                })
            })
            },
    }
}
</script>
<style scoped>

</style>