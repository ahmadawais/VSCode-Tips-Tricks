/**
 * Custom log function.
 *
 * @param {any} data Data to log.
 * @param {String} context Message.
 */
export const log = (data, context = 'LOG:') => {
	console.log(`%c${context}`, 'background: #bada55; color: #222222; padding: 10px;');
	console.log(data);
	console.log('\n');
};
