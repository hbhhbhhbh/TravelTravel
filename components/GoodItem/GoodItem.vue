<template>
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
		</view>
	</view>
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
			}
		},
		data() {
			return {
				showModal: false, // 控制弹窗显示
				showData: {
					name: '', // 表单字段：名称
					price: '', // 表单字段：价格
					cnt: ''
				},
				formData: {
					name: '', // 表单字段：名称
					price: '', // 表单字段：价格
					cnt: ''
				}
			};
		},
		methods: {
			toggleModal() {
				// 切换弹窗显示状态
				this.showModal = !this.showModal;
			},
			submitForm() {
				// 提交表单逻辑
				console.log('提交的表单数据:', this.formData);

				// 可以在这里发送表单数据到后台
				// axios.post('/api/submit', this.formData).then(...);

				// 隐藏弹窗
				this.toggleModal();
				this.showData.cnt = this.formData.cnt;
				this.showData.price = this.formData.price;
				this.showData.name = this.formData.name;
			},
			deleteSelf() {
				// 触发自定义事件，通知父组件删除此卡片
				this.$emit('delete-item', this.index);
			}
		}
	};
</script>

<style>
	@import '@/components/GoodItem/box.css';

	.Item-container {

		width: 600rpx;
		height: 150rpx;
		background-color: RGB(250, 249, 240);
		border-radius: 5rpx;
		box-shadow: 5rpx 5rpx 9rpx rgba(0, 0, 0, 0.5);
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
</style>