import React from "react";
import { Task } from "../types/Task";
import moment from "moment";

type ItemProps = {
  task: Task;
  selectTaskToEdit: (task: Task) => void;
};

export const Item: React.FC<ItemProps> = ({ task, selectTaskToEdit }) => {
  const getDataText = (
    finishDate: string | undefined,
    previsionDate: string | undefined
  ) => {
    if (finishDate) {
      return `Concluída em ${moment(finishDate).format("DD/MM/yyyy")}`;
    }

    return `Previsão de conclusão em ${moment(previsionDate).format(
      "DD/MM/yyyy"
    )}`;
  };

  return (
    <div
      className={`container-item ${task.finishDate ? "" : "ativo"}`}
      onClick={(e) => (task?.finishDate ? null : selectTaskToEdit(task))}
    >
      <img
        src={
          task.finishDate
            ? "/assets/images/checked.svg"
            : "/assets/images/not-checked.svg"
        }
        alt={
          task.finishDate ? "Atividade Concluída" : "Atividade Não Concluída"
        }
      />
      <div>
        <p className={task.finishDate ? "concluído" : ""}>{task.name}</p>
        <span>{getDataText(task.finishDate, task.previsionDate)}</span>
      </div>
    </div>
  );
};
