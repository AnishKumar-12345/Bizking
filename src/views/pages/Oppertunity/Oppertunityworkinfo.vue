<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard
          title="Work Info"
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
                  md="4"
                  cols="12"
                >
                  <!-- :items="['PO1', 'PO2', 'PO3','PO4','PO5']" -->

                  <VTextField
                    v-model="this.workinfo.summary"
                    label="Summary"
                    :rules="summaryRules"
                  />
                </VCol>

                <!-- <VCol
                  cols="12"
                  md="4"
                >
                  <VSelect
                    v-model="this.workinfo.visit_status"
                    :rules="visitRules"
                    :items="['Scheduled','Not Visited','Talked Via Phone','Visited']"
                    label="Visit Status"
                  />
                </VCol> -->

                <VCol
                  cols="12"
                  md="4"
                >
                  <VTextField
                    v-model="this.workinfo.schedule_next_visit"
                    type="date"
                    :min="today"
                    label="Schedule Next Visit"
                  />
                </VCol>

                <VCol cols="12">
                  <!-- {{this.inputStock.po_status}} -->
                  <!-- :items="['Draft', 'Created', 'Shared', 'Acknowledged', 'Received', 'Close']" -->
                  <VTextarea
                    v-model="this.workinfo.working_notes"
                    label="Working Notes"
                    :rules="workingRules"
                    row-height="30"
                    rows="4"
                    variant="filled"
                    auto-grow
                    shaped
                  />
                </VCol>

                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn @click="validateForm" v-if="shouldShowButton">Save</VBtn>
                </VCol>
             
                <VCol cols="12">
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

                  <!-- {{shouldShowButton}} -->

                  <VTable
                    :headers="headers"
                    :items="paginatedItems"
                    item-key="brand_name"
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
                        v-for="(item, index) in paginatedItems"
                        :key="index"
                      >
                        <!-- <td class="text-center">{{ index }}</td> -->

                        <td class="text-center">{{ item.created_date }}</td>
                        <td class="text-center">
                          {{ item.updated_date }}
                        </td>
                        <td class="text-center">
                          {{ item.summary }}
                        </td>
                        <!-- <td class="text-center">
           
        {{ item.mrp }}
        </td> -->
                        <td class="text-center">
                          {{ item.working_notes }}
                        </td>
                         
                        <!-- <td class="text-center">
                          {{ item.visit_status }}
                        </td> -->
                        <td class="text-center">
                          {{ item.schedule_next_visit }}
                        </td>
                        <!-- <td class="text-center">
                          <V-btn
                            icon
                            variant="text"
                            color="default"
                            class="mb-1 mt-2"
                            size="x-small"
                            @click="editWorkinfo(item)"
                          >
                            <VIcon
                              icon="ri-pencil-line"
                              size="22"
                              color="#BA8B32"
                            />
                          </V-btn>
                        </td> -->
                      </tr>
                    </tbody>
                  </VTable>

                   <VPagination
                    v-model="page"
                    :length="Math.ceil(filteredSalesHistory.length / pageSize)"
                    @input="updatePagination"
                  />
                </VCol>

                <VDialog
                  v-model="dialog9"
                  max-width="1000"
                >
                  <VCard
                    title="User Store"
                    class="mb-2"
                  >
                    <VCardText>
                      <VRow>
                        <VCol cols="12">
                          <!-- 👉 Form -->
                          <VForm
                            class="mt-6"
                            ref="purchaseOrderForm8"
                          >
                            <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">           
              </VCheckbox> -->
                            <VRow>
                              <VCol
                                md="4"
                                cols="12"
                              >
                                <!-- :items="['PO1', 'PO2', 'PO3','PO4','PO5']" -->

                                <VTextField
                                  v-model="this.workinfoupdate.summary"
                                  label="Summary"
                                  :rules="summaryRules"
                                />
                              </VCol>

                              <!-- <VCol
                                cols="12"
                                md="4"
                              >
                                <VSelect
                                  v-model="this.workinfoupdate.visit_status"
                                  :rules="visitRules"
                                  :items="['Scheduled','Not Visited','Talked Via Phone','Visited']"
                                  label="Visit Status"
                                />
                              </VCol> -->

                              <VCol
                                cols="12"
                                md="4"
                              >
                                <VTextField
                                  v-model="this.workinfoupdate.schedule_next_visit"
                                  type="date"
                                  :min="today"
                                  label="Schedule Next Visit"
                                />
                              </VCol>

                              <VCol cols="12">
                                <!-- {{this.inputStock.po_status}} -->
                                <!-- :items="['Draft', 'Created', 'Shared', 'Acknowledged', 'Received', 'Close']" -->
                                <VTextarea
                                  v-model="this.workinfoupdate.working_notes"
                                  label="Working Notes"
                                  :rules="workingRules"
                                  row-height="30"
                                  rows="4"
                                  variant="filled"
                                  auto-grow
                                  shaped
                                />
                              </VCol>
                              <!-- {{this.statusss}} -->
                             

                              <VCol
                                cols="12"
                                class="d-flex flex-wrap gap-4"
                              >
                                <VBtn @click="validateForm2" >Save</VBtn>
                                <VBtn @click="closeinfo()">Close</VBtn>
                              </VCol>
                            </VRow>
                          </VForm>
                        </VCol>
                      </VRow>
                    </VCardText>
                  </VCard>
                </VDialog>

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
      <!-- <VBtn text @click="snackbar = false">Close</VBtn> -->
    </VSnackbar>
  </div>
