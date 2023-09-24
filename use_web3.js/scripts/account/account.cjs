const solanaWeb3 = require('@solana/web3.js');
const establishConnection = async () =>{
 rpcUrl="https://api.devnet.solana.com";
 connection = new solanaWeb3.Connection(rpcUrl, 'confirmed');   
 console.log('Connection to cluster established:', rpcUrl);
}
const createAccount = async () => {
  const Info = await connection.getEpochInfo();
  console.log("---------------------\n", Info);
  const keyPair = solanaWeb3.Keypair.generate();
  console.log("Public Key:", keyPair.publicKey.toString());
  console.log("Secret Key:",keyPair.secretKey)
};
establishConnection();
createAccount();

/*
Public Key: 57uYfxxUMATgoZzzf6F3HqG5jxX6x5pjCA5Mdet33uvN
Secret Key: Uint8Array(64) [
   44, 215, 229, 225,  38, 144, 233, 164,  64, 176,  67,
  250,   1, 195, 161, 215,  92, 124, 157, 134, 185,  60,
   55, 124, 230,  14, 159, 206, 230, 101,  37,  11,  61,
   51, 165, 134, 163, 149,  14, 134, 202,  36,  76,  11,
   47, 219, 237,  62,  14, 209, 132,  25,  25, 195, 226,
  171,  76,  66,  31,  34, 249,   7, 173, 247
]
*/