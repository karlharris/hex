import FieldDetector from '../helper/fieldDetector';

export default class FieldHelper {
    constructor(element) {
        this.element = element;
        this.fields = element.querySelectorAll('li .hexagon');
        this.detector = new FieldDetector();
        // this.alreadyOccupied = [];
        this.mountainIntegers = this.getRandomIntegers(24, [], 42, 168);
        this.forrestIntegers = this.getRandomIntegers(24, this.mountainIntegers, 42, 168);
    }

    setEvents(parent) {
        let me = this;
        let counter = 0;
        this.fields.forEach(function (field) {
            if (me.mountainIntegers.includes(counter)) {
                me.setSpecialField(field, 'ra-mountains', '#cd845d', 'Mountains');
            }
            if (me.forrestIntegers.includes(counter)) {
                me.setSpecialField(field, 'ra-pine-tree', '#7dcd5d', 'Forrest');
            }
            counter++;
            /** field click event */
            field.addEventListener('click', function () {
                /** deselect on click again */
                if (this.classList.contains('active')) {
                    me.resetActive();
                    parent.hideInfo(parent);
                    parent.hideActions(parent);
                } else {
                    me.resetActive();
                    this.classList.add('active');
                    parent.showActions(parent);
                    parent.showInfo(parent);
                    parent.infoIdElement.innerText = this.id;
                    parent.infoOwnerElement.innerText = this.dataset.owner;
                }
            });
            /** drag & drop events */
            field.addEventListener('dragenter', function (event) {
                this.classList.add('drag-over');
                me.highlightFields(me.detector.getAllLines(this.id, 4));
            });
            field.addEventListener('dragleave', function (event) {
                this.classList.remove('drag-over');
                me.highlightFields(me.detector.getAllLines(this.id, 4), true);
            });
            field.addEventListener('dragover', function (event) {
                event.preventDefault();
            });
            field.addEventListener('drop', function (event) {
                this.classList.remove('drag-over');
                me.highlightFields(me.detector.getAllLines(this.id, 4), true);
                if (this.classList.contains('allowed') && null !== parent.dragSrcEl) {
                    this.innerHTML = event.dataTransfer.getData('text/html');
                    parent.dragSrcEl = null;
                }
                return false;
            });
        });
    }

    getIconHtml(iconClass) {
        let i = document.createElement('i');
        i.classList.add('ra', iconClass);
        return i;
    }

    setSpecialField(field, iconClass, color, ownerExtension = null) {
        field.append(this.getIconHtml(iconClass));
        if (null !== ownerExtension) {
            field.dataset.owner = field.dataset.owner + ' | ' + ownerExtension;
        }
        field.style.background = color;
    }

    highlightFields(fields, remove = false) {
        fields.forEach((value) => {
            if (null !== value) {
                if (!remove) {
                    document.getElementById(value).classList.add('attack-highlight');
                } else {
                    document.getElementById(value).classList.remove('attack-highlight');
                }
            }
        });
    }

    resetActive() {
        let active = this.element.getElementsByClassName('active');
        if (active.length) {
            active[0].classList.remove('active');
        }
    }

    getRandomIntegers(amount = 12, excludes = [], min = 0, max = 210) {
        let integers = [];
        for (let i = 0; i <= amount; i++) {
            integers.push(this.generateRandomBetween(min, max, excludes));
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
