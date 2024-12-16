const obj = {
  name: 'wang',
  age: 17,
  drink(){
    console.log('drinking')
  }
}

const proxy = new Proxy(obj, {
  set(target, prop, value, receriver){
    return Reflect.set(target, prop, value, receriver)
  },
  get(target, prop, receriver) {
    if (prop === 'drink') {  
      // 如果属性是函数，返回一个新的函数，该函数在执行原始函数前会检查年龄  
      return function(...args) {  
        if (target.age < 18) { 
          return console.warn('Cannot drink alcohol below the age of 18.') 
          // throw new Error('Cannot drink alcohol below the age of 18.');  
        }  
        return target[prop].apply(this, args); // 使用 apply 调用原始函数，保持 this 上下文和参数传递  
      };  
    }  
    return Reflect.get(target, prop, receriver)
  },
})

proxy.drink()
proxy.age += 1;

proxy.drink()
