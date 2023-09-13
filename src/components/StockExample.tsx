import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration } from 'chart.js';

function ChartWithAnnotation() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    if (ctx) {
      const chartConfig: ChartConfiguration = {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          }]
        },
        options: {
          scales: {
            x: {
              type: 'category',
              position: 'bottom',
            },
            y: {
              type: 'linear',
              position: 'left',
            },
          },
          plugins: {
            annotation: {
              annotations: {
                horizontalLine: {
                  type: 'line',
                  yMin: 50,
                  yMax: 50,
                  borderColor: 'rgba(255, 99, 132, 0.25)',
                  borderWidth: 10,
                },
              },
            },
          },
        },
      };

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, chartConfig);
      console.log(chartInstance.current);
      console.log(chartConfig);

      console.log('Аннотация создана');
    }
  }, []);

  return (
    <div>
      <canvas ref={chartRef} width="400" height="400"></canvas>
    </div>
  );
}

export default ChartWithAnnotation;