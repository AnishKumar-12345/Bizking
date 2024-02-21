<template>
  <div>
     <div style="max-width:400px" v-if="this.Brands != null">
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

 
     <VTable v-if="this.Brands != null"
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
        <td class="text-center">{{ item.brand_name }}</td>
        <td class="text-center">
          {{ item.brand_code }}
        </td>
        <td class="text-center">
           <!-- <VChip
        :color="resolveStatusVariant(item.po_status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ item.po_status }}
    
            </VChip> -->
        {{ item.brand_category }}
        </td>
        <td class="text-center">
          {{ item.brand_connect }}
        </td>
        <td class="text-center">
          {{ item.email_id }}
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
          {{ item.address }}
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
            :length="Math.ceil(filteredBrands.length / pageSize)"
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
            Brands:[],
            headers:[
                {text:'Brand Name',value:'brand_name'},
                {text:'Brand Code',value:'brand_code'},
                {text:'Brand Category',value:'brand_category'},
                {text:'Brand Connect',value:'brand_connect'},
                {text:'Email',value:'email_id'},
                {text:'Status',value:'status'},            

                {text:'Owner Name',value:'owner_name'},
                {text:'Owner Phone',value:'owner_phone'},
                {text:'Poc Name',value:'poc_name'},
                {text:'Poc Phone',value:'poc_phone'},
                {text:'GST',value:'gst'},
                {text:'Updated Date',value:'updated_date'},
                {text:'Onboarded Date',value:'created_date'},
                {text:'Decision Authority',value:'decision_authority'},
                {text:'Address',value:'address'},
                {text:'Location',value:'location'},
                {text:'Area Pincode',value:'area_pincode'},




            ]
        }
    },
    computed:{
         filteredBrands(){
         const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
        return this.Brands.filter((item) => {
        return (
          (item.brand_name && item.brand_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.brand_code && item.brand_code.toLowerCase().includes(lowerCaseQuery)) ||
          (item.brand_category && item.brand_category.toLowerCase().includes(lowerCaseQuery)) ||
          (item.brand_connect && item.brand_connect.toLowerCase().includes(lowerCaseQuery)) ||
          (item.email_id && item.email_id.toLowerCase().includes(lowerCaseQuery))|| 
          (item.owner_name && item.owner_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.owner_phone && item.owner_phone.toLowerCase().includes(lowerCaseQuery))  ||
          (item.poc_name && item.poc_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.poc_phone && item.poc_phone.toLowerCase().includes(lowerCaseQuery)) ||
          (item.status && item.status.toLowerCase().includes(lowerCaseQuery)) ||
          (item.gst && item.gst.toLowerCase().includes(lowerCaseQuery)) ||
          (item.updated_date && item.updated_date.toLowerCase().includes(lowerCaseQuery)) ||
          (item.created_date && item.created_date.toLowerCase().includes(lowerCaseQuery)) ||
          (item.decision_authority && item.decision_authority.toLowerCase().includes(lowerCaseQuery)) ||
          (item.address && item.address.toLowerCase().includes(lowerCaseQuery)) ||
          (item.location && item.location.toLowerCase().includes(lowerCaseQuery)) ||
          (item.area_pincode && item.area_pincode.toLowerCase().includes(lowerCaseQuery)) 
        );
      });
    },
         paginatedItems() {
      const startIndex = (this.page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      // Sort the filteredPurchaseHistory by created_date in descending order
      const sortedItems = this.filteredBrands.slice().sort((a, b) => {
         return new Date(b.created_date) - new Date(a.created_date);
      });
      return sortedItems.slice(startIndex, endIndex);
     }
    },
    mounted(){
        this.getAllBrands();
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
        getAllBrands(){
            this.getBrands().then((response)=>{
               
                this.Brands = response.data;
                 console.log('Brands',this.Brands)
                this.Brands.reverse();
            })
        }
    }
}
</script>
<style scoped>

</style>