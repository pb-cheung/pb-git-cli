#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from 'yargs/helpers';
import main from '../index.js';

yargs(hideBin(process.argv))
    .alias('version','v')
    .help()
    .argv

main([].slice.call(process.argv, 2));
