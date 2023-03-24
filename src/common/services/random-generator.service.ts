import { Injectable } from "@nestjs/common";

@Injectable()
export class RandomGeneratorService {
    public genStr(length: number = 36): string {
        const salt = 'abcdefghijklmnopqrstyvwxyz0123456789';
        let resultName: string = '';
    
        for (let i = 0; i < length; i++) {
            const isUpper = !!Math.round(Math.random());
            const randomI = Math.round(Math.random() * (salt.length - 1) + 0);
            const randomSymbol = salt[randomI];
            const isInt = Number.isInteger(randomSymbol);
            
            resultName += isInt ?
                randomSymbol :
                isUpper ? randomSymbol.toUpperCase() : randomSymbol;
        }
        return resultName;
    }
}