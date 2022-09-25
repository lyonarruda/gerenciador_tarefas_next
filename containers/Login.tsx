import { NextPage } from "next";
import React, { ChangeEvent, useState } from "react";

import { executeRequest } from "../services/apiServices";
import { AccessTokenProps } from "../types/AccessTokenProps";

export const Login: NextPage<AccessTokenProps> = ({ setAccessToken }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const doLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");

    try {
      if (!login || !password) {
        return setError("Login ou senha incorretos");
      }
      const body = { login, password };
      const result = await executeRequest("login", "POST", body);

      const { name, email, token } = result.data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("userName", name);
      localStorage.setItem("userMail", email);
      setAccessToken(token);
    } catch (error: any) {
      console.error(error);

      if (error?.response?.data?.error) {
        return setError(error?.response?.data?.error);
      }

      setError("Ocorreu erro ao processar login, tente novamente");
    }
  };

  return (
    <div className="container-login">
      <img src="/assets/images/logo.svg" alt="Logo Fiap" className="logo" />
      <form>
        <p className="error"> {error}</p>
        <div className="input-block">
          <img src="/assets/images/mail.svg" alt="Informe seu login" />
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />
        </div>
        <div className="input-block">
          <img src="/assets/images/lock.svg" alt="Informe sua senha" />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="button" onClick={doLogin}>
          Login
        </button>
      </form>
    </div>
  );
};
