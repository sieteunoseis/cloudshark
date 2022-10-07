const ciscoDime = require("cisco-dime");
const fse = require("fs-extra");
const FormData = require('form-data');
const path = require('path');

const cloudSharkApiToken = '7cca82d38b8f2d71aac546033eb939d1';

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
    `https://www.cloudshark.org/api/v1/${cloudSharkApiToken}/upload`,
    options
  ).then(async (response) => {
    console.log(response)
  })

  
})();

