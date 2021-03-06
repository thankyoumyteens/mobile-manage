export function contains(list, item) {
  for (let i = 0; i < list.length; i++) {
    let el = list[i]
    if (el === item) {
      return i
    }
  }
  return -1
}

/**
 * 删除数组中指定索引的元素
 * @param array
 * @param index
 */
export function remove(array, index) {
  for (let i = index; i < array.length - 1; i++) {
    array[i] = array[i + 1]
  }
  array.pop()
}

export function stringContains(list, item) {
  for (let i = 0; i < list.length; i++) {
    let el = list[i]
    if (el == item) {
      return true
    }
  }
  return false
}

export function formatTimestamp(string) {
  let date = new Date(string)
  let r = ''
  r += date.getFullYear() + '-'
  r += (date.getMonth() + 1) + '-'
  r += date.getDate() + '- '
  r += date.getHours() + ':'
  r += date.getMinutes() + ':'
  r += date.getSeconds()

  return r
}
