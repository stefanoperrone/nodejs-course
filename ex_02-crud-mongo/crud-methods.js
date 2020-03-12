const insertRecord = (values, client) => {
  const db = client.db("test");
  try {
    let insertValues = JSON.parse(values);
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
          return console.log(`aaaaops.. error: ${err}`);
        }
        console.log("Inserted document right", res.ops);
      });
    }
  } catch (e) {
    console.log("Insert Error -> ", e);
  }
  client.close();
};

const findRecord = (researchValues, client) => {
  const db = client.db("test");
  try {
    // findOne
    let queryValue = JSON.parse(researchValues);
    db.collection("courses").findOne(queryValue, { _id: 0 }, (err, doc) => {
      if (err) {
        return console.log("ops.. no results");
      }
      console.log("Search result: ", doc);
    });
  } catch (e) {
    //find all
    db.collection("courses")
      .find()
      .toArray((err, docs) => {
        if (err) {
          return console.log("ops.. no results");
        }
        console.log("Search result: ", docs);
      });
  }
  client.close();
};

const updateRecord = (updateValue, client) => {
  const db = client.db("test");
  // updateOne
  try {
    let queryValue = JSON.parse(updateValue[0]);
    let setValue = JSON.parse(updateValue[1]);
    console.log("q", queryValue);
    db.collection("courses").findOneAndUpdate(
      queryValue,
      { $set: setValue },
      (err, doc) => {
        if (err) {
          return console.log("ops.. update not executed");
        }
        console.log("Update result: ", doc);
      }
    );
  } catch (e) {
    console.log(e);
  }
  client.close();
};

const deleteRecord = (deleteValues, client) => {
  const db = client.db("test");
  // deleteOne
  try {
    let queryType = deleteValues[0];
    let queryValue = JSON.parse(deleteValues[1]);
    if (queryType === "one") {
      // delete one
      db.collection("courses").deleteOne(queryValue, (err, doc) => {
        if (err) {
          return console.log("ops.. no delete executed");
        }
        console.log("Delete result: ", doc.result);
      });
    } else if (queryType === "many") {
      // delete many by field
      db.collection("courses").deleteMany(queryValue, (err, doc) => {
        if (err) {
          return console.log("ops.. no delete executed");
        }
        console.log("Delete result: ", doc.result);
      });
    }
  } catch (e) {
    console.log(e);
  }
  client.close();
};

exports.findRecord = findRecord;
exports.insertRecord = insertRecord;
exports.updateRecord = updateRecord;
exports.deleteRecord = deleteRecord;
