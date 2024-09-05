<template>
  <div>
    <VRow>
      <!-- Merchant Products report -->
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          title="Acknowledge Sales Orders"
          class="position-relative"
        >
          <VCardText>
            <h4 class="text-4xl font-weight-medium text-primary">
              <VIcon
                size="50"
                start
                icon="line-md:downloading-loop"
              />
            </h4>
            <br>
            <!-- <p>🎉</p> -->
            <VBtn
              size="small"
              @click="openMPR"
            >
              Get Reports
            </VBtn>
          </VCardText>

          <!-- Triangle Background -->
          <VImg
            :src="triangleBg"
            class="triangle-bg flip-in-rtl"
          />
          <img
            src="@/assets/images/avatars/avatar-14.png"
            class="trophy2"
          >
        </VCard>
      </VCol>
    </VRow>

    <VDialog
      v-model="dialog"
      max-width="400"
    >
      <VCard
        title="Acknowledge Sales Orders Reports"        
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                ref="purchaseOrderForm"
                class="mt-6"
              >
                <VRow>
                  <VCol                  
                   
                    cols="12"
                  >
                    <!-- {{selectedBrand}} -->             
                    <VAutocomplete
                      v-model="Location"
                      label="Location Details"
                      :items="cityLoaction"               
                      item-value="value"
                      item-title="text"
                      :rules="locationrules"
                      :menu-props="{ maxHeight: 200 }"                   
                    />
                  </VCol>
                  <VDivider />

                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click="validateForm6">
                      Get
                    </VBtn>

                    <VBtn @click="closeMPreport">
                      Close
                    </VBtn>

                    <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                    <VProgressCircular
                      v-show="isProgress"
                      :size="50"
                      color="primary"
                      indeterminate
                    />
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>
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

  data(){
    return{
      dialog:false,
      isProgress: false,
      Location:'',
      cityID:'',
      locationsdata:[],
      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,
      locationrules:  [v => !!v || 'This Field is required'],
    }
  },
  mounted(){
    this.cityID = localStorage.getItem("city_id")

    // this.getBranchnames()
    this.handleBrandSelection()

  },
  methods: {
    validateForm6(){
      this.$refs.purchaseOrderForm.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
              
          this.openOreport()
        }else{
          this.snackbar = true
          this.snackbarText = "Please give all mandatory fields"
          this.color = "on-background"
        }
      }) 
    },
    openOreport() {
      this.isProgress = true

      this.getOutputstockreport(this.cityID, this.Location).then(response => {
        if (response.data.status == 0) {
          this.isProgress = false
          this.snackbar = true
          this.color = 'on-background'
          this.snackbarText = response.data.message
          this.dialog = false
        } else {
          this.isProgress = false
          this.dialog = false
          this.Location = ""
      

          // Default base file name
          const baseFileName = 'Acknowledge_Sales_Orders'

          // Get the current date and time
          const now = new Date()
          const year = now.getFullYear()
          const month = String(now.getMonth() + 1).padStart(2, '0')
          const day = String(now.getDate()).padStart(2, '0')
          const hours = String(now.getHours()).padStart(2, '0')
          const minutes = String(now.getMinutes()).padStart(2, '0')
          const formattedDateTime = `${year}${month}${day}${hours}${minutes}`

          // Append the date and time to the file name
          const finalFileName = `${baseFileName}_${formattedDateTime}.csv`

          const blob = new Blob([response.data])

          // Create a temporary URL for the Blob
          const url = window.URL.createObjectURL(blob)

          // Create a link element
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', finalFileName) // Set the final file name dynamically

          // Append the link to the body
          document.body.appendChild(link)

          // Programmatically click the link to trigger the download
          link.click()

          // Clean up - remove the link and revoke the URL
          link.parentNode.removeChild(link)
          window.URL.revokeObjectURL(url)

          this.snackbar = true
          this.color = 'primary'
          this.snackbarText = 'Reports downloaded successfully.'
        }
      }).catch(error => {
        console.error('Error during report generation:', error)
        this.isProgress = false
        this.snackbar = true
        this.color = 'error'
        this.snackbarText = 'Failed to download report due to an error.'
      })
    },

    handleBrandSelection(){ 
      // console.log('check hjandle',id);
      this.getCitylocation(this.cityID ).then(response=>{
        // console.log('check the response',response);
        this.cityLoaction = response.data.data.map(sales => ({
          value: sales.location_id,
          text: sales.location,
        }))
        console.log('ceck tye res',this.cityLoaction)
      })
    },
    openMPR() {
      this.dialog = true
    },
    closeMPreport(){
      this.dialog = false
      this.Location = ''
    },



  },
}
</script>

<style lang="scss">
.trophy2 {
  position: absolute;
  inline-size: 10rem;
  inset-block-end: -1rem;
  inset-inline-end: -1rem;
}
</style>