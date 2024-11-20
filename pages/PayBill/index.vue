<template>
	<view class="main-container">

		<!-- 顶部选择框 -->
		<view class="select-container" @click="toggleSelectModal">
			<text>{{ selectedProject || '请选择记账项目' }}</text>
		</view>
		<!-- 列表 -->
		<GoodItem class="item"></GoodItem>
		<GoodItem class="item"></GoodItem>
		<GoodItem class="item"></GoodItem>
		<GoodItem class="item"></GoodItem>
		<GoodItem class="item"></GoodItem>
		<GoodItem class="item"></GoodItem>
		<GoodItem class="item"></GoodItem>
		<GoodItem class="item"></GoodItem>
		<GoodItem class="item"></GoodItem>
		<!-- 底部固定按钮 -->

		<view class="fixed-button" @click="handleSettle">
			结算
		</view>


		<!-- 弹窗选择 -->
		<view v-if="showSelectModal" class="modal-overlay">
			<view class="modal-content">
				<text class="modal-title">选择记账项目</text>
				<view class="modal-item" v-for="(project, idx) in projects" :key="idx" @click="selectProject(project)">
					{{ project }}
				</view>
				<button class="close-button" @click="toggleSelectModal">关闭</button>
			</view>
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
				// 当前选中的项目
				selectedProject: '',
				// 是否显示选择弹窗
				showSelectModal: false,
				// 记账项目列表
				projects: ['项目A', '项目B', '项目C'],
				// 所有项目的 item 数据
				allItems: {
					'项目A': [{
							name: '商品1',
							cnt: 10,
							price: 100
						},
						{
							name: '商品2',
							cnt: 5,
							price: 50
						},
					],
					'项目B': [{
							name: '商品3',
							cnt: 15,
							price: 150
						},
						{
							name: '商品4',
							cnt: 20,
							price: 200
						},
					],
					'项目C': [{
							name: '商品5',
							cnt: 30,
							price: 300
						},
						{
							name: '商品6',
							cnt: 40,
							price: 400
						},
					],
				},
			};
		},
		computed: {
			// 根据选中的项目筛选显示的 item 数据
			filteredItems() {
				return this.selectedProject ? this.allItems[this.selectedProject] : [];
			},
		},
		methods: {
			handleSettle() {
				console.log('结算功能触发！');
				// 添加结算逻辑
			},
			// 切换弹窗显示状态
			toggleSelectModal() {
				this.showSelectModal = !this.showSelectModal;
			},
			// 选择记账项目
			selectProject(project) {
				this.selectedProject = project;
				this.toggleSelectModal(); // 关闭弹窗
			},
		},
	};
</script>

<style>
	@import "@/pages/PayBill/box.css";

	.main-container {
		display: flex;
		flex-direction: column;
		/* 设置为纵向排列 */
		align-items: center;
		/* 水平方向居中 */
		justify-content: center;
		/* 垂直方向居中 */

	}
</style>