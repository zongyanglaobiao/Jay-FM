export function isBlank(text) {
    return text === undefined || text === null || text === '' || text.trim() === '';
}

/**
 * 这个数组中有一个为空就会返回true
 * @param dataArr 数组
 * @returns {boolean}
 */
export function isBlanks(...dataArr) {
    for (const data of dataArr) {
        if (isBlank(data)) {
            return  true
        }
    }
    return false
}

export function  isUndefined(obj) {
    return obj === undefined;
}

export function  isNullOrUndefined(obj) {
    return obj === null || obj === undefined;
}

export function toJson(obj) {
    return JSON.stringify(obj);
}