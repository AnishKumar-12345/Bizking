<template>
  <div>

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
    <!-- <VRow v-if="this.filteredPurchaseHistory == null">
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
     </VRow> -->

    <VTable
      :headers="headers"
      :items="this.paginatedItems"
      item-key="dessert"
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
        <tr v-if="filteredStocks.length === 0">
          <td
            colspan="16"
            class="text-center"
          >
            <h1>No data found !</h1>
          </td>
        </tr>

        <tr
          v-for="(item, index) in this.paginatedItems"
          :key="index"
        >
          <td class="text-center">{{ item.brand_name }}</td>
          <td class="text-center">
            {{ item.sku_name }}
          </td>
          <!-- <td class="text-center">
           <VChip
        :color="resolveStatusVariant(item.po_status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ item.po_status }}
       
            </VChip>
        </td> -->
          <td class="text-center">
            {{ item.uom }}
          </td>
          <td class="text-center">
            {{ item.hsn_code }}
          </td>
          <td class="text-center">
            <VChip
              :color="colorQuantity(item.available_qty).color"
              class="font-weight-medium"
              size="small"
            >
              {{ item.available_qty >= 0 ? item.available_qty : 0 }}
            </VChip>
          </td>
           <td class="text-center">
             <VChip
              color="error"
              class="font-weight-medium"
              size="small"
            >
            {{ item.bad_quantity }}
             </VChip>
          </td>
          <td class="text-center">
            {{ item.stock_updated_date }}
          </td>
          <!-- <td  class="text-center " v-if="item.po_status != 'Received'">
   
            <VBtn
                icon
                variant="text"
                color="success"
                class="me-2"
                size="small"                
            >
          
              <VIcon
              icon="mdi-invoice-receive-outline"
              color="success"
              size="30"
              @click="inputstock(item)"
              />
            </VBtn>
             
          </td> -->
        </tr>
      </tbody>
    </VTable>
    <VPagination
      v-model="page"
      :length="Math.ceil(filteredStocks.length / pageSize)"
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
      filterlocation:true,
      locationdata:'',
      cityLoaction:[],
      searchQuery: '',
      page: 1,
      pageSize: 10,
      loading: false,
      Allstocks: [],
      cityID:'',
      locationID:'',
      headers: [
        { text: 'Brand Name', value: 'brand_name' },
        { text: 'SKU Name', value: 'sku_name' },
        { text: 'UOM', value: 'uom' },
        { text: 'HSN Code', value: 'hsn_code' },
        { text: 'Available Quantity', value: 'available_qty' },
        { text: 'Bad Quantity', value: 'bad_quantity' },

        // { text: 'Price/Unit', value: 'price_per_unit' },
        // { text: 'TaxableAmount', value: 'taxable_amount' },
        // { text: 'CGST', value: 'csgt' },
        // { text: 'SGST', value: 'sgst' },
        { text: 'Stock Updated Date', value: 'stock_updated_date' },
      ],
    }
  },
  computed: {
    filteredStocks() {
      const lowerCaseQuery = this.searchQuery.toLowerCase().trim()
      return this.Allstocks.filter(item => {
        return (
          (item.brand_name && item.brand_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.sku_name && item.sku_name.toLowerCase().includes(lowerCaseQuery)) ||
          (item.uom && item.uom.toLowerCase().includes(lowerCaseQuery)) ||
          (item.hsn_code && item.hsn_code.toString().includes(lowerCaseQuery)) ||
          (item.available_qty && item.available_qty.toString().includes(lowerCaseQuery)) ||
          (item.stock_updated_date && item.stock_updated_date.toLowerCase().includes(lowerCaseQuery))
        )
      })
    },
    paginatedItems() {
      const startIndex = (this.page - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.filteredStocks.slice(startIndex, endIndex)
    },
  },
  mounted() {
    this.cityID  = localStorage.getItem("city_id");
    this.locationID =  localStorage.getItem("location_id"); 
    this.handleBrandSelection();
    console.log('view stock view');
    this.getstocksdetails().then(() => { 
        this.loading = false;
    }).catch(error => {
        console.error('Error fetching merchants:', error);
    });

  },

  methods: {
      handleBrandSelection(){
        // console.log('check hjandle',id);
        this.getCitylocation(this.cityID).then((response)=>{
          // console.log('check the response',response);
        this.cityLoaction = response.data.data.map(sales => ({
                  value: sales.location_id,
                  text: sales.location
              }))
              // console.log('ceck tye res',this.cityLoaction);
            })
       },
      locationdetails(){
        this.loading = true;
         this.getAllstocks(this.cityID, this.locationdata)
          .then(response => {
            console.log('check the get res',response);
            if(response.data.status == 1){
                 this.Allstocks = response.data.data
            this.Allstocks.reverse();
            this.loading = false;

            }else{
            this.loading = false;

            }
         
            
          })
      },
    updatePagination(page) {
      this.page = page
    },

    //   inputstock(itm){
    //     console.log('check the detials',itm.po_id);
    //      this.$router.push({
    //       name: 'Createwarehouseinput', // Replace with the actual name of your route
    //       query: { po_id: itm.po_id }
    //     });

    //   },
    getstocksdetails() {
      // this.getAllstocks().then((response) =>{
      //   // console.log('check the view stocks',response.data.data);
      //   this.Allstocks = response.data.data;
      //   console.log('check the view ALl History',this.Allstocks);
      //   // this.Allstocks.reverse();
      // })
      return new Promise((resolve, reject) => {
         if( this.cityID != '' &&  this.locationID !== ''){
        this.loading = true;
      this.filterlocation = false;

            this.getAllstocks(this.cityID, this.locationID)
          .then(response => {
            this.Allstocks = response.data.data
            this.Allstocks.reverse()
            resolve() // Resolve the promise when API call is successful
          })
          .catch(error => {
            console.error('Error fetching merchants:', error)
            reject(error) // Reject the promise if there's an error
          })
         }      
      })
    },
    colorQuantity(itm) {
      if (itm >= 10)
        return {
          color: 'success',
          // text: 'Acknowledged',
        }
      else
        return {
          color: 'error',
          // text: 'Shared',
        }
    },
    // colorbadQuantity(){
    //    if (itm = 10)
    //     return {
    //       color: 'success',
    //       // text: 'Acknowledged',
    //     }
    //   else
    //     return {
    //       color: 'error',
    //       // text: 'Shared',
    //     }
    // }
  },
}
</script>

<style scoped>
</style>

