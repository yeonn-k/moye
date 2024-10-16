import styled from 'styled-components';

export const S = {
  CalendarBox: styled.div`
    width: 1348px;
    height: 630px;

    .react-calendar {
      width: 1348px;
      height: 630px;

      border-radius: 5px;
    }

    .react-calendar__month-view__weekdays {
      height: 38px;
      line-height: 38px;
      text-align: center;
      font-size: 28px;
      margin: 16px 0px;

      abbr[title] {
        text-decoration: none;
      }
    }

    .react-calendar__month-view__days__day {
      position: relative;
      display: flex;
      justify-content: center;
      padding: 14px;

      height: 111px;
      border: none;
      font-size: 16px;

      border-right: 1px solid ${(props) => props.theme.color.paleGray};
      border-bottom: 1px solid ${(props) => props.theme.color.paleGray};

      background-color: white;

      abbr {
        position: absolute;
        right: 14px;
      }
    }

    .react-calendar__month-view__days__day:nth-child(7n + 1) {
      border-left: 1px solid ${(props) => props.theme.color.paleGray};
    }

    .react-calendar__month-view__days__day:nth-child(7n + 1) {
      border-left: 1px solid ${(props) => props.theme.color.paleGray};
    }

    .react-calendar__month-view__days__day:nth-child(-n + 7) {
      border-top: 3px solid ${(props) => props.theme.color.paleGreen};
    }

    .react-calendar__month-view__days__day--neighboringMonth {
      color: ${(props) => props.theme.color.paleGray};
    }
    .react-calendar__tile--now {
      border: 4px solid ${(props) => props.theme.color.lightGreen};
    }
    .react-calendar__tile:enabled:hover {
      background-color: #dbf7d2;
    }
  `,
  ItemBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    width: 112px;
    height: 84px;
    border: 5px solid ${(props) => props.theme.color.paleGreen};
    border-radius: 6px;
  `,
  Item: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
  `,
  AcceptIcon: styled.div`
    background-image: url('/icons/confirmIcon.svg');
    background-size: contain;
    background-repeat: no-repeat;
    width: 16px;
    height: 16px;
  `,
  PendingIcon: styled.div`
    background-image: url('/icons/pendingIcon.svg');
    background-size: contain;
    background-repeat: no-repeat;
    width: 16px;
    height: 16px;
  `,
  CancelIcon: styled.div`
    background-image: url('/icons/checkIcon.svg');
    background-size: contain;
    background-repeat: no-repeat;
    width: 16px;
    height: 16px;
  `,
  LilText: styled.span`
    font-size: 12px;
    margin-left: 2px;
  `,
};

/* 

    

    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
      background-color: ${(props) => props.theme.kultureGreen};

      abbr {
        color: ${(props) => props.theme.kultureGreen};
      }
    }

    .react-calendar__tile--active {
      background-color: ${(props) => props.theme.kultureGreen};
      color: ${(props) => props.theme.kultureGreen};
    }

  

    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
      background: #fff;
    }
 

    .react-calendar__month-view__weekdays {
      margin-top: 2px;
      text-align: center;
      text-transform: lowercase;
    }

    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
      border: 1px solid #8c8c8c;
      color: #1c1b1b;
      background: none;
      height: 30px;
    }

    

    .react-calendar__tile {
      color: #e6e6e6;
    }

    .react-calendar__tile--now {
      color: #1c1b1b;
    }

    .react-calendar__navigation__label:hover {
      background-color: #e6e6e6;
      color: #1c1b1b;
    }
  `, */
