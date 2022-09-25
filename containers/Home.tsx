import React, { useEffect, useState } from "react";
import { NextPage } from "next";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Filter } from "../components/Filter";
import { List } from "../components/List";
import { CrudModal } from "../components/CrudModal";

import { AccessTokenProps } from "../types/AccessTokenProps";
import { executeRequest } from "../services/apiServices";
import { Task } from "../types/Task";

export const Home: NextPage<AccessTokenProps> = ({ setAccessToken }) => {
  const [previsionDateStart, setPrevisionDateStart] = useState("");
  const [previsionDateEnd, setPrevisionDateEnd] = useState("");
  const [status, setStatus] = useState("0");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [previsionDate, setPrevisionDate] = useState("");

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userMail");
    setAccessToken("");
  };

  const getTasks = React.useCallback(async () => {
    try {
      let filter = "?status=" + status;
      if (previsionDateStart) {
        filter += "&previsionDateStart=" + previsionDateStart;
      }

      if (previsionDateEnd) {
        filter += "&previsionDateEnd=" + previsionDateEnd;
      }

      const result = await executeRequest("task" + filter, "GET");
      if (result && result.data) {
        setTasks(result.data as Task[]);
      }
    } catch (e) {
      console.log(e);
    }
  }, [previsionDateEnd, previsionDateStart, status]);

  const closeModal = () => {
    setShowModal(false);
    setErrorMsg("");
    setName("");
    setPrevisionDate("");
  };

  const doSave = async () => {
    try {
      if (!name || !previsionDate) {
        setErrorMsg("Favor preencher nome e data de previsão");
        return;
      }

      const body = {
        name,
        previsionDate,
      };

      await executeRequest("task", "POST", body);
      await getTasks();
      closeModal();
    } catch (e) {
      if (e?.response?.data?.error) {
        console.log(e?.response);
        setErrorMsg(e?.response?.data?.error);
        return;
      }
      console.log(e);
      setErrorMsg("Ocorreu erro ao cadastrar tarefa, tente novamenete");
    }
  };

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <>
      <Header logout={logout} showModal={() => setShowModal(true)} />
      <Filter
        previsionDateEnd={previsionDateEnd}
        previsionDateStart={previsionDateStart}
        setPrevisionDateEnd={setPrevisionDateEnd}
        setPrevisionDateStart={setPrevisionDateStart}
        status={status}
        setStatus={setStatus}
      />
      <List tasks={tasks} getFilteredList={getTasks} />
      <Footer showModal={() => setShowModal(true)} />
      <CrudModal
        showModal={showModal}
        errorMsg={errorMsg}
        name={name}
        setName={setName}
        previsionDate={previsionDate}
        setPrevisionDate={setPrevisionDate}
        closeModal={closeModal}
        doSave={doSave}
      />
    </>
  );
};
