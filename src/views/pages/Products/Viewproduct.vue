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

      <div v-if="loading"  class="loading-container">
      <VProgressLinear
            height="5"
            color="primary"
            indeterminate
            class="custom-loader"  
            full-width              
        />          
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
    <td class="text-center" >
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
        title="Update Merchant"
        class="mb-2"
      >
      <VCardText>
          <VRow>
            <VCol cols="12">
         <VForm class="mt-6 " ref="purchaseOrderForm">
            <VRow> 
            


            
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
                  :rules="namerules"
                  required
                />
              </VCol>
             <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveProduct.hsn_code"                
                
                  label="HSN Code"
                  :rules="namerules"
                  required
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveProduct.mrp"                
                
                  label="MRP"
                  :rules="namerules"
                  required
                />
              </VCol>
             
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model=" this.saveProduct.total_given_margin"                
                 
                  label="Total Given Margin"
                  :rules="namerules"
                  required
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="  this.saveProduct.sgst"                
                
                  label="SGST"
                  :rules="namerules"
                  required
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveProduct.cgst"                
                
                  label="CGST"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                  <VTextField
                  v-model="this.saveProduct.pitch_from "                
                
                  label="Pitch From"
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                  <VTextField
                  v-model=" this.saveProduct.final_retail_cp"                
                
                  label="Final Retail CP"
                />
              </VCol>

                  <VCol
                md="6"
                cols="12"
              >
                  <VTextField
                  v-model=" this.saveProduct.final_ret"                
                
                  label="Final Retail"
                />
              </VCol>

                

              <VCol            
                md="6"
                cols="12"
              >
           
                <VTextField
                  v-model=" this.saveProduct.bk_profit"               
                 
                  label="BK Profit"
                 
                />
              </VCol>

              <VCol            
                md="6"
                cols="12"
              >
           
                <VTextField
                  v-model="this.saveProduct.bizkingz_cp_final"               
                 
                  label="Bizking CP Final"
                 
                />
              </VCol>

              <VCol            
                md="6"
                cols="12"
              >
           
                <VTextField
                  v-model=" this.saveProduct.bc_margin_amt "               
                 
                  label="BC margin Amount"
                 
                />
              </VCol>
               <VCol            
                md="6"
                cols="12"
              >
           
                <VTextField
                  v-model="  this.saveProduct.bc_margin "               
                 
                  label="BC margin "
                 
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
          maxPaginationPages:5,
            storerules:[
          (v) => !!v || 'Store Address is required',
         ],
       uidrules: [
         (v) => !!v || 'UID is required',
      ],
       namerules: [
         (v) => !!v || 'Name is required',
      ],
       gstrules: [
               (v) => !!v || "GST is required",
     
      ],
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
            selectedBrand:null,
            createdby:'',
            headers:[
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
          (item.brand_name && item.brand_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.sku_name && item.sku_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.uom && item.uom.toLowerCase().includes(lowerCaseQuery)) ||
          (item.hsn_code && item.hsn_code.toLowerCase().includes(lowerCaseQuery)) ||
          (item.mrp && item.mrp.toLowerCase().includes(lowerCaseQuery))|| 
          (item.status && item.status.toLowerCase().includes(lowerCaseQuery)) ||
          (item.total_given_margin && item.total_given_margin.toLowerCase().includes(lowerCaseQuery))  ||
          (item.sgst && item.sgst.toLowerCase().includes(lowerCaseQuery)) ||
          (item.cgst && item.cgst.toLowerCase().includes(lowerCaseQuery)) ||
          (item.pitch_from && item.pitch_from.toLowerCase().includes(lowerCaseQuery)) ||
          (item.final_retail_cp && item.final_retail_cp.toLowerCase().includes(lowerCaseQuery)) ||
          (item.final_ret && item.final_ret.toLowerCase().includes(lowerCaseQuery)) ||
          (item.bk_profit && item.bk_profit.toLowerCase().includes(lowerCaseQuery)) ||
          (item.bizkingz_cp_final && item.bizkingz_cp_final.toLowerCase().includes(lowerCaseQuery)) ||
          (item.bc_margin_amt && item.bc_margin_amt.toLowerCase().includes(lowerCaseQuery)) ||
          (item.bc_margin && item.bc_margin.toLowerCase().includes(lowerCaseQuery))

        );
      });
    },
         paginatedItems() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.products.slice(startIndex, endIndex);
  },
    },
    mounted(){
      this.getBranddetails();
     
        // this.createdby =  localStorage.getItem('user_id');
           this.getProductsdata();
         setTimeout(() => {
          
              this.loading = false; // Set loading to false when the operation is complete
            }, 3500);
            // this.getAllsales();
    },
    methods:{
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
            this.getProducts().then((response)=>{
                this.products = response.data.data;
                console.log('merchants',this.products)

                this.products.reverse();
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
    }
}
</script>
<style scoped>

</style>