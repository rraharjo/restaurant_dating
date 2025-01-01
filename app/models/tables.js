const { localPool } = require('./dbConnection.js');

class UserTable {
    static tableName = 'users';
    static fieldDBCode = 'pid';
    static fieldUsername = 'username';
    static fieldPassword = 'password';
    constructor() {
    }

    static insert = async (username, password) => {
        const query = `
            INSERT INTO ${this.tableName} 
            (${this.fieldUsername}, ${this.fieldPassword}) 
            VALUES ($1, $2) 
            RETURNING *;
        `;

        const result = await localPool.query(query, [username, password]);
        return result.rows[0];
    };

    // Delete a user by pid
    static delete = async (pid) => {
        const query = `
            DELETE FROM ${this.tableName} 
            WHERE ${this.fieldDBCode} = $1 
            RETURNING *;
        `;
        const result = await localPool.query(query, [pid]);
        return result.rows[0];
    };

    // Find a user by username
    static findByUsername = async (username) => {
        const query = `
            SELECT * FROM ${this.tableName} 
            WHERE ${this.fieldUsername} = $1;
        `;
        const result = await localPool.query(query, [username]);
        return result.rows[0];
    };
}

class RestaurantTable {
    static tableName = "restaurants";
    static fieldResName = "res_name";
    constructor() {
    }

    static insert = async (resName) => {
        const query = `
            INSERT INTO ${RestaurantTable.tableName}
            (${RestaurantTable.fieldResName})
            VALUES ($1)
            ON CONFLICT (${RestaurantTable.fieldResName}) DO NOTHING
            RETURNING *;
        `;
        const result = await localPool.query(query, [resName]);
        return result.rows[0];
    }
}

class VotingTable {
    static tableName = "votes";
    static fieldUserPID = "user_pid"
    static fieldResName = "res_name";
    static fieldVoteNum = "votes";

    constructor() {
    }

    static incrementVote = async (userPID, resName, inc = 1) => {
        const query1 = `
            UPDATE ${VotingTable.tableName} 
            SET ${VotingTable.fieldVoteNum} = ${VotingTable.fieldVoteNum} + ${inc} 
            WHERE ${VotingTable.fieldUserPID} = $1 
                AND ${VotingTable.fieldResName} = $2
            RETURNING *;
        `
        const result1 = await localPool.query(query1, [userPID, resName]);
        if (!result1.rows.length) {
            const query2 = `
                INSERT INTO ${VotingTable.tableName}
                (${VotingTable.fieldUserPID}, ${VotingTable.fieldResName}, ${VotingTable.fieldVoteNum})
                VALUES ($1, $2, ${inc})
                RETURNING *;
            `
            const _ = await localPool.query(query2, [userPID, resName]);
        }
        return;
    }

    static getVotes = async (userPID, maxItem) => {
        const query = `
            SELECT t2.${RestaurantTable.fieldResName}, t1.${VotingTable.fieldVoteNum}
            FROM ${VotingTable.tableName} t1
            LEFT JOIN ${RestaurantTable.tableName} t2
             ON t2.${RestaurantTable.fieldResName} = t1.${VotingTable.fieldResName}
            WHERE ${VotingTable.fieldUserPID} = $1
            ORDER BY t1.${VotingTable.fieldVoteNum} DESC
            LIMIT $2;
        `
        const result = await localPool.query(query, [userPID, maxItem]);
        return result.rows;
    }
}

module.exports = { RestaurantTable, VotingTable, UserTable };
