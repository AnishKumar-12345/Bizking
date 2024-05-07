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

     <VRow v-if="this.attachments.length === 0">
      <VCol cols="12"> 
        <VCard title="Purchase Order View">
          <VCardText> 
            <!-- 👉 Checkbox and Button  -->
            <VAlert
              color="warning"
              variant="tonal"
              class="mb-4"              
              border="top"
            >
              <VAlertTitle class="mb-1"> Are you sure you Having Attachments? </VAlertTitle>
              <p class="mb-0">
                The system is not retrieving the Attachments. Please ensure that you have applied!</p>
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
     </VRow>

 <div v-if="loading2"  class="loading-container" >
      <VProgressLinear
            height="5"
            color="primary"
            indeterminate
            class="custom-loader"  
            full-width              
        />          
     </div>

      <div style="max-width:400px" v-if="this.attachments.length !== 0">
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

      <VTable v-if="this.attachments.length !== 0"
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
        v-for="(item,index) in paginatedItems"
        :key="index"         
      >   
       <td class="text-center">{{ (page - 1) * pageSize + index + 1 }}</td>
        <td class="text-center">{{ item.quatation_number }}</td>       
    
       <td class="text-center" >
           <VBtn            
              icon
              variant="text"
              color="default"
              class="me-2"
              size="x-small"
              @click="getPDFupdate(item.quotation_file)"
            >
              <VIcon
                color="error"
                icon="iwwa:file-pdf"
                size="26"
              />
            </VBtn>
        </td>
      </tr>

       <tr v-if="filteredSalesHistory.length === 0">
          <td colspan="16" class="text-center"><h1>No data found !</h1></td>
      </tr>  

      </tbody>        
        </VTable>
          <VPagination
  v-model="page"
  :length="Math.ceil(filteredSalesHistory.length / pageSize)"
  @input="updatePagination"
/>
</div>
</template>
<script>
import servicescall from '@/Services'

export default {
    mixins: [servicescall], 
   data(){
    return{
        attachments:[],
        OppertunityID:null,
        loading:true,
        searchQuery:'',
        page: 1,
        pageSize: 10,
        headers:[
               {text:'No. ',value:'quatation_number'},
               {text:'Quotation ',value:'quatation_number'},
               {text:'PDF ',value:'quotation_file'}
        ]
    }
   },
   computed:{
     filteredSalesHistory() {
      const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
      return this.attachments.filter((item) => {
        // Filter based on search query
        const matchesSearch = (
          (item.quatation_number && item.quatation_number.toLowerCase().includes(lowerCaseQuery)) 
         

        );
        
        return matchesSearch ;
      });
    },
        paginatedItems() {
        const startIndex = (this.page - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.filteredSalesHistory.slice(startIndex, endIndex);
    },
   },
      mounted(){
      this.OppertunityID = this.$route.query.opportunity_id;
         this.getAttachmentreport()
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
     getPDFupdate(id){
      this.loading2 = true;
       window.open(id, '_blank');
        this.loading2 = false;
      // this.getPurchasePDF(id).then((response)=>{
      //   console.log(response)
      //   const pdfUrl = response.data.po_file;
      //   this.loading2 = false;
        
      // })
    },
    getAttachmentreport(){        
            return new Promise((resolve, reject) => {
                this.attachmentsdata(this.OppertunityID)
                  .then((response) => {
                     console.log("ste rues",response);
                      this.attachments = response.data.data;
                    // this.products = response.data.data;
                      this.attachments.reverse();
                      resolve(); // Resolve the promise when API call is successful
                  })
                  .catch((error) => {
                    console.error('Error fetching merchants:', error);
                    reject(error); // Reject the promise if there's an error
                  });
              });

        // this.attachmentsdata(this.OppertunityID).then((response)=>{
        //     console.log("ste rues",response);
        //     this.attachments = response;
        // })
    }
   }
}
</script>
<style scoped>

</style>