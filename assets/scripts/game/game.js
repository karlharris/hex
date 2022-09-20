import Modal from '../components/modal';
import FieldHelper from '../helper/fieldHelper';

export default class Game {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.fieldHelper = new FieldHelper(this.element);
        if (null !== this.element) {
            this.setDefaults();
            this.bindEvents(this);
        }
    }

    setDefaults() {
        this.fieldInfoElement = document.getElementById('field-info');
        this.infoIdElement = this.fieldInfoElement.querySelector('#field-info-id');
        this.infoOwnerElement = this.fieldInfoElement.querySelector('#field-info-owner');
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
                this.style.opacity = '0.2';
                me.dragSrcEl = this;
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('text/html', this.innerHTML);
            });
            action.addEventListener('dragend', function (event) {
                this.style.opacity = '1';
                me.dragSrcEl = null;
            });
        });
    }

    showActions(me) {
        me.fieldActionsElement.style.display = 'block';
    }

    hideActions(me) {
        me.fieldActionsElement.style.display = 'none';
    }

    showInfo(me) {
        me.fieldInfoElement.style.display = 'block';
    }

    hideInfo(me) {
        me.fieldInfoElement.style.display = 'none';
    }
}
