import { useMemo, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { searchCatalog } from '../lib/search';

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const closeTimer = useRef<number | null>(null);
  const results = useMemo(() => searchCatalog(query), [query]);

  function go(path: string) {
    setOpen(false);
    setQuery('');
    navigate(path);
  }

  return (
    <div
      className="global-search"
      onBlur={() => {
        closeTimer.current = window.setTimeout(() => setOpen(false), 120);
      }}
      onFocus={() => {
        if (closeTimer.current) window.clearTimeout(closeTimer.current);
        setOpen(Boolean(query.trim()));
      }}
    >
      <label className="sr-only" htmlFor="globalSearch">
        全局搜索
      </label>
      <input
        id="globalSearch"
        value={query}
        placeholder="搜索教程、题目..."
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(Boolean(event.target.value.trim()));
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && results[0]) go(results[0].path);
          if (event.key === 'Escape') setOpen(false);
        }}
      />
      {open ? (
        <div className="search-popover" role="listbox">
          {results.length ? (
            results.map((result) => (
              <NavLink key={result.id} className="search-result" to={result.path} onClick={() => setQuery('')}>
                <span className="search-icon">{result.icon}</span>
                <span>
                  <strong>{result.title}</strong>
                  <small>
                    {result.sectionLabel} · {result.description}
                  </small>
                </span>
              </NavLink>
            ))
          ) : (
            <div className="search-empty">没有找到匹配内容</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
