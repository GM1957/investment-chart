import { useQuery } from "react-query";
import { fetchInvestments } from "endpoints";
import { queryKeys } from "constant";
import { fetchInventmentsInputs } from "types";

const useFetchInvestments = (
  inputs: fetchInventmentsInputs & { configs?: Array<any> }
) => {
  const {
    configs = [
      {
        refetchOnWindowFocus: false,
      },
    ],
    initialInvestment,
    montlyInvestment,
  } = inputs;

  return useQuery(
    [
      queryKeys.FETCH_INVESTMENTS,
      {
        initialInvestment,
        montlyInvestment,
      },
    ],
    ({ queryKey }) => fetchInvestments(queryKey[1] as fetchInventmentsInputs),
    ...configs
  );
};

export { useFetchInvestments };
