import {nanoid} from "nanoid";
import {numberToWords} from "pixiu-number-toolkit";

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

/**
 * 获取随机颜色值0 ~ 255
 * @returns {number}
 */
export function getRandomColor() {
    return Math.floor(Math.random() * 255);
}

/**
 * 获取随机ID，底层使用nanoId
 * @returns {string}
 */
export function getRandomId() {
    return nanoid();
}

/**
 * 数字转英文
 * @param isCapitalized 是否首字母大写
 * @param number
 */
export function numberToEnglish(number,isCapitalized = true) {
    const word = numberToWords(number, "en");

    if (isCapitalized) {
        return  word.slice(0, 1).toUpperCase() + word.slice(1)
    }

    return word
}

