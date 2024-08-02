<template>
  <div>
    <!-- <div class="search-container">
      <label for="search">Search:</label>
      <input
        type="text"
        id="search"
        v-model="searchQuery"
        @input="filterDesserts"
        placeholder="Enter search query"
      />
    </div> -->
    <!-- v-if="!showNoSalesAlert" -->
      <VCard         
          class="mb-2"
           v-show="filterlocation"
        >
          <VCardText>
            <VRow>
              <VCol cols="12">
                <!-- 👉 Form -->
              <VForm class="mt-6">
              <!-- <VCheckbox v-model="selectAll" @change="selectAllMerchants">           
              </VCheckbox> -->
              <VRow >
                <VCol
                md="6"
                cols="12"
               
              >
              <!-- {{selectedBrand}} -->  
              <!-- {{this.Addbrand.location_id}}            -->
                <VAutocomplete
                  v-model="locationdata"
                  label="Location"
                  :items="this.cityLoaction"               
                  item-value="value"
                  item-title="text"                
                  :menu-props="{ maxHeight: 200 }"
                   @update:model-value="locationdetails()"

                />
              </VCol>

              </VRow>
              </VForm>
              </VCol>
            </VRow>
          </VCardText>
      </VCard>
      
    <div style="max-width: 400px">
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

    <div
      v-if="loading2"
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

    <!-- v-if="showNoSalesAlert" -->
<!-- 
    <VRow v-if="!saleshistory || saleshistory.length === 0">
      <VCol cols="12">
        <VCard title="Output Stocks View">
          <VCardText>
            <VAlert
              color="warning"
              variant="tonal"
              class="mb-4"
              border="top"
            >
              <VAlertTitle class="mb-1"> Are you sure you have Output Stocks? </VAlertTitle>
              <p class="mb-0">
                The system is trying to retrieving the Orders. Please ensure that you have "Acknowledged" and "Onhold"
                Output Stock Orders !
              </p>
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
    </VRow> -->

  
<!-- <div>{{outputSalesOrders}}</div> -->
 <!-- <h1>Output Sales Orders:</h1>
      <ul>
        <li v-for="(order, index) in outputSalesOrders.data" :key="index">
          {{ order.so_number }} 
        </li>
      </ul> -->
    <div v-if="savingOutputStock" class="loader-wrapper">
      <div class="loader"></div>
    </div>
    <!-- v-if="!showNoSalesAlert" -->
    <!-- hasOwnProperty('cboqs') -->
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
          />
        </div>
        <div class="loading">
          <div class="effect-1 effects"></div>
          <div class="effect-2 effects"></div>
          <div class="effect-3 effects"></div>
        </div>
      </div>
    </div>

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
        <tbody>
        <tr v-if="filteredSalesHistory.length === 0">
          <td colspan="16" class="text-center"><h1>No data found !</h1></td>
        </tr>  
          <tr v-for="item  in paginatedItems" :key="item.so_status">            
          <td class="text-center">{{ item.so_number }}</td>
          <td class="text-center">{{ item.created_date }}</td>
          <td class="text-center"> <VChip
              :color="resolveStatusVariant(item.so_status).color"
              class="font-weight-medium"
              size="small"
            >
              {{ item.so_status }}
              <!-- {{ item.fat }} -->
            </VChip></td>
          <td class="text-center">{{ item.merchant_name }}</td>
          <td class="text-center">{{ item.merchant_name }}</td>
          <td class="text-center">{{ item.total_so_amount }}</td>
          <td class="text-center">  <VBtn
              v-if="item.so_status != 'Shipped' && item.so_status != 'Delivered'"
              icon
              variant="text"
              color="success"
              class="me-2"
              size="small"
            >
              <!-- Receive Stock -->
              <VIcon
                icon="mdi-invoice-receive-outline"
                color="success"
                size="30"
                @click="outputstocks(item)"
              />
            </VBtn>

            <VBtn
              v-if="item.so_status == 'Shipped' || item.so_status == 'Delivered'"
              icon
              variant="text"
              color="default"
              class="me-2"
              size="x-small"
              @click="getPDFupdate(item.delivery_challan_file)"
            >
              <VIcon
                color="error"
                icon="iwwa:file-pdf"
                size="26"
              />
            </VBtn></td>
         
          </tr>
        </tbody>
