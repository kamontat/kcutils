import { Helpers, ArgumentHelper, GeneralHelper } from "./helpers";

const h = Helpers.new();
const helper = h
  .extends(new GeneralHelper())
  .extends(new ArgumentHelper(process.argv));

console.log(helper.get("argument").getParsed());

// // const arguments = Argument.builder(process.argv).toObject();

// // Commandline.builder(helper)
// //   .transformer(() => {
// //     return ["echo", "hello, world"];
// //   })
// //   .start({ debug: true });

// // Runner.builder(helper)
// //   .transformer(() => {
// //     console.log("start new runner");
// //   })
// //   .start({ debug: false });

// const dd = Data.new("123", { hello: true });
// const proc = new DataProcess(dd, helper);
// const newProc = proc.transform(({ data }) => {
//   return data.setFn(({ data, option }) => ({ data: parseInt(data), option }));
// });

// console.log(proc);
// console.log(newProc);

// // const d = Data.new("test", { test: true });
// // const n = d
// //   .build((d) => d.clone())
// //   .action(console.log)
// //   .build((d) => d.clone({ data: 100 }))
// //   .action(console.log)
// //   .build((d) => d.clone({ option: { unknown: 123 } }))
// //   .action(console.log)
// //   .build((d) => d.clone({ data: true, option: { test: false, newTest: true } }))
// //   .action(console.log)
// //   .build((d) => d.setData(500))
// //   .action(console.log)
// //   .build((d) => d.setDataFn((d) => "prefix " + d.toFixed(2)))
// //   .action(console.log)
// //   .build((d) => d.setOption({ override: true, number: 99 }))
// //   .action(console.log)
// //   .build((d) =>
// //     d.setOptionFn((o) => ({
// //       ...o,
// //       override: !o.override,
// //       number: (o.number * 10) / 0.5,
// //     }))
// //   )
// //   .action(console.log)
// //   .clone({ option: { hello: "world" } });

// // console.log(JSON.stringify(n));
