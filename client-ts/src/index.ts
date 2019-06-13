const h1 = document.createElement("h1")
h1.innerHTML = "hello, I am dora"
document.body.appendChild(h1)

const merge = <D1, D2>(arg1: D1, arg2: D2): D1 & D2 => {
  let data = <D1 & D2>{}; // 指定返回值的类型兼备 D1 和 D2 两个类型变量代表的类型的特点
  data = Object.assign(arg1, arg2)  // 返回合并后的对象
  return data
}
const data1 = {
  name: 'dora'
}
const data2 = {
  like: 'eat'
}
let mergeData = merge(data1, data2)
console.log(mergeData.name)