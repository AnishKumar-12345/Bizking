<template>
  <div>
    <div
      v-if="loading"
      class="loading-container"
    >
      <VProgressLinear
        height="5"
        color="primary"
        indeterminate
        class="custom-loader"
        full-width 
      />
    </div>

    <VRow>
      <!-- Merchant Products report -->
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          title="Merchant Products"
          class="position-relative"
        >
          <VCardText>
            <h4 class="text-4xl font-weight-medium text-primary">
              <VIcon
                size="50"
                start
                icon="line-md:downloading-loop"
              />
            </h4>
            <br />
            <!-- <p>🎉</p> -->
            <VBtn
              size="small"
              @click="openMPR()"
            >
              Get Reports
            </VBtn>
          </VCardText>

          <!-- Triangle Background -->
          <VImg
            :src="triangleBg"
            class="triangle-bg flip-in-rtl"
          />
          <img
            src="@/assets/images/avatars/avatar-14.png"
            class="trophy2"
          />
        </VCard>
      </VCol>

      <!-- Merchant Product Sales report -->
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          title="Merchant Product Sales"
          class="position-relative"
        >
          <VCardText>
            <h4 class="text-4xl font-weight-medium text-primary">
              <VIcon
                size="50"
                start
                icon="line-md:downloading-loop"
              />
            </h4>
            <br />
            <!-- <p>🎉</p> -->
            <VBtn
              size="small"
              @click="openMPS()"
            >
              Get Reports
            </VBtn>
          </VCardText>

          <!-- Triangle Background -->
          <VImg
            :src="triangleBg"
            class="triangle-bg flip-in-rtl"
          />
          <img
            src="@/assets/images/avatars/avatar-16.png"
            class="trophy4"
          />
        </VCard>
      </VCol>

      <!-- Merchant Stock Inventory report -->
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          title="Merchant Stock Inventory"
          class="position-relative"
        >
          <VCardText>
            <h4 class="text-4xl font-weight-medium text-primary">
              <VIcon
                size="50"
                start
                icon="line-md:downloading-loop"
              />
            </h4>
            <br />
            <!-- <p>🎉</p> -->
            <VBtn
              size="small"
              @click="openMSI()"
            >
              Get Reports
            </VBtn>
          </VCardText>

          <!-- Triangle Background -->
          <VImg
            :src="triangleBg"
            class="triangle-bg flip-in-rtl"
          />
          <img
            src="@/assets/images/avatars/avatar-11.png"
            class="trophy"
          />
        </VCard>
      </VCol>

      <!-- sales orders report -->
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          title="Sales Orders"
          class="position-relative"
        >
          <VCardText>
            <h4 class="text-4xl font-weight-medium text-primary">
              <VIcon
                size="50"
                start
                icon="line-md:downloading-loop"
              />
            </h4>
            <br />
            <!-- <p>🎉</p> -->
            <VBtn
              size="small"
              @click="openSales()"
            >
              Get Reports
            </VBtn>
          </VCardText>

          <!-- Triangle Background -->
          <VImg
            :src="triangleBg"
            class="triangle-bg flip-in-rtl"
          />
          <img
            src="@/assets/images/avatars/avatar-15.png"
            class="trophy1"
          />
          <img
            :src="avatarg"
            class="avatarg"
          />
        </VCard>
      </VCol>

      <!-- Warehouse Stock Inventory report -->
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          title="Warehouse Stock Inventory"
          class="position-relative"
        >
          <VCardText>
            <h4 class="text-4xl font-weight-medium text-primary">
              <VIcon
                size="50"
                start
                icon="line-md:downloading-loop"
              />
            </h4>
            <br />
            <!-- <p>🎉</p> -->
            <VBtn
              size="small"
              @click="openWSI()"
            >
              Get Reports
            </VBtn>
          </VCardText>

          <!-- Triangle Background -->
          <VImg
            :src="triangleBg"
            class="triangle-bg flip-in-rtl"
          />
          <img
            src="@/assets/images/avatars/avatar-9.png"
            class="trophy"
          />
        </VCard>
      </VCol>

      <!-- Brand Products report -->
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          title="Brand Products"
          class="position-relative"
        >
          <VCardText>
            <h4 class="text-4xl font-weight-medium text-primary">
              <VIcon
                size="50"
                start
                icon="line-md:downloading-loop"
              />
            </h4>
            <br />
            <!-- <p>🎉</p> -->
            <VBtn
              size="small"
              @click="openBrand()"
            >
              Get Reports
            </VBtn>
          </VCardText>

          <!-- Triangle Background -->
          <VImg
            :src="triangleBg"
            class="triangle-bg flip-in-rtl"
          />
          <img
            src="@/assets/images/avatars/avatar-10.png"
            class="trophy"
          />
        </VCard>
      </VCol>

      <!-- Purchase Orders -->
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          title="Purchase Orders"
          class="position-relative"
        >
          <VCardText>
            <h4 class="text-4xl font-weight-medium text-primary">
              <VIcon
                size="50"
                start
                icon="line-md:downloading-loop"
              />
            </h4>
            <br />

            <VBtn
              size="small"
              @click="openPurchase()"
            >
              Get Reports
            </VBtn>
          </VCardText>

          <VImg
            :src="triangleBg"
            class="triangle-bg flip-in-rtl"
          />
          <img
            src="@/assets/images/avatars/avatar-12.png"
            class="trophy5"
          />
        </VCard>
      </VCol>

      <!-- GST Report -->
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          title="GST Report"
          class="position-relative"
        >
          <VCardText>
            <h4 class="text-4xl font-weight-medium text-primary">
              <VIcon
                size="50"
                start
                icon="line-md:downloading-loop"
              />
            </h4>
            <br />

            <VBtn
              size="small"
              @click="opengstreport()"
            >
              Get Reports
            </VBtn>
          </VCardText>

          <VImg
            :src="triangleBg"
            class="triangle-bg flip-in-rtl"
          />
          <img
            src="@/assets/images/avatars/avatar-19.png"
            class="trophy10"
          />
        </VCard>
      </VCol>

      <!-- Merchant Payment Report -->
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          title="Merchant Payment Report"
          class="position-relative"
        >
          <VCardText>
            <h4 class="text-4xl font-weight-medium text-primary">
              <VIcon
                size="50"
                start
                icon="line-md:downloading-loop"
              />
            </h4>
            <br />

            <VBtn
              size="small"
              @click="openMerchantpayment()"
            >
              Get Reports
            </VBtn>

           
          </VCardText>

          <VImg
            :src="triangleBg"
            class="triangle-bg flip-in-rtl"
          />
          <img
            src="@/assets/images/avatars/avatar-18.png"
            class="trophy7"
          />
        </VCard>
      </VCol>

