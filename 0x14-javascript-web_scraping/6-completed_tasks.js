#!/usr/bin/node

const request = require('request');

const fetchJSONData = (url) => {
  return new Promise((resolve, reject) => {
    request(url, { json: true }, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
};

const countCompletedTasksByUser = (data) => {
  const completedTasksByUser = {};

  data.forEach((task) => {
    if (task.completed) {
      const userId = task.userId;
      completedTasksByUser[userId] = (completedTasksByUser[userId] || 0) + 1;
    }
  });

  return completedTasksByUser;
};

const apiURL = "https://jsonplaceholder.typicode.com/todos";

fetchJSONData(apiURL)
  .then((data) => {
    const completedTasksByUser = countCompletedTasksByUser(data);
    console.log("Users with completed tasks:");
    for (const userId in completedTasksByUser) {
      console.log(`User ID: ${userId}, Completed Tasks: ${completedTasksByUser[userId]}`);
    }
  })
  .catch((err) => {
    console.error("Error fetching data:", err);
  });
;
