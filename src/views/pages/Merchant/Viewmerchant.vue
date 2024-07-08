<template>
  <div>
     <div style="max-width:400px" v-if="this.merchants != null">
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

 
     <VTable v-if="this.merchants != null"
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

         <tr v-if="filteredMerchants.length === 0">
          <td colspan="16" class="text-center"><h1>No data found !</h1></td>
         </tr> 

       <tr
        v-for="(item,index) in paginatedItems"
        :key="index"

         
      >       
        <td class="text-center">{{ item.city }}</td>
        <td class="text-center">{{ item.location }}</td>
        <td class="text-center">{{ item.billing_address }}</td>

        <td class="text-center">{{ item.sales_person }}</td>

        <td class="text-center">{{ item.merchant_name }}</td>
        <td class="text-center">
          {{ item.merchant_uid }}
        </td>
        <td class="text-center">
           <!-- <VChip
        :color="resolveStatusVariant(item.po_status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ item.po_status }}
    
            </VChip> -->
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
          {{ item.shop_size }}
        </td>  
         <td class="text-center">
          {{ item.shop_type }}
        </td>   
        <td class="text-center">
          {{ item.latitude }}
        </td>  
         <td class="text-center">
          {{ item.longitude }}
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
          {{ item.gst }}
        </td>   
        <td class="text-center">
          {{ item.updated_date }}
        </td>   
           <td class="text-center">
          {{ item.created_by }}
        </td>   
        <td class="text-center">
          {{ item.created_date }}
        </td>
          <!-- <td class="text-center">
          {{ item.decision_authority }}
        </td> -->
          <td class="text-center">
          {{ item.store_address }}
        </td>
          <!-- <td class="text-center">
     
          {{ item.location }}
        </td> -->
          <td class="text-center">
          {{ item.area_pincode }}
        </td>         
    <td class="text-center" >
              <V-btn
                  icon
                  variant="text"
                  color="default"
                  class="mb-1 mt-2"
                  size="x-small"
                  style="margin-left: auto; display: block;"
                 @click="editmerchant(item)"
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
            :length="Math.ceil(filteredMerchants.length / pageSize)"
            @input="updatePagination"
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
            <VCol
                cols="12"
                md="6"
              >
              <!-- {{this.saveMerchant.city_id}} -->
                <VAutocomplete
                  v-model="this.saveMerchant.city_id"
                  label="City Names"              
                  :items="locationsdata"
                   item-title="text"
                  item-value="value"
                  :rules="locationrules"
                  required
                  readonly
                   @update:model-value="handleBrandSelection(this.saveMerchant.city_id)"

                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
              <!-- {{selectedBrand}} -->  
              <!-- {{this.Addbrand.location_id}} -->
                <VAutocomplete
                  v-model="this.saveMerchant.location_id"
                  label="City Location"
                  :items="this.cityLoaction"               
                  item-value="value"
                  item-title="text"
                  :rules="locationrules2"
                  :menu-props="{ maxHeight: 200 }"
               
                />
              </VCol>            
            
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="this.saveMerchant.merchant_uid"
                  label="Merchant UID"
                  :rules="uidrules"
                  required
                />
              </VCol>
      
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="this.saveMerchant.merchant_name"
                  label="Merchant Name"
                  :rules="namerules"
                  required
                />
              </VCol>
            
            <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveMerchant.gst"
                  label="GST"
                
                  required
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveMerchant.area_pincode"                
                  label="Area Pincode"
                  :rules="pinrules"
                  required
                />
              </VCol>
             <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveMerchant.owner_name"                
                
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
                  v-model="this.saveMerchant.owner_phone"                
                
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
                  v-model="this.saveMerchant.poc_name"                
                 
                  label="POC Name"
                  :rules="namerules"
                  required
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveMerchant.poc_phone"                
                
                  label="POC Phone"
                  :rules="phonerules"
                  required
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                  v-model="this.saveMerchant.shop_size"                
                
                  label="Shop Size"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                  <VTextField
                  v-model="this.saveMerchant.shop_type"                
                
                  label="Shop Type"
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                  <VTextField
                  v-model="this.saveMerchant.location"                
                
                  label="Location"
                />
              </VCol>

                <VCol
                md="6"
                cols="12"
              >
              <!-- {{this.saveMerchant.sales_person}} -->
                <VSelect
                  v-model="this.saveMerchant.sales_person"              
                 
                  label="Sales Person"
                  :items="this.salesdata"
                item-value="value"
                item-title="text"
                 :rules="namerulessale"
                  required
                />
              </VCol>

                 
              <VCol            
                md="6"
                cols="12"
              >
              <!-- {{this.salesdata}} -->
                <VTextField
                  v-model="this.saveMerchant.latitude"               
                 
                  label="Latitude"
                 :rules="latitude"
                />
              </VCol>
                <VCol            
                md="6"
                cols="12"
              >
              <!-- {{this.salesdata}} -->
                <VTextField
                  v-model="this.saveMerchant.longitude"               
                 
                  label="Longitude"
                 :rules="Logitude"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
              <!-- {{this.saveMerchant.sales_person}} -->
                <VSelect
                  v-model="this.saveMerchant.status"                
                 
                  label="Status"
                  :items="['Active','Inactive']"
                
                 
                  required
                />
              </VCol>
              <VCol            
                md="6"
                cols="12"
              >
              <!-- {{this.salesdata}} -->
                <VTextField
                  v-model="this.saveMerchant.store_address"               
                 
                  label="Store Address"
                 :rules="storerules"
                />
              </VCol>

               <VCol            
                md="6"
                cols="12"
              >
              <!-- {{this.salesdata}} -->
                <VTextField
                  v-model="this.saveMerchant.billing_address"               
                 
                  label="Billing Address"
                
                />
              </VCol>

              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="validateForm()">Save</VBtn>

                <!-- <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
               
                >
                  Reset
                </VBtn> -->
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
            storerules:[
          (v) => !!v || 'Store Address is required',
         ],
       uidrules: [
         (v) => !!v || 'UID is required',
      ],
       namerules: [
         (v) => !!v || 'Name is required',
        //  (v) => /^[a-z A-Z]+$/.test(v) || 'Only letters are allowed in the name'
         
      ],
      namerulessale:[
         (v) => !!v || 'Name is required',
      ],
       gstrules: [
               (v) => !!v || "GST is required",
     
      ],
        locationrules: [
               (v) => !!v || "Branch is required",
     
      ],
       pinrules: [
         (v) => !!v || 'PIN is required',
          (v) => (v && /^\d{6}$/.test(v)) || 'PIN must be 6 digits'
      ],
       phonerules: [
         (v) => !!v || " Mobile  is required",
        (v) => /^[0-9]+$/.test(v) || "only number are accepted",
        (v) =>
          (v && v.length <= 10 && v.length >= 10) ||
          "Mobile must be  10 number",
      ],
        Logitude: [
  (v) => !!v || 'Longitude is required',
  (v) => /^\s*-?(\d+(\.\d+)?|[0-8]?\d(\.\d+)?|90(\.0+)?)\s*$/.test(v) || 'Invalid Longitude Format',
],

