


const airdropSignature = await connection.requestAirdrop(
    payer.publicKey,
    LAMPORTS_PER_SOL,
  );
  
  await connection.confirmTransaction(airdropSignature);