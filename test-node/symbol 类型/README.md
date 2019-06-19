# 简述
  1. TS 在 2.7 版对 Symbol 做了补充，增加了 unique symbol 这种类型
  2. 是 symbols 的子类型
  3. 该类型只能由 Symbol() 或 Symbol.for() 创建，或者通过指定类型来指定一个值是这种类型
  4. 该类型值仅可用于常量的定义和用于属性名
  5. 定义 unique symbol 类型的值，必须用 const 不能用 let

# 基本用法
  ```
    const key1: unique symbol = Symbol()
    let key2: symbol = Symbol()
    const obj = {
      [key1]: 'value1',
      [key2]: 'value2',
    }
    console.log(obj[key1])  // 'value1'
    console.log(obj[key2])  // 'value2' error 类型，"symbol" 不能作为 索引类型使用
  ```