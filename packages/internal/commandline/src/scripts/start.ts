import { commandline } from "../controllers/start";

export default async (args: string[]) => {
  commandline.start(args);
};
