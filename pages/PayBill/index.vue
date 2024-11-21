<template>
	<view class="main-container">

		<!-- 顶部选择框和添加按钮 -->
		<view class="select-container">
			<picker :value="selectedProjectIndex" :range="projects" @change="handleProjectChange">
				<view class="picker">
					当前项目：{{ projects[selectedProjectIndex] }}
				</view>
			</picker>
			<button class="add-project-button" @click="addProject">添加项目</button>
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
				@delete-item="handleDelete" @update-item="handleUpdate" />
		</view>

		<!-- 底部固定按钮 -->
		<view class="fixed-button-container">
			<view class="add-button" @click="handleAdd">添加</view>
			<view class="fixed-button" @click="handleSettle">结算</view>
		</view>
	</view>
</template>

<script>
	import GoodItem from '../../components/GoodItem/GoodItem.vue';

	export default {
		components: {
			GoodItem
		},
		data() {
			return {
				projectItems: {
					'项目A': [{
							id: 1,
							name: '商品1',
							cnt: 10,
							price: 100
						},
						{
							id: 2,
							name: '商品2',
							cnt: 5,
							price: 50
						},
					],
					'项目B': [{
							id: 3,
							name: '商品3',
							cnt: 8,
							price: 80
						},
						{
							id: 4,
							name: '商品4',
							cnt: 12,
							price: 120
						},
					],
					'项目C': [],
				},
				projects: ['项目A', '项目B', '项目C'], // 项目名称
				selectedProjectIndex: 0, // 当前选中的项目索引
				nextId: 5, // 自动递增的 ID
			};
		},
		computed: {
			currentItems() {
				const selectedProject = this.projects[this.selectedProjectIndex];
				return this.projectItems[selectedProject] || [];
			},
			totalPrice() {
				// 计算当前项目的总价，确保数据类型为数字
				return this.currentItems.reduce((sum, item) => {
					return sum + Number(item.price);
				}, 0);
			},
		},
		methods: {
			handleProjectChange(e) {
				this.selectedProjectIndex = parseInt(e.detail.value, 10);
				console.log('切换到项目:', this.projects[this.selectedProjectIndex]);
			},
			handleDelete(index) {
				const selectedProject = this.projects[this.selectedProjectIndex];
				this.projectItems[selectedProject].splice(index, 1);
			},
			handleUpdate(index, updatedItem) {
				console.log('更新索引：', index, '更新数据：', updatedItem);

				// 获取当前选中的项目
				const selectedProject = this.projects[this.selectedProjectIndex];

				// 更新对应项目的 item
				this.$set(this.projectItems[selectedProject], index, updatedItem);

				// 保存更新后的数据到本地存储

			},

			handleAdd() {
				const selectedProject = this.projects[this.selectedProjectIndex];
				const newItem = {
					id: this.nextId++,
					name: `新商品${this.nextId - 1}`,
					cnt: 1,
					price: 0,
				};
				this.projectItems[selectedProject].unshift(newItem);
			},
			addProject() {
				const newProjectName = `项目${String.fromCharCode(65 + this.projects.length)}`;
				this.projects.push(newProjectName);
				this.projectItems[newProjectName] = [];
				console.log('添加新项目:', newProjectName);
			},
			handleSettle() {
				console.log('当前项目的结算数据:', this.currentItems);
			},
		},
	};
</script>

<style scoped>
	@import "@/pages/PayBill/box.css";

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
		width: 500rpx;
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
		margin-right: 50rpx;
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