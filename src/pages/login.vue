<script setup>
import { useTheme } from 'vuetify'
import logo from '@/assets/images/logos/comlogo.jpeg'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png'
import authV1Tree from '@/assets/images/pages/auth-v1-tree.png'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter();
const form = ref({ 
  email: '',
  password: '',
  remember: false,
  timeout: 6000,
})

const emailRules = computed(() => {
  const rules = []

  // Email validation rule
  rules.push((v) => !!v || 'Email is required')
  rules.push((v) => /.+@.+\..+/.test(v) || 'Email must be valid')

  return rules
})

const passwordrules = computed(() => {
  const rules = []

  // Email validation rule
  rules.push((v) => !!v || 'Password is required')
  // rules.push((v) => /.+@.+\..+/.test(v) || 'Email must be valid')

  return rules
})

const snackbar = ref({
  show: false,
  message: '',
  color: '',
});

const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})
const isPasswordVisible = ref(false)

const loginuser = () => {
   if (!form.value.email || !form.value.password) {
    snackbar.value = {
      show: true,
      message: 'Please give mandatory fields',
      color: 'error',
    };
    return; // Stop the function execution
  }
    const requestData = {
      email: form.value.email,
      password: form.value.password
    };
  //  }
   axios.post('http://103.211.218.32/bizkingz/services/api/auth/login', requestData)
    .then(response => {
     
      console.log('API Response:', response);
     
      if (response.data.status == 1) {
         setTimeout(() => {
                router.push('/Dashboardhome');
            }, 1000);          
        localStorage.setItem("createdby", response.data.data.name);
        localStorage.setItem("userId", response.data.data.user_id);
        localStorage.setItem("userRole", response.data.data.user_role);
          localStorage.setItem("user_id", response.data.data.user_id);
         snackbar.value = {
          show: true,
          message: response.data.message,
          color: 'primary', 
        };
      } else {
     
          snackbar.value = {
          show: true,
          message: response.data.message, // Display the error message from the API
          color: 'error', // Set the color to 'error' for red color, or use 'success' for green, etc.
        };
      }
    })
    .catch(error => {
      // Handle errors here
      console.error('API Error:', error);
      snackbar.value = {
        show: true,
        message: 'An error occurred while logging in. Please try again.',
        color: 'error',
      };
      // You can display an error message or take appropriate actions
    });
}

</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <img src="@/assets/images/logos/comlogo.jpeg" width="80" height="80">
          </div>
        </template>

        <!-- <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          BizKing
        </VCardTitle> -->
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Welcome to BIZKINGZ! 👋🏻
        </h5>
        <p class="mb-0">
          Please sign-in to your account and start the adventure
        </p>
      </VCardText>

      <VCardText>
        <!-- () => {} -->
        <VForm @submit.prevent="loginuser">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                type="email"
                 :rules="emailRules"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
               :rules="passwordrules"
                
              />
              <!-- <span v-if="!isPasswordValid" class="error-message">Password must be at least 6 characters</span> -->
              <!-- remember me checkbox -->
              <!-- <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                />

                <a
                  class="ms-2 mb-1"
                  href="javascript:void(0)"
                >
                  Forgot Password?
                </a>
              </div> -->

              <!-- login button -->
               <!-- to="/" -->
               <br><br>
              <VBtn
                block
                type="submit"               
              >
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
            <!-- <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>New on our platform?</span>
              <RouterLink
                class="text-primary ms-2"
                :to="{ name: 'register' }"
              >
                Create an account
              </RouterLink>
            </VCol> -->

            <!-- <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol> -->

            <!-- auth providers -->
            <!-- <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol> -->
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
    <VSnackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      top
      :timeout="1000"
    >
      {{ snackbar.message }}
      <!-- <template #action="{ attrs }">
        <VBtn
          v-bind="attrs"
          text
          @click="snackbar.show = false"
        >
          Close
        </VBtn>
      </template> -->
    </VSnackbar>
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
