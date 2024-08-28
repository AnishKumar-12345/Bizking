<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard
          title="Add SA Targets"
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
                >
                 File Format Download
                   <V-btn
                  icon
                  variant="text"
                  color="default"
                  class="mb-1 mt-2"
                  size="small"
                
               
                  >
                  
                      <VIcon
                        icon="material-symbols:file-download"
                        size="42"        
                        color="#BA8B32" 
                       @click="downloadCSV"

                        />   
                      </V-btn> 
                </VCol>
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
                <VCol
                  md="6"
                  cols="12"
                >
                  <!-- :items="['Merchant','Brand']" -->
                  <VTextField
                    v-model="this.Weekname"
                    label="Week Name"
                    :rules="weekname"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    type="date"
                    v-model="this.Startdate"
                    :rules="startdate"
                    label="Start Date"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="this.Enddate"
                    type="date"
                    label="End Date"
                    :rules="Enddates"
                  />
                </VCol>
                <!-- {{this.Importcsv}} -->
                
                
                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                  @click="validateForm"
                >
                  <VBtn>Save</VBtn>

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
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VSnackbar
      v-model="snackbar"
      :timeout="3500"
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

  data() {
    return {
      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,
      weekname: [v => !!v || 'Weekname is required'],
      startdate: [v => !!v || 'Startdate is required'],
      Enddates: [v => !!v || 'Enddate is required'],
   fileRules: [
        v => !!v || 'File is required',
        v => (v && v.size > 0) || 'File is empty or invalid',
      ],
      Importcsv: null,
      Weekname: '',
      Startdate: '',
      Enddate: '',
    }
  },
  mounted() {},
  methods: {
      generateCSV() {
    // Define the CSV headers
    const headers = ['SA ID', 'SA Name', 'Merchant ID','Merchant UID','Assigned Target'];

    // Join the headers with commas and add a newline at the end
    return headers.join(',') + '\n';
  },

     downloadCSV() {
    const csvContent = this.generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'fileformat.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

    validateForm() {
      this.$refs.tripform.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
          this.saveTripdata()
        } else {
          this.snackbar = true
          this.snackbarText = 'Please give all mandatory fields'
          this.color = 'on-background'
        }
      })
    },
    handleFileChange(event) {
       if (event.target.files.length > 0) {
        this.Importcsv = event.target.files[0];
        console.log('File Selected:', this.Importcsv);
      } else {
        // Clear the file input when no file is selected
        this.Importcsv = null;
      }
    },
    saveTripdata() {
      const formData = new FormData()
      if (this.Importcsv) {
        formData.append('import_csv', this.Importcsv)
      }
      formData.append('week_name', this.Weekname)
      formData.append('start_date', this.Startdate)
      formData.append('end_date', this.Enddate)
      //   for (const pair of formData.entries()) {
      //         console.log("Trip Data",`${pair[0]}: ${pair[1]}`);
      //     }
      this.saveTrip(formData)
        .then(response => {
          if (response.data.status == 1) {
            this.snackbar = true
            this.snackbarText = response.data.message
            this.color = 'primary'
            ;(this.Importcsv = ''), (this.Weekname = ''), (this.Startdate = ''), (this.Enddate = '');
            window.location.reload(true);
          } else if(response.data.status == 0){
             this.snackbar = true
            this.snackbarText = response.data.message
            this.color = 'on-background'
          
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
  },
}
</script>
<style></style>
