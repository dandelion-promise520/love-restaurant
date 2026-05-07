const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// 监听 monorepo 的根目录
config.watchFolders = [workspaceRoot];

// 让 Metro 知道如何解析位于 workspaceRoot 的 node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// 允许在 monorepo 中自由寻址
config.resolver.disableHierarchicalLookup = false;

module.exports = withNativewind(config);
