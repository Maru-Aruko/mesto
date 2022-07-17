export default class UserInfo {
    constructor({profileName, profileInfo, profileAvatar}) {
        this._name = document.querySelector(profileName);
        this._info = document.querySelector(profileInfo);
        this._avatar = document.querySelector(profileAvatar)
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._info.textContent
        }
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._info.textContent = data.about;
        this._avatar.src = data.avatar;
        this._avatar.alt = data.name;
    }

}