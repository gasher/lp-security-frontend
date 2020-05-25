import React from 'react';
import BarChartComponent from 'react-bar-chart';
import moment from 'moment';

import './styles.css';

const BarChart = props => {
  const { title, triggers } = props;
  const data = Object.entries(
    triggers.reduce((total, current) => {
      if (total[moment(current.triggered_at).format('DD/MM')]) {
        total[moment(current.triggered_at).format('DD/MM')] += 1;

        return total;
      }

      total[moment(current.triggered_at).format('DD/MM')] = 1;

      return total;
    }, {})
  ).map(([key, value]) => ({ text: key, value }));

  return (
    <div className="bar-chart">
      <h1>{title}</h1>
      <BarChartComponent
        ylabel="Triggers"
        width={500}
        height={500}
        margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
        data={data}
      />
    </div>
  );
};

export default BarChart;
