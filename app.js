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
    { title: { text: 'Доля ошибок, %' }, min: 0, max: 3, opposite: true }
  ],
  tooltip: { shared: true },
  plotOptions: { series: { marker: { radius: 4 }, lineWidth: 3 } },
  series: [
    { name: 'POST /letters', data: [180, 205, 228, 252, 264, 241], color: palette.purple, tooltip: { valueSuffix: ' запр./мин.' } },
    { name: 'POST /answers', data: [110, 128, 142, 153, 171, 160], color: palette.sky, tooltip: { valueSuffix: ' запр./мин.' } },
    { name: 'GET /results', data: [215, 242, 298, 336, 374, 348], color: palette.orange, tooltip: { valueSuffix: ' запр./мин.' } },
    { name: 'Ошибки endpoints', type: 'column', yAxis: 1, data: [0.42, 0.61, 0.85, 1.32, 1.86, 1.11], color: 'rgba(219,45,77,.28)', tooltip: { valueSuffix: '%' } }
  ]
});

Highcharts.chart('queues-chart', {
  chart: { type: 'areaspline' },
  title: { text: null },
  xAxis: { categories: hours, title: { text: 'Время' } },
  yAxis: { title: { text: 'Сообщения, шт.' }, min: 0 },
  tooltip: { shared: true, valueSuffix: ' сообщений' },
  plotOptions: {
    areaspline: { fillOpacity: 0.16, marker: { radius: 4 }, lineWidth: 3 }
  },
  series: [
    { name: 'Входящая очередь', data: [1020, 1650, 2380, 3520, 4810, 3240], color: palette.purple },
    { name: 'Исходящая очередь', data: [190, 310, 460, 720, 910, 420], color: palette.sky }
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

function exportTableToCsv(tableId, fileName) {
  const table = document.getElementById(tableId);
  if (!table) return;

  const rows = Array.from(table.querySelectorAll('tr')).map((row) => {
    return Array.from(row.querySelectorAll('th, td'))
      .map((cell) => escapeCsvCell(cell.textContent))
      .join(';');
  });

  const blob = new Blob([`\uFEFF${rows.join('\r\n')}`], {
    type: 'text/csv;charset=utf-8;'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

document.querySelectorAll('[data-export-table]').forEach((button) => {
  button.addEventListener('click', () => {
    exportTableToCsv(button.dataset.exportTable, button.dataset.exportFile);
  });
});
