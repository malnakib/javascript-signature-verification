import { signatureVerifier } from "./verify";

describe("verifySignature", () => {
  const paths = {
    payload: "./payload.json",
    signature: "./signature.txt",
    publicKey: "./public.pem",
  };
  it("returns true when signature is valid", () => {
    const result = signatureVerifier({ paths });
    expect(result).toBe(true);
  });
  it("returns false when signature is invalid", () => {
    const pathToMockedPayload = {
      ...paths,
      payload: "./mocked-payload.json",
    };
    const result = signatureVerifier({ paths: pathToMockedPayload });
    expect(result).toBe(false);
  });
  it("throws an error when files are not found", () => {
    const invalidPaths = {
      ...paths,
      payload: "./not-exist-payload.json",
    };
    expect(() => signatureVerifier({ paths: invalidPaths })).toThrow(
      "ENOENT: no such file or directory, open './not-exist-payload.json"
    );
  });
});
