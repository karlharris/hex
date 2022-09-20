export default class FieldDetector {
    charMap = {
        'A': '1',
        'B': '2',
        'C': '3',
        'D': '4',
        'E': '5',
        'F': '6',
        'G': '7',
        'H': '8',
        'I': '9',
        'J': '10',
        'K': '11',
        'L': '12',
        'M': '13',
        'N': '14',
        'O': '15',
    };
    numberMap = {
        '1': 'A',
        '2': 'B',
        '3': 'C',
        '4': 'D',
        '5': 'E',
        '6': 'F',
        '7': 'G',
        '8': 'H',
        '9': 'I',
        '10': 'J',
        '11': 'K',
        '12': 'L',
        '13': 'M',
        '14': 'N',
        '15': 'O',
    }
    checkContext(id) {
        if (null !== id) {
            this.setContext(id);
        }
    }
    setContext(id) {
        this.parts = id.split('-');
        this.currentCharKey = this.charMap[this.parts[0]];
        this.isEvenRow = 0 === parseInt(this.currentCharKey) % 2;
    }
    getUpperRight(id = null) {
        this.checkContext(id);
        /** the first row has no upper fields */
        if ('1' === this.currentCharKey) {
            return null;
        }
        /** every last field in every even row has no upper right field */
        if ('14' === this.parts[1] && this.isEvenRow) {
            return null;
        }
        return this.numberMap[parseInt(this.currentCharKey) - 1]
            + '-'
            + (this.isEvenRow ? (parseInt(this.parts[1]) + 1) : this.parts[1]).toString();
    }
    getRight(id = null) {
        this.checkContext(id);
        /** the last field in a row has no right field */
        if ('14' === this.parts[1]) {
            return null;
        }
        return this.parts[0] + '-' + (parseInt(this.parts[1]) + 1).toString();
    }
    getBottomRight(id = null) {
        this.checkContext(id);
        /** the last row has no bottom fields */
        if ('15' === this.currentCharKey) {
            return null;
        }
        /** every last field in every even row has no bottom right field */
        if ('14' === this.parts[1] && this.isEvenRow) {
            return null;
        }
        return this.numberMap[parseInt(this.currentCharKey) + 1]
            + '-'
            + (this.isEvenRow ? (parseInt(this.parts[1]) + 1) : this.parts[1]).toString();
    }
    getBottomLeft(id = null) {
        this.checkContext(id);
        /** the last row has no bottom fields */
        if ('15' === this.currentCharKey) {
            return null;
        }
        /** every last field in every odd row has no bottom right field */
        if ('1' === this.parts[1] && !this.isEvenRow) {
            return null;
        }
        return this.numberMap[parseInt(this.currentCharKey) + 1]
            + '-'
            + (this.isEvenRow ? this.parts[1].toString() : (parseInt(this.parts[1]) - 1));
    }
    getLeft(id = null) {
        this.checkContext(id);
        /** the first field in a row has no left field */
        if ('1' === this.parts[1]) {
            return null;
        }
        return this.parts[0] + '-' + (parseInt(this.parts[1]) - 1).toString();
    }
    getUpperLeft(id = null) {
        this.checkContext(id);
        /** the first row has no upper fields */
        if ('1' === this.currentCharKey) {
            return null;
        }
        /** every first field in every odd row has no upper left field */
        if ('1' === this.parts[1] && !this.isEvenRow) {
            return null;
        }
        return this.numberMap[parseInt(this.currentCharKey) - 1]
            + '-'
            + (this.isEvenRow ? this.parts[1].toString() : (parseInt(this.parts[1]) - 1));
    }
    getSurroundingFields(id = null) {
        this.checkContext(id);
        return [
            this.getUpperRight(),
            this.getRight(),
            this.getBottomRight(),
            this.getBottomLeft(),
            this.getLeft(),
            this.getUpperLeft(),
        ];
    }
    getLine(id, direction, length = 2) {
        let result = [];
        let currentId = id;
        for (let i = 0; i < length; i++) {
            switch (direction) {
                case 'ur':
                case 'upperRight':
                    currentId = this.getUpperRight(currentId);
                    break;
                case 'r':
                case 'right':
                    currentId = this.getRight(currentId);
                    break;
                case 'br':
                case 'bottomRight':
                    currentId = this.getBottomRight(currentId);
                    break;
                case 'bl':
                case 'bottomLeft':
                    currentId = this.getBottomLeft(currentId);
                    break;
                case 'l':
                case 'left':
                    currentId = this.getLeft(currentId);
                    break;
                case 'ul':
                case 'upperLeft':
                    currentId = this.getUpperLeft(currentId);
                    break;
            }
            result.push(currentId);
        }
        return result;
    }
    getAllLines(id, length = 2) {
        let result = [];
        ['ur','r','br','bl','l','ul'].forEach((direction) => {
            result = [...result, ...this.getLine(id, direction, length)];
        });
        return result;
    }
}
