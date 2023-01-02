import { ethers } from 'hardhat';
import './App.css';
import spotify from './spotify.json';
import { useEffect, useState } from 'react';


function App() {

  const [message, setMessage] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const {
    ethereum
  } = window;

  const contractAddress = "0xa0c5D2d665869641E86c3d5fE3c9dB4FFF18F67b";
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const spotifyContract = new ethers.Contract(contractAddress, spotify.abi, signer)
  const getAllwaves = async () => {
    const {
      ethereum
    } = window;
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const spotifyContract = new ethers.Contract(contractAddress, spotify.abi, signer)


        const waves = await spotifyContract.getAllwaves();
        console.log("These are the waves ", waves);
      }

    } catch (err) {
      console.log(err);
    }


  }

  const checkIfWalletIsConnected = async () => {

    try {

      const {
        ethereum
      } = window;

      if (!ethereum) {
        console.log("Make sure you have Metamask");
        return;
      } else {
        console.log("We have the ethereum object ", ethereum);

      }

      const accounts = await ethereum.request({
        method: 'eth_accounts'
      });

      if (accounts.length != 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }

    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {

    try {
      const {
        ethereum
      } = window;
      if (!ethereum) {
        console.log("Make sure you have a Metamask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });

      setCurrentAccount(accounts[0]);

    } catch (error) {
      console.log(error);
    }


  }







  const wave = async () => {


    try {

      let count = await spotifyContract.getTotalWaves();

      console.log("Retrieved wave count ", count.toNumber());

      const waveTxn = await spotifyContract.wave(message);
      console.log("Mining..... ", waveTxn.hash);
      irl

      await waveTxn.wait();
      getAllwaves();
      console.log("Mined...... ", waveTxn.hash);

      count = spotifyContract.getTotalWaves();


    } catch (error) {
      console.log(error);

    }

  }


  useEffect(() => {

    checkIfWalletIsConnected();

  }, [])




  return (<div className="App" >


    <div className="header" >


      <h1 > Kuch toh Banega hi!!! </h1>

    </div> <div className='bio' > Enjoy kar vaii </div>

    <
      input className='form'
      type="text"
      placeholder="Likh bhai kuch Mai hi karun kya sab?"
      onChange={
        (e) => setMessage(e.target.value)
      }
    />


    <button className="waveButton"
      onClick={
        wave
      } > Wave at Me </button>

    {
      (!currentAccount) && (<button className="connectButton"
        onClick={
          connectWallet
        } > Connect Wallet </button>)}/ / conditional rendering
  </div>


  );
}

export default App;