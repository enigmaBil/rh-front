export class TimeSheet{
    constructor(
        public id: number,
        public startDate: Date,
        public endDate: Date,
        public totalHours: number,
        public status: string,
        public userId: number
    ) {}
}