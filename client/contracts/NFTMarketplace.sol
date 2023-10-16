// SPDX-License-Identifier: MIT
pragma abicoder v2;

import "openzeppelin-solidity/contracts/token/ERC721/IERC721.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract LystoMarketPlace is Ownable {

    
    event List(address indexed  , uint256 ) ; 
    event Mint(address indexed , address indexed , uint256 indexed );
    event Transfer(address indexed , address indexed , uint256 indexed );
    uint256 tokenId ; 
    uint256 royalty ;
    struct Nftinfo {
        uint256 price ; 
        string ipfs ;
        uint256 tokenID ;
        address payable creator ;
    }

    Nftinfo[] public allnft ; 

    mapping(uint256 => Nftinfo) Nft ; 
    mapping (uint256 => address payable ) Owner ; 
    
    function list(uint256 price , string memory ipfshash) public payable returns (uint256)
    {  
        tokenId ++ ;
       Owner[tokenId] = msg.sender ; 
       Nft[tokenId] = Nftinfo(price , ipfshash , tokenId , msg.sender) ; 
       emit List(msg.sender , tokenId) ;
       allnft.push(Nft[tokenId]) ;
       return tokenId ;
    }

    function mint( uint256 _tokenId ) public payable returns(bool)
    {
          (Owner[_tokenId]).transfer(Nft[_tokenId].price);  
          uint256 _price = Nft[_tokenId].price ;
          address from = Owner[_tokenId] ;
          Owner[_tokenId]  = msg.sender ;
          emit Mint(from , msg.sender , _tokenId)  ;
          return true ;                   
    }
    
    function setPrice(uint256 _tokenId ,uint256 _price) public returns(bool)
    {
        address owner = Owner[_tokenId] ;
        require(msg.sender == owner ,"Not the owner ");
        string memory _ipfs = Nft[_tokenId].ipfs;
        address payable creator = Nft[_tokenId].creator ;
        Nft[_tokenId] = Nftinfo( _price , _ipfs , _tokenId ,creator ) ;
        return true ;
    }

    function transfer (uint256 _tokenId) public payable returns(bool)
    {
          (Owner[_tokenId]).transfer(Nft[_tokenId].price);  
          (Nft[_tokenId].creator).transfer(royalty);
          uint256 _price = Nft[_tokenId].price ;
          address from = Owner[_tokenId] ;
          Owner[_tokenId]  = msg.sender ;

          emit Transfer(from , msg.sender , _tokenId)  ;
          return true ;   
    }

}