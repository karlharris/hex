import Modal from '../components/modal';
import FieldHelper from '../helper/fieldHelper';
import Unit from '../entities/unit';

export default class Game {
    placedUnits = [];
    dragSrcEl = null;
    dragUnit = null;

    constructor(elementId) {
        this.element = document.getElementById(elementId);
        if (null !== this.element) {
            this.fieldHelper = new FieldHelper(this.element);

            this.setDefaults();
            this.bindEvents(this);
        }
    }

    setDefaults() {
        this.fieldInfoElement = document.getElementById('field-info');
        this.infoIdElement = this.fieldInfoElement.querySelector('#field-info-id');
        this.infoOwnerElement = this.fieldInfoElement.querySelector('#field-info-owner');
        this.infoHeldElement = this.fieldInfoElement.querySelector('#field-info-held');
        this.infoHealthContainerElement = this.fieldInfoElement.querySelector('#health');
        this.infoHealthElement = this.fieldInfoElement.querySelector('#current-health-info');
        this.infoHealthPercentElement = this.fieldInfoElement.querySelector('#current-health-percent');
        this.fieldActionsElement = document.getElementById('field-actions');
        this.fieldActions = this.fieldActionsElement.querySelectorAll('.action-type');
    }

    bindEvents(me) {
        me.fieldHelper.setEvents(me);
        this.addActionEvents(me);
    }

    addActionEvents(me) {
        me.fieldActions.forEach((action) => {
            /** right click event */
            action.addEventListener('contextmenu', function (event) {
                event.preventDefault();
                new Modal({
                    title: this.dataset.title ? this.dataset.title : null,
                    content: this.dataset.content ? this.dataset.content : null,
                    instantOpen: true,
                    iconClass: this.firstChild.classList
                });
            });
            /** drag & drop events */
            action.addEventListener('dragstart', function (event) {
                me.fieldHelper.resetActive(me);
                this.style.opacity = '0.2';
                me.dragSrcEl = this;
                if (undefined !== me.dragSrcEl.dataset.type) {
                    me.dragUnit = new Unit(me.dragSrcEl);
                }
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('text/html', this.innerHTML);
            });
            action.addEventListener('dragend', function () {
                this.style.opacity = '1';
                me.dragSrcEl = null;
                me.dragUnit = null;
            });
        });
    }

    showInfo(me, data) {
        me.fieldInfoElement.style.display = 'block';
        me.infoIdElement.innerText = data.id;
        me.infoOwnerElement.innerText = data.dataset.owner;
        if ('' !== data.dataset.held) {
            me.infoHeldElement.innerText = data.dataset.held;
            me.infoHealthElement.innerText = data.dataset.currenthealth + ' / ' + data.dataset.health;
            me.infoHealthPercentElement.style.width = (
                (parseInt(data.dataset.currenthealth) * 100) / parseInt(data.dataset.health)
            ).toString() + '%';
            this.infoHealthContainerElement.style.display = 'block';
        }
    }

    hideInfo(me) {
        me.fieldInfoElement.style.display = 'none';
        me.infoHealthContainerElement.style.display = 'none';
        me.infoHeldElement.innerText = '';
        me.infoHealthElement.innerText = '';
        me.infoHealthPercentElement.style.width = '';
        this.infoHealthContainerElement.style.display = 'none';
    }

    getUnitById(id) {
        if (undefined === id || null === id) {
            return null;
        }
        return this.placedUnits.find(unit => unit.id === id);
    }
}
