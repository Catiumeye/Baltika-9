import { Injectable } from "@nestjs/common";
import { RandomGeneratorService } from "./random-generator.service";
import * as crypto from 'crypto';
import * as argon2 from 'argon2';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PasswordService {
    private secret: string;
    
    constructor(
        private readonly configService: ConfigService,
        protected rndGen: RandomGeneratorService,
    ) {
        this.secret = configService.getOrThrow<string>('ARGON_SECRET');
    }

    async hash(password: string) {
        const rndBytes = crypto.randomBytes(2 ** 16);
        
        return argon2.hash(password, {
            type: argon2.argon2id,
            secret: Buffer.from(this.secret),
            salt: rndBytes,
        })
    }

    async verify(hash: string, password: string) {
        return await argon2.verify(hash, password, {
            secret: Buffer.from(this.secret),
            type: argon2.argon2id,
        })
    }
}