<template>
    <div>
         <div v-if="loading"  class="loading-container">
      <VProgressLinear
            height="5"
            color="primary"
            indeterminate
            class="custom-loader"  
            full-width              
        />          
     </div>

         <VRow>
      <VCol cols="12">
       <VCard title="Purchase Order" class="mb-4">       
 
       
        <VCardText>
          
          <!-- 👉 Form -->
          <VForm class="mt-6" ref="purchaseOrderForm">
           
            <VRow>
    
              <VCol
                md="6"
                cols="12"
              >
              <!-- {{selectedPurchaseOrder}} -->
                <VAutocomplete
                  v-model="selectedPurchaseOrder"
                  label="Brand or Manufacturer"
                  :items="brandNames"               
                  :rules="BrandRules"
                      :menu-props="{ maxHeight: 200 }"
                  @update:model-value="handleBrandSelection"
                />
              </VCol>


            
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="createdBy"
                  label="Created By"
                  readonly
                />
              </VCol>
      
              <VCol
                cols="12"
                md="6"
              >
              <!-- {{formData.created_date}} -->
                <VTextField
                  v-model="formData.created_date"
                  type="date"
                  label="Order Date"
                  :min="today"
                  :rules="dateRules"
                  readonly
                />
              </VCol>
            
            <VCol
                md="6"
                cols="12"
              >
              <!-- {{formData.po_status}}  -->
                <VSelect
                  v-model="formData.po_status"
                  label="PO Status"
                  :items="['Draft','Created','Shared','Acknowledged']"
                  :rules="Statusrules"           
                />
              </VCol>

               <VCol
                md="6"
                cols="12"
              >
              <!-- {{formData.po_status}}  -->
                 <VTextField
                  v-model="formData.delivery_date"
                  type="date"
                  label="Delivery Date"
                  :min="today"
                  :rules="dateRules"
                 
                />
               </VCol>
              <VDivider />
                  <!-- <V-btn
                  icon
                  variant="text"
                  color="default"
                  class="mb-1 mt-2"
                  size="small"
                  style="margin-left: auto; display: block;"
                  @click="openproductdialog()"
                  >
                  
                      <VIcon
                        icon="mdi-plus-box"
                        size="30"        
                        color="#BA8B32"       
                        />   
                      </V-btn> -->
              <VCol cols="12">
                 <div style="max-width:400px" >
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
                <!-- {{AllBrandproducts}} -->
      <VTable
       :headers="headers"
       :items="filteredBrandProducts"
        
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
       <tr
        v-for="(item,index) in filteredPurchaseOrder"
        :key="index"    
        
      >
  
        <!-- <td class="text-center">{{ item.po }}</td> -->
        <td class="text-center">
          {{ item.sku_name }}
        </td>
         <td class="text-center">
          {{ item.uom }}
        </td>
        <td class="text-center">
          {{ item.hsn_code }}
        </td>
        <td class="text-center">
          &#8377;{{ item.mrp }} 
        </td>
          <!-- <td class="text-center">
          &#8377;{{ TaxDeductMRP[index] }}
        </td> -->
        <td class="text-center">
          <VTextField  @keydown="preventDecimal" @paste="preventPaste"   
          v-model="item.quantity" type="number" min="0" style="min-width:80px;"     
         
          />
          
          <!-- {{ item.Quantity }} -->
        </td>
        
       
        <td class="text-center">
         &#8377; {{calculatedPricePerUnit[index]}} <br>

      <VChip
        :color="colorTGMmargin(item.total_given_margin).color"
        class="font-weight-medium"
        size="small"
      >
        ({{ item.total_given_margin }})
      
            </VChip>
        </td>
        <td class="text-center">
          &#8377;{{ calculatedTaxableAmount[index]}}
        </td>
       
        <td class="text-center">
          &#8377;{{ calculatedCGSTAmount[index]}} <br/> 
          <!-- {{ item.cgst }} -->         
        <VChip
        :color="colorCGSTmargin(item.cgst).color"
        class="font-weight-medium"
        size="small"
      >
        ({{ item.cgst }})
          <!-- {{ item.fat }} -->
            </VChip>
        </td>
         <!-- <td class="text-center">
          {{TaxfromSgst[index]}}
        </td>
        <td class="text-center">
          {{TaxfromCgst[index]}}
        </td> -->
        <td class="text-center">
           &#8377;{{ calculatedSGSTAmount[index]}} <br/> 
          <!-- {{ item.sgst }} -->
           <VChip
        :color="colorSGSTmargin(item.sgst).color"
        class="font-weight-medium"
        size="small"
      >
        ({{ item.sgst }})
          <!-- {{ item.fat }} -->
            </VChip>
        </td>
        <td class="text-center">
          &#8377;{{ calculateTotalamount[index] }}
          
        </td>      
          <td >
                <VBtn
                icon
                variant="text"
                color="error"
                class="me-2"
                size="small"
                @click="deleteRow(item)"
            >
                <VIcon
                icon="mdi-minus-circle-outline"
                size="24"
                />
            </VBtn>
            
          </td>
       <!-- <td>{{calculateMargin[index]}}</td> -->
      </tr>
      </tbody>
      <tfoot>
          <tr>
            <td class="text-center">Total</td>
            <td></td>
            <td></td>    
            <td></td>
            <td class="text-center"> {{ allQuantity }}</td>
            <td></td>    
            <!-- <td></td>          -->
            <td class="text-center"> &#8377;{{ allTaxableAmmount }}</td>
            <td class="text-center"> &#8377;{{ allCGSTAmount }}</td>
            <td class="text-center"> &#8377;{{ allSGSTAmount }}</td>
            <td class="text-center"> &#8377;{{ allAmmount }}</td>   
            <td></td> 
          </tr>
         <tr>
          <!-- Left Side: CGST -->
          <td class="text-left" style="font-weight:Bold">Tax Details:</td>
          <td colspan="4" class="text-right"></td>
          
          <!-- Right Side: Subtotal -->
          <td colspan="4" class="text-left" style="font-weight:Bold">Amounts:</td> <!-- Empty cells for merging -->
          <td colspan="4" class="text-center"></td>
        </tr>

         <tr>
          <!-- Left Side: CGST -->
          <td class="text-left">CGST</td>
          <td colspan="4" class="text-right">&#8377;{{ allCGSTAmount }}</td>
          
          <!-- Right Side: Subtotal -->
          <td colspan="4" class="text-left">SubTotal</td> <!-- Empty cells for merging -->
          <td colspan="4" class="text-center">&#8377;{{ allAmmount }}</td>
        </tr>

         <tr>
          <!-- Left Side: CGST -->
          <td class="text-left">SGST</td>
          <td colspan="4" class="text-right">&#8377;{{ allSGSTAmount }}</td>
          
          <!-- Right Side: Subtotal -->
          <td colspan="4" class="text-left">Total</td> <!-- Empty cells for merging -->
          <td colspan="4" class="text-center">&#8377;{{ allAmmount }}</td>
        </tr>

         <tr>
          <!-- Left Side: CGST -->
          <td class="text-left"></td>
          <td  colspan="4" class="text-right"></td>
          
          <!-- Right Side: Subtotal -->
          <td colspan="4" class="text-left">Advance</td> <!-- Empty cells for merging -->
          <td colspan="4" class="text-center">&#8377;{{ totals.Quantity }}</td>
        </tr>

         <tr>
          <!-- Left Side: CGST -->
          <td class="text-left"></td>
          <td colspan="4" class="text-right"></td>
          
          <!-- Right Side: Subtotal -->
          <td  colspan="4" class="text-left">Balance</td> <!-- Empty cells for merging -->
          <td colspan="4" class="text-center">&#8377;{{ allAmmount }}</td>
        </tr>

        <tr>
          <!-- Left Side: CGST -->
          <td class="text-left"></td>
          <td colspan="4" class="text-right"></td>
          
          <!-- Right Side: Subtotal -->
          <td colspan="4" class="text-left">You Saved</td> <!-- Empty cells for merging -->
          <td colspan="4" class="text-center">&#8377;{{ savedamount }}</td>
        </tr>
     </tfoot>        
        </VTable>
              </VCol>

              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="validateForm">Save</VBtn>
  <!-- @click="resetdetails" -->
                <VBtn
                  color="secondary"
                  variant="tonal"
                  @click="resetdetails()"
                
                >
                  Reset
                </VBtn>
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

 <VDialog v-model="dialog" max-width="600">
      <VCard title="Add Your Product">
        <VCardText>
          <!-- Dialog content -->
          <!-- <p>Add Your Product</p> -->
          <!-- Include your existing code inside the dialog -->
          <VForm class="mt-6 ">
            <VRow>
    
              <VCol
                md="6"
                cols="12"
              >
                <VSelect
                 
                  label="Products"
                  :items="['Normal Eggs','Premium Eggs','Poori','Methi Chapathi','Ragi Chapathi']"
                />
              </VCol>


            
            
              
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn>Add</VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  @click="closeDialog"
                >
                  Close
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
        <VCardActions>        
        </VCardActions>
      </VCard>
    </VDialog>

    </div>
