export const ui = {
  tableBody: () => document.getElementById("personas-tbody"),
  modal: () => document.getElementById("modal"),
  modalTitle: () => document.getElementById("modal-title"),
  form: () => document.getElementById("persona-form"),
  toastEl: () => document.getElementById("toast"),
  toastMsgEl: () => document.getElementById("toast-message"),
  counter: () => document.getElementById("total-counter"),
  searchInput: () => document.getElementById("search-input"),
  emptyState: () => document.getElementById("empty-state"),
  loadingState: () => document.getElementById("loading-state"),

  // ── Tabla ────────────────────────────────────────────────────
  renderTable(personas) {
    const tbody = this.tableBody();
    const empty = this.emptyState();
    const counter = this.counter();

    if (counter) counter.textContent = personas.length;

    if (personas.length === 0) {
      tbody.innerHTML = "";
      if (empty) empty.classList.remove("hidden");
      return;
    }
    if (empty) empty.classList.add("hidden");

    tbody.innerHTML = personas.map((p) => `
      <tr class="table-row" data-id="${p.id}">
        <td class="td-id">${p.id ?? "—"}</td>
        <td class="td-nombre">
          <span class="avatar">${(p.nombre || "?")[0].toUpperCase()}</span>
          ${p.nombre}
        </td>
        <td>${p.direccion}</td>
        <td>
          <a href="tel:${p.telefono}" class="link-tel">${p.telefono}</a>
        </td>
        <td>
          <a href="mailto:${p.correo}" class="link-mail">${p.correo}</a>
        </td>
        <td class="td-actions">
          <button class="btn-icon btn-edit" data-id="${p.id}" title="Editar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="btn-icon btn-delete" data-id="${p.id}" title="Eliminar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </td>
      </tr>
    `).join("");
  },

  openModal(title = "Nueva Persona", persona = null) {
    this.modalTitle().textContent = title;
    this.clearErrors();

    const f = this.form();
    f.reset();
    f.dataset.mode = persona ? "edit" : "create";
    f.dataset.id = persona ? persona.id : "";

    if (persona) {
      f.nombre.value = persona.nombre || "";
      f.direccion.value = persona.direccion || "";
      f.telefono.value = persona.telefono || "";
      f.correo.value = persona.correo || "";
    }

    this.modal().classList.add("open");
    setTimeout(() => f.nombre.focus(), 100);
  },

  closeModal() {
    this.modal().classList.remove("open");
    this.clearErrors();
  },

  showErrors(errors) {
    this.clearErrors();
    for (const [field, msg] of Object.entries(errors)) {
      const el = document.getElementById(`error-${field}`);
      const input = document.querySelector(`[name="${field}"]`);
      if (el) { el.textContent = msg; el.classList.remove("hidden"); }
      if (input) input.classList.add("input-error");
    }
  },

  clearErrors() {
    document.querySelectorAll(".field-error").forEach((el) => {
      el.textContent = "";
      el.classList.add("hidden");
    });
    document.querySelectorAll(".input-error").forEach((el) => el.classList.remove("input-error"));
  },

  toast(message, type = "success") {
    const t = this.toastEl();
    const tm = this.toastMsgEl();
    if (!t || !tm) return;

    tm.textContent = message;
    t.className = `toast toast-${type} show`;

    clearTimeout(t._timeout);
    t._timeout = setTimeout(() => t.classList.remove("show"), 3200);
  },

  setLoading(active) {
    const ls = this.loadingState();
    const tb = this.tableBody();
    if (active) {
      if (ls) ls.classList.remove("hidden");
      if (tb) tb.innerHTML = "";
    } else {
      if (ls) ls.classList.add("hidden");
    }
  },
};