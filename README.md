# javascript-signature-verification

This is a basic javascript script that checks if a file’s digital signature is valid using an RSA public key.

## Commands

- Install dependencies: `npm install`
- Run the test: `npm run test`

## Prepare the inputs

- Make a key pair: (See: See: https://linux.die.net/man/1/genpkey)
  - `openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048`
  - `openssl rsa -pubout -in private.pem -out public.pem`
- Create data and save it as payload.json
- Sign the data with the private key:
  - `openssl dgst -sha256 -sign private.pem -out signature.bin payload.json`
- Make the signature readable
  - `base64 -i signature.bin -o signature.txt`

### Note:

The public key (public.pem) is included in this repository only for demonstration and testing. However, in the real world applications, public keys should be managed in more secure way, for example in AWS services like AWS Key Management Service (KMS) or AWS Secrets Manager being used to store this kind of data instead of storing them in the codebase.
