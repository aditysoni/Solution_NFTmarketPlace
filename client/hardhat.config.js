require("@nomicfoundation/hardhat-toolbox");
// require('@nomiclabs/hardhat-waffle');
require("@nomiclabs/hardhat-ethers");
// require('@openzeppelin/hardhat-upgrades');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  
  // defaultNetwork :"hardhat " , 
  networks:{
     goerli : {
      url: "https://eth-goerli.g.alchemy.com/v2/DatpYpdFitpsdEs0R7PiGdydERFBYRfm" ,
      accounts : ["9a86966698bd033504e344114dce4b20ba8a17bf7944eb4d9601063c1a204f5b"]
     }
     
  },
  solidity: "0.8.20",
};
