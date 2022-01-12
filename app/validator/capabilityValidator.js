exports.checkCapability = async (capability) => {
  capName = capability.capabilityName
  console.log('capname ' + capName)
  error = 'no error'

  const regex = /\d/

  if (capName.length > 20 || capName.length == 0) {
    error = 'Capability Name can be A maximum of 20 characters and must be populated'
  } else if ((regex.test(capName)) == true) {
    error = 'Capability Name must not contain numbers'
  } else if (capName.charAt(0) == ' ') {
    error = 'Capability Name must not begin with a space'
  } else if (capName.charAt(capName.length - 1) == ' ') {
    error = 'Capability Name must not end with a space'
  } else {
    error = 'no error'
  }

  return error
}
