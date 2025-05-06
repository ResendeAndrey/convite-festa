export function maskPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 11) {
    // Celular com DDD: (31) 98888-7777
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  if (cleaned.length === 10) {
    // Telefone fixo com DDD: (31) 3888-7777
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  return phone; // Se não bater com 10 ou 11 dígitos, retorna como está
}
