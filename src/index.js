const fs = require("fs");
const path = require("path");
const { EOL } = require("os");
const { format } = require("prettier");
const { ConfTalks } = require("./data");

const main = () => {
  let template = fs.readFileSync(path.join(__dirname, "README.template.md"), {
    encoding: "utf8",
    flag: "r",
  });

  // Conference talks
  template = template.replace(
    "<CONFERENCE_TALKS/>",
    ConfTalks.map(
      (talk) => `#### [${talk.title}](${talk.href})\n${talk.description}`
    ).join(EOL)
  );

  const formatted = format(template, {
    parser: "markdown",
  });
  fs.writeFileSync(path.join(__dirname, "..", "README.md"), formatted);
};

main();
