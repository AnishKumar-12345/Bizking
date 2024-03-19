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
<!-- Merchant Products report -->
    <VCol
      cols="12"
      md="4"
    >
       <VCard
      title="Merchant Products"
      class="position-relative"
    >
      <VCardText>
        <h4 class="text-4xl font-weight-medium text-primary">
                  <VIcon size="50" start icon="line-md:downloading-loop" />

        </h4> <br>
        <!-- <p>🎉</p> -->
        <VBtn size="small" @click="openMPR()">
          Get Reports
        </VBtn>
      </VCardText>

      <!-- Triangle Background -->
      <VImg
        :src="triangleBg"
        class="triangle-bg flip-in-rtl"
      />
        <img src="@/assets/images/avatars/avatar-14.png"  class="trophy2">

    </VCard>
    </VCol>  

<!-- Merchant Product Sales report -->
    <VCol
      cols="12"
      md="4"
    >
       <VCard
      title="Merchant Product Sales"
      class="position-relative"
    >
      <VCardText>
        <h4 class="text-4xl font-weight-medium text-primary">
         <VIcon size="50" start icon="line-md:downloading-loop" />

        </h4> <br>
        <!-- <p>🎉</p> -->
        <VBtn size="small" @click="openMPS()">
          Get Reports
        </VBtn>
      </VCardText>

      <!-- Triangle Background -->
      <VImg
        :src="triangleBg"
        class="triangle-bg flip-in-rtl"
      />
        <img src="@/assets/images/avatars/avatar-16.png" class="trophy4">

    </VCard>
    </VCol>   

<!-- Merchant Stock Inventory report -->
    <VCol
      cols="12"
      md="4"
    >
       <VCard
      title="Merchant Stock Inventory"
      class="position-relative"
    >
      <VCardText>
        <h4 class="text-4xl font-weight-medium text-primary">
                  <VIcon size="50" start icon="line-md:downloading-loop" />

        </h4> <br>
        <!-- <p>🎉</p> -->
        <VBtn size="small" @click="openMSI()">
          Get Reports
        </VBtn>
      </VCardText>

      <!-- Triangle Background -->
      <VImg
        :src="triangleBg"
        class="triangle-bg flip-in-rtl"
      />
        <img src="@/assets/images/avatars/avatar-11.png"  class="trophy">

    </VCard>
    </VCol>  

<!-- sales orders report -->
    <VCol
      cols="12"
      md="4"
    >
      <VCard
      title="Sales Orders"
      class="position-relative"
    >
      <VCardText>
        <h4 class="text-4xl font-weight-medium text-primary">
                  <VIcon size="50" start icon="line-md:downloading-loop" />

        </h4> <br>
        <!-- <p>🎉</p> -->
        <VBtn size="small"  @click="openSales()">
          Get Reports
        </VBtn>
      </VCardText>

      <!-- Triangle Background -->
      <VImg
        :src="triangleBg"
        class="triangle-bg flip-in-rtl"
      />
    <img src="@/assets/images/avatars/avatar-15.png" class="trophy1">
      <img :src="avatarg" class="avatarg">
    </VCard>
    </VCol> 

<!-- Warehouse Stock Inventory report -->
     <VCol
      cols="12"
      md="4"
    >
       <VCard
      title="Warehouse Stock Inventory"
      class="position-relative"
    >
      <VCardText>
        <h4 class="text-4xl font-weight-medium text-primary">
                  <VIcon size="50" start icon="line-md:downloading-loop" />

        </h4> <br>
        <!-- <p>🎉</p> -->
        <VBtn size="small" @click="openWSI()">
          Get Reports
        </VBtn>
      </VCardText>

      <!-- Triangle Background -->
      <VImg
        :src="triangleBg"
        class="triangle-bg flip-in-rtl"
      />
        <img src="@/assets/images/avatars/avatar-9.png"  class="trophy">

    </VCard>
    </VCol>  

