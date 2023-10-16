import Navbar from "./Navbar";
import { useState ,useEffect , useRef } from "react";
import pic from './removed.png' ;
import second from './fourth.png' ;


import BigNumber from 'bignumber.js' ;
import axios from "axios";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import Marketplace from '../Marketplace.json';
import { uploadFile } from './api' ;


export default function SellNFT () {
   
   const contractAddress = '0x69bC1aDe5B3528B902A4D2E428C1720B96E545B5' ;
  
   const ContractAbi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "List",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Mint",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allnft",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "ipfs",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "tokenID",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "creator",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllNFTs",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "ipfs",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "tokenID",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "creator",
						"type": "address"
					}
				],
				"internalType": "struct LystoMarketPlace.Nftinfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "ipfshash",
				"type": "string"
			}
		],
		"name": "list",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "setPrice",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

    const [fileURL, setFileURL] = useState(null);
    const ethers = require("ethers");
    const [message, updateMessage] = useState('');
    const [name , setName ] = useState('') ;
    const [description , setDescription] = useState('') ;
    const [pinataUrl , setpinataUrl] = useState('') ;
    const [price , setPrice] = useState('') ;
    let [data , updatedata] = useState([]) ;
    const [tokenId , updatetokenId] = useState('') ;
    const [file, setFile] = useState('');
    const [result, setResult] = useState('');
    const fileInputRef = useRef();
    
  

   const updateFILE =(e) =>
   {
       setFile(e.target.value[0]) ;
   }

    const settokenId=(e)=>
    {
         updatetokenId(e.target.value)  ;
    }
   let tokenID = 0 ;
    
    let nftlist = [0] ;
   
    const setethprice =(e) => 
    {
        setPrice(e.target.value) ;
    }
    const setmetades=(e)=>
    {
       setDescription(e.target.value);
    }
    const setmetaname = (e)=>
    {
        setName(e.target.value);
    }
    // const location = useLocation();
    const newlisting = (da) => {
        updatedata(da);
      };

    async function disableButton() {
        const listButton = document.getElementById("list-button")
        listButton.disabled = true
        listButton.style.backgroundColor = "grey";
        listButton.style.opacity = 0.3;
    }

    async function enableButton() {
        const listButton = document.getElementById("list-button")
        listButton.disabled = false
        listButton.style.backgroundColor = "#A500FF";
        listButton.style.opacity = 1;
    }

    //This function uploads the NFT image to IPFS
    async function OnChangeFile(e) {
        var file = e.target.files[0];
        
        try {
            console.log(" uploading image on IPFS") ;
            disableButton();
            updateMessage("Uploading image.. please dont click anything!")
            const response = await uploadFileToIPFS(file);
            if(response.success === true) {
                enableButton();
                updateMessage("") ;
                console.log("Uploaded image to Pinata: ", response.pinataURL)
                setFileURL(response.pinataURL);
            }
            const nftJSON = {
                name, description, price, image: fileURL
            }
            const res = await uploadJSONToIPFS(nftJSON);
            if(response.success === true){
                console.log("Uploaded JSON to Pinata: ", response)
                console.log(res) ;
                console.log(res.pinataURL) ;
                setURL(res.pinataURL) ;
                
            }
        }
        catch(e) {
            console.log("Error during file upload", e);
        }
    }

    const setURL = (url)=>
    {
        setpinataUrl(url) ;
    }

    //This function uploads the metadata to IPFS
    async function uploadMetadataToIPFS() {
        // const {name, description, price} = formParams;
        //Make sure that none of the fields are empty
        if( !name || !description || !price || !fileURL)
        {
            updateMessage("Please fill all the fields!")
            return -1;
        }
         
        const nftJSON = {
            name, description, price, image: fileURL
        }

        try {
            //upload the metadata JSON to IPFS
            const response = await uploadJSONToIPFS(nftJSON);
            if(response.success === true){
                console.log("Uploaded JSON to Pinata: ", response)
                console.log(response) ;
                console.log(response.pinataURL) ;
                setURL(response.pinataURL) ;
                
            }
        }
        catch(e) {
            console.log("error uploading JSON metadata:", e)
        }
    } 
    const allnfturl = async () =>
    {
        Map.data((one)=> {
            console.log(one.ipfs) ;
        })
    }

    async function listNFT(e) {
        e.preventDefault();
        //Upload data to IPFS
        try {
            updateFILE(e) ;
            
            // file.append(tokenID) ;
           tokenID++ ;
            
            
            
            
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(provider) ;
            const signer = provider.getSigner();
            console.log(signer) ;
            disableButton();
            updateMessage("Uploading NFT(takes 5 mins).. please dont click anything!")
            console.log("pulling the contract");
            //Pull the deployed contract instance
            let contract = await new ethers.Contract(contractAddress, ContractAbi, signer) ;
            console.log("price")
            //massage the params to be sent to the create NFT request
            
            let listingPrice = 0.01 ;
            
            listingPrice = listingPrice.toString() ;
            const str ='fdsg' ;
             const ethprice = new BigNumber(price) ;
             const pinatavalaurl = uploadFileToIPFS() ;
             console.log(pinatavalaurl) ;
            //actually create the NFT
             let lisitng = await contract.list(price , pinatavalaurl)  ; 
           
             console.log(pinataUrl) ;
             tokenID++ ;
            //  const reqdata = { name , tokenId , pinataUrl} ;
            //  await axios.post("http://localhost:7000/createNft" , reqdata) ;
            alert("Successfully listed your NFT!");
            fileInputRef.current.click();
            // setFile(e.target.value[0]) ;
            

            enableButton();
            updateMessage("");
            // updateFormParams({ name: '', description: '', price: ''});
            // window.location.replace("/")
            
        }
        catch(e) {
            alert( "Upload error"+e )
        }
    }
       async function mintnft ()
       {
        try {
           
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(provider) ;
            const signer = provider.getSigner();
            console.log(signer) ;
            disableButton();
            // updateMessage("Uploading NFT(takes 5 mins).. please dont click anything!")
            console.log("pulling the contract");
            //Pull the deployed contract instance
            let contract = await new ethers.Contract(contractAddress, ContractAbi, signer) ;
            console.log("price") ;
            //actually create the NFT
             let minting = await contract.mint(tokenId) ;
              
            alert("Successfully minted your NFT!");
            enableButton();
            updateMessage("");
         
            
        }
        catch(e) {
            alert( "Upload error"+e )
        }
       }

       const transfer = async (e) =>
       {
        e.preventDefault() ;
        try {
           
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(provider) ;
            const signer = provider.getSigner();
            console.log(signer) ;
            disableButton();
            updateMessage("Uploading NFT(takes 5 mins).. please dont click anything!")
            console.log("pulling the contract");
            //Pull the deployed contract instance
            let contract = await new ethers.Contract(contractAddress, ContractAbi, signer) ;
            console.log("price")
            //massage the params to be sent to the create NFT request
            
            
            //actually create the NFT
             let lisitng = await contract.transfer( 3 )  ; 
            
          
            alert("Successfully transfered your NFT!");
            enableButton();
            updateMessage("");
       
            
        }
        catch(e) {
            alert( "Upload error"+e )
        }
       }
     
       const GetIpfsUrlFromPinata = (pinataUrl) => {
        var IPFSUrl = pinataUrl.split("/");
        const lastIndex = IPFSUrl.length;
        IPFSUrl = "https://ipfs.io/ipfs/"+IPFSUrl[lastIndex-1];
        return IPFSUrl;
    };

       const allnftlist =async () =>
       {
       
         try {
        
             const provider = new ethers.providers.Web3Provider(window.ethereum);
             console.log(provider) ;
             const signer = provider.getSigner();
             console.log(signer) ;
             disableButton();
             updateMessage("Uploading NFT(takes 5 mins).. please dont click anything!")
             console.log("pulling the contract");
             //Pull the deployed contract instance
             let contract = await new ethers.Contract(contractAddress, ContractAbi, signer) ;
              let listingofnft= await contract.getAllNFTs() ;
               console.log(listingofnft) ;
             
             
              console.log(nftlist) ;

           
              await newlisting(listingofnft);
           
             console.log(data) ;
           
             enableButton();
             updateMessage("");
            
             
         }
         catch(e) {
             alert( "Upload error"+e )
         }
       }

    console.log("Working");
    return (
       <div>
        <div className="create-nft-main">
        <div className="wrapper">
        <div className="title">LIST your NFT at the MARKETPLACE </div>
        <div className="wrapper-content">
        <div className="top-left">
        <div> 
        <img src ={pic}/>
      </div>
        </div>
        <div className="top-right">
            <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
            
                <div className="input-boxes-main">
                    
                    <input className="input-box" id="name" type="text" placeholder="Axie#4563" onChange={setmetaname}></input>
                </div>
                <div className="mb-6">
                 
                    <input className="input-box"onChange={setmetades} cols="40" rows="5" id="description" type="text" placeholder="Axie Infinity Collection" ></input>
                </div>
                <div className="mb-6">
                    <input className="input-box" onChange = {setethprice} type="number" placeholder="Min 0.01 ETH" step="0.01" ></input>
                </div>
                <div>
                    <label className="input-info" htmlFor="image">Upload Image(&lt;500 KB)</label>
                    <br/>
                    <input ref={fileInputRef} className ="input-image" type={"file"} onChange={OnChangeFile}></input>
                </div>
                <br></br>
                <div className="text-red-500 text-center">{message}</div>
                <button onClick={listNFT} className="button-create" id="list-button">
                    List NFT
                </button>
              
            </form>
            </div>
          
            </div>

            <div>
            
            </div>
            </div>
            </div>


           <div className = "create-nft-main"> 
           <div className="wrapper-bottom"> 
             <div className="title"> 
                MARKETPLACE - MINT AND TRANSFER THE NFT</div>
             <div className="wrapper-content-bottom">
             <div className="top-left">
             <img src={second}/>
             </div>
             <div className="top-right-bottom"> 
               <div className="title-bottom"> GET YOURSELF AN AWESOME NFT</div>
                 <div className="mb-6">
                     <input className="input-box" onChange = {settokenId} type="number" placeholder="enter the token Id you want to mint or buy"  ></input>
                 </div>
                
            
                 <div className="text-red-500 text-center">{message}</div>
                 <button onClick={mintnft} className="button-create" id="list-button">
                     Mint/Buy 
                 </button>
                 </div>
             
             </div>

             </div>
           </div>
           </div>
           
    )
}
