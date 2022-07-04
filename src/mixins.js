const Mixins = {
  data() {
    return {
      booking: {
        date: [],
      },
      selectedDay: null,
      holidays: 0,
      workingdays: 0,
    };
  },
  methods: {
    addDate(date, days) {
      const dayys = days || 0;
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + dayys);
      return newDate;
    },
    dayClicked(day) {
      this.selectedDay = day;
      if (this.selectedDay.attributes) {
        this.booking.start = new Date(this.selectedDay.attributes[0].dates[0].startTime);
        this.booking.end = new Date(this.selectedDay.attributes[0].dates[0].endTime);
        this.calDate();
      }
    },
    calDate(start, end) {
      this.booking.date = [];
      let holidays = 0;
      let workingdays = 0;
      const from = start ? new Date(start) : this.booking.start;
      const to = end ? new Date(end) : this.booking.end;
      while (from < to) {
        const day = from.getDay();
        if ((day === 6) || (day === 0)) {
          holidays += 1;
        } else {
          workingdays += 1;
        }
        if (!start && !end) {
          this.booking.date.push(this.dateFormat(from));
        }
        from.setDate(from.getDate() + 1);
      }
      this.holidays = holidays;
      this.workingdays = workingdays;
    },
    dateFormat(date) {
      const y = date.getFullYear().toString();
      let m = (date.getMonth() + 1).toString();
      let d = date.getDate().toString();
      m = (m.length === 1) ? `0${m}` : m;
      d = (d.length === 1) ? `0${d}` : d;
      return `${y}-${m}-${d}`;
    },
  },
  computed: {
    totalPrice() {
      return this.roomInfo
        ? this.holidays * this.roomInfo.holidayPrice
        + this.roomInfo.normalDayPrice * this.workingdays
        : 0;
    },
    maxDate() {
      const d = new Date();
      return d.setMonth(d.getMonth() + 3);
    },
    disabledDate() {
      const disDate = [];
      if (this.singleRoom.booking) {
        this.singleRoom.booking.forEach((item) => {
          disDate.push(new Date(item.date));
        });
      }
      return disDate;
    },
  },
};

export default Mixins;
