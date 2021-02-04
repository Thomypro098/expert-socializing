import { sep } from 'path';
import { promisify } from 'util';
import globUnPromise from 'glob';
export const loadDirSync = async (dirPath: string) => {
	const glob = promisify(globUnPromise);
	if (dirPath.toLowerCase().startsWith(`.${sep}`)) {
		dirPath = dirPath.split(sep)[1];
	}
	const files: string[] = await glob(
		`${__dirname}${sep}..${sep}${dirPath}${sep}**${sep}*{.ts, .js}`
	);
	return files;
};
