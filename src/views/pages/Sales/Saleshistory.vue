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
                <VCol   md="6"
                  cols="12">
                  <VSelect 
                  v-model="selectsales"
                  :items="['Shipped','Delivered']"
                    @update:model-value="getSalesorderdetails"      
                      
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
       :headers="headers" 
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

             v-if="item.so_status == 'Shipped' || item.so_status == 'Delivered'"
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

             v-if="item.so_status == 'Shipped' || item.so_status == 'Delivered'"
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
        <td  class="text-center ">
          <!-- {{item.actions}} -->
            <VBtn
            v-if="item.so_status != 'Shipped' && item.so_status != 'Delivered'"
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
              @click="outputstock(item)"
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
          selectsales:null,
            page: 1,
    pageSize: 10,
          loading2: false,
            loaded: false,
       loading: false,
     saleshistory:[],
       searchQuery:'',
       
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

        // { text: 'Action', value: 'actions', sortable: false },
      ],
        }
    },
     computed: {
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
          item.so_status === 'Received' || 
          item.so_status === 'Shipped'
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
        item => item.so_status === 'Delivered' || item.so_status === 'Received' || item.so_status === 'Shipped'
      );
     },
  },
    mounted(){
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
            "Delivered":"5"
          }
          this.loading = true;
          this.getSalesorders(postdata[this.selectsales])
            .then((response) => {
              console.log('response',response);
              if(response.status == 1){
              this.loading = false;
              this.saleshistory = response.data;
              this.saleshistory.reverse();
              // resolve(); // Resolve the promise when API call is successful
              }              
            })
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

