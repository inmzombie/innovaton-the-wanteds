'use strict';

import jQuery from 'jquery'

import { connectBluetooth } from './index.html.js'

import axios from 'axios'

const base_url = 'http://localhost:3000'

function updateHeartRadio(data) {

	axios({
		method: 'GET',
		url: `${base_url}/update_hr/${data}`
	}).then((res) => {
		console.log("Datos recibidos por el servidor")
		console.log(res.data)
	})

	jQuery('.display_hr').html(data);
}

function updateCalories(data) {
	axios({
		method: 'GET',
		url: `${base_url}/update_cal/${data}`
	}).then((res) => {
		console.log("Datos recibidos por el servidor")
		console.log(res.data)
	})

	jQuery('.display_cal').html(data)
}

function updateMov(data) {

	axios({
		method: 'GET',
		url: `${base_url}/update_mov/${data}`
	}).then((res) => {
		console.log("Datos recibidos por el servidor")
		console.log(res.data)
	})

	jQuery('.display_mov').html(data)
}

/**
 * EXPOSE STUFF TO THE GLOBAL WINDOW
 */
window.updateHeartRadio = updateHeartRadio
window.updateCalories = updateCalories
window.updateMov = updateMov
window.connectBluetooth = connectBluetooth