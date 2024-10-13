import dayjs from 'dayjs';

const useCheckTheDate = () => {
  const year = dayjs().year();
  const month = dayjs().month() + 1;
  const date = dayjs().date();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const day = dayjs().day();

  return { year, month, date, days, day };
};

export default useCheckTheDate;
