// # Local File System Media Storage module
// The (default) module for storing media, using the local file system
const config = require('../../../shared/config');
const urlUtils = require('../../../shared/url-utils');
const LocalStorageBase = require('./LocalStorageBase');

const messages = {
    notFound: 'Media file not found',
    notFoundWithRef: 'Media file not found: {file}',
    cannotRead: 'Could not read media file: {file}'
};

class LocalMediaStorage extends LocalStorageBase {
    constructor() {
        super({
            storagePath: config.getContentPath('media'),
            staticFileURLPrefix: urlUtils.STATIC_MEDIA_URL_PREFIX,
            siteUrl: config.getSiteUrl(),
            errorMessages: messages
        });
    }

    async save(file, targetDir) {
        const result = await super.save(file, targetDir);
        if (!config.get('urls:media')) {
            return result;
        }

        return `${config.get('urls:files')}${result}`;
    }

    async saveRaw(buffer, targetPath) {
        const result = await super.saveRaw(buffer, targetPath);
        if (!config.get('urls:media')) {
            return result;
        }

        return `${config.get('urls:files')}${result}`;
    }
}

module.exports = LocalMediaStorage;
