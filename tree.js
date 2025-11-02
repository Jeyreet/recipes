import fs from "fs";
import path from "path";

function buildTree(dir, prefix) {
  prefix = prefix || "";
  const items = fs
    .readdirSync(dir)
    .filter((f) => ![".vscode", "data", "node_modules", "dist"].includes(f));

  items.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isLast = index === items.length - 1;
    const pointer = isLast ? "└── " : "├── ";
    console.log(prefix + pointer + item);

    if (fs.statSync(fullPath).isDirectory()) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      buildTree(fullPath, newPrefix);
    }
  });
}

console.log(".");
buildTree(".");
