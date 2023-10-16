// import './navbar.css' ;
import { useEffect, useState } from 'react';
import "./navbar.css";
// import { useLocation } from 'react-router';
const Navbar = () => {

const [connected, toggleConnect] = useState(false);

const [currAddress, updateAddress] = useState('0x');

// // this is the address we are connected to 
async function getAddress() {
    if (!window.ethereum) {
      console.error("Ethereum provider is not available.");
      return;
    }
    if(currAddress !='ox') toggleConnect(true) ;
  
    try {
      const ethers = require("ethers");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      toggleConnect(true) ;
      updateAddress(addr);
    } catch (error) {
      console.error("Error fetching Ethereum address:", error);
    }
  }

// //switches the network and connects to the account
async function connectWebsite() {
    //if you are not on goerli then it will ask you to change your chain and come on goerli 
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if(chainId !== '0x5')
    {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request
      ({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
     })
    }  
    //requesting to connect to the account 
    await window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(() => 
      {
        
        console.log("here");
        getAddress();
        // window.location.replace(location.pathname)
      });
}




    return (
   <>
    <div>
   
   
    </div>

    <div className="top">
       
    <div className="topCenter">
      <ul className="topList">
        <div className="topListItem">
         MARKETPLACE
        </div>
        <div className="topListItem">
           CREATE YOUR NFT
        </div>
        <div className="topListItem">
          CONTACT
        </div>
        <div>
    
        </div>
      </ul>
    </div>
    <div> 
    
    </div>
  </div>
  </>
    );
  }

  export default Navbar; 