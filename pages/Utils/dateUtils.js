import { clear } from "console";

export function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${day}-${month}`; // Output: yyyy-mm-dd

    return formattedDate;
}

export function getFutureDate(offsetDays) {

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');

    let futureDay = parseInt(day) + offsetDays;
    let futureMonth = month;
    let futureYear = year;

    switch(month)
    {
        case '02':
            if (futureDay > 28) {
                futureMonth++;
                futureDay -= 28;
            }
            break;

        case '01':
        case '03':
        case '05':
        case '07':
        case '08':
        case '10':
            if (futureDay > 31) {
                futureMonth++;
                futureDay -= 31;
            }
            break;
        case '12':
            if (futureDay > 31) {
                futureMonth++;
                futureYear++;
                futureDay -= 31;
            }
            break;

        case '04':
        case '06':
        case '09':
        case '11':
            if (futureDay > 30) {
                futureMonth++;
                futureDay -= 30;
            }
            break;

        default: break;
    }

    const formattedDate = `${futureYear}-${String(futureDay).padStart(2, '0')}-${String(futureMonth).padStart(2, '0')}`; // Output: yyyy-mm-dd

    return formattedDate;
}