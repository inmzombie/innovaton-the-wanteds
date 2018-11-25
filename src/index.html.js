import MiBand from './miband'
import axios from 'axios'
import jQuery from 'jquery'

function updateHeartRadio(data) {

	// axios({
	// 	method: 'GET',
	// 	url: `${base_url}/update_hr/${data}`
	// }).then((res) => {
	// 	console.log("Datos recibidos por el servidor")
	// 	console.log(res.data)
  // })
  
  /**
   * SHIT MAN!
   */

  jQuery('.display_hr').html(data);
  
  console.info(data)
}

function updateCalories(data) {
	// axios({
	// 	method: 'GET',
	// 	url: `${base_url}/update_cal/${data}`
	// }).then((res) => {
	// 	console.log("Datos recibidos por el servidor")
	// 	console.log(res.data)
	// })

	jQuery('.display_cal').html(data)
}

function updateMov(data) {

	// axios({
	// 	method: 'GET',
	// 	url: `${base_url}/update_mov/${data}`
	// }).then((res) => {
	// 	console.log("Datos recibidos por el servidor")
	// 	console.log(res.data)
	// })

	jQuery('.display_mov').html(data)
}

const bluetooth = navigator.bluetooth;

const output = document.querySelector('#output');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function test_all(miband, log) {

  let info = {
    time:     await miband.getTime(),
    battery:  await miband.getBatteryInfo(),
    hw_ver:   await miband.getHwRevision(),
    sw_ver:   await miband.getSwRevision(),
    serial:   await miband.getSerial(),
  }

  log(`HW ver: ${info.hw_ver}  SW ver: ${info.sw_ver}`);
  info.serial && log(`Serial: ${info.serial}`);
  log(`Battery: ${info.battery.level}%`);
  log(`Time: ${info.time.toLocaleString()}`);

  let ped = await miband.getPedometerStats()
  log('Pedometer:', JSON.stringify(ped))

  log('Notifications demo...')
  await miband.showNotification('message');
  await delay(3000);
  await miband.showNotification('phone');
  await delay(5000);
  await miband.showNotification('off');

  log('Tap MiBand button, quick!')
  miband.on('button', () => log('Tap detected'))
  try {
    await miband.waitButton(10000)
  } catch (e) {
    log('OK, nevermind ;)')
  }
  updateMov(ped.steps)
  updateCalories(ped.calories)

  log('Heart Rate Monitor (single-shot)')
  log('Result:', await miband.hrmRead())

  log('Heart Rate Monitor (continuous for 30 sec)...')
  miband.on('heart_rate', (rate) => {
    log('Heart Rate:', rate)
    updateHeartRadio(rate)
  })
  await miband.hrmStart();
  await delay(60000);
  await miband.hrmStop();

  //log('RAW data (no decoding)...')
  //miband.rawStart();
  //await delay(30000);
  //miband.rawStop();

  log('Finished.')
}

function connectBluetooth(time) {
  console.info("Time to be working on the stuff");
  console.info(time);
  scan()
}

function log() {
  output.innerHTML += [...arguments].join(' ') + '\n';
}

async function scan() {
	if (!bluetooth) {
		log('WebBluetooth no está soportado en éste navegador.');
		return;
	}

	try {
		log('Solicitando dispositivo BLE...');
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

		log('Conectando...');
		const server = await device.gatt.connect();
		log('Dispositivo enlazado');

		let miband = new MiBand(server);

		await miband.init();

    await test_all(miband, log);

	} catch (error) {
		log('Argh!', error);
	}
}


 export { connectBluetooth }

