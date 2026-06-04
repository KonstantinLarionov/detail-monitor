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
const dayHours = Array.from({ length: 24 }, (_, index) => `${String(index).padStart(2, '0')}:00`);

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

const flkCategories = ['Обязательные поля обращения', 'Обязательные поля ответа', 'Связь обращения и ответа'];
const flkObjects = [
  { letterId: '88013210', answerId: '', objectType: 'Обращение', check: 'Обязательные поля обращения', result: 'Не прошел ФЛК', reason: 'Нет текста обращения', checkedAt: '14.05.2026 08:12' },
  { letterId: '88013211', answerId: '', objectType: 'Обращение', check: 'Обязательные поля обращения', result: 'Не прошел ФЛК', reason: 'Нет даты регистрации обращения', checkedAt: '14.05.2026 08:19' },
  { letterId: '88013212', answerId: '', objectType: 'Обращение', check: 'Обязательные поля обращения', result: 'Прошел ФЛК', reason: 'Ошибок ФЛК не выявлено', checkedAt: '14.05.2026 08:27' },
  { letterId: '88013219', answerId: '', objectType: 'Обращение', check: 'Обязательные поля обращения', result: 'Не прошел ФЛК', reason: 'Нет идентификатора обращения', checkedAt: '14.05.2026 08:36' },
  { letterId: '88013220', answerId: '', objectType: 'Обращение', check: 'Обязательные поля обращения', result: 'Не прошел ФЛК', reason: 'Нет категории обращения', checkedAt: '14.05.2026 08:44' },
  { letterId: '88013213', answerId: '99043100', objectType: 'Ответ', check: 'Обязательные поля ответа', result: 'Не прошел ФЛК', reason: 'Нет текста ответа', checkedAt: '14.05.2026 09:04' },
  { letterId: '88013214', answerId: '99043101', objectType: 'Ответ', check: 'Обязательные поля ответа', result: 'Не прошел ФЛК', reason: 'Нет даты ответа', checkedAt: '14.05.2026 09:22' },
  { letterId: '88013215', answerId: '99043102', objectType: 'Ответ', check: 'Обязательные поля ответа', result: 'Прошел ФЛК', reason: 'Ошибок ФЛК не выявлено', checkedAt: '14.05.2026 09:41' },
  { letterId: '88013221', answerId: '99043106', objectType: 'Ответ', check: 'Обязательные поля ответа', result: 'Не прошел ФЛК', reason: 'Нет идентификатора ответа', checkedAt: '14.05.2026 09:53' },
  { letterId: '88013222', answerId: '99043107', objectType: 'Ответ', check: 'Обязательные поля ответа', result: 'Не прошел ФЛК', reason: 'Нет признака подписания ответа', checkedAt: '14.05.2026 10:02' },
  { letterId: '88013216', answerId: '99043103', objectType: 'Ответ', check: 'Связь обращения и ответа', result: 'Не прошел ФЛК', reason: 'Ответ не сопоставлен с обращением', checkedAt: '14.05.2026 10:11' },
  { letterId: '88013217', answerId: '99043104', objectType: 'Ответ', check: 'Связь обращения и ответа', result: 'Не прошел ФЛК', reason: 'Связанное обращение не найдено в регистрационных данных', checkedAt: '14.05.2026 10:38' },
  { letterId: '88013218', answerId: '99043105', objectType: 'Ответ', check: 'Связь обращения и ответа', result: 'Прошел ФЛК', reason: 'Ошибок ФЛК не выявлено', checkedAt: '14.05.2026 11:02' },
  { letterId: '88013223', answerId: '99043108', objectType: 'Ответ', check: 'Связь обращения и ответа', result: 'Не прошел ФЛК', reason: 'Ответ привязан к закрытому обращению', checkedAt: '14.05.2026 11:17' },
  { letterId: '88013224', answerId: '99043109', objectType: 'Ответ', check: 'Связь обращения и ответа', result: 'Не прошел ФЛК', reason: 'Идентификатор обращения в ответе не совпадает с регистрационными данными', checkedAt: '14.05.2026 11:29' }
];

