import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Feature } from "@/data/categories";
import { ClientInfo } from "@/components/ClientForm";

const fmt = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
const fmtNum = (n: number) => Math.round(n).toLocaleString("en-IN");

export function generateQuotePdf(
  selected: Set<string>,
  margin: number,
  client: ClientInfo,
  categoryName: string,
  allFeatures: Feature[]
) {
  const items = allFeatures.filter((f) => selected.has(f.id));
  const minBase = items.reduce((s, f) => s + f.price, 0);
  const maxBase = items.reduce((s, f) => s + f.totalCost, 0);
  const days = Math.max(15, items.reduce((s, f) => s + f.days, 0));
  const minMargin = minBase * (margin / 100);
  const maxMargin = maxBase * (margin / 100);
  const minTotal = minBase + minMargin;
  const maxTotal = maxBase + maxMargin;
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const doc = new jsPDF();
  const w = doc.internal.pageSize.getWidth();

  // Clean Professional Header - Gold accent on white
  doc.setFillColor(255, 255, 255); // White background
  doc.rect(0, 0, w, 60, "F");
  
  // Gold top border line
  doc.setFillColor(201, 162, 39); // Gold #C9A227
  doc.rect(0, 0, w, 4, "F");
  
  // Company Name - Gold
  doc.setTextColor(201, 162, 39);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text("FORE FIGHT ERA", 16, 28);
  
  // Tagline - Dark gray
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Cost Estimation & Project Management", 16, 38);
  
  // Quote details on right
  doc.setTextColor(120, 120, 120);
  doc.setFontSize(9);
  doc.text("QUOTE", w - 16, 20, { align: "right" });
  doc.setTextColor(201, 162, 39);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("#FFE-" + Date.now().toString().slice(-6), w - 16, 28, { align: "right" });
  doc.setTextColor(120, 120, 120);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(today, w - 16, 36, { align: "right" });
  
  // Bottom border of header
  doc.setDrawColor(220, 220, 220);
  doc.line(16, 55, w - 16, 55);

  // Category title
  let y = 75;
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("PROJECT TYPE", 16, y);
  y += 10;
  doc.setTextColor(201, 162, 39); // Gold
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(categoryName, 16, y);

  // Client info box
  y += 18;
  const clientBoxY = y;
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(16, y, w - 32, 45, 3, 3, "F");
  doc.setDrawColor(230, 230, 230);
  doc.roundedRect(16, y, w - 32, 45, 3, 3, "S");
  
  // Client info content
  y += 12;
  doc.setTextColor(120, 120, 120);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("CLIENT INFORMATION", 24, y);
  
  y += 12;
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  let clientText = "";
  if (client.name) clientText += client.name;
  if (client.business) clientText += clientText ? `  •  ${client.business}` : client.business;
  if (clientText) doc.text(clientText, 24, y);
  
  if (client.phone) {
    y += 10;
    doc.setTextColor(100, 100, 100);
    doc.text(client.phone, 24, y);
  }
  
  // Divider
  y = clientBoxY + 55;
  doc.setDrawColor(220, 220, 220);
  doc.line(16, y, w - 16, y);
  y += 15;

  // Features table title
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("ITEMIZED FEATURES", 16, y);
  y += 8;

  const tableBody = items.map((f, i) => [
    (i + 1).toString(),
    f.name,
    f.description.length > 45 ? f.description.slice(0, 42) + "..." : f.description,
    fmtNum(f.price),
    fmtNum(f.totalCost),
    `${f.days} d`,
  ]);

  autoTable(doc, {
    startY: y,
    head: [["#", "Feature", "Description", "Price", "Total", "Days"]],
    body: tableBody,
    margin: { left: 16, right: 16 },
    headStyles: {
      fillColor: [201, 162, 39], // Gold header
      textColor: [255, 255, 255], // White text
      fontStyle: "bold",
      fontSize: 10,
      halign: "center",
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [60, 60, 60],
      halign: "left",
    },
    alternateRowStyles: { fillColor: [255, 252, 245] }, // Very light gold
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: 45, fontStyle: "bold" },
      2: { cellWidth: 70 },
      3: { halign: "right", cellWidth: 25 },
      4: { halign: "right", cellWidth: 25 },
      5: { halign: "center", cellWidth: 18 },
    },
    theme: "grid",
    tableLineColor: [230, 230, 230],
    tableLineWidth: 0.5,
  });

  // Summary section
  y = (doc as any).lastAutoTable.finalY + 15;

  // Check if we need a new page
  if (y > doc.internal.pageSize.getHeight() - 90) {
    doc.addPage();
    y = 20;
  }

  // Summary box - Clean white with gold accents
  const boxX = 16;
  const boxW = w - 32;
  const boxH = minBase === maxBase ? 70 : 85;

  doc.setFillColor(255, 255, 255); // White background
  doc.setDrawColor(201, 162, 39); // Gold border
  doc.roundedRect(boxX, y, boxW, boxH, 3, 3, "FD");
  
  // Gold header bar in summary box
  doc.setFillColor(201, 162, 39);
  doc.rect(boxX, y, boxW, 8, "F");

  y += 18;
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Cost Breakdown", boxX + 12, y);

  y += 16;
  doc.text(`Base Cost:`, boxX + 12, y);
  doc.setFont("helvetica", "bold");
  if (minBase === maxBase) {
    doc.text(`₹${fmtNum(minBase)}`, boxX + boxW - 12, y, { align: "right" });
  } else {
    doc.text(`₹${fmtNum(minBase)} - ₹${fmtNum(maxBase)}`, boxX + boxW - 12, y, { align: "right" });
  }

  y += 12;
  doc.setFont("helvetica", "normal");
  doc.text(`Margin (${margin}%):`, boxX + 12, y);
  doc.setFont("helvetica", "bold");
  if (minMargin === maxMargin) {
    doc.text(`₹${fmtNum(minMargin)}`, boxX + boxW - 12, y, { align: "right" });
  } else {
    doc.text(`₹${fmtNum(minMargin)} - ₹${fmtNum(maxMargin)}`, boxX + boxW - 12, y, { align: "right" });
  }

  y += 8;
  doc.setDrawColor(220, 220, 220);
  doc.line(boxX + 12, y, boxX + boxW - 12, y);

  y += 14;
  doc.setTextColor(201, 162, 39); // Gold
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text(`TOTAL ESTIMATE`, boxX + 12, y);
  
  if (minTotal === maxTotal) {
    doc.text(`₹${fmtNum(minTotal)}`, boxX + boxW - 12, y, { align: "right" });
  } else {
    doc.text(`₹${fmtNum(minTotal)} - ₹${fmtNum(maxTotal)}`, boxX + boxW - 12, y, { align: "right" });
  }

  y += 12;
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.setFont("helvetica", "normal");
  doc.text(`Timeline: ${days}-${days + 10} days`, boxX + 12, y);

  // Footer with gold accents
  const pageH = doc.internal.pageSize.getHeight();
  
  // Gold line above footer
  doc.setFillColor(201, 162, 39);
  doc.rect(0, pageH - 35, w, 2, "F");
  
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.setFont("helvetica", "normal");
  doc.text("Fore Fight Era • Cost Estimation & Project Management", 16, pageH - 22);
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.text("This document is an estimate only. Final pricing may vary based on detailed project requirements.", 16, pageH - 14);
  doc.text("For inquiries and project discussions, please contact us directly.", 16, pageH - 8);

  // Download with proper filename
  const safeCategoryName = categoryName.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_");
  const fileName = `FFE_Quote_${safeCategoryName}_${new Date().toISOString().slice(0,10)}.pdf`;
  doc.save(fileName);
}
