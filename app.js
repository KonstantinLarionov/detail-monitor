const palette = {
  purple: '#7770a4',
  lightPurple: '#bfc0d7',
  orange: '#ff9018',
  lightOrange: '#ffd3a4',
  sky: '#62b4df',
  lightSky: '#c9e8f7',
  red: '#db2d4d',
  green: '#159b80',
  yellow: '#e3a21a',
  slate: '#5d7594'
};

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

const historyLetters = [42, 45, 49, 52, 55, 61, 64, 58, 66, 72, 84, 96, 91, 88, 82, 77, 69, 58, 46, 38, 31, 27, 23, 20];
const historyAnswers = [34, 36, 39, 41, 45, 48, 52, 46, 53, 60, 71, 89, 84, 79, 74, 68, 61, 51, 42, 35, 29, 24, 20, 18];
const historyLetterLimit = Array(24).fill(100);
const historyAnswerLimit = Array(24).fill(90);

Highcharts.chart('hourly-limit-chart', {
  chart: { type: 'column' },
  title: { text: null },
  xAxis: { categories: dayHours, title: { text: 'Час суток' }, labels: { rotation: -45 } },
  yAxis: { min: 0, title: { text: 'Обработано за час, шт.' } },
  tooltip: { shared: true, valueSuffix: ' шт.' },
  plotOptions: {
    column: {
      borderWidth: 0,
      borderRadius: 2,
      grouping: false
    }
  },
  series: [
    { name: 'Лимит обращений', data: historyLetterLimit, color: palette.lightPurple, pointWidth: 28, pointPlacement: -0.24, zIndex: 1 },
    { name: 'Обращения', data: historyLetters, color: palette.purple, pointWidth: 16, pointPlacement: -0.24, zIndex: 3 },
    { name: 'Лимит ответов', data: historyAnswerLimit, color: palette.lightSky, pointWidth: 28, pointPlacement: 0.24, zIndex: 1 },
    { name: 'Ответы', data: historyAnswers, color: palette.sky, pointWidth: 16, pointPlacement: 0.24, zIndex: 3 }
  ]
});

const historyErrorObjects = [
  { hour: '08:00', letterId: '88014102', answerId: '-', type: 'Обращение', queue: 'MOSEDO_AI.HISTORY', reason: 'Не удалось сформировать пакет истории обращения', status: 'Ошибка' },
  { hour: '08:00', letterId: '88014105', answerId: '99045110', type: 'Ответ', queue: 'MOSEDO_AI.HISTORY', reason: 'Ответ не найден в исторической выгрузке', status: 'Ошибка' },
  { hour: '09:00', letterId: '88014118', answerId: '-', type: 'Обращение', queue: 'MOSEDO_AI.HISTORY', reason: 'Нет связанной карточки обращения', status: 'Ошибка' },
  { hour: '10:00', letterId: '88014131', answerId: '99045139', type: 'Ответ', queue: 'MOSEDO_AI.HISTORY', reason: 'Истек таймаут обработки ответа', status: 'Ошибка' },
  { hour: '10:00', letterId: '88014142', answerId: '-', type: 'Обращение', queue: 'MOSEDO_AI.HISTORY', reason: 'Ошибка чтения исторического статуса', status: 'Ошибка' },
  { hour: '11:00', letterId: '88014153', answerId: '99045163', type: 'Ответ', queue: 'MOSEDO_AI.HISTORY', reason: 'Не получено подтверждение обработки ответа', status: 'Ошибка' },
  { hour: '11:00', letterId: '88014158', answerId: '-', type: 'Обращение', queue: 'MOSEDO_AI.HISTORY', reason: 'Дублирование идентификатора в истории', status: 'Ошибка' },
  { hour: '12:00', letterId: '88014171', answerId: '-', type: 'Обращение', queue: 'MOSEDO_AI.HISTORY', reason: 'Некорректный формат даты отправки', status: 'Ошибка' },
  { hour: '12:00', letterId: '88014176', answerId: '99045188', type: 'Ответ', queue: 'MOSEDO_AI.HISTORY', reason: 'Ответ привязан к архивному обращению без текста', status: 'Ошибка' },
  { hour: '12:00', letterId: '88014183', answerId: '99045195', type: 'Ответ', queue: 'MOSEDO_AI.HISTORY', reason: 'Ошибка сериализации текста ответа', status: 'Ошибка' },
  { hour: '13:00', letterId: '88014204', answerId: '-', type: 'Обращение', queue: 'MOSEDO_AI.HISTORY', reason: 'Не найдено вложение из исторического пакета', status: 'Ошибка' },
  { hour: '13:00', letterId: '88014209', answerId: '99045217', type: 'Ответ', queue: 'MOSEDO_AI.HISTORY', reason: 'Истек таймаут записи результата обработки', status: 'Ошибка' }
];

