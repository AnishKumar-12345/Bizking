<template>
   <div>

       <div v-if="loading" id="app">
      <div id="loading-bg">
        <div class="loading-logo">
          <img src="../../../assets/images/logos/comlogo.jpeg" height="60" width="68" alt="Logo" />
        </div>
        <div class="loading">
          <div class="effect-1 effects"></div>
          <div class="effect-2 effects"></div>
          <div class="effect-3 effects"></div>
        </div>
      </div>
    </div>
<div style="max-width:400px">
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
    <!-- {{selectedItem.user_id}} -->
     <VForm class="mt-6" ref="purchaseOrderForm">
           
            <VRow>
             <!-- <VCol
                cols="12"
                md="6"
              >
            
                <VTextField
                  v-model="CreatedDate"
                  type="date"
                  label="Order Date"
                  :min="today"
                  :rules="dateRules"
                  
                />
              </VCol> -->
              <VCol
               
                cols="12"
              >
                 <VTable 
              :headers="headers"
                :items="oppitems"
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
       <tr
        v-for="(item,index) in paginatedItems"
        :key="index"

         
      >      
       <td class="text-center">
            <!-- Checkbox -->
            <!-- {{item.selected}} -->
            <VCheckbox
              v-model="item.selected"
           
              color="primary"
            ></VCheckbox>
          </td> 
        <td class="text-center">{{ item.brand_name }}</td>

        <td class="text-center">{{ item.sku_name }}</td>
        <td class="text-center">
          {{ item.uom }}
        </td>
         <td class="text-center">
          {{ item.pitch_from }}
        </td>
   <td class="text-center">{{ item.final_ret }}</td>
       
          <td class="text-center">
            <!-- Select Field -->
            <VTextField
              v-model="item.sa_given_margin"                       
             :rules="computedRules(item)"
              
            />
          </td>
       
      </tr>
      </tbody>        
                 </VTable>
                 
              </VCol>


              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
              <!-- {{selectedItem.status}} -->
                <VBtn @click="validateForm()" v-show="selectedItem.status != 'close'">Save</VBtn>
                 <VProgressCircular
                  :size="50"
                  color="primary"
                  indeterminate
                  v-show="isProgress"
                >
                </VProgressCircular>
                <!-- <VBtn 
                  color="secondary"
                  variant="tonal"
                  @click="resetdetails()"
                
                >
                  Reset
                </VBtn> -->
              </VCol>

            </VRow>
     </VForm>
                 <VPagination
            v-model="page"
            :length="Math.ceil(filteredProducts.length / pageSize)"
            @input="updatePagination"
               :max="maxPaginationPages"
            /> 
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
import servicescall from '@/Services'
export default {    
    mixins: [servicescall], 
    data(){
        return{
           snackbar: false,
            snackbarText: '',
            timeout: 6000, // milliseconds
            color: '', // or 'error', 'warning', 'info', etc.
           
          quotesdata : [],            
         
          maxPaginationPages:5,
            storerules:[
          (v) => !!v || 'Store Address is required',
         ],
            mrprules: [
              (v) => !!v || 'MRP is required',
            ],
            namerules: [
              (v) => !!v || 'Name is required',
            ],
            uomRules: [
              (v) => !!v || 'UOM is required',
            ],
            //  hsnRules: [
            //          (v) => !!v || "HSN is required",
          
            // ],
            pinrules: [
              (v) => !!v || 'PIN is required',
            ],
            phonerules: [
              (v) => !!v || " Mobile  is required",
              (v) => /^[0-9]+$/.test(v) || "only number are accepted",
              (v) =>
                (v && v.length <= 10 && v.length >= 10) ||
                "Mobile must be  10 number",
            ],
           snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,
            dialog:false,
            loading:true,
            searchQuery:'',
            page: 1,
            pageSize: 10,
            products:[],
            saveProduct:{
              "merchant_uid": "",
              "brand_name": "",
              "sku_name":"",
              "uom":"",
              "hsn_code": "",
              "mrp": "",
              "status": "",
              "brand_id":"",
              "brand_product_id":"",
              "total_given_margin": "",
              "sgst": "",
              "cgst": "",
              "pitch_from": "",
              // "decision_authority": "",
              "final_retail_cp": "",
              "final_ret": "",

              "bk_profit": "",           
              "bizkingz_cp_final": "",
              "bc_margin_amt": "",

              "bc_margin": "",
              // "created_by": "",
            },
            salesdata:[],
            BrandNames:[],
            CreatedDate:null,
            today: this.getFormattedDate(new Date()),
            OpportunityProductid: null,
            selectedBrand:null,
            userRole:'',
            createdby:'',
            loading:true,
            OppertunityID:null,
            isProgress:false,
             dateRules: [
         (v) => !!v || 'Date is required',
      ],
            headers:[
                {text:'Select',value:'actions'},
                {text:'Brand Name',value:'brand_name'},
                {text:'Product Name',value:'sku_name'},
                {text:'UOM',value:'uom'},   
                {text:'Pitch From',value:'pitch_from'},              

                {text:'Final Retails',value:'final_ret'},               
          
                {text:'Margin',value:'inputs'},

            ]
        }
    },
    computed:{
   
      selectedItem() {
        return this.$store.state.selectedItem;
      },
      // marginrules(){
        
      // },
       filteredProducts(){
         const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
        return this.quotesdata.filter((item) => {
        return (
          // (item.lead_no && item.lead_no.toLowerCase().includes(lowerCaseQuery)) ||
          (item.brand_name && item.brand_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.sku_name && item.sku_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.uom && item.uom.toLowerCase().includes(lowerCaseQuery))  ||        
          (item.final_ret && item.final_ret.toString().includes(lowerCaseQuery))  ||        
          (item.pitch_from && item.pitch_from.toString().includes(lowerCaseQuery))          
      

        );
      });
    },

        paginatedItems() {
          const startIndex = (this.page - 1) * this.pageSize;
          const endIndex = startIndex + this.pageSize;
          return this.filteredProducts.slice(startIndex, endIndex);
        },
    },
    mounted(){
      this.OppertunityID = this.$route.query.opportunity_id;
         this.getQuotesdata()
            .then(() => {             
              this.loading = false;
            }) 
            .catch((error) => {             
              console.error('Error fetching merchants:', error);            
            });
    },
methods:{
    updatemargin(value) {
    if (value === '0%' || value === '0') {
      this.Addbrand.total_given_margin = '0%';
    } else if (value.startsWith('0%')) {
      // User tried to enter something after 0%, reset to 0%
      value = '0%';
    } else {
      // Handle other cases as needed, possibly show an error message
      value = value;
    }
  },

    computedRules(item) {
    if (item.selected) {
      return this.computedmarginRules(item.pitch_from, item.final_ret);
    } else {
      // Return empty array if validation is not required
      return [];
    }
  },
  
computedmarginRules(pitchFrom, finalRetail) {
  const parsePercentage = (value) => parseFloat(value.replace('%', ''));

  return [
    (v) => !!v || 'Margin is required',
    (v) => {
      const margin = parsePercentage(v);
      const from = parsePercentage(pitchFrom);
      const to = parsePercentage(finalRetail);

      if (!isNaN(margin) && margin >= from && margin <= to) {
        return true;
      } else {
        return  this.snackbarText = `Margin should be between ${from}% and ${to}%`,
        this.snackbar = true,
        this.color = "on-background",
        'Give Margin Correctly'

      }
    },
    (v) => {
      if (!v.startsWith('0%')) {
        const regex = /^(0|([1-9]\d*))(?:\.\d+)?%$/;
        return regex.test(String(v)) || 'Give numerical value with percentage ';
      } else {
        return v === '0%' || 'Give numerical value with percentage ';
      }
    },
  ];
},





//    validateForm(){
//    this.$refs.purchaseOrderForm.validate().then(valid => {
//         // console.log("form valid", valid.valid);
//         if (valid.valid == true) {
         
//           this.saveQuotedata();
//         }else{
//            this.snackbar = true;
//             this.snackbarText = "Please give all mandatory fields"
//             this.color = "on-background";
//         }
//       }); 
//  },

validateForm() {
  // Check if any item is selected
  const anyItemSelected = this.quotesdata.some(item => item.selected);

  if (!anyItemSelected) {
    // If no item is selected, show Snackbar and return
    this.snackbarText = "Please select at least one item";
    this.color = "on-background";
    this.snackbar = true;
    return;
  }

  // If at least one item is selected, proceed with form validation
  this.$refs.purchaseOrderForm.validate().then(valid => {
    if (valid.valid) {
      // If form is valid, save data
      this.saveQuotedata();
    } else {
      // If form is not valid, show Snackbar indicating missing fields
      this.snackbar = true;
      this.snackbarText = "Please fill out all mandatory fields";
      this.color = "on-background";
    }
  });
},


 saveQuotedata() {
  // Filter out only the selected items
  const selectedItems = this.quotesdata.filter(item => item.selected);

  // Prepare data to be sent
  const postData = {
    "sales_person": this.selectedItem.user_id,
    "opportunity_products_id": this.OpportunityProductid,
    "opportunity_id": this.OppertunityID,
    // "created_date": this.CreatedDate,
    "products": selectedItems.map(item => ({
      "brand_id": item.brand_id,
      "brand_product_id": item.brand_product_id,
      "margin": item.sa_given_margin,
      "brand_name": item.brand_name,
      "sku_name": item.sku_name,
      "uom": item.uom,
      "created_date": "",
      "update_date": "",
      "selling_price": ""
    }))
  };

  console.log('text', postData);
  this.isProgress = true;

  // Call the API method with filtered data
  this.saveoppQuotesdata(postData)
    .then((response) => {
      this.isProgress = false;
      console.log("Saved items:", response);
      if (response.data.status == 1) {
        this.snackbarText = response.data.message;
        this.color = "primary";
        this.snackbar = true;
         this.getQuotesdata()
            .then(() => {             
              this.loading = false;
            }) 
            .catch((error) => {             
              console.error('Error fetching merchants:', error);            
            });
        setTimeout(() => {
          window.location.reload(true);
        }, 1300);
      } else {
        this.isProgress = true;
        this.snackbarText = response.data.message;
        this.color = "on-background";
        this.snackbar = true;
      }
    })
    .catch((error) => {
      console.error("Error saving items:", error);
      this.snackbarText = "Error saving items.";
      this.color = "error";
      this.snackbar = true;
    });
},

   getFormattedDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
   updatePagination(page) { 
    this.page = page;
  },
  getQuotesdata(){
        return new Promise((resolve, reject) => {
          this.getoppQuotesdata(this.OppertunityID)
            .then((response) => {
              console.log('check',response);
              this.OpportunityProductid = response.data.opportunity_products_id;
              // this.quotesdata = response.data.data;
              this.quotesdata = response.data.data.map(item => ({
                ...item,
                selected: item.checked === "checked"
              }));
              console.log("Quotes data:", this.quotesdata);
              this.quotesdata.reverse();
              resolve(); // Resolve the promise when API call is successful
            })
            .catch((error) => {
              console.error('Error fetching merchants:', error);
              reject(error); // Reject the promise if there's an error
            });
        });
  },
  // editOppertunity(item){
  //   // console.log('check oppertunity',item);
  //   this.$router.push({
  //         name: 'Updateoppertunities', // Replace with the actual name of your route
  //         // query: { po_id: itm.po_id }
  //       });
  // }
}

}
</script>