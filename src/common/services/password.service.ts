import { Injectable } from "@nestjs/common";
import { RandomGeneratorService } from "./random-generator.service";
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
    private secret: string;
    constructor(
        protected rndGen: RandomGeneratorService
    ) {
        this.secret = process.env.ARGON_SECRET         
    }

    async hash(password: string) {
        const saltStr = await this.rndGen.genStr();
        console.log(this.secret);
        
        return argon2.hash(password, {
            secret: Buffer.from(this.secret),
            salt: Buffer.from(saltStr)
        })
    }

    async verify(hash: string, password: string) {
        return await argon2.verify(hash, password, {
            secret: Buffer.from(this.secret)
        })
    }
}