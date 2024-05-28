window.HorizontalScroller = function (options) {
    // Default settings
    this.option = {
        selector: ".horizontal-scroller",
        buttonRight: true,
        buttonLeft: true,
        draggable: true,
    }

    // Merge defaults and options into settings to use
    Object.assign(this.option, options);

    // Set _this so we can access it from anywhere
    var _this = this;

    // Initialize all scrollable elements
    document.querySelectorAll(_this.option.selector).forEach(function (el) {
        let isDown = false;
        let startX;
        let scrollLeft;

        // Prevent clicks on links while dragging
        let preventLinks = false;
        el.querySelectorAll('A[href]').forEach(function (a) {
            a.addEventListener('click', function (e) {
                if (preventLinks) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            });
        });

        // Add left button
        if (_this.option.buttonLeft) {
            el.insertAdjacentHTML('afterend', '<div class="button-left' + (el.scrollLeft <= 0 ? ' hide' : '') + '"></div>');
        }
        // Add right button
        if (_this.option.buttonRight) {
            el.insertAdjacentHTML('afterend', '<div class="button-right' + (el.scrollLeft + el.clientWidth >= el.scrollWidth ? ' hide' : '') + '"></div>');
        }

        // Make the buttons work
        el.parentElement.querySelectorAll('.button-left, .button-right').forEach(function (button) {
            button.addEventListener('click', function (e) {
                let direction = this.classList.contains('button-right') ? 1 : -1;
                let current = 1;
                let items = el.children.length > 1 ? el.children : el.children[0].children;
                for (n in items) {
                    if (items[n].offsetLeft <= el.scrollLeft) {
                        current = n;
                    }
                }
                let goto = Math.round(current) + direction;
                if (goto < 0) {
                    goto = 0;
                }
                el.scrollTo({ left: items[goto].offsetLeft, behavior: 'smooth' });
            });
        });

        // Show or hide buttons depending on scroll position
        function checkButtons() {
            if (_this.option.buttonLeft) {
                if (el.scrollLeft <= 0) {
                    el.parentElement.querySelector('.button-left').classList.add('hide');
                } else {
                    el.parentElement.querySelector('.button-left').classList.remove('hide');
                }
            }
            if (_this.option.buttonRight) {
                if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
                    el.parentElement.querySelector('.button-right').classList.add('hide');
                } else {
                    el.parentElement.querySelector('.button-right').classList.remove('hide');
                }
            }
        }

        // Toggle buttons on scroll or viewport resize
        el.addEventListener('scroll', checkButtons);
        window.addEventListener('resize', checkButtons);

        // Add drag functionality
        if (_this.option.draggable) {
            el.addEventListener('mousedown', function (e) {
                isDown = true;
                el.classList.add('dragging');
                startX = e.pageX - el.offsetLeft;
                scrollLeft = el.scrollLeft;
            });
            el.addEventListener('mouseleave', function (e) {
                isDown = false;
                el.classList.remove('dragging');
            });
            el.addEventListener('mouseup', function (e) {
                isDown = false;
                preventLinks = (startX - (e.pageX - el.offsetLeft));
                e.preventDefault();
                el.classList.remove('dragging');
            });
            el.addEventListener('mousemove', function (e) {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - el.offsetLeft;
                const walk = (x - startX) * 1; //scroll-fast
                el.scrollLeft = scrollLeft - walk;
            });
        }
    });
}
