describe('Thermostat', function(){
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('gives the temperature', function() {
    expect(thermostat.temperature).toEqual(20);
  });

  it('increases the temperature', function() {
    thermostat.increase();
    expect(thermostat.temperature).toEqual(21);
  });

  it('decreases the temperature', function() {
    thermostat.decrease();
    expect(thermostat.temperature).toEqual(19);
  });

  it('will not allow the temp below 10 degrees', function() {
    thermostat.temperature = 10;
    expect(function(){thermostat.decrease()}).toThrowError("Unable to decrease below 10 degrees");
  });

  it('can put the power saving mode on', function() {
    thermostat.powerSaving = false;
    thermostat.powerSavingToggle();
    expect(thermostat.powerSaving).toBe(true);
  });

  it('can put the power saving mode off', function() {
    thermostat.powerSavingToggle();
    expect(thermostat.powerSaving).toBe(false);
  });


  it('restricts the max temp to 25 degrees when power saving mode is on', function() {
    thermostat.temperature = 25;
    expect(function(){thermostat.increase()}).toThrowError('Max temp in power saving mode is 25 degrees');
  });

  it('restricts the max temp to 32 degrees when power saving mode is off', function() {
    thermostat.powerSavingToggle();
    thermostat.temperature = 32;
    expect(function(){thermostat.increase()}).toThrowError('Max temp is 32 degrees');
  });

  it('power saving mode is on by default', function() {
    expect(thermostat.powerSaving).toBe(true);
  });

  it('resets the temp to 20 degrees', function() {
    thermostat.temperature = 26;
    thermostat.tempReset();
    expect(thermostat.temperature).toEqual(20);
  });

  it('gives energy usage as low usage if temp below 18 degrees', function() {
    thermostat.temperature = 18;
    thermostat.decrease();
    expect(thermostat.energy).toEqual('low-usage');
  });

  it('gives energy usage as medium usage if temp is between 18 and 25 degrees', function() {
    expect(thermostat.energy).toEqual('medium-usage');
  });

  it('gives energy usage as high usage if temp is above 25 degrees', function() {
    thermostat.temperature = 25;
    thermostat.powerSavingToggle();
    thermostat.increase();
    expect(thermostat.energy).toEqual('high-usage');
  });
});
