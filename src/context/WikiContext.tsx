import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { WikiPage, loadPages, savePages } from "../utils/storage";

type State = { pages: WikiPage[] };

type Action =
  | { type: "ADD_PAGE"; payload: WikiPage }
  | { type: "UPDATE_PAGE"; payload: WikiPage }
  | { type: "DELETE_PAGE"; payload: string };

const initialState: State = { pages: loadPages() };

function wikiReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_PAGE":
      return { pages: [...state.pages, action.payload] };
    case "UPDATE_PAGE":
      return {
        pages: state.pages.map((p) =>
          p.slug === action.payload.slug ? action.payload : p,
        ),
      };
    case "DELETE_PAGE":
      return { pages: state.pages.filter((p) => p.slug !== action.payload) };
    default:
      return state;
  }
}

const WikiContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function WikiProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wikiReducer, initialState);

  useEffect(() => {
    savePages(state.pages);
  }, [state.pages]);

  return (
    <WikiContext.Provider value={{ state, dispatch }}>
      {children}
    </WikiContext.Provider>
  );
}

export function useWiki() {
  const context = useContext(WikiContext);
  if (!context) {
    throw new Error("useWiki must be used within a WikiProvider");
  }
  return context;
}
