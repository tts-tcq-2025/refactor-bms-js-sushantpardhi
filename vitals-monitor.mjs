async function loadingEffect(iteration, duration){
  for (let i = 0; i < iteration; i++) {
      process.stdout.write("\r* ");
      await new Promise(resolve => setTimeout(resolve, duration));
      process.stdout.write("\r *");
      await new Promise(resolve => setTimeout(resolve, duration));
    }
}

function isTemperatureOk(temperature){
  return temperature > 102 || temperature < 95;
}

function isPulseRateOK(pulseRate){
  return pulseRate < 60 || pulseRate > 100;
}

function isSPO2OK(spo2){
  return spo2 < 90;
}

function vitalStatusChecker(temperature, pulseRate, spo2){
  const checks = [
    [isTemperatureOk(temperature), "Temperature is critical!"],
    [isPulseRateOK(pulseRate),"Pulse Rate is out of range!"],
    [isSPO2OK(spo2),"Oxygen Saturation out of range!"]
  ]

  for( const [ok, message] of checks){
    if(!ok){
        return [false, message]
    }

    return [true, "All vitals normal."]
  }
}

async function vitalsOk(temperature,pulseRate,spo2) {
    const [status, message] = vitalStatusChecker(temperature,pulseRate,spo2);

    if(!status){
        console.log(message);
        await loadingEffect(6, 1000);
    }

    return status;
    
}
