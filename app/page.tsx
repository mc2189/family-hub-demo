import { demoFamily } from "@/lib/demo-data";

const money = (pence: number) => `£${(pence / 100).toFixed(2)}`;

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Public portfolio edition</p>
        <h1>Family Hub Demo</h1>
        <p>
          A sanitised demonstration of a family operations app covering tasks,
          allowances, savings, approvals, audit history and secure integration patterns.
        </p>
      </section>

      <section className="notice">
        <strong>Synthetic data only.</strong> This repository is separate from the private
        working application and contains no real family names, routes, schedules or credentials.
      </section>

      <section className="grid">
        <article className="card">
          <h2>Household</h2>
          <p className="metric">{demoFamily.members.length}</p>
          <p>Role-aware member records with parent/child permission boundaries.</p>
        </article>
        <article className="card">
          <h2>Task workflow</h2>
          <p className="metric">{demoFamily.tasks.length}</p>
          <p>Submission, approval and rejection states modelled as business rules.</p>
        </article>
        <article className="card">
          <h2>Audit trail</h2>
          <p className="metric">{demoFamily.audit.length}</p>
          <p>Actions are represented as append-style events for traceability.</p>
        </article>
      </section>

      <section className="panel">
        <h2>Example tasks</h2>
        <div className="rows">
          {demoFamily.tasks.map((task) => (
            <div className="row" key={task.id}>
              <div>
                <strong>{task.title}</strong>
                <p>{task.description}</p>
              </div>
              <div className="right">
                <span className="pill">{task.status}</span>
                <span>{money(task.rewardPence)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Savings goals</h2>
        <div className="rows">
          {demoFamily.savingsGoals.map((goal) => (
            <div className="row" key={goal.id}>
              <div>
                <strong>{goal.title}</strong>
                <p>{money(goal.currentPence)} saved</p>
              </div>
              <div className="right">Target {money(goal.targetPence)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Security choices exposed for review</h2>
        <ul>
          <li>PostgreSQL Row Level Security examples in <code>sql/</code>.</li>
          <li>Explicit parent/child authorization rules in <code>lib/security/</code>.</li>
          <li>Banking integration disabled by default and server-side only.</li>
          <li>No private project history or production identifiers copied into this repository.</li>
        </ul>
      </section>
    </main>
  );
}
