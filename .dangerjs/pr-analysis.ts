import { danger, warn, message } from "danger";

const modifiedMD = danger.git.modified_files.join("- ");
message("Changed Files in this PR: \n - " + modifiedMD);

// No PR is too small to include a description of why you made a change
if (!danger.github.pr.body || danger.github.pr.body.length < 10) {
  warn("Please include a description of your PR changes.");
}
