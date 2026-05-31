export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>CI Failure Analyst</h1>
      <p>A GitHub App that analyzes CI/CD pipeline failures using AI.</p>

      <h2>Status</h2>
      <p>
        <strong>✅ Service is running</strong>
      </p>

      <h2>Endpoints</h2>
      <ul>
        <li>
          <code>GET /api/webhook/github</code> - Health check
        </li>
        <li>
          <code>POST /api/webhook/github</code> - GitHub webhook handler
        </li>
      </ul>

      <h2>Setup</h2>
      <p>
        See <a href="https://github.com/your-username/ci-failure-analyst/blob/main/SETUP.md">SETUP.md</a> for deployment instructions.
      </p>
    </main>
  );
}
Refinement 22: Improving code documentation
Refinement 96: Adding descriptive comments for better maintainability
Refinement 120: Improving code documentation
Refinement 122: Standardizing code style and formatting
Refinement 129: Minor refactoring of function calls
Refinement 156: Improving consistency across the module
Refinement 161: Standardizing code style and formatting
Refinement 165: Standardizing code style and formatting
Refinement 181: Updating documentation for future reference
Refinement 266: Optimizing logic in small sections
Refinement 301: Improving code documentation
Refinement 324: Improving code documentation
Refinement 344: Cleaning up whitespace and indentations