</VTable>

<!--below is expired table  -->
    <VTable
      v-if="this.saleshistory != ''"
      :headers="headers"
      :items="paginatedItems"
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

          <!-- <tr v-if="filteredSalesHistory.length === 0">
          <td colspan="16" class="text-center"><h1>No data found !</h1></td>
        </tr>   -->
<!-- v-for="(item, index) in outputSalesOrders.data" :key="index" -->
        <tr
          
        >
          <td class="text-center">{{ item.so_number }}</td>
          <td class="text-center">
            {{ item.created_date }}
          </td>
          <td class="text-center">
            <VChip
              :color="resolveStatusVariant(item.so_status).color"
              class="font-weight-medium"
              size="small"
            >
              {{ item.so_status }}
              <!-- {{ item.fat }} -->
            </VChip>
          </td>
          <td class="text-center">
            {{ item.merchant_name }}
          </td>
          <td class="text-center">
            {{ item.merchant_name }}
          </td>
          <td class="text-center">
            {{ item.total_so_amount }}
          </td>
          <td class="text-center">
            <!-- {{item.actions}} -->
            <VBtn
              v-if="item.so_status != 'Shipped' && item.so_status != 'Delivered'"
              icon
              variant="text"
              color="success"
              class="me-2"
              size="small"
            >
              <!-- Receive Stock -->
              <VIcon
                icon="mdi-invoice-receive-outline"
                color="success"
                size="30"
                @click="outputstocks(item)"
              />
            </VBtn>

            <VBtn
              v-if="item.so_status == 'Shipped' || item.so_status == 'Delivered'"
              icon
              variant="text"
              color="default"
              class="me-2"
              size="x-small"
              @click="getPDFupdate(item.delivery_challan_file)"
            >
              <VIcon
                color="error"
                icon="iwwa:file-pdf"
                size="26"
              />
            </VBtn>
            <!-- <VBtn
                icon
                variant="text"
                color="default"
                class="me-2"
                size="x-small"
                @click="deleteRow(item)"
            >
                <VIcon
                icon="ri-pencil-line"
                size="22"
                />
            </VBtn>
            <VBtn
                icon
                variant="text"
                color="default"
                class="me-2"
                size="x-small"
                @click="deleteRow(item)"
            >
                <VIcon
                icon="ri-delete-bin-line"
                size="22"
                />
            </VBtn> -->
          </td>
        </tr>
      </tbody>
    </VTable>

    <VDialog
      v-model="dialog"
      max-width="1000"
    >
      <VCard
        title="Proceed To Ship Sales Orders"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- <VCard title="Output Stock" class="mb-4">       

        <VCardText> -->
              <!-- 👉 Form -->
              <VForm
                class="mt-6"
                ref="purchaseOrderForm"
              >
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="this.outputStock.so_number"
                      label="Sales Order"
                      readonly
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="this.outputStock.merchant_name"
                      label="Order From"
                      readonly
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="this.outputStock.shipped_date"
                      type="date"
                      label="Date"
                      :min="today"
                      :rules="DateRules"
                    />
                  </VCol>

                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="this.outputStock.so_status"
                      label="SO Status"
                      readonly
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <!-- {{this.deliveryPersons}} -->
                <!-- {{selectedDeliveryPerson}} -->
                    <VSelect
                      v-model="selectedDeliveryPerson"
                      label="Select Delivery Person"
                      :items="this.deliveryPersons"
                      item-value="value"
                      item-title="text"
                      :rules="PersonRules"
                      :menu-props="{ maxHeight: 200 }"

                    />

                    <!-- <VSelect v-model="selectedDeliveryPerson" label="Select Delivery Person">
    <VSelectItem
      v-for="person in deliveryPersons"
      :key="person.value"
      :value="person.value"
      :disabled="person.disabled"
    >
      {{ person.text }}
    </VSelectItem>
  </VSelect> -->
                  </VCol>
