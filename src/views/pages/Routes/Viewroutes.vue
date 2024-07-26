<template>
  <div>
     <VRow>
      <VCol cols="12">
       <VCard title="View Routes" class="mb-4">       

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6 " ref="purchaseOrderForm">
            <VRow>
    
            <!-- @update:model-value="handleBrandSelection(this.saveBrand.city_id)" -->
              <VCol
                cols="12"
                md="6"
              >
                <VAutocomplete
              v-model="routeuserid"
                  label="Sales Associate"
                  :items="this.salesdata"
                item-value="value"
                item-title="text"
                    :menu-props="{ maxHeight: 200 }"
               @update:model-value="handleBrandSelection(routeuserid)"
                  required
           
                />
              </VCol>
<!-- 
              <VCol
                md="6"
                cols="12"
              >
          
                <VAutocomplete
                  v-model="this.saveBrand.location_id"
                  label="Location"
                  :items="this.cityLoaction"               
                  item-value="value"
                  item-title="text"
                  :rules="locationrules2"
                  :menu-props="{ maxHeight: 200 }"
                />
              </VCol> -->
            </VRow>
           
           <VCol>
              <div style="max-width:400px" >
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

              <VTable
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
         <tr v-if="filteredSalesHistory.length === 0">
          <td colspan="16" class="text-center"><h1>No data found !</h1></td>
         </tr> 
       <tr
         v-for="(item,index) in this.paginatedItems"
        :key="index"
      >     
          <td class="text-center">{{item.route_name}}</td> 
          <td class="text-center">{{item.status}}</td>    
          <td class="text-center">{{item.stores_count}}</td>    
          <td class="text-center">{{item.visited_stores_count}}</td>    

    <!-- <td class="text-center" >
              <V-btn
                  icon
                  variant="text"
                  color="default"
                  class="mb-1 mt-2"
                  size="x-small"
              
                
                  >
                  
                      <VIcon
                        icon="ri-pencil-line"
                        size="22"        
                        color="#BA8B32"       
                        />   
                      </V-btn>     
                       <V-btn
                  icon
                  variant="text"
                  color="default"
                  class="mb-1 mt-2"
                  size="x-small"
                 
                
                  >
                  
                      <VIcon
                        icon="material-symbols:delete"
                        size="22"        
                        color="error"       
                        />   
                      </V-btn> 
                        <VBtn

               icon
                  variant="text"
                  color="default"
                  class="mb-1 mt-2"
                  size="x-small"
                 
            
            >
              <VIcon
                color="success"
                icon="basil:eye-outline"
                size="22"
              />
            </VBtn>
            </td> -->
      </tr>
      </tbody>        
        </VTable>
           </VCol>
          </VForm>

        </VCardText>
      </VCard>
    </VCol>  
  </VRow>
    <VPagination
  v-model="page"
  :length="Math.ceil(filteredSalesHistory.length / pageSize)"
  @input="updatePagination"
/>
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
      salesdata:[],
      routedata:[],
      searchQuery:'',
         snackbar: false,
            snackbarText: '',
            timeout: 6000, // milliseconds
            color: '', // or 'error', 'warning', 'info', etc.
            top: false,
            bottom: true,
            left: false,
            right: false,
       page: 1,
            pageSize: 10,
cityID:'',
      routeuserid:'',
      // routesdata:{

      // },
        headers:[
               {text:'Route Name',value:'route_name'},
               {text:'Status',value:'status'},

               {text:'Stores Count',value:'stores_count'},
               {text:'Visited Stores Count',value:'visited_stores_count'},

              //  {text:'Actions',value:'action'},

              //  {text:'Sales Associate',value:'sales_person'},
               
        ],
    }
  },
  computed:{
     filteredSalesHistory(){
         const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
      return this.routedata.filter((item) => {
        return (
          (item.route_name && item.route_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.status && item.status.toLowerCase().includes(lowerCaseQuery)) ||
          (item.stores_count && item.stores_count.toString().includes(lowerCaseQuery)) ||
          (item.visited_stores_count && item.visited_stores_count.toString().includes(lowerCaseQuery)) 
          // (item.total_po_amount && item.total_po_amount.toString().includes(lowerCaseQuery)) ||
          // (item.invoice_number && item.invoice_number.toLowerCase().includes(lowerCaseQuery)) 

          // (item.collected_date && item.collected_date.toString().includes(lowerCaseQuery)) ||
          // (item.quantity && item.quantity.toString().includes(lowerCaseQuery))  ||
          // (item.warehouse_updated_date && item.warehouse_updated_date.toString().includes(lowerCaseQuery)) ||
          // (item.send_to_brand_date && item.send_to_brand_date.toString().includes(lowerCaseQuery))
        );
      });
    },
      paginatedItems() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredSalesHistory.slice(startIndex, endIndex);
  },
  },
  mounted(){
     this.cityID = localStorage.getItem("city_id");
    this.getAllsales();

  },
  methods:{
     updatePagination(page) {
    this.page = page;
  },
    handleBrandSelection(id){
      this.viewroutes(id).then((response)=>{
        console.log({response});
        if(response.data.status == 1){
            this.routedata = response.data.data;
              this.snackbar = true;
                    this.snackbarText = response.data.message
                    this.color = "primary";
        }else{
           this.snackbar = true;
                    this.snackbarText = response.data.message
                    this.color = "on-background";
                    this.routedata=[];
        }
      })
    },
    getAllsales(){
      this.getSalesassociate(this.cityID).then((response)=>{
        // console.log('sales',response);
        this.salesdata = response.data.data;
   
         this.salesdata = this.salesdata.map(sales => ({
            value: sales.user_id,
            text: sales.name
        }));
          //  console.log('sales',this.salesdata); 

      })
    },
  }
}
</script>