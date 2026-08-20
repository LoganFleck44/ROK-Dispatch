/* ============================================================
   ROK Dispatch — application
   ============================================================ */
(function () {
  const S = window.Store;

  /* ---------------- icon library (inline SVG, feather-style) ---------------- */
  const ICON_PATHS = {
    building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 21v-4h6v4"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    sliders: '<line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="9" cy="6" r="2" fill="currentColor"/><circle cx="15" cy="12" r="2" fill="currentColor"/><circle cx="7" cy="18" r="2" fill="currentColor"/>',
    truck: '<rect x="1" y="5" width="13" height="11" rx="1"/><path d="M14 9h4l3 3v4h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    list: '<line x1="9" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="9" y1="18" x2="21" y2="18"/><line x1="4" y1="6" x2="4.01" y2="6"/><line x1="4" y1="12" x2="4.01" y2="12"/><line x1="4" y1="18" x2="4.01" y2="18"/>',
    dollar: '<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    chart: '<line x1="6" y1="20" x2="6" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="18" y1="20" x2="18" y2="14"/><path d="M3 20h18"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/>',
    columns: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/>',
    pencil: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    trash: '<path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    arrowRight: '<line x1="4" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/>',
    cloud: '<path d="M17.5 19a4.5 4.5 0 0 0 0-9 7 7 0 0 0-13.4 2A4 4 0 0 0 6 19z"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  };
  function ic(name, size) {
    size = size || 16;
    return `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name] || ''}</svg>`;
  }

  /* ---------------- utilities ---------------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function fmtDT(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d)) return '';
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    let h = d.getHours(); const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${mm}/${dd}/${d.getFullYear()}, ${String(h).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} ${ampm}`;
  }
  function fmtD(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d)) return '';
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
  }
  function isoToLocalInput(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d)) return '';
    const p = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
  }
  function localInputToIso(v) {
    if (!v) return '';
    const d = new Date(v);
    return isNaN(d) ? '' : d.toISOString();
  }
  function money(n) {
    const v = Number(n) || 0;
    return v.toFixed(2);
  }
  function toast(msg, kind) {
    const root = document.getElementById('toast-root');
    const el = document.createElement('div');
    el.className = 'toast' + (kind ? ' ' + kind : '');
    el.textContent = msg;
    root.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; }, 2600);
    setTimeout(() => el.remove(), 3000);
  }
  function openModal(html, onMount) {
    const root = document.getElementById('modal-root');
    root.innerHTML = `<div class="modal-backdrop"><div class="modal">${html}</div></div>`;
    root.querySelector('.modal-backdrop').addEventListener('click', e => {
      if (e.target.classList.contains('modal-backdrop')) closeModal();
    });
    if (onMount) onMount(root.querySelector('.modal'));
  }
  function closeModal() { document.getElementById('modal-root').innerHTML = ''; }

  /* ---------------- app state ---------------- */
  const state = {
    setupOpen: true,
    accountingOpen: false,
    board: {
      show: 15, page: 1, search: '',
      status: 'All', loadStatus: 'All',
      sortCol: 'loadNumber', sortDir: 'desc',
      colFilters: {},
    },
    editTab: 'general',
    historyPage: 1,
    historyShow: 5,
    historySearch: '',
  };

  /* ---------------- routing ---------------- */
  function route() {
    const hash = location.hash || '#/dispatch';
    const parts = hash.slice(2).split('/');
    return { page: parts[0] || 'dispatch', param: parts[1] ? decodeURIComponent(parts[1]) : null };
  }
  window.addEventListener('hashchange', render);

  /* ---------------- sidebar ---------------- */
  const NAV = [
    { id: 'company', icon: 'building', label: 'Company Profile', placeholder: true },
    { id: 'alerts', icon: 'bell', label: 'Alerts', badge: 9, placeholder: true },
    { id: 'setup', icon: 'sliders', label: 'Setup', children: [
      { id: 'customers', label: 'Customer & Sites', placeholder: true },
      { id: 'carriers', label: 'Carriers', placeholder: true },
      { id: 'brokers', label: 'Customs Brokers', placeholder: true },
    ]},
    { id: 'newload', icon: 'truck', label: 'New Load' },
    { id: 'dispatch', icon: 'list', label: 'Dispatch Board' },
    { id: 'accounting', icon: 'dollar', label: 'Accounting', children: [
      { id: 'quickbooks', label: 'QuickBooks Setup', placeholder: true },
      { id: 'invoices', label: 'Invoices', placeholder: true },
      { id: 'receipts', label: 'Customer Receipts', placeholder: true },
    ]},
    { id: 'reports', icon: 'chart', label: 'Reports', placeholder: true },
  ];

  function renderSidebar() {
    const r = route();
    const active = (r.page === 'load') ? 'dispatch' : r.page;
    const nav = document.getElementById('sidebarNav');
    nav.innerHTML = NAV.map(item => {
      if (item.children) {
        const open = item.id === 'setup' ? state.setupOpen : state.accountingOpen;
        const kids = open ? `<div class="nav-sub">${item.children.map(c =>
          `<a class="nav-item ${active === c.id ? 'active' : ''}" href="#/${c.id}">${esc(c.label)}</a>`).join('')}</div>` : '';
        return `<div class="nav-item" data-toggle="${item.id}">
            <span class="nav-icon">${ic(item.icon, 17)}</span>${esc(item.label)}
            <span class="chev ${open ? 'open' : ''}">▾</span>
          </div>${kids}`;
      }
      const count = item.id === 'alerts' ? (S.db().alerts || []).length : item.badge;
      const badge = count ? `<span class="badge">${count}</span>` : '';
      return `<a class="nav-item ${active === item.id ? 'active' : ''}" href="#/${item.id}">
          <span class="nav-icon">${ic(item.icon, 17)}</span>${badge}${esc(item.label)}</a>`;
    }).join('');
    nav.querySelectorAll('[data-toggle]').forEach(el => {
      el.addEventListener('click', () => {
        if (el.dataset.toggle === 'setup') state.setupOpen = !state.setupOpen;
        else state.accountingOpen = !state.accountingOpen;
        renderSidebar();
      });
    });
  }

  /* ============================================================
     DISPATCH BOARD
     ============================================================ */
  const BOARD_COLUMNS = [
    { key: 'loadNumber', label: 'Load Number', get: l => l.loadNumber },
    { key: 'completed', label: 'Completed', get: l => l.completed ? 'Yes' : 'No' },
    { key: 'loadStatus', label: 'Load Status', get: l => l.loadStatus },
    { key: 'status', label: 'Status', get: l => l.cancelled ? 'Cancelled' : 'Active' },
    { key: 'customer', label: 'Customer', get: l => l.customer.name },
    { key: 'salesPerson', label: 'Sales Person', get: l => l.salesPerson },
    { key: 'pickup', label: 'Pickup', get: l => stopCity(l, 'Pickup') },
    { key: 'delivery', label: 'Delivery', get: l => stopCity(l, 'Delivery') },
    { key: 'pickupDate', label: 'Pickup Date', get: l => fmtDT(firstStop(l, 'Pickup') ? firstStop(l, 'Pickup').appointment : '') },
    { key: 'deliveryDate', label: 'Delivery Date', get: l => fmtDT(firstStop(l, 'Delivery') ? firstStop(l, 'Delivery').appointment : '') },
    { key: 'carrier', label: 'Carrier', get: l => l.carrier ? l.carrier.name : '' },
    { key: 'ref', label: 'Customer Ref', get: l => l.customerReference },
  ];
  function firstStop(l, type) { return l.stops.find(s => s.type === type); }
  function stopCity(l, type) {
    const s = firstStop(l, type);
    return s && s.site.city ? `${s.site.city}, ${s.site.prov}` : '';
  }

  function filteredLoads() {
    const b = state.board;
    let rows = S.getLoads().slice();
    if (b.search) {
      const q = b.search.toLowerCase();
      rows = rows.filter(l => BOARD_COLUMNS.some(c => String(c.get(l)).toLowerCase().includes(q)));
    }
    if (b.status !== 'All') rows = rows.filter(l => (l.cancelled ? 'Cancelled' : 'Active') === b.status);
    if (b.loadStatus !== 'All') rows = rows.filter(l => l.loadStatus === b.loadStatus);
    Object.entries(b.colFilters).forEach(([key, val]) => {
      if (!val) return;
      const col = BOARD_COLUMNS.find(c => c.key === key);
      rows = rows.filter(l => String(col.get(l)).toLowerCase().includes(val.toLowerCase()));
    });
    const col = BOARD_COLUMNS.find(c => c.key === b.sortCol) || BOARD_COLUMNS[0];
    rows.sort((a, z) => {
      const va = String(col.get(a)), vz = String(col.get(z));
      return (b.sortDir === 'asc' ? 1 : -1) * va.localeCompare(vz, undefined, { numeric: true });
    });
    return rows;
  }

  function renderBoard(content) {
    const b = state.board;
    const rows = filteredLoads();
    const totalPages = Math.max(1, Math.ceil(rows.length / b.show));
    if (b.page > totalPages) b.page = totalPages;
    const pageRows = rows.slice((b.page - 1) * b.show, b.page * b.show);

    content.innerHTML = `
      <div class="page-card">
        <div class="breadcrumb"><a href="#/dispatch">Dispatch Board</a> &nbsp;/&nbsp; Dispatch Board</div>
        <div class="page-title-row">
          <div class="page-title">Dispatch Board</div>
          <button class="btn btn-primary" id="btnNewLoad">${ic('plus')} New Load</button>
        </div>
        <div class="filters-row">
          <label>Show</label>
          <select class="control" id="fShow">
            ${[15, 25, 50, 100].map(n => `<option ${b.show === n ? 'selected' : ''}>${n}</option>`).join('')}
          </select>
          <span class="search-wrap"><input class="control" id="fSearch" placeholder="Search" value="${esc(b.search)}"></span>
          <label>Status:</label>
          <select class="control" id="fStatus">
            ${['All', 'Active', 'Cancelled'].map(s => `<option ${b.status === s ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
          <label>Load Status:</label>
          <select class="control" id="fLoadStatus">
            ${['All'].concat(S.LOAD_STATUSES).map(s => `<option ${b.loadStatus === s ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
          <span style="flex:1"></span>
          <button class="btn btn-ghost btn-sm" id="btnColumns">${ic('columns', 14)} Columns</button>
          <button class="btn btn-outline btn-sm" id="btnSaveBoard">${ic('save', 14)} Save Board</button>
        </div>
        <div class="filters-row">
          <label>Board:</label>
          <select class="control"><option>Dispatch Board</option></select>
        </div>
        <div class="table-scroll">
          <table class="grid">
            <thead>
              <tr>${BOARD_COLUMNS.map(c => `
                <th>${esc(c.label)} <button class="sort-btn" data-sort="${c.key}">${b.sortCol === c.key ? (b.sortDir === 'asc' ? '▲' : '▼') : '⇅'}</button></th>`).join('')}
              </tr>
              <tr class="filter-row">${BOARD_COLUMNS.map(c => `
                <th><input data-colfilter="${c.key}" value="${esc(b.colFilters[c.key] || '')}"></th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${pageRows.map(l => `
                <tr class="${l.highlight && !l.completed ? 'hot' : ''}" data-load="${l.loadNumber}">
                  <td><strong>${esc(l.loadNumber)}</strong></td>
                  <td><button class="pill ${l.completed ? 'pill-yes' : ''}" data-complete="${l.loadNumber}">${l.completed ? 'Yes' : 'No'}</button></td>
                  <td>${esc(l.loadStatus)}</td>
                  <td><span class="pill ${l.cancelled ? 'pill-cancelled' : 'pill-active'}">${l.cancelled ? 'Cancelled' : 'Active'}</span></td>
                  <td>${esc(l.customer.name)}</td>
                  <td>${esc(l.salesPerson)}</td>
                  <td>${esc(stopCity(l, 'Pickup'))}</td>
                  <td>${esc(stopCity(l, 'Delivery'))}</td>
                  <td>${esc(fmtDT(firstStop(l, 'Pickup') ? firstStop(l, 'Pickup').appointment : ''))}</td>
                  <td>${esc(fmtDT(firstStop(l, 'Delivery') ? firstStop(l, 'Delivery').appointment : ''))}</td>
                  <td>${esc(l.carrier ? l.carrier.name : '')}</td>
                  <td>${esc(l.customerReference)}</td>
                </tr>`).join('')}
              ${pageRows.length === 0 ? `<tr><td colspan="${BOARD_COLUMNS.length}" style="text-align:center;padding:40px;color:var(--ink-soft)">No loads match the current filters</td></tr>` : ''}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <span>${rows.length ? (b.page - 1) * b.show + 1 : 0} to ${Math.min(b.page * b.show, rows.length)} of ${rows.length}</span>
          <div class="pager">
            <button ${b.page <= 1 ? 'disabled' : ''} data-page="1">«</button>
            <button ${b.page <= 1 ? 'disabled' : ''} data-page="${b.page - 1}">‹</button>
            <span class="page-info">Page <strong>${b.page}</strong> of <strong>${totalPages}</strong></span>
            <button ${b.page >= totalPages ? 'disabled' : ''} data-page="${b.page + 1}">›</button>
            <button ${b.page >= totalPages ? 'disabled' : ''} data-page="${totalPages}">»</button>
          </div>
        </div>
      </div>`;

    content.querySelector('#btnNewLoad').addEventListener('click', openNewLoadModal);
    content.querySelector('#fShow').addEventListener('change', e => { b.show = Number(e.target.value); b.page = 1; render(); });
    content.querySelector('#fSearch').addEventListener('input', e => { b.search = e.target.value; b.page = 1; renderBoardOnly(); });
    content.querySelector('#fStatus').addEventListener('change', e => { b.status = e.target.value; b.page = 1; render(); });
    content.querySelector('#fLoadStatus').addEventListener('change', e => { b.loadStatus = e.target.value; b.page = 1; render(); });
    content.querySelector('#btnColumns').addEventListener('click', () => toast('Column chooser coming in a later phase'));
    content.querySelector('#btnSaveBoard').addEventListener('click', () => { S.save(); toast('Board view saved', 'success'); });
    content.querySelectorAll('[data-sort]').forEach(el => el.addEventListener('click', () => {
      if (b.sortCol === el.dataset.sort) b.sortDir = b.sortDir === 'asc' ? 'desc' : 'asc';
      else { b.sortCol = el.dataset.sort; b.sortDir = 'asc'; }
      render();
    }));
    content.querySelectorAll('[data-colfilter]').forEach(el => el.addEventListener('input', () => {
      b.colFilters[el.dataset.colfilter] = el.value; b.page = 1; renderBoardOnly(el);
    }));
    content.querySelectorAll('[data-complete]').forEach(el => el.addEventListener('click', e => {
      e.stopPropagation();
      const load = S.getLoad(el.dataset.complete);
      load.completed = !load.completed;
      S.addHistory(load, 'Load', 'Updated', [{ field: 'IsCompleted', from: String(!load.completed), to: String(load.completed) }]);
      render();
    }));
    content.querySelectorAll('tbody tr[data-load]').forEach(tr => tr.addEventListener('click', () => {
      state.editTab = 'general';
      location.hash = `#/load/${tr.dataset.load}`;
    }));
    content.querySelectorAll('.pager button').forEach(btn => btn.addEventListener('click', () => {
      b.page = Number(btn.dataset.page); render();
    }));

    // Re-render while keeping focus in the text filter being typed in.
    function renderBoardOnly(focusedEl) {
      const id = focusedEl ? (focusedEl.dataset.colfilter ? `[data-colfilter="${focusedEl.dataset.colfilter}"]` : '#' + focusedEl.id) : '#fSearch';
      const pos = focusedEl ? focusedEl.selectionStart : (content.querySelector('#fSearch') || {}).selectionStart;
      renderBoard(content);
      const el2 = content.querySelector(id);
      if (el2) { el2.focus(); try { el2.setSelectionRange(pos, pos); } catch (e) {} }
    }
  }

  /* ============================================================
     CREATE NEW LOAD
     ============================================================ */
  function openNewLoadModal() {
    const customers = S.db().customers;
    let selected = null;
    openModal(`
      <h3>Create New Load</h3>
      <div class="field">
        <label>Customer *</label>
        <div class="inset-box muted" id="nlCustomerBox">
          <span id="nlCustomerName">unassigned</span>
          <button class="acc-add" id="nlPickCustomer" title="Select customer">${ic('plus', 14)}</button>
        </div>
        <div class="pick-list" id="nlCustomerList" style="display:none;margin-top:8px">
          ${customers.map((c, i) => `
            <div class="pick-item" data-nlcust="${i}">
              <strong>${esc(c.name)}</strong>
              <small>${esc(c.id)} — ${esc(c.address1)}, ${esc(c.city)} ${esc(c.prov)}</small>
            </div>`).join('')}
        </div>
      </div>
      <fieldset class="fieldset">
        <legend>Pickup</legend>
        <label class="win-check"><input type="checkbox" id="nlPuWinChk"> Add Pickup Window</label>
        <div class="field"><label>Date/Time *</label><input type="datetime-local" id="nlPuDate"></div>
        <div class="field" id="nlPuWinField" style="display:none;margin-top:10px">
          <label>Window End</label><input type="datetime-local" id="nlPuWin">
        </div>
      </fieldset>
      <fieldset class="fieldset">
        <legend>Delivery</legend>
        <label class="win-check"><input type="checkbox" id="nlDelWinChk"> Add Delivery Window</label>
        <div class="field"><label>Date/Time *</label><input type="datetime-local" id="nlDelDate"></div>
        <div class="field" id="nlDelWinField" style="display:none;margin-top:10px">
          <label>Window End</label><input type="datetime-local" id="nlDelWin">
        </div>
      </fieldset>
      <div class="form-error" id="nlError" style="display:none"></div>
      <div class="modal-actions">
        <button class="btn btn-outline" id="mCancel">Cancel</button>
        <button class="btn btn-primary" id="mSave">Save</button>
      </div>`, m => {
      const q = sel => m.querySelector(sel);
      q('#nlPickCustomer').addEventListener('click', () => {
        const list = q('#nlCustomerList');
        list.style.display = list.style.display === 'none' ? 'flex' : 'none';
      });
      m.querySelectorAll('[data-nlcust]').forEach(el => el.addEventListener('click', () => {
        selected = customers[Number(el.dataset.nlcust)];
        q('#nlCustomerName').textContent = selected.name;
        q('#nlCustomerBox').classList.remove('muted', 'invalid');
        q('#nlCustomerList').style.display = 'none';
      }));
      q('#nlPuWinChk').addEventListener('change', e => {
        q('#nlPuWinField').style.display = e.target.checked ? 'flex' : 'none';
      });
      q('#nlDelWinChk').addEventListener('change', e => {
        q('#nlDelWinField').style.display = e.target.checked ? 'flex' : 'none';
      });
      q('#mCancel').addEventListener('click', closeModal);
      q('#mSave').addEventListener('click', () => {
        const errors = [];
        [q('#nlCustomerBox'), q('#nlPuDate'), q('#nlDelDate'), q('#nlPuWin'), q('#nlDelWin')].forEach(el => el.classList.remove('invalid'));
        if (!selected) { errors.push('Customer is required'); q('#nlCustomerBox').classList.add('invalid'); }
        if (!q('#nlPuDate').value) { errors.push('Pickup date/time is required'); q('#nlPuDate').classList.add('invalid'); }
        if (!q('#nlDelDate').value) { errors.push('Delivery date/time is required'); q('#nlDelDate').classList.add('invalid'); }
        if (q('#nlPuWinChk').checked && !q('#nlPuWin').value) { errors.push('Pickup window end is required'); q('#nlPuWin').classList.add('invalid'); }
        if (q('#nlDelWinChk').checked && !q('#nlDelWin').value) { errors.push('Delivery window end is required'); q('#nlDelWin').classList.add('invalid'); }
        const err = q('#nlError');
        if (errors.length) {
          err.style.display = 'block';
          err.textContent = errors.join('. ') + '.';
          return;
        }
        const load = S.createLoad({
          customer: selected.name,
          pickupDate: localInputToIso(q('#nlPuDate').value),
          deliveryDate: localInputToIso(q('#nlDelDate').value),
          pickupWindowEnd: q('#nlPuWinChk').checked ? localInputToIso(q('#nlPuWin').value) : '',
          deliveryWindowEnd: q('#nlDelWinChk').checked ? localInputToIso(q('#nlDelWin').value) : '',
        });
        closeModal();
        toast(`Load ${load.loadNumber} created`, 'success');
        state.editTab = 'general';
        location.hash = `#/load/${load.loadNumber}`;
      });
    });
  }

  /* ============================================================
     EDIT LOAD
     ============================================================ */
  function renderEditLoad(content, loadNumber) {
    const load = S.getLoad(loadNumber);
    if (!load) {
      content.innerHTML = `<div class="page-card"><div class="placeholder"><div class="ph-icon">${ic('search', 40)}</div><h2>Load not found</h2><p>Load ${esc(loadNumber)} does not exist. <a href="#/dispatch">Back to Dispatch Board</a></p></div></div>`;
      return;
    }
    const pickup = firstStop(load, 'Pickup');
    const delivery = load.stops.slice().reverse().find(s => s.type === 'Delivery');
    const statusIdx = S.LOAD_STATUSES.indexOf(load.loadStatus);

    content.innerHTML = `
      <div class="page-card">
        <div class="breadcrumb"><a href="#/dispatch">Dispatch Board</a> &nbsp;/&nbsp; Edit Load</div>
        <div class="load-header">
          <div>
            <div class="load-title">Load Number: ${esc(load.loadNumber)}</div>
            <div class="load-route">
              <span>${esc(pickup && pickup.site.city ? pickup.site.city + ', ' + provAbbr(pickup.site.prov) : '—')}</span>
              <span class="route-arrow">${ic('arrowRight', 20)}</span>
              <span>${esc(delivery && delivery.site.city ? delivery.site.city + ', ' + provAbbr(delivery.site.prov) : '—')}</span>
            </div>
          </div>
          <div style="flex:1;min-width:540px">
            <div class="stepper">
              ${S.LOAD_STATUSES.map((s, i) => `
                <div class="step ${i < statusIdx ? 'done' : ''} ${i === statusIdx ? 'current' : ''}" data-step="${esc(s)}" title="Set status to ${esc(s)}">
                  <div class="dot"></div><div class="step-label">${esc(s)}</div>
                </div>`).join('')}
            </div>
            <label class="cancel-load"><input type="checkbox" id="cancelLoad" ${load.cancelled ? 'checked' : ''}> Cancel Load</label>
          </div>
        </div>
        <div class="tabs">
          ${[['general', 'General'], ['stops', 'Stops'], ['load', 'Load'], ['rate', 'Rate'], ['notes', 'Notes & History']]
            .map(([id, label]) => `<button class="tab ${state.editTab === id ? 'active' : ''}" data-tab="${id}">${label}</button>`).join('')}
        </div>
        <div id="tabBody"></div>
        <div class="action-bar">
          <button class="btn btn-primary" id="btnCopy">${ic('copy')} Copy Load</button>
          <button class="btn btn-primary" id="btnGenDoc">${ic('cloud')} Generate Document</button>
          <button class="btn btn-primary" id="btnEmail">${ic('mail')} Compose Email</button>
          <button class="btn btn-primary" id="btnPost">${ic('upload')} Post To Board</button>
          <button class="btn btn-primary" id="btnSave">${ic('save')} Save Changes</button>
        </div>
      </div>`;

    // header wiring
    content.querySelectorAll('[data-step]').forEach(el => el.addEventListener('click', () => {
      const from = load.loadStatus;
      load.loadStatus = el.dataset.step;
      if (load.loadStatus === 'Invoiced' && !load.invoicedDate) load.invoicedDate = new Date().toISOString();
      if (load.loadStatus === 'Delivered' && !load.deliveredDate) load.deliveredDate = new Date().toISOString();
      S.addHistory(load, 'Load', 'Updated', [{ field: 'LoadStatus', from, to: load.loadStatus }]);
      toast(`Load status set to ${load.loadStatus}`, 'success');
      render();
    }));
    content.querySelector('#cancelLoad').addEventListener('change', e => {
      load.cancelled = e.target.checked;
      S.addHistory(load, 'Load', 'Updated', [{ field: 'IsCancelled', from: String(!load.cancelled), to: String(load.cancelled) }]);
      render();
    });
    content.querySelectorAll('[data-tab]').forEach(el => el.addEventListener('click', () => {
      state.editTab = el.dataset.tab; render();
    }));

    // footer wiring
    content.querySelector('#btnCopy').addEventListener('click', () => {
      const copy = S.copyLoad(load);
      toast(`Copied to new load ${copy.loadNumber}`, 'success');
      location.hash = `#/load/${copy.loadNumber}`;
    });
    content.querySelector('#btnGenDoc').addEventListener('click', () => {
      openModal(`
        <h3>Generate Document</h3>
        <div class="pick-list">
          ${['Rate Confirmation', 'Bill of Lading', 'Invoice', 'Quote Sheet'].map(d => `
            <div class="pick-item" data-doc="${d}"><strong>${d}</strong><small>Generate a ${d} PDF for load ${esc(load.loadNumber)}</small></div>`).join('')}
        </div>
        <div class="modal-actions"><button class="btn btn-ghost" id="mCancel">Cancel</button></div>
      `, m => {
        m.querySelector('#mCancel').addEventListener('click', closeModal);
        m.querySelectorAll('[data-doc]').forEach(el => el.addEventListener('click', () => {
          const name = `${el.dataset.doc.replace(/ /g, '')}_${load.loadNumber}.pdf`;
          load.generatedDocs.push({ name, date: new Date().toISOString() });
          if (el.dataset.doc === 'Rate Confirmation' && !load.rateConDate) load.rateConDate = new Date().toISOString();
          S.addHistory(load, 'Document', 'Generated', [{ field: 'Document', from: '', to: name }]);
          closeModal();
          toast(`${name} generated`, 'success');
          render();
        }));
      });
    });
    content.querySelector('#btnEmail').addEventListener('click', () => {
      const to = load.carrier ? load.carrier.name : load.customer.name;
      toast(`Email draft opened for ${to} (stub — email integration comes later)`);
    });
    content.querySelector('#btnPost').addEventListener('click', () => toast('Load posted to the load board (stub)', 'success'));
    content.querySelector('#btnSave').addEventListener('click', () => {
      S.addHistory(load, 'Load', 'Updated', [{ field: 'Saved', from: '', to: 'All changes saved' }]);
      toast('Changes saved', 'success');
    });

    const body = content.querySelector('#tabBody');
    if (state.editTab === 'general') renderGeneralTab(body, load);
    else if (state.editTab === 'stops') renderStopsTab(body, load);
    else if (state.editTab === 'load') renderLoadTab(body, load);
    else if (state.editTab === 'rate') renderRateTab(body, load);
    else renderNotesTab(body, load);
  }

  function provAbbr(p) {
    const map = { Ontario: 'ON', Quebec: 'QC', Alberta: 'AB', 'British Columbia': 'BC', Manitoba: 'MB' };
    return map[p] || p;
  }

  /* -------- helper: bind an input to a load property & persist -------- */
  function bind(el, get, set, opts) {
    opts = opts || {};
    el.addEventListener(opts.event || 'change', () => {
      const raw = el.type === 'checkbox' ? el.checked : el.value;
      set(opts.number ? (Number(raw) || 0) : raw);
      S.save();
      if (opts.after) opts.after();
    });
  }

  /* ============ GENERAL TAB ============ */
  function renderGeneralTab(body, load) {
    body.innerHTML = `
      <div class="two-col">
        <div>
          <div class="panel">
            <div class="panel-title">Load Information</div>
            <div class="form-grid">
              <div class="field"><label>Load Status</label>
                <select id="gLoadStatus">${S.LOAD_STATUSES.map(s => `<option ${load.loadStatus === s ? 'selected' : ''}>${s}</option>`).join('')}</select>
              </div>
              <div class="field"><label>Salesperson</label>
                <select id="gSales">${S.SALES_PEOPLE.map(s => `<option ${load.salesPerson === s ? 'selected' : ''}>${s}</option>`).join('')}</select>
              </div>
              <div class="field"><label>Pickup — Date FROM</label>
                <input type="datetime-local" id="gPickup" value="${isoToLocalInput(firstStop(load, 'Pickup') ? firstStop(load, 'Pickup').appointment : '')}">
              </div>
              <div class="field"><label>Delivery — Date FROM</label>
                <input type="datetime-local" id="gDelivery" value="${isoToLocalInput(firstStop(load, 'Delivery') ? firstStop(load, 'Delivery').appointment : '')}">
              </div>
              <div class="field"><label>Order Created Date</label>
                <input readonly value="${fmtDT(load.orderCreatedDate)}">
              </div>
              <div class="field"><label>Quote Valid Until</label>
                <input type="datetime-local" id="gQuoteValid" value="${isoToLocalInput(load.quoteValidUntil)}">
              </div>
              <div class="field"><label>RateCon Created Date</label>
                <input readonly value="${fmtDT(load.rateConDate) || '—'}">
              </div>
              <div class="field"><label>Invoiced Date</label>
                <input readonly value="${fmtDT(load.invoicedDate) || '—'}">
              </div>
              <div class="field"><label>Created By</label>
                <input readonly value="${esc(load.createdBy)}">
              </div>
              <div class="field"></div>
              <div class="field"><label>Customer Reference</label>
                <input id="gRef" value="${esc(load.customerReference)}">
              </div>
              <div class="field"><label>Pro Number(s)</label>
                <input id="gPro" value="${esc(load.proNumbers)}">
              </div>
            </div>
          </div>

          <div class="panel">
            <div class="panel-title">Document References <span class="panel-sub">(Max upload 10 files)</span>
              <button class="btn btn-primary btn-sm" id="btnAddDoc">${ic('plus', 14)} Add Document</button>
            </div>
            <div class="empty-table">
              <div class="et-head"><span>File Name</span><span>Action</span></div>
              ${load.documents.length ? load.documents.map((d, i) => `
                <div class="doc-row"><span>${ic('file', 14)} ${esc(d.name)}</span>
                  <span class="doc-actions"><button data-deldoc="${i}" title="Remove" style="color:var(--red)">${ic('trash', 14)}</button></span></div>`).join('')
                : `<div class="et-body">No Document References to show</div>`}
            </div>
          </div>

          <div class="panel">
            <div class="panel-title">Generated Documents</div>
            <div class="empty-table">
              <div class="et-head"><span>File Name</span><span>Action</span></div>
              ${load.generatedDocs.length ? load.generatedDocs.map(d => `
                <div class="doc-row"><span>${ic('file', 14)} ${esc(d.name)} <small style="color:var(--ink-faint)">&nbsp;${fmtDT(d.date)}</small></span>
                  <span class="doc-actions"><button title="Download (stub)" style="color:var(--primary)">${ic('download', 14)}</button></span></div>`).join('')
                : `<div class="et-body">No Document References to show</div>`}
            </div>
          </div>
        </div>

        <div>
          <div class="panel">
            <div class="panel-title">Customer
              <span class="panel-actions">
                <button class="icon-btn" id="btnEditCustomer" title="Change customer">${ic('pencil', 15)}</button>
                <button class="icon-btn" title="Clear">${ic('x', 15)}</button>
              </span>
            </div>
            <div class="form-grid">
              <div class="address-block">
                <span class="addr-id">${esc(load.customer.id)}</span>
                <strong>${esc(load.customer.name)}</strong>
                ${esc(load.customer.address1)}<br>
                ${load.customer.address2 ? esc(load.customer.address2) + '<br>' : ''}
                ${esc(load.customer.city)} ${esc(load.customer.prov)} ${esc(load.customer.postal)}
              </div>
              <div class="field"><label>Customer Contact</label>
                <div class="inset-box"><strong>${esc(load.customer.contact)}</strong> &nbsp; <strong>${esc(load.customer.phone)}</strong></div>
              </div>
              <div class="field"><label>Set Payment Terms</label>
                <select id="gCustTerms">${['Net 15', 'Net 30', 'Net 45', 'Net 60', 'COD'].map(t => `<option ${load.customerTerms === t ? 'selected' : ''}>${t}</option>`).join('')}</select>
              </div>
            </div>
          </div>

          <div class="panel">
            <div class="panel-title">Carrier
              <span class="panel-actions">
                <button class="icon-btn" id="btnEditCarrier" title="Change carrier">${ic('pencil', 15)}</button>
                <button class="icon-btn" id="btnClearCarrier" title="Unassign carrier">${ic('x', 15)}</button>
              </span>
            </div>
            ${load.carrier ? `
            <div class="form-grid">
              <div class="address-block">
                <span class="addr-id">${esc(load.carrier.id)}</span>
                <strong>${esc(load.carrier.name)}</strong>
                ${esc(load.carrier.contact)} | ${esc(load.carrier.phone)}<br>
                ${esc(load.carrier.address1)}<br>
                ${esc(load.carrier.city)} ${esc(load.carrier.prov)} ${esc(load.carrier.postal)}
              </div>
              <div class="field"><label>Driver</label><input id="gDriver" value="${esc(load.carrier.driver)}"></div>
              <div class="field"><label>Truck</label><input id="gTruck" value="${esc(load.carrier.truck)}"></div>
              <div class="field"><label>Trailer</label><input id="gTrailer" value="${esc(load.carrier.trailer)}"></div>
              <div class="field"><label>Seal Number</label><input id="gSeal" value="${esc(load.carrier.seal)}"></div>
              <div class="field"><label>Set Payment Terms</label>
                <select id="gCarrTerms">${['Net 15', 'Net 30', 'Net 45', 'Net 60', 'Quick Pay'].map(t => `<option ${load.carrierTerms === t ? 'selected' : ''}>${t}</option>`).join('')}</select>
              </div>
            </div>` : `
            <div class="inset-box muted">carrier unassigned <button class="acc-add" id="btnEditCarrier">${ic('plus', 14)}</button></div>`}
          </div>

          <div class="panel">
            <div class="panel-title">Customs Broker</div>
            <div class="inset-box muted">${load.customsBroker ? esc(load.customsBroker) : 'unassigned'} <button class="acc-add" id="btnBroker">${ic('plus', 14)}</button></div>
          </div>

          <div class="panel">
            <div class="field">
              <label>Quote Comments</label>
              <textarea id="gQuoteComments" maxlength="200">${esc(load.quoteComments)}</textarea>
              <span class="char-count">${(load.quoteComments || '').length} / 200</span>
            </div>
            <div class="field" style="margin-top:14px">
              <label>Special Instructions</label>
              <textarea id="gInstructions" maxlength="500">${esc(load.specialInstructions)}</textarea>
              <span class="char-count">${(load.specialInstructions || '').length} / 500</span>
            </div>
          </div>
        </div>
      </div>`;

    const q = sel => body.querySelector(sel);
    bind(q('#gLoadStatus'), null, v => {
      const from = load.loadStatus; load.loadStatus = v;
      S.addHistory(load, 'Load', 'Updated', [{ field: 'LoadStatus', from, to: v }]);
      render();
    });
    bind(q('#gSales'), null, v => { load.salesPerson = v; });
    bind(q('#gPickup'), null, v => { const s = firstStop(load, 'Pickup'); if (s) s.appointment = localInputToIso(v); });
    bind(q('#gDelivery'), null, v => { const s = firstStop(load, 'Delivery'); if (s) s.appointment = localInputToIso(v); });
    bind(q('#gQuoteValid'), null, v => { load.quoteValidUntil = localInputToIso(v); });
    bind(q('#gRef'), null, v => { load.customerReference = v; });
    bind(q('#gPro'), null, v => { load.proNumbers = v; });
    bind(q('#gCustTerms'), null, v => { load.customerTerms = v; });
    bind(q('#gQuoteComments'), null, v => { load.quoteComments = v; }, { event: 'input' });
    bind(q('#gInstructions'), null, v => { load.specialInstructions = v; }, { event: 'input' });
    if (load.carrier) {
      bind(q('#gDriver'), null, v => { load.carrier.driver = v; });
      bind(q('#gTruck'), null, v => { load.carrier.truck = v; });
      bind(q('#gTrailer'), null, v => { load.carrier.trailer = v; });
      bind(q('#gSeal'), null, v => { load.carrier.seal = v; });
      bind(q('#gCarrTerms'), null, v => { load.carrierTerms = v; });
      q('#btnClearCarrier').addEventListener('click', () => {
        S.addHistory(load, 'Load', 'Updated', [{ field: 'Carrier', from: load.carrier.name, to: 'unassigned' }]);
        load.carrier = null; render();
      });
    }
    q('#btnEditCustomer').addEventListener('click', () => pickEntity('Customer', S.db().customers, c => {
      S.addHistory(load, 'Load', 'Updated', [{ field: 'Customer', from: load.customer.name, to: c.name }]);
      load.customer = Object.assign({}, c); load.customerTerms = c.terms; render();
    }));
    q('#btnEditCarrier').addEventListener('click', () => pickEntity('Carrier', S.db().carriers, c => {
      S.addHistory(load, 'Load', 'Updated', [{ field: 'Carrier', from: load.carrier ? load.carrier.name : 'unassigned', to: c.name }]);
      load.carrier = Object.assign({ driver: '', truck: '', trailer: '', seal: '' }, c);
      load.carrierTerms = c.terms; render();
    }));
    if (q('#btnBroker')) q('#btnBroker').addEventListener('click', () => {
      openModal(`
        <h3>Assign Customs Broker</h3>
        <div class="field"><label>Broker name</label><input id="mBroker" value="${esc(load.customsBroker)}"></div>
        <div class="modal-actions">
          <button class="btn btn-ghost" id="mCancel">Cancel</button>
          <button class="btn btn-primary" id="mOk">Assign</button>
        </div>`, m => {
        m.querySelector('#mCancel').addEventListener('click', closeModal);
        m.querySelector('#mOk').addEventListener('click', () => {
          load.customsBroker = m.querySelector('#mBroker').value; S.save(); closeModal(); render();
        });
      });
    });
    q('#btnAddDoc').addEventListener('click', () => {
      if (load.documents.length >= 10) { toast('Maximum of 10 documents'); return; }
      openModal(`
        <h3>Add Document Reference</h3>
        <div class="field"><label>File name</label><input id="mDoc" placeholder="e.g. BOL_scan.pdf"></div>
        <div class="modal-actions">
          <button class="btn btn-ghost" id="mCancel">Cancel</button>
          <button class="btn btn-primary" id="mOk">Add</button>
        </div>`, m => {
        m.querySelector('#mCancel').addEventListener('click', closeModal);
        m.querySelector('#mOk').addEventListener('click', () => {
          const name = m.querySelector('#mDoc').value.trim();
          if (!name) return;
          load.documents.push({ name, date: new Date().toISOString() });
          S.addHistory(load, 'Document', 'Added', [{ field: 'DocumentReference', from: '', to: name }]);
          closeModal(); render();
        });
      });
    });
    body.querySelectorAll('[data-deldoc]').forEach(el => el.addEventListener('click', () => {
      const doc = load.documents.splice(Number(el.dataset.deldoc), 1)[0];
      S.addHistory(load, 'Document', 'Removed', [{ field: 'DocumentReference', from: doc.name, to: '' }]);
      render();
    }));
  }

  function pickEntity(kind, list, onPick) {
    openModal(`
      <h3>Select ${kind}</h3>
      <div class="pick-list">
        ${list.map((c, i) => `<div class="pick-item" data-pick="${i}">
          <strong>${esc(c.name)}</strong>
          <small>${esc(c.id)} — ${esc(c.address1)}, ${esc(c.city)} ${esc(c.prov)}</small></div>`).join('')}
      </div>
      <div class="modal-actions"><button class="btn btn-ghost" id="mCancel">Cancel</button></div>
    `, m => {
      m.querySelector('#mCancel').addEventListener('click', closeModal);
      m.querySelectorAll('[data-pick]').forEach(el => el.addEventListener('click', () => {
        closeModal(); onPick(list[Number(el.dataset.pick)]);
      }));
    });
  }

  /* ============ STOPS TAB ============ */
  function renderStopsTab(body, load) {
    const letters = 'ABCDEFGHIJ';
    body.innerHTML = load.stops.map((stop, i) => {
      const connector = i < load.stops.length - 1 ? `
        <div class="stop-connector">
          <span style="color:var(--ink-soft)">${ic('route', 20)}</span>
          <span class="conn-label">Truck Miles</span>
          <input class="control" data-miles="${i}" value="${esc(stop.milesToNext)}">
          <button class="btn btn-primary btn-sm" data-calcmiles="${i}">Calculate Miles</button>
          <span title="Distance between this stop and the next" style="color:var(--primary)">${ic('info', 15)}</span>
          <span class="conn-label" style="margin-left:26px">Carrier</span>
          <input class="control" readonly value="${esc(load.carrier ? load.carrier.name : 'unassigned')}" style="width:200px">
        </div>` : '';
      return `
      <div class="stop-card">
        <div class="stop-head">
          <span class="stop-name">Stop ${letters[i]}:</span>
          <label style="color:var(--ink-faint);font-size:13px"><input type="checkbox" disabled> Add Appointment Window</label>
        </div>
        <div class="stop-grid">
          <div>
            <div class="field"><label>Stop Type</label>
              <select data-stoptype="${i}">${['Pickup', 'Delivery', 'Stop'].map(t => `<option ${stop.type === t ? 'selected' : ''}>${t}</option>`).join('')}</select>
            </div>
            <div class="field" style="margin-top:12px"><label>Select Location:</label>
              <div class="site-box">
                <span class="select-site" data-selectsite="${i}">Select Site</span>
                ${stop.site.name ? `
                <strong>${esc(stop.site.name)}</strong>
                ${esc(stop.site.contact)} | ${esc(stop.site.phone)}<br>
                ${esc(stop.site.address1)}<br>
                ${stop.site.address2 ? esc(stop.site.address2) + '<br>' : ''}
                ${esc(stop.site.city)} ${esc(stop.site.prov)} ${esc(stop.site.postal)}` : `
                <span style="color:var(--ink-faint)">no site assigned</span>`}
              </div>
            </div>
          </div>
          <div>
            <div class="field"><label>Appointment</label>
              <input type="datetime-local" data-appt="${i}" value="${isoToLocalInput(stop.appointment)}">
            </div>
            <div class="field" style="margin-top:12px"><label>Arrival</label>
              <input type="datetime-local" data-arrival="${i}" value="${isoToLocalInput(stop.arrival)}">
            </div>
            <div class="field" style="margin-top:12px"><label>Departure</label>
              <input type="datetime-local" data-departure="${i}" value="${isoToLocalInput(stop.departure)}">
            </div>
          </div>
          <div>
            <div class="field"><label>Status</label>
              <select data-stopstatus="${i}">${S.STOP_STATUSES.map(t => `<option ${stop.status === t ? 'selected' : ''}>${t}</option>`).join('')}</select>
            </div>
            <div class="field" style="margin-top:12px"><label>Notes</label>
              <textarea data-stopnotes="${i}" maxlength="200" rows="4">${esc(stop.notes)}</textarea>
              <span class="char-count">${(stop.notes || '').length} / 200</span>
            </div>
          </div>
          <div class="stop-side-actions">
            <button class="btn btn-primary btn-sm" data-acc="${i}">Accessorials</button>
            <button class="trash-btn" data-delstop="${i}" title="Delete stop">${ic('trash', 16)}</button>
          </div>
        </div>
      </div>
      ${connector}`;
    }).join('') + `
      <div style="margin-top:20px"><button class="btn btn-primary" id="btnAddStop">Add Stop</button></div>`;

    load.stops.forEach((stop, i) => {
      const q = sel => body.querySelector(sel);
      bind(q(`[data-stoptype="${i}"]`), null, v => { stop.type = v; render(); });
      bind(q(`[data-appt="${i}"]`), null, v => { stop.appointment = localInputToIso(v); });
      bind(q(`[data-arrival="${i}"]`), null, v => { stop.arrival = localInputToIso(v); });
      bind(q(`[data-departure="${i}"]`), null, v => { stop.departure = localInputToIso(v); });
      bind(q(`[data-stopstatus="${i}"]`), null, v => { stop.status = v; });
      bind(q(`[data-stopnotes="${i}"]`), null, v => { stop.notes = v; }, { event: 'input' });
      const milesEl = q(`[data-miles="${i}"]`);
      if (milesEl) bind(milesEl, null, v => { stop.milesToNext = v; recalcLoadedMiles(load); });
      const calcEl = q(`[data-calcmiles="${i}"]`);
      if (calcEl) calcEl.addEventListener('click', () => {
        stop.milesToNext = stop.milesToNext || 20;
        recalcLoadedMiles(load);
        toast('Miles calculated (stub — mapping service comes later)', 'success');
        render();
      });
      q(`[data-selectsite="${i}"]`).addEventListener('click', () => {
        const sites = Object.values(S.db().sites);
        pickEntity('Site', sites.map(s => ({ name: s.name, id: s.contact, address1: s.address1, city: s.city, prov: s.prov })), picked => {
          const full = sites.find(s => s.name === picked.name);
          stop.site = Object.assign({}, full);
          S.addHistory(load, 'Stop', 'Updated', [{ field: `Stop ${'ABCDEFGHIJ'[i]} Site`, from: '', to: full.name }]);
          render();
        });
      });
      q(`[data-acc="${i}"]`).addEventListener('click', () => {
        openModal(`
          <h3>Stop Accessorials</h3>
          <div class="pick-list">
            ${['Tailgate', 'Inside Delivery', 'Detention', 'Layover', 'Lumper', 'Redelivery'].map(a => `
              <label class="pick-item" style="display:flex;gap:10px;align-items:center">
                <input type="checkbox" data-accitem="${a}" ${stop.accessorials.includes(a) ? 'checked' : ''}> ${a}
              </label>`).join('')}
          </div>
          <div class="modal-actions">
            <button class="btn btn-ghost" id="mCancel">Close</button>
            <button class="btn btn-primary" id="mOk">Apply</button>
          </div>`, m => {
          m.querySelector('#mCancel').addEventListener('click', closeModal);
          m.querySelector('#mOk').addEventListener('click', () => {
            stop.accessorials = Array.from(m.querySelectorAll('[data-accitem]'))
              .filter(cb => cb.checked).map(cb => cb.dataset.accitem);
            S.save(); closeModal(); toast('Accessorials updated', 'success');
          });
        });
      });
      q(`[data-delstop="${i}"]`).addEventListener('click', () => {
        if (load.stops.length <= 2) { toast('A load needs at least a pickup and a delivery'); return; }
        load.stops.splice(i, 1);
        S.addHistory(load, 'Stop', 'Removed', [{ field: 'Stop', from: 'ABCDEFGHIJ'[i], to: '' }]);
        recalcLoadedMiles(load);
        render();
      });
    });
    body.querySelector('#btnAddStop').addEventListener('click', () => {
      const sites = Object.values(S.db().sites);
      load.stops.push({
        type: 'Delivery', appointment: '', appointmentWindowEnd: '', status: 'Queued',
        site: Object.assign({}, sites[0]), arrival: '', departure: '', notes: '', accessorials: [], milesToNext: '',
      });
      S.addHistory(load, 'Stop', 'Added', [{ field: 'Stop', from: '', to: 'ABCDEFGHIJ'[load.stops.length - 1] }]);
      render();
    });
  }

  function recalcLoadedMiles(load) {
    load.loadedMiles = load.stops.reduce((sum, s) => sum + (Number(s.milesToNext) || 0), 0);
    S.save();
  }

  /* ============ LOAD TAB ============ */
  function renderLoadTab(body, load) {
    const totalWeight = load.commodities.reduce((s, c) => s + (Number(c.totalWeight) || 0), 0);
    const totalFloor = load.commodities.reduce((s, c) => s + (Number(c.floorSpace) || 0), 0);
    const capacity = totalFloor > 350 || totalWeight > 30000 ? 'Full Truck'
      : totalFloor > 175 || totalWeight > 15000 ? '3/4 Truck'
      : totalWeight > 5000 ? '1/2 Truck' : '1/4 Truck';

    body.innerHTML = `
      <div class="panel">
        <div class="panel-title">Commodity</div>
        <div class="table-scroll" style="border:none">
        <table class="commodity">
          <thead>
            <tr>
              <th rowspan="2">No</th><th rowspan="2">Commodity</th>
              <th colspan="2">Packaging</th><th colspan="2">Weight</th><th rowspan="2">Unit</th>
              <th colspan="4">Package Dimension</th>
              <th rowspan="2">Floor Space<br>(sq ft)</th><th rowspan="2">Total Weight<br>(lbs)</th><th rowspan="2">Action</th>
            </tr>
            <tr>
              <th>Pcs</th><th>Type</th><th>Quantity</th><th>UoM</th>
              <th>Length</th><th>Width</th><th>Height</th><th>UoM</th>
            </tr>
          </thead>
          <tbody>
            ${load.commodities.map((c, i) => `
              <tr>
                <td>${i + 1}</td>
                <td style="text-align:left">${esc(c.commodity)}</td>
                <td>${esc(c.pcs)}</td><td>${esc(c.type)}</td>
                <td>${esc(c.quantity)}</td><td>${esc(c.uom)}</td><td>${esc(c.unit)}</td>
                <td>${esc(c.length)}</td><td>${esc(c.width)}</td><td>${esc(c.height)}</td><td>${esc(c.dimUom)}</td>
                <td class="calc">${esc(c.floorSpace)}</td><td class="calc">${esc(c.totalWeight)}</td>
                <td>
                  <button class="row-btn" data-editcom="${i}" title="Edit" style="color:var(--primary)">${ic('pencil', 14)}</button>
                  <button class="row-btn" data-delcom="${i}" title="Delete" style="color:var(--red)">${ic('trash', 14)}</button>
                </td>
              </tr>`).join('')}
            ${load.commodities.length === 0 ? `<tr><td colspan="14" style="padding:26px;color:var(--ink-soft)">No commodities — use the + button below to add one</td></tr>` : ''}
          </tbody>
        </table>
        </div>
        <button class="add-commodity" id="btnAddCom" title="Add commodity">${ic('plus', 18)}</button>
        <div class="load-totals">
          <div class="lt-row"><label>Total Floor Space (sq ft)</label><input readonly value="${totalFloor.toFixed(1)}"></div>
          <div class="lt-row"><label>Total Shipment Weight (lbs)</label><input readonly value="${totalWeight}"></div>
          <div class="lt-row"><label>53' Estimated Capacity</label><input readonly value="${capacity}"></div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">Summary</div>
        <div class="two-col">
          <div>
            <div class="field"><label>Required Trailer Equipment *</label>
              <select id="lTrailer">${S.TRAILER_TYPES.map(t => `<option ${load.trailerEquipment === t ? 'selected' : ''}>${t}</option>`).join('')}</select>
            </div>
            <div class="field" style="margin-top:14px"><label>Required Minimum Capacity *</label>
              <select id="lCapacity">${S.CAPACITIES.map(t => `<option ${load.minCapacity === t ? 'selected' : ''}>${t}</option>`).join('')}</select>
            </div>
          </div>
          <div class="truck-art">
            <svg viewBox="0 0 320 105" width="300" aria-hidden="true">
              <g fill="#413ba8">
                <path d="M14 38 h14 l10-14 h26 v52 H14 z"/>
                <rect x="16" y="66" width="292" height="8" rx="2"/>
                <rect x="72" y="14" width="52" height="52" rx="2"/>
                <rect x="130" y="14" width="52" height="52" rx="2"/>
                <rect x="188" y="14" width="52" height="52" rx="2"/>
                <rect x="246" y="14" width="52" height="52" rx="2"/>
                <circle cx="42" cy="84" r="13"/>
                <circle cx="88" cy="84" r="13"/>
                <circle cx="118" cy="84" r="13"/>
                <circle cx="238" cy="84" r="13"/>
                <circle cx="272" cy="84" r="13"/>
              </g>
              <g fill="#ffffff">
                <path d="M41 27 h11 v11 h-19 z"/>
                <circle cx="42" cy="84" r="5"/>
                <circle cx="88" cy="84" r="5"/>
                <circle cx="118" cy="84" r="5"/>
                <circle cx="238" cy="84" r="5"/>
                <circle cx="272" cy="84" r="5"/>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">Additional Attributes</div>
        <div class="attr-grid">
          ${S.ATTRIBUTES.map(a => `
            <label><input type="checkbox" data-attr="${a}" ${load.attributes.includes(a) ? 'checked' : ''}> ${a}</label>`).join('')}
        </div>
      </div>`;

    bind(body.querySelector('#lTrailer'), null, v => { load.trailerEquipment = v; });
    bind(body.querySelector('#lCapacity'), null, v => { load.minCapacity = v; });
    body.querySelectorAll('[data-attr]').forEach(cb => cb.addEventListener('change', () => {
      if (cb.checked) load.attributes.push(cb.dataset.attr);
      else load.attributes = load.attributes.filter(a => a !== cb.dataset.attr);
      S.save();
    }));
    body.querySelector('#btnAddCom').addEventListener('click', () => commodityModal(load, null));
    body.querySelectorAll('[data-editcom]').forEach(el => el.addEventListener('click', () => commodityModal(load, Number(el.dataset.editcom))));
    body.querySelectorAll('[data-delcom]').forEach(el => el.addEventListener('click', () => {
      const c = load.commodities.splice(Number(el.dataset.delcom), 1)[0];
      S.addHistory(load, 'Commodity', 'Removed', [{ field: 'Commodity', from: c.commodity, to: '' }]);
      render();
    }));
  }

  function commodityModal(load, index) {
    const c = index == null
      ? { commodity: '', pcs: 1, type: 'skid', quantity: 0, uom: 'lb', unit: 'pc', length: '', width: '', height: '', dimUom: 'ft', floorSpace: 0, totalWeight: 0 }
      : load.commodities[index];
    openModal(`
      <h3>${index == null ? 'Add' : 'Edit'} Commodity</h3>
      <div class="form-grid">
        <div class="field field-span2"><label>Commodity</label><input id="cName" value="${esc(c.commodity)}"></div>
        <div class="field"><label>Pieces</label><input id="cPcs" type="number" value="${esc(c.pcs)}"></div>
        <div class="field"><label>Packaging Type</label>
          <select id="cType">${S.PACKAGING_TYPES.map(t => `<option ${c.type === t ? 'selected' : ''}>${t}</option>`).join('')}</select>
        </div>
        <div class="field"><label>Weight per piece</label><input id="cQty" type="number" value="${esc(c.quantity)}"></div>
        <div class="field"><label>Weight UoM</label>
          <select id="cUom">${['lb', 'kg'].map(t => `<option ${c.uom === t ? 'selected' : ''}>${t}</option>`).join('')}</select>
        </div>
        <div class="field"><label>Length</label><input id="cLen" type="number" value="${esc(c.length)}"></div>
        <div class="field"><label>Width</label><input id="cWid" type="number" value="${esc(c.width)}"></div>
        <div class="field"><label>Height</label><input id="cHei" type="number" value="${esc(c.height)}"></div>
        <div class="field"><label>Dimension UoM</label>
          <select id="cDimUom">${['ft', 'in', 'm'].map(t => `<option ${c.dimUom === t ? 'selected' : ''}>${t}</option>`).join('')}</select>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn btn-ghost" id="mCancel">Cancel</button>
        <button class="btn btn-primary" id="mOk">${index == null ? 'Add' : 'Save'}</button>
      </div>`, m => {
      m.querySelector('#mCancel').addEventListener('click', closeModal);
      m.querySelector('#mOk').addEventListener('click', () => {
        c.commodity = m.querySelector('#cName').value;
        c.pcs = Number(m.querySelector('#cPcs').value) || 0;
        c.type = m.querySelector('#cType').value;
        c.quantity = Number(m.querySelector('#cQty').value) || 0;
        c.uom = m.querySelector('#cUom').value;
        c.length = m.querySelector('#cLen').value;
        c.width = m.querySelector('#cWid').value;
        c.height = m.querySelector('#cHei').value;
        c.dimUom = m.querySelector('#cDimUom').value;
        c.totalWeight = c.pcs * c.quantity;
        const toFt = v => c.dimUom === 'in' ? v / 12 : c.dimUom === 'm' ? v * 3.281 : v;
        c.floorSpace = (Number(c.length) && Number(c.width)) ? Math.round(toFt(Number(c.length)) * toFt(Number(c.width)) * c.pcs * 10) / 10 : 0;
        if (index == null) {
          load.commodities.push(c);
          S.addHistory(load, 'Commodity', 'Added', [{ field: 'Commodity', from: '', to: c.commodity }]);
        } else {
          S.addHistory(load, 'Commodity', 'Updated', [{ field: 'Commodity', from: '', to: c.commodity }]);
        }
        S.save(); closeModal(); render();
      });
    });
  }

  /* ============ RATE TAB ============ */
  function chargeTotals(ch) {
    const acc = ch.accessorials.reduce((s, a) => s + (Number(a.amount) || 0), 0);
    const freightFuel = (Number(ch.freight) || 0) + (Number(ch.fuelSurcharge) || 0);
    const subtotal = freightFuel + acc - (Number(ch.discount) || 0);
    const tax = ch.applyTaxes ? subtotal * 0.13 : 0;
    return { acc, freightFuel, subtotal, tax, total: subtotal + tax };
  }

  function renderRateTab(body, load) {
    const cust = chargeTotals(load.rate.customer);
    const carr = chargeTotals(load.rate.carrier);
    const miles = Number(load.loadedMiles) || 0;
    const perMileCust = miles ? cust.total / miles : 0;
    const perMileCarr = miles ? carr.total / miles : 0;
    const margin = cust.total - carr.total;
    const marginRate = cust.total ? (margin / cust.total) * 100 : 0;

    function chargesPanel(side, label, ch, totals) {
      return `
      <div class="panel">
        <div class="charges-head">
          <span class="ct">${label}</span>
          <span class="currency-toggle">CAD <button class="switch ${ch.currency === 'USD' ? 'on' : ''}" data-cur="${side}"></button> USD</span>
        </div>
        <div class="money-row">
          <div class="money-field"><label>Freight</label>
            <div class="money-input"><span class="sym">$</span><input data-f="${side}.freight" value="${money(ch.freight)}"></div>
          </div>
          <div class="money-field"><label>Rate Type</label>
            <select class="control" style="width:100%" data-f="${side}.rateType">
              ${['Flat', 'Per Mile', 'Per CWT', 'Per Skid'].map(t => `<option ${ch.rateType === t ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
          </div>
          <div class="money-field"><label>Loaded Miles &nbsp;<span style="color:var(--primary)">${ic('info', 13)}</span></label>
            <div class="money-input readonly"><input readonly value="${miles}"></div>
          </div>
          <div class="money-field"></div>
          <div class="money-field"><label>Fuel Surcharge</label>
            <div class="money-input"><span class="sym">$</span><input data-f="${side}.fuelSurcharge" value="${money(ch.fuelSurcharge)}"></div>
          </div>
          <div class="money-field"><label>Rate Type</label>
            <select class="control" style="width:100%" data-f="${side}.fuelRateType">
              ${['Per Mile', 'Flat', '% of Freight'].map(t => `<option ${ch.fuelRateType === t ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
          </div>
          <div class="money-field"><label>Total Freight + Fuel</label>
            <div class="money-input readonly"><span class="sym">$</span><input readonly value="${money(totals.freightFuel)}"></div>
          </div>
          <div class="money-field"></div>
          <div class="money-field"><label>Accessorials</label>
            <div style="display:flex;align-items:center">
              <div class="money-input readonly" style="flex:1"><span class="sym">$</span><input readonly value="${money(totals.acc)}"></div>
              <button class="acc-add" data-accadd="${side}" title="Manage accessorial charges">${ic('plus', 14)}</button>
            </div>
          </div>
          <div class="money-field"></div>
          <div class="money-field"><label>Discount</label>
            <div class="money-input"><span class="sym">$</span><input data-f="${side}.discount" value="${ch.discount ? money(ch.discount) : ''}"></div>
          </div>
          <div class="money-field"></div>
          <div class="money-field"><label>Subtotal</label>
            <div class="money-input readonly"><span class="sym">$</span><input readonly value="${money(totals.subtotal)}"></div>
          </div>
          <div class="money-field" style="display:flex;align-items:flex-end;padding-bottom:6px">
            <span class="apply-tax"><button class="switch ${ch.applyTaxes ? 'on' : ''}" data-tax="${side}"></button> Apply Taxes</span>
          </div>
          <div class="money-field"><label>Total Charges</label>
            <div class="money-input readonly"><span class="sym">$</span><input readonly value="${money(totals.total)}" style="font-weight:700"></div>
          </div>
        </div>
      </div>`;
    }

    body.innerHTML = `
      <div class="rate-layout">
        ${chargesPanel('customer', 'Customer Charges', load.rate.customer, cust)}
        ${chargesPanel('carrier', 'Carrier Charges', load.rate.carrier, carr)}
        <div>
          <div class="panel">
            <div class="panel-title">Rate Insights (CAD$)</div>
            ${[['Total Per Mile, Customer', perMileCust, '$'], ['Total Per Mile, Carrier', perMileCarr, '$'],
               ['Per Mile Variance', perMileCust - perMileCarr, '$'], ['Total Margin', margin, '$'],
               ['Margin Rate', marginRate, '%']].map(([l, v, sym]) => `
              <div class="money-field" style="margin-bottom:12px"><label>${l}</label>
                <div class="money-input readonly"><span class="sym">${sym}</span><input readonly value="${money(v)}"></div>
              </div>`).join('')}
          </div>
          <div class="rateindex-card">
            <div class="ri-logo">Rate<span>Index</span></div>
            <div style="font-size:11px;color:var(--ink-faint)">Truckload Rating Tool</div>
            <p><strong>Lane rate benchmarking</strong><br>Find the average rate of a carrier in this lane and what kind of pricing power you may have. Coming in a later phase.</p>
            <button class="btn btn-primary btn-sm" id="btnRateIndex">Get Started</button>
          </div>
        </div>
      </div>`;

    body.querySelectorAll('[data-f]').forEach(el => {
      const [side, field] = el.dataset.f.split('.');
      el.addEventListener('change', () => {
        const ch = load.rate[side];
        const from = ch[field];
        ch[field] = (field === 'rateType' || field === 'fuelRateType') ? el.value : (Number(el.value) || 0);
        S.addHistory(load, side === 'customer' ? 'CustomerCharge' : 'CarrierCharge', 'Updated',
          [{ field: field.charAt(0).toUpperCase() + field.slice(1), from: String(from), to: String(ch[field]) }]);
        render();
      });
    });
    body.querySelectorAll('[data-cur]').forEach(el => el.addEventListener('click', () => {
      const ch = load.rate[el.dataset.cur];
      ch.currency = ch.currency === 'CAD' ? 'USD' : 'CAD';
      S.save(); render();
    }));
    body.querySelectorAll('[data-tax]').forEach(el => el.addEventListener('click', () => {
      const ch = load.rate[el.dataset.tax];
      ch.applyTaxes = !ch.applyTaxes;
      S.save(); render();
    }));
    body.querySelectorAll('[data-accadd]').forEach(el => el.addEventListener('click', () => {
      const ch = load.rate[el.dataset.accadd];
      openModal(`
        <h3>Accessorial Charges</h3>
        <div id="accRows">
          ${ch.accessorials.map((a, i) => `
            <div class="form-grid" style="margin-bottom:10px">
              <div class="field"><label>Charge</label><input data-an="${i}" value="${esc(a.name)}"></div>
              <div class="field"><label>Amount</label><input data-aa="${i}" type="number" value="${esc(a.amount)}"></div>
            </div>`).join('')}
        </div>
        <button class="link-btn" id="mAddRow">+ Add accessorial</button>
        <div class="modal-actions">
          <button class="btn btn-ghost" id="mCancel">Cancel</button>
          <button class="btn btn-primary" id="mOk">Apply</button>
        </div>`, m => {
        m.querySelector('#mCancel').addEventListener('click', closeModal);
        m.querySelector('#mAddRow').addEventListener('click', () => {
          const idx = m.querySelectorAll('[data-an]').length;
          m.querySelector('#accRows').insertAdjacentHTML('beforeend', `
            <div class="form-grid" style="margin-bottom:10px">
              <div class="field"><label>Charge</label><input data-an="${idx}" placeholder="e.g. Tailgate"></div>
              <div class="field"><label>Amount</label><input data-aa="${idx}" type="number" value="0"></div>
            </div>`);
        });
        m.querySelector('#mOk').addEventListener('click', () => {
          const names = Array.from(m.querySelectorAll('[data-an]'));
          const amounts = Array.from(m.querySelectorAll('[data-aa]'));
          ch.accessorials = names.map((n, i) => ({ name: n.value.trim(), amount: Number(amounts[i].value) || 0 }))
            .filter(a => a.name);
          S.save(); closeModal(); render();
        });
      });
    }));
    body.querySelector('#btnRateIndex').addEventListener('click', () => toast('RateIndex integration coming in a later phase'));
  }

  /* ============ NOTES & HISTORY TAB ============ */
  function renderNotesTab(body, load) {
    const hs = state.historySearch.toLowerCase();
    let hist = load.history.filter(h => !hs ||
      JSON.stringify(h).toLowerCase().includes(hs));
    const totalPages = Math.max(1, Math.ceil(hist.length / state.historyShow));
    if (state.historyPage > totalPages) state.historyPage = totalPages;
    const pageHist = hist.slice((state.historyPage - 1) * state.historyShow, state.historyPage * state.historyShow);

    body.innerHTML = `
      <div class="panel">
        <div class="panel-title">Notes <button class="btn btn-primary btn-sm" id="btnAddNote">${ic('plus', 14)} Add Note</button></div>
        ${load.notes.length ? `
        <table class="plain">
          <thead><tr><th>Date</th><th>User</th><th>Note Type</th><th>Alert (Date &amp; Time)</th><th>Notes</th><th>Actions</th></tr></thead>
          <tbody>
            ${load.notes.map((n, i) => `
              <tr>
                <td>${fmtDT(n.date)}</td><td>${esc(n.user)}</td><td>${esc(n.type)}</td>
                <td>${n.alert ? fmtDT(n.alert) : ''}</td><td style="white-space:pre-wrap">${esc(n.text)}</td>
                <td><button class="row-btn" data-delnote="${i}" style="border:none;background:none;color:var(--red)">${ic('trash', 14)}</button></td>
              </tr>`).join('')}
          </tbody>
        </table>` : `
        <table class="plain">
          <thead><tr><th>Date ⇅</th><th>User ⇅</th><th>Note Type ⇅</th><th>Alert (Date &amp; Time) ⇅</th><th>Notes ⇅</th><th>Actions ⇅</th></tr></thead>
        </table>
        <div class="notes-empty">No Notes to show</div>`}
        <div class="table-footer"><span>${load.notes.length ? 1 : 0} to ${load.notes.length} of ${load.notes.length}</span></div>
      </div>

      <div class="panel">
        <div class="panel-title">History</div>
        <div class="filters-row">
          <label>Show</label>
          <select class="control" id="hShow">${[5, 10, 25].map(n => `<option ${state.historyShow === n ? 'selected' : ''}>${n}</option>`).join('')}</select>
          <span class="search-wrap"><input class="control" id="hSearch" placeholder="Search" value="${esc(state.historySearch)}"></span>
        </div>
        <div class="table-scroll" style="border:1px solid var(--line)">
        <table class="plain" style="min-width:900px">
          <thead>
            <tr><th>Date ⇅</th><th>User ⇅</th><th>Entity ⇅</th><th>Action ⇅</th><th>Field ⇅</th><th>From ⇅</th><th>To ⇅</th></tr>
          </thead>
          <tbody>
            ${pageHist.map((h, hi) => h.changes.map((c, ci) => `
              <tr class="${hi % 2 ? 'alt' : ''} ${ci > 0 ? 'subfield-row' : ''}">
                <td>${ci === 0 ? fmtDT(h.date) : ''}</td>
                <td>${ci === 0 ? esc(h.user) : ''}</td>
                <td>${ci === 0 ? esc(h.entity) : ''}</td>
                <td>${ci === 0 ? esc(h.action) : ''}</td>
                <td>${esc(c.field)}</td><td>${esc(c.from)}</td><td>${esc(c.to)}</td>
              </tr>`).join('')).join('')}
          </tbody>
        </table>
        </div>
        <div class="table-footer">
          <span>${hist.length ? (state.historyPage - 1) * state.historyShow + 1 : 0} to ${Math.min(state.historyPage * state.historyShow, hist.length)} of ${hist.length}</span>
          <div class="pager">
            <button ${state.historyPage <= 1 ? 'disabled' : ''} data-hpage="1">«</button>
            <button ${state.historyPage <= 1 ? 'disabled' : ''} data-hpage="${state.historyPage - 1}">‹</button>
            <span class="page-info">Page <strong>${state.historyPage}</strong> of <strong>${totalPages}</strong></span>
            <button ${state.historyPage >= totalPages ? 'disabled' : ''} data-hpage="${state.historyPage + 1}">›</button>
            <button ${state.historyPage >= totalPages ? 'disabled' : ''} data-hpage="${totalPages}">»</button>
          </div>
        </div>
      </div>`;

    body.querySelector('#btnAddNote').addEventListener('click', () => {
      openModal(`
        <h3>Add Note</h3>
        <div class="field"><label>Note Type</label>
          <select id="mType">${['General', 'Dispatch', 'Billing', 'Alert'].map(t => `<option>${t}</option>`).join('')}</select>
        </div>
        <div class="field" style="margin-top:12px"><label>Alert (optional)</label><input type="datetime-local" id="mAlert"></div>
        <div class="field" style="margin-top:12px"><label>Note</label><textarea id="mText" rows="4"></textarea></div>
        <div class="modal-actions">
          <button class="btn btn-ghost" id="mCancel">Cancel</button>
          <button class="btn btn-primary" id="mOk">Add Note</button>
        </div>`, m => {
        m.querySelector('#mCancel').addEventListener('click', closeModal);
        m.querySelector('#mOk').addEventListener('click', () => {
          const text = m.querySelector('#mText').value.trim();
          if (!text) return;
          load.notes.unshift({
            date: new Date().toISOString(), user: S.currentUser,
            type: m.querySelector('#mType').value,
            alert: localInputToIso(m.querySelector('#mAlert').value), text,
          });
          S.addHistory(load, 'Note', 'Added', [{ field: 'Note', from: '', to: text.slice(0, 60) }]);
          closeModal(); render();
        });
      });
    });
    body.querySelectorAll('[data-delnote]').forEach(el => el.addEventListener('click', () => {
      load.notes.splice(Number(el.dataset.delnote), 1);
      S.save(); render();
    }));
    body.querySelector('#hShow').addEventListener('change', e => { state.historyShow = Number(e.target.value); state.historyPage = 1; render(); });
    body.querySelector('#hSearch').addEventListener('input', e => {
      state.historySearch = e.target.value; state.historyPage = 1;
      const pos = e.target.selectionStart;
      render();
      const el2 = document.querySelector('#hSearch');
      if (el2) { el2.focus(); try { el2.setSelectionRange(pos, pos); } catch (err) {} }
    });
    body.querySelectorAll('[data-hpage]').forEach(btn => btn.addEventListener('click', () => {
      state.historyPage = Number(btn.dataset.hpage); render();
    }));
  }

  /* ============================================================
     GENERIC LIST PAGE (directories, alerts, invoices)
     ============================================================ */
  function dirState(key) {
    if (!state.dirs) state.dirs = {};
    if (!state.dirs[key]) state.dirs[key] = { show: 15, page: 1, search: '', active: 'Active', colFilters: {}, sortCol: null, sortDir: 'asc' };
    return state.dirs[key];
  }

  function renderListPage(content, cfg) {
    const ds = dirState(cfg.key);
    let rows = cfg.rows();
    if (ds.search) {
      const q = ds.search.toLowerCase();
      rows = rows.filter(r => cfg.columns.some(c => String(c.get(r)).toLowerCase().includes(q)));
    }
    if (cfg.activeFilter && ds.active !== 'All') {
      rows = rows.filter(r => (r.active !== false ? 'Active' : 'Inactive') === ds.active);
    }
    Object.entries(ds.colFilters).forEach(([key, val]) => {
      if (!val) return;
      const col = cfg.columns.find(c => c.key === key);
      if (col) rows = rows.filter(r => String(col.get(r)).toLowerCase().includes(val.toLowerCase()));
    });
    if (ds.sortCol) {
      const col = cfg.columns.find(c => c.key === ds.sortCol);
      if (col) rows.sort((a, z) => (ds.sortDir === 'asc' ? 1 : -1) *
        String(col.get(a)).localeCompare(String(col.get(z)), undefined, { numeric: true }));
    }
    const totalPages = Math.max(1, Math.ceil(rows.length / ds.show));
    if (ds.page > totalPages) ds.page = totalPages;
    const pageRows = rows.slice((ds.page - 1) * ds.show, ds.page * ds.show);

    content.innerHTML = `
      <div class="page-card">
        <div class="breadcrumb"><a href="#/${cfg.route}">${esc(cfg.breadcrumb)}</a> &nbsp;/&nbsp; ${esc(cfg.breadcrumb)}</div>
        <div class="page-title-row">
          <div class="page-title">${esc(cfg.title)}</div>
          ${cfg.addBtn ? `<button class="btn btn-primary" id="lpAdd">${ic('plus')} ${esc(cfg.addBtn)}</button>` : ''}
          ${cfg.refreshBtn ? `<button class="btn btn-primary" id="lpRefresh">Refresh</button>` : ''}
        </div>
        <div class="filters-row">
          <label>Show</label>
          <select class="control" id="lpShow">${[15, 25, 50, 100].map(n => `<option ${ds.show === n ? 'selected' : ''}>${n}</option>`).join('')}</select>
          <span class="search-wrap"><input class="control" id="lpSearch" placeholder="Search" value="${esc(ds.search)}"></span>
          ${cfg.activeFilter ? `
          <label>Show</label>
          <select class="control" id="lpActive">${['Active', 'Inactive', 'All'].map(s => `<option ${ds.active === s ? 'selected' : ''}>${s}</option>`).join('')}</select>` : ''}
        </div>
        <div class="table-scroll">
          <table class="grid" style="min-width:${cfg.minWidth || 1100}px">
            <thead>
              <tr>${cfg.columns.map(c => `
                <th>${esc(c.label)} <button class="sort-btn" data-lpsort="${c.key}">${ds.sortCol === c.key ? (ds.sortDir === 'asc' ? '▲' : '▼') : '⇅'}</button></th>`).join('')}
              </tr>
              <tr class="filter-row">${cfg.columns.map(c => `
                <th>${c.noFilter ? '' : `<input placeholder="Search" data-lpfilter="${c.key}" value="${esc(ds.colFilters[c.key] || '')}">`}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${pageRows.map((r, ri) => `
                <tr class="${cfg.rowClass ? cfg.rowClass(r) : ''}" data-lprow="${ri}">
                  ${cfg.columns.map(c => `<td>${c.render ? c.render(r, ri) : esc(c.get(r))}</td>`).join('')}
                </tr>`).join('')}
              ${pageRows.length === 0 ? `<tr><td colspan="${cfg.columns.length}" style="text-align:center;padding:40px;color:var(--ink-soft)">Nothing matches the current filters</td></tr>` : ''}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <span>${rows.length ? (ds.page - 1) * ds.show + 1 : 0} to ${Math.min(ds.page * ds.show, rows.length)} of ${rows.length.toLocaleString()}</span>
          <div class="pager">
            <button ${ds.page <= 1 ? 'disabled' : ''} data-lppage="1">«</button>
            <button ${ds.page <= 1 ? 'disabled' : ''} data-lppage="${ds.page - 1}">‹</button>
            <span class="page-info">Page <strong>${ds.page}</strong> of <strong>${totalPages}</strong></span>
            <button ${ds.page >= totalPages ? 'disabled' : ''} data-lppage="${ds.page + 1}">›</button>
            <button ${ds.page >= totalPages ? 'disabled' : ''} data-lppage="${totalPages}">»</button>
          </div>
        </div>
      </div>`;

    if (cfg.addBtn) content.querySelector('#lpAdd').addEventListener('click', cfg.onAdd);
    if (cfg.refreshBtn) content.querySelector('#lpRefresh').addEventListener('click', () => { render(); toast('Refreshed', 'success'); });
    content.querySelector('#lpShow').addEventListener('change', e => { ds.show = Number(e.target.value); ds.page = 1; render(); });
    content.querySelector('#lpSearch').addEventListener('input', e => { ds.search = e.target.value; ds.page = 1; rerenderKeepFocus('#lpSearch'); });
    if (cfg.activeFilter) content.querySelector('#lpActive').addEventListener('change', e => { ds.active = e.target.value; ds.page = 1; render(); });
    content.querySelectorAll('[data-lpsort]').forEach(el => el.addEventListener('click', () => {
      if (ds.sortCol === el.dataset.lpsort) ds.sortDir = ds.sortDir === 'asc' ? 'desc' : 'asc';
      else { ds.sortCol = el.dataset.lpsort; ds.sortDir = 'asc'; }
      render();
    }));
    content.querySelectorAll('[data-lpfilter]').forEach(el => el.addEventListener('input', () => {
      ds.colFilters[el.dataset.lpfilter] = el.value; ds.page = 1;
      rerenderKeepFocus(`[data-lpfilter="${el.dataset.lpfilter}"]`);
    }));
    content.querySelectorAll('.pager button').forEach(btn => btn.addEventListener('click', () => {
      ds.page = Number(btn.dataset.lppage); render();
    }));
    if (cfg.onOpen) content.querySelectorAll('[data-lpopen]').forEach(el => el.addEventListener('click', e => {
      e.stopPropagation();
      cfg.onOpen(pageRows[Number(el.dataset.lpopen)]);
    }));
    if (cfg.wire) cfg.wire(content, pageRows);

    function rerenderKeepFocus(sel) {
      const el = content.querySelector(sel);
      const pos = el ? el.selectionStart : 0;
      render();
      const el2 = document.querySelector(sel);
      if (el2) { el2.focus(); try { el2.setSelectionRange(pos, pos); } catch (e) {} }
    }
  }

  function activePill(r) {
    return `<span class="pill ${r.active !== false ? 'pill-active' : 'pill-cancelled'}">${r.active !== false ? 'Active' : 'Inactive'}</span>`;
  }

  /* ---------------- generic add/edit form modal ---------------- */
  function entityModal(title, fields, obj, onSave) {
    openModal(`
      <h3>${esc(title)}</h3>
      <div class="form-grid">
        ${fields.map(f => `
          <div class="field ${f.span2 ? 'field-span2' : ''}">
            ${f.type === 'checkbox' ? `
              <label style="display:flex;align-items:center;gap:8px;margin-top:20px;color:var(--ink-soft)">
                <input type="checkbox" data-ef="${f.key}" ${obj[f.key] ? 'checked' : ''}> ${esc(f.label)}
              </label>` : `
              <label>${esc(f.label)}${f.required ? ' *' : ''}</label>
              ${f.type === 'select' ? `
                <select data-ef="${f.key}">${f.options.map(o => `<option ${obj[f.key] === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>` : `
                <input type="${f.type === 'number' ? 'number' : 'text'}" data-ef="${f.key}" value="${esc(obj[f.key] == null ? '' : obj[f.key])}" ${f.readonly ? 'readonly' : ''}>`}`}
          </div>`).join('')}
      </div>
      <div class="form-error" id="efError" style="display:none"></div>
      <div class="modal-actions">
        <button class="btn btn-outline" id="mCancel">Cancel</button>
        <button class="btn btn-primary" id="mOk">Save</button>
      </div>`, m => {
      m.querySelector('#mCancel').addEventListener('click', closeModal);
      m.querySelector('#mOk').addEventListener('click', () => {
        const values = {};
        const errors = [];
        fields.forEach(f => {
          const el = m.querySelector(`[data-ef="${f.key}"]`);
          el.classList.remove('invalid');
          let v = f.type === 'checkbox' ? el.checked : el.value;
          if (f.type === 'number') v = Number(v) || 0;
          if (f.required && !String(v).trim()) { errors.push(`${f.label} is required`); el.classList.add('invalid'); }
          values[f.key] = v;
        });
        const err = m.querySelector('#efError');
        if (errors.length) { err.style.display = 'block'; err.textContent = errors.join('. ') + '.'; return; }
        onSave(values);
        closeModal();
      });
    });
  }

  /* ============ CUSTOMERS & SITES ============ */
  function loadsRunFor(matchFn) {
    return S.getLoads().filter(matchFn).length;
  }
  const CUSTOMER_FIELDS = [
    { key: 'name', label: 'Site Name', required: true, span2: true },
    { key: 'contact', label: 'Contact' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'ext', label: 'Ext' },
    { key: 'address1', label: 'Address', span2: true },
    { key: 'address2', label: 'Address 2', span2: true },
    { key: 'city', label: 'City' },
    { key: 'prov', label: 'Province / State' },
    { key: 'postal', label: 'Postal / Zip' },
    { key: 'terms', label: 'Payment Terms', type: 'select', options: ['Net 15', 'Net 30', 'Net 45', 'Net 60', 'COD'] },
    { key: 'active', label: 'Active', type: 'checkbox' },
  ];
  function renderCustomers(content) {
    renderListPage(content, {
      key: 'customers', route: 'customers',
      title: 'Customers & Sites', breadcrumb: 'All Customer Sites',
      addBtn: 'Add Customer & Site', activeFilter: true, minWidth: 1200,
      rows: () => S.db().customers,
      columns: [
        { key: 'name', label: 'Site Name', get: r => (r.id && r.id.startsWith('01-') ? r.id + ' ' + r.name : r.name),
          render: (r, ri) => `<span class="cell-link" data-lpopen="${ri}">${esc(r.id && r.id.startsWith('01-') ? r.id + ' ' + r.name : r.name)}</span>` },
        { key: 'loadsRun', label: 'Loads Run', get: r => loadsRunFor(l => l.customer.name === r.name) },
        { key: 'active', label: 'Active', get: r => r.active !== false ? 'Active' : 'Inactive', render: activePill },
        { key: 'homeCity', label: 'Home City', get: r => r.city ? `${r.city}, ${r.prov}` : '' },
        { key: 'contact', label: 'Contact', get: r => r.contact },
        { key: 'email', label: 'Email', get: r => r.email || '' },
        { key: 'phone', label: 'Phone', get: r => r.phone },
        { key: 'ext', label: 'Ext', get: r => r.ext || '' },
      ],
      onAdd: () => entityModal('Add Customer & Site', CUSTOMER_FIELDS, { terms: 'Net 30', active: true }, v => {
        const d = S.db();
        v.id = 'CU-' + String(d.customers.length + 1).padStart(4, '0');
        d.customers.push(v); S.save();
        toast(`Customer ${v.name} added`, 'success'); render();
      }),
      onOpen: row => entityModal('Edit Customer & Site', CUSTOMER_FIELDS, row, v => {
        Object.assign(row, v); S.save();
        toast(`${row.name} updated`, 'success'); render();
      }),
    });
  }

  /* ============ CARRIERS ============ */
  const CARRIER_FIELDS = [
    { key: 'name', label: 'Carrier Name', required: true, span2: true },
    { key: 'contact', label: 'Contact' },
    { key: 'phone', label: 'Phone' },
    { key: 'ext', label: 'Ext' },
    { key: 'city', label: 'Home City' },
    { key: 'prov', label: 'Province / State' },
    { key: 'terms', label: 'Payment Terms', type: 'select', options: ['Net 15', 'Net 30', 'Net 45', 'Net 60', 'Quick Pay'] },
    { key: 'vans', label: 'Vans', type: 'number' },
    { key: 'reefers', label: 'Reefers', type: 'number' },
    { key: 'flatbeds', label: 'Flat Beds', type: 'number' },
    { key: 'preferred', label: 'Preferred Carrier', type: 'checkbox' },
    { key: 'active', label: 'Active', type: 'checkbox' },
  ];
  function renderCarriers(content) {
    renderListPage(content, {
      key: 'carriers', route: 'carriers',
      title: 'Carriers', breadcrumb: 'All Carriers',
      addBtn: 'Add Carrier', activeFilter: true, minWidth: 1350,
      rows: () => S.db().carriers,
      columns: [
        { key: 'name', label: 'Carrier Name', get: r => r.name,
          render: (r, ri) => `<span class="cell-link" data-lpopen="${ri}">${esc(r.name)}</span>` },
        { key: 'loadsRun', label: 'Loads Run', get: r => loadsRunFor(l => l.carrier && l.carrier.name === r.name) },
        { key: 'active', label: 'Active', get: r => r.active !== false ? 'Active' : 'Inactive', render: activePill },
        { key: 'preferred', label: 'Preferred Carrier', get: r => r.preferred ? 'Yes' : 'No',
          render: r => `<span class="pill ${r.preferred ? 'pill-yes' : ''}">${r.preferred ? 'Yes' : 'No'}</span>` },
        { key: 'homeCity', label: 'Home City', get: r => r.city ? `${r.city}, ${r.prov}` : '' },
        { key: 'contact', label: 'Contact', get: r => r.contact },
        { key: 'phone', label: 'Phone', get: r => r.phone },
        { key: 'ext', label: 'Ext', get: r => r.ext || '' },
        { key: 'vans', label: 'Vans', get: r => r.vans || 0 },
        { key: 'reefers', label: 'Reefers', get: r => r.reefers || 0 },
        { key: 'flatbeds', label: 'Flat Beds', get: r => r.flatbeds || 0 },
      ],
      onAdd: () => entityModal('Add Carrier', CARRIER_FIELDS, { terms: 'Net 30', active: true, vans: 0, reefers: 0, flatbeds: 0 }, v => {
        const d = S.db();
        v.id = '000' + (900 + d.carriers.length);
        d.carriers.push(v); S.save();
        toast(`Carrier ${v.name} added`, 'success'); render();
      }),
      onOpen: row => entityModal('Edit Carrier', CARRIER_FIELDS, row, v => {
        Object.assign(row, v); S.save();
        toast(`${row.name} updated`, 'success'); render();
      }),
    });
  }

  /* ============ CUSTOMS BROKERS ============ */
  const BROKER_FIELDS = [
    { key: 'name', label: 'Customs Broker Name', required: true, span2: true },
    { key: 'contact', label: 'Contact' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'ext', label: 'Ext' },
    { key: 'city', label: 'Home City' },
    { key: 'prov', label: 'Province / State' },
    { key: 'active', label: 'Active', type: 'checkbox' },
  ];
  function renderBrokers(content) {
    renderListPage(content, {
      key: 'brokers', route: 'brokers',
      title: 'Customs Brokers', breadcrumb: 'All Customs Brokers',
      addBtn: 'Add Customs Broker', activeFilter: true, minWidth: 1150,
      rows: () => S.db().brokers,
      columns: [
        { key: 'name', label: 'Customs Broker Name', get: r => r.name,
          render: (r, ri) => `<span class="cell-link" data-lpopen="${ri}">${esc(r.name)}</span>` },
        { key: 'loadsRun', label: 'Loads Run', get: r => (r.loadsRun || 0) + loadsRunFor(l => l.customsBroker === r.name) },
        { key: 'active', label: 'Active', get: r => r.active !== false ? 'Active' : 'Inactive', render: activePill },
        { key: 'homeCity', label: 'Home City', get: r => r.city ? `${r.city}, ${r.prov}` : '' },
        { key: 'contact', label: 'Contact', get: r => r.contact },
        { key: 'email', label: 'Email', get: r => r.email || '' },
        { key: 'phone', label: 'Phone', get: r => r.phone },
        { key: 'ext', label: 'Ext', get: r => r.ext || '' },
      ],
      onAdd: () => entityModal('Add Customs Broker', BROKER_FIELDS, { contact: 'CustomsClearance', active: true }, v => {
        v.loadsRun = 0;
        S.db().brokers.push(v); S.save();
        toast(`Customs broker ${v.name} added`, 'success'); render();
      }),
      onOpen: row => entityModal('Edit Customs Broker', BROKER_FIELDS, row, v => {
        Object.assign(row, v); S.save();
        toast(`${row.name} updated`, 'success'); render();
      }),
    });
  }

  /* ============ ALERTS ============ */
  function renderAlerts(content) {
    renderListPage(content, {
      key: 'alerts', route: 'alerts',
      title: 'Alerts', breadcrumb: 'Alerts',
      activeFilter: false, minWidth: 1250,
      rows: () => S.db().alerts,
      rowClass: () => 'hot',
      columns: [
        { key: 'module', label: 'Module', get: r => r.module,
          render: r => `<a class="cell-link" href="#/load/${esc(r.refId)}">${esc(r.module)}</a>` },
        { key: 'refId', label: 'ID', get: r => r.refId },
        { key: 'company', label: 'Company Name', get: r => r.company },
        { key: 'date', label: 'Alert (Date & Time)', get: r => fmtDT(r.date) },
        { key: 'user', label: 'User', get: r => r.user },
        { key: 'noteType', label: 'Note Type', get: r => r.noteType },
        { key: 'privacy', label: 'Privacy', get: r => r.privacy },
        { key: 'note', label: 'Notes', get: r => r.note },
      ],
    });
  }

  /* ============ QUICKBOOKS SETUP ============ */
  function renderQuickBooks(content) {
    const qb = S.db().quickbooks;
    const company = S.db().company;
    const mapField = (key, label) => `
      <div class="qb-row">
        <label>${esc(label)}:</label>
        <input class="control" data-qbmap="${key}" value="${esc(qb.mappings[key] || '')}" placeholder="">
      </div>`;
    const taxField = (key, label) => `
      <div class="qb-row">
        <label>${esc(label)}:</label>
        <input class="control" data-qbtax="${key}" value="${esc(qb.taxes[key] || '')}" placeholder="">
      </div>`;
    content.innerHTML = `
      <div class="page-card">
        <div class="breadcrumb"><a href="#/quickbooks">QuickBooks Setup</a></div>
        <h3 style="margin-bottom:14px">Your Company</h3>
        <div class="field" style="max-width:520px"><label>Company</label>
          <input readonly value="${esc(company.name)}">
        </div>
        <div class="two-col" style="margin-top:26px">
          <div>
            <h3 style="margin-bottom:4px">QuickBooks Setup</h3>
            <div class="qb-col-head">QuickBooks Products &amp; Services</div>
            ${mapField('freight', 'Freight Charge')}
            ${mapField('fuel', 'Fuel Charge')}
            ${mapField('accessorial', 'Accessorial')}
            <div class="qb-pair">
              ${mapField('liftgate', 'Liftgate')}
              ${mapField('detention', 'Detention')}
              ${mapField('lumper', 'Lumper')}
              ${mapField('loadUnload', 'Load/Unload')}
              ${mapField('tarp', 'Tarp')}
              ${mapField('hazmat', 'Hazmat')}
              ${mapField('expedited', 'Expedited')}
              ${mapField('redelivery', 'Redelivery')}
              ${mapField('layover', 'Layover')}
              ${mapField('other', 'Other')}
              ${mapField('oversized', 'Oversized')}
            </div>
          </div>
          <div>
            <h3 style="margin-bottom:4px">Taxes Setup</h3>
            <div class="qb-col-head">QuickBooks Tax Type/Rate</div>
            ${taxField('gst', 'GST - Canada (5%)')}
            <div class="qb-pair">
              ${taxField('hstOn', 'HST - ON (13%)')}
              ${taxField('gstPstBc', 'GST/PST - BC (5% 7%)')}
              ${taxField('hstNb', 'HST - NB (15%)')}
              ${taxField('gstPstSk', 'GST/PST - SK (5% 6%)')}
              ${taxField('hstNs', 'HST - NS (14%)')}
              ${taxField('gstPstMb', 'GST/PST - MB (5% 7%)')}
              ${taxField('hstPe', 'HST - PE (15%)')}
              ${taxField('gstQstQc', 'GST/QST - QC (5% 9.975%)')}
              ${taxField('hstNl', 'HST - NL (15%)')}
            </div>
          </div>
        </div>
        <div class="qb-status-row">
          <span>Status: <span class="pill ${qb.connected ? 'pill-active' : 'pill-cancelled'}">${qb.connected ? 'Connected' : 'Disconnected'}</span></span>
          <span style="flex:1"></span>
          <button class="btn btn-outline" id="qbSettings">Settings</button>
          <button class="btn btn-outline" id="qbToggle">${qb.connected ? 'Disconnect QuickBooks' : 'Connect QuickBooks'}</button>
        </div>
      </div>`;
    content.querySelectorAll('[data-qbmap]').forEach(el => el.addEventListener('change', () => {
      qb.mappings[el.dataset.qbmap] = el.value; S.save();
    }));
    content.querySelectorAll('[data-qbtax]').forEach(el => el.addEventListener('change', () => {
      qb.taxes[el.dataset.qbtax] = el.value; S.save();
    }));
    content.querySelector('#qbSettings').addEventListener('click', () => toast('QuickBooks connection settings (stub — live integration comes later)'));
    content.querySelector('#qbToggle').addEventListener('click', () => {
      qb.connected = !qb.connected; S.save();
      toast(qb.connected ? 'QuickBooks connected' : 'QuickBooks disconnected', 'success');
      render();
    });
  }

  /* ============ INVOICES ============ */
  function invoiceRow(inv) {
    const load = S.getLoad(inv.loadNumber);
    if (!load) return null;
    return {
      inv, load,
      loadNumber: inv.loadNumber,
      customer: load.customer.name,
      qbCustomer: load.customer.name,
      qbInvoiceNo: inv.qbInvoiceNo,
      invoiceNo: inv.invoiceNo,
      ref: load.customerReference,
      origin: stopCity(load, 'Pickup'),
      destination: stopCity(load, 'Delivery'),
      deliveryDate: firstStop(load, 'Delivery') ? firstStop(load, 'Delivery').appointment : '',
      dueDate: S.invoiceDueDate(inv),
      currency: load.rate.customer.currency,
      amount: S.loadCustomerTotal(load),
    };
  }
  function renderInvoices(content) {
    S.syncInvoices();
    renderListPage(content, {
      key: 'invoices', route: 'invoices',
      title: 'Invoices', breadcrumb: 'All Invoices',
      refreshBtn: true, activeFilter: false, minWidth: 1500,
      rows: () => S.db().invoices.map(invoiceRow).filter(Boolean),
      columns: [
        { key: 'submit', label: 'Submitted', noFilter: true, get: r => r.inv.submitted ? 'Yes' : 'No',
          render: (r, ri) => r.inv.submitted
            ? `<span class="pill pill-yes">Submitted</span>`
            : `<button class="btn btn-outline btn-sm" data-invsubmit="${ri}">Submit</button>` },
        { key: 'qbStatus', label: 'QB Status', get: r => r.inv.qbStatus,
          render: r => `<span class="pill ${r.inv.submitted ? 'pill-active' : ''}">${esc(r.inv.qbStatus)}</span>` },
        { key: 'loadNumber', label: 'Load Number', get: r => r.loadNumber,
          render: r => `<a class="cell-link" href="#/load/${esc(r.loadNumber)}">${esc(r.loadNumber)}</a>` },
        { key: 'customer', label: 'Dispatch Customer', get: r => r.customer },
        { key: 'qbCustomer', label: 'QB Customer', get: r => r.qbCustomer },
        { key: 'qbInvoiceNo', label: 'QB Invoice #', get: r => r.qbInvoiceNo },
        { key: 'invoiceNo', label: 'Invoice Number', get: r => r.invoiceNo },
        { key: 'ref', label: 'Customer Ref', get: r => r.ref },
        { key: 'origin', label: 'Origin', get: r => r.origin },
        { key: 'destination', label: 'Destination', get: r => r.destination },
        { key: 'deliveryDate', label: 'Delivery Date', get: r => fmtD(r.deliveryDate) },
        { key: 'dueDate', label: 'Due Date', get: r => fmtD(r.dueDate) },
        { key: 'currency', label: 'Currency', get: r => r.currency },
        { key: 'amount', label: 'Amount', get: r => '$' + money(r.amount) },
      ],
      wire: (c, pageRows) => {
        c.querySelectorAll('[data-invsubmit]').forEach(el => el.addEventListener('click', e => {
          e.stopPropagation();
          const row = pageRows[Number(el.dataset.invsubmit)];
          row.inv.submitted = true;
          row.inv.qbStatus = 'Submitted';
          row.inv.qbInvoiceNo = row.inv.invoiceNo;
          S.save();
          S.addHistory(row.load, 'Invoice', 'Submitted', [{ field: 'QuickBooks', from: 'Not Submitted', to: 'Submitted' }]);
          toast(`Invoice ${row.inv.invoiceNo} submitted to QuickBooks (stub)`, 'success');
          render();
        }));
      },
    });
  }

  /* ============ CUSTOMER RECEIPTS ============ */
  function renderReceipts(content) {
    S.syncInvoices();
    if (!state.receiptsTab) state.receiptsTab = 'due';
    const invoices = S.db().invoices.map(invoiceRow).filter(Boolean);
    const due = invoices.filter(r => S.invoiceBalance(r.inv) > 0);
    const allReceipts = invoices.flatMap(r => r.inv.receipts.map((rec, i) => ({ row: r, rec, idx: i })));

    content.innerHTML = `
      <div class="page-card">
        <div class="breadcrumb"><a href="#/receipts">All Customer Receipts</a></div>
        <div class="page-title-row">
          <div class="page-title">Customer Receipts</div>
          <button class="btn btn-primary" id="rcAdd">${ic('plus')} Add Receipt</button>
        </div>
        <div class="tabs" style="margin-top:0">
          <button class="tab ${state.receiptsTab === 'due' ? 'active' : ''}" data-rctab="due">Balances Due</button>
          <button class="tab ${state.receiptsTab === 'open' ? 'active' : ''}" data-rctab="open">Open Receipts</button>
        </div>
        ${state.receiptsTab === 'due' ? `
        <div class="table-scroll">
          <table class="grid" style="min-width:1200px">
            <thead><tr>
              <th>Load No</th><th>Customer</th><th>Invoice No</th><th>Due Date</th><th>Pickup</th><th>Delivery</th>
              <th>Invoice Amount</th><th>Balance Due</th><th>Currency</th><th>Add Receipt</th>
            </tr></thead>
            <tbody>
              ${due.map((r, ri) => `
                <tr>
                  <td><a class="cell-link" href="#/load/${esc(r.loadNumber)}">${esc(r.loadNumber)}</a></td>
                  <td>${esc(r.customer)}</td>
                  <td>${esc(r.invoiceNo)}</td>
                  <td>${fmtD(r.dueDate)}</td>
                  <td>${esc(r.origin)}</td>
                  <td>${esc(r.destination)}</td>
                  <td>$${money(r.amount)}</td>
                  <td><strong>$${money(S.invoiceBalance(r.inv))}</strong></td>
                  <td>${esc(r.currency)}</td>
                  <td><button class="btn btn-outline btn-sm" data-rcaddrow="${ri}">${ic('plus', 13)} Add</button></td>
                </tr>`).join('')}
              ${due.length === 0 ? `<tr><td colspan="10" style="text-align:center;padding:40px;color:var(--ink-soft)">No outstanding balances</td></tr>` : ''}
            </tbody>
          </table>
        </div>` : `
        <div class="table-scroll">
          <table class="grid" style="min-width:1100px">
            <thead><tr>
              <th>Load No</th><th>Customer</th><th>Invoice No</th><th>Receipt Date</th><th>Method</th><th>Reference</th><th>Amount</th><th>Actions</th>
            </tr></thead>
            <tbody>
              ${allReceipts.map((x, xi) => `
                <tr>
                  <td><a class="cell-link" href="#/load/${esc(x.row.loadNumber)}">${esc(x.row.loadNumber)}</a></td>
                  <td>${esc(x.row.customer)}</td>
                  <td>${esc(x.row.invoiceNo)}</td>
                  <td>${fmtD(x.rec.date)}</td>
                  <td>${esc(x.rec.method)}</td>
                  <td>${esc(x.rec.reference || '')}</td>
                  <td>$${money(x.rec.amount)}</td>
                  <td><button class="trash-btn" data-rcdel="${xi}" title="Delete receipt">${ic('trash', 14)}</button></td>
                </tr>`).join('')}
              ${allReceipts.length === 0 ? `<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--ink-soft)">No receipts recorded</td></tr>` : ''}
            </tbody>
          </table>
        </div>`}
      </div>`;

    content.querySelectorAll('[data-rctab]').forEach(el => el.addEventListener('click', () => {
      state.receiptsTab = el.dataset.rctab; render();
    }));
    content.querySelector('#rcAdd').addEventListener('click', () => {
      if (!due.length) { toast('No invoices with a balance due'); return; }
      receiptModal(due, due[0]);
    });
    content.querySelectorAll('[data-rcaddrow]').forEach(el => el.addEventListener('click', () => {
      receiptModal(due, due[Number(el.dataset.rcaddrow)]);
    }));
    content.querySelectorAll('[data-rcdel]').forEach(el => el.addEventListener('click', () => {
      const x = allReceipts[Number(el.dataset.rcdel)];
      x.row.inv.receipts.splice(x.idx, 1);
      if (x.row.load.loadStatus === 'Paid' && S.invoiceBalance(x.row.inv) > 0) {
        x.row.load.loadStatus = 'Invoiced';
      }
      S.save(); toast('Receipt deleted', 'success'); render();
    }));
  }

  function receiptModal(dueRows, preselected) {
    openModal(`
      <h3>Add Receipt</h3>
      <div class="field"><label>Invoice *</label>
        <select id="rcInvoice">${dueRows.map(r => `
          <option value="${esc(r.loadNumber)}" ${r === preselected ? 'selected' : ''}>
            ${esc(r.invoiceNo)} — ${esc(r.customer)} — balance $${money(S.invoiceBalance(r.inv))}
          </option>`).join('')}</select>
      </div>
      <div class="form-grid" style="margin-top:12px">
        <div class="field"><label>Amount *</label><input type="number" id="rcAmount" step="0.01" value="${money(S.invoiceBalance(preselected.inv))}"></div>
        <div class="field"><label>Method</label>
          <select id="rcMethod">${['EFT', 'Cheque', 'Wire', 'Credit Card', 'Cash'].map(m => `<option>${m}</option>`).join('')}</select>
        </div>
        <div class="field field-span2"><label>Reference</label><input id="rcRef" placeholder="e.g. cheque number"></div>
      </div>
      <div class="form-error" id="rcError" style="display:none"></div>
      <div class="modal-actions">
        <button class="btn btn-outline" id="mCancel">Cancel</button>
        <button class="btn btn-primary" id="mOk">Add Receipt</button>
      </div>`, m => {
      const sel = m.querySelector('#rcInvoice');
      sel.addEventListener('change', () => {
        const r = dueRows.find(x => x.loadNumber === sel.value);
        m.querySelector('#rcAmount').value = money(S.invoiceBalance(r.inv));
      });
      m.querySelector('#mCancel').addEventListener('click', closeModal);
      m.querySelector('#mOk').addEventListener('click', () => {
        const r = dueRows.find(x => x.loadNumber === sel.value);
        const amount = Number(m.querySelector('#rcAmount').value);
        const err = m.querySelector('#rcError');
        if (!amount || amount <= 0) { err.style.display = 'block'; err.textContent = 'Amount must be greater than zero.'; return; }
        r.inv.receipts.push({
          date: new Date().toISOString(), amount,
          method: m.querySelector('#rcMethod').value,
          reference: m.querySelector('#rcRef').value.trim(),
        });
        S.addHistory(r.load, 'Receipt', 'Added', [{ field: 'Payment', from: '', to: '$' + money(amount) }]);
        if (S.invoiceBalance(r.inv) <= 0 && r.load.loadStatus !== 'Paid') {
          const from = r.load.loadStatus;
          r.load.loadStatus = 'Paid';
          S.addHistory(r.load, 'Load', 'Updated', [{ field: 'LoadStatus', from, to: 'Paid' }]);
        }
        S.save(); closeModal();
        toast(`Receipt of $${money(amount)} applied to invoice ${r.invoiceNo}`, 'success');
        render();
      });
    });
  }

  /* ============ COMPANY PROFILE ============ */
  function renderCompany(content) {
    const co = S.db().company;
    if (!state.companyTab) state.companyTab = 'primary';
    const t = state.companyTab;
    const field = (obj, key, label, span2) => `
      <div class="field ${span2 ? 'field-span2' : ''}"><label>${esc(label)}</label>
        <input data-co="${key}" value="${esc(obj[key] == null ? '' : obj[key])}">
      </div>`;
    content.innerHTML = `
      <div class="page-card">
        <div class="breadcrumb"><a href="#/company">Company Profile</a></div>
        <div class="page-title">Company Profile</div>
        <div class="tabs">
          <button class="tab ${t === 'primary' ? 'active' : ''}" data-cotab="primary">Primary Info</button>
          <button class="tab ${t === 'accounting' ? 'active' : ''}" data-cotab="accounting">Accounting</button>
          <button class="tab ${t === 'templates' ? 'active' : ''}" data-cotab="templates">Templates &amp; Company Logo</button>
        </div>
        ${t === 'primary' ? `
        <div class="panel">
          <div class="panel-title">Company Information</div>
          <div class="form-grid">
            ${field(co, 'name', 'Company Name')}
            ${field(co, 'legalName', 'Legal Name')}
            ${field(co, 'tagline', 'Tagline', true)}
            ${field(co, 'address1', 'Address', true)}
            ${field(co, 'address2', 'Address 2', true)}
            ${field(co, 'city', 'City')}
            ${field(co, 'prov', 'Province / State')}
            ${field(co, 'postal', 'Postal / Zip')}
            ${field(co, 'country', 'Country')}
            ${field(co, 'phone', 'Phone')}
            ${field(co, 'fax', 'Fax')}
            ${field(co, 'email', 'Email')}
            ${field(co, 'website', 'Website')}
            ${field(co, 'mcNumber', 'MC Number')}
            ${field(co, 'dotNumber', 'DOT Number')}
            ${field(co, 'cvor', 'CVOR Number')}
          </div>
        </div>` : ''}
        ${t === 'accounting' ? `
        <div class="panel">
          <div class="panel-title">Accounting Defaults</div>
          <div class="form-grid">
            <div class="field"><label>GST/HST Number</label><input data-coacc="gstNumber" value="${esc(co.accounting.gstNumber)}"></div>
            <div class="field"><label>Default Currency</label>
              <select data-coacc="currency">${['CAD', 'USD'].map(c => `<option ${co.accounting.currency === c ? 'selected' : ''}>${c}</option>`).join('')}</select>
            </div>
            <div class="field"><label>Default Payment Terms</label>
              <select data-coacc="defaultTerms">${['Net 15', 'Net 30', 'Net 45', 'Net 60', 'COD'].map(c => `<option ${co.accounting.defaultTerms === c ? 'selected' : ''}>${c}</option>`).join('')}</select>
            </div>
            <div class="field"><label>Invoice Prefix</label><input data-coacc="invoicePrefix" value="${esc(co.accounting.invoicePrefix)}"></div>
            <div class="field"><label>Next Invoice Number</label><input type="number" data-coacc="nextInvoiceNumber" value="${esc(co.accounting.nextInvoiceNumber)}"></div>
            <div class="field"><label>Remit-To Email</label><input data-coacc="remitEmail" value="${esc(co.accounting.remitEmail)}"></div>
            <div class="field"><label>Fiscal Year Start</label>
              <select data-coacc="fiscalYearStart">${['January', 'April', 'July', 'October'].map(c => `<option ${co.accounting.fiscalYearStart === c ? 'selected' : ''}>${c}</option>`).join('')}</select>
            </div>
          </div>
        </div>` : ''}
        ${t === 'templates' ? `
        <div class="two-col">
          <div class="panel">
            <div class="panel-title">Document Templates</div>
            <div class="form-grid">
              ${['rateCon:Rate Confirmation', 'invoice:Invoice', 'bol:Bill of Lading'].map(pair => {
                const [key, label] = pair.split(':');
                return `<div class="field"><label>${label} Template</label>
                  <select data-cotpl="${key}">${['Standard', 'Compact', 'Detailed'].map(o => `<option ${co.templates[key] === o ? 'selected' : ''}>${o}</option>`).join('')}</select>
                </div>`;
              }).join('')}
              <div class="field field-span2"><label>Document Footer Text</label>
                <textarea data-cotpl="footerText" rows="3">${esc(co.templates.footerText)}</textarea>
              </div>
            </div>
          </div>
          <div class="panel">
            <div class="panel-title">Company Logo</div>
            <div class="logo-preview">
              <svg width="54" height="54" viewBox="0 0 48 48" aria-hidden="true">
                <circle cx="24" cy="24" r="22" fill="#1c1c1c"/>
                <g fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="10" y="17" width="17" height="12" rx="1"/>
                  <path d="M27 21h6l4 4v4h-10z"/>
                  <circle cx="16" cy="32" r="2.6"/>
                  <circle cx="32" cy="32" r="2.6"/>
                </g>
              </svg>
              <div>
                <div style="color:#1f4fa3;font-weight:800">${esc(co.legalName.toUpperCase())}</div>
                <div style="color:var(--logo-green);font-size:10px;letter-spacing:1px;font-weight:600">${esc(co.tagline)}</div>
              </div>
            </div>
            <button class="btn btn-outline btn-sm" id="coLogoUpload" style="margin-top:16px">${ic('upload', 14)} Upload Logo</button>
            <p style="color:var(--ink-faint);font-size:12.5px;margin-top:10px">Logo appears on generated documents and the application header.</p>
          </div>
        </div>` : ''}
        <div class="action-bar">
          <button class="btn btn-primary" id="coSave">${ic('save')} Save Changes</button>
        </div>
      </div>`;

    content.querySelectorAll('[data-cotab]').forEach(el => el.addEventListener('click', () => {
      state.companyTab = el.dataset.cotab; render();
    }));
    content.querySelectorAll('[data-co]').forEach(el => el.addEventListener('change', () => { co[el.dataset.co] = el.value; S.save(); }));
    content.querySelectorAll('[data-coacc]').forEach(el => el.addEventListener('change', () => {
      co.accounting[el.dataset.coacc] = el.type === 'number' ? Number(el.value) : el.value; S.save();
    }));
    content.querySelectorAll('[data-cotpl]').forEach(el => el.addEventListener('change', () => { co.templates[el.dataset.cotpl] = el.value; S.save(); }));
    const up = content.querySelector('#coLogoUpload');
    if (up) up.addEventListener('click', () => toast('Logo upload (stub — file storage comes later)'));
    content.querySelector('#coSave').addEventListener('click', () => { S.save(); toast('Company profile saved', 'success'); });
  }

  /* ============ REPORTS ============ */
  function renderReports(content) {
    const loads = S.getLoads();
    const statuses = S.LOAD_STATUSES.map(s => ({ s, n: loads.filter(l => l.loadStatus === s).length }));
    const maxN = Math.max(1, ...statuses.map(x => x.n));
    const revenue = loads.reduce((t, l) => t + S.loadCustomerTotal(l), 0);
    const cost = loads.reduce((t, l) => {
      const ch = l.rate.carrier;
      const acc = ch.accessorials.reduce((s, a) => s + (Number(a.amount) || 0), 0);
      const sub = (Number(ch.freight) || 0) + (Number(ch.fuelSurcharge) || 0) + acc - (Number(ch.discount) || 0);
      return t + sub + (ch.applyTaxes ? sub * 0.13 : 0);
    }, 0);
    const byGroup = (getKey) => {
      const map = {};
      loads.forEach(l => {
        const k = getKey(l);
        if (!k) return;
        if (!map[k]) map[k] = { name: k, loads: 0, revenue: 0, cost: 0 };
        map[k].loads += 1;
        map[k].revenue += S.loadCustomerTotal(l);
      });
      return Object.values(map).sort((a, z) => z.loads - a.loads);
    };
    const byCustomer = byGroup(l => l.customer.name);
    const byCarrier = byGroup(l => l.carrier ? l.carrier.name : '');
    content.innerHTML = `
      <div class="page-card">
        <div class="breadcrumb"><a href="#/reports">Reports</a></div>
        <div class="page-title">Reports</div>
        <div class="stat-cards">
          <div class="stat-card"><div class="sc-num">${loads.length}</div><div class="sc-label">Total Loads</div></div>
          <div class="stat-card"><div class="sc-num">${loads.filter(l => !l.cancelled && !l.completed).length}</div><div class="sc-label">Active Loads</div></div>
          <div class="stat-card"><div class="sc-num">$${money(revenue)}</div><div class="sc-label">Customer Revenue</div></div>
          <div class="stat-card"><div class="sc-num">$${money(cost)}</div><div class="sc-label">Carrier Cost</div></div>
          <div class="stat-card"><div class="sc-num">$${money(revenue - cost)}</div><div class="sc-label">Total Margin</div></div>
          <div class="stat-card"><div class="sc-num">${revenue ? ((revenue - cost) / revenue * 100).toFixed(1) : '0.0'}%</div><div class="sc-label">Margin Rate</div></div>
        </div>
        <div class="two-col" style="margin-top:24px">
          <div class="panel">
            <div class="panel-title">Loads by Status</div>
            ${statuses.map(x => `
              <div class="bar-row">
                <span class="bar-label">${esc(x.s)}</span>
                <span class="bar-track"><span class="bar-fill" style="width:${(x.n / maxN * 100).toFixed(0)}%"></span></span>
                <span class="bar-num">${x.n}</span>
              </div>`).join('')}
          </div>
          <div class="panel">
            <div class="panel-title">Loads by Customer</div>
            <table class="plain">
              <thead><tr><th>Customer</th><th>Loads</th><th>Revenue</th></tr></thead>
              <tbody>${byCustomer.map(x => `
                <tr><td>${esc(x.name)}</td><td>${x.loads}</td><td>$${money(x.revenue)}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
        <div class="panel" style="margin-top:20px">
          <div class="panel-title">Loads by Carrier</div>
          <table class="plain">
            <thead><tr><th>Carrier</th><th>Loads</th><th>Customer Revenue on Those Loads</th></tr></thead>
            <tbody>${byCarrier.map(x => `
              <tr><td>${esc(x.name)}</td><td>${x.loads}</td><td>$${money(x.revenue)}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  }

  /* ============ NEW LOAD & PLACEHOLDERS ============ */
  const PLACEHOLDER_PAGES = {};

  function renderPlaceholder(content, page) {
    const [iconName, title] = PLACEHOLDER_PAGES[page] || ['sliders', page];
    const icon = ic(iconName, 44);
    content.innerHTML = `
      <div class="page-card">
        <div class="breadcrumb"><a href="#/dispatch">Dispatch Board</a> &nbsp;/&nbsp; ${esc(title)}</div>
        <div class="placeholder">
          <div class="ph-icon">${icon}</div>
          <h2>${esc(title)}</h2>
          <p>This module is planned for a later phase of the rebuild. The Dispatch Board is fully functional — <a href="#/dispatch">go there now</a>.</p>
        </div>
      </div>`;
  }

  /* ---------------- root render ---------------- */
  function render() {
    renderSidebar();
    const content = document.getElementById('content');
    const r = route();
    if (r.page === 'dispatch') renderBoard(content);
    else if (r.page === 'load' && r.param) renderEditLoad(content, r.param);
    else if (r.page === 'newload') {
      location.hash = '#/dispatch';
      setTimeout(openNewLoadModal, 0);
    }
    else if (r.page === 'customers') renderCustomers(content);
    else if (r.page === 'carriers') renderCarriers(content);
    else if (r.page === 'brokers') renderBrokers(content);
    else if (r.page === 'alerts') renderAlerts(content);
    else if (r.page === 'quickbooks') renderQuickBooks(content);
    else if (r.page === 'invoices') renderInvoices(content);
    else if (r.page === 'receipts') renderReceipts(content);
    else if (r.page === 'company') renderCompany(content);
    else if (r.page === 'reports') renderReports(content);
    else renderPlaceholder(content, r.page);
  }

  if (!location.hash) location.hash = '#/dispatch';
  render();
})();
