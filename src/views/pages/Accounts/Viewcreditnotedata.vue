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

                <VCol
                  md="6"
                  cols="12"
                >
                </VCol>

                <!-- <VCol
                  cols="12"
                  md="4"
                >
                  <div class="styled-div">
                    <span>TOTAL AMOUNT :&#8377;{{ !isNaN(parseFloat(this.Merchantpayment.total_amount))
      ? parseFloat(this.Merchantpayment.total_amount).toFixed(2)
      : '0.00' }}</span>
                  </div>
                 
                </VCol> -->

                <!-- <VCol
                  md="4"
                  cols="12"
                >
                  <div class="styled-div1">
                    <span>TOTAL PAID :&#8377;{{ !isNaN(parseFloat(this.Merchantpayment.total_paid))
      ? parseFloat(this.Merchantpayment.total_paid).toFixed(2)
      : '0.00'}}</span>
                  </div>
                  
                </VCol> -->

                <!-- <VCol
                  md="4"
                  cols="12"
                >
                  <div class="styled-div2">
                    <span>TOTAL PENDING :&#8377;{{ !isNaN(parseFloat(this.Merchantpayment.total_pending))
      ? parseFloat(this.Merchantpayment.total_pending).toFixed(2)
      : '0.00'}}</span>
                  </div>
                 
                </VCol> -->

                <VCol cols="12">
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
                        />
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
                        v-for="(item, index) in storesdata"
                        :key="index"
                      >
                        <td class="text-center">
                          {{ item.so_number }}
                        </td>
                        <!-- <td class="text-center">&#8377;{{ item.invoice_amount }}</td> -->
                        <!-- <td class="text-center">&#8377;{{ item.return_amount }}</td> -->
                        <!-- <td class="text-center">&#8377;{{ item.paid_amount }}</td> -->
                             <!-- @click="getPDFupdate(item.credit_note)" -->
                        <td class="text-center" >
                          <!-- <VBtn v-if="item.credit_note == '' || item.return_amount == 0  "       
                          icon
                          variant="text"
                          color="default"
                          class="me-2"
                          size="x-small"
                            @click="getCreditNoteupdate(item.so_id,item.return_amount)"
                        >
                     
                      <VIcon
                        color="error"
                        icon="cbi:button"
                        size="26"
                      />
                    </VBtn> -->
                     <VProgressCircular
                      :size="20"
                      color="primary"
                      indeterminate
                      v-show="isProgress"
                    >
                    </VProgressCircular>
                    
                    <VBtn v-if="item.credit_note != '' && item.return_amount > 0"
                      icon
                      variant="text"
                      color="default"
                      class="me-2"
                      size="x-small"
                      @click="getPDFupdate(item.credit_note)"
                    >
                      <VIcon
                        color="error"
                        icon="iwwa:file-pdf"
                        size="26"
                      />
                    </VBtn>

                    </td>

                        <!-- <td class="text-center">
                            
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
                        </td> -->
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
                  <!-- <VBtn @click="validateForm()">Save</VBtn> -->

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

    <VDialog
      v-model="dialog"
      max-width="800px"
      persistent
    >
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
              <tr v-if="this.Invoice_Payments.length === 0">
          <td colspan="16" class="text-center"><h1>No Transactions Found !</h1></td>
        </tr>  

              <tr
                v-for="(item, index) in this.Invoice_Payments"
                :key="index"
              >
                <td class="text-center">{{ item.payment_created_date }}</td>

                <td class="text-center">{{ item.payment_mode }}</td>
                <td class="text-center">{{ item.payment_type }}</td>
                <td class="text-center">{{ item.reference_no }}</td>
                <td class="text-center">
                 
                  &#8377;{{ item.paid_amount }}</td>
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
import servicescall from '@/Services'

