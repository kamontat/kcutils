import { lerna } from "../lerna/core";
import { Helper } from "../..";

type CommandType = "updated" | "version" | "release";

type ReleaseName = "beta" | "alpha" | "rc" | "live" | "";

type Callback = (releaseName: string, releaseFullName: string) => string[];

const onReleaseName = (releaseName: ReleaseName, preCallback: Callback, liveCallback: Callback, callback: Callback) => {
  if (releaseName === "beta" || releaseName === "alpha" || releaseName === "rc") {
    return preCallback(releaseName, releaseName === "rc" ? "release candidate" : releaseName);
  } else if (releaseName === "live") {
    return liveCallback(releaseName, releaseName);
  } else {
    return callback("", "");
  }
};

const onUpdatedType = (_helper: Helper): string[] => {
  return ["updated", "--long"];
};

const onVersionType = (releaseName: ReleaseName, helper: Helper): string[] => {
  const prefix = helper.env.isCI() ? "auto " : "";
  const suffix = helper.env.isCI() ? " [skip ci]" : "";

  const defaultArguments = [
    "version", // require parameters
    "--exact", // create version without ^ or ~
    "--conventional-commits", // use convertional commit
    "--changelog-preset",
    "angular", // convertional commit is angular
    "--create-release",
    "github", // create release on github too
    "--sign-git-commit", // sign git commit
    "--sign-git-tag", // sign git tag
    "--no-private", // ignore private packages
  ];

  const preReleaseCB: Callback = (id, name) => {
    return [
      "--preid",
      id,
      "--conventional-prerelease",
      "--message",
      `chore(prerelease): ${prefix}publish ${name} version${suffix}`,
    ];
  };

  const releaseCB: Callback = () => {
    return ["--conventional-graduate", "--message", `chore(release): ${prefix}publish public version${suffix}`];
  };

  const cb: Callback = () => {
    return ["--message", `chore(release): ${prefix}publish version${suffix}`];
  };

  return defaultArguments.concat(...onReleaseName(releaseName, preReleaseCB, releaseCB, cb));
};

const onReleaseType = (releaseName: ReleaseName, _helper: Helper): string[] => {
  const defaultArguments = ["publish", "from-git"];

  const preReleaseCB: Callback = id => {
    const npmName = id === "rc" ? "next" : id;
    return ["--dist-tag", npmName];
  };

  const cb: Callback = () => {
    return ["--dist-tag", "latest"];
  };

  return defaultArguments.concat(...onReleaseName(releaseName, preReleaseCB, cb, cb));
};

const cli = lerna(({ data, helper }) => {
  const _type = data.type;
  if (!_type) throw new Error(`--type is required`);
  if (_type !== "version" && _type !== "updated" && _type !== "release")
    throw new Error(`--type accepts only [updated, version, release], got ${_type}`);

  const type = _type as CommandType;

  const _releaseName = data.name ?? "";
  if (
    (type === "version" || type === "release") &&
    _releaseName !== "beta" &&
    _releaseName !== "alpha" &&
    _releaseName !== "rc" &&
    _releaseName !== "live" &&
    _releaseName !== ""
  )
    throw new Error(`--name accepts only [beta, alpha, rc, live, <empty_string>], got ${_type}`);

  const releaseName = _releaseName as ReleaseName;

  const defaultArguments: string[] = [];
  if (helper.env.isCI()) defaultArguments.push("--yes");

  if (type === "updated") return { arguments: defaultArguments.concat(...onUpdatedType(helper)) };
  else if (type === "version")
    return {
      arguments: defaultArguments.concat(...onVersionType(releaseName, helper)),
    };
  else if (type === "release") return { arguments: defaultArguments.concat(...onReleaseType(releaseName, helper)) };
  else return { override: true, arguments: ["echo", "unknown type"] };
});

cli.start();
