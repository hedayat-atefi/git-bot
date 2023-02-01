const jsonfile = require("jsonfile");

const moment = require("moment");
const simpleGit = require("simple-git");

const random = require("random");
const FILE_PATH = "./data.json";

const makeCommit = (n) => {
  if (n === 0) return  simpleGit().push();
  const day = random.int(0, 7);
  const week = random.int(0, 50);
  const DATE = moment()
    .subtract(1, "y")    // set year reverse, example: 4 == 2019
    .add(day, "d")         // add day to this moment, example: day = 2 --> add(1, "d") == day = 3
    .add(week, "w")         // same as day, just add week of month
    .format();
  const data = {
    date: DATE,
  };
  console.log("DATE", DATE);
  console.log("data", data);
  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(DATE, { "--date": DATE }, makeCommit.bind(this, --n))
      // .push();
  });
};

makeCommit(20);
