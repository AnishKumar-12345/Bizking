<template>
  <div>
    <!-- <div class="search-container">
      <label for="search">Search:</label>
      <input
        type="text"
        id="search"
        v-model="searchQuery"
        @input="filterDesserts"
        placeholder="Enter search query"
      />
    </div> -->    
    

       <div v-if="loading2"  class="loading-container">
      <VProgressLinear
            height="5"
            color="primary"
            indeterminate
            class="custom-loader"  
            full-width              
        />          
     </div>
     
       <!-- <VRow v-if="showNoSalesAlert"> 
      <VCol cols="12"> 
        <VCard title="Sales Order View">
          <VCardText> 
       
            <VAlert
              color="warning"
              variant="tonal"
              class="mb-4"              
              border="top"
            >
              <VAlertTitle class="mb-1"> Are you sure you gave Sales Orders? </VAlertTitle>
              <p class="mb-0">
                The system is not retrieving the Sales Orders. Please ensure that you have applied for Sales Orders !</p>
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
     </VRow> -->

    

        <VCard         
          class="mb-2"
        >
          <VCardText>
            <VRow>
              <VCol cols="12">
                <!-- 👉 Form -->
              <VForm class="mt-6" ref="purchaseOrderForm8">
              <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">           
              </VCheckbox> -->
              <VRow>
                 <VCol
                md="6"
                cols="12"
                v-show="filterlocation"
              >
              <!-- {{selectedBrand}} -->  
              <!-- {{this.Addbrand.location_id}}            -->
                <VAutocomplete
                  v-model="locationdata"
                  label="Location"
                  :items="this.cityLoaction"               
                  item-value="value"
                  item-title="text"                
                  :menu-props="{ maxHeight: 200 }"
                  
                />
              </VCol>

              <!-- @update:model-value="getSalesorderdetails"   -->
                <VCol   md="6"
                  cols="12">
                  <VSelect 
                  v-model="selectsales"
                  :items="['Shipped','Delivered','Onhold','Cancelled','GRN Sales Orders']"
                         
                      
                      label="Please Select The Status"     
                  />

                </VCol>
              </VRow>
              </VForm>
              </VCol>
            </VRow>
          </VCardText>
      </VCard>

        <div style="max-width:400px" v-if="!showNoSalesAlert">
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

   <VTable 
      v-if="!showNoSalesAlert" 
       :headers="computedHeaders" 
       :items="paginatedItems"       
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

        <tr v-if="filteredSalesHistory.length === 0">
          <td colspan="16" class="text-center"><h1>No data found !</h1></td>
        </tr>  

        <tr v-if="this.saleshistory.length === 0">
          <td colspan="16" class="text-center"><h1>No data found !</h1></td>
        </tr>  

       <tr
        v-for="(item,index) in this.paginatedItems"
        :key="index"

         
      >       
        <td class="text-center">{{ item.so_number }}</td>
        <td class="text-center">
          {{ item.created_date }}
        </td>
        <td class="text-center">
           <VChip
        :color="resolveStatusVariant(item.so_status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ item.so_status }}
          <!-- {{ item.fat }} -->
            </VChip>
        </td>
          <td class="text-center">
          {{ item.delivery_person }}
        </td>
        <td class="text-center">
          {{ item.merchant_name }}
        </td>
        <td class="text-center">
          {{ item.merchant_name }}
        </td>
           <td class="text-center">
          {{ item.total_so_amount }}
        </td>
        <td class="text-center" > 
           <VBtn   
              v-if="item.so_status == 'Delivered'" 
              icon
              variant="text"
              color="default"
              class="me-2"
              size="x-small"
              @click="getImageupdate(item.pod_image)"
            >
              <VIcon
                color="success"
                icon="ic:twotone-photo-camera-back"
                size="26"
              />
            </VBtn>
        </td>
        <td class="text-center" >
           <VBtn

             v-if="(item.so_status == 'Shipped' || item.so_status == 'Delivered' || item.so_status == 'On Hold' || item.so_status == 'Cancelled') && selectsales !== 'GRN Sales Orders'"
              icon
              variant="text"
              color="default"
              class="me-2"
              size="x-small"
              @click="getPDFupdate(item.delivery_challan_file)"
            >
              <VIcon
                color="error"
                icon="iwwa:file-pdf"
                size="26"
              />
            </VBtn>
        </td>
         <td class="text-center">
           <VBtn

             v-if="item.so_status == 'Shipped' || item.so_status == 'Delivered' || item.so_status == 'On Hold' || item.so_status === 'Cancelled'"
              icon
              variant="text"
              color="default"
              class="me-2"
              size="x-small"
              @click="getPDFinvoice(item.invoice_file)"
            >
              <VIcon
                color="error"
                icon="iwwa:file-pdf"
                size="26"
              />
            </VBtn>
        </td>

        <td class="text-center">
          {{ item.grn_number }}
        </td>

 <td class="text-center" > 
           <VBtn   
              v-if="selectsales == 'GRN Sales Orders'" 
              icon
              variant="text"
              color="default"
              class="me-2"
              size="x-small"
              @click="getGRNImage(item.grn_image)"
            >
              <VIcon
                color="success"
                icon="ic:twotone-photo-camera-back"
                size="26"
              />
            </VBtn>
        </td>

        <td class="text-center">
          <!-- {{item.actions}} -->
            <VBtn
            v-if="item.so_status != 'Shipped' && item.so_status != 'Delivered' && item.so_status != 'On Hold' && item.so_status != 'Cancelled'"
                icon
                variant="text"
                color="success"
                class="me-2"
                size="small"                
            >
        
              <VIcon
              icon="mdi-invoice-receive-outline"
              color="success"
              size="30"
              @click="outputstock(item)"
              />
            </VBtn>

            
              <VBtn
              v-if="item.so_status == 'On Hold'"
                  icon
                variant="text"
                color="error"
                class="me-2"
                size="x-small"  
               
            >
                <VIcon
                icon="ri-pencil-line"
                size="30"
                color="primary"
                 @click="editrow(item)"
                />
            </VBtn>
            <VBtn
              v-if="item.so_status == 'On Hold'"
                  icon
                variant="text"
                color="error"
                class="me-2"
                size="x-small"  
              
            >
                <VIcon
                icon="material-symbols:cancel-outline"
                size="30"
                color="error"
                @click="deleteRow(item)"
                />
            </VBtn>
          </td>
      </tr>
      </tbody>        
        </VTable>

        <VDialog
  v-model="dialog"
  max-width="400"
  persistent
