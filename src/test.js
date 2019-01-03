var testData = {
  price: 2,
  quantity: 5
};
let target = null;

class Dep {
  constructor() {
    this.subscribes = [];
  }
  depend() {
    if (target && !this.subscribes.includes(target)) {
      this.subscribes.push(target);
    }
  }
  notify() {
    this.subscribes.forEach(sub => sub());
  }
}

Object.keys(testData).forEach(key => {
  let internalValue = testData[key];
  const dep = new Dep();
  Object.defineProperty(testData, key, {
    get() {
      dep.depend();
      return internalValue;
    },
    set(newVal) {
      internalValue = newVal;
      dep.notify();
    }
  });
});

function watcher(myFunc) {
  target = myFunc;
  target();
  target = null;
}

watcher(() => {
  testData.total = testData.price * testData.quantity;
});

// console.log(testData.total);
// testData.price = 20; dddd
// console.log(testData.total);
// testData.price = 30;
// console.log(testData.total);
// testData.quantity = 10
// console.log(testData.total);