<!-- Brand Products report -->
    <VCol
        cols="12"
        md="4"
      >
        <VCard
        title="Brand Products"
        class="position-relative"
      >
        <VCardText>
          <h4 class="text-4xl font-weight-medium text-primary">
                    <VIcon size="50" start icon="line-md:downloading-loop" />

          </h4> <br>
          <!-- <p>🎉</p> -->
          <VBtn size="small" @click="openBrand()">
            Get Reports
          </VBtn>
        </VCardText>

        <!-- Triangle Background -->
        <VImg
          :src="triangleBg"
          class="triangle-bg flip-in-rtl"
        />
          <img src="@/assets/images/avatars/avatar-10.png"  class="trophy">

      </VCard>
    </VCol>  

<!-- Purchase Orders -->
    <!-- <VCol
        cols="12"
        md="4"
      >
        <VCard
        title="Purchase Orders"
        class="position-relative"
      >
        <VCardText>
          <h4 class="text-4xl font-weight-medium text-primary">
                    <VIcon size="50" start icon="line-md:downloading-loop" />

          </h4> <br>
       
          <VBtn size="small" @click="openPurchase()">
            Get Reports
          </VBtn>
        </VCardText>

   
        <VImg
          :src="triangleBg"
          class="triangle-bg flip-in-rtl"
        />
          <img src="@/assets/images/avatars/avatar-12.png"  class="trophy5">

      </VCard>
    </VCol>   -->

  </VRow>

<!-- Merchant Product Sales Dialog -->
    <VDialog
      v-model="dialog2"
      max-width="1000"
    >
   
      <VCard
        title="Merchant Product Sales"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
             <VForm class="mt-6" ref="purchaseOrderForm1">
            <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">
           
            </VCheckbox> -->
            <VRow>
    
              <VCol
                md="6"
                cols="12"
              >
        
               
                <VAutocomplete
                  v-model="selectedmerchants"
                  :items="merchantName" 
                   item-value="value"
                  item-title="text"
                  :rules="storeMerchant"
                  label="Store or Merchant"
                  :menu-props="{ maxHeight: 200 }"        
                  no-underline
                  v-if="!selectAll"
                />
                 <VTextField
                    v-model="selectedmerchants"
                    label="Store or Merchant"
                    v-if="selectAll" 
                    disabled
                  />
              </VCol>
               <VCol   
                md="6"
                cols="12"
                >
                <!-- this_year this_month -->
                   <VSelect 
                   :rules="selectDate"
                   v-model="reportsdata.date_filter"
                   :items="['Custom','Current Year','Current Month']"
                   label="Select Date"
               
                />
              </VCol>         
           

             <VCol   
               v-if="reportsdata.date_filter == 'Custom'"
               md="6"
               cols="12"
               >
                <VTextField
                  v-model="reportsdata.start_date"                
                  type="date"
                  label="Start Date"
                  :min="minDate"
                  :max="maxDate"
                />
              </VCol>
                <VCol  
                v-if="reportsdata.date_filter == 'Custom'"                 
                 md="6"
                cols="12"
                >
               <VTextField
                  v-model="reportsdata.end_date"  
                  type="date"
                  label="End Date"
                  :min="minDate1"
                  :max="maxDate1"
                />
              </VCol>    


              <VDivider />                 
              <VCol cols="12">         
                 
              </VCol>

              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="validateForm1()">Get</VBtn>
                
                <VBtn @click="closereport()">Close</VBtn>

                <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                <VProgressCircular
                :size="50"
                color="primary"
                indeterminate
                v-show="isProgress"
              >
              </VProgressCircular>

              
              </VCol>
             
            </VRow>
          </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

