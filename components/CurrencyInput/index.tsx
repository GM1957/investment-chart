import React from "react";
import classes from "./currencyInput.module.css";

const CurrencyInput = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <div className={classes.currencyWrap}>
    <span className={classes.currencyCode}>S$</span>
    <input
      type="number"
      className={classes.textCurrency}
      ref={ref}
      {...props}
    />
  </div>
));

export { CurrencyInput };
