<template>
  <div>
     <div style="max-width:400px" v-if="this.Brands != null">
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

      <!-- <VRow v-if="this.purchaseHistory == null">
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

 
     <VTable v-if="this.Brands != null"
       :headers="headers"
       :items="merchants"
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
        <td class="text-center">
          {{ item.brand_code }}
        </td>
        <td class="text-center">
           <!-- <VChip
        :color="resolveStatusVariant(item.po_status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ item.po_status }}
    
            </VChip> -->
        {{ item.brand_category }}
        </td>
        <td class="text-center">
          {{ item.brand_connect }}
        </td>
        <td class="text-center">
          {{ item.email_id }}
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
          {{ item.owner_name }}
        </td>   
        <td class="text-center">
          {{ item.owner_phone }}
        </td>  
         <td class="text-center">
          {{ item.poc_name }}
        </td>   
           <td class="text-center">
          {{ item.poc_phone }}
        </td>   
       
        <td class="text-center">
          {{ item.gst }}
        </td>   
        <td class="text-center">
          {{ item.updated_date }}
        </td>   
        <td class="text-center">
          {{ item.created_date }}
        </td>
          <!-- <td class="text-center">
          {{ item.decision_authority }}
        </td> -->
          <td class="text-center">
          {{ item.address }}
        </td>
          <td class="text-center">
          {{ item.location }}
        </td>
          <td class="text-center">
          {{ item.area_pincode }}
        </td>
         
    <td class="text-center" v-if="this.userRole != 'Brand Management'">
              <V-btn
                  icon
                  variant="text"
                  color="default"
                  class="mb-1 mt-2"
                  size="x-small"
                  style="margin-left: auto; display: block;"
                  @click="editBrand(item)"
                  >
                  
                      <VIcon
                        icon="ri-pencil-line"
                        size="22"        
                        color="#BA8B32"       
                        />   
                      </V-btn>     
                       <!-- <V-btn
                  icon
                  variant="text"
                  color="default"
                  class="mb-1 mt-2"
                  size="x-small"
                  style="margin-left: auto; display: block;"
                
                  >
                  
                      <VIcon
                        icon="material-symbols:delete"
                        size="22"        
                        color="error"       
                        />   
                      </V-btn>  -->
            </td>
      </tr>
      </tbody>        
        </VTable>
        <VPagination
            v-model="page"
            :length="Math.ceil(filteredBrands.length / pageSize)"
            @input="updatePagination"
            />

              <VDialog
          v-model="dialog"
          max-width="1000"
        >
    
      <VCard
        title="Update Brand"
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
      
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="this.saveBrand.brand_name"
                  label="Brand Name"
                 
                  :rules="namerules"
                  required
                />
              </VCol>

             <VCol
             
                cols="12"
                   md="6"
              >
                 <VTextField
                  v-model="this.saveBrand.email_id"                
                
                  label="Email"
                  :rules="emailRules"
                  required
                />
              </VCol>
              

              <VCol
                md="6"
                cols="12"
              >
                  <VTextField
                  v-model=" this.saveBrand.gst"              
                  label="GST"
                  :rules="gstrules"
                />
              </VCol>

              <VCol            
                md="6"
                cols="12"
              >
           
                <VTextField
                  v-model="this.saveBrand.area_pincode"               
                 :rules="pinrules"
                 type="number"
                  label="Area Pin Code"
                 
                />
              </VCol>

                 <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model=" this.saveBrand.owner_name"                
                 
                  label="Owner Name"
                  :rules="namerules"
                  required
                />
              </VCol>

                <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveBrand.owner_phone"                
                
                  label="Owner Phone"
                  :rules="phonerules"
                  required
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveBrand.poc_name"                
                :rules="namerules"
                  label="POC Name"
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                  <VTextField
                  v-model="this.saveBrand.poc_phone "                
                  :rules="phonerules"
                  label="POC Phone"
                />
              </VCol>

              <VCol            
                md="6"
                cols="12"
              >
           
                <VTextField
                  v-model="this.saveBrand.location"               
                 
                  label="Location"
                 
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveBrand.brand_connect"                
                
                  label="Brand Connect"
                 
                  required
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model=" this.saveBrand.brand_category"                
                  label="Brand Category"
                  
                  required
                />
              </VCol>            

              <VCol
                md="6"
                cols="12"
              >
           
          
                <VSelect
                  v-model="this.saveBrand.status"                
                 
                  label="Status"
                  :items="['Active','Inactive']"
                
                 
                  required
                />
              </VCol>         
            
            


              <VCol            
            
                cols="12"
              >
           
                <VTextField
                  v-model=" this.saveBrand.address "               
                 
                  label="Store Address"
                 
                />
              </VCol>

             

            
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="validateForm()">Save</VBtn>

               
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
          userRole:"",
          loading:true,
           snackbar: false,
            snackbarText: '',
            timeout: 6000, // milliseconds
            color: '', // or 'error', 'warning', 'info', etc.
            top: false,
            bottom: true,
            left: false,
            right: false,
            dialog:false,
            searchQuery:'',
            page: 1,
            pageSize: 10,
            Brands:[],
            dialog:false,
            saveBrand:{
              "brand_name":"",
              "brand_code":"",
              "brand_category":"",
              "brand_connect":"",
              "email_id":"",
              "brand_id":"",
              "status":"",
              "owner_name":"",
              "owner_phone":"",
              "poc_name":"",
              "poc_phone":"",
              "gst":"",
              "updated_date":"",
              "created_date":"",
              "decision_authority":"",
              "address":"",
              "location":"",
              "area_pincode":"",
            },

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
                 (v) => (v && /^\d{6}$/.test(v)) || 'PIN must be 6 digits'
              ],

              emailRules: [ 
              (v) => !!v || 'Email is required',
              (v) => /.+@.+\..+/.test(v) || 'The email must be valid with the correct format: @ and . symbols',
            ],

              phonerules: [
                (v) => !!v || " Mobile  is required",
                  (v) => /^[0-9]+$/.test(v) || "only number are accepted",
                  (v) =>
                    (v && v.length <= 10 && v.length >= 10) ||
                    "Mobile must be  10 number",
                ],

            headers:[
                {text:'Brand Name',value:'brand_name'},
                {text:'Brand Code',value:'brand_code'},
                {text:'Brand Category',value:'brand_category'},
                {text:'Brand Connect',value:'brand_connect'},
                {text:'Email',value:'email_id'},
                {text:'Status',value:'status'},           
                {text:'Owner Name',value:'owner_name'},
                {text:'Owner Phone',value:'owner_phone'},
                {text:'Poc Name',value:'poc_name'},
                {text:'Poc Phone',value:'poc_phone'},
                {text:'GST',value:'gst'},
                {text:'Updated Date',value:'updated_date'},
                {text:'Onboarded Date',value:'created_date'},
                // {text:'Decision Authority',value:'decision_authority'},
                {text:'Address',value:'address'},
                {text:'Location',value:'location'},
                {text:'Area Pincode',value:'area_pincode'},
                {text:'Action',value:'actions'},
            ]
        }
    },
    computed:{
         filteredBrands(){
         const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
        return this.Brands.filter((item) => {
        return (
          (item.brand_name && item.brand_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.brand_code && item.brand_code.toLowerCase().includes(lowerCaseQuery)) ||
          (item.brand_category && item.brand_category.toLowerCase().includes(lowerCaseQuery)) ||
          (item.brand_connect && item.brand_connect.toLowerCase().includes(lowerCaseQuery)) ||
          (item.email_id && item.email_id.toLowerCase().includes(lowerCaseQuery))|| 
          (item.owner_name && item.owner_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.owner_phone && item.owner_phone.toLowerCase().includes(lowerCaseQuery))  ||
          (item.poc_name && item.poc_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.poc_phone && item.poc_phone.toLowerCase().includes(lowerCaseQuery)) ||
          (item.status && item.status.toLowerCase().includes(lowerCaseQuery)) ||
          (item.gst && item.gst.toLowerCase().includes(lowerCaseQuery)) ||
          (item.updated_date && item.updated_date.toLowerCase().includes(lowerCaseQuery)) ||
          (item.created_date && item.created_date.toLowerCase().includes(lowerCaseQuery)) ||
          (item.decision_authority && item.decision_authority.toLowerCase().includes(lowerCaseQuery)) ||
          (item.address && item.address.toLowerCase().includes(lowerCaseQuery)) ||
          (item.location && item.location.toLowerCase().includes(lowerCaseQuery)) ||
          (item.area_pincode && item.area_pincode.toString().includes(lowerCaseQuery)) 
        );
      });
    },
         paginatedItems() {
      const startIndex = (this.page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      // Sort the filteredPurchaseHistory by created_date in descending order
      const sortedItems = this.filteredBrands.slice().sort((a, b) => {
         return new Date(b.created_date) - new Date(a.created_date);
      });
      return sortedItems.slice(startIndex, endIndex);
     }
    },
    mounted(){
        this.getAllBrands();
      this.userRole = localStorage.getItem("userRole");

        setTimeout(() => {
      this.loading = false; // Set loading to false when the operation is complete
    }, 3000);
    },
    methods:{
      validateForm(){
         this.$refs.purchaseOrderForm.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
         
          this.UpdateBrand();
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      }); 
    },
         UpdateBrand(){
      const postData = {
          "brand_name": this.saveBrand.brand_name,
          "area_pincode": this.saveBrand.area_pincode,
          "gst":  this.saveBrand.gst,
          "poc_name": this.saveBrand.poc_name,
          "poc_phone": this.saveBrand.poc_phone,
          "owner_name": this.saveBrand.owner_name,
          "owner_phone":this.saveBrand.owner_phone,
          "location": this.saveBrand.location,
          "address": this.saveBrand.address ,
          "brand_connect": this.saveBrand.brand_connect,
          "brand_category":  this.saveBrand.brand_category,
          "email_id": this.saveBrand.email_id,
     
          "brand_id": this.saveBrand.brand_id ,       
       
          "status": this.saveBrand.status === "Active" ? "1" : "0"
      }
        console.log('post',postData);
      this.updateBrands(postData).then((response)=>{
         if(response.data.status == 1){
              this.snackbarText = response.data.message;
              this.color = "primary";
              this.snackbar = true;
              this.dialog=false;
              this.saveBrand={};
              this.getAllBrands();
              }else{
              this.snackbarText = response.data.message;
              this.color = "on-background";
              this.snackbar = true;
              }
      })
    },

      editBrand(item){
        console.log('brand',item);
        this.dialog = true;
        this.saveBrand.brand_name = item.brand_name;
        this.saveBrand.brand_code = item.brand_code;
        this.saveBrand.brand_id = item.brand_id;
        this.saveBrand.brand_category = item.brand_category;
        this.saveBrand.brand_connect = item.brand_connect;
        this.saveBrand.email_id = item.email_id;
        this.saveBrand.status = item.status== 1 ? 'Active' : 'Inactive';;
        this.saveBrand.owner_name = item.owner_name;
        this.saveBrand.owner_phone = item.owner_phone;
        this.saveBrand.poc_name = item.poc_name;
        this.saveBrand.poc_phone = item.poc_phone;
        this.saveBrand.gst = item.gst;
        this.saveBrand.updated_date = item.updated_date;
        this.saveBrand.created_date = item.created_date;
        this.saveBrand.decision_authority = item.decision_authority;
        this.saveBrand.address = item.address;
        this.saveBrand.location = item.location;
        this.saveBrand.area_pincode = item.area_pincode;

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
        getAllBrands(){
            this.getBrands().then((response)=>{
               
                this.Brands = response.data;
                //  console.log('Brands',this.Brands)
                this.Brands.reverse();
            })
        }
    }
}
</script>
<style scoped>

</style>