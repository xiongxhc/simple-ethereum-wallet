import { expect } from "chai";
import { encrypt, matchEncrypt } from "../../utils/encryption";

describe("Test encryption", () => {
  it("Can encrypt and matchEncrypt", async () => {
    const password = "test-password-123";
    const hash = encrypt({ str: password });
    expect(matchEncrypt({ str: password, hash })).to.deep.equal(true);
  });
});
