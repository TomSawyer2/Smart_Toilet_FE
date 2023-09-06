import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components';
import { LineChart as ELineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ELineChart,
  CanvasRenderer,
  UniversalTransition,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
>;

interface LineChartProps {
  data: Array<number>;
  name: string;
  color: string;
}

const LineChart = (props: LineChartProps) => {
  const { data, name, color = '#66ccff' } = props;
  const chartRef = useRef<HTMLInputElement>(null);
  const [chart, setChart] = useState<echarts.ECharts>();

  // 生成一个从1到data长度的数组
  const xAxisData = Array.from(Array(data.length).keys()).map((item) => item + 1);

  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['A'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name,
        type: 'line',
        data,
        color,
      },
    ],
  };

  const handleResize = () => {
    chart?.resize();
  };

  const initChart = () => {
    if (chart) {
      window.removeEventListener('resize', handleResize);
      chart?.dispose();
    }

    const newChart = echarts?.init(chartRef?.current as HTMLElement);
    newChart.setOption(option, true);
    window.addEventListener('resize', handleResize);
    setChart(newChart);
  };

  useEffect(() => {
    initChart();
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ height: '300px', width: '400px' }}
    />
  );
};

export default LineChart;
