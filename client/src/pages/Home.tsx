import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, Zap, Lock, Eye, Code2, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");

  const vulnerabilities = [
    {
      id: 1,
      title: "Broken Access Control",
      severity: "CRITICAL",
      cvss: 9.1,
      description: "Unauthorized access to resources beyond authorization level",
      icon: Shield
    },
    {
      id: 2,
      title: "Cryptographic Failures",
      severity: "CRITICAL",
      cvss: 9.0,
      description: "Sensitive data transmitted without encryption",
      icon: Lock
    },
    {
      id: 3,
      title: "Injection Attacks",
      severity: "CRITICAL",
      cvss: 9.8,
      description: "SQL injection through unsanitized user inputs",
      icon: Code2
    },
    {
      id: 4,
      title: "Insecure Design",
      severity: "HIGH",
      cvss: 8.5,
      description: "Missing security controls in the design phase",
      icon: AlertTriangle
    },
    {
      id: 5,
      title: "Security Misconfiguration",
      severity: "HIGH",
      cvss: 8.2,
      description: "Debug mode enabled, default credentials not changed",
      icon: Zap
    },
    {
      id: 6,
      title: "Authentication Failures",
      severity: "CRITICAL",
      cvss: 9.1,
      description: "Weak password policies, no multi-factor authentication",
      icon: Eye
    }
  ];

  const attacks = [
    {
      title: "SQL Injection",
      description: "Unauthorized database access through malicious SQL queries",
      impact: "Complete database compromise",
      difficulty: "High"
    },
    {
      title: "Session Hijacking",
      description: "Account takeover via predictable session tokens",
      impact: "Unauthorized account access",
      difficulty: "Medium"
    },
    {
      title: "Cross-Site Scripting (XSS)",
      description: "Persistent malicious code injection in user reviews",
      impact: "Session theft and credential harvesting",
      difficulty: "Medium"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="font-bold text-lg">CYB 237</div>
          </div>
          <nav className="hidden md:flex gap-8">
            <button onClick={() => setActiveTab("overview")} className="text-sm hover:text-primary transition-colors">Overview</button>
            <button onClick={() => setActiveTab("vulnerabilities")} className="text-sm hover:text-primary transition-colors">Vulnerabilities</button>
            <button onClick={() => setActiveTab("attacks")} className="text-sm hover:text-primary transition-colors">Attacks</button>
            <Link href="/threat-modeling">
              <a className="text-sm hover:text-primary transition-colors">Threat Modeling</a>
            </Link>
            <Link href="/labs">
              <a className="text-sm hover:text-primary transition-colors">Labs</a>
            </Link>
            <Link href="/compliance">
              <a className="text-sm hover:text-primary transition-colors">Compliance</a>
            </Link>
            <Link href="/report">
              <a className="text-sm hover:text-primary transition-colors">Report</a>
            </Link>
            <button onClick={() => setActiveTab("mitigation")} className="text-sm hover:text-primary transition-colors">Mitigation</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30">Academic Security Project</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Cybersecurity Threat Analysis & Attack Simulation
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed">
              A comprehensive security assessment of a modern e-commerce platform, identifying critical vulnerabilities, demonstrating realistic attack scenarios, and proposing effective mitigation strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                View Full Report <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/vulnerabilities">
                <a>
                  <Button size="lg" variant="outline">
                    Explore Vulnerabilities
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border/40">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <p className="text-sm text-foreground/60">Vulnerabilities Identified</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <p className="text-sm text-foreground/60">Attack Demonstrations</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <p className="text-sm text-foreground/60">Critical Issues</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-foreground/60">Coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-20">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
              <TabsTrigger value="attacks">Attacks</TabsTrigger>
              <TabsTrigger value="mitigation">Mitigation</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-card/50 border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Project Overview
                  </CardTitle>
                  <CardDescription>Target Application: E-Commerce Platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Organization Profile</h4>
                    <p className="text-foreground/70">
                      Mid-sized e-commerce company operating a public-facing web application serving thousands of daily users with online shopping capabilities. The platform handles sensitive customer data including payment information and personal details with a multi-tier architecture.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Application Scope</h4>
                    <ul className="text-foreground/70 space-y-1 ml-4">
                      <li>• Web-based shopping platform with user authentication</li>
                      <li>• Product catalog and inventory management</li>
                      <li>• Shopping cart and checkout functionality</li>
                      <li>• User account management and order history</li>
                      <li>• Payment processing integration</li>
                      <li>• Admin dashboard for store management</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Vulnerabilities Tab */}
            <TabsContent value="vulnerabilities" className="space-y-6">
              <div className="grid gap-4">
                {vulnerabilities.map((vuln) => {
                  const Icon = vuln.icon;
                  const severityColor = vuln.severity === "CRITICAL" ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary";
                  return (
                    <Card key={vuln.id} className="bg-card/50 border-border/40 hover:border-primary/40 transition-colors">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold">{vuln.title}</h3>
                              <Badge className={severityColor}>{vuln.severity}</Badge>
                              <span className="text-sm text-foreground/60">CVSS {vuln.cvss}</span>
                            </div>
                            <p className="text-foreground/70">{vuln.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Attacks Tab */}
            <TabsContent value="attacks" className="space-y-6">
              <div className="grid gap-4">
                {attacks.map((attack, idx) => (
                  <Card key={idx} className="bg-card/50 border-border/40">
                    <CardHeader>
                      <CardTitle className="text-lg">{attack.title}</CardTitle>
                      <CardDescription>{attack.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="text-sm font-semibold text-foreground/60">Impact: </span>
                        <span className="text-foreground/70">{attack.impact}</span>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-foreground/60">Difficulty: </span>
                        <span className="text-foreground/70">{attack.difficulty}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Mitigation Tab */}
            <TabsContent value="mitigation" className="space-y-6">
              <Card className="bg-card/50 border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Mitigation Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">SQL Injection Prevention</h4>
                    <ul className="text-foreground/70 space-y-1 ml-4">
                      <li>• Use parameterized queries and prepared statements</li>
                      <li>• Implement strict input validation and sanitization</li>
                      <li>• Apply principle of least privilege for database access</li>
                      <li>• Deploy Web Application Firewall (WAF) rules</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Authentication Hardening</h4>
                    <ul className="text-foreground/70 space-y-1 ml-4">
                      <li>• Implement multi-factor authentication (MFA)</li>
                      <li>• Enforce strong password policies</li>
                      <li>• Use cryptographically secure session tokens</li>
                      <li>• Implement automatic session timeout</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">XSS Prevention</h4>
                    <ul className="text-foreground/70 space-y-1 ml-4">
                      <li>• Implement input validation and output encoding</li>
                      <li>• Deploy Content Security Policy (CSP) headers</li>
                      <li>• Use templating engines with auto-escaping</li>
                      <li>• Regular security code review and testing</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Key Findings Section */}
      <section className="py-20 bg-card/30 border-y border-border/40">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Findings</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-background/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Critical Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-destructive mb-2">4</p>
                <p className="text-foreground/70">Immediate action required to prevent exploitation</p>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  High Priority
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary mb-2">6</p>
                <p className="text-foreground/70">Should be addressed within 1-3 months</p>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary mb-2">100%</p>
                <p className="text-foreground/70">Complete threat analysis and recommendations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for Full Assessment?</h2>
            <p className="text-foreground/70 mb-8">
              Download the comprehensive threat analysis report with detailed attack demonstrations, technical walkthroughs, and remediation strategies.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Download Full Report
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 bg-card/30">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Project</h4>
              <ul className="space-y-2 text-foreground/60 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Overview</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Vulnerabilities</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Attacks</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-foreground/60 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">OWASP Top 10</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">STRIDE Model</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">References</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Standards</h4>
              <ul className="space-y-2 text-foreground/60 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">NIST Framework</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">PCI-DSS</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">GDPR</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Academic</h4>
              <ul className="space-y-2 text-foreground/60 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">CYB 237 Course</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Assessment Criteria</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 text-center text-foreground/60 text-sm">
            <p>CYB 237: Cybersecurity Threat Analysis & Attack Simulation | Academic Project 2025</p>
            <p className="mt-2">Classification: Academic Project | All findings are for educational purposes only</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
