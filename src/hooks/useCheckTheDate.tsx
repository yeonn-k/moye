import dayjs from 'dayjs';

const useCheckTheDate = () => {
  const year = dayjs().year();
  const month = dayjs().month() + 1;
  const date = dayjs().date();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const day = dayjs().day();
  const hour = dayjs().hour();
  const minute = dayjs().minute();
  const second = dayjs().second();

  return { year, month, date, days, day, hour, minute, second };
};

export default useCheckTheDate;
