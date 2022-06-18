import axios from "axios";
import { expect } from "chai";

describe("Test user related endpoints", () => {
  const url = "http://localhost:3000/api/user";
  it("Can register user: POST", async () => {
    const randomUserName = Math.random().toString(36);
    const data = {
      username: randomUserName,
      password: "123456",
    };
    const response = await axios.post(url, data);
    expect(response.data).to.include({ username: randomUserName });
  });
});
