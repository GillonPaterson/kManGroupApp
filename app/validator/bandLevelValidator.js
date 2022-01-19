exports.validateBandLevel = async (bandLevelInfo) => {
  const regex = /\d/
  const specialCharRegex = /^[a-zA-Z\s]+$/

  var bandLevel = bandLevelInfo.jobBandLevel
  if (bandLevel.length > 40 || bandLevel.length === 0) {
    return 'Band Level can be A maximum of 40 characters and must be populated'
  } else if ((regex.test(bandLevel)) === true) {
    return 'Band Level must not contain numbers'
  } else if ((specialCharRegex.test(bandLevel)) === false) {
    return 'Band Level must not contain special characters'
  } else {
    return null
  }
}
