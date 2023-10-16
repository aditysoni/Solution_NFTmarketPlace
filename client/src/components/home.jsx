import pic from './pic.png' ;
import './navbar.css' ;
import { useEffect , useState } from 'react';

const Home = () =>
{   
    const [connected, toggleConnect] = useState(false);

const [currAddress, updateAddress] = useState('0x');
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
        <div> 
            

        <div className='home-main'> 

        <div className='wrapper'>
       
        <div className = "wrapper-content">
          <div className = "top-left"> 
              <div> 
                <img src ={pic}/>
              </div>
          </div>
          <div className='top-right'> 
             <div> 
               <h1 className='title'> NFT MARKETPLACE</h1>
             </div>
             <div> 
               <p className='para'> 
                TRADE THE DIGITAL ASSEST <br/><br/> LETS EXPLORE THE WORLD OF FUTURE</p>
             </div>
             <button className="signbu" onClick={connectWebsite}>{connected? "Connected":"Connect Wallet"}</button>
          </div>
          <div> 
        
          </div>
       </div>

       </div></div></div>

        
        
    )
}

export default Home ;