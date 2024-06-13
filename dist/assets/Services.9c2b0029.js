import{a$ as r}from"./index.fe0f4396.js";const p={data(){return{url:"http://103.211.218.32/"}},methods:{getBrands(t,e){return r.get(this.url+"bizkingz/services/api/brands/getBrands?city_id="+t+"&location_id="+e,{headers:{"Content-Type":"application/json",accept:"*/*"}}).then(n=>n.data)},getBrandproducts(t,e){return r.get(this.url+"bizkingz/services/api/brands/getBrandsProducts?brand_id="+t+"&location_id="+e,{headers:{"Content-Type":"application/json",accept:"*/*"}}).then(n=>n.data)},postPurchaseorder(t){return r.post(this.url+"bizkingz/services/api/purchase/createOrder",t,{headers:{"Content-Type":"application/json"}}).then(e=>e.data).catch(e=>(console.log("check tick",e),e.response))},getPurchaseorder(t,e){return r.get(this.url+"bizkingz/services/api/purchase/getPurchaseOrders?&city_id="+t+"&location_id="+e,{headers:{"Content-Type":"application/json",accept:"*/*"}}).then(n=>n.data)},postupdatePurchaseorder(t){return r.post(this.url+"bizkingz/services/api/purchase/updateOrder",t,{headers:{"Content-Type":"application/json"}}).then(e=>e.data).catch(e=>(console.log("check tick",e),e.response))},getInputstock(t){return r.get(this.url+"bizkingz/services/api/purchase/getPurchaseOrderDetails?po_id="+t,{headers:{"Content-Type":"application/json",accept:"*/*"}}).then(e=>e.data)},PostInputstock(t){return r.post(this.url+"bizkingz/services/api/warehouse/inputStock",t,{headers:{"Content-Type":"application/json"}}).then(e=>e.data).catch(e=>(console.log("check tick",e),e.response))},getSalesorders(t,e,n){return r.get(this.url+"bizkingz/services/api/sales/getSalesOrders?so_status="+t+"&city_id="+e+"&location_id="+n,{headers:{"Content-Type":"application/json",accept:"*/*"}}).then(s=>s.data).catch(s=>(console.log("check tick",s),s.response))},getOutputSalesorders(){return r.get(this.url+"bizkingz/services/api/sales/getAckSalesOrders",{headers:{"Content-Type":"application/json",accept:"*/*"}}).then(t=>t.data).catch(t=>(console.log("check tick",t),t.response))},getOutputstock(t,e){return r.get(this.url+"bizkingz/services/api/sales/getSalesOrderDetails?so_id="+t+"&city_id="+e,{headers:{"Content-Type":"application/json",accept:"*/*"}}).then(n=>n.data)},getPurchasePDF(t){return r.get(this.url+"bizkingz/services/api/purchase/createPopdf?po_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},postOutputstock(t){return r.post(this.url+"bizkingz/services/api/warehouse/outputStock",t,{headers:{"Content-Type":"application/json"}}).then(e=>e.data).catch(e=>(console.log("check tick",e),e.response))},getAllstocks(t,e){return r.get(this.url+"bizkingz/services/api/warehouse/stock?city_id="+t+"&location_id="+e,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(n=>n).catch(n=>n.response)},posttandc(t){return r.post(this.url+"bizkingz/services/api/services/addTnC",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},getrtvproducts(){return r.get(this.url+"bizkingz/services/api/warehouse/getRtvProducts",{headers:{accept:"*/*","Content-Type":"application/json"}}).then(t=>t).catch(t=>t.response)},editrtvproducts(t){return r.post(this.url+"bizkingz/services/api/warehouse/changeRtvStatus",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},getMerchants(t){return r.get(this.url+"bizkingz/services/api/merchants/getMerchants?city_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},getMerchantproductsstock(t){return r.get(this.url+"bizkingz/services/api/merchants/stock?merchant_id="+t,{headers:{"Content-Type":"application/json",accept:"*/*"}}).then(e=>e.data)},getMerchantdetails(){return r.get(this.url+"bizkingz/services/api/merchants/getMerchants",{headers:{accept:"*/*","Content-Type":"application/json"}}).then(t=>t).catch(t=>t.response)},getmerchantproducts(t){return r.get(this.url+"bizkingz/services/api/merchants/getSalesMerchantProducts?merchant_id="+t,{headers:{"Content-Type":"application/json",accept:"*/*"}}).then(e=>e.data)},getmerchantbrandproducts(t,e){return r.get(this.url+"bizkingz/services/api/brands/getAllBrandProducts?merchant_id="+t+"&location_id="+e,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(n=>n).catch(n=>n.response)},postmerchantbrandproducts(t){return r.post(this.url+"bizkingz/services/api/merchants/addProducts",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},getsalesperson(){return r.get(this.url+"bizkingz/services/api/users/getAllUsers",{headers:{accept:"*/*","Content-Type":"application/json"}}).then(t=>t).catch(t=>t.response)},addOnboardmerchant(t){return r.post(this.url+"bizkingz/services/api/merchants/addMerchant",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},getMerchantdetailsdata(t){return r.get(this.url+"bizkingz/services/api/merchants/getMerchantDetails?merchant_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},updateMerchantdetailsdata(t){return r.post(this.url+"bizkingz/services/api/merchants/updateMerchantDetails",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},Addbranddata(t){return r.post(this.url+"bizkingz/services/api/brands/addBrand",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},Addbrandproductdata(t){return r.post(this.url+"bizkingz/services/api/brands/addBrandProduct",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},getProducts(t){return r.get(this.url+"bizkingz/services/api/brands/getProducts?city_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},updateProducts(t){return r.post(this.url+"bizkingz/services/api/brands/updateBrandProduct",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},updateBrands(t){return r.post(this.url+"bizkingz/services/api/brands/updateBrand",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},storestocksreport(t,e,n,s,i){return r.get(this.url+"bizkingz/services/api/reports/merchant_sales?merchant_id="+t+"&date_filter="+e+"&start_date="+n+"&end_date="+s+"&city_id="+i,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(a=>a).catch(a=>a.response)},salesstocksreport(t,e,n,s,i){return r.get(this.url+"bizkingz/services/api/reports/sales_orders?type="+t+"&date_filter="+e+"&start_date="+n+"&end_date="+s+"&city_id="+i,{}).then(a=>a).catch(a=>a.response)},saveLead(t){return r.post(this.url+"bizkingz/services/api/leads/createLead",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},getLeads(){return r.get(this.url+"bizkingz/services/api/leads/viewLeadsWeb",{headers:{accept:"*/*","Content-Type":"application/json"}}).then(t=>t).catch(t=>t.response)},updateLeads(t){return r.get(this.url+"bizkingz/services/api/leads/getLeadDetails?lead_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},getMerchantstocksreport(t,e){return r.get(this.url+"bizkingz/services/api/reports/store_stock?merchant_id="+t+"&city_id="+e,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(n=>n).catch(n=>n.response)},getBrandreports(t,e){return r.get(this.url+"bizkingz/services/api/reports/warehouse_stock?brand_id="+t+"&city_id="+e,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(n=>n).catch(n=>n.response)},getBrandsallreport(t,e){return r.get(this.url+"bizkingz/services/api/reports/brand_products?brand_id="+t+"&city_id="+e,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(n=>n).catch(n=>n.response)},getMProductsreport(t,e){return r.get(this.url+"bizkingz/services/api/reports/merchant_products?merchant_id="+t+"&city_id="+e,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(n=>n).catch(n=>n.response)},getPurchasesorderreport(t,e,n,s,i){return r.get(this.url+"bizkingz/services/api/reports/purchase_orders?type="+t+"&date_filter="+e+"&start_date="+n+"&end_date="+s+"&city_id="+i,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(a=>a).catch(a=>a.response)},getUserstorereport(t){return r.get(this.url+"bizkingz/services/api/reports/userStoreLogin?user_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},updateLead(t){return r.post(this.url+"bizkingz/services/api/leads/updateLead",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},AddLeadInfo(t){return r.post(this.url+"bizkingz/services/api/leads/addLeadInfo",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},UpdateLeadInfo(t){return r.post(this.url+"bizkingz/services/api/leads/updateLeadInfo",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},getOppertunities(){return r.get(this.url+"bizkingz/services/api/opportunities/getAllOpportunities",{headers:{accept:"*/*","Content-Type":"application/json"}}).then(t=>t).catch(t=>t.response)},Cancelpurchaseorder(t){return r.post(this.url+"bizkingz/services/api/purchase/cancel",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},getMerchantpayments(t){return r.get(this.url+"bizkingz/services/api/accounts/getDeliveredSales?merchant_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},getOppertunitydetails(t){return r.get(this.url+"bizkingz/services/api/opportunities/getAllOpportunityDetails?opportunity_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},updateOppertunitydetails(t){return r.post(this.url+"bizkingz/services/api/opportunities/updateOpportunity",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},AddOppertunityinfo(t){return r.post(this.url+"bizkingz/services/api/opportunities/addOpportunityInfo",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},Changepasswords(t){return r.post(this.url+"bizkingz/services/api/users/changePassword",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},Quotesdata(){return r.get(this.url+"bizkingz/services/api/quotes/products",{headers:{accept:"*/*","Content-Type":"application/json"}}).then(t=>t).catch(t=>t.response)},getoppQuotesdata(t){return r.get(this.url+"bizkingz/services/api/quotes/products?opportunity_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},saveoppQuotesdata(t){return r.post(this.url+"bizkingz/services/api/quotes/send",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},getSalesmerchant(t){return r.get(this.url+"bizkingz/services/api/merchants/getSalesMerchants?user_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},GSTinvoicewise(t,e,n){return r.get(this.url+"bizkingz/services/api/reports/getGSTData?start_date="+t+"&end_date="+e+"&city_id="+n,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(s=>s).catch(s=>s.response)},GSTproductwise(t,e){return r.get(this.url+"bizkingz/services/api/reports/getGSTProductsData?start_date="+t+"&end_date="+e,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(n=>n).catch(n=>n.response)},Merchantpayments(t,e,n,s,i){return r.get(this.url+"bizkingz/services/api/reports/merchant_payments_so?sales_person="+t+"&merchant_id="+e+"&start_date="+n+"&end_date="+s+"&city_id="+i,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(a=>a).catch(a=>a.response)},Merchantpaymentsoverall(t,e,n,s){return r.get(this.url+"bizkingz/services/api/reports/merchant_payments_overall?sales_person="+t+"&merchant_id="+e+"&start_date="+n+"&end_date="+s,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(i=>i).catch(i=>i.response)},Getsalesperson(){return r.get(this.url+"bizkingz/services/api/sales/delivery_persons",{headers:{accept:"*/*","Content-Type":"application/json"}}).then(t=>t).catch(t=>t.response)},UpdateUnholddata(t){return r.post(this.url+"bizkingz/services/api/sales/so_update",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},CancelUnholddata(t){return r.get(this.url+"bizkingz/services/api/sales/so_cancel?so_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},Merchantreports(t){return r.get(this.url+"bizkingz/services/api/reports/merchants?city_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},attachmentsdata(t){return r.get(this.url+"bizkingz/services/api/quotes/quotations?opportunity_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},Leadreports(t){return r.get(this.url+"bizkingz/services/api/reports/leads?city_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},Opportunityreports(t){return r.get(this.url+"bizkingz/services/api/reports/opportunities?city_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},Locationdata(){return r.get(this.url+"bizkingz/services/api/cities/getAll",{headers:{accept:"*/*","Content-Type":"application/json"}}).then(t=>t).catch(t=>t.response)},getCitylocation(t){return r.post(this.url+"bizkingz/services/api/locations/getAll?city_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},updateMerchantstock(t){return r.post(this.url+"bizkingz/services/api/merchants/updateMerchantStock",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},getCreditnote(t){return r.get(this.url+"bizkingz/services/api/accounts/creditNote/"+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},getReturnsalesorders(t){return r.get(this.url+"bizkingz/services/api/accounts/getReturnSalesOrders?merchant_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},getinvoiceorders(t){return r.get(this.url+"bizkingz/services/api/accounts/getInvoiceSalesOrders?merchant_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},saveCreditnote(t){return r.post(this.url+"bizkingz/services/api/accounts/creditNoteNew",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},salesMerchantProducts(t){return r.get(this.url+"bizkingz/services/api/merchants/getSalesMerchantProducts?merchant_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},getStcksdata(t){return r.get(this.url+"bizkingz/services/api/orders/stock_details?merchant_id="+t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)},saveSorder(t){return r.post(this.url+"bizkingz/services/api/sales/createOrder",t,{headers:{accept:"*/*","Content-Type":"application/json"}}).then(e=>e).catch(e=>e.response)}}};export{p as s};
