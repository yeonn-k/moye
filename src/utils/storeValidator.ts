export const storeValidate = (name: string, value: string) => {
  if (name === 'totalSeats') {
    const numVal = Number(value);
    if (isNaN(numVal) || numVal <= 0) {
      return '좌석 수는 1 이상의 양수로 입력해주세요';
    }
  }
  if (name === 'numberPerTable') {
    const numVal = Number(value);
    if (isNaN(numVal) || numVal <= 0) {
      return '테이블 최대 인원은 1 이상의 양수로 입력해주세요';
    }
  }
  if (name === 'contact') {
    const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
    if (value && !phoneRegex.test(value)) {
      return '전화번호 형식이 맞지 않습니다';
    }
  }
  if (name === 'businessNumber') {
    const phoneRegex = /^\d{3}-\d{2}-\d{5}$/;
    if (value && !phoneRegex.test(value)) {
      return '사업자 번호 형식이 맞지 않습니다';
    }
  }
  if (name === 'name') {
    if (!value) {
      return '매장 이름을 입력해주세요';
    }
  }
  if (name === 'businessName') {
    if (!value) {
      return '상호명을 입력해주세요';
    }
  }
  if (name === 'address') {
    if (!value) {
      return '주소를 입력해주세요';
    }
  }
  return '';
};
