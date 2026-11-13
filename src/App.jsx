import { useState } from 'react'
import { Button } from '@strongtie/design-system/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@strongtie/design-system/card'

const screens = [
  { id: 'overview', label: 'Overview' },
  { id: 'form', label: 'Form state' },
  { id: 'empty', label: 'Empty state' },
]

export default function App() {
  const [screen, setScreen] = useState('overview')
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="app-shell">
      <header className="topbar">
        <span className="brand-mark" aria-hidden="true">S</span>
        <div>
          <p className="eyebrow">Simpson Strong-Tie</p>
          <strong>UX mockup starter</strong>
        </div>
        <span className="prototype-badge">Prototype</span>
      </header>

      <div className="workspace">
        <aside className="sidebar" aria-label="Mockup screens">
          <p className="sidebar-label">Screens</p>
          <nav>
            {screens.map(({ id, label }) => (
              <button
                className={screen === id ? 'nav-item active' : 'nav-item'}
                key={id}
                onClick={() => setScreen(id)}
                type="button"
                aria-current={screen === id ? 'page' : undefined}
              >
                {label}
              </button>
            ))}
          </nav>
          <p className="sidebar-hint">Replace these sample screens with your flow. Keep the navigation if reviewers need to compare states.</p>
        </aside>

        <main className="content">
          <div className="page-heading">
            <p className="eyebrow">Example flow</p>
            <h1>{screens.find(({ id }) => id === screen)?.label}</h1>
            <p>This starter demonstrates screen navigation and a few states. Make the mockup your own.</p>
          </div>

          {screen === 'overview' && (
            <div className="card-grid">
              <Card>
                <CardHeader>
                  <CardTitle>Start with a real scenario</CardTitle>
                  <CardDescription>Show the task and the decision your user needs to make.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Use realistic copy and sample data. The design system components give the prototype a familiar foundation.</p>
                  <Button onClick={() => setScreen('form')}>Explore the flow</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Show the states</CardTitle>
                  <CardDescription>Reviewers need to see more than the happy path.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Include loading, error, empty, disabled, and success states when they matter to the concept.</p>
                  <Button variant="outline" onClick={() => setScreen('empty')}>View empty state</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {screen === 'form' && (
            <Card className="feature-card">
              <CardHeader>
                <CardTitle>Request a concept review</CardTitle>
                <CardDescription>This interaction is sample behavior for a clickable mockup.</CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="success-panel" role="status">
                    <strong>Request ready for review</strong>
                    <p>This is a simulated success state. No data was sent.</p>
                    <Button variant="outline" onClick={() => setSubmitted(false)}>Start again</Button>
                  </div>
                ) : (
                  <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
                    <label htmlFor="concept-name">Concept name</label>
                    <input id="concept-name" name="concept-name" placeholder="Example: Project dashboard" required />
                    <label htmlFor="review-note">What should reviewers focus on?</label>
                    <textarea id="review-note" name="review-note" placeholder="Describe the decision or question" rows="4" required />
                    <Button type="submit">Submit request</Button>
                  </form>
                )}
              </CardContent>
            </Card>
          )}

          {screen === 'empty' && (
            <Card className="feature-card empty-card">
              <CardContent>
                <div className="empty-icon" aria-hidden="true">◇</div>
                <h2>No concepts yet</h2>
                <p>Give people a useful next step when there is nothing to show.</p>
                <Button onClick={() => setScreen('form')}>Create a concept</Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
