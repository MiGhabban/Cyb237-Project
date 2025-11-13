import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, CheckCircle2, AlertTriangle, ArrowLeft, BarChart3, FileText, Clock } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo } from "react";

export default function Compliance() {
  // CVSS Calculator State
  const [cvssMetrics, setCvssMetrics] = useState({
    av: 0.85, // Attack Vector
    ac: 0.77, // Attack Complexity
    pr: 0.85, // Privileges Required
    ui: 0.85, // User Interaction
    s: 1.0,   // Scope
    c: 0.56,  // Confidentiality
    i: 0.56,  // Integrity
    a: 0.56   // Availability
  });

  const cvssScore = useMemo(() => {
    const baseScore = Math.min(
      10,
      (((0.1 * cvssMetrics.av * cvssMetrics.ac * cvssMetrics.pr * cvssMetrics.ui) + 
        (0.1 * cvssMetrics.s * (cvssMetrics.c + cvssMetrics.i + cvssMetrics.a))) * 10)
    );
    return Math.round(baseScore * 10) / 10;
  }, [cvssMetrics]);

  const cvssRating = useMemo(() => {
    if (cvssScore === 0) return "None";
    if (cvssScore < 4) return "Low";
    if (cvssScore < 7) return "Medium";
    if (cvssScore < 9) return "High";
    return "Critical";
  }, [cvssScore]);

  const cvssColor = useMemo(() => {
    if (cvssScore === 0) return "bg-slate-500/20 text-slate-500";
    if (cvssScore < 4) return "bg-blue-500/20 text-blue-500";
    if (cvssScore < 7) return "bg-yellow-500/20 text-yellow-500";
    if (cvssScore < 9) return "bg-orange-500/20 text-orange-500";
    return "bg-destructive/20 text-destructive";
  }, [cvssScore]);

  // Compliance Checklist State
  const [complianceItems, setComplianceItems] = useState({
    gdpr: [
      { id: "gdpr-1", name: "Data Protection Impact Assessment (DPIA)", completed: false },
      { id: "gdpr-2", name: "Data Processing Agreements (DPA)", completed: false },
      { id: "gdpr-3", name: "User Consent Management", completed: false },
      { id: "gdpr-4", name: "Right to be Forgotten Implementation", completed: false },
      { id: "gdpr-5", name: "Data Breach Notification Procedure", completed: false }
    ],
    pciDss: [
      { id: "pci-1", name: "Install and maintain firewall", completed: false },
      { id: "pci-2", name: "Do not use default credentials", completed: false },
      { id: "pci-3", name: "Protect stored cardholder data", completed: false },
      { id: "pci-4", name: "Encrypt transmission of cardholder data", completed: false },
      { id: "pci-5", name: "Protect systems against malware", completed: false }
    ],
    nist: [
      { id: "nist-1", name: "Identify - Asset Management", completed: false },
      { id: "nist-2", name: "Protect - Access Control", completed: false },
      { id: "nist-3", name: "Detect - Anomalies and Events", completed: false },
      { id: "nist-4", name: "Respond - Incident Response Plan", completed: false },
      { id: "nist-5", name: "Recover - Business Continuity", completed: false }
    ]
  });

  const toggleCompliance = (framework: keyof typeof complianceItems, itemId: string) => {
    setComplianceItems(prev => ({
      ...prev,
      [framework]: prev[framework].map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    }));
  };

  const getComplianceProgress = (framework: keyof typeof complianceItems) => {
    const items = complianceItems[framework];
    const completed = items.filter(item => item.completed).length;
    return Math.round((completed / items.length) * 100);
  };

  // Remediation Timeline
  const remediationPlan = [
    {
      phase: "Phase 1: Immediate (Week 1-2)",
      priority: "CRITICAL",
      tasks: [
        "Implement parameterized queries for all database operations",
        "Deploy rate limiting on authentication endpoints",
        "Enable input validation and output encoding",
        "Implement HTTPS with strong TLS configuration"
      ]
    },
    {
      phase: "Phase 2: Short-term (Week 3-6)",
      priority: "HIGH",
      tasks: [
        "Implement multi-factor authentication (MFA)",
        "Deploy Web Application Firewall (WAF)",
        "Conduct security code review",
        "Implement comprehensive logging and monitoring"
      ]
    },
    {
      phase: "Phase 3: Medium-term (Week 7-12)",
      priority: "HIGH",
      tasks: [
        "Implement security awareness training",
        "Deploy intrusion detection systems (IDS)",
        "Conduct regular penetration testing",
        "Implement data encryption at rest"
      ]
    },
    {
      phase: "Phase 4: Long-term (Month 4-6)",
      priority: "MEDIUM",
      tasks: [
        "Establish security incident response team",
        "Implement continuous security monitoring",
        "Conduct annual security audit",
        "Update security policies and procedures"
      ]
    }
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
      <section className="py-12 border-b border-border/40">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Compliance & Remediation</h1>
          <p className="text-foreground/70 text-lg">
            CVSS scoring, regulatory compliance frameworks, and comprehensive remediation planning.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <Tabs defaultValue="cvss" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="cvss">CVSS Calculator</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="remediation">Remediation Plan</TabsTrigger>
            </TabsList>

            {/* CVSS Calculator */}
            <TabsContent value="cvss" className="space-y-6">
              <Card className="bg-card/50 border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    CVSS v3.1 Calculator
                  </CardTitle>
                  <CardDescription>
                    Calculate Common Vulnerability Scoring System (CVSS) scores for vulnerabilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Score Display */}
                  <div className="bg-background/50 p-6 rounded-lg border border-border/40">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-foreground/70 text-sm mb-2">CVSS Score</p>
                        <div className="text-5xl font-bold text-primary">{cvssScore}</div>
                      </div>
                      <div>
                        <p className="text-foreground/70 text-sm mb-2">Severity Rating</p>
                        <Badge className={`text-lg px-4 py-2 ${cvssColor}`}>
                          {cvssRating}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Attack Vector (AV): {cvssMetrics.av === 0.85 ? "Network" : cvssMetrics.av === 0.62 ? "Adjacent" : "Local"}
                      </label>
                      <Slider
                        value={[cvssMetrics.av]}
                        onValueChange={(val) => setCvssMetrics({ ...cvssMetrics, av: val[0] })}
                        min={0.45}
                        max={0.85}
                        step={0.2}
                        className="w-full"
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        How the vulnerability can be exploited (Network, Adjacent, Local)
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Attack Complexity (AC): {cvssMetrics.ac === 0.77 ? "Low" : "High"}
                      </label>
                      <Slider
                        value={[cvssMetrics.ac]}
                        onValueChange={(val) => setCvssMetrics({ ...cvssMetrics, ac: val[0] })}
                        min={0.44}
                        max={0.77}
                        step={0.33}
                        className="w-full"
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        Conditions beyond the attacker's control required to exploit
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Confidentiality (C): {cvssMetrics.c === 0.56 ? "High" : cvssMetrics.c === 0.22 ? "Low" : "None"}
                      </label>
                      <Slider
                        value={[cvssMetrics.c]}
                        onValueChange={(val) => setCvssMetrics({ ...cvssMetrics, c: val[0] })}
                        min={0}
                        max={0.56}
                        step={0.28}
                        className="w-full"
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        Impact on confidentiality of the system
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Integrity (I): {cvssMetrics.i === 0.56 ? "High" : cvssMetrics.i === 0.22 ? "Low" : "None"}
                      </label>
                      <Slider
                        value={[cvssMetrics.i]}
                        onValueChange={(val) => setCvssMetrics({ ...cvssMetrics, i: val[0] })}
                        min={0}
                        max={0.56}
                        step={0.28}
                        className="w-full"
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        Impact on integrity of the system
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Availability (A): {cvssMetrics.a === 0.56 ? "High" : cvssMetrics.a === 0.22 ? "Low" : "None"}
                      </label>
                      <Slider
                        value={[cvssMetrics.a]}
                        onValueChange={(val) => setCvssMetrics({ ...cvssMetrics, a: val[0] })}
                        min={0}
                        max={0.56}
                        step={0.28}
                        className="w-full"
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        Impact on availability of the system
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Compliance */}
            <TabsContent value="compliance" className="space-y-6">
              <Tabs defaultValue="gdpr" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="gdpr">GDPR</TabsTrigger>
                  <TabsTrigger value="pci">PCI-DSS</TabsTrigger>
                  <TabsTrigger value="nist">NIST</TabsTrigger>
                </TabsList>

                {/* GDPR */}
                <TabsContent value="gdpr" className="space-y-4">
                  <Card className="bg-card/50 border-border/40">
                    <CardHeader>
                      <CardTitle>GDPR Compliance Checklist</CardTitle>
                      <CardDescription>
                        General Data Protection Regulation requirements
                      </CardDescription>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold">Progress</span>
                          <span className="text-sm text-primary">{getComplianceProgress("gdpr")}%</span>
                        </div>
                        <div className="w-full bg-background/50 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${getComplianceProgress("gdpr")}%` }}
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {complianceItems.gdpr.map(item => (
                        <div key={item.id} className="flex items-center gap-3 p-3 bg-background/50 rounded border border-border/40">
                          <Checkbox
                            checked={item.completed}
                            onCheckedChange={() => toggleCompliance("gdpr", item.id)}
                          />
                          <span className={item.completed ? "line-through text-foreground/50" : "text-foreground/70"}>
                            {item.name}
                          </span>
                          {item.completed && <CheckCircle2 className="h-4 w-4 text-primary ml-auto" />}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* PCI-DSS */}
                <TabsContent value="pci" className="space-y-4">
                  <Card className="bg-card/50 border-border/40">
                    <CardHeader>
                      <CardTitle>PCI-DSS Compliance Checklist</CardTitle>
                      <CardDescription>
                        Payment Card Industry Data Security Standard requirements
                      </CardDescription>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold">Progress</span>
                          <span className="text-sm text-primary">{getComplianceProgress("pciDss")}%</span>
                        </div>
                        <div className="w-full bg-background/50 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${getComplianceProgress("pciDss")}%` }}
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {complianceItems.pciDss.map(item => (
                        <div key={item.id} className="flex items-center gap-3 p-3 bg-background/50 rounded border border-border/40">
                          <Checkbox
                            checked={item.completed}
                            onCheckedChange={() => toggleCompliance("pciDss", item.id)}
                          />
                          <span className={item.completed ? "line-through text-foreground/50" : "text-foreground/70"}>
                            {item.name}
                          </span>
                          {item.completed && <CheckCircle2 className="h-4 w-4 text-primary ml-auto" />}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* NIST */}
                <TabsContent value="nist" className="space-y-4">
                  <Card className="bg-card/50 border-border/40">
                    <CardHeader>
                      <CardTitle>NIST Cybersecurity Framework</CardTitle>
                      <CardDescription>
                        National Institute of Standards and Technology framework
                      </CardDescription>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold">Progress</span>
                          <span className="text-sm text-primary">{getComplianceProgress("nist")}%</span>
                        </div>
                        <div className="w-full bg-background/50 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${getComplianceProgress("nist")}%` }}
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {complianceItems.nist.map(item => (
                        <div key={item.id} className="flex items-center gap-3 p-3 bg-background/50 rounded border border-border/40">
                          <Checkbox
                            checked={item.completed}
                            onCheckedChange={() => toggleCompliance("nist", item.id)}
                          />
                          <span className={item.completed ? "line-through text-foreground/50" : "text-foreground/70"}>
                            {item.name}
                          </span>
                          {item.completed && <CheckCircle2 className="h-4 w-4 text-primary ml-auto" />}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Remediation Plan */}
            <TabsContent value="remediation" className="space-y-6">
              <Card className="bg-card/50 border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Remediation Timeline & Plan
                  </CardTitle>
                  <CardDescription>
                    Phased approach to addressing identified vulnerabilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {remediationPlan.map((phase, idx) => (
                    <div key={idx} className="border-l-4 border-primary pl-6 py-4">
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="font-semibold text-lg">{phase.phase}</h4>
                        <Badge className={
                          phase.priority === "CRITICAL" ? "bg-destructive/20 text-destructive" :
                          phase.priority === "HIGH" ? "bg-orange-500/20 text-orange-500" :
                          "bg-yellow-500/20 text-yellow-500"
                        }>
                          {phase.priority}
                        </Badge>
                      </div>
                      <ul className="space-y-2">
                        {phase.tasks.map((task, taskIdx) => (
                          <li key={taskIdx} className="flex items-start gap-3 text-foreground/70">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 bg-card/30">
        <div className="container text-center text-foreground/60 text-sm">
          <p>CYB 237: Cybersecurity Threat Analysis & Attack Simulation | Academic Project 2025</p>
        </div>
      </footer>
    </div>
  );
}
