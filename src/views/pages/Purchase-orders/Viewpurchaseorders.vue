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
     <div v-if="loading2"  class="loading-container">
      <VProgressLinear
            height="5"
            color="error"
            indeterminate
            class="custom-loader"  
            full-width              
        />          
     </div>

     <VRow v-if="this.purchaseorders == null">
      <VCol cols="12"> 
        <VCard title="Purchase Order View">
          <VCardText> 
            <!-- 👉 Checkbox and Button  -->
            <VAlert
              color="warning"
              variant="tonal"
              class="mb-4"              
              border="top"
            >
              <VAlertTitle class="mb-1"> Are you sure you gave Purchase Orders? </VAlertTitle>
              <p class="mb-0">
                The system is not retrieving the Purchase Orders. Please ensure that you have applied for Purchase Orders !</p>
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
     </VRow>

    <VTable v-if="this.purchaseorders != null"
      :headers="headers"
      :items="this.purchaseorders"
      item-key="dessert"
      class="table-rounded"
      height="550"
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
      <!-- <template v-slot:body="{ items }"> -->
     
      <tbody>
        <!-- {{this.purchaseorders}} -->
       
        <tr
          v-for="(item, index) in this.purchaseorders"
          :key="index"
        >          
          <td class="text-center">{{ item.po_number }}</td>
          <td class="text-center">{{ item.created_date }}</td>
       
          <td class="text-center">
            <VChip
              :color="colorPOstatus(item.po_status).color"
              class="font-weight-medium"
              size="small"
            >
              {{ item.po_status }}
              <!-- {{ item.fat }} -->
            </VChip>
            <!-- {{ item.po_status }} -->
          </td>
          <td class="text-center">{{ item.brand_name }}</td>
          <td class="text-center">{{ item.brand_name }}</td>
          <td class="text-center">&#8377;{{ item.total_po_amount }}</td>
          <td class="text-center" style="display:flex;justify-content:center;align-items:center;">
            <VBtn
              v-if="item.po_status != 'Acknowledged' && item.po_status != 'Shared' &&  item.po_status != 'Received'"
              icon
              variant="text"
              color="default"
              class="me-2"
              size="x-small"
              @click="editrow(item)"
            >
              <VIcon
                color="warning"
                icon="ri-pencil-line"
                size="22"
              />
            </VBtn>
            <!-- <VBtn
            v-if='item.status!="Acknowledged" && item.status!="Shared"'
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
            <VBtn
              v-if="item.po_status == 'Acknowledged' || item.po_status == 'Shared' || item.po_status == 'Received'"
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
<!-- {{item.po_id}} -->
             <!-- <VBtn
             v-if="item.po_status == 'Acknowledged' || item.po_status == 'Shared'"
              icon
              variant="text"
              color="default"
              class="me-2"
              size="x-small"
              @click="DownloadPDF(item.purchase_order_file)"
            >
              <VIcon
                color="error"
                icon="iwwa:file-pdf"
                size="26"
              />
            </VBtn> -->
            <VBtn

             v-if="item.po_status == 'Acknowledged' || item.po_status == 'Shared' || item.po_status == 'Received'"
              icon
              variant="text"
              color="default"
              class="me-2"
              size="x-small"
              @click="getPDFupdate(item.po_id)"
            >
              <VIcon
                color="error"
                icon="iwwa:file-pdf"
                size="26"
              />
            </VBtn>
          </td>
        </tr>
      </tbody>
      <!-- </template> -->
    </VTable>
    
    <VDialog
      v-model="dialog"
      max-width="1000"
    >
    
      <VCard
        title="Purchase Order"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
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
                    <!-- {{selectedPurchaseOrder}} -->
                    <!-- {{this.productData.brand_name}} -->
                    <VTextField
                      v-model="this.productData.brand_name"
                      label="Brand or Manufacturer"
                      readonly
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="this.createdBy"
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
                      v-model="this.productData.created_date"
                      type="date"
                      label="Date"
                      readonly
                    />
                  </VCol>

                  <VCol
                    md="6"
                    cols="12"
                  >
                    <!-- {{formData.po_status}}  -->
                    <VSelect
                      v-model="this.productData.po_status"
                      label="PO Status"
                      :items="['Draft', 'Created', 'Shared', 'Acknowledged']"
                      :rules="Statusrules"
                    />
                  </VCol>

                    <VCol
                md="6"
                cols="12"
              >
             
                 <VTextField
                  v-model="this.productData.delivery_date"
                  type="date"
                  label="Delivery Date"
                  :min="today"
                  :rules="dateRules"
                 
                />
               </VCol>
                  <VDivider />

                  <VCol cols="12">

                    <VTable
                      :headers="headers2"
                      :items="AllBrandproducts"
                    >
                      <!-- {{this.combinedProducts}} -->
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
                        <!-- {{this.editProduct}} -->
                        <!-- <tr v-for="(item,index) in this.AllBrandproducts" :key="index">
          <td class="text-center">{{item.sku_name}}</td>
          <td class="text-center">{{item.hsn_code}}</td>
          <td class="text-center">{{item.mrp}}</td>
          <td class="text-center">{{item.quantity}}</td>
          <td class="text-center">{{item.uom}}</td>
          <td class="text-center">{{item.price_per_unit}}</td>
          <td class="text-center">{{item.taxable_amount}}</td>
          <td class="text-center">{{item.cgst}}</td>
          <td class="text-center">{{item.sgst}}</td>
          <td class="text-center">{{item.amount}}</td>

        </tr>  -->
                        <tr
                          v-for="(item, index) in this.AllBrandproducts"
                          :key="index"
                        >
                          <td class="text-center">
                            {{ item.sku_name }}
                          </td>
                          <td class="text-center">
                            {{ item.hsn_code }}
                          </td>
                          <td class="text-center">&#8377;{{ item.mrp }}</td>
                          <td class="text-center">
                            <VTextField
                              @keydown="preventDecimal"
                              @paste="preventPaste"
                              type="number"
                              min="0" max="20000"
                              v-model="item.quantity"
                              style="min-width: 80px"
                            />
                            <!-- {{ item.Quantity }} -->
                          </td>
                          <td class="text-center">
                            {{ item.uom }}
                          </td>
                          <td class="text-center">
                            &#8377; {{ calculatedPricePerUnit[index] }} <br />
                            <!-- &#8377;{{ item.total_given_margin }} -->
                            <VChip
                              :color="colorTGMmargin(item.total_given_margin).color"
                              class="font-weight-medium"
                              size="small"
                            >
                              ({{ item.total_given_margin }})
                              <!-- {{ item.fat }} -->
                            </VChip>
                          </td>
                          <td class="text-center">&#8377;{{ calculatedTaxableAmount[index] }}</td>
                          <td class="text-center">
                            &#8377;{{ calculatedCGSTAmount[index] }} <br />
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
                          <td class="text-center">
                            &#8377;{{ calculatedSGSTAmount[index] }} <br />
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
                          <td class="text-center">&#8377;{{ calculateTotalamount[index] }}</td>
                          <td>
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
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td class="text-center">Total</td>
                          <td></td>
                          <td></td>
                          <td class="text-center">{{ allQuantity }}</td>
                          <td></td>
                          <td></td>
                          <td class="text-center">&#8377;{{ allTaxableAmmount }}</td>
                          <td class="text-center">&#8377;{{ allCGSTAmount }}</td>
                          <td class="text-center">&#8377;{{ allSGSTAmount }}</td>
                          <td class="text-center">&#8377;{{ allAmmount }}</td>
                          <td></td>
                        </tr>
                        <tr>
                          <!-- Left Side: CGST -->
                          <td
                            class="text-left"
                            style="font-weight: Bold"
                          >
                            Tax Details:
                          </td>
                          <td
                            colspan="4"
                            class="text-right"
                          ></td>

                          <!-- Right Side: Subtotal -->
                          <td
                            colspan="4"
                            class="text-left"
                            style="font-weight: Bold"
                          >
                            Amounts:
                          </td>
                          <!-- Empty cells for merging -->
                          <td
                            colspan="4"
                            class="text-center"
                          ></td>
                        </tr>

                        <tr>
                          <!-- Left Side: CGST -->
                          <td class="text-left">CGST</td>
                          <td
                            colspan="4"
                            class="text-right"
                          >
                            &#8377;{{ allCGSTAmount }}
                          </td>

                          <!-- Right Side: Subtotal -->
                          <td
                            colspan="4"
                            class="text-left"
                          >
                            SubTotal
                          </td>
                          <!-- Empty cells for merging -->
                          <td
                            colspan="4"
                            class="text-center"
                          >
                            &#8377;{{ allAmmount }}
                          </td>
                        </tr>

                        <tr>
                          <!-- Left Side: CGST -->
                          <td class="text-left">SGST</td>
                          <td
                            colspan="4"
                            class="text-right"
                          >
                            &#8377;{{ allSGSTAmount }}
                          </td>

                          <!-- Right Side: Subtotal -->
                          <td
                            colspan="4"
                            class="text-left"
                          >
                            Total
                          </td>
                          <!-- Empty cells for merging -->
                          <td
                            colspan="4"
                            class="text-center"
                          >
                            &#8377;{{ allAmmount }}
                          </td>
                        </tr>

                        <tr>
                          <!-- Left Side: CGST -->
                          <td class="text-left"></td>
                          <td
                            colspan="4"
                            class="text-right"
                          ></td>

                          <!-- Right Side: Subtotal -->
                          <td
                            colspan="4"
                            class="text-left"
                          >
                            Advance
                          </td>
                          <!-- Empty cells for merging -->
                          <td
                            colspan="4"
                            class="text-center"
                          >
                            &#8377;{{ totals.Quantity }}
                          </td>
                        </tr>

                        <tr>
                          <!-- Left Side: CGST -->
                          <td class="text-left"></td>
                          <td
                            colspan="4"
                            class="text-right"
                          ></td>

                          <!-- Right Side: Subtotal -->
                          <td
                            colspan="4"
                            class="text-left"
                          >
                            Balance
                          </td>
                          <!-- Empty cells for merging -->
                          <td
                            colspan="4"
                            class="text-center"
                          >
                            &#8377;{{ allAmmount }}
                          </td>
                        </tr>

                        <tr>
                          <!-- Left Side: CGST -->
                          <td class="text-left"></td>
                          <td
                            colspan="4"
                            class="text-right"
                          ></td>

                          <!-- Right Side: Subtotal -->
                          <td
                            colspan="4"
                            class="text-left"
                          >
                            You Saved
                          </td>
                          <!-- Empty cells for merging -->
                          <td
                            colspan="4"
                            class="text-center"
                          >
                            &#8377;{{ savedamount }}
                          </td>
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
                      @click="closeDialog()"
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
      max-width="1000"
    >
      <VCard
        title="Purchase Order"
        class="mb-2"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <!-- 👉 Form -->
              <VForm class="mt-6">
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <!-- {{selectedPurchaseOrder}} -->
                    <!-- {{this.productData.brand_name}} -->
                    <VSelect
                      v-model="this.VproductData.brand_name"
                      label="Brand or Manufacturer"
                      readonly
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="this.createdBy"
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
                      v-model="this.VproductData.created_date"
                      type="date"
                      label="Date"
                      readonly
                    />
                  </VCol>

                  <VCol
                    md="6"
                    cols="12"
                  >
                    <!-- {{formData.po_status}}  -->
                    <VSelect
                      v-model="this.VproductData.po_status"
                      label="PO Status"
                      readonly
                    />
                  </VCol>

                  <VCol
                md="6"
                cols="12"
              >
              <!-- {{formData.po_status}}  -->
                 <VTextField
                  v-model="this.VproductData.delivery_date"
                  type="date"
                  label="Delivery Date"
                  readonly
                 
                />
               </VCol>
                  <VDivider />

                  <VCol cols="12">

                    <VTable
                      :headers="headers3"
                      :items="viewProduct"
                    >
                      <thead>
                        <tr>
                          <th
                            class="text-center"
                            v-for="header in headers3"
                            :key="header"
                          >
                            {{ header.text }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in this.viewProduct"
                          :key="index"
                        >
                          <td class="text-center">{{ item.sku_name }}</td>
                          <td class="text-center">{{ item.hsn_code }}</td>
                          <td class="text-center">{{ item.mrp }}</td>
                          <td class="text-center">{{ item.quantity }}</td>
                          <td class="text-center">{{ item.uom }}</td>
                          <td class="text-center">{{ item.price_per_unit }}
                             <VChip
                              :color="colorTGMmargin(item.total_give_margin).color"
                              class="font-weight-medium"
                              size="small"
                            >
                              ({{ item.total_give_margin }})
                                <!-- {{ item.fat }} -->
                                  </VChip>
                          </td>
                          <td class="text-center">{{ item.taxable_amount }}</td>
                          <td class="text-center">{{ item.csgt }}
                              <VChip
                              :color="colorTGMmargin(item.cgst_percentage).color"
                              class="font-weight-medium"
                              size="small"
                            >
                              ({{ item.cgst_percentage }})
                                <!-- {{ item.fat }} -->
                                  </VChip>
                          </td>
                          <td class="text-center">{{ item.sgst }}
                              <VChip
                              :color="colorTGMmargin(item.sgst_percentage).color"
                              class="font-weight-medium"
                              size="small"
                            >
                              ({{ item.sgst_percentage }})
                                <!-- {{ item.fat }} -->
                                  </VChip>
                          </td>
                          <td class="text-center">{{ item.amount }}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td class="text-center">Total</td>
                          <td></td>
                          <td></td>
                          <!-- <td></td>       -->
                          <td class="text-center">{{ this.VproductData.total_quantity }}</td>
                          <td></td>
                          <td></td>
                          <td class="text-center">&#8377;{{ this.VproductData.sub_total }}</td>
                          <!-- <td></td> -->
                          <td class="text-center">&#8377;{{ this.VproductData.total_cgst }}</td>
                          <td class="text-center">&#8377;{{ this.VproductData.total_sgst }}</td>
                          <td class="text-center">&#8377;{{ this.VproductData.total_po_amount }}</td>
                          <!-- <td></td> -->
                          <td></td>
                        </tr>

                        <tr>
                          <!-- Left Side: CGST -->
                          <td
                            class="text-left"
                            style="font-weight: Bold"
                          >
                            Tax Details:
                          </td>
                          <td
                            colspan="4"
                            class="text-right"
                          ></td>

                          <!-- Right Side: Subtotal -->
                          <td
                            colspan="4"
                            class="text-left"
                            style="font-weight: Bold"
                          >
                            Amounts:
                          </td>
                          <!-- Empty cells for merging -->
                          <td
                            colspan="4"
                            class="text-center"
                          ></td>
                        </tr>

                        <tr>
                          <!-- Left Side: CGST -->
                          <td class="text-left">CGST</td>
                          <td
                            colspan="4"
                            class="text-right"
                          >
                            &#8377;{{ this.VproductData.total_cgst }}
                          </td>

                          <!-- Right Side: Subtotal -->
                          <td
                            colspan="4"
                            class="text-left"
                          >
                            SubTotal
                          </td>
                          <!-- Empty cells for merging -->
                          <td
                            colspan="4"
                            class="text-center"
                          >
                            &#8377;{{ this.VproductData.total_po_amount }}
                          </td>
                        </tr>

                        <tr>
                          <!-- Left Side: CGST -->
                          <td class="text-left">SGST</td>
                          <td
                            colspan="4"
                            class="text-right"
                          >
                            &#8377;{{ this.VproductData.total_sgst }}
                          </td>

                          <!-- Right Side: Subtotal -->
                          <td
                            colspan="4"
                            class="text-left"
                          >
                            Total
                          </td>
                          <!-- Empty cells for merging -->
                          <td
                            colspan="4"
                            class="text-center"
                          >
                            &#8377;{{ this.VproductData.total_po_amount }}
                          </td>
                        </tr>

                        <tr>
                          <!-- Left Side: CGST -->
                          <td class="text-left"></td>
                          <td
                            colspan="4"
                            class="text-right"
                          ></td>

                          <!-- Right Side: Subtotal -->
                          <td
                            colspan="4"
                            class="text-left"
                          >
                            Advance
                          </td>
                          <!-- Empty cells for merging -->
                          <td
                            colspan="4"
                            class="text-center"
                          >
                            &#8377;{{ totals.Quantity }}
                          </td>
                        </tr>

                        <tr>
                          <!-- Left Side: CGST -->
                          <td class="text-left"></td>
                          <td
                            colspan="4"
                            class="text-right"
                          ></td>

                          <!-- Right Side: Subtotal -->
                          <td
                            colspan="4"
                            class="text-left"
                          >
                            Balance
                          </td>
                          <!-- Empty cells for merging -->
                          <td
                            colspan="4"
                            class="text-center"
                          >
                            &#8377;{{ this.VproductData.total_po_amount }}
                          </td>
                        </tr>

                        <tr>
                          <!-- Left Side: CGST -->
                          <td class="text-left"></td>
                          <td
                            colspan="4"
                            class="text-right"
                          ></td>

                          <!-- Right Side: Subtotal -->
                          <td
                            colspan="4"
                            class="text-left"
                          >
                            You Saved
                          </td>
                          <!-- Empty cells for merging -->
                          <td
                            colspan="4"
                            class="text-center"
                          >
                            &#8377;{{ this.VproductData.you_saved }}
                          </td>
                        </tr>
                      </tfoot>
                    </VTable>

                  </VCol>

                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <!-- <VBtn @click="saveProducteditData">Save</VBtn> -->
                    <!-- @click="resetdetails" -->
                    <!-- variant="tonal" -->
                    <VBtn
                      color="primary"
                      @click="closedialog2()"
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

    <VSnackbar
      v-model="snackbar"
      :timeout="2000"
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
       today: this.getFormattedDate(new Date()),
      loading: true,
      loading2: false,
      Viewtotals: {
        total_po_amount: '',
        total_taxableammout: '',
        total_cgst: '',
        total_sgst: '',
      },
      Statusrules: [v => !!v || 'Status Is Required'],
      quantityrules: [v => !!v || 'Quantity Is Required'],
      dateRules: [
         (v) => !!v || 'Date is required',
      ],
      snackbar: false,
      snackbarText: '',
      timeout: 6000, // milliseconds
      color: '', // or 'error', 'warning', 'info', etc.
      top: false,
      bottom: true,
      left: false,
      right: false,
      dialog2: false,
      viewProduct: [],
      combinedProducts: [],
      totals: {
        Quantity: 0,
        TaxableAmmount: 0,
        CGST: 0,
        SGST: 0,
        Ammount: 0,
      },
      AllBrandproducts: [],
      selectedBrandId: '',
      Brandname: [],
      editProduct: [],
      VproductData: {
        brand_id: '',
        user_id: '',
        created_date: '',
        po_status: '',
        total_cgst: '',
        total_sgst: '',
        you_saved: '',
        po_id: '',
        po_number: '',
        delivery_date: '',
        sub_total: '', // Rename the property as per your API
        total_so_amount: '',
        total_quantity: '',
        products: [
          {
            brand_product_id: '',
            sku_name: '',
            hsn_code: '',
            mrp: '',
            quantity: '',
            uom: '',
            price_per_unit: '',
            taxable_amount: '',
            cgst: '',
            sgst: '',
            amount: '',
            total_give_margin: '',
          },
        ],
      },

      productData: {
        brand_id: '',
        user_id: '',
        created_date: '',
        po_status: '',
        total_cgst: '',
        total_sgst: '',
        you_saved: '',
        po_id: '',
        po_number: '',
        delivery_date: '',
        'sub_total(taxable_amount_total)': '', // Rename the property as per your API
        total_so_amount: '',
        total_quantity: '',
        products: [
          {
            brand_product_id: '',
            sku_name: '',
            hsn_code: '',
            mrp: '',
            quantity: '',
            uom: '',
            price_per_unit: '',
            taxable_amount: '',
            cgst: '',
            sgst: '',
            amount: '',
            total_give_margin: '',
          },
        ],
      },
      dialog: false,
      purchaseorders: [],
      userIds: '',
      userRoles: '',
      createdBy: '',
      headers: [
        { text: 'Purchase Order', value: 'po_number' },
        { text: 'Order Date', value: 'created_date' },
        { text: 'Status', value: 'po_status' },
        { text: 'Order To', value: 'brand_name' },
        { text: 'Shipped To', value: 'brand_name' },
        { text: 'Total', value: 'total_po_amount' },
        { text: 'Action', value: 'actions', sortable: false },
      ],
      headers2: [
        { text: 'Product Name', value: 'sku_name' },
        { text: 'HSN', value: 'hsn_code' },
        { text: 'MRP', value: 'mrp' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'UOM', value: 'uom' },
        { text: 'Price/Unit', value: 'price_per_unit' },
        { text: 'TaxableAmount', value: 'taxable_amount' },
        { text: 'CGST', value: 'csgt' },
        { text: 'SGST', value: 'sgst' },
        { text: 'Amount', value: 'amount' },
        // { text: 'Actions', value: 'action' },
      ],
      headers3: [
        { text: 'Product Name', value: 'sku_name' },
        { text: 'HSN', value: 'hsn_code' },
        { text: 'MRP', value: 'mrp' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'UOM', value: 'uom' },
        { text: 'Price/Unit', value: 'price_per_unit' },
        { text: 'TaxableAmount', value: 'taxable_amount' },
        { text: 'CGST', value: 'csgt' },
        { text: 'SGST', value: 'sgst' },
        { text: 'Amount', value: 'amount' },
        // { text: 'Actions', value: 'action' },
      ],
    }
  },
  computed: {
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
    allAmmount() {
      const AllAmount = this.calculateTotalamount.reduce((tot, amo) => tot + parseFloat(amo), 0)
      return parseFloat(AllAmount.toFixed(2))
    },
    allSGSTAmount() {
      const totalSGSTAmount = this.calculatedSGSTAmount.reduce((to, am) => to + parseFloat(am), 0)
      return parseFloat(totalSGSTAmount.toFixed(2))
    },
    allCGSTAmount() {
      const totalCGSTAmount = this.calculatedCGSTAmount.reduce((t, a) => t + parseFloat(a), 0)
      return parseFloat(totalCGSTAmount.toFixed(2))
    },
    allTaxableAmmount() {
      const allTaxAmount = this.calculatedTaxableAmount.reduce((total, amount) => total + parseFloat(amount), 0)
      return parseFloat(allTaxAmount.toFixed(2))
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
    calculateTotalamount() {
      return this.AllBrandproducts.map((item, index) => {
        const taxableammounts = parseFloat(this.calculatedTaxableAmount[index])
        const cgstamount = parseFloat(this.calculatedCGSTAmount[index])
        const sgstamount = parseFloat(this.calculatedSGSTAmount[index])
        const tamount = taxableammounts + cgstamount + sgstamount
        return isNaN(tamount) ? 0 : tamount.toFixed(2)
      })
    },
    calculatedSGSTAmount() {
      return this.AllBrandproducts.map((item, index) => {
        const taxamount = parseFloat(this.calculatedTaxableAmount[index])
        const SGST = parseFloat(item.sgst.replace('%', ''))
        const sgstdata = (taxamount * SGST) / 100
        return isNaN(sgstdata) ? 0 : sgstdata.toFixed(2)
      })
    },
    calculatedCGSTAmount() {
      return this.AllBrandproducts.map((item, index) => {
        const taxamount = parseFloat(this.calculatedTaxableAmount[index])
        const CGST = parseFloat(item.cgst.replace('%', ''))
        const cgstdata = (taxamount * CGST) / 100
        return isNaN(cgstdata) ? 0 : cgstdata.toFixed(2)
      })
    },
  //  TaxfromCgst(){
  //          return this.AllBrandproducts.map(item => {
  //                const MRP =   parseFloat(item.mrp);
  //                const CGST =  parseFloat(item.cgst.replace('%', ''));
  //               //  const SGST =  parseFloat(item.sgst.replace('%', ''));
  //               const Tax1 = MRP-(MRP/(1+(CGST/100)));
  //               return isNaN(Tax1) ? 0 : Tax1.toFixed(2);
  //          })
  //   },
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
    console.log('quanti',quantitt);
    const rawPricePerUnit = this.calculatedPricePerUnit[index];
    const CGST =  parseFloat(item.cgst.replace('%', ''));
    const SGST = parseFloat(item.sgst.replace('%', ''));
    
    const pricePerUnit = parseFloat(rawPricePerUnit);

    // Skip calculation if quantity is 0
    if (quantitt === 0) {
      return 0;
    }

    if (isNaN(quantitt) || isNaN(pricePerUnit)) {
      console.log(`Invalid quantity or price at index ${index}`);
      return 0; // or any default value
    }

    const taxableAmount = (rawPricePerUnit/(100+(CGST+SGST))*100)*quantitt;
    return isNaN(taxableAmount) ? 0 : taxableAmount.toFixed(2);
   });
  }

  },

  mounted() {
   
    this.createdBy = localStorage.getItem('createdby')
    this.userIds = localStorage.getItem('userId')
    this.userRoles = localStorage.getItem('userRole')
    this.getPurchaseorderdetails()
    this.getBrands();
     setTimeout(() => {
      this.loading = false; // Set loading to false when the operation is complete
    }, 4000); // Simulating a 2-second delay
    //  this.loading = false;
  },
  methods: {
  getFormattedDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
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

     getPDFupdate(id){
      this.loading2 = true;
      this.getPurchasePDF(id).then((response)=>{
        console.log(response)
        const pdfUrl = response.data.po_file;
        this.loading2 = false;
         window.open(pdfUrl, '_blank');
      })
    },

    DownloadPDF(id){
    console.log('check the id', id);
    if(id == undefined){
            this.snackbar = true
            this.snackbarText = 'PDF is not available'
            this.color = 'error'
    }else{
      const pdfUrl = id;
      window.open(pdfUrl, '_blank');
    }
     
     
    },
    closedialog2() {
      this.dialog2 = false
    },
    validateForm() {
      this.$refs.purchaseOrderForm.validate().then(valid => {
        console.log('form valid', valid.valid)
        if (valid.valid == true) {
          // this.saveData();
          if (this.allQuantity >= 1) {
            this.saveProducteditData()
          } else {
            this.snackbar = true
            this.snackbarText = 'Please give Quantities'
            this.color = 'error'
          }
        } else {
          this.snackbar = true
          this.snackbarText = 'Please give all mandatory fields'
          this.color = 'error'
        }
      })
    },

    deleteRow(item) {
      const index = this.AllBrandproducts.indexOf(item)
      if (index !== -1) {
        this.AllBrandproducts.splice(index, 1)
      }
    },
  saveProducteditData() {
    const statusMapping = {
        Draft: 1,
        Created: 2,
        Shared: 3,
        Acknowledged: 4,
        Received: 5,
    }

    const maxLength = Math.max(
        this.AllBrandproducts.length,
        this.calculatedPricePerUnit.length,
        this.calculatedTaxableAmount.length,
        this.calculatedCGSTAmount.length,
        this.calculatedSGSTAmount.length,
        this.calculateTotalamount.length
    );

    const products = [];

    for (let i = 0; i < maxLength; i++) {
        const product = this.AllBrandproducts[i];
        if (!product || product.quantity <= 0) continue;

        products.push({
            brand_product_id: product.brand_product_id,
            sku_name: product.sku_name,
            hsn_code: product.hsn_code,
            mrp: product.mrp,
            quantity: `${product.quantity}`,
            uom: product.uom,
            price_per_unit: this.calculatedPricePerUnit[i] || '0', // Accessing with index safely
            taxable_amount: this.calculatedTaxableAmount[i] || '0', // Accessing with index safely
            csgt: this.calculatedCGSTAmount[i] || '0', // Accessing with index safely
            sgst: this.calculatedSGSTAmount[i] || '0', // Accessing with index safely
            amount: this.calculateTotalamount[i] || '0', // Accessing with index safely
            sgst_percentage: product.sgst.includes('%') ? `${product.sgst}` : `${product.sgst}%`,
            cgst_percentage: product.cgst.includes('%') ? `${product.cgst}` : `${product.cgst}%`,
            total_give_margin: product.total_given_margin,
        });
    }

    const existingProductIds = this.editProduct.map(editProduct => editProduct.brand_product_id);

    const postData = {
        brand_id: this.selectedBrandId,
        user_id: this.userIds,
        created_date: this.productData.created_date,
        delivery_date: this.productData.delivery_date,
        po_status: statusMapping[this.productData.po_status],
        total_cgst: `${this.allCGSTAmount}`,
        total_sgst: `${this.allSGSTAmount}`,
        you_saved: `${this.savedamount}`,
        sub_total: `${this.allTaxableAmmount}`,
        total_po_amount: `${this.allAmmount}`,
        total_quantity: `${this.allQuantity}`,
        po_id: this.productData.po_id,
        po_number: this.productData.po_number,
        products: products.concat(
            this.editProduct.filter(editProduct => !existingProductIds.includes(editProduct.brand_product_id))
                .map(editProduct => ({
                    brand_product_id: editProduct.brand_product_id,
                    sku_name: editProduct.sku_name,
                    hsn_code: editProduct.hsn_code,
                    mrp: editProduct.mrp,
                    quantity: editProduct.quantity,
                    uom: editProduct.uom,
                    price_per_unit: editProduct.price_per_unit,
                    taxable_amount: editProduct.taxable_amount,
                    csgt: editProduct.cgst,
                    sgst: editProduct.sgst,
                    amount: editProduct.amount,
                    total_give_margin: editProduct.total_give_margin,
                }))
        ),
    };

    console.log('check the post data', postData);

    this.postupdatePurchaseorder(postData).then(response => {
        console.log('check the response', response);
        console.log('check the response', response.status);
        if (response.status == 1) {
            this.snackbar = true;
            this.color = 'success';
            this.formData = {};
            this.snackbarText = response.message;
            this.getPurchaseorderdetails();
            this.dialog = false;          
        } else {
            this.snackbar = true;
            this.color = 'error';
        }
    });
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
     if (event.key === '.' || event.key === ',' ||  event.key === '+' ||  event.key === '-' || event.keyCode === 189 || event.keyCode === 109) {
        event.preventDefault();
      }
    },

    colorTGMmargin(text) {
      if (text) {
        return {
          color: 'success',
          // text: 'Shared',
        }
      } else {
        return {
          color: 'error',
        }
      }
    },
    colorSGSTmargin(text) {
      if (text) {
        return {
          color: 'success',
          // text: 'Shared',
        }
      } else {
        return {
          color: 'error',
        }
      }
    },

    colorCGSTmargin(text) {
      if (text) {
        return {
          color: 'success',
          // text: 'Shared',
        }
      } else {
        return {
          color: 'error',
        }
      }
    },

    getBrandsdata() {
      this.getBrands().then(response => {
        this.Brandname = response.data
        // console.log('check the response', this.Brandname);
      })
    },
    viewrow(itm) {
      console.log('check the dialog', itm)
      this.dialog2 = true
      this.VproductData.brand_name = itm.brand_name
      this.VproductData.created_date = itm.created_date
      this.VproductData.po_status = itm.po_status
      this.VproductData.po_number = itm.po_number
      this.VproductData.po_id = itm.po_id
      this.VproductData.total_po_amount = itm.total_po_amount
      this.VproductData.total_cgst = itm.total_cgst
      this.VproductData.total_sgst = itm.total_sgst
      this.VproductData.you_saved = itm.you_saved
      this.VproductData.total_quantity = itm.total_quantity
      this.VproductData.sub_total = itm.sub_total
      this.VproductData.delivery_date = itm.delivery_date
      this.viewProduct = itm.products
    },
    editrow(itm) {
      //  this.$refs.vtable.items = combinedProducts;
      console.log('check the dialog', itm);
      this.dialog = true;
      this.productData.brand_name = itm.brand_name;
      this.productData.created_date = itm.created_date;
      this.productData.delivery_date = itm.delivery_date;
      this.productData.po_status = itm.po_status;
      this.productData.po_number = itm.po_number;
      this.productData.po_id = itm.po_id;
      this.editProduct = itm.products;
  

      // if(itm.)
      if (this.productData.brand_name === itm.brand_name) {
        this.selectedBrandId = itm.brand_id
        // console.log('check the brandId',this.selectedBrandId);
        this.getBrandproducts(this.selectedBrandId).then(response => {
          this.AllBrandproducts = response.data
          console.log('Branddetails', this.AllBrandproducts)
          console.log('text', this.AllBrandproducts)

          this.AllBrandproducts = this.AllBrandproducts.map(product => {
            const editedProduct = this.editProduct.find(
              brandProduct => brandProduct.brand_product_id == product.brand_product_id,
            )

            return {
              ...product,
              quantity: editedProduct ? editedProduct.quantity : 0,
            }
          })
          console.log('Filtered editProduct', this.AllBrandproducts)
        })

        //     this.AllBrandproducts = this.AllBrandproducts.filter(product =>
        // !this.editProduct.find(brandProduct =>
        //     brandProduct.brand_product_id === product.brand_product_id
        // )
        //    );
      }
    },

    closeDialog() {
      this.dialog = false
    },
    getPurchaseorderdetails() {
      this.getPurchaseorder(this.userIds, this.userRoles).then(response => {
        console.log('check the view purchase order', response)
        this.purchaseorders = response.data
      })
    },
    colorPOstatus(status) {
      if (status == 'Created')
        return {
          color: 'primary',
          // text: 'Created',
        }
      else if (status == 'Draft')
        return {
          color: 'success',
          // text: 'Draft',
        }
      // else if (status === 3)
      //   return {
      //     color: 'error',
      //     text: 'Rejected',
      //   }
      else if (status == 'Acknowledged')
        return {
          color: 'warning',
          // text: 'Acknowledged',
        }
        else if (status == 'Received')
        return {
          color: 'success',
          // text: 'Acknowledged',
        }
      else
        return {
          color: 'info',
          // text: 'Shared',
        }
    },
  },
}
</script>

<style scoped>

/* .custom-loader {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
} */
</style>
>
