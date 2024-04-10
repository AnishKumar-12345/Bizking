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
   <td class="text-center">{{ item.final_ret }}</td>
        <td class="text-center">
          {{ item.pitch_from }}
        </td>
          <td class="text-center">
            <!-- Select Field -->
            <VTextField
              v-model="item.inputs"                       
              :rules="marginrules"
            />
          </td>
        <!-- <td class="text-center">
           
        {{ item.hsn_code }}
        </td> -->
          <!-- <td class="text-center">
           
        {{ item.mrp }}
        </td> -->
        <!-- <td class="text-center">
          {{ item.status }}
        </td> -->
         <!-- <td class="text-center">
          <VChip
        :color="resolveStatusVariant(item.status).color"
        class="font-weight-medium"
        size="small"
      >
      {{ item.status == 1 ? 'Active' : 'Inactive'}}
    
            </VChip>
          
        </td>  -->
        <!-- <td class="text-center">
          {{ item.total_given_margin }}
        </td> -->
          
          
    <!-- <td class="text-center">
              <V-btn
                  icon
                  variant="text"
                  color="default"
                  class="mb-1 mt-2"
                  size="x-small"                 
                 @click="editOppertunity(item)"
                  >
                  
                      <VIcon
                        icon="ri-pencil-line"
                        size="22"        
                        color="#BA8B32"       
                        />   
                      </V-btn>     
                      
            </td> -->
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
            selectedBrand:null,
            userRole:'',
            createdby:'',
            loading:true,

            headers:[
                {text:'Select',value:'actions'},
                {text:'Brand Name',value:'brand_name'},
                {text:'Product Name',value:'sku_name'},
                {text:'UOM',value:'uom'},               
                {text:'Final Retails',value:'final_ret'},               
                {text:'Pitch From',value:'pitch_from'},               
          
                {text:'Margin',value:'inputs'},

            ]
        }
    },
    computed:{
      marginrules(){
        
      },
       filteredProducts(){
         const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
        return this.quotesdata.filter((item) => {
        return (
          // (item.lead_no && item.lead_no.toLowerCase().includes(lowerCaseQuery)) ||
          (item.brand_name && item.brand_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.sku_name && item.sku_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.uom && item.uom.toLowerCase().includes(lowerCaseQuery))          
      

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
         this.getQuotesdata()
            .then(() => {             
              this.loading = false;
            }) 
            .catch((error) => {             
              console.error('Error fetching merchants:', error);            
            });
    },
methods:{
   updatePagination(page) {
    this.page = page;
  },
  getQuotesdata(){
        return new Promise((resolve, reject) => {
          this.Quotesdata()
            .then((response) => {
              console.log('check',response);
              this.quotesdata = response.data.data;
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