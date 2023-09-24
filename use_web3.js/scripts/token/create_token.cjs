const solanaWeb3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');
const { createMint } = require('@solana/spl-token');
const {  Keypair } = require('@solana/web3.js');

// 连接到Solana集群
const connection = new solanaWeb3.Connection(
  solanaWeb3.clusterApiUrl('devnet'), 
  'confirmed'
);

const payer = Keypair.generate();
const mintAuthority = Keypair.generate();
const freezeAuthority = Keypair.generate();


// 创建新的SPL Token
async function createNewToken() {
  const tokenSupply = 1000000000;  // Token的初始供应量
  const decimals = 9;  // Token小数点后的位数
  const mint = await createMint(
    connection,
    payer,
    mintAuthority.publicKey,
    freezeAuthority.publicKey,
    9 // We are using 9 to match the CLI decimal default exactly
  );
  console.log(mint.toBase58());
  // 返回新创建的Token的地址
  return mint.toBase58();
}

createNewToken().then(tokenAddress => {
  console.log(`Created new token with address: ${tokenAddress}`);
}).catch(error => {
  console.error(`Failed to create new token: ${error}`);
});



async function getTokenInfo() {
    const mintInfo = await getMint(
        connection,
        mint
      )
      
    console.log(mintInfo.supply);
}
