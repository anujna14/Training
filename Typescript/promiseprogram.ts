function PromiseAll<Type>(promises: Promise<Type>[]) {
  return new Promise((resolve, reject) => {
    let results: Type[] = [];
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
PromiseAll([]).then((array) => {
  console.log("This should be []:", array);
});
function soonNew(val: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}

PromiseAll([soonNew(1), soonNew(2), soonNew(3)]).then((array) => {
  //console.log(array)
  console.log("This should be [1, 2, 3]:", array);
});
PromiseAll([soonNew(1), Promise.reject("X"), soonNew(3)])
  .then((array) => {
    console.log("We should not get here");
  })
  .catch((error) => {
    //console.log("error:",error)
    if (error != "X") {
      console.log("Unexpected failure:", error);
    }
  });
