import { readFileSync } from "fs";
import { createVerify } from "crypto";

type SignatureVerifierDeps = {
  paths: {
    payload: string;
    signature: string;
    publicKey: string;
  };
};
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
    const signatureBuffer = Buffer.from(signatureBase64, "base64");
    const verifier = createVerify("sha256");

    verifier.update(payloadBuffer);
    verifier.end();

    return verifier.verify(publicKeyPem, signatureBuffer);
  } catch (error) {
    console.error("Error during verification");
    throw error;
  }
}
