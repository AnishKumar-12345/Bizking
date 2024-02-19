<template>
    <div>
         <VRow>
      <VCol cols="12">
       <VCard title="Terms & Conditions" class="mb-4">       

       
        <VCardText>
          
          <!-- 👉 Form -->
          <VForm class="mt-6" ref="purchaseOrderForm">
           
            <VRow>
    
              <VCol
                md="6"
                cols="12"
              >
              <!-- {{selectedPurchaseOrder}} -->
                <VSelect
                  v-model="tandc.type"
                  label="Select Order"    
                  :items="['Purchase Order','Sales Order']"                          
                    :rules="orderrules"             
                />
              </VCol>        
              
          
               <VCol
                md="6"
                cols="12"
              >
            
                 <VTextarea
                 auto-grow
                 v-model="tandc.data"
                 label="Add Terms and Conditions"  
                 :rules="Tandcrule"   
                rows="4"
                counter="words"
                />
               </VCol>
              <VDivider />  
               <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="validateForm()">Save</VBtn>  
               
              </VCol>    
              <VCol cols="12">
                <VTable>
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
                </VTable>
              </VCol> 
                       
            </VRow>
          </VForm>
        </VCardText>
       </VCard>
      </VCol>
    </VRow>

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
import servicescall from "@/Services";
export default {
      mixins: [servicescall],
    data(){
        return{
            orderrules:[
                (v) => !!v || 'Order is required',
            ],
            Tandcrule:[
                (v) => !!v || 'T&C is required',
            ],
             snackbar: false,
            snackbarText: '',
            timeout: 6000, // milliseconds
            color: '', // or 'error', 'warning', 'info', etc.
            top: false,
            bottom: true,
            left: false,
            right: false,
               headers: [        
                { text: 'Selected Order', value: 'sku_name' },
                { text: 'Terms&Conditions', value: 'hsn_code' },
            
                { text: 'Actions', value: 'action' },

            ],
            tandc:{
                 "type":"",
                 "data":""
            }
        }
    },
    mounted(){

    },
    methods:{
        
      validateForm() {      
       this.$refs.purchaseOrderForm.validate().then(valid => {
        console.log("form valid", valid.valid);
        if (valid.valid == true) {          // this.saveData();
        
            this.addtandc();
      
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      });     
    },

        addtandc(){
            const reqjson = {};
            reqjson.type = this.tandc.type;
            reqjson.data = this.tandc.data;
            console.log('check the sending daata',reqjson)
            this.posttandc(reqjson).then((response)=>{
                console.log('check the tand c',response)
                 if (response.data.status == 1) {              
                    this.snackbar = true;
                    this.color = "primary";
                    this.formData = {};
                    this.snackbarText = response.data.message; 
                    this.tandc = {};
                    } else {          
                        this.snackbar = true;
                        this.color = "on-background";
                    };
            })
        }
    }
}
</script>
<style>

</style>