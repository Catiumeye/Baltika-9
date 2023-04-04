import { Injectable } from "@nestjs/common";
import { AuthType } from "@prisma/client";
import { StrategyConfigService } from "./strategy-config.service";





@Injectable()
export abstract class BaseAuthService<T extends Exclude<keyof typeof AuthType, 'JWT'>, K, P> {
    protected clientID: string;
    protected clientSecret: string;
    protected redirectURL: string;
    protected endpointURL: string;

    constructor(
        protected type: T,
        protected readonly strategyConfigService: StrategyConfigService,
    ) {
        this.clientID = strategyConfigService.config[type].clientID
        this.clientSecret = strategyConfigService.config[type].clientSecret
        this.redirectURL = strategyConfigService.config[type].redirectURL
        this.endpointURL = strategyConfigService.config[type].endpointURL
    }

    public abstract receiveCode(): string | Promise<string>;

    public abstract getCreditionals(code: string): Promise<K>

    public abstract getUserInfo(token_type: string, access_token: string): Promise<P>
}