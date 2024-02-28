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
      <VCol cols="12">
       <VCard title="Add Product" class="mb-4">       

       
        <VCardText>
          
          <!-- 👉 Form -->
          <VForm class="mt-6" ref="purchaseOrderForm">
           
            <VRow>
    
              <VCol
                md="6"
                cols="12"
              >
              <!-- {{selectedBrand}} -->
                <VAutocomplete
                  v-model="selectedBrand"
                  label="Brand Name"
                  :items="this.BrandNames"               
                  item-value="value"
                  item-title="text"
                  :rules="storerules"
                />
              </VCol>


            <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="this.Addbrand.sku_name"
                  label="SKU Name"
                  :rules="namerules"
                  required
                />
              </VCol>
      
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="this.Addbrand.uom"
                  label="UOM"
              :rules="uomrules"
                 
                />
              </VCol>
            
            <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.Addbrand.hsn_code"
                  label="HSN Code"
                 :rules="hsnrules"
                 type="number"
                 min="0"
                  @keydown="preventDecimal" @paste="preventPaste" 
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.Addbrand.mrp"                
                  label="MRP"
                 :rules="mrprules"
                 type="number"
                 min="0" 
                   @keydown="preventDecimal" @paste="preventPaste" 
                />
              </VCol>
             <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.Addbrand.total_given_margin"                
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
                  v-model="this.Addbrand.bizkingz_cp_final"                
                 :rules="cpfinal"
                type="number"
                  label="Bizking CP Final"
                 min="0" 
                   @keydown="preventDecimal" @paste="preventPaste" 
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.Addbrand.pitch_from"                
                 :rules="computedPitchRules()"
                  label="Pitch from"
                 @input="updatePitchfrom"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.Addbrand.final_ret"                
                :rules="computedFinalret()"
                  label="Final Ret"
                 @input="updateFinalret"                
                 
                />
              </VCol>             

              <VCol
                md="6"
                cols="12"
              >
                  <VTextField
                  v-model="this.Addbrand.final_retail_cp"                
                   type="number"
                      min="0" 
                   @keydown="preventDecimal" @paste="preventPaste" 
                  label="Final Retail CP"
                />
              </VCol>

               <VCol
                md="6"
                cols="12"
              >
               <!-- :rules="bcrules" -->
                  <VTextField
                  v-model="this.Addbrand.bc_margin"                
                   :rules="computedbcmargin()"
                  label="BC Margin"
                     @input="updatebcmargin" 
                />
              </VCol>


               <VCol
                md="6"
                cols="12"
              >
                <!-- :rules="bcmrules" -->
                  <VTextField
                  v-model="this.Addbrand.bc_margin_amt"                
                 min="0" 
                   @keydown="preventDecimal" @paste="preventPaste" 
                type="number"
                  label="BC Margin Amount"
                />
              </VCol>
              

              <VCol  
                 md="6"          
                cols="12"
              >
              
                <VTextField
                  v-model="this.Addbrand.bk_profit"               
                    type="number"
                  label="BK Profit"
                 min="0" 
                   @keydown="preventDecimal" @paste="preventPaste" 
                />
              </VCol>

            <VCol      
               md="6"      
                cols="12"
              >
              
                <VTextField
                  v-model="this.Addbrand.cgst"               
             :rules="computedCGST()"
                  label="CGST"
                 @input="updateCGST"                
              
                />
              </VCol>

               <VCol    
                  md="6"        
                cols="12"
              >
              
                <VTextField
                  v-model="this.Addbrand.sgst"               
                   :rules="computedSGST()"
                     @input="updateSGST"  
                  label="SGST"
              
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
                  type="reset"
               
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>

        </VCardText>
      </VCard>
    </VCol>  
  </VRow>

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

