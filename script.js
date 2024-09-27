// Geolocation API
const locationInfo = document.getElementById('location-info');
document.getElementById('get-location').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        locationInfo.textContent = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
      },
      error => {
        locationInfo.textContent = `Error: ${error.message}`;
      }
    );
  } else {
    locationInfo.textContent = 'Geolocation is not supported by this browser.';
  }
});

// Battery Status API
async function getBatteryStatus() {
  const battery = await navigator.getBattery();
  document.getElementById('battery-level').textContent = `Battery Level: ${Math.floor(battery.level * 100)}%`;
  document.getElementById('battery-status').textContent = `Charging Status: ${battery.charging ? 'Charging' : 'Not Charging'}`;
  battery.addEventListener('levelchange', () => {
    document.getElementById('battery-level').textContent = `Battery Level: ${Math.floor(battery.level * 100)}%`;
  });
  battery.addEventListener('chargingchange', () => {
    document.getElementById('battery-status').textContent = `Charging Status: ${battery.charging ? 'Charging' : 'Not Charging'}`;
  });
}
getBatteryStatus();

// Clipboard API
document.getElementById('copy-btn').addEventListener('click', async () => {
  const text = document.getElementById('clipboard-input').value;
  try {
    await navigator.clipboard.writeText(text);
    alert('Text copied to clipboard');
  } catch (err) {
    alert('Failed to copy text');
  }
});
document.getElementById('paste-btn').addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    document.getElementById('paste-result').textContent = `Pasted: ${text}`;
  } catch (err) {
    alert('Failed to paste text');
  }
});

// Device Orientation API
const orientationText = document.getElementById('orientation');
window.addEventListener('deviceorientation', (event) => {
  orientationText.textContent = `Alpha: ${Math.round(event.alpha)}, Beta: ${Math.round(event.beta)}, Gamma: ${Math.round(event.gamma)}`;
});

// Network Information API
function updateNetworkInfo() {
  const networkStatus = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (networkStatus) {
    document.getElementById('network-status').textContent = `Effective Network Type: ${networkStatus.effectiveType}, Downlink: ${networkStatus.downlink} Mbps`;
  } else {
    document.getElementById('network-status').textContent = 'Network Information API not supported.';
  }
}
updateNetworkInfo();

// Fullscreen API
document.getElementById('enter-fullscreen').addEventListener('click', () => {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else {
    alert('Fullscreen API is not supported');
  }
});

// Web Share API
document.getElementById('share-btn').addEventListener('click', () => {
  if (navigator.share) {
    navigator.share({
      title: 'Web API Demo',
      text: 'Check out this Web API demo!',
      url: window.location.href
    }).catch(err => console.log('Share failed', err));
  } else {
    alert('Web Share API is not supported in this browser');
  }
});

// Vibration API with Frequency Control
const vibrateBtn = document.getElementById('vibrate-btn');
const frequencyInput = document.getElementById('vibration-frequency');

vibrateBtn.addEventListener('click', () => {
  const frequency = parseInt(frequencyInput.value, 10);
  if (navigator.vibrate) {
    navigator.vibrate([frequency, frequency]); // Two pulses for better feel
  } else {
    alert('Vibration API is not supported in this device');
  }
});

// Web Notification API
document.getElementById('notify-btn').addEventListener('click', () => {
  if (!('Notification' in window)) {
    alert('This browser does not support notifications');
  } else if (Notification.permission === 'granted') {
    new Notification('Hello! This is your notification.');
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('Hello! This is your notification.');
      }
    });
  }
});

// Media Device Access (Web Camera)
document.getElementById('start-camera').addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    document.getElementById('camera-stream').srcObject = stream;
  } catch (err) {
    alert('Failed to access camera');
  }
});

// Speech Recognition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('speech-result').textContent = `You said: ${transcript}`;
  };
  document.getElementById('start-speech').addEventListener('click', () => {
    recognition.start();
  });
} else {
  document.getElementById('speech-result').textContent = 'Speech Recognition not supported in this browser.';
}

