import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, Zap, Lock, Eye, Code2, Database, Network, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Vulnerabilities() {
  const vulnerabilities = [
    {
      id: "A01",
      title: "Broken Access Control",
      severity: "CRITICAL",
      cvss: 9.1,
      cwe: "CWE-200, CWE-201, CWE-352",
      icon: Shield,
      description: "Access control enforces policy such that users cannot act outside of their intended permissions. Failures typically lead to unauthorized information disclosure, modification, or destruction of all data.",
      commonIssues: [
        "Violation of the principle of least privilege",
        "Bypassing access control checks by modifying URLs",
        "Permitting viewing or editing someone else's account",
        "Accessing API with missing access controls",
        "Elevation of privilege without proper authorization",
        "CORS misconfiguration allowing unauthorized API access"
      ],
      prevention: [
        "Deny by default except for public resources",
        "Implement access control mechanisms once and reuse",
        "Model access controls to enforce record ownership",
        "Enforce business limit requirements",
        "Log access control failures and alert admins",
        "Rate limit API and controller access",
        "Invalidate session identifiers after logout"
      ]
    },
    {
      id: "A02",
      title: "Cryptographic Failures",
      severity: "CRITICAL",
      cvss: 9.0,
      cwe: "CWE-259, CWE-327, CWE-331",
      icon: Lock,
      description: "Sensitive data transmitted without encryption or using weak encryption algorithms. Password storage uses inadequate hashing methods.",
      commonIssues: [
        "Sensitive data transmitted over unencrypted connections",
        "Weak encryption algorithms (DES, MD5, SHA1)",
        "Inadequate password hashing (plain text or weak hashing)",
        "Missing or weak key management",
        "Hardcoded secrets in code or configuration",
        "Insufficient entropy in random number generation"
      ],
      prevention: [
        "Use TLS 1.3 for all data in transit",
        "Implement AES-256 for data at rest",
        "Use bcrypt, scrypt, or Argon2 for password hashing",
        "Implement proper key management systems",
        "Never hardcode secrets in code",
        "Use cryptographically secure random number generators",
        "Implement certificate pinning"
      ]
    },
    {
      id: "A03",
      title: "Injection",
      severity: "CRITICAL",
      cvss: 9.8,
      cwe: "CWE-89, CWE-79, CWE-78",
      icon: Code2,
      description: "Application vulnerable to SQL injection, NoSQL injection, command injection, and other injection attacks through unsanitized user inputs.",
      commonIssues: [
        "SQL injection in search and filter functions",
        "NoSQL injection in database queries",
        "Command injection in system calls",
        "LDAP injection in authentication",
        "OS command injection",
        "XPath injection in XML processing"
      ],
      prevention: [
        "Use parameterized queries and prepared statements",
        "Implement strict input validation and sanitization",
        "Apply principle of least privilege to database access",
        "Use ORM frameworks with built-in protection",
        "Deploy Web Application Firewall (WAF)",
        "Implement input whitelisting",
        "Regular security code review"
      ]
    },
    {
      id: "A04",
      title: "Insecure Design",
      severity: "HIGH",
      cvss: 8.5,
      cwe: "CWE-434, CWE-444, CWE-1021",
      icon: AlertTriangle,
      description: "Missing security controls in the design phase. No rate limiting, weak session management, and inadequate threat modeling.",
      commonIssues: [
        "Missing rate limiting on login endpoints",
        "No CAPTCHA protection against brute force",
        "Weak session management implementation",
        "Missing security requirements in design",
        "Inadequate threat modeling",
        "No incident response plan"
      ],
      prevention: [
        "Implement threat modeling in design phase",
        "Add rate limiting and CAPTCHA",
        "Use secure session management",
        "Implement account lockout mechanisms",
        "Add security requirements to design",
        "Conduct security architecture reviews",
        "Develop incident response plan"
      ]
    },
    {
      id: "A05",
      title: "Security Misconfiguration",
      severity: "HIGH",
      cvss: 8.2,
      cwe: "CWE-16, CWE-200, CWE-693",
      icon: Zap,
      description: "Debug mode enabled in production, unnecessary services running, default credentials not changed, and missing security headers.",
      commonIssues: [
        "Debug mode enabled in production",
        "Unnecessary services and ports open",
        "Default credentials not changed",
        "Missing or misconfigured security headers",
        "Outdated software versions",
        "Unnecessary features enabled",
        "Insecure default configurations"
      ],
      prevention: [
        "Disable debug mode in production",
        "Minimize running services",
        "Change all default credentials",
        "Implement security headers (HSTS, CSP, etc.)",
        "Keep software updated",
        "Disable unnecessary features",
        "Use configuration management tools"
      ]
    },
    {
      id: "A06",
      title: "Vulnerable and Outdated Components",
      severity: "HIGH",
      cvss: 8.1,
      cwe: "CWE-1035, CWE-937",
      icon: Database,
      description: "Application uses outdated libraries with known vulnerabilities. No dependency management or vulnerability scanning.",
      commonIssues: [
        "Outdated third-party libraries",
        "Known CVEs in dependencies",
        "No dependency management",
        "Missing vulnerability scanning",
        "Supply chain vulnerabilities",
        "Unpatched frameworks"
      ],
      prevention: [
        "Maintain dependency inventory",
        "Implement automated vulnerability scanning",
        "Use dependency management tools",
        "Regular security updates",
        "Monitor CVE databases",
        "Implement Software Composition Analysis (SCA)",
        "Use verified and trusted packages"
      ]
    },
    {
      id: "A07",
      title: "Authentication Failures",
      severity: "CRITICAL",
      cvss: 9.1,
      cwe: "CWE-287, CWE-384, CWE-613",
      icon: Eye,
      description: "Weak password policies, no multi-factor authentication, and session tokens not properly invalidated.",
      commonIssues: [
        "Weak password policies",
        "No multi-factor authentication",
        "Session tokens not invalidated on logout",
        "Session fixation vulnerabilities",
        "Credential stuffing attacks",
        "Brute force attacks not prevented",
        "Weak session timeout"
      ],
      prevention: [
        "Enforce strong password policies (12+ chars, complexity)",
        "Implement multi-factor authentication (MFA)",
        "Use cryptographically secure session tokens",
        "Implement automatic session timeout",
        "Rate limit authentication attempts",
        "Implement account lockout",
        "Use OAuth 2.0 or OpenID Connect"
      ]
    },
    {
      id: "A08",
      title: "Software and Data Integrity Failures",
      severity: "HIGH",
      cvss: 8.0,
      cwe: "CWE-345, CWE-347, CWE-829",
      icon: Network,
      description: "No verification of software updates, insecure deserialization, and missing integrity checks.",
      commonIssues: [
        "Insecure deserialization",
        "No verification of software updates",
        "Missing integrity checks",
        "Unencrypted data transmission",
        "Missing digital signatures",
        "Untrusted CI/CD pipelines"
      ],
      prevention: [
        "Verify software updates with digital signatures",
        "Avoid deserialization of untrusted data",
        "Implement integrity checks (HMAC, digital signatures)",
        "Use secure CI/CD pipelines",
        "Encrypt all data in transit",
        "Implement code signing",
        "Use secure package repositories"
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
          <h1 className="text-4xl font-bold mb-4">Identified Vulnerabilities</h1>
          <p className="text-foreground/70 text-lg">
            Comprehensive analysis of 8+ critical security vulnerabilities identified in the e-commerce platform, with detailed descriptions, common issues, and prevention strategies.
          </p>
        </div>
      </section>

      {/* Vulnerabilities List */}
      <section className="py-12">
        <div className="container">
          <div className="space-y-6">
            {vulnerabilities.map((vuln) => {
              const Icon = vuln.icon;
              const severityColor = vuln.severity === "CRITICAL" 
                ? "bg-destructive/20 text-destructive" 
                : "bg-primary/20 text-primary";

              return (
                <Card key={vuln.id} className="bg-card/50 border-border/40 overflow-hidden hover:border-primary/40 transition-colors">
                  <CardHeader className="bg-card/80 border-b border-border/40">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <Icon className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <CardTitle className="text-xl">{vuln.id}: {vuln.title}</CardTitle>
                            <Badge className={severityColor}>{vuln.severity}</Badge>
                          </div>
                          <p className="text-sm text-foreground/60">CVSS Score: {vuln.cvss} | CWE: {vuln.cwe}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6">
                    <Tabs defaultValue="description" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="issues">Common Issues</TabsTrigger>
                        <TabsTrigger value="prevention">Prevention</TabsTrigger>
                      </TabsList>

                      <TabsContent value="description" className="space-y-4">
                        <p className="text-foreground/70 leading-relaxed">{vuln.description}</p>
                      </TabsContent>

                      <TabsContent value="issues" className="space-y-3">
                        <ul className="space-y-2">
                          {vuln.commonIssues.map((issue, idx) => (
                            <li key={idx} className="flex gap-3">
                              <span className="text-primary flex-shrink-0">•</span>
                              <span className="text-foreground/70">{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>

                      <TabsContent value="prevention" className="space-y-3">
                        <ul className="space-y-2">
                          {vuln.prevention.map((item, idx) => (
                            <li key={idx} className="flex gap-3">
                              <span className="text-primary flex-shrink-0">✓</span>
                              <span className="text-foreground/70">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Risk Matrix */}
      <section className="py-12 bg-card/30 border-y border-border/40">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Risk Prioritization Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left py-3 px-4 font-semibold">Vulnerability</th>
                  <th className="text-center py-3 px-4 font-semibold">Likelihood</th>
                  <th className="text-center py-3 px-4 font-semibold">Impact</th>
                  <th className="text-center py-3 px-4 font-semibold">CVSS</th>
                  <th className="text-center py-3 px-4 font-semibold">Priority</th>
                </tr>
              </thead>
              <tbody>
                {vulnerabilities.map((vuln) => (
                  <tr key={vuln.id} className="border-b border-border/40 hover:bg-background/50 transition-colors">
                    <td className="py-3 px-4">{vuln.title}</td>
                    <td className="text-center py-3 px-4">High</td>
                    <td className="text-center py-3 px-4">Critical</td>
                    <td className="text-center py-3 px-4">
                      <Badge className="bg-primary/20 text-primary">{vuln.cvss}</Badge>
                    </td>
                    <td className="text-center py-3 px-4">
                      <Badge className={vuln.severity === "CRITICAL" ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"}>
                        {vuln.severity}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
