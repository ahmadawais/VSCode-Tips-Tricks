/**
 * Custom log function.
 *
 * @param Mixed data Data to log.
 * @param String context Message.
 */
export const log = (data, context = 'LOG:') => {
	/* eslint-disable no-console */
	console.log(`%c${context}`, 'background: #bada55; color: #222222; padding: 10px;');
	console.log(data);
	console.log('\n');
	/* eslint-enable no-console */
};
