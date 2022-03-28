import React from 'react';

interface SummaryProps {
  income: number;
  outcome: number;
}

const Summary = ({ income, outcome }: SummaryProps) => (
  <div className="row">
    <div className="col">
      <h5 className="income">
        收入：<span>{income}</span>
      </h5>
    </div>
    <div className="col">
      <h5 className="outcome">
        支出：<span>{outcome}</span>
      </h5>
    </div>
  </div>
);

export default Summary;
