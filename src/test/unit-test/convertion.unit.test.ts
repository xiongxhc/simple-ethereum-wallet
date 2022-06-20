import { expect } from "chai";
import { converHexToDecimal, convertWeiToEther } from "../../utils/conversion";

describe("Test conversion", () => {
  it("Can convert hex for decimal", async () => {
    expect(converHexToDecimal("0x0", 18)).to.deep.equal(0);
    expect(converHexToDecimal("0x1639e23116f0001230", 18)).to.deep.equal(
      409.9993198010942
    );
    expect(converHexToDecimal("0x16970b02b66e6e4", 18)).to.deep.equal(
      0.10173636853726589
    );
  });
  it("Can number for decimal", async () => {
    expect(convertWeiToEther("1020310212412443123012")).to.deep.equal(
      "1020.3102124124431"
    );
    expect(convertWeiToEther("12312312312341241233")).to.deep.equal(
      "12.312312312341241"
    );
  });
});
