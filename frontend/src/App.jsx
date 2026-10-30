
import { useState } from "react";
import {
  ShieldCheck, LayoutDashboard, Bug, History, FileText,
  ScanSearch, GitBranch, KeyRound, Code2, Users,
  Settings, ClipboardList, Shield, ChevronRight,
  Search, Bell, Plus, ArrowUpRight, LogOut
} from "lucide-react";
import "./App.css";

const navigation = {
  Developer: [
    { group: "Workspace", items: [
      ["Dashboard", LayoutDashboard],
      ["Vulnerabilities", Bug],
      ["Scan history", History],
      ["Reports", FileText],
    ]},
    { group: "Quick actions", items: [
      ["New scan", ScanSearch],
      ["New repo", GitBranch],
    ]},
    { group: "Config", items: [
      ["API keys", KeyRound],
      ["API docs", Code2],
    ]},
  ],
  "Security Analyst": [
    { group: "Review", items: [
      ["Review queue", ClipboardList],
      ["All findings", Bug],
      ["Assigned scans", History],
      ["Reports", FileText],
    ]},
  ],
  Admin: [
    { group: "Admin", items: [
      ["Overview", LayoutDashboard],
      ["Users", Users],
      ["Roles and permissions", Shield],
      ["Audit logs", ClipboardList],
    ]},
    { group: "Configuration", items: [
      ["Security rules", ShieldCheck],
      ["Scan settings", Settings],
      ["Repositories", GitBranch],
      ["API keys", KeyRound],
    ]},
  ],
};

const findings = [
  { name: "SQL injection in login", type: "SQLI", severity: "Critical", repo: "auth-service", status: "Open" },
  { name: "Command injection", type: "Command Injection", severity: "Critical", repo: "worker-api", status: "Open" },
  { name: "Insecure direct object reference", type: "IDOR", severity: "High", repo: "billing-web", status: "Patched" },
  { name: "Reflected XSS in search", type: "XSS", severity: "Medium", repo: "billing-web", status: "Open" },
  { name: "Hardcoded secret in config", type: "Secrets", severity: "Medium", repo: "asdf", status: "Open" },
];

