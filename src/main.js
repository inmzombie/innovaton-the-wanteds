'use strict';

import MiBand from './miband'

import jQuery from 'jquery'


const bluetooth = navigator.bluetooth;

const output = document.querySelector('#output');

function updateHeartRadio(data) {
	jQuery('.heart-ration').html(data);
}

function updateCalories(data) {
	jQuery('.cal').html(data)
}

function updateMov(data) {
	jQuery('.mov').html(data)
}

function log() {
	document.querySelector('main').style.display = 'block';

	output.innerHTML += [...arguments].join(' ') + '\n';
}

async function scan() {
	if (!bluetooth) {
		log('WebBluetooth is not supported by your browser!');
		return;
	}

	try {
		log('Requesting Bluetooth Device...');
		const device = await bluetooth.requestDevice({
			filters: [{
				services: [MiBand.advertisementService]
			}],
			optionalServices: MiBand.optionalServices
		});

		device.addEventListener('gattserverdisconnected', () => {
			log('Device disconnected');
		});

		await device.gatt.disconnect();

		log('Connecting to the device...');
		const server = await device.gatt.connect();
		log('Connected');

		let miband = new MiBand(server);

		await miband.init();

		//await test_all(miband, log);

	} catch (error) {
		log('Argh!', error);
	}
}

document.querySelector('#bt_connect').addEventListener('click', scan)

// Document $scope
// |setTimeout(() => {
// 	alert("Hello World")
// }, 5000)