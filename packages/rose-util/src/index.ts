import pngparse from 'pngparse'


/**
 * @author Ramon Wijnands - rayman747@hotmail.com
 * If a message was compressed as a PNG image (a compression hack since
 * gzipping over WebSockets * is not supported yet), this function decodes
 * the "image" as a Base64 string.
 *
 * @private
 * @param data - object containing the PNG data.
 * @param callback - function with params:
 *   * data - the uncompressed data
 */
export function decompressPng(data: string) {
    const buffer = new Buffer(data, 'base64')

    pngparse.parse(buffer, (err: any, {
        data
    }: any) => new Promise((resolve, reject) => {

        if (err) {
            console.warn('Cannot process PNG encoded message ');
            reject(err)
        } else {
            const jsonString = data.toString();
            resolve(JSON.parse(jsonString));
        }
    })
}