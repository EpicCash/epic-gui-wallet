import { BaseService } from "./base_service";

class UserService extends BaseService {



    constructor() {
        super();
        this.tableName = "User";


    }

    clear(){
      return this.connection.clear(this.tableName);
    }

    getUser(account) {

        return this.connection.select({
            from: this.tableName,
            where: {
                account: account
            }
        })
    }

    addUser(user) {
        return this.connection.insert({
            into: this.tableName,
            values: [user],
            return: true
        })
    }

    updateUserByAccount(account, updateData) {
        return this.connection.update({
            in: this.tableName,
            set: updateData,
            where: {
                account: account
            }
        })
    }

}

export default UserService;
