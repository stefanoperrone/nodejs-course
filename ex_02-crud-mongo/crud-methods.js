const insertRecord = (insertValues, db) => {
  if (insertValues.length) {
    // multiple insert
    let courses = [];

    for (let i = 0; i < insertValues.length; i++) {
      var course = {
        title: insertValues[i].title,
        hours: insertValues[i].hours,
        level: insertValues[i].level
      };
      courses.push(course);
    }

    db.collection("courses").insertMany(courses, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log("Inserted documents right", res.ops);
      }
    });
  } else {
    var course_1 = {
      title: insertValues.title,
      hours: insertValues.hours,
      level: insertValues.level
    };
    //single insert
    db.collection("courses").insertOne(course_1, (err, res) => {
      if (err) {
        return console.log(`ops.. error: ${err}`);
      }
      console.log("Inserted document right", res.ops);
    });
  }
};

exports.insertRecord = insertRecord;
