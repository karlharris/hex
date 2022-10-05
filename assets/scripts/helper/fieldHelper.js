import FieldDetector from '../helper/fieldDetector';
import RandomHelper from '../helper/randomHelper';
import Field from "../entities/field";

export default class FieldHelper {
    mountainIntegers = [];
    forrestIntegers = [];
    alreadyOccupied = [];

    constructor(element) {
        this.element = element;
        this.detector = new FieldDetector();
        this.random = new RandomHelper();
        this.determineRandomFields();
    }

    setEvents(parent) {
        let me = this;
        let fields = this.element.querySelectorAll('li .hexagon');
        let counter = 1;
        fields.forEach(function (field) {
            field = new Field(field.id);
            field.bindEvents(me, parent);
            me.setRandomFields(me, field, counter);
            counter++;
        });
    }

    getIconHtml(iconClass) {
        let i = document.createElement('i');
        i.classList.add('ra', iconClass);
        return i;
    }

    determineRandomFields() {
        if (undefined !== this.element.dataset.mountain) {
            this.mountainIntegers = this.random.getRandomIntegers(
                this.element.dataset.mountain,
                this.alreadyOccupied,
                43,
                168
            );
        }
        if (undefined !== this.element.dataset.forrest) {
            this.forrestIntegers = this.random.getRandomIntegers(
                this.element.dataset.forrest,
                this.alreadyOccupied,
                43,
                168
            );
        }
    }

    setRandomFields(me, field, counter) {
        if (me.mountainIntegers.includes(counter)) {
            me.enrichField(field, 'ra-mountains', 'mountain', 'Mountains');
        }
        if (me.forrestIntegers.includes(counter)) {
            me.enrichField(field, 'ra-pine-tree', 'forrest', 'Forrest');
        }
    }

    enrichField(field, iconClass, color, ownerExtension = null) {
        field.element.append(this.getIconHtml(iconClass));
        if (null !== ownerExtension) {
            field.element.dataset.owner = field.element.dataset.owner + ' | ' + ownerExtension;
        }
        field.element.classList.add(color);
    }

    highlightAttackRange(unit, remove = false) {
        if (undefined !== unit && null !== unit) {
            switch (unit.type) {
                case 'melee':
                case 'ranged':
                    this.highlightFields(this.detector.getAllLines(unit.locationId, unit.effectWidth), remove);
                    break;
                case 'aoe':
                    this.highlightFields(this.detector.getPerimeter(unit.locationId, unit.effectWidth), remove);
                    break;
            }
        }
    }

    highlightMovementRange(unit, remove = false) {
        if (undefined !== unit && null !== unit) {
            this.highlightFields(this.detector.getPerimeter(unit.locationId, unit.movementWidth), remove, 'movement');
        }
    }

    highlightFields(fields, remove = false, classPrefix = 'attack') {
        fields.forEach((field) => {
            if (!remove) {
                field.element.classList.add(classPrefix + '-highlight');
            } else {
                field.element.classList.remove(classPrefix + '-highlight');
            }
        });
    }

    getActiveField() {
        let active = this.element.getElementsByClassName('active');
        if (active.length) {
            return active[0];
        }
        return null;
    }

    getActiveUnit(game, id = null) {
        if (null !== id) {
            return game.getUnitById(id);
        }
        let active = this.getActiveField();
        if (null !== active && '' !== active.dataset.held) {
            return game.getUnitById(active.dataset.held);
        }
        return null;
    }

    resetActive(game) {
        let active = this.getActiveField();
        if (null !== active) {
            active.classList.remove('active');
            this.highlightMovementRange(this.getActiveUnit(game, active.dataset.held), true);
        }
        game.hideInfo(game);
    }

    cleanField(id) {
        let element = this.element.getElementById(id);
        element.dataset.held = '';
        element.dataset.health = '';
        element.dataset.currenthealth = '';
    }
}
