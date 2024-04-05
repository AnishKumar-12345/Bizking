<template>
    <div>
         <VRow>
      <VCol cols="12">
       <VCard title="Add Service" class="mb-4">       

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6 ">
            <VRow>
    
              <VCol
                md="6"
                cols="12"
              >
              <!-- :items="['Merchant','Brand']" -->
                <VSelect
                 
                  label="Service Type"
                  :items="['Margin','Margin + Fee','Fee']" 
                />
              </VCol>


            
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                
                  label="Service Name"
               
                />
              </VCol>
      
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                
                  label="Service Value"
                />
              </VCol>
            
            <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                
                  label="Service Details"
                />
              </VCol>

              <!-- <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                
                  label="GST"
                />
              </VCol>
             <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                
                  label="Area PinCode"
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                
                  label="Location"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                
                  label="POC Name"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                
                  label="POC Phone"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                 <VTextField
                
                  label="Owner Phone"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                 <VSelect
                
                  label="Decision Authority"
                  :items="['POC','Owner']"
                />
              </VCol> -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn>Save</VBtn>

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

     <!-- <VDivider />
    <V-btn
     icon
     variant="text"
     color="default"
     class="mb-4 mt-4"
     size="small"
     style="margin-left: auto; display: block;"
     @click="openproductdialog()"
    >
    
        <VIcon
          icon="mdi-plus-box"
          size="30"        
          color="#BA8B32"       
          />   
        </V-btn>          -->
  <!-- class="mb-4 mt-4" -->

    

 
    </div>
</template>
<script>
export default {
   data(){
    return{
        dialog: false,
          data: [
            {
                po: 'PO001',
                ODate: '2024.01.12',
                status: 'Draft',
                OT: 24,
                ST: 4,
                total: 5,

            },
            {
                po: 'PO002',
                ODate: '2024.01.12',
                status: 'Created',
                OT: 24,
                ST: 4,
                total: 5,

            },
            {
                po: 'PO003',
                ODate: '2024.01.12',
                status: 'Created',
                OT: 24,
                ST: 4,
                total: 5,

            },
            {
                po: 'PO004',
                ODate: '2024.01.12',
                status: 'Draft',
                OT: 24,
                ST: 4,
                total: 5,

            },
            {
                po: 'PO005',
                ODate: '2024.01.12',
                status: 'Shared',
                OT: 24,
                ST: 4,
                total: 5,

            },
              {
                po: 'PO006',
                ODate: '2024.01.12',
                status: 'Acknowledged',
                OT: 24,
                ST: 4,
                total: 5,

            },
              {
                po: 'PO007',
                ODate: '2024.01.12',
                status: 'Acknowledged',
                OT: 24,
                ST: 4,
                total: 5,

            },
              {
                po: 'PO008',
                ODate: '2024.01.12',
                status: 'Acknowledged',
                OT: 24,
                ST: 4,
                total: 5,
            },
    ],
      headers: [
        { text: 'Purchase Order', value: 'po' },
        { text: 'Order Date', value: 'ODate' },
        { text: 'Status', value: 'status' },
        { text: 'Order To', value: 'OT' },
        { text: 'Shipped To', value: 'ST' },
        { text: 'Total', value: 'total' },
        { text: 'Action', value: 'actions', sortable: false },        

      ],
    }
   },
   methods:{
     deleteRow(item) {
      // Implement your logic to delete the row
      const index = this.data.indexOf(item);
      if (index !== -1) {
        this.data.splice(index, 1);
      }
    },

      openproductdialog(){
    // console.log('check the dialog')
      this.dialog = true;
   },
    closeDialog() {
      this.dialog = false;
    },
   },
 
}
</script>
<style scoped>

</style>