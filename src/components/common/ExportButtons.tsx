import { Download, FileText, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AnalysisReport } from "@/types";
import { exportCompetitorsCsv, exportLeadsCsv, exportReportPdf } from "@/utils/export";

interface ExportButtonsProps {
  report: AnalysisReport;
}

export function ExportButtons({ report }: ExportButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={() => exportReportPdf(report)}>
        <FileText className="h-4 w-4" />
        Export Report
      </Button>
      <Button variant="outline" size="sm" onClick={() => exportLeadsCsv(report.leads, report.productName)}>
        <Users className="h-4 w-4" />
        Export Leads
      </Button>
      <Button variant="outline" size="sm" onClick={() => exportCompetitorsCsv(report.competitors, report.productName)}>
        <BarChart3 className="h-4 w-4" />
        Export Competitor Analysis
      </Button>
      <Button variant="outline" size="sm" disabled title="CSV exports available above">
        <Download className="h-4 w-4" />
        Export CSV
      </Button>
    </div>
  );
}