<!-- sales orders Dialog -->
     <VDialog
      v-model="dialog3"
      max-width="1000"
    >
   
      <VCard
        title="Sales Orders"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
             <VForm class="mt-6" ref="purchaseOrderForm2">
            <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">
           
            </VCheckbox> -->
            <VRow>  
              
               <VCol   
                md="6"
                cols="12"
                >
                <!-- this_year this_month -->
                   <VSelect 
                  v-model="selectSales"
                   :items="['All','Acknowledged','Shipped','Delivered']"
                   label="Select"
               :rules="salesRules"
                />
              </VCol>

            

              <VDivider />                
             

              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="validateForm2()">Get</VBtn>
               
                <VBtn @click="closeSales()">Close</VBtn>

                <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                <VProgressCircular
                :size="50"
                color="primary"
                indeterminate
                v-show="isProgress2"
              >
              </VProgressCircular>

              
              </VCol>
             
            </VRow>
          </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

<!-- Merchant Stock Inventory Dialog -->
    <VDialog
        v-model="dialog4"
        max-width="1000"
      >
    
        <VCard
          title="Merchant Stock Inventory"
          class="mb-2"
        >
          <VCardText>
            <VRow>
              <VCol cols="12">
                <!-- 👉 Form -->
              <VForm class="mt-6" ref="purchaseOrderForm3">
              <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">
            
              </VCheckbox> -->
              <VRow>
      
                <VCol
                  md="6"
                  cols="12"
                >
          
                
                  <VAutocomplete
                    v-model="selectedmerchants2"
                    :items="merchantName" 
                    item-value="value"
                    item-title="text"
                    :rules="storeMerchant"
                    label="Store or Merchant"
                    :menu-props="{ maxHeight: 200 }"        
                    no-underline
                  
                  />
                
                </VCol>           

              
            

                


                <VDivider />                 
              

                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn @click="validateForm3()">Get</VBtn>
          
                  <VBtn @click="closemreport()">Close</VBtn>

                  <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                  <VProgressCircular
                  :size="50"
                  color="primary"
                  indeterminate
                  v-show="isProgress3"
                >
                </VProgressCircular>

                
                </VCol>
              
              </VRow>
            </VForm>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
    </VDialog>

<!-- Warehouse Stock Inventory Dialog -->
    <VDialog
        v-model="dialog5"
        max-width="1000"
      >
    
        <VCard
          title="Warehouse Stock Inventory"
          class="mb-2"
        >
          <VCardText>
            <VRow>
              <VCol cols="12">
                <!-- 👉 Form -->
              <VForm class="mt-6" ref="purchaseOrderForm4">
              <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">
            
              </VCheckbox> -->
              <VRow>
      
                <VCol
                  md="6"
                  cols="12"
                >
          
                
                  <VAutocomplete
                    v-model="selectedBrand"
                    :items="Brandname" 
                    item-value="value"
                    item-title="text"
                    :rules="storeBrand"
                    label="Brand Names"
                    :menu-props="{ maxHeight: 200 }"        
                    no-underline                
                  />
                
                </VCol>           

              
            

                


                <VDivider />                 
              

                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn @click="validateForm4()">Get</VBtn>
          
                  <VBtn @click="closewreport()">Close</VBtn>

                  <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                  <VProgressCircular
                  :size="50"
                  color="primary"
                  indeterminate
                  v-show="isProgress4"
                >
                </VProgressCircular>

                
                </VCol>
              
              </VRow>
            </VForm>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
    </VDialog>

<!-- Brand Products Dialog -->
    <VDialog
        v-model="dialog6"
        max-width="1000"
      >
    
        <VCard
          title="Brand Products"
          class="mb-2"
        >
          <VCardText>
            <VRow>
              <VCol cols="12">
                <!-- 👉 Form -->
              <VForm class="mt-6" ref="purchaseOrderForm5">
              <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">           
              </VCheckbox> -->
              <VRow>
      
                <VCol
                  md="6"
                  cols="12"
                >
          
                
                  <VAutocomplete
                    v-model="selectedBrand2"
                    :items="Brandname" 
                    item-value="value"
                    item-title="text"
                    :rules="storeBrand"
                    label="Brand Names"
                    :menu-props="{ maxHeight: 200 }"        
                    no-underline                
                  />
                
                </VCol>        

                <VDivider />              
              

                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn @click="validateForm5()">Get</VBtn>
          
                  <VBtn @click="closeBreport()">Close</VBtn>

                  <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                  <VProgressCircular
                  :size="50"
                  color="primary"
                  indeterminate
                  v-show="isProgress4"
                >
                </VProgressCircular>

                
                </VCol>
              
              </VRow>
            </VForm>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
    </VDialog>

