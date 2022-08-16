import https from 'https';

export default function ({
    $axios,
    store
}) {
    const agent = new https.Agent({
        rejectUnauthorized: false
    });
    $axios.onRequest(config => {
        if (process.env.currentEnv === 'dev') {
            config.httpsAgent = agent;
        }
    });
}