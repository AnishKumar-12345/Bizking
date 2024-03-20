import axios from "axios";

export default { 
    data(){
        return{
            url:'http://103.211.218.32/'
        }
    },
    methods:{
        getBrands(){
            return axios
          .get(this.url +"bizkingz/services/api/brands/getBrands", {
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
        getBrandproducts(reqbody){
          return axios
          .get(this.url +"bizkingz/services/api/brands/getBrandsProducts?brand_id="+reqbody, {
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
        getPurchaseorder(userid,userrole){
          return axios
          .get(this.url +"bizkingz/services/api/purchase/getPurchaseOrders?user_id="+userid+"&user_role="+userrole, {
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
        getSalesorders(){
          return axios
          .get(this.url +"bizkingz/services/api/sales/getSalesOrders", {
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
        getOutputstock(request){
          return axios
          .get(this.url +"bizkingz/services/api/sales/getSalesOrderDetails?so_id="+request, {
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
        getAllstocks(){
          return axios
          .get(this.url +"bizkingz/services/api/warehouse/stock", {
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
        getMerchants(){
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
        getmerchantbrandproducts(reqbody){
          return axios
          .get(this.url +"bizkingz/services/api/brands/getAllBrandProducts?merchant_id="+reqbody, {
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
          getProducts(){
            return axios
            .get(this.url +"bizkingz/services/api/brands/getProducts", {
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
         
          storestocksreport(id,filter,startdate,enddate){
            return axios
            .get(this.url +"bizkingz/services/api/reports/merchant_sales?merchant_id="+id+"&date_filter="+filter+"&start_date="+startdate+"&end_date="+enddate, {
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
         salesstocksreport(id){
            return axios
            .get(this.url +"bizkingz/services/api/reports/sales_orders?type="+id, {
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
          getMerchantstocksreport(reqbody){
            return axios
            .get(this.url +"bizkingz/services/api/reports/store_stock?merchant_id="+reqbody, {
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
          getBrandreports(reqbody){
            return axios
            .get(this.url +"bizkingz/services/api/reports/warehouse_stock?brand_id="+reqbody, {
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
          getBrandsallreport(reqbody){
            return axios
            .get(this.url +"bizkingz/services/api/reports/brand_products?brand_id="+reqbody, {
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
          getMProductsreport(reqbody){
            return axios
            .get(this.url +"bizkingz/services/api/reports/merchant_products?merchant_id="+reqbody, {
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
         getPurchasesorderreport(type,filter,startdate,enddate){
            return axios
            .get(this.url +"bizkingz/services/api/reports/purchase_orders?type="+type+"&date_filter="+filter+"&start_date="+startdate+"&end_date="+enddate, {
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
    }
}