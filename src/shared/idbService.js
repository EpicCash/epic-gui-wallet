import { DATA_TYPE, Connection } from 'jsstore';

const getWorkerPath = () => {
    if (process.env.NODE_ENV === 'development') {
        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js");
    }
    else {
        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js");
    }
};

// This will ensure that we are using only one instance.
// Otherwise due to multiple instance multiple worker will be created.
const workerPath = getWorkerPath().default;
export const idbCon = new Connection(new Worker(workerPath));
export const dbname = 'Epicwallet';

const getDatabase = () => {
    const tblAddressbook = {
        name: 'Addressbook',
        version:2,
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
              notNull: true,
              dataType: DATA_TYPE.Number
            },
            name: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            gender: {
                dataType: DATA_TYPE.String,
                default: 'male'
            },
            country: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            city: {
                dataType: DATA_TYPE.String,
                notNull: true
            },
            onion: {
                dataType: DATA_TYPE.String,
                notNull: true
            },
            keybase: {
              dataType: DATA_TYPE.String,
              notNull: true
            },
            alwaysproof:{
              dataType: DATA_TYPE.Boolean,
              default: false
            },
            proofaddr:{
              dataType: DATA_TYPE.String,
              notNull: true
            },
            externalOne:{
              dataType: DATA_TYPE.String,
              notNull: true
            },
            externalTwo:{
              dataType: DATA_TYPE.String,
              notNull: true
            },
            notice:{
              dataType: DATA_TYPE.String,
              notNull: true
            }
        }
    };
    const tblAddressTransaction = {
        name: 'AddressTransactions',
        version: 2,
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
              notNull: true,
              dataType: DATA_TYPE.Number
            },
            slateid: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            type: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            address: {
                notNull: true,
                dataType: DATA_TYPE.Number
            },

        }
    };
    const tblUser = {
        name: 'User',
        version: 2,
        columns: {
            id: {
              primaryKey: true,
              autoIncrement: true
            },
            account: {
              unique: true,
              notNull: true,
              dataType: DATA_TYPE.String
            },
            name: {
              notNull: true,
              dataType: DATA_TYPE.String
            },
            email: {
              notNull: true,
              dataType: DATA_TYPE.String
            },
            keybase: {
              notNull: true,
              dataType: DATA_TYPE.String
            },
            ngrok: {
              notNull: true,
              dataType: DATA_TYPE.String
            },
            language: {
              notNull: true,
              dataType: DATA_TYPE.String
            },
            nodeInternal:{
              default: false,
              dataType: DATA_TYPE.Boolean
            }
        }
    };
    const dataBase = {
        name: dbname,
        version:2,
        tables: [tblAddressbook, tblAddressTransaction, tblUser],
    };
    return dataBase;
};

const initJsStore = async () => {
    try {
        const dataBase = getDatabase();
        await idbCon.initDb(dataBase);
    }
    catch (ex) {
        //alert(ex.message);
        console.error(ex);

    }
};
initJsStore();
