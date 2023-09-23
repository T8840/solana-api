const solanaWeb3 = require('@solana/web3.js');
const { Connection } = require('@solana/web3.js');

const connection = new Connection('https://devnet.solana.com');
let secretKey = Uint8Array.from( [
    197,  51,  48,  86, 159,  48,  32, 246,  94,  78,  53,
    107,  87, 251, 154,  47, 144,  59, 133, 217, 254, 193,
    246,  66, 138,  60, 177,  75,  19,  82, 205, 120, 127,
    194,  66, 245,  70,  91,  72,   0, 117, 146, 182,   9,
    117, 197, 180,  72,  48,   7,  58,  13, 170, 174,  62,
     32, 107, 227,  62, 106, 253, 149, 245, 253
 ]
 );
let keypair = solanaWeb3.Keypair.fromSecretKey(secretKey);

// Connect to Wallet
// Request an Airdrop

let airdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
     solanaWeb3.LAMPORTS_PER_SOL,
  );

  // 这个方法被删除了鸭
await connection.confirmTransaction(airdropSignature);
let balance = await connection.getBalance(keypair.publicKey);
console.log(`balance: ${balance}`);