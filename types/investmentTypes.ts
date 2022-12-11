type fetchInventmentsInputs = {
  initialInvestment: number;
  montlyInvestment: number;
  delay?: number;
};

type investRawData = Array<{
  sequence?: number;
  yearMonth: string;
  totalDeposit: number;
  expectedAmounts: {
    "10": number;
    "50": number;
    "75": number;
    benchmark: number;
  };
  chanceOfUnderPerformingBenchmark: number;
}>;

type investmentChartData = Array<{
  topBottomAreaRange: [number, number];
  year: string;
  month: string;
  benchmark: number;
  median: number;
  totalDeposit: number;
  underPerformingBenchmark: number;
}>;

type investmentChartProps = {
  data: investmentChartData;
  isLoading?: boolean;
  height: number | string;
  width: number | string;
  areaLineColor?: string;
  TooltipComponent?: Function;
  benchMarkLineColor?: string;
  depositeLineColor?: string;
  medianLineColor?: string;
  id: string;
};

export type {
  fetchInventmentsInputs,
  investRawData,
  investmentChartData,
  investmentChartProps,
};
