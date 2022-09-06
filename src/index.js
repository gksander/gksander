const fs = require("fs");
const path = require("path");
const { EOL } = require("os");
const { format } = require("prettier");
const { stripIndent } = require("common-tags");
const data = require("./data");

const main = () => {
  let template = fs.readFileSync(path.join(__dirname, "README.template.md"), {
    encoding: "utf8",
    flag: "r",
  });

  // Projects
  const projectTableBody = data.Projects.map(
    (proj) => stripIndent`
    <tr>
      <td>
        <h3><a href="${proj.repoUrl}" target="_blank" rel="noreferrer">${proj.title}</a></h3>
        <p>${proj.description}</p>
        <p><a href="${proj.link.href}" target="_blank" rel="noreferrer">${proj.link.title} 👀</a></p>
      </td>
      <td>...</td>
    </tr>
  `
  ).join(EOL);

  template = template.replace(
    "<PROJECTS/>",
    `<table>${projectTableBody}</table>`
  );

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
