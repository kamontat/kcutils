window.exclude = [];
  window.watch = false;
  window.environment = 'release';
  window.localMode = 'build';

  window.appConfig = {
    showDebugger: false,
    showExperimentalFeatures: false,
    projectGraphs: [
      {
        id: 'local',
        label: 'local',
        url: 'projectGraph.json',
      }
    ],
    defaultProjectGraph: 'local',
  };
  window.projectGraphResponse = {"hash":"c15080989c28ca20830a96a3f59fbf5167847c386690804172ec04d89c5ed3ea","projects":[{"name":"@kcconfig/stryker-config","type":"lib","data":{"tags":[],"root":"packages/configs/stryker-config","files":[{"file":"packages/configs/stryker-config/CHANGELOG.md","hash":"52c9b4fcb0dc52a91593b2eaff4d60acd7ab8f10"},{"file":"packages/configs/stryker-config/index.js","hash":"5ecd9f957b442c89784c81555260322cbd734832"},{"file":"packages/configs/stryker-config/package.json","hash":"df78b740385deb16f581b99592a36376be364fb0"},{"file":"packages/configs/stryker-config/src/constants.js","hash":"f0b85c162c43edd6ec4c8652910214ef9e9f0c83"},{"file":"packages/configs/stryker-config/src/utils.js","hash":"f956358963448484dc3915bc8a81842abf7d529a"}]}},{"name":"@kcconfig/eslint-config","type":"lib","data":{"tags":[],"root":"packages/configs/eslint-config","files":[{"file":"packages/configs/eslint-config/CHANGELOG.md","hash":"7bc29c26c0fef8a819c327853f95d0ee48248855"},{"file":"packages/configs/eslint-config/index.js","hash":"f1759d1b372576c1568c3d8a7cd94a804b76087b"},{"file":"packages/configs/eslint-config/package.json","hash":"34c6121f503d82816640b18b956e3f38d03751b2"}]}},{"name":"@kcconfig/rollup-config","type":"lib","data":{"tags":[],"root":"packages/configs/rollup-config","files":[{"file":"packages/configs/rollup-config/CHANGELOG.md","hash":"befcf54030a2db07def0fa2f09223c21a18c640a"},{"file":"packages/configs/rollup-config/index.js","hash":"358deed5ae2189aa1e8572efbf2d7273ed41b9c4"},{"file":"packages/configs/rollup-config/package.json","hash":"f45addf898515c194379290dbb53f82eef819ac1"},{"file":"packages/configs/rollup-config/src/constants.js","hash":"d8abfdb69d56368f3051caebeb8ac09cda29d857"},{"file":"packages/configs/rollup-config/src/utils.js","hash":"bd63cdc17f5daec4c252547b70bad8d48492f362"}]}},{"name":"@kcinternal/commandline","type":"lib","data":{"tags":[],"root":"packages/internal/commandline","files":[{"file":"packages/internal/commandline/.eslintrc.json","hash":"e80eac4d414ea40f999824bc8bbe992886aaab56"},{"file":"packages/internal/commandline/bin/build.js","hash":"ec9faff0b6ee6e8a9b094c4c2ef9c8c1c155e3e3"},{"file":"packages/internal/commandline/bin/clean.js","hash":"bb058e16492096d67a6933dbe2d9dff0d69efe2d"},{"file":"packages/internal/commandline/bin/core.js","hash":"f70e6a82675dee8264e87f73b3b21309a71e25ee"},{"file":"packages/internal/commandline/bin/lint.js","hash":"9b4baaab43fa22132c7fc7ca6afbcf44970662ec"},{"file":"packages/internal/commandline/bin/start.js","hash":"23dc0fbf1b7c92ea98d9db54fa1cd15e46b8eceb"},{"file":"packages/internal/commandline/bin/test.js","hash":"f4bd2ab81ac0b9461eb021fbb04d370402d3af9a"},{"file":"packages/internal/commandline/CHANGELOG.md","hash":"8ae719cc5c514bf29d10adf4003752427a46aa7c"},{"file":"packages/internal/commandline/index.ts","hash":"f27aaf6a2fcc55f7ed9462f651bbd230de6072d4"},{"file":"packages/internal/commandline/jest.config.js","hash":"3b8071540e46a294dd64803e37f6ac2766c55676"},{"file":"packages/internal/commandline/package.json","hash":"feb553e49a3e391a684df4c450becbd1522deaea","deps":["@kcinternal/runners","@kcconfig/eslint-config","@kcconfig/jest-config","@kcconfig/stryker-config","@kcconfig/ts-config","npm:typescript"]},{"file":"packages/internal/commandline/README.md","hash":"faa9abae9fa230370020c34f3277334273779db4"},{"file":"packages/internal/commandline/src/controllers/build.ts","hash":"a725bdf5ed7a6ade2e66a6e580eb0d1de25f73f0"},{"file":"packages/internal/commandline/src/controllers/clean.ts","hash":"d2c32e88121ef9eea04ee2749df87afe7b615c7a"},{"file":"packages/internal/commandline/src/controllers/general.ts","hash":"4f24e1c963af7cf5b784c1ec6552d8f46f9cc358"},{"file":"packages/internal/commandline/src/controllers/lint.ts","hash":"a61fac2f10a4a4cc36613a705589ccec591e5537"},{"file":"packages/internal/commandline/src/controllers/start.ts","hash":"aba8a0a6c1b661ec72ccbbda8e854486769788ec"},{"file":"packages/internal/commandline/src/controllers/test.ts","hash":"93355bf571a8617c77cfdddfd2d22c209831523f"},{"file":"packages/internal/commandline/src/scripts/build.ts","hash":"f13a9bd1beb1627c33896bc28f7f0d3d178deaa2"},{"file":"packages/internal/commandline/src/scripts/clean.ts","hash":"42e4d11ec59452eec8fc399a07801c083f882d1e"},{"file":"packages/internal/commandline/src/scripts/general.ts","hash":"9f7d80e4515dd025cca1b0f52f690b29f5388b18"},{"file":"packages/internal/commandline/src/scripts/lint.ts","hash":"f8d2119adddfb2928df7b877ac9f7b2b3ef06703"},{"file":"packages/internal/commandline/src/scripts/start.ts","hash":"7f446034da451413086ff396e57c5ae216d9b818"},{"file":"packages/internal/commandline/src/scripts/test.ts","hash":"ff447eee6c63ba07a1f0111bdca7ad76821bbc73"},{"file":"packages/internal/commandline/stryker.conf.js","hash":"12428e00f2bdf015fe2c900887e068ee6dcbaf35"},{"file":"packages/internal/commandline/test/build.test.ts","hash":"1f45f00ffedcb79ab7ea125166c3229b8cfa007d"},{"file":"packages/internal/commandline/tsconfig.json","hash":"c443b5143140ba963ac148c627cab07867f10281"},{"file":"packages/internal/commandline/tsconfig.prod.json","hash":"4639df6f55936a816b2e6450b13ab3d657ea4934"}]}},{"name":"@types/package_json","type":"lib","data":{"tags":[],"root":"packages/typings/package_json","files":[{"file":"packages/typings/package_json/CHANGELOG.md","hash":"7b336d347bf9bd376c86da91d58c2ee8c5f7d259"},{"file":"packages/typings/package_json/index.d.ts","hash":"b63ca1624ce016312356239b84def66b0bfda15d"},{"file":"packages/typings/package_json/package.json","hash":"a6ddafa86104d938bcda74efcfd8cfdc5fc6be8f"}]}},{"name":"@kcconfig/jest-config","type":"lib","data":{"tags":[],"root":"packages/configs/jest-config","files":[{"file":"packages/configs/jest-config/CHANGELOG.md","hash":"de97c15738f74062318235450fb029deacc06d10"},{"file":"packages/configs/jest-config/index.js","hash":"5ecd9f957b442c89784c81555260322cbd734832"},{"file":"packages/configs/jest-config/package.json","hash":"1f3f1e89d9585032bb0a2d028ff078324422a69c"},{"file":"packages/configs/jest-config/src/constants.js","hash":"5b21bd6979add0b8fb7c67f4cd7efe30a6217790"},{"file":"packages/configs/jest-config/src/utils.js","hash":"9c3a25837627709e44f1eb9c644a217c945169c6"}]}},{"name":"@kcconfig/ts-config","type":"lib","data":{"tags":[],"root":"packages/configs/ts-config","files":[{"file":"packages/configs/ts-config/CHANGELOG.md","hash":"780493d92bcc856d028764de2f499aa2f4690e05"},{"file":"packages/configs/ts-config/includes/default.json","hash":"496cc9b06923eb0b12cfe60ff018978690171841"},{"file":"packages/configs/ts-config/package.json","hash":"a21e9f44847d2f557af9802c9af7fc1458af5f27"}]}},{"name":"@kcprivate/generator","type":"lib","data":{"tags":[],"root":"packages/private/generator","files":[{"file":"packages/private/generator/_templates/package/default/eslintrc-json.ejs","hash":"1c82de3b9a754cbe99621b9b8c9534ad42962e45"},{"file":"packages/private/generator/_templates/package/default/index-ts.ejs","hash":"330a3928bfc9bb3426f539126a51f60b9b90fdc6"},{"file":"packages/private/generator/_templates/package/default/jest-config-js.ejs","hash":"898dcb52ea4dcaf25b50e570093fb759efb158dd"},{"file":"packages/private/generator/_templates/package/default/package-json.ejs","hash":"7ae9e1786c5d2ad204854f75ba135efc1059e973"},{"file":"packages/private/generator/_templates/package/default/prompt.js","hash":"ec653e5e152399c1fe11d3b140c5b6794f1fd324"},{"file":"packages/private/generator/_templates/package/default/README-md.ejs","hash":"55f16eaed187df05749d2403b3b2e06f38813520"},{"file":"packages/private/generator/_templates/package/default/rollup-config-js.ejs","hash":"6b53dcd870810a6cb45ae989342faed60bae7db8"},{"file":"packages/private/generator/_templates/package/default/src-models-demo-ts.ejs","hash":"45edf71d8b883d858464128bffc339cde884df4e"},{"file":"packages/private/generator/_templates/package/default/src-utils-merger-ts.ejs","hash":"4e222c7122db2adf2ac3ff9a396961b7207afc57"},{"file":"packages/private/generator/_templates/package/default/stryker-conf-js.ejs","hash":"d44012cee21eb31996e46ae25c6f0bfdb9acf1e1"},{"file":"packages/private/generator/_templates/package/default/test-index-test-ts.ejs","hash":"fe695408979c5433ac9bd04ca896cc757fb4a61f"},{"file":"packages/private/generator/_templates/package/default/tsconfig-json.ejs","hash":"5e8b1cf794748488d1209bfc5edd1a5a06d201d7"},{"file":"packages/private/generator/_templates/package/default/tsconfig-prod-json.ejs","hash":"10c16fff78fbe8eacae8bf4f4f5e7fe15a7ef7cd"},{"file":"packages/private/generator/_templates/package/update-browser/prompt.js","hash":"2680df6301ebe0c74a8b48fc8366139fdc507714"},{"file":"packages/private/generator/.hygen.js","hash":"4d26069d9ca124ac290955367db7862ca3c2a800"},{"file":"packages/private/generator/package.json","hash":"7760f7853b6c625e4537789348c8188bca9138dd","deps":["@kcconfig/ts-config","@types/package_json","npm:typescript"]},{"file":"packages/private/generator/src/constants/location.ts","hash":"89fa818978f50ea8271fd6330017b05d5989820a"},{"file":"packages/private/generator/src/constants/name.ts","hash":"ec19a233ab4fd6a78c0441a146f499838a21cf24"},{"file":"packages/private/generator/src/constants/pkg.ts","hash":"458eb487dd4a10e1b3c631d213eddb6e6230f1a9"},{"file":"packages/private/generator/src/index.ts","hash":"0469180cab194d20131d0b89ae5d094da5954bf2"},{"file":"packages/private/generator/src/models/pkg.ts","hash":"dd58cb2a92f12d6f78052a291fa91a2d5f0f0ead"},{"file":"packages/private/generator/src/models/tsconfig.ts","hash":"58e5ed73f042e3e944a1c80e6310e92a292005ab"},{"file":"packages/private/generator/src/utils/array.ts","hash":"a6e798f8c7804d818aa241f44e55f09c13785536"},{"file":"packages/private/generator/src/utils/location.ts","hash":"48f773b29bb66c11e58bcdd8de48d7f92f6100b9"},{"file":"packages/private/generator/src/utils/name.ts","hash":"cdb3e14de736efa90c1359797c895f14cb10dcdf"},{"file":"packages/private/generator/src/utils/pkg.ts","hash":"d59e0a8d5b368347c4875779b2b89b9f38a316ca"},{"file":"packages/private/generator/src/utils/repo.ts","hash":"c83c66c8528acde2c967b5e9cbe2a97d6f183893"},{"file":"packages/private/generator/src/utils/validator.ts","hash":"b779bdcc221e673e4a1fceb76f542cda1b99e74c"},{"file":"packages/private/generator/tsconfig.json","hash":"80772476f34814d9cdf8c7e9db1df98b95ead725"}]}},{"name":"@kcinternal/runners","type":"lib","data":{"tags":[],"root":"packages/internal/runners","files":[{"file":"packages/internal/runners/.eslintrc.json","hash":"e80eac4d414ea40f999824bc8bbe992886aaab56"},{"file":"packages/internal/runners/CHANGELOG.md","hash":"9913280b13f236f1311237199a810d82d9490cc0"},{"file":"packages/internal/runners/index.ts","hash":"4f04ccc9134475b3683d203b423b432f9ec24a1b"},{"file":"packages/internal/runners/jest.config.js","hash":"3b8071540e46a294dd64803e37f6ac2766c55676"},{"file":"packages/internal/runners/package.json","hash":"05566672458c99b1fea0132ac684259bf6fe88cb","deps":["@kcconfig/eslint-config","@kcconfig/jest-config","@kcconfig/stryker-config","@kcconfig/ts-config","@types/generic","@types/package_json","npm:typescript"]},{"file":"packages/internal/runners/README.md","hash":"012f98acc6accddaba2eba63e1779adafe511898"},{"file":"packages/internal/runners/src/commandline/Action.ts","hash":"cce2ca267dc2acb401481f8cff179966ec11d284"},{"file":"packages/internal/runners/src/commandline/Commandline.ts","hash":"59e5c2b873cae32322462a216d286bcfe6e78f88"},{"file":"packages/internal/runners/src/commandline/Execution.ts","hash":"53caa73c38f3aaea409dd89e035c03fc554f9b93"},{"file":"packages/internal/runners/src/commandline/Help.ts","hash":"16bcca59c277a5e489103774c1e993a4f0d5bf76"},{"file":"packages/internal/runners/src/commandline/Option.ts","hash":"e1f967a75f75599c5aef67f8045abd539ea60ee6"},{"file":"packages/internal/runners/src/constants/errors.ts","hash":"105e41d9f974fdb44ee0c94d2c907de58d0d6290"},{"file":"packages/internal/runners/src/contexts/ArgumentContext.ts","hash":"fcbb5c9f2ae18ff8b1a558c24b6051a4eb58e222"},{"file":"packages/internal/runners/src/contexts/CommandContext.ts","hash":"97d8345a7530c789be4cdc36bd3c721b0638a66b"},{"file":"packages/internal/runners/src/contexts/EnvContext.ts","hash":"f73414c47e75b84babcd037fdee9eaeaea7609a3"},{"file":"packages/internal/runners/src/contexts/GeneralContext.ts","hash":"993fb71f09ef916961e14ec84c3564fec25ec49f"},{"file":"packages/internal/runners/src/contexts/HistoryContext.ts","hash":"82fc99b58c67a12676e3d975e97978edfaa7cefa"},{"file":"packages/internal/runners/src/contexts/index.ts","hash":"30af4ca2c1f4d343463a9928ecf2839b5de832de"},{"file":"packages/internal/runners/src/contexts/LocationContext.ts","hash":"ff9fa64a58b9224b5b68d6a3bdec996ec783e44c"},{"file":"packages/internal/runners/src/contexts/LogContext.ts","hash":"f1117fb91c908b443247f38a785b6344e99c1a66"},{"file":"packages/internal/runners/src/contexts/PackageContext.ts","hash":"1bc014d4bd8f51be672752ab66e08c5a7733deec"},{"file":"packages/internal/runners/src/contexts/QuestionContext.ts","hash":"6b45066d1234293cbce52b341c15904e41089ebd"},{"file":"packages/internal/runners/src/models/Builder.ts","hash":"f1039c391c283ac251e1d86a7554f1237f7318be"},{"file":"packages/internal/runners/src/models/Chain.ts","hash":"d89d3fed104649b0a53ae42f71ad499dee243a01"},{"file":"packages/internal/runners/src/models/Starter.ts","hash":"3d24bd884aa20da8393469a76eda74dbce366d22"},{"file":"packages/internal/runners/src/models/Transformer.ts","hash":"881b744f66ad8b89e318085713bb613fb399acad"},{"file":"packages/internal/runners/stryker.conf.js","hash":"12428e00f2bdf015fe2c900887e068ee6dcbaf35"},{"file":"packages/internal/runners/test/commandline/Option.test.ts","hash":"405270b725317606f650022f991c6ac8c96b1857"},{"file":"packages/internal/runners/test/contexts/__mocks__/fs.ts","hash":"965e2a70463e7980456c024364264bc7fabe63d4"},{"file":"packages/internal/runners/test/contexts/ArgumentContext.test.ts","hash":"e35878814a1b21b509d6710b5e51ace029d0b071"},{"file":"packages/internal/runners/test/contexts/CommandContext.test.ts","hash":"a77d1b7cfff441a1974c45c8696742e637a8845f"},{"file":"packages/internal/runners/test/contexts/Context.test.ts","hash":"437c811a76bc1304bc15812ca9e60add94e67e92"},{"file":"packages/internal/runners/test/contexts/EnvContext.test.ts","hash":"4313b671d04903f0d22984c85d3bf63913cfe3ee"},{"file":"packages/internal/runners/test/contexts/GeneralContext.test.ts","hash":"93c7c4e0fd3e6eb9bf019a1b838be222004b7099"},{"file":"packages/internal/runners/test/contexts/HistoryContext.test.ts","hash":"74da43962caea9957f8c4a0dfe487e88f645f519"},{"file":"packages/internal/runners/test/contexts/LocationContext.test.ts","hash":"dff8f167b948a5b354f1244278e956a1a3c1c780"},{"file":"packages/internal/runners/test/contexts/LogContext.test.ts","hash":"484b49760d35845666d4ecf58805db06cea1d5a6"},{"file":"packages/internal/runners/test/contexts/PackageContext.test.ts","hash":"4879c6c5793f379752adba4f4d9277bd573844a4"},{"file":"packages/internal/runners/test/contexts/QuestionContext.test.ts","hash":"602dcebb4c89253d035ef321a3d66185c04550c1"},{"file":"packages/internal/runners/test/index.test.ts","hash":"9f267f0878ff3e9dae3444fdc21a7b6d31dd22a1"},{"file":"packages/internal/runners/tsconfig.json","hash":"c443b5143140ba963ac148c627cab07867f10281"},{"file":"packages/internal/runners/tsconfig.prod.json","hash":"4639df6f55936a816b2e6450b13ab3d657ea4934"}]}},{"name":"@kcinternal/logger","type":"lib","data":{"tags":[],"root":"packages/internal/logger","files":[{"file":"packages/internal/logger/.eslintrc.json","hash":"e80eac4d414ea40f999824bc8bbe992886aaab56"},{"file":"packages/internal/logger/CHANGELOG.md","hash":"ef28f6839770387a4ade51e50e15b2a285cdedc9"},{"file":"packages/internal/logger/index.ts","hash":"04e192fc86b132126d14fb549acb78544700a185"},{"file":"packages/internal/logger/jest.config.js","hash":"3b8071540e46a294dd64803e37f6ac2766c55676"},{"file":"packages/internal/logger/package.json","hash":"b34c0a7a6dfaa3b5fb989bed7604d29470599428","deps":["@kcconfig/eslint-config","@kcconfig/jest-config","@kcconfig/stryker-config","@kcconfig/ts-config","@kcinternal/commandline","npm:typescript"]},{"file":"packages/internal/logger/README.md","hash":"e7072d5d9328ac083b3bf35d55b44992acf503b6"},{"file":"packages/internal/logger/src/apis/build.ts","hash":"ef7239f1d6d1ee3aa0e99206dcb259412a618706"},{"file":"packages/internal/logger/src/apis/initial.ts","hash":"0f1fbd26ed0eb493f31d2e65229fa288c61672d8"},{"file":"packages/internal/logger/src/apis/log.ts","hash":"02d68ae2c5723d5bec2d125a7e911533984ad245"},{"file":"packages/internal/logger/src/builders/buildContext.ts","hash":"92002c382b03cff5d8e1dcddfed36fa632ed8eee"},{"file":"packages/internal/logger/src/builders/buildMessage.ts","hash":"614854c2cfec2c0f0ac4b19b8c3d92ad97588acb"},{"file":"packages/internal/logger/src/builders/newActions.ts","hash":"78ec01009cab2cd2d39b717ed21ea53ac1410c3c"},{"file":"packages/internal/logger/src/builders/newContext.ts","hash":"4f1825be5365b6ffce08ae609d66845e615845e6"},{"file":"packages/internal/logger/src/builders/newData.ts","hash":"088cebb5922ed295c27a1be28182de57f6dfff42"},{"file":"packages/internal/logger/src/builders/newDefaults.ts","hash":"c557a164c9b02a3b3d85bdccf9cb937f53f18e9b"},{"file":"packages/internal/logger/src/builders/newMessage.ts","hash":"1ec6067241d23f59bb7f0eed248aa62d0ccbd0a6"},{"file":"packages/internal/logger/src/builders/newSettings.ts","hash":"b93315a3698a102ec018c20c4207f4e102a3ed6d"},{"file":"packages/internal/logger/src/builders/newTransformer.ts","hash":"58450eb5c9ced06c6f76bfddd6dbb5f47af9753a"},{"file":"packages/internal/logger/src/models/Actions.ts","hash":"501dd93122ea9c75aa23e5a1ad21a500e24b40f9"},{"file":"packages/internal/logger/src/models/Context.ts","hash":"9a1d29a311fd70f38c8ce591ce8d180a694e54f0"},{"file":"packages/internal/logger/src/models/Data.ts","hash":"b16b2f42bc596d07ecea18a958139502a661d791"},{"file":"packages/internal/logger/src/models/Executors.ts","hash":"530b6e1f45566b113c44e4f99c92147161fa02aa"},{"file":"packages/internal/logger/src/models/Message.ts","hash":"815e3660e4abc19b87af8862ec5b40943d54470f"},{"file":"packages/internal/logger/src/models/Parameters.ts","hash":"0e40dcd12ad71f0fa6eb0ce115076f548ae93270"},{"file":"packages/internal/logger/src/models/Settings.ts","hash":"42c4587b7e529bdd51ba4b0e8bec1f7b8e3fc34d"},{"file":"packages/internal/logger/src/models/Transformer.ts","hash":"931245f090e3144c26dfae13d78ccb1605e08f39"},{"file":"packages/internal/logger/stryker.conf.js","hash":"12428e00f2bdf015fe2c900887e068ee6dcbaf35"},{"file":"packages/internal/logger/test/builders/newContext.test.ts","hash":"cd02122f0f7d44945a531a306951cd3920ca607d"},{"file":"packages/internal/logger/test/index.test.ts","hash":"f6b2b8d56ac4e7cf427d9302b2de9bd0349869de"},{"file":"packages/internal/logger/tsconfig.json","hash":"c443b5143140ba963ac148c627cab07867f10281"},{"file":"packages/internal/logger/tsconfig.prod.json","hash":"4639df6f55936a816b2e6450b13ab3d657ea4934"}]}},{"name":"@types/generic","type":"lib","data":{"tags":[],"root":"packages/typings/generic","files":[{"file":"packages/typings/generic/index.d.ts","hash":"d7743810e08ed8c2357b5c4d7d834ebd08b74aef"},{"file":"packages/typings/generic/package.json","hash":"140b42d7e0875528231f07292f25656e64c80541"}]}},{"name":"@kcprivate/client","type":"lib","data":{"tags":[],"root":"packages/private/client","files":[{"file":"packages/private/client/package.json","hash":"ad7aa0e1ad730595a5088d7efdef51c8de294e31","deps":["@kcprivate/rollup","@kcprivate/tsc","npm:typescript"]},{"file":"packages/private/client/src/index.ts","hash":"82ed7c1bad19a834c0d80d9f194111f073cfffb8"},{"file":"packages/private/client/tsconfig.json","hash":"e2f8487e4d914f37ab687b331d26b78c628cf3a7"}]}},{"name":"@kcprivate/rollup","type":"lib","data":{"tags":[],"root":"packages/private/rollup","files":[{"file":"packages/private/rollup/.eslintrc.json","hash":"e80eac4d414ea40f999824bc8bbe992886aaab56"},{"file":"packages/private/rollup/index.ts","hash":"e11a25260e07b283ab85e751d0e9676b153b3a98"},{"file":"packages/private/rollup/jest.config.js","hash":"3b8071540e46a294dd64803e37f6ac2766c55676"},{"file":"packages/private/rollup/package.json","hash":"452cd937b21093f4c77c5e220763ae47a5bc2ba8","deps":["@kcconfig/eslint-config","@kcconfig/jest-config","@kcconfig/rollup-config","@kcconfig/stryker-config","@kcconfig/ts-config","@kcinternal/commandline","npm:typescript"]},{"file":"packages/private/rollup/README.md","hash":"ec56366aefb2b1f06a38b5252d4e94474086c289"},{"file":"packages/private/rollup/rollup.config.js","hash":"64f47592cb29d67473d685584839d752cf9da0cf"},{"file":"packages/private/rollup/src/models/Demo.ts","hash":"3a50237f421695317533fd0575275c3e51fe8433"},{"file":"packages/private/rollup/src/utils/merger.ts","hash":"6eda2b33b9dfd6addfee6612171374b8cf47995b"},{"file":"packages/private/rollup/stryker.conf.js","hash":"12428e00f2bdf015fe2c900887e068ee6dcbaf35"},{"file":"packages/private/rollup/test/index.test.ts","hash":"e9dbf1e84e4980deb1972cd2fd6ffd17624e2f2c"},{"file":"packages/private/rollup/tsconfig.json","hash":"95b99dff639adfa6e5c6c1d9dcfbedb5240756b0"}]}},{"name":"@kcprivate/tsc","type":"lib","data":{"tags":[],"root":"packages/private/tsc","files":[{"file":"packages/private/tsc/.eslintrc.json","hash":"e80eac4d414ea40f999824bc8bbe992886aaab56"},{"file":"packages/private/tsc/index.ts","hash":"e11a25260e07b283ab85e751d0e9676b153b3a98"},{"file":"packages/private/tsc/jest.config.js","hash":"3b8071540e46a294dd64803e37f6ac2766c55676"},{"file":"packages/private/tsc/package.json","hash":"f9a5d57e4fae23e88784647c038856c896ddcd73","deps":["@kcconfig/eslint-config","@kcconfig/jest-config","@kcconfig/stryker-config","@kcconfig/ts-config","@kcinternal/commandline","npm:typescript"]},{"file":"packages/private/tsc/README.md","hash":"c7c870c161c47e4f7e1a2d2c5b8c12eae8e3a82a"},{"file":"packages/private/tsc/src/models/Demo.ts","hash":"cb5859ffff41415d30a266d65df8693e49f04a2b"},{"file":"packages/private/tsc/src/utils/merger.ts","hash":"6eda2b33b9dfd6addfee6612171374b8cf47995b"},{"file":"packages/private/tsc/stryker.conf.js","hash":"12428e00f2bdf015fe2c900887e068ee6dcbaf35"},{"file":"packages/private/tsc/test/index.test.ts","hash":"d995f72514fb616a081fe021710c651327fda55e"},{"file":"packages/private/tsc/tsconfig.json","hash":"c563f223ce61f2bded15a3653d5ced6952c3b3f7"},{"file":"packages/private/tsc/tsconfig.prod.json","hash":"80681b8132c9a0318b3848f2b5da3d1f80a44948"}]}}],"dependencies":{"@kcconfig/stryker-config":[],"@kcconfig/eslint-config":[],"@kcconfig/rollup-config":[],"@kcinternal/commandline":[{"source":"@kcinternal/commandline","target":"@kcinternal/runners","type":"static"},{"source":"@kcinternal/commandline","target":"@kcconfig/eslint-config","type":"static"},{"source":"@kcinternal/commandline","target":"@kcconfig/jest-config","type":"static"},{"source":"@kcinternal/commandline","target":"@kcconfig/stryker-config","type":"static"},{"source":"@kcinternal/commandline","target":"@kcconfig/ts-config","type":"static"}],"@types/package_json":[],"@kcconfig/jest-config":[],"@kcconfig/ts-config":[],"@kcprivate/generator":[{"source":"@kcprivate/generator","target":"@kcconfig/ts-config","type":"static"},{"source":"@kcprivate/generator","target":"@types/package_json","type":"static"}],"@kcinternal/runners":[{"source":"@kcinternal/runners","target":"@kcconfig/eslint-config","type":"static"},{"source":"@kcinternal/runners","target":"@kcconfig/jest-config","type":"static"},{"source":"@kcinternal/runners","target":"@kcconfig/stryker-config","type":"static"},{"source":"@kcinternal/runners","target":"@kcconfig/ts-config","type":"static"},{"source":"@kcinternal/runners","target":"@types/generic","type":"static"},{"source":"@kcinternal/runners","target":"@types/package_json","type":"static"}],"@kcinternal/logger":[{"source":"@kcinternal/logger","target":"@kcconfig/eslint-config","type":"static"},{"source":"@kcinternal/logger","target":"@kcconfig/jest-config","type":"static"},{"source":"@kcinternal/logger","target":"@kcconfig/stryker-config","type":"static"},{"source":"@kcinternal/logger","target":"@kcconfig/ts-config","type":"static"},{"source":"@kcinternal/logger","target":"@kcinternal/commandline","type":"static"}],"@types/generic":[],"@kcprivate/client":[{"source":"@kcprivate/client","target":"@kcprivate/rollup","type":"static"},{"source":"@kcprivate/client","target":"@kcprivate/tsc","type":"static"}],"@kcprivate/rollup":[{"source":"@kcprivate/rollup","target":"@kcconfig/eslint-config","type":"static"},{"source":"@kcprivate/rollup","target":"@kcconfig/jest-config","type":"static"},{"source":"@kcprivate/rollup","target":"@kcconfig/rollup-config","type":"static"},{"source":"@kcprivate/rollup","target":"@kcconfig/stryker-config","type":"static"},{"source":"@kcprivate/rollup","target":"@kcconfig/ts-config","type":"static"},{"source":"@kcprivate/rollup","target":"@kcinternal/commandline","type":"static"}],"@kcprivate/tsc":[{"source":"@kcprivate/tsc","target":"@kcconfig/eslint-config","type":"static"},{"source":"@kcprivate/tsc","target":"@kcconfig/jest-config","type":"static"},{"source":"@kcprivate/tsc","target":"@kcconfig/stryker-config","type":"static"},{"source":"@kcprivate/tsc","target":"@kcconfig/ts-config","type":"static"},{"source":"@kcprivate/tsc","target":"@kcinternal/commandline","type":"static"}]},"layout":{"appsDir":"apps","libsDir":"packages"},"affected":[],"focus":null,"groupByFolder":false,"exclude":[]};