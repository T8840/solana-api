// exporting from a bs58 private key to an Uint8Array
// == from phantom private key to solana cli id.json key file
// npm install bs58 @solana/web3.js

const web3 = require("@solana/web3.js");
const bs58 = require('bs58');
let secretKey = bs58.decode("u133rHRdYBDJfhwPChnWULUvaeNNUhz2ZVUraxhrrYYhjCDUTtyLWEsVCxRvon7E8XjzvFmXu4mt1H137hJcPbc");
console.log(`[${web3.Keypair.fromSecretKey(secretKey).secretKey}]`);

// exporting back from Uint8Array to bs58 private key
// == from solana cli id.json key file to phantom private key

// const bs58 = require('bs58');
privkey = new Uint8Array([
    44, 215, 229, 225,  38, 144, 233, 164,  64, 176,  67,
   250,   1, 195, 161, 215,  92, 124, 157, 134, 185,  60,
    55, 124, 230,  14, 159, 206, 230, 101,  37,  11,  61,
    51, 165, 134, 163, 149,  14, 134, 202,  36,  76,  11,
    47, 219, 237,  62,  14, 209, 132,  25,  25, 195, 226,
   171,  76,  66,  31,  34, 249,   7, 173, 247
 ]); // content of id.json here
console.log(bs58.encode(privkey));