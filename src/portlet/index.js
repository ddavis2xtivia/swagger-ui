const SwaggerUI = require("../core/index.js")
const SwaggerUIStandalonePreset = require("../standalone/index.js")


const ui = SwaggerUI({
    url: "/o/rest/swagger.json",
    dom_id: "#com-xtivia-speedray-swagger-ui",
    presets: [
      SwaggerUI.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUI.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  })

  window.ui = ui
