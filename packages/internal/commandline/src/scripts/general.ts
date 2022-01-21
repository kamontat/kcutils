import { commandline } from "../controllers/general";

export default async (args: string[]) => {
  commandline.start(args);
};
