import { ResultadoOrcamento } from "@/types/types";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useMemo,
    useState,
} from "react";

type ViagemContextData = {
  resultadoOrcamento: ResultadoOrcamento | null;
  setResultadoOrcamento: Dispatch<SetStateAction<ResultadoOrcamento | null>>;
  limparOrcamento: () => void;
};

const ViagemContext = createContext<ViagemContextData | undefined>(undefined);

type ViagemProviderProps = {
  children: ReactNode;
};

export function ViagemProvider({ children }: ViagemProviderProps) {
  const [resultadoOrcamento, setResultadoOrcamento] =
    useState<ResultadoOrcamento | null>(null);

  const limparOrcamento = (): void => {
    setResultadoOrcamento(null);
  };

  const value = useMemo(
    () => ({
      resultadoOrcamento,
      setResultadoOrcamento,
      limparOrcamento,
    }),
    [resultadoOrcamento]
  );

  return <ViagemContext.Provider value={value}>{children}</ViagemContext.Provider>;
}

export function useViagemContext(): ViagemContextData {
  const context = useContext(ViagemContext);

  if (!context) {
    throw new Error("useViagemContext deve ser usado dentro de ViagemProvider");
  }

  return context;
}