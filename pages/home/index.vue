<template>
	<view class="container">
		<!-- 列表 -->
		<up-search style="background-color: white;" placeholder="输入搜索名字" v-model="keyword" :clearabled="true"
			:show-action="true" actionText="搜索" @search="handleSearch" @custom="handleSearch">

		</up-search>

		<up-list @scrolltolower=" scrolltolower">
			<up-list-item v-for="(item, index) in indexList" :key="index" class="items">
				<up-cell :title-style="`color:white`" :title=item.name>

				</up-cell>
				<image src="../../static/GoodItem/deleteWhite.png"
					style="margin-top: 13rpx; height: 30rpx;width:30rpx ;margin-right: 35rpx;"
					@click="showDeleteModal(index)">
				</image>
			</up-list-item>
		</up-list>

		<!-- 蓝色添加按钮 -->
		<button class="add-button" @click="showAddModal">+</button>
		<view v-if="showModal" class="modal-overlay">
			<view class="modal-content">
				<view class="modal-header" style="color:#014520;">添加用户</view>
				<view class="modal-body">
					<input class="input" type="text" placeholder="请输入用户名称" v-model="newUserName" />
				</view>
				<view class="modal-footer">
					<button class="btn" @click="addUserToDB">确认</button>
					<button class="btn" @click="closeModal">取消</button>
				</view>
			</view>
		</view>
		<!-- 提示是否删除user -->
		<view v-if="showModaldelete" class="modal-overlay">
			<view class="modal-content">
				<view class="modal-header">确认删除{{nowDeleteUser}}？</view>
				<view class="modal-footer">
					<button class="btn" @click="deleteUser(nowDeleteUser)">确认</button>
					<button class="btn" @click="closeDeleteModal">取消</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ref
	} from 'vue';
	import util from "@/common/util/operateSqlite.js";
	import utils from '@/common/util/init.js';

	const keyword = ref('');
	export default {

		data() {
			return {
				keyword,
				indexList: [],
				showModal: false, // 控制模态框显示
				newUserName: "", // 新用户名称
				showModaldelete: false, //控制删除确认弹窗
				nowDeleteUser: ""
			}
		},

		methods: {
			async deleteUser(name) {
				this.closeDeleteModal();
				console.log("要删除的名字" + name);
				try {
					// 调用 selectInformationType，传入表名和查询条件
					const result = await util.deleteUser(name);
					console.log("用户" + name + "删除成功：");
					this.handleSearch();
				} catch (error) {
					console.error("加载用户失败：", error);
					uni.showToast({
						title: "加载用户失败",
						icon: "none",
					});
				}
			},
			closeDeleteModal() {
				// 关闭模态框
				this.showModaldelete = false;
				this.nowDeleteUser = ""; // 清空输入框
			},
			showDeleteModal(index) {
				// 显示添加用户模态框
				this.showModaldelete = true;
				this.nowDeleteUser = this.indexList[index].name;
			},
			handleSearch() {

				this.performSearch(this.keyword);
			},
			async performSearch(keyword) {
				try {
					var result;
					// 调用 selectInformationType，传入表名和查询条件
					if (keyword == "") {
						this.loadUsers();
						return;
					} else {
						console.log("按条件搜索： " +
							keyword);
						result = await util.selectInformationType("user", "name", '"' + keyword + '%"');
						console.log("result: ", result);
					}
					console.log("用户列表加载成功：", result);
					this.indexList = result; // 将查询结果赋值给 items，用于更新页面
				} catch (error) {
					console.error("加载用户失败：", error);
					uni.showToast({
						title: "加载用户失败",
						icon: "none",
					});
				}
			},
			async loadUsers() {
				try {
					// 调用 selectInformationType，传入表名和查询条件
					const result = await util.selectInformationType("user");
					console.log("用户列表加载成功：", result);
					this.indexList = result; // 将查询结果赋值给 items，用于更新页面
					uni.setStorageSync("AllPerson", result);
				} catch (error) {
					console.error("加载用户失败：", error);
					uni.showToast({
						title: "加载用户失败",
						icon: "none",
					});
				}
			},
			showAddModal() {
				// 显示添加用户模态框
				this.showModal = true;
			},
			closeModal() {
				// 关闭模态框
				this.showModal = false;
				this.newUserName = ""; // 清空输入框
			},
			scrolltolower() {
				this.loadmore()
			},
			loadmore() {
				for (let i = 0; i < 30; i++) {
					this.indexList.push({
						url: this.urls[uni.$u.random(0, this.urls.length - 1)]
					})
				}
			},
			async addUserToDB() {
				if (!this.newUserName.trim()) {
					uni.showToast({
						title: "名称不能为空",
						icon: "none"
					});
					return;
				}
				const obj = {
					id: 1,
					name: this.newUserName,
				};
				try {
					await util.addUser(obj); // 插入新用户
					uni.showToast({
						title: "用户添加成功",
						icon: "success"
					});
					this.closeModal(); // 关闭模态框
					this.loadUsers();
				} catch (error) {
					console.error("添加用户失败：", error);
					uni.showToast({
						title: "用户添加失败",
						icon: "none"
					});
				}
			}
		},
		mounted() {
			utils.initializeDB();
			this.loadUsers();
		}
	}
</script>


<style scoped>
	@import "@/css/inputbox.css";

	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;

		/* 占满整个屏幕 */
		background-color: #ACBDAA;

	}



	.list-container {
		flex: 1;
		/* 占满剩余空间 */
		padding: 10px;
		overflow-y: auto;
		/* 垂直滚动 */
	}

	.list-item {
		height: 50rpx;
		border-color: black;
		background-color: white;

		font-size: 14px;
	}

	.add-button {
		position: fixed;
		/* 固定位置 */
		bottom: 40px;
		/* 距离底部 20px */
		right: 20px;
		/* 距离右侧 20px */
		width: 60px;
		height: 60px;
		background-color: #687267;
		border: none;
		border-radius: 50%;
		color: white;
		font-size: 28px;
		text-align: center;
		line-height: 60px;
		/* 垂直居中 */
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
		cursor: pointer;
		z-index: 1000;
		/* 保证位于其他内容上方 */
	}

	.add-button:active {
		background-color: #005bb5;
		/* 点击时变暗 */
	}

	.items {
		border-radius: 10rpx;
		margin-left: 30rpx;
		width: 90%;

		background-color: #788377;
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
	}
</style>