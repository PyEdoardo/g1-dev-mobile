export type Viagem = {
    destino: string;
    orcamentoTotal: number;
    quantidadeDias: number;
    quantidadePessoas: number;
};

export type ResultadoOrcamento = {
    viagem: Viagem;
    gastoMedioDiario: number;
    gastoMedioPorPessoa: number;
    classificacao: classificacaoOrcamento
}

export enum classificacaoOrcamento {
    Economica = "Econômica",
    Moderada = "Moderada",
    Confortavel = "Confortável",
}