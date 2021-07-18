export const HEADER_TITLE = {
    luong: "Bao nhiêu ngày nữa có lương",
    today: "Ngày hôm nay",
    cachly: "Đếm ngày cách ly",
    tetDuong: "Bao nhiêu ngày đến tết dương",
    tetAm: "Bao nhiêu ngày đến tết âm lịch",
};
//const API_ENDPOINT = 'http://localhost:3000/';
const API_ENDPOINT = 'https://delta-group.tk/';
export const URL = {
    getDatetime: API_ENDPOINT + "api/get-time",
    getMember: API_ENDPOINT + "api/get-member",
    addMember: API_ENDPOINT + "api/add-member",
    updateMember: API_ENDPOINT + "api/update-member",
};
export const DBS_CONFIG_DATA = {
    ngayLuong: 5,
    nextTetAm: new Date(2022, 2, 1)
};
export const MONGODB_URI = "mongodb+srv://root:root@cluster0.0smmh.mongodb.net/gold-key?retryWrites=true&w=majority";
export enum MONGODB_COLL {
    cachlyMember = "cachlyMember",
};
export const MONGODB_DB_NAME = "delta-group";
export enum LOCALSTORAGE_KEY {
    CACH_LY_MEMBER = 'CACH_LY_MEMBER',
}
