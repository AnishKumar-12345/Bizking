<script>
// import upgradeBannerDark from '@/assets/images/pro/upgrade-banner-dark.png'
// import upgradeBannerLight from '@/assets/images/pro/upgrade-banner-light.png'
// import logo from '@/assets/images/logos/aws.png'
import { VerticalNavLink, VerticalNavSectionTitle } from '@layouts'
import { useTheme } from 'vuetify'
// import Index from '@/pages/index.vue'
// import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

export default{
  name: "DrawerContent",
//  components:{
//  Index,

//  },
  
  data(){
    return{
      userRole: '',
       miniVariant: false,
       parentItems: [
        {
          id: 1,
          title: 'Dashboard',
          route: '/Dashboardhome',
          expanded: false,
          icon: "ri-home-smile-line"
        },
        {
          id: 2,
          title: 'Lead',
          icon: "fluent-mdl2:party-leader",
          children: [
            // { id: 21, title: 'Create Lead', route: '/Leadcreate' },
            { id: 22, title: 'View Lead', route: '/LeadView' },
         ],
          expanded: false,
        }, 
         {
          id: 3,
          title: 'Oppertunity',
          icon: "ic:baseline-connect-without-contact",
          children: [
            //  { id: 25, title: 'Add Oppertunity', route: '/Updateoppertunities' },
            { id: 23, title: 'View Oppertunity', route: '/Viewoppertunities' },
            // { id: 24, title: 'Generate Quote', route: '/Oppertunitygeneratequote' },
              // { id: 26, title: 'Close Oppertunity', route: '/Closealloppertunities' },
         ],
          expanded: false,
        },
        {
          id: 4,
          title: 'Service',
          icon: "ri:customer-service-2-line",
          children: [
            { id: 27, title: 'Add Service', route: '/Addservicesdetails' },
            { id: 28, title: 'View Service', route: '/Updateservicedetails' },
            // { id: 29, title: 'Delete Service', route: '/Deleteservicesdetails' },             
         ],
          expanded: false,
        },
         {
          id:5,
          title: 'Brand',
          icon: "mdi-alpha-b-circle-outline",
          children: [
            { id: 37, title: 'Add Brand ', route: '/Addbrand' },                            
            { id: 36, title: 'View Brand', route: '/Viewbrands' },
            // { id: 50, title: 'Add Brand Product', route: '/Addbrandproductsalldata' },


          ],
          expanded: false,
        },
         {
          id: 6,
          title: 'Product',
          icon: "ic:baseline-production-quantity-limits",
          children: [
            { id: 30, title: 'Add Product', route: '/Addbrandproductsalldata' },
            { id: 31, title: 'View Product', route: '/Viewproductdetails' },
            //  { id: 32, title: 'Delete Product', route: '/Deleteproductdetails' },               
         ],
          expanded: false,
         },
         {
          id: 7,
          title: 'Merchant',
          icon: "mdi-person-group-outline",
          children: [
            { id: 34, title: 'Onboard Merchant', route: '/Onboardmerchant' },
              { id: 50, title: 'View Merchants', route: '/Viewmerchantdetails' },
                { id: 35, title: 'Add Merchant Products', route: '/Addmerchantdetails' }, 
              // { id: 33, title: 'View Merchant Products', route: '/Viewproducts' },
                              

          ],
          expanded: false,
        },
         
        {
          id: 8,
          title: 'Purchase',
          icon: "bx:purchase-tag-alt",
          children: [
            { id: 38, title: 'Create Order', route: '/Createpurchaseorder' },
            { id: 39, title: 'View Order', route: '/Viewpurchaseorder' },
            // { id: 40, title: 'View History', route: '/Viewpurchasehistory' },

          ],
          expanded: false,
        },    
        {
          id: 9,
          title: 'Sales',
          icon: "carbon-sales-ops",
          children: [
            { id: 41, title: 'View Sales History', route: '/Viewsaleshistory' },           
            // { id: 51, title: 'Sales Orders', route: '/Salesordersdetails' },           

          ],
          expanded: false,
        },   
          {
          id: 14,
          title: 'Accounts',
          icon: "material-symbols:payments-outline-sharp",
          children: [
            { id: 52, title: 'Merchant Payments', route: '/Merchantpaymentsdata' },   
            // { id: 54, title: 'Generate Credit Note', route: '/updateCreditnote' },           

            // { id: 51, title: 'Sales Orders', route: '/Salesordersdetails' },           
          ],
          expanded: false,
        },   
           {
          id: 18,
          title: 'Credit Notes',
          icon: "material-symbols:payments-outline-sharp",
          children: [
            // { id: 52, title: 'Merchant Payments', route: '/Merchantpaymentsdata' },   
            { id: 54, title: 'Generate Credit Note', route: '/updateCreditnote' },           
            { id: 56, title: 'View Credit Note', route: '/ViewCreditnote' },           

            // { id: 51, title: 'Sales Orders', route: '/Salesordersdetails' },           
          ],
          expanded: false,
        },  
        {
          id: 10,
          title: 'Warehouse',
          icon: "material-symbols:warehouse-outline",
          children: [
            { id: 42, title: 'Input Stock', route: '/Viewpurchasehistory' },
            { id: 43, title: 'Output Stock', route: '/Outputstockupdates' },
             { id: 44, title: 'View Stock', route: '/Viewstoreinventory' },
            //  { id: 45, title: 'Generate D.C', route: '/tables' },                    
              { id: 46, title: 'Update RTV', route: '/Returnwarehousegoods' },  
          ],
          expanded: false,
        },
        {
          id: 11,
          title: 'Store Inventory',
          icon: "carbon:store",
          children: [
            { id: 47, title: 'View Store Stocks', route: '/Viewstorestocks' },
            // { id: 48, title: 'Update Stock', route: '/tables' },
            //  { id: 49, title: 'Delete Product', route: '/tables' },                    

          ],
          expanded: false,
        },
          {
          id: 15,
          title: 'Reports',
          icon: "iconoir:reports",
          // route: '/Allreportsdata',
          expanded: false,
          children: [
            { id: 55, title: 'All Reports Data', route: '/Allreportsdata' },                             
          ],
          // expanded: false,
        },
        {
          id: 12,
          title: 'Retention',
          icon: "material-symbols:nest-doorbell-visitor",
          children: [
            { id: 48, title: 'Retention Visit', route: '/Retentionvisit' },
            // { id: 48, title: 'Update Stock', route: '/tables' },
            //  { id: 49, title: 'Delete Product', route: '/tables' },                    

          ],
          expanded: false,
        },
        {
          id: 13,
          title: 'Terms&Conditions',
          icon: "material-symbols-light:conditions",
          children: [
            { id: 49, title: 'Add T&C', route: '/Addtermsandcondition' },                             
          ],
          expanded: false,
        },
        //  {
        //   id: 16,
        //   title: 'Delivery Map',
        //   icon: "material-symbols-light:conditions",
        //   children: [
        //     { id: 49, title: 'MAP', route: '/Deliverymapdata' },                             
        //   ],
        //   expanded: false,
        // },         
        // Add more parent items with or without children as needed
      ],
      selectedChild: null,
    }
  },
  mounted(){
    const vuetifyTheme = useTheme();
    this.userRole = localStorage.getItem("userRole");
    console.log('check the role', this.userRole);
  },
computed: {
  filteredParentItems() {
    if (this.userRole === "Sales Associate") {
      // Filter items for Sales Associate
      const allowedTitles = ["Dashboard", "Product"];
      
      // console.log('Allowed Titles:', allowedTitles);
      console.log("set",this.parentItems.filter(item => item.title));
      const filteredItems = this.parentItems.filter((item) => {
        const isAllowed = allowedTitles.includes(item.title);
        console.log(`Title: ${item.title}, Allowed: ${isAllowed}`);
        return isAllowed;
      });
      
      console.log('Filtered Items:', filteredItems);
      return filteredItems;
    } else if (this.userRole === "Business Development Manager") {
      // Filter items for Business Development Manager
      const allowedTitles = ["Dashboard", "Merchant"];
      
      console.log('Allowed Titles:', allowedTitles);
      
      const filteredItems = this.parentItems.filter((item) => {
        const isAllowed = allowedTitles.includes(item.title);
        console.log(`Title: ${item.title}, Allowed: ${isAllowed}`);
        return isAllowed;
      });
      
      console.log('Filtered Items:', filteredItems);
      return filteredItems;
    }  else if (this.userRole === "Brand Management") {
      // Filter items for Business Development Manager
      const allowedTitles = ["Dashboard", "Brand", "Product","Purchase","Reports"];
      
      // console.log('Allowed Titles:', allowedTitles);
      
      const filteredItems = this.parentItems.filter((item) => {
        const isAllowed = allowedTitles.includes(item.title);
        // console.log(`Title: ${item.title}, Allowed: ${isAllowed}`);
        return isAllowed;
      });
      
      // console.log('Filtered Items:', filteredItems);
      return filteredItems;
    }  else if (this.userRole === "Warehouse") {
      // Filter items for Business Development Manager
      const allowedTitles = ["Dashboard", "Warehouse","Sales","Reports"];
      
      console.log('Allowed Titles:', allowedTitles);
      
      const filteredItems = this.parentItems.filter((item) => {
        const isAllowed = allowedTitles.includes(item.title);
        console.log(`Title: ${item.title}, Allowed: ${isAllowed}`);
        return isAllowed;
      });
      
      // console.log('Filtered Items:', filteredItems);
      return filteredItems;
    } 
    else if (this.userRole === "Finance Operations Associate") {
      // Filter items for Business Development Manager
      const allowedTitles = ["Dashboard", "Accounts"];
      
      console.log('Allowed Titles:', allowedTitles);
      
      const filteredItems = this.parentItems.filter((item) => {
        const isAllowed = allowedTitles.includes(item.title);
        console.log(`Title: ${item.title}, Allowed: ${isAllowed}`);
        return isAllowed;
      });
      
      // console.log('Filtered Items:', filteredItems);
      return filteredItems;
    } 
     else {
      // Return all items for other roles
      return this.parentItems;
    }
  },
},


//  watch: {
//     '$route'(to, from) {
//       if (to.name === 'Createwarehouseoutput') {
//         // Extract so_id from query parameters
//         const so_id = to.query.so_id;
//         // Update the selectedChild based on the so_id
//         this.selectedChild = so_id;
//       } else {
//         // Reset the selectedChild for other routes
//         this.selectedChild = null;
//       }
//     }
//   },
   methods: {
    toggleChildren(parentItem) {
      //  console.log('Toggling children for:', parentItem.title);
      parentItem.expanded = !parentItem.expanded;  
       this.parentItems.forEach(item => {
        if (item !== parentItem) {
          item.expanded = false;

        }
  
      });  
      //  if (!parentItem.expanded) {
      //   this.selectedChild = null;
      // }
      // console.log('Parent item expanded:', parentItem.expanded);
    },
   navigateTo(route, id) {
  // console.log('Navigating to route:', route);
  this.$router.push(route);
  // console.log(id);
  this.selectedChild = id; // Update selectedChild with the id of the clicked child item
  // console.log('Selected child:', this.selectedChild);
}
  },
}
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <!-- <RouterLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    > -->
    <div class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
      <!-- ℹ️ You can also use img tag or VImg here -->
      <!-- <div v-html="logo" /> -->
      <img src="@/assets/images/logos/comlogo.jpeg" height="60" width="60" style="padding:5px;">

      <Transition name="vertical-nav-app-title">
        <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">BIZKINGZ 
         <!-- <span>WE LAUNCH YOUR SUCCESS</span> -->
        </h1>
      </Transition>
      <!-- <span>anish</span> -->
 <!-- <Transition >
       <h3 class="font-weight-semibold leading-normal text-xl text-uppercase">WE LAUNCH YOUR SUCCESS</h3>
 
       
      </Transition> -->
      </div>
    <!-- </RouterLink> -->
  </div>

  <!-- 👉 Nav items -->
    <!-- <v-navigation-drawer > -->
      <!-- <v-container class="custom-scrollbar"> -->

    <VerticalNavLink class="custom-scrollbar"> 
      
      <v-list-item-group  v-for="(parentItem,index) in filteredParentItems" :key="index">
 
        <v-list-item 
       class="list-item"
          style="margin:8px; border-top-right-radius: 30px;
                border-bottom-right-radius: 30px;width:95%;"
         :to="parentItem.route"
         :style="{ backgroundColor: parentItem.expanded ? '#BA8B32' : '' , color: parentItem.expanded ? '#ffffff' : '' }"
         @click="toggleChildren(parentItem)">
          <v-list-item-icon style="gap: 0.5rem;">
            <v-icon style="display:flex;float:left;margin-right:0.5rem;">{{ parentItem.icon || 'mdi-folder' }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content >        
            <v-list-item-title style="line-height: 1.375rem;letter-spacing: 0.15px;margin-inline-end: auto;fontsize:x-small;font-size: 1rem;">     
              
              {{ parentItem.title }}    
            
                <v-icon v-if="parentItem.children && parentItem.expanded==false" style="display:flex;float:right;">mdi-chevron-right</v-icon>
                <v-icon v-if="parentItem.expanded && parentItem.children"  style="display:flex;float:right">mdi-chevron-down</v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
       
       <!-- child navs -->
        <v-list-item-group v-for="childItem in parentItem.children" :key="childItem.id"  v-if="parentItem.expanded"  >
      
            <v-list-item 
            :style="{ backgroundColor: this.selectedChild == childItem.id ? '#edebec' : '' , color: this.selectedChild == childItem.id ? '#BA8B32' : '',fontWeight: this.selectedChild == childItem.id ? 'bold' : 'normal' }"
            style="margin:5px;border-top-right-radius: 30px;
                border-bottom-right-radius: 30px;"
            @click="navigateTo(childItem.route,childItem.id)">
                <v-list-item-content>
                 <v-list-item-title class="d-flex" style="font-size: 0.9rem;">
                  <v-icon v-if="parentItem.children" style="float:left;margin-right:20px;margin-top:5px;font-size:.75rem">ri-checkbox-blank-circle-line</v-icon>
                  
                 {{ childItem.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>  
          </v-list-item-group>     

      </v-list-item-group>
    </VerticalNavLink> 
    <!-- </v-container> -->
  <!-- </v-navigation-drawer> -->
   
  <ul style="margin-top:10px">
 <!-- <VerticalNavLink
      :item="{
        title: 'Dashboard',
        to: 'index',
        icon: { icon: 'mdi-home-outline' },
      }"
    /> -->
     <!-- <VerticalNavLink
      :item="{
        title: 'Dashboard',
        to: 'index',
        icon: { icon: 'mdi-home-outline' },
      }"
    />
       
    <VerticalNavLink
      :item="{
        title: 'Lead',
        to: 'account-settings',
        icon: { icon: 'mdi-account-cog-outline' },
      }"
    />
   
    <VerticalNavLink
      :item="{
        title: 'Oppertunity',
        to: '',
        icon: { icon: 'mdi-account-group-outline' },
      }"
    /> -->
      <!-- to: 'account-settings', -->
     <!-- <VerticalNavLink
      :item="{
        title: 'Service',
      
        icon: { icon: 'mdi-account-wrench-outline' },
      }"
    /> -->
    <!-- to: 'account-settings', -->
     <!-- <VerticalNavLink
      :item="{
        title: 'Product',
        
        icon: { icon: 'mdi-book-open-outline' },
      }"
    /> -->
           <!-- to: 'account-settings', -->
     <!-- <VerticalNavLink
      :item="{
        title: 'Merchant',
 
        icon: { icon: 'mdi-account-arrow-right-outline' },
      }"
    /> -->
       <!-- to: 'account-settings', -->
     <!-- <VerticalNavLink
      :item="{
        title: 'Brand',
     
        icon: { icon: 'mdi-alpha-b-circle-outline' },
      }"
    /> -->
    <!-- 👉 Pages -->
    <!-- <VerticalNavSectionTitle :item="{ heading: 'Pages' }" />
    <VerticalNavLink
      :item="{
        title: 'Login',
        to: 'login',
        target: '_blank',
        icon: { icon: 'mdi-login' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Register',
        to: 'register',
        target: '_blank',
        icon: { icon: 'mdi-account-plus-outline' },
      }"
    /> -->

    <!-- ℹ️ This path doesn't exist so 404 route will catch this undefined path -->
    <!-- <VerticalNavLink
      :item="{
        title: 'Error',
        to: { path: '/error' },
        target: '_blank',
        icon: { icon: 'mdi-alert-circle-outline' },
      }"
    /> -->

    <!-- 👉 User Interface -->
    <!-- <VerticalNavSectionTitle :item="{ heading: 'User Interface' }" />

    <VerticalNavLink
      :item="{
        title: 'Typography',
        to: 'typography',
        icon: { icon: 'mdi-alpha-t-box-outline' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Icons',
        to: 'icons',
        icon: { icon: 'mdi-eye-outline' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Cards',
        to: 'card-basic',
        icon: { icon: 'mdi-credit-card-outline' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Tables',
        to: 'tables',
        icon: { icon: 'mdi-table' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Form Layouts',
        to: 'form-layouts',
        icon: { icon: 'mdi-form-select' },
      }"
    /> -->
  </ul>

  <!-- 👉 illustration -->
  <!-- <a
    href="https://themeselection.com/item/materio-vuetify-vuejs-admin-template"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      :src="upgradeBanner"
      alt="upgrade-banner"
      transition="scale-transition"
      class="upgrade-banner mx-auto"
      style="max-width: 230px"
    />
  </a> -->
</template>

<style scoped>
.custom-scrollbar {
    overflow-y: auto;
    scrollbar-width: thin; /* For Firefox */
    scrollbar-color: var(--scrollbar-track) var(--scrollbar-thumb); /* For Firefox */
  }

  /* Webkit (Chrome, Safari) scrollbar styles */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px; /* Width of the scrollbar */
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb); /* Color of the scrollbar thumb */
    border-radius: 4px; /* Rounded corners of the scrollbar thumb */
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background-color: var(--scrollbar-track); /* Color of the scrollbar track */
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>>