<!-- Merchant Report -->
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          title="Merchant Report"
          class="position-relative"
        >
          <VCardText>
            <h4 class="text-4xl font-weight-medium text-primary">
              <VIcon
                size="50"
                start
                icon="line-md:downloading-loop"
              />
            </h4>
            <br />

            <VBtn
              size="small"
              @click="openMerchantreport()"
            >
              Get Reports
            </VBtn> &nbsp;
              <!-- <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress12"
                    >
                    </VProgressCircular> -->
          </VCardText>

          <VImg
            :src="triangleBg"
            class="triangle-bg flip-in-rtl"
          />
          <img
            src="@/assets/images/avatars/avatar-20.png"
            class="trophy12"
          />
        </VCard>
      </VCol>
      
      <!-- Lead Report -->
        <VCol
        cols="12"
        md="4"
      >
        <VCard
          title="Lead Report"
          class="position-relative"
        >
          <VCardText>
            <h4 class="text-4xl font-weight-medium text-primary">
              <VIcon
                size="50"
                start
                icon="line-md:downloading-loop"
              />
            </h4>
            <br />

            <VBtn
              size="small"
              @click="openLeadreport()"
            >
              Get Reports
            </VBtn> &nbsp;
              <!-- <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress13"
                    >
                    </VProgressCircular> -->
          </VCardText>

          <VImg
            :src="triangleBg"
            class="triangle-bg flip-in-rtl"
          />
          <img
            src="@/assets/images/avatars/avatar-22.png"
            class="trophy12"
          />
        </VCard>
      </VCol>

       <!-- Opportunity Report -->
      <VCol
        cols="12"
        md="4"
        >
        <VCard
          title="Opportunity Report"
          class="position-relative"
        >
          <VCardText>
            <h4 class="text-4xl font-weight-medium text-primary">
              <VIcon
                size="50"
                start
                icon="line-md:downloading-loop"
              />
            </h4>
            <br />

            <VBtn
              size="small"
              @click="openOpreport()"
            >
              Get Reports
            </VBtn> &nbsp;
              <!-- <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress14"
                    >
                    </VProgressCircular> -->
          </VCardText>

          <VImg
            :src="triangleBg"
            class="triangle-bg flip-in-rtl"
          />
          <img
            src="@/assets/images/avatars/avatar-21.png"
            class="trophy12"
          />
        </VCard>
      </VCol>
      
      <!-- User Store Logins -->
      <!-- <VCol
        cols="12"
        md="4"
      >
        <VCard
        title="User Store Login"
        class="position-relative"
      >
        <VCardText>
          <h4 class="text-4xl font-weight-medium text-primary">
                    <VIcon size="50" start icon="line-md:downloading-loop" />

          </h4> <br>
       
          <VBtn size="small" @click="openUserstore()">
            Get Reports
          </VBtn>
        </VCardText>

   
        <VImg
          :src="triangleBg"
          class="triangle-bg flip-in-rtl"
        />
          <img src="@/assets/images/avatars/avatar-13.png"  class="trophy6">

      </VCard>
    </VCol>  -->
    </VRow>

    <!-- Merchant Product Sales Dialog -->
    <VDialog
      v-model="dialog2"
      max-width="1000"
    >
      <VCard
        title="Merchant Product Sales"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                class="mt-6"
                ref="purchaseOrderForm1"
              >
                <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">
           
            </VCheckbox> -->
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VAutocomplete
                      v-model="selectedmerchants"
                      :items="merchantName"
                      item-value="value"
                      item-title="text"
                      :rules="storeMerchant"
                      label="Store or Merchant"
                      :menu-props="{ maxHeight: 200 }"
                      no-underline
                      v-if="!selectAll"
                    />
                    <VTextField
                      v-model="selectedmerchants"
                      label="Store or Merchant"
                      v-if="selectAll"
                      disabled
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <!-- this_year this_month -->
                    <VSelect
                      :rules="selectDate"
                      v-model="reportsdata.date_filter"
                      :items="['Custom', 'Current Year', 'Current Month']"
                      label="Select Date"
                    />
                  </VCol>

                  <VCol
                    v-if="reportsdata.date_filter == 'Custom'"
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="reportsdata.start_date"
                      type="date"
                      label="Start Date"
                      :min="minDate"
                      :max="maxDate"
                    />
                  </VCol>
                  <VCol
                    v-if="reportsdata.date_filter == 'Custom'"
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="reportsdata.end_date"
                      type="date"
                      label="End Date"
                      :min="minDate1"
                      :max="maxDate1"
                    />
                  </VCol>
                     <VCol
                md="6"
                cols="12"
                v-if="userType == 'Business Head'"
              >
              <!-- {{selectedBrand}} -->             
                <VAutocomplete
                  v-model="this.citydata"
                  label="City"
                  :items="this.locationsdata"               
                  item-value="value"
                  item-title="text"
                  :rules="locationrules"
                  :menu-props="{ maxHeight: 200 }"                   
                />
              </VCol>

                  <VDivider />
                  <VCol cols="12"> </VCol>

                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click="validateForm1()">Get</VBtn>

                    <VBtn @click="closereport()">Close</VBtn>

                    <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                    <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress"
                    >
                    </VProgressCircular>
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

    <!-- sales orders Dialog -->
    <VDialog
      v-model="dialog3"
      max-width="1000"
    >
      <VCard
        title="Sales Orders"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                class="mt-6"
                ref="purchaseOrderForm2"
              >
                <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">
           
            </VCheckbox> -->
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <!-- this_year this_month -->
                    <VSelect
                      v-model="selectSales"
                      :items="['All', 'Acknowledged', 'Shipped', 'Delivered','OnHold','Cancel', 'GRN Orders']"
                      label="Select Status"
                      :rules="salesRules"
                    :menu-props="{ maxHeight: 200 }"

                    />
                  </VCol>

                  <VCol
                    md="6"
                    cols="12"
                  >
                    <!-- this_year this_month -->
                    <VSelect
                      :rules="selectDate"
                      v-model="Salesdata.date_filter"
                      :items="['Custom', 'Current Year', 'Current Month']"
                      label="Select Date"
                    />
                  </VCol>

                  <VCol
                    v-if="Salesdata.date_filter == 'Custom'"
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="Salesdata.start_date"
                      type="date"
                      label="Start Date"
                      :min="minDate"
                      :max="maxDate"
                      :rules="Daterules"
                    />
                  </VCol>
                  <VCol
                    v-if="Salesdata.date_filter == 'Custom'"
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="Salesdata.end_date"
                      type="date"
                      label="End Date"
                      :min="minDate1"
                      :max="maxDate1"
                      :rules="Daterules"
                    />
                  </VCol>

                 <VCol
                md="6"
                cols="12"
                v-if="userType == 'Business Head'"
              >
              <!-- {{selectedBrand}} -->             
                <VAutocomplete
                  v-model="this.citydata"
                  label="City"
                  :items="this.locationsdata"               
                  item-value="value"
                  item-title="text"
                  :rules="locationrules"
                  :menu-props="{ maxHeight: 200 }"                   
                />
              </VCol>

                  <VDivider />

                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click="validateForm2()">Get</VBtn>

                    <VBtn @click="closeSales()">Close</VBtn>

                    <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                    <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress2"
                    >
                    </VProgressCircular>
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

    <!-- Merchant Stock Inventory Dialog -->
    <VDialog
      v-model="dialog4"
      max-width="1000"
    >
      <VCard
        title="Merchant Stock Inventory"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                class="mt-6"
                ref="purchaseOrderForm3"
              >
                <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">
            
              </VCheckbox> -->
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VAutocomplete
                      v-model="selectedmerchants2"
                      :items="merchantName"
                      item-value="value"
                      item-title="text"
                      :rules="storeMerchant"
                      label="Store or Merchant"
                      :menu-props="{ maxHeight: 200 }"
                      no-underline
                    />
                  </VCol>
            <VCol
                md="6"
                cols="12"
                v-if="userType == 'Business Head'"
              >
              <!-- {{selectedBrand}} -->             
                <VAutocomplete
                  v-model="this.citydata"
                  label="City"
                  :items="this.locationsdata"               
                  item-value="value"
                  item-title="text"
                  :rules="locationrules"
                  :menu-props="{ maxHeight: 200 }"                   
                />
              </VCol>
                  <VDivider />

                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click="validateForm3()">Get</VBtn>

                    <VBtn @click="closemreport()">Close</VBtn>

                    <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                    <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress3"
                    >
                    </VProgressCircular>
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

    <!-- Warehouse Stock Inventory Dialog -->
    <VDialog
      v-model="dialog5"
      max-width="1000"
    >
      <VCard
        title="Warehouse Stock Inventory"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                class="mt-6"
                ref="purchaseOrderForm4"
              >
                <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">
            
              </VCheckbox> -->
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VAutocomplete
                      v-model="selectedBrand"
                      :items="Brandname"
                      item-value="value"
                      item-title="text"
                      :rules="storeBrand"
                      label="Brand Names"
                      :menu-props="{ maxHeight: 200 }"
                      no-underline
                    />
                  </VCol>
    <VCol
                md="6"
                cols="12"
                v-if="userType == 'Business Head'"
              >
              <!-- {{selectedBrand}} -->             
                <VAutocomplete
                  v-model="this.citydata"
                  label="City"
                  :items="this.locationsdata"               
                  item-value="value"
                  item-title="text"
                  :rules="locationrules"
                  :menu-props="{ maxHeight: 200 }"                   
                />
              </VCol>
                  <VDivider />

                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click="validateForm4()">Get</VBtn>

                    <VBtn @click="closewreport()">Close</VBtn>

                    <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                    <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress4"
                    >
                    </VProgressCircular>
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

    <!-- Brand Products Dialog -->
    <VDialog
      v-model="dialog6"
      max-width="1000"
    >
      <VCard
        title="Brand Products"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                class="mt-6"
                ref="purchaseOrderForm5"
              >
                <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">           
              </VCheckbox> -->
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VAutocomplete
                      v-model="selectedBrand2"
                      :items="Brandname"
                      item-value="value"
                      item-title="text"
                      :rules="storeBrand"
                      label="Brand Names"
                      :menu-props="{ maxHeight: 200 }"
                      no-underline
                    />
                  </VCol>
            <VCol
                md="6"
                cols="12"
                v-if="userType == 'Business Head'"
              >
              <!-- {{selectedBrand}} -->             
                <VAutocomplete
                  v-model="this.citydata"
                  label="City"
                  :items="this.locationsdata"               
                  item-value="value"
                  item-title="text"
                  :rules="locationrules"
                  :menu-props="{ maxHeight: 200 }"                   
                />
              </VCol>
                  <VDivider />

                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click="validateForm5()">Get</VBtn>

                    <VBtn @click="closeBreport()">Close</VBtn>

                    <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                    <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress4"
                    >
                    </VProgressCircular>
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

    <!-- Merhant Products Dialog -->
    <VDialog
      v-model="dialog7"
      max-width="1000"
    >
      <VCard
        title="Merchant Products "
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                class="mt-6"
                ref="purchaseOrderForm6"
              >
                <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">
            
              </VCheckbox> -->
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VAutocomplete
                      v-model="selectedmerchants3"
                      :items="merchantName"
                      item-value="value"
                      item-title="text"
                      :rules="storeMerchant"
                      label="Store or Merchant"
                      :menu-props="{ maxHeight: 200 }"
                      no-underline
                    />
                  </VCol>

              <VCol
                md="6"
                cols="12"
                v-if="userType == 'Business Head'"
              >
              <!-- {{selectedBrand}} -->             
                <VAutocomplete
                  v-model="this.citydata"
                  label="City"
                  :items="this.locationsdata"               
                  item-value="value"
                  item-title="text"
                  :rules="locationrules"
                  :menu-props="{ maxHeight: 200 }"                   
                />
              </VCol>
                  <VDivider />

                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click="validateForm6()">Get</VBtn>

                    <VBtn @click="closeMPreport()">Close</VBtn>

                    <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                    <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress6"
                    >
                    </VProgressCircular>
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

    <!-- Puchase orders Dialog -->
    <VDialog
      v-model="dialog8"
      max-width="1000"
    >
      <VCard
        title="Purchase Orders"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                class="mt-6"
                ref="purchaseOrderForm7"
              >
                <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">
           
            </VCheckbox> -->
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <!-- this_year this_month -->
                    <VSelect
                      v-model="selectPurchase"
                      :items="['All', 'Acknowledged', 'Shared', 'Received','Cancel']"
                      label="Select"
                      :rules="salesRules"
                    />
                  </VCol>

                  <VCol
                    md="6"
                    cols="12"
                  >
                    <!-- this_year this_month -->
                    <VSelect
                      :rules="selectDate"
                      v-model="Purchasedata.date_filter"
                      :items="['Custom', 'Current Year', 'Current Month']"
                      label="Select Date"
                    />
                  </VCol>

                  <VCol
                    v-if="Purchasedata.date_filter == 'Custom'"
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="Purchasedata.start_date"
                      type="date"
                      label="Start Date"
                      :min="minDate"
                      :max="maxDate"
                    />
                  </VCol>
                  <VCol
                    v-if="Purchasedata.date_filter == 'Custom'"
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="Purchasedata.end_date"
                      type="date"
                      label="End Date"
                      :min="minDate1"
                      :max="maxDate1"
                    />
                  </VCol>
                  
              <VCol
                md="6"
                cols="12"
                v-if="userType == 'Business Head'"
              >
              <!-- {{selectedBrand}} -->             
                <VAutocomplete
                  v-model="this.citydata"
                  label="City"
                  :items="this.locationsdata"               
                  item-value="value"
                  item-title="text"
                  :rules="locationrules"
                  :menu-props="{ maxHeight: 200 }"                   
                />
              </VCol>
                  <VDivider />

                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click="validateForm7()">Get</VBtn>

                    <VBtn @click="closePurchase()">Close</VBtn>

                    <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                    <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress7"
                    >
                    </VProgressCircular>
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

    <!-- User Store Dialog -->
    <VDialog
      v-model="dialog9"
      max-width="1000"
    >
      <VCard
        title="User Store"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                class="mt-6"
                ref="purchaseOrderForm8"
              >
                <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">           
              </VCheckbox> -->
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VAutocomplete
                      v-model="userStoredata"
                      :items="userstorenames"
                      item-value="value"
                      item-title="text"
                      :rules="storeBrand"
                      label="Sales Persons"
                      :menu-props="{ maxHeight: 200 }"
                      no-underline
                    />
                  </VCol>

                  <VDivider />

                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click="validateForm8()">Get</VBtn>

                    <VBtn @click="closeUserLoginreport()">Close</VBtn>

                    <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                    <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress8"
                    >
                    </VProgressCircular>
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

    <!-- merchant payment dialog -->
    <VDialog
      v-model="dialog10"
      max-width="1000"
    >
      <VCard
        title="Merchant Payment Report"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                class="mt-6"
                ref="purchaseOrderForm9"
              >
                <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">           
              </VCheckbox> -->
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                 
                    <VAutocomplete
                      v-model="selectedSalesuser"
                      :items="userstorenames"
                      item-value="value"
                      item-title="text"
                      :rules="salesdata"
                      label="Sales User"
                      :menu-props="{ maxHeight: 200 }"
                      no-underline
                      @update:model-value="handleuserSelection(selectedSalesuser)"
                    />
                    <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress10"
                    >
                    </VProgressCircular>
                  </VCol>

                  <VCol
                    md="6"
                    cols="12"
                    v-if="selectedSalesuser == 'all'"
                  >
                    <VAutocomplete
                      v-model="selectedSalesMerchant"
                      :items="merchantName"
                      item-value="value"
                      item-title="text"
                      :rules="salesdata"
                      label="All Sales Merchant"
                      :menu-props="{ maxHeight: 200 }"
                      no-underline
                    />
                  </VCol>


                  <VCol
                    md="6"
                    cols="12"
                    v-if="selectedSalesuser != 'all'"
                  >
                    <VAutocomplete
                      v-model="selectedSalesMerchant"
                      :items="getmerchantdata"
                      item-value="value"
                      item-title="text"
                      :rules="salesdata"
                      label="Sales Merchant"
                      :menu-props="{ maxHeight: 200 }"
                      no-underline
                    />
                  </VCol>

                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VAutocomplete
                      v-model="selectedReportype"
                      :items="['Invoice Wise','Overall']"
                      item-value="value"
                      item-title="text"
                      :rules="salesdata"
                      label="Report Type"
                      :menu-props="{ maxHeight: 200 }"
                      no-underline
                    />
                  </VCol>

                   <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="startDate1"
                      type="date"
                      label="Start Date"
                      :min="minDate"
                      :max="maxDate"
                      :rules="Daterules"
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="endDate1"
                      type="date"
                      label="End Date"
                      :min="minDate1"
                      :max="maxDate1"
                      :rules="Daterules"
                    />
                  </VCol>

                    <VCol
                md="6"
                cols="12"
                v-if="userType == 'Business Head'"
              >
              <!-- {{selectedBrand}} -->             
                <VAutocomplete
                  v-model="this.citydata"
                  label="City"
                  :items="this.locationsdata"               
                  item-value="value"
                  item-title="text"
                  :rules="locationrules"
                  :menu-props="{ maxHeight: 200 }"                   
                />
              </VCol>
                  <VDivider />

                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click="validateForm9()">Get</VBtn>

                    <VBtn @click="closeMerchantpayment()">Close</VBtn>

                    <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                    <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress9"
                    >
                    </VProgressCircular>
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

    <!-- GST Report Dialog -->
    <VDialog
      v-model="dialog11"
      max-width="1000"
    >
      <VCard
        title="GST Report"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                class="mt-6"
                ref="purchaseOrderForm10"
              >
                <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">
           
            </VCheckbox> -->
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <!-- this_year this_month -->
                    <VSelect
                      v-model="selectGST"
                      :items="['Invoice Wise', 'Product Wise']"
                      label="Report Type"
                      :rules="GSTrules"
                    />
                  </VCol>

                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="startDate"
                      type="date"
                      label="Start Date"
                      :min="minDate"
                      :max="maxDate"
                      :rules="Daterules"
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="endDate"
                      type="date"
                      label="End Date"
                      :min="minDate1"
                      :max="maxDate1"
                      :rules="Daterules"
                    />
                  </VCol>
