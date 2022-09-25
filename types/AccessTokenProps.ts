import { Dispatch, SetStateAction } from "react";

export type AccessTokenProps = {
  setAccessToken: Dispatch<SetStateAction<string>>;
};
