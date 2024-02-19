<template>
  <div>
    <VTable
      :headers="headers"
      :items="this.RTVdata"
      item-key="dessert"
      class="table-rounded"
      height="500"
      fixed-header
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
          v-for="(item, index) in this.RTVdata.data"
          :key="index"
        >
          <td class="text-center">{{ item.brand_name }}</td>

          <td class="text-center">{{ item.sku_name }}</td>

          <td class="text-center">{{ item.uom }}</td>

          <td class="text-center">
            <VChip
              :color="colorgoodsstatus(item.goods_status).color"
              class="font-weight-medium"
              size="small"
            >
              {{ item.goods_status }}
            </VChip>
          </td>

          <td class="text-center">{{ item.rtv_reason }}</td>

          <td class="text-center">{{ item.collected_date }}</td>

          <td class="text-center">{{ item.quantity }}</td>

          <td class="text-center">{{ item.warehouse_updated_date }}</td>

          <td class="text-center">{{ item.send_to_brand_date }}</td>

          <td
            class="text-center"
            v-if="item.goods_status != 'Send To Brand'"
           
          >
            <VBtn
              icon
              variant="text"
              color="default"
              class="me-2"
              size="x-small"
              @click="editrow(item)"
            >
              <VIcon
                color="warning"
                icon="ri-pencil-line"
                size="22"
              />
            </VBtn>
          </td>
        </tr>
      </tbody>
    </VTable>

    <VDialog
      v-model="dialog"
      max-width="1000"
    >
      <VCard
        title="Purchase Order"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm class="mt-6" ref="purchaseOrderForm">
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <!-- {{selectedPurchaseOrder}} -->
                    <!-- {{this.productData.brand_name}} -->
                    <VSelect label="Select Good Status"
                    v-model="this.PostRTV.goods_status" 
                    :items="['Reached Warehouse','Send To Brand']"
                    
                    />
                  </VCol>

                  <VCol
                    md="6"
                    cols="12"
                  >
                    <!-- {{formData.po_status}}  -->
                    <VTextField label="Quantity" 
                    v-model="this.PostRTV.quantity"
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <!-- {{this.PostRTV.send_to_brand_date}}  -->
                   <VTextField
                      v-if="this.PostRTV.goods_status == 'Send To Brand'"
                      v-model=" this.PostRTV.send_to_brand_date "
                      type="date"
                      label="Send To Brand Date"
                      :min="today"
                      :rules="dateRules"
                      
                    />
<!-- {{ this.PostRTV.warehouse_updated_date}} -->
                     <VTextField
                      v-if="this.PostRTV.goods_status == 'Reached Warehouse'"
                      v-model=" this.PostRTV.warehouse_updated_date "
                      type="date"
                      label="Warehouse Update Date"
                      :min="today"
                      :rules="dateRules"
                      
                    />
                   </VCol>

                

                  <VDivider />

                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click="validateForm()" :disabled="this.PostRTV.goods_status == 'Collected'">Save</VBtn>
                    <!-- @click="resetdetails" -->
                    <!-- variant="tonal" -->
                    <VBtn
                      color="secondary"
                  variant="tonal"
                      @click="closedialog()"
                    >
                      Close
                    </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
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
import servicescall from '@/Services'

export default {
  mixins: [servicescall],

  data() {
    return {
      dateRules: [
         (v) => !!v || 'Date is required',
      ],
      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,

      PostRTV:{
        "rtv_id":"",
        "goods_status":"",
        "quantity":"",
        "warehouse_updated_date":"",
        "send_to_brand_date":"",
      },

      today: this.getFormattedDate(new Date()),
      dialog: false,
      RTVdata: [],
      headers: [
        // { text: 'SNo', value: 'po_number' },
        { text: 'Brand Name', value: 'brand_name' },
        { text: 'SKU.', value: 'sku_name' },
        { text: 'UOM', value: 'uom' },
        { text: 'Goods Status', value: 'goods_status' },
        { text: 'RTV Reason', value: 'rtv_reason' },
        { text: 'Collected Date', value: 'collected_date' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Warehouse UpdateDate', value: 'warehouse_updated_date' },
        { text: 'Send to BrandDate', value: 'send_to_brand_date' },
        { text: 'Action', value: 'actions' },
      ],
    }
  },
  computed: {},
  mounted() {
    this.getRTVdatas()
  },
  methods: {
     validateForm() {      
       this.$refs.purchaseOrderForm.validate().then(valid => {
        console.log("form valid", valid.valid);
        if (valid.valid == true) {
          this.saveeditRTVproducts();
         
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      });     
    },
    saveeditRTVproducts(){
      const postData={
        "goods_status":this.PostRTV.goods_status,
        "quantity":this.PostRTV.quantity,
        "warehouse_updated_date":this.PostRTV.warehouse_updated_date,
        "send_to_brand_date":this.PostRTV.send_to_brand_date ,
        "rtv_id":this.PostRTV.rtv_id,
      }
      
      console.log('RTV',postData);
      this.editrtvproducts(postData).then((response)=>{
        console.log(response);
         if (response.data.status == 1) {              
               this.snackbar = true;
               this.color = "primary";
               this.PostRTV = {};
               this.snackbarText = response.data.message;  
               this.dialog = false;
               this.getRTVdatas();
            //    setTimeout(() => {
            //     window.location.reload(true);
            // }, 1300);    
            } else {          
                 this.snackbar = true;
                 this.color = "on-background";
                 this.snackbarText = response.data.message; 
              }
      })
    },
     getFormattedDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    closedialog() {
      this.dialog = false
    },
    editrow(itm) {
      this.dialog = true;
       this.PostRTV = {
    rtv_id: itm.rtv_id,
    goods_status: itm.goods_status,
    quantity: itm.quantity,
    warehouse_updated_date: itm.warehouse_updated_date != 'N/A' ? this.convertDateFormat(itm.warehouse_updated_date) : '',
    send_to_brand_date: itm.send_to_brand_date != 'N/A' ? this.convertDateFormat(itm.send_to_brand_date) : ''
  };
      // this.PostRTV.goods_status = itm.goods_status;
      // if(itm.warehouse_updated_date != 'N/A'){
      //   this.PostRTV.warehouse_updated_date = this.convertDateFormat(itm.warehouse_updated_date);
      // }
      // if(itm.send_to_brand_date != 'N/A'){
      //   this.PostRTV.send_to_brand_date = this.convertDateFormat(itm.send_to_brand_date);
      // }
      // // this.PostRTV.warehouse_updated_date = itm.warehouse_updated_date;
      // // this.PostRTV.send_to_brand_date = itm.send_to_brand_date;
      // this.PostRTV.quantity = itm.quantity;
      // this.PostRTV.rtv_id = itm.rtv_id;
    },
convertDateFormat(apiDate) {
  const date = new Date(apiDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
},
    colorgoodsstatus(item) {
      if (item == 'Collected') {
        return {
          color: 'warning',
        }
      } else if(item == 'Reached Warehouse' || item == 'Send To Brand'){
        return {
          color: 'success',
        }
      }else{
        return{
          color: 'error',
        }
      }
    },
    getRTVdatas() {
      this.getrtvproducts().then(response => {
        console.log('check the rtv', response)
        this.RTVdata = response.data;
        this.RTVdata.data.reverse();
      })
    },
  },
}
</script>

<style scoped></style>
>
