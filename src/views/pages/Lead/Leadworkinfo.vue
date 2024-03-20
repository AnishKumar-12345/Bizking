<template>
   <div>
     <VRow>
      <VCol cols="12">
        <VCard
          title="Work Info"
          class="mb-4"
        >
          <VCardText>
            <!-- 👉 Form -->
            <VForm class="mt-6"  ref="purchaseOrderForm">
              <VRow>

                <VCol
                  md="6"
                  cols="12"
                >
                  <!-- :items="['PO1', 'PO2', 'PO3','PO4','PO5']" -->

                  <VTextField
                   
                    label="Summary"
                    readonly
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                  
                    label="Visit Status"
                    readonly
                  />
                </VCol>

               

                <VCol
                 
                  cols="12"
                >
                <!-- {{this.inputStock.po_status}} -->
                     <!-- :items="['Draft', 'Created', 'Shared', 'Acknowledged', 'Received', 'Close']" -->
                  <VTextarea
                 
                    label="Working Notes"
                      
          row-height="30"
          rows="4"
          variant="filled"
          auto-grow
          shaped

                    
                  />
                </VCol>

                <VCol cols="12">
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
        v-for="(item,index) in workInfo"
        :key="index"

         
      >       
        <td class="text-center">{{ index }}</td>

        <td class="text-center">{{ item.created_date }}</td>
        <td class="text-center">
          {{ item.updated_date }}
        </td>
        <td class="text-center">
           
        {{ item.summary }}
        </td>
          <!-- <td class="text-center">
           
        {{ item.mrp }}
        </td> -->
        <td class="text-center">
          {{ item.working_notes }}
        </td>
         <td class="text-center">
          {{ item.visit_status }}
        </td>
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
          
          
    <td class="text-center">
              <V-btn
                  icon
                  variant="text"
                  color="default"
                  class="mb-1 mt-2"
                  size="x-small"                 
                 @click="editWorkinfo(item)"
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
                </VCol>

              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
     </VRow>
     
   </div>
</template>
<script>
import servicescall from '@/Services'
export default {    
    mixins: [servicescall], 
    data(){
        return{
        Leadid:'',
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
            workInfo:[],
            headers:[
               {text:'SNo',value:'brand_name'},
                {text:'Date',value:'created_date'},
                {text:'Updated Date',value:'updated_date'},
                {text:'Summary',value:'summary'},
                {text:'Notes',value:'working_notes'},
                {text:'Status',value:'visit_status'},    
                {text:'Action',value:'action'},    

            ]
        }
    },
    mounted(){
      this.Leadid = this.$route.query.lead_id;
      console.log('check the id',this.Leadid);
      this.updateLeadsdata();
    },
methods:{
   updateLeadsdata(){
      this.updateLeads(this.Leadid).then((response)=>{
        console.log('check response',response.data.data.work_info);
       this.workInfo = response.data.data.work_info;

        // this.saveLeads.poc_phone = response.data.data.poc_phone;
        // this.saveLeads.poc_phone = response.data.data.poc_phone;


      })
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