import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, Zap, Lock, Eye, Code2, CheckCircle2, ArrowLeft, Download } from "lucide-react";
import { Link } from "wouter";

export default function ThreatModeling() {
  const threatCategories = [
    {
      id: "authentication",
      name: "Authentication Attacks",
      icon: Eye,
      description: "Attacks targeting user authentication mechanisms",
      threats: [
        { name: "Credential Stuffing", severity: "HIGH", likelihood: "HIGH" },
        { name: "Brute Force Attack", severity: "CRITICAL", likelihood: "MEDIUM" },
        { name: "Social Engineering", severity: "HIGH", likelihood: "HIGH" }
      ]
    },
    {
      id: "data-breach",
      name: "Data Breach Attacks",
      icon: Lock,
      description: "Attacks targeting sensitive data extraction",
      threats: [
        { name: "SQL Injection", severity: "CRITICAL", likelihood: "HIGH" },
        { name: "NoSQL Injection", severity: "CRITICAL", likelihood: "MEDIUM" },
        { name: "API Exploitation", severity: "HIGH", likelihood: "MEDIUM" }
      ]
    },
    {
      id: "injection",
      name: "Injection Attacks",
      icon: Code2,
      description: "Code injection and command injection attacks",
      threats: [
        { name: "XSS Stored", severity: "HIGH", likelihood: "HIGH" },
        { name: "XSS Reflected", severity: "MEDIUM", likelihood: "MEDIUM" },
        { name: "CSRF Attack", severity: "HIGH", likelihood: "MEDIUM" }
      ]
    },
    {
      id: "session",
      name: "Session Attacks",
      icon: Shield,
      description: "Session management and token manipulation",
      threats: [
        { name: "Session Hijacking", severity: "CRITICAL", likelihood: "HIGH" },
        { name: "Session Fixation", severity: "HIGH", likelihood: "MEDIUM" },
        { name: "Token Prediction", severity: "CRITICAL", likelihood: "MEDIUM" }
      ]
    }
  ];

  const riskMatrix = [
    { threat: "SQL Injection", likelihood: "High", impact: "Critical", risk: "Critical", mitigation: "Parameterized Queries" },
    { threat: "Session Hijacking", likelihood: "High", impact: "Critical", risk: "Critical", mitigation: "Secure Tokens" },
    { threat: "XSS Stored", likelihood: "High", impact: "High", risk: "High", mitigation: "Input Validation" },
    { threat: "Brute Force", likelihood: "Medium", impact: "High", risk: "High", mitigation: "Rate Limiting" },
    { threat: "CSRF", likelihood: "Medium", impact: "High", risk: "High", mitigation: "CSRF Tokens" },
    { threat: "API Exploitation", likelihood: "Medium", impact: "High", risk: "High", mitigation: "API Security" },
    { threat: "Credential Stuffing", likelihood: "High", impact: "High", risk: "High", mitigation: "MFA" },
    { threat: "Social Engineering", likelihood: "High", impact: "High", risk: "High", mitigation: "Training" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-destructive/20 text-destructive";
      case "HIGH":
        return "bg-orange-500/20 text-orange-500";
      case "MEDIUM":
        return "bg-yellow-500/20 text-yellow-500";
      default:
        return "bg-primary/20 text-primary";
    }
  };

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
          <h1 className="text-4xl font-bold mb-4">Threat Modeling & Risk Assessment</h1>
          <p className="text-foreground/70 text-lg">
            Comprehensive threat analysis using attack trees, risk matrices, and STRIDE methodology to identify and prioritize security risks.
          </p>
        </div>
      </section>

      {/* Attack Tree Visualization */}
      <section className="py-12 border-b border-border/40">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Attack Tree Visualization</h2>
          <Card className="bg-card/50 border-border/40 overflow-hidden">
            <CardContent className="pt-6">
              <div className="bg-background/50 rounded-lg p-6 border border-border/40">
                <img 
                  src="/attack_tree.png" 
                  alt="Attack Tree Diagram" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <p className="text-foreground/70 mt-4 text-sm">
                The attack tree above illustrates the hierarchical structure of potential attacks against the e-commerce platform, showing how different attack vectors can lead to data compromise.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Threat Categories */}
      <section className="py-12 border-b border-border/40">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Threat Categories & Attack Vectors</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {threatCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id} className="bg-card/50 border-border/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      {category.name}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.threats.map((threat, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-background/50 rounded border border-border/40">
                          <span className="text-foreground/70">{threat.name}</span>
                          <div className="flex gap-2">
                            <Badge className={getSeverityColor(threat.severity)}>
                              {threat.severity}
                            </Badge>
                            <Badge className="bg-primary/20 text-primary">
                              {threat.likelihood}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Risk Matrix */}
      <section className="py-12 border-b border-border/40">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Risk Assessment Matrix</h2>
          <Card className="bg-card/50 border-border/40 overflow-hidden">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/40 bg-background/50">
                      <th className="text-left py-3 px-4 font-semibold">Threat</th>
                      <th className="text-center py-3 px-4 font-semibold">Likelihood</th>
                      <th className="text-center py-3 px-4 font-semibold">Impact</th>
                      <th className="text-center py-3 px-4 font-semibold">Risk Level</th>
                      <th className="text-left py-3 px-4 font-semibold">Primary Mitigation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riskMatrix.map((row, idx) => (
                      <tr key={idx} className="border-b border-border/40 hover:bg-background/30 transition-colors">
                        <td className="py-3 px-4 font-medium">{row.threat}</td>
                        <td className="text-center py-3 px-4">
                          <Badge className="bg-primary/20 text-primary">{row.likelihood}</Badge>
                        </td>
                        <td className="text-center py-3 px-4">
                          <Badge className="bg-orange-500/20 text-orange-500">{row.impact}</Badge>
                        </td>
                        <td className="text-center py-3 px-4">
                          <Badge className={row.risk === "Critical" ? "bg-destructive/20 text-destructive" : "bg-orange-500/20 text-orange-500"}>
                            {row.risk}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-foreground/70">{row.mitigation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* STRIDE Methodology */}
      <section className="py-12 border-b border-border/40">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">STRIDE Threat Modeling</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Spoofing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-3">Pretending to be something or someone other than yourself</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>• Fake user identities</li>
                  <li>• IP spoofing attacks</li>
                  <li>• DNS spoofing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Tampering</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-3">Modifying data or code on disk, memory, or network</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>• Database manipulation</li>
                  <li>• Code injection</li>
                  <li>• Man-in-the-middle attacks</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Repudiation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-3">Denying that you performed an action or were responsible</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>• Lack of audit logs</li>
                  <li>• Untraced transactions</li>
                  <li>• Deniable actions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Information Disclosure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-3">Exposing information to people who shouldn't have access</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>• Data leaks</li>
                  <li>• Unauthorized access</li>
                  <li>• Privacy violations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Denial of Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-3">Preventing legitimate users from accessing the system</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>• DDoS attacks</li>
                  <li>• Resource exhaustion</li>
                  <li>• Service crashes</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Elevation of Privilege</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-3">Gaining higher-level permissions than authorized</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>• Privilege escalation</li>
                  <li>• Admin access bypass</li>
                  <li>• Role manipulation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mitigation Strategies */}
      <section className="py-12 bg-card/30 border-y border-border/40">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Mitigation Strategies by Priority</h2>
          <div className="space-y-4">
            <Card className="bg-background/50 border-destructive/30 border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  CRITICAL - Immediate Action Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-foreground/70">
                  <li>• Implement parameterized queries for all database operations</li>
                  <li>• Deploy cryptographically secure session token generation</li>
                  <li>• Enable input validation and output encoding</li>
                  <li>• Implement rate limiting on authentication endpoints</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-orange-500/30 border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-500">
                  <Zap className="h-5 w-5" />
                  HIGH - Address Within 1-3 Months
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-foreground/70">
                  <li>• Implement multi-factor authentication (MFA)</li>
                  <li>• Deploy Web Application Firewall (WAF)</li>
                  <li>• Conduct security code review</li>
                  <li>• Implement comprehensive logging and monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-primary/30 border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  MEDIUM - Address Within 3-6 Months
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-foreground/70">
                  <li>• Implement security awareness training</li>
                  <li>• Deploy intrusion detection systems</li>
                  <li>• Conduct regular penetration testing</li>
                  <li>• Implement data encryption at rest</li>
                </ul>
              </CardContent>
            </Card>
          </div>
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
