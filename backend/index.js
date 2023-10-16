const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const NFTtoken = require('./modal/nft_info') ;
const mongoose = require('mongoose') ;
const cors = require('cors') ;
// import upload from './upload.js';
// import { uploadImage, getImage } from './controller/image-controller.js';

const router = express.Router();
// Use the body-parser middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());


const multer =require( 'multer');

const upload = multer({ dest: 'uploads' })

// Define a route to create a new user
app.post('/createNft', async (req, res) => 
{
  try {
     const info = req.body ; 
     
      uploadImage(req.body.image)
     .then(console.log(url))
     .catch((err) => res.status(500).send(err));
    
     const nft = new NFT({
        name:  info.name,
        ipfs:  url,
        tokenId : info.tokenId 
      });
      await nft.save() ;
      console.log("saved") ;
      res.send('NFT created successfully!');
  }
  catch(err)
  {
    console.log(err) ;
  }
//  
});

// Define a route to get a list of all users
app.get('/allNfts', async (req, res) =>
{   
    try{
    const allnfts = await NFT.find() ;
    console.log(allnfts) ;
    res.send(allnfts);
    }
    catch(err)
    {
        console.log(err) ;
    }
});

const uploadImage = async (request, response) => {
  console.log("hello") ;
  const fileObj = {
      path: request.data.path,
      tokenID : request.data.tokenID 
  }
  
  try {
      const file = await NFTtoken.create(fileObj);
      response.status(200).json({ path: `http://localhost:7000/file/${file._id}`});
  } catch (error) {
      console.error(error.message);
      response.status(500).json({ error: error.message });
  }
}


const getImage = async (request, response) => {
  try {   
      const file = await NFTtoken.findById(request.params.fileId);
      console.log("chala") ;
      file.downloadCount++;

      await file.save();

      response.download(file.path, file.name);
  } catch (error) {
      console.error(error.message);
      response.status(500).json({ msg: error.message });
  }
}




// Start the server
app.listen(7000, () => {
  console.log('Server listening on port 7000');
});


const database_link = 'mongodb+srv://admin:adityasoni1017@cluster0.4mitqeh.mongodb.net/?retryWrites=true&w=majority' ;

const connection = async ()  =>
{await mongoose.connect(database_link)
  .then(function(db){
    console.log("db connected") ;
})
.catch(function(err){
    console.log("not connected") ;
});}

connection() ;



app.post('/upload', upload.single('file'), uploadImage);
router.get('/file/:fileId', getImage);