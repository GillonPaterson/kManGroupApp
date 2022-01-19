exports.validateBandLevelTraining = async (training) => {
  if (training === '_unchecked') {
    return 'You must select at least one training'
  } else if (training.length > 6) {
    return 'you can\'t select more that 6 trainings'
  } else {
    return null
  }
}
