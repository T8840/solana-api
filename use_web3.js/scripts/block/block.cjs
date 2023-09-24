const solanaWeb3 = require('@solana/web3.js');
const establishConnection = async () =>{
 rpcUrl="https://api.devnet.solana.com";
 connection = new solanaWeb3.Connection(rpcUrl, 'confirmed');   
 console.log('Connection to cluster established:', rpcUrl);
}
const getRecentBlock = async () => {
    const Info = await connection.getEpochInfo()
    console.log("-----------------\n", Info);
}
establishConnection();
getRecentBlock();