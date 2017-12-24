/**
 * Created by anytime on 16/9/20.
 */
export default class DatetimeUtil {
    static getWeekNumFromTermBegin(termBeginDate) {

        let time = (new Date()).getTime() - termBeginDate.getTime(); // Date().getTime()得到的是毫秒数

        let day = Math.ceil(time / 24 / 60 / 60 / 1000.0) - 1; // 天前


        let week = parseInt(day / 7);

        return week + 1;

    }

    static getDayNumToTermBegin(termBeginDate) {

        let time = termBeginDate.getTime() - Date().getTime();

        let day = parseInt(Math.ceil(time / 24 / 60 / 60 / 1000.0)); // 天前

        return day;

    }
}
