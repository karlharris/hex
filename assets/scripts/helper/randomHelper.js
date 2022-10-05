export default class RandomHelper {
    getRandomIntegers(
        amount = 12,
        excludes = [],
        min = 0,
        max = 210
    ) {
        let integers = [];
        max++;
        for (let i = 1; i <= amount; i++) {
            let tempInt = this.generateRandomBetween(min, max, excludes);
            integers.push(tempInt);
            excludes.push(tempInt);
        }
        return integers;
    }

    generateRandomBetween(min, max, excludes) {
        let randomInteger = Math.floor(Math.random() * (max - min)) + min;
        if (excludes.includes(randomInteger)) {
            randomInteger = this.generateRandomBetween(min, max, excludes);
        }
        return randomInteger;
    }
}
