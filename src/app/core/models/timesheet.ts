export class TimeSheet{
    constructor(
        public id: number,
        public uuid: string,
        public title: string | null,
        public description: string,
        public date: string,
        public startTime: string,
        public endTime: string,
        public totalHours: number,
        public status: 'PENDING' | 'APPROVED' | 'REJECTED',
        public comment: string | null,
        public userId: number,
        public employee?: {
          id: number;
          name: string;
          email: string;
          role: string;
          uuid: string;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        },
        public created_at?: string,
        public updated_at?: string,
        public deleted_at?: string | null,
      ) {}
}