import * as XLSX from 'xlsx';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const columnTitles = {
  id: "ID",
  name: "İsim",
  email: "E-posta",
  createdAt: "Oluşturulma Tarihi",
  status: "Durum"
};

function formatData(veri: any[]) {
  return veri.map(item => ({
    [columnTitles.id]: item.id,
    [columnTitles.name]: item.name,
    [columnTitles.email]: item.email,
    [columnTitles.createdAt]: formatDate(item.createdAt),
    [columnTitles.status]: item.status
  }));
}

export function exportToExcel(veri: any[]) {
  if (!veri.length) return;

  const formattedData = formatData(veri);
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Mesajlar");
  XLSX.writeFile(workbook, "mesajlar.xlsx");
}

export function exportToCSV(veri: any[]) {
  if (!veri.length) return;

  const formattedData = formatData(veri);
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "mesajlar.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}