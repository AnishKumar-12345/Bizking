<template>
  <div>
     <div style="max-width:400px" v-if="this.purchaseHistory != null">
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

     
      <div v-if="loading" id="app">
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

      <VRow v-if="this.purchaseHistory == null">
      <VCol cols="12"> 
        <VCard title="Purchase Order View">
          <VCardText> 
            <!-- 👉 Checkbox and Button  -->
            <VAlert
              color="warning"
              variant="tonal"
              class="mb-4"              
              border="top"
            >
              <VAlertTitle class="mb-1"> Are you sure you gave Purchase Orders? </VAlertTitle>
              <p class="mb-0">
                The system is not retrieving the Purchase Histories from Purchase Orders. Please ensure that you have applied for Purchase Orders !</p>
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
     </VRow>

 
     <VTable v-if="this.purchaseHistory != null"
       :headers="headers"
       :items="paginatedItems"
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

        <tr v-if="filteredPurchaseHistory.length === 0">
          <td colspan="16" class="text-center"><h1>No data found !</h1></td>
        </tr>  

       <tr
        v-for="(item,index) in paginatedItems"
        :key="index"

         
      >       
        <td class="text-center">{{ item.po_number }}</td>
        <td class="text-center">
          {{ item.created_date }}
        </td>
        <td class="text-center">
           <VChip
        :color="resolveStatusVariant(item.po_status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ item.po_status }}
          <!-- {{ item.fat }} -->
            </VChip>
        </td>
        <td class="text-center">
          {{ item.brand_name }}
        </td>
        <td class="text-center">
          {{ item.brand_name == item.brand_name ? 'Mauriya Spiritual & Naturals(BIZKINGZ)' : item.brand_name }}
        </td>
        <td  class="text-center " v-if="item.po_status != 'Received'" style="display:flex;justify-content:center;align-items:center;">
          <!-- {{item.actions}} -->
           <VBtn
                icon
                variant="text"
                color="error"
                class="me-2"
                size="small"                 
            >
            <!-- Receive Stock -->
              <VIcon
              icon="material-symbols:cancel-outline"
              color="error"
              size="30"
              @click="cancelstock(item)"
              />
            </VBtn>

            <VBtn
                icon
                variant="text"
                color="success"
                class="me-2"
                size="small"                
            >
            <!-- Receive Stock -->
              <VIcon
              icon="mdi-invoice-receive-outline"
              color="success"
              size="30"
              @click="inputstock(item)"
              />
            </VBtn>
              <!-- <VBtn
                icon
                variant="text"
                color="default"
                class="me-2"
                size="x-small"
                @click="deleteRow(item)"
            >
                <VIcon
                icon="ri-pencil-line"
                size="22"
                />
            </VBtn>
            <VBtn
                icon
                variant="text"
                color="default"
                class="me-2"
                size="x-small"
                @click="deleteRow(item)"
            >
                <VIcon
                icon="ri-delete-bin-line"
                size="22"
                />
            </VBtn> -->
          </td>
      </tr>
      </tbody>        
        </VTable>
        <VPagination
  v-model="page"
  :length="Math.ceil(filteredPurchaseHistory.length / pageSize)"
  @input="updatePagination"
/>

<VDialog
  v-model="dialog"
  max-width="400"
  persistent
>
   <VCard
        title="Cancel Order"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                class="mt-4"
                ref="purchaseOrderForm"
              >
                <VRow>
                  <VCol
                    md="12"
                    cols="12"
                  >
                   Are you sure want to cancel the order ?
                  </VCol>
                  <VCol
                  md="12"
                    cols="12"
                  >
                    <VBtn @click="validateForm">Yes</VBtn> &nbsp;
                    <!-- @click="resetdetails" -->
                    <VBtn
                      color="secondary"
                      variant="tonal"
                      @click="closeDialog()"
                    >
                      No
                    </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
   </VCard>
</VDialog>

<VDialog
  v-model="dialog2"
  max-width="500"
  persistent
