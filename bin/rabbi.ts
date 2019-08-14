#!/usr/bin/env ts-node

var program = require('commander');

var rabbi = require('../dist/lib/rabbi');

var path = require('path');

var mkdirp = require('mkdirp');

var cp = require('cp-file');

program
  .command('start [actorsDirectory]')
  .action(async (actorsDirectory) => {

    if (!actorsDirectory) {

      actorsDirectory = path.join(process.cwd(), 'actors');

      rabbi.startActorsDirectory(actorsDirectory);
      
    }

  });

program
  .command('actor <actor_name>')
  .action(async (actorName) => {

    let p = path.join(process.cwd(), 'actors', actorName);

    mkdirp(p, async function() {

      let source = path.join(__dirname, '..', 'templates', 'actor.ts');

      let destination = path.join(p, 'actor.ts');

      await cp(source, destination); 

      console.log('actor file created at', destination);
      
    });

  });

program
  .parse(process.argv);

