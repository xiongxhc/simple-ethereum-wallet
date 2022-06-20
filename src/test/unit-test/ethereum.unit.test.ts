import { expect } from "chai";
import { generateAddress } from "../../utils/ethereum";

describe("Test ethereum", () => {
  it("Can create ethereum address", async () => {
    const wallet = generateAddress();
    expect(wallet.eth_address.length).to.deep.equal(42);
  });
});
