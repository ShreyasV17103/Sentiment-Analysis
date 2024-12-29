import axios from "axios";
import React, { useState } from "react";
import ChartDisplay from "./chartdisplay";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async () => {
        if (!file) return alert("Please select a file");
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/analyze",
                formData,
                {
                    headers: {
                        "Authorization": "Bearer mysecureapikey",
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setData(response.data);
        } catch (error) {
            alert("Error uploading file");
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {data && <ChartDisplay data={data} />}
        </div>
    );
};

export default FileUpload;
