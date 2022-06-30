export default class UserInfo {
    constructor({profileName, profileInfo}) {
        this._profileName = profileName;
        this._profileInfo = profileInfo;
        this._name = document.querySelector(this._profileName);
        this._info = document.querySelector(this._profileInfo);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            info: this._info.textContent
        }
    }

    setUserInfo({newUserName, newUserInfo}) {
        this._name.textContent = newUserName;
        this._info.textContent = newUserInfo;
    }

}