>
   <VCard
        title="Cancel Order"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                class="mt-4"
                ref="purchaseOrderForm2"
              >
                <VRow>
                  <VCol
                    md="12"
                    cols="12"
                  >
                    <VTextarea
                      v-model="this.cancelOrderdetails.cancel_reason"
                      label="Cancel Reason"
                      row-height="30"
                      rows="4"
                      variant="filled"
                      auto-grow
                      shaped
                      :rules="workingRules"
                    />
                      
                  </VCol>
                  <VCol
                  md="12"
                    cols="12"
                  >
                    <VBtn @click="validateForm2">Save</VBtn> &nbsp;
                    <!-- @click="resetdetails" -->
                    <VBtn
                      color="secondary"
                      variant="tonal"
                      @click="closeDialog2()"
                    >
                      No
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
      v-model="snackbar"
      :timeout="2000"
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
          cancelOrderdetails:  {
            "po_id":"",
            "cancel_reason":"",           
            "po_status":6            },
          cancelOrder:{},
          dialog:false,
          dialog2:false,

          searchQuery:'',
          page: 1,
          pageSize: 10,
          userRoles:'',
          loading:true,
          purchaseHistory:[],
          userIds:'',
          createdBy:'',
           workingRules: [v => !!v || 'Cancel Reason is required'],

      headers: [
          { text: 'PO Number', value: 'po_number' },
          { text: 'Order Date', value: 'created_date' },
          { text: 'Status', value: 'po_status' },
          { text: 'Order To', value: 'brand_name'},
          { text: 'Shipped To', value: 'brand_name' },
          // { text: 'Price/Unit', value: 'price_per_unit' },        
          // { text: 'TaxableAmount', value: 'taxable_amount' },   
          // { text: 'CGST', value: 'csgt' },  
          // { text: 'SGST', value: 'sgst' },  
          { text: 'Action', value: 'actions' }, 
         ],
        }
    },
     computed: {
       
    filteredPurchaseHistory() {
     const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
      return this.purchaseHistory.filter((item) => {
        // Filter based on search query
        const matchesSearch = (
          (item.po_number && item.po_number.toLowerCase().includes(lowerCaseQuery)) ||
          (item.created_date && item.created_date.toLowerCase().includes(lowerCaseQuery)) ||
          (item.po_status && item.po_status.toLowerCase().includes(lowerCaseQuery)) ||
          (item.brand_name && item.brand_name.toLowerCase().includes(lowerCaseQuery)) 
          // (item.total_so_amount && item.total_so_amount.toString().includes(lowerCaseQuery))
        );
        // Filter based on status
        const matchesStatus = (
            item.po_status === 'Acknowledged'
          // item.po_status === 'Acknowledged' || 
          // item.po_status === 'Shared' || 
          // item.po_status === 'Received' 
          // item.po_status === 'Shipped'
        );
        // Return true if both search query and status match
        return matchesSearch && matchesStatus;
      });
      // return this.purchaseHistory.filter(item => item.po_status === 'Acknowledged' || item.po_status === 'Shared' || item.po_status === 'Received');
    },
      paginatedItems() {
      const startIndex = (this.page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      // Sort the filteredPurchaseHistory by created_date in descending order
      const sortedItems = this.filteredPurchaseHistory.slice().sort((a, b) => {
         return new Date(b.created_date) - new Date(a.created_date);
      });
      return sortedItems.slice(startIndex, endIndex);
   }
  },
    mounted(){
   
       this.createdBy = localStorage.getItem('createdby');
       this.userIds = localStorage.getItem('userId');
       this.userRoles = localStorage.getItem('userRole')
       this.getPurchasehistorydetails()
        .then(() => {             
              this.loading = false;
            }) 
            .catch((error) => {             
              console.error('Error fetching merchants:', error);            
            });
          //  setTimeout(() => {
          //   //  this.getPurchasehistorydetails();
          //     this.loading = false; // Set loading to false when the operation is complete
          //   }, 3000);
    },
    methods:{
      validateForm2(){
        this.$refs.purchaseOrderForm2.validate().then(valid => {
              // console.log("form valid", valid.valid);
              if (valid.valid == true) {
              
                this.cancelordersata();
              }else{
                this.snackbar = true;
                  this.snackbarText = "Please give all mandatory fields"
                  this.color = "on-background";
              }
            }); 
      },
      cancelordersata(){
        console.log("check te data", this.cancelOrder.po_id);
        const postData = {
            "po_id":this.cancelOrder.po_id,
            "cancel_reason":this.cancelOrderdetails.cancel_reason,           
            "po_status":6   
        }
        console.log('check the data',postData);
        this.Cancelpurchaseorder(postData).then((response)=>{
          console.log('details data',response);
           if (response.data.status == 1) {
            this.snackbar = true;
            this.color = 'primary';
            this.cancelOrderdetails = {};
            this.snackbarText = response.data.message;
              this.getPurchasehistorydetails()
              .then(() => {             
                    this.loading = false;
                  }) 
                  .catch((error) => {             
                    console.error('Error fetching merchants:', error);            
                  });
            this.dialog2 = false;          
        } else {
            this.snackbar = true;
            this.color = 'on-background';
        }
        })

      },
      closeDialog2(){
          this.dialog2=false;
          this.cancelOrderdetails={};
      },
      validateForm(){    
         this.dialog2=true;
         this.dialog=false

      },
      closeDialog(){
         this.dialog=false;
      },
      cancelstock(item){
        this.dialog=true;
        console.log('test',item);
        this.cancelOrder=item;
      //  this.validateForm(item);
      },
       updatePagination(page) {
        this.page = page;
      },
      inputstock(itm){
        // console.log('check the detials',itm.po_id);
         this.$router.push({
          name: 'Createwarehouseinput', // Replace with the actual name of your route
          query: { po_id: itm.po_id }
        });
        // this.navigateTo('/Createwarehouseinput', 42);
        
      },
      getPurchasehistorydetails(){
        // this.getPurchaseorder(this.userIds,this.userRoles).then((response) =>{
        //   // console.log('check the view purchase order',response.data);
        //   this.purchaseHistory = response.data;
        //   this.purchaseHistory.reverse();
        //   console.log('check the view purchase History',this.purchaseHistory);

        // })

          return new Promise((resolve, reject) => {
          this.getPurchaseorder(this.userIds,this.userRoles)
            .then((response) => {
              this.purchaseHistory = response.data;
              this.purchaseHistory.reverse();
              resolve(); // Resolve the promise when API call is successful
            })
            .catch((error) => {
              console.error('Error fetching merchants:', error);
              reject(error); // Reject the promise if there's an error
            });
        });
        
      },
      resolveStatusVariant (status){
      if (status == 'Acknowledged')
        return {
          color: 'warning',
          // text: 'Acknowledged',
        }
     else if(status == 'Shared')
     return{
        color: 'info',
     }
      
        
      else
        return {
          color: 'success',
          // text: 'Shared',
        }
      },
    }
}
</script>

<style scoped>

</style>>

