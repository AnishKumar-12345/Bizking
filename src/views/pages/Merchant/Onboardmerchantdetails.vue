<template>
    <div>
         <VRow>
      <VCol cols="12">
       <VCard title="Onboard Merchant" class="mb-4">       

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6 " ref="purchaseOrderForm">
            <VRow>
    
            <VCol
                cols="12"
                md="6"
              >
                <VAutocomplete
                  v-model="this.saveMerchant.city_id"
                  label="City Names"              
                  :items="locationsdata"
                  item-title="text"
                  item-value="value"
                  :rules="locationrules"
                  required
                  :menu-props="{ maxHeight: 200 }"
                   @update:model-value="handleBrandSelection(this.saveMerchant.city_id)"
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
              <!-- {{selectedBrand}} -->  
              <!-- {{this.Addbrand.location_id}} -->
                <VAutocomplete
                  v-model="this.saveMerchant.location_id"
                  label="City Location"
                  :items="this.cityLoaction"               
                  item-value="value"
                  item-title="text"
                  :rules="locationrules2"
                  :menu-props="{ maxHeight: 200 }"
                />
              </VCol>            
            
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="this.saveMerchant.merchant_uid"
                  label="Merchant UID"
                  :rules="uidrules"
                  required
                />
              </VCol>
      
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="this.saveMerchant.merchant_name"
                  label="Merchant Name"
                  :rules="namerulesm"
                  required
                />
              </VCol>
            
            <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveMerchant.gst"
                  label="GST"
                  :rules="gstrules"
                  required
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveMerchant.area_pincode"                
                  label="Area Pincode"
                  :rules="pinrules"
                  required
                />
              </VCol>
             <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveMerchant.owner_name"                
                
                  label="Owner Name"
                  :rules="namerules"
                  required
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveMerchant.owner_phone"                
                
                  label="Owner Phone"
                  :rules="phonerules"
                  required
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveMerchant.poc_name"                
                 
                  label="POC Name"
                  :rules="namerules"
                  required
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveMerchant.poc_phone"                
                
                  label="POC Phone"
                  :rules="phonerules"
                  required
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveMerchant.shop_size"                
                
                  label="Shop Size"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                  <VTextField
                  v-model="this.saveMerchant.shop_type"                
                
                  label="Shop Type"
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                  <VTextField
                  v-model="this.saveMerchant.location"                
                
                  label="Location"
                />
              </VCol>

                <VCol
                md="6"
                cols="12"
              >
              <!-- {{this.salesdata}} -->

                <VSelect
                  v-model="this.saveMerchant.sales_person"                
                 
                  label="Sales Person"
                  :items="this.salesdata"
                item-value="value"
                item-title="text"
                 :rules="salespersonr"
                  required
                />
              </VCol>
               <VCol            
                 md="6"
                cols="12"
              >
              <!-- {{this.salesdata}} -->
                <VTextField
                  v-model="this.saveMerchant.latitude"               
                 
                  label="Latitude"
                 :rules="latitude"
                />
              </VCol>
               <VCol            
                 md="6"
                cols="12"
              >
              <!-- {{this.salesdata}} -->
                <VTextField
                  v-model="this.saveMerchant.longitude"               
                 
                  label="Longitude"
                 :rules="Logitude"
                />
              </VCol>
              
              <VCol    
                 md="6"
                     
                cols="12"
              >
              <!-- {{this.salesdata}} -->
                <VTextField
                  v-model="this.saveMerchant.store_address"               
                 
                  label="Store Address"
                 :rules="storerules"
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
      v-model="snackbar" :timeout="3500"
      :color="color"
      
    >
      {{ snackbarText }}
     <!-- <VBtn text @click="snackbar = false">Close</VBtn> -->
    </VSnackbar> 
     <!-- <VDivider />
    <V-btn
     icon
     variant="text"
     color="default"
     class="mb-4 mt-4"
     size="small"
     style="margin-left: auto; display: block;"
     @click="openproductdialog()"
    >
    
        <VIcon
          icon="mdi-plus-box"
          size="30"        
          color="#BA8B32"       
          />   
        </V-btn>          -->
  <!-- class="mb-4 mt-4" -->

    

 
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
      salesdata:[],
      userid:'',
        dialog: false,
         saveMerchant:{
          "merchant_uid": "",
          "merchant_name": "",
          "store_address": "",
          "gst": "",
          "area_pincode": "",
          "poc_name": "",
          "poc_phone": "",
          "owner_name": "",
          "owner_phone": "",
          // "decision_authority": "",
          "shop_size": "",
          "shop_type": "",
          "location": "",
          "created_by": "",
          "sales_person": "",
          "longitude":"",
          "latitude":"",
          "city_id":"",
          "location_id":""

         },
         locationsdata:[],
         cityLoaction:[],
        //  Logitude:[
        //   (v) => !!v || 'Longitude is required',
        //   (v) => /^[0-9]+$/.test(v) || "only number are accepted",

        //  ],
        //    latitude:[
        //   (v) => !!v || 'Latitude is required',
        //  ],
         Logitude: [
  (v) => !!v || 'Longitude is required',
  (v) => /^\s*-?(\d+(\.\d+)?|[0-8]?\d(\.\d+)?|90(\.0+)?)\s*$/.test(v) || 'Invalid Longitude Format',
],

