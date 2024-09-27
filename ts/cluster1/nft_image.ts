import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        const image = await readFile("/Users/bhavya0911/Documents/Github Repo's/solana-starter/ts/images/generug.png")
        const generic = createGenericFile(image, "generug.png", {contentType: "image/png"})
        const [uri] = await umi.uploader.upload([generic])

        console.log("Your image URI: ", uri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();