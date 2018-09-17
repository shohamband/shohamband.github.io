var nunjucks = require('nunjucks')
var fs = require('fs')
var yaml = require('node-yaml')

function renderBurrito(eventName, name) {

  // Get the data for this restaurant
  var data = yaml.readSync('burrito/data/' + name)

  // Render the template file in the burrito folder
  var rendered = nunjucks.render('burrito/template.html', data)

  // Write the output to the burrito folder
  fs.writeFileSync('burrito/' + name.replace('.yml', '.html'), rendered)

}

function renderAllBurritos() {
  var files = fs.readdirSync('burrito/data')
  files.forEach(function(file) {
    renderBurrito(0, file)
  })
}


// Render everything once
renderAllBurritos()
// Watch for changes
fs.watch('burrito/data', renderBurrito)
fs.watch('burrito/template.html', renderAllBurritos)
