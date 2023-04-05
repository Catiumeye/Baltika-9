import { Injectable } from "@nestjs/common";
import axios from "axios";
import qs from "querystring";
import { BaseAuthService, IGetCreditionalsRes, IGetUserInfoRes } from "./base-auth.service";
import { StrategyConfigService } from "./strategy-config.service";


interface IGoogleGetCreditionals {
    access_token: string; 
    expires_in: number; 
    refresh_token: string;
    scope: string; 
    token_type: string; 
    id_token: string;
}

interface IGoogleGetUserInfo {
    sub: string; 
    name: string; 
    given_name: string; 
    family_name: string; 
    picture: string; 
    email: string; 
    email_verified: string; 
    locale: string;
}

@Injectable()
export class GoogleAuthService extends BaseAuthService<'GOOGLE'> {
    
    constructor(
        protected readonly strategyConfigService: StrategyConfigService
    ) {
        super('GOOGLE', strategyConfigService)
    }

    async receiveCode() {        
        const queryfiedString = qs.stringify({
            client_id: this.clientID,
            redirect_uri: this.redirectURL,
            response_type: 'code',
            scope: 'email profile',
            include_granted_scopes: 'true',
            access_type: 'offline'
        })
        return `${this.endpointURL}?${queryfiedString}`;
    }

    async getCreditionals(code: string): Promise<IGetCreditionalsRes> {
        const res = await axios.post<IGoogleGetCreditionals>('https://www.googleapis.com/oauth2/v4/token', null, {
            params: {
                code: code,
                grant_type: 'authorization_code',
                client_id: this.clientID,
                client_secret: this.clientSecret,
                redirect_uri: this.redirectURL
            }
        })
        
        return {
            access_token: res.data.access_token,
            token_type: res.data.token_type,
            scope: res.data.scope,
        };
    }

    async getUserInfo(token_type: string, access_token: string): Promise<IGetUserInfoRes> {
        const res = await axios.post<IGoogleGetUserInfo>('https://www.googleapis.com/oauth2/v3/userinfo', null, {
            headers: {
                Authorization: `${token_type} ${access_token}`
            }
        })
        console.log(res.data);
        
        return {
            external_id: res.data.sub,
            email: res.data.email,
            avatar: res.data.picture,
        };
    }
}