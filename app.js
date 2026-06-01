const palette = {
  purple: '#7770a4',
  lightPurple: '#bfc0d7',
  orange: '#ff9018',
  sky: '#62b4df',
  red: '#db2d4d',
  green: '#159b80',
  yellow: '#e3a21a',
  slate: '#5d7594'
};

const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'];
const frequency = {
  all: [410, 520, 660, 745, 940, 815],
  success: [398, 510, 641, 720, 901, 793],
  errors: [12, 10, 19, 25, 39, 22]
};

Highcharts.setOptions({
  lang: {
    thousandsSep: ' ',
    decimalPoint: ','
  },
  chart: {
    style: { fontFamily: 'Arial, Helvetica, sans-serif' },
    spacing: [14, 16, 10, 8]
  },
  title: { style: { color: '#28323a', fontSize: '14px', fontWeight: '700' } },
  subtitle: { style: { color: '#6d7882', fontSize: '11px' } },
  xAxis: {
    lineColor: '#dce2e6',
    tickColor: '#dce2e6',
    labels: { style: { color: '#596773', fontSize: '11px' } }
  },
  yAxis: {
    gridLineColor: '#edf0f2',
    labels: { style: { color: '#596773', fontSize: '11px' } },
    title: { style: { color: '#596773', fontSize: '11px' } }
  },
  legend: {
    align: 'left',
    verticalAlign: 'bottom',
    itemStyle: { color: '#59616a', fontSize: '11px', fontWeight: '400' },
    itemHoverStyle: { color: '#28323a' },
    symbolRadius: 1
  },
  credits: { enabled: false },
  tooltip: {
    backgroundColor: '#fff',
    borderColor: '#d6dde2',
    borderRadius: 2,
    shadow: true,
    shared: true,
    valueDecimals: 0
  }
});

Highcharts.chart('frequency-chart', {
  chart: { type: 'spline' },
  title: { text: null },
  xAxis: { categories: hours, title: { text: 'Время' } },
  yAxis: { min: 0, title: { text: 'Запросы, шт.' } },
  tooltip: { shared: true, valueSuffix: ' шт.' },
  plotOptions: { series: { marker: { radius: 4 }, lineWidth: 3 } },
  series: [
    { name: 'Все запросы', data: frequency.all, color: palette.purple },
    { name: 'Успешно обработано', data: frequency.success, color: palette.sky },
    { name: 'Ошибки', data: frequency.errors, color: palette.red }
  ]
});

Highcharts.chart('resources-chart', {
  chart: { zoomType: 'xy' },
  title: { text: null },
  xAxis: [{ categories: hours, crosshair: true }],
  yAxis: [
    { title: { text: 'Время обработки, сек.' }, min: 0, max: 14 },
    { title: { text: 'Запросы, шт.' }, opposite: true, min: 0 }
  ],
  tooltip: { shared: true },
  series: [
    { name: 'Количество запросов', type: 'column', yAxis: 1, data: [520, 680, 760, 940, 860, 720], color: palette.lightPurple, tooltip: { valueSuffix: ' шт.' } },
    { name: 'Среднее время обработки', type: 'spline', data: [2.1, 2.5, 3.4, 5.2, 4.6, 3.8], color: palette.sky, tooltip: { valueSuffix: ' сек.' } },
    { name: '95-й перцентиль', type: 'spline', data: [3.7, 4.3, 5.9, 8.7, 7.4, 6.2], color: palette.orange, tooltip: { valueSuffix: ' сек.' } }
  ]
});

Highcharts.chart('endpoints-chart', {
  chart: { type: 'spline' },
  title: { text: null },
  xAxis: { categories: hours, title: { text: 'Время' } },
  yAxis: [
    { title: { text: 'Запросы в минуту' }, min: 0 },
    { title: { text: 'Ошибки, шт.' }, min: 0, opposite: true, allowDecimals: false }
  ],
  tooltip: { shared: true },
  plotOptions: {
    series: { marker: { radius: 4 }, lineWidth: 3 },
    column: { stacking: 'normal', borderWidth: 0, pointPadding: 0.12, groupPadding: 0.18, opacity: 0.72 }
  },
  series: [
    { name: 'Ошибки: 1023 REST API', type: 'column', stack: 'errors', yAxis: 1, zIndex: 0, data: [3, 4, 6, 8, 12, 7], color: palette.purple, tooltip: { valueSuffix: ' шт.' } },
    { name: 'Ошибки: 93 ответы и рекомендации', type: 'column', stack: 'errors', yAxis: 1, zIndex: 0, data: [2, 3, 5, 7, 10, 6], color: palette.orange, tooltip: { valueSuffix: ' шт.' } },
    { name: 'Ошибки: 265 остальные сценарии', type: 'column', stack: 'errors', yAxis: 1, zIndex: 0, data: [1, 2, 3, 4, 6, 4], color: palette.sky, tooltip: { valueSuffix: ' шт.' } },
    { name: '1023 REST API', data: [180, 205, 228, 252, 264, 241], color: palette.purple, zIndex: 3, tooltip: { valueSuffix: ' запр./мин.' } },
    { name: '93 ответы и рекомендации', data: [110, 128, 142, 153, 171, 160], color: palette.orange, zIndex: 3, tooltip: { valueSuffix: ' запр./мин.' } },
    { name: '265 остальные сценарии', data: [62, 74, 88, 96, 112, 104], color: palette.sky, zIndex: 3, tooltip: { valueSuffix: ' запр./мин.' } }
  ]
});

