<template>
  <div>
     <div style="max-width:400px" v-if="this.products != null">
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

      <VRow v-if="this.products == null">
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

 
     <VTable v-if="this.products != null"
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
        <td class="text-center">{{ item.city }}</td>
        <td class="text-center">{{ item.location }}</td>

        <td class="text-center">{{ item.brand_name }}</td>

        <td class="text-center">{{ item.sku_name }}</td>
        <td class="text-center">
          {{ item.uom }}
        </td>
        <td class="text-center">
           
        {{ item.hsn_code }}
        </td>
        <td class="text-center">
          {{ item.mrp }}
        </td>
         <td class="text-center">
          <VChip
        :color="resolveStatusVariant(item.status).color"
        class="font-weight-medium"
        size="small"
      >
      {{ item.status == 1 ? 'Active' : 'Inactive'}}
    
            </VChip>
          
        </td> 
        <td class="text-center">
          {{ item.total_given_margin }}
        </td>
           <td class="text-center">
          {{ item.sgst }}
        </td>   
        <td class="text-center">
          {{ item.cgst }}
        </td>  
         <td class="text-center">
          {{ item.pitch_from }}
        </td>   
        
        <td class="text-center">
          {{ item.final_retail_cp }}
        </td>   
        <td class="text-center">
          {{ item.final_ret }}
        </td>   
           <td class="text-center">
          {{ item.bk_profit }}
        </td>   
        <td class="text-center">
          {{ item.bizkingz_cp_final }}
        </td>
          <td class="text-center">
          {{ item.bc_margin_amt }}
        </td>
          <td class="text-center">
          {{ item.bc_margin }}
        </td>
          <!-- <td class="text-center">
          <a :href="item.location" target="_blank" style="color:blue">{{ item.location }}</a>
        </td> -->
          <!-- <td class="text-center">
          {{ item.area_pincode }}
        </td>          -->
        <td class="text-center" v-if="this.UserType == 'Business Head' || this.UserType == 'HR and Ops Manager'">
              <V-btn
                  icon
                  variant="text"
                  color="default"
                  class="mb-1 mt-2"
                  size="x-small"
                  style="margin-left: auto; display: block;"
                 @click="editProduct(item)"
                  >
                  
                      <VIcon
                        icon="ri-pencil-line"
                        size="22"        
                        color="#BA8B32"       
                        />   
                      </V-btn>     
                      
            </td>
      </tr>

       <tr v-if="filteredProducts.length === 0">
          <td colspan="16" class="text-center"><h1>No data found !</h1></td>
      </tr>  

      </tbody>        
        </VTable>
        <VPagination
            v-model="page"
            :length="Math.ceil(filteredProducts.length / pageSize)"
            @input="updatePagination"
               :max="maxPaginationPages"
            />

            <VDialog
      v-model="dialog"
      max-width="1000"
    >
    
      <VCard
        title="Update Product"
        class="mb-2"
      >
      <VCardText>
          <VRow>
            <VCol cols="12">
         <VForm class="mt-6 " ref="purchaseOrderForm">
            <VRow> 
              <VCol
                cols="12"
                md="6"
              >
                <VAutocomplete
                  v-model="this.saveProduct.city_id"
                  label="City"
                  :items="this.locationsdata"               
                  item-value="value"
                  item-title="text"
                  :rules="locationrules"
                  :menu-props="{ maxHeight: 200 }"
                   @update:model-value="handleBrandSelection()"
                  required
                />
              </VCol>

             <VCol
                md="6"
                cols="12"
              >
              <!-- {{selectedBrand}} -->  
              <!-- {{this.saveProduct.location_id}} -->
                <VAutocomplete
                  v-model="this.saveProduct.location_id"
                  label="Location"
                  :items="this.cityLoaction"               
                  item-value="value"
                  item-title="text"
                  :rules="locationrules2"
                  :menu-props="{ maxHeight: 200 }"
                />
              </VCol>
            
              <!-- <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="this.saveMerchant.merchant_uid"
                  label="Merchant UID"
                  :rules="uidrules"
                  required
                />
              </VCol> -->
    <!-- {{selectedBrand}} -->
              <VCol
                cols="12"
                md="6"
              >
                <VAutocomplete
                  v-model="selectedBrand"
                  label="Brand Name"
                  :items="this.BrandNames"               
                  item-value="value"
                  item-title="text"
                  :rules="namerules"
                      :menu-props="{ maxHeight: 200 }"
                  required
                />
              </VCol>
            
            <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveProduct.sku_name "
                  label="SKU Name"
                  :rules="namerules"
                  required
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model=" this.saveProduct.uom"                
                  label="UOM"
                  :rules="uomRules"
                  required
                />
              </VCol>
             <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveProduct.hsn_code"                
                 min="0"
                  @keydown="preventDecimal" @paste="preventPaste" 
                  label="HSN Code"
                type="number"
                  required
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveProduct.mrp"                
                 min="0"
                  @keydown="preventDecimal" @paste="preventPaste" 
                  label="MRP"
                  :rules="mrprules"
                  required
                />
              </VCol>
             
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model=" this.saveProduct.total_given_margin"                
                  :rules="computedTGMRules()"
                  label="Total Given Margin"
                  @input="updateTotalGivenMargin"
                  required
                />
              </VCol>

               <VCol            
                md="6"
                cols="12"
              >
           
                <VTextField
                  v-model="this.saveProduct.bizkingz_cp_final"               
                  min="0"
                  @keydown="preventDecimal" @paste="preventPaste" 
                  label="Bizking CP Final"
                 
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                  <VTextField
                  v-model="this.saveProduct.pitch_from "                
                  @input="updatePitchfrom"
                      :rules="computedPitchRules()"
                  label="Pitch From"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
               <!-- @input="updateFinalret"   
                 :rules="computedFinalret()" -->
                  <VTextField
                  v-model=" this.saveProduct.final_ret"                
                 min="0"
                  @keydown="preventDecimal" @paste="preventPaste" 
                  label="Final Retail"
                   
                />
              </VCol>

              
              <VCol
                md="6"
                cols="12"
              >
                  <VTextField
                  v-model=" this.saveProduct.final_retail_cp"                
                 min="0"
                  @keydown="preventDecimal" @paste="preventPaste" 
                  label="Final Retail CP"
                 
                />
              </VCol>
            <VCol            
                md="6"
                cols="12"
              >
           
                <VTextField
                  v-model="  this.saveProduct.bc_margin "               
                   :rules="computedbcmargin()"
                      @input="updatebcmargin" 
                  label="BC margin "
                 
                />
              </VCol>
               <VCol            
                md="6"
                cols="12"
              >
           
                <VTextField
                  v-model=" this.saveProduct.bc_margin_amt "               
                   
                  label="BC margin Amount"
                  min="0"
                  @keydown="preventDecimal" @paste="preventPaste" 
                />
              </VCol>

               <VCol            
                md="6"
                cols="12"
              >
           
                <VTextField
                  v-model=" this.saveProduct.bk_profit"               
                  min="0"
                  @keydown="preventDecimal" @paste="preventPaste" 
                  label="BK Profit"
                 
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveProduct.cgst"                
                   :rules="computedCGST()"
                       @input="updateCGST" 
                  label="CGST"
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="  this.saveProduct.sgst"                
                    :rules="computedSGST()"
                     @input="updateSGST" 
                  label="SGST"
               
                  required
                />
              </VCol>         
             
                <VCol
                md="6"
                cols="12"
              >
          
                <VSelect
                  v-model="this.saveProduct.status"                
                 
                  label="Status"
                  :items="['Active','Inactive']"
                
                 
                  required
                />
              </VCol>
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="validateForm()">Save</VBtn>
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
            cityID:'',
            locationid:'',
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
      locationrules:[
               (v) => !!v || "City Name is required",        
      ],
       locationrules2:[
               (v) => !!v || "City Location Name is required",        
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
      cityLoaction:[],
      locationsdata:[],
           snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,
      UserType:'',
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
              "city_id":"",
              "location_id":"",
              "bc_margin": "",
              // "created_by": "",
            },
            salesdata:[],
            BrandNames:[],
            selectedBrand:null,
            userRole:'',
            createdby:'',
            headers:[
               {text:'City',value:'city'},
               {text:'Location',value:'location'},

               {text:'Brand Name',value:'brand_name'},
                {text:'SKU Name',value:'sku_name'},
                {text:'UOM',value:'uom'},
                {text:'HSN Code',value:'hsn_code'},
                {text:'MRP',value:'mrp'},
                {text:'Status',value:'status'},
                {text:'Total Given Margin',value:'total_given_margin'},
                {text:'SGST',value:'sgst'},
                {text:'CGST',value:'cgst'},
                {text:'Pitch From',value:'pitch_from'},            
                {text:'Final Retail CP',value:'final_retail_cp'},
                {text:'Final Retail',value:'final_ret'},
                 {text:'BK Profit',value:'bk_profit'},
                {text:'Bizking CP Final',value:'bizkingz_cp_final'},
                {text:'BC Margin Amount',value:'bc_margin_amt'},
                {text:'BC Margin',value:'bc_margin'},
                // {text:'Location',value:'location'},
                // {text:'Area Pincode',value:'area_pincode'},
                {text:'Action',value:'actions'},
            ]
        }
    },
    computed:{
         filteredProducts(){
         const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
        return this.products.filter((item) => {
        return (
            (item.city && item.city.toLowerCase().includes(lowerCaseQuery)) ||
          (item.location && item.location.toLowerCase().includes(lowerCaseQuery)) ||
          (item.brand_name && item.brand_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.sku_name && item.sku_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.uom && item.uom.toLowerCase().includes(lowerCaseQuery)) ||
          (item.hsn_code && item.hsn_code.toString().includes(lowerCaseQuery)) ||
          (item.mrp && item.mrp.toString().includes(lowerCaseQuery))|| 
          (item.status && item.status.toLowerCase().includes(lowerCaseQuery)) ||
          (item.total_given_margin && item.total_given_margin.toString().includes(lowerCaseQuery))  ||
          (item.sgst && item.sgst.toLowerCase().includes(lowerCaseQuery)) ||
          (item.cgst && item.cgst.toLowerCase().includes(lowerCaseQuery)) ||
          (item.pitch_from && item.pitch_from.toLowerCase().includes(lowerCaseQuery)) ||
          (item.final_retail_cp && item.final_retail_cp.toString().includes(lowerCaseQuery)) || 
          (item.final_ret && item.final_ret.toLowerCase().includes(lowerCaseQuery)) ||
          (item.bk_profit && item.bk_profit.toString().includes(lowerCaseQuery)) ||
          (item.bizkingz_cp_final && item.bizkingz_cp_final.toString().includes(lowerCaseQuery)) ||
          (item.bc_margin_amt && item.bc_margin_amt.toString().includes(lowerCaseQuery)) ||
          (item.bc_margin && item.bc_margin.toLowerCase().includes(lowerCaseQuery))

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
      this.getBranchnames();
      this.getBranddetails();
       this.cityID = localStorage.getItem("city_id");
      this.locationID = localStorage.getItem("location_id");
      this.userRole = localStorage.getItem("userRole");
     this.UserType = localStorage.getItem("user_type");
     console.log('check the user type',  this.UserType);
        // this.createdby =  localStorage.getItem('user_id');
           this.getProductsdata()
            .then(() => {             
              this.loading = false;
            }) 
            .catch((error) => {             
              console.error('Error fetching merchants:', error);            
            });
          //  setTimeout(() => {
              
          //         this.loading = false; // Set loading to false when the operation is complete
          //   }, 3500);
            // this.getAllsales();
    },
    watch: {
  'saveProduct.city_id': function(newCityId, oldCityId) {
    if (newCityId !== oldCityId) {
      this.handleBrandSelection(newCityId);
    }
  }
},
    methods:{
       handleBrandSelection(id){
        console.log('check hjandle',id);
        this.getCitylocation(id).then((response)=>{
          // console.log('check the response',response);
          this.cityLoaction = response.data.data.map(sales => ({
                  value: sales.location_id,
                  text: sales.location
              }))
                console.log('ceck tye res',this.cityLoaction);
        })
      },
      getBranchnames(){
            this.Locationdata().then((response)=>{ 
        
              this.locationsdata = response.data.data.map(sales => ({
                  value: sales.city_id,
                  text: sales.city
              }));
                console.log('ceck tye res',this.locationsdata);
            })
          },
        preventPaste(event){
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedData = clipboardData.getData('text');

      // Validate pasted data (you can modify this regex as needed)
      const isValid = /^[0-9]+$/.test(pastedData);

      if (!isValid) {
        event.preventDefault();
      }
    },
     preventDecimal(event) {     
      if (event.key === ',' ||  event.key === '+' ||  event.key === '-' || event.keyCode === 189 || event.keyCode === 109) {
        event.preventDefault();
      }
    },
      computedbcmargin() {
    const hasPercentage = (value) => {
      const regex = /^(0|([1-9]\d*))(?:\.\d+)?%$/;
      return regex.test(String(value));
    };

    return [
      (v) => !!v || 'BC margin is required',
      (v) => {
        if (!v.startsWith('0%')) {
          return hasPercentage(v) || 'Must include a numerical value with a percentage symbol';
        } else {
          return v === '0%' || 'Must include a numerical value with a percentage symbol.';
        }
      },
    ];
  },

   updatebcmargin(value) {
    if (value === '0%' || value === '0') {
      this.saveProduct.bc_margin = '0%';
    } else if (value.startsWith('0%')) {
      // User tried to enter something after 0%, reset to 0%
      this.saveProduct.bc_margin = '0%';
    } else {
      // Handle other cases as needed, possibly show an error message
      this.saveProduct.bc_margin = value;
    }
  },

computedSGST() {
    const hasPercentage = (value) => {
      const regex = /^(0|([1-9]\d*))(?:\.\d+)?%$/;
      return regex.test(String(value));
    };

    return [
      (v) => !!v || 'SGST is required',
      (v) => {
        if (!v.startsWith('0%')) {
          return hasPercentage(v) || 'Must include a numerical value with a percentage symbol';
        } else {
          return v === '0%' || 'Must include a numerical value with a percentage symbol.';
        }
      },
    ];
  },

   updateSGST(value) {
    if (value === '0%' || value === '0') {
      this.saveProduct.sgst = '0%';
    } else if (value.startsWith('0%')) {
      // User tried to enter something after 0%, reset to 0%
      this.saveProduct.sgst = '0%';
    } else {
      // Handle other cases as needed, possibly show an error message
      this.saveProduct.sgst = value;
    }
  },

 computedCGST() {
    const hasPercentage = (value) => {
      const regex = /^(0|([1-9]\d*))(?:\.\d+)?%$/;
      return regex.test(String(value));
    };

    return [
      (v) => !!v || 'CGST is required',
      (v) => {
        if (!v.startsWith('0%')) {
          return hasPercentage(v) || 'Must include a numerical value with a percentage symbol';
        } else {
          return v === '0%' || 'Must include a numerical value with a percentage symbol.';
        }
      },
    ];
  },

   updateCGST(value) {
    if (value === '0%' || value === '0') {
      this.saveProduct.cgst = '0%';
    } else if (value.startsWith('0%')) {
      // User tried to enter something after 0%, reset to 0%
      this.saveProduct.cgst = '0%';
    } else {
      // Handle other cases as needed, possibly show an error message
      this.saveProduct.cgst = value;
    }
  },

     computedFinalret() {
    const hasPercentage = (value) => {
      const regex = /^(0|([1-9]\d*))(?:\.\d+)?%$/;
      return regex.test(String(value));
    };

    return [
      (v) => !!v || 'Final Ret is required',
      (v) => {
        if (!v.startsWith('0%')) {
          return hasPercentage(v) || 'Must include a numerical value with a percentage symbol';
        } else {
          return v === '0%' || 'Must include a numerical value with a percentage symbol.';
        }
      },
    ];
  },

   updateFinalret(value) {
    if (value === '0%' || value === '0') {
      this.saveProduct.final_ret = '0%';
    } else if (value.startsWith('0%')) {
      // User tried to enter something after 0%, reset to 0%
      this.saveProduct.final_ret = '0%';
    } else {
      // Handle other cases as needed, possibly show an error message
      this.saveProduct.final_ret = value;
    }
  },

   computedPitchRules() {
    const hasPercentage = (value) => {
      const regex = /^(0|([1-9]\d*))(?:\.\d+)?%$/;
      return regex.test(String(value));
    };

    return [
      (v) => !!v || 'Pitch From is required',
      (v) => {
        if (!v.startsWith('0%')) {
          return hasPercentage(v) || 'Must include a numerical value with a percentage symbol';
        } else {
          return v === '0%' || 'Must include a numerical value with a percentage symbol.';
        }
      },
    ];
  },

   updatePitchfrom(value) {
    if (value === '0%' || value === '0') {
      this.saveProduct.pitch_from = '0%';
    } else if (value.startsWith('0%')) {
      // User tried to enter something after 0%, reset to 0%
      this.saveProduct.pitch_from = '0%';
    } else {
      // Handle other cases as needed, possibly show an error message
      this.saveProduct.pitch_from = value;
    }
  },

  computedTGMRules() {
    const hasPercentage = (value) => {
      const regex = /^(0|([1-9]\d*))(?:\.\d+)?%$/;
      return regex.test(String(value));
    };

    return [
      (v) => !!v || 'Total Given Margin is required',
      (v) => {
        if (!v.startsWith('0%')) {
          return hasPercentage(v) || 'Must include a numerical value with a percentage symbol';
        } else {
          return v === '0%' || 'Must include a numerical value with a percentage symbol.';
        }
      },
    ];
  },

   updateTotalGivenMargin(value) {
    if (value === '0%' || value === '0') {
     this.saveProduct.total_given_margin = '0%';
    } else if (value.startsWith('0%')) {
      // User tried to enter something after 0%, reset to 0%
      this.saveProduct.total_given_margin = '0%';
    } else {
      // Handle other cases as needed, possibly show an error message
     this.saveProduct.total_given_margin = value;
    }
  },
         validateForm(){
         this.$refs.purchaseOrderForm.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
         
          this.UpdateProduct();
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      }); 
    },
      // updatemerchant(){
      //     const postData = {
      //     "merchant_uid": this.saveMerchant.merchant_uid,
      //     "merchant_name": this.saveMerchant.merchant_name,
      //     "merchant_code": this.saveMerchant.merchant_code,

      //     "store_address":  this.saveMerchant.store_address,
      //     "gst": this.saveMerchant.gst,
      //     "status":  this.saveMerchant.status === "Active" ? "1" : "0",

      //     "area_pincode": this.saveMerchant.area_pincode,
      //     "poc_name": this.saveMerchant.poc_name,
      //     "poc_phone": this.saveMerchant.poc_phone,

      //     "owner_name": this.saveMerchant.owner_name,
      //     "owner_phone": this.saveMerchant.owner_phone,
      //     "merchant_id":  this.saveMerchant.merchant_id,

      //     "shop_size": this.saveMerchant.shop_size,
      //     "shop_type": this.saveMerchant.shop_type,
      //     "location": this.saveMerchant.location,

      //     "created_by":  this.createdby ,
      //     "sales_person": this.saveMerchant.sales_person,
      //     "created_date": this.saveMerchant.created_date,
      // }
      // console.log('post',postData);
      // this.updateMerchantdetailsdata(postData).then((response)=>{
      //    if(response.data.status == 1){
      //         this.snackbarText = response.data.message;
      //         this.color = "primary";
      //         this.snackbar = true;
      //         this.dialog=false;
      //         this.saveMerchant={};
      //           this.getmerchants();
      //         }else{
      //         this.snackbarText = response.data.message;
      //         this.color = "on-background";
      //         this.snackbar = true;
      //         }
      // })
      // },
    //      getAllsales(){
    //   this.getsalesperson().then((response)=>{
    //     // console.log('sales',response);
    //     this.salesdata = response.data.data;
   
    //      this.salesdata = this.salesdata.map(sales => ({
    //         value: sales.user_id,
    //         text: sales.name
    //     }));
    //        console.log('sales',this.salesdata);

    //   })
    // },
   UpdateProduct(){
      const postData = {
          "brand_id":  this.selectedBrand,
          "brand_product_id":   this.saveProduct.brand_product_id ,
          "sku_name": this.saveProduct.sku_name,
          "uom":   this.saveProduct.uom,
          "hsn_code":    this.saveProduct.hsn_code,
          "mrp":  this.saveProduct.mrp ,
          "total_given_margin": this.saveProduct.total_given_margin ,
          "bizkingz_cp_final":  this.saveProduct.bizkingz_cp_final,
          "pitch_from": this.saveProduct.pitch_from ,
          "final_ret":   this.saveProduct.final_ret,
          "final_retail_cp":  this.saveProduct.final_retail_cp,
          "bc_margin":  this.saveProduct.bc_margin,
          "bc_margin_amt": this.saveProduct.bc_margin_amt,
          "bk_profit":  this.saveProduct.bk_profit,
          "cgst":   this.saveProduct.cgst,
          "sgst": this.saveProduct.sgst,
          "city_id": this.saveProduct.city_id,
          "location_id": this.saveProduct.location_id,
          "status": this.saveProduct.status === "Active" ? "1" : "0"
      }
        console.log('post',postData);
      this.updateProducts(postData).then((response)=>{
         if(response.data.status == 1){
              this.snackbarText = response.data.message;
              this.color = "primary";
              this.snackbar = true;
              this.dialog=false;
              this.saveProduct={};
              this.getProductsdata();
              }else{
              this.snackbarText = response.data.message;
              this.color = "on-background";
              this.snackbar = true;
              }
      })
    },
    closeDialog(){
      this.dialog=false;
    },
      editProduct(item){
        console.log('check the edit',item);
        // this.getMerchantdetailsdata(item.merchant_id).then((response)=>{
        //   console.log('set merchnt',response);
        //   if(response.data.status == 1){
            this.dialog = true;
            
          //  this.saveMerchant.merchant_uid = response.data.data.merchant_uid;
          //  this.saveMerchant.merchant_id = response.data.data.merchant_id;
          //  this.saveMerchant.created_date = response.data.data.created_date;
        this.saveProduct.city_id = this.locationsdata.find(location => location.value === item.city_id)?.value || item.city_id;

          this.saveProduct.location_id = this.cityLoaction.find(location => location.value === item.location_id)?.value || item.location_id;


           this.selectedBrand = item.brand_name ;
            this.selectedBrand = item.brand_id;
            this.saveProduct.brand_product_id = item.brand_product_id;

            this.saveProduct.sku_name = item.sku_name;
             this.saveProduct.uom = item.uom;
              this.saveProduct.hsn_code = item.hsn_code;

               this.saveProduct.mrp = item.mrp;
                this.saveProduct.status = item.status== 1 ? 'Active' : 'Inactive';
                 this.saveProduct.total_given_margin = item.total_given_margin;

                  this.saveProduct.sgst = item.sgst;
                   this.saveProduct.cgst = item.cgst;
                    this.saveProduct.pitch_from = item.pitch_from;

                     this.saveProduct.final_retail_cp = item.final_retail_cp;
                      // this.saveProduct.sales_person = item.sales_person == this.salesdata.value ? this.salesdata.map(sales => ({
                      //     value: sales.user_id,
                      //     text: sales.name
                      // })) : item.sales_person,
                       this.saveProduct.final_ret = item.final_ret;
                       this.saveProduct.bk_profit = item.bk_profit;
                        this.saveProduct.bizkingz_cp_final = item.bizkingz_cp_final;
                         this.saveProduct.bc_margin_amt = item.bc_margin_amt;
                          this.saveProduct.bc_margin = item.bc_margin;
                      //  this.saveProduct.status = item.status == 1 ? 'Active' : 'Inactive';

            
          
        // })
      },
      resolveStatusVariant(itm){
        if(itm == 1){
          return{
            color:"success"
          }
        }else{
          return{
            color:"error"
          }
        }
      },
         updatePagination(page) {
    this.page = page;
  },
        getProductsdata(){
            // this.getProducts().then((response)=>{
            //     this.products = response.data.data;
            //     console.log('merchants',this.products)

            //     this.products.reverse();
            // })

            return new Promise((resolve, reject) => {
                this.getProducts()
                  .then((response) => {
                    this.products = response.data.data;
                    this.products.reverse();
                    resolve(); // Resolve the promise when API call is successful
                  })
                  .catch((error) => {
                    console.error('Error fetching merchants:', error);
                    reject(error); // Reject the promise if there's an error
                  });
              });

        },
         getBranddetails(){
          this.getBrands(this.cityID,this.locationID).then((response)=>{
        
        this.BrandNames = response.data;
        
         this.BrandNames = this.BrandNames.map(brand => ({
            value: brand.brand_id,
            text: brand.brand_name
        }));
        console.log('mer',this.BrandNames)
      })
     }
    }
}
</script>
<style scoped>

</style>