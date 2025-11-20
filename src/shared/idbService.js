import { DATA_TYPE, Connection } from 'jsstore';
import workerInjector from "jsstore/dist/worker_injector";

/*const getWorkerPath = () => {
    if (process.env.NODE_ENV === 'development') {
        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js");
    }
    else {
        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js");
    }
};*/

// This will ensure that we are using only one instance.
// Otherwise due to multiple instance multiple worker will be created.
//const workerPath = getWorkerPath().default;
export const idbCon = new Connection();
idbCon.addPlugin(workerInjector);
//export const idbCon = new Connection(new Worker(workerPath));
export const dbname = 'Epicwallet';

const getDatabase = () => {
    const tblAddressbook = {
        name: 'Addressbook',

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
                dataType: DATA_TYPE.String,
                enableSearch: true,
            },
            gender: {
                dataType: DATA_TYPE.String,
                default: 'male'
            },
            country: {
                notNull: true,
                dataType: DATA_TYPE.String,
                enableSearch: true,
            },
            city: {
                dataType: DATA_TYPE.String,
                notNull: true,
                enableSearch: true,
            },
            onion: {
                dataType: DATA_TYPE.String,
                notNull: true,
                enableSearch: true,
            },
            keybase: {
              dataType: DATA_TYPE.String,
              notNull: true,
              enableSearch: true,
            },
            alwaysproof:{
              dataType: DATA_TYPE.Boolean,
              default: false
            },
            proofaddr:{
              dataType: DATA_TYPE.String,
              notNull: true,
              enableSearch: true,
            },
            externalOne:{
              dataType: DATA_TYPE.String,
              notNull: true,
              enableSearch: true,
            },
            externalTwo:{
              dataType: DATA_TYPE.String,
              notNull: true,
              enableSearch: true,
            },
            notice:{
              dataType: DATA_TYPE.String,
              notNull: true,
              enableSearch: true,
            }
        }
    };
    const tblAddressTransaction = {
        name: 'AddressTransactions',

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
                notNull: false,
                dataType: DATA_TYPE.Number
            },

        }
    };
    const tblUser = {
        name: 'User',

        alter:{
          4: {
            add:{
               ngrok_force_start:{
                 default: false,
                 dataType: DATA_TYPE.Boolean
               }
            },
          },
          5: {
            add:{
               epicbox_domain:{
                 notNull: true,
                 dataType: DATA_TYPE.String
               }
            },
          }
        },
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
            },
            ngrok_force_start:{
              default: false,
              dataType: DATA_TYPE.Boolean
            },
            epicbox_domain:{
              notNull: true,
              dataType: DATA_TYPE.String
            }
        }
    };
    const dataBase = {
        name: dbname,
        version: 5,
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
