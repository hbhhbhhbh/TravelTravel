<template>
	<!-- 卡片 -->
	<view class="Item-container">
		<view class="card">
			<view class="top-bar">
				<view style="font-size: 25rpx; width: 200rpx">名称</view>
				<view style="font-size: 25rpx; width: 200rpx">数量</view>
				<view style="font-size: 25rpx; width: 120rpx">价格</view>
				<image @click="toggleModal" src="../../static/GoodItem/edit.png" class="set-info"></image>
			</view>
			<view class="top-bar bot-bar">
				<view class="input-item name" style="font-size: 25rpx; width: 200rpx">{{ showData.name }}</view>
				<view class="input-item cnt" style="font-size: 25rpx; width: 200rpx">{{ showData.cnt }}</view>
				<view class="input-item price" style="font-size: 25rpx; width: 120rpx">{{ showData.price }}</view>
				<image @click="deleteSelf" src="../../static/GoodItem/delete.png" class="set-info"></image>
			</view>

			<uni-collapse>
				<uni-collapse-item class="showPer" title="查看人员">
					<view class="content">
						<uni-list>
							<uni-list-item title="列表文字"></uni-list-item>
							<uni-list-item :disabled="true" title="列表禁用状态"></uni-list-item>
						</uni-list>
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
				value: ['0'],
				showModal: false, // 控制弹窗显示

				formData: {
					...this.showData,
				}
			};
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
				// 隐藏弹窗
				this.toggleModal();


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

		width: 600rpx;
		height: 200rpx;
		background-color: RGB(250, 249, 240);
		border-radius: 5rpx;
		box-shadow: 5rpx 5rpx 9rpx rgba(0, 0, 0, 0.5);
		margin: 20rpx;
	}

	.card {
		padding: 10rpx;
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
	}

	.set-info:hover {
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
		height: 60rpx;
		border-radius: 8rpx;
	}

	.content {
		border: 1px solid #000000;
		height: 100rpx;
	}
</style>