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
                 <!-- @update:model-value="locationdetails()" -->
                  <VAutocomplete
                  v-model="locationdata"
                  label="Location"
                  :items="this.cityLoaction"               
                  item-value="value"
                  item-title="text"                
                  :menu-props="{ maxHeight: 200 }"                 
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
          v-for="(item, index) in this.filteredSAwisetarget"
          :key="index"
        >
         <td class="text-center">
            {{ index + 1 }}
          </td> 
         <td class="text-center">
            {{ item.city }}
          </td> 
         <td class="text-center">
            {{ item.trip_name }}
          </td> 
          <td class="text-center">{{ item.location }}</td>
          <td class="text-center">
            {{ item.delivery_person }}
          </td>         
          <td class="text-center">
            {{ item.sales_order_count }}
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
                       @click="editrow(item)"

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
           <VDialog
  v-model="dialog"
  max-width="400"
  persistent
>
   <VCard
        title="Assign Delivery Person"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                class="mt-4"
                ref="purchaseOrderForm"
              >
                <VRow>                
<!-- {{Deliverydata.delivery_person}} -->
                  <VCol
                    md="12"
                    cols="12"
                  >
                     <VAutocomplete
                      v-model="Deliverypersondata"
                      :items="this.deliveryPerson"
                        item-value="value"
                      item-title="text"                  
                      label="Assign Delivery Person"
                   :rules="person"
                    :menu-props="{ maxHeight: 200 }"
                    />
                  </VCol>
                  
                   <!-- <VCol
                    md="12"
                    cols="12"
                  >
                     <VTextField
                      v-model="Deliverydata.shipped_date"
                      type="date"
                      label="Start Date"
                      :min="today"
                      :rules="dater"
                    />
                  </VCol> -->
                  <VCol
                  md="12"
                    cols="12"
                  >
                    <VBtn @click="validateForm2">Save</VBtn> &nbsp;
                    <!-- @click="resetdetails" -->
                    <VBtn
                      color="secondary"
                      variant="tonal"
                      @click="closeDialog()"
                    >
                      Close
                    </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
   </VCard>
        </VDialog>

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
   return{
      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,
      Enddate:'',
      searchQuery:'',
      locationdata:'',
      cityID:'',
      loading:'',
      cityLoaction:[],
      person: [v => !!v || 'Assign Delivery Person is required'],
      headers: [
        { text: 'Serial No.', value: 'user_name' },

        { text: 'City', value: 'user_name' },
        { text: 'Trip Name', value: 'user_name' },
        { text: 'Location', value: 'merchant_uid' },
        { text: 'Driver Name', value: 'target_amount' },
        { text: 'Sales Order Count', value: 'achieved_target' },
        { text: 'Action', value: 'achieved_percentage' },
      ],
      AssignedPerson:[],
      deliveryPerson:[],
      Deliverypersondata:'',
      TripId:"",
      searchQuery: '',
      page: 1,
      pageSize: 10,
      dialog:false,
   }
  },
    computed: {
    filteredSAwisetarget() {
      const lowerCaseQuery = this.searchQuery.toLowerCase().trim()
      return this.AssignedPerson.filter(item => {
        return (
          (item.city && item.city.toLowerCase().includes(lowerCaseQuery)) ||
          (item.delivery_person && item.delivery_person.toLowerCase().includes(lowerCaseQuery)) ||       
          (item.location && item.location.toLowerCase().includes(lowerCaseQuery)) ||
          (item.sales_order_count && item.sales_order_count.toString().includes(lowerCaseQuery)) ||
          (item.trip_name && item.trip_name.toLowerCase().includes(lowerCaseQuery))
        )
      })
    },
    paginatedItems() {
      const startIndex = (this.page - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.filteredSAwisetarget.slice(startIndex, endIndex)
    },
  },
  mounted(){
    this.cityID = localStorage.getItem("city_id");

    this.handleBrandSelection();
  },
  methods:{      
    closeDialog(){
      this.dialog = false;
      this.Deliverypersondata = '';
    },
     editrow(id){ 
        // console.log("ids",id);
        this.TripId = id.trip_id;
        this.Getsalesperson( this.cityID,this.locationdata).then((response)=>{
          // console.log('getperson',response);
          if(response.data.status == 1){
            this.deliveryPerson = response.data.data.map(del => ({
            value: del.delivery_person,
            text: del.name
          }))            
            this.dialog = true;
            // this.SOid = id.so_id;
          }else{
            this.deliveryPerson = [];
            this.dialog = false;
          }
        })
      },

        validateForm2(){
        this.$refs.purchaseOrderForm.validate().then(valid => {
              // console.log("form valid", valid.valid);
              if (valid.valid == true) {
              
                this.Assigndelperson();
              }else{
                this.snackbar = true;
                  this.snackbarText = "Please give all mandatory fields"
                  this.color = "on-background";
              }
            }); 
      },
      Assigndelperson(){
        const postData = {
              "trip_id":this.TripId,
              "delivery_person":this.Deliverypersondata
        }
        // console.log({postData});
        this.Assigndeliveryperson(postData).then((response)=>{
        // console.log({response});
          if (response.data.status == 1) {
              // console.log({ response })
              // this.AssignedPerson = response.data.data;
              // this.viewSATragetsdata.reverse()    
              this.dialog = false;        
              this.snackbar = true;
              this.loading = false;
              this.color = 'primary'
              this.snackbarText = response.data.message;
              this.validateForm();
              this.Deliverypersondata = "";
              this.TripId = "";
            } else {
              // this.loading = false;
              this.snackbar = true;
              this.color = 'on-background';
              this.dialog = false;      

                //  this.AssignedPerson = [];
              this.snackbarText = response.data.message;
            }

        })
      },
    updatePagination(page) {
      this.page = page
    },
      validateForm() {
      this.$refs.tripform.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
          this.getAssignedview()
        } else {
          this.snackbar = true
          this.snackbarText = 'Please give all mandatory fields'
          this.color = 'on-background'
        }
      })
    },
getAssignedview(){
    this.loading = true;
        // this.filterlocation = false

        this.Assignedpersondata(this.locationdata,this.Enddate)
          .then(response => {
            if (response.data.status == 1) {
              // console.log({ response })
              this.AssignedPerson = response.data.data;
              // this.viewSATragetsdata.reverse()            
              this.snackbar = true;
              this.loading = false;
              this.color = 'primary'
              this.snackbarText = response.data.message
            } else {
              this.loading = false;
              this.snackbar = true;
              this.color = 'on-background'
                 this.AssignedPerson = [];
              this.snackbarText = response.data.message;
            }
          })
},
      handleBrandSelection(){
        // console.log('check hjandle',id);
        this.getCitylocation(this.cityID).then((response)=>{
          // console.log('check the response',response);
        this.cityLoaction = response.data.data.map(sales => ({
                  value: sales.location_id,
                  text: sales.location
              }))
              // console.log('ceck tye res',this.cityLoaction);
            })
            
       },

  }


 
}
</script>
<style></style>
