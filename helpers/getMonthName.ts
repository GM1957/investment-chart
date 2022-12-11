const getMonthName = (month: number | string) => {
  const monthsArr = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthsArr[Number(month)];
};

export { getMonthName };