latitude: [
  (v) => !!v || 'Latitude is required',
  (v) => /^\s*-?([0-8]?\d(\.\d+)?|90(\.0+)?|[1-8]?\d(\.\d+)?|89(\.999+)?|[1-8]\d(\.\d+)?|90\.0+?)\s*$/.test(v) || 'Invalid Latitude Format',
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
            merchants:[],
            saveMerchant:{
              "merchant_uid": "",
              "merchant_name": "",
              "merchant_id":"",
              "merchant_code":"",
              "store_address": "",
              "gst": "",
              "area_pincode": "",

              "poc_name": "",
              "poc_phone": "",
              "owner_name": "",

              "owner_phone": "",
              // "decision_authority": "",
              "shop_size": "",
              "shop_type": "",

              "location": "",           
              "sales_person": "",
              "created_date": "",
              "latitude":"",
              "longitude":"",
              "status": "",
              "created_by": "",
              "city_id":"",
              "location_id":""
            },
            salesdata:[],
            cityID:null,
            createdby:'',
            locationsdata:[],
            cityLoaction:[],
            headers:[
               {text:'City Name',value:'branch'},
               {text:'City Location',value:'location'},
               {text:'Billing Address',value:'billing_address'},

               {text:'Sales Associate',value:'sales_person'},
                {text:'Merchant Name',value:'merchant_name'},
                {text:'Merchant UID',value:'merchant_uid'},
                {text:'Owner Name',value:'owner_name'},
                {text:'Owner Phone',value:'owner_phone'},
                {text:'POC Name',value:'poc_name'},
                {text:'POC Phone',value:'poc_phone'},
                {text:'Shop Size',value:'shop_size'},
                {text:'Shop Type',value:'shop_type'},
                {text:'Latitude',value:'latitude'},
                {text:'Longitude',value:'longitude'},
                {text:'Status',value:'status'},            
                {text:'GST',value:'gst'},
                {text:'Update Date',value:'updated_date'},
                 {text:'Created By',value:'created_by'},
                {text:'Created Date',value:'created_date'},
                // {text:'Decision Authority',value:'decision_authority'},
                {text:'Store Address',value:'store_address'},
                // {text:'Location',value:'location'},
                {text:'Area Pincode',value:'area_pincode'},
                {text:'Action',value:'actions'},
            ]
        }
    },
    computed:{
         filteredMerchants(){
         const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
        return this.merchants.filter((item) => {
        return (
          (item.branch && item.branch.toLowerCase().includes(lowerCaseQuery)) ||

          (item.sales_person && item.sales_person.toLowerCase().includes(lowerCaseQuery)) ||
          (item.merchant_name && item.merchant_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.merchant_uid && item.merchant_uid.toLowerCase().includes(lowerCaseQuery)) ||
          (item.owner_name && item.owner_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.owner_phone && item.owner_phone.toLowerCase().includes(lowerCaseQuery)) ||
          (item.poc_name && item.poc_name.toLowerCase().includes(lowerCaseQuery))|| 
          (item.poc_phone && item.poc_phone.toLowerCase().includes(lowerCaseQuery)) ||
          (item.shop_size && item.shop_size.toLowerCase().includes(lowerCaseQuery))  ||
          (item.shop_type && item.shop_type.toLowerCase().includes(lowerCaseQuery)) ||
          (item.status && item.status.toLowerCase().includes(lowerCaseQuery)) ||
          (item.gst && item.gst.toLowerCase().includes(lowerCaseQuery)) ||
          (item.updated_date && item.updated_date.toLowerCase().includes(lowerCaseQuery)) ||
          (item.created_date && item.created_date.toLowerCase().includes(lowerCaseQuery)) ||
          (item.decision_authority && item.decision_authority.toLowerCase().includes(lowerCaseQuery)) ||
          (item.store_address && item.store_address.toLowerCase().includes(lowerCaseQuery)) ||
          (item.location && item.location.toLowerCase().includes(lowerCaseQuery)) ||
          (item.area_pincode && item.area_pincode.toLowerCase().includes(lowerCaseQuery))||
          (item.latitude && item.latitude.toString().includes(lowerCaseQuery))||
          (item.longitude && item.longitude.toString().includes(lowerCaseQuery))


        );
      });
    },
         paginatedItems() {
      const startIndex = (this.page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      // Sort the filteredPurchaseHistory by created_date in descending order
      const sortedItems = this.filteredMerchants.slice().sort((a, b) => {
         return new Date(b.created_date) - new Date(a.created_date);
      });
      return sortedItems.slice(startIndex, endIndex);
   }
    },
     watch: {
  'saveMerchant.city_id': function(newCityId, oldCityId) {
    if (newCityId !== oldCityId) {
      this.handleBrandSelection(newCityId);
    }
  }
},
    mounted(){
      this.getBranchnames();
      this.cityID = localStorage.getItem("city_id");

        // this.getmerchants();
        this.createdby =  localStorage.getItem('user_id');
        //  setTimeout(() => {
        //       this.loading = false; // Set loading to false when the operation is complete
        //     }, 7000);

           this.getmerchantdetails()
            .then(() => { 
              // Set loading to false when API call is successful
              this.loading = false;
            })
            .catch((error) => {
              // Handle any errors if the API call fails
              console.error('Error fetching merchants:', error);
              // You might want to set loading to false here as well
              // Depending on how you want to handle API errors
            });

            this.getAllsales();
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

         validateForm(){
      this.$refs.purchaseOrderForm.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
         
          this.updatemerchant();
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      }); 
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

      updatemerchant(){
          const postData = {
          "merchant_uid": this.saveMerchant.merchant_uid,
          "merchant_name": this.saveMerchant.merchant_name,
          "merchant_code": this.saveMerchant.merchant_code,

          "store_address":  this.saveMerchant.store_address,
          "gst": this.saveMerchant.gst,
          "status":  this.saveMerchant.status === "Active" ? "1" : "0",

          "area_pincode": this.saveMerchant.area_pincode,
          "poc_name": this.saveMerchant.poc_name,
          "poc_phone": this.saveMerchant.poc_phone,

          "owner_name": this.saveMerchant.owner_name,
          "owner_phone": this.saveMerchant.owner_phone,
          "merchant_id":  this.saveMerchant.merchant_id,

          "shop_size": this.saveMerchant.shop_size,
          "shop_type": this.saveMerchant.shop_type,
          "location": this.saveMerchant.location,
          "longitude": this.saveMerchant.longitude,
          "latitude": this.saveMerchant.latitude,
          "city_id" : this.saveMerchant.city_id,
          "location_id" : this.saveMerchant.location_id,
          "created_by":  this.createdby ,
          "sales_person": this.saveMerchant.sales_person,
          "created_date": this.saveMerchant.created_date,
          "billing_address": this.saveMerchant.billing_address,

      }
      console.log('post',postData);
      this.updateMerchantdetailsdata(postData).then((response)=>{
         if(response.data.status == 1){
              this.snackbarText = response.data.message;
              this.color = "primary";
              this.snackbar = true;
              this.dialog=false;
              this.saveMerchant={};
                this.getmerchantdetails();
              }else{
              this.snackbarText = response.data.message;
              this.color = "on-background";
              this.snackbar = true;
              }
      })
      },
         getAllsales(){
      this.getsalesperson().then((response)=>{
        // console.log('sales',response);
        this.salesdata = response.data.data;
   
         this.salesdata = this.salesdata.map(sales => ({
            value: sales.user_id,
            text: sales.name
        }));
           console.log('sales',this.salesdata);

      })
    },
      editmerchant(item){
        console.log('check the edit',item.merchant_id);
        this.getMerchantdetailsdata(item.merchant_id).then((response)=>{
          console.log('set merchnt',response);
          if(response.data.status == 1){
            this.dialog = true;
           this.saveMerchant.merchant_uid = response.data.data.merchant_uid;
           this.saveMerchant.merchant_id = response.data.data.merchant_id;
           this.saveMerchant.created_date = response.data.data.created_date;
           this.saveMerchant.merchant_code = response.data.data.merchant_code;

            this.saveMerchant.merchant_name = response.data.data.merchant_name;
             this.saveMerchant.gst = response.data.data.gst;
              this.saveMerchant.area_pincode = response.data.data.area_pincode;

               this.saveMerchant.owner_name = response.data.data.owner_name;
                this.saveMerchant.owner_phone = response.data.data.owner_phone;
                 this.saveMerchant.poc_name = response.data.data.poc_name;
                  this.saveMerchant.latitude = response.data.data.latitude;
                  this.saveMerchant.longitude = response.data.data.longitude;
                  this.saveMerchant.poc_phone = response.data.data.poc_phone;
                   this.saveMerchant.shop_size = response.data.data.shop_size;
                    this.saveMerchant.shop_type = response.data.data.shop_type;
                    this.saveMerchant.billing_address = response.data.data.billing_address;

                  this.saveMerchant.city_id = this.locationsdata.find(location => location.value === response.data.data.city_id)?.value || response.data.data.city_id;
                  // this.saveMerchant.location_id =  response.data.data.location_id;
this.saveMerchant.location_id = this.cityLoaction.find(location => location.value === response.data.data.location_id)?.value || response.data.data.location_id;
                     this.saveMerchant.location = response.data.data.location;
                      this.saveMerchant.sales_person = response.data.data.sales_person == this.salesdata.value ? this.salesdata.map(sales => ({
                          value: sales.user_id,
                          text: sales.name
                      })) : response.data.data.sales_person,
                       this.saveMerchant.store_address = response.data.data.store_address;
                      
                       this.saveMerchant.status = response.data.data.status == 1 ? 'Active' : 'Inactive';

            // this.$router.push({
            //     name: 'Onboardmerchantdetails'
            // }); 
          }
        })
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
        // getmerchants(){
        //     this.getMerchantdetails().then((response)=>{
        //         // console.log('merchants',response)
        //         this.merchants = response.data.data;
        //         this.merchants.reverse();
        //     })
        // }
        getmerchantdetails() {
        return new Promise((resolve, reject) => {
          this.getMerchants(this.cityID)
            .then((response) => {
              this.merchants = response.data.data;
              this.merchants.reverse();
              resolve(); // Resolve the promise when API call is successful
            })
            .catch((error) => {
              console.error('Error fetching merchants:', error);
              reject(error); // Reject the promise if there's an error
            });
        });
      }, 
    }
}
</script>
<style scoped>

</style>