<template>
  <div>
      <div v-if="loading"  class="loading-container">
      <VProgressLinear
            height="5"
            color="primary"
            indeterminate
            class="custom-loader"  
            full-width              
        />          
     </div>
    <VRow>
      <VCol cols="12">
        <VCard
          title="Opportunity Basic data"
          class="mb-4"
        >
          <VCardText>
            <!-- 👉 Form -->
            <VForm
              class="mt-6"
              ref="purchaseOrderForm"
            > 
              <VRow>

                 <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="saveLeads.opportunity_type"
                    label="Opportunity Type"
                    :rules="storerules"
                    readonly
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="saveLeads.name"
                    label="Brand / Merchant Name"
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
                    label="Address"
                    :rules="storearules"
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="saveLeads.email"
                    label="Email"
                    :rules="emailRules"
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
                 <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="saveLeads.decision_authority"
                    :items="['Owner','POC']"
                    label="Decision Authority"
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="saveLeads.longitude"
                    readonly
                    label="Longitude"
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="saveLeads.latitude"
                    readonly
                    label="Longitude"
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="saveLeads.status"
                    :rules="satusrules"
                    :items="['Created', 'Cancelled', 'Closed(Onboard)']"
                    label="Opportunity Status"
                  />
                </VCol>

                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="saveLeads.billing_address"
                   
                    label="Billing Address"
                  />
                </VCol>

                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                <!-- {{saveLeads.status}} -->
                  <VBtn @click="validateForm" v-show="selectedItem.status != 'close' ">Save</VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VSnackbar
      v-model="snackbar"
      :timeout="3500"
      :color="color"
    >
      {{ snackbarText }}
    </VSnackbar>
  </div>
</template>
<script>
import servicescall from '@/Services'

