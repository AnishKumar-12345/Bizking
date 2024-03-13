<template>
   <div>
     <VTable 
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
       <tr
        v-for="(item,index) in oppitems"
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
          <!-- <VChip
        :color="resolveStatusVariant(item.status).color"
        class="font-weight-medium"
        size="small"
      >
      {{ item.status == 1 ? 'Active' : 'Inactive'}}
    
            </VChip> -->
            {{item.status}}
          
        </td> 
        <!-- <td class="text-center">
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

             oppitems : [
            {
              brand_name: 'Frozen Yogurt',
              sku_name: 159,
              uom: 6,
              hsn_code: 24,
              mrp: 4,

              status: 'active',
            
            },
            {
              brand_name: 'Ice cream sandwich',
              sku_name: 237,
              uom: 6,
              hsn_code: 24,
              mrp: 4,
               status: 'active',
            },
            {
              brand_name: 'Eclair',
              sku_name: 262,
              uom: 6,
              hsn_code: 24,
              mrp: 4,
               status: 'active',
            },
            {
              brand_name: 'Cupcake',
              sku_name: 305,
              uom: 6,
              hsn_code: 24,
              mrp: 4,
               status: 'active',
            },
            {
              brand_name: 'Gingerbread',
              sku_name: 356,
              uom: 6,
              hsn_code: 24,
              mrp: 4,
               status: 'active',
            },
          ],
            headers:[
               {text:'Lead',value:'brand_name'},
                {text:'Type',value:'sku_name'},
                {text:'Store Name',value:'uom'},
                {text:'Address',value:'hsn_code'},
                {text:'Location',value:'mrp'},
                {text:'Status',value:'status'},
                // {text:'Total Given Margin',value:'total_given_margin'},
                // {text:'SGST',value:'sgst'},
                // {text:'CGST',value:'cgst'},
                // {text:'Pitch From',value:'pitch_from'},            
                // {text:'Final Retail CP',value:'final_retail_cp'},
                // {text:'Final Retail',value:'final_ret'},
                //  {text:'BK Profit',value:'bk_profit'},
                // {text:'Bizking CP Final',value:'bizkingz_cp_final'},
                // {text:'BC Margin Amount',value:'bc_margin_amt'},
                // {text:'BC Margin',value:'bc_margin'},
                // {text:'Location',value:'location'},
                // {text:'Area Pincode',value:'area_pincode'},
                {text:'Action',value:'actions'},
            ]
        }
    },
methods:{
  editProduct(){
     this.$router.push({
          name: 'Leadbasicdataview', // Replace with the actual name of your route
        //   query: { so_id: item.so_id }
        });
  }
}

}
</script>