</template>
<script>

import servicescall from "@/Services";

export default {
  mixins: [servicescall],
  components:{

  },
   data(){
    return{
          loading:true,
          searchQuery:'',

      BrandRules: [
         (v) => !!v || 'Brand is required',
      ],
      dateRules: [
         (v) => !!v || 'Date is required',
      ],
      Statusrules: [
          (v) => !!v || 'Status Is Required',
      ],
      quantityrules: [
          (v) => !!v || 'Quantity Is Required',

      ],
      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,

      formData: {
            brand_id: "",
            user_id: "",
            created_date: this.getFormattedDate(new Date()),
            delivery_date: "",
            po_status: "",
            total_cgst: "",
            total_sgst: "",
            you_saved: "",
            total_quantity: "",
            'sub_total(taxable_amount_total)': "", // Rename the property as per your API
            total_so_amount: "",
            products: [
                {
                    brand_product_id: "",
                    sku_name: "",
                    hsn_code: "",
                    mrp: "",
                    quantity: "",
                    uom: "",
                    price_per_unit: "",
                    taxable_amount: "",
                    cgst: "",
                    sgst: "",
                    amount: "",
                    total_give_margin: "",
                    sgst_percentage: "",
                    cgst_percentage: "",
                    margin_amount: "",

                },
                // ... additional products
            ]
        },
      quantityInput:0,
      AllBrandproducts:[],
      createdBy:'',
      userIds:'',
      Brandname:[],
      totals: {
          Quantity: 0,
          TaxableAmmount: 0,
          CGST: 0,
          SGST: 0,
          Ammount: 0,
        },

       today: this.getFormattedDate(new Date()),
      // selectedDate: new Date().toISOString().substr(0, 10),
      landscape: false,
      noTitle: false,
        selectedPurchaseOrder: null,
        dialog: false,

           
      headers: [
        // { text: 'Purchase Order', value: 'po' },
        { text: 'Product Name', value: 'sku_name' },
          { text: 'UOM', value: 'uom' },
        { text: 'HSN', value: 'hsn_code' },
        { text: 'MRP', value: 'mrp' },
        // { text: 'MRPD', value: 'TaxDeductMRP' },

        { text: 'Quantity', value: 'quantity'},
      
        { text: 'Price/Unit', value: 'calculatedPricePerUnit' },        
        { text: 'TaxableAmount', value: 'calculatedTaxableAmount' },   
        { text: 'CGST', value: 'calculatedCGSTAmount' },  
        // { text: 'CGST Tax', value: 'TaxfromCgst' },  
        // { text: 'SGST Tax', value: 'TaxfromSgst' }, 

        { text: 'SGST', value: 'calculatedSGSTAmount' },  
        { text: 'Amount', value: 'calculateTotalamount' }, 
        { text: 'Actions', value: 'action' }, 


      ],

    }
   },
  
     computed: {  
     

      filteredBrandProducts() {
      // Filter out items with undefined quantity
       return this.AllBrandproducts.filter(item => item.quantity !== undefined);
      },   

      filteredPurchaseOrder() {
      const lowerCaseQuery = this.searchQuery.toLowerCase().trim();
      console.log('log in',lowerCaseQuery)
    return this.filteredBrandProducts.filter((item) => {
    return (
      (item.sku_name && item.sku_name.toLowerCase().includes(lowerCaseQuery)) ||
      (item.hsn_code && item.hsn_code.toLowerCase().includes(lowerCaseQuery)) ||
      (item.mrp && item.mrp.toString().toLowerCase().includes(lowerCaseQuery)) ||
      (item.quantity && item.quantity.toString().toLowerCase().includes(lowerCaseQuery)) ||
      (item.uom && item.uom.toLowerCase().includes(lowerCaseQuery)) ||
      (item.total_given_margin && item.total_given_margin.toString().toLowerCase().includes(lowerCaseQuery)) ||
      (item.cgst && item.cgst.toString().toLowerCase().includes(lowerCaseQuery)) ||
      (item.sgst && item.sgst.toString().toLowerCase().includes(lowerCaseQuery))
    );
  });
},

     totalIndividualAmount() {
  return this.AllBrandproducts.reduce((total, item) => {
    const MRPP = parseFloat(item.mrp);
    const quant = parseFloat(item.quantity);

    // Check if MRPP and quant are valid numbers
    if (!isNaN(MRPP) && !isNaN(quant)) {
      const individualAmount = MRPP * quant;
      return total + individualAmount;
    }

    return total;
  }, 0);
},
      savedamount() {
  // Parse the quantity and calculate total savings dynamically
  const quantity = parseFloat(this.allAmmount);
  const totalSavings = this.totalIndividualAmount - (isNaN(quantity) ? 0 : quantity);

  // Return Math.max(0, totalSavings) formatted to 2 decimal places
  return Math.max(0, totalSavings).toFixed(2);
},

      allAmmount(){
         const AllAmount = this.calculateTotalamount.reduce((tot, amo) => tot + parseFloat(amo), 0);
        return parseFloat(AllAmount.toFixed(2));
      },
       allSGSTAmount(){
        const totalSGSTAmount = this.calculatedSGSTAmount.reduce((to, am) => to + parseFloat(am), 0);
        return parseFloat(totalSGSTAmount.toFixed(2));

      },
      allCGSTAmount(){
        const totalCGSTAmount =  this.calculatedCGSTAmount.reduce((t, a) => t + parseFloat(a), 0);
        return parseFloat(totalCGSTAmount.toFixed(2));
      },
      allTaxableAmmount(){
      const allTaxAmount = this.calculatedTaxableAmount.reduce((total, amount) => total + parseFloat(amount) , 0);
        return parseFloat(allTaxAmount.toFixed(2));
        
      },
     allQuantity() {
      // Calculate the total quantity dynamically
    const AllBproducts = this.AllBrandproducts.reduce((total, item) => {
    const quantity = parseFloat(item.quantity);

    // Check if quantity is a valid number
    if (!isNaN(quantity)) {
      return total + quantity;
    }

    return total;
  }, 0);

     return isNaN(AllBproducts) ? 0 : AllBproducts.toFixed(0);
    },
      calculateTotalamount(){
         return this.AllBrandproducts.map((item,index) => {
            const taxableammounts = parseFloat(this.calculatedTaxableAmount[index]);
            const cgstamount = parseFloat(this.calculatedCGSTAmount[index]);
            const sgstamount = parseFloat(this.calculatedSGSTAmount[index]);
            const tamount = taxableammounts+cgstamount+sgstamount;
             return isNaN(tamount) ? 0 : tamount.toFixed(2);
         })
      },
      calculatedSGSTAmount(){
         return this.AllBrandproducts.map((item,index) => {
            const taxamount = parseFloat(this.calculatedTaxableAmount[index]);
            const SGST = parseFloat(item.sgst.replace('%', ''));
            const sgstdata = taxamount*SGST / 100;
             return isNaN(sgstdata) ? 0 : sgstdata.toFixed(2);
         })
      },
      calculatedCGSTAmount(){
         return this.AllBrandproducts.map((item,index) => {
            const taxamount = parseFloat(this.calculatedTaxableAmount[index]);
            const CGST = parseFloat(item.cgst.replace('%', ''));
            const cgstdata = (taxamount*CGST) / 100;
             return isNaN(cgstdata) ? 0 : cgstdata.toFixed(2);
         })
      },
    // TaxfromCgst(){
    //        return this.AllBrandproducts.map(item => {
    //              const MRP =   parseFloat(item.mrp);
    //              const CGST =  parseFloat(item.cgst.replace('%', ''));
    //             //  const SGST =  parseFloat(item.sgst.replace('%', ''));
    //             const Tax1 = MRP-(MRP/(1+(CGST/100)));
    //             return isNaN(Tax1) ? 0 : Tax1.toFixed(2);
    //        })
    // },
    //  TaxfromSgst(){
    //        return this.AllBrandproducts.map(item => {
    //              const MRP =   parseFloat(item.mrp);
    //              const SGST =  parseFloat(item.sgst.replace('%', ''));
    //             //  const SGST =  parseFloat(item.sgst.replace('%', ''));
    //             const Tax2 = MRP-(MRP/(1+(SGST/100)));
    //             return isNaN(Tax2) ? 0 : Tax2.toFixed(2);
    //        })
    // },
calculateMargin(){
   return this.AllBrandproducts.map((item,index) => {
    const mrp = parseFloat(item.mrp);
    const totalGivenMargin = parseFloat(item.total_given_margin.replace('%', ''));

     const margin = mrp * totalGivenMargin/100; 
      // console.log('check the margin',margin)
      return isNaN(margin) ? 0 : margin.toFixed(2);
     
    });
},

calculatedPricePerUnit(){
    return this.AllBrandproducts.map((item,index) => {
      const Mrp = parseFloat(item.mrp);
      // console.log('Dedect MRP',Mrp);
        // const 
      const totalGivenMargin = parseFloat(this.calculateMargin[index]);
      // console.log('Mar',totalGivenMargin);

      const pricePerUnit = Mrp - totalGivenMargin; 
      
      return isNaN(pricePerUnit) ? 0 : pricePerUnit.toFixed(2);
     
    });
},
  //   TaxDeductMRP() {
  //     // const item = this.AllBrandproducts[index];
  //    return this.AllBrandproducts.map((item,index) => {
  //     const mrp = parseFloat(item.mrp);
  //     const TaxCGST =  parseFloat(this.TaxfromCgst[index]);
  //     const TaxSGST =  parseFloat(this.TaxfromSgst[index]);
  //     // console.log('m Total deduct',mrp-(TaxCGST+TaxSGST));
  //     // console.log('mr sgst deduct',TaxSGST);

  //     const tmrp =  mrp-(TaxCGST+TaxSGST);
  //     // console.log('mrp deduct',tmrp);
  //     // const totalGivenMargin = parseFloat(item.total_given_margin.replace('%', ''));
  //     // const quantity = parseFloat(item.quantity);
  //     // Calculate the price per unit using the formula
  //     // const pricePerUnit = tmrp - (tmrp * totalGivenMargin) / 100;

  //     // Round the result to two decimal places
  //     return isNaN(tmrp) ? 0 : tmrp.toFixed(2);
  //     // return pricePerUnit.toFixed(2);
  //     //  const roundedPricePerUnit = pricePerUnit.toFixed(2);
  //     //   this.AllBrandproducts[index] = { ...item, roundedPricePerUnit };
  //       // Vue.set(this.AllBrandproducts, index, { ...item, roundedPricePerUnit });
  //   });
  // },
  calculatedTaxableAmount() {
    return this.AllBrandproducts.map((item, index) => {
    const quantitt = parseFloat(item.quantity);
    // console.log('quanti',quantitt);
    const rawPricePerUnit = this.calculatedPricePerUnit[index];
    const CGST =  parseFloat(item.cgst.replace('%', ''));
    const SGST = parseFloat(item.sgst.replace('%', ''));
    
    const pricePerUnit = parseFloat(rawPricePerUnit);

    // Skip calculation if quantity is 0
    if (quantitt === 0) {
      return 0;
    }

    if (isNaN(quantitt) || isNaN(pricePerUnit)) {
      // console.log(`Invalid quantity or price at index ${index}`);
      return 0; // or any default value
    }

    const taxableAmount = (rawPricePerUnit/(100+(CGST+SGST))*100)*quantitt;
    return isNaN(taxableAmount) ? 0 : taxableAmount.toFixed(2);
  });
  },
      
      brandNames() {
      return this.Brandname.map((brand) => brand.brand_name);
    },
    
    },
    
    mounted(){
      this.getBrandsdata();
      this.createdBy = localStorage.getItem('createdby');
      this.userIds = localStorage.getItem('userId');
     setTimeout(() => {
            //  this.getPurchasehistorydetails();
              this.loading = false; // Set loading to false when the operation is complete
            }, 3000);
    },
    
   methods:{ 
      validateNumericInput(event) {
      // Remove non-numeric characters from the input
      const numericValue = event.target.value.replace(/[^0-9]/g, '');
      this.item.quantity = numericValue;
    },
     getFormattedDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    resetdetails(){    
     this.AllBrandproducts.map((e) => e.quantity = '');    
    },

      validateForm() {      
       this.$refs.purchaseOrderForm.validate().then(valid => {
        // console.log("form valid", valid.valid);
        if (valid.valid == true) {
          // this.saveData();
          if(this.allQuantity >=1){   
             this.saveData();
          }else{
            this.snackbar = true;
            this.snackbarText = "Please give Quantities"
            this.color = "primary";
          }
        }else{
           this.snackbar = true;
            this.snackbarText = "Please give all mandatory fields"
            this.color = "on-background";
        }
      });     
    },

    preventPaste(event){
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedData = clipboardData.getData('text');

      // Validate pasted data (you can modify this regex as needed)
      const isValid = /^[0-9]+$/.test(pastedData);

      if (!isValid) {
        event.preventDefault();
      }
    },

    preventDecimal(event) {     
      if (event.key === '.' || event.key === ',' ||  event.key === '+' ||  event.key === '-' || event.keyCode === 189 || event.keyCode === 109) {
        event.preventDefault();
      }
    },
     saveData(){
        // console.log('check the CGST Amount',this.allCGSTAmount);
        const statusMapping = {
            'Draft': 1,
            'Created': 2,
            'Shared': 3,
            'Acknowledged': 4,
            'Received': 5,
          };
    console.log('check the ammounts',this.AllBrandproducts.map((product,index) => ({
   "taxable_amount":`${this.calculatedTaxableAmount[index]}`,
    "price_per_unit": `${this.calculatedPricePerUnit[index]}`,
     "csgt":`${this.calculatedCGSTAmount[index]}`,
            "sgst":`${this.calculatedSGSTAmount[index]}`,
            "amount":`${this.calculateTotalamount[index]}`,
            "total_give_margin": product.total_given_margin,
    })))

 const filteredProducts = this.AllBrandproducts.filter(product => product.quantity > 0);
 console.log('t',filteredProducts);
        const postData = {
          "brand_id": this.selectedBrandId,
          "user_id": this.userIds,
          "created_date": this.formData.created_date,
          "delivery_date": this.formData.delivery_date,
          "po_status": statusMapping[this.formData.po_status],
          "total_cgst": `${this.allCGSTAmount}`,
          "total_sgst": `${this.allSGSTAmount}`,
          "you_saved": `${this.savedamount}`,
          "sub_total": `${this.allTaxableAmmount}`,
          "total_po_amount": `${this.allAmmount}`,
          "total_quantity": `${this.allQuantity}`,
         "products": filteredProducts.map((product, index) => {
            const calculatedIndex = this.AllBrandproducts.findIndex(p => p === product);
            return {
                "brand_product_id": product.brand_product_id,
                "sku_name": product.sku_name,
                "hsn_code": product.hsn_code,
                "mrp": product.mrp,
                "quantity": `${product.quantity}`,
                "uom": `${product.uom}`,
                "sgst_percentage": product.sgst.includes('%') ? `${product.sgst}` : `${product.sgst}%`,
                "cgst_percentage": product.cgst.includes('%') ? `${product.cgst}` : `${product.cgst}%`,
                "price_per_unit": `${this.calculatedPricePerUnit[calculatedIndex]}`,
                "taxable_amount": `${this.calculatedTaxableAmount[calculatedIndex]}`,
                "csgt": `${this.calculatedCGSTAmount[calculatedIndex]}`,
                "sgst": `${this.calculatedSGSTAmount[calculatedIndex]}`,
                "amount": `${this.calculateTotalamount[calculatedIndex]}`,
                "total_give_margin": product.total_given_margin,
            };
        }),
        };
        console.log('check the post data',postData);
      
          this.postPurchaseorder(postData).then((response) =>{
          console.log('check the response',response);
          // console.log('check the response',response.status);
            if (response.status == 1) {              
               this.snackbar = true;
               this.color = "primary";
               this.formData = {};
               this.snackbarText = response.message;  
               setTimeout(() => {
                window.location.reload(true);
            }, 1300);    
            } else {          
                 this.snackbar = true;
                 this.color = "on-background";
              };
           
        })
 
      
     },
  colorTGMmargin(text){
    if(text){
      return {
          color: 'success',
          // text: 'Shared',
        }
    }else{
      return{
        color: 'error'
      }
    }
   },
    colorSGSTmargin(text){
    if(text){
      return {
          color: 'success',
          // text: 'Shared',
        }
    }else{
      return{
        color: 'error'
      }
    }
   },

   colorCGSTmargin(text){
    if(text){
      return {
          color: 'success',
          // text: 'Shared',
        }
    }else{
      return{
        color: 'error'
      }
    }
   },

    handleBrandSelection() {
      // console.log('Brand changed:', this.selectedPurchaseOrder);
      const selectedBrand = this.Brandname.find(
        (brand) => brand.brand_name === this.selectedPurchaseOrder
      );
        // console.log("Select Brand Details",selectedBrand);

      if (selectedBrand) {
        this.selectedBrandId = selectedBrand.brand_id;
        //  console.log('check the brandId',this.selectedBrandId);
        this.getBrandproducts(this.selectedBrandId).then((response)=>{
                  this.AllBrandproducts = response.data;
                   console.log("BrandID",this.AllBrandproducts);
        })
        // Call your API method to get brand details using this.selectedBrandId
        // this.getBrandDetails();
      }
    },
    getBrandsdata(){
      this.getBrands().then((response)=>{
        
        // this.Brandname = response.data.map(e => e.brand_name)
        this.Brandname = response.data;
        // console.log('check the response', this.Brandname);
      })
    },
    //  addNewRow(item) {
    //   // Create a new row by cloning the existing item
    //   const newRow = { ...item, po: String(this.data.length + 1) };
    //   // Add the new row to the data array
    //   this.data.push(newRow);
    // },
    onDateChange() {
      // console.log('Selected date:', this.selectedDate);
    },
     deleteRow(item) {
    
      const index = this.AllBrandproducts.indexOf(item);
      if (index !== -1) {
        this.AllBrandproducts.splice(index, 1);
      }
    },

      openproductdialog(){
    // console.log('check the dialog')
      this.dialog = true;
   },
    closeDialog() {
      this.dialog = false;
    },
   },
 
}
</script>
<style scoped>

</style>