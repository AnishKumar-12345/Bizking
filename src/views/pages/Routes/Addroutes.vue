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

                <!-- <VCol
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
                <!-- {{this.merchantsawise}} -->

              <VCol
                cols="12"
                md="6"
              >
                  <!-- class="fixed-height-autocomplete" -->
                <VAutocomplete
                  v-model="this.merchantsawise"
                  label="Merchants SA Wise"
                  :items="this.merchantSA"
                  item-value="value"
                  item-title="text"
                  multiple
                  required
                  chips               
                  :menu-props="{ maxHeight: 200 }"
                />
              </VCol>
      
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="this.Routename"
                  label="Route Name"
                  :rules="routerules"
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
      cityID:'',
      text:123,
      salesdata:[],
      salesassicate:'',
      merchantsawise:'',
      Routename:'',
      merchantSA:[],
      merchantSAdata:[],
      routerules: [
         (v) => !!v || 'Route Name is required',
      ],
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
 validateForm(){
   this.$refs.purchaseOrderForm.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {         
          this.saveRoutedetails();
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      }); 
    },

    saveRoutedetails(){
      const postData = {
         "route_name":this.Routename,
          "user_id":this.salesassicate,
            "merchants": this.merchantsawise.map((merchantId) => {
          const merchant = this.merchantSA.find(m => m.value === merchantId);
          if (merchant) {
            return {
              merchant_id: merchant.value,
              merchant_uid: merchant.text,
              merchant_name: merchant.merchant_name,
              latitude: merchant.latitude,
              longitude: merchant.longitude,
            };
          } else {
            console.warn(`Merchant with ID ${merchantId} not found in merchantSA`);
            return null;
          }
        }).filter(m => m !== null),     
      }
     console.log('check route',postData)
      this.saveRoute(postData).then((response)=>{
        console.log('check route',response)
         if(response.data.status == 1){
             this.snackbar = true;
                    this.snackbarText = response.data.message
                    this.color = "primary";
                    window.location.reload();
        }else{
             this.snackbar = true;
                    this.snackbarText = response.data.message
                    this.color = "on-background";
        }
      })
    },

    handleBrandSelection(id){
      this.getmerchantsawise(id).then((response)=>{
        console.log('check rp',response);
        this.merchantSA = response.data.map(m =>({
          value: m.merchant_id,
          text: m.merchant_uid,
          merchant_name: m.merchant_name,
          latitude: m.latitude,
          longitude: m.longitude,
        }));
        // this.merchantSA = this.merchantSA.map(m => ({
        //    value: m.merchant_id,
        //   text: m.merchant_uid
        // }))
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
<style scoped>
.fixed-height-autocomplete .v-input__control {
  max-height: 56px; /* Set the max height to the default height of a single-line text field */
  overflow-y: auto;
}
</style>