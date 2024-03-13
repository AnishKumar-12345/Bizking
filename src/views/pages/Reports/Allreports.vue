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
    <!-- <VCol
      cols="12"
      md="4"
    >
      <VCard
      title="Brand!"
      class="position-relative"
    >
      <VCardText>
        <h4 class="text-4xl font-weight-medium text-primary">
          2
        </h4>
        <p>🎉</p>
        <VBtn size="small" disabled>
          Get Reports 
        </VBtn>
      </VCardText> -->

      <!-- Triangle Background -->
       <!-- :src="triangleBg" -->
      <!-- <VImg
       
        class="triangle-bg flip-in-rtl"
      />
       <img src="@/assets/images/avatars/avatar-9.png" class="avatarg">
    </VCard>
    </VCol> -->

    <!-- <VCol
      cols="12"
      md="4"
    >
      <VCard
      title="Brand Products"
      class="position-relative"
    >
      <VCardText>
        <h4 class="text-4xl font-weight-medium text-primary">
          2
        </h4>
        <p>🎉</p>
        <VBtn size="small" disabled>
          Get Reports
        </VBtn>
      </VCardText> -->

      <!-- Triangle Background -->
      <!-- <VImg
        :src="triangleBg"
        class="triangle-bg flip-in-rtl"
      />
     <img src="@/assets/images/avatars/avatar-9.png" class="avatarg">
    </VCard>
    </VCol>

    <VCol
      cols="12"
      md="4" 
    >
      <VCard
      title="Merchant"
      class="position-relative"
    >
      <VCardText>
        <h4 class="text-4xl font-weight-medium text-primary">
          2
        </h4>
        <p>🎉</p>
        <VBtn size="small" disabled>
          Get Reports
        </VBtn>
      </VCardText> -->

      <!-- Triangle Background -->
      <!-- <VImg
        :src="triangleBg"
        class="triangle-bg flip-in-rtl"
      />
         <img src="@/assets/images/avatars/avatar-11.png" class="trophy">

    </VCard>
    </VCol> -->

    <VCol
      cols="12"
      md="4"
    >
      <VCard
      title="Sales"
      class="position-relative"
    >
      <VCardText>
        <h4 class="text-4xl font-weight-medium text-primary">
          2
        </h4>
        <p>🎉</p>
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
          2
        </h4>
        <p>🎉</p>
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
  </VRow>

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

              <!-- <VCol  
              v-if="reportsdata.date_filter == 'This Year' || reportsdata.date_filter == 'This Month'"
               md="6"
               cols="12"
               >
                <VTextField
                   v-model="reportsdata.start_date"                
                  type="date"
                  label="Start Date"
                  :min="today"
                />
              </VCol>
                <VCol  
                    v-if="reportsdata.date_filter == 'This Year' || reportsdata.date_filter == 'This Month'"
                 md="6"
                cols="12"
                >
                   <VTextField
                 v-model="reportsdata.end_date"  
                  type="date"
                  label="End Date"
                      :min="today"
                />
              </VCol> -->
           

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
          
                 <!-- <div style="max-width:400px;" >
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
              </div> -->
      <!-- <VTable
      
       :headers="headers"
      
        
      >
           
       <thead>
        <tr>
           <th class="text-center">
                        
                        </th>
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
      <tr v-for="(item,index) in this.paginatedItems" :key="index">
        <td class="text-center">
        
                          <VCheckbox v-model="item.selected"       
        ></VCheckbox>
                        </td>
       <td class="text-center">{{item.brand_name}}</td>
        <td  class="text-center">{{item.sku_name}}</td>
         <td  class="text-center">{{item.uom}}</td>
          <td  class="text-center"> &#8377;{{item.mrp}}</td>
           <td  class="text-center">
            <VTextField  
            v-model="item.margin"   style="min-width:80px;"  
              :rules="computedmarginRules()"
               @input="updatemargin()"
             
          />
           
            </td>
            
      </tr>
      </tbody>
         
        </VTable> 
        <VPagination
          v-model="page"
          :length="Math.ceil(filteredMerchant.length / pageSize)"
          @input="updatePagination"
        /> -->
              </VCol>

              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="validateForm1()">Get</VBtn>
                <!-- {{reportsMerchant}} -->
    <!-- <VueExcelXlsx
        :data="reportsMerchant"
        :columns="jsonfields"
        :file-name="'merchants'"
        :file-type="'xlsx'"
        :sheet-name="'sheetname'" 
    >
    <VIcon large color="primary">mdi-cloud-download</VIcon>
</VueExcelXlsx> -->
<!-- <VueExcelXlsx
      v-if="reportsMerchant.length > 0"
      :data="reportsMerchant"
      :columns="jsonfields"
      :file-name="'merchants'"
      :file-type="'xlsx'"
      :sheet-name="'sheetname'"
      style="cursor: pointer;"
      @click.stop="downloadExcel()"
    >
      <VIcon large color="primary">mdi-cloud-download</VIcon>
    </VueExcelXlsx> -->
                <!-- <VBtn @click="downloadReport">Download</VBtn> -->
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

     <VDialog
      v-model="dialog3"
      max-width="1000"
    >
   
      <VCard
        title="Sales"
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

export default {
  mixins: [servicescall],
  components: {
    // VueExcelXlsx,
  },

   data(){
    return{
      selectSales:null,
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
      
        loading:true,
        dialog2:false,
        dialog3:false,
        selectdatepicker:null,
        merchantName:[],
        reportsMerchant:[],
         selectAll: false,
        selectedmerchants:null,
          salesRules: [
              (v) => !!v || 'Sales is required',
            ],
          storeMerchant: [
            (v) => !!v || 'Store & Merchant is required',
          ],
          selectDate: [
            (v) => !!v || 'Select Date is required',
          ],
        reportsdata:{
                "merchant_id":"",
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
    // merchants(){
    //     return this.merchantName.map(a => a.merchant_uid
    //        );
    // },
   },
   mounted(){
    this.getMerchantdetails();
        setTimeout(() => {
              this.loading = false; // Set loading to false when the operation is complete
            }, 3000);
   },
   methods:{
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

    if(this.selectSales === "All"){
      this.selectSales = "all"
    }else if(this.selectSales === "Acknowledged"){
       this.selectSales = "3"
    }else if(this.selectSales === "Shipped"){
       this.selectSales = "4"
    }else if(this.selectSales === "Delivered"){
       this.selectSales = "5"
    }
  console.log('check ', this.selectSales );
   this.isProgress2 = true;
      this.salesstocksreport(this.selectSales).then((response)=>{
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
.trophy1 {
  position: absolute;
  inline-size: 6rem;
  inset-block-end: 0.5rem;
  inset-inline-end: 1rem;
}
.trophy4 {
  position: absolute;
  inline-size: 9rem;
  inset-block-end:  1rem;
  inset-inline-end: -1rem;
}
</style>
