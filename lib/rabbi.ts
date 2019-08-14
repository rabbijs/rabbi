
import * as fs from 'fs';
import * as path from 'path';

export function getDirectories(source) {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

export async function startActorsDirectory(directoryIndexPath: string) {

  let directories = getDirectories(directoryIndexPath);

  let actors = directories.map(directory => {

    var dir = path.join(directoryIndexPath, directory);

    return fs.readdirSync(dir).reduce((actorFile, file) => {

      if (file === 'actor.ts') {

        actorFile = path.join(dir, file);
      }

      return actorFile;

    }, null);

  });

  actors.forEach(actor => {

    require(actor).start();

  });

}
