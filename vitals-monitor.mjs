function isTemperatureOk(temperature) {
  return temperature >= 95 && temperature <= 102;
}

function isPulseRateOk(pulseRate) {
  return pulseRate >= 60 && pulseRate <= 100;
}

function isSpo2Ok(spo2) {
  return spo2 >= 90;
}

function vitalsStatus(temperature, pulseRate, spo2) {
  const checks = [
    [isTemperatureOk(temperature), "Temperature critical!"],
    [isPulseRateOk(pulseRate), "Pulse Rate is out of range!"],
    [isSpo2Ok(spo2), "Oxygen Saturation out of range!"],
  ];

  for (const [ok, message] of checks) {
    if (!ok) {
      return [false, message];
    }
  }
  return [true, "All vitals normal."];
}

async function blinkWarning(times = 6, delay = 1000) {
  for (let i = 0; i < times; i++) {
    process.stdout.write("\r* ");
    await new Promise((resolve) => setTimeout(resolve, delay));
    process.stdout.write("\r *");
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

export async function vitalsOk(temperature, pulseRate, spo2) {
  const [ok, message] = vitalsStatus(temperature, pulseRate, spo2);
  if (!ok) {
    console.log(message);
    await blinkWarning();
  }
  return ok;
}