<!-- Merhant Products Dialog -->
    <VDialog
        v-model="dialog7"
        max-width="1000"
      >
    
        <VCard
          title="Merchant Products "
          class="mb-2"
        >
          <VCardText>
            <VRow>
              <VCol cols="12">
                <!-- 👉 Form -->
              <VForm class="mt-6" ref="purchaseOrderForm6">
              <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">
            
              </VCheckbox> -->
              <VRow>
      
                <VCol
                  md="6"
                  cols="12"
                >
          
                
                  <VAutocomplete
                    v-model="selectedmerchants3"
                    :items="merchantName" 
                    item-value="value"
                    item-title="text"
                    :rules="storeMerchant"
                    label="Store or Merchant"
                    :menu-props="{ maxHeight: 200 }"        
                    no-underline
                  
                  />
                
                </VCol>           

              
            

                


                <VDivider />                 
              

                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn @click="validateForm6()">Get</VBtn>
          
                  <VBtn @click="closeMPreport()">Close</VBtn>

                  <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                  <VProgressCircular
                  :size="50"
                  color="primary"
                  indeterminate
                  v-show="isProgress6"
                >
                </VProgressCircular>

                
                </VCol>
              
              </VRow>
            </VForm>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
    </VDialog>

<!-- sales orders Dialog -->
     <VDialog
      v-model="dialog8"
      max-width="1000"
    >
   
      <VCard
        title="Purchase Orders"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
             <VForm class="mt-6" ref="purchaseOrderForm7">
            <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">
           
            </VCheckbox> -->
            <VRow>  
              
               <VCol   
                md="6"
                cols="12"
                >
                <!-- this_year this_month -->
                   <VSelect 
                  v-model="selectPurchase"
                   :items="['All','Acknowledged','Shipped','Delivered']"
                   label="Select"
               :rules="salesRules"
                />
              </VCol>

             <VCol   
                md="6"
                cols="12"
                >
                <!-- this_year this_month -->
                   <VSelect 
                   :rules="selectDate"
                   v-model="Purchasedata.date_filter"
                   :items="['Custom','Current Year','Current Month']"
                   label="Select Date"
               
                />
              </VCol>         
           

             <VCol   
               v-if="Purchasedata.date_filter == 'Custom'"
               md="6"
               cols="12"
               >
                <VTextField
                  v-model="Purchasedata.start_date"                
                  type="date"
                  label="Start Date"
                  :min="minDate"
                  :max="maxDate"
                />
              </VCol>
                <VCol  
                v-if="Purchasedata.date_filter == 'Custom'"                 
                 md="6"
                cols="12"
                >
               <VTextField
                  v-model="Purchasedata.end_date"  
                  type="date"
                  label="End Date"
                  :min="minDate1"
                  :max="maxDate1"
                />
              </VCol>    

 
            

              <VDivider />                
             

              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="validateForm7()">Get</VBtn>
               
                <VBtn @click="closePurchase()">Close</VBtn>

                <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                <VProgressCircular
                :size="50"
                color="primary"
                indeterminate
                v-show="isProgress7"
              >
              </VProgressCircular>

              
              </VCol>
             
            </VRow>
          </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

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
// import VueExcelXlsx from 'vue-excel-xlsx';
import { useTheme } from 'vuetify'
import triangleDark from '@/assets/images/misc/triangle-dark.png'
import triangleLight from '@/assets/images/misc/triangle-light.png'
export default {
  mixins: [servicescall],
  components: {
    // VueExcelXlsx,
  },

   data(){
    return{
      selectSales:null,
      selectPurchase:null,

      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,

      isProgress:false,
      isProgress2:false,
      isProgress3:false,
      isProgress4:false,
      isProgress5:false,
      isProgress6:false,
      isProgress7:false,

      
        loading:true,
        dialog2:false,
        dialog3:false,
        dialog4:false,
        dialog5:false,
        dialog6:false,
        dialog7:false,
        dialog8:false,

        selectdatepicker:null,
        merchantName:[],
        reportsMerchant:[],
        selectAll: false,
        selectedmerchants:null,
        selectedmerchants2:null,
        selectedmerchants3:null,

        selectedBrand:null,
        selectedBrand2:null,

          salesRules: [
              (v) => !!v || 'Sales is required',
            ],
          storeMerchant: [
            (v) => !!v || 'Store & Merchant is required',
          ],
          selectDate: [
            (v) => !!v || 'Select Date is required',
          ],
          storeBrand:[
            (v) => !!v || 'Brand Name is required',

          ],
         reportsdata:{
                "merchant_id":"",
                "date_filter":"",
                "start_date":"",
                "end_date":""
            },
            Purchasedata:{
             
                "date_filter":"",
                "start_date":"",
                "end_date":""
            },
                today: this.getFormattedDate(new Date()),
                todays: this.getFormattedDates(new Date()),
                maxDate: this.getFormattedDate(new Date()), 
                minDate: '1900-01-01', 
                maxDate1: this.getFormattedDate(new Date()), 
                minDate1: '1900-01-01', 

        jsonfields: [
          {
            label: "Closing",
            field: "Closing",
          },
         {
          label: "Date",
          field: "Date",
          },
         {
          label: "Merchant Name",
          field: "Merchant Name",
         },
         {
          label: "Merchant UID",
          field: "Merchant UID",
         },
         {
          label: "Opening",
          field: "Opening",
          },
         {
          label: "Physical SOH",
          field: "Physical SOH",
          },
         {
          label: "SA Name",
          field: "SA Name",
         },
         {
          label: "SKU Name",
          field: "SKU Name",
          },
         {
          label: "Sale",
          field: "Sale",
         },
      ],
    }
   },
   watch: {
  'reportsdata.start_date': function(newDate) {
    // Update maxDate to disable future dates after selecting a start date
    this.maxDate = newDate ? newDate : this.getFormattedDate(new Date());
  }
},
  computed:{
    vuetifyTheme(){
      return useTheme();
    },
    triangleBg(){
  return this.vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark

    }
  },
   mounted(){
    this.getMerchantdetails();
    this.getBrandsdata();
        setTimeout(() => {
              this.loading = false; // Set loading to false when the operation is complete
            }, 3000);
   },
   methods:{
    openPurchase(){
            this.dialog8 = true; 

    },
    closePurchase(){
            this.dialog8 = false; 
            this.selectPurchase = "";
    },
     validateForm6(){
      this.$refs.purchaseOrderForm6.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
         
          this.getMerchantProductsreport();
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      }); 
    },
 getMerchantProductsreport(){
               this.isProgress6 = true;

        this.getMProductsreport(this.selectedmerchants3).then((response)=>{
          // console.log(response);
           

        if(response.data.status == 0){
               this.isProgress6 = false;
            this.dialog7 = false; 
           
            this.selectedBrand2="";
           this.snackbar = true;
            this.color = "on-background";
            this.snackbarText = response.data.message;
            
        }else{
           this.isProgress6 = false;
            this.dialog7 = false;   
            
          //  this.loading = true;
            // this.reportsdata={};
            this.selectedmerchants3="";
        //  console.log('length',response.data.length);
            const blob = new Blob([response.data], { type: 'text/csv' });

        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Merchant Products Report.csv'); // Set the file name here

        // Append the link to the body
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Clean up - remove the link and revoke the URL
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);

        // console.log('CSV data:', response.data);
          this.snackbar = true;
            this.color = "primary";
            this.snackbarText = "Reports downloaded successfully.";
        }
    
    })
    },

    closeMPreport(){
      this.dialog7=false;
      this.selectedmerchants3='';
    },
    openMPR(){
      this.dialog7=true;
    },
    openBrand(){
      this.dialog6=true;
    },
    closeBreport(){
      this.dialog6=false;
      this.selectedBrand2='';
    },
     validateForm5(){
      this.$refs.purchaseOrderForm5.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
         
          this.getbrandsreport();
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      }); 
    },
 getbrandsreport(){
               this.isProgress5 = true;

        this.getBrandsallreport(this.selectedBrand2).then((response)=>{
          // console.log(response);
           

        if(response.data.status == 0){
               this.isProgress5 = false;
            this.dialog6 = false; 
           
            this.selectedBrand2="";
           this.snackbar = true;
            this.color = "on-background";
            this.snackbarText = response.data.message;
            
        }else{
           this.isProgress5 = false;
            this.dialog6 = false;   
            
          //  this.loading = true;
            // this.reportsdata={};
            this.selectedBrand2="";
        //  console.log('length',response.data.length);
            const blob = new Blob([response.data], { type: 'text/csv' });

        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Brand Report.csv'); // Set the file name here

        // Append the link to the body
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Clean up - remove the link and revoke the URL
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);

        // console.log('CSV data:', response.data);
          this.snackbar = true;
            this.color = "primary";
            this.snackbarText = "Reports downloaded successfully.";
        }
    
    })
    },

     validateForm4(){
      this.$refs.purchaseOrderForm4.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
         
          this.getwarehousestockreport();
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      }); 
    },
 getwarehousestockreport(){
               this.isProgress4 = true;

        this.getBrandreports(this.selectedBrand).then((response)=>{
          // console.log(response);
           

        if(response.data.status == 0){
               this.isProgress4 = false;
            this.dialog4 = false; 
           
            this.selectedBrand="";
           this.snackbar = true;
            this.color = "on-background";
            this.snackbarText = response.data.message;
            
        }else{
           this.isProgress4 = false;
            this.dialog5 = false;   
            
          //  this.loading = true;
            // this.reportsdata={};
            this.selectedBrand="";
        //  console.log('length',response.data.length);
            const blob = new Blob([response.data], { type: 'text/csv' });

        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Warehouse Stock Inventory Report.csv'); // Set the file name here

        // Append the link to the body
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Clean up - remove the link and revoke the URL
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);

        // console.log('CSV data:', response.data);
          this.snackbar = true;
            this.color = "primary";
            this.snackbarText = "Reports downloaded successfully.";
        }
    
    })
    },

    getBrandsdata(){
      this.getBrands().then((response)=>{       
     
         this.Brandname = [
          { value: "all", text: "All" },
          ...response.data.map(brand => ({
            value: brand.brand_id,
            text: brand.brand_name
          }))
        ];
        console.log('check the response', this.Brandname);
      })
    },
    closewreport(){
      this.dialog5=false;
      this.selectedBrand='';
    },
  openWSI(){
      this.dialog5=true;
  },
    closemreport(){
      this.dialog4=false;
      this.selectedmerchants2="";

    },
    openMSI(){
      this.dialog4=true;
    },
      validateForm1(){
      this.$refs.purchaseOrderForm1.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
         
          this.getReport();
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      }); 
    },
      validateForm2(){
      this.$refs.purchaseOrderForm2.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
         
          this.getSales();
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      }); 
    },

      validateForm3(){
      this.$refs.purchaseOrderForm3.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
         
          this.getMerchantsreport();
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      }); 
    },     


  getMerchantsreport(){
               this.isProgress3 = true;

        this.getMerchantstocksreport(this.selectedmerchants2).then((response)=>{
          // console.log(response);
           

        if(response.data.status == 0){
               this.isProgress3 = false;
            this.dialog4 = false; 
           
            this.selectedmerchants2="";
           this.snackbar = true;
            this.color = "on-background";
            this.snackbarText = response.data.message;
            
        }else{
           this.isProgress3 = false;
            this.dialog4 = false;   
            
          //  this.loading = true;
            this.reportsdata={};
            this.selectedmerchants2="";
         
            const blob = new Blob([response.data], { type: 'text/csv' });

        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Merchant Stock Inventory Report.csv'); // Set the file name here

        // Append the link to the body
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Clean up - remove the link and revoke the URL
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);

        // console.log('CSV data:', response.data);
          this.snackbar = true;
            this.color = "primary";
            this.snackbarText = "Reports downloaded successfully.";
        }
    
    })
    },
    openSales(){
      this.dialog3 = true;
    },
    closeSales(){
      this.dialog3 = false;
      this.selectSales = null
    },
    getFormattedDates(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
},
    closereport(){
      this.dialog2=false;
      this.reportsdata = {};
      this.selectedmerchants = '';
    },
    //   selectAllMerchants() {
    //   if (this.selectAll) {
    //     // Select all merchants
    //     this.selectedmerchants = "all";
    //   } else {
    //     // Deselect all merchants
    //     this.selectedmerchants = [];
    //   }
    // },
      selectAllMerchants() {
      if (this.selectAll) {
        // Selecting all merchants including "All"
        this.selectedmerchants = ["all", ...this.merchantName.map(merchant => merchant.value)];
      } else {
        // Deselecting all merchants
        this.selectedmerchants = [];
      }
    },
      getFormattedDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    downloadExcel(){
      console.log('download excel',)
    },
    // downloadReport(){
    //     if (this.reportsMerchant.length === 0) {
    //     alert("No data to download.");
    //     return;
    //   }

    //   // Format data for Excel
    //   const formattedData = this.reportsMerchant.map(item => ({
    //     "Closing": item.Closing,
    //     "Date": item.Date,
    //     "Merchant Name": item['Merchant Name'],
    //     "Merchant UID": item['Merchant UID'],
    //     "Opening": item.Opening,
    //     "Physical SOH": item['Physical SOH'],
    //     "SA Name": item['SA Name'],
    //     "SKU Name": item['SKU Name'],
    //     "Sale": item.Sale
    //   }));

    //   // Use VueExcelXlsx component to trigger download
    //   this.$refs.exportExcel.exportAsExcel({
    //     data: formattedData,
    //     columns: this.jsonfields,
    //     fileName: 'reportsMerchant',
    //     sheetName: 'Sheet1',
    //   });
    // },
   getSales(){

// if (this.dialog3) {
//     this.dialog3 = false;
//     return; // Exit the method to prevent further execution
//   }

    // if(this.selectSales === "All"){
    //   this.selectSales = "all"
    // }else if(this.selectSales === "Acknowledged"){
    //    this.selectSales = "3"
    // }else if(this.selectSales === "Shipped"){
    //    this.selectSales = "4"
    // }else if(this.selectSales === "Delivered"){
    //    this.selectSales = "5"
    // }

     const statusMapping = {
            'All': "all",
            'Acknowledged': "3",
            'Shipped': "4",
            'Delivered': "5",          
          };

  console.log('check ', statusMapping[this.selectSales] );
   this.isProgress2 = true;
      this.salesstocksreport(statusMapping[this.selectSales]).then((response)=>{
        console.log('check the response',response);
          if(response.data.status == 0){
               this.isProgress2 = false;
            this.dialog3 = false;   
             this.selectSales=null;
           
           this.snackbar = true;
            this.color = "on-background";
            this.snackbarText = response.data.message;
            
        }else{
           this.isProgress2 = false;
            this.dialog3 = false;   
              this.selectSales=null;
          //  this.loading = true;
         
            // this.reportsMerchant = response.data;
            const blob = new Blob([response.data], { type: 'text/csv' });

        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Sales Report.csv'); // 
        document.body.appendChild(link);
       
        link.click();

       
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);

        
          this.snackbar = true; 
            this.color = "primary";
            this.snackbarText = "Reports downloaded successfully.";
        }
      })
   },
    getReport(){
        // const postdata = {
        //      "merchant_id":this.selectedmerchants,
        //         "date_filter":this.reportsdata.date_filter,
        //         "start_date":this.reportsdata.start_date,
        //         "end_date":this.reportsdata.end_date
        // }
       
    if (this.reportsdata.date_filter === 'Custom') {
            this.reportsdata.date_filter = "custom";
          } else if (this.reportsdata.date_filter === 'Current Year') {
            this.reportsdata.date_filter = "this_year";
            this.reportsdata.start_date = this.getFormattedDate(new Date())
             this.reportsdata.end_date = this.getFormattedDate(new Date())
          } else if (this.reportsdata.date_filter === 'Current Month') {
            this.reportsdata.date_filter = "this_month";
               this.reportsdata.start_date = this.getFormattedDate(new Date())
             this.reportsdata.end_date = this.getFormattedDate(new Date())
          }
          // console.log('check the res',this.reportsdata.date_filter,this.selectedmerchants,this.reportsdata.start_date, this.reportsdata.end_date);
            this.isProgress = true;

        this.storestocksreport(this.selectedmerchants,this.reportsdata.date_filter,this.reportsdata.start_date,this.reportsdata.end_date).then((response)=>{
          // console.log(response);
           

        if(response.data.status == 0){
               this.isProgress = false;
            this.dialog2 = false;   
             this.reportsdata={};
            this.selectedmerchants="";
           this.snackbar = true;
            this.color = "on-background";
            this.snackbarText = response.data.message;
            
        }else{
           this.isProgress = false;
            this.dialog2 = false;   
            
          //  this.loading = true;
            this.reportsdata={};
            this.selectedmerchants="";
            this.reportsMerchant = response.data;
            const blob = new Blob([response.data], { type: 'text/csv' });

        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Merchant Report.csv'); // Set the file name here

        // Append the link to the body
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Clean up - remove the link and revoke the URL
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);

        // console.log('CSV data:', response.data);
          this.snackbar = true;
            this.color = "primary";
            this.snackbarText = "Reports downloaded successfully.";
        }
    
    })

    },
    openMPS(){
        this.dialog2 = true;     
    },
     getMerchantdetails(){
      this.getMerchants().then((response)=>{
        // console.log('mer',response)
        // this.merchantName = response.data.data;
         this.merchantName = [
          { value: "all", text: "All" },
          ...response.data.data.map(brand => ({
            value: brand.merchant_id,
            text: brand.merchant_uid
          }))
        ];
        console.log('mer',this.merchantName);
      })
     },
   }
}
</script>

<style lang="scss">
.triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.avatarg {
  position: absolute;
  inline-size: 7rem;
  inset-block-end: -1rem;
  inset-inline-end: 0.8rem;
}
.trophy {
  position: absolute;
  inline-size: 5.8rem;
  inset-block-end: -1rem;
  inset-inline-end: -1rem;
}
.trophy1 {
  position: absolute;
  inline-size: 6rem;
  inset-block-end: 0.5rem;
  inset-inline-end: 1rem;
}
.trophy2{
  position: absolute;
  inline-size: 12rem;
  inset-block-end: -1rem;
  inset-inline-end: -1rem;
}
.trophy4 {
  position: absolute;
  inline-size: 9rem;
  inset-block-end: 0.9rem;
  inset-inline-end: -2rem;
}
.trophy5{
    position: absolute;
  inline-size: 5rem;
  inset-block-end: -1rem;
  inset-inline-end: 2rem;
}
</style>
