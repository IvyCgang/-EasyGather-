const db = require('../db')

const parseTimeString = (timeString) => {
  return new Date(timeString);
};

// 媒合服務邏輯
module.exports.match = async (eID) => {
  try {
    // 步驟 1: 根據 eID 從 event 資料表中獲取事件資料
    const [event] = await db.query("SELECT userMall, friends, eventTime, timeLengthHours FROM event WHERE eID = ?", [eID]);

    if (event.length === 0) {
      throw new Error('Event not found');
    }

    // 步驟 2: 解析事件資料
    const { userMall, friends, eventTime, timeLengthHours } = event[0];

    // 步驟 3: 根據事件資料，檢索相應的行程資料
    // 這裡的查詢應該根據您的資料庫結構進行修改
    const [journeyData] = await db.query("SELECT userMall, journeyStartTime, journeyEndTime FROM journey WHERE userMall IN (?)", [friends.split(',')]);

    // 步驟 4: 執行媒合邏輯，找到符合條件的空閒時間段
    // 這裡的媒合邏輯應該根據您的需求進行修改
    const matchedTimeSlot = findMatchedTimeSlot(parseTimeString(eventTime), timeLengthHours, journeyData);

    // 步驟 5: 返回媒合結果
    return {
      userMall,
      friends,
      eventTime,
      timeLengthHours,
      matchedTimeSlot,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// helper 函數：找到符合條件的空閒時間段
const findMatchedTimeSlot = (eventStartTime, timeLengthHours, journeyData) => {
  // 這裡是一個簡單的範例媒合邏輯，您可能需要根據實際需求進行修改
  const availableTimeSlots = [];

  // 將行程資料轉換為時間段
  const busyTimeSlots = journeyData.map((journey) => ({
    startTime: parseTimeString(journey.journeyStartTime),
    endTime: parseTimeString(journey.journeyEndTime),
  }));

  // 假設媒合區間為一天的範圍
  const dayStart = new Date(eventStartTime);
  const dayEnd = new Date(eventStartTime);
  dayEnd.setHours(dayEnd.getHours() + 24);

  // 建立媒合區間的時間點，例如每半小時一個時間點
  const timePoints = [];
  let currentTime = new Date(eventStartTime);
  while (currentTime < dayEnd) {
    timePoints.push(currentTime);
    currentTime = new Date(currentTime);
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }

  // 找到空閒時間段
  for (let i = 0; i < timePoints.length - timeLengthHours * 2; i++) {
    const candidateSlot = {
      startTime: timePoints[i],
      endTime: new Date(timePoints[i + timeLengthHours * 2]),
    };

    const isOverlap = busyTimeSlots.some((busySlot) => {
      return (
        (candidateSlot.startTime < busySlot.endTime && candidateSlot.endTime > busySlot.startTime) ||
        (candidateSlot.startTime >= busySlot.startTime && candidateSlot.endTime <= busySlot.endTime)
      );
    });

    if (!isOverlap) {
      availableTimeSlots.push(candidateSlot);
    }
  }

  return availableTimeSlots;
};
