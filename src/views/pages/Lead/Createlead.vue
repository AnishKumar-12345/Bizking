<template>
    <div>
         <VRow>
      <VCol cols="12">
       <VCard title="Create Lead" class="mb-4">       

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6" ref="purchaseOrderForm">
            <VRow>
    
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                 v-model="saveLeads.lead_type"
                  label="Lead Type"
                 readonly
                  :rules="namerules"
                />
              </VCol>


            
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                 v-model="saveLeads.name"                
                  label="Store Name"
                  :rules="storerules"
               
                />
              </VCol>
      
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                 v-model="loggedby"                
                  label="Lead Handler"
                  readonly
                />
              </VCol>
            
            <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                 v-model="saveLeads.address"
                :rules="storearules"
                  label="Store Address"
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                 v-model="saveLeads.gst"
                
                  label="GST"
                />
              </VCol>
             <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                 v-model="saveLeads.pincode"
                :rules="pinrules"
                  label="Area PinCode"
                />
              </VCol>

              <!-- <VCol
                md="6"
                cols="12"
              >
          
                 <VTextField
                 v-model="saveLeads.location"
              
                  label="Location"
                />
              </VCol> -->
               <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                 v-model="saveLeads.owner_name"
                :rules="namerules2"
                  label="Owner Name"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                 v-model="saveLeads.owner_phone"
                :rules="phonerules"
                  label="Owner Phone"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                 v-model="saveLeads.poc_name"
                :rules="namerules1"
                  label="POC Name"
                />
                <span><strong color="error">* </strong> please enter owner name if there is no poc</span>
                  <!-- <template #label>
                          POC Name<strong class="red--text">* </strong>
                        </template> -->
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                 v-model="saveLeads.poc_phone"
                :rules="phonerules"
                  label="POC Phone"
                />
              </VCol>
             
              <VCol
                md="6"
                cols="12"
              >
                 <VSelect
                 v-model="saveLeads.decision_authority"
                :rules="authrules"
                  label="Decision Authority"
                  :items="['POC','Owner']"
                />
              </VCol>
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="validateForm">Save</VBtn>

                <!-- <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
               
                >
                  Reset
                </VBtn> -->
              </VCol>
            </VRow>
          </VForm>

        </VCardText>
      </VCard>
    </VCol>  
  </VRow>

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

    

     <VSnackbar
      v-model="snackbar" :timeout="3500"
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
        storearules:[
          (v) => !!v || 'Store Address is required',
         ],
         locationrules:[
          (v) => !!v || 'Location is required',
         ],
        storerules:[
          (v) => !!v || 'Store Name is required',
         ],
       uidrules: [
         (v) => !!v || 'UID is required',
      ],

       namerules: [
         (v) => !!v || 'Lead is required',
       
      ],
        authrules: [
         (v) => !!v || 'Decision Authority is required',
       
      ],
      namerules1: [
         (v) => !!v || 'POC name is required',
        //  (v) => /^[a-zA-Z]+$/.test(v) || 'Only letters are allowed in the name'
      ],
       namerules2: [
         (v) => !!v || 'Owner name is required',
        //  (v) => /^[a-zA-Z]+$/.test(v) || 'Only letters are allowed in the name'
      ],
       gstrules: [
        (v) => !!v || "GST is required",     
      ],

     pinrules: [        
                (v) => !!v || 'PIN Code is required',
                 (v) => (v && /^\d{6}$/.test(v)) || 'PIN must be 6 digits'
              ],

      emailRules: [ 
      (v) => !!v || 'Email is required',
      (v) => /.+@.+\..+/.test(v) || 'The email must be valid with the correct format: @ and . symbols', 
    ],

      phonerules: [
         (v) => !!v || " Mobile Number is required",
          (v) => /^[0-9]+$/.test(v) || "only number are accepted",
          (v) =>
            (v && v.length <= 10 && v.length >= 10) ||
            "Mobile must be  10 number",
        ],
        dialog: false,
        loggedby:'',
        userid:'',
        saveLeads:{
          "lead_type":"Brand",
          "name":"",
          "address":"",
          "pincode":"",
          "owner_name":"",
          "owner_phone":"",
          "poc_name":"",
          "poc_phone":"",
          "gst":"",
          "decision_authority":"",
          "user_id":"",
          "location":""
        },
         snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,
        
    }
   },

   mounted(){
    this.loggedby = localStorage.getItem('createdby');
    this.userid = localStorage.getItem('user_id');

   },

   methods:{
      validateForm(){
      this.$refs.purchaseOrderForm.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
         
          this.saveLeaddata();
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      }); 
    },
    
    saveLeaddata(){
      const postdata = {
            "lead_type":this.saveLeads.lead_type,
            "name":this.saveLeads.name,
            "address":this.saveLeads.address,
            "pincode":this.saveLeads.pincode,
            "owner_name":this.saveLeads.owner_name,
            "owner_phone":this.saveLeads.owner_phone,
            "poc_name":this.saveLeads.poc_name,
            "poc_phone":this.saveLeads.poc_phone,
            "gst":this.saveLeads.gst,
            "decision_authority":this.saveLeads.decision_authority,
            "user_id":this.userid,
            "location":this.saveLeads.location,
      }
      console.log('chek p',postdata);
      this.saveLead(postdata).then((response)=>{
        console.log('chec',response);
        if(response.data.status == 1){
           this.snackbar = true;
            this.snackbarText = response.data.message;
            this.color = "primary";
            this.saveLeads = {};
        }else{
            this.snackbar = true;
            this.snackbarText = response.data.message;
            this.color = "on-background";
            this.saveLeads = {};
        }
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