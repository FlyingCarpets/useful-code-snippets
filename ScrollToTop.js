export default class ScrollToTop {
    constructor() {
        this.scrollButtons.map((button) => {
            this.showBtn(button);
        this.bindClickAction(button);
    });
    }
    showBtn(button) {
        window.addEventListener('scroll', function() {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                button.classList.remove('hidden');
            } else {
                button.classList.add('hidden');
            }
        })
    }
    bindClickAction(button) {
        button.addEventListener('click', () => {
            this.scrollTop(document.body, 0, 600);
        this.scrollTop(document.documentElement, 0, 600);
    })
    }
    scrollTop(element, to, duration) {
        if (duration <= 0) return;

        const difference = to - element.scrollTop;
        const perTick = difference / duration * 10;
        setTimeout(function () {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop == to) return;
            scrollToTop.scrollTop(element, to, duration - 10);
        }, 10);
    }
    get scrollButtons() {
        return Array.from(document.querySelectorAll('.scroll-top'));
    }
}
export const scrollToTop = new ScrollToTop();
