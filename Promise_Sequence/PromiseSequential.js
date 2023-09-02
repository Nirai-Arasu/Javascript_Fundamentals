Promise.sequence = function (args) {
  const res = [];
  return new Promise((resolve, reject) => {
    const sequencePromise = args.reduce((ac, cv) => {
      return ac.then((acValue) => {
        return cv.then((cvValue) => {
          if (acValue) {
            res.push(acValue + cvValue);
            return acValue + cvValue;
          }
          res.push(cvValue);
          return cvValue;
        });
      });
    }, Promise.resolve());

    sequencePromise
      .then((v) => {
        resolve({ res, v });
      })
      .catch((error) => {
        resolve({ res, error });
      });
  });
};

const b = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

const c = new Promise((resolve, reject) => {
  resolve(2);
});

const d = new Promise((resolve, reject) => {
  resolve(3);
});

const aa = Promise.sequence([b, c, d]).then((v) => console.log(v));
