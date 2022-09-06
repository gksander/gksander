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
        ${h4Link(proj.title, proj.repoUrl)}
        <p>${proj.description}</p>
        ${pLink(`👀 ${proj.link.title}`, proj.link.href)}
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
  const blogPostBody = data.BlogPosts.map(
    (post) => stripIndent`
    <tr>
      <td>
        ${h4Link(post.title, post.href)}
        <p>${post.description}</p>
      </td>
    </tr>
  `
  ).join(EOL);
  template = template.replace(
    "<BLOG_POSTS/>",
    `<table>${blogPostBody}</table>`
  );

  const formatted = format(template, {
    parser: "markdown",
  });
  fs.writeFileSync(path.join(__dirname, "..", "README.md"), formatted);
};

const h4Link = (title, href) =>
  ` <h4><a href="${href}" target="_blank" rel="noreferrer">${title}</a></h4>`;

const pLink = (title, href) =>
  `<p><a href="${href}" target="_blank" rel="noreferrer">${title}</a></p>`;

main();
