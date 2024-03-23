// import React, { useState } from 'react';
// import { useSession } from 'next-auth/react';

// import styles from '../../../styles/main/Warden/FileUploadForm.module.css';

// const FileUploadForm = () => {
//   const [file, setFile] = useState(null);
//   const [error, setError] = useState('');
//   const session = useSession();

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     const allowedTypes = [
//       'application/vnd.ms-excel',
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//     ];

//     if (selectedFile && allowedTypes.includes(selectedFile.type)) {
//       setFile(selectedFile);
//       setError('');
//     } else {
//       setFile(null);
//       setError('Please select a valid Excel file.');
//     }
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a file to upload.');
//       return;
//     }

//     console.log(e.target[0].files[0]);

//     const formData = new FormData();
//     formData.append('file', file);
//     console.log(formData);

//     try {
//       const response = await fetch('/api/v1/student/hostelupload', {
//         method: 'POST',
//         headers: {
//           authorization: 'Bearer ' + session.data.user.token,
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         console.log('res', response);
//         const data = await response.json();
//         console.log('data', data);
//         return;
//       }

//       console.log('File uploaded successfully');
//     } catch (error) {
//       console.log('Error uploading file:', error);
//     }
//   };

//   return (
//     <div className={`${styles.formDiv}`}>
//       <form onSubmit={handleUpload}>
//         <input
//           type='file'
//           name='file'
//           onChange={handleFileChange}
//           className={`${styles.input}`}
//         />
//         {error && <div className={`${styles.error}`}>{error}</div>}
//         <button className={`${styles.button}`}>Upload</button>
//       </form>
//     </div>
//   );
// };

// export default FileUploadForm;

import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import * as XLSX from "xlsx";

import styles from "../../../styles/main/Warden/FileUploadForm.module.css";

const UploadForm = () => {
  const session = useSession();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [stdList, setStdList] = useState(null);
  const [loading, setLoading] = useState(false);
  const uploadRef = useRef();

  const fileChangeHandler = (event) => {
    let file = event.target.files[0];
    let isValidFile = checkMimeType(file);

    if (isValidFile) {
      setSelectedFile(file);
      setIsValid(true);

      console.log("checking");

      const reader = new FileReader();
      reader.readAsBinaryString(event.target.files[0]);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        setStdList(parsedData);
      };
    } else {
      setSelectedFile(null);

      setIsValid(false);
    }
  };

  const checkMimeType = (file) => {
    const allowedTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (allowedTypes.includes(file.type)) {
      return true;
    } else {
      return false;
    }
  };

  async function uploadFileHandler() {
    const res = await fetch("/api/v1/student/hostelupload", {
      method: "POST",
      body: JSON.stringify(stdList),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session.data.user.token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.message || "Something went wrong!");
      return;
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    await uploadFileHandler();
    setLoading(false);
  };

  return (
    <div className={styles.cont}>
      <form onSubmit={submitHandler} className={styles.form}>
        {!isValid && (
          <p style={{ color: "red" }}>
            Please select a valid image file (JPEG/JPG/PNG).
          </p>
        )}

        <input
          type="file"
          id="uploadButton"
          ref={uploadRef}
          onChange={fileChangeHandler}
          className={styles.input}
        />
        <div className={`${styles.inputDiv}`}>
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              document.getElementById("uploadButton").click();
            }}
          >
            Select
          </button>
          {selectedFile && <h3>{selectedFile.name}</h3>}
        </div>
        <div>
          <button
            type="submit"
            disabled={!isValid || !selectedFile}
            className={styles.button}
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
