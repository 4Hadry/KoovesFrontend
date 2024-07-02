import toast from "react-hot-toast";
import moment from "moment";

export const responseToast = (res, navigate, url) => {
  if ("data" in res) {
    toast.success(res.data.message);
    if (navigate) navigate(url);
  } else {
    toast.error(res.error.data.message);
    console.log(res.error.data);
  }
};

export const getLastMonths = () => {
  const currentDate = moment();

  currentDate.date(1);

  const last6Months = [];
  const last12Months = [];

  for (let i = 0; i < 6; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMM");

    last6Months.unshift(monthName);
  }
  for (let i = 0; i < 12; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMM");

    last12Months.unshift(monthName);
  }
  return {
    last6Months,
    last12Months,
  };
};
