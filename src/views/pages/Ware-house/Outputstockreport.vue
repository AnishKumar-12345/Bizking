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
                      :items="locationsdata"               
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
    }
  },
  mounted(){
    this.cityID = localStorage.getItem("city_id")
    this.getBranchnames()

  },
  methods: {
    getBranchnames(){
      this.Locationdata().then(response=>{ 
        
        this.locationsdata = response.data.data.map(sales => ({
          value: sales.city_id,
          text: sales.city,
        }))

        // console.log('ceck tye res',this.locationsdata)
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