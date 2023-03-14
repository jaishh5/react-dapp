import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

// Update with the contract address logged out to the CLI when it was deployed 
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  // store greeting in local state
  const [values, setValues] = useState({
    title: ' ',
    abs: ' ',
    url: ' '
  });

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // call the smart contract, read the current greeting value
  async function fetchValues() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  // call the smart contract, send an update
  async function setGreeting() {
    if (!values) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(values.title, values.abs, values.url)
      await transaction.wait()
      fetchValues()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchValues}>Fetch Values</button><br/>
        <input type="text" name="title" onChange={e => setValues({ ...values, title: e.target.value})} placeholder="Enter Title" />
        <input type="text" name="abs" onChange={e => setValues({ ...values, abs: e.target.value})} placeholder="Enter Abstract" />
        <input type="text" name="url" onChange={e => setValues({ ...values, url: e.target.value})} placeholder="Enter URL" />
        <button onClick={setGreeting}>Submit</button>
      </header>
    </div>
  );
}

export default App;