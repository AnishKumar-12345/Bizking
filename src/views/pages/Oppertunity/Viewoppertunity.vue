<template>
   <div>

   <VRow v-if="this.opportunity == null">
      <VCol cols="12"> 
        <VCard title="Lead View">
          <VCardText> 
            <!-- 👉 Checkbox and Button  -->
            <VAlert
              color="warning"
              variant="tonal"
              class="mb-4"              
              border="top"
            >
              <VAlertTitle class="mb-1"> Are you sure you gave Opportunity? </VAlertTitle>
              <p class="mb-0">
                The system is not retrieving the Opportunity. Please ensure that you have applied for Opportunity !</p>
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
     </VRow>

    <div style="max-width:400px" v-if="this.opportunity != null">
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

     <VTable 
     v-if="this.opportunity != null"
       :headers="headers"
    
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
        
          <tr v-if="filteredProducts.length === 0">
          <td colspan="16" class="text-center"><h1>No data found !</h1></td>
        </tr>  

       <tr
        v-for="(item,index) in paginatedItems"
        :key="index"

         
      >       
        <!-- <td class="text-center">{{ item.lead_no }}</td> -->

        <td class="text-center">{{ item.lead_type }}</td>
          <td class="text-center">
          {{ item.created_by }}
        </td>
         <td class="text-center">
          {{ item.decision_authority }}
        </td>
        <td class="text-center">
          {{ item.name }}
        </td>
        <td class="text-center">           
        {{ item.address }}
        </td>
        <!-- <td class="text-center">
          {{ item.location }}
        </td> -->
         <td class="text-center">
          <VChip
        :color="resolveStatusVariant(item.status).color"
        class="font-weight-medium"
        size="small"
      >
      {{ item.status}}
    
            </VChip>
            <!-- {{item.status}} -->
          
        </td> 
        <td class="text-center">
          {{ item.gst }}
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
        <!-- <td class="text-center">
          {{ item.updated_date }}
        </td>   
           <td class="text-center">
          {{ item.created_date }}
        </td>    -->
        <td class="text-center">
          {{ item.pincode }}
        </td>
          <!-- <td class="text-center">
          {{ item.bc_margin_amt }}
        </td>
          <td class="text-center">
          {{ item.bc_margin }}
        </td> -->
           
         <td class="text-center" >
               <V-btn
                  icon
                  variant="text"
                  color="default"
                  class="mb-1 mt-2"
                  size="x-small"
                 
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
   </div>
</template>
<script>
import servicescall from '@/Services'
export default {    
    mixins: [servicescall], 
    data(){
        return{
           page: 1,
            pageSize: 10,
             loading:true,
            searchQuery:'',

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
            // salesdata:[],
            // BrandNames:[],
            selectedBrand:null,
            userRole:'',
            createdby:'',
             userid:"",
            leadData:[],
            opportunity:[],
            headers:[
                // {text:'Lead',value:'lead_no'},
                {text:'Type',value:'lead_type'},
                {text:'Created By',value:'created_by'},
                {text:'Decision Authority',value:'decision_authority'},
                {text:'Name',value:'name'},
                {text:'Address',value:'address'},
                // {text:'Location',value:'location'},
                {text:'Status',value:'status'},
                {text:'GST',value:'gst'},
                {text:'Owner Name',value:'owner_name'},
                {text:'Owner Phone',value:'owner_phone'},
                {text:'Poc Name',value:'poc_name'},
                {text:'Poc Phone',value:'poc_phone'},
                // {text:'Updated Date',value:'updated_date'},
                // {text:'Created Date',value:'created_date'},
                {text:'PinCode',value:'pincode'},             
                {text:'Action',value:'actions'},
            ]
        }
    },
    computed:{
        //  leadfilter(){
        //     return this.leadData.filter(name => name.status != "closed");
        //  },
         filteredProducts(){
         const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
        return this.opportunity.filter((item) => {
        return (
          // (item.lead_no && item.lead_no.toLowerCase().includes(lowerCaseQuery)) ||
          (item.lead_type && item.lead_type.toLowerCase().includes(lowerCaseQuery)) ||
          (item.name && item.name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.address && item.address.toLowerCase().includes(lowerCaseQuery)) ||
           (item.created_by && item.created_by.toLowerCase().includes(lowerCaseQuery)) ||
          (item.location && item.location.toLowerCase().includes(lowerCaseQuery))|| 
          (item.status && item.status.toLowerCase().includes(lowerCaseQuery)) ||
          (item.gst && item.gst.toLowerCase().includes(lowerCaseQuery))  ||
          (item.owner_name && item.owner_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.owner_phone && item.owner_phone.toLowerCase().includes(lowerCaseQuery)) ||
          (item.poc_name && item.poc_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.poc_phone && item.poc_phone.toString().includes(lowerCaseQuery)) || 
          // (item.updated_date && item.updated_date.toLowerCase().includes(lowerCaseQuery)) ||
          // (item.created_date && item.created_date.toLowerCase().includes(lowerCaseQuery)) ||
          (item.pincode && item.pincode.toLowerCase().includes(lowerCaseQuery)) || 
          (item.decision_authority && item.decision_authority.toLowerCase().includes(lowerCaseQuery))
      

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
    // this.userid = localStorage.getItem('user_id');
    // this.getOpportunitiesdata();
    //  setTimeout(() => {
    //   this.loading = false; // Set loading to false when the operation is complete
    // }, 3000);
      this.getOpportunitiesdata()
            .then(() => {             
              this.loading = false;
            }) 
            .catch((error) => {             
              console.error('Error fetching merchants:', error);            
            });

    },
methods:{
  resolveStatusVariant(itm){
      if(itm == "Partially interested" || itm == "partially interested"){
          return{
            color:"warning"
          }
        }else if (itm == "Closed" || itm == "closed"){
          return{
            color:"success"
          }
        }else if (itm == "Created" || itm == "created" ){
          return{
            color:"primary"
          }
        }else {
           return{
            color:"error"
          }
        }
  },
   updatePagination(page) {
    this.page = page;
  },
  getOpportunitiesdata(){
    // this.getOppertunities().then((response)=>{
    //   console.log('res',response);
    //   this.opportunity = response.data.data;
    //   this.opportunity.reverse();
    // })    
      return new Promise((resolve, reject) => {
          this.getOppertunities()
            .then((response) => {
              this.opportunity = response.data.data;
              this.opportunity.reverse();
              resolve(); // Resolve the promise when API call is successful
            })
            .catch((error) => {
              console.error('Error fetching merchants:', error);
              reject(error); // Reject the promise if there's an error
            });
        });

  },
  editProduct(item){ 
     this.$store.commit('setSelectedItem', item);
     console.log('check id',item);
     this.$router.push({
          name: 'Oppertunitybasicdataview', // Replace with the actual name of your route
          query: { opportunity_id: item.opportunity_id } 
        });
  }
}

}
</script>