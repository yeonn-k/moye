export const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) return '';
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7)}`;
};
