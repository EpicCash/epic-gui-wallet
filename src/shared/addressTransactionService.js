import { BaseService } from "./base_service";

class AddressTransactions extends BaseService {



    constructor() {
        super();
        this.tableName = "AddressTransactions";
    }

    clear(){
      return this.connection.clear(this.tableName);
    }

    getAddress(user_id) {

        return this.connection.select({
            from: this.tableName,
            where: {
                user_id: user_id
            },
            join: {
                with: "Addressbook",
                on: "AddressTransactions.address=Addressbook.id",
                type:"left",
                as: {
                    id: "addressbook_id",
                    user_id: "addressbook_userid",

                }

            }
        })
    }

    addAddress(address) {
        return this.connection.insert({
            into: this.tableName,
            values: [address],
            return: true
        })
    }

    findAddress(value) {
        return this.connection.select({
            from: this.tableName,
            where: {
                name: {
                  like: '%'+ value +'%'
                }
            }
        })
    }

    getAddressBySlateId(slateid) {
        return this.connection.select({
            from: this.tableName,
            where: {
                slateid: slateid
            }
        })
    }
    getAddressById(id) {
        return this.connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }

    removeAddress(id) {
        return this.connection.remove({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }

    updateAddressById(id, updateData) {
        return this.connection.update({
            in: this.tableName,
            set: updateData,
            where: {
                id: id
            }
        })
    }
}

export default AddressTransactions;
