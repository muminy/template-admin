import fs from "fs";

const pathURL = "./database/website.json";

export function getWebsites() {
  const websites = fs.readFileSync(pathURL);
  return JSON.parse(websites);
}
