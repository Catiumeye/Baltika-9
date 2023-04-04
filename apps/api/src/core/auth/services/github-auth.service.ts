import { Injectable } from "@nestjs/common";
import { BaseAuthService } from "./base-auth.service";
import { StrategyConfigService } from "./strategy-config.service";
import qs from "querystring";
import axios from "axios";

interface IGetCreditionals {
    [key: string]: string;
}

interface IGetUserData {
    [key: string]: string;
}


@Injectable()
export class GitHubAuthService extends BaseAuthService<'GITHUB', IGetCreditionals, IGetUserData> {
    constructor(
        protected readonly strategyConfigService: StrategyConfigService
    ) {
        super('GITHUB', strategyConfigService)
    }

    async receiveCode() {
        return ``;
    }

    async getCreditionals(code: string) {
        return {};
    }

    async getUserInfo(token_type: string, access_token: string) {
        return {};
    }
}