export default class UUID {
    generateNumber(limit) {
        const value = limit * Math.random();
        return value | 0;
    };
    generateX() {
        const value = this.generateNumber(16);
        return value.toString(16);
    };
    generateXes(count) {
        let result = '';
        for(let i = 0; i < count; ++i) {
            result += this.generateX();
        }
        return result;
    };
    generateVariant() {
        const value = this.generateNumber(16);
        const variant = (value & 0x3) | 0x8;
        return variant.toString(16);
    };
    // UUID v4
    //
    //   version: M=4
    //   variant: N
    //   pattern: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
    //
    generate() {
        return this.generateXes(8)
            + '-' + this.generateXes(4)
            + '-' + '4' + this.generateXes(3)
            + '-' + this.generateVariant() + this.generateXes(3)
            + '-' + this.generateXes(12)
    };
};
