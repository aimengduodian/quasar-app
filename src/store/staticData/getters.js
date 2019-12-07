
// 获取图书类型列表
import { isNumber } from 'quasar/src/utils/is'

export const getBookTypeNameArr = (state) => {
  const items = []
  try {
    state.bookCached.forEach(item => {
      items.push(item.name)
    })
  }
  catch (e) {
    console.log(e)
  }
  return items
}
// 获取图书类型通过类型id
export const getBookTypeNameByNumber = (state) => (typeNumber) => {
  let result = 'null'
  if (isNumber(typeNumber)) {
    const item = state.bookCached.find(item => item.id === String(typeNumber))
    result = item.name
  }
  return result
}
// 获取图书id通过图书类型名称
export const getBookTypeNumberByName = (state) => (typeName) => {
  try {
    const item = state.bookCached.find(item => item.name === typeName)
    return item.id
  }
  catch (e) {
    console.log(e)
  }
}

export const getElectronicsTypeNameArr = (state) => {
  const items = []
  try {
    state.electronicsCached.forEach(item => {
      items.push(item.name)
    })
  }
  catch (e) {
    console.log(e)
  }
  return items
}
// 获取电子类型通过类型id
export const getElectronicsTypeNameByNumber = (state) => (typeNumber) => {
  let result = 'null'
  if (isNumber(typeNumber)) {
    const item = state.electronicsCached.find(item => item.id === String(typeNumber))
    result = item.name
  }
  return result
}
// 获取电子类型id通过电子类型名称
export const getElectronicsTypeNumberByName = (state) => (typeName) => {
  try {
    const item = state.electronicsCached.find(item => item.name === typeName)
    return item.id
  }
  catch (e) {
    console.log(e)
  }
}
