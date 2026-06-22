import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { AnalysisReport, Competitor, Lead } from "@/types";

function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeCsvField(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function exportLeadsCsv(leads: Lead[], productName: string) {
  const headers = [
    "Company Name",
    "Website",
    "Industry",
    "Employee Size",
    "Location",
    "Contact Person",
    "Job Title",
    "LinkedIn",
    "Confidence Score",
    "Value Score",
  ];
  const rows = leads.map((lead) =>
    [
      lead.companyName,
      lead.website,
      lead.industry,
      lead.employeeSize,
      lead.location,
      lead.contactPerson,
      lead.jobTitle,
      lead.linkedIn,
      String(lead.confidenceScore),
      String(lead.valueScore),
    ]
      .map(escapeCsvField)
      .join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  downloadBlob(csv, `${slugify(productName)}-leads.csv`, "text/csv;charset=utf-8;");
}

export function exportCompetitorsCsv(competitors: Competitor[], productName: string) {
  const headers = [
    "Name",
    "Website",
    "Pricing",
    "Target Audience",
    "Strengths",
    "Weaknesses",
    "Confidence Score",
  ];
  const rows = competitors.map((c) =>
    [
      c.name,
      c.website,
      c.pricing,
      c.targetAudience,
      c.strengths.join("; "),
      c.weaknesses.join("; "),
      String(c.confidenceScore),
    ]
      .map(escapeCsvField)
      .join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  downloadBlob(csv, `${slugify(productName)}-competitors.csv`, "text/csv;charset=utf-8;");
}

export function exportReportPdf(report: AnalysisReport) {
  const doc = new jsPDF();
  const margin = 14;
  let y = 20;

  doc.setFontSize(18);
  doc.text("Competitor Intelligence Report", margin, y);
  y += 10;
  doc.setFontSize(11);
  doc.text(`Product: ${report.productName}`, margin, y);
  y += 6;
  doc.text(`Generated: ${new Date(report.generatedAt).toLocaleString()}`, margin, y);
  y += 10;

  doc.setFontSize(14);
  doc.text("Executive Summary", margin, y);
  y += 8;
  doc.setFontSize(10);
  report.founderDecisions.forEach((d) => {
    doc.setFont("helvetica", "bold");
    doc.text(d.question, margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(d.answer, 180);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 4;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.addPage();
  doc.setFontSize(14);
  doc.text("Competitors", margin, 20);
  autoTable(doc, {
    startY: 26,
    head: [["Competitor", "Pricing", "Audience", "Strengths", "Weaknesses"]],
    body: report.competitors.map((c) => [
      c.name,
      c.pricing,
      c.targetAudience,
      c.strengths.slice(0, 2).join(", "),
      c.weaknesses.slice(0, 2).join(", "),
    ]),
    styles: { fontSize: 8 },
  });

  doc.addPage();
  doc.setFontSize(14);
  doc.text("Top Leads", margin, 20);
  autoTable(doc, {
    startY: 26,
    head: [["Company", "Industry", "Contact", "Title", "Score"]],
    body: report.leads.slice(0, 10).map((l) => [
      l.companyName,
      l.industry,
      l.contactPerson,
      l.jobTitle,
      String(l.valueScore),
    ]),
    styles: { fontSize: 8 },
  });

  doc.save(`${slugify(report.productName)}-report.pdf`);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50) || "analysis";
}
