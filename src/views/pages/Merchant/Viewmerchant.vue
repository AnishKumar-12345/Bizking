<template>
  <div>
     <div style="max-width:400px" v-if="this.merchants != null">
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

      <!-- <div v-if="loading"  class="loading-container">
      <VProgressLinear
            height="5"
            color="primary"
            indeterminate
            class="custom-loader"  
            full-width              
        />          
     </div> -->

      <!-- <VRow v-if="this.purchaseHistory == null">
      <VCol cols="12"> 
        <VCard title="Purchase Order View">
          <VCardText> 
          
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
     </VRow> -->

 
     <VTable v-if="this.merchants != null"
       :headers="headers"
       :items="merchants"
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
        <td class="text-center">{{ item.merchant_name }}</td>
        <td class="text-center">
          {{ item.merchant_uid }}
        </td>
        <td class="text-center">
           <!-- <VChip
        :color="resolveStatusVariant(item.po_status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ item.po_status }}
    
            </VChip> -->
        {{ item.owner_name }}
        </td>
        <td class="text-center">
          {{ item.owner_phone }}
        </td>
        <td class="text-center">
          {{ item.poc_name }}
        </td>
           <td class="text-center">
          {{ item.poc_phone }}
        </td>   
        <td class="text-center">
          {{ item.shop_size }}
        </td>  
         <td class="text-center">
          {{ item.shop_type }}
        </td>   
        <td class="text-center">
          <VChip
        :color="resolveStatusVariant(item.status).color"
        class="font-weight-medium"
        size="small"
      >
      {{ item.status == 1 ? 'Active' : 'Inactive'}}
    
            </VChip>
          
        </td>  
        <td class="text-center">
          {{ item.gst }}
        </td>   
        <td class="text-center">
          {{ item.updated_date }}
        </td>   
        <td class="text-center">
          {{ item.created_date }}
        </td>
          <td class="text-center">
          {{ item.decision_authority }}
        </td>
          <td class="text-center">
          {{ item.store_address }}
        </td>
          <td class="text-center">
          {{ item.location }}
        </td>
          <td class="text-center">
          {{ item.area_pincode }}
        </td>
         
        <!-- <td  class="text-center " v-if="item.po_status != 'Received'">
       
            <VBtn
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
              @click="inputstock(item)"
              />
            </VBtn> -->
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
          <!-- </td> -->
      </tr>
      </tbody>        
        </VTable>
        <VPagination
            v-model="page"
            :length="Math.ceil(filteredMerchants.length / pageSize)"
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
            searchQuery:'',
            page: 1,
            pageSize: 10,
            merchants:[],
            headers:[
                {text:'Merchant Name',value:'merchant_name'},
                {text:'Merchant UID',value:'merchant_uid'},
                {text:'Owner Name',value:'owner_name'},
                {text:'Owner Phone',value:'owner_phone'},
                {text:'POC Name',value:'poc_name'},
                {text:'POC Phone',value:'poc_phone'},
                {text:'Shop Size',value:'shop_size'},
                {text:'Shop Type',value:'shop_type'},
                {text:'Status',value:'status'},            
                {text:'GST',value:'gst'},
                {text:'Update Date',value:'updated_date'},
                {text:'Created Date',value:'created_date'},
                {text:'Decision Authority',value:'decision_authority'},
                {text:'Store Address',value:'store_address'},
                {text:'Location',value:'location'},
                {text:'Area Pincode',value:'area_pincode'},




            ]
        }
    },
    computed:{
         filteredMerchants(){
         const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
        return this.merchants.filter((item) => {
        return (
          (item.merchant_name && item.merchant_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.merchant_uid && item.merchant_uid.toLowerCase().includes(lowerCaseQuery)) ||
          (item.owner_name && item.owner_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.owner_phone && item.owner_phone.toLowerCase().includes(lowerCaseQuery)) ||
          (item.poc_name && item.poc_name.toLowerCase().includes(lowerCaseQuery))|| 
          (item.poc_phone && item.poc_phone.toLowerCase().includes(lowerCaseQuery)) ||
          (item.shop_size && item.shop_size.toLowerCase().includes(lowerCaseQuery))  ||
          (item.shop_type && item.shop_type.toLowerCase().includes(lowerCaseQuery)) ||
          (item.status && item.status.toLowerCase().includes(lowerCaseQuery)) ||
          (item.gst && item.gst.toLowerCase().includes(lowerCaseQuery)) ||
          (item.updated_date && item.updated_date.toLowerCase().includes(lowerCaseQuery)) ||
          (item.created_date && item.created_date.toLowerCase().includes(lowerCaseQuery)) ||
          (item.decision_authority && item.decision_authority.toLowerCase().includes(lowerCaseQuery)) ||
          (item.store_address && item.store_address.toLowerCase().includes(lowerCaseQuery)) ||
          (item.location && item.location.toLowerCase().includes(lowerCaseQuery)) ||
          (item.area_pincode && item.area_pincode.toLowerCase().includes(lowerCaseQuery))

        );
      });
    },
         paginatedItems() {
      const startIndex = (this.page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      // Sort the filteredPurchaseHistory by created_date in descending order
      const sortedItems = this.filteredMerchants.slice().sort((a, b) => {
         return new Date(b.created_date) - new Date(a.created_date);
      });
      return sortedItems.slice(startIndex, endIndex);
   }
    },
    mounted(){
        this.getmerchants();
    },
    methods:{
      resolveStatusVariant(itm){
        if(itm == 1){
          return{
            color:"success"
          }
        }else{
          return{
            color:"error"
          }
        }
      },
         updatePagination(page) {
    this.page = page;
  },
        getmerchants(){
            this.getMerchantdetails().then((response)=>{
                console.log('merchants',response)
                this.merchants = response.data.data;
                this.merchants.reverse();
            })
        }
    }
}
</script>
<style scoped>

</style>