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
                  md="6"
                  cols="12"
                >
                  <VFileInput
                    v-model:file="Importcsv"
                    label="File Browse"
                    accept=".csv, .xls, .xlsx"                    
                    @input="handleFileChange"
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
      Importcsv: null,
    
   }
  },
  methods:{
     handleFileChange(event) {
       if (event.target.files.length > 0) {
        this.Importcsv = event.target.files[0];
        console.log('File Selected:', this.Importcsv);
      } else {
        // Clear the file input when no file is selected
        this.Importcsv = null;
      }
    },
      validateForm() {
      this.$refs.tripform.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
          this.uploadTripdata()
        } else {
          this.snackbar = true
          this.snackbarText = 'Please give all mandatory fields'
          this.color = 'on-background'
        }
      })
    },
     uploadTripdata() {
      const formData = new FormData()
      if (this.Importcsv) {
        formData.append('import_csv', this.Importcsv)
      }
     for (const pair of formData.entries()) {
              console.log("Trip Data",`${pair[0]}: ${pair[1]}`);
          }
      this.Uploadtrip(formData)
        .then(response => {
          if (response.data.status == 1) {
            this.snackbar = true
            this.snackbarText = response.data.message;
            this.color = 'primary';            
            window.location.reload(true);
          } else if(response.data.status == 0){
             this.snackbar = true;
            this.snackbarText = response.data.message;
            this.color = 'on-background';
          
          }else {
            this.snackbar = true;          
            this.color = 'on-background'
            this.snackbarText = "File Is Mandatory"
         
          }
          //   console.log({ response });
        })
        .catch(error => {
          console.error('Error uploading file:', error)
        })
    },

  }


 
}
</script>
<style></style>
