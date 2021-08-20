const fs = require("fs");

const pathURL = "./database/website.json";

function getWebsites() {
  const websites = fs.readFileSync(pathURL);
  return JSON.parse(websites);
}

function addNewWebsite(website) {
  const websites = getWebsites();
  const totalwebsite = [...websites, website];
  fs.writeFileSync(pathURL, JSON.stringify(totalwebsite));
}

function deleteWebsite(index) {
  const websites = getWebsites();
  websites.splice(index, 1);
  fs.writeFileSync(pathURL, JSON.stringify(websites));
}

module.exports = { addNewWebsite, deleteWebsite, getWebsites };
