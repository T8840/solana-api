var web3 = require("@solana/web3.js");
// Address: 9vpsmXhZYMpvhCKiVoX5U8b1iKpfwJaFpPEEXF7hRm9N
const DEMO_FROM_SECRET_KEY = new Uint8Array([
    37, 21, 197, 185, 105, 201, 212, 148, 164, 108, 251, 159, 174, 252, 43, 246,
    225, 156, 38, 203, 99, 42, 244, 73, 252, 143, 34, 239, 15, 222, 217, 91, 132,
    167, 105, 60, 17, 211, 120, 243, 197, 99, 113, 34, 76, 127, 190, 18, 91, 246,
    121, 93, 189, 55, 165, 129, 196, 104, 25, 157, 209, 168, 165, 149,
]);
(async () => {
    // Connect to cluster
    var connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    // Construct a `Keypair` from secret key
    var from = web3.Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);
    // Generate a new random public key
    var to = web3.Keypair.generate();
    // Add transfer instruction to transaction
    var transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to.publicKey,
            lamports: web3.LAMPORTS_PER_SOL / 100,
        })
    );
    // Sign transaction, broadcast, and confirm
    var signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [from]
    );
    console.log("SIGNATURE", signature);
    console.log("SUCCESS");
})();