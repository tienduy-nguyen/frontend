const primaryColor = '#4834d4';
const warningColor = '#f0932b';
const successColor = '#6ab04c';
const dangerColor = '#eb4d4b';
const themeCookieName = 'theme';
const themeDark = 'dark';
const themeLight = 'light';
const body = document.getElementsByTagName('body')[0];

function setCookie(name, value, days = 30) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

loadTheme();
function loadTheme() {
  let theme = getCookie(themeCookieName);
  body.classList.add(theme === '' ? themeLight : theme);
}

function switchTheme() {
  if (body.classList.contains(themeLight)) {
    body.classList.remove(themeLight);
    body.classList.add(themeDark);
    setCookie(themeCookieName, themeDark);
  } else {
    body.classList.remove(themeDark);
    body.classList.add(themeLight);
    setCookie(themeCookieName, themeLight);
  }
}
function collapseSidebar() {
  body.classList.toggle('sidebar-expand');
}

window.onclick = function (event) {
  openCloseDropdown(event);
};

function closeAllDropdown() {
  let dropdowns = document.getElementsByClassName('dropdown-expand');
  for (let item of dropdowns) {
    item.classList.remove('dropdown-expand');
  }
}

function openCloseDropdown(event) {
  if (!event.target.matches('.dropdown-toggle')) {
    // Close dropdown when click out of dropdown menu
    closeAllDropdown();
  } else {
    let toggle = event.target.dataset.toggle;
    let content = document.getElementById(toggle);
    if (content.classList.contains('dropdown-expand')) {
      closeAllDropdown();
    } else {
      closeAllDropdown();
      content.classList.add('dropdown-expand');
    }
  }
}

var ctx = document.getElementById('myChart');
ctx.height = 500;
ctx.width = 500;
var data = {
  labels: [
    'January',
    'February',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  datasets: [
    {
      fill: false,
      label: 'Completed',
      borderColor: successColor,
      data: [120, 115, 130, 100, 123, 88, 99, 66, 120, 52, 59],
      borderWidth: 2,
      lineTension: 0,
    },
    {
      fill: false,
      label: 'Issues',
      borderColor: dangerColor,
      data: [66, 44, 12, 48, 99, 56, 78, 23, 100, 22, 47],
      borderWidth: 2,
      lineTension: 0,
    },
  ],
};

var lineChart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
    maintainAspectRatio: false,
    bezierCurve: false,
  },
});
