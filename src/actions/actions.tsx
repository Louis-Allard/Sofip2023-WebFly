import { Account } from "../Types/Types";

export const setAuth = (account: Account) => ({
  type: "AUTH",
  payload: account,
});
