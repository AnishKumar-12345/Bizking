<template>
    <div>
         <VRow>
      <VCol cols="12">
       <VCard title="Lead Basic data" class="mb-4">       

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6 ">
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
                  label="Store Address"
                  :rules="storearules"
                  
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
                  label="Area PinCode"
                  :rules="pinrules"

                />
              </VCol>

              <!-- <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                    v-model="saveLeads.location" 
                  label="Location"
                  :rules="locationrules"

                />
              </VCol> -->
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                    v-model="saveLeads.poc_name" 
                  :rules="namerules1"
                
                  label="POC Name"
                />
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
                 <VTextField
                    v-model="saveLeads.owner_name" 
                  :rules="namerules1"
                
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
              <!-- <VCol
                md="6"
                cols="12"
              >
                 <VSelect
                
                  label="Lead Status"
                  :items="['New','Partially','Not Interested','Interested','Closed']"
                />
              </VCol> -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn>Save</VBtn>

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
import servicescall from '@/Services'

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
         (v) => !!v || 'Authority is required',
       
      ],
      namerules1: [
         (v) => !!v || 'Name is required',
         (v) => /^[a-zA-Z]+$/.test(v) || 'Only letters are allowed in the name'
      ],
       gstrules: [
        (v) => !!v || "GST is required",     
      ],

     pinrules: [        
                (v) => !!v || 'PIN is required',
                 (v) => (v && /^\d{6}$/.test(v)) || 'PIN must be 6 digits'
              ],

      emailRules: [ 
      (v) => !!v || 'Email is required',
      (v) => /.+@.+\..+/.test(v) || 'The email must be valid with the correct format: @ and . symbols', 
    ],

      phonerules: [
         (v) => !!v || " Mobile  is required",
          (v) => /^[0-9]+$/.test(v) || "only number are accepted",
          (v) =>
            (v && v.length <= 10 && v.length >= 10) ||
            "Mobile must be  10 number",
        ],

        dialog: false,
         Leadid:null,

          saveLeads:{
          "lead_type":"brand",
          "name":"",
          "address":"",
          "pincode":"",
          "lead_id":"",
          "owner_name":"",
          "owner_phone":"",
          "poc_name":"",
          "poc_phone":"",
          "gst":"",
          "decision_authority":"",
          "user_id":"",
          "location":""
        },
        loggedby:'',

      headers: [
        { text: 'Purchase Order', value: 'po' },
        { text: 'Order Date', value: 'ODate' },
        { text: 'Status', value: 'status' },
        { text: 'Order To', value: 'OT' },
        { text: 'Shipped To', value: 'ST' },
        { text: 'Total', value: 'total' },
        { text: 'Action', value: 'actions', sortable: false },        

      ],
    }
   },
   mounted(){
      this.Leadid = this.$route.query.lead_id;
    this.loggedby = localStorage.getItem('createdby');

      // console.log('set', this.Leadid);
      //  this.Soid = this.$route.query.so_id
      this.updateLeadsdata();
   },
   methods:{
    updateLeadsdata(){
      this.updateLeads(this.Leadid).then((response)=>{
        console.log('check response',response.data.data);
        this.saveLeads.address = response.data.data.address;
        this.saveLeads.decision_authority = response.data.data.decision_authority;
        this.saveLeads.gst = response.data.data.gst;
        this.saveLeads.name = response.data.data.name;
        this.saveLeads.lead_id = response.data.data.lead_id;
        this.saveLeads.owner_name = response.data.data.owner_name;
        this.saveLeads.owner_phone = response.data.data.owner_phone;
        this.saveLeads.poc_name = response.data.data.poc_name;
        this.saveLeads.poc_phone = response.data.data.poc_phone;
        this.saveLeads.pincode = response.data.data.pincode;
        this.saveLeads.location = response.data.data.location;

        // this.saveLeads.poc_phone = response.data.data.poc_phone;
        // this.saveLeads.poc_phone = response.data.data.poc_phone;


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