<!-- {{this.outputStock.po_number}} -->
                    <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="this.outputStock.po_number"
                      label="PO Number"
                      
                    />
                  </VCol>

                  <VCol cols="12">
                      <div
                        v-if="loading3"
                        id="app"
                      >
                        <div id="loading-bg">
                          <div class="loading-logo">
                            <img
                              src="../../../assets/images/logos/comlogo.jpeg"
                              height="60"
                              width="68"
                              alt="Logo"
                            />
                          </div>
                          <div class="loading">
                            <div class="effect-1 effects"></div>
                            <div class="effect-2 effects"></div>
                            <div class="effect-3 effects"></div>
                          </div>
                        </div>
                      </div>
                    <VTable
                      :headers="headers"
                      :items="Salesorderdetails"
                    >
                      <thead>
                        <tr>
                          <th
                            class="text-center"
                            v-for="header in headers2"
                            :key="header"
                          >
                            {{ header.text }}
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <!-- {{filteredOutputstocks}} -->
                        <tr
                          v-for="(item, index) in this.Salesorderdetails"
                          :key="index"
                        >
                          <td class="text-center">
                            {{ item.brand_name }}
                          </td>
                          <td class="text-center">
                            {{ item.sku_name }}
                          </td>
                          <td class="text-center">
                            {{ item.uom }}
                          </td>
                          <td class="text-center">
                            {{ item.quantity }}
                          </td>
                          <td class="text-center">{{ item.exchange == '' ? 0 : item.exchange }}</td>
                          <td class="text-center">
                            {{ item.return }}
                          </td>
                          <td class="text-center">
                            <VChip
                              :color="resolveStatusVariant2(item).color"
                              class="font-weight-medium"
                              size="small"
                            >
                              {{ item.warehouse_quantity >= 0 ? item.warehouse_quantity : 0 }}
                            </VChip>
                            <!-- {{ item.available }} -->
                          </td>
                          <td
                            class="text-center"
                            :class="{
                              'has-error': isQuantityExceeded(
                                item.shipped_ordered,
                                item.quantity,
                                item.warehouse_quantity,
                              ),
                            }"
                          >
                            <VTextField
                              @keydown="preventDecimal"
                              @paste="preventPaste"
                              type="number"
                              min="0"
                              max="20000"
                              :rules="shippedquantity"
                              v-model="item.shipped_ordered"
                              outlined
                              dense
                            />

                            <!-- {{ item.carbs }} -->
                          </td>
                          <!-- <span v-if="isQuantityExceeded(item.shipped_ordered,item.ordered_quantity,item.warehouse_quantity)">
                           
                          </span> -->
                          <td
                            class="text-center"
                            :class="{ 'has-error': isQuantityExceeded2(item.shipped_exchange, item.exchange, item.warehouse_quantity)}"
                          >
                            <VTextField
                              @keydown="preventDecimal"
                              @paste="preventPaste"
                              type="number"
                              min="0"
                              max="20000"
                              :rules="shippedexchange"
                              v-model="item.shipped_exchange"
                              outlined
                              dense
                            />
                            <!-- <span v-if="isQuantityExceeded2(item.shipped_exchange,item.exchange)" >
    </span> -->
                            <!-- {{ item.carbs }} -->
                          </td>

                          <!-- <td class="text-center">
          <VTextField v-model="item.protein" outlined dense />

        
        </td> -->
                        </tr>
                      </tbody>
                      <!-- <tfoot>
        <tr>
           <td>
          {{this.totalshippedorder}}
        </td>
        <td>
          {{this.totalshippedexchange}}
        </td>
        </tr>
        </tfoot>      -->
                    </VTable>
                  </VCol>
                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <!-- :disabled="validquan" -->
                    <VBtn @click="validateForm()">Save</VBtn>
                    <VBtn @click="closedialog()" >Close</VBtn>
                    <VProgressCircular
                      :size="50"
                      color="primary"
                      indeterminate
                      v-show="isProgress"
                    >
                    </VProgressCircular>
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

              <!-- </VCardText>
      </VCard> -->
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

    <VSnackbar
      v-model="snackbar"
      :timeout="3000"
      :color="color"
    >
      {{ snackbarText }}
      <!-- <VBtn text @click="snackbar = false">Close</VBtn> -->
    </VSnackbar>

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

  data() {
    return {
        savingOutputStock: false,
      validquan: false,
      PersonRules: [v => !!v || 'Delivery Person is required'],
      DateRules: [v => !!v || 'Shipped date is required'],
      // loading: true,
      shippedexchange: [v => v === 0 || (!!v && `${v}`.trim() !== '') || 'shippedexchange Quantity Is Required'],
      shippedquantity: [v => v === 0 || (!!v && `${v}`.trim() !== '') || 'shipped Quantity Is Required'],
      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,
      loading3:false,
      isProgress: false,
      selectedPurchaseOrder: null,
      dialog: false,
      Soid: '',
      OutputStockDetails: [],
      filteredsalesdata:[],
      Salesorderdetails:[],
      today: this.getFormattedDate(new Date()),
      locationdata:null,
      outputStock: {
        so_id: '',
        so_number: '',
        merchant_id: '',
        merchant_code: '',
        merchant_name: '',
        total_cgst: '',
        total_sgst: '',
        sub_total: '',
        total_margin: '',
        total_so_amount: '',
        total_quantity: '',
        po_number:'',
        created_date: '',
        shipped_date: this.getFormattedDate(new Date()),
        so_status: '',
        products: [
          {
            merchant_product_id: '',
            sku_name: '',
            hsn_code: '',
            mrp: '',
            margin: '',
            ordered_quantity: '',
            warehouse_quantity: '',
            uom: '',
            price_per_unit: '',
            taxable_amount: '',
            cgst: '',
            sgst: '',
            amount: '',

            sgst_percentage: '',
            cgst_percentage: '',
            exchange: '',
            return: '',
            shipped_ordered: '',
            shipped_exchange: '',
          },
        ],
        delivery_user_details: [
          {
            delivery_person: '',
            name: '',
          },
        ],
      },
      outputStockproducts: [],
      headers2: [
        { text: 'Brand Name', value: 'brand_name' },
        { text: 'SKU Name', value: 'sku_name' },
        { text: 'UOM', value: 'uom' },
        { text: 'Ordered Quantity', value: 'quantity' },
        { text: 'Exchange Quantity', value: 'exchange_quantity' },
        { text: 'Return', value: 'return' },

        { text: 'Available', value: 'warehouse_quantity' },
        { text: 'Shipped Ordered', value: 'shipped_ordered' },
        { text: 'Shipped Exchanged', value: 'shipped_exchange' },

        // { text: 'Remarks', value: 'protein' },
      ],
      selectedDeliveryPerson: null,
      deliveryPersons: [],
      deliveryUserDetails: [],
      filtereddata:[],
      page: 1,
      pageSize: 10,
      loading2: false,
      loaded: false,
      loading: false,
      saleshistory: [],
      salesdata: {},
      searchQuery: '',
      dialog: false,
      cityID:'',
      cityLoaction:[],
      filterlocation: true,
      Deliveryperson:[],
      deliverydata:[],
      headers: [
        { text: 'Sales Order', value: 'so_number' },
        { text: 'Order Date', value: 'created_date' },
        { text: 'Status', value: 'so_status' },
        { text: 'Order From', value: 'merchant_name' },
        { text: 'Shipped To', value: 'merchant_name' },
        { text: 'Order Value', value: 'total_so_amount' },
        { text: 'Action', value: 'actions', sortable: false },
      ],
    }
  },
  computed: {
     outputSalesOrders() {
      return this.$store.state.outputSalesOrders;
    },
    // ifoutputstock(){
    //   this.paginatedItems.map(item => item.)
    // },
    totalshippedorder() {
      return this.Salesorderdetails.reduce((total, item) => total + parseFloat(item.shipped_ordered || 0), 0)
    },
    totalshippedexchange() {
      return this.Salesorderdetails.reduce((total, item) => total + parseFloat(item.shipped_exchange || 0), 0)
    },

    filteredOutputstocks() {
      // Filter purchaseHistory based on the condition
      return this.Salesorderdetails.filter(item => item.exchange_quantity > 0 || item.quantity > 0)
    },
    filteredSalesHistory() {
    //  const postdata = this.outputSalesOrders.data.filter(order=>order.so_number);
    //  console.log('tbf',postdata);
      const lowerCaseQuery = this.searchQuery.toLowerCase().trim()
      return this.filteredsalesdata.filter(item => {
        // Filter based on search query
        const matchesSearch =
          (item.so_number && item.so_number.toLowerCase().includes(lowerCaseQuery)) ||
          (item.created_date && item.created_date.toLowerCase().includes(lowerCaseQuery)) ||
          (item.so_status && item.so_status.toLowerCase().includes(lowerCaseQuery)) ||
          (item.merchant_name && item.merchant_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.total_so_amount && item.total_so_amount.toString().includes(lowerCaseQuery))
        // Filter based on status
        // const matchesStatus = (
        //   item.so_status === 'Acknowledged' ||
        //   item.so_status === 'On Hold'
        // //   item.so_status === 'Delivered' ||
        // //   item.so_status === 'Received' ||
        // //   item.so_status === 'Shipped'
        // );
        // Return true if both search query and status match
        // return matchesSearch && matchesStatus;
        return matchesSearch;
      })
    },

    paginatedItems() {
      const startIndex = (this.page - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.filteredSalesHistory.slice(startIndex, endIndex)
    },
    showNoSalesAlert() {
      // Check if any items have 'Acknowledged' or 'On Hold' status
      return !this.saleshistory.some(item => item.so_status === 'Acknowledged' || item.so_status === 'On Hold')
    },
  },
  mounted() {
    this.Soid = this.$route.query.so_id;
      this.cityID  = localStorage.getItem("city_id");
        //  const storedSoData = localStorage.getItem("deliverydetails");
            // if (storedSoData) {
            // try {
            //     this.Deliveryperson = JSON.parse(storedSoData);
            //    this.deliverydata =  this.Deliveryperson.map(a => ({
            //         value: a.delivery_person,
            //         text: a.name
            //     }))
            //     console.log('set',  this.deliverydata );
            //     if (!Array.isArray(this.Deliveryperson)) {
            //     this.Deliveryperson = [];
            //     }
            // } catch (e) {
            //     console.error('Error parsing sodetails from localStorage:', e);
            //     this.Deliveryperson = [];
            // }
            // }
      // this.deliverydata = this.Deliveryperson.map(deliveryPerson => ({
      //     value: deliveryPerson.delivery_person,
      //     text: deliveryPerson.name,
      //   }))
    this.handleBrandSelection();
 
    // this.fetchOutputSalesOrders();
    // this.fetchOutputSalesOrders();
    // console.log('Received po_id:', this.Soid);
    // this.getOutputstockdetails();
    // setTimeout(() => {
    //   this.loading = false; // Set loading to false when the operation is complete
    //   // console.log('deliveryPersons:', this.deliveryPersons);
    // }, 4500);
    // this.getSalesorderdetails();
    // this.getSalesorderdetails()
    //   .then(() => {
    //     // Set loading to false when API call is successful
    //     this.loading = false
    //   })
    //   .catch(error => {
    //     // Handle any errors if the API call fails
    //     console.error('Error fetching merchants:', error)
    //     // You might want to set loading to false here as well
    //     // Depending on how you want to handle API errors
    //   })
    //     setTimeout(() => {
    //   this.loading = false; // Set loading to false when the operation is complete
    // }, 4500);
  },
   created() {
    // console.log('test it created');
    this.fetchOutputSalesOrders().then(()=>{
      this.loading=false
    }).catch(error=>{
      console.error('Error fetching merchants:', error)
    })
  },
  methods: {
    locationdetails(){
      const city_id  = localStorage.getItem("city_id");
      const location_id = this.locationdata; 
        this.loading = true;
      return new Promise((resolve, reject) => {
      this.$store.dispatch('getOutputSaleOrdersdata2',{city_id, location_id})
        .then((response) => {
          console.log('check locationdata', response);
          if(response.status == 1){
            this.filteredsalesdata = response.data;
            this.filteredsalesdata.reverse();
            this.loading = false;
            resolve(response); 
          }else{
             this.filteredsalesdata = [];
            this.loading = false;

          }         
        })
        .catch(error => {
          console.error('Error fetching output sales orders:', error);
          this.loading = false; // Set loading to false on error
          reject(error); // Reject the promise with error
        });
    });
    },
     handleBrandSelection(){
        // console.log('check hjandle',id);
        this.getCitylocation(this.cityID ).then((response)=>{
          // console.log('check the response',response);
          this.cityLoaction = response.data.data.map(sales => ({
                  value: sales.location_id,
                  text: sales.location
              }))
                console.log('ceck tye res',this.cityLoaction);
        })
      },

   fetchOutputSalesOrders() { 
    // this.loading = true; // Set loading to true before API call
      const city_id  = localStorage.getItem("city_id");
      const location_id =  localStorage.getItem("location_id"); 
  // if(city_id != null && location_id != null){
     return new Promise((resolve, reject) => {
      if(city_id != '' && location_id !== ''){
        this.loading = true;
      this.filterlocation = false;
      this.$store.dispatch('getOutputSaleOrdersdata2',{city_id,location_id})
        .then((response) => {
          console.log('check details', response);
          this.filteredsalesdata = response.data;
          this.filteredsalesdata.reverse();
          this.loading = false; // Set loading to false after API call
          resolve(response); // Resolve the promise with response
        })
        .catch(error => {
          console.error('Error fetching output sales orders:', error);
          this.loading = false; // Set loading to false on error
          reject(error); // Reject the promise with error
        });
      }
    });
  // }else{
  //    return new Promise((resolve, reject) => {
  //     this.$store.dispatch('getOutputSaleOrdersdata2',{city_id, location_id})
  //       .then((response) => {
  //         console.log('check details', response);
  //         this.filteredsalesdata = response.data;
  //           this.filteredsalesdata.reverse();
  //         this.loading = false; // Set loading to false after API call
  //         resolve(response); // Resolve the promise with response
  //       })
  //       .catch(error => {
  //         console.error('Error fetching output sales orders:', error);
  //         this.loading = false; // Set loading to false on error
  //         reject(error); // Reject the promise with error
  //       });
  //   });
  // }
   
   },
    validateForm() {
      this.$refs.purchaseOrderForm.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
          this.saveOutputstock()
        } else {
          this.snackbar = true
          this.snackbarText = 'Please give all mandatory fields'
          this.color = 'on-background'
        }
      })
    },
    preventPaste(event) {
      const clipboardData = event.clipboardData || window.clipboardData
      const pastedData = clipboardData.getData('text')

      // Validate pasted data (you can modify this regex as needed)
      const isValid = /^[0-9]+$/.test(pastedData)

      if (!isValid) {
        event.preventDefault()
      }
    },

    preventDecimal(event) {
      if (
        event.key === '.' ||
        event.key === ',' ||
        event.key === '+' ||
        event.key === '-' ||
        event.keyCode === 189 ||
        event.keyCode === 109
      ) {
        event.preventDefault()
      }
    },

    saveOutputstock() {
      const statusMapping = {
        Draft: 1,
        Created: 2,
        Acknowledged: 3,
        Shipped: 4,
        Delivered: 5,
      }
      // this.outputStockproducts.filter(product => product.shipped_ordered > 0 || product.shipped_exchange > 0)
      const postData = {
        so_id: this.OutputStockDetails.so_id,
        so_number: this.outputStock.so_number,
        so_status: statusMapping[this.outputStock.so_status],
        merchant_id: this.OutputStockDetails.merchant_id,
        merchant_code: this.OutputStockDetails.merchant_code,
        merchant_name: this.outputStock.merchant_name,
        total_cgst: this.OutputStockDetails.total_cgst,
        total_sgst: this.OutputStockDetails.total_sgst,
        sub_total: this.OutputStockDetails.sub_total,
        total_margin: this.OutputStockDetails.total_margin,
        total_so_amount: this.OutputStockDetails.total_so_amount,
        total_quantity: this.OutputStockDetails.total_quantity,
        created_date: this.OutputStockDetails.created_date,
        shipped_date: this.outputStock.shipped_date,
        is_empty: this.outputStock.is_empty,
        po_number: this.outputStock.po_number,
        total_shipped_ordered: `${this.totalshippedorder}`,
        total_shipped_exchanged: `${this.totalshippedexchange}`,
        products: this.Salesorderdetails.map((product, index) => ({
          merchant_product_id: product.merchant_product_id,
          sku_name: product.sku_name,
          hsn_code: product.hsn_code,
          mrp: product.mrp,
          margin: product.margin,
          margin_percentage: product.margin_percentage,
          // "ordered_quantity":  product.ordered_quantity,
          // "warehouse_quantity":  product.warehouse_quantity,
          brand_name: product.brand_name,
          quantity: product.quantity,
          uom: product.uom,
          price_per_unit: product.price_per_unit,
          taxable_amount: product.taxable_amount,
          cgst: product.cgst,
          sgst: product.sgst,
          amount: product.amount,
          sgst_percentage: product.sgst_percentage,
          cgst_percentage: product.cgst_percentage,
          exchange: product.exchange,
          return: product.return,
          rtv_reason: product.rtv_reason,
          shipped_ordered: `${product.shipped_ordered}`,
          shipped_exchange: `${product.shipped_exchange}`,
        })),
        delivery_person: this.selectedDeliveryPerson,
      }
      console.log('check the post data',postData);
      const validationErrors = this.Salesorderdetails.map(product => {
        console.log(
          'Shipped quan',
          product.shipped_ordered,
          ' Ordered Quan',
          product.quantity,
          ' Warehouse Quan',
          product.warehouse_quantity,
        )

        return (
          this.isQuantityExceeded(product.shipped_ordered, product.quantity, product.warehouse_quantity) ||
          this.isQuantityExceeded2(product.shipped_exchange, product.exchange, product.warehouse_quantity)
        )
      })

      //  const validationErrors = this.outputStockproducts.map(product => {
      //  console.log('sit', this.isQuantityExceeded(product.shipped_ordered, product.ordered_quantity, product.warehouse_quantity));
      //   console.log('Shipped quan',product.shipped_ordered, ' Ordered Quan',product.ordered_quantity,' Warehouse Quan', product.warehouse_quantity);
      //   return (
      //     this.isQuantityExceeded(product.shipped_ordered, product.ordered_quantity, product.warehouse_quantity)
      //     // this.isQuantityExceeded2(product.shipped_exchange, product.exchange)
      //   );
      // });
      // console.log('check', validationErrors.length)
      // console.log('Validation Error Length:', validationErrors.filter(error => error).length)
      console.log(
        'Validation Error :',
        validationErrors.filter(error => error),
      )
      if (validationErrors.filter(error => error).length === 0) {
        this.loading = true;
        // this.isProgress = true
        this.savingOutputStock = true;
         this.dialog = false;
        this.postOutputstock(postData).then(response => {
           
          //  console.log('check the response',response);
          // console.log('check the response',response.status);
          if (response.status == 1) {
            this.savingOutputStock = false;
            this.snackbar = true
            this.color = 'primary'
            this.formData = {}
            // this.isProgress = false
            this.snackbarText = response.message
            this.selectedDeliveryPerson = null
            this.loading = false;
            this.Salesorderdetails = []
      //       console.log('text',this.outputSalesOrders.data);
      //        const indexToRemove = this.outputSalesOrders.data.findIndex(order => order.so_status === "Acknowledged");
      // if (indexToRemove !== -1) {
      //   this.outputSalesOrders.data.splice(indexToRemove, 1); // Remove the object at index
      // }
      // console.log('tedrs',indexToRemove)
            // this.outputStock={};
            this.fetchOutputSalesOrders().then(()=>{
              this.loading=false
            }).catch(error=>{
              console.error('Error fetching merchants:', error)
            })
            this.locationdetails();
            //          setTimeout(() => {
            //             this.$router.push({
            //           name: 'Viewsaleshistory'
            //         });
            // }, 1500);
            //  this.$router.push({
            //   name: 'Viewsaleshistory'
            // });
            // this.getInputstockdetails();
          } else {
             this.savingOutputStock = false;
            this.snackbar = true
            this.color = 'on-background'
            this.snackbarText = 'Please give proper data'
          }
        })
      }else {
         this.savingOutputStock = false;
        this.snackbar = true
        this.color = 'on-background'
        this.snackbarText = 'your quantities are exceeded'
      }
    },
    getFormattedDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },

    //   getOutputstockdetails() {
    //     this.getOutputstock(this.Soid).then(response => {
    //       // console.log('dates',response);
    //     this.OutputStockDetails = response.data
    //     //  console.log('check output dtock', this.OutputStockDetails);

    //     this.outputStock.so_number = this.OutputStockDetails.so_number;
    //     this.outputStock.merchant_name = this.OutputStockDetails.merchant_name;
    //     this.outputStock.so_status = 'Shipped';
    //     this.outputStockproducts = this.OutputStockDetails.products;
    //     console.log('check ',this.outputStockproducts);
    //     this.deliveryUserDetails = response.delivery_user_details;
    //     // console.log('delivery detials',this.deliveryUserDetails);

    //      this.deliveryPersons = this.deliveryUserDetails.map(deliveryPerson => ({
    //         value: deliveryPerson.delivery_person,
    //         text: deliveryPerson.name
    //     }));

    // })
    // },

    resolveStatusVariant2(itm) {
      // console.log('check quan',itm.warehouse_quantity > itm.ordered_quantity)
      if (itm.warehouse_quantity >= itm.quantity)
        return {
          color: 'success',
          // text: 'Created',
        }
      else
        return {
          color: 'success',
          // text: 'Shared',
        }
    },
    deleteRow(item) {
      // Implement your logic to delete the row
      const index = this.desserts.indexOf(item)
      if (index !== -1) {
        this.desserts.splice(index, 1)
      }
    },

    openproductdialog() {
      // console.log('check the dialog')
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },

    isQuantityExceeded(sq, oq, wq) {
      const minQuantity = Math.min(oq, wq)
      if (sq > minQuantity && sq !== 0) {
        // Check if shipped quantity exceeds minQuantity and is not zero
        this.snackbar = true
        this.color = 'on-background'
        this.snackbarText = 'Shipped quantity cannot exceed ordered or warehouse quantity'
        return true // Return true if validation fails
      }
      return false // Return false if validation passes
    },
    isQuantityExceeded2(seq, eq, wq) {
      const minQuantity = Math.min( eq, wq)

      if (seq !== '0' && seq > minQuantity) {
        this.snackbar = true;
        this.color = 'on-background'
        this.snackbarText = 'Shipped Exchange cannot exceed Availble quantity.'
        return true
      }
      return false
    },
    updatePagination(page) {
      this.page = page
    },
    getPDFupdate(id) {
      this.loading2 = true
      window.open(id, '_blank')
      this.loading2 = false
    },
    closedialog() {
      this.dialog = false
      this.deliveryPersons = [];
      this.Salesorderdetails = [];
      this.outputStock = {};
    },
    outputstocks(item) {
      // console.log('check the detials', item)
      this.dialog = true
      this.outputStock.so_number = item.so_number
      this.outputStock.is_empty = item.is_empty
      this.outputStock.merchant_name = item.merchant_name
      this.outputStock.so_status = 'Shipped'
      // this.outputStockproducts = item.products
      // console.log('check ', this.outputStockproducts)
      //  this.$router.push({
      //   name: 'Createwarehouseoutput', // Replace with the actual name of your route
      //   query: { so_id: item.so_id }
      // });
      this.loading3 = true;
      this.getOutputstock(item.so_id,this.cityID).then(response => {
        // console.log('dates',response);
        this.loading3 = false;

        this.OutputStockDetails = response.data;
        this.outputStock.po_number = response.data.po_number;

        //  console.log('check output dtock', this.OutputStockDetails);
        this.Salesorderdetails = response.data.products;
        this.deliveryUserDetails = response.delivery_user_details;
        // console.log('delivery detials',this.deliveryUserDetails);

        this.deliveryPersons = this.deliveryUserDetails.map(deliveryPerson => ({
          value: deliveryPerson.delivery_person,
          text: deliveryPerson.name,
        }))
      })
    },
    resolveStatusVariant(status) {
      if (status == 'Acknowledged')
        return {
          color: 'warning',
          // text: 'Acknowledged',
        }
      else
        return {
          color: 'error',
          // text: 'Shared',
        }
    },
    // getSalesorderdetails() {
    //   return new Promise((resolve, reject) => {
    //     this.getOutputSalesorders()
    //       .then(response => {
    //                 // console.log('check sales res', response);
    //         // this.salesdata = response;
    //         //   console.log('check sales res', this.salesdata.status ,this.saleshistory);
    //         this.saleshistory = response.data || [];
      

    //         this.saleshistory.reverse()

    //         resolve() // Resolve the promise when API call is successful
    //       })
    //       .catch(error => {
    //         console.error('Error fetching merchants:', error)
    //         reject(error) // Reject the promise if there's an error
    //       })
    //   })
    // },
  },
}
</script>

<style scoped>
.loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure it's on top of everything */
}

.loader {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
