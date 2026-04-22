import RespostaBox from "@/componentes/RespostaBox";
import { useViagemContext } from "@/context/ViagemContext";
import { StyleSheet, Text, View } from "react-native";

export default function Resultado() {
    const { resultadoOrcamento } = useViagemContext();

    if (!resultadoOrcamento) {
        return (
            <View style={styles.container}>
                <Text style={styles.textoVazio}>Nenhum resultado calculado ainda.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <RespostaBox />

            <Text style={styles.text}>
                Gasto medio diario: R$ {resultadoOrcamento.gastoMedioDiario.toFixed(2)}
            </Text>
            <Text style={styles.text}>
                Gasto medio por pessoa: R$ {resultadoOrcamento.gastoMedioPorPessoa.toFixed(2)}
            </Text>
            <Text style={styles.text}>Classificacao: {resultadoOrcamento.classificacao}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#ffffff",
    },
    text: {
        fontSize: 16,
        color: "#111827",
        marginBottom: 8,
    },
    textoVazio: {
        fontSize: 16,
        color: "#6b7280",
    },
});