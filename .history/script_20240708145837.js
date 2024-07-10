const ctx = document.getElementById('cryptoChart').getContext('2d');
const cryptoChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'BTC/USD',
      data: [],
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      fill: false,
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          tooltipFormat: 'MMM DD, h:mm:ss a',
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
    },
  },
});

const socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin');

socket.onmessage = function (event) {
  const data = JSON.parse(event.data);
  const currentTime = new Date();

  if (data.bitcoin) {
    cryptoChart.data.labels.push(currentTime);
    cryptoChart.data.datasets[0].data.push(data.bitcoin);

    if (cryptoChart.data.labels.length > 10) {
      cryptoChart.data.labels.shift();
      cryptoChart.data.datasets[0].data.shift();
    }

    cryptoChart.update();
  }
};
