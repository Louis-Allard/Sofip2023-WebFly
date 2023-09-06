import { Account } from "../Types/Types";

export const setData = (account: Account) => ({
  type: "DATA",
  payload: account,
});

export const resetData = () => ({
  type: "RESET",
});
