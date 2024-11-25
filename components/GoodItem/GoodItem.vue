<template>
	<!-- 卡片 -->
	<view class="Item-container" :style="{ height: contentHeight }">
		<view class=" card">
			<view class="top-bar">
				<view style="font-size: 25rpx; width: 200rpx">名称</view>
				<view style="font-size: 25rpx; width: 200rpx">数量</view>
				<view style="font-size: 25rpx; width: 200rpx">价格</view>
				<image @click="toggleModal" src="../../static/GoodItem/edit.png" class="set-info"></image>
			</view>
			<view class="top-bar bot-bar">
				<view class="input-item name" style="font-size: 25rpx; width: 200rpx">{{ showData.name }}</view>
				<view class="input-item cnt" style="font-size: 25rpx; width: 200rpx">{{ showData.cnt }}</view>
				<view class="input-item price" style="font-size: 25rpx; width: 200rpx">{{ showData.price }}</view>
				<image @click="deleteSelf" src="../../static/GoodItem/delete.png" class="set-info"></image>
			</view>

			<uni-collapse>
				<uni-collapse-item class="showPer" title="查看人员" @click="toggleCollapse">
					<view class="content">
						<view v-if="loading">加载中...</view>
						<view v-else-if="Persons.length === 0">暂无人员</view>
						<view v-for="(person, index) in Persons" :key="index" class="list-item">
							{{ person.name }}
						</view>
					</view>

				</uni-collapse-item>
			</uni-collapse>

		</view>
	</view>

	<!-- 弹窗编辑部分 -->
	<view v-if="showModal" class="modal">
		<view class="modal-content">
			<view class="modal-header">
				<text>填写内容</text>
				<view class="close-button" @click="toggleModal">×</view>
			</view>

			<!-- 表单内容 -->
			<form @submit.prevent="submitForm">
				<view class="form-group">
					<text>名称：</text>
					<input type="text" v-model="formData.name" placeholder="请输入名称" />
				</view>
				<view class="form-group">
					<text>数量：</text>
					<input type="number" v-model="formData.cnt" placeholder="请输入数量" />
				</view>
				<view class="form-group">
					<text>价格：</text>
					<input type="number" v-model="formData.price" placeholder="请输入价格" />
				</view>
				<button type="button" @click="submitForm" class="submit-button">提交</button>
				<button type="button" @click="editPer" class="submit-button" style="margin-top:20rpx;">增加人员</button>
			</form>
		</view>
	</view>
</template>

<script>
	import BillUser from '@/common/util/BillUser.js';
	import Util from '@/common/util/operateSqlite.js';
	import {
		STORAGE_KEYS
	} from '../../utils/key';
	export default {
		name: 'GoodItem',
		props: {
			index: {
				type: Number, // 父组件传入的索引，用于标识具体的卡片
				required: true
			},
			showData: {
				type: Object,
				required: true, // 从父组件接收数据
			},
		},
		inheritAttrs: false,
		data() {
			return {
				isExpanded: false,
				loading: true,
				Persons: [],
				update: false,
				value: ['0'],
				showModal: false, // 控制弹窗显示
				contentHeight: 'auto', // 动态内容高度
				formData: {
					...this.showData,
				}
			};
		},
		mounted() {
			this.selectBillUser();
		},
		methods: {
			showPer() {
				console.log("跳转");
				uni.navigateTo({
					url: "/pages/showPer/showPer"
				})
			},
			toggleModal() {
				// 切换弹窗显示状态
				this.showModal = !this.showModal;
			},
			submitForm() {
				// 提交表单逻辑
				console.log('提交的表单数据:', this.formData);

				// 可以在这里发送表单数据到后台
				// axios.post('/api/submit', this.formData).then(...);
				this.$emit('update-item', this.index, {
					...this.formData
				});
				this.update = true;
				// 隐藏弹窗
				this.toggleModal();


			},
			async toggleCollapse(isExpanded) {

				this.update = false;
				this.isExpanded = !this.isExpanded;
				if (this.isExpanded) {
					// 展开时加载数据

					await this.selectBillUser();
					const query = uni.createSelectorQuery().in(this);

					const query1 = uni.createSelectorQuery().in(this);
					query1
						.select(".Item-container")
						.boundingClientRect((itemData) => {
							if (!itemData) return;
							// 转换为 rpx 并设置高度
							console.log("Item-container: " + itemData.height);

							this.contentHeight =
								`${this.pxToRpx(this.Persons.length*15 + itemData.height + 20)}rpx`;
							console.log("调整后的高度:", this.contentHeight);


						})
						.exec();



				} else {
					// 收起时重置高度
					this.contentHeight = "auto";
				}
			},
			pxToRpx(px) {
				const screenWidth = uni.getSystemInfoSync().screenWidth;
				return (750 / screenWidth) * px;
			},
			async selectBillUser() {
				this.loading = true;
				const currentItems = uni.getStorageSync(STORAGE_KEYS.CURRENTITEMS);
				console.log("GOODITEM-SELECTBILLUSER-START");
				console.log(currentItems[this.index]);

				// 查询 BillUser 表的数据
				const result = await BillUser.selectInformationType("BillUser", "Billid", currentItems[this
					.index].id);
				console.log("nowBillPerson: ", result);

				this.Persons = []; // 初始化存储结果的数组

				// 使用 for...of 循环处理异步操作
				for (const obj of result) {
					try {
						// 查询 user 表中的记录
						const result1 = await Util.selectInformationType(
							'user', // 表名
							'id', // 查询字段
							`'${obj.userid}'` // 查询值，注意加上单引号
						);

						console.log("result: ", result1);

						// 将查询结果添加到数组中
						this.Persons.push(...result1); // 展开 result 数组并添加
					} catch (error) {
						console.error("查询用户失败:", error);
					} finally {
						this.loading = false;
					}
				}
				this.loading = false;

				console.log("Persons: ", this.Persons);
				console.log("loading ", this.loading);
				console.log("GOODITEM-SELECTBILLUSER-END");

			},
			editPer() {
				console.log("触发增加人员");
				this.$emit('edit-per', this.index);
			},
			deleteSelf() {
				console.log(this.index)
				// 触发自定义事件，通知父组件删除此卡片
				this.$emit('delete-item', this.index);
			}
		}
	};
</script>

<style scoped>
	@import '@/components/GoodItem/box.css';

	.Item-container {
		width: 700rpx;
		height: auto;
		background-color: RGB(250, 249, 240);
		border-radius: 5rpx;
		box-shadow: 5rpx 5rpx 9rpx rgba(0, 0, 0, 0.5);
		margin: 20rpx;
		overflow: visible;
	}

	.card {
		padding: 20rpx;
	}

	.list-item {
		height: 40rpx;
	}

	.top-bar {
		width: 100%;
		height: 50rpx;
		display: flex;
	}

	.set-info {
		width: 40rpx;
		height: 80%;
		margin-right: 20rpx;
		cursor: pointer;
	}

	.bot-bar {
		padding-top: 30rpx;
	}

	.input-item {
		color: RGB(87, 91, 90);
	}

	.showPer {
		text-align: center;
		font-size: 20rpx;
		border: 1px solid #000000;
		height: 105rpx;
		border-radius: 8rpx;
		overflow: visible;
	}

	.content {
		height: auto;
		border: 1px solid #000000;
		transition: height 0.3s ease;
		overflow: visible;
		background-color: #fff;
		z-index: 510;
	}
</style>