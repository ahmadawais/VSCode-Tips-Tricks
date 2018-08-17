/**
 * Main JavaScript App.
 *
 * VSCode.pro course.
 *
 * @since 1.0.0
 */

import { log } from "../modules/log"
import { sum } from "../modules/sum"
import { headingChanger } from "../modules/headingChanger";

// Fancy log.
const name = 'Ahmad';
log(name, 'NAME');

// Sum.
log(sum(50, 50), 'SUM');

// Change the heading.
headingChanger('VSCode.pro! — Heading has changed')