<VCol
                md="6"
                cols="12"
                v-if="userType == 'Business Head'"
              >
              <!-- {{selectedBrand}} -->             
                <VAutocomplete
                  v-model="this.citydata"
                  label="City"
                  :items="this.locationsdata"               
                  item-value="value"
                  item-title="text"
                  :rules="locationrules"
                  :menu-props="{ maxHeight: 200 }"                   
                />
              </VCol>
                  <VDivider />

                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click="validateForm10()">Get</VBtn>

                    <VBtn @click="closeGSTreport()">Close</VBtn>

                    <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                    <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress11"
                    >
                    </VProgressCircular>
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

<!-- Merchant Report -->
 <VDialog
      v-model="dialog12"
      max-width="1000"
    >
      <VCard
        title="Merchant Report"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                class="mt-6"
                ref="purchaseOrderForm11"
              >
                <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">           
              </VCheckbox> -->
                <VRow>              

                  <!-- <VCol
                    md="6"
                    cols="12"
                  >
                    <VAutocomplete
                      v-model="selectedMerchantReportype"
                      :items="['All','Date-Wise']"
                      :rules="salesdata"
                      label="Merchant Report Type"
                      :menu-props="{ maxHeight: 200 }"
                      no-underline
                    />
                  </VCol>

                   <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="startDate2"
                      type="date"
                      label="Start Date"
                      :min="minDate"
                      :max="maxDate"
                      :rules="Daterules"
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="endDate2"
                      type="date"
                      label="End Date"
                      :min="minDate1"
                      :max="maxDate1"
                      :rules="Daterules"
                    />
                  </VCol> -->
                    <VCol
                md="6"
                cols="12"
                v-if="userType == 'Business Head'"
              >
              <!-- {{selectedBrand}} -->             
                <VAutocomplete
                  v-model="this.citydata"
                  label="City"
                  :items="this.locationsdata"               
                  item-value="value"
                  item-title="text"
                  :rules="locationrules"
                  :menu-props="{ maxHeight: 200 }"                   
                />
              </VCol>
                  <VDivider />

                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click="validateForm11()">Get</VBtn>

                    <VBtn @click="closeMerchantreport()">Close</VBtn>

                    <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                    <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress12"
                    >
                    </VProgressCircular>
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

