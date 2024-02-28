<template>
    <div>
         <VRow>
      <VCol cols="12">
       <VCard title="Add Brand" class="mb-4">       

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6 " ref="purchaseOrderForm">
            <VRow>
    
            


            
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="this.saveBrand.brand_name"
                  label="Brand Name"
                  :rules="namerules"
                  required
                />
              </VCol>
      
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="this.saveBrand.email_id"
                  label="Email Id"
                  :rules="emailRules"
                  required
                />
              </VCol>
            
            <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveBrand.gst"
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
                  v-model="this.saveBrand.area_pincode"                
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
                  v-model="this.saveBrand.owner_name"                
                
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
                  v-model="this.saveBrand.owner_phone"                
                
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
                  v-model="this.saveBrand.poc_name"                
                 
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
                  v-model="this.saveBrand.poc_phone"                
                
                  label="POC Phone"
                  :rules="phonerules"
                  required
                />
              </VCol>

              <!-- <VCol
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
              </VCol> -->

              <VCol
                md="6"
                cols="12"
              >
                  <VTextField
                  v-model="this.saveBrand.location"                
                
                  label="Location"
                />
              </VCol>


              <!-- <VCol
                md="6"
                cols="12"
              >
                  <VSelect
                  v-model="this.saveBrand.status"                
                  :items="['Active','Inactive']"
                  label="Status"
                />
              </VCol> -->


               <VCol
                md="6"
                cols="12"
              >
                  <VTextField
                  v-model="this.saveBrand.brand_connect"                
                
                  label="Brand Connect"
                />
              </VCol>


               <VCol
                md="6"
                cols="12"
              >
                  <VTextField
                  v-model="this.saveBrand.brand_category"                
                
                  label="Brand Category"
                />
              </VCol>
                <!-- <VCol
                md="6"
                cols="12"
              >
            

                <VSelect
                  v-model="this.saveMerchant.sales_person"                
                 
                  label="Sales Person"
                  :items="this.salesdata"
                item-value="value"
                item-title="text"
                 :rules="namerules"
                  required
                />
              </VCol> -->

              <VCol  
                md="6"
                cols="12"
              >
              
                <VTextField
                  v-model="this.saveBrand.address"               
                 
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
         saveBrand:{
          "brand_name": "",
          "area_pincode": "",
          "gst": "",
          "poc_name": "",
          "poc_phone": "",
          "owner_name": "",
          "owner_phone": "",
          "location": "",
          "address": "",
          "status": "",
          "brand_connect": "",
          "brand_category": "",
          "email_id": "",
          "created_by":"",
         },
         
         storerules:[
          (v) => !!v || 'Store Address is required',
         ],

       uidrules: [
         (v) => !!v || 'UID is required',
      ],

       namerules: [
         (v) => !!v || 'Name is required',
      ],

       gstrules: [
        (v) => !!v || "GST is required",     
      ],

      pinrules: [        
         (v) => !!v || 'PIN is required',
      ],

  emailRules: [ 
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
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
    // this.getAllsales();
    this.userid = localStorage.getItem('user_id')
    // console.log('us',  this.userid)
   },
   methods:{
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
          "brand_name": this.saveBrand.brand_name,
          "area_pincode": this.saveBrand.area_pincode,
          "gst":  this.saveBrand.gst,
          "poc_name": this.saveBrand.poc_name,
          "poc_phone": this.saveBrand.poc_phone,
          "owner_name": this.saveBrand.owner_name,
          "owner_phone": this.saveBrand.owner_phone,
          "location": this.saveBrand.location,
          "address": this.saveBrand.address,
          // "decision_authority": "",
          // "status": this.saveBrand.status === "Active" ? "1" : "0",
          "brand_connect": this.saveBrand.brand_connect,
          "brand_category": this.saveBrand.brand_category,
          "email_id":  this.saveBrand.email_id ,
          "created_by": this.userid
      }
      this.Addbranddata(postData).then((response)=>{
        console.log('resp',response);
         if(response.data.status == 1){
              this.snackbarText = response.data.message;
              this.color = "primary";
              this.snackbar = true;
               this.saveBrand={};
              
              }else{
              this.snackbarText = response.data.message;
              this.color = "on-background";
              this.snackbar = true;
              }
      })
    },
    // getAllsales(){
    //   this.getsalesperson().then((response)=>{
    //     // console.log('sales',response);
    //     this.salesdata = response.data.data;
   
    //      this.salesdata = this.salesdata.map(sales => ({
    //         value: sales.user_id,
    //         text: sales.name
    //     }));
    //        console.log('sales',this.salesdata);

    //   })
    // },
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