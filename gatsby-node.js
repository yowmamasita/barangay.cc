const path = require("path")

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/officials/)) {
    createPage({
      ...page,
      matchPath: "/officials/*",
    })
  }
}