Highcharts.chart('queues-chart', {
  chart: { type: 'bar' },
  title: { text: null },
  xAxis: { categories: hours, title: { text: 'Время' } },
  yAxis: {
    title: { text: 'Сообщения, шт.' },
    labels: {
      formatter() {
        return Highcharts.numberFormat(Math.abs(this.value), 0);
      }
    }
  },
  tooltip: {
    shared: true,
    formatter() {
      return `<b>${this.x}</b><br>${this.points.map((point) => {
        return `<span style="color:${point.color}">●</span> ${point.series.name}: <b>${Highcharts.numberFormat(Math.abs(point.y), 0)} сообщений</b>`;
      }).join('<br>')}`;
    }
  },
  plotOptions: {
    series: {
      stacking: 'normal',
      borderWidth: 0,
      borderRadius: 3
    }
  },
  series: [
    { name: 'Входящая очередь', data: [1020, 1650, 2380, 3520, 4810, 3240], color: palette.purple },
    { name: 'Исходящая очередь', data: [-190, -310, -460, -720, -910, -420], color: palette.sky }
  ]
});

Highcharts.chart('queues-functional-chart', {
  chart: { type: 'column' },
  title: { text: null },
  xAxis: { categories: hours, title: { text: 'Время' } },
  yAxis: { title: { text: 'Элементы в очередях, шт.' }, min: 0 },
  tooltip: { shared: true, valueSuffix: ' элементов' },
  plotOptions: {
    column: { stacking: 'normal', borderWidth: 0, borderRadius: 2 }
  },
  series: [
    { name: '93: ответы и рекомендации', data: [470, 690, 980, 1310, 1730, 1520], color: palette.purple },
    { name: '265: остальные сценарии', data: [310, 460, 650, 880, 1120, 860], color: palette.sky },
    { name: 'Загрузка: общая и история', data: [180, 330, 560, 890, 1240, 540], color: palette.orange },
    { name: 'Отмены', data: [60, 170, 190, 440, 720, 320], color: palette.red }
  ]
});

document.getElementById('frequency-table').innerHTML = hours.map((hour, index) => {
  const errorShare = (frequency.errors[index] / frequency.all[index] * 100).toFixed(2).replace('.', ',');
  return `<tr>
    <td>${hour}–${String(Number(hour.slice(0, 2)) + 1).padStart(2, '0')}:00</td>
    <td>${frequency.all[index]}</td>
    <td>${frequency.success[index]}</td>
    <td class="${frequency.errors[index] > 25 ? 'danger-text' : ''}">${frequency.errors[index]}</td>
    <td>${errorShare}%</td>
  </tr>`;
}).join('');

function escapeCsvCell(value) {
  const normalized = value.replace(/\s+/g, ' ').trim();
  return `"${normalized.replace(/"/g, '""')}"`;
}

const exportedTables = [
  { title: 'Детализация частоты обращений', id: 'frequency-details-table' },
  { title: 'Ресурсы за выбранный период', id: 'resources-details-table' },
  { title: 'Интерфейсы ИИ за выбранный период', id: 'endpoints-details-table' },
  { title: 'Состояние очередей', id: 'queues-details-table' }
];

function exportAllTablesToCsv() {
  const rows = [];

  exportedTables.forEach(({ title, id }, index) => {
    const table = document.getElementById(id);
    if (!table) return;

    if (index > 0) rows.push('');
    rows.push(escapeCsvCell(title));
    Array.from(table.querySelectorAll('tr')).forEach((row) => {
      rows.push(Array.from(row.querySelectorAll('th, td'))
        .map((cell) => escapeCsvCell(cell.textContent))
        .join(';'));
    });
  });

  const blob = new Blob([`\uFEFF${rows.join('\r\n')}`], {
    type: 'text/csv;charset=utf-8;'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'ai-monitoring-details.csv';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

document.getElementById('export-all-tables').addEventListener('click', exportAllTablesToCsv);

function normalizeSortValue(value) {
  const compact = value.replace(/\s/g, '').replace(',', '.');
  const numeric = Number.parseFloat(compact);
  return Number.isNaN(numeric) ? value.trim().toLocaleLowerCase('ru') : numeric;
}

document.querySelectorAll('.sortable-table th').forEach((header, columnIndex) => {
  header.classList.add('sortable-header');
  header.addEventListener('click', () => {
    const table = header.closest('table');
    const body = table.querySelector('tbody');
    const direction = header.dataset.direction === 'asc' ? 'desc' : 'asc';
    table.querySelectorAll('th').forEach((item) => delete item.dataset.direction);
    header.dataset.direction = direction;

    const rows = Array.from(body.querySelectorAll('tr'));
    rows.sort((left, right) => {
      const leftValue = normalizeSortValue(left.children[columnIndex].textContent);
      const rightValue = normalizeSortValue(right.children[columnIndex].textContent);
      const result = typeof leftValue === 'number' && typeof rightValue === 'number'
        ? leftValue - rightValue
        : String(leftValue).localeCompare(String(rightValue), 'ru');
      return direction === 'asc' ? result : -result;
    });
    rows.forEach((row) => body.appendChild(row));
  });
});
