import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../wba-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const token_decimals = 1_000_000;

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("7sMvoeByf2vnQdfzLsH1rTUPnUWiv6umjqGNAws7wkYu");

// Recipient address
const to = new PublicKey("4J7kYZUjgWz4r1TA82tYup8xxrvqRBXuvWyhEPdN1pfa");

(async () => {
    try {
       const fromWallet = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
       );

       const toWallet = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
       );

        const txId = await transfer(
            connection,
            keypair,
            fromWallet.address,
            toWallet.address,
            keypair.publicKey,
            100 * token_decimals,
        );
        console.log(`Transfer txId is:${txId}`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();