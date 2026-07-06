import { base } from '$app/paths';

/**
 * Normalise an asset path coming from the YAML data files.
 * - Leaves absolute URLs (http/https/protocol-relative) untouched.
 * - Prefixes local paths (e.g. "assets/img/x.jpg") with the app base so
 *   they resolve correctly regardless of the current route.
 * @param {string} path
 * @returns {string}
 */
export function asset(path) {
	if (!path) return path;
	if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:')) return path;
	const clean = path.replace(/^\//, '');
	return `${base}/${clean}`;
}
