<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard
          title="Assign Trip View"
          class="mb-4"
        >
          <VCardText>
            <!-- 👉 Form -->
            <VForm
              ref="tripform" 
              class="mt-6"
            >
              <VRow>
                <VCol
                  cols="12"
                  md="6"
                >
                  <!-- @update:model-value="locationdetails()" -->
                  <VAutocomplete
                    v-model="locationdata"
                    label="Location"
                    :items="cityLoaction"               
                    item-value="value"
                    item-title="text"                
                    :menu-props="{ maxHeight: 200 }"                 
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="Enddate"
                    type="date"
                    label="Date"
                    :rules="endr"
                  />
                </VCol>
                <!-- {{this.Importcsv}} -->

                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"                 
                >
                  <VBtn @click="validateForm">
                    Get
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    
    <div style="max-width: 400px">
      <VTextField
        v-model="searchQuery"
        class="mb-3"
        density="compact"
        variant="solo"
        label="Search"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
      />
    </div>
    <div
      v-if="loading"
      id="app"
    >
      <div id="loading-bg">
        <div class="loading-logo">
          <img
            src="../../../assets/images/logos/comlogo.jpeg"
            height="60"
            width="68"
            alt="Logo"
          >
        </div>
        <div class="loading">
          <div class="effect-1 effects" />
          <div class="effect-2 effects" />
          <div class="effect-3 effects" />
        </div>
      </div>
    </div>
    <!--
      <VRow v-if="this.filteredPurchaseHistory == null">
      <VCol cols="12"> 
      <VCard title="Purchase Order View">
      <VCardText>      
      <VAlert
      color="warning"
      variant="tonal"
      class="mb-4"              
      border="top"
      >
      <VAlertTitle class="mb-1"> Are you sure you gave Purchase Orders? </VAlertTitle>
      <p class="mb-0">
      The system is not retrieving the Purchase Histories from Purchase Orders. Please ensure that you have applied for Purchase Orders !</p>
      </VAlert>
      </VCardText>
      </VCard>
      </VCol>
      </VRow> 
    -->

    <VTable
      :headers="headers"
      :items="paginatedItems"
      item-key="dessert"
      class="table-rounded"
      height="500"
      fixed-header
    >
      <thead>
        <tr>
          <th 
            v-for="header in headers"
            :key="header"
            class="text-center"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredSAwisetarget.length === 0">
          <td
            colspan="16"
            class="text-center"
          >
            <h1>No data found !</h1>
          </td>
        </tr>  
        <template
          v-for="(item, index) in filteredSAwisetarget"
          :key="index"
        >
          <tr>
            <td class="text-center">
              {{ index + 1 }}
            </td>
            <td class="text-center">
              {{ item.city }}
            </td>
            <td class="text-center">
              {{ item.trip_name }}
            </td>
            <td class="text-center">
              {{ item.location }}
            </td>
            <td class="text-center">
              {{ item.delivery_person }}
            </td>
            <td class="text-center">
              {{ item.sales_order_count }}
            </td>
            <td class="text-center">
              <VBtn
                icon 
                variant="text"
                color="default"
                class="mb-1 mt-2"
                size="x-small"
                @click="createshippinvoice(item.trip_id)"
              >
                <VIcon
                  icon="iwwa:file-pdf"
                  size="22"
                  color="error"
                />
              </VBtn>
              
              <VBtn
                icon 
                variant="text"
                color="default"
                class="mb-1 mt-2"
                size="x-small"
                @click="toggleExpand(item,index)"
              >
                <VIcon
                  :icon="expandedIndex === index ? 'mdi-minus' : 'mdi-plus'"
                  size="22"
                  color="#BA8B32"
                />
              </VBtn>

              <VBtn
                icon
                variant="text"
                color="default"
                class="me-2"
                size="x-small"
                @click="editrow(item)"
              >
                <VIcon
                  icon="ri-pencil-line"
                  size="22"
                  color="#BA8B32"
                />
              </VBtn>

              <VBtn
                icon
                variant="text"
                color="default"
                class="me-2"
                size="x-small"
                @click="viewrow(item)"
              >
                <VIcon
                  color="success"
                  icon="basil:eye-outline"
                  size="22"
                />
              </VBtn>
            </td>
          </tr>

          <tr
            v-if="expandedIndex === index"
            :key="`expanded-${index}`"
          >
            <td colspan="7">
              <VExpandTransition>
                <div>
                  <!-- Additional table content here -->
                  <VTable dense>
                    <thead>
                      <tr>
                        <th
                          v-for="header in headers3"
                          :key="header"
                          class="text-center"
                        >
                          {{ header.text }}
                        </th>                      
                      <!-- More headers as needed -->
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in getAllsalesorderdata"
                        :key="index"
                      >
                        <td class="text-center">
                          {{ item.so_number }}
                        </td>
                        <td class="text-center">
                          {{ item.created_date }}
                        </td>
                        <td class="text-center">
                          {{ item.merchant_uid }}
                        </td>
                        <td class="text-center">
                          {{ item.so_status }}
                        </td>
                        <td class="text-center">
                          {{ item.invoice_number }}
                        </td>
                        <td class="text-center">
                          {{ item.not_delivered_reason }}
                        </td>
                        <td class="text-center">
                          <VBtn    
                            v-if="(item.so_status === 'Shipped' || item.so_status === 'Delivered' || item.so_status === 'Cancelled' || item.so_status === 'Acknowledged' || item.so_status === 'Ready To Ship') && item.invoice_file != ''"      
                            icon
                            variant="text"
                            color="default"
                            class="me-2"
                            size="x-small"
                            @click="getinvoice(item.invoice_file)"
                          >
                            <VIcon
                              color="error"
                              icon="iwwa:file-pdf" 
                              size="26"
                            />
                          </VBtn>

                          <VBtn
                            v-else
                            icon
                            variant="text"
                            color="default"
                            class="me-2"
                            size="x-small"
                          >
                            <VIcon
                              left
                              color="error"
                              icon="wpf:create-new"
                              size="26"
                              @click="genaratePDFinvoice(item.so_id)"
                            />
                          </VBtn>
                        </td>
                        <td class="text-center">
                          <VBtn            
                            icon
                            variant="text"
                            color="default"
                            class="me-2"
                            size="x-small"
                            @click="getdeliverychallan(item.delivery_challan_file)"
                          >
                            <VIcon
                              color="error"
                              icon="iwwa:file-pdf"
                              size="26"
                            />
                          </VBtn>
                        </td>
                        <!-- v-if="item.so_status != 'Delivered'" -->
                        <td
                          v-if="item.so_status != 'Delivered'"
                          class="text-center"
                        >
                          <!-- @click="editrow(item)" -->                           
                          <VBtn 
                            v-if="item.invoice_file != ''"
                            icon
                            variant="text"
                            color="default"
                            class="me-2"
                            size="x-small"
                            @click="editassignedrow(item)"
                          >
                            <VIcon
                              icon="ri-pencil-line"
                              size="22"
                              color="#BA8B32"
                            />
                          </VBtn>
                        </td>
                      <!-- More data as needed -->
                      </tr>
                    </tbody>
                  </VTable>
                </div>
              </VExpandTransition>
            </td>
          </tr>
        </template>
      </tbody>     

      <VDialog
        v-model="dialog"
        max-width="400"
        persistent
      >
        <VCard
          title="Assign Delivery Person"
          class="mb-2"
        >
          <VCardText>
            <VRow>
              <VCol cols="12">
                <!-- 👉 Form -->
                <VForm
                  ref="purchaseOrderForm"
                  class="mt-4"
                >
                  <VRow>                
                    <!-- {{Deliverydata.delivery_person}} -->
                    <VCol
                      md="12"
                      cols="12"
                    >
                      <VAutocomplete
                        v-model="Deliverypersondata"
                        :items="deliveryPerson"
                        item-value="value"
                        item-title="text"                  
                        label="Assign Delivery Person"
                        :rules="person"
                        :menu-props="{ maxHeight: 200 }"
                      />
                    </VCol>
                  
                    <!--
                      <VCol
                      md="12"
                      cols="12"
                      >
                      <VTextField
                      v-model="Deliverydata.shipped_date"
                      type="date"
                      label="Start Date"
                      :min="today"
                      :rules="dater"
                      />
                      </VCol> 
                    -->
                    <VCol
                      md="12"
                      cols="12"
                    >
                      <VBtn @click="validateForm2">
                        Save
                      </VBtn> &nbsp;
                      <!-- @click="resetdetails" -->
                      <VBtn
                        color="secondary"
                        variant="tonal"
                        @click="closeDialog"
                      >
                        Close
                      </VBtn>
                    </VCol>
                  </VRow>
                </VForm>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VDialog>

      <VDialog
        v-model="dialog2"
        max-width="800"
      >
        <VCard
          title="View Trip Sales Orders"
          class="mb-2"
        >
          <VCardText>
            <div style="max-width: 400px">
              <VTextField
                v-model="searchQuery2"
                class="mb-3"
                density="compact"
                variant="solo"
                label="Search"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
              />
            </div>

  
            <VTable
              :headers="headers2"
              :items="paginatedItems2"
              item-key="dessert"
              class="table-rounded"
              max-height="90vh"
              max-width="800"
              fixed-header
            >
              <thead>
                <tr>
                  <th 
                    v-for="header in headers2"
                    :key="header"
                    class="text-center"
                  >
                    {{ header.text }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in filteredSAwisetarget2"
                  :key="index"
                >
                  <td class="text-center">
                    {{ index + 1 }}
                  </td> 
                  <td class="text-center">
                    {{ item.sku_name }}
                  </td> 
                  <td class="text-center">
                    {{ item.shipped_ordered }}
                  </td> 
                  <td class="text-center">
                    {{ item.shipped_exchange }}
                  </td>
                  <!--
                    <td class="text-center">
                    {{ item.delivery_person }}
                    </td>         
                    <td class="text-center">
                    {{ item.sales_order_count }}
                    </td>  
                  -->
                </tr>
              </tbody>
            </VTable> <br>
            <VBtn
              color="primary"
                      
              @click="closeDialog2"
            >
              Close
            </VBtn>
          </VCardText>
        </VCard>
        <!--
          <VPagination
          v-model="page2"
          :length="Math.ceil(filteredSAwisetarget2.length / pageSize2)"
          @input="updatePagination2"
          /> 
        -->
      </VDialog>
    </VTable>

    <VDialog
      v-model="dialog3"
      max-width="400"
      persistent
    >
      <VCard
        title="SO Status Change"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                ref="purchaseOrderForms"
                class="mt-4"
              >
                <VRow>                
                  <!-- {{Deliverydata.delivery_person}} -->
                  <VCol
                    md="12"
                    cols="12"
                  >
                    <VAutocomplete
                      v-model="soStatusdata"
                      :items="['Delivered','Ready To Ship','On Hold']"
                                    
                      label="Assign Delivery Person"
                      :rules="person"
                      :menu-props="{ maxHeight: 200 }"
                      @update:model-value="handlePersonSelection(soStatusdata)" 
                    />
                  </VCol>
                  
                  <!--
                    <VCol
                    md="12"
                    cols="12"
                    >
                    <VTextField
                    v-model="Deliverydata.shipped_date"
                    type="date"
                    label="Start Date"
                    :min="today"
                    :rules="dater"
                    />
                    </VCol> 
                  -->
                  <VCol
                    v-if="soStatusdata != 'Delivered'"
                    md="12"
                    cols="12"
                  >
                    <VBtn @click="validateForm3">
                      Save
                    </VBtn> &nbsp;
                    <!-- @click="resetdetails" -->
                    <VBtn
                      color="secondary"
                      variant="tonal"
                      @click="closeDialog3"
                    >
                      Close
                    </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>


    <VDialog
      v-model="dialog4"
      max-width="900"
      persistent
    >
      <VCard
        title="Delivery Visit"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm
                ref="purchaseOrderFormss"
                class="mt-4"
              >
                <VRow>                
                  <!-- {{Deliverydata.delivery_person}} -->
                  <VTable
                    :headers="headers4"              
                    item-key="dessert"
                    class="table-rounded"
                    max-height="90vh"
                    max-width="800"
                    fixed-header
                  >
                    <thead>
                      <tr>
                        <th 
                          v-for="header in headers4"
                          :key="header"
                          class="text-center"
                        >
                          {{ header.text }}
                        </th>
                      </tr>
                    </thead>
                    
                    <tbody>
                      <tr
                        v-for="(item, index) in filteredStockData"
                        :key="index"
                      >
                        <td class="text-center">
                          {{ item.sku_name }}
                        </td> 
                        <td class="text-center">
                          {{ item.shipped_ordered }}
                        </td> 
                        <td class="text-center">
                          {{ item.shipped_exchange }}
                        </td> 
                        <td class="text-center">
                          {{ item.return }}
                        </td>
                        <td
                          :class="{
                            'has-error': isQuantityExceeded(
                              item.delivered_ordered,
                              item.shipped_ordered
                                
                            ),
                          }"
                        >
                          <VTextField
                            v-model="item.delivered_ordered"
                            type="number"   
                            min="0"
                            style="min-width:80px;"
                            :rules="getDeliveryRules(item)"                         
                            @keydown="preventDecimal"
                            @paste="preventPaste"
                          />
                        </td>
                        <td
                          :class="{
                            'has-error': isQuantityExceeded2(
                              item.shipped_exchange,
                              item.delivered_exchange
                                
                            ),
                          }"
                        >
                          <VTextField
                            v-model="item.delivered_exchange"
                            type="number"   
                            min="0"
                            style="min-width:80px;"
                            :rules="getdeliveryexchangerule(item)"
                            
                            @keydown="preventDecimal"
                            @paste="preventPaste"
                          />
                        </td>
                        <td
                          :class="{
                            'has-error': isQuantityExceeded3(
                              item.delivered_returned,
                              item.return                                
                            ),
                          }"
                        >
                          <VTextField
                            v-model="item.delivered_returned"
                            type="number"   
                            min="0"
                            :rules="getdeliveryreturnrule(item)"

                            style="min-width:80px;"
                            @keydown="preventDecimal"
                            @paste="preventPaste"
                          />
                        </td>
                        <td
                          :class="{
                            'has-error': isQuantityExceeded4(
                              item.shipped_ordered,
                              item.delivered_ordered,
                              item.damaged                                
                            ),
                          }"
                        >
                          <VTextField
                            v-model="item.damaged"
                            type="number"   
                            min="0"
                            style="min-width:80px;"
                            :rules="getDamagedRules(item)"

                            @keydown="preventDecimal"
                            @paste="preventPaste"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </VTable>
                  
                  <!--
                    <VCol
                    md="12"
                    cols="12"
                    >
                    <VTextField
                    v-model="Deliverydata.shipped_date"
                    type="date"
                    label="Start Date"
                    :min="today"
                    :rules="dater"
                    />
                    </VCol> 
                  -->
                  <VCol
                    md="12"
                    cols="12"
                  >
                    <VBtn @click="validateForm4(item)">
                      Save
                    </VBtn> &nbsp;
                    <!-- @click="resetdetails" -->
                    <VBtn
                      color="secondary"
                      variant="tonal"
                      @click="closeDialog4"
                    >
                      Close
                    </VBtn>
                    <VProgressCircular
                      v-show="isProgress"
                      :size="50"
                      color="primary"
                      indeterminate
                    />
                  </VCol>
                </VRow>
              </VForm>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

    <VDialog
      v-model="dialog5"
      max-width="500"
      persistent
    >
      <VCard
        title="Do You want bulk invoice creation for this trip!"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <!-- 👉 Form -->
               
                 
            <VCol
              md="12"
              cols="12"
            >
              <VBtn @click="bulkinvoicecreate">
                Save
              </VBtn> &nbsp;
              <!-- @click="resetdetails" -->
              <VBtn
                color="secondary"
                variant="tonal"
                @click="closeDialog5"
              >
                Close
              </VBtn>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

    <VDialog
      v-model="dialog6"
      max-width="500"
      persistent
    >
      <VCard
        title="POD Image Upload"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <!-- 👉 Form -->
            <VCol
              md="12"
              cols="12"
            >
              <VFileInput
                v-model:file="imageFile"
                label="Image Browse"
                accept=".jpg, .png, .jpeg"                    
                multiple
                @input="handleFileChange"
              />
            </VCol>
            
                 
            <VCol
              md="12"
              cols="12"
            >
              <VBtn @click="podimageupload">
                Save
              </VBtn> &nbsp;
              <!-- @click="resetdetails" -->
              <VBtn
                color="secondary"
                variant="tonal"
                @click="closeDialog6"
              >
                Close
              </VBtn>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>
    <VPagination
      v-model="page"
      :length="Math.ceil(filteredSAwisetarget.length / pageSize)"
      @input="updatePagination"
    />
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
import servicescall from '@/Services';

