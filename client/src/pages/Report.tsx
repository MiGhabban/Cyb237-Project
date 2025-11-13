import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Download, FileText, ArrowLeft, Eye, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function Report() {
  const reportSections = [
    {
      title: "Executive Summary",
      description: "High-level overview of findings and key metrics",
      pages: "1-2"
    },
    {
      title: "Organization & Asset Selection",
      description: "Target organization profile and application scope",
      pages: "3"
    },
    {
      title: "Threat Analysis",
      description: "STRIDE methodology, vulnerabilities, and attack tree",
      pages: "4-5"
    },
    {
      title: "Attack Demonstrations",
      description: "Three detailed attack scenarios with technical walkthroughs",
      pages: "6-8"
    },
    {
      title: "Mitigation Strategies",
      description: "Phased remediation plan with timelines and effort estimates",
      pages: "9"
    },
    {
      title: "Regulatory Compliance",
      description: "GDPR, PCI-DSS, and NIST framework alignment",
      pages: "10"
    },
    {
      title: "Ethical Considerations",
      description: "Responsible disclosure and legal considerations",
      pages: "11"
    },
    {
      title: "Appendices",
      description: "References and glossary of terms",
      pages: "12"
    }
  ];

  const reportMetrics = [
    { label: "Total Pages", value: "12" },
    { label: "Vulnerabilities Analyzed", value: "10+" },
    { label: "Attack Scenarios", value: "3" },
    { label: "Compliance Frameworks", value: "3" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="font-bold text-lg">CYB 237</div>
            </a>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </a>
            </Link>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-12 border-b border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container">
          <div className="flex items-start gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Comprehensive Security Assessment Report</h1>
              <p className="text-foreground/70 text-lg">
                Complete 12-page professional report with detailed threat analysis, attack demonstrations, and remediation strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Report Metrics */}
      <section className="py-12 border-b border-border/40">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {reportMetrics.map((metric, idx) => (
              <Card key={idx} className="bg-card/50 border-border/40">
                <CardContent className="pt-6">
                  <p className="text-foreground/70 text-sm mb-2">{metric.label}</p>
                  <p className="text-3xl font-bold text-primary">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Report Sections */}
      <section className="py-12 border-b border-border/40">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Report Contents</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {reportSections.map((section, idx) => (
              <Card key={idx} className="bg-card/50 border-border/40 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{section.title}</h3>
                      <p className="text-foreground/70 text-sm mb-2">{section.description}</p>
                      <Badge className="bg-primary/20 text-primary text-xs">Pages {section.pages}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Report Highlights */}
      <section className="py-12 border-b border-border/40 bg-card/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Report Highlights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-background/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Executive Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Comprehensive overview of findings with key metrics, risk summary, and strategic recommendations for security improvement.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Technical Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  In-depth threat modeling using STRIDE methodology, detailed vulnerability analysis, and attack tree visualization.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Attack Demonstrations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Three realistic attack scenarios with step-by-step walkthroughs, code examples, and impact assessment.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Remediation Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Phased approach to addressing vulnerabilities with timelines, effort estimates, and implementation guidance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Compliance Framework</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Alignment with GDPR, PCI-DSS, and NIST cybersecurity framework with compliance checklists and requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Ethical Considerations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Responsible disclosure process, ethical framework, and legal considerations for security assessment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-12">
        <div className="container">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30">
            <CardContent className="pt-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Download Full Report</h3>
                  <p className="text-foreground/70">
                    Get the complete 12-page professional security assessment report in PDF format.
                  </p>
                </div>
                <div className="flex gap-3">
                  <a
                    href="/CYB237_Security_Assessment_Report.pdf"
                    download="CYB237_Security_Assessment_Report.pdf"
                  >
                    <Button className="bg-primary hover:bg-primary/90">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </a>
                  <Button variant="outline" asChild>
                    <a href="/CYB237_Security_Assessment_Report.pdf" target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-2" />
                      View Online
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Report Quality Metrics */}
      <section className="py-12 border-t border-border/40 bg-card/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Report Quality Standards</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg mb-4">Professional Standards</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Executive summary for stakeholders</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Technical depth for security teams</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Clear recommendations and timelines</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Professional formatting and layout</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg mb-4">Content Coverage</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Comprehensive threat analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Realistic attack demonstrations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Detailed remediation strategies</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Regulatory compliance alignment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 bg-card/30">
        <div className="container text-center text-foreground/60 text-sm">
          <p>CYB 237: Cybersecurity Threat Analysis & Attack Simulation | Academic Project 2025</p>
          <p className="mt-2">All findings are for educational purposes only</p>
        </div>
      </footer>
    </div>
  );
}
