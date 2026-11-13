import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Sample data only — not real product specifications.
const connectors = [
  { id: 'lus26', model: 'LUS26', type: 'Joist hanger', load: '1,165 lb', finish: 'G90' },
  { id: 'h1', model: 'H1', type: 'Hurricane tie', load: '585 lb', finish: 'G90' },
  { id: 'a34', model: 'A34', type: 'Framing angle', load: '440 lb', finish: 'G90' },
  { id: 'abu44', model: 'ABU44', type: 'Post base', load: '2,200 lb', finish: 'HDG' },
]

const screens = [
  { id: 'search', label: 'Find a connector' },
  { id: 'detail', label: 'Connector detail' },
  { id: 'empty', label: 'No results' },
]

export default function App() {
  const [screen, setScreen] = useState('search')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(connectors[0])
  const [added, setAdded] = useState(false)

  const results = connectors.filter(({ model, type }) =>
    `${model} ${type}`.toLowerCase().includes(query.trim().toLowerCase()),
  )

  const openDetail = (connector) => {
    setSelected(connector)
    setAdded(false)
    setScreen('detail')
  }

  const showScreen = (id) => {
    if (id === 'empty') {
      setQuery('zzz')
      setScreen('search')
      return
    }
    if (id === 'search' && results.length === 0) setQuery('')
    setScreen(id)
  }

  const current = screen === 'search' && results.length === 0 ? 'empty' : screen

  return (
    <div className="app-shell">
      <header className="topbar">
        <span className="brand-mark" aria-hidden="true">S</span>
        <div>
          <p className="eyebrow">Simpson Strong-Tie</p>
          <strong>Connector finder</strong>
        </div>
        <span className="prototype-badge">Prototype · sample data</span>
      </header>

      <div className="workspace">
        <aside className="sidebar" aria-label="Mockup screens">
          <p className="sidebar-label">Screens</p>
          <nav>
            {screens.map(({ id, label }) => (
              <button
                className={current === id ? 'nav-item active' : 'nav-item'}
                key={id}
                onClick={() => showScreen(id)}
                type="button"
                aria-current={current === id ? 'page' : undefined}
              >
                {label}
              </button>
            ))}
          </nav>
          <p className="sidebar-hint">A simple test mockup. Search, open a connector, and add it to a project.</p>
        </aside>

        <main className="content">
          {(current === 'search' || current === 'empty') && (
            <>
              <div className="page-heading">
                <p className="eyebrow">Step 1</p>
                <h1>Find a connector</h1>
                <p>Search by model number or connector type.</p>
              </div>

              <div className="search-field">
                <Label htmlFor="connector-search">Search connectors</Label>
                <Input
                  id="connector-search"
                  type="search"
                  placeholder="Example: hanger, H1"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>

              {current === 'empty' ? (
                <Card className="feature-card empty-card">
                  <CardContent>
                    <div className="empty-icon" aria-hidden="true">◇</div>
                    <h2>No connectors match “{query}”</h2>
                    <p>Check the model number or try a broader term like “hanger”.</p>
                    <Button variant="outline" onClick={() => setQuery('')}>Clear search</Button>
                  </CardContent>
                </Card>
              ) : (
                <ul className="result-list" aria-label={`${results.length} connectors`}>
                  {results.map((connector) => (
                    <li key={connector.id}>
                      <Card>
                        <CardHeader>
                          <CardTitle>{connector.model}</CardTitle>
                          <CardDescription>{connector.type}</CardDescription>
                        </CardHeader>
                        <CardContent className="result-footer">
                          <Badge variant="secondary">{connector.finish}</Badge>
                          <Button variant="outline" onClick={() => openDetail(connector)}>
                            View {connector.model}
                          </Button>
                        </CardContent>
                      </Card>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {current === 'detail' && (
            <>
              <div className="page-heading">
                <p className="eyebrow">Step 2</p>
                <h1>{selected.model}</h1>
                <p>{selected.type}</p>
              </div>

              <Card className="feature-card">
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                  <CardDescription>Sample values for this mockup only.</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="spec-list">
                    <div><dt>Model</dt><dd>{selected.model}</dd></div>
                    <div><dt>Type</dt><dd>{selected.type}</dd></div>
                    <div><dt>Allowable load</dt><dd>{selected.load}</dd></div>
                    <div><dt>Finish</dt><dd>{selected.finish}</dd></div>
                  </dl>

                  {added ? (
                    <div className="success-panel" role="status">
                      <strong>{selected.model} added to Project Alpha</strong>
                      <p>This is a simulated success state. No data was sent.</p>
                      <Button variant="outline" onClick={() => setScreen('search')}>Find another connector</Button>
                    </div>
                  ) : (
                    <div className="button-row">
                      <Button onClick={() => setAdded(true)}>Add to project</Button>
                      <Button variant="ghost" onClick={() => setScreen('search')}>Back to results</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
