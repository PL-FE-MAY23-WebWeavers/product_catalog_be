'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('phones', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            category: {
                allowNull: false,
                type: Sequelize.STRING
            },
            phoneId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            itemId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            fullPrice: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            price: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            screen: {
                allowNull: false,
                type: Sequelize.STRING
            },
            capacity: {
                allowNull: false,
                type: Sequelize.STRING
            },
            color: {
                allowNull: false,
                type: Sequelize.STRING
            },
            ram: {
                allowNull: false,
                type: Sequelize.STRING
            },
            year: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            image: {
                allowNull: false,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('phones');
    }
};