latitude: [
  (v) => !!v || 'Latitude is required',
  (v) => /^\s*-?([0-8]?\d(\.\d+)?|90(\.0+)?|[1-8]?\d(\.\d+)?|89(\.999+)?|[1-8]\d(\.\d+)?|90\.0+?)\s*$/.test(v) || 'Invalid Latitude Format',
],

         storerules:[
          (v) => !!v || 'Store Address is required',
         ],
       uidrules: [
         (v) => !!v || 'UID is required',
      ],
       namerules: [
         (v) => !!v || 'Name is required',
         (v) => /^[a-z A-Z]+$/.test(v) || 'Only letters are allowed in the name'

      ],
      namerulesm:[
         (v) => !!v || 'Name is required',
      ],
      salespersonr:[
         (v) => !!v || 'Name is required',

      ],
       gstrules: [
               (v) => !!v || "GST is required",
     
      ],
      locationrules:[
               (v) => !!v || "City Name is required",
        
      ],
        locationrules2:[
               (v) => !!v || "City Location Name is required",
        
      ],
         pinrules: [        
                (v) => !!v || 'PIN is required',
                 (v) => (v && /^\d{6}$/.test(v)) || 'PIN must be 6 digits'
              ],
       phonerules: [
         (v) => !!v || " Mobile  is required",
        (v) => /^[0-9]+$/.test(v) || "only number are accepted",
        (v) =>
          (v && v.length <= 10 && v.length >= 10) ||
          "Mobile must be  10 number",
      ],
    }
   },
   mounted(){
    this.getAllsales();
    this.userid = localStorage.getItem('user_id');
    // console.log('us',  this.userid)
    this.getBranchnames();
   },
   methods:{
      handleBrandSelection(id){
        console.log('check hjandle',id);
        this.getCitylocation(id).then((response)=>{
          // console.log('check the response',response);
          this.cityLoaction = response.data.data.map(sales => ({
                  value: sales.location_id,
                  text: sales.location
              }))
                // console.log('ceck tye res',this.cityLoaction);
        })
      },

    getBranchnames(){
      this.Locationdata().then((response)=>{ 
   
        this.locationsdata = response.data.data.map(sales => ({
            value: sales.city_id,
            text: sales.city
        }));
           console.log('ceck tye res',this.locationsdata);
      })
    },
    validateForm(){
      this.$refs.purchaseOrderForm.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
         
          this.saveMerchants();
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      }); 
    },
    saveMerchants(){
      const postData = {
         "merchant_uid": this.saveMerchant.merchant_uid,
          "merchant_name": this.saveMerchant.merchant_name,
          "store_address":  this.saveMerchant.store_address,
          "gst": this.saveMerchant.gst,
          "area_pincode": this.saveMerchant.area_pincode,
          "poc_name": this.saveMerchant.poc_name,
          "poc_phone": this.saveMerchant.poc_phone,
          "owner_name": this.saveMerchant.owner_name,
          "owner_phone": this.saveMerchant.owner_phone,
          // "decision_authority": "",
          "shop_size": this.saveMerchant.shop_size,
          "shop_type": this.saveMerchant.shop_type,
          "location": this.saveMerchant.location,
          "created_by":  this.userid ,
          "sales_person": this.saveMerchant.sales_person,
          "latitude": this.saveMerchant.latitude,
          "longitude": this.saveMerchant.longitude,
          "city_id": this.saveMerchant.city_id,
          "location_id": this.saveMerchant.location_id,
      }
      this.addOnboardmerchant(postData).then((response)=>{
        console.log('resp',response);
         if(response.data.status == 1){
              this.snackbarText = response.data.message;
              this.color = "primary";
              this.snackbar = true;
               this.saveMerchant={};
              
              }else{
              this.snackbarText = response.data.message;
              this.color = "on-background";
              this.snackbar = true;
              }
      })
    },
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
     deleteRow(item) {
      // Implement your logic to delete the row
      const index = this.data.indexOf(item);
      if (index !== -1) {
        this.data.splice(index, 1);
      }
    },

      openproductdialog(){
    // console.log('check the dialog')
      this.dialog = true;
   },
    closeDialog() {
      this.dialog = false;
    },
   },
 
}
</script>
<style scoped>

</style>