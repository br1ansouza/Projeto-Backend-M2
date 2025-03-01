import * as cpfCnpj from "cpf-cnpj-validator";

export const validateCPF = (document: string): boolean => cpfCnpj.cpf.isValid(document);
export const validateCNPJ = (document: string): boolean => cpfCnpj.cnpj.isValid(document);
