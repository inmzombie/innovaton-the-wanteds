'use strict';

import jQuery from 'jquery'

import { connectBluetooth } from './index.html.js'

import axios from 'axios'

function updateHeartRadio(data) {
	
	/*insertar envío de datos aquí!!!*/
	jQuery('.heart-ration').html(data);
}

function updateCalories(data) {
	/*insertar envío de datos aquí!!!*/
	jQuery('.cal').html(data)
}

function updateMov(data) {
	/*insertar envío de datos aquí!!!*/
	jQuery('.mov').html(data)
}

/**
 * EXPOSE STUFF TO THE GLOBAL WINDOW
 */

window.updateHeartRadio = updateHeartRadio
window.updateCalories = updateCalories
window.updateMov = updateMov
window.connectBluetooth = connectBluetooth