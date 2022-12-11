import React from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  Line,
} from "recharts";
import classes from "./investmentchart.module.css";
import { investmentChartProps } from "types";
import { convertToInternationalCurrency } from "helpers";
import { ClipLoader } from "react-spinners";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const metaData = payload[0]?.payload;
    return (
      <div className={classes.tooltipContainer}>
        <div className={classes.tooltipInnerBlock} style={{ fontSize: "14px" }}>
          {metaData?.month} {metaData?.year}
        </div>

        <div className={classes.hBar}></div>
        <div className={classes.tooltipInnerBlock} style={{ color: "#6E6E79" }}>
          <div className={[classes.flexCenter, classes.mb5].join(" ")}>
            Chance of outcome
          </div>
          <div className={[classes.flexSpaceBetw, classes.mb5].join(" ")}>
            <div className={classes.flex}>
              <div
                className={classes.circle}
                style={{ backgroundColor: payload[0]?.color }}
              ></div>
              <div style={{ marginRight: "15px", marginLeft: "4px" }}>
                Top 25%
              </div>
            </div>
            <div>
              {"> S$ "}
              {metaData?.topBottomAreaRange[0]}
            </div>
          </div>
          <div
            className={[classes.flexSpaceBetw, classes.mb5].join(" ")}
            style={{ color: payload[1]?.color }}
          >
            <div className={classes.flex}>
              <div
                className={classes.circle}
                style={{ backgroundColor: payload[1]?.color }}
              ></div>
              <div style={{ marginRight: "15px", marginLeft: "4px" }}>
                Median
              </div>
            </div>
            <div>
              {"S$ "}
              {metaData?.median}
            </div>
          </div>
          <div className={[classes.flexSpaceBetw, classes.mb5].join(" ")}>
            <div className={classes.flex}>
              <div
                className={classes.circle}
                style={{ backgroundColor: payload[0]?.color }}
              ></div>
              <div style={{ marginRight: "15px", marginLeft: "4px" }}>
                Bottom 10%
              </div>
            </div>
            <div>
              {"< S$ "}
              {metaData?.topBottomAreaRange[1]}
            </div>
          </div>
          <div className={[classes.flexSpaceBetw, classes.mb5].join(" ")}>
            <div>Underperforming p.a.</div>
            <div> {metaData?.underPerformingBenchmark.toFixed(2)}%</div>
          </div>
        </div>
        <div className={classes.hBar}></div>
        <div className={classes.tooltipInnerBlock} style={{ color: "#6E6E79" }}>
          <div className={[classes.flexSpaceBetw, classes.mb5].join(" ")}>
            <div className={classes.flex}>
              <div
                className={classes.circle}
                style={{ backgroundColor: payload[2]?.color }}
              ></div>
              <div style={{ marginRight: "15px", marginLeft: "4px" }}>
                {((metaData?.benchmark / metaData?.totalDeposit) * 100).toFixed(
                  2
                )}
                % p.a.
              </div>
            </div>
            <div>
              {"S$ "}
              {metaData?.benchmark}
            </div>
          </div>

          <div className={[classes.flexSpaceBetw, classes.mb5].join(" ")}>
            <div className={classes.flex}>
              <div
                className={classes.circle}
                style={{ backgroundColor: payload[3]?.color }}
              ></div>
              <div style={{ marginRight: "15px", marginLeft: "4px" }}>
                Deposits
              </div>
            </div>
            <div>
              {"S$ "}
              {metaData?.totalDeposit}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const yLabelFormatter = (value) => `S$${convertToInternationalCurrency(value)}`;

const InvestmentChart = (props: investmentChartProps) => {
  const {
    data,
    isLoading,
    height,
    width,
    areaLineColor,
    TooltipComponent,
    benchMarkLineColor,
    depositeLineColor,
    medianLineColor,
    id,
  } = props;
  return (
    <div style={{ height, width, position: "relative" }} id={id}>
      {isLoading ? (
        <div className={classes.loaderWrapper}>
          <ClipLoader color="#176EFF" size={36} />
        </div>
      ) : null}
      {data?.length > 0 ? (
        <ResponsiveContainer width={width} height={height}>
          <ComposedChart data={data}>
            <XAxis
              dataKey="year"
              style={{
                fontSize: "12px",
              }}
            />
            <YAxis
              orientation="right"
              style={{
                fontSize: "12px",
              }}
              tickFormatter={yLabelFormatter}
            />
            <Tooltip
              content={
                TooltipComponent ? <TooltipComponent /> : <CustomTooltip />
              }
              wrapperStyle={{ outline: "none" }}
            />
            <Area
              type="monotone"
              dataKey="topBottomAreaRange"
              fill={areaLineColor || "#D7E9F9"}
              stroke={areaLineColor || "#D7E9F9"}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="median"
              stroke={medianLineColor || "#176EFF"}
              isAnimationActive={false}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke={benchMarkLineColor || "#FFC600"}
              isAnimationActive={false}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="totalDeposit"
              stroke={depositeLineColor || "#020202"}
              isAnimationActive={false}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
};

export { InvestmentChart };
