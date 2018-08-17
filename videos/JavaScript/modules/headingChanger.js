/**
 * Change the HTML Heading.
 *
 * @param String newHeading Heading content.
 */

export const headingChanger = newHeading => {
	document.querySelector('h1').textContent = newHeading;
};
