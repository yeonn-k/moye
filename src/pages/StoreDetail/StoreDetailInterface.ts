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
  name: string;
  address: string;
  contact: string;
  totalSeats: string;
  numberPerTable: number;
  description: string;
  email: string;
  id: string;
}

const initialState: StoreDetailData = {
  id: '',
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
  name: '',
  address: '',
};

export type {
  StoreDetailData,
  OperatingTimeTableData,
  IrregularCloseDay,
  RegularHoliday,
  StoreImage,
};
export { initialState };
