'use strict';

import jQuery from 'jquery'

import { connectBluetooth } from './index.html.js'

function updateHeartRadio(data) {
	jQuery('.heart-ration').html(data);
}

function updateCalories(data) {
	jQuery('.cal').html(data)
}

function updateMov(data) {
	jQuery('.mov').html(data)
}

/**
 * EXPOSE STUFF TO THE GLOBAL WINDOW
 */

window.updateHeartRadio = updateHeartRadio
window.updateCalories = updateCalories
window.updateMov = updateMov
window.connectBluetooth = connectBluetooth