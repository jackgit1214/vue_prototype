const uuidV1 = require("uuid/v1");

const uuidUtils = {
  getUUID: function () {
    return uuidV1();
  },
  getUUID_NoLine() {
    let tmpuuid = uuidV1();

    return tmpuuid.replace(/-/g, "");
  }
}
export {
  uuidUtils
}
