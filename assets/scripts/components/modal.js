export default class Modal {
    modal = null;
    overlay = null;

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

    constructor(options = {}) {
        this.options = {...this.defaults, ...options};
        if (true === this.options.instantOpen) {
            this.open();
        }
    }

    open() {
        this.resetModal();
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
                me.resetModal();
            });
        }
        /** close on click on close-button */
        me.modal.querySelector(
            '.' + this.options.closeBtnCls + '.' + this.options.closeBtnIconCls
        ).addEventListener('click', function () {
            me.resetModal();
        });
    }

    resetModal() {
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
        let title = document.createElement('div');
        title.id = 'title';
        if (null !== this.options.title) {
            title.innerHTML = this.options.title;
        }
        this.modal.append(title);
    }

    addContent() {
        let content = document.createElement('div');
        content.id = 'content';
        if (null !== this.options.content) {
            content.innerHTML = this.options.content;
        }
        this.modal.append(content);
    }
}
