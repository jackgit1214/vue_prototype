 const baseUrl = "http://127.0.0.1:8080/museum/";

 const depotDataUrl = "/public/test/getDepotdata";
 const depotDeleteUrl = "/public/test/deleteDepot";
 const depotRootSuperId = "ABC";

 const depotRootKey = "000";

 export {
   depotRootSuperId,
   depotRootKey
 };
 import $http from "@/common/fetch";

 let store = {

   getDepotdata: function (superId, callback) {
     let tmpurl = baseUrl + depotDataUrl;
     let tmpId = superId;
     if (superId == undefined || superId == null || superId === "")
       tmpId = depotRootSuperId;
     $http.post(tmpurl, {
       id: tmpId
     }).then(res => {
       callback(res.data);
     });
   },
   deleteData: function (id, callback) {
     let tmpurl = baseUrl + depotDeleteUrl;
     $http.post(tmpurl, {
       id: id
     }).then(res => {
       if (res.code == "200") {
         callback();
       }
     });

   }
 }

 export default store;
