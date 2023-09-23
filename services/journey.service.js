const db = require('../db')

module.exports.getAllJourney = async () => {
	const [records] = await db.query("SELECT * FROM journey")
	return records;
}

module.exports.getJourneyById = async (jID) => {
        const [records] = await db.query("SELECT * FROM journey WHERE jID = " + jID)
        return records;
}

module.exports.deleteJourney = async (jID) => {
        const [{affectedRows}] = await db.query("DELETE FROM journey WHERE jID = " + jID)
        return affectedRows;
}

module.exports.addJourney = async (obj) => {
  try {
    console.log(obj);
    console.log("before-addJourney");

    // Execute the SQL query
    const [{ affectedRows }] = await db.query(
      "INSERT INTO journey (uID, journeyName, journeyStartTime, journeyEndTime, isAllDay, location, remindStatus, remindTime, remark, color) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        obj.uID,
        obj.journeyName,
        obj.journeyStartTime,
        obj.journeyEndTime,
        obj.isAllDay,
        obj.location,
        obj.remindStatus,
        obj.remindTime,
        obj.remark,
        obj.color,
      ],
    );
    console.log("after-addJourney");
    return affectedRows;
  } catch (error) {
    console.error("Error adding journey:", error.message);
    throw error; // Rethrow the error to be handled by the caller
  }
};
