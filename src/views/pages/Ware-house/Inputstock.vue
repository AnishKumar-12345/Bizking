<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard
          title="Input Stock"
          class="mb-4"
        >
          <VCardText>
            <!-- 👉 Form -->
            <VForm class="mt-6"  ref="purchaseOrderForm">
              <VRow>
                <VCol
                  md="6"
                  cols="12"
                >
                  <!-- :items="['PO1', 'PO2', 'PO3','PO4','PO5']" -->

                  <VTextField
                    v-model="this.inputStock.po_number"
                    label="Purchase Order"
                    readonly
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="this.inputStock.brand_name"
                    label="Order To"
                    readonly
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="this.inputStock.stock_updated_date"
                    type="date"
                    label="Date"
                    :min="today"
                    :rules="dateRules"
                    readonly
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                >
                <!-- {{this.inputStock.po_status}} -->
                     <!-- :items="['Draft', 'Created', 'Shared', 'Acknowledged', 'Received', 'Close']" -->
                  <VTextField
                    v-model="this.inputStock.po_status"
                    label="PO Status"
               
                    readonly
                  />
                </VCol>
                <VCol cols="12">

                  <VTable
                    :headers="headers"
                    :items="InputStockDetails"
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
                        v-for="(item, index) in this.inputStockproducts"
                        :key="index"
                      >
                        <td class="text-center">{{ item.sku_name }}</td>
                             <td class="text-center">{{ item.uom }}</td>
                        <td class="text-center">
                          {{ item.quantity }}
                        </td>
                        <td class="text-center">
                      <!-- {{item.received_quantity}} -->
                          <VTextField
                       
                            v-model="item.received_quantity"
                            outlined
                            dense
                             @keydown="preventDecimal"
                              @paste="preventPaste"
                              type="number"
                              min="0" 
                              :max="item.quantity"                              
                              :rules="receivedquantity"
                             
                          />
                           <span v-if="isQuantityExceeded(item.received_quantity,item.quantity)" >
                           
                          </span>
                        </td>
                        <td class="text-center">
                          <!-- {{item.rtm}} -->
                          <VTextField
                       
                           @keydown="preventDecimal"
                              @paste="preventPaste"
                              type="number"
                              min="0"
                               max="20000"
                            v-model="item.rtm"
                            outlined
                            dense
                            
                            :rules="rtm1"
                       
                          />
                         <!-- <span v-if="isrtmQuantityExceeded(item.received_quantity,item.quantity,item.rtm)" >
                           
                          </span> -->
                        </td>
                        <td class="text-center">
                          <VTextField                   
                             v-model="item.remarks"
                            outlined
                            dense
                            required
                     
                          />
                        </td>
                      </tr>
                    </tbody>
                  </VTable>

                </VCol>
                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn @click="validateForm()">Save</VBtn>

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

     <VSnackbar
      v-model="snackbar" :timeout="3000"
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

  props: ['po_id'],
  data() {
    return {
      receivedquantity: [(v) => v === 0 || (!!v && `${v}`.trim() !== '') || 'Received Quantity Is Required'],
     rtm1: [(v) => v === 0 || (!!v && `${v}`.trim() !== '') || 'Rtm Quantity Is Required'],
      //  remarks: [v => !!v || 'remarks Is Required'],
      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,

      today: this.getFormattedDate(new Date()),
      // inputStock: {
      //   po_number: '',
      //   brand_name: '',
      //   created_date: this.getFormattedDate(new Date()),
      //   po_status: '',
      //   you_saved: '',
      //   po_id: '',
      //   po_number: '',
      //   brand_id: '',
      //   products: [
      //     {
      //       brand_product_id: '',
      //       sku_name: '',
      //       hsn_code: '',
      //       mrp: '',
      //       quantity: '',
      //       uom: '',
      //       price_per_unit: '',
      //       taxable_amount: '',
      //       cgst: '',
      //       sgst: '',
      //       amount: '',
      //       total_give_margin: '',
      //     },
      //   ],
      // },
     inputStock: {
          "brand_id": "",
          "stock_updated_date": this.getFormattedDate(new Date()),
          "received_quantity":'',
          "po_status":'',
          "po_id":'',
          "remarks":'',
          "rtm":'',
          "products": [
              {
                  "brand_id": "",
                  "brand_product_id": "",
                  "received_quantity": "",
                  "rtm": "",
                  "remarks":""
              },             
          ]
      },
      PoId: '',
      InputStockDetails: [],
      selectedPurchaseOrder: null,
      dialog: false,

      headers: [
        // { text: 'Product ID', value: 'po_number'},
        { text: 'Product Name', value: 'brand_name' },
         { text: 'UOM', value: 'uom' },
        { text: 'Ordered Quantity', value: 'quantity' },
        { text: 'Received Quantity', value: 'quantity' },
        { text: 'RTM', value: 'carbs' },
        { text: 'Remarks', value: 'protein' },
       

      ],
    }
  },
  computed: {
    filteredDesserts() {
      if (!this.selectedPurchaseOrder) {
        // return this.desserts;
      }
      return this.desserts.filter(item => item.purchaseOrder === this.selectedPurchaseOrder)
    },
    
  },

  mounted() {
    this.PoId = this.$route.query.po_id
    console.log('Received po_id:', this.PoId)
    this.getInputstockdetails()
  },

  methods: {
    isrtmQuantityExceeded(itm,data,text){
      console.log("check valids",data,text)
       if(text > data ){
        this.snackbar = true;
        this.color = "on-background";
        this.snackbarText = "RTM quantity cannot exceed item quantity."
      }
    },
     isQuantityExceeded(itm,data) {
      // return itm > data;
      if(itm > data){
        this.snackbar = true;
        this.color = "on-background";
        this.snackbarText = "Received quantity cannot exceed item quantity."
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

     preventDecimal(event) {
     if (event.key === '.' || event.key === ',' ||  event.key === '+' ||  event.key === '-' || event.keyCode === 189 || event.keyCode === 109) {
        event.preventDefault();
      }
    },

validateForm(){
   this.$refs.purchaseOrderForm.validate().then(valid => {
        console.log("form valid", valid.valid);
        if (valid.valid == true) {
          // this.saveData();
          // if(this.allQuantity >=1){   
          //    this.saveData();
          // }else{
          //   this.snackbar = true;
          //   this.snackbarText = "Please give Quantities"
          //   this.color = "error";
          // }
          this.saveInputstock();
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      }); 
 },

    saveInputstock(){
       const statusMapping = {
            'Draft': 1,
            'Created': 2,
            'Shared': 3,
            'Acknowledged': 4,
            'Received': 5
          };
        const postData = {
          "brand_name": this.inputStock.brand_name,
          "po_number": this.inputStock.po_number,
          "brand_id":  this.inputStock.brand_id,
          "stock_updated_date": this.inputStock.stock_updated_date, 
          "recieved_date": this.inputStock.stock_updated_date,
          "po_id": this.inputStock.po_id,
          "po_status":statusMapping[this.inputStock.po_status],         
          "products": this.inputStockproducts.map((product,index) => ({
            // "brand_id": this.inputStock.brand_id,
                  "brand_product_id": product.brand_product_id,
                  "received_quantity": `${product.received_quantity}`,
                  "rtm": `${product.rtm}`,
                  "sku_name": product.sku_name,
                  "remarks": product.remarks,
                  "quantity":  product.quantity,
                  "hsn_code": product.hsn_code,
                  "mrp": product.mrp,
                  "uom": product.uom,
                  "price_per_unit": product.price_per_unit,
                  "taxable_amount": product.taxable_amount,
                  "csgt": product.csgt,
                  "sgst": product.sgst,
                  "amount": product.amount,
                  "sgst_percentage": product.sgst_percentage,
                  "cgst_percentage": product.cgst_percentage,
                  "total_give_margin": product.total_give_margin,

          })),
        };
      console.log('check the post data',postData);

   const hasNonZeroQuantity = postData.products.some(product => product.received_quantity > 0 || product.rtm > 0);

    if (!hasNonZeroQuantity) {
        this.snackbar = true;
        this.color = "on-background";
        this.snackbarText = "Received Quantity or RTM must be greater than 0 for at least one product.";
        return;
    }

     const validationErrors = postData.products.filter(product => {
           console.log('check the post data',  product.rtm > product.quantity);
    const totalQuantity = Number(product.received_quantity) + Number(product.rtm);
    return (
      this.isQuantityExceeded(product.received_quantity, product.quantity) ||
      (product.received_quantity === 0 && product.rtm > product.quantity) ||
     
      (product.received_quantity === product.quantity && product.rtm > product.quantity) ||
      totalQuantity > product.quantity 
      // || 
      // totalQuantity !== product.quantity ||
      // (product.received_quantity > 0 || product.rtm > 0) && totalQuantity !== product.quantity
    );
  });

     console.log('valid errors',validationErrors);
      if (validationErrors.length === 0) {
      this.PostInputstock(postData).then((response) =>{
                console.log('check the response',response);
                console.log('check the response',response.status);
                  if (response.status == 1) {              
                    this.snackbar = true;
                    this.color = "primary";
                    this.formData = {};
                    this.snackbarText = response.message;  
                     setTimeout(() => {
                       this.$router.push({
                      name: 'Viewpurchasehistory'
                    }); 
            }, 2000); 
                     
                    // this.getInputstockdetails();  
                  } else {          
                      this.snackbar = true;
                      this.color = "on-background";
                    };
                
              })
      }else{
          this.snackbar = true;
          this.color = "on-background";
          this.snackbarText = "your quantities are exceeded"; 
      }
            
     },

    getFormattedDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },

    getInputstockdetails() {
      this.getInputstock(this.PoId).then(response => {
        this.InputStockDetails = response.data
        console.log('check input dtock', this.InputStockDetails)

        this.InputStockDetails.forEach(item => {
          this.inputStock.brand_id = item.brand_id;
          this.inputStock.po_id = item.po_id;
          this.inputStock.po_number = item.po_number
          this.inputStock.brand_name = item.brand_name
          this.inputStock.po_status = 'Received'
          this.inputStockproducts = item.products
          this.inputStock.received_quantity = item.received_quantity
          this.inputStock.remarks = item.remarks
          this.inputStock.rtm = item.rtm

          console.log('inputStockproducts', this.inputStockproducts)
        })      
      })
    },
    //  deleteRow(item) {

    //   const index = this.desserts.indexOf(item);
    //   if (index !== -1) {
    //     this.desserts.splice(index, 1);
    //   }
    // },

    //     openproductdialog(){
    //     console.log('check the dialog')
    //     this.dialog = true;
    //  },
    //   closeDialog() {
    //     this.dialog = false;
    //   },
  },
}
</script>
<style scoped></style>