function renderFlkTable(check = 'all', result = 'all') {
  const rows = flkObjects.filter((item) => {
    const checkMatches = check === 'all' || item.check === check;
    const resultMatches = result === 'all' || item.result === result;
    return checkMatches && resultMatches;
  });
  const title = document.getElementById('flk-table-title');
  const body = document.getElementById('flk-table-body');
  const checkText = check === 'all' ? 'всем проверкам' : check;
  const resultText = result === 'all' ? 'всем результатам' : result.toLowerCase();
  title.textContent = `Объекты доступности к выгрузке по ${checkText} и ${resultText}`;
  body.innerHTML = rows.map((item) => {
    const resultClass = item.result === 'Не прошел ФЛК' ? ' class="danger-text"' : '';
    return `<tr>
      <td>${item.letterId}</td>
      <td>${item.answerId || '-'}</td>
      <td>${item.objectType}</td>
      <td>${item.check}</td>
      <td${resultClass}>${item.result}</td>
      <td>${item.reason}</td>
      <td>${item.checkedAt}</td>
    </tr>`;
  }).join('');
}

Highcharts.chart('flk-day-chart', {
  chart: { type: 'column' },
  title: { text: null },
  xAxis: { categories: flkCategories, title: { text: null } },
  yAxis: { min: 0, title: { text: 'Сообщения, шт.' } },
  tooltip: { shared: true, valueSuffix: ' шт.' },
  plotOptions: {
    column: {
      stacking: 'normal',
      borderWidth: 0,
      borderRadius: 2,
      cursor: 'pointer',
      groupPadding: 0.18,
      pointPadding: 0.08,
      point: {
        events: {
          click() {
            const result = this.series.name === 'Недоступно для выгрузки' ? 'Не прошел ФЛК' : 'Прошел ФЛК';
            renderFlkTable(this.category, result);
          }
        }
      }
    }
  },
  series: [
    { name: 'Доступно для выгрузки', data: [18742, 17302, 17118], color: palette.sky },
    { name: 'Недоступно для выгрузки', data: [158, 78, 52], color: palette.red }
  ]
});
renderFlkTable();

