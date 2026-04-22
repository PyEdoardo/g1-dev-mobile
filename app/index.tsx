import { useViagemContext } from "@/context/ViagemContext";
import { classificacaoOrcamento, ResultadoOrcamento, Viagem } from "@/types/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const { setResultadoOrcamento } = useViagemContext();
  const [destino, setDestino] = useState("");
  const [orcamentoTotal, setOrcamentoTotal] = useState("");
  const [quantidadeDias, setQuantidadeDias] = useState("");
  const [quantidadePessoas, setQuantidadePessoas] = useState("");

  const calcularOrcamento = async (): Promise<void> => {
    const orcamento = Number(orcamentoTotal);
    const dias = Number(quantidadeDias);
    const pessoas = Number(quantidadePessoas);

    if (!destino.trim() || orcamento <= 0 || dias <= 0 || pessoas <= 0) {
      Alert.alert("Dados invalidos", "Preencha todos os campos com valores validos.");
      return;
    }

    const viagem: Viagem = {
      destino: destino.trim(),
      orcamentoTotal: orcamento,
      quantidadeDias: dias,
      quantidadePessoas: pessoas,
    };

    const gastoMedioPorPessoa = orcamento / pessoas;
    const gastoMedioPorDia = orcamento / dias;
    const gastoMedioPorPessoaPorDia = orcamento / (pessoas * dias);
    let classificacao: classificacaoOrcamento;
    if (gastoMedioPorPessoaPorDia <= 80) {
      classificacao = classificacaoOrcamento.Economica;
    } else if (gastoMedioPorPessoaPorDia <= 200) {
      classificacao = classificacaoOrcamento.Moderada;
    } else {
      classificacao = classificacaoOrcamento.Confortavel;
    }

    const resultadoOrcamento: ResultadoOrcamento = {
      viagem,
      gastoMedioDiario: gastoMedioPorDia,
      gastoMedioPorPessoa,
      classificacao,
    };

    setResultadoOrcamento(resultadoOrcamento);
    router.push("/resultado");
  };

  const limparFormulario = (): void => {
    setDestino("");
    setOrcamentoTotal("");
    setQuantidadeDias("");
    setQuantidadePessoas("");
    Keyboard.dismiss();
  };

  return (
    //Usei esse pois invés da view padrão, pois no meu celular ao abrir o teclado, ele não fecha se não usar ele, é tranquilo de usar
    // e também no celular a cor das letras dos inputs tá meio apagado, mas no web funciona perfeito.
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <Text style={styles.titulo}>RotaLeve{"\n"}Seu simulador de Viagens</Text>

          <TextInput
            style={styles.input}
            value={destino}
            onChangeText={setDestino}
            placeholder="Destino"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />
          <TextInput
            style={styles.input}
            value={orcamentoTotal}
            onChangeText={setOrcamentoTotal}
            keyboardType="numeric"
            placeholder="Orcamento total"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />
          <TextInput
            style={styles.input}
            value={quantidadeDias}
            onChangeText={setQuantidadeDias}
            keyboardType="numeric"
            placeholder="Quantidade de dias"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />
          <TextInput
            style={styles.input}
            value={quantidadePessoas}
            onChangeText={setQuantidadePessoas}
            keyboardType="numeric"
            placeholder="Quantidade de pessoas"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />

          <View>
            <Pressable style={styles.button} onPress={calcularOrcamento}>
              <Text style={styles.botaoCalcular}>Calcular</Text>
            </Pressable>
            <Pressable onPress={limparFormulario}>
              <Text style={styles.botaoLimpar}>Limpar Formulario</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1b8882",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: "#cbd5e1",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 8,
    backgroundColor: "#1d4ed8",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  botaoCalcular: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  botaoLimpar: {
    fontWeight: "600",
    fontSize: 16,
    color: "#f3166b",
    marginTop: 12,
  },
});
