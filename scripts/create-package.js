#!/usr/bin/env node

const fs = require("fs");
const prompt = require("prompt");
const path = require("path");
const { exec } = require("child_process");

// todo: automatically infer from lerna
const NEW_PACKAGE_VERSION = "0.0.0";
const BASE_PATH = path.resolve(__dirname, "..");
const LERNA_CLI = `${BASE_PATH}/node_modules/lerna/cli.js`;

const optionsMap = {
  app: "application-level packages",
  common: "shared components and styles",
  utils: "shared utility functions",
};

const options = Object.keys(optionsMap);

prompt.start();

prompt.get(getFirstPromptSchema(), function(err, line) {
  if (err != null) {
    console.error(err);
    return process.exit();
  }

  const choice = line.choice;

  if (choice === "q") {
    return process.exit();
  }

  if (!options.includes(choice)) {
    console.error(`'${choice}' is not a valid option`);
    return process.exit();
  }

  prompt.get(getSecondPromptSchema(choice), processSecondPrompt(choice));
});

function processSecondPrompt(choice) {
  return function(err, line) {
    if (err != null) {
      console.error(err);
      process.exit();
    }

    maybeCreatePackage(choice, line.packageName, line.packageDescription);
  };
}

function maybeCreatePackage(choice, name, description) {
  const packageName = `${name}-${choice}`;
  const packageDir = `${BASE_PATH}/packages/${packageName}`;

  if (fs.existsSync(packageDir)) {
    console.error(`Package '${packageName}' already exists.`);
    return process.exit();
  }

  // files to create:
  const packageJsonPath = `${packageDir}/package.json`;
  const tsConfigPath = `${packageDir}/tsconfig.json`;
  const indexTsx = `${packageDir}/src/index.tsx`;
  const indexScss = `${packageDir}/src/index.scss`;

  // initialize directories:
  fs.mkdirSync(packageDir);
  fs.mkdirSync(`${packageDir}/src`);

  // write files
  fs.writeFileSync(packageJsonPath, getPackageJson(packageName, description));
  fs.writeFileSync(tsConfigPath, getTsConfig());
  if (choice === "app") {
    fs.writeFileSync(indexTsx, getAppIndexFile(packageName));
    fs.writeFileSync(indexScss, "\n");
  } else {
    fs.writeFileSync(indexTsx, "\n");
  }

  exec(`${LERNA_CLI} link`, function(err, stdout, stderr) {
    if (err != null) {
      console.error(err);
      rmDir();
      return process.exit();
    }
    console.log(stdout);
    console.error(stderr);
    console.log(`'${packageName}' initialized at: ${packageDir}`);
  });
}

function getFirstPromptSchema() {
  let firstPrompt = "Choose a package type to initialize:\n";
  firstPrompt += options
    .map(option => ` * ${option}: ${optionsMap[option]}\n`)
    .join("");
  firstPrompt += " > type 'q' or `ctrl + c` to exit.";

  return {
    properties: {
      choice: {
        description: firstPrompt,
        required: true,
        before: function(value) {
          return value.trim().toLowerCase();
        },
      },
    },
  };
}

function getSecondPromptSchema(choice) {
  return {
    properties: {
      packageName: {
        description: `Enter package name (without -${choice} suffix)`,
        pattern: /^[a-z\-]+$/,
        required: true,
        message:
          "Package name must be only lower-case letters or dashes (i.e. 'package-name').",
      },
      packageDescription: {
        description: "Enter description (optional)",
        required: false,
      },
    },
  };
}

function getPackageJson(packageName, packageDescription) {
  const json = {
    name: `@twisterland/${packageName}`,
    version: NEW_PACKAGE_VERSION,
    description: packageDescription != null ? packageDescription : "",
    main: "src/index.tsx",
    repository: {
      type: "git",
      url: "git@github.com:ninjiangstar/twisterland.git",
      directory: `packages/${packageName}`,
    },
    author: "Twisterland",
    license: "MIT",
    dependencies: {},
    devDependencies: {},
  };
  return JSON.stringify(json, null, 2) + "\n";
}

function getTsConfig() {
  const json = {
    extends: "../../tsconfig.json",
    include: ["src"],
  };
  return JSON.stringify(json, null, 2) + "\n";
}

function getAppIndexFile(packageName) {
  return `import * as React from "react";
import "./index.scss";

export const ${convertCamelCase(packageName)} = React.memo(() => {
  return <div>Hello world!</div>;
});\n`;
}

function convertCamelCase(dashedName) {
  return dashedName
    .split("-")
    .map(function(part) {
      return part[0].toUpperCase() + part.slice(1);
    })
    .join("");
}

function rmDir(dirPath) {
  try {
    var files = fs.readdirSync(dirPath);
  } catch (e) {
    return;
  }
  files.forEach(function(file) {
    var filePath = dirPath + "/" + file;
    if (fs.statSync(filePath).isFile()) {
      fs.unlinkSync(filePath);
    } else {
      rmDir(filePath);
    }
  });
  fs.rmdirSync(dirPath);
}
