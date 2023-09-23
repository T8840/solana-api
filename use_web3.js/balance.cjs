const { Connection, PublicKey } = require('@solana/web3.js');

async function getBalance() {
  // 连接到 Devnet
  const connection = new Connection('https://devnet.solana.com');

  // 账号的公钥
  const address = new PublicKey('Deb9Py2FK4zh5FJjerVvo3MohZ1NuifAc1G1532GjaBH');

  // 获取余额
  const balance = await connection.getBalance(address);

  console.log(`Balance for ${address.toString()}: ${balance / 1e9} SOL`);
}

getBalance();