<!-- Lead Report -->
 <VDialog
      v-model="dialog13"
      max-width="1000"
    >
      <VCard
        title="Lead Report"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                class="mt-6"
                ref="purchaseOrderForm12"
              >
                <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">           
              </VCheckbox> -->
                <VRow>              

                 
                    <VCol
                md="6"
                cols="12"
                v-if="userType == 'Business Head'"
              >
              <!-- {{selectedBrand}} -->             
                <VAutocomplete
                  v-model="this.citydata"
                  label="City"
                  :items="this.locationsdata"               
                  item-value="value"
                  item-title="text"
                  :rules="locationrules"
                  :menu-props="{ maxHeight: 200 }"                   
                />
              </VCol>
                  <VDivider />

                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click="validateForm12()">Get</VBtn>

                    <VBtn @click="closeLreport()">Close</VBtn>

                    <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                    <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress15"
                    >
                    </VProgressCircular>
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

 <VDialog
      v-model="dialog14"
      max-width="1000"
    >
      <VCard
        title="Opportunity Report"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                class="mt-6"
                ref="purchaseOrderForm13"
              >
                <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">           
              </VCheckbox> -->
                <VRow>            

                    <VCol
                md="6"
                cols="12"
                v-if="userType == 'Business Head'"
              >
              <!-- {{selectedBrand}} -->             
                <VAutocomplete
                  v-model="this.citydata"
                  label="City"
                  :items="this.locationsdata"               
                  item-value="value"
                  item-title="text"
                  :rules="locationrules"
                  :menu-props="{ maxHeight: 200 }"                   
                />
              </VCol>
                  <VDivider />

                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click="validateForm13()">Get</VBtn>

                    <VBtn @click="closeOreport()">Close</VBtn>

                    <!-- &nbsp; &nbsp; &nbsp; &nbsp; -->
                    <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress16"
                    >
                    </VProgressCircular>
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

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
// import VueExcelXlsx from 'vue-excel-xlsx';
import { useTheme } from 'vuetify'
import triangleDark from '@/assets/images/misc/triangle-dark.png'
import triangleLight from '@/assets/images/misc/triangle-light.png'
export default {
  mixins: [servicescall],
  components: {
    // VueExcelXlsx,
  },

  data() {
    return {
      cityID:'',
      locationid:'',
      selectedMerchantReportype:null,
      userStoredata: null,
      selectSales: null,
      selectPurchase: null,
      selectGST: null,
      startDate: null,
      endDate: null,
      startDate1: null,
      endDate1: null,
      startDate2: null,
      endDate2: null,
      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,

      isProgress: false,
      isProgress2: false,
      isProgress3: false,
      isProgress4: false,
      isProgress5: false,
      isProgress6: false,
      isProgress7: false,
      isProgress8: false,
      isProgress9: false,
      isProgress10: false,
      isProgress11: false,
      isProgress12: false,
      isProgress13: false,
      isProgress14: false,
      isProgress15: false,
      isProgress16: false,

      loading: true,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      dialog7: false,
      dialog8: false,
      dialog9: false,
      dialog10: false,
      dialog11: false,
      dialog12: false,
      dialog13: false,
      dialog14: false,

      citydata:"",
      selectdatepicker: null,
      salesUsers: [],
      merchantName: [],
      userstorenames: [],
      reportsMerchant: [],
      selectAll: false,
      selectedmerchants: null,
      selectedmerchants2: null,
      selectedmerchants3: null,
      selectedmerchants4: null,
      selectedSalesuser: null,
      getmerchantdata: [],
      selectedSalesMerchant: null,
      selectedReportype: null,
      selectedBrand: null,
      selectedBrand2: null,
      salesdata: [v => !!v || 'Sales user is required'],
      salesRules: [v => !!v || 'Sales is required'],
      storeMerchant: [v => !!v || 'Store & Merchant is required'],
      selectDate: [v => !!v || 'Select Date is required'],
      storeBrand: [v => !!v || 'Brand Name is required'],
      Daterules: [v => !!v || 'Date is required'],
      GSTrules: [v => !!v || 'This Field is required'],
      // locationrules:  [v => !!v || 'This Field is required'],
      reportsdata: {
        merchant_id: '',
        date_filter: '',
        start_date: '',
        end_date: '',
      },
      Purchasedata: {
        date_filter: '',
        start_date: '',
        end_date: '',
      },
      Salesdata: {
        date_filter: '',
        start_date: '',
        end_date: '',
      },
      today: this.getFormattedDate(new Date()),
      todays: this.getFormattedDates(new Date()),
      maxDate: this.getFormattedDate(new Date()),
      minDate: '1900-01-01',
      maxDate1: this.getFormattedDate(new Date()),
      minDate1: '1900-01-01',
      locationsdata:[],
      filterLocation:false,
      userType:"",
      locationRules: [], // initially empty
      gmaildata:"",
      jsonfields: [
        {
          label: 'Closing',
          field: 'Closing',
        },
        {
          label: 'Date',
          field: 'Date',
        },
        {
          label: 'Merchant Name',
          field: 'Merchant Name',
        },
        {
          label: 'Merchant UID',
          field: 'Merchant UID',
        },
        {
          label: 'Opening',
          field: 'Opening',
        },
        {
          label: 'Physical SOH',
          field: 'Physical SOH',
        },
        {
          label: 'SA Name',
          field: 'SA Name',
        },
        {
          label: 'SKU Name',
          field: 'SKU Name',
        },
        {
          label: 'Sale',
          field: 'Sale',
        },
      ],
    }
  },
  watch: {
    'reportsdata.start_date': function (newDate) {
      // Update maxDate to disable future dates after selecting a start date
      this.maxDate = newDate ? newDate : this.getFormattedDate(new Date())
    },
    //  userType(newValue) {
    //   if (newValue === 'Business Head') {
    //     this.locationRules = [(v) => !!v || 'City is required'];
    //   } else {
    //     this.locationRules = [];
    //   }
    // },
  },
  computed: {
    vuetifyTheme() {
      return useTheme()
    },
    // locationRules() {
    //   return this.userType === 'Business Head'
    //     ? [(v) => !!v || 'City is required']
    //     : [];
    // },
    triangleBg() {
      return this.vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
    },
  },
  mounted() {
    // this.filter();
    this.gmaildata = localStorage.getItem("gmail");
     this.cityID = localStorage.getItem("city_id");
      this.locationID = localStorage.getItem("location_id");
      this.userType = localStorage.getItem("user_type");
    this.getAllsales();
    this.getMerchantdetails();
    this.getBrandsdata();
    this.getBranchnames();
    setTimeout(() => {
      this.loading = false
    }, 3000)
  },
  methods: {
    // handleBrandSelection(){ 
    // },
    openOpreport(){
      this.dialog14 = true;
    },
    closeOreport(){
      this.dialog14 = false;
      this.citydata = "";
    },
     getBranchnames(){
            this.Locationdata().then((response)=>{ 
        
              this.locationsdata = response.data.data.map(sales => ({
                  value: sales.city_id,
                  text: sales.city
              }));
                console.log('ceck tye res',this.locationsdata);
            })
          },
          validateForm13(){
             this.$refs.purchaseOrderForm13.validate().then((valid) => {
        if (valid) {
          // Check if citydata is required and provided
          if (this.userType === 'Business Head' && !this.citydata) {
            this.snackbar = true;
            this.snackbarText = 'Please select a city';
            this.color = 'on-background';
          } else {
            // Proceed with API call
            this.openOreport();
          }
        } else {
          this.snackbar = true;
          this.snackbarText = 'Please give all mandatory fields';
          this.color = 'on-background';
        }
      });
          },
    openOreport(){
      this.isProgress16 = true;
       const requestData = {
        // merchant: this.selectedmerchants3,
        location: this.userType === 'Business Head' ? this.citydata : this.cityID
      };

       this.Opportunityreports(requestData.location).then((response)=>{
           if (response.data.status == 0) {
               this.isProgress16 = false;


          this.snackbar = true;
          this.color = 'on-background'
          this.snackbarText = response.data.message;
      this.dialog14 = false;

        } else {
          this.isProgress16 = false;   
      this.dialog14 = false;

          this.citydata = "";
          const blob = new Blob([response.data], { type: 'text/csv' })

          // Create a temporary URL for the Blob
          const url = window.URL.createObjectURL(blob)

          // Create a link element
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Opportunity Report.csv') // Set the file name here

          // Append the link to the body
          document.body.appendChild(link)

          // Programmatically click the link to trigger the download
          link.click()

          // Clean up - remove the link and revoke the URL
          link.parentNode.removeChild(link)
          window.URL.revokeObjectURL(url)

          // console.log('CSV data:', response.data);
          this.snackbar = true
          this.color = 'primary'
          this.snackbarText = 'Reports downloaded successfully.'
        }
      })
    },
    openLeadreport(){
      this.dialog13 = true;
    },
    closeLreport(){
      this.dialog13 = false;
      this.citydata = "";
    },
  openLreport(){
     this.isProgress13 = true;
      const requestData = {
        // merchant: this.selectedmerchants3,
        location: this.userType === 'Business Head' ? this.citydata : this.cityID
      };
       this.Leadreports(requestData.requestData).then((response)=>{
           if (response.data.status == 0) {
               this.isProgress13 = false;
      this.dialog13 = false;


          this.snackbar = true;
          this.color = 'on-background'
          this.snackbarText = response.data.message
        } else {
          this.isProgress13 = false;      
      this.citydata = "";
      this.dialog13 = false;

          const blob = new Blob([response.data], { type: 'text/csv' })

          // Create a temporary URL for the Blob
          const url = window.URL.createObjectURL(blob)

          // Create a link element
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Lead Report.csv') // Set the file name here

          // Append the link to the body
          document.body.appendChild(link)

          // Programmatically click the link to trigger the download
          link.click()

          // Clean up - remove the link and revoke the URL
          link.parentNode.removeChild(link)
          window.URL.revokeObjectURL(url)

          // console.log('CSV data:', response.data);
          this.snackbar = true
          this.color = 'primary'
          this.snackbarText = 'Reports downloaded successfully.'
        }
      })
  },
     openMerchantreport() {
      this.dialog12 = true;
      
    },
    closeMerchantreport(){
      this.dialog12 = false;
      this.selectedMerchantReportype = null;
      this.startDate2 = null;
      this.endDate2 = null;
      this.citydata = "";
    },
    validateForm10() {
      this.$refs.purchaseOrderForm10.validate().then(valid => {
        // console.log("form valid", valid.valid);
        // if (valid.valid == true) {
        //   this.getGSTinvoicedetails()
        // } else {
        //   this.snackbar = true
        //   this.snackbarText = 'Please give all mandatory fields'
        //   this.color = 'on-background'
        // }
        if (valid) {
          // Check if citydata is required and provided
          if (this.userType === 'Business Head' && !this.citydata) {
            this.snackbar = true;
            this.snackbarText = 'Please select a city';
            this.color = 'on-background';
          } else {
            // Proceed with API call
            this.getGSTinvoicedetails();
          }
        } else {
          this.snackbar = true;
          this.snackbarText = 'Please give all mandatory fields';
          this.color = 'on-background';
        }
      })
    },
    opengstreport() {
      this.dialog11 = true
    },
    closeGSTreport() {
      this.dialog11 = false
      this.selectGST = null
      this.startDate = null
      this.endDate = null
    },
    getGSTinvoicedetails() {
      if (this.selectGST == 'Invoice Wise') {
          const requestData = {
        // merchant: this.selectedmerchants3,
        location: this.userType === 'Business Head' ? this.citydata : this.cityID
      };
        this.isProgress11 = true
        this.GSTinvoicewise(this.startDate, this.endDate,requestData.location).then(response => {
          if (response.data.status == 0) {
            this.isProgress11 = false
            this.dialog11 = false

            this.selectGST = ''
            this.startDate = ''
            this.endDate = ''
            this.snackbar = true
            this.color = 'on-background'
            this.snackbarText = response.data.message
          } else {
            this.isProgress11 = false
            this.dialog11 = false

            //  this.loading = true;
            // this.reportsdata={};
            this.selectGST = ''
            this.startDate = ''
            this.endDate = ''
            this.citydata = ''

            //  console.log('length',response.data.length);
            const blob = new Blob([response.data], { type: 'text/csv' })

            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(blob)

            // Create a link element
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'GST InvoicewIse Report.csv') // Set the file name here

            // Append the link to the body
            document.body.appendChild(link)

            // Programmatically click the link to trigger the download
            link.click()

            // Clean up - remove the link and revoke the URL
            link.parentNode.removeChild(link)
            window.URL.revokeObjectURL(url)

            // console.log('CSV data:', response.data);
            this.snackbar = true
            this.color = 'primary'
            this.snackbarText = 'Reports downloaded successfully.'
          }
        })
      } else {
        this.isProgress11 = true
        const requestData = {
        // merchant: this.selectedmerchants3,
        location: this.userType === 'Business Head' ? this.citydata : this.cityID
      };
        this.GSTproductwise(this.startDate, this.endDate,requestData.location).then(response => {
          if (response.data.status == 0) {
            this.isProgress11 = false
            this.dialog11 = false

            this.selectGST = ''
            this.startDate = ''
            this.endDate = ''
            this.snackbar = true
            this.color = 'on-background'
            this.snackbarText = response.data.message
          } else {
            this.isProgress11 = false
            this.dialog11 = false

            //  this.loading = true;
            // this.reportsdata={};
            this.selectGST = ''
            this.startDate = ''
            this.endDate = ''
            this.citydata = ''
            //  console.log('length',response.data.length);
            const blob = new Blob([response.data], { type: 'text/csv' })

            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(blob)

            // Create a link element
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'GST Productwise Report.csv') // Set the file name here

            // Append the link to the body
            document.body.appendChild(link)

            // Programmatically click the link to trigger the download
            link.click()

            // Clean up - remove the link and revoke the URL
            link.parentNode.removeChild(link)
            window.URL.revokeObjectURL(url)

            // console.log('CSV data:', response.data);
            this.snackbar = true
            this.color = 'primary'
            this.snackbarText = 'Reports downloaded successfully.'
          }
        })
      }
    },
    handleuserSelection(itm) {
      console.log('check id', itm)
      
      if(itm == "all"){
        console.log("yes it is selected")
        this.isProgress10 = true;
         this.getMerchantdetails().then(() => {
            this.isProgress10 = false;
        }).catch(() => {
            this.isProgress10 = false;
        });
  

      }else{
          this.isProgress10 = true;

          this.getSalesmerchant(itm).then(response => {
        console.log('check response data', response)
        if (response.data.status == 1) {
          this.isProgress10 = false;
          // this.getmerchantdata = response.data.data.map(merchant => ({
          //   value: merchant.merchant_id,
          //   text: merchant.merchant_uid,
          // }))
           this.getmerchantdata = [
          { value: "all", text: "All" },
          ...response.data.data.map(merchant => ({
            value: merchant.merchant_id,
            text: merchant.merchant_uid
          }))
        ];
          this.snackbar = true
          this.snackbarText = response.data.message
          this.color = 'primary'
        } else {
          this.isProgress10 = false

          this.snackbar = true
          this.snackbarText = response.data.message
          this.color = 'on-background'
        }
      })
      }
    
    
    },
    validateForm9(){
       this.$refs.purchaseOrderForm9.validate().then(valid => {
        // console.log("form valid", valid.valid);
        // if (valid.valid == true) {
        //   this.getmerchantpayemt()
        // } else {
        //   this.snackbar = true
        //   this.snackbarText = 'Please give all mandatory fields'
        //   this.color = 'on-background'
        // }
          if (valid) {
          // Check if citydata is required and provided
          if (this.userType === 'Business Head' && !this.citydata) {
            this.snackbar = true;
            this.snackbarText = 'Please select a city';
            this.color = 'on-background';
          } else {
            // Proceed with API call
            this.getmerchantpayemt();
          }
        } else {
          this.snackbar = true;
          this.snackbarText = 'Please give all mandatory fields';
          this.color = 'on-background';
        }
      })
    },
    getmerchantpayemt(){
      if(this.selectedReportype == "Invoice Wise"){
         const requestData = {
        // merchant: this.selectedmerchants3,
        location: this.userType === 'Business Head' ? this.citydata : this.cityID
      };

          this.isProgress9 = true;
         this.Merchantpayments(this.selectedSalesuser,this.selectedSalesMerchant,this.startDate1,this.endDate1,requestData.location).then((response)=>{
           if (response.data.status == 0) {
          this.isProgress10 = false;
          this.isProgress9 = false;
          this.dialog10 = false;
          this.selectedReportype = '';
          this.selectedSalesuser = '';
          this.selectedSalesMerchant = '';
          this.startDate1 = '';
          this.endDate1 = '';

          this.snackbar = true;
          this.color = 'on-background'
          this.snackbarText = response.data.message
        } else {
           this.isProgress10 = false;
          this.isProgress9 = false;
          this.dialog10 = false;
          this.citydata = ""

          //  this.loading = true;
          // this.reportsdata={};
            this.selectedSalesuser = '';
          this.selectedSalesMerchant = '';
          this.selectedReportype = '';

          this.startDate1 = '';
          this.endDate1 = '';
          //  console.log('length',response.data.length);
          const blob = new Blob([response.data], { type: 'text/csv' })

          // Create a temporary URL for the Blob
          const url = window.URL.createObjectURL(blob)

          // Create a link element
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Merchant Payment Report.csv') // Set the file name here

          // Append the link to the body
          document.body.appendChild(link)

          // Programmatically click the link to trigger the download
          link.click()

          // Clean up - remove the link and revoke the URL
          link.parentNode.removeChild(link)
          window.URL.revokeObjectURL(url)

          // console.log('CSV data:', response.data);
          this.snackbar = true
          this.color = 'primary'
          this.snackbarText = 'Reports downloaded successfully.'
        }
      })
      }else{
        const requestData = {
        // merchant: this.selectedmerchants3,
        location: this.userType === 'Business Head' ? this.citydata : this.cityID
      };
        this.isProgress9 = true;
         this.Merchantpaymentsoverall(this.selectedSalesuser,this.selectedSalesMerchant,this.startDate1,this.endDate1,requestData.location,this.cityID).then((response)=>{
           if (response.data.status == 0) {
          this.isProgress10 = false;
          this.isProgress9 = false;
          this.dialog10 = false;
          this.selectedReportype = '';

          this.selectedSalesuser = '';
          this.selectedSalesMerchant = '';
          this.startDate1 = '';
          this.endDate1 = '';

          this.snackbar = true;
          this.color = 'on-background'
          this.snackbarText = response.data.message
        } else {
           this.isProgress10 = false;
          this.isProgress9 = false;
          this.dialog10 = false;
          this.selectedReportype = '';
          this.citydata = ""

          //  this.loading = true;
          // this.reportsdata={};
            this.selectedSalesuser = '';
          this.selectedSalesMerchant = '';
          this.startDate1 = '';
          this.endDate1 = '';
          //  console.log('length',response.data.length);
          const blob = new Blob([response.data], { type: 'text/csv' })

          // Create a temporary URL for the Blob
          const url = window.URL.createObjectURL(blob)

          // Create a link element
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Merchant Payment Report.csv') // Set the file name here

          // Append the link to the body
          document.body.appendChild(link)

          // Programmatically click the link to trigger the download
          link.click()

          // Clean up - remove the link and revoke the URL
          link.parentNode.removeChild(link)
          window.URL.revokeObjectURL(url)

          // console.log('CSV data:', response.data);
          this.snackbar = true
          this.color = 'primary'
          this.snackbarText = 'Reports downloaded successfully.'
        }
       })
      }
     
    },
    openMerchantpayment() {
      this.dialog10 = true
    },
    closeMerchantpayment() {
      this.dialog10 = false
      this.selectedmerchants4 = ''
          this.citydata = ""

    },
    validateForm8() {
      this.$refs.purchaseOrderForm8.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
          this.getUserstoreloginreport()
        } else {
          this.snackbar = true
          this.snackbarText = 'Please give all mandatory fields'
          this.color = 'on-background'
        }
      })
    },
    getUserstoreloginreport() {
      this.isProgress8 = true
      // console.log('text it',this.userStoredata);
      this.getUserstorereport(this.userStoredata).then(response => {
        // console.log(response);

        if (response.data.status == 0) {
          this.isProgress8 = false
          this.dialog9 = false

          this.userStoredata = ''
          this.snackbar = true
          this.color = 'on-background'
          this.snackbarText = response.data.message
        } else {
          this.isProgress8 = false
          this.dialog9 = false
          this.citydata = ""

          //  this.loading = true;
          // this.reportsdata={};
          this.userStoredata = ''
          //  console.log('length',response.data.length);
          const blob = new Blob([response.data], { type: 'text/csv' })

          // Create a temporary URL for the Blob
          const url = window.URL.createObjectURL(blob)

          // Create a link element
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'User Store Login Report.csv') // Set the file name here

          // Append the link to the body
          document.body.appendChild(link)

          // Programmatically click the link to trigger the download
          link.click()

          // Clean up - remove the link and revoke the URL
          link.parentNode.removeChild(link)
          window.URL.revokeObjectURL(url)

          // console.log('CSV data:', response.data);
          this.snackbar = true
          this.color = 'primary'
          this.snackbarText = 'Reports downloaded successfully.'
        }
      })
    },
    closeUserLoginreport() {
      this.dialog9 = false
      this.userStoredata = ''
          this.citydata = ""

    },
    openUserstore() {
      this.dialog9 = true
    },

    getAllsales() {
      this.getsalesperson().then(response => {
        // console.log('sales',response);
        // this.salesdata = response.data.data;

        //  this.salesdata = this.salesdata.map(sales => ({
        //     value: sales.user_id,
        //     text: sales.name
        // }));

         this.userstorenames = [
          { value: "all", text: "All" },
          ...response.data.data.map(brand => ({
            value: brand.user_id,
            text: brand.name
          }))
        ];
        // this.userstorenames = response.data.data.map(brand => ({
        //   value: brand.user_id,
        //   text: brand.name,
        // }))

        console.log('sales', this.userstorenames)
      })
    },

    validateForm7() {
      this.$refs.purchaseOrderForm7.validate().then(valid => {
        // console.log("form valid", valid.valid);
        // if (valid.valid == true) {
        //   this.getPurchaseOrdersdatareport()
        // } else {
        //   this.snackbar = true
        //   this.snackbarText = 'Please give all mandatory fields'
        //   this.color = 'on-background'
        // }
        if (valid) {
          // Check if citydata is required and provided
          if (this.userType === 'Business Head' && !this.citydata) {
            this.snackbar = true;
            this.snackbarText = 'Please select a city';
            this.color = 'on-background';
          } else {
            // Proceed with API call
            this.getPurchaseOrdersdatareport();
          }
        } else {
          this.snackbar = true;
          this.snackbarText = 'Please give all mandatory fields';
          this.color = 'on-background';
        }
      })
    },
    getPurchaseOrdersdatareport() {
      const statusMapping = {
        All: 'all',
        Acknowledged: '3',
        Shared: '4',
        Received: '5',
        Cancel: '6',
      }

      if (this.Purchasedata.date_filter === 'Custom') {
        this.Purchasedata.date_filter = 'custom'
      } else if (this.Purchasedata.date_filter === 'Current Year') {
        this.Purchasedata.date_filter = 'this_year'
        this.Purchasedata.start_date = this.getFormattedDate(new Date())
        this.Purchasedata.end_date = this.getFormattedDate(new Date())
      } else if (this.Purchasedata.date_filter === 'Current Month') {
        this.Purchasedata.date_filter = 'this_month'
        this.Purchasedata.start_date = this.getFormattedDate(new Date())
        this.Purchasedata.end_date = this.getFormattedDate(new Date())
      }
  const requestData = {
        // merchant: this.selectedmerchants3,
        location: this.userType === 'Business Head' ? this.citydata : this.cityID
      };

      this.isProgress7 = true

      this.getPurchasesorderreport(
        statusMapping[this.selectPurchase],
        this.Purchasedata.date_filter,
        this.Purchasedata.start_date,
        this.Purchasedata.end_date,
        requestData.location
      ).then(response => {
        // console.log(response);

        if (response.data.status == 0) {
          this.isProgress7 = false
          this.dialog8 = false
          this.Purchasedata = {}
          this.selectPurchase = ''
          this.snackbar = true
          this.color = 'on-background'
          this.snackbarText = response.data.message
        } else {
          this.isProgress7 = false
          this.dialog8 = false
          this.Purchasedata = {}
          this.selectPurchase = ''
          this.citydata = ""

          //  this.loading = true;
          // this.reportsdata={};
          this.selectedmerchants3 = ''
          //  console.log('length',response.data.length);
          const blob = new Blob([response.data], { type: 'text/csv' })

          // Create a temporary URL for the Blob
          const url = window.URL.createObjectURL(blob)

          // Create a link element
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Purchase Order Report.csv') // Set the file name here

          // Append the link to the body
          document.body.appendChild(link)

          // Programmatically click the link to trigger the download
          link.click()

          // Clean up - remove the link and revoke the URL
          link.parentNode.removeChild(link)
          window.URL.revokeObjectURL(url)

          // console.log('CSV data:', response.data);
          this.snackbar = true
          this.color = 'primary'
          this.snackbarText = 'Reports downloaded successfully.'
        }
      })
    },
    openPurchase() {
      this.dialog8 = true
    },
    closePurchase() {
      this.dialog8 = false
      this.selectPurchase = ''
          this.citydata = ""

    },
    // filter(){
    //   if(this.userType == "Business Head"){
    //     this.filterLocation = true;
    //   }else{
    //     this.filterLocation = false;

    //   }
    // },
    validateForm12(){
        this.$refs.purchaseOrderForm12.validate().then((valid) => {
        if (valid) {
          // Check if citydata is required and provided
          if (this.userType === 'Business Head' && !this.citydata) {
            this.snackbar = true;
            this.snackbarText = 'Please select a city';
            this.color = 'on-background';
          } else {
            // Proceed with API call
            this.openLreport();
          }
        } else {
          this.snackbar = true;
          this.snackbarText = 'Please give all mandatory fields';
          this.color = 'on-background';
        }
      });
    },
    validateForm11(){
        this.$refs.purchaseOrderForm11.validate().then((valid) => {
        if (valid) {
          // Check if citydata is required and provided
          if (this.userType === 'Business Head' && !this.citydata) {
            this.snackbar = true;
            this.snackbarText = 'Please select a city';
            this.color = 'on-background';
          } else {
            // Proceed with API call
            this.getMerchantreport();
          }
        } else {
          this.snackbar = true;
          this.snackbarText = 'Please give all mandatory fields';
          this.color = 'on-background';
        }
      });
    },
    getMerchantreport(){
      this.isProgress12 = true;
        const requestData = {
        // merchant: this.selectedmerchants3,
        location: this.userType === 'Business Head' ? this.citydata : this.cityID
      };

       this.Merchantreports(requestData.location).then((response)=>{
           if (response.data.status == 0) {
               this.isProgress12 = false;

          // this.dialog10 = false;

          // this.selectedSalesuser = '';
          // this.selectedSalesMerchant = '';
          // this.startDate1 = '';
          // this.endDate1 = '';

          this.snackbar = true;
          this.color = 'on-background'
          this.snackbarText = response.data.message
        } else {
          this.isProgress12 = false;
       
          this.citydata = ""

          //  this.loading = true;
          // this.reportsdata={};
          
          //  console.log('length',response.data.length);
          const blob = new Blob([response.data], { type: 'text/csv' })

          // Create a temporary URL for the Blob
          const url = window.URL.createObjectURL(blob)

          // Create a link element
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Merchant Report.csv') // Set the file name here

          // Append the link to the body
          document.body.appendChild(link)

          // Programmatically click the link to trigger the download
          link.click()

          // Clean up - remove the link and revoke the URL
          link.parentNode.removeChild(link)
          window.URL.revokeObjectURL(url)

          // console.log('CSV data:', response.data);
          this.snackbar = true
          this.color = 'primary'
          this.snackbarText = 'Reports downloaded successfully.'
        }
      })
    },
 validateForm6() {
      // Validate the form
      this.$refs.purchaseOrderForm6.validate().then((valid) => {
        if (valid) {
          // Check if citydata is required and provided
          if (this.userType === 'Business Head' && !this.citydata) {
            this.snackbar = true;
            this.snackbarText = 'Please select a city';
            this.color = 'on-background';
          } else {
            // Proceed with API call
            this.getMerchantProductsreport();
          }
        } else {
          this.snackbar = true;
          this.snackbarText = 'Please give all mandatory fields';
          this.color = 'on-background';
        }
      });
    },
    getMerchantProductsreport() {
      this.isProgress6 = true;

      const requestData = {
        merchant: this.selectedmerchants3,
        location: this.userType === 'Business Head' ? this.citydata : this.cityID
      };

      this.getMProductsreport(requestData.merchant, requestData.location).then(response => {
        if (response.data.status === 0) {
          this.isProgress6 = false;
          this.dialog7 = false;
          this.snackbar = true;
          this.color = 'on-background';
          this.snackbarText = response.data.message;
        } else {
          this.isProgress6 = false;
          this.dialog7 = false;
          this.selectedmerchants3 = '';
          this.citydata = "";
          const blob = new Blob([response.data], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Merchant Products Report.csv');
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
          this.snackbar = true;
          this.color = 'primary';
          this.snackbarText = 'Reports downloaded successfully.';
        }
      });
    },
    closeMPreport() {
      this.dialog7 = false
      this.selectedmerchants3 = ''
          this.citydata = ""

    },
    openMPR() {
      this.dialog7 = true
    },
    openBrand() {
      this.dialog6 = true
    },
    closeBreport() {
      this.dialog6 = false
      this.selectedBrand2 = ''
          this.citydata = ""

    },
    validateForm5() {
      this.$refs.purchaseOrderForm5.validate().then(valid => {
        // console.log("form valid", valid.valid);
        // if (valid.valid == true) {
        //   this.getbrandsreport()
        // } else {
        //   this.snackbar = true
        //   this.snackbarText = 'Please give all mandatory fields'
        //   this.color = 'on-background'
        // }
         if (valid) {
          // Check if citydata is required and provided
          if (this.userType === 'Business Head' && !this.citydata) {
            this.snackbar = true;
            this.snackbarText = 'Please select a city';
            this.color = 'on-background';
          } else {
            // Proceed with API call
            this.getbrandsreport();
          }
        } else {
          this.snackbar = true;
          this.snackbarText = 'Please give all mandatory fields';
          this.color = 'on-background';
        }
      })
    },
    getbrandsreport() {
      this.isProgress5 = true
 const requestData = {
        // merchant: this.selectedmerchants3,
        location: this.userType === 'Business Head' ? this.citydata : this.cityID
      };

      this.getBrandsallreport(this.selectedBrand2,requestData.location).then(response => {
        // console.log(response);

        if (response.data.status == 0) {
          this.isProgress5 = false
          this.dialog6 = false

          this.selectedBrand2 = ''
          this.snackbar = true
          this.color = 'on-background'
          this.snackbarText = response.data.message
        } else {
          this.isProgress5 = false
          this.dialog6 = false
          this.citydata = ""

          //  this.loading = true;
          // this.reportsdata={};
          this.selectedBrand2 = ''
          //  console.log('length',response.data.length);
          const blob = new Blob([response.data], { type: 'text/csv' })

          // Create a temporary URL for the Blob
          const url = window.URL.createObjectURL(blob)

          // Create a link element
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Brand Report.csv') // Set the file name here

          // Append the link to the body
          document.body.appendChild(link)

          // Programmatically click the link to trigger the download
          link.click()

          // Clean up - remove the link and revoke the URL
          link.parentNode.removeChild(link)
          window.URL.revokeObjectURL(url)

          // console.log('CSV data:', response.data);
          this.snackbar = true
          this.color = 'primary'
          this.snackbarText = 'Reports downloaded successfully.'
        }
      })
    },

    validateForm4() {
      this.$refs.purchaseOrderForm4.validate().then(valid => {
        // console.log("form valid", valid.valid);
        // if (valid.valid == true) {
        //   this.getwarehousestockreport()
        // } else {
        //   this.snackbar = true
        //   this.snackbarText = 'Please give all mandatory fields'
        //   this.color = 'on-background'
        // }
        if (valid) {
          // Check if citydata is required and provided
          if (this.userType === 'Business Head' && !this.citydata) {
            this.snackbar = true;
            this.snackbarText = 'Please select a city';
            this.color = 'on-background';
          } else {
            // Proceed with API call
            this.getwarehousestockreport();
          }
        } else {
          this.snackbar = true;
          this.snackbarText = 'Please give all mandatory fields';
          this.color = 'on-background';
        }
      })
    },
    getwarehousestockreport() {
      this.isProgress4 = true;
      const requestData = {
        // merchant: this.selectedmerchants3,
        location: this.userType === 'Business Head' ? this.citydata : this.cityID
      };

      this.getBrandreports(this.selectedBrand,requestData.location).then(response => {
        // console.log(response);

        if (response.data.status == 0) {
          this.isProgress4 = false
          this.dialog5 = false

          this.selectedBrand = ''
          this.snackbar = true
          this.color = 'on-background'
          this.snackbarText = response.data.message
        } else {
          this.isProgress4 = false
          this.dialog5 = false
          this.citydata = ""

          //  this.loading = true;
          // this.reportsdata={};
          this.selectedBrand = ''
          //  console.log('length',response.data.length);
          const blob = new Blob([response.data], { type: 'text/csv' })

          // Create a temporary URL for the Blob
          const url = window.URL.createObjectURL(blob)

          // Create a link element
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Warehouse Stock Inventory Report.csv') // Set the file name here

          // Append the link to the body
          document.body.appendChild(link)

          // Programmatically click the link to trigger the download
          link.click()

          // Clean up - remove the link and revoke the URL
          link.parentNode.removeChild(link)
          window.URL.revokeObjectURL(url)

          // console.log('CSV data:', response.data);
          this.snackbar = true
          this.color = 'primary'
          this.snackbarText = 'Reports downloaded successfully.'
        }
      })
    },

    getBrandsdata() {
      this.getBrands(this.cityID,this.locationID).then(response => {
        this.Brandname = [
          { value: 'all', text: 'All' },
          ...response.data.map(brand => ({
            value: brand.brand_id,
            text: brand.brand_name,
          })),
        ]
        console.log('check the response', this.Brandname)
      })
    },
    closewreport() {
      this.dialog5 = false
      this.selectedBrand = ''
          this.citydata = ""

    },
    openWSI() {
      this.dialog5 = true
    },
    closemreport() {
      this.dialog4 = false
      this.selectedmerchants2 = ''
          this.citydata = ""

    },
    openMSI() {
      this.dialog4 = true
    },
    validateForm1() {
      this.$refs.purchaseOrderForm1.validate().then(valid => {
        // console.log("form valid", valid.valid);
        // if (valid.valid == true) {
        //   this.getReport()
        // } else {
        //   this.snackbar = true
        //   this.snackbarText = 'Please give all mandatory fields'
        //   this.color = 'on-background'
        // }
          if (valid) {
          // Check if citydata is required and provided
          if (this.userType === 'Business Head' && !this.citydata) {
            this.snackbar = true;
            this.snackbarText = 'Please select a city';
            this.color = 'on-background';
          } else {
            // Proceed with API call
            this.getReport();
          }
        } else {
          this.snackbar = true;
          this.snackbarText = 'Please give all mandatory fields';
          this.color = 'on-background';
        }
      })
    },
    validateForm2() {
      this.$refs.purchaseOrderForm2.validate().then(valid => {
        // console.log("form valid", valid.valid);
        // if (valid.valid == true) {
        //   this.getSales()
        // } else {
        //   this.snackbar = true
        //   this.snackbarText = 'Please give all mandatory fields'
        //   this.color = 'on-background'
        // }
         if (valid) {
          // Check if citydata is required and provided
          if (this.userType === 'Business Head' && !this.citydata) {
            this.snackbar = true;
            this.snackbarText = 'Please select a city';
            this.color = 'on-background';
          } else {
            // Proceed with API call
            this.getSales();
          }
        } else {
          this.snackbar = true;
          this.snackbarText = 'Please give all mandatory fields';
          this.color = 'on-background';
        }
      })
    },

    validateForm3() {
      this.$refs.purchaseOrderForm3.validate().then(valid => {
        // console.log("form valid", valid.valid);
        // if (valid.valid == true) {
        //   this.getMerchantsreport()
        // } else {
        //   this.snackbar = true
        //   this.snackbarText = 'Please give all mandatory fields'
        //   this.color = 'on-background'
        // }
           if (valid) {
          // Check if citydata is required and provided
          if (this.userType === 'Business Head' && !this.citydata) {
            this.snackbar = true;
            this.snackbarText = 'Please select a city';
            this.color = 'on-background';
          } else {
            // Proceed with API call
            this.getMerchantsreport();
          }
        } else {
          this.snackbar = true;
          this.snackbarText = 'Please give all mandatory fields';
          this.color = 'on-background';
        }
      })
    },

    getMerchantsreport() {
      this.isProgress3 = true
 const requestData = {
        // merchant: this.selectedmerchants3,
        location: this.userType === 'Business Head' ? this.citydata : this.cityID
      };
      this.getMerchantstocksreport(this.selectedmerchants2,requestData.location).then(response => {
        // console.log(response);

        if (response.data.status == 0) {
          this.isProgress3 = false
          this.dialog4 = false

          this.selectedmerchants2 = ''
          this.snackbar = true
          this.color = 'on-background'
          this.snackbarText = response.data.message
        } else {
          this.isProgress3 = false
          this.dialog4 = false
          this.citydata = ""

          //  this.loading = true;
          this.reportsdata = {}
          this.selectedmerchants2 = ''

          const blob = new Blob([response.data], { type: 'text/csv' })

          // Create a temporary URL for the Blob
          const url = window.URL.createObjectURL(blob)

          // Create a link element
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Merchant Stock Inventory Report.csv') // Set the file name here

          // Append the link to the body
          document.body.appendChild(link)

          // Programmatically click the link to trigger the download
          link.click()

          // Clean up - remove the link and revoke the URL
          link.parentNode.removeChild(link)
          window.URL.revokeObjectURL(url)

          // console.log('CSV data:', response.data);
          this.snackbar = true
          this.color = 'primary'
          this.snackbarText = 'Reports downloaded successfully.'
        }
      })
    },
    openSales() {
      this.dialog3 = true
    },
    closeSales() {
      this.dialog3 = false
      this.selectSales = null
          this.citydata = ""

    },
    getFormattedDates(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    closereport() {
      this.dialog2 = false
      this.reportsdata = {}
      this.selectedmerchants = ''
          this.citydata = ""

    },
    //   selectAllMerchants() {
    //   if (this.selectAll) {
    //     // Select all merchants
    //     this.selectedmerchants = "all";
    //   } else {
    //     // Deselect all merchants
    //     this.selectedmerchants = [];
    //   }
    // },
    selectAllMerchants() {
      if (this.selectAll) {
        // Selecting all merchants including "All"
        this.selectedmerchants = ['all', ...this.merchantName.map(merchant => merchant.value)]
      } else {
        // Deselecting all merchants
        this.selectedmerchants = []
      }
    },
    getFormattedDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    downloadExcel() {
      console.log('download excel')
    },
    // downloadReport(){
    //     if (this.reportsMerchant.length === 0) {
    //     alert("No data to download.");
    //     return;
    //   }

    //   // Format data for Excel
    //   const formattedData = this.reportsMerchant.map(item => ({
    //     "Closing": item.Closing,
    //     "Date": item.Date,
    //     "Merchant Name": item['Merchant Name'],
    //     "Merchant UID": item['Merchant UID'],
    //     "Opening": item.Opening,
    //     "Physical SOH": item['Physical SOH'],
    //     "SA Name": item['SA Name'],
    //     "SKU Name": item['SKU Name'],
    //     "Sale": item.Sale
    //   }));

    //   // Use VueExcelXlsx component to trigger download
    //   this.$refs.exportExcel.exportAsExcel({
    //     data: formattedData,
    //     columns: this.jsonfields,
    //     fileName: 'reportsMerchant',
    //     sheetName: 'Sheet1',
    //   });
    // },
    getSales() {
      // if (this.dialog3) {
      //     this.dialog3 = false;
      //     return; // Exit the method to prevent further execution
      //   }

      // if(this.selectSales === "All"){
      //   this.selectSales = "all"
      // }else if(this.selectSales === "Acknowledged"){
      //    this.selectSales = "3"
      // }else if(this.selectSales === "Shipped"){
      //    this.selectSales = "4"
      // }else if(this.selectSales === "Delivered"){
      //    this.selectSales = "5"
      // }

      const statusMapping = {
        All: 'all',
        Acknowledged: '3',
        Shipped: '4',
        Delivered: '5',
        OnHold: '7',
        Cancel: '0'
      }

      const statusma={
        "GRN Orders": 'all'
      }
      console.log('check ', statusma[this.selectSales])
      this.isProgress2 = true;

        const requestData = {
        // merchant: this.selectedmerchants3,
        location: this.userType === 'Business Head' ? this.citydata : this.cityID
      };

      if (this.Salesdata.date_filter === 'Custom') {
        this.Salesdata.date_filter = 'custom'
      } else if (this.Salesdata.date_filter === 'Current Year') {
        this.Salesdata.date_filter = 'this_year'
        this.Salesdata.start_date = this.getFormattedDate(new Date())
        this.Salesdata.end_date = this.getFormattedDate(new Date())
      } else if (this.Salesdata.date_filter === 'Current Month') {
        this.Salesdata.date_filter = 'this_month'
        this.Salesdata.start_date = this.getFormattedDate(new Date())
        this.Salesdata.end_date = this.getFormattedDate(new Date())
      }
      if(this.selectSales != "GRN Orders"){
           this.salesstocksreport(
        statusMapping[this.selectSales],
        this.Salesdata.date_filter,
        this.Salesdata.start_date,
        this.Salesdata.end_date,
        requestData.location
      ).then(response => {
        console.log('check the response', response)
        if (response.data.status == 0) {
          this.isProgress2 = false
          this.dialog3 = false
          this.selectSales = null
          this.Salesdata = {}
          this.snackbar = true
          this.color = 'on-background'
          this.snackbarText = response.data.message
        } else {
          this.isProgress2 = false
          this.dialog3 = false
          this.selectSales = null
          this.Salesdata = {}
          this.citydata = ""

          //  this.loading = true;

          // this.reportsMerchant = response.data;
          const blob = new Blob([response.data], { type: 'text/csv' })
          // Create a temporary URL for the Blob
          const url = window.URL.createObjectURL(blob)
          // Create a link element
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Sales Report.csv') //
          document.body.appendChild(link)

          link.click()

          link.parentNode.removeChild(link)
          window.URL.revokeObjectURL(url)

          this.snackbar = true
          this.color = 'primary'
          this.snackbarText = 'Reports downloaded successfully.'
        }
      })
      }else{
         this.grnsalesstocksreport(
        statusma[this.selectSales],
        this.Salesdata.date_filter,
        this.Salesdata.start_date,
        this.Salesdata.end_date,
        requestData.location
      ).then(response => {
        console.log('check the response', response)
        if (response.data.status == 0) {
          this.isProgress2 = false
          this.dialog3 = false
          this.selectSales = null
          this.Salesdata = {}
          this.snackbar = true
          this.color = 'on-background'
          this.snackbarText = response.data.message
        } else {
          this.isProgress2 = false
          this.dialog3 = false
          this.selectSales = null
          this.Salesdata = {}
          this.citydata = ""

          //  this.loading = true;

          // this.reportsMerchant = response.data;
          const blob = new Blob([response.data], { type: 'text/csv' })

          // Create a temporary URL for the Blob
          const url = window.URL.createObjectURL(blob)

          // Create a link element
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'GRN Sales Report.csv') //
          document.body.appendChild(link)

          link.click()

          link.parentNode.removeChild(link)
          window.URL.revokeObjectURL(url)

          this.snackbar = true
          this.color = 'primary'
          this.snackbarText = 'Reports downloaded successfully.'
        }
      })
      }
   
    },
    getReport() {
      // const postdata = {
      //      "merchant_id":this.selectedmerchants,
      //         "date_filter":this.reportsdata.date_filter,
      //         "start_date":this.reportsdata.start_date,
      //         "end_date":this.reportsdata.end_date
      // }
  const requestData = {
        // merchant: this.selectedmerchants3,
        location: this.userType === 'Business Head' ? this.citydata : this.cityID
      };
      if (this.reportsdata.date_filter === 'Custom') {
        this.reportsdata.date_filter = 'custom'
      } else if (this.reportsdata.date_filter === 'Current Year') {
        this.reportsdata.date_filter = 'this_year'
        this.reportsdata.start_date = this.getFormattedDate(new Date())
        this.reportsdata.end_date = this.getFormattedDate(new Date())
      } else if (this.reportsdata.date_filter === 'Current Month') {
        this.reportsdata.date_filter = 'this_month'
        this.reportsdata.start_date = this.getFormattedDate(new Date())
        this.reportsdata.end_date = this.getFormattedDate(new Date())
      }
      // console.log('check the res',this.reportsdata.date_filter,this.selectedmerchants,this.reportsdata.start_date, this.reportsdata.end_date);
      this.isProgress = true

      this.storestocksreport(
        this.selectedmerchants,
        this.reportsdata.date_filter,
        this.reportsdata.start_date,
        this.reportsdata.end_date,
        requestData.location
      ).then(response => {
        // console.log(response);

        if (response.data.status == 0) {
          this.isProgress = false
          this.dialog2 = false
          this.reportsdata = {}
          this.selectedmerchants = ''
          this.snackbar = true
          this.color = 'on-background'
          this.snackbarText = response.data.message
        } else {
          this.isProgress = false
          this.dialog2 = false
          this.citydata = ""
          //  this.loading = true;
          this.reportsdata = {}
          this.selectedmerchants = ''
          this.reportsMerchant = response.data
          const blob = new Blob([response.data], { type: 'text/csv' })

          // Create a temporary URL for the Blob
          const url = window.URL.createObjectURL(blob)

          // Create a link element
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Merchant Report.csv') // Set the file name here

          // Append the link to the body
          document.body.appendChild(link)

          // Programmatically click the link to trigger the download
          link.click()

          // Clean up - remove the link and revoke the URL
          link.parentNode.removeChild(link)
          window.URL.revokeObjectURL(url)

          // console.log('CSV data:', response.data);
          this.snackbar = true
          this.color = 'primary'
          this.snackbarText = 'Reports downloaded successfully.'
        }
      })
    },
    openMPS() {
      this.dialog2 = true
    },
    getMerchantdetails() {

        return new Promise((resolve, reject) => {
          this.getMerchants(this.cityID)
            .then((response) => {
               this.merchantName = [
                { value: 'all', text: 'All' },
                ...response.data.data.map(brand => ({
                  value: brand.merchant_id,
                  text: brand.merchant_uid,
                })),
              ]
              resolve(); // Resolve the promise when API call is successful
            })
            .catch((error) => {
              console.error('Error fetching merchants:', error);
              reject(error); // Reject the promise if there's an error
            });
        });


      // this.getMerchants().then(response => {
      //   // console.log('mer',response)
      //   // this.merchantName = response.data.data;
      //   this.merchantName = [
      //     { value: 'all', text: 'All' },
      //     ...response.data.data.map(brand => ({
      //       value: brand.merchant_id,
      //       text: brand.merchant_uid,
      //     })),
      //   ]
      //   // console.log('mer', this.merchantName)
      // })
    },
  },
}
</script>

