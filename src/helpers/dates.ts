/**
 * Конвертация даты к формату ГГГГ.ММ.ДД.
 * @param {Date} date - Дата.
 * @returns string.
 */
export const dateToYearMonthDay = (date: Date) =>
  new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);

/**
* Конвертация даты к формату ММ.ГГГГ.
* @param {Date} date - Дата.
* @returns string.
*/
export const dateToMonthWordYear = (date: Date) =>
  new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'long'
  }).format(date);
