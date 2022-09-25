import React, { useState } from "react";

type FilterProps = {
  previsionDateStart: string;
  previsionDateEnd: string;
  status: string;
  setPrevisionDateStart(d: string): void;
  setPrevisionDateEnd(d: string): void;
  setStatus(d: string): void;
};

export const Filter: React.FC<FilterProps> = ({
  previsionDateStart,
  previsionDateEnd,
  status,
  setPrevisionDateStart,
  setPrevisionDateEnd,
  setStatus,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container-filtros">
      <div className="title">
        <span>Tarefas</span>
        <img
          src="assets/images/filter.svg"
          alt="Filtrar tarefas"
          onClick={toggleFilters}
        />
        <div className="form">
          <div>
            <label htmlFor="input-date">Data prevista de conclusão:</label>
            <input
              id="input-date"
              type="date"
              onChange={(e) => setPrevisionDateStart(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="input-until">até:</label>
            <input
              id="input-until"
              type="date"
              onChange={(e) => setPrevisionDateEnd(e.target.value)}
            />
          </div>
          <div className="line" />
          <div>
            <label htmlFor="select-status">Status: </label>
            <select
              name="select-status"
              id="select-status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value={0}>Todas</option>
              <option value={1}>Ativas</option>
              <option value={2}>Concluídas</option>
            </select>
          </div>
        </div>
      </div>
      {showFilters && (
        <div className="filterMobile">
          <div>
            <label>Período de: </label>
            <input
              type="date"
              value={previsionDateStart}
              onChange={(e) => setPrevisionDateStart(e.target.value)}
            />
          </div>
          <div>
            <label>Período até: </label>
            <input
              type="date"
              value={previsionDateEnd}
              onChange={(e) => setPrevisionDateEnd(e.target.value)}
            />
          </div>
          <div className="line" />
          <div>
            <label>Status: </label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value={0}>Todas</option>
              <option value={1}>Ativas</option>
              <option value={2}>Concluídas</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
