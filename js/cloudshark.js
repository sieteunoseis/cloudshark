module.exports = {
        upload: function (apiToken, data, tagArr = [], filename, comments) {
            try {
                var tagStr = String(tagArr)
                const myUrlWithParams = new URL(`https://www.cloudshark.org/api/v1/${apiToken}/upload`);

                (tagStr ? myUrlWithParams.searchParams.append("additional_tags", tagStr) : '');
                (filename ? myUrlWithParams.searchParams.append("filename", filename) : '');
                (comments ? myUrlWithParams.searchParams.append("comments", comments) : '');

                let options = {
                    method: "PUT",
                    body: data
                }

                fetch(
                    myUrlWithParams.href,
                    options
                ).then(async (response) => {
                    console.log(response)
                })

            } catch (error) {
                throw new Error(error);
            }

        },
        info: function (apiToken, cid) {
            try {
                let options = {
                    method: "GET",
                }

                fetch(
                        `https://www.cloudshark.org/api/v1/${apiToken}/info/${cid}`,
                        options
                    ).then((response) => response.json())
                    .then((data) => console.log(data));
            } catch (error) {
                throw new Error(error);
            }
        },
        getAnnotations: function (apiToken, cid) {
            try {
                let options = {
                    method: "GET",
                }

                fetch(
                        `https://www.cloudshark.org/api/v1/${apiToken}/annotations/${cid}`,
                        options
                    ).then((response) => response.json())
                    .then((data) => console.log(data));
            } catch (error) {
                throw new Error(error);
            }
        },
        addAnnotations: async function (apiToken, cid, frame, text, quiet = false) {
            try {

                const myUrlWithParams = new URL(`https://www.cloudshark.org/api/v1/${apiToken}/annotations/${cid}`);

                (frame ? myUrlWithParams.searchParams.append("frame", frame) : '');
                (text ? myUrlWithParams.searchParams.append("text", text) : '');
                (quiet ? myUrlWithParams.searchParams.append("quiet", quiet) : '');

                let options = {
                    method: "POST",
                }

                fetch(
                    myUrlWithParams.href,
                    options
                ).then(response => {
                        if (response.status === 200) {
                            return response.json();
                        } else if (response.status === 204) {
                            return response.status;
                        }
                    })
                    .then(data => {
                        console.log(data)
                    });
                }
                catch (error) {
                    throw new Error(error);
                }
            },
            merge: function (apiToken, cidArr = [], tagArr = [], filename, duplicates) {
                    try {
                        var cidStr = String(cidArr)
                        var tagStr = String(tagArr)

                        const myUrlWithParams = new URL(`https://www.cloudshark.org/api/v1/${apiToken}/merge`);

                        if (duplicates !== "remove") {
                            duplicates = null;
                        }

                        (cidStr ? myUrlWithParams.searchParams.append("capture_ids", cidStr) : '');
                        (tagStr ? myUrlWithParams.searchParams.append("additional_tags", tagStr) : '');
                        (filename ? myUrlWithParams.searchParams.append("filename", filename) : '');
                        (duplicates ? myUrlWithParams.searchParams.append("duplicates", duplicates) : '');

                        let options = {
                            method: "POST",
                        }
                        fetch(
                                myUrlWithParams.href,
                                options
                            ).then((response) => response.json())
                            .then((data) => console.log(data));
                    } catch (error) {
                        throw new Error(error);
                    }
                },
                delete: function (apiToken, cid) {
                    try {
                        let options = {
                            method: "POST",
                        }

                        fetch(
                                `https://www.cloudshark.org/api/v1/${apiToken}/delete/${cid}`,
                                options
                            ).then((response) => response.json())
                            .then((data) => console.log(data));

                    } catch (error) {
                        throw new Error(error);
                    }
                },
                download: async function (apiToken, cid) {
                    try {
                        let options = {
                            method: "GET",
                        }

                        const response = await fetch(
                            `https://www.cloudshark.org/api/v1/${apiToken}/download/${cid}`,
                            options
                        )

                        if (!response.ok) {
                            throw new Error(response);
                        }

                        // Extract filename from header
                        const filename = response.headers.get('content-disposition')
                            .split(';')
                            .find(n => n.includes('filename='))
                            .replace('filename=', '')
                            .trim();

                        var output = {
                            filename: filename,
                            data: response.body
                        }
                        return output;

                    } catch (error) {
                        throw new Error(error);
                    }

                }
        }