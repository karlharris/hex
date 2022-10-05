import UUID from '../components/uuid';

export default class Unit {
    id = '';
    fieldElement = null;
    locationId = null;
    title = '';
    content = '';
    type = '';
    effectWidth = 0;
    movementWidth = 0;
    health = 0;
    currentHealth = 0;
    baseDamage = 0;
    attackPoints = 0;
    movePoints = 0;
    hybridPoints = 0;

    constructor(element, locationId = null) {
        this.setLocation(locationId);

        this.id = (new UUID()).generate();
        this.title = element.dataset.title;
        this.content = element.dataset.content;
        this.type = element.dataset.type;
        this.effectWidth = element.dataset.effectwidth;
        this.movementWidth = element.dataset.movementwidth;
        this.health = element.dataset.health;
        this.currentHealth = element.dataset.health;
        this.baseDamage = element.dataset.basedamage;
        this.attackPoints = element.dataset.attackpoints;
        this.movePoints = element.dataset.movepoints;
        this.hybridPoints = element.dataset.hybridpoints;
    }

    setLocation(locationId) {
        if (locationId !== this.locationId) {
            this.locationId = locationId;
            if (null !== this.locationId) {
                this.fieldElement = document.getElementById(this.locationId);
            }
        }
    }

    setInfo() {
        this.fieldElement.dataset.held = this.id;
        this.fieldElement.dataset.health = this.health.toString();
        this.fieldElement.dataset.currenthealth = this.currentHealth.toString();
    }

    moveTo(game, fieldHelper, id) {
        let target = document.getElementById(id);
        if (null === target.firstChild || target.classList.contains('forrest')) {
            let sourceElement = this.fieldElement;
            fieldHelper.highlightMovementRange(this, true);
            sourceElement.dataset.held = '';
            sourceElement.dataset.health = '';
            sourceElement.dataset.currenthealth = '';
            this.setLocation(id);
            this.setInfo();
            fieldHelper.highlightMovementRange(this);
            fieldHelper.resetActive(game);
            this.fieldElement.classList.add('active');
            game.showInfo(game, this.fieldElement);
            this.fieldElement.append(sourceElement.firstChild);
        }
    }
}
