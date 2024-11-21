<template>
	<view class="">
		<!-- <div>{{odb}}</div> -->
		<div>
			<button type="default" @click="createBillTable">新建Bill库</button>
			<button type="default" @click="isopenDB">判断数据库是否打开</button>
			<button type="default" @click="createBillUserTable">新建BillUser库</button>
			<button type="default" @click="createUserTable">新建User库</button>
		</div>
	</view>
</template>

<script>
	import util from '@/common/util/operateSqlite.js';
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

			}
		},
		onLoad() {
			// console.log('Sqlite:',Sqlite)
			// this.open();
		},
		methods: {

			isopenDB() {
				util.openSqlite().then((result) => {
						uni.showToast({
							title: '数据库打开成功',
							icon: 'success',
							duration: 2000
						});
						console.log('表格创建成功：', result); // 可选，保留日志
					})
					.catch((error) => {
						uni.showToast({
							title: '数据库打开失败',
							icon: 'error',
							duration: 2000
						});
						console.error('表格创建失败：', error); // 可选，保留日志
					});
			},
			createBillTable() {
				uni.showToast({
					title: '测试',
					icon: 'success',
					duration: 2000
				});
				util.CreateBillSQL()
					.then((result) => {
						uni.showToast({
							title: '表格创建成功',
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
			createBillUserTable() {
				uni.showToast({
					title: '测试',
					icon: 'success',
					duration: 2000
				});
				util.CreateBillUserSQL()
					.then((result) => {
						uni.showToast({
							title: 'BillUser表格创建成功',
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
			createUserTable() {
				uni.showToast({
					title: '测试',
					icon: 'success',
					duration: 2000
				});
				util.CreateUserSQL()
					.then((result) => {
						uni.showToast({
							title: 'BillUser表格创建成功',
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
			}
		}
	}
</script>

<style>
</style>