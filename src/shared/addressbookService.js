import { BaseService } from "./base_service";

class AddressbookService extends BaseService {

    constructor() {
        super();
        this.tableName = "Addressbook";
    }

    getAddress() {
      console.log(this.connection);
        return this.connection.select({
            from: this.tableName,
        })
    }

    addAddress(address) {
        return this.connection.insert({
            into: this.tableName,
            values: [address],
            return: true
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

export default AddressbookService;