export default {
  mixins: [servicescall],

  data() {
    return {
      isProgress:false,
      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,
      dialog: false,
      Invoice_Payments: [],
      headers: [
        { text: 'SO Number', value: 'so_number' },
        // { text: 'Invoice Amount', value: 'invoice_amount' },
        // { text: 'Return Amount', value: 'return_amount' },
        // { text: 'Paid Amount', value: 'paid_amount' },
        {text:'Credit Note',value:'credit_note'},

        // { text: 'Action', value: 'actions' },
      ],
      cityID:'',
      headers2: [
        { text: 'Payment Created Date', value: 'payment_created_date' },

        { text: 'Payment Mode', value: 'payment_mode' },
        { text: 'Payment Type', value: 'payment_type' },
        { text: 'Reference No', value: 'reference_no' },
        { text: 'Paid Amount', value: 'paid_amount' },
        // {text:'MRP',value:'mrp'},

        // {text:'Action',value:'actions'},
      ],
      Merchantpayment: {
        total_amount: '',
        total_paid: '',
        total_pending: '',
      },
      loading2: false,
      store_data: [],
      loading: true,
      merchantName: [],
      storeMerchant: [v => !!v || 'Merchant is required'],
      selectedmerchants: null,
      storesdata: [],
    }
  },
  computed:{
    storesdata(){
      return this.store_data.filter((item)=> item.credit_note != "");
    }    

  },
  mounted() {
      this.cityID = localStorage.getItem("city_id");

    this.getMerchantdetails()
      .then(() => {
        this.loading = false
      })
      .catch(error => {
        console.error('Error fetching merchants:', error)
      })
  },
  methods: {
    getCreditNoteupdate(id,rm){
      this.isProgress = true;
      if(rm != 0){
          this.getCreditnote(id).then((response)=>{
        console.log({response});
        if(response.data.status == 1){
          this.snackbar = true;
          this.snackbarText = response.data.message;
          this.color = 'primary';
          location.reload();
          this.isProgress = false;
        }else{
          this.snackbar = true;
          this.snackbarText = response.data.message;
          this.color = 'on-background';
          this.isProgress = false
        }
      })
      }else{
          this.snackbar = true;
          this.snackbarText = "There is no Return Ammount"
          this.color = 'on-background';
          this.isProgress = false;
      }
    
    },
    getPDFupdate(id){
          this.loading2 = true;
       window.open(id, '_blank');
        this.loading2 = false;
    },
    viewrow(item) {
      console.log('ste', item)
      this.Invoice_Payments = item;
      this.dialog = true;
    },
    handleMerchantSelection(item) {
      this.loading2 = true
      this.getMerchantpayments(item).then(response => {
        console.log('check the response', response)
        if (response.data.status == 1) {
          this.Merchantpayment.total_amount = response.data.data.total_amount
          this.Merchantpayment.total_paid = response.data.data.total_paid
          this.Merchantpayment.total_pending = response.data.data.total_pending
          this.store_data = response.data.data.so_data
          this.loading2 = false
          this.snackbar = true
          this.snackbarText = response.data.message;

          this.color = 'primary'
        } else {
          this.loading2 = false
          this.snackbar = true
          this.snackbarText = response.data.message;
          this.color = 'on-background'
        }
      })
    },
    getMerchantdetails() {
      // this.getMerchants().then((response)=>{
      //     this.merchantName = response.data.data.map(brand => ({
      //         value: brand.merchant_id,
      //         text: brand.merchant_uid
      //     }))
      // })
      return new Promise((resolve, reject) => {
        this.getMerchants(this.cityID) 
          .then(response => {
            this.merchantName = response.data.data.map(brand => ({
              value: brand.merchant_id,
              text: brand.merchant_uid,
            }))
            console.log('mer', this.merchantName)
            resolve()
          })
          .catch(error => {
            console.error('Error fetching merchants:', error)
            reject(error) // Reject the promise if there's an error
          })
      })
    },
  },
}
</script>
<style scoped>
.styled-div, .styled-div1, .styled-div2 {
  border: 1px solid #a8a8a8; /* Dark border */
  border-radius: 8px; /* Rounded corners */
  padding: 15px; /* Some padding around the content */
  display: inline-block; /* Make the div fit its content */
  font-size: 20px; /* Adjust font size as needed */
  color: #ffffff; /* Text color */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for hover effects */
  margin: 10px; /* Add some margin between divs */
}
.styled-div:hover, .styled-div1:hover, .styled-div2:hover {
  transform: translateY(-5px); /* Slightly lift the div on hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  /* border: 2px solid rgb(186,139,50);  */
} 
.styled-div {
  background-color: #f39c12; /* Bright orange */
}

.styled-div1 {
  background-color: #2ecc71; /* Green */
}

.styled-div2 {
  background-color: #e74c3c; /* Red */
}
</style>
