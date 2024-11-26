import util from '@/common/util/operateSqlite.js';
const utils = {
	async initializeDB() {
		try {
			await this.isopenDB();
			await this.createBillTable();
			await this.createBillUserTable();
			await this.createProjectTable();
			await this.createUserTable();
			console.log("数据库初始化成功");
		} catch (error) {
			console.error("数据库初始化失败：", error);
			throw error; // 如果需要，向上抛出错误
		}
	},

	async isopenDB() {
		return util.openSqlite()
			.then((result) => {
				console.log('数据库打开成功：', result);
				return result;
			})
			.catch((error) => {
				console.error('数据库打开失败：', error);
				throw error;
			});
	},

	async createBillTable() {
		return util.CreateBillSQL()
			.then((result) => {
				console.log('Bill表创建成功：', result);
				return result;
			})
			.catch((error) => {
				console.error('Bill表创建失败：', error);
				throw error;
			});
	},

	async createBillUserTable() {
		return util.CreateBillUserSQL()
			.then((result) => {
				console.log('BillUser表创建成功：', result);
				return result;
			})
			.catch((error) => {
				console.error('BillUser表创建失败：', error);
				throw error;
			});
	},

	async createUserTable() {
		return util.CreateUserSQL()
			.then((result) => {
				console.log('User表创建成功：', result);
				return result;
			})
			.catch((error) => {
				console.error('User表创建失败：', error);
				throw error;
			});
	},

	async createProjectTable() {
		return util.CreateProjectSQL()
			.then((result) => {
				console.log('Project表创建成功：', result);
				return result;
			})
			.catch((error) => {
				console.error('Project表创建失败：', error);
				throw error;
			});
	}
};

export default utils;