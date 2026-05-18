import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportTableToPDF<T>({
  data,
  fileName = "lista-convidados.pdf"
}: {
  data: T[];
  fileName?: string;
}) {
  const doc = new jsPDF();

  const headers = ["Nome", "Familia", "Presente"];

  const rows = data.map((item) => {
    const name =
      item && typeof item === "object" && "name" in item
        ? String(item["name"])
        : "";
    const familia =
      item && typeof item === "object" && "family" in item
        ? String(item["family"]?.name as any).replace("Family", "")
        : "";
    const checkbox = "";

    return [name, familia, checkbox];
  });

  autoTable(doc, {
    head: [headers],
    body: rows,
    styles: { fontSize: 10 },

    headStyles: { fillColor: [217, 119, 6] }, // amber-600
    margin: { top: 20 }
  });

  // Depois pega o total de páginas
  const pageCount = doc.internal.getNumberOfPages();

  // Muda para última página
  doc.setPage(pageCount);

  // Define o texto do rodapé
  const footerText = `Total de convidados: ${data.length}`;

  // Posição do rodapé (10 unidades do fim da página)
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const yPos = pageHeight - 10;

  // Define fonte, cor e escreve texto alinhado ao centro
  doc.setFontSize(10);
  doc.setTextColor(217, 119, 6); // amber-600
  doc.text(footerText, pageWidth / 2, yPos, { align: "center" });

  // Salva o arquivo
  doc.save(fileName);
}
