export const formatPhoneNumber = (phoneNumber: string) => {
    const formattedPhone = phoneNumber.toString().replace(/[^0-9]/g, '');
    return `(${formattedPhone.substring(0, 3)}) ${formattedPhone.substring(3,6)}-${formattedPhone.substring(6)}`
  }