>
   <VCard
        title="Assign Delivery Person"
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
                     <VAutocomplete
                      v-model="Deliverydata.delivery_person"
                      :items="this.deliveryPerson"
                        item-value="value"
                      item-title="text"                  
                      label="Assign Delivery Person"
                   :rules="person"
                    />
                  </VCol>
                  
                   <VCol
                    md="12"
                    cols="12"
                  >
                     <VTextField
                      v-model="Deliverydata.shipped_date"
                      type="date"
                      label="Start Date"
                      :min="today"
                      :rules="dater"
                    />
                  </VCol>
                  <VCol
                  md="12"
                    cols="12"
                  >
                    <VBtn @click="validateForm">Save</VBtn> &nbsp;
                    <!-- @click="resetdetails" -->
                    <VBtn
                      color="secondary"
                      variant="tonal"
                      @click="closeDialog()"
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

<VDialog
  v-model="dialog2"
  max-width="400"
  persistent
>
   <VCard
        title="Cancel Onhold"
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
                   Are you sure want to cancel the Onhold Sales Order ?
                  </VCol>
                  <VCol
                  md="12"
                    cols="12"
                  >
                    <VBtn @click="cancelunhold">Yes</VBtn> &nbsp;
                    <!-- @click="resetdetails" -->
                    <VBtn
                      color="secondary"
                      variant="tonal"
                      @click="closeUnhold"
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

        <VPagination
  v-model="page"
  :length="Math.ceil(filteredSalesHistory.length / pageSize)"
  @input="updatePagination"
/>
  </div>
</template>

<script>
import servicescall from '@/Services'

