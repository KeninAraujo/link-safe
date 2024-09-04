$(document).ready(function () {
  let inputValue = localStorage.getItem("inputValue");
  const apiKey =
    "9edfbfe83e77c3d1c2482c36c4e6357353696c9669b802b44949ce696e0c06c1";

  if (inputValue) {
    let settings = {
      url: "https://www.virustotal.com/api/v3/urls",
      method: "POST",
      timeout: 0,
      headers: {
        accept: "application/json",
        "content-type": "application/x-www-form-urlencoded",
        "x-apikey": apiKey,
      },
      data: {
        url: inputValue,
      },
    };

    $.ajax(settings).done(function (response) {
      const id = response.data.id.match(/-(.*?)-/)[1];

      let settings = {
        url: `https://www.virustotal.com/api/v3/urls/${id}`,
        method: "GET",
        timeout: 0,
        headers: {
          accept: "application/json",
          "x-apikey": apiKey,
        },
      };

      $.ajax(settings).done(function (getResponse, jqXHR) {
        const data = getResponse.data;
        const attributes = data.attributes;
        const last_analysis_results = attributes.last_analysis_results;
        const objectResult = Object.keys(last_analysis_results).map((key) => {
          return {
            name: key,
            result: last_analysis_results[key].result,
          };
        });

        // const date = attributes.last_http_response_headers.date;
        // const contentTypes =
        // attributes.last_http_response_headers["content-type"];
        const { url, last_analysis_stats } = attributes;
        const { harmless, malicious, suspicious, timeout, undetected } =
          last_analysis_stats;

        console.log(objectResult);

        const $tableBody = $(".table tbody");
        objectResult.forEach((item) => {
          const row = $("<tr></tr>");
          row.append(`<td>${item["name"]}</td>`);
          row.append(`<td>${item.result}</td>`);
          $tableBody.append(row);
        });

        $(".url").text(url);
        // $(".status").text(`${contentTypes} | ${date}`);

        $(".btn").on("click", function (e) {
          e.preventDefault();
          location.reload();
        });

        const dataChart = {
          labels: ["undetected", "harmless", "suspicious", "malicious"],
          datasets: [
            {
              label: "My First Dataset",
              data: [undetected, harmless, suspicious, malicious],
              backgroundColor: [
                "rgb(128, 128, 128)",
                "rgb(0, 255, 0)",
                "rgb(255, 150, 0)",
                "rgb(255, 0, 0)",
              ],
            },
          ],
        };

        const ctx = document.getElementById("myChart");
        new Chart(ctx, {
          type: "doughnut",
          data: dataChart,
          options: {
            cutout: "80%",
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
              },
            },
          },
        });

        // Remova a classe 'loading' somente após o gráfico e a tabela serem carregados
        $(".loading").removeClass("loading");
      });
    });
  } else {
    console.log("");
  }
});
