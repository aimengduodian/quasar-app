
// 获取图书类型列表
export const getBookTypeNameArr = (state) => {
  const items = []
  state.bookCached.forEach(item => {
    items.push(item.name)
  })
  return items
}
// 获取图书类型通过类型id
export const getBookTypeNameByNumber = (state) => (typeNumber) => {
  const item = state.bookCached.find(item => item.id === String(typeNumber))
  return item.name
}
// 获取图书id通过图书类型名称
export const getBookTypeNumberByName = (state) => (typeName) => {
  const item = state.bookCached.find(item => item.name === typeName)
  return item.id
}
// 获取电子类型通过类型id
export const getElectronicsTypeNameByNumber = (state) => (typeNumber) => {
  const item = state.bookCached.find(item => item.id === String(typeNumber))
  return item.name
}
// 获取电子类型id通过电子类型名称
export const getElectronicsTypeNumberByName = (state) => (typeName) => {
  const item = state.bookCached.find(item => item.name === typeName)
  return item.id
}
