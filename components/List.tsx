import React, { useState } from "react";
import moment from "moment";

import { executeRequest } from "../services/apiServices";
import { Item } from "./Item";
import { Task } from "../types/Task";
import { CrudModal } from './CrudModal';


type ListProps = {
  tasks: Task[];
  getFilteredList: () => void;
};

export const List: React.FC<ListProps> = ({ tasks, getFilteredList }) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [previsionDate, setPrevisionDate] = useState("");
  const [finishDate, setFinishDate] = useState<string | undefined>("");

  const closeModal = () => {
    setShowModal(false);
    setErrorMsg("");
    setName("");
    setPrevisionDate("");
    setId("");
    setFinishDate("");
  };

  const doUpdate = async () => {
    try {
      if (!id) {
        setErrorMsg("Tarefa não encontrada");
        return;
      }

      if (!name || !previsionDate) {
        setErrorMsg("Favor preencher nome e data de previsão");
        return;
      }

      const body = {
        name,
        previsionDate,
      } as any;

      if (finishDate) {
        body.finishDate = finishDate;
      }

      await executeRequest("task?id=" + id, "PUT", body);
      await getFilteredList();
      closeModal();
    } catch (e) {
      if (e?.response?.data?.error) {
        console.log(e?.response);
        setErrorMsg(e?.response?.data?.error);
        return;
      }
      console.log(e);
      setErrorMsg("Ocorreu erro ao atualizar tarefa, tente novamenete");
    }
  };

  const doDelete = async () => {
    try {
      if (!id) {
        setErrorMsg("Tarefa não encontrada");
        return;
      }

      await executeRequest("task?id=" + id, "DELETE");
      await getFilteredList();
      closeModal();
    } catch (e) {
      if (e?.response?.data?.error) {
        console.log(e?.response);
        setErrorMsg(e?.response?.data?.error);
        return;
      }
      console.log(e);
      setErrorMsg("Ocorreu erro ao deletar tarefa, tente novamenete");
    }
  };

  const selectTask = (task: Task) => {
    setId(task._id);
    setName(task.name);
    setPrevisionDate(moment(task.previsionDate).format("yyyy-MM-DD"));
    setFinishDate(
      task.finishDate ? moment(task.finishDate).format("yyyy-MM-DD") : undefined
    );
    setShowModal(true);
  };

  return (
    <>
      <div className={`container-listagem ${tasks.length ? "" : "vazia"}`}>
        {tasks.length ? (
          tasks.map((task) => (
            <Item key={task._id} task={task} selectTaskToEdit={selectTask} />
          ))
        ) : (
          <>
            <img
              src="/assets/images/empty.svg"
              alt="Nenhuma tarefa encontrada"
            />
            <p>Você ainda não possui tarefas cadastradas!</p>
          </>
        )}
      </div>
      <CrudModal
        showModal={showModal}
        errorMsg={errorMsg}
        name={name}
        setName={setName}
        previsionDate={previsionDate}
        setPrevisionDate={setPrevisionDate}
        closeModal={closeModal}
        doSave={doUpdate}
        id={id}
        finishDate={finishDate}
        setFinishDate={setFinishDate}
        doDelete={doDelete}
      />
    </>
  );
};
