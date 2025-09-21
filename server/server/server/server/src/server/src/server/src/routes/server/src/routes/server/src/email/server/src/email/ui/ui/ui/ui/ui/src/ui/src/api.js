// Env-aware API helper.
// If VITE_API_BASE is set, we call that absolute base; otherwise use same-origin (with dev proxy).
export const API_BASE = import.meta.env?.VITE_API_BASE || ''
export const apiUrl = (p) => `${API_BASE}${p}`