// Speech Synthesis API
document.getElementById('speak-btn').addEventListener('click', () => {
  const text = document.getElementById('speak-text').value;
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
});

// Web Bluetooth API
document.getElementById('bluetooth-btn').addEventListener('click', async () => {
  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    });
    alert(`Connected to ${device.name}`);
  } catch (err) {
    alert('Failed to connect to Bluetooth device');
  }
});

// Device Motion API
window.addEventListener('devicemotion', (event) => {
  document.getElementById('motion-data').textContent = 
    `Acceleration X: ${event.acceleration.x}, Y: ${event.acceleration.y}, Z: ${event.acceleration.z}`;
});

// Network Speed Test (Approximation)
document.getElementById('test-network-speed').addEventListener('click', async () => {
  const start = new Date().getTime();  // Start time before fetch
  const response = await fetch('https://speed.hetzner.de/100MB.bin');  // Download 100MB file

  if (response.ok) {
    const end = new Date().getTime();  // End time after fetch
    const duration = (end - start) / 1000;  // Time taken in seconds
    const speedMbps = (100 * 8) / duration;  // 100MB file * 8 (bits per byte) / duration
    document.getElementById('speed-result').textContent = `Estimated speed: ${speedMbps.toFixed(2)} Mbps`;
  } else {
    document.getElementById('speed-result').textContent = 'Error fetching the file. Please try again.';
  }
});

// Local Storage API
document.getElementById('store-local-storage').addEventListener('click', () => {
  const text = document.getElementById('local-storage-input').value;
  localStorage.setItem('myText', text);
  document.getElementById('local-storage-output').textContent = 'Local Storage Value: ' + text;
});
document.getElementById('retrieve-local-storage').addEventListener('click', () => {
  const text = localStorage.getItem('myText');
  document.getElementById('local-storage-output').textContent = 'Local Storage Value: ' + text;
});

// Canvas API
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
document.getElementById('draw-on-canvas').addEventListener('click', () => {
  ctx.fillStyle = 'red';
  ctx.fillRect(10, 10, 50, 50);
});

// Web Workers API
document.getElementById('start-web-worker').addEventListener('click', () => {
  const worker = new Worker('worker.js'); // You'll need a 'worker.js' file
  worker.onmessage = (event) => {
    document.getElementById('web-worker-result').textContent = 'Web Worker Output: ' + event.data;
  };
  worker.postMessage('Hello from the main thread!');
});

// Web Audio API
document.getElementById('play-audio').addEventListener('click', () => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = 440; // Set frequency to A4
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  setTimeout(() => {
    oscillator.stop();
  }, 2000);
});

// Fetch API
document.getElementById('fetch-data').addEventListener('click', async () => {
  const url = document.getElementById('fetch-url').value;
  try {
    const response = await fetch(url);
    const data = await response.json();
    document.getElementById('fetch-result').textContent = `Fetched Data: ${JSON.stringify(data, null, 2)}`;
  } catch (err) {
    document.getElementById('fetch-result').textContent = `Error: ${err.message}`;
  }
});

// History API
document.getElementById('back-button').addEventListener('click', () => {
  window.history.back();
});
document.getElementById('forward-button').addEventListener('click', () => {
  window.history.forward();
});

// Offline API
window.addEventListener('online', () => {
  document.getElementById('offline-status').textContent = 'Online Status: Online';
});
window.addEventListener('offline', () => {
  document.getElementById('offline-status').textContent = 'Online Status: Offline';
});

// Payment Request API (basic example - requires payment handler setup)
document.getElementById('make-payment').addEventListener('click', () => {
  const paymentRequest = new PaymentRequest([
    {
      supportedMethods: ['basic-card'],
      data: {
        supportedNetworks: ['visa', 'mastercard', 'amex'],
        total: { label: 'Total', amount: { value: '10.00', currency: 'USD' } },
      },
    },
  ]);

  paymentRequest.show().then(paymentResponse => {
    // Handle payment response
    // ...
  }).catch(err => {
    // Handle error
    // ...
  });
});