const historyErrorReasons = [...new Set(historyErrorObjects.map((item) => item.reason))];
const historyReasonFilter = document.getElementById('history-error-reason-filter');
const historyTypeFilter = document.getElementById('history-error-type-filter');
const historyHourFilter = document.getElementById('history-error-hour-filter');
historyErrorReasons.forEach((reason) => {
  const option = document.createElement('option');
  option.value = reason;
  option.textContent = reason;
  historyReasonFilter.appendChild(option);
});
dayHours.forEach((hour) => {
  const option = document.createElement('option');
  option.value = hour;
  option.textContent = hour;
  historyHourFilter.appendChild(option);
});

let selectedHistoryErrorHour = 'all';
let selectedHistoryErrorReason = 'all';
let selectedHistoryErrorType = 'all';

function renderHistoryErrorsTable(type = 'all', hour = 'all', reason = 'all') {
  const rows = historyErrorObjects.filter((item) => {
    const hourMatches = hour === 'all' || item.hour === hour;
    const reasonMatches = reason === 'all' || item.reason === reason;
    const typeMatches = type === 'all' || item.type === type;
    return hourMatches && reasonMatches && typeMatches;
  });
  const title = document.getElementById('history-errors-table-title');
  const body = document.getElementById('history-errors-table-body');
  const hourText = hour === 'all' ? 'по всем часам' : `за ${hour}`;
  const typeText = type === 'all' ? 'все объекты' : type.toLowerCase();
  const reasonText = reason === 'all' ? '' : `, причина: ${reason}`;
  title.textContent = `Ошибки интеграции с ИИ: ${typeText}, ${hourText}${reasonText}`;
  body.innerHTML = rows.length ? rows.map((item) => `<tr>
      <td>${item.hour}</td>
      <td>${item.letterId}</td>
      <td>${item.answerId}</td>
      <td>${item.type}</td>
      <td>${item.queue}</td>
      <td>${item.reason}</td>
      <td class="danger-text">${item.status}</td>
    </tr>`).join('') : '<tr><td colspan="7" class="text-muted">Ошибки по выбранным фильтрам не найдены</td></tr>';
}

function getHistoryErrorSeries(reason = 'all') {
  return [
    {
      name: 'Обращение',
      data: dayHours.map((hour) => historyErrorObjects.filter((item) => {
        const reasonMatches = reason === 'all' || item.reason === reason;
        return item.hour === hour && item.type === 'Обращение' && reasonMatches;
      }).length),
      color: palette.purple
    },
    {
      name: 'Ответ',
      data: dayHours.map((hour) => historyErrorObjects.filter((item) => {
        const reasonMatches = reason === 'all' || item.reason === reason;
        return item.hour === hour && item.type === 'Ответ' && reasonMatches;
      }).length),
      color: palette.sky
    }
  ];
}

const historyErrorsChart = Highcharts.chart('history-errors-chart', {
  chart: { type: 'column' },
  title: { text: null },
  xAxis: { categories: dayHours, title: { text: 'Час суток' }, labels: { rotation: -45 } },
  yAxis: { min: 0, allowDecimals: false, title: { text: 'Ошибки, шт.' } },
  tooltip: { shared: true, valueSuffix: ' ошибок' },
  plotOptions: {
    column: {
      borderWidth: 0,
      borderRadius: 2,
      cursor: 'pointer',
      point: {
        events: {
          click() {
            selectedHistoryErrorHour = this.category;
            selectedHistoryErrorType = this.series.name;
            historyHourFilter.value = selectedHistoryErrorHour;
            historyTypeFilter.value = selectedHistoryErrorType;
            renderHistoryErrorsTable(selectedHistoryErrorType, selectedHistoryErrorHour, selectedHistoryErrorReason);
          }
        }
      }
    }
  },
  series: getHistoryErrorSeries()
});

