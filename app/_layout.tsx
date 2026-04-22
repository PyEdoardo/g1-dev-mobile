import { ViagemProvider } from "@/context/ViagemContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ViagemProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Simulador de Viagens" }} />
        <Stack.Screen name="resultado" options={{ title: "Resultado" }} />
      </Stack>
    </ViagemProvider>
  );
}
