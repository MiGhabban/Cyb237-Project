import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Shield, AlertTriangle, Code, Copy, ArrowLeft, Play, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function Labs() {
  const [sqlInput, setSqlInput] = useState("");
  const [sqlOutput, setSqlOutput] = useState("");
  const [xssInput, setXssInput] = useState("");
  const [xssPreview, setXssPreview] = useState(false);
  const [sessionToken, setSessionToken] = useState("abc123def456");
  const [predictedToken, setPredictedToken] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const executeSqlInjection = () => {
    if (sqlInput.includes("' OR '1'='1")) {
      setSqlOutput("✓ SQL Injection Detected!\n\nQuery executed:\nSELECT * FROM users WHERE username='' OR '1'='1';\n\nResult:\n- admin | password123 | admin@ecommerce.com\n- user1 | pass456 | user1@example.com\n- user2 | secure789 | user2@example.com");
    } else if (sqlInput.includes("UNION SELECT")) {
      setSqlOutput("✓ UNION-based SQL Injection Detected!\n\nExtracted Data:\n- username: admin, password: 5f4dcc3b5aa765d61d8327deb882cf99\n- email: admin@ecommerce.com\n- role: administrator");
    } else if (sqlInput.trim() === "") {
      setSqlOutput("⚠ Please enter a payload");
    } else {
      setSqlOutput("✗ Payload not recognized. Try:\n- ' OR '1'='1\n- ' UNION SELECT username, password, email FROM users --");
    }
  };

  const predictSessionToken = () => {
    const currentNum = parseInt(sessionToken.replace(/[a-z]/g, ""), 16) || 123456;
    const nextNum = (currentNum + 1).toString(16);
    setPredictedToken("abc123def" + nextNum);
  };

  const resetLabs = () => {
    setSqlInput("");
    setSqlOutput("");
    setXssInput("");
    setXssPreview(false);
    setSessionToken("abc123def456");
    setPredictedToken("");
  };

  const sqlPayloads = [
    "' OR '1'='1",
    "' UNION SELECT username, password, email FROM users --",
    "'; DROP TABLE users; --",
    "' OR 1=1 --",
    "admin' --"
  ];

  const xssPayloads = [
    "<script>alert('XSS')</script>",
    "<img src=x onerror=\"alert('XSS')\">",
    "<svg onload=\"alert('XSS')\">",
    "<iframe src=\"javascript:alert('XSS')\"></iframe>",
    "<body onload=\"alert('XSS')\">"
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
          <h1 className="text-4xl font-bold mb-4">Interactive Security Labs</h1>
          <p className="text-foreground/70 text-lg">
            Hands-on laboratories to understand and test common cybersecurity vulnerabilities in a safe, controlled environment.
          </p>
        </div>
      </section>

      {/* Labs Content */}
      <section className="py-12">
        <div className="container">
          <Tabs defaultValue="sql-injection" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="sql-injection">SQL Injection Lab</TabsTrigger>
              <TabsTrigger value="xss">XSS Lab</TabsTrigger>
              <TabsTrigger value="session">Session Hijacking Lab</TabsTrigger>
            </TabsList>

            {/* SQL Injection Lab */}
            <TabsContent value="sql-injection" className="space-y-6">
              <Card className="bg-card/50 border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    SQL Injection Testing Environment
                  </CardTitle>
                  <CardDescription>
                    Test SQL injection payloads against a vulnerable login form
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-background/50 p-6 rounded-lg border border-border/40">
                    <h4 className="font-semibold mb-3">Vulnerable Query Simulation</h4>
                    <pre className="bg-background p-3 rounded text-xs overflow-x-auto mb-4 border border-border/40">
                      <code>SELECT * FROM users WHERE username='[payload]' AND password='[payload]';</code>
                    </pre>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-semibold mb-2 block">Enter SQL Injection Payload:</label>
                        <Input
                          value={sqlInput}
                          onChange={(e) => setSqlInput(e.target.value)}
                          placeholder="Example: ' OR '1'='1"
                          className="bg-background border-border/40"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={executeSqlInjection} className="bg-primary hover:bg-primary/90">
                          <Play className="h-4 w-4 mr-2" />
                          Execute Payload
                        </Button>
                        <Button onClick={resetLabs} variant="outline">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  </div>

                  {sqlOutput && (
                    <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-destructive">Output:</h4>
                      <pre className="text-sm whitespace-pre-wrap text-foreground/70">{sqlOutput}</pre>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-3">Common SQL Injection Payloads:</h4>
                    <div className="space-y-2">
                      {sqlPayloads.map((payload, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-background/50 rounded border border-border/40">
                          <code className="text-xs text-foreground/70">{payload}</code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSqlInput(payload);
                              copyToClipboard(payload, `sql-${idx}`);
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* XSS Lab */}
            <TabsContent value="xss" className="space-y-6">
              <Card className="bg-card/50 border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    XSS Testing Environment
                  </CardTitle>
                  <CardDescription>
                    Test XSS payloads in a safe sandbox environment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-background/50 p-6 rounded-lg border border-border/40">
                    <h4 className="font-semibold mb-3">XSS Payload Tester</h4>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-semibold mb-2 block">Enter XSS Payload:</label>
                        <Input
                          value={xssInput}
                          onChange={(e) => setXssInput(e.target.value)}
                          placeholder="Example: <script>alert('XSS')</script>"
                          className="bg-background border-border/40"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={() => setXssPreview(!xssPreview)} 
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Test Payload
                        </Button>
                        <Button onClick={resetLabs} variant="outline">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  </div>

                  {xssPreview && xssInput && (
                    <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-destructive">⚠ Payload Detected:</h4>
                      <p className="text-foreground/70 mb-3">This payload contains potentially malicious code that would execute in a vulnerable application:</p>
                      <pre className="bg-background p-3 rounded text-xs overflow-x-auto border border-border/40">
                        <code>{xssInput}</code>
                      </pre>
                      <p className="text-sm text-foreground/70 mt-3">
                        ✓ In a real vulnerable application, this would execute JavaScript in the user's browser, potentially stealing cookies or redirecting to phishing sites.
                      </p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-3">Common XSS Payloads:</h4>
                    <div className="space-y-2">
                      {xssPayloads.map((payload, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-background/50 rounded border border-border/40">
                          <code className="text-xs text-foreground/70 truncate">{payload}</code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setXssInput(payload);
                              copyToClipboard(payload, `xss-${idx}`);
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Session Hijacking Lab */}
            <TabsContent value="session" className="space-y-6">
              <Card className="bg-card/50 border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Session Token Prediction Lab
                  </CardTitle>
                  <CardDescription>
                    Demonstrate predictable session token generation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-background/50 p-6 rounded-lg border border-border/40">
                    <h4 className="font-semibold mb-4">Session Token Analysis</h4>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold mb-2 block">Current Session Token:</label>
                        <div className="flex gap-2">
                          <Input
                            value={sessionToken}
                            readOnly
                            className="bg-background border-border/40"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(sessionToken, "session-current")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-background rounded border border-border/40">
                        <p className="text-sm text-foreground/70 mb-3">
                          <strong>Analysis:</strong> This token follows a predictable pattern. By analyzing the sequence, we can predict the next token.
                        </p>
                        <p className="text-sm text-foreground/70">
                          Token structure: <code className="text-xs bg-background/50 px-2 py-1 rounded">abc123def + [incremental number]</code>
                        </p>
                      </div>

                      <Button 
                        onClick={predictSessionToken} 
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Predict Next Token
                      </Button>
                    </div>
                  </div>

                  {predictedToken && (
                    <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-destructive">✓ Predicted Token:</h4>
                      <div className="flex gap-2">
                        <Input
                          value={predictedToken}
                          readOnly
                          className="bg-background border-border/40"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(predictedToken, "session-predicted")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-foreground/70 mt-3">
                        ✓ By using this predicted token, an attacker could hijack another user's session without knowing their credentials.
                      </p>
                    </div>
                  )}

                  <div className="bg-background/50 p-4 rounded border border-border/40">
                    <h4 className="font-semibold mb-2">How to Prevent:</h4>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Use cryptographically secure random number generators</li>
                      <li>• Implement sufficient entropy in token generation</li>
                      <li>• Use libraries like crypto.getRandomValues() or secrets module</li>
                      <li>• Implement token expiration and rotation</li>
                      <li>• Use HTTPS for all session communication</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Safety Notice */}
      <section className="py-12 bg-card/30 border-y border-border/40">
        <div className="container">
          <div className="bg-background/50 border border-primary/30 rounded-lg p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              ⚠ Educational Use Only
            </h3>
            <p className="text-foreground/70 mb-3">
              These labs are designed for educational purposes only. They demonstrate common vulnerabilities in a controlled environment. 
              Unauthorized access to computer systems is illegal and unethical.
            </p>
            <p className="text-foreground/70">
              Always obtain proper authorization before conducting security testing on any system you do not own or have explicit permission to test.
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
