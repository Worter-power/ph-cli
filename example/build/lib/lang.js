module.exports = `
import en from './en';
import cn from "./zh-CN";
{{imports}}
export default {
    "zh-CN": Object.assign({{cn}}),
    "en": Object.assign({{en}})
};
`