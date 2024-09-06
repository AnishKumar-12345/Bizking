<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard
          title="View SA Targets"
          class="mb-4"
        >
          <VCardText>
            <!-- 👉 Form -->
            <VForm
              ref="tripform"
              class="mt-6"
            >
              <VRow>
                <VCol
                  cols="12"
                  md="6"
                >
                  <!-- @update:model-value="handleBrandSelection(routeuserid)" -->
                  <!-- v-model="routeuserid" -->

                  <VAutocomplete
                    v-model="satargetuserid"
                    label="Sales Associate"
                    :items="salesdata"
                    item-value="value"
                    item-title="text"
                    :menu-props="{ maxHeight: 200 }"
                    :rules="salesr"
                    required
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="Startdate"
                    type="date"
                    label="Start Date"
                    :rules="startr"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="Enddate"
                    type="date"
                    label="End Date"
                    :rules="endr"
                  />
                </VCol>
                <!-- {{this.Importcsv}} -->

                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn @click="validateForm">
                    Get
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    
    <div style="max-width: 400px">
      <VTextField
        v-model="searchQuery"
        class="mb-3"
        density="compact"
        variant="solo"
        label="Search"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
      />
    </div>
    <div
      v-if="loading"
      id="app"
    >
      <div id="loading-bg">
        <div class="loading-logo">
          <img
            src="../../../assets/images/logos/comlogo.jpeg"
            height="60"
            width="68"
            alt="Logo"
          >
        </div>
        <div class="loading">
          <div class="effect-1 effects" />
          <div class="effect-2 effects" />
          <div class="effect-3 effects" />
        </div>
      </div>
    </div>
    <!--
      <VRow v-if="this.filteredPurchaseHistory == null">
      <VCol cols="12"> 
      <VCard title="Purchase Order View">
      <VCardText>      
      <VAlert
      color="warning"
      variant="tonal"
      class="mb-4"              
      border="top"
      >
      <VAlertTitle class="mb-1"> Are you sure you gave Purchase Orders? </VAlertTitle>
      <p class="mb-0">
      The system is not retrieving the Purchase Histories from Purchase Orders. Please ensure that you have applied for Purchase Orders !</p>
      </VAlert>
      </VCardText>
      </VCard>
      </VCol>
      </VRow> 
    -->

    <VTable
      :headers="headers"
      :items="paginatedItems"
      item-key="dessert"
      class="table-rounded"
      height="500"
      fixed-header
    >
      <thead>
        <tr>
          <th 
            v-for="header in headers"
            :key="header"
            class="text-center"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>

      <tbody>
        <!-- {{filteredSAwisetarget}} -->
        <tr v-if="filteredSAwisetarget.length === 0">
          <td
            colspan="16"
            class="text-center"
          >
            <h1>No data found !</h1>
          </td>
        </tr>

        <tr
          v-for="(item, index) in paginatedItems"
          :key="index"
        >
          <td class="text-center">
            {{ item.user_name }}
          </td> 
          <td class="text-center">
            {{ item.merchant_uid }}
          </td>
          <td class="text-center">
            {{ item.target_amount }}
          </td>         
          <td class="text-center">
            {{ item.achieved_target }}
          </td> 
                
          <td class="text-center">
            <VChip
              :color="colorTGMmargin( item.achieved_percentage ).color"
              class="font-weight-medium"
              size="small"
            >
              ( {{ item.achieved_percentage.toFixed(2) + "%" }})
            </VChip>  
            <!-- {{ item.achieved_percentage.toFixed(2) + "%" }} -->
          </td>
        </tr>
      </tbody>
    </VTable>
    <VPagination
      v-model="page"
      :length="Math.ceil(filteredSAwisetarget.length / pageSize)"
      @input="updatePagination"
    />

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
      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,
      salesdata: [],
      satargetuserid: '',
      cityID: '',
      Startdate: '',
      Enddate: '',
      viewSATragetsdata: [],
      searchQuery: '',
      page: 1,
      pageSize: 10,
      loading: false,
      salesr: [v => !!v || 'Sales Associate is required'],
      startr: [v => !!v || 'Start Date is required'],
      endr: [v => !!v || 'End date is required'],

      headers: [
        { text: 'User Name', value: 'user_name' },
        { text: 'Merchant UID', value: 'merchant_uid' },
        { text: 'Target Amount', value: 'target_amount' },
        { text: 'Achieved Target', value: 'achieved_target' },
        { text: 'Achieved Percentage', value: 'achieved_percentage' },
     

      ],
    }
  },
  computed: {
    filteredSAwisetarget() {
      const lowerCaseQuery = this.searchQuery.toLowerCase().trim()
      
      return this.viewSATragetsdata.filter(item => {
        return (
          (item.merchant_uid && item.merchant_uid.toLowerCase().includes(lowerCaseQuery)) ||
          (item.target_amount && item.target_amount.toLowerCase().includes(lowerCaseQuery)) ||       
          (item.achieved_target && item.achieved_target.toString().includes(lowerCaseQuery)) ||
            (item.achieved_percentage && item.achieved_percentage.toString().includes(lowerCaseQuery)) ||
              (item.user_name && item.user_name.toLowerCase().includes(lowerCaseQuery)) 
        )
      })
    },
    paginatedItems() {
      const startIndex = (this.page - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      
      return this.filteredSAwisetarget.slice(startIndex, endIndex)
    },
  },
  mounted() {
    this.cityID = localStorage.getItem('city_id')

    //    // Utility function to format date as YYYY-MM-DD
    // function formatDate(date) {
    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const day = String(date.getDate()).padStart(2, '0');
    //     return `${year}-${month}-${day}`;
    // }

    // // Set start date as the 1st day of the month
    // const currentDate = new Date();
    // // Adjust to Indian timezone by creating a new date at midnight UTC and then converting to IST
    // const firstDayOfMonth = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1));
    // firstDayOfMonth.setUTCHours(0, 0, 0, 0);
    // this.Startdate = formatDate(firstDayOfMonth);

    // // Calculate the first week's end date (Sunday)
    // const firstDayOfWeek = firstDayOfMonth.getUTCDay(); // Use UTC to avoid timezone issues
    // const daysUntilSunday = (7 - firstDayOfWeek) % 7; // Calculate days until Sunday
    // const firstWeekEnd = new Date(firstDayOfMonth);
    // firstWeekEnd.setUTCDate(firstDayOfMonth.getUTCDate() + daysUntilSunday);
    // this.Enddate = formatDate(firstWeekEnd);

    this.getAllsales()
  },

  methods: {
    colorTGMmargin(text){
      if(text > 100){
        return {
          color: 'success',

          // text: 'Shared',
        }
      }else{
        return{
          color: 'error',
        }
      }
    },
    updatePagination(page) {
      this.page = page
    },
    validateForm() {
      this.$refs.tripform.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
          this.getSATargetsdata()
        } else {
          this.snackbar = true
          this.snackbarText = 'Please give all mandatory fields'
          this.color = 'on-background'
        }
      })
    },
    getSATargetsdata() {
      return new Promise((resolve, reject) => {
        //  if( this.cityID != '' &&  this.locationID !== ''){
        this.loading = true

        // this.filterlocation = false

        this.getSATargets(this.satargetuserid, this.Startdate, this.Enddate)
          .then(response => {
            if (response.data.status == 1) {
            //   console.log({ response })
              this.viewSATragetsdata = response.data.data

              // this.viewSATragetsdata.reverse()
              resolve()
              this.snackbar = true
              this.loading = false
              this.color = 'primary'
              this.snackbarText = response.data.message
            } else {
              this.loading = false
              this.snackbar = true
              this.color = 'on-background'
              this.viewSATragetsdata = []
              this.snackbarText = response.data.message
            }
          })
          .catch(error => {
            console.error('Error fetching merchants:', error)
            reject(error) // Reject the promise if there's an error
          })

        //  }
      })

      // this.getSATargets(this.satargetuserid,this.Startdate,this.Enddate).then((response)=>{

      // })
    },
    getAllsales() {
      this.getSalesassociate(this.cityID).then(response => {
        // console.log('sales',response);
        this.salesdata = response.data.data

        // this.salesdata = [
        //   { value: 'all', text: 'All' },
        //   ...this.salesdata.map(sales => ({
        //     value: sales.user_id,
        //     text: sales.name,
        //   })),
        // ]
        this.salesdata = this.salesdata.map(sales => ({
          value: sales.user_id,
          text: sales.name,
        }))

        //  console.log('sales',this.salesdata);
      })
    },
  },
}
</script>

<style></style>
