const express = require('express');

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports.locations = async (req, res, next) => {
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41%44&radius=50000&type=restaurant&keyword=cruise&key=AIzaSyB0ZVK44vEor1msqkCoNO2ocT0lctpCLAY';
    
    const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com',
			'X-RapidAPI-Key': 'your-rapidapi-key'
		}
	};

    fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));
    try {
        let response = await fetch(url, options);
        response = await response.json();
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `Internal Server Error.` });
    }
}

