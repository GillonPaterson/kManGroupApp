exports.checkrole = async (role) => {
  for (let i = 0; i < 10; i++) {
    if (role.jobRole.includes(i)) { return 'The role name must not contain a number' }
  }

  if (role.jobRole.length > 40) { return 'The role name must be less than 40 characters' } else if (role.jobRole.length === 0) { return 'The role name must be entered' } else if (role.jobRole.charAt(0) === ' ' || role.jobRole.charAt(role.jobRole.length - 1) === ' ') { return 'The role name must not contain spaces at the start or end' } else if (role.jobSpec.length === 0) { return 'The job specification must be entered' } else if (role.jobLink.charAt(0) !== 'h' || role.jobLink.charAt(1) !== 't' || role.jobLink.charAt(2) !== 't' || role.jobLink.charAt(3) !== 'p' || role.jobLink.charAt(4) !== 's' || role.jobLink.charAt(5) !== ':' || role.jobLink.charAt(6) !== '/' || role.jobLink.charAt(7) !== '/') { return "The link must start with 'https://'" } else if (role.jobLink.length < 9) { return 'A link must be entered' } else if (role.jobResponsibilities.length === 0) { return 'The job responsibilities must be entered' } else { return 'No error' }
}
