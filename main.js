module.exports = {
  /**
   * @param {string} apiToken Cloudshark API token
   * @param {BinaryData} data Abinary stream of data that is the contents of the file.
   * @param {string} filename Specify the filename of the capture in CloudShark
   * @param {string} comments File-level comments
   * @param {Array} tagArr Array of tags to apply to the capture file
   */
  upload: function (apiToken, data, filename, comments, tagArr) {
    try {
      var tagStr = String(tagArr);
      const myUrlWithParams = new URL(
        `https://www.cloudshark.org/api/v1/${apiToken}/upload`
      );

      if (tagStr) {
        myUrlWithParams.searchParams.append("additional_tags", tagStr);
      }
      if (filename) {
        myUrlWithParams.searchParams.append("filename", filename);
      }
      if (comments) {
        myUrlWithParams.searchParams.append("comments", comments);
      }

      let options = {
        method: "PUT",
        body: data,
      };

      return fetch(myUrlWithParams.href, options)
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    } catch (error) {
      throw new Error(error);
    }
  },
  /**
   * @param {string} apiToken Cloudshark API token
   * @param {str} cid Specified CloudShark capture session id
   */
  info: function (apiToken, cid) {
    try {
      let options = {
        method: "GET",
      };

      return fetch(
        `https://www.cloudshark.org/api/v1/${apiToken}/info/${cid}`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    } catch (error) {
      throw new Error(error);
    }
  },
  /**
   * @param {string} apiToken Cloudshark API token
   * @param {str} cid Specified CloudShark capture session id
   */
  getAnnotations: function (apiToken, cid) {
    try {
      let options = {
        method: "GET",
      };

      return fetch(
        `https://www.cloudshark.org/api/v1/${apiToken}/annotations/${cid}`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    } catch (error) {
      throw new Error(error);
    }
  },
  /**
   * @param {string} apiToken Cloudshark API token
   * @param {str} cid Specified CloudShark capture session id
   * @param {str} frame Specified individual packets within a specific capture file
   * @param {str} text Annontation text to add
   * @param {boolean} quiet Quiet parameter. Will return only a 204 No Content if set to true.
   */
  addAnnotations: async function (apiToken, cid, frame, text, quiet = false) {
    try {
      const myUrlWithParams = new URL(
        `https://www.cloudshark.org/api/v1/${apiToken}/annotations/${cid}`
      );

      if (frame) {
        myUrlWithParams.searchParams.append("frame", frame);
      }
      if (text) {
        myUrlWithParams.searchParams.append("text", text);
      }
      if (quiet) {
        myUrlWithParams.searchParams.append("quiet", quiet);
      }

      let options = {
        method: "POST",
      };

      return fetch(myUrlWithParams.href, options)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 204) {
            return response.status;
          }
        })
        .then((data) => {
          return data;
        });
    } catch (error) {
      throw new Error(error);
    }
  },
  /**
   * @param {string} apiToken Cloudshark API token
   * @param {string} filename Specify the filename of the capture in CloudShark
   * @param {Array} cidArr Array of cid to merge into a new capture file
   * @param {Array} tagArr Array of tags to apply to the capture file
   * @param {str} duplicates Duplicates parameter. Set to remove to eliminate duplicate packets.
   */
  merge: function (apiToken, filename, cidArr, tagArr, duplicates = null) {
    try {
      var cidStr = String(cidArr);
      var tagStr = String(tagArr);

      const myUrlWithParams = new URL(
        `https://www.cloudshark.org/api/v1/${apiToken}/merge`
      );

      if (duplicates !== "remove") {
        duplicates = null;
      }

      if (cidStr) {
        myUrlWithParams.searchParams.append("capture_ids", cidStr);
      }
      if (tagStr) {
        myUrlWithParams.searchParams.append("additional_tags", tagStr);
      }
      if (filename) {
        myUrlWithParams.searchParams.append("filename", filename);
      }
      if (duplicates) {
        myUrlWithParams.searchParams.append("duplicates", duplicates);
      }

      let options = {
        method: "POST",
      };
      return fetch(myUrlWithParams.href, options)
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    } catch (error) {
      throw new Error(error);
    }
  },
  /**
   * @param {string} apiToken Cloudshark API token
   * @param {str} cid Specified CloudShark capture session id
   */
  delete: function (apiToken, cid) {
    try {
      let options = {
        method: "POST",
      };

      return fetch(
        `https://www.cloudshark.org/api/v1/${apiToken}/delete/${cid}`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    } catch (error) {
      throw new Error(error);
    }
  },
  /**
   * @param {string} apiToken Cloudshark API token
   * @param {str} cid Specified CloudShark capture session id
   */
  download: async function (apiToken, cid) {
    try {
      let options = {
        method: "GET",
      };

      const response = await fetch(
        `https://www.cloudshark.org/api/v1/${apiToken}/download/${cid}`,
        options
      );

      if (!response.ok) {
        throw new Error(response);
      }

      // Extract filename from header
      const filename = response.headers
        .get("content-disposition")
        .split(";")
        .find((n) => n.includes("filename="))
        .replace("filename=", "")
        .trim();

      var output = {
        filename: filename,
        data: response.body,
      };
      return output;
    } catch (error) {
      throw new Error(error);
    }
  },
};
