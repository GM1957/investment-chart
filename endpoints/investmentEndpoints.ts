import axios from "axios";
import { fetchInventmentsInputs } from "types";
import { axiosResponseWrapper } from "helpers";
const baseInvestmentUrl = "http://www.mocky.io/v2/5e69de892d00007a005f9e29";

const fetchInvestments = (inputParams: fetchInventmentsInputs) => {
  const { delay = 200, initialInvestment, montlyInvestment } = inputParams;
  return axiosResponseWrapper(
    axios.post(`${baseInvestmentUrl}?mocky-delay=${delay}ms`, {
      initialInvestment,
      montlyInvestment,
    })
  );
};

export { fetchInvestments };
