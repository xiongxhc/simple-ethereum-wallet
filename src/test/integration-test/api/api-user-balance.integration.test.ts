import axios from "axios";
import { expect } from "chai";
import { assetNames } from "../../../const/assets";
import { SECOND_IN_MS } from "../../../const/time";

describe("Test get user balance", () => {
  const url = "http://localhost:3000/api/user/balance";
  it("Can get ethereum balance", async () => {
    const query = {
      eth_address: "0x7eEcfFb050FbB238b5b27dE4100e30FA613d7B71",
      erc_token: assetNames.USDT,
    };
    const response = await axios.get(`${url}?eth_address=${query.eth_address}&erc_token=${query.erc_token}`)
    expect(response.data).to.deep.equal({
      eth_balance: "0.101736368537265892",
      token_balance: "6",
    });
  });

  it("Cannot get ethereum balance when invalid address", async () => {
    const query = {
      eth_address: "fake-ethereum-address-up-to-42-charactoors",
      erc_token: assetNames.USDT,
    };
    await axios.get(`${url}?eth_address=${query.eth_address}&erc_token=${query.erc_token}`).catch((err) => {
      expect(err.response.data).to.deep.equal({
        message:
          "Invalid ethererum address: fake-ethereum-address-up-to-42-charactoors",
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
    const getBalanceQuery = {
      eth_address,
      erc_token: assetNames.USDT,
    };
    const response = await await axios.get(`${url}?eth_address=${getBalanceQuery.eth_address}&erc_token=${getBalanceQuery.erc_token}`)
    expect(response.data).to.deep.equal({
      eth_balance: "0",
      token_balance: "0",
    });
  });

  it("Can throw validation error", async () => {
    const query = {
      eth_address: "fake-ethereum-address",
      erc_token: "ABCD",
    };
    await axios.get(`${url}?eth_address=${query.eth_address}&erc_token=${query.erc_token}`).catch((err) => {
      expect(err.response.data).to.deep.equal({
        errors: [
          {
            msg: "Invalid value",
            location: "query",
            param: "eth_address",
            value: "fake-ethereum-address",
          },
          {
            msg: "Invalid value",
            location: "query",
            param: "erc_token",
            value: "ABCD",
          },
        ],
      });
    });
  });
});