<style lang="scss">
.triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.avatarg {
  position: absolute;
  inline-size: 7rem;
  inset-block-end: -1rem;
  inset-inline-end: 0.8rem;
}
.trophy {
  position: absolute;
  inline-size: 5.8rem;
  inset-block-end: -1rem;
  inset-inline-end: -1rem;
}
.trophy1 {
  position: absolute;
  inline-size: 6rem;
  inset-block-end: 0.5rem;
  inset-inline-end: 1rem;
}
.trophy2 {
  position: absolute;
  inline-size: 12rem;
  inset-block-end: -1rem;
  inset-inline-end: -1rem;
}
.trophy4 {
  position: absolute;
  inline-size: 9rem;
  inset-block-end: 0.9rem;
  inset-inline-end: -2rem;
}
.trophy5 {
  position: absolute;
  inline-size: 5rem;
  inset-block-end: -1rem;
  inset-inline-end: 2rem;
}
.trophy7 {
  position: absolute;
  inline-size: 5rem;
  inset-block-end: -0.2rem;
  inset-inline-end: -0.2rem;
}
.trophy12 {
  position: absolute;
  inline-size: 9rem;
  inset-block-end: -0.2rem;
  inset-inline-end: -0.2rem;
}
.trophy10 {
  position: absolute;
  inline-size: 10rem;
  inset-block-end: -0.2rem;
  inset-inline-end: -0.2rem;
}
.trophy6 {
  position: absolute;
  inline-size: 3.1rem;
  inset-block-end: -0.7rem;
  inset-inline-end: 2rem;
}
</style>
