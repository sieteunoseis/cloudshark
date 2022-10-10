const cloudSharkApiToken = process.env.CLOUDSHARKTOKEN;
const cloudshark = require("../main");
const { writeFile } = require("fs").promises;
var fs = require("fs");
var path = require("path");

(async () => {
  var cidArr = [];
  var tagsArr = ["node", "test", "http", "request"];

  console.log("Reading in http.cap file and uploading to Cloudshark");
  var readStream01 = fs.createReadStream(path.join(__dirname, "http.cap"));
  var uploadHttpPacket = await cloudshark.upload(
    cloudSharkApiToken,
    readStream01,
    "http.cap",
    "A simple HTTP request and response.",
    tagsArr
  );

  if (uploadHttpPacket) {
    console.log("Successsfully uploaded", uploadHttpPacket.filename);
    cidArr.push(uploadHttpPacket.id);
  }

  console.log("Adding annotation to packet #4, with quiet set to false");
  var addAnnotation01 = await cloudshark.addAnnotations(
    cloudSharkApiToken,
    cidArr[0],
    "4",
    "Request for download.html",
    false
  );
  console.log("Successfully added annotation", addAnnotation01);
  console.log(
    "Adding annotation to packet #5, with quiet set to true. API will return 204 status message"
  );
  var addAnnotation02 = await cloudshark.addAnnotations(
    cloudSharkApiToken,
    cidArr[0],
    "13",
    "DNS packet, need to review",
    true
  );
  console.log(addAnnotation02);
  console.log("Retrieving all annotations from packet capture");
  var getAnnotations = await cloudshark.getAnnotations(
    cloudSharkApiToken,
    cidArr[0]
  );
  console.log(getAnnotations);

  console.log("Reading in http_gzip.cap file and uploading to Cloudshark");
  var readStream02 = fs.createReadStream(path.join(__dirname, "http_gzip.cap"));
  tagsArr.push("GZIP");
  var uploadHttpGzipPacket = await cloudshark.upload(
    cloudSharkApiToken,
    readStream02,
    "http_gzip.cap",
    "A simple HTTP request with a one packet gzip Content-Encoded response.",
    tagsArr
  );

  if (uploadHttpGzipPacket) {
    console.log("Successsfully uploaded", uploadHttpGzipPacket.filename);
    cidArr.push(uploadHttpGzipPacket.id);
  }
  console.log(
    "Merging http.cap and http_gzip.cap into one capture. Duplicate flag not set."
  );
  var merged = await cloudshark.merge(
    cloudSharkApiToken,
    "merged.cap",
    cidArr,
    tagsArr
  );
  console.log("Succesfully merged captures", merged);

  console.log("Retrieve info from merged packet");
  var info = await cloudshark.info(cloudSharkApiToken, merged.id);
  console.log(info);
  console.log("Download merged packet from Cloudshark");
  var output = await cloudshark.download(cloudSharkApiToken, merged.id);
  await writeFile(output.filename, output.data);
  console.log("Delete merged packet from Cloudshark");
  var deletePacket = await cloudshark.delete(cloudSharkApiToken, merged.id);
  console.log(deletePacket);
  console.log("Done!");
})();
