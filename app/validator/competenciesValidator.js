exports.validateBandLevelCompetencies = async (competencies) => {
  if (competencies === '_unchecked') {
    return 'You must select at least one competency'
  } else if (competencies.length > 6) {
    return 'you can\'t select more that 6 competencies'
  } else {
    return null
  }
}
