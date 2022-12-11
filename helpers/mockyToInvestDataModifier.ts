import { investRawData, investmentChartData } from "types";
import { getMonthName } from "helpers";

const mockyToInvestDataModifier = (dataArr: investRawData) => {
  const dataClone: investmentChartData = [...dataArr].map((item) => {
    return {
      topBottomAreaRange: [
        item.expectedAmounts["10"],
        item.expectedAmounts["75"],
      ],
      year: item.yearMonth.split("-")[0],
      month: getMonthName(item.yearMonth.split("-")[1]),
      median: item.expectedAmounts["50"],
      benchmark: item.expectedAmounts["benchmark"],
      totalDeposit: item.totalDeposit,
      underPerformingBenchmark: item.chanceOfUnderPerformingBenchmark,
    };
  });

  return dataClone;
};

export { mockyToInvestDataModifier };
