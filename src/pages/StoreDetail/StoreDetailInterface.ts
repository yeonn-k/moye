interface OperatingTimeTableData {
  type: string;
  openFrom: string;
  closeTo: string;
  startBreakTime: string;
  endBreakTime: string;
}

interface IrregularCloseDay {
  ymd: string;
}

interface RegularHoliday {
  closedDay: number;
}

interface StoreImage {
  isPrimary: string;
  url: string;
}

interface StoreDetailData {
  openingHour: OperatingTimeTableData[];
  closedDay: IrregularCloseDay[];
  regularHoliday: RegularHoliday[];
  image: StoreImage[];
  businessRegistrationNumber: string;
  businessName: string;
  contact: string;
  totalSeats: string;
  numberPerTable: number;
  description: string;
  email: string;
}

const initialState: StoreDetailData = {
  openingHour: [],
  closedDay: [],
  regularHoliday: [],
  image: [
    {
      isPrimary: '',
      url: '',
    },
  ],
  businessRegistrationNumber: '',
  businessName: '',
  contact: '',
  totalSeats: '',
  numberPerTable: 0,
  description: '',
  email: '',
};

export type {
  StoreDetailData,
  OperatingTimeTableData,
  IrregularCloseDay,
  RegularHoliday,
  StoreImage,
};
export { initialState };
