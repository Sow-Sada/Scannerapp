import { createContext } from "react";

const HistoryContext = createContext({
  history: [],
  setHistory: () => {},
  refreshHistory: () => {},
});

export default HistoryContext;
