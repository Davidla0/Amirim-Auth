import mongoose from 'mongoose'
import config from 'config'
import log from './logger'

async function connect() {
    const dbUri = config.get<string>('dbUri')
    console.log(dbUri);
    try {
        mongoose.connect(dbUri)
        log.info('connect to DB', dbUri)
    } catch (e) {
        process.exit(1)
    }
}
export default connect
