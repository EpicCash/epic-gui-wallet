import { BaseService } from "./base_service";
import { useStore } from '@/store';

class UserService extends BaseService {



    constructor() {
        super();
        this.tableName = "User";
        this.store = useStore();
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

    async updateUserByAccount(account, updateData) {

        let updated = this.connection.update({
            in: this.tableName,
            set: updateData,
            where: {
                account: account
            }
        });
        if(updated){
            let user = await this.getUser(account);
            if(user.length){
              this.store.commit('user', user[0]);
            }
        }
        return updated;
    }

}

export default UserService;
