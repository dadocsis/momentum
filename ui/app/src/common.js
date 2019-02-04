
export class AuthUser {
    constructor(token, userInfo) {
        this.token = token;
        this.userInfo = userInfo;
        if (token){
            let now = new Date();
            this.tokenExpirationDate = new Date(now.setSeconds(now.getSeconds() + token.expires_in));
        } else {
            this.tokenExpirationDate = new Date(-8640000000000000);
        }
    }

    get isValid(){
        const now = new Date();
        return this.tokenExpirationDate > now;
    }
}