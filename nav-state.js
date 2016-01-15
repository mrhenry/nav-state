/**
 * @example
 *
 * <a class="js-nav-state" href="/">
 *   Home
 * </a>
 *
 * OR
 *
 * <li>
 *   <a class="js-nav-state" href="/">
 *     Home
 *   </a>
 * </li>
 *
 * OR
 *
 * <div class="js-nav-state" data-nav-state-href="/">
 *   Home
 * </div>
 *
 *
 * When a page doesn't follows a normal structure, you can always manually match
 * a parent by adding <link rel="up"> element(s) in your page
 *
 * @example page on "/product/bar"
 *
 * <link rel="up" href="/pages/foo">
 * <link rel="up" href="/pages/foo-foo">
 *
 * will match
 *
 * <a class="js-nav-state" href="/pages/foo">
 *   Foo
 * </a>
 *
 * <a class="js-nav-state" href="/pages/foo-foo">
 *   Foo
 * </a>
 */

/**
 * @class NavState
 */
export default class NavState {

	/**
	 * @constructor
	 *
	 * @param  {DOM element} el
	 */
	constructor(el) {
		this.el = el;

		this.check();
	}

	/**
	 * Check state
	 */
	check() {
		let strict = this.el.getAttribute('data-nav-state-strict');
		let href = this.el.getAttribute('data-nav-state-href');
		let currentUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
		let $linkUp = $('[rel="up"]');

		if (!href) {
			if (this.el.tagName === 'A') {
				href = this.el.getAttribute('href');

				} else {
					let link = this.el.querySelector('a');

					href = link ? link.getAttribute('href') : null;
				}
		}

		this.el.classList.remove('is-active');

		if (!!strict) {
			if (window.location.href === href || currentUrl === href) {
				this.el.classList.add('is-active');
			}

			$linkUp.each((idx, el) => {
				if ( $(el).attr('href') === href ) {
					$(this.el).addClass('is-active');
				}
			});

		} else {
			if (window.location.pathname.indexOf(href) === 0 || currentUrl.indexOf(href) === 0) {
				this.el.classList.add('is-active');
			}

			$linkUp.each((idx, el) => {
				if ( $(el).attr('href').indexOf(href) === 0 ) {
					$(this.el).addClass('is-active');
				}
			});

		}
	}
}
