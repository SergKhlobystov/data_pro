import { GeneratedData } from '../types';

export function convertToCSV(data: GeneratedData): string {
  const headerRow = data.headers.join(',');
  const rows = data.rows.map(row => {
    return data.headers.map(header => {
      const val = row[header] === undefined || row[header] === null ? '' : row[header];
      // Escape quotes and wrap in quotes if contains comma
      const stringVal = String(val);
      if (stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n')) {
        return `"${stringVal.replace(/"/g, '""')}"`;
      }
      return stringVal;
    }).join(',');
  });
  return [headerRow, ...rows].join('\n');
}

export function downloadCSV(csvContent: string, fileName: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
