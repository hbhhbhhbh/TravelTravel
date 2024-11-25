<template>
	<view class="">
		<!-- <div>{{odb}}</div> -->
		<div>

		</div>
	</view>
</template>

<script>
	import BillUser from '../../common/util/BillUser';
	import util from '@/common/util/operateSqlite.js';
	import project from '@/common/util/project.js';
	export default {
		data() {
			return {
				// odb:'',

				dbName: 'travel',
				dbPath: '_doc/travel.db',
				dbTable: 'user',
				dbIsOpen: false,
				chatText: {
					id: 1,
					fromId: '123',
					toId: '321',
					content: '你好!',
					flag: 1
				},
				project1: {
					id: 1,
					name: "南京",
				}

			}
		},
		mounted() {


			// 调用
			this.initializeDB();


		},
		onLoad() {
			// console.log('Sqlite:',Sqlite)
			// this.open();
		},
		methods: {
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
				}
			},
			clearBillUser() {
				BillUser.clear("BillUser").then((result) => {
						uni.showToast({
							title: '数据库清除成功',
							icon: 'success',
							duration: 2000
						});
						console.log('数据库清除成功：', result); // 可选，保留日志
					})
					.catch((error) => {
						uni.showToast({
							title: '数据库清除失败',
							icon: 'error',
							duration: 2000
						});
						console.error('数据库清除失败：', error); // 可选，保留日志
					});
			},
			dropTable() {
				util.dropTable().then((result) => {
						uni.showToast({
							title: '数据库删除成功',
							icon: 'success',
							duration: 2000
						});
						console.log('表格删除成功：', result); // 可选，保留日志
					})
					.catch((error) => {
						uni.showToast({
							title: '数据库删除失败',
							icon: 'error',
							duration: 2000
						});
						console.error('表格删除失败：', error); // 可选，保留日志
					});
			},
			isopenDB() {
				util.openSqlite().then((result) => {
						// uni.showToast({
						// 	title: '数据库打开成功',
						// 	icon: 'success',
						// 	duration: 2000
						// });
						console.log('表格创建成功：', result); // 可选，保留日志
					})
					.catch((error) => {
						// uni.showToast({
						// 	title: '数据库打开失败',
						// 	icon: 'error',
						// 	duration: 2000
						// });
						console.error('表格创建失败：', error); // 可选，保留日志
					});
			},
			createBillTable() {
				// uni.showToast({
				// 	title: '测试',
				// 	icon: 'success',
				// 	duration: 2000
				// });
				util.CreateBillSQL()
					.then((result) => {
						// uni.showToast({
						// 	title: '表格创建成功',
						// 	icon: 'success',
						// 	duration: 2000
						// });
						console.log('表格创建成功：', result); // 可选，保留日志
					})
					.catch((error) => {
						uni.showToast({
							title: '表格创建失败',
							icon: 'error',
							duration: 2000
						});
						console.error('表格创建失败：', error); // 可选，保留日志
					});
			},
			createBillUserTable() {
				// uni.showToast({
				// 	title: '测试',
				// 	icon: 'success',
				// 	duration: 2000
				// });
				util.CreateBillUserSQL()
					.then((result) => {
						// uni.showToast({
						// 	title: 'BillUser表格创建成功',
						// 	icon: 'success',
						// 	duration: 2000
						// });
						console.log('表格创建成功：', result); // 可选，保留日志
					})
					.catch((error) => {
						uni.showToast({
							title: '表格创建失败',
							icon: 'error',
							duration: 2000
						});
						console.error('表格创建失败：', error); // 可选，保留日志
					});
			},
			createUserTable() {
				// uni.showToast({
				// 	title: '测试',
				// 	icon: 'success',
				// 	duration: 2000
				// });
				util.CreateUserSQL()
					.then((result) => {
						// uni.showToast({
						// 	title: 'BillUser表格创建成功',
						// 	icon: 'success',
						// 	duration: 2000
						// });
						console.log('表格创建成功：', result); // 可选，保留日志
					})
					.catch((error) => {
						uni.showToast({
							title: '表格创建失败',
							icon: 'error',
							duration: 2000
						});
						console.error('表格创建失败：', error); // 可选，保留日志
					});
			},
			createProjectTable() {
				// uni.showToast({
				// 	title: '测试',
				// 	icon: 'success',
				// 	duration: 2000
				// });
				util.CreateProjectSQL()
					.then((result) => {
						// uni.showToast({
						// 	title: 'Project表格创建成功',
						// 	icon: 'success',
						// 	duration: 2000
						// });
						console.log('Project表格成功：', result); // 可选，保留日志
					})
					.catch((error) => {
						uni.showToast({
							title: 'Project表格失败',
							icon: 'error',
							duration: 2000
						});
						console.error('Project表格失败：', error); // 可选，保留日志
					});
			},

			updateTable() {
				util.updateTableStructure("Bill", "project", "INTEGER");
			},
			deleteTable() {
				uni.showToast({
					title: '测试',
					icon: 'success',
					duration: 2000
				});
				util.deleteTable("Bill")
					.then((result) => {
						uni.showToast({
							title: 'Bill表格删除成功',
							icon: 'success',
							duration: 2000
						});
						console.log('表格创建成功：', result); // 可选，保留日志
					})
					.catch((error) => {
						uni.showToast({
							title: '表格创建失败',
							icon: 'error',
							duration: 2000
						});
						console.error('表格创建失败：', error); // 可选，保留日志
					});
			},
			addproject(id, name) {
				const obj = this.project1;
				project.addUser(obj).then((result) => {
						uni.showToast({
							title: 'Project插入成功',
							icon: 'success',
							duration: 2000
						});
						console.log('Project插入成功：', result); // 可选，保留日志
					})
					.catch((error) => {
						uni.showToast({
							title: 'Project插入失败',
							icon: 'error',
							duration: 2000
						});
						console.error('Project插入失败：', error); // 可选，保留日志
					});
			},
			selectproject() {
				project.selectInformationType("project").then((result) => {
						uni.showToast({
							title: 'Project查询成功',
							icon: 'success',
							duration: 2000
						});
						console.log('Project查询成功：', result); // 可选，保留日志
					})
					.catch((error) => {
						uni.showToast({
							title: 'Project查询失败',
							icon: 'error',
							duration: 2000
						});
						console.error('Project查询失败：', error); // 可选，保留日志
					});
			},
			deleteproject() {
				project.deleteInformationType("project").then((result) => {
						uni.showToast({
							title: 'Project删除成功',
							icon: 'success',
							duration: 2000
						});
						console.log('Project删除成功：', result); // 可选，保留日志
					})
					.catch((error) => {
						uni.showToast({
							title: 'Project删除失败',
							icon: 'error',
							duration: 2000
						});
						console.error('Project查询失败：', error); // 可选，保留日志
					});
			}

		}
	}
</script>

<style>
</style>