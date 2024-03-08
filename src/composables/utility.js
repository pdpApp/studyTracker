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

  return { dayMap, monthMap, monthDaysCountMap }
}
