const { override, fixBabelImports } = require("customize-cra")

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  })
)

// const { override, fixBabelImports, addLessLoader } = require("customize-cra")

// module.exports = override(
//   fixBabelImports("import", {
//     libraryName: "antd",
//     libraryDirectory: "es",
//     style: true
//   }),
//   addLessLoader({
//     javascriptEnabled: true,
//     modifyVars: { "@primary-color": "#55AB80" }
//   })
// )

// const theme = {
//   green: "#6FC99C",
//   darkGreen: "#55AB80",
//   black: " #373737",
//   gray: " #F2F2F2",
//   darkGray: "#E9E9E9",
//   white: "#fff",
//   textBlack: "#383D3E"
// }

// @primary-color: #1890ff; // primary color for all components
// @link-color: #1890ff; // link color
// @success-color: #52c41a; // success state color
// @warning-color: #faad14; // warning state color
// @error-color: #f5222d; // error state color
// @font-size-base: 14px; // major text font size
// @heading-color: rgba(0, 0, 0, 0.85); // heading text color
// @text-color: rgba(0, 0, 0, 0.65); // major text color
// @text-color-secondary : rgba(0, 0, 0, .45); // secondary text color
// @disabled-color : rgba(0, 0, 0, .25); // disable state color
// @border-radius-base: 4px; // major border radius
// @border-color-base: #d9d9d9; // major border color
// @box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.15); // major shadow for layers
