window.exclude = [];
  window.watch = false;
  window.environment = 'release';
  window.localMode = 'build';
  
  window.appConfig = {
    showDebugger: false,
    projectGraphs: [
      {
        id: 'local',
        label: 'local',
        url: 'projectGraph.json',
      }
    ],
    defaultProjectGraph: 'local',
  };
  window.projectGraphResponse = {"hash":"7abe195edb1ecafc2dabab4d63fa0ec632f6806055029edf0ff21092080e2dfc","projects":[{"name":"gatsby-plugin-intl","type":"lib","data":{"tags":[],"root":"legacy-packages/gatsby-plugin-intl","files":[]}},{"name":"@kcconfig/stryker-config","type":"lib","data":{"tags":[],"root":"packages/configs/stryker-config","files":[]}},{"name":"@kcconfig/eslint-config","type":"lib","data":{"tags":[],"root":"packages/configs/eslint-config","files":[]}},{"name":"@kcconfig/rollup-config","type":"lib","data":{"tags":[],"root":"packages/configs/rollup-config","files":[]}},{"name":"@types/lerna__project","type":"lib","data":{"tags":[],"root":"packages/typings/lerna_project","files":[]}},{"name":"gatsby-config","type":"lib","data":{"tags":[],"root":"legacy-packages/gatsby-config","files":[]}},{"name":"react-testkit","type":"lib","data":{"tags":[],"root":"legacy-packages/react-testkit","files":[]}},{"name":"@kcinternal/commandline","type":"lib","data":{"tags":[],"root":"packages/internal/commandline","files":[]}},{"name":"@types/package_json","type":"lib","data":{"tags":[],"root":"packages/typings/package_json","files":[]}},{"name":"@kcconfig/jest-config","type":"lib","data":{"tags":[],"root":"packages/configs/jest-config","files":[]}},{"name":"@kcconfig/ts-config","type":"lib","data":{"tags":[],"root":"packages/configs/ts-config","files":[]}},{"name":"@kcprivate/generator","type":"lib","data":{"tags":[],"root":"packages/private/generator","files":[]}},{"name":"@kcinternal/runners","type":"lib","data":{"tags":[],"root":"packages/internal/runners","files":[]}},{"name":"example","type":"lib","data":{"tags":[],"root":"legacy-packages/_example","files":[]}},{"name":"@kcinternal/logger","type":"lib","data":{"tags":[],"root":"packages/internal/logger","files":[]}},{"name":"@types/generic","type":"lib","data":{"tags":[],"root":"packages/typings/generic","files":[]}},{"name":"testkit","type":"lib","data":{"tags":[],"root":"legacy-packages/testkit","files":[]}},{"name":"@kcprivate/client","type":"lib","data":{"tags":[],"root":"packages/private/client","files":[]}},{"name":"@kcprivate/rollup","type":"lib","data":{"tags":[],"root":"packages/private/rollup","files":[]}},{"name":"graph","type":"lib","data":{"tags":[],"root":"legacy-packages/_graph","files":[]}},{"name":"models","type":"lib","data":{"tags":[],"root":"legacy-packages/models","files":[]}},{"name":"helper","type":"lib","data":{"tags":[],"root":"packages/public/helper","files":[]}},{"name":"logger","type":"lib","data":{"tags":[],"root":"packages/public/logger","files":[]}},{"name":"random","type":"lib","data":{"tags":[],"root":"packages/public/random","files":[]}},{"name":"color","type":"lib","data":{"tags":[],"root":"legacy-packages/color","files":[]}},{"name":"error","type":"lib","data":{"tags":[],"root":"legacy-packages/error","files":[]}},{"name":"@kcinternal/graph","type":"lib","data":{"tags":[],"root":"legacy-packages/graph","files":[]}},{"name":"money","type":"lib","data":{"tags":[],"root":"legacy-packages/money","files":[]}},{"name":"@kcprivate/tsc","type":"lib","data":{"tags":[],"root":"packages/private/tsc","files":[]}}],"dependencies":{"gatsby-plugin-intl":[{"source":"gatsby-plugin-intl","target":"error","type":"static"},{"source":"gatsby-plugin-intl","target":"helper","type":"static"},{"source":"gatsby-plugin-intl","target":"@kcinternal/commandline","type":"static"}],"@kcconfig/stryker-config":[],"@kcconfig/eslint-config":[],"@kcconfig/rollup-config":[],"@types/lerna__project":[{"source":"@types/lerna__project","target":"@types/package_json","type":"static"}],"gatsby-config":[{"source":"gatsby-config","target":"helper","type":"static"},{"source":"gatsby-config","target":"logger","type":"static"},{"source":"gatsby-config","target":"@kcinternal/commandline","type":"static"}],"react-testkit":[{"source":"react-testkit","target":"@kcinternal/commandline","type":"static"}],"@kcinternal/commandline":[{"source":"@kcinternal/commandline","target":"@kcconfig/jest-config","type":"static"},{"source":"@kcinternal/commandline","target":"@kcinternal/runners","type":"static"},{"source":"@kcinternal/commandline","target":"@kcconfig/eslint-config","type":"static"},{"source":"@kcinternal/commandline","target":"@kcconfig/stryker-config","type":"static"},{"source":"@kcinternal/commandline","target":"@kcconfig/ts-config","type":"static"}],"@types/package_json":[],"@kcconfig/jest-config":[],"@kcconfig/ts-config":[],"@kcprivate/generator":[{"source":"@kcprivate/generator","target":"@types/package_json","type":"static"},{"source":"@kcprivate/generator","target":"@kcconfig/ts-config","type":"static"}],"@kcinternal/runners":[{"source":"@kcinternal/runners","target":"@kcconfig/jest-config","type":"static"},{"source":"@kcinternal/runners","target":"@kcconfig/eslint-config","type":"static"},{"source":"@kcinternal/runners","target":"@kcconfig/stryker-config","type":"static"},{"source":"@kcinternal/runners","target":"@kcconfig/ts-config","type":"static"},{"source":"@kcinternal/runners","target":"@types/generic","type":"static"},{"source":"@kcinternal/runners","target":"@types/package_json","type":"static"}],"example":[{"source":"example","target":"@kcinternal/commandline","type":"static"}],"@kcinternal/logger":[{"source":"@kcinternal/logger","target":"@kcconfig/jest-config","type":"static"},{"source":"@kcinternal/logger","target":"@kcconfig/eslint-config","type":"static"},{"source":"@kcinternal/logger","target":"@kcconfig/stryker-config","type":"static"},{"source":"@kcinternal/logger","target":"@kcconfig/ts-config","type":"static"},{"source":"@kcinternal/logger","target":"@kcinternal/commandline","type":"static"}],"@types/generic":[],"testkit":[{"source":"testkit","target":"@kcinternal/commandline","type":"static"}],"@kcprivate/client":[{"source":"@kcprivate/client","target":"@kcprivate/rollup","type":"static"},{"source":"@kcprivate/client","target":"@kcprivate/tsc","type":"static"}],"@kcprivate/rollup":[{"source":"@kcprivate/rollup","target":"@kcconfig/jest-config","type":"static"},{"source":"@kcprivate/rollup","target":"@kcconfig/eslint-config","type":"static"},{"source":"@kcprivate/rollup","target":"@kcconfig/rollup-config","type":"static"},{"source":"@kcprivate/rollup","target":"@kcconfig/stryker-config","type":"static"},{"source":"@kcprivate/rollup","target":"@kcconfig/ts-config","type":"static"},{"source":"@kcprivate/rollup","target":"@kcinternal/commandline","type":"static"}],"graph":[{"source":"graph","target":"@kcinternal/graph","type":"static"},{"source":"graph","target":"@kcinternal/commandline","type":"static"}],"models":[{"source":"models","target":"helper","type":"static"},{"source":"models","target":"@kcinternal/commandline","type":"static"}],"helper":[{"source":"helper","target":"@kcconfig/jest-config","type":"static"},{"source":"helper","target":"@types/generic","type":"static"},{"source":"helper","target":"@kcconfig/eslint-config","type":"static"},{"source":"helper","target":"@kcconfig/rollup-config","type":"static"},{"source":"helper","target":"@kcconfig/stryker-config","type":"static"},{"source":"helper","target":"@kcconfig/ts-config","type":"static"},{"source":"helper","target":"@kcinternal/commandline","type":"static"}],"logger":[{"source":"logger","target":"@kcconfig/jest-config","type":"static"},{"source":"logger","target":"helper","type":"static"},{"source":"logger","target":"@kcconfig/eslint-config","type":"static"},{"source":"logger","target":"@kcconfig/rollup-config","type":"static"},{"source":"logger","target":"@kcconfig/stryker-config","type":"static"},{"source":"logger","target":"@kcconfig/ts-config","type":"static"},{"source":"logger","target":"@kcinternal/commandline","type":"static"}],"random":[{"source":"random","target":"@kcconfig/jest-config","type":"static"},{"source":"random","target":"@kcconfig/eslint-config","type":"static"},{"source":"random","target":"@kcconfig/rollup-config","type":"static"},{"source":"random","target":"@kcconfig/stryker-config","type":"static"},{"source":"random","target":"@kcconfig/ts-config","type":"static"},{"source":"random","target":"@kcinternal/commandline","type":"static"}],"color":[{"source":"color","target":"error","type":"static"},{"source":"color","target":"helper","type":"static"},{"source":"color","target":"logger","type":"static"},{"source":"color","target":"@kcinternal/commandline","type":"static"}],"error":[{"source":"error","target":"helper","type":"static"},{"source":"error","target":"models","type":"static"},{"source":"error","target":"@kcinternal/commandline","type":"static"}],"@kcinternal/graph":[{"source":"@kcinternal/graph","target":"@kcinternal/commandline","type":"static"},{"source":"@kcinternal/graph","target":"@types/lerna__project","type":"static"},{"source":"@kcinternal/graph","target":"@types/package_json","type":"static"}],"money":[{"source":"money","target":"error","type":"static"},{"source":"money","target":"helper","type":"static"},{"source":"money","target":"logger","type":"static"},{"source":"money","target":"@kcinternal/commandline","type":"static"},{"source":"money","target":"random","type":"static"}],"@kcprivate/tsc":[{"source":"@kcprivate/tsc","target":"@kcconfig/jest-config","type":"static"},{"source":"@kcprivate/tsc","target":"@kcconfig/eslint-config","type":"static"},{"source":"@kcprivate/tsc","target":"@kcconfig/stryker-config","type":"static"},{"source":"@kcprivate/tsc","target":"@kcconfig/ts-config","type":"static"},{"source":"@kcprivate/tsc","target":"@kcinternal/commandline","type":"static"}]},"layout":{"appsDir":"apps","libsDir":"packages"},"affected":[],"focus":null,"groupByFolder":false,"exclude":[]};