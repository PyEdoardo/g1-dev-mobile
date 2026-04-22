import { useViagemContext } from "@/context/ViagemContext";
import { StyleSheet, Text, View } from "react-native";

export default function RespostaBox() {
    const { resultadoOrcamento } = useViagemContext();

    if (!resultadoOrcamento) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Destino: {resultadoOrcamento.viagem.destino}</Text>
            <Text style={styles.text}>
                Orcamento Total: R$ {resultadoOrcamento.viagem.orcamentoTotal.toFixed(2)}
            </Text>
            <Text style={styles.text}>Quantidade de Dias: {resultadoOrcamento.viagem.quantidadeDias}</Text>
            <Text style={styles.text}>
                Quantidade de Pessoas: {resultadoOrcamento.viagem.quantidadePessoas}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#f1f5f9",
    },
    text: {
        fontSize: 16,
        color: "#111827",
        marginBottom: 6,
    },
});