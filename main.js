// const ciscoDime = require("cisco-dime");

const cloudSharkApiToken = '7cca82d38b8f2d71aac546033eb939d1';

const cloudshark = require("./js/cloudshark");
const {
  writeFile
} = require('fs').promises;


(async () => {

  cidArr = ["1cd5e79ddf36", "480d615cdd49"]
  tagsArr = ["cisco", "test", "node"]
  // cloudshark.getAnnotations(cloudSharkApiToken,"1cd5e79ddf36")
  cloudshark.addAnnotations(cloudSharkApiToken,"1cd5e79ddf36","8","packet 8",true)
  // cloudshark.merge(cloudSharkApiToken, cidArr, tagsArr, "test.cap", "remove")
  // cloudshark.upload(cloudSharkApiToken,"data",tagsArr,"test.cap","This is the best comment ever.")
  // cloudshark.info(cloudSharkApiToken,"865eb44d6ce6")
  // cloudshark.delete(cloudSharkApiToken,"865eb44d6ce6")
  // var output = await cloudshark.download(cloudSharkApiToken,"865eb44d6ce6")
  // await writeFile(output.filename, output.data);
  // console.log('Done!');
})();


// (async () => {
//   let output = await ciscoDime
//   .getOneFile(
//     "cucm01-pub.automate.builders",
//     "administrator",
//     "h0mel@b",
//     "/var/log/active/platform/cli/cloudshark.cap0"
//   )
//   .catch((err) => {
//     console.log(err);
//   });

//   let options = {
//     method: "PUT",
//     body: output.data
//   }


//   fetch(
//     `https://www.cloudshark.org/api/v1/${cloudSharkApiToken}/upload?comments=captured+from+NOC+23&filename=test%2Ecap`,
//     options
//   ).then(async (response) => {
//     console.log(response)
//   })


// })();