<template>
	<view class="paybill-container" ref="paybillContainer">
		<!-- 标题 -->
		<view class="header">
			<text class="title">PayBill</text>
			<text class="subtitle"></text>

		</view>

		<!-- 可插入图片区域 -->
		<!-- <button v-if="imageSrc.length<=0&&!isshooting" type="primary" @click="chooseImage">可选择上传图片</button>
		<image @click="chooseImage" v-for="item in imageSrc" :src="item" class="image-placeholder">
		</image> -->
		<!-- 单号和日期 -->
		<view class="info">
			<view class="info-line">
				<text>NO:</text>
				<text v-if="nowBills.length>0">{{formatId(nowBills[0].projectId)}}</text>
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
				<view class="table-row" v-if="showBills.length>0" v-for="(item, index) in showBills" :key="index"
					:style="{color:item.color}">
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
				<text class="total-title" style="font-size: 70rpx;">Total</text>
				<text class="total-amount"
					style="margin-right:50rpx;display: flex;align-items: center;justify-content: center">{{ totalAmount }}
					¥</text>
			</view>
		</view>
		<view class="total-section">
			<view class="total-line">
				<text class="total-title" style="font-size: 70rpx;">Average</text>
				<text class="total-amount"
					style="margin-right:50rpx;display: flex;align-items: center;justify-content: center">{{ (totalAmount/userPriceArray.length).toFixed(1)  }}
					¥</text>
			</view>
		</view>
		<!-- 人员信息 -->
		<view class="person-section">
			<view class="person-line">
				<text class="person-title">Person</text>
				<text class="person-title" style="margin-left:400rpx;">Price</text>
			</view>
			<view class="person-line">
				<view class="table-row" v-if="userPriceArray.length>0" v-for="(item, index) in userPriceArray"
					:key="index">
					<text class="person-value">{{item.name}}</text>
					<text class="person-value" style="margin-right:50rpx;">{{ item.price.toFixed(1) }}</text>
				</view>
			</view>
		</view>

		<!-- <button v-if="!isshooting" @click="saveClick()" style="position: fixed;bottom:0; width:90%">保存为图片</button> -->
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
	import html2canvas from "html2canvas";
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
				isshooting: false,
				BillUsers: [],
			};
		},
		computed: {
			userPriceArray() {
				// 将 Map 转换为数组，便于模板中使用 v-for
				return Array.from(this.userPriceMap.entries()).map(([userid, value]) => ({
					userid,
					...value,
				}));
			},
			totalAmount() {
				return this.nowBills.reduce((sum, item) => sum + item.price, 0).toFixed(1);
			},
			Date() {
				const today = new Date();
				const formattedDate = today.toLocaleDateString('zh-CN'); // 中文格式
				console.log(formattedDate); // 输出类似：2024/11/25
				return formattedDate;
			},

		},
		mounted() {
			this.load();
		},
		methods: {
			formatId(id) {
				return String(id).padStart(5, '0'); // 使用 padStart 补齐 0
			},
			async load() {

				this.nowBills = await uni.getStorageSync(STORAGE_KEYS.CURRENTITEMS);
				console.log("初始化project:", this.nowBills);

				const result = [];
				for (const [index, item] of this.nowBills.entries()) {
					// 先构建账目的基本信息
					let billItem = {
						index: index,
						name: item.name,
						cnt: item.cnt,
						price: item.price,
						total: item.price,
						color: "black" // 默认设置为 black
					};

					// 查询 BillUser 表，检查是否有与此账目相关联的人员
					const persons = await settleBill.selectBillUser("BillUser", item.id);

					// 如果没有人员，则将 color 设置为 red
					if (persons.length === 0) {
						billItem.color = "red";
					}

					result.push(billItem);
				}

				this.showBills = result;
				console.log(this.showBills);

				// 调用计算价格的方法
				this.computePerPrice();
			},
			async computePerPrice() {
				// 遍历所有账单
				for (const obj of this.nowBills) {
					try {
						const result = await settleBill.selectBillUser("BillUser", obj.id);

						console.log("userBill", result);

						result.forEach(item => {
							// 获取当前用户在 Map 中的值（如果存在）
							const existingUser = this.userPriceMap.get(item.userid);

							if (existingUser) {
								// 如果用户已存在，累加价格
								const updatedPrice = existingUser.price + item.price / result.length;
								console.log("price: ", updatedPrice);

								this.userPriceMap.set(item.userid, {
									price: updatedPrice,
									name: existingUser.name // 保留原来的名字
								});
							} else {
								// 如果用户不存在，初始化价格
								this.userPriceMap.set(item.userid, {
									price: item.price / result.length,
									name: item.name // 设置名字
								});
							}

							console.log(
								`${item.userid}: ${JSON.stringify(this.userPriceMap.get(item.userid))}`);
						});

					} catch (error) {
						console.error("Error fetching bill user:", error);
					}
				}

				// 将 Map 转为可读的 JSON 格式
				console.log("Final userPriceMap:", JSON.stringify([...this.userPriceMap.entries()]));
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
			},
			//保存图片
			saveClick() {
				const pages = getCurrentPages();
				const currentPage = pages[pages.length - 1];
				const currentWebview = currentPage.$getAppWebview();

				// 使用框架 API 获取页面可见区域高度和宽度
				const windowHeight = plus.screen.resolutionHeight; // 屏幕分辨率高度
				const windowWidth = plus.screen.resolutionWidth; // 屏幕分辨率宽度

				console.log(`当前屏幕分辨率：宽=${windowWidth}px, 高=${windowHeight}px`);

				let scrollTop = 0; // 初始滚动位置

				// 滚动截屏逻辑
				const captureStep = () => {
					// 设置 WebView 滚动位置
					// currentWebview.setStyle({
					// 	top: `-${scrollTop}px`,
					// });
					console.log(currentWebview);
					setTimeout(() => {
						// 创建临时 Bitmap 对象
						const tempBitmap = new plus.nativeObj.Bitmap('temp_screenshot');

						// 截屏当前可视区域
						currentWebview.draw(
							tempBitmap,
							() => {
								// TODO: 拼接截图逻辑
								scrollTop += windowHeight;

								if (scrollTop < contentHeight) {
									captureStep(); // 继续滚动截图
								} else {
									// TODO: 保存最终长截图
									console.log('长截图完成');
								}
							},
							(error) => {
								console.error('截屏失败:', error);
							}
						);
					}, 200);
				};

				captureStep();
			},



		},
	};
</script>



<style scoped>
	.paybill-container {
		background-color: #fff;
		padding: 20px;
		border-radius: 8px;
		font-family: Arial, sans-serif;
		padding-bottom: 150rpx;
		overflow-y: auto;
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
		padding-bottom: 20rpx;
	}

	.table-header,
	.table-row {
		padding-top: 20rpx;

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

		font-size: 18px;
	}

	.person-title {
		font-weight: bold;
	}

	.person-value {
		text-align: right;
	}
</style>