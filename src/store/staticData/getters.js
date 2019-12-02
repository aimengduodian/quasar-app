
export const getBookTypeNameByNumber = (state) => (typeNumber) => {
  const item = state.bookCached.find(item => item.id === String(typeNumber))
  return item.name
}

export const getBookTypeNumberByName = (state) => (typeName) => {
  const item = state.bookCached.find(item => item.name === String(typeName))
  return item.id
}
