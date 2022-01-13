const fs = require('fs')

exports.createfile = async (webpage, name) => {
  console.log(webpage)
  fs.writeFile('/assets/snapshots/image.html', webpage)
}
