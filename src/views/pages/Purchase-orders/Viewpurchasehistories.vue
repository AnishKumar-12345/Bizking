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

      <div v-if="loading"  class="loading-container">
      <VProgressLinear
            height="5"
            color="primary"
            indeterminate
            class="custom-loader"  
            full-width              
        />          
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
          {{ item.brand_name }}
        </td>
        <td  class="text-center " v-if="item.po_status != 'Received'">
          <!-- {{item.actions}} -->
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
  </div>
</template>

<script>
import servicescall from "@/Services";

export default {
  mixins: [servicescall],

    data(){
        return{
          searchQuery:'',
          page: 1,
    pageSize: 10,
          userRoles:'',
          loading:true,
    purchaseHistory:[],
    userIds:'',
    createdBy:'',
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
          item.po_status === 'Acknowledged' || 
          item.po_status === 'Shared' || 
          item.po_status === 'Received' 
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
       this.getPurchasehistorydetails();
           setTimeout(() => {
              this.loading = false; // Set loading to false when the operation is complete
            }, 4000);
    },
    methods:{
       updatePagination(page) {
    this.page = page;
  },
      inputstock(itm){
        console.log('check the detials',itm.po_id);
         this.$router.push({
          name: 'Createwarehouseinput', // Replace with the actual name of your route
          query: { po_id: itm.po_id }
        });
        // this.navigateTo('/Createwarehouseinput', 42);
        
      },
      getPurchasehistorydetails(){
        this.getPurchaseorder(this.userIds,this.userRoles).then((response) =>{
          console.log('check the view purchase order',response.data);
          this.purchaseHistory = response.data;
          this.purchaseHistory.reverse();
          console.log('check the view purchase History',this.purchaseHistory);

        })
      },
      resolveStatusVariant (status){
      if (status == 'Acknowledged')
        return {
          color: 'info',
          // text: 'Acknowledged',
        }
     else if(status == 'Shared')
     return{
        color: 'warning',
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

