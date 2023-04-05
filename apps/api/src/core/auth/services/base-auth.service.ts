import { Injectable } from "@nestjs/common";
import { AuthType } from "@prisma/client";
import { StrategyConfigService } from "./strategy-config.service";

export interface IGetCreditionalsRes {
    access_token: string;
    token_type: string;
    scope: string;
}

export interface IGetUserInfoRes {
    external_id: string;
    email: string;
    avatar: string;
}


@Injectable()
export abstract class BaseAuthService<T extends Exclude<keyof typeof AuthType, 'JWT'>> {
    protected clientID: string;
    protected clientSecret: string;
    protected redirectURL: string;
    protected endpointURL: string;

    constructor(
        public type: T,
        protected readonly strategyConfigService: StrategyConfigService,
    ) {;
        this.clientID = strategyConfigService.config[type].clientID;
        this.clientSecret = strategyConfigService.config[type].clientSecret;
        this.redirectURL = strategyConfigService.config[type].redirectURL;
        this.endpointURL = strategyConfigService.config[type].endpointURL;
    }

    protected capitalize(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    public abstract receiveCode(): string | Promise<string>;

    public abstract getCreditionals(code: string): Promise<IGetCreditionalsRes>

    public abstract getUserInfo(token_type: string, access_token: string): Promise<IGetUserInfoRes>
}