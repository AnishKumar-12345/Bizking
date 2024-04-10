<template>
  <div>
    <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="Update Password">
        <VForm class="mt-6 " ref="purchaseOrderForm">
          <VCardText>          

            <!-- 👉 New Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 new password -->
                <VTextField
                  v-model="newPassword"
                  :rules="Newpasswordrules"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  label="New Password"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 confirm password -->
                <VTextField
                  v-model="confirmPassword"
                  :rules="Conpasswordrules"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  label="Confirm New Password"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol>
            </VRow>
          </VCardText>

         

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn @click="validateForm()">Save changes</VBtn>

            <VBtn
              type="reset"
              color="secondary"
              variant="tonal"
            >
              Reset
            </VBtn>
          </VCardText>
        </VForm>
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
import servicescall from '@/Services'

export default {
  mixins: [servicescall],

    data(){
        return{
            Newpasswordrules: [
                    (v) => !!v || 'New Password is required',
                     (v) => (v && v.length >= 8 && v.length <= 15) || 'Passwords length should be 8 to 15',
                ],
                  Conpasswordrules: [
                    (v) => !!v || 'Confirm Password is required',
                    (v) => (v && v.length >= 8 && v.length <= 15) || 'Passwords length should be 8 to 15',
                ],
            newPassword: '',
            confirmPassword: '',
            isNewPasswordVisible: false,
            isConfirmPasswordVisible: false,
            userIddata:'',
            snackbar: false,
            snackbarText: '',
            timeout: 6000, // milliseconds
            color: '', // or 'error', 'warning', 'info', etc.
            top: false,
            bottom: true,
            left: false,
            right: false,
        }
    },
    mounted(){
        this.userIddata = localStorage.getItem('user_id');
    },
    methods:{
         validateForm() {
      this.$refs.purchaseOrderForm.validate().then(valid => {
        if (valid.valid == true) {
          if (this.passwordsMatch()) {
            this.changepassworddetails();
          } else {
            this.snackbar = true;
            this.snackbarText = "New Password and Confirm Password do not match";
            this.color = "error";
          }
        } else {
          this.snackbar = true;
          this.snackbarText = "Please fill in all mandatory fields";
          this.color = "error";
        }
      });
    },
     passwordsMatch() {
      return this.newPassword === this.confirmPassword;
    },
        changepassworddetails(){
            const postData = {
                   "user_id":this.userIddata,
                   "new_password":this.newPassword,
                 
            }
            console.log('chec password',postData);
            this.Changepasswords(postData).then((Response)=>{
                // console.log('check response',Response)
                if(Response.data.status == 1){
                    this.snackbar = true;            
                    this.snackbarText = Response.data.message;
                    this.color = "primary";
                    this.newPassword = '';
                    this.confirmPassword = '';
                }else{
                    this.snackbar = true;            
                    this.snackbarText = Response.data.message;
                    this.color = "on-background";
                    this.newPassword = '';
                    this.confirmPassword = '';
                }
            })
        }
    }
}
</script>
<style>

</style>