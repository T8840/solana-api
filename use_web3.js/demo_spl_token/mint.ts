import { Transaction, SystemProgram, Keypair, Connection, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, createMintToInstruction } from '@solana/spl-token';
import { DataV2, createCreateMetadataAccountV3Instruction } from '@metaplex-foundation/mpl-token-metadata';
import { bundlrStorage, keypairIdentity, Metaplex, UploadMetadataInput } from '@metaplex-foundation/js';
import secret from './guideSecret.json';

const endpoint = 'https://responsive-radial-daylight.solana-devnet.discover.quiknode.pro/17a0c102a813bc5d90de934d610f960c6f74835e/'; //Replace with your RPC Endpoint
const solanaConnection = new Connection(endpoint);

const userWallet = Keypair.fromSecretKey(new Uint8Array(secret));
const metaplex = Metaplex.make(solanaConnection)
    .use(keypairIdentity(userWallet))
    .use(bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: endpoint,
        timeout: 60000,
    }));

const MINT_CONFIG = {
    numDecimals: 6,
    numberTokens: 1337
}   


const MY_TOKEN_METADATA: UploadMetadataInput = {
    name: "Test Token",
    symbol: "TEST",
    description: "This is a test token!",
    // image: "https://URL_TO_YOUR_IMAGE.png" //add public URL to image you'd like to use
    image: "https://plus.unsplash.com/premium_photo-1694206014813-7b2b3f89ab3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5NTU0NjcwMg&ixlib=rb-4.0.3&q=80&w=1080"
}


const ON_CHAIN_METADATA = {
    name: MY_TOKEN_METADATA.name, 
    symbol: MY_TOKEN_METADATA.symbol,
    uri: 'TO_UPDATE_LATER',
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null
} as DataV2;


/**
 * 
 * @param wallet Solana Keypair
 * @param tokenMetadata Metaplex Fungible Token Standard object 
 * @returns Arweave url for our metadata json file
 */
const uploadMetadata = async (tokenMetadata: UploadMetadataInput): Promise<string> => {
    //Upload to Arweave
    const { uri } = await metaplex.nfts().uploadMetadata(tokenMetadata);
    console.log(`Arweave URL: `, uri);
    return uri;
}


const main = async() => {
    console.log(`---STEP 1: Uploading MetaData---`);
    const userWallet = Keypair.fromSecretKey(new Uint8Array(secret));
    let metadataUri = await uploadMetadata(MY_TOKEN_METADATA);
    ON_CHAIN_METADATA.uri = metadataUri;

    console.log(`---STEP 2: Creating Mint Transaction---`);
    let mintKeypair = Keypair.generate();   
    console.log(`New Mint Address: `, mintKeypair.publicKey.toString());

    const newMintTransaction:Transaction = await createNewMintTransaction(
        solanaConnection,
        userWallet,
        mintKeypair,
        userWallet.publicKey,
        userWallet.publicKey,
        userWallet.publicKey
    );

    console.log(`---STEP 3: Executing Mint Transaction---`);
    let { lastValidBlockHeight, blockhash } = await solanaConnection.getLatestBlockhash('finalized');
    newMintTransaction.recentBlockhash = blockhash;
    newMintTransaction.lastValidBlockHeight = lastValidBlockHeight;
    newMintTransaction.feePayer = userWallet.publicKey;
    const transactionId = await sendAndConfirmTransaction(solanaConnection,newMintTransaction,[userWallet,mintKeypair]); 
    console.log(`Transaction ID: `, transactionId);
    console.log(`Succesfully minted ${MINT_CONFIG.numberTokens} ${ON_CHAIN_METADATA.symbol} to ${userWallet.publicKey.toString()}.`);
    console.log(`View Transaction: https://explorer.solana.com/tx/${transactionId}?cluster=devnet`);
    console.log(`View Token Mint: https://explorer.solana.com/address/${mintKeypair.publicKey.toString()}?cluster=devnet`)
}