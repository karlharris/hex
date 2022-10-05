// noinspection JSPotentiallyInvalidUsageOfClassThis

export default class Field {
    id = '';
    element = null;
    currentHoverUnit = null;

    constructor(id) {
        this.id = id;
        this.element = document.getElementById(this.id);
    }

    bindEvents(fieldHelper, game) {
        let me = this;

        /**
         * field click event
         */
        this.element.addEventListener('click', function () {
            let currentUnit = game.getUnitById(this.dataset.held);
            /** deselect on click again */
            if (this.classList.contains('active')) {
                fieldHelper.resetActive(game, currentUnit);
                game.hideInfo(game);
                fieldHelper.highlightMovementRange(currentUnit, true);
            } else {
                if (this.classList.contains('movement-highlight') && '' === this.dataset.held) {
                    let activeUnit = fieldHelper.getActiveUnit(game);
                    if (null !== activeUnit) {
                        activeUnit.moveTo(game, fieldHelper, this.id);
                    }
                } else {
                    fieldHelper.resetActive(game, currentUnit);
                    this.classList.add('active');
                    game.showInfo(game, this);
                    fieldHelper.highlightAttackRange(currentUnit, true);
                    fieldHelper.highlightMovementRange(currentUnit);
                }
            }
        });

        /**
         * drag & drop events
         */
        this.element.addEventListener('dragenter', function () {
            this.classList.add('drag-over');
            game.dragUnit.setLocation(this.id);
            fieldHelper.highlightAttackRange(game.dragUnit);
        });

        this.element.addEventListener('dragleave', function () {
            this.classList.remove('drag-over');
            game.dragUnit.setLocation(this.id);
            fieldHelper.highlightAttackRange(game.dragUnit, true);
        });

        this.element.addEventListener('dragover', function (event) {
            event.preventDefault();
        });

        this.element.addEventListener('drop', function (event) {
            this.classList.remove('drag-over');
            game.dragUnit.setLocation(this.id);
            fieldHelper.highlightAttackRange(game.dragUnit, true);
            if (this.classList.contains('allowed') && null !== game.dragSrcEl) {
                this.innerHTML = event.dataTransfer.getData('text/html');
                if (null !== game.dragUnit) {
                    game.placedUnits.push(game.dragUnit);
                    this.dataset.held = game.dragUnit.id;
                    this.dataset.health = game.dragUnit.health;
                    this.dataset.currenthealth = game.dragUnit.health;
                }
                game.dragSrcEl = null;
                game.dragUnit = null;
            }
            return false;
        });

        /**
         * hover events
         */
        this.element.addEventListener('mouseenter', function (event) {
            if ('' !== this.dataset.held) {
                fieldHelper.highlightAttackRange(
                    me.currentHoverUnit = game.getUnitById(event.target.dataset.held)
                );
            }
        });

        this.element.addEventListener('mouseleave', function () {
                fieldHelper.highlightAttackRange(me.currentHoverUnit, true);
                me.currentHoverUnit = null;
        });
    }
}
