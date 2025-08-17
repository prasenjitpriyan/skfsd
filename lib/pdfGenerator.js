import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function generateDailyReportPDF(reportData, officeName) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.text('SKFSD Daily Report', 20, 20);

  // Office name and date
  doc.setFontSize(14);
  doc.text(`Office: ${officeName}`, 20, 35);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 45);

  // Report data table
  const tableData = Object.entries(reportData)
    .filter(([key]) => key !== 'officeName' && key !== 'date' && key !== '_id')
    .map(([key, value]) => [
      key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
      value || 0,
    ]);

  doc.autoTable({
    startY: 60,
    head: [['Field', 'Value']],
    body: tableData,
    theme: 'striped',
  });

  return doc;
}

export function generateMonthlyReportPDF(reportsData, officeName, month) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.text('SKFSD Monthly Report', 20, 20);

  // Office name and month
  doc.setFontSize(14);
  doc.text(`Office: ${officeName}`, 20, 35);
  doc.text(`Month: ${month}`, 20, 45);

  // Summary data
  const summaryData = reportsData.map((report) => [
    new Date(report.date).toLocaleDateString(),
    report.totalAccountOpened || 0,
    report.collectionAmount || 0,
    report.numberOfPhilately || 0,
  ]);

  doc.autoTable({
    startY: 60,
    head: [['Date', 'Accounts Opened', 'Collection Amount', 'Philately']],
    body: summaryData,
    theme: 'striped',
  });

  return doc;
}