export default {
  mixins: [servicescall],
  components:{

  },
   data(){
    return{
          namerules: [
         (v) => !!v || 'Name is required',
      ],
       storerules: [
         (v) => !!v || 'Brand Name is required',
      ],
      bcrules: [
         (v) => !!v || 'BC Margin is required',
      ],
       cpfinal: [
         (v) => !!v || 'Bizking CP Final is required',
      ],
       mrprules: [
         (v) => !!v || 'MRP is required',
      ],
      bcmrules: [
         (v) => !!v || 'BC Margin is required',
      ],
       uomrules: [
         (v) => !!v || 'UOM is required',
      ],
      // tgmrules:[
      //    (v) => !!v || 'Total Given Margin is required',
      //    (v) => {
      //     if (!v) return true;
      //     if (v.slice(-1) !== '%') {
      //       return 'Total Given Margin must end with a percentage sign ("%")';
      //     }
      //     return true;
      //   }
      // ],
      cgstrules:[
         (v) => !!v || 'CGST is required',

       ],
        sgstrules:[
         (v) => !!v || 'SGST is required',

      ],
      loading:true,
        searchQuery:'',
       page: 1,
    pageSize: 10,
        snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,
      marchantstocksdata:[],
     selectedBrand:null,
      BrandNames:[],
    Addbrand:{        

        
            "sku_name": "",
            "uom": "",
            "hsn_code": "",
            "mrp": "",
            "total_given_margin": "0%",
            "bizkingz_cp_final": "",
            "pitch_from": "0%",
            "final_ret": "0%",
            "final_retail_cp": "",
            "bc_margin": "0%",
            "bc_margin_amt": "",
            "bk_profit": "",
            "cgst": '0%',
            "sgst": '0%',
            // "status": ""

    }
     

    }
   },
  
     computed: {  
//       filteredMerchant(){
//          const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
//       return this.marchantstocksdata.filter((item) => {
//         return (
//           (item.brand_name && item.brand_name.toLowerCase().includes(lowerCaseQuery)) ||
//           (item.sku_name && item.sku_name.toLowerCase().includes(lowerCaseQuery)) ||
//           (item.uom && item.uom.toLowerCase().includes(lowerCaseQuery)) ||
//           (item.physical_soh && item.physical_soh.toLowerCase().includes(lowerCaseQuery)) ||
//           (item.closing && item.closing.toLowerCase().includes(lowerCaseQuery)) || 
//             (item.opening && item.opening.toLowerCase().includes(lowerCaseQuery))  
//         );
//       });
//     },
//    paginatedItems() {  
 
//   const startIndex = (this.page - 1) * this.pageSize;
//   const endIndex = startIndex + this.pageSize;
//   return this.filteredMerchant.slice(startIndex, endIndex);
// },
    //    Brands(){
    //     return this.BrandNames.map(a => a.brand_id
    //        );
    // }
    
    },
    
    mounted(){
      this.getBranddetails();
     setTimeout(() => {
              this.loading = false; // Set loading to false when the operation is complete
            }, 4000);
     
    },
    
methods:{ 

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
      this.Addbrand.bc_margin = '0%';
    } else if (value.startsWith('0%')) {
      // User tried to enter something after 0%, reset to 0%
      this.Addbrand.bc_margin = '0%';
    } else {
      // Handle other cases as needed, possibly show an error message
      this.Addbrand.bc_margin = value;
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
      this.Addbrand.sgst = '0%';
    } else if (value.startsWith('0%')) {
      // User tried to enter something after 0%, reset to 0%
      this.Addbrand.sgst = '0%';
    } else {
      // Handle other cases as needed, possibly show an error message
      this.Addbrand.sgst = value;
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
      this.Addbrand.cgst = '0%';
    } else if (value.startsWith('0%')) {
      // User tried to enter something after 0%, reset to 0%
      this.Addbrand.cgst = '0%';
    } else {
      // Handle other cases as needed, possibly show an error message
      this.Addbrand.cgst = value;
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
      this.Addbrand.final_ret = '0%';
    } else if (value.startsWith('0%')) {
      // User tried to enter something after 0%, reset to 0%
      this.Addbrand.final_ret = '0%';
    } else {
      // Handle other cases as needed, possibly show an error message
      this.Addbrand.final_ret = value;
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
      this.Addbrand.pitch_from = '0%';
    } else if (value.startsWith('0%')) {
      // User tried to enter something after 0%, reset to 0%
      this.Addbrand.pitch_from = '0%';
    } else {
      // Handle other cases as needed, possibly show an error message
      this.Addbrand.pitch_from = value;
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
      this.Addbrand.total_given_margin = '0%';
    } else if (value.startsWith('0%')) {
      // User tried to enter something after 0%, reset to 0%
      this.Addbrand.total_given_margin = '0%';
    } else {
      // Handle other cases as needed, possibly show an error message
      this.Addbrand.total_given_margin = value;
    }
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
     validateForm(){
      this.$refs.purchaseOrderForm.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
         
          this.saveBrands();
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      }); 
    },
    saveBrands(){
      const postData = {
          "brand_id":this.selectedBrand,
          "sku_name": this.Addbrand.sku_name,
          "uom": this.Addbrand.uom,
          "hsn_code":  this.Addbrand.hsn_code,
          "mrp": this.Addbrand.mrp,
          "total_given_margin": this.Addbrand.total_given_margin === '' ? "0%" : this.Addbrand.total_given_margin,
          "bizkingz_cp_final": this.Addbrand.bizkingz_cp_final,
          "pitch_from": this.Addbrand.pitch_from === '' ? "0%" : this.Addbrand.pitch_from,
          "final_ret": this.Addbrand.final_ret === '' ? "0%" : this.Addbrand.final_ret,
          "final_retail_cp": this.Addbrand.final_retail_cp,
          // "decision_authority": "",
          // "status": this.Addbrand.status === "Active" ? "1" : "0",
          "bc_margin": this.Addbrand.bc_margin,
          "bc_margin_amt": this.Addbrand.bc_margin_amt,
          "bk_profit":  this.Addbrand.bk_profit ,
          "cgst": this.Addbrand.cgst === '' ? "0%" : this.Addbrand.cgst,
          "sgst": this.Addbrand.sgst === '' ? "0%" : this.Addbrand.sgst,

      }
      console.log('post data',postData);
      this.Addbrandproductdata(postData).then((response)=>{
        console.log('resp',response);
         if(response.data.status == 1){
              this.snackbarText = response.data.message;
              this.color = "primary";
              this.snackbar = true;
               this.Addbrand={};
              
              }else{
              this.snackbarText = response.data.message;
              this.color = "on-background";
              this.snackbar = true;
              }
      })
    },
     getBranddetails(){
      this.getBrands().then((response)=>{
        
        this.BrandNames = response.data;
        
         this.BrandNames = this.BrandNames.map(brand => ({
            value: brand.brand_id,
            text: brand.brand_name
        }));
        console.log('mer',this.BrandNames)
      })
     }
   },
 
}
</script>
<style scoped>

</style>