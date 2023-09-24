const solanaWeb3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

// 连接到Solana集群
const connection = new solanaWeb3.Connection(
  solanaWeb3.clusterApiUrl('devnet'), 
  'confirmed'
);