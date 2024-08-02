import axios from "axios";

export default { 
    data(){
        return{
            url:'http://103.211.218.32/' 
        }
    }, 
    methods:{
        getBrands(id,lid){
            return axios
          .get(this.url +"bizkingz/services/api/brands/getBrands?city_id="+id+"&location_id="+lid, {
            headers: { 
              "Content-Type": "application/json",
              "accept": "*/*",
            //   "Authorization": "Bearer "+token 
            }
          })
          .then(response => {
            return response.data;
          });
        },
        getBrandproducts(reqbody,locationid){
          return axios
          .get(this.url +"bizkingz/services/api/brands/getBrandsProducts?brand_id="+reqbody+"&location_id="+locationid, {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
            //   "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
        },
        postPurchaseorder(reqbody){
          return axios
          .post(this.url +"bizkingz/services/api/purchase/createOrder",reqbody, {
            // withCredentials: true,
            headers: {
              "Content-Type": "application/json",
         
            }
          })
          .then(response => {
            return response.data;
          })
          .catch(err => { 
            console.log('check tick',err);
            return err.response;
          }); 
        },
        getPurchaseorder(cityId,locationid){
          return axios
          .get(this.url +"bizkingz/services/api/purchase/getPurchaseOrders?&city_id="+cityId+"&location_id="+locationid, {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
            //   "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
        },
        postupdatePurchaseorder(reqbody){
          return axios
          .post(this.url +"bizkingz/services/api/purchase/updateOrder",reqbody, {
            // withCredentials: true,
            headers: {
              "Content-Type": "application/json",
         
            }
          })
          .then(response => {
            return response.data;
          })
          .catch(err => {
            console.log('check tick',err);
            return err.response;
          });
        },
        getInputstock(request){
          return axios
          .get(this.url +"bizkingz/services/api/purchase/getPurchaseOrderDetails?po_id="+request, {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
            //   "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
        },
        PostInputstock(reqdata){
          return axios
          .post(this.url +"bizkingz/services/api/warehouse/inputStock",reqdata, {
            // withCredentials: true,
            headers: {
              "Content-Type": "application/json",
         
            }
          })
          .then(response => {
            return response.data;
          })
          .catch(err => {
            console.log('check tick',err);
            return err.response;
          });
        },
        getSalesorders(reqbody,cityid,locationid){
          return axios
          .get(this.url +"bizkingz/services/api/sales/getSalesOrders?so_status="+reqbody+"&city_id="+cityid+"&location_id="+locationid, {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
            //   "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          })
          .catch(err => {
            console.log('check tick',err);
            return err.response;
          });
        },
        getOutputSalesorders(){
          return axios
          .get(this.url +"bizkingz/services/api/sales/getAckSalesOrders", {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
            //   "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          })
          .catch(err => {
            console.log('check tick',err);
            return err.response;
          });
        },
        getOutputstock(request,cityid){
          return axios
          .get(this.url +"bizkingz/services/api/sales/getSalesOrderDetails?so_id="+request+"&city_id="+cityid, {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
            //   "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
        },
        getPurchasePDF(reqbody){
          return axios
          .get(this.url +"bizkingz/services/api/purchase/createPopdf?po_id="+reqbody, {
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
              
            },
            // responseType: 'blob',
          })
          .then(response => {
            return response;
            // responseType: 'blob',
          })
          .catch(err => {
            return err.response;
          });
        },
        postOutputstock(reqbody){
          return axios
          .post(this.url +"bizkingz/services/api/warehouse/outputStock",reqbody, {
            // withCredentials: true,
            headers: {
              "Content-Type": "application/json",
         
            }
          })
          .then(response => {
            return response.data;
          })
          .catch(err => {
            console.log('check tick',err);
            return err.response;
          });
        },
        getAllstocks(cityid,locationid){
          return axios
          .get(this.url +"bizkingz/services/api/warehouse/stock?city_id="+cityid+"&location_id="+locationid, {
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
              
            },
            // responseType: 'blob',
          })
          .then(response => {
            return response;
            // responseType: 'blob',
          })
          .catch(err => {
            return err.response;
          });
        },
        posttandc(reqbody){
          return axios
          .post(this.url +"bizkingz/services/api/services/addTnC",reqbody, {
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
              
            },
            // responseType: 'blob',
          })
          .then(response => {
            return response;
            // responseType: 'blob',
          })
          .catch(err => {
            return err.response;
          });
        },
        getrtvproducts(){
          return axios
          .get(this.url +"bizkingz/services/api/warehouse/getRtvProducts", {
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
              
            },
            // responseType: 'blob',
          })
          .then(response => {
            return response;
            // responseType: 'blob',
          })
          .catch(err => {
            return err.response;
          });
        },

        editrtvproducts(reqbody){
          return axios
          .post(this.url +"bizkingz/services/api/warehouse/changeRtvStatus",reqbody, {
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
              
            },
            // responseType: 'blob',
          })
          .then(response => {
            return response;
            // responseType: 'blob',
          })
          .catch(err => {
            return err.response;
          });
        },

        getMerchants(id){
          return axios
          .get(this.url +"bizkingz/services/api/merchants/getMerchants?city_id="+id, {
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",              
            },
            // responseType: 'blob',
          })
          .then(response => {
            return response;
            // responseType: 'blob', 
          })
          .catch(err => {
            return err.response;
          });
        },

        getMerchantproductsstock(reqbody){
          return axios
          .get(this.url +"bizkingz/services/api/merchants/stock?merchant_id="+reqbody, {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
            //   "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data;
          });
        },
        getMerchantdetails(){
          return axios
          .get(this.url +"bizkingz/services/api/merchants/getMerchants", {
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
              
            },
            // responseType: 'blob',
          })
          .then(response => {
            return response;
            // responseType: 'blob', 
          })
          .catch(err => {
            return err.response;
          });
        },
        getmerchantproducts(reqbody){
          return axios
          .get(this.url +"bizkingz/services/api/merchants/getSalesMerchantProducts?merchant_id="+reqbody, {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
            //   "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data; 
          });
        },
        getmerchantsawise(reqbody){
          return axios
          .get(this.url +"bizkingz/services/api/routes/getSalesMerchants?user_id="+reqbody, {
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
            //   "Authorization": "Bearer "+token
            }
          })
          .then(response => {
            return response.data; 
          });
        },
        getmerchantbrandproducts(reqbody,id){
          return axios
          .get(this.url +"bizkingz/services/api/brands/getAllBrandProducts?merchant_id="+reqbody+"&location_id="+id, {
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
              
            },
            // responseType: 'blob',
          })
          .then(response => {
            return response;
            // responseType: 'blob', 
          })
          .catch(err => {
            return err.response;
          });
        },
        postmerchantbrandproducts(reqbody){
          return axios
          .post(this.url +"bizkingz/services/api/merchants/addProducts",reqbody, {
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
              
            },
            // responseType: 'blob',
          })
          .then(response => {
            return response;
            // responseType: 'blob', 
          })
          .catch(err => {
            return err.response;
          });
        },
        getsalesperson(){
          return axios
          .get(this.url +"bizkingz/services/api/users/getAllUsers", { 
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
              
            },
            // responseType: 'blob',
          })
          .then(response => {
            return response;
            // responseType: 'blob', 
          })
          .catch(err => {
            return err.response;
          });
        },
        addOnboardmerchant(reqbody){
          return axios
          .post(this.url +"bizkingz/services/api/merchants/addMerchant",reqbody, {
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json",
              
            },
            // responseType: 'blob',
          })
          .then(response => {
            return response;
            // responseType: 'blob', 
          })
          .catch(err => {
            return err.response;
          });
        },
     
          getMerchantdetailsdata(reqbody){
            return axios
            .get(this.url +"bizkingz/services/api/merchants/getMerchantDetails?merchant_id="+reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
         updateMerchantdetailsdata(reqbody){
            return axios
            .post(this.url +"bizkingz/services/api/merchants/updateMerchantDetails",reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          Addbranddata(reqbody){
            return axios
            .post(this.url +"bizkingz/services/api/brands/addBrand",reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          Addbrandproductdata(reqbody){
            return axios
            .post(this.url +"bizkingz/services/api/brands/addBrandProduct",reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          getProducts(id){
            return axios
            .get(this.url +"bizkingz/services/api/brands/getProducts?city_id="+id, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          updateProducts(reqbody){
            return axios
            .post(this.url +"bizkingz/services/api/brands/updateBrandProduct",reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          updateBrands(reqbody){
            return axios
            .post(this.url +"bizkingz/services/api/brands/updateBrand",reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
         
          storestocksreport(id,filter,startdate,enddate,cityid){
            return axios
            .get(this.url +"bizkingz/services/api/reports/merchant_sales?merchant_id="+id+"&date_filter="+filter+"&start_date="+startdate+"&end_date="+enddate+"&city_id="+cityid, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
         salesstocksreport(id,filter,startdate,enddate,cityid){
            return axios
            .get(this.url +"bizkingz/services/api/reports/sales_orders?type="+id+"&date_filter="+filter+"&start_date="+startdate+"&end_date="+enddate+"&city_id="+cityid, {
              // headers: {
              //   "accept": "*/*",
              //   "Content-Type": "application/json",
                
              // },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          grnsalesstocksreport(id,filter,startdate,enddate,cityid){
            return axios
            .get(this.url +"bizkingz/services/api/reports/getGrnSalesOrders?type="+id+"&date_filter="+filter+"&start_date="+startdate+"&end_date="+enddate+"&city_id="+cityid, {
              // headers: {
              //   "accept": "*/*",
              //   "Content-Type": "application/json",
                
              // },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },

          saveLead(reqbody){
            return axios
            .post(this.url +"bizkingz/services/api/leads/createLead",reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          getLeads(){
            return axios
            .get(this.url +"bizkingz/services/api/leads/viewLeadsWeb", {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          updateLeads(reqbody){
            return axios
            .get(this.url +"bizkingz/services/api/leads/getLeadDetails?lead_id="+reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          getMerchantstocksreport(reqbody,cityid){
            return axios
            .get(this.url +"bizkingz/services/api/reports/store_stock?merchant_id="+reqbody+"&city_id="+cityid, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          getBrandreports(reqbody,cityid){
            return axios
            .get(this.url +"bizkingz/services/api/reports/warehouse_stock?brand_id="+reqbody+"&city_id="+cityid, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          getBrandsallreport(reqbody,cityid){
            return axios
            .get(this.url +"bizkingz/services/api/reports/brand_products?brand_id="+reqbody+"&city_id="+cityid, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          getMProductsreport(reqbody,cityid){
            return axios
            .get(this.url +"bizkingz/services/api/reports/merchant_products?merchant_id="+reqbody+"&city_id="+cityid, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
         getPurchasesorderreport(type,filter,startdate,enddate,cityid){
            return axios
            .get(this.url +"bizkingz/services/api/reports/purchase_orders?type="+type+"&date_filter="+filter+"&start_date="+startdate+"&end_date="+enddate+"&city_id="+cityid, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          getUserstorereport(reqbody){
            return axios
            .get(this.url +"bizkingz/services/api/reports/userStoreLogin?user_id="+reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          updateLead(reqbody){
            return axios
            .post(this.url +"bizkingz/services/api/leads/updateLead",reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          AddLeadInfo(reqbody){
            return axios
            .post(this.url +"bizkingz/services/api/leads/addLeadInfo",reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          UpdateLeadInfo(reqbody){
            return axios
            .post(this.url +"bizkingz/services/api/leads/updateLeadInfo",reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          getOppertunities(){
            return axios
            .get(this.url +"bizkingz/services/api/opportunities/getAllOpportunities", {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          Cancelpurchaseorder(reqbody){
            return axios
            .post(this.url +"bizkingz/services/api/purchase/cancel",reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          getMerchantpayments(reqbody){
            return axios
            .get(this.url +"bizkingz/services/api/accounts/getDeliveredSales?merchant_id="+reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
             getOppertunitydetails(reqbody){
            return axios
            .get(this.url +"bizkingz/services/api/opportunities/getAllOpportunityDetails?opportunity_id="+reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          updateOppertunitydetails(reqbody){
            return axios
            .post(this.url +"bizkingz/services/api/opportunities/updateOpportunity",reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          AddOppertunityinfo(reqbody){
            return axios
            .post(this.url +"bizkingz/services/api/opportunities/addOpportunityInfo",reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          Changepasswords(reqbody){
            return axios
            .post(this.url +"bizkingz/services/api/users/changePassword",reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          }, 
          Quotesdata(){
            return axios
            .get(this.url +"bizkingz/services/api/quotes/products", {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          getoppQuotesdata(id){
            return axios
            .get(this.url +"bizkingz/services/api/quotes/products?opportunity_id="+id, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          saveoppQuotesdata(reqdata){
            return axios
            .post(this.url +"bizkingz/services/api/quotes/send",reqdata, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          getSalesmerchant(reqbody){
            return axios
            .get(this.url +"bizkingz/services/api/merchants/getSalesMerchants?user_id="+reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          GSTinvoicewise(startdate,enddate,cityid){
            return axios
            .get(this.url +"bizkingz/services/api/reports/getGSTData?start_date="+startdate+"&end_date="+enddate+"&city_id="+cityid, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          GSTproductwise(startdate,enddate,cityid){
            return axios
            .get(this.url +"bizkingz/services/api/reports/getGSTProductsData?start_date="+startdate+"&end_date="+enddate+"&city_id="+cityid, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          Merchantpayments(person,id,startdate,enddate,cityid){
            return axios
            .get(this.url +"bizkingz/services/api/reports/merchant_payments_so?sales_person="+person+"&merchant_id="+id+"&start_date="+startdate+"&end_date="+enddate+"&city_id="+cityid, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          Merchantpaymentsoverall(person,id,startdate,enddate,cityid){
            return axios
            .get(this.url +"bizkingz/services/api/reports/merchant_payments_overall?sales_person="+person+"&merchant_id="+id+"&start_date="+startdate+"&end_date="+enddate+"&city_id="+cityid, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          Getsalesperson(city,location){
            return axios
            .get(this.url +"bizkingz/services/api/sales/delivery_persons?city_id="+city+"&location_id="+location, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          UpdateUnholddata(reqdata){
            return axios
            .post(this.url +"bizkingz/services/api/sales/so_update",reqdata, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          CancelUnholddata(id){
            return axios
            .get(this.url +"bizkingz/services/api/sales/so_cancel?so_id="+id, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          Merchantreports(cityid){
            return axios
            .get(this.url +"bizkingz/services/api/reports/merchants?city_id="+cityid, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          attachmentsdata(reqbody){
            return axios
            .get(this.url +"bizkingz/services/api/quotes/quotations?opportunity_id="+reqbody, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
         Leadreports(cityid){
            return axios
            .get(this.url +"bizkingz/services/api/reports/leads?city_id="+cityid, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          Opportunityreports(cityid){
            return axios
            .get(this.url +"bizkingz/services/api/reports/opportunities?city_id="+cityid, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          Locationdata(){
            return axios
            .get(this.url +"bizkingz/services/api/cities/getAll", {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
            
            })
            .then(response => {
              return response;
          
            })
            .catch(err => {
              return err.response;
            });
          },
          getCitylocation(id){
            return axios
            .post(this.url +"bizkingz/services/api/locations/getAll?city_id="+id, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          updateMerchantstock(id){
            return axios
            .post(this.url +"bizkingz/services/api/merchants/updateMerchantStock",id, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          getCreditnote(id){
            return axios
            .get(this.url +"bizkingz/services/api/accounts/creditNote/"+id, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
            
            })
            .then(response => {
              return response;
          
            })
            .catch(err => {
              return err.response;
            });
          },
          getReturnsalesorders(id){
            return axios
            .get(this.url +"bizkingz/services/api/accounts/getReturnSalesOrders?merchant_id="+id, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
            
            })
            .then(response => {
              return response;
          
            })
            .catch(err => {
              return err.response;
            });
          },
          getinvoiceorders(id){
            return axios
            .get(this.url +"bizkingz/services/api/accounts/getInvoiceSalesOrders?merchant_id="+id, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
            
            })
            .then(response => {
              return response;
          
            })
            .catch(err => {
              return err.response;
            });
          },
          saveCreditnote(id){
            return axios
            .post(this.url +"bizkingz/services/api/accounts/creditNoteNew",id, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          salesMerchantProducts(id){
            return axios
            .get(this.url +"bizkingz/services/api/merchants/getSalesMerchantProducts?merchant_id="+id, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
            
            })
            .then(response => {
              return response;
          
            })
            .catch(err => {
              return err.response;
            });
          },
          getStcksdata(id){
            return axios
            .get(this.url +"bizkingz/services/api/orders/stock_details?merchant_id="+id, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
            
            })
            .then(response => {
              return response;
          
            })
            .catch(err => {
              return err.response;
            });
          },
          saveSorder(id){
            return axios
            .post(this.url +"bizkingz/services/api/sales/createOrder",id, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          saveRoute(id){
            return axios
            .post(this.url +"bizkingz/services/api/routes/addPlans",id, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          getGRN(cid,lid){
            return axios
            .get(this.url +"bizkingz/services/api/sales/getGrnSalesOrders?city_id="+cid+"&location_id="+lid, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                 
              },
            
            })
            .then(response => {
              return response;
          
            })
            .catch(err => {
              return err.response;
            });
          },
          createInvoice(id){
            return axios
            .get(this.url +"bizkingz/services/api/warehouse/createInvoice/"+id, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          getSalesassociate(cityid){
            return axios
            .get(this.url +"bizkingz/services/api/routes/getSalesPersons?city_id="+cityid, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          getSalesmerchant(id){
            return axios
            .get(this.url +"bizkingz/services/api/merchants/getSalesMerchants?user_id="+id, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
          viewroutes(id){
            return axios
            .get(this.url +"bizkingz/services/api/routes/viewRoutes?user_id="+id, {
              headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
                
              },
              // responseType: 'blob',
            })
            .then(response => {
              return response;
              // responseType: 'blob', 
            })
            .catch(err => {
              return err.response;
            });
          },
    }
}