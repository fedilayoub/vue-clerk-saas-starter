export function setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value)
    return "Done"
}