import { Injectable } from "@nestjs/common";
import { AuthType } from "@prisma/client";
import { GitHubAuthService } from "./github-auth.service";
import { GoogleAuthService } from "./google-auth.service";


type TDetermineSocialRes = GitHubAuthService | GoogleAuthService;

@Injectable()
export class AuthProviderService {
    constructor(
        private readonly githubService: GitHubAuthService,
        private readonly googleService: GoogleAuthService,
    ) {}

    public determineSocial(authType: Exclude<keyof typeof AuthType, 'JWT'>): TDetermineSocialRes {    
        switch(authType) {
            case 'GITHUB': return this.githubService;
            case 'GOOGLE': return this.googleService;
        }
    }
}