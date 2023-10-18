const { test, expect } = require("@jest/globals");

// Promises
test('The data is Peanut Butter', () => {
  const promise = new Promise(resolve => {
    resolve("Peanut Butter!");
  })
  return expect(promise).resolves.toBe('Peanut Butter!');
});

const fetchData = (cb = null) => {
  if (typeof cb === 'function') {
    return new Promise(() => {
      cb(null, "Peanut Butter");
    }, () => {
      cb("Error", null);
    });
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Peanut Butter");
    }, 100);
  }, (rejects) => {
    rejects("Error");
  });
};

test('The data is Peanut Butter', () => {
  return fetchData().then(data => {
    console.log(data);
    expect(data).toMatch(/Peanut Butter/);
  })
});

// Async/Await
test('the data is Peanut Butter', async () => {
  const data = await fetchData();
  expect(data).toEqual('Peanut Butter');
});

test('the fetch fails with an error', async () => {
  // expect.assertions(1);
  try {
    await fetchData();
  } catch (error) {
    expect(e).toMatch('error');
  }
});

// Or can divide into 2 test cases
test("the data is Peanut Butter", async () => {
  await expect(fetchData()).resolves.toBe("Peanut Butter");
});

// test("the fetch fails with an error", async () => {
//   await expect(fetchData()).rejects.toMatch("error");
// });

// If you expect a promise to be rejected, use the .catch method. Make sure to add expect.assertions to verify that a certain number of assertions are called. Otherwise, a fulfilled promise would not fail the test.
// test("the fetch fails with an error", () => {
//   expect.assertions(1);
//   return fetchData().catch((e) => expect(e).toMatch("error"));
// });

// Callbacks
// Don't DO THIS!
test('the data is Peanut Butter', () => {
  function callback(error, data) {
    if (error) {
      throw error;
    }
    expect(data).toBe('Peanut Butter');
  }

  fetchData(callback);
});

// DO THIS
test("the data is Peanut Butter", (done) => {
  function callback(error, data) {
    if (error) {
      done(error);
      return;
    }
    try {
      expect(data).toBe("Peanut Butter");
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});

// /resolves/.rejects
test("the data is Peanut Butter", () => {
  return expect(fetchData()).resolves.toBe("Peanut Butter");
});

// test("the fetch fails with an error", () => {
//   return expect(fetchData()).rejects.toMatch("error");
// });
