const fileInput = document.getElementById('fileInput');
const runBtn = document.getElementById('runBtn');
const fromDate = document.getElementById('fromDate');
const toDate = document.getElementById('toDate');
const summaryBody = document.querySelector('#summaryTable tbody');
const detailBody = document.querySelector('#detailTable tbody');
const statusLabel = document.getElementById('status');

let records = [];

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const text = await file.text();
  records = parseCsv(text);
  statusLabel.textContent = `Se cargaron ${records.length} registros.`;
});

runBtn.addEventListener('click', () => {
  if (!records.length) {
    statusLabel.textContent = 'Cargue primero un archivo CSV con registros.';
    return;
  }

  const filtered = filterByDates(records, fromDate.value, toDate.value);
  const result = calculateHours(filtered);
  renderSummary(result.byCategory);
  renderDetail(result.byEmployeeCategory);

  statusLabel.textContent = `Procesados ${filtered.length} registros válidos. Horas totales: ${formatHours(result.totalHours)}.`;
});

function parseCsv(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) return [];

  const [header, ...rows] = lines;
  const columns = header.toLowerCase().split(',').map((c) => c.trim());
  const idxEmpleado = columns.indexOf('empleado');
  const idxCategoria = columns.indexOf('categoria');
  const idxFechaHora = columns.indexOf('fecha_hora');
  const idxTipo = columns.indexOf('tipo');

  return rows
    .map((row) => row.split(',').map((v) => v.trim()))
    .map((parts) => ({
      empleado: parts[idxEmpleado],
      categoria: parts[idxCategoria],
      fechaHora: new Date(parts[idxFechaHora].replace(' ', 'T')),
      tipo: (parts[idxTipo] || '').toLowerCase()
    }))
    .filter((r) => r.empleado && r.categoria && !isNaN(r.fechaHora.getTime()) && (r.tipo === 'entrada' || r.tipo === 'salida'))
    .sort((a, b) => a.fechaHora - b.fechaHora);
}

function filterByDates(items, from, to) {
  const fromDateObj = from ? new Date(`${from}T00:00:00`) : null;
  const toDateObj = to ? new Date(`${to}T23:59:59`) : null;

  return items.filter((item) => {
    const t = item.fechaHora.getTime();
    if (fromDateObj && t < fromDateObj.getTime()) return false;
    if (toDateObj && t > toDateObj.getTime()) return false;
    return true;
  });
}

function calculateHours(items) {
  const openByEmployee = new Map();
  const byCategory = new Map();
  const byEmployeeCategory = new Map();
  let totalHours = 0;

  for (const item of items) {
    const key = item.empleado;

    if (item.tipo === 'entrada') {
      openByEmployee.set(key, item);
      continue;
    }

    const open = openByEmployee.get(key);
    if (!open) continue;

    const durationMs = item.fechaHora - open.fechaHora;
    if (durationMs <= 0) continue;

    const hours = durationMs / (1000 * 60 * 60);
    const category = open.categoria;
    const employeeCategoryKey = `${open.empleado}|||${category}`;

    byCategory.set(category, (byCategory.get(category) || 0) + hours);
    byEmployeeCategory.set(employeeCategoryKey, (byEmployeeCategory.get(employeeCategoryKey) || 0) + hours);
    totalHours += hours;

    openByEmployee.delete(key);
  }

  return { byCategory, byEmployeeCategory, totalHours };
}

function renderSummary(map) {
  summaryBody.innerHTML = '';
  const entries = [...map.entries()].sort((a, b) => b[1] - a[1]);
  for (const [category, hours] of entries) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${category}</td><td>${formatHours(hours)}</td>`;
    summaryBody.appendChild(row);
  }
}

function renderDetail(map) {
  detailBody.innerHTML = '';
  const entries = [...map.entries()].sort((a, b) => b[1] - a[1]);
  for (const [key, hours] of entries) {
    const [empleado, categoria] = key.split('|||');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${empleado}</td><td>${categoria}</td><td>${formatHours(hours)}</td>`;
    detailBody.appendChild(row);
  }
}

function formatHours(value) {
  return `${value.toFixed(2)} h`;
}
