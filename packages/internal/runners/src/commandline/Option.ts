export type OptionData = {
  dryrun: boolean;
};

export class Option {
  static transform(): OptionData {
    return {
      dryrun: true,
    };
  }
}