export default {
  mixins: [servicescall],

  data() {
    return{
      expandedIndex: null,
      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,
      Enddate:'',
      outputstockdata:[],
      totaloutputstockdata:[],
      imageFile: null,
      deliverorder: [v => v === 0 || (!!v && `${v}`.trim() !== '') || 'Delivery Quantity Is Required'],
      deliverdamage: [v => v === 0 || (!!v && `${v}`.trim() !== '') || 'Damaged Quantity Is Required'],

      // searchQuery:'',
      locationdata:'',
      cityID:'',
      loading:'',
      cityLoaction:[],
      getAllsalesorderdata:[],
      person: [v => !!v || 'Assign Delivery Person is required'],
      headers: [
        { text: 'Serial No.', value: 'user_name' },
        { text: 'City', value: 'user_name' },
        { text: 'Trip Name', value: 'user_name' },
        { text: 'Location', value: 'merchant_uid' },
        { text: 'Driver Name', value: 'target_amount' },
        { text: 'Sales Order Count', value: 'achieved_target' },
        { text: 'Action', value: 'achieved_percentage' },
      ],
      headers3: [
        { text: 'So No.', value: 'so_no' },
        { text: 'Created Date', value: 'so_no' },

        { text: 'Merchant UID', value: 'merchant_name' },
        { text: 'Status', value: 'status' },
        { text: 'Invoice Number', value: 'user_name' },
        { text: 'Not Deliver Reason', value: 'user_name' },
        { text: 'Invoice File', value: 'user_name' },
        { text: 'Delivery Challan File', value: 'user_name' },

        { text: 'Action', value: 'achieved_percentage' },
        
        // { text: 'Location', value: 'merchant_uid' },
        // { text: 'Driver Name', value: 'target_amount' },
        // { text: 'Sales Order Count', value: 'achieved_target' },
        // { text: 'Action', value: 'achieved_percentage' },
      ],
      headers2: [
        { text: 'Serial No.', value: 'user_name' },

        { text: 'SKU Name', value: 'user_name' },
        { text: 'Shipped Ordered', value: 'user_name' },
        { text: 'Shipped Exchange', value: 'user_name' },

        // { text: 'Location', value: 'merchant_uid' },
        // { text: 'Driver Name', value: 'target_amount' },
        // { text: 'Sales Order Count', value: 'achieved_target' },
        // { text: 'Action', value: 'achieved_percentage' },
      ],
      headers4: [
        { text: 'SKU Name', value: 'user_name' },
        { text: 'Shipped Ordered', value: 'user_name' },
        { text: 'Shipped Exchange', value: 'user_name' },

        { text: 'Return', value: 'merchant_uid' },
        { text: 'Delivery Ordered', value: 'delivery_orderd' },
        { text: 'Delivery Exchange', value: 'delivery_exchange' },
        { text: 'Return Quantity', value: 'return_quantity' },

        // { text: 'Delivery Exchange', value: 'achieved_percentage' },
        { text: 'Not Delivered', value: 'achieved_percentage' },


      ],
      isProgress:false,
      AssignedPerson:[],
      deliveryPerson:[],
      Deliverypersondata:'',
      TripId:"",
      searchQuery: '',
      page: 1,
      pageSize: 10,
      page2: 1,
      pageSize2: 10,
      dialog:false,
      getSalesorder:[],
      dialog2:false,
      searchQuery2:'',
      dialog3:false,
      soStatusdata:'',
      dialog4:false,
      dialog5:false,
      dialog6:false,
      SOIDD:'',
      bulkpdfid:'',
      dialogData:[],
    }
  },
  computed: {
    filteredStockData() {
      return this.outputstockdata.filter(
        item =>
          item.shipped_ordered > 0 ||
        item.shipped_exchange > 0 ||
        item.return > 0,
      )
    },
    filteredSAwisetarget() {
      const lowerCaseQuery = this.searchQuery.toLowerCase().trim()
      
      return this.AssignedPerson.filter(item => {
        return (
          (item.city && item.city.toLowerCase().includes(lowerCaseQuery)) ||
          (item.delivery_person && item.delivery_person.toLowerCase().includes(lowerCaseQuery)) ||       
          (item.location && item.location.toLowerCase().includes(lowerCaseQuery)) ||
          (item.sales_order_count && item.sales_order_count.toString().includes(lowerCaseQuery)) ||
          (item.trip_name && item.trip_name.toLowerCase().includes(lowerCaseQuery))
        )
      })
    },
    paginatedItems() {
      const startIndex = (this.page - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      
      return this.filteredSAwisetarget.slice(startIndex, endIndex)
    },
    filteredSAwisetarget2() {
      const lowerCaseQuery = this.searchQuery2.toLowerCase().trim()
      
      return this.getSalesorder.filter(item => {
        return (
          (item.shipped_exchange && item.shipped_exchange.toString().includes(lowerCaseQuery)) ||
          (item.shipped_ordered && item.shipped_ordered.toString().includes(lowerCaseQuery)) ||       
          (item.sku_name && item.sku_name.toLowerCase().includes(lowerCaseQuery))         
        )
      })
    },
    paginatedItems2() {
      const startIndex = (this.page2 - 1) * this.pageSize2
      const endIndex = startIndex + this.pageSize2
      
      return this.filteredSAwisetarget2.slice(startIndex, endIndex)
    },
  },
  mounted(){
   
    this.cityID = localStorage.getItem("city_id")

    this.handleBrandSelection()
  },
  methods:{
    getDeliveryRules(item) {
      return [
        v => {
          // Skip all validations if shipped_ordered is 0
          if (item.shipped_ordered === "0") return true

          // Otherwise, validate that the field has a value or damaged > 0
          return !!v || item.damaged > 0 || "Required."
        },
        v => {
          if (item.shipped_ordered === "0") return true // Skip validation if shipped_ordered is 0
          
          return v >= 0 || "Value must be positive."
        },
        v => {
          if (item.shipped_ordered === "0") return true // Skip validation if shipped_ordered is 0
          
          return !this.isQuantityExceeded4(item.shipped_ordered, v, item.damaged)
        },
      ]
    },

    getDamagedRules(item) {
      return [
        v => {
          // Skip all validations if shipped_ordered is 0
          if (item.shipped_ordered === "0") return true

          // Otherwise, validate that the field has a value or delivered_ordered > 0
          return !!v || item.delivered_ordered > 0 || "Required"
        },
        v => {
          if (item.shipped_ordered === "0") return true // Skip validation if shipped_ordered is 0
          
          return v >= 0 || "Value must be positive."
        },
        v => {
          if (item.shipped_ordered === "0") return true // Skip validation if shipped_ordered is 0
          
          return !this.isQuantityExceeded4(item.shipped_ordered, item.delivered_ordered, v)
        },
      ]
    },
    getdeliveryreturnrule(item){
      return [
        v => {
          // Skip all validations if shipped_ordered is 0
          if (item.return === "0")
            return true

          // Otherwise, validate that the field has a value or delivered_ordered > 0
          return !!v || item.delivered_returned > 0 || "Required"
        },
        v => {
          if (item.return === "0") return true // Skip validation if shipped_ordered is 0
          
          return v >= 0 || "Value must be positive."
        },        
      ]
    },
    getdeliveryexchangerule(item){
      return [
        v => {
          // Skip all validations if shipped_ordered is 0
          if (item.shipped_exchange === "0") return true

          // Otherwise, validate that the field has a value or delivered_ordered > 0
          return !!v || item.delivered_exchange > 0 || "Required"
        },
        v => {
          if (item.shipped_exchange === "0") return true // Skip validation if shipped_ordered is 0
          
          return v >= 0 || "Value must be positive."
        },        
      ]
    },

    isQuantityExceeded(itm, data) {   
      // const so = String(itm)
      // const dao = String(data)

      // Check using inequality logic
      if (itm > data) {
        this.snackbar = true
        this.color = "on-background"
        this.snackbarText = "Delivered quantity must match Ordered quantity."

        return true // Error state
      }

      return false // Valid state
    },

    isQuantityExceeded2(itm,data){
      if(itm<data){
        this.snackbar = true
        this.color = "on-background"
        this.snackbarText = "Delivery Exchange cannot exceed Exchange quantity."
        
        return true
      }
      
      return false
    },
    isQuantityExceeded3(itm,data){
      if(itm>data){
        this.snackbar = true
        this.color = "on-background"
        this.snackbarText = "Delivery Return cannot exceed Return quantity."
        
        return true
      }
      
      return false
    },
    isQuantityExceeded4(itm, data, txt) {
      // console.log(itm,data,txt)

      // Convert both data and txt to numbers
      const total = data + txt

      // const shippedOrdered = String(itm) // Convert itm to a number
      // const totalString = String(total)

      // Logging for debugging
      console.log("Total:", total, "Shipped Ordered:", itm)

      // console.log(total > itm)

      // Check using inequality logic
      if (total != itm) {      

        // Show snackbar error
        this.snackbar = true
        this.color = "on-background"
        this.snackbarText = "The total of delivered and damaged quantities must match the shipped quantity."

        return true // Error state
      }

      return false // Valid state
    },

    createshippinvoice(itm){      
      this.bulkpdfid = itm
      this.dialog5 = true
    },
    genaratePDFinvoice(id){
      this.createInvoice(id).then(response=>{
        this.snackbarText = "Invoice Generated Successfully"
             
        this.color = 'primary'
        this.snackbar = true
        window.location.reload(true)
     
      })
    },
    bulkinvoicecreate(){
      // console.log('check ud',this.bulkpdfid)

      this.shippedinvoice(this.bulkpdfid).then(response =>{
        // console.log({response})
        if(response.data.status == 1){
          // this.getAllsalesorderdata = response.data.data
          this.snackbar = true
          this.color = 'primary'           
          this.snackbarText = response.data.message
          this.AssignedPerson
          this.dialog5 = false

          // this.SOid = id.so_id;
        }else{
          
          this.snackbar = true
          this.color = 'on-background'           
          this.snackbarText = response.data.message
        }
        
      })
    },
    handleFileChange(event) {
      if (event.target.files.length > 0) {
        this.imageFile = event.target.files[0]

        // console.log('File Selected:', this.Importcsv);
      } else {
        // Clear the file input when no file is selected
        this.imageFile = null
      }
    },
    podimageupload() {
      if (this.imageFile) {
        const reader = new FileReader()

        reader.onloadend = () => {
          const base64Image = reader.result.split(',')[1] // Remove the data URL prefix
      
          const rawData = {
            pod_image: base64Image, // Base64 string
            so_id: this.SOIDD,       // Additional data
          }

          // Call the API to upload the image
          this.DeliveredPODimage(rawData)
            .then(response => {
              console.log({ response })

              if (response.data.status == 1) {
                this.snackbar = true
                this.snackbarText = response.data.message
                this.color = 'primary'
                this.imageFile = ''
                this.SOIDD = ''
                this.dialog3 = false
                this.dialog4 = true
                this.dialog6 = false
                this.getOutputstock(this.dialogData.so_id, this.dialogData.city_id).then(response => {
                  console.log("res",response)
                  this.totaloutputstockdata = response.data
                  this.outputstockdata = this.totaloutputstockdata.products.map(item => ({
                    ...item,
                    delivered_ordered: item.delivered_ordered ?? 0,
                    delivered_exchange: item.delivered_exchange ?? 0,
                    delivered_returned: item.delivered_returned ?? 0,
                    damaged: item.damaged ?? 0,
                  }))           


                })
              } else if (response.data.status == 0) {
                this.snackbar = true
                this.snackbarText = response.data.message
                this.color = 'on-background'
              } else {
                this.snackbar = true
                this.color = 'on-background'
                this.snackbarText = "Image Is Mandatory"
              }
            })
            .catch(error => {
              // console.error('Error uploading file:', error)
            })
        }
    
        // Read the file as a Data URL (Base64)
        reader.readAsDataURL(this.imageFile)
      } else {
        this.snackbar = true
        this.snackbarText = "Please select an image to upload."
        this.color = 'on-background'
      }
    },

    handlePersonSelection(item){
      if(item === 'Delivered'){
        // this.dialog4 = true
        this.dialog6 = true

        this.dialog3 = false
        
      }else{
        this.dialog6 = false

      }
    },
    preventDecimal(event) {     
      if (event.key === '.' || event.key === ',' ||  event.key === '+' ||  event.key === '-' || event.keyCode === 189 || event.keyCode === 109) {
        event.preventDefault()
      }
    },
    preventPaste(event){
      const clipboardData = event.clipboardData || window.clipboardData
      const pastedData = clipboardData.getData('text')

      // Validate pasted data (you can modify this regex as needed)
      const isValid = /^[0-9]+$/.test(pastedData)

      if (!isValid) {
        event.preventDefault()
      }
    },
    validateForm3(){
      // if(this.soStatusdata === 'Delivered'){
      //   this.dialog4 = true
      //   this.dialog3 = false
      // }else{
      //   this.dialog4 = false
      // }
    },
   
    closeDialog4(){
      this.dialog4 = false
    },
    closeDialog5(){
      this.dialog5 = false

    },
    closeDialog6(){
      this.dialog6 = false

    },
    editassignedrow(item){
      // console.log({item})
      this.dialog3 = true
      this.dialogData = item

      // console.log("check dialog data",   item)
      this.soStatusdata = item.so_status
      this.SOIDD = item.so_id

      // if (this.soStatusdata === 'Delivered') {

      //   this.dialog4 = true
      //   this.dialog3 = false
      //   this.getOutputstock(item.so_id,item.city_id).then(response=>{
      //     console.log({response})
      //     this.outputstockdata = response.data.products
      //   })
      // }else{
      //   this.dialog4 = false

      // }
    },  
    closeDialog3(){
      this.dialog3 = false
      this.soStatusdata = ''
    },
    getdeliverychallan(id){
      // this.loading2 = true
      window.open(id, '_blank')

      // this.loading2 = false

    },
    getinvoice(id){
      // this.loading2 = true
      window.open(id, '_blank')

      // this.loading2 = false

      // this.getPurchasePDF(id).then((response)=>{
      //   console.log(response)
      //   const pdfUrl = response.data.po_file;
      //   this.loading2 = false;
        
      // })
    }, 
    toggleExpand(item,index) {
      this.expandedIndex = this.expandedIndex === index ? null : index
      this.GetTripsalesorders(item.trip_id).then(response=>{
        console.log('check the response',response)
        if(response.data.status == 1){
          this.getAllsalesorderdata = response.data.data
          this.snackbar = true
          this.color = 'primary'           
          this.snackbarText = response.data.message

          // this.SOid = id.so_id;
        }else{
          
          this.snackbar = true
          this.color = 'on-background'           
          this.snackbarText = response.data.message
        }
      })
    },
    viewrow(item){
      // console.log({item});
      this.GetTripdetails(item.trip_id).then(response=>{
        // console.log("response",response)       
        if(response.data.status == 1){
          this.getSalesorder = response.data.data           
          this.dialog2 = true
          this.snackbar = true
          this.color = 'primary'           
          this.snackbarText = response.data.message

          // this.SOid = id.so_id;
        }else{
          this.getSalesorder = []
          this.dialog2 = false
          this.snackbar = true
          this.color = 'on-background'           
          this.snackbarText = response.data.message
        }
      })
    },   
    closeDialog(){
      this.dialog = false
      this.Deliverypersondata = ''
    },
    closeDialog2(){
      this.dialog2 = false

    },
    editrow(id){ 
      // console.log("ids",id);
      this.TripId = id.trip_id
      this.Getsalesperson( this.cityID,this.locationdata).then(response=>{
        // console.log('getperson',response);
        if(response.data.status == 1){
          this.deliveryPerson = response.data.data.map(del => ({
            value: del.delivery_person,
            text: del.name,
          }))            
          this.dialog = true

          // this.SOid = id.so_id;
        }else{
          this.deliveryPerson = []
          this.dialog = false
        }
      })
    },

    validateForm2(){
      this.$refs.purchaseOrderForm.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
              
          this.Assigndelperson()
        }else{
          this.snackbar = true
          this.snackbarText = "Please give all mandatory fields"
          this.color = "on-background"
        }
      }) 
    },
    Assigndelperson(){
      const postData = {
        "trip_id":this.TripId,
        "delivery_person":this.Deliverypersondata,
      }

      // console.log({postData});
      this.Assigndeliveryperson(postData).then(response=>{
        // console.log({response});
        if (response.data.status == 1) {
          // console.log({ response })
          // this.AssignedPerson = response.data.data;
          // this.viewSATragetsdata.reverse()    
          this.dialog = false        
          this.snackbar = true
          this.loading = false
          this.color = 'primary'
          this.snackbarText = response.data.message
          this.validateForm()
          this.Deliverypersondata = ""
          this.TripId = ""
        } else {
          // this.loading = false;
          this.snackbar = true
          this.color = 'on-background'
          this.dialog = false      

          //  this.AssignedPerson = [];
          this.snackbarText = response.data.message
        }

      })
    },
    updatePagination(page) {
      this.page = page
    },
    updatePagination2(page2) {
      this.page2 = page2
    },
    validateForm() {
      this.$refs.tripform.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
          this.getAssignedview()
        } else {
          this.snackbar = true
          this.snackbarText = 'Please give all mandatory fields'
          this.color = 'on-background'
        }
      })
    },
    getAssignedview(){
      this.loading = true

      // this.filterlocation = false

      this.Assignedpersondata(this.locationdata,this.Enddate)
        .then(response => {
          if (response.data.status == 1) {
            // console.log({ response })
            this.AssignedPerson = response.data.data

            // this.viewSATragetsdata.reverse()            
            this.snackbar = true
            this.loading = false
            this.color = 'primary'
            this.snackbarText = response.data.message
          } else {
            this.loading = false
            this.snackbar = true
            this.color = 'on-background'
            this.AssignedPerson = []
            this.snackbarText = response.data.message
          }
        })
    },
    validateForm4(){
      // console.log({item})
      this.$refs.purchaseOrderFormss.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
          // this.saveData();
          // if(this.allQuantity >=1){   
          //    this.saveData();
          // }else{
          //   this.snackbar = true;
          //   this.snackbarText = "Please give Quantities"
          //   this.color = "error";
          // }
          this.postDeliverdetails()
        }else{
          this.snackbar = true
          this.snackbarText = "Please give all mandatory fields"
          this.color = "on-background"
        }
      }) 
   
    },
    postDeliverdetails(){
      const pData = this.totaloutputstockdata
      const now = new Date()
      const today = now.getFullYear() +
        '-' + String(now.getMonth() + 1).padStart(2, '0') +
        '-' + String(now.getDate()).padStart(2, '0') +
        ' ' + String(now.getHours()).padStart(2, '0') +
        ':' + String(now.getMinutes()).padStart(2, '0') +
        ':' + String(now.getSeconds()).padStart(2, '0')
        
      const postData = {
        "created_date": pData.created_date,
        "grn_image": pData.grn_image,
        "grn_number": pData.grn_number,
        "delivery_challan_file": pData.delivery_challan_file,
        "is_empty": pData.is_empty,
        "merchant_code": pData.merchant_code,
        "merchant_id": pData.merchant_id,
        "merchant_name": pData.merchant_name,
        "po_number": pData.po_number,
        "shipped_date": pData.shipped_date,
        "so_id": pData.so_id,
        "so_number": pData.so_number,
        "so_status": 5,
        "sub_total": pData.sub_total,
        "total_cgst": pData.total_cgst,
        "total_margin": pData.total_margin,
        "total_quantity": pData.total_quantity,
        "total_sgst": pData.total_sgst,
        "total_so_amount": pData.total_so_amount,
        "delivered_date": today,
        "pod_image": pData.pod_image,
        "delivery_person": pData.delivery_person,
        "products":  this.outputstockdata.map((deliver,index) => {
          return{
            "amount" : deliver.amount,
            "brand_name" : deliver.brand_name,
            "cgst" : deliver.cgst,
            "cgst_percentage" : deliver.cgst_percentage,
            "exchange" : deliver.exchange,
            "exchange_quantity" : deliver.exchange_quantity,
            "hsn_code" : deliver.hsn_code,
            "margin" : deliver.margin,
            "margin_percentage" : deliver.margin_percentage,
            "merchant_product_id" : deliver.merchant_product_id,
            "mrp" : deliver.mrp,
            "price_per_unit" : deliver.price_per_unit,
            "quantity" : deliver.quantity,
            "return" : deliver.return,
            "sgst" : deliver.sgst,
            "sgst_percentage" : deliver.sgst_percentage,
            "shipped_exchange" : deliver.shipped_exchange,
            "shipped_ordered" : deliver.shipped_ordered,
            "sku_name" : deliver.sku_name,
            "taxable_amount" : deliver.taxable_amount,
            "uom" : deliver.uom,
            "delivered_exchange" : deliver.delivered_exchange?.toString() ?? "0",
            "delivered_ordered" : deliver.delivered_ordered?.toString() ?? "0",
            "delivered_returned" : deliver.delivered_returned?.toString() ?? "0",
            "damaged" : deliver.damaged?.toString() ?? "0",

          }
        }),
      }

      const validationErrors = this.outputstockdata.map(product => {
        const errors = [
          this.isQuantityExceeded(product.delivered_ordered, product.shipped_ordered),
          this.isQuantityExceeded2(product.shipped_exchange, product.delivered_exchange),
          this.isQuantityExceeded3(product.delivered_returned, product.return),
          this.isQuantityExceeded4(product.shipped_ordered, product.delivered_ordered, product.damaged),
        ]
  
        console.log("Errors for product:", product, errors)
        
        return errors.some(error => error)
      })
                     
      console.log(
        'Validation Error :',
        validationErrors.filter(error => error),
      )
     
      if (validationErrors.filter(error => error).length === 0) {
        this.isProgress = true
        this.postDelivery(postData).then(response => {
          console.log({response})
          if(response.data.status == 1){       
            this.snackbar = true
            this.color = 'primary'           
            this.snackbarText = response.data.message
            this.dialog4 = false
            this.isProgress = false
            this.toggleExpand()

            // window.location.reload(true)

          // this.SOid = id.so_id;
          }else{
            this. isProgress = false
          
            this.snackbar = true
            this.color = 'on-background'           
            this.snackbarText = response.data.message
          }
        })
      }else{
        this.snackbar = true
        this.color = 'on-background'
        this.snackbarText = 'your quantities are exceeded'
      }

      // console.log({postData})
    
    },
    handleBrandSelection(){
      // console.log('check hjandle',id);
      this.getCitylocation(this.cityID).then(response=>{
        // console.log('check the response',response);
        this.cityLoaction = response.data.data.map(sales => ({
          value: sales.location_id,
          text: sales.location,
        }))

        // console.log('ceck tye res',this.cityLoaction);
      })
            
    },

  },


 
}
</script>

<style></style>
