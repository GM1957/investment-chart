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
