const promiseStatus = {
  PENDING: 'penidng',
  FULFILLED: 'fulfileed',
  REJECTED: 'rejected'
}

class MyPromise {
  #state = promiseStatus.PENDING;
  #result = undefined;
  #handles = [];
  constructor(executor){
    try{
      executor(this.reslove.bind(this), this.reject.bind(this))
    }catch(err){
      this.reject.bind(this)(err)
    }
  }
  reslove(value){
    this.#changeState(value, promiseStatus.FULFILLED);
  }
 
  reject(reason){
    this.#changeState(reason, promiseStatus.REJECTED);
  }
  #changeState(result, state) {
    if(this.#state !== promiseStatus.PENDING) {
      return;
    }
    this.#state = state;
    this.#result = result;
    this.#run()
  }
  #runOne(callback, reslove, reject) {
    if (typeof callback === 'function') {
      const data = callback(this.#result);
      reslove(data)
    } else {
      reslove(callback)
    }
  }
  #run(){
    if(this.#state === promiseStatus.PENDING) return;
    // console.log(this.#handles)
    while(this.#handles.length){
      const task = this.#handles.shift();
      if (this.#state === promiseStatus.FULFILLED) {
        this.#runOne(task.onFulfiled, task.reslove, task.reject)
      } else if (this.#state === promiseStatus.REJECTED) {
        this.#runOne(task.onRejected, task.reject, task.reject)
      }
    }
  }
  then(onFulfiled, onRejected){
   
    return new MyPromise((reslove, reject) => {
      this.#handles.push({
        reject,
        reslove,
        onFulfiled,
        onRejected
      })
      this.#run();
    })
  }
}


const fn = () => {
  return new MyPromise((res, R2) => {
    // R2(1)
    setTimeout(() => {
      res(1)
    }, 1000)
  }).then((v) => {
    console.log(v, '111')
    return 'XINDE'
  }, (e0) => {
    console.log(e0, '22222')
  }).then((v) => {
    console.log(v, '1112')
    return '2222'
  }, (e0) => {
    console.log(e0, '222223')
  })
}

const f = async () => {
  const a = await fn()
console.log(a, 'aaa') 
}

f()
