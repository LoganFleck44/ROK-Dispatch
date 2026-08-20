# ROK Dispatch

A from-scratch recreation of the ROK Logistics dispatch platform (Loadlink is being
shut down by its vendor). Built as a static web app with a tiny Node server; all data
is stored in the browser's `localStorage`, so it runs entirely client-side.

## Included so far

- **Dispatch Board** — searchable, sortable, filterable load grid
- **Edit Load** — General, Stops, Load (commodities), Rate, Notes & History tabs
- **New Load** dialog with required-field validation
- **Customer & Sites**, **Carriers**, **Customs Brokers** directories
- **Alerts**
- **QuickBooks Setup**, **Invoices**, **Customer Receipts**
- **Company Profile**, **Reports**

## Running it

Requires [Node.js](https://nodejs.org).

```bash
node server.js
```

Then open http://localhost:4173. On Windows you can also double-click `start.bat`.

## Project structure

- `server.js` — zero-dependency static file server
- `public/index.html` — app shell
- `public/styles.css` — all styling
- `public/data.js` — seed data + localStorage-backed data layer
- `public/app.js` — UI rendering and interactions
