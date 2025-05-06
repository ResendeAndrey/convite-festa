export function formatPhoneRaw(phone: string): string {
  return phone.replace(/\D/g, ""); // Remove tudo que não for número
}
