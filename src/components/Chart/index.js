import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

import './styles.css';

const PieChartComponent = props => {
  const { title, active, inactive } = props;

  const data = [
    { title: 'Active', value: active, color: '#7df73b' },
    { title: 'Inactive', value: inactive, color: '#eb4034' },
  ];

  return (
    <div className="pie-chart">
      <h1>{title}</h1>
      <PieChart data={data} animate />
    </div>
  );
};

export default PieChartComponent;
