$(document).ready(function () {
    let settings = {
        "url": "https://www.virustotal.com/api/v3/urls",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "accept": "application/json",
            "content-type": "application/x-www-form-urlencoded",
            "x-apikey": "9edfbfe83e77c3d1c2482c36c4e6357353696c9669b802b44949ce696e0c06c1"
        },
        "data": {
            "url": "https://chatgpt.com/c/d94dde71-2591-4a7c-a130-cfacd110bdf5"
        }
    };

    $.ajax(settings).done(function (response) {
        const id = response.data.id.match(/-(.*?)-/)[1];

        let settings = {
            "url": `https://www.virustotal.com/api/v3/urls/${id}`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "accept": "application/json",
                "x-apikey": "9edfbfe83e77c3d1c2482c36c4e6357353696c9669b802b44949ce696e0c06c1"
            }
        };

        $.ajax(settings).done(function (getResponse) {
            const data = getResponse.data;
            const attributes = data.attributes;
            const last_analysis_results = attributes.last_analysis_results;

            const objectResult = Object.keys(last_analysis_results).map(key => {
                return {
                    name: key,
                    result: last_analysis_results[key].result
                }
            });

            console.log(objectResult);
        });


    });
})