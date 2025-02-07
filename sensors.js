document.addEventListener('DOMContentLoaded', () => {
    // Função para tocar o som
    function playSound() {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, context.currentTime); // A4 note
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1); // 1 second sound
        oscillator.stop(context.currentTime + 1);
    }

    // Geolocation
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            document.getElementById('geolocation-data').innerText =
                `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
        });
    }

    // Accelerometer
    if ('Accelerometer' in window) {
        const accelerometer = new Accelerometer({frequency: 60});
        accelerometer.addEventListener('reading', () => {
            document.getElementById('accelerometer-data').innerText =
                `X: ${accelerometer.x}, Y: ${accelerometer.y}, Z: ${accelerometer.z}`;
        });
        accelerometer.start();
    }

    // Gyroscope
    if ('Gyroscope' in window) {
        const gyroscope = new Gyroscope({frequency: 60});
        gyroscope.addEventListener('reading', () => {
            document.getElementById('gyroscope-data').innerText =
                `X: ${gyroscope.x}, Y: ${gyroscope.y}, Z: ${gyroscope.z}`;
        });
        gyroscope.start();
    }

    // Magnetometer
    if ('Magnetometer' in window) {
        const magnetometer = new Magnetometer({frequency: 60});
        magnetometer.addEventListener('reading', () => {
            document.getElementById('magnetometer-data').innerText =
                `X: ${magnetometer.x}, Y: ${magnetometer.y}, Z: ${magnetometer.z}`;
        });
        magnetometer.start();
    }

    // Ambient Light
    if ('AmbientLightSensor' in window) {
        const ambientLightSensor = new AmbientLightSensor();
        ambientLightSensor.addEventListener('reading', () => {
            document.getElementById('ambient-light-data').innerText =
                `Illuminance: ${ambientLightSensor.illuminance} lux`;
        });
        ambientLightSensor.start();
    }

    // Proximity
    if ('ProximitySensor' in window) {
        const proximitySensor = new ProximitySensor();
        proximitySensor.addEventListener('reading', () => {
            document.getElementById('proximity-data').innerText =
                `Distance: ${proximitySensor.distance}, Near: ${proximitySensor.near}`;
        });
        proximitySensor.start();
    }

    // Motion
    if ('DeviceMotionEvent' in window) {
        window.addEventListener('devicemotion', event => {
            document.getElementById('motion-data').innerText =
                `Acceleration X: ${event.acceleration.x}, Y: ${event.acceleration.y}, Z: ${event.acceleration.z}`;
            if (event.acceleration.x > 1 || event.acceleration.y > 1 || event.acceleration.z > 1) { // You can adjust the threshold value
                playSound();
            }
        });
    }

    // Orientation
    if ('DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', event => {
            document.getElementById('orientation-data').innerText =
                `Alpha: ${event.alpha}, Beta: ${event.beta}, Gamma: ${event.gamma}`;
        });
    }

    // Barometer
    if ('Barometer' in window) {
        const barometer = new Barometer({frequency: 60});
        barometer.addEventListener('reading', () => {
            document.getElementById('barometer-data').innerText =
                `Pressure: ${barometer.pressure}`;
        });
        barometer.start();
    }
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker registered'))
        .catch(error => console.error('Service Worker registration failed:', error));
}
