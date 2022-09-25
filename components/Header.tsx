import { NextPage } from "next";
import React from "react";

type HeaderProps = {
  logout: () => void;
  showModal(): void;
};

export const Header: NextPage<HeaderProps> = ({ logout, showModal }) => {
  const fullName =
    (typeof window !== "undefined" && localStorage.getItem("userName")) || "";
  const userName = fullName?.split(" ")[0] || "...";

  return (
    <div className="container-header">
      <img src="/assets/images/logo.svg" alt="Logo FIAP" className="logo" />
      <button type="button" onClick={showModal}>
        Adicionar Tarefa
      </button>
      <div className="mobile">
        <span>Olá, {userName}</span>
        <img src="/assets/images/exit-mobile.svg" alt="Sair" onClick={logout} />
      </div>
      <div className="desktop">
        <span>Olá, {userName}</span>
        <img
          src="/assets/images/exit-desktop.svg"
          alt="Sair"
          onClick={logout}
        />
      </div>
    </div>
  );
};