export default {
  mixins: [servicescall],

  data() {
    return {
      loading:true,
      snackbar: false,
      snackbarText: '',
      timeout: 6000,
      color: '',
      top: false,
      bottom: true,
      left: false,
      right: false,
      satusrules: [v => !!v || 'Status is required'],
      storearules: [v => !!v || 'Store Address is required'],
      locationrules: [v => !!v || 'Location is required'],
      storerules: [v => !!v || 'Store Name is required'],
      uidrules: [v => !!v || 'UID is required'],

      namerules: [v => !!v || 'Lead is required'],
      authrules: [v => !!v || 'Authority is required'],
      namerules1: [
        v => !!v || 'Name is required',
         (v) => /^[a-z A-Z]+$/.test(v) || 'Only letters are allowed in the name'

      ],
      gstrules: [v => !!v || 'GST is required'],

      pinrules: [v => !!v || 'PIN is required', v => (v && /^\d{6}$/.test(v)) || 'PIN must be 6 digits'],

      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'The email must be valid with the correct format: @ and . symbols',
      ],

      phonerules: [
        v => !!v || ' Mobile  is required',
        v => /^[0-9]+$/.test(v) || 'only number are accepted',
        v => (v && v.length <= 10 && v.length >= 10) || 'Mobile must be  10 number',
      ],

      dialog: false,
      Leadid: null,

      saveLeads: {
        opportunity_type: '',
        name: '',
        address: '',
        email:'',
        pincode: '',
        lead_id: '',
        owner_name: '',
        owner_phone: '',
        poc_name: '',
        poc_phone: '',
        latitude:'',
        longitude:'',
        gst: '',
        decision_authority: '',
        opportunity_no:'',
        opportunity_id:'',
        user_id: '',
        location: '',
        status: '',
        billing_address: '',
       },
      loggedby: '',
createdby:'',
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
  computed:{
     selectedItem() {
        return this.$store.state.selectedItem;
      },
  },
  mounted() {
    this.createdby =  localStorage.getItem('user_id');
    this.Leadid = this.$route.query.opportunity_id
    this.loggedby = localStorage.getItem('createdby');
    // console.log('set', this.Leadid);

    // this.editLeadsdata()
       this.editLeadsdata()
            .then(() => {
             
              this.loading = false;            })
            .catch((error) => {             
              console.error('Error fetching merchants:', error);             
            });
  },
  methods: {
    validateForm() {
      this.$refs.purchaseOrderForm.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
          this.updateLeaddata()
        } else {
          this.snackbar = true
          this.snackbarText = 'Please give all mandatory fields'
          this.color = 'on-background'
        } 
      })
    },

    updateLeaddata() {
      const status = {
        'Created': 'created',
        'Partially interested' : 'partially interested',
        'Cancelled': 'cancelled',
        'Closed(Onboard)' : 'close'
      }
      const dec = {
        'Owner': 'owner',
        'POC' : 'poc',
      }
      const postdata = {
        opportunity_type: this.saveLeads.opportunity_type,
        opportunity_id:this.saveLeads.opportunity_id,
        opportunity_no:this.saveLeads.opportunity_no,
        latitude:this.saveLeads.latitude,
        longitude:this.saveLeads.longitude,
        name: this.saveLeads.name,
        address: this.saveLeads.address,
        email: this.saveLeads.email,
        pincode: this.saveLeads.pincode,
        // lead_id: this.saveLeads.lead_id,
        owner_name: this.saveLeads.owner_name,
        owner_phone: this.saveLeads.owner_phone,
        poc_name: this.saveLeads.poc_name,
        poc_phone: this.saveLeads.poc_phone,
        user_id: this.createdby,
        gst: this.saveLeads.gst,
        decision_authority: dec[this.saveLeads.decision_authority] ? dec[this.saveLeads.decision_authority] : this.saveLeads.decision_authority ,
        location: this.saveLeads.location,
        billing_address: this.saveLeads.billing_address,
        status: status[this.saveLeads.status] ? status[this.saveLeads.status] : this.saveLeads.status ,
      }
      // console.log('update lead', postdata)
      this.updateOppertunitydetails(postdata).then(response => {
        // console.log('check data', response)
        if (response.data.status == 1) {
          this.snackbar = true
          this.snackbarText = response.data.message
          this.color = 'primary'
          window.location.reload(true);   

          // this.saveLeads = {};          
        } else {
          this.snackbar = true
          this.snackbarText = response.data.message
          this.color = 'on-background'
          this.saveLeads = {} 
        }
      })
    },

    editLeadsdata() {
      //  return new Promise((resolve, reject) => {
      //     this.getMerchantdetails()
      //       .then((response) => {
      //         this.merchants = response.data.data;
      //         this.merchants.reverse();
      //         resolve(); // Resolve the promise when API call is successful
      //       })
      //       .catch((error) => {
      //         console.error('Error fetching merchants:', error);
      //         reject(error); // Reject the promise if there's an error
      //       });
      //   });
          return new Promise((resolve, reject) => {
          this.getOppertunitydetails(this.Leadid).then(response => {
            console.log('oppertunity',response);
            //   console.log('check response', response.data.data)
              this.saveLeads.opportunity_type = response.data.data.lead_type
              this.saveLeads.opportunity_id = response.data.data.opportunity_id
              this.saveLeads.opportunity_no = response.data.data.opportunity_no
              this.saveLeads.address = response.data.data.address
              this.saveLeads.email = response.data.data.email
              this.saveLeads.decision_authority = response.data.data.decision_authority == "owner" ? "Owner" : "owner" && response.data.data.decision_authority == "poc" ? "POC" : "poc"  
              this.saveLeads.gst = response.data.data.gst
              this.saveLeads.name = response.data.data.name
              this.saveLeads.lead_id = response.data.data.lead_id
              this.saveLeads.owner_name = response.data.data.owner_name
              this.saveLeads.owner_phone = response.data.data.owner_phone
              this.saveLeads.poc_name = response.data.data.poc_name
              this.saveLeads.poc_phone = response.data.data.poc_phone
              this.saveLeads.pincode = response.data.data.pincode
              this.saveLeads.location = response.data.data.location
              this.saveLeads.billing_address = response.data.data.billing_address
              this.saveLeads.status = response.data.data.status == "created" ? "Created" : "created" && response.data.data.status == "cancelled" ? "Cancelled" : "cancelled" && response.data.data.status == "close" ? "Closed(Onboard)" : response.data.data.status ;
              this.saveLeads.longitude = response.data.data.longitude ? response.data.data.longitude : "";
              this.saveLeads.latitude = response.data.data.latitude ? response.data.data.latitude : "";

              // this.saveLeads.poc_phone = response.data.data.poc_phone;
              // this.saveLeads.poc_phone = response.data.data.poc_phone;
              resolve();
            })
            .catch((error) => {
              console.error('Error fetching merchants:', error);
              reject(error); // Reject the promise if there's an error
            });
        });
     
    },  

  },
}
</script>
<style scoped></style>
