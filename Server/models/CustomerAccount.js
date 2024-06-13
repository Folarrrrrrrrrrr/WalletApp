// const { DataTypes, STRING } = require("sequelize");
// const { sequelize, transactions } = require(".");
// const { model } = require("mongoose");
// const accountType = require('./accountType')

module.exports = (sequelize, DataTypes)=>{
        const customerAccount = sequelize.define('customerAccount', {
                // id:{
                //         type: DataTypes.NUMBER,
                //         allowNull:false,
                //         primaryKey: true
                // },
                customerName:{ type: DataTypes.STRING},
               // accountTypeID:{ type: DataTypes.ENUM},
               // tierTypeID:{ type: DataTypes.ENUM},
                bvn:{ type: DataTypes.SMALLINT},
                balance:{ type: DataTypes.DOUBLE},
                isDormant:{ 
                        type: DataTypes.BOOLEAN, 
                        default: false
                },
                isActive:{ 
                        type: DataTypes.BOOLEAN,
                       default : false,
                }
                // transactions:{ type: DataTypes.STRING}
        })
        // , {});
        // customerAccount.associate = function (models){ 
        //         //relationships are defined here       
        // customerAccount.belongsTo(models.accountType);
        // customerAccount.belongsTo(models.tierType);
        // customerAccount.hasMAny(sequelize.define('transactions'))
        // }
        return customerAccount;
}