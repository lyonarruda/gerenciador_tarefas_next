import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

import { DefaultMsgResponse } from "../types/DefaultMsgResponse";

export const connect =
  (next: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse<DefaultMsgResponse>) => {
    console.log("MongoDB readyState", !!mongoose.connections[0].readyState);

    if (mongoose.connections[0].readyState) {
      return next(req, res);
    }

    const DB_CONNECTION_STRING =
      "mongodb://localhost:27017/87aoj-gerenciador-tarefas";

    mongoose.connection.on("connected", () =>
      console.log("Conectado no banco de dados")
    );
    mongoose.connection.on("error", (err) =>
      console.log("Erro ao conectar no banco de dados", err)
    );

    await mongoose.connect(DB_CONNECTION_STRING);

    return next(req, res);
  };