</template>
<script>
import servicescall from '@/Services'
export default {
  mixins: [servicescall],
  data() {
    return {
       page: 1,
    pageSize: 10,
       searchQuery:'',
      today: this.getFormattedDate(new Date()),
      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,
      workinfoupdate: {
        summary: '',
        working_notes: '',
        opportunity_id: '',
        // visit_status: '',
        schedule_next_visit: '',
        opportunity_info_id: '',
      },
      statusss:'',
      workinfo: {
        summary: '',
        working_notes: '',
        visit_status: '',
        schedule_next_visit: '',
      },
      Leadid: '',
      maxPaginationPages: 5,
      workingRules: [v => !!v || 'Working Notes is required'],
      visitRules: [v => !!v || 'Visit Status is required'],
      summaryRules: [v => !!v || 'Summary is required'],
      uomRules: [v => !!v || 'UOM is required'],
      //  hsnRules: [
      //          (v) => !!v || "HSN is required",

      // ],
      pinrules: [v => !!v || 'PIN is required'],
      phonerules: [
        v => !!v || ' Mobile  is required',
        v => /^[0-9]+$/.test(v) || 'only number are accepted',
        v => (v && v.length <= 10 && v.length >= 10) || 'Mobile must be  10 number',
      ],
      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,
      dialog: false,
      loading: true,
      page: 1,
      pageSize: 10,
      products: [],
      saveProduct: {
        merchant_uid: '',
        brand_name: '',
        sku_name: '',
        uom: '',
        hsn_code: '',
        mrp: '',
        status: '',
        brand_id: '',
        brand_product_id: '',
        total_given_margin: '',
        sgst: '',
        cgst: '',

        pitch_from: '',
        // "decision_authority": "",
        final_retail_cp: '',
        final_ret: '',

        bk_profit: '',
        bizkingz_cp_final: '',
        bc_margin_amt: '',

        bc_margin: '',
        // "created_by": "",
      },
      salesdata: [],
      BrandNames: [],
      selectedBrand: null,
      userRole: '',
      dialog9: false,
      createdby: '',
      userId:'',
      workInfo: [],
      headers: [
        // { text: 'SNo', value: 'brand_name' },
        { text: 'Date', value: 'created_date' },
        { text: 'Updated Date', value: 'updated_date' },
        { text: 'Summary', value: 'summary' },
        { text: 'Notes', value: 'working_notes' },
        // { text: 'Status', value: 'visit_status' },
        { text: 'Schedule Next Visit ', value: 'schedule_next_visit' },
        // { text: 'Action', value: 'action' },
      ],
    }
  },
  computed:{
  
  shouldShowButton() {
    // Check if the status is 'close'
    return this.statusss !== 'close';
  },

     filteredSalesHistory() {
      const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
      return this.workInfo.filter((item) => {
        // Filter based on search query
        const matchesSearch = (
          // (item.so_number && item.so_number.toLowerCase().includes(lowerCaseQuery)) ||
          (item.created_date && item.created_date.toLowerCase().includes(lowerCaseQuery)) ||
          (item.updated_date && item.updated_date.toLowerCase().includes(lowerCaseQuery)) ||
          (item.summary && item.summary.toLowerCase().includes(lowerCaseQuery)) ||
          (item.working_notes && item.working_notes.toString().includes(lowerCaseQuery)) ||
          (item.visit_status && item.visit_status.toLowerCase().includes(lowerCaseQuery)) 

        );
        // Filter based on status
        // const matchesStatus = (
        //   // item.so_status === 'Acknowledged' || 
        //   item.so_status === 'Delivered' || 
        //   item.so_status === 'Received' || 
        //   item.so_status === 'Shipped'
        // );
        // Return true if both search query and status match
        return matchesSearch;
      });
    },
     paginatedItems() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredSalesHistory.slice(startIndex, endIndex);
  },
  },
  mounted() {
    this.Leadid = this.$route.query.opportunity_id
    console.log('check the id', this.Leadid)
    this.updateLeadsdata();
  },
  methods: {
    updatePagination(page) {
    this.page = page;
  },
    closeinfo() {
      this.dialog9 = false
      this.workinfoupdate = {}
    },
    validateForm2() {
      this.$refs.purchaseOrderForm8.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
          this.updateworkinfo()
        } else {
          this.snackbar = true
          this.snackbarText = 'Please give all mandatory fields'
          this.color = 'on-background'
        }
      })
    },
    updateworkinfo() {
      const postdata = {
        opportunity_info_id: this.workinfoupdate.opportunity_info_id,
        opportunity_id: this.workinfoupdate.opportunity_id,

        summary: this.workinfoupdate.summary,
        working_notes: this.workinfoupdate.working_notes,
        // visit_status: this.workinfoupdate.visit_status,
        schedule_next_visit: this.workinfoupdate.schedule_next_visit,
      }
      console.log('check the data', postdata)
      this.UpdateLeadInfo(postdata).then(response => {
        if (response.data.status == 1) {
          this.snackbar = true
          this.snackbarText = response.data.message
          this.color = 'primary'
          this.workinfoupdate = {}
          this.updateLeadsdata()
          this.dialog9 = false
        } else {
          this.snackbar = true
          this.snackbarText = response.data.message
          this.color = 'on-background'
          this.workinfoupdate = {}
          this.dialog9 = false
        }
      })
    },
    editWorkinfo(item) {
      console.log('check d', item)
      this.dialog9 = true
      this.workinfoupdate.summary = item.summary
    //   this.workinfoupdate.visit_status = item.visit_status
      this.workinfoupdate.schedule_next_visit = item.schedule_next_visit
      this.workinfoupdate.working_notes = item.working_notes
      this.workinfoupdate.opportunity_id = item.opportunity_id

      this.workinfoupdate.opportunity_info_id = item.opportunity_info_id
    },

    validateForm() {
      this.$refs.purchaseOrderForm.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
          this.saveworkinfo()
        } else {
          this.snackbar = true
          this.snackbarText = 'Please give all mandatory fields'
          this.color = 'on-background'
        }
      })
    },
    saveworkinfo() {
      const postdata = {
        opportunity_id: this.Leadid,
        summary: this.workinfo.summary,
        working_notes: this.workinfo.working_notes,
        user_id: this.userId,
        schedule_next_visit: this.workinfo.schedule_next_visit,
      }
      console.log('check the data', postdata)
      this.AddOppertunityinfo(postdata).then(response => {
        if (response.data.status == 1) {
          this.snackbar = true
          this.snackbarText = response.data.message
          this.color = 'primary'
          this.workinfo = {}
          this.updateLeadsdata()
        } else {
          this.snackbar = true
          this.snackbarText = response.data.message
          this.color = 'on-background'
          this.workinfo = {}
        }
      })
    },

    updateLeadsdata() {
      this.getOppertunitydetails(this.Leadid).then(response => {
        console.log('check response', response)
        this.workInfo = response.data.data.opportunity_work_info
        this.userId = response.data.data.user_id;
        this.statusss = response.data.data.status;
        console.log('set', this.statusss)
        this.workInfo.reverse();
        // this.saveLeads.poc_phone = response.data.data.poc_phone;
        // this.saveLeads.poc_phone = response.data.data.poc_phone;
      })
    },
    getFormattedDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
  },
}
</script>
