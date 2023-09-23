const { PublicKey, SystemProgram } = require('@solana/web3.js');

// 定义种子（可以是任何字符串或字节数组）
const SEED = "mySeed";

// 定义与PDA关联的程序的公钥
const programId = new PublicKey('YourProgramPublicKeyHere');

// 创建PDA
const pda = await PublicKey.createWithSeed(
  basePublicKey, // 通常是合约的公钥或其他公钥
  SEED,
  programId
);

console.log("PDA:", pda.toString());
