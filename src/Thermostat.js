function Thermostat() {
  this.temperature = 20;
  this.minTemp = 10;
  this.maxTemp = 32;
  this.powerSaving = true;
  this.powerSavingMax = 25;
  this.energy = 'medium-usage';
}

Thermostat.prototype.increase = function() {
  if ((this.powerSaving === true)&&(this.temperature === this.powerSavingMax)) {
      var maxError = Error('Max temp in power saving mode is 25 degrees');
      throw maxError;
  } else if ((this.powerSaving === false)&&(this.temperature === this.maxTemp)) {
      var maxTempError = Error('Max temp is 32 degrees');
      throw maxTempError;
  } else {
      this.temperature += 1;
      this._energyUsageChange();
}
};

Thermostat.prototype.decrease = function() {
  if (this.temperature === this.minTemp) {
    var minError = Error('Unable to decrease below 10 degrees');
    throw minError;
  } else {
    this.temperature -= 1;
    this._energyUsageChange();
  }
};

Thermostat.prototype.powerSavingToggle = function() {
  this.powerSaving = this.powerSaving === true ? false : true;
  if(this.temperature > this.powerSavingMax) {
    this.temperature = this.powerSavingMax;
  }
};

// Thermostat.prototype.powerSavingOn = function() {
//   this.powerSaving = true;
// };

Thermostat.prototype.tempReset = function() {
  this.temperature = 20;
};

Thermostat.prototype._energyUsageChange = function() {
  if (this.temperature < 18) {
    this.energy = 'low-usage';
  } else if (this.temperature > 25) {
    this.energy = 'high-usage';
  } else {
    this.energy = 'medium-usage';
  }
};
