import { data } from "autoprefixer";
import axios from "axios";
import React from "react";
import { ColorRing, Oval, RotatingLines } from "react-loader-spinner";

import { CircularProgress } from "@mui/material";

export default function FileUpload({ contract, walletAddress, provider }) {
  const [file, setFile] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const JWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiYjM1Y2U4Yi1mZjgwLTQ5OGQtYTk1OC0zNTg1N2UxNmI3YTciLCJlbWFpbCI6InBvbm5hbjIxMTJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjUwMjI2Y2Q3OWMyM2FlODliNmIzIiwic2NvcGVkS2V5U2VjcmV0IjoiZjJjMTRiOGRjYmU5NzJhYmU2ZDZjNmQzNjEzZjQwN2U3ZGM4ZjAxZmNhZTVjYjQ3M2Y3YzVmMmZiYmRlZGYxMyIsImV4cCI6MTc2ODQwODg4Nn0.EPm6mI5e34bbbhzX4wYMAt2QV7fo1GcmakEXs85xrPI";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!walletAddress) {
      alert("Please connect your wallet first");
      setIsLoading(false);
      return;
    }

    if (file) {
      console.log("trying to upload file");

      try {
        console.log("started uploading");

        const formData = new FormData();

        console.log(formData);
        formData.append("file", file);

        const pinataApiUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS";

        const apiKey = "50226cd79c23ae89b6b3";
        const apiSecret =
          "f2c14b8dcbe972abe6d6c6d3613f407e7dc8f01fcae5cb473f7c5f2fbbdedf13";

        const response = await axios.post(pinataApiUrl, formData, {
          headers: {
            pinata_api_key: apiKey,
            pinata_secret_api_key: apiSecret,
          },
        });
        const ipfsHash = response.data.IpfsHash;
        console.log("IPFS Hash: ", ipfsHash);

        contract
          .add(walletAddress, ipfsHash)
          .then((tx) => {
            console.log(tx);
            alert("Image Uploaded Successfully");
          })
          .catch((error) => {
            console.error(error);
            alert("Unable to upload Image");
          });
      } catch (error) {
        console.error(error);

        alert("Unable to upload Image");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const data = e.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
    };
    e.preventDefault();
  };
  return (
    <div className="flex">
      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        {/* <label htmlFor='imageInput'>Choose</label> */}
        <input
          type="file"
          id="imageInput"
          onChange={handleFileChange}
          disabled={!walletAddress}
        />
        {!isLoading ? (
          <button
            disabled={isLoading}
            className="p-2 px-4 border rounded-md hover:bg-black hover:bg-opacity-15 transition-all"
            type="submit"
          >
            Upload
          </button>
        ) : (
          <CircularProgress size={20} />
        )}
      </form>
    </div>
  );
}
