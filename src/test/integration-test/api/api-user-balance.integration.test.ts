import axios from "axios";
import { expect } from "chai";
import { assetNames } from "../../../const/assets";
import { SECOND_IN_MS } from "../../../const/time";

describe("Test get user balance", () => {
  const url = "http://localhost:3000/api/user/balance";
  it("Can get ethereum balance", async () => {
    const data = {
      eth_address: "0x7eEcfFb050FbB238b5b27dE4100e30FA613d7B71",
      erc_token: assetNames.USDT,
    };
    const response = await axios.post(url, data);
    expect(response.data).to.deep.equal({
      eth_balance: "0.101736368537265892",
      token_balance: "6",
    });
  });

  it("Cannot get ethereum balance when invalid address", async () => {
    const data = {
      eth_address: "fake-eth-address",
      erc_token: assetNames.USDT,
    };
    await axios.post(url, data).catch((err) => {
      expect(err.response.data).to.deep.equal({
        message: "Invalid ethererum address: fake-eth-address",
      });
    });
  });

  it("Can create address and get ethereum balance", async () => {
    const registerUrl = "http://localhost:3000/api/user";
    const randomUserName = Math.random().toString(36);
    const registerData = {
      username: randomUserName,
      password: "123456",
    };
    const registerUser = await axios.post(registerUrl, registerData);
    expect(registerUser.data).to.include({ username: randomUserName });

    const { eth_address } = registerUser.data;
    const getBalanceData = {
      eth_address,
      erc_token: assetNames.USDT,
    };
    const response = await axios.post(url, getBalanceData);
    expect(response.data).to.deep.equal({ eth_balance: "0", token_balance: "0" });
  });
});
