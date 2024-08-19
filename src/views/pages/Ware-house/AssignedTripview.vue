<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard
          title="View Assigned Trips"
          class="mb-4"
        >
          <VCardText>
            <!-- 👉 Form -->
            <VForm
              class="mt-6"
              ref="tripform"
            >
              <VRow>
              

                <VCol
                  cols="12"
                  md="6"
                >
                  <VAutocomplete
                   :items="['Uppal', 'Pragatinagar']"
                    
                    label="Warehouse Location"
                   

                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    type="date"
                    label="End Date"
                    v-model="Enddate"
                    :rules="endr"

                  />
                </VCol>
                <!-- {{this.Importcsv}} -->

                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                 
                >
                  <VBtn  @click="validateForm">Get</VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    
    <div style="max-width: 400px">
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
          />
        </div>
        <div class="loading">
          <div class="effect-1 effects"></div>
          <div class="effect-2 effects"></div>
          <div class="effect-3 effects"></div>
        </div>
      </div>
    </div>
    <!-- <VRow v-if="this.filteredPurchaseHistory == null">
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
     </VRow> -->

    <VTable
      :headers="headers"
      :items="this.paginatedItems"
      item-key="dessert"
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
   <tr
          v-for="(item, index) in this.desserts"
          :key="index"
        >
         <td class="text-center">
            {{ item.dessert }}
          </td> 
          <td class="text-center">{{ item.calories }}</td>
          <td class="text-center">
            {{ item.fat }}
          </td>         
          <td class="text-center">
            {{ item.carbs }}
          </td> 
          <td class="text-center">
             <V-btn
                  icon
                  variant="text"
                  color="default"
                  class="mb-1 mt-2"
                  size="x-small"
                
               
                  >
                  
                      <VIcon
                        icon="ri-pencil-line"
                        size="22"        
                        color="#BA8B32"       
                        />   
                      </V-btn> 

                       <VBtn
         
              icon
              variant="text"
              color="default"
              class="me-2"
              size="x-small"
           
            >
              <VIcon
                color="success"
                icon="basil:eye-outline"
                size="22"
              />
            </VBtn>
          </td>
   </tr>
</tbody>
      
    </VTable>
  
  </div>
</template>
<script>
import servicescall from '@/Services'

export default {
  mixins: [servicescall],

  data() {
   return{
    searchQuery:'',
      headers: [
        { text: 'Trip Name', value: 'user_name' },
        { text: 'Location', value: 'merchant_uid' },
        { text: 'Driver Name', value: 'target_amount' },
        { text: 'Sales Order Count', value: 'achieved_target' },
        { text: 'Action', value: 'achieved_percentage' },     

      ],
       desserts :  [
  {
    dessert: 'Uppal Route1',
    calories: 'Uppal',
    fat: 'Driver 1',
    carbs: 10,
    
  },
  {
     dessert: 'Uppal Route2',
    calories: 'Uppal',
    fat: 'Driver 2',
    carbs: 11,
  },
  {
  dessert: 'Uppal Route3',
    calories: 'Uppal',
    fat: 'Driver 3',
    carbs: 15,
  },
  {
 dessert: 'Uppal Route4',
    calories: 'Uppal',
    fat: 'Driver 4',
    carbs: 18,
  },
  {
    dessert: 'Uppal Route5',
    calories: 'Uppal',
    fat: 'Driver 5',
    carbs: 13,
  },
]
   }
  },
  


 
}
</script>
<style></style>
