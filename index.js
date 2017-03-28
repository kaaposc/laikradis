var args = process.argv.slice(2);
var now = new Date();
if (args[0]) {
  try {
    var dateTime = '2000-1-1 ' + args[0];
    now = new Date(dateTime);
  }
  catch(e) {
    console.error('Error:', e);
  }
}
var hour = now.getHours();
var minutes = now.getMinutes();

var hoursVerbal = {
  'N': ['divpadsmit', 'viens', 'divi', 'trīs', 'četri', 'pieci', 'seši', 'septiņi', 'astoņi', 'deviņi', 'desmit', 'vienpadsmit'],
  'D': ['-iem', 'vieniem', '-em', 'trim', '-em', '-em', '-em', '-em', '-em', '-em', '-iem', '-iem']
};

var minutesVerbal = {
  'P': ['', 'viena', 'divas', 'trīs', 'četras', 'piecas', 'sešas', 'septiņas', 'astoņas', 'deviņas', 'desmit', 'vienpadsmit', 'divpadsmit', 'trīspadsmit', 'četrpadsmit', 'ceturksnis', 'sešpadsmit', 'septiņpadsmit', 'astoņpadsmit', 'deviņpadsmit', 'divdesmit'],
  'B': ['', 'vienas', 'divām', 'trim', 'četrām', 'piecām', 'sešām', 'septiņām', 'astoņām', 'deviņām', 'desmit', 'vienpadsmit', 'divpadsmit', 'trīspadsmit', 'četrpadsmit', 'ceturkšņa', 'sešpadsmit', 'septiņpadsmit', 'astoņpadsmit', 'deviņpadsmit', 'divdesmit']
}

dayTime = function (hour) {
  if (hour >= 4 && hour < 10) {
    return " no rīta";
  } else if (hour >= 10 && hour < 18) {
    return " dienā";
  } else if (hour >= 18 && hour < 23) {
    return " vakarā";
  } else {
    return " naktī";
  }
}

hourComputed = function (hour, minutes) {
  hourReduced = hour - 12 * Math.floor(hour / 12);
  nextHour = hourReduced + (hourReduced == 11 ? -11 : 1);
  if (minutes <= 20) {
    if (hour == 12) {
      return 'pusdienai';
    } else if (hour == 0) {
      return 'pusnaktij';
    }
    var hourIndex = hoursVerbal.D[hourReduced];
    if (hourIndex.substr(0, 1) === '-') {
      return hoursVerbal.N[hourReduced] + hoursVerbal.D[hourReduced].substring(1) + dayTime(hour);
    } else {
      return hoursVerbal.D[hourReduced] + dayTime(hour);
    }
  } else if (minutes <= 30) {
    return 'pus ' + hoursVerbal.N[nextHour] + dayTime(hour + 1);
  } else if (minutes < 40) {
    var hourIndex = hoursVerbal.D[nextHour];
    if (hourIndex.substr(0, 1) === '-') {
      return 'pus ' + hoursVerbal.N[nextHour] + hoursVerbal.D[nextHour].substring(1) + dayTime(hour + 1);
    } else {
      return 'pus ' + hoursVerbal.D[nextHour] + dayTime(hour + 1);
    }
  } else {
    if (hour + 1 == 12) {
      return 'pusdiena';
    } else if (hour + 1 == 24) {
      return 'pusnakts';
    }
    return hoursVerbal.N[nextHour] + dayTime(hour + 1);
  }
}

var result = '';
if (minutes === 0) {
  if (hour == 0) {
    result = 'tieši pusnakts';
  } else if (hour == 12) {
    result = 'tieši pusdiena';
  } else {
    result = 'tieši ' + hoursVerbal.N[hour - 12 * Math.floor(hour / 12)] + dayTime(hour);
  }
} else if (minutes <= 20 || (minutes < 40 && minutes > 30)) {
  result = minutesVerbal.P[minutes - 30 * Math.floor(minutes / 30)] + ' pāri ' + hourComputed(hour, minutes);
} else if (minutes <= 30 || minutes >= 40) {
  result = (minutes == 30 ? '' : 'bez ' + minutesVerbal.B[30 - (minutes - 30 * Math.floor(minutes / 30))]) + ' ' + hourComputed(hour, minutes);
}

console.log('Laiks: ', result);

