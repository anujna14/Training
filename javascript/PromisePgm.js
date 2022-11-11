function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let promiseLength = promises.length; //get the length of the promise
    //console.log("promiseLength",promiseLength)
    if (promiseLength === 0) {
      resolve(results);
    }
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((response) => {
          //console.log(`am inside ${i}`)
          results[i] = response;
          //console.log(`results[${i}] is ${response}`)
          promiseLength--;
          if (promiseLength === 0) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

// Test code.
Promise_all([]).then((array) => {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then((array) => {
  //console.log(array)
  console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then((array) => {
    console.log("We should not get here");
  })
  .catch((error) => {
    //console.log("error:",error)
    if (error != "X") {
      console.log("Unexpected failure:", error);
    }
  });
