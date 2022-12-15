/*
 * Your program must print string with the number of years and months and the total number of days between the dates.
 * Dates are provided in dd.mm.yyyy format.
 * You are not allowed to plug in JS libraries such as moment.js or date-fns directly into the code. All code need to be written in this file.
 *
 * Result must be shown as a string in years, months and total days. If years or months are 0, then it should not be displayed in the output.
 *
 * Example:
 * Input: ['01.01.2000', '01.01.2016']
 * Output:
 * '16 years, total 5844 days'
 *
 * Example 2:
 * Input: ['01.11.2015', '01.02.2017']
 *
 * Output:
 * '1 year, 3 months, total 458 days'
 */
const dates = [
    ['01.01.2000', '01.01.2016'],
    ['01.01.2016', '01.08.2016'],
    ['01.11.2015', '01.02.2017'],
    ['17.12.2016', '16.01.2017'],
    ['01.01.2016', '01.01.2016'],
    ['28.02.2015', '13.04.2018'],
    ['28.01.2015', '28.02.2015'],
    ['17.03.2022', '17.03.2023'],
    ['17.02.2024', '17.02.2025'],
];

// ja dienas from ir lielakas tad - menesis un dienas izvada starpibu

/**
 * @param {String} from
 * @param {String} to
 * @return {String|null}
 */
function getLengthOfDate(from, to) {
    const fromDate = getDate(getSpecificFormatOfDate(from)),
        toDate = getDate(getSpecificFormatOfDate(to));

    if (!fromDate || !toDate) {
        console.log('Dates are incorrect!');

        return null;
    }

    return `${getYearDiffText(fromDate, toDate)}${getMonthDiffText(fromDate,toDate)}${getTotalDayDiffText(fromDate, toDate)}`;
}

/**
 * Returns date to correct format that is accepted by Date object params
 * @param {String} date
 * @returns {{year: Number, month: Number, day: Number}|null}
 */
function getSpecificFormatOfDate(date) {
    if (typeof date === 'string') {
        const splitDate = date.split('.');

        return {
            year: parseInt(splitDate[2]),
            month: parseInt(splitDate[1]) - 1,
            day: parseInt(splitDate[0]),
        };
    }

    return null;
}

/**
 * @param {{year: Number, month: Number, day: Number}|null} date
 * @returns {Date|null}
 */
function getDate(date) {
    if (typeof date === 'object' && date !== null) {
        return new Date(date.year, date.month, date.day);
    }

    return null;
}

/**
 * @param {Date} fromDate
 * @param {Date} toDate
 * @returns {Number}
 */
function getYearDiff(fromDate, toDate) {
    const monthDiff = toDate.getMonth() - fromDate.getMonth();
    let decreaseValue = 0;

    if (monthDiff < 0) {
        decreaseValue = 1;
    }

    return toDate.getFullYear() - fromDate.getFullYear() - decreaseValue;
}

/**
 * @param {Date} fromDate
 * @param {Date} toDate
 * @returns {String}
 */
function getYearDiffText(fromDate, toDate) {
    const diff = getYearDiff(fromDate, toDate),
        postfixText = diff > 1 ? 'years' : 'year';

    return diff > 0 ? `${diff} ${postfixText}, ` : '';
}

/**
 * @param {Date} fromDate
 * @param {Date} toDate
 * @returns {Number}
 */
function getMonthDiff(fromDate, toDate) {
    const dayDiff = toDate.getDate() - fromDate.getDate();
    let decreaseValue = 0;
    if (dayDiff < 0) {
        decreaseValue = 1;
    }

    let monthDiff = toDate.getMonth() - fromDate.getMonth();
    if (monthDiff < 0) {
        const months = 12;
        monthDiff = months + monthDiff;
    }

    return monthDiff - decreaseValue;
}

/**
 * @param {Date} fromDate
 * @param {Date} toDate
 * @returns {String}
 */
function getMonthDiffText(fromDate, toDate) {
    const diff = getMonthDiff(fromDate, toDate),
        postfixText = diff > 1 ? 'months' : 'month';

    return diff > 0 ? `${diff} ${postfixText}, ` : '';
}

/**
 * @param {Date} fromDate
 * @param {Date} toDate
 * @returns {Number}
 */
function getTotalDayDiff(fromDate, toDate) {
    const oneDayInMs = 1000 * 60 * 60 * 24;

    return Math.ceil((toDate - fromDate) / oneDayInMs);
}

/**
 * @param {Date} fromDate
 * @param {Date} toDate
 * @returns {String}
 */
function getTotalDayDiffText(fromDate, toDate) {
    const diff = getTotalDayDiff(fromDate, toDate),
        postfixText = diff > 1 || diff === 0 ? 'days' : 'day';

    return diff > 0 || diff === 0? `total ${diff} ${postfixText}` : '';
}

// Receive string of dates one after each other
function outputDate(dates) {
    return getLengthOfDate(...dates);
}
