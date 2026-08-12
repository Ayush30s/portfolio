# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Visit logging

Every visitor is recorded as one JSON line appended to `visits.log` in this
folder — IP, approximate location, device type, OS, browser, screen size,
timezone, referrer.

The `event` field says what the line is:

| `event` | When |
|---|---|
| `visit` | Someone opened the site (once per tab session) |
| `resume_view` | Clicked **Open / View** under `resume` |
| `resume_download` | Clicked **Download** under `resume` |

Résumé clicks are not deduplicated — each click is its own line, so repeat
interest is visible. Count them with:

```bash
grep -c resume_download visits.log
```

```bash
npm run log
```

Then run `npm run dev` in a second terminal. The dev server proxies `/api/*` to
the logger, so no extra config is needed locally.

| | |
|---|---|
| Log file | `visits.log` (JSONL, append-only, gitignored by `*.log`) |
| Logger port | `8787` — override with `PORT` |
| Read back | `GET http://localhost:8787/api/visits?limit=50` |
| Disable geo | `GEO_LOOKUP=off npm run log` |

One entry per browser tab session (a reload does not duplicate it). Location
comes from a free ip-api.com lookup — capped at 45 requests/minute, cached per
IP, and skipped for local addresses.

### In production

The frontend is static, so logging only happens while the logger process is
reachable. Deploy `server/visit-logger.js` anywhere that allows a persistent
disk (Railway, Render, Fly, a VPS), then point the site at it:

```bash
VITE_LOG_ENDPOINT=https://your-logger.example.com/api/visit npm run build
```

Put the logger behind the same proxy as the site, or make sure the proxy
forwards `X-Forwarded-For` — otherwise every visit records the proxy's IP.
