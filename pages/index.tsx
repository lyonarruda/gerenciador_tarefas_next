import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Login } from "../containers/Login";
import { Home } from "../containers/Home";

const Index: NextPage = () => {
  const [accesToken, setAccessToken] = useState("");
  const [shouldDisplayContent, setShouldDisplayContent] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken") || "";

      setAccessToken(token);
      setShouldDisplayContent(true);
    }
  }, [setAccessToken, setShouldDisplayContent]);

  if (!shouldDisplayContent) return null;

  return accesToken ? (
    <Home setAccessToken={setAccessToken} />
  ) : (
    <Login setAccessToken={setAccessToken} />
  );
};

export default Index;
