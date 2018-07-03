import sampleData from './sampleData';

/**
 *
 * @param ms
 * @returns {Promise<any>}
 */
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 *
 * @returns {Promise<{events: *[]}>}
 */
export const fetchSampleData = () => {
    return delay(1000).then(()=> {
        return Promise.resolve(sampleData);
    })
};