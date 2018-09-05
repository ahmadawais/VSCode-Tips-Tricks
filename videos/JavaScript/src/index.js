/**
 * Main JavaScript App.
 *
 * VSCode.pro course.
 *
 * @since 1.0.0
 */

import { headingChanger } from '../modules/headingChanger';
import { log } from '../modules/log';
import { subtract } from '../modules/subtract';
import { sum } from '../modules/sum';

// Fancy log.
const name = 'Ahmad';
log(name, 'NAME');

// Sum.
log(sum(50, 50), 'SUM');
log(subtract(50, 40), 'SUBTRACT');

// Change the heading.
headingChanger('VSCode.pro! — Heading has changed');