export default {
  mixins: [servicescall],

    data(){
        return{
      filterlocation:true,

       today: this.getFormattedDate(new Date()),

          Deliverydata:{
              "so_id":"",
              "shipped_date":"",
              "delivery_person":""
           },

          SOid:null,
          SOid2:null,
          locationdata:'',
          cityLoaction:[],

            snackbar: false,
            snackbarText: '',
            timeout: 6000, // milliseconds
            color: '', // or 'error', 'warning', 'info', etc.
            top: false,
            bottom: true,
            left: false,
            right: false,
          selectsales:null,
            page: 1,
    pageSize: 10,
          loading2: false,
            loaded: false,
       loading: false,
     saleshistory:[],
     GRNhistory:[],
       searchQuery:'',
       deliveryPerson:[],
       dialog :false,
      dater: [v => !!v || 'Date is required'],
      person: [v => !!v || 'Assign Delivery Person is required'],
      dialog2:false,
      cityID:"",
      locationID:"",
      headers: [
      
        { text: 'Sales Order', value: 'so_number' },
        { text: 'Order Date', value: 'created_date' },
        { text: 'Status', value: 'so_status' },
        { text: 'Delivery Person', value: 'delivery_person' },

        { text: 'Order From', value: 'merchant_name' },
        { text: 'Shipped To', value: 'merchant_name' },
        { text: 'Order Value', value: 'total_so_amount' },
        { text: 'POD', value: 'pod_image'},
        { text: 'Delivery Challan', value: 'delivery_challan_file' },
        { text: 'Invoice', value: 'invoice_file' },
        { text: 'GRN No', value: 'grn_number' },
        { text: 'GRN Image', value: 'grn_image' },

        { text: 'Action', value: 'actions', sortable: false },
      ],
      //  headers2: [
      
      //   { text: 'Merchant Code', value: 'merchant_code' },
      //   { text: 'Merchant Name', value: 'merchant_name' },
      //   { text: 'Shipped Date', value: 'shipped_date' },
      //   { text: 'Delivery Person', value: 'delivery_person' },

      //   { text: 'Order From', value: 'merchant_name' },
      //   { text: 'Shipped To', value: 'merchant_name' },
      //   { text: 'Order Value', value: 'total_so_amount' },
      //   { text: 'POD', value: 'pod_image'},
      //   { text: 'Delivery Challan', value: 'delivery_challan_file' },
      //   { text: 'Invoice', value: 'invoice_file' },

      //   { text: 'Action', value: 'actions', sortable: false },
      // ],
        }
    },
     computed: {

        computedHeaders() {
        // Clone the original headers array
        const updatedHeaders = [...this.headers];
        // Check if 'selectsales' is 'Shipped'
        if (this.selectsales === 'Shipped') {
        // Find the index of the 'POD' header
        const podHeaderIndex = updatedHeaders.findIndex(header => header.value === 'pod_image');
        // Remove the 'POD' header if found
        if (podHeaderIndex !== -1) {
          updatedHeaders.splice(podHeaderIndex, 1);
        }
        // Find the index of the 'Action' header
        const actionHeaderIndex = updatedHeaders.findIndex(header => header.value === 'actions');
        // Remove the 'Action' header if found
        if (actionHeaderIndex !== -1) {
          updatedHeaders.splice(actionHeaderIndex, 1);
        }
      }
      return updatedHeaders;
    }, 

   filteredSalesHistory() {
      const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
      return this.saleshistory.filter((item) => {
        // Filter based on search query
        const matchesSearch = (
          (item.so_number && item.so_number.toLowerCase().includes(lowerCaseQuery)) ||
          (item.created_date && item.created_date.toLowerCase().includes(lowerCaseQuery)) ||
          (item.so_status && item.so_status.toLowerCase().includes(lowerCaseQuery)) ||
          (item.merchant_name && item.merchant_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.total_so_amount && item.total_so_amount.toString().includes(lowerCaseQuery)) ||
          (item.delivery_person && item.delivery_person.toLowerCase().includes(lowerCaseQuery)) 

        );
        // Filter based on status
        const matchesStatus = (
          // item.so_status === 'Acknowledged' || 
          item.so_status === 'Delivered' || 
          item.so_status === 'Shipped' || 
          item.so_status === 'On Hold' ||
           item.so_status === 'Cancelled'
        );
        // Return true if both search query and status match
        return matchesSearch && matchesStatus;
      });
    },
  
     paginatedItems() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredSalesHistory.slice(startIndex, endIndex);
  },
   showNoSalesAlert() {
      // Check if any items have 'Acknowledged' or 'On Hold' status
      return !this.saleshistory.some(
        item => item.so_status === 'Delivered' || item.so_status === 'Shipped' || item.so_status === 'On Hold' || item.so_status === 'Cancelled'
      );
     },
     combinedData() {
      return { locationdata: this.locationdata, selectsales: this.selectsales };
    },
  },
   watch: {
     combinedData(newVal) {
      if (newVal.locationdata && newVal.selectsales) {
        this.locationdetails();
      }else{
        this.getSalesorderdetails();
      }
    }
  },
    mounted(){
      this.cityID  = localStorage.getItem("city_id");
      this.locationID  = localStorage.getItem("location_id");
     if( this.cityID !== "" &&   this.locationID !== ""){
    
      this.filterlocation=false;
     }
      this.handleBrandSelection();
      //  this.getSalesorderdetails()
      //       .then(() => {
      //         // Set loading to false when API call is successful
      //         this.loading = false;
      //       })
      //       .catch((error) => {
      //         // Handle any errors if the API call fails
      //         console.error('Error fetching merchants:', error);
      //         // You might want to set loading to false here as well
      //         // Depending on how you want to handle API errors
      //       });
    //   this.getSalesorderdetails();
    //     setTimeout(() => {
    //   this.loading = false; // Set loading to false when the operation is complete
    // }, 5000);
    },
    methods:{
       handleBrandSelection(){
        // console.log('check hjandle',id);
        this.getCitylocation(this.cityID).then((response)=>{
          // console.log('check the response',response);
        this.cityLoaction = response.data.data.map(sales => ({
                  value: sales.location_id,
                  text: sales.location
              }))
              // console.log('ceck tye res',this.cityLoaction);
            })
            
       },
        locationdetails(){     
           const postdata = {
            "All":"all",
            "Shipped":"4",
            "Delivered":"5",
            "Onhold":"7",
            "Cancelled":"0",
          }
          if(this.selectsales !== 'GRN Sales Orders' && this.locationdata){
             this.loading = true;
          this.getSalesorders(postdata[this.selectsales],this.cityID, this.locationdata)
            .then((response) => {
              console.log('response',response);
              if(response.status == 1){
              this.loading = false;
              this.snackbarText = response.message;
              this.saleshistory = response.data;
              this.saleshistory.reverse();
              this.color = 'primary';
              this.snackbar = true;

              // resolve(); // Resolve the promise when API call is successful
              }else{
              //  this.dialog2 = false;
              this.snackbar = true;
              this.color = 'on-background';
              this.loading = false;
              this.saleshistory = [];
              // this.Deliverydata = {};
              this.snackbarText = response.message;

              }             
            })
          }else{
              this.loading = true;           

            this.getGRN(this.cityID, this.locationdata)
            .then((response) => {
              console.log('response',response);
              if(response.data.status == 1){
              this.loading = false;
              this.saleshistory = response.data.data;
              this.saleshistory.reverse();
              this.snackbarText = response.data.message;
              this.color = 'primary';
              this.snackbar = true;

              // resolve(); // Resolve the promise when API call is successful
              }else{
              //  this.dialog2 = false;
              this.snackbar = true;
              this.color = 'on-background';
              this.loading = false;
              this.saleshistory = [];
              // this.Deliverydata = {};
             this.snackbarText = "Select the status";

              }             
            })
          }
         
      },
      closeUnhold(){
        this.dialog2 = false;
      },
      getFormattedDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      },
      deleteRow(id){
        console.log("perk",id.so_id);
        this.SOid2 = id.so_id;
        this.dialog2 = true;
      },
      cancelunhold(){
        console.log("SOid2",this.SOid2);
        this.CancelUnholddata( this.SOid2 ).then((response)=>{
          if(response.data.status == 1){
             this.dialog2 = false;
             this.snackbar = true;
            this.color = 'primary';
            // this.Deliverydata = {};
            this.snackbarText = response.data.message;
            this.getSalesorderdetails();
          }else{
              this.dialog2 = false;
             this.snackbar = true;
            this.color = 'on-background';
            // this.Deliverydata = {};
            this.snackbarText = response.data.message;
          }
        })
      },
      validateForm(){
        this.$refs.purchaseOrderForm.validate().then(valid => {
              // console.log("form valid", valid.valid);
              if (valid.valid == true) {
              
                this.updateOnhold();
              }else{
                this.snackbar = true;
                  this.snackbarText = "Please give all mandatory fields"
                  this.color = "on-background";
              }
            }); 
      },
      updateOnhold(){
        const postData ={
          "so_id": this.SOid,
          "shipped_date":this.Deliverydata.shipped_date,
          "delivery_person":this.Deliverydata.delivery_person
        }
        console.log('po',postData);
        this.UpdateUnholddata(postData).then((response)=>{
          console.log("set",response);
          if(response.data.status == 1){
            this.dialog = false;
             this.snackbar = true;
            this.color = 'primary';
            this.Deliverydata = {};
            this.snackbarText = response.data.message;
            this.getSalesorderdetails();
          }else{
             this.dialog = false;
             this.snackbar = true;
            this.color = 'on-background';
            this.Deliverydata = {};
            this.snackbarText = response.data.message;
          }
        })
      },
      closeDialog(){
        this.dialog = false;
        this.Deliverydata = {};
      },
      editrow(id){
        console.log("ids",id.so_id)
        this.Getsalesperson().then((response)=>{
          console.log('getperson',response);
          if(response.data.status == 1){
            this.deliveryPerson = response.data.data.map(del => ({
            value: del.delivery_person,
            text: del.name
          }))            
            this.dialog = true;
            this.SOid = id.so_id;
          }else{
            this.deliveryPerson = [];
            this.dialog = false;
          }
        })
      },

        updatePagination(page) {
    this.page = page;
  },
  getImageupdate(id){
     this.loading2 = true;
       window.open(id, '_blank');
        this.loading2 = false;
  },
  getPDFinvoice(id){
     this.loading2 = true;
       window.open(id, '_blank');
        this.loading2 = false;
  },
    getGRNImage(id){
     this.loading2 = true;
       window.open(id, '_blank');
        this.loading2 = false;
  },

          getPDFupdate(id){
      this.loading2 = true;
       window.open(id, '_blank');
        this.loading2 = false;
      // this.getPurchasePDF(id).then((response)=>{
      //   console.log(response)
      //   const pdfUrl = response.data.po_file;
      //   this.loading2 = false;
        
      // })
    },
      outputstock(item){
          // console.log('check the detials',item.so_id);
         this.$router.push({
          name: 'Createwarehouseoutput', // Replace with the actual name of your route
          query: { so_id: item.so_id }
        });
      },
         resolveStatusVariant (status){
      if (status == 'Acknowledged')
        return {
          color: 'warning',
          // text: 'Acknowledged',
        }
     else if(status == 'On Hold'){
       return {
          color: 'warning',
          // text: 'Acknowledged',
        }
     }
      else if(status == 'Cancelled'){
       return {
          color: 'error',
          // text: 'Acknowledged',
        }
     }
        
      else
        return {
          color: 'success',
          // text: 'Shared',
        }
      },
      // getSalesorderdetails(){
      //   this.getSalesorders().then((response)=>{
      //     this.saleshistory = response.data;
      //     this.saleshistory.reverse();
      //     console.log('check rhe res',this.saleshistory);

      //   })
      // },
       getSalesorderdetails() {         
        // return new Promise((resolve, reject) => {          
          const postdata = {
            "All":"all",
            "Shipped":"4",
            "Delivered":"5",
            "Onhold":"7",
            "Cancelled":"0",
          }
            if(this.cityID !== '' && this.locationID !== '' && this.selectsales !== 'GRN Sales Orders'){
            this.loading = true;           

            this.getSalesorders(postdata[this.selectsales],this.cityID, this.locationID)
            .then((response) => {
              console.log('response',response);
              if(response.status == 1){
              this.loading = false;
              this.snackbarText = response.message;
              this.color = 'primary';
              this.saleshistory = response.data;
              this.saleshistory.reverse();
              this.snackbar = true;

              // resolve(); // Resolve the promise when API call is successful
              }else{
              //  this.dialog2 = false;
              this.snackbar = true;
              this.color = 'on-background';
              this.loading = false;
              this.saleshistory = [];
              // this.Deliverydata = {};
              this.snackbarText = response.message;
              }             
            })
          }else{
              this.loading = true;           

            this.getGRN(this.cityID, this.locationID)
            .then((response) => {
              console.log('response',response);
              if(response.data.status == 1){
              this.loading = false;
              this.saleshistory = response.data.data;
              this.saleshistory.reverse();
              this.snackbarText = response.data.message;
              this.color = 'primary';
              this.snackbar = true;


              // resolve(); // Resolve the promise when API call is successful
              }else{
              //  this.dialog2 = false;
              this.snackbar = true;
              this.color = 'on-background';
              this.loading = false;
              this.GRNhistory = [];
              // this.Deliverydata = {};
              this.snackbarText = "Select the status";
              }             
            })
          }
         
            // .catch((error) => {
            //   console.error('Error fetching merchants:', error);
            //   reject(error); // Reject the promise if there's an error
            // });
        // });
    }, 
      //  onClick () {
      //   this.loading = true

      //   setTimeout(() => {
      //     this.loading = false
      //     this.loaded = true
      //   }, 2000)
      // },

      // resolveStatusVariant (status){
      // if (status == 'Acknowledged')
      //   return {
      //     color: 'warning',
      //     text: 'Acknowledged',
      //   }
     
      
        
      // else
      //   return {
      //     color: 'info',
      //     text: 'Shared',
      //   }
      // },
    }
}
</script>

<style scoped>

</style>>