historyReasonFilter.addEventListener('change', (event) => {
  selectedHistoryErrorReason = event.target.value;
  selectedHistoryErrorHour = 'all';
  selectedHistoryErrorType = 'all';
  historyHourFilter.value = selectedHistoryErrorHour;
  historyTypeFilter.value = selectedHistoryErrorType;
  while (historyErrorsChart.series.length) {
    historyErrorsChart.series[0].remove(false);
  }
  getHistoryErrorSeries(selectedHistoryErrorReason).forEach((series) => historyErrorsChart.addSeries(series, false));
  historyErrorsChart.redraw();
  renderHistoryErrorsTable(selectedHistoryErrorType, selectedHistoryErrorHour, selectedHistoryErrorReason);
});

historyTypeFilter.addEventListener('change', (event) => {
  selectedHistoryErrorType = event.target.value;
  renderHistoryErrorsTable(selectedHistoryErrorType, selectedHistoryErrorHour, selectedHistoryErrorReason);
});

historyHourFilter.addEventListener('change', (event) => {
  selectedHistoryErrorHour = event.target.value;
  renderHistoryErrorsTable(selectedHistoryErrorType, selectedHistoryErrorHour, selectedHistoryErrorReason);
});

renderHistoryErrorsTable(selectedHistoryErrorType, selectedHistoryErrorHour, selectedHistoryErrorReason);

const flkObjects = [
  { letterId: '88013210', answerId: '-', objectType: 'Обращение', reason: 'Нет текста обращения', checkedAt: '14.05.2026 08:12' },
  { letterId: '88013211', answerId: '-', objectType: 'Обращение', reason: 'Нет даты регистрации обращения', checkedAt: '14.05.2026 08:19' },
  { letterId: '88013219', answerId: '-', objectType: 'Обращение', reason: 'Нет идентификатора обращения', checkedAt: '14.05.2026 08:36' },
  { letterId: '88013220', answerId: '-', objectType: 'Обращение', reason: 'Нет категории обращения', checkedAt: '14.05.2026 08:44' },
  { letterId: '88013225', answerId: '-', objectType: 'Обращение', reason: 'Нет текста обращения', checkedAt: '14.05.2026 09:13' },
  { letterId: '88013213', answerId: '99043100', objectType: 'Ответ', reason: 'Нет текста ответа', checkedAt: '14.05.2026 09:04' },
  { letterId: '88013214', answerId: '99043101', objectType: 'Ответ', reason: 'Нет даты ответа', checkedAt: '14.05.2026 09:22' },
  { letterId: '88013221', answerId: '99043106', objectType: 'Ответ', reason: 'Нет идентификатора ответа', checkedAt: '14.05.2026 09:53' },
  { letterId: '88013222', answerId: '99043107', objectType: 'Ответ', reason: 'Нет признака подписания ответа', checkedAt: '14.05.2026 10:02' },
  { letterId: '88013216', answerId: '99043103', objectType: 'Ответ', reason: 'Ответ не сопоставлен с обращением', checkedAt: '14.05.2026 10:11' },
  { letterId: '88013217', answerId: '99043104', objectType: 'Ответ', reason: 'Связанное обращение не найдено в регистрационных данных', checkedAt: '14.05.2026 10:38' },
  { letterId: '88013223', answerId: '99043108', objectType: 'Ответ', reason: 'Ответ привязан к закрытому обращению', checkedAt: '14.05.2026 11:17' }
];

const flkReasonFilter = document.getElementById('flk-reason-filter');
[...new Set(flkObjects.map((item) => item.reason))].forEach((reason) => {
  const option = document.createElement('option');
  option.value = reason;
  option.textContent = reason;
  flkReasonFilter.appendChild(option);
});

let selectedFlkType = 'all';
let selectedFlkReason = 'all';

