import React, { useState } from "react";
import HistoryContext from "./HistoryContext";

const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refreshHistory = () => {
    setRefreshFlag((prevFlag) => !prevFlag);
  };
  return (
    <HistoryContext.Provider
      value={{ history, setHistory, refreshFlag, refreshHistory }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;
