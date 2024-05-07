export interface Lancamento {
    id?: string;
    nome: string;
    idConta: string;
    idCategoria: string;
    data: string;
    valor: number;
    pago: boolean;
  }