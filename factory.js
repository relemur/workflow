const fs = require('fs')
const cheerio = require('cheerio')

module.exports = (componentName) => {
const componentID = `#${componentName}Component`

const component = fs.readFileSync(`./components/${componentName}.html`, 'utf-8')

const $ = cheerio.load(component)

const html = $(componentID)
let script = $('script')
script = script.get()[1].children[0].data

return `
const ${componentName}Component = parser.parseFromString(\`${html}\`, 'text/html')
const ${componentName}Html = ${componentName}Component.getElementById('${componentName}Component')
const ${componentName}Hook = document.getElementsByTagName('W${componentName}')[0]
const ${componentName}ComponentClasses = ${componentName}Hook.getAttribute('class')
if (${componentName}ComponentClasses) {
  ${componentName}Html.className = ${componentName}ComponentClasses
}
const ${componentName}HookParent = ${componentName}Hook.parentNode
${componentName}HookParent.replaceChild(${componentName}Html, ${componentName}Hook)
${script}
`
}