function App() {
  const [role, setRole] = useState("Developer");
  const [active, setActive] = useState("Dashboard");

  const [scanName, setScanName] = useState("");
  const [sourceCode, setSourceCode] = useState("");
  const [scanMessage, setScanMessage] = useState("");
  const [scanError, setScanError] = useState("");

  const stats = [
    { value: "10", label: "Scans & reviews", detail: "0 PR reviews and 10 full scans" },
    { value: "39", label: "False positives", detail: "Filtered out of 1,534 total issues" },
    { value: "1.5k", label: "Potential issues", detail: "Found across repositories" },
    { value: "209", label: "Patches generated", detail: "Suggested fixes" },
  ];

  function handleStartScan(e) {
    e.preventDefault();
    setScanError("");
    setScanMessage("");

    if (!scanName.trim()) {
      setScanError("Please enter a scan name.");
      return;
    }

    if (!sourceCode.trim()) {
      setScanError("Please enter JavaScript code to scan.");
      return;
    }

    setScanMessage(
      "Demo scan submitted successfully. Actual vulnerability analysis will be available after backend integration."
    );
  }

  function openNewScan() {
    setActive("New scan");
    setScanMessage("");
    setScanError("");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon"><ShieldCheck size={19} /></span>
          <span>SecureLens AI</span>
        </div>

        <div className="user-box">
          <div className="avatar">U</div>
          <div className="user-info">
            <strong>Project User</strong>
            <span>{role}</span>
          </div>
          <LogOut size={16} />
        </div>

        <div className="role-select">
          <label>Preview role</label>
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setActive(
                e.target.value === "Security Analyst"
                  ? "Review queue"
                  : e.target.value === "Admin"
                  ? "Overview"
                  : "Dashboard"
              );
            }}
          >
            <option>Developer</option>
            <option>Security Analyst</option>
            <option>Admin</option>
          </select>
        </div>

        <nav>
          {navigation[role].map((section) => (
            <div className="nav-section" key={section.group}>
              <p>{section.group}</p>
              {section.items.map(([name, Icon]) => (
                <button
                  key={name}
                  className={`nav-link ${active === name ? "active" : ""}`}
                  onClick={() => setActive(name)}
                >
                  <Icon size={17} />
                  <span>{name}</span>
                  {active === name && (
                    <ChevronRight size={15} className="nav-arrow" />
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <span className="online-dot" /> Development preview
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            SECURELENS AI <span>/</span> {role.toUpperCase()}
          </div>
          <div className="top-actions">
            <span className="demo-label">DEMO DATA</span>
            <button className="icon-button" aria-label="Search">
              <Search size={18} />
            </button>
            <button className="icon-button" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <div className="avatar small-avatar">U</div>
          </div>
        </header>

        <section className="page-content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">SECURITY WORKSPACE</div>
              <h1>{active}</h1>
              <p className="subtitle">
                {active === "Dashboard"
                  ? "Security overview for your workspace"
                  : `Manage and review ${active.toLowerCase()}`}
              </p>
            </div>
            <button className="primary-button" onClick={openNewScan}>
              <Plus size={17} /> Start scan
            </button>
          </div>

          {active === "New scan" ? (
            <div className="panel scan-form-panel">
              <div className="panel-heading">
                <div>
                  <h3>Start a new security scan</h3>
                  <p>Submit JavaScript code for vulnerability analysis.</p>
                </div>
                <ScanSearch size={22} />
              </div>

              <form onSubmit={handleStartScan} className="scan-form">
                <label htmlFor="scanName">Scan name</label>
                <input
                  id="scanName"
                  type="text"
                  placeholder="Example: My first JavaScript scan"
                  value={scanName}
                  onChange={(e) => setScanName(e.target.value)}
                />

                <label htmlFor="language">Programming language</label>
                <select id="language" value="JavaScript" disabled>
                  <option value="JavaScript">JavaScript</option>
                </select>

                <label htmlFor="sourceCode">Source code</label>
                <textarea
                  id="sourceCode"
                  rows="12"
                  placeholder={"// Paste your JavaScript code here\n\nfunction example() {\n  console.log('Hello SecureLens AI');\n}"}
                  value={sourceCode}
                  onChange={(e) => setSourceCode(e.target.value)}
                />

                {scanError && (
                  <p className="scan-error">{scanError}</p>
                )}

                {scanMessage && (
                  <p className="scan-success">{scanMessage}</p>
                )}

                <div className="scan-form-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setActive("Dashboard")}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="primary-button">
                    <ScanSearch size={17} /> Submit scan
                  </button>
                </div>
              </form>

              <p className="demo-note">
                Development preview: this form does not run a real security
                scanner yet. Backend integration will be added in a later step.
              </p>
            </div>
          ) : active === "Dashboard" ||
            active === "Overview" ||
            active === "Review queue" ? (
            <>
              <div className="stats-grid">
                {stats.map((item) => (
                  <div className="stat-card" key={item.label}>
                    <div className="stat-value">{item.value}</div>
                    <div>
                      <strong>{item.label}</strong>
                      <p>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="dashboard-grid">
                <div className="panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Issues by severity</h3>
                      <p>Distribution of detected issues</p>
                    </div>
                    <ArrowUpRight size={17} />
                  </div>

                  <div className="severity-bars">
                    {[["Critical", 30], ["High", 65], ["Medium", 82], ["Low", 35]].map(([name, width]) => (
                      <div className="severity-row" key={name}>
                        <span>{name}</span>
                        <div className="progress-track">
                          <div
                            className={`progress-fill ${name.toLowerCase()}`}
                            style={{ width: `${width}%` }}
                          />
                        </div>
                        <strong>{width}</strong>
                      </div>
                    ))}
                  </div>
                  <p className="demo-note">
                    Illustrative demo statistics — not real scan results.
                  </p>
                </div>

                <div className="panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Quick actions</h3>
                      <p>Common workspace tasks</p>
                    </div>
                  </div>
                  <button className="quick-action" onClick={openNewScan}>
                    <ScanSearch size={19} />
                    <span>Start a new scan</span>
                    <ChevronRight size={16} />
                  </button>
                  <button
                    className="quick-action"
                    onClick={() => setActive("New repo")}
                  >
                    <GitBranch size={19} />
                    <span>Connect repository</span>
                    <ChevronRight size={16} />
                  </button>
                  <button
                    className="quick-action"
                    onClick={() => setActive("Vulnerabilities")}
                  >
                    <Bug size={19} />
                    <span>View vulnerabilities</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="panel findings-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Recent vulnerabilities</h3>
                    <p>Example findings from the prototype</p>
                  </div>
                  <button
                    className="text-button"
                    onClick={() => setActive("Vulnerabilities")}
                  >
                    View all <ArrowUpRight size={15} />
                  </button>
                </div>
                <FindingTable />
              </div>
            </>
          ) : (
            <div className="panel placeholder-panel">
              <div className="placeholder-icon">
                <ShieldCheck size={30} />
              </div>
              <h2>{active}</h2>
              <p>
                This section's interface will be implemented in the next UI steps.
              </p>
              <span className="demo-label">UI UNDER DEVELOPMENT</span>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function FindingTable() {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Vulnerability</th>
            <th>Type</th>
            <th>Severity</th>
            <th>Repository</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {findings.map((item) => (
            <tr key={item.name}>
              <td className="finding-name">{item.name}</td>
              <td>{item.type}</td>
              <td>
                <span className={`severity-badge ${item.severity.toLowerCase()}`}>
                  {item.severity}
                </span>
              </td>
              <td>{item.repo}</td>
              <td>
                <span className={`status-badge ${item.status.toLowerCase().replace(" ", "-")}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
