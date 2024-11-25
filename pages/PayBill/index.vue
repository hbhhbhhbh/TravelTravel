<template>
	<view class="main-container">

		<!-- 顶部选择框和添加按钮 -->
		<view class="select-container">
			<picker v-if="projects.length > 0" :value="selectedProjectIndex" :range="projectNames"
				@change="handleProjectChange">
				<view class="picker">
					当前项目：{{ projects[selectedProjectIndex]?.projectName || ' ss' }}

				</view>
			</picker>

			<button class="add-project-button" @click="addProject">新增项目</button>
			<button class="add-project-button" @click="editProject">编辑项目</button>
		</view>
		<view class="total-price">
			<view>
				总价：
			</view>
			<view>
				{{ totalPrice }}
			</view>
		</view>
		<!-- 列表 -->
		<view class="item-container">
			<GoodItem v-for="(item, idx) in currentItems" :key="item.id" :index="idx" :showData="item"
				@delete-item="handleDelete" @update-item="handleUpdate" @edit-per="editPer" />
		</view>

		<!-- 底部固定按钮 -->
		<view class="fixed-button-container">
			<view class="fixed-button" @click="handleSettle">结算</view>
			<view class="add-button" @click="handleAdd">记一笔</view>

		</view>


		<!-- 弹窗 -->
		<view v-if="showModalAddProject" class="modal-overlay">
			<view class="modal-content">
				<view class="modal-header">添加项目</view>
				<view class="modal-body">
					<input class="input" type="text" placeholder="请输入项目名称" v-model="newProjectName" />
				</view>
				<view class="modal-footer">
					<button class="btn" @click="addProjectToDB">确认</button>
					<button class="btn" @click="closeModal">取消</button>
				</view>
			</view>
		</view>
		<!-- 新增账单 -->
		<view v-if="showModalAddBill" class="modal-overlay">
			<view class="modal-content">
				<view class="modal-header">添加账目</view>
				<view class="modal-body">
					<input class="input" type="text" placeholder="请输入名称" v-model="newItemName" />
					<input class="input" type="text" placeholder="请输入数量" v-model="newItemCnt" />
					<input class="input" type="text" placeholder="请输入价格" v-model="newItemPrice" />
				</view>
				<view class="modal-footer">
					<button class="btn" @click="addBillsToDB">确认</button>
					<button class="btn" @click="closeModal">取消</button>
				</view>
			</view>
		</view>
		<!-- 编辑项目 -->
		<view v-if="showModaledit" class="modal-overlay">
			<view class="modal-content">
				<view class="modal-header">添加项目</view>
				<view class="modal-body">
					<input class="input" type="text" placeholder="请输入项目名称" v-model="updateProjectName" />
				</view>
				<view class="modal-footer">
					<button class="btn" style="width=20rpx;background-color: red;"
						@click="deleteProjectToDB">删除</button>
					<button class="btn" style="width=20rpx;" @click="updateProjectToDB">确认</button>
					<button class="btn" style="width=20rpx;" @click="closeModal">取消</button>
				</view>
			</view>
		</view>
		<!-- 编辑账单人员 -->
		<view v-if="showModaleditPer" class="modal-overlay">
			<view class="modal-content">
				<view class="modal-header">编辑人员</view>
				<!-- 人员列表 -->
				<uni-table ref="tableRef" border stripe emptyText="暂无更多数据" type="selection"
					@selection-change="selectionChange">
					<!-- 表头行 -->
					<uni-tr>
						<uni-th align="center">姓名</uni-th>
					</uni-tr>
					<!-- 表格数据行 -->
					<uni-tr v-for="(item, index) in this.AllPerson" :key="index">
						<uni-td>{{ item.name }}</uni-td>
					</uni-tr>
				</uni-table>
				<view class="modal-footer" style="margin-top:20rpx;">
					<button class="btn" style="width=30rpx;" @click="updateBillUserToDB">确认</button>
					<button class="btn" style="width=30rpx;" @click="closeModal">取消</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import GoodItem from '../../components/GoodItem/GoodItem.vue';
	import operateSqlite from '../../common/util/operateSqlite';
	import project from '@/common/util/project.js';
	import Bill from '@/common/util/Bill.js';
	import util from '@/common/util/operateSqlite.js';
	import BillUser from '@/common/util/BillUser.js';
	import {
		STORAGE_KEYS
	} from '@/utils/key.js';
	export default {
		components: {
			GoodItem
		},
		data() {
			return {
				projectItems: {
					"11": {

					},
				},
				projectNames: [],
				projects: [{
					projectName: "默认项目",
					id: 1
				}], // 项目名称
				selectedProjectIndex: 0, // 当前选中的项目索引
				nextId: 5, // 自动递增的 ID
				newProjectName: '',
				showModaleditPer: false,
				showModaledit: false,
				showModalAddProject: false,
				showModalAddBill: false,
				newItemName: '',
				newItemCnt: 1,
				newItemPrice: 0,
				updateProjectName: '',
				AllPerson: [],
				nowBillPerson: [],
				nowBillId: '',
			};
		},
		computed: {
			currentItems() {
				if (!this.projects.length) {
					console.warn("当前项目列表为空");
					return [];
				}
				const selectedProject = this.projects[this.selectedProjectIndex]?.projectName || "默认项目";
				console.log("当前project:" + selectedProject);
				console.log("看看账单：" + this.projectItems[selectedProject]);
				uni.setStorageSync(STORAGE_KEYS.CURRENTITEMS, this.projectItems[selectedProject] || []);
				return this.projectItems[selectedProject] || [];

			},

			totalPrice() {
				// 计算当前项目的总价，确保数据类型为数字
				return this.currentItems.reduce((sum, item) => {
					return sum + Number(item.price);
				}, 0);
			},
		},


		mounted() {
			this.reloadData();

		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {

			async reloadData() {
				try {
					console.log("重新加载数据...");
					await this.selectProjects(); // 加载项目列表
					await this.updateprojectBill(); // 加载账单数据
					await this.selectAllPer(); // 加载人员数据
					console.log("数据重新加载完成");
				} catch (error) {
					console.error("重新加载数据时出错：", error);
				}
			},
			//选中人员
			selectionChange(selectedRows) {
				console.log("选中的行", selectedRows);
				const selectedRow = selectedRows.detail.index || [];

				this.nowBillPerson = selectedRow; // 更新选中内容
			},

			setDefaultSelection() {
				const selectedUserIds = this.nowBillPerson.map(person => person.userid);
				console.log("selectedUserIds ", selectedUserIds);

				// 找到需要勾选的用户及其索引
				const matchedDetails = this.AllPerson
					.map((person, index) => ({
						person,
						index
					})) // 包装每个用户和索引
					.filter(({
						person
					}) => selectedUserIds.includes(person.id)); // 筛选需要勾选的用户

				console.log("matchedDetails ", matchedDetails);

				// 构造 detail 对象

				const index = matchedDetails.map(({
					index
				}) => index);

				console.log("detail ", index);
				//传入下标数组就行了
				this.$refs.tableRef.toggleRowSelection(index, true); // 通过表格的 ref 设置勾选

			},
			//编辑账单人员
			async selectAllPer() {
				const result = await util.selectInformationType("user");
				console.log("找出的AllPerson", result);
				this.AllPerson = result;
				uni.setStorageSync(STORAGE_KEYS.AllPerson, result);
			},
			editPer(index) {
				this.showModaleditPer = true;
				this.selectAllPer().then(() => this.selectBillUser(index).then(() => this.setDefaultSelection()));
			},
			async selectBillUser(index) {
				console.log(this.currentItems[index]);
				const result = await BillUser.selectInformationType("BillUser", "Billid", this.currentItems[index].id);
				console.log("当前账单: " + this.currentItems[index] + "result: ", result);
				this.nowBillId = this.currentItems[index].id;
				this.nowBillPerson = result;
				console.log("nowBillPerson: ", result);

			},
			updateBillUserToDB() {
				console.log(this.nowBillPerson);

				// 从 nowBillPerson 获取用户 id 数组
				const result = this.nowBillPerson.map(index => this.AllPerson[index].id);
				console.log("选中的用户id:", result);
				console.log("当前账单Id:", this.nowBillId);

				// 将用户 id 与账单 id 合成对象数组
				const result1 = result.map(userId => {
					return {
						userid: userId, // 用户 id
						billid: this.nowBillId, // 当前账单 id
					};
				});
				BillUser.deleteInformationType("BillUser", "Billid", this.nowBillId);
				console.log("选中的用户与账单合成对象:", result1);
				result1.forEach(obj => {
					BillUser.addUser(obj);
				});
				this.closeModal();
			},
			// 处理项目
			async selectProjects() {
				const result = await project.selectInformationType("project");
				if (result.length > 0)
					this.projects = result;
				console.log("SELECTPROJECTS: ", this.projects);
				this.projectNames = this.projects.map(
					project => `${project.id}: ${project.projectName}`
				);
				this.selectedProjectIndex = 0;
				console.log(this.projects);
			},
			handleProjectChange(e) {
				console.log('e' + e);
				this.selectedProjectIndex = parseInt(e.detail.value, 10);
				uni.setStorageSync(STORAGE_KEYS.nowproject, this.projects[this.selectedProjectIndex]);
				console.log("测试本地缓存", uni.getStorageSync(STORAGE_KEYS.nowproject));
				console.log('切换到项目:', this.projects[this.selectedProjectIndex].projectName);
				this.updateprojectBill();
			},
			//更新Item
			handleDelete(index) {
				const selectedProject = this.projects[this.selectedProjectIndex].id;
				console.log(this.currentItems[index]);
				// this.projectItems[selectedProject].splice(index, 1);
				Bill.deleteInformationType("Bill", "id", this.currentItems[index].id).then(() => this
					.updateprojectBill());
				BillUser.deleteInformationType("BillUser", "Billid", this.currentItems[index].id);
			},
			handleUpdate(index, updatedItem) {
				console.log('更新索引：', index, '更新数据：', updatedItem);

				// 获取当前选中的项目
				const selectedProject = this.projects[this.selectedProjectIndex].projectName;

				// 更新对应项目的 item
				// this.$set(this.projectItems[selectedProject], index, updatedItem);
				Bill.modifyInformation(updatedItem).then(() => this.updateprojectBill());
				// 保存更新后的数据到本地存储

			},
			//新增project内的items

			handleAdd() {
				this.showModalAddBill = true;
			},
			addBillsToDB() {

				const selectedProjectId = this.projects[this.selectedProjectIndex].id;
				const newItem = {
					billid: this.nextId++,
					projectId: selectedProjectId,
					name: this.newItemName,
					cnt: this.newItemCnt,
					price: this.newItemPrice,
				};
				this.addprojectBill(newItem);
			},
			addprojectBill(newItem) {

				Bill.addBill(newItem);
				this.updateprojectBill();
				this.closeModal();
			},
			//更新项目账单
			async updateprojectBill() {
				console.log("当前index: " + this.selectedProjectIndex);
				const selectedProjectId = this.projects[this.selectedProjectIndex].id;
				const selectedProject = this.projects[this.selectedProjectIndex].projectName;
				console.log("当前projects:", this.projects);
				const result = await Bill.selectInformationType("Bill", "projectId", selectedProjectId);
				console.log('更新项目账单： ', result);
				this.projectItems[selectedProject] = result;

			},
			//新增project

			addProject() {
				this.showModalAddProject = true;
			},
			addProjectToDB() {
				const obj = {
					id: 1,
					name: this.newProjectName,
				};
				project.addUser(obj);
				this.selectProjects();
				console.log('添加新项目:', this.newProjectName);
				this.closeModal();
			},
			closeModal() {
				// 关闭模态框
				this.showModalAddBill = false;
				this.showModaledit = false;
				this.newItemCnt = 1;
				this.newItemPrice = 0;
				this.newItemName = '';
				this.showModalAddProject = false;
				this.newProjectName = ""; // 清空输入框
				this.showModaleditPer = false;
			},

			//结算页面，开始生成账单
			handleSettle() {
				uni.setStorageSync(STORAGE_KEYS.nowproject, this.projects[this.selectedProjectIndex]);
				console.log('当前项目的结算数据:', this.currentItems);
				console.log("存入的project ", uni.getStorageSync(STORAGE_KEYS.nowproject));
				uni.navigateTo({
					url: "/pages/settleBill/settleBill"
				})
			},



			//编辑项目：生成弹窗，里面可以编辑也可以删除
			editProject() {
				this.showModaledit = true;
			},
			//更新项目
			updateProjectToDB() {
				const selectedProjectId = this.projects[this.selectedProjectIndex].id;
				const selectedProject = this.projects[this.selectedProjectIndex].projectName;
				project.modifyInformation("project", "projectName", this.updateProjectName, "id", selectedProjectId);
				this.selectProjects().then(() => this.updateprojectBill());
				this.closeModal();
			},
			//删除项目
			deleteProjectToDB() {
				const selectedProjectId = this.projects[this.selectedProjectIndex].id;
				const selectedProject = this.projects[this.selectedProjectIndex].projectName;
				project.deleteInformationType("project", "id", selectedProjectId);
				this.currentItems.forEach(obj => {
					BillUser.deleteInformationType("BillUser", "Billid", obj.id);
				})
				Bill.deleteInformationType("Bill", "projectId", selectedProjectId);
				this.selectProjects().then(() => this.updateprojectBill());
				this.closeModal();
			}
		},
	};
</script>

<style scoped>
	@import "@/pages/PayBill/box.css";
	@import "@/pages/PayBill/inputbox.css";

	.total-price {
		height: 60rpx;
		background-color: white;
		z-index: 1000;
		position: fixed;
		top: 80rpx;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		height: 60rpx;
	}

	.main-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}



	.picker {
		width: 350rpx;
		flex: 1;
		font-size: 28rpx;
		text-align: center;
		color: #333;
		padding: 10rpx 20rpx;
		background-color: #ffffff;
		border-radius: 5rpx;
		box-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.1);
	}

	.add-project-button {
		margin-right: 10rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
		background-color: #007aff;
		color: white;
		border-radius: 5rpx;
		text-align: center;
		line-height: 60rpx;
		height: 60rpx;
		box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
	}


	.fixed-button-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #ffffff;
		display: flex;
		justify-content: space-between;
		box-shadow: 0 -4rpx 8rpx rgba(0, 0, 0, 0.1);
	}
</style>