<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard
          title="Trip Bulk Upload"
          class="mb-4"
        >
          <VCardText>
            <!-- 👉 Form -->
            <VForm
              class="mt-6"
              ref="tripform"
            >
              <VRow>
              

              

                <VCol
                  cols="12"
                  md="6"
                >
                     <VFileInput
                 
                    label="File Choose"
                    accept=".csv, .xls, .xlsx"                    
                  
                  multiple
                  />
                </VCol>
                <!-- {{this.Importcsv}} -->

                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                 
                >
                  <VBtn  @click="validateForm">Submit</VBtn>
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

  data() {
   return{
   
   }
  },
  


 
}
</script>
<style></style>
