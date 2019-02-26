
var ODate = {

    /**
     * 获取当月日历
     * */
    getCurrentMountCalendar() {

        var currentDate = new Date();
        let currentMonth = currentDate.getMonth() + 1;
        let currentYear = currentDate.getFullYear();
        var currentMonthDates = this.getDays();

        let weekday = ["日", "一", "二", "三", "四", "五", "六"];

        var c = 15;

        /* 保存日历*/
        var monuths = [];

        for (var i = 30; i--; i > 0) {

            var currentDate = new Date();
            currentDate = currentDate.getDate() + c;
            if (currentDate > currentMonthDates) {

                currentDate = currentDate - currentMonthDates;
            } else if (currentDate < 1) {

                currentMonth -= 1;
                currentDate = currentDate + (currentDate - this.getDays(-1));
            }

            if (currentMonth > 12) currentYear += 1;
            else if (currentYear < 1) currentYear -= 1;

            var tmpCurrentDate = currentDate.toString();
            tmpCurrentDate = tmpCurrentDate.replace(/-/g, '');



            var tmpDay = new Date();
            tmpDay.setDate(tmpCurrentDate);
            tmpDay.setFullYear(currentYear);
            tmpDay.setDate(tmpCurrentDate);

            tmpDay = tmpDay.getDay();
             // console.warn(tmpDay);
            let currentDay = weekday[tmpDay];
               // console.warn(currentDay);

            let tmpDate = currentYear + '.' + currentMonth + '.' + tmpCurrentDate;
            monuths.push(
                {
                    date: tmpDate,
                    day: currentDay,
                }
            )

            c--;
        }
        return monuths;
    },


    //获取当前月份的总天数
    getDays(number=0){
        var date=new Date();
        //将当前月份加1，下移到下一个月
        date.setMonth(date.getMonth()+number+1);
        //将当前的日期置为0，
        date.setDate(0);
        //再获取天数即取上个月的最后一天的天数
        var days=date.getDate();
        return days;
    },



    /**
     * 获取某个月的总天数
     *
     */
    getDaysOfMonth(year,month){
        var date=new Date(year,month,0);
        var days=date.getDate();
        return days;
    },


    /**
     * 获取当前日期
     * */
    getCurrentDate() {


        var currentDay = new Date();
        let currentMonth = currentDay.getMonth() + 1;
        let currentYear = currentDay.getFullYear();
        var currentDays = currentDay.getDate();

        return currentYear+'.'+currentMonth+'.'+currentDays;

    },

    /**
     * 获取今天是星期几
     * */
    getCurrentWeekday() {

        var currentDay = new Date();
        var currentDays = currentDay.getDay();


        let weekday = ["日", "一", "二", "三", "四", "五", "六"];

        return weekday[currentDays];

    }

}

module.exports = ODate;
