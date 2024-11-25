<template>
	<view class="paybill-container">
		<!-- 标题 -->
		<view class="header">
			<text class="title">PayBill</text>
			<text class="subtitle"></text>
			<view class="close-button" @click="closeModal">×</view>
		</view>

		<!-- 可插入图片区域 -->
		<button v-if="imageSrc.length<=0" type="primary" @click="chooseImage">可选择上传图片</button>
		<image @click="chooseImage" v-for="item in imageSrc" :src="item" class="image-placeholder">
		</image>
		<!-- 单号和日期 -->
		<view class="info">
			<view class="info-line">
				<text>NO:</text>
				<text>00001</text>
			</view>
			<view class="info-line">
				<text>Date:</text>
				<!-- <uni-datetime-picker style="margin-left:300rpx;" type="date" :clear-icon="false" v-model="single"
					@maskClick="maskClick" /> -->
				<view>{{Date}}</view>
			</view>
		</view>

		<!-- 商品列表 -->
		<view class="table">
			<view class="table-header">
				<text class="table-cell">NO</text>
				<text class="table-cell">Item</text>
				<text class="table-cell">QTY</text>
				<text class="table-cell">Price</text>
				<text class="table-cell">Total</text>
			</view>
			<view class="table-body">
				<view class="table-row" v-for="(item, index) in showBills" :key="index">
					<text class="table-cell">{{ index + 1 }}</text>
					<text class="table-cell">{{ item.name }}</text>
					<text class="table-cell">{{ item.cnt }}</text>
					<text class="table-cell">{{ item.price.toFixed(1) }}</text>
					<text class="table-cell">{{ item.total }}</text>
				</view>
			</view>
		</view>

		<!-- 总计 -->
		<view class="total-section">
			<view class="total-line">
				<text class="total-title">Total</text>
				<text class="total-amount" style="margin-left:400rpx;">{{ totalAmount }} ¥</text>
			</view>
		</view>

		<!-- 人员信息 -->
		<view class="person-section">
			<view class="person-line">
				<text class="person-title">Person</text>
				<text class="person-title">Price</text>
			</view>
			<view class="person-line">
				<view class="table-row" v-for="(item, index) in showBills" :key="index">
					<text class="person-value">黄秉浩</text>
					<text class="person-value">{{ totalAmount }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		STORAGE_KEYS
	} from '../../utils/key';
	import {
		pathToBase64
	} from '@/js_sdk/mmmm-image-tools/index.js'
	import settleBill from '@/common/util/settleBill.js';
	export default {
		data() {
			return {
				currentDate: new Date().toISOString().slice(0, 10), // 当前日期
				items: [{
					name: "臭豆腐",
					qty: 1,
					price: 15.0
				}],
				single: "",
				imageSrc: [], // 存储图片路径
				nowBills: [],
				showBills: [],
				userPriceMap: new Map(),
			};
		},
		computed: {
			totalAmount() {
				return this.nowBills.reduce((sum, item) => sum + item.price, 0).toFixed(1);
			},
			Date() {
				const today = new Date();

				const formattedDate = today.toLocaleDateString('zh-CN'); // 中文格式
				console.log(formattedDate); // 输出类似：2024/11/25
				return formattedDate;
			}
		},
		mounted() {
			this.load();
		},
		methods: {
			async load() {
				this.nowBills = await uni.getStorageSync(STORAGE_KEYS.CURRENTITEMS);
				console.log("初始化project:", this.nowBills);
				const result = this.nowBills.map((item, index) => ({
					index: index,
					name: item.name,
					cnt: item.cnt,
					price: item.price,
					total: item.price
				}));
				this.showBills = result;
				console.log(this.showBills);
				this.computePerPrice();
			},
			async computePerPrice() {

				for (const obj of this.nowBills) {
					try {
						const result = await settleBill.selectBillUser("BillUser", obj.id);


						result.forEach(item => {
							const {
								userid,
								price
							} = item;
							console.log(item.userid);
							if (this.userPriceMap.has(item.userid)) {
								// 如果 Map 中已有该 userid，累加价格
								this.userPriceMap.set(item.userid, this.userPriceMap.get(item.userid) + item
									.price / result.length);
							} else {
								// 如果 Map 中没有该 userid，初始化为当前价格
								this.userPriceMap.set(item.userid, item.price / result.length);
							}
						});
						console.log(result);
					} catch (error) {
						console.error("Error fetching bill user:", error);
					}
				}
				console.log(this.userPriceMap.get(1));
			},
			closeModal() {
				// 模态框关闭逻辑
				console.log("关闭模态框");
			},
			chooseImage() {
				// 打开相册选择图片
				uni.chooseImage({
					count: 1, // 限制只能选择一张图片
					sourceType: ["album"], // 仅允许从相册选择
					success: (res) => {
						console.log("图片路径:", res.tempFilePaths[0]); // 调试输出图片路径
						const filePath = res.tempFilePaths[0];
						// 针对不同平台处理路径
						this.imageSrc = [];
						this.imageSrc.push(filePath.startsWith("file://") ? filePath :
							`file://${filePath}`); // 非 H5 平台需要加前缀

					},
					fail: (err) => {
						console.error("选择图片失败:", err);
					},
				});
				console.log(this.imageSrc);
			},
			previewImg(current) {
				uni.previewImage({
					current: 'current',
					urls: this.imageSrc,
					indicator: none
				})
			}



		},
	};
</script>



<style scoped>
	.paybill-container {
		background-color: #fff;
		padding: 20px;
		border-radius: 8px;
		font-family: Arial, sans-serif;
	}

	.header {
		text-align: center;
		position: relative;
	}

	.title {
		font-size: 50px;
		font-weight: bold;
	}

	.subtitle {
		font-size: 20px;
		margin-top: 5px;
	}

	.close-button {
		position: absolute;
		top: 10px;
		right: 10px;
		font-size: 30px;
		cursor: pointer;
	}

	.placeholder-image {
		width: 100%;
		/* 确保图片占满父容器 */
		height: auto;
		/* 按比例缩放 */
		max-height: 600px;
		/* 限制图片最大高度 */
		border-radius: 8px;
		object-fit: cover;
		width: 100%;
		height: 100%;
		object-fit: cover;
		/* 确保图片按比例填充容器 */
	}


	.image-placeholder {
		background-color: white;
		text-align: center;
		padding: 20px;
		margin: 20px 0;
		border-radius: 8px;
		width: 90%;
		height: 200rpx;
	}

	.info {
		margin: 20px 0;
		font-size: 18px;
	}

	.info-line {
		font-size: 30rpx;
		display: flex;
		justify-content: space-between;
	}

	.table {
		border-top: 1px dashed #000;
		border-bottom: 1px dashed #000;
		margin: 20px 0;
	}

	.table-header,
	.table-row {
		display: flex;
		justify-content: space-between;
	}

	.table-cell {
		flex: 1;
		text-align: center;
		padding: 5px;
		font-size: 16px;
	}

	.total-section {
		display: flex;
		justify-content: space-between;
		font-size: 20px;
		font-weight: bold;
		margin: 20px 0;
	}

	.total-line {
		display: flex;
		justify-content: space-between;
	}

	.person-section {
		margin-top: 20px;
	}

	.person-line {
		display: flex;
		justify-content: space-between;
		font-size: 18px;
	}

	.person-title {
		font-weight: bold;
	}

	.person-value {
		text-align: right;
	}
</style>