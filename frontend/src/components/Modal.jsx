import React from "react";
import { useEffect } from "react";

export default function Modal({ onClose, contract }) {
  const [inputUrl, setInputUrl] = React.useState("");
const [accessList, setAccessList] = React.useState([]);
  const handleShareAccess = async () => {
    if (!inputUrl) {
      alert("Please enter an address");
      return;
    }

    try {
      await contract.allow(inputUrl).then((tx) => {
        console.log(tx);
        alert("Access granted to address");
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAccessList = async () => {
    try {
      const response = await contract.shareAccess();
      console.log(response);
      setAccessList(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAccessList();
  }, []);

  
  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur-md bg-black bg-opacity-20">
      <div className="flex flex-col gap-5 p-3 px-10 rounded-md items-center bg-white bg-opacity-70">
        <span>Share With</span>
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter Address"
          className="p-2 px-4 border rounded-md"
        />
        <select className="p-2 px-4 border rounded-md cursor-pointer">
          <option>People With Access</option>
          {accessList.length > 0 &&
            accessList.map((address, index) => (
              <option key={index}>{address}</option>
            ))}
        </select>
        <div className="flex gap-3">
          <button
            className="p-2 px-4 border border-black rounded-md bg-red-400 hover:bg-opacity-80 transition-all "
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="p-2 px-4 border border-black rounded-md bg-green-500 hover:bg-opacity-80 transition-all "
            onClick={() => handleShareAccess()}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