function renderFlkTable(type = 'all', reason = 'all') {
  const rows = flkObjects.filter((item) => {
    const typeMatches = type === 'all' || item.objectType === type;
    const reasonMatches = reason === 'all' || item.reason === reason;
    return typeMatches && reasonMatches;
  });
  const title = document.getElementById('flk-table-title');
  const body = document.getElementById('flk-table-body');
  const typeText = type === 'all' ? 'все объекты' : type.toLowerCase();
  const reasonText = reason === 'all' ? 'все причины' : reason;
  title.textContent = `Объекты, не прошедшие ФЛК: ${typeText}, ${reasonText}`;
  body.innerHTML = rows.map((item) => {
    return `<tr>
      <td>${item.letterId}</td>
      <td>${item.answerId}</td>
      <td>${item.objectType}</td>
      <td>${item.objectType === 'Обращение' ? 'Обязательные поля обращения' : 'Обязательные поля ответа / связь'}</td>
      <td>${item.reason}</td>
      <td>${item.checkedAt}</td>
    </tr>`;
  }).join('') || '<tr><td colspan="6" class="text-muted">Объекты по выбранным фильтрам не найдены</td></tr>';
}

Highcharts.chart('flk-day-chart', {
  chart: { type: 'column' },
  title: { text: null },
  xAxis: { categories: ['Обращения', 'Ответы'], title: { text: null } },
  yAxis: { min: 0, allowDecimals: false, title: { text: 'Не прошли ФЛК, шт.' } },
  tooltip: { valueSuffix: ' шт.' },
  plotOptions: {
    column: {
      borderWidth: 0,
      borderRadius: 2,
      cursor: 'pointer',
      point: {
        events: {
          click() {
            selectedFlkType = this.category === 'Обращения' ? 'Обращение' : 'Ответ';
            document.getElementById('flk-type-filter').value = selectedFlkType;
            renderFlkTable(selectedFlkType, selectedFlkReason);
          }
        }
      }
    }
  },
  series: [
    {
      name: 'Не прошли ФЛК',
      data: [
        { name: 'Обращения', y: flkObjects.filter((item) => item.objectType === 'Обращение').length, color: palette.purple },
        { name: 'Ответы', y: flkObjects.filter((item) => item.objectType === 'Ответ').length, color: palette.sky }
      ]
    }
  ]
});

document.getElementById('flk-type-filter').addEventListener('change', (event) => {
  selectedFlkType = event.target.value;
  renderFlkTable(selectedFlkType, selectedFlkReason);
});

flkReasonFilter.addEventListener('change', (event) => {
  selectedFlkReason = event.target.value;
  renderFlkTable(selectedFlkType, selectedFlkReason);
});

renderFlkTable(selectedFlkType, selectedFlkReason);

