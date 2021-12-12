const timesAll = /([0-9]+):([0-9]+):([0-9]+),([0-9]+)/g;
const times = /([0-9]+):([0-9]+):([0-9]+),([0-9]+)/;
export const SEP = /\n[0-9]{1,6}\n/;
export const SEP2 = /\n[0-9]{1,6}?\s\n/;

function getSec(str) {
  const s = str.match(timesAll);
  if (!s) return 0;
  const dates = [];
  if (s.length) {
    const d = new Date();
    const t = s[0].match(times);
    d.setHours(t[1], t[2], t[3], t[4]);
    dates.push(d);
  }
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  dates.push(d);
  return dates[0].getTime() - dates[1].getTime();
}

let ii = 0;

export function searchByTime(str, strArr) {
  const msFrom = getSec(str);
  let found = false;
  for (let i = ii; i < strArr.length; i += 1) {
    const s2 = getSec(strArr[i]);
    const msDiff = msFrom - s2;
    if (msDiff < 500) {
      ii = i;
      found = strArr[i];
      break;
    }
  }
  return found;
}

export function fixSubs(subs) {
  ii = 0;
  const [fileFrom, file2] = subs;
  let sepVariant = SEP;
  let strArr = fileFrom.bstr.split(sepVariant);
  let strArr2 = file2.bstr.split(sepVariant);
  if (strArr.length === 1) {
    sepVariant = SEP2;
    strArr = fileFrom.bstr.split(sepVariant);
    strArr2 = file2.bstr.split(sepVariant);
  }
  const newStrArr2 = [];
  for (let i = 0; i < strArr.length; i += 1) {
    newStrArr2.push(searchByTime(strArr[i], strArr2, i));
  }
  const newFile = {
    bstr: newStrArr2.join('\n\n'),
    filename: file2.filename,
    fixed: true,
  };
  return {
    subs: [fileFrom, newFile],
    sepVariant,
  };
}

export function fixTags(text) {
  return text.replace(/<i>|<\/i>/gu, '');
}
