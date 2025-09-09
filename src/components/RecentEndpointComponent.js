// src/components/RecentEndpoints.jsx
import React from 'react';

const STORAGE_KEY = 'perry-parcelrunner:recent-endpoints';
// item shape: { method: 'GET'|'POST'|..., url: 'https://...' }

export default function RecentEndpoints({ recents, onPick, onClear }) {
  const [value, setValue] = React.useState('');

  const handleChange = (e) => {
    const idx = Number(e.target.value);
    setValue(''); // reset to placeholder after pick
    if (!Number.isNaN(idx) && recents[idx]) onPick(recents[idx]);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={value}
        onChange={handleChange}
        className="rounded-xl border-slate-300 bg-white text-slate-700
                   focus:border-sky-400 focus:ring-sky-400 px-2 py-2"
        title="Recent endpoints"
      >
        <option value="" disabled>Recent…</option>
        {recents.map((r, i) => (
          <option key={`${r.method}:${r.url}`} value={i}>
            {r.method} · {r.url.length > 60 ? r.url.slice(0,60) + '…' : r.url}
          </option>
        ))}
      </select>

      {recents.length > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="text-xs rounded-lg px-2 py-1 font-medium
                     text-slate-600 hover:text-slate-800 hover:bg-slate-100"
          title="Clear recent endpoints"
        >
          Clear
        </button>
      )}
    </div>
  );
}

// helpers you can import if desired
export const recentsStorage = {
  key: 'perry-parcelrunner:recent-endpoints',
  load() {
    try { return JSON.parse(localStorage.getItem(this.key) || '[]'); } catch { return []; }
  },
  save(list) {
    try { localStorage.setItem(this.key, JSON.stringify(list)); } catch {}
  }
};
