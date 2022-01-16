import { commandline } from "../controllers/build";

export default async (args: string[]) => {
  commandline.start(args);
};
