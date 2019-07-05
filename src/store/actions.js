export const CHANGE_PATH = "CHANGE_PATH"

export function changePath(path) {
  return {
    type: CHANGE_PATH,
    path
  }
}
