import moment from "moment";

export const formattedDate = (date: Date) => {
  const newDate = moment(date).format("DD.MM.YYYY");
  return newDate;
};
