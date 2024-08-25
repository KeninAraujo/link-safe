// const express = require('express');
const axios = require('axios');
require('dotenv').config();

const url = 'https://chatgpt.com/c/d94dde71-2591-4a7c-a130-cfacd110bdf5';
const hostApi = 'https://www.virustotal.com/api/v3/';

async function scannewUrl(url, hostApi) {



    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${hostApi}urls`,
        headers: {
            'accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
            'x-apikey': process.env.VIRUSTOTAL_API_KEY
        },
        data: {
            'url': url
        }
    };

    try {
        const response = await axios(config);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }


}

(async () => {
    const res = await scannewUrl(url, hostApi);

    const data = res.data;

    const id = data.id.match(/-(.*?)-/)[1];



    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${hostApi}urls/${id}`,
        headers: {
            'accept': 'application/json',
            'x-apikey': process.env.VIRUSTOTAL_API_KEY
        }
    };

    try {
        const response = await axios(config);

        const data = response.data.data;

        const attributes = data.attributes;

        const analysis = attributes.last_analysis_results;

        const object = Object.keys(analysis).map(key => {
            return { name: key, result: analysis[key].result }
        });

        console.log(object);

    } catch (error) {
        console.error(error);
    }



})();



// const app = express();

// app.use(express.json());

// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Hello World' });
// });

// app.listen(3001);