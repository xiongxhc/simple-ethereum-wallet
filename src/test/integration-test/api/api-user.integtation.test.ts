import axios from "axios";
import { expect } from "chai";

describe("Test user related endpoints", () => {
  const url = "http://localhost:3000/api/user";
  it("Can register user and get user", async () => {
    const randomUserName = Math.random().toString(36);
    const data = {
      username: randomUserName,
      password: "123456",
    };
    const registerUser = await axios.post(url, data);
    expect(registerUser.data).to.include({ username: randomUserName });

    const getUser = await axios({
      url,
      method: "GET",
      data: {
        username: randomUserName,
      },
    });
    expect(getUser.data).to.deep.equal({
      eth_address: getUser.data.eth_address,
    });
  });

  it("Can throw validation error: POST", async () => {
    const data = {
      username:
        "this-username-is-tooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo-long",
      password: "123456",
    };
    await axios.post(url, data).catch((err) => {
      expect(err.response.status).to.deep.equal(422);
      expect(err.response.data).to.deep.equal({
        errors: [
          {
            value:
              "this-username-is-tooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo-long",
            msg: "Invalid value",
            param: "username",
            location: "body",
          },
        ],
      });
    });
  });

  it("Can throw validation error: GET", async () => {
    await axios({
      url,
      method: "GET",
      data: {
        username: 123,
      },
    }).catch((err) => {
      expect(err.response.status).to.deep.equal(422);
      expect(err.response.data).to.deep.equal({
        errors: [
          {
            msg: "Invalid value",
            param: "username",
            location: "body",
            value: 123,
          },
        ],
      });
    });
  });

  it("Can throw error when user don't exist", async () => {
    await axios({
      url,
      method: "GET",
      data: {
        username: "chris",
      },
    }).catch((err) => {
      expect(err.response.data).to.deep.equal({
        message: "Fail to find user: chris",
      });
    });
  });
});
