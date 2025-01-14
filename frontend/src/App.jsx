import { useEffect, useState } from "react";
import "./App.css";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";

function App() {
  const [contract, setContract] = useState();
  const [provider, setProvider] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState();

  const connectWallet = async () => {
    let provider;
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("1");
    } else {
      console.log("Ethereum provider not found");
      return;
    }

    const loadProvider = async () => {
      console.log("3");

      if (provider) {
        await provider.send("eth_requestAccounts", []);
        console.log("Request accepted...");
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        console.log("Wallet connected: ", address);
        
        let contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        console.log(contract);

        setContract(contract);
        setProvider(provider);
      } else {
        alert("Please install MetaMask!");
        console.log("Please install MetaMask!");
      }
    };

    provider && loadProvider();
  };

  useEffect(() => {
    connectWallet();
  }, []);

  window.ethereum.on("chainChanged", () => {
    window.location.reload();
  });

  window.ethereum.on("accountsChanged", (_chainid) => {
    window.location.reload();
  });

  return (
    <div className="relative flex flex-col gap-10 items-center p-10 font-mono h-full min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-black">
      <span className="text-5xl font-semibold font-serif">D-Drive</span>

      <div>
        {walletAddress ? (
          <div className="cursor-pointer">
            <span className="p-2 px-4 border rounded-md hover:bg-black hover:bg-opacity-15 transition-all cursor-pointer">
              Acc No.: {walletAddress}
            </span>
          </div>
        ) : (
          <div className="cursor-pointer">
            <span
              className="p-2 px-4 border rounded-md hover:bg-black hover:bg-opacity-15 transition-all cursor-pointer"
              onClick={() => connectWallet()}
            >
              Connect Wallet
            </span>
          </div>
        )}
      </div>
      <FileUpload
        contract={contract}
        walletAddress={walletAddress}
        provider={provider}
      />
      <Display
        contract={contract}
        walletAddress={walletAddress}
        provider={provider}
      />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} contract={contract} />
      )}

      <div className="absolute top-5 left-5">
        <button className="p-2 px-4 border border-black rounded-md bg-blue-400 hover:bg-opacity-70 transition-all cursor-pointer" onClick={() => setIsModalOpen(true)}>
          Share
        </button>
      </div>
    </div>
  );
}

export default App;
