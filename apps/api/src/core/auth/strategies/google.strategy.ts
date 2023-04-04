import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthType } from "@prisma/client";
import { Profile, Strategy, StrategyOptions, VerifyCallback } from "passport-google-oauth20";
import { StrategyConfigService } from "../services/strategy-config.service";



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, AuthType.GOOGLE) {
    constructor(
        private readonly strategyConfigService: StrategyConfigService,
    ) {
        super({
            clientID: strategyConfigService.config.GOOGLE.clientID,
            clientSecret: strategyConfigService.config.GOOGLE.clientSecret,
            callbackURL: strategyConfigService.config.GOOGLE.callbackURL,
            scope: ['profile', 'email']
        } as StrategyOptions)
    }

    async validate(
        accessToken: string, 
        refreshToken: string, 
        profile: Profile, 
        cb: VerifyCallback
    ) {
        // const { id, displayName, emails, photos } = profile;
        console.log('AAAAAA');
        
        // const account = {
        //     uuid: id,
        //     email: emails ? emails[0].value : null,
        //     username: displayName,
        //     avatar: photos?.length ? photos[0].value : null,
        // };

        // const payload = {
        //     account,
        //     accessToken,
        // };
        // if (!account.uuid) {
        //     return cb(new UnauthorizedException(), undefined);
        // }
        cb(null, profile);
    }
}