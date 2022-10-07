const ciscoDime = require("cisco-dime");
const fse = require("fs-extra");
const FormData = require('form-data');
const path = require('path');

const cloudSharkApiToken = '7cca82d38b8f2d71aac546033eb939d1';

const encode = (str) =>
encodeURIComponent(str)
.replace(/\-/g, '%2D')
.replace(/\_/g, '%5F')
.replace(/\./g, '%2E')
.replace(/\!/g, '%21')
.replace(/\~/g, '%7E')
.replace(/\*/g, '%2A')
.replace(/\'/g, '%27')
.replace(/\(/g, '%28')
.replace(/\)/g, '%29');

console.log(encode("test.cap"))

(async () => {
  let output = await ciscoDime
  .getOneFile(
    "cucm01-pub.automate.builders",
    "administrator",
    "h0mel@b",
    "/var/log/active/platform/cli/cloudshark.cap0"
  )
  .catch((err) => {
    console.log(err);
  });

  let options = {
    method: "PUT",
    body: output.data
  }


  fetch(
    `https://www.cloudshark.org/api/v1/${cloudSharkApiToken}/upload?comments=captured+from+NOC+23&filename=test%2Ecap`,
    options
  ).then(async (response) => {
    console.log(response)
  })

  
})();

