export function useUtility() {
  const dayMap = {
    0: 7, //Sun
    1: 1, //Mon
    2: 2, //Tue
    3: 3, //Wed
    4: 4, //Thu
    5: 5, //Fri
    6: 6 //Sat
  }

  const monthMap = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
  }

  const monthDblDigitToNameMap = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
  }

  const monthDblDigitMap = {
    0: '01',
    1: '02',
    2: '03',
    3: '04',
    4: '05',
    5: '06',
    6: '07',
    7: '08',
    8: '09',
    9: '10',
    10: '11',
    11: '12'
  }

  const monthDaysCountMap = {
    0: 31,
    1: 29,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31
  }

  function returnBlankStringIfNullOrUndefined(value) {
    if (value === null || value === undefined) {
      return ''
    }
    return value
  }
  return {
    dayMap,
    monthMap,
    monthDblDigitMap,
    monthDaysCountMap,
    monthDblDigitToNameMap,
    returnBlankStringIfNullOrUndefined
  }
}
