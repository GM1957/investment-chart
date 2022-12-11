
# Investment Chart

Highly customizable Investment chart for react  

![](https://github.com/GM1957/investment-chart/blob/main/public/demo.png)
## Installation and start the server

Install all required packages:

```bash
  npm install
```

Start the server:

```bash
  npm run dev
```
        
## Usage/Example of InvestmentChart Component

```javascript
import React, { useState, useRef } from "react";
import { useFetchInvestments } from "hooks";
import { InvestmentChart, CurrencyInput } from "components";
import { mockyToInvestDataModifier, debounce } from "helpers";

export default function Home() {
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [montlyInvestment, setMontlyInvestment] = useState(0);
  const initialInvRef: any = useRef();
  const monthlyInvRef: any = useRef();

  const { data, isLoading, isRefetching } = useFetchInvestments({
    initialInvestment,
    montlyInvestment,
    configs: [
      {
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    ],
  });

  const initialInvDebounce = debounce(
    () => setInitialInvestment(Number(initialInvRef?.current?.value || 0)),
    500
  );
  const monthlyInvDebounce = debounce(
    () => setMontlyInvestment(Number(monthlyInvRef?.current?.value || 0)),
    500
  );

  return (
    <div
      style={{
        marginTop: "10%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "20px" }}>
            <div style={{ fontSize: "12px", marginBottom: "5px" }}>
              Initial investment
            </div>
            <CurrencyInput
              ref={initialInvRef}
              onChange={() => {
                initialInvDebounce();
              }}
            />
          </div>
          <div>
            <div style={{ fontSize: "12px", marginBottom: "5px" }}>
              Monthly investment
            </div>
            <CurrencyInput
              ref={monthlyInvRef}
              onChange={() => {
                monthlyInvDebounce();
              }}
            />
          </div>
        </div>
        <InvestmentChart
          data={mockyToInvestDataModifier(data || [])}
          isLoading={isLoading || isRefetching}
          id="chart-id"
          height={400}
          width={800}
        />
      </div>
    </div>
  );
}



```


## API Reference

### Investment Chart Input Data (investmentChartData)

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `topBottomAreaRange` | `[number, number]` | in this range the range chart will be shown top 25% to bottom 10% |
| `year` | `string` | x-axis label year |
| `month` | `string` | month, which will be visible in the tooltip |
| `benchmark` | `number` | benchmark value for benchmark line in the chart |
| `median` | `number` | median value for median line in the chart |
| `totalDeposit` | `number` | totalDeposit value for totalDeposit line in the chart |
| `underPerformingBenchmark` | `number` | underPerformingBenchmark value to show the % of under performing p.a. |


### Investment Chart Props

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `data` | `[investmentChartData]` | investmentChartData in array |
| `isLoading` | `boolean` | is api fetching data or loading data |
| `height` | `number or string` | height of the chart |
| `width` | `number or string` | width of the chart |
| `areaLineColor` | `string` | color of the area chart |
| `benchMarkLineColor` | `string` | color of the benchMark Line chart |
| `depositeLineColor` | `string` | color of the deposite Line chart |
| `medianLineColor` | `string` | color of the median Line chart |
| `id` | `string` | unique id for the chart |
| `TooltipComponent` | `Component` | Callback component to make custom tooltip |
| `totalDeposit` | `number` | totalDeposit value for totalDeposit line in the chart |
| `underPerformingBenchmark` | `number` | underPerformingBenchmark value to show the % of under performing p.a. |