// Modify from CSDN
// 版权声明：本文为博主原创文章，遵循 CC 4.0 BY - SA 版权协议，转载请附上原文出处链接和本声明。
// 原文链接：https://blog.csdn.net/welcome_yu/article/details/114766633

interface Pos {
    lat: number,
    lng: number
};

const r1 = 6378140;
const r2 = 6356755;
const flatten = (r1 - r2) / r1;

function toRad(v: number) {
    return v * Math.PI / 180;
}

export default function getDistance(pos1: Pos, pos2: Pos) {
    const radLat1 = toRad(pos1.lat);
    const radLng1 = toRad(pos1.lng);
    const radLat2 = toRad(pos2.lat);
    const radLng2 = toRad(pos2.lng);

    const pA = Math.atan(r2 / r1 * Math.tan(radLat1));
    const pB = Math.atan(r2 / r1 * Math.tan(radLat2));

    const x = Math.acos(Math.sin(pA) * Math.sin(pB) + Math.cos(pA) * Math.cos(pB) * Math.cos(radLng1 - radLng2));
    const c1 = (Math.sin(x) - x) * (Math.sin(pA) + Math.sin(pB)) ** 2 / Math.cos(x / 2) ** 2;
    const c2 = (Math.sin(x) + x) * (Math.sin(pA) - Math.sin(pB)) ** 2 / Math.sin(x / 2) ** 2;
    const dr = flatten / 8 * (c1 - c2);
    const distance = r1 * (x + dr);

    return distance;
}
