exports.validateBandLevel = async (bandLevelInfo) => {
  const regex = /\d/
  bandLevel = bandLevelInfo.bandLevel
  if (bandLevel.length > 20 || bandLevel.length == 0) {
    return 'Band Level can be A maximum of 20 characters and must be populated'
  } else if ((regex.test(bandLevel)) == true) {
    return 'Band Level must not contain numbers'
  } else if (bandLevel.charAt(0) == ' ') {
    return 'Band Level must not begin with a space'
  } else if (bandLevel.charAt(bandLevel.length - 1) == ' ') {
    return 'Band Level must not end with a space'
  } else {
    return null
  }
}