const speedBuckets = ['до 50', '50-100', '100-150', '150+'];
const endpointRequests = [
  { id: '77018421', group: '1023', queue: '1023 REST API', endpoint: 'POST /rate', feature: 'Оценка ответа', speed: 264, time: '1,8 сек.', status: 'Успешно' },
  { id: '77018422', group: '1023', queue: '1023 REST API', endpoint: 'POST /wordcloud', feature: 'Тематический поиск', speed: 171, time: '1,1 сек.', status: 'Успешно' },
  { id: '77018428', group: '1023', queue: '1023 REST API', endpoint: 'POST /rate', feature: 'Оценка ответа', speed: 138, time: '2,2 сек.', status: 'Успешно' },
  { id: '77018429', group: '1023', queue: '1023 REST API', endpoint: 'POST /cancel', feature: 'Отмена сообщений в очереди', speed: 112, time: '0,8 сек.', status: 'Успешно' },
  { id: '77018434', group: '1023', queue: '1023 REST API', endpoint: 'POST /rate', feature: 'Оценка ответа', speed: 92, time: '2,9 сек.', status: 'Успешно' },
  { id: '77018435', group: '1023', queue: '1023 REST API', endpoint: 'POST /wordcloud', feature: 'Тематический поиск', speed: 76, time: '3,4 сек.', status: 'Ошибка' },
  { id: '77018436', group: '1023', queue: '1023 REST API', endpoint: 'POST /cancel', feature: 'Отмена сообщений в очереди', speed: 48, time: '4,6 сек.', status: 'Успешно' },
  { id: '77018437', group: '1023', queue: '1023 REST API', endpoint: 'POST /rate', feature: 'Оценка ответа', speed: 221, time: '1,5 сек.', status: 'Успешно' },
  { id: '77018423', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 152, time: '4,2 сек.', status: 'Успешно' },
  { id: '77018424', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 121, time: '2,1 сек.', status: 'Успешно' },
  { id: '77018430', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 146, time: '4,8 сек.', status: 'Успешно' },
  { id: '77018431', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 169, time: '2,4 сек.', status: 'Ошибка' },
  { id: '77018438', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 94, time: '5,1 сек.', status: 'Успешно' },
  { id: '77018439', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 83, time: '5,8 сек.', status: 'Успешно' },
  { id: '77018440', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 47, time: '8,2 сек.', status: 'Ошибка' },
  { id: '77018441', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 188, time: '1,9 сек.', status: 'Успешно' },
  { id: '77018425', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.SEARCH', feature: 'Поиск по ключевым словам', speed: 62, time: '5,8 сек.', status: 'Ошибка' },
  { id: '77018426', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.PROBLEMS', feature: 'Отчет по категориям', speed: 44, time: '9,4 сек.', status: 'Успешно' },
  { id: '77018427', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.HISTORY', feature: 'Загрузка исторических данных', speed: 54, time: '7,6 сек.', status: 'Успешно' },
  { id: '77018432', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.SEARCH', feature: 'Поиск по ключевым словам', speed: 86, time: '3,1 сек.', status: 'Успешно' },
  { id: '77018433', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.PROBLEMS', feature: 'Отчет по категориям', speed: 38, time: '8,7 сек.', status: 'Успешно' },
  { id: '77018442', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.HISTORY', feature: 'Загрузка исторических данных', speed: 31, time: '11,6 сек.', status: 'Успешно' },
  { id: '77018443', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.SEARCH', feature: 'Поиск по ключевым словам', speed: 117, time: '4,3 сек.', status: 'Успешно' },
  { id: '77018444', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.PROBLEMS', feature: 'Отчет по категориям', speed: 132, time: '6,9 сек.', status: 'Ошибка' },
  { id: '77018445', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.SEARCH', feature: 'Поиск по ключевым словам', speed: 156, time: '3,7 сек.', status: 'Успешно' },
  { id: '77018446', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.HISTORY', feature: 'Загрузка исторических данных', speed: 72, time: '7,1 сек.', status: 'Успешно' }
];

function getSpeedBucket(speed) {
  if (speed < 50) return 'до 50';
  if (speed < 100) return '50-100';
  if (speed < 150) return '100-150';
  return '150+';
}

function getEndpointChartSeries(queueFilter = 'all') {
  const queues = ['1023 REST API', '93 ответы и рекомендации', '265 остальные сценарии'];
  return queues
    .filter((queue) => queueFilter === 'all' || queue === queueFilter)
    .map((queue) => ({
      name: queue,
      data: speedBuckets.map((bucket) => endpointRequests.filter((item) => item.queue === queue && getSpeedBucket(item.speed) === bucket).length),
      color: queue === '1023 REST API' ? palette.purple : queue === '93 ответы и рекомендации' ? palette.orange : palette.sky
    }));
}

function renderEndpointTable(queueFilter = 'all', speedBucket = 'all') {
  const rows = endpointRequests.filter((item) => {
    const queueMatches = queueFilter === 'all' || item.queue === queueFilter;
    const speedMatches = speedBucket === 'all' || getSpeedBucket(item.speed) === speedBucket;
    return queueMatches && speedMatches;
  });
  const title = document.getElementById('endpoints-table-title');
  const body = document.getElementById('endpoints-table-body');
  const queueText = queueFilter === 'all' ? 'всем сценариям' : queueFilter;
  const speedText = speedBucket === 'all' ? 'всем скоростям' : `скорости ${speedBucket} сообщ./мин.`;
  title.textContent = `Обращения по ${queueText} и ${speedText}`;
  body.innerHTML = rows.length ? rows.map((item) => {
    const statusClass = item.status === 'Ошибка' ? ' class="danger-text"' : '';
    return `<tr>
      <td>${item.id}</td>
      <td><b>${item.group}</b></td>
      <td>${item.endpoint}</td>
      <td>${item.feature}</td>
      <td>${item.time}</td>
      <td${statusClass}>${item.status}</td>
    </tr>`;
  }).join('') : '<tr><td colspan="6" class="text-muted">В выбранный диапазон обращений не попало</td></tr>';
}

let selectedEndpointQueue = 'all';
let selectedEndpointSpeed = 'all';

const endpointsChart = Highcharts.chart('endpoints-chart', {
  chart: { type: 'column' },
  title: { text: null },
  xAxis: {
    categories: speedBuckets,
    title: { text: 'Скорость обработки, сообщ./мин.' }
  },
  yAxis: { title: { text: 'Количество обращений, шт.' }, min: 0 },
  tooltip: {
    shared: true,
    formatter() {
      return `<b>${this.x}</b><br>${this.points.map((point) => {
        return `<span style="color:${point.color}">●</span> ${point.series.name}: <b>${Highcharts.numberFormat(point.y, 0)} обращений</b>`;
      }).join('<br>')}`;
    }
  },
  plotOptions: {
    column: {
      borderWidth: 0,
      borderRadius: 2,
      cursor: 'pointer',
      groupPadding: 0.16,
      pointPadding: 0.06,
      point: {
        events: {
          click() {
            selectedEndpointQueue = this.series.name;
            selectedEndpointSpeed = this.category;
            document.getElementById('endpoint-queue-filter').value = selectedEndpointQueue;
            renderEndpointTable(selectedEndpointQueue, selectedEndpointSpeed);
          }
        }
      }
    }
  },
  series: getEndpointChartSeries()
});

document.getElementById('endpoint-queue-filter').addEventListener('change', (event) => {
  selectedEndpointQueue = event.target.value;
  selectedEndpointSpeed = 'all';
  while (endpointsChart.series.length) {
    endpointsChart.series[0].remove(false);
  }
  getEndpointChartSeries(selectedEndpointQueue).forEach((series) => endpointsChart.addSeries(series, false));
  endpointsChart.redraw();
  renderEndpointTable(selectedEndpointQueue, selectedEndpointSpeed);
});
renderEndpointTable();

const queueBalanceData = {
  all: {
    title: 'Все сценарии',
    sent: [1020, 1650, 2380, 3520, 4810, 3240],
    returned: [860, 1320, 2010, 2760, 3890, 2870],
    pending: [160, 490, 860, 1620, 2540, 2910]
  },
  rating: {
    title: '93: MOSEDO_AI.RATING',
    sent: [420, 650, 930, 1280, 1760, 1520],
    returned: [350, 520, 760, 990, 1410, 1210],
    pending: [70, 200, 370, 660, 1010, 1320]
  },
  ratingIn: {
    title: 'MOSEDO_AI.RATING.IN',
    sent: [420, 650, 930, 1280, 1760, 1520],
    returned: [350, 520, 760, 990, 1410, 1210],
    pending: [70, 200, 370, 660, 1010, 1320]
  },
  ratingOut: {
    title: 'MOSEDO_AI.RATING.OUT',
    sent: [420, 650, 930, 1280, 1760, 1520],
    returned: [350, 520, 760, 990, 1410, 1210],
    pending: [20, 45, 80, 130, 210, 210]
  },
  problems: {
    title: '265: MOSEDO_AI.PROBLEMS',
    sent: [90, 170, 260, 440, 710, 440],
    returned: [40, 100, 180, 310, 520, 360],
    pending: [50, 120, 200, 330, 520, 600]
  },
  problemsIn: {
    title: 'MOSEDO_AI.PROBLEMS.IN',
    sent: [90, 170, 260, 440, 710, 440],
    returned: [40, 100, 180, 310, 520, 360],
    pending: [50, 120, 200, 330, 520, 440]
  },
  problemsOut: {
    title: 'MOSEDO_AI.PROBLEMS.OUT',
    sent: [90, 170, 260, 440, 710, 440],
    returned: [40, 100, 180, 310, 520, 360],
    pending: [8, 18, 34, 56, 92, 65]
  },
  search: {
    title: '265: MOSEDO_AI.SEARCH',
    sent: [130, 240, 360, 620, 930, 620],
    returned: [80, 160, 270, 460, 740, 510],
    pending: [50, 130, 220, 380, 570, 680]
  },
  searchIn: {
    title: 'MOSEDO_AI.SEARCH.IN',
    sent: [130, 240, 360, 620, 930, 620],
    returned: [80, 160, 270, 460, 740, 510],
    pending: [50, 130, 220, 380, 570, 620]
  },
  searchOut: {
    title: 'MOSEDO_AI.SEARCH.OUT',
    sent: [130, 240, 360, 620, 930, 620],
    returned: [80, 160, 270, 460, 740, 510],
    pending: [12, 26, 42, 70, 120, 95]
  },
  history: {
    title: 'Загрузка: MOSEDO_AI.HISTORY',
    sent: [180, 330, 560, 890, 1240, 540],
    returned: [150, 280, 490, 760, 1060, 470],
    pending: [30, 80, 150, 280, 460, 530]
  },
  historyIn: {
    title: 'MOSEDO_AI.HISTORY.IN',
    sent: [180, 330, 560, 890, 1240, 540],
    returned: [150, 280, 490, 760, 1060, 470],
    pending: [30, 80, 150, 280, 460, 540]
  },
  cancel: {
    title: 'Отмены: MOSEDO_AI.CANCEL',
    sent: [60, 90, 120, 180, 260, 120],
    returned: [20, 35, 50, 80, 110, 50],
    pending: [40, 95, 165, 265, 415, 485]
  },
  cancelIn: {
    title: 'MOSEDO_AI.CANCEL.IN',
    sent: [60, 90, 120, 180, 260, 120],
    returned: [20, 35, 50, 80, 110, 50],
    pending: [40, 95, 165, 265, 415, 120]
  },
  cancelOut: {
    title: 'MOSEDO_AI.CANCEL.OUT',
    sent: [60, 90, 120, 180, 260, 120],
    returned: [20, 35, 50, 80, 110, 50],
    pending: [6, 12, 20, 36, 58, 50]
  }
};

const queueBalanceChart = Highcharts.chart('queue-exchange-balance-chart', {
  chart: { type: 'column' },
  title: { text: null },
  xAxis: { categories: hours, crosshair: true, title: { text: 'Время' } },
  yAxis: { title: { text: 'Сообщения, шт.' }, min: 0 },
  tooltip: { shared: true },
  plotOptions: {
    column: { borderWidth: 0, borderRadius: 2, groupPadding: 0.18, pointPadding: 0.08 }
  },
  series: []
});

function updateQueueBalanceChart(key) {
  const data = queueBalanceData[key];
  while (queueBalanceChart.series.length) {
    queueBalanceChart.series[0].remove(false);
  }
  queueBalanceChart.addSeries({ name: `${data.title}: передано в ИИ`, type: 'column', data: data.sent, color: palette.purple, tooltip: { valueSuffix: ' шт.' } }, false);
  queueBalanceChart.addSeries({ name: `${data.title}: обработано ИИ`, type: 'column', data: data.returned, color: palette.sky, tooltip: { valueSuffix: ' шт.' } }, false);
  queueBalanceChart.addSeries({ name: `${data.title}: остаток обработки`, type: 'column', data: data.pending, color: palette.orange, tooltip: { valueSuffix: ' шт.' } }, false);
  queueBalanceChart.redraw();
}

document.getElementById('queue-balance-topic').addEventListener('change', (event) => {
  updateQueueBalanceChart(event.target.value);
});
updateQueueBalanceChart('all');

function createTopicQueueChart(containerId, series) {
  Highcharts.chart(containerId, {
    chart: { type: 'column' },
    title: { text: null },
    xAxis: { categories: hours, title: { text: null } },
    yAxis: { title: { text: 'Сообщения, шт.' }, min: 0 },
    tooltip: { shared: true, valueSuffix: ' сообщений' },
    plotOptions: {
      column: { borderWidth: 0, borderRadius: 2, groupPadding: 0.16, pointPadding: 0.08 }
    },
    legend: { enabled: series.length > 1 },
    series
  });
}

createTopicQueueChart('queue-rating-chart', [
  { name: 'Передано в ИИ', data: [420, 650, 930, 1280, 1760, 1520], color: palette.purple },
  { name: 'Обработано ИИ', data: [350, 520, 760, 990, 1410, 1210], color: palette.sky }
]);

createTopicQueueChart('queue-problems-chart', [
  { name: 'Передано в ИИ', data: [90, 170, 260, 440, 710, 440], color: palette.purple },
  { name: 'Обработано ИИ', data: [40, 100, 180, 310, 520, 360], color: palette.sky }
]);

createTopicQueueChart('queue-search-chart', [
  { name: 'Передано в ИИ', data: [130, 240, 360, 620, 930, 620], color: palette.purple },
  { name: 'Обработано ИИ', data: [80, 160, 270, 460, 740, 510], color: palette.sky }
]);

createTopicQueueChart('queue-history-chart', [
  { name: 'Передано в ИИ', data: [180, 330, 560, 890, 1240, 540], color: palette.orange }
]);

Highcharts.chart('workers-priority-chart', {
  chart: { type: 'column' },
  title: { text: null },
  xAxis: { categories: ['Worker 1: высокий', 'Worker 2: средний', 'Worker 3: низкий'], title: { text: null } },
  yAxis: { min: 0, title: { text: 'Отправлено за день, шт.' } },
  tooltip: { shared: true, valueSuffix: ' сообщений' },
  plotOptions: {
    column: { stacking: 'normal', borderWidth: 0, borderRadius: 2, groupPadding: 0.2, pointPadding: 0.08 }
  },
  series: [
    { name: 'Актуальные объекты за последние 7 дней', data: [12480, 0, 0], color: palette.purple },
    { name: 'Пропуски передачи за прошлый период', data: [0, 3260, 0], color: palette.sky },
    { name: 'Исторический остаток', data: [0, 0, 8940], color: palette.orange }
  ]
});

Highcharts.chart('hourly-limit-chart', {
  chart: { type: 'column' },
  title: { text: null },
  xAxis: { categories: dayHours, title: { text: 'Час суток' }, labels: { rotation: -45 } },
  yAxis: {
    title: { text: 'Обработано за час, шт.' },
    min: 0,
    plotLines: [
      {
        value: 75,
        color: palette.yellow,
        width: 1,
        zIndex: 4,
        dashStyle: 'ShortDash',
        label: {
          text: '75% предупреждение',
          align: 'right',
          x: -6,
          y: 12,
          style: { color: palette.yellow, fontSize: '10px' }
        }
      },
      {
        value: 90,
        color: palette.red,
        width: 1,
        zIndex: 4,
        dashStyle: 'ShortDash',
        label: {
          text: '90% критический порог',
          align: 'right',
          x: -6,
          y: -7,
          style: { color: palette.red, fontSize: '10px' }
        }
      },
      {
        value: 100,
        color: palette.slate,
        width: 2,
        zIndex: 4,
        dashStyle: 'Solid',
        label: {
          text: '100% лимит из настроек',
          align: 'right',
          x: -6,
          y: -7,
          style: { color: palette.slate, fontSize: '10px', fontWeight: '700' }
        }
      }
    ]
  },
  tooltip: { shared: true, valueSuffix: ' шт.' },
  plotOptions: {
    column: { borderWidth: 0, borderRadius: 2, pointPadding: 0.05, groupPadding: 0.12 }
  },
  series: [
    { name: 'MOSEDO_AI.RATING', data: [18, 16, 14, 13, 15, 22, 34, 42, 65, 93, 98, 96, 91, 88, 82, 77, 69, 58, 46, 38, 31, 26, 22, 19], color: palette.purple },
    { name: 'MOSEDO_AI.PROBLEMS', data: [4, 4, 3, 3, 5, 8, 12, 9, 17, 26, 44, 71, 62, 55, 48, 39, 31, 24, 19, 15, 12, 9, 7, 5], color: palette.orange },
    { name: 'MOSEDO_AI.SEARCH', data: [6, 5, 5, 6, 8, 11, 15, 13, 24, 36, 62, 93, 87, 79, 71, 58, 46, 34, 27, 21, 16, 12, 9, 7], color: '#159b80' },
    { name: 'MOSEDO_AI.HISTORY', data: [40, 45, 48, 52, 55, 60, 64, 18, 33, 56, 89, 96, 92, 88, 84, 79, 73, 69, 66, 62, 58, 54, 49, 44], color: '#8c6bb1' }
  ]
});

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
