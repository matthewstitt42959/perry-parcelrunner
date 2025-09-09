
import React, { useState, useEffect } from 'react';

function statusColor(status = 0) {
  if (status >= 500) return 'bg-rose-100 text-rose-700 ring-rose-200';
  if (status >= 400) return 'bg-amber-100 text-amber-800 ring-amber-200';
  if (status >= 200) return 'bg-emerald-100 text-emerald-700 ring-emerald-200';
  return 'bg-slate-100 text-slate-700 ring-slate-200';
}

function fmtMs(n) {
  if (n == null) return '';
  // 4 sig-ish: 686 ms, 1.2 s, 2.03 s, etc.
  return n < 1000 ? `${Math.round(n)} ms` : `${(n / 1000).toFixed(n < 2000 ? 2 : 1)} s`;
}

function cleanType(ct = '') {
  return ct.split(';')[0].trim(); // "application/json"
}

export default function ResponsePanel({ responseData, errorMessage, meta, onCopy }) {
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b">
        <div className="flex flex-wrap items-center gap-2 select-none">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ring-1 ${statusColor(meta?.status)}`}>
            {meta?.status ? `Status: ${meta.status}` : 'No response'}
          </span>

          {meta?.contentType && (
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-slate-200 text-slate-700 bg-white">
              {cleanType(meta.contentType)}
            </span>
          )}

          {typeof meta?.durationMs === 'number' && (
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-slate-200 text-slate-700 bg-white">
              {fmtMs(meta.durationMs)}
            </span>
          )}

          {meta?.size ? (
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-slate-200 text-slate-700 bg-white">
              {new Intl.NumberFormat().format(meta.size)} bytes
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCopy}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-100 ring-1 ring-slate-200"
          >
            Copy
          </button>
        </div>
      </div>

      <pre className="p-4 text-sm leading-6 overflow-auto max-h-[60vh] whitespace-pre-wrap">
        {errorMessage
          ? <span className="text-rose-600">{errorMessage}</span>
          : (typeof responseData === 'object' && responseData !== null
              ? JSON.stringify(responseData, null, 2)
              : (responseData ?? ''))}
      </pre>
    </div>
  );
}