const endpointRequests = [
  { id: '77018421', hour: '12:00', group: '1023', queue: '1023 REST API', endpoint: 'POST /rate', feature: 'Оценка ответа', speed: 264, time: '1,8 сек.', status: 'Успешно' },
  { id: '77018422', hour: '12:00', group: '1023', queue: '1023 REST API', endpoint: 'POST /wordcloud', feature: 'Тематический поиск', speed: 171, time: '1,1 сек.', status: 'Успешно' },
  { id: '77018428', hour: '12:00', group: '1023', queue: '1023 REST API', endpoint: 'POST /rate', feature: 'Оценка ответа', speed: 138, time: '2,2 сек.', status: 'Успешно' },
  { id: '77018429', hour: '12:00', group: '1023', queue: '1023 REST API', endpoint: 'POST /cancel', feature: 'Отмена сообщений в очереди', speed: 112, time: '0,8 сек.', status: 'Успешно' },
  { id: '77018434', hour: '12:00', group: '1023', queue: '1023 REST API', endpoint: 'POST /rate', feature: 'Оценка ответа', speed: 92, time: '2,9 сек.', status: 'Успешно' },
  { id: '77018435', hour: '12:00', group: '1023', queue: '1023 REST API', endpoint: 'POST /wordcloud', feature: 'Тематический поиск', speed: 76, time: '3,4 сек.', status: 'Ошибка' },
  { id: '77018436', hour: '12:00', group: '1023', queue: '1023 REST API', endpoint: 'POST /cancel', feature: 'Отмена сообщений в очереди', speed: 48, time: '4,6 сек.', status: 'Успешно' },
  { id: '77018437', hour: '12:00', group: '1023', queue: '1023 REST API', endpoint: 'POST /rate', feature: 'Оценка ответа', speed: 221, time: '1,5 сек.', status: 'Успешно' },
  { id: '77018423', hour: '12:00', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 152, time: '4,2 сек.', status: 'Успешно' },
  { id: '77018424', hour: '12:00', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 121, time: '2,1 сек.', status: 'Успешно' },
  { id: '77018430', hour: '12:00', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 146, time: '4,8 сек.', status: 'Успешно' },
  { id: '77018431', hour: '12:00', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 169, time: '2,4 сек.', status: 'Ошибка' },
  { id: '77018438', hour: '12:00', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 94, time: '5,1 сек.', status: 'Успешно' },
  { id: '77018439', hour: '12:00', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 83, time: '5,8 сек.', status: 'Успешно' },
  { id: '77018440', hour: '12:00', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 47, time: '8,2 сек.', status: 'Ошибка' },
  { id: '77018441', hour: '12:00', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 188, time: '1,9 сек.', status: 'Успешно' },
  { id: '77018425', hour: '12:00', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.SEARCH', feature: 'Поиск по ключевым словам', speed: 62, time: '5,8 сек.', status: 'Ошибка' },
  { id: '77018426', hour: '12:00', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.PROBLEMS', feature: 'Отчет по категориям', speed: 44, time: '9,4 сек.', status: 'Успешно' },
  { id: '77018427', hour: '12:00', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.HISTORY', feature: 'Загрузка исторических данных', speed: 54, time: '7,6 сек.', status: 'Успешно' },
  { id: '77018432', hour: '12:00', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.SEARCH', feature: 'Поиск по ключевым словам', speed: 86, time: '3,1 сек.', status: 'Успешно' },
  { id: '77018433', hour: '12:00', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.PROBLEMS', feature: 'Отчет по категориям', speed: 38, time: '8,7 сек.', status: 'Успешно' },
  { id: '77018442', hour: '12:00', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.HISTORY', feature: 'Загрузка исторических данных', speed: 31, time: '11,6 сек.', status: 'Успешно' },
  { id: '77018443', hour: '12:00', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.SEARCH', feature: 'Поиск по ключевым словам', speed: 117, time: '4,3 сек.', status: 'Успешно' },
  { id: '77018444', hour: '12:00', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.PROBLEMS', feature: 'Отчет по категориям', speed: 132, time: '6,9 сек.', status: 'Ошибка' },
  { id: '77018445', hour: '12:00', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.SEARCH', feature: 'Поиск по ключевым словам', speed: 156, time: '3,7 сек.', status: 'Успешно' },
  { id: '77018446', hour: '12:00', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.HISTORY', feature: 'Загрузка исторических данных', speed: 72, time: '7,1 сек.', status: 'Успешно' },
  { id: '77018501', hour: '11:00', group: '1023', queue: '1023 REST API', endpoint: 'POST /rate', feature: 'Оценка ответа', speed: 204, time: '1,4 сек.', status: 'Успешно' },
  { id: '77018502', hour: '11:00', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 104, time: '3,8 сек.', status: 'Успешно' },
  { id: '77018503', hour: '11:00', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.SEARCH', feature: 'Поиск по ключевым словам', speed: 58, time: '6,2 сек.', status: 'Успешно' },
  { id: '77018504', hour: '13:00', group: '1023', queue: '1023 REST API', endpoint: 'POST /wordcloud', feature: 'Тематический поиск', speed: 233, time: '1,6 сек.', status: 'Успешно' },
  { id: '77018505', hour: '13:00', group: '93', queue: '93 ответы и рекомендации', endpoint: 'MOSEDO_AI.RATING', feature: 'Оценка ответа и получение рекомендаций', speed: 142, time: '3,2 сек.', status: 'Успешно' },
  { id: '77018506', hour: '13:00', group: '265', queue: '265 остальные сценарии', endpoint: 'MOSEDO_AI.PROBLEMS', feature: 'Отчет по категориям', speed: 27, time: '12,1 сек.', status: 'Ошибка' }
];

const speedBuckets = ['0-25', '25-50', '50-75', '75-100', '100-125', '125-150', '150-175', '175-200', '200-225', '225+'];
const endpointQueueFilter = document.getElementById('endpoint-table-queue-filter');
const endpointSpeedFilter = document.getElementById('endpoint-table-speed-filter');
const endpointStatusFilter = document.getElementById('endpoint-table-status-filter');
speedBuckets.forEach((bucket) => {
  const option = document.createElement('option');
  option.value = bucket;
  option.textContent = `${bucket} сообщ./мин.`;
  endpointSpeedFilter.appendChild(option);
});

function getSpeedBucket(speed) {
  if (speed < 25) return '0-25';
  if (speed < 50) return '25-50';
  if (speed < 75) return '50-75';
  if (speed < 100) return '75-100';
  if (speed < 125) return '100-125';
  if (speed < 150) return '125-150';
  if (speed < 175) return '150-175';
  if (speed < 200) return '175-200';
  if (speed < 225) return '200-225';
  return '225+';
}

function getEndpointChartSeries(hourFilter = '12:00') {
  const queues = ['1023 REST API', '93 ответы и рекомендации', '265 остальные сценарии'];
  return queues.map((queue) => ({
    name: queue,
    data: speedBuckets.map((bucket) => {
      return endpointRequests.filter((item) => item.hour === hourFilter && item.queue === queue && getSpeedBucket(item.speed) === bucket).length;
    }),
    color: queue === '1023 REST API' ? palette.purple : queue === '93 ответы и рекомендации' ? palette.orange : palette.sky
  }));
}

function renderEndpointTable(hourFilter = '12:00', speedBucket = 'all', queueFilter = 'all', statusFilter = 'all') {
  const rows = endpointRequests.filter((item) => {
    const hourMatches = item.hour === hourFilter;
    const speedMatches = speedBucket === 'all' || getSpeedBucket(item.speed) === speedBucket;
    const queueMatches = queueFilter === 'all' || item.queue === queueFilter;
    const statusMatches = statusFilter === 'all' || item.status === statusFilter;
    return hourMatches && speedMatches && queueMatches && statusMatches;
  });
  const title = document.getElementById('endpoints-table-title');
  const body = document.getElementById('endpoints-table-body');
  const queueText = queueFilter === 'all' ? 'всем сценариям' : queueFilter;
  const speedText = speedBucket === 'all' ? 'всем диапазонам скорости' : `скорости ${speedBucket} сообщ./мин.`;
  const statusText = statusFilter === 'all' ? 'все статусы' : statusFilter.toLowerCase();
  title.textContent = `Обращения за ${hourFilter}: ${queueText}, ${speedText}, ${statusText}`;
  body.innerHTML = rows.length ? rows.map((item) => {
    const statusClass = item.status === 'Ошибка' ? ' class="danger-text"' : '';
    return `<tr>
      <td>${item.id}</td>
      <td><b>${item.group}</b></td>
      <td>${item.endpoint}</td>
      <td>${item.feature}</td>
      <td>${item.speed} сообщ./мин.</td>
      <td>${item.time}</td>
      <td${statusClass}>${item.status}</td>
    </tr>`;
  }).join('') : '<tr><td colspan="7" class="text-muted">В выбранный час и диапазон обращений не попало</td></tr>';
}

let selectedEndpointHour = '12:00';
let selectedEndpointSpeed = 'all';
let selectedEndpointQueue = 'all';
let selectedEndpointStatus = 'all';

const endpointsChart = Highcharts.chart('endpoints-chart', {
  chart: { type: 'column' },
  title: { text: null },
  xAxis: {
    categories: speedBuckets,
    title: { text: 'Скорость обработки, сообщ./мин.' }
  },
  yAxis: { title: { text: 'Количество обращений, шт.' }, min: 0, allowDecimals: false },
  tooltip: {
    shared: true,
    formatter() {
      return `<b>${this.x} сообщ./мин.</b><br>${this.points.map((point) => {
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
            selectedEndpointSpeed = this.category;
            selectedEndpointQueue = this.series.name;
            endpointSpeedFilter.value = selectedEndpointSpeed;
            endpointQueueFilter.value = selectedEndpointQueue;
            renderEndpointTable(selectedEndpointHour, selectedEndpointSpeed, selectedEndpointQueue, selectedEndpointStatus);
          }
        }
      }
    }
  },
  series: getEndpointChartSeries(selectedEndpointHour)
});

document.getElementById('endpoint-hour-filter').addEventListener('change', (event) => {
  selectedEndpointHour = event.target.value;
  selectedEndpointSpeed = 'all';
  selectedEndpointQueue = 'all';
  selectedEndpointStatus = 'all';
  endpointSpeedFilter.value = selectedEndpointSpeed;
  endpointQueueFilter.value = selectedEndpointQueue;
  endpointStatusFilter.value = selectedEndpointStatus;
  while (endpointsChart.series.length) {
    endpointsChart.series[0].remove(false);
  }
  getEndpointChartSeries(selectedEndpointHour).forEach((series) => endpointsChart.addSeries(series, false));
  endpointsChart.redraw();
  renderEndpointTable(selectedEndpointHour, selectedEndpointSpeed, selectedEndpointQueue, selectedEndpointStatus);
});

endpointQueueFilter.addEventListener('change', (event) => {
  selectedEndpointQueue = event.target.value;
  renderEndpointTable(selectedEndpointHour, selectedEndpointSpeed, selectedEndpointQueue, selectedEndpointStatus);
});

endpointSpeedFilter.addEventListener('change', (event) => {
  selectedEndpointSpeed = event.target.value;
  renderEndpointTable(selectedEndpointHour, selectedEndpointSpeed, selectedEndpointQueue, selectedEndpointStatus);
});

endpointStatusFilter.addEventListener('change', (event) => {
  selectedEndpointStatus = event.target.value;
  renderEndpointTable(selectedEndpointHour, selectedEndpointSpeed, selectedEndpointQueue, selectedEndpointStatus);
});

renderEndpointTable(selectedEndpointHour, selectedEndpointSpeed, selectedEndpointQueue, selectedEndpointStatus);

function createTopicQueueChart(containerId, series) {
  Highcharts.chart(containerId, {
    chart: { type: 'column' },
    title: { text: null },
    xAxis: { categories: dayHours, title: { text: null }, labels: { rotation: -45 } },
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
  { name: 'Передано в ИИ', data: [120, 110, 105, 98, 130, 180, 260, 340, 420, 650, 930, 1280, 1760, 1520, 1410, 1320, 1180, 980, 760, 580, 420, 310, 220, 160], color: palette.purple },
  { name: 'Обработано ИИ', data: [90, 85, 82, 76, 105, 145, 210, 280, 350, 520, 760, 990, 1410, 1210, 1160, 1080, 980, 810, 640, 510, 380, 290, 205, 150], color: palette.sky }
]);

createTopicQueueChart('queue-problems-chart', [
  { name: 'Передано в ИИ', data: [20, 18, 16, 15, 24, 38, 55, 72, 90, 170, 260, 440, 710, 440, 390, 330, 280, 220, 170, 120, 85, 60, 42, 30], color: palette.purple },
  { name: 'Обработано ИИ', data: [12, 11, 10, 9, 17, 28, 38, 50, 40, 100, 180, 310, 520, 360, 330, 280, 230, 190, 140, 96, 70, 48, 33, 22], color: palette.sky }
]);

createTopicQueueChart('queue-search-chart', [
  { name: 'Передано в ИИ', data: [35, 31, 28, 26, 40, 58, 84, 110, 130, 240, 360, 620, 930, 620, 570, 480, 410, 330, 250, 180, 130, 95, 68, 44], color: palette.purple },
  { name: 'Обработано ИИ', data: [22, 20, 18, 17, 30, 44, 62, 82, 80, 160, 270, 460, 740, 510, 480, 405, 350, 285, 210, 150, 108, 78, 55, 36], color: palette.sky }
]);

createTopicQueueChart('queue-history-chart', [
  { name: 'Передано в HISTORY.IN', data: [70, 74, 82, 91, 105, 130, 150, 165, 180, 330, 560, 890, 1240, 540, 500, 460, 420, 380, 340, 300, 260, 210, 160, 110], color: palette.orange },
  { name: 'Получено из RATING.OUT', data: [52, 56, 60, 68, 78, 98, 116, 130, 142, 260, 430, 690, 980, 460, 425, 390, 355, 320, 286, 250, 214, 172, 128, 88], color: palette.sky }
]);

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
