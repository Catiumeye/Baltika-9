import { Injectable } from "@nestjs/common";
import axios from "axios";
import qs from "querystring";
import { StrategyConfigService } from "./strategy-config.service";




@Injectable()
export class GoogleAuthService {
    private clientID: string;
    private clientSecret: string;
    private redirectURL: string;
    private endpointURL: string;

    constructor(
        private readonly strategyConfigService: StrategyConfigService,
    ) {

        this.clientID = strategyConfigService.config.GOOGLE.clientID
        this.clientSecret = strategyConfigService.config.GOOGLE.clientSecret
        this.redirectURL = strategyConfigService.config.GOOGLE.redirectURL
        this.endpointURL = strategyConfigService.config.GOOGLE.endpointURL
    }

    async receiveCode() {        
        const aaa = qs.stringify({
            client_id: this.clientID,
            redirect_uri: this.redirectURL,
            response_type: 'code',
            scope: 'email+profile',
            include_granted_scopes: 'true',
            access_type: 'offline'
        })
        return `${this.endpointURL}?${aaa}`;
    }

    async getCreditionals(code: string) {
        const res = await axios.post<{access_token: string; expires_id: number; scope: string, token_type: string; id_token: string;}>('https://www.googleapis.com/oauth2/v4/token', null, {
            params: {
                code: code,
                grant_type: 'authorization_code',
                client_id: this.clientID,
                client_secret: this.clientSecret,
                redirect_uri: this.redirectURL
            }
        })
        return res.data;
    }

    async getUserInfo(token_type: string, access_token: string) {
        const res = await axios.post<{sub: string; name: string; given_name: string; family_name: string; picture: string; email: string; email_verified: string; locale: string;}>('https://www.googleapis.com/oauth2/v3/userinfo', null, {
            headers: {
                Authorization: `${token_type} ${access_token}`
            }
        })
        return res.data;
    }
}