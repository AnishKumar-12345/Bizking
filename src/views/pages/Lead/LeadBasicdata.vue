<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard
          title="Lead Basic data"
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
                    v-model="saveLeads.name"
                    label="Name"
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
                    v-model="saveLeads.status"
                    :rules="satusrules"
                    :items="['Created', 'Partially interested', 'Cancelled', 'Closed']"
                    label="Lead Status"
                  />
                </VCol>

                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn @click="validateForm">Save</VBtn>
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
        v => /^[a-zA-Z]+$/.test(v) || 'Only letters are allowed in the name',
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
        lead_type: '',
        name: '',
        address: '',
        pincode: '',
        lead_id: '',
        owner_name: '',
        owner_phone: '',
        poc_name: '',
        poc_phone: '',
        gst: '',
        decision_authority: '',
        user_id: '',
        location: '',
        status: '',
      },
      loggedby: '',

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
  mounted() {
    this.Leadid = this.$route.query.lead_id
    this.loggedby = localStorage.getItem('createdby');
    // console.log('set', this.Leadid);

    this.editLeadsdata()
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
      const postdata = {
        name: this.saveLeads.name,
        address: this.saveLeads.address,
        pincode: this.saveLeads.pincode,
        lead_id: this.saveLeads.lead_id,
        owner_name: this.saveLeads.owner_name,
        owner_phone: this.saveLeads.owner_phone,
        poc_name: this.saveLeads.poc_name,
        poc_phone: this.saveLeads.poc_phone,
        gst: this.saveLeads.gst,
        decision_authority: this.saveLeads.decision_authority,
        location: this.saveLeads.location,
        status: this.saveLeads.status,
      }
      console.log('update lead', postdata)
      this.updateLead(postdata).then(response => {
        console.log('check data', response)
        if (response.data.status == 1) {
          this.snackbar = true
          this.snackbarText = response.data.message
          this.color = 'primary'
          // this.saveLeads = {};
          this.$router.push({ name: 'LeadView' })
        } else {
          this.snackbar = true
          this.snackbarText = response.data.message
          this.color = 'on-background'
          this.saveLeads = {}
        }
      })
    },

    editLeadsdata() {
      this.updateLeads(this.Leadid).then(response => {
        console.log('check response', response.data.data)
        this.saveLeads.address = response.data.data.address
        this.saveLeads.decision_authority = response.data.data.decision_authority
        this.saveLeads.gst = response.data.data.gst
        this.saveLeads.name = response.data.data.name
        this.saveLeads.lead_id = response.data.data.lead_id
        this.saveLeads.owner_name = response.data.data.owner_name
        this.saveLeads.owner_phone = response.data.data.owner_phone
        this.saveLeads.poc_name = response.data.data.poc_name
        this.saveLeads.poc_phone = response.data.data.poc_phone
        this.saveLeads.pincode = response.data.data.pincode
        this.saveLeads.location = response.data.data.location
        // this.saveLeads.poc_phone = response.data.data.poc_phone;
        // this.saveLeads.poc_phone = response.data.data.poc_phone;
      })
    },  

  },
}
</script>
<style scoped></style>
