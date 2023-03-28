import { Injectable } from "@nestjs/common";

@Injectable()
export class RandomGeneratorService {
    private readonly RandomLettersDigits = 'ABCDEFGHIJKLMNOPQRSTYVWXYZabcdefghijklmnopqrstyvwxyz0123456789';
    private readonly UpperLettersDigits = 'ABCDEFGHIJKLMNOPQRSTYVWXYZ0123456789';
    
    public genStr(length: number = 36): string {
        let resultName: string = '';
    
        for (let i = 0; i < length; i++) {
            const randomI = Math.round(Math.random() * (this.RandomLettersDigits.length - 1) + 0);
            const randomSymbol = this.RandomLettersDigits[randomI];
            
            resultName += randomSymbol;
        }
        return resultName;
    }

    public genStrUpper(length: number = 36): string {
        let resultName: string = '';
    
        for (let i = 0; i < length; i++) {
            const randomI = Math.round(Math.random() * (this.UpperLettersDigits.length - 1) + 0);
            const randomSymbol = this.UpperLettersDigits[randomI];
            
            resultName += randomSymbol;
        }
        return resultName;
    }
}