function send_form() {
    let SET_HOUR_PHUN_SUONG_1 = document.getElementById('"SET_HOUR_PHUN_SUONG_1"').value;
    let SET_MINUTE_PHUN_SUONG_1 = document.getElementById('"SET_MINUTE_PHUN_SUONG_1"').value;
    let SET_SO_GIAY_PHUN_SUONG_1 = document.getElementById('"SET_SO_GIAY_PHUN_SUONG_1"').value;
    const url = `/setting.html?"SET_HOUR_PHUN_SUONG_1"=${SET_HOUR_PHUN_SUONG_1}&"SET_MINUTE_PHUN_SUONG_1"=${SET_MINUTE_PHUN_SUONG_1}&"SET_SO_GIAY_PHUN_SUONG_1"=${SET_SO_GIAY_PHUN_SUONG_1}&"SET_HOUR_PHUN_SUONG_2"=&"SET_MINUTE_PHUN_SUONG_2"=&"SET_SO_GIAY_PHUN_SUONG_2"=&"SET_HOUR_PHUN_SUONG_3"=&"SET_MINUTE_PHUN_SUONG_3"=&"SET_SO_GIAY_PHUN_SUONG_3"=&"SET_MAX_NHIET_DO"=&"SET_MIN_NHIET_DO"=&"SET_SO_GIAY_MO_DEN"=&"SET_SO_GIAY_CHAY_COOLPAD_VA_QUAT"=&"SET_HOUR_DONG_LUOI_CAT_NANG"=&"SET_MINUTE_DONG_LUOI_CAT_NANG"=&"SET_HOUR_MO_LUOI_CAT_NANG"=&"SET_MINUTE_MO_LUOI_CAT_NANG"=&"SET_HOUR_MO_DEN"=&"SET_MINUTE_MO_DEN"=&"SET_HOUR_TAT_DEN"=&"SET_MINUTE_TAT_DEN"=`;
    fetch(url)
        .then(data => data.json())
        .then(result => console.log(result))
}