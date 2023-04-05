import { Injectable } from "@nestjs/common";
import { BaseAuthService, IGetCreditionalsRes, IGetUserInfoRes } from "./base-auth.service";
import { StrategyConfigService } from "./strategy-config.service";
import qs from "querystring";
import axios from "axios";

interface IGithubGetCreditionals {
    access_token: string;
    scope: string;
    token_type: string
}

interface IGithubGetUserInfo {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: false,
    name?: string;
    company?: string;
    blog: string;
    location: string;
    email: string;
    hireable?: unknown;
    bio: string;
    twitter_username?: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    private_gists: number;
    total_private_repos: number;
    owned_private_repos: number;
    disk_usage: number;
    collaborators: number;
    two_factor_authentication: number;
    plan: {
        name: string;
        space: number;
        collaborators: number;
        private_repos: number;
    }
}
//avatar https://avatars.githubusercontent.com/u/39646790

@Injectable()
export class GitHubAuthService extends BaseAuthService<'GITHUB'> {
    constructor(
        protected readonly strategyConfigService: StrategyConfigService
    ) {
        super('GITHUB', strategyConfigService)
    }

    async receiveCode() {
        const queryfiedString = qs.stringify({
            client_id: this.clientID,
            // redirect_uri: this.redirectURL,
            scope: 'read:user user:email',
            allow_signup: 'false'
        })
        return `${this.endpointURL}?${queryfiedString}`;
    }

    async getCreditionals(code: string): Promise<IGetCreditionalsRes> {
        const res = await axios.post<IGithubGetCreditionals>(`https://github.com/login/oauth/access_token`, {
            client_id: this.clientID,
            client_secret: this.clientSecret,
            code: code
        }, {
            headers: {
                Accept: 'application/json'
            }
        })
        
        return res.data;
    }

    async getUserInfo(token_type: string, access_token: string): Promise<IGetUserInfoRes> {
        const res = await axios.get<IGithubGetUserInfo>('https://api.github.com/user', {
            headers: {
                Authorization: `${this.capitalize(token_type)} ${access_token}`
            }
        })
        return {
            external_id: res.data.id.toString(),
            email: res.data.email,
            avatar: res.data.avatar_url
        }
    }
}