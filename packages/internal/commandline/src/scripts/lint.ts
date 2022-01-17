import { commandline } from "../controllers/lint";

export default async (args: string[]) => {
  commandline.start(args);
};
