import fs from "fs";
import query from "./db";

export const populateJobs = (path: string) => {
  let jobs: any = {};

  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const lines = data.split("\n");
    lines.map((line) => {
      const cleanLine = line.replace("\r", "");
      const [name, description] = cleanLine.split(": ");
      jobs[name] = description;
    });

    for (const key in jobs) {
      query("INSERT INTO skills (name, description) VALUES(?,?)", [
        key,
        jobs[key],
      ]);
    }
  });
};
