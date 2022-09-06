const fs = require("fs");
const path = require("path");
const { EOL } = require("os");
const { format } = require("prettier");
const data = require("./data");

const main = () => {
  let template = fs.readFileSync(path.join(__dirname, "README.template.md"), {
    encoding: "utf8",
    flag: "r",
  });

  // Projects
  const tableBody = data.Projects.map(
    (proj) =>
      `#### [${proj.title}](${proj.repoUrl})\n${proj.description} ([${proj.link.title}](${proj.link.href}))`
  ).join(EOL);

  const tBody = data.Projects.map(
    (proj) => `
    <tr>
      <td>
        ### [${proj.title}](${proj.repoUrl})
        ${proj.description}
        [${proj.link.title}](${proj.link.href}
      </td>
    </tr>
  `
  ).join(EOL);

  template = template.replace("<PROJECTS/>", `<table>${tBody}</table>`);

  // Conference talks
  template = template.replace(
    "<CONFERENCE_TALKS/>",
    data.ConfTalks.map(
      (talk) => `#### [${talk.title}](${talk.href})\n${talk.description}`
    ).join(EOL)
  );

  // Blog posts
  template = template.replace(
    "<BLOG_POSTS/>",
    data.BlogPosts.map(
      (post) => `#### [${post.title}](${post.href})\n${post.description}`
    ).join(EOL)
  );

  const formatted = format(template, {
    parser: "markdown",
  });
  fs.writeFileSync(path.join(__dirname, "..", "README.md"), formatted);
};

main();
