export default class Modal {
    defaults = {
        modalWrapperId: 'modal-wrapper',
        modalId: 'modal',
        overlay: true,
        overlayId: 'modal-overlay',
        content: null,
        title: null,
        iconClass: [],
        instantOpen: false,
        closeOnOverlay: true,
        closeBtnCls: 'close',
        closeBtnIconCls: 'icon-cross',
    }
    modal = null;
    overlay = null;
    options = {}

    constructor(options = {}) {
        this.options = {...this.defaults, ...options};
        if (true === this.options.instantOpen) {
            this.open();
        }
    }

    open() {
        this.removeModal();
        if (true === this.options.overlay) {
            this.overlay = this.createBaseOverlay();
            document.body.append(this.overlay);
        }
        this.modal = this.createBaseModal();
        this.addIcon();
        this.addTitle();
        this.addContent();
        document.body.append(this.modal);
        this.bindEvents(this);
    }

    bindEvents(me) {
        /** close modal on click on the overlay if exists */
        if (true === me.options.overlay || true === me.options.closeOnOverlay) {
            me.overlay.addEventListener('click', function () {
                me.removeModal();
            });
        }
        /** close on click on close-button */
        me.modal.querySelector(
            '.' + this.options.closeBtnCls + '.' + this.options.closeBtnIconCls
        ).addEventListener('click', function () {
            me.removeModal();
        });
    }

    removeModal() {
        if (null !== this.modal) {
            this.modal.remove();
        }
        if (null !== this.overlay) {
            this.overlay.remove();
        }
    }

    createBaseModal() {
        let modal = document.createElement('div');
        modal.id = this.options.modalWrapperId;

        let closeButton = document.createElement('div');
        closeButton.classList.add(this.options.closeBtnCls, this.options.closeBtnIconCls);

        modal.append(closeButton);
        return modal;
    }

    createBaseOverlay() {
        let overlay = document.createElement('div');
        overlay.id = this.options.overlayId;
        return overlay;
    }

    addIcon() {
        if ([] !== this.options.iconClass) {
            let icon = document.createElement('div');
            icon.id = 'icon';
            let i = document.createElement('i');
            this.options.iconClass.forEach((value) => {
                i.classList.add(value)
            });
            icon.append(i);
            this.modal.append(icon);
        }
    }

    addTitle() {
        if (null !== this.options.title) {
            let title = document.createElement('div');
            title.innerHTML = this.options.title;
            title.id = 'title';
            this.modal.append(title);
        }
    }

    addContent() {
        if (null !== this.options.content) {
            let content = document.createElement('div');
            content.id = 'content';
            content.innerHTML = this.options.content;
            this.modal.append(content);
        }
    }
}
