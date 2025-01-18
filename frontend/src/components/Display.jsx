import React, { useState } from "react";

export default function Display({ contract, walletAddress, provider }) {
  const [inputUrl, setInputUrl] = useState("");
  const [fetchData, setFetchData] = useState([]);
  const JWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiYjM1Y2U4Yi1mZjgwLTQ5OGQtYTk1OC0zNTg1N2UxNmI3YTciLCJlbWFpbCI6InBvbm5hbjIxMTJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjUwMjI2Y2Q3OWMyM2FlODliNmIzIiwic2NvcGVkS2V5U2VjcmV0IjoiZjJjMTRiOGRjYmU5NzJhYmU2ZDZjNmQzNjEzZjQwN2U3ZGM4ZjAxZmNhZTVjYjQ3M2Y3YzVmMmZiYmRlZGYxMyIsImV4cCI6MTc2ODQwODg4Nn0.EPm6mI5e34bbbhzX4wYMAt2QV7fo1GcmakEXs85xrPI";

  const fetchFromContract = async (e) => {
    e.preventDefault();

    try {
      console.log("1");
      
      // if (inputUrl && inputUrl.length > 0) {
      //   console.log("2");
      //   const response = await contract.display(inputUrl);
      // } else {
      //   console.log("3: ", walletAddress);
      //   const response = await contract.display(walletAddress);
      // }

      contract
          .display(inputUrl || walletAddress)
          .then((tx) => {
            console.log(tx);
            setFetchData(tx);
            // alert("Image Uploaded Successfully");
          })
          .catch((error) => {
            console.error(error);
            // alert("Unable to upload Image");
          });

      // console.log(response);
      // setFetchData(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full items-center">
      <input
        value={inputUrl}
        placeholder="Enter Address"
        onChange={(e) => setInputUrl(e.target.value)}
        className="p-2 px-4 rounded-md"
      />
      <button
        className="p-2 px-4 border rounded-md hover:bg-black hover:bg-opacity-15 transition-all "
        onClick={fetchFromContract}
      >
        Fetch
      </button>
      <div className="p-5">
        {fetchData.length > 0 ? (
          <div className="flex flex-wrap gap-5 justify-center items-center border-2 bg-black bg-opacity-20 rounded-lg p-5">
            {fetchData.map((url, index) => (
              <img
                src={`https://gateway.pinata.cloud/ipfs/${url}`}
                key={index}
                className="w-60"
              ></img>
            ))}
          </div>
        ) : (
          <span>No data found</span>
        )}
      </div>
    </div>
  );
}
