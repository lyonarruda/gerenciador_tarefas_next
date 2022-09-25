import React from "react";

type FooterProps = {
  showModal(): void;
};

export const Footer: React.FC<FooterProps> = ({ showModal }) => {
  const fullYear = new Date().getFullYear();

  return (
    <div className="container-footer">
      <button onClick={showModal}>
        <img src="/assets/images/add.svg" alt="Adiciona Tarefa" /> Adicionar uma tarefa
      </button>
      <span>© Copyright {fullYear}. Todos os direitos reservados.</span>
    </div>
  );
};
