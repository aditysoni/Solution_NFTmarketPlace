const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
    
    name: String,
    tokenID:{
        type:String ,
        unique : true 
    }
    ,
    path: {
        type:String , 
        unique:true 
    }
  });

  const NFTtoken = mongoose.model('NFTtoken', NFTSchema);
// Export the NFT model
module.exports = NFTtoken;
