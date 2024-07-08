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
              
                  label="Sales Associate"
                  :items="this.salesdata"
                item-value="value"
                item-title="text"
                    :menu-props="{ maxHeight: 200 }"
               
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
              <VTable
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

         <!-- <tr v-if="filteredMerchants.length === 0">
          <td colspan="16" class="text-center"><h1>No data found !</h1></td>
         </tr>  -->

       <tr
        
      >       
    
          <td></td> 
          <td></td>    
    <td class="text-center" >
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
            </td>
      </tr>
      </tbody>        
        </VTable>
           </VCol>
          </VForm>

        </VCardText>
      </VCard>
    </VCol>  
  </VRow>

  </div>
</template>
<script>
import servicescall from "@/Services";

export default {
  mixins: [servicescall],
  data(){
    return{
      salesdata:[],
      // routesdata:{

      // },
        headers:[
               {text:'Route Name',value:'route_name'},
               {text:'Created Date',value:'create_date'},
               {text:'Actions',value:'action'},

              //  {text:'Sales Associate',value:'sales_person'},
               
        ],
    }
  },
  mounted(){
    this.getAllsales();

  },
  methods:{
    getAllsales(){
      this.getsalesperson().then((response)=>{
        // console.log('sales',response);
        this.salesdata = response.data.data;
   
         this.salesdata = this.salesdata.map(sales => ({
            value: sales.user_id,
            text: sales.name
        }));
           console.log('sales',this.salesdata); 

      })
    },
  }
}
</script>