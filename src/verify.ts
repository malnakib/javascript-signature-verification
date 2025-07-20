import { readFileSync } from "fs";
import { createVerify } from "crypto";

type SignatureVerifierDeps = {
  paths: {
    payload: string;
    signature: string;
    publicKey: string;
  };
};
/**
 * Loads the input files required for signature verification.
 * @param paths - file paths for payload, signature, and public key.
 * @returns object with the file contents.
 */
export function loadInputFiles({ paths }: SignatureVerifierDeps) {
  const payloadPath = paths.payload;
  const signaturePath = paths.signature;
  const publicKeyPath = paths.publicKey;
  const payloadBuffer = readFileSync(payloadPath);
  const signatureBase64 = readFileSync(signaturePath, "utf8");
  const publicKeyPem = readFileSync(publicKeyPath, "utf8");
  return { payloadBuffer, signatureBase64, publicKeyPem };
}

export function signatureVerifier({ paths }: SignatureVerifierDeps): boolean {
  try {
    const { payloadBuffer, signatureBase64, publicKeyPem } = loadInputFiles({
      paths,
    });
    // converting the signature from base64 string to a Buffer
    const signatureBuffer = Buffer.from(signatureBase64, "base64");
    // create a verifier object: public key + SHA-256 algorithm
    const verifier = createVerify("sha256");

    verifier.update(payloadBuffer);
    verifier.end();
    // verification: returns true if signature is valid
    return verifier.verify(publicKeyPem, signatureBuffer);
  } catch (error) {
    console.error("Error during verification");
    throw error;
  }
}
