import { expect } from "chai";
import { createEthereumAddress } from "../../utils/ethereum";

describe("Test ethereum", () => {
  it("Can create ethereum address", async () => {
    const eth_address = await createEthereumAddress();
    expect(eth_address.length).to.deep.equal(42);
  });
});
