<template>
  <div>
     <VRow>
      <VCol cols="12">
       <VCard title="Add Routes" class="mb-4">       

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6 " ref="purchaseOrderForm">
            <VRow>
    <!-- {{this.saveBrand.city_id}} -->
            <!-- @update:model-value="handleBrandSelection(this.saveBrand.city_id)" -->
              <VCol
                cols="12"
                md="6"
              >
                <VAutocomplete
                 v-model="salesassicate"
                  label="Sales Associate"
                  :items="this.salesdata"
                item-value="value"
                item-title="text"
                    :menu-props="{ maxHeight: 200 }"
               @update:model-value="handleBrandSelection(salesassicate)"
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
            
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                 
                  label="Merchants SA Wise"
               
                  required
                />
              </VCol>
      
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
              
                  label="Route Name"
                  
                  required
                />
              </VCol>
            
         
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="validateForm()">Save</VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
               
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
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
      cityID:'',
      text:123,
      salesdata:[],
      salesassicate:'',
      routesdata:{

      },
    }
  },
  mounted(){
     this.cityID = localStorage.getItem("city_id");

     this.getAllsales();
   console.log('tric',this.cityID);

  },
  methods:{
    handleBrandSelection(id){
      this.getSalesmerchant(id).then((response)=>{
        console.log('check rp',response);
      })
    },
    getAllsales(){
      this.getSalesassociate(this.cityID).then((response)=>{
        console.log('sales',response);
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