// Push API (basic example - requires service worker and push server)
document.getElementById('subscribe-push').addEventListener('click', async () => {
  try {
    const registration = await navigator.serviceWorker.register('push.js'); // You'll need a 'push.js' service worker
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY', // Replace with your public key
    });
    // Send subscription to your server
    // ...
  } catch (err) {
    alert('Failed to subscribe to push notifications');
  }
});

// WebVR API (basic example - requires VR content)
document.getElementById('enter-vr').addEventListener('click', () => {
  if (navigator.getVRDisplays) {
    navigator.getVRDisplays().then(displays => {
      if (displays.length > 0) {
        const vrDisplay = displays[0];
        vrDisplay.requestPresent([{ source: document.getElementById('myVRScene') }] // Replace 'myVRScene' with your VR scene element
        ).then(() => {
          // VR mode is active
          // ...
        }).catch(err => {
          // Error entering VR
          // ...
        });
      } else {
        alert('No VR displays found');
      }
    });
  } else {
    alert('WebVR API is not supported');
  }
});

// WebSocket API
let socket;
document.getElementById('open-socket').addEventListener('click', () => {
  socket = new WebSocket('wss://echo.websocket.org');
  socket.addEventListener('open', () => {
    document.getElementById('socket-result').textContent = 'WebSocket connection opened.';
  });
  socket.addEventListener('message', (event) => {
    document.getElementById('socket-result').textContent = `Message received: ${event.data}`;
  });
});
document.getElementById('send-message').addEventListener('click', () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send('Hello WebSocket!');
  }
});
document.getElementById('close-socket').addEventListener('click', () => {
  if (socket) {
    socket.close();
    document.getElementById('socket-result').textContent = 'WebSocket connection closed.';
  }
});

// Proximity sensor
if ('ProximitySensor' in window) {
const sensor = new ProximitySensor();
sensor.addEventListener('reading', () => {
  document.getElementById('proximity-data').textContent = `Distance: ${sensor.distance} cm, Near: ${sensor.near}`;
});
sensor.start();
} else {
document.getElementById('proximity-data').textContent = 'Proximity Sensor API not supported.';
}

// Gyroscope sensor
if ('Gyroscope' in window) {
const sensor = new Gyroscope({ frequency: 60 });
sensor.addEventListener('reading', () => {
  document.getElementById('gyroscope-data').textContent = 
    `Angular Velocity - X: ${sensor.x.toFixed(2)}, Y: ${sensor.y.toFixed(2)}, Z: ${sensor.z.toFixed(2)}`;
});
sensor.start();
} else {
document.getElementById('gyroscope-data').textContent = 'Gyroscope Sensor API not supported.';
}

// Accelerometer sensor
if ('Accelerometer' in window) {
const sensor = new Accelerometer({ frequency: 60 });
sensor.addEventListener('reading', () => {
  document.getElementById('accelerometer-data').textContent = 
    `Acceleration - X: ${sensor.x.toFixed(2)}, Y: ${sensor.y.toFixed(2)}, Z: ${sensor.z.toFixed(2)}`;
});
sensor.start();
} else {
document.getElementById('accelerometer-data').textContent = 'Accelerometer Sensor API not supported.';
}

// Magnetometer sensor
if ('Magnetometer' in window) {
const sensor = new Magnetometer({ frequency: 60 });
sensor.addEventListener('reading', () => {
  document.getElementById('magnetometer-data').textContent = 
    `Magnetic Field - X: ${sensor.x.toFixed(2)} µT, Y: ${sensor.y.toFixed(2)} µT, Z: ${sensor.z.toFixed(2)} µT`;
});
sensor.start();
} else {
document.getElementById('magnetometer-data').textContent = 'Magnetometer Sensor API not supported.';
}