// must exist after **global** charts is created :(
// todo - refactor - everything below here !

function toggleHighContrastMode(value) {
  if (value === "on") {
    isHighContrastMode = true;
  } else if (value === "off") {
    isHighContrastMode = false;
  } else {
    isHighContrastMode = !isHighContrastMode;
  }
  handleGaEvent(isHighContrastMode ? track.ENABLE_HIGH_CONTRAST : track.DISABLE_HIGH_CONTRAST);
  // switch to high contrast mode
  d3.select('body').classed('is-high-contrast', isHighContrastMode);
  modeButton.classed('is-high-contrast', isHighContrastMode);

  charts.forEach((c) => {
    c.switchColorMode(isHighContrastMode);
  });
  if (localStorage) {
    localStorage.setItem('high_contrast_mode', isHighContrastMode ? "on" : "off");
  }
}

if (localStorage) {
  let storedHighContrastMode = localStorage.getItem('high_contrast_mode');
  if (storedHighContrastMode === "on") {  // localStorage sets Boolean as String
    // must jquery trigger to trick the css checkbox to "switch" - :(
    $modeButton.trigger('click');
    // programmatically trigger the application values
    toggleHighContrastMode.call(this, "on")
  } else {
    // programmatically trigger the application values
    toggleHighContrastMode.call(this, "off");
  }
}

modeButton.on('click', toggleHighContrastMode);
