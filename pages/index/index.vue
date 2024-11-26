<template>
	<div class="typing-container">
		<span class="typing">HBH's Travel Tools</span>
	</div>
</template>
<script>
	import BillUser from '../../common/util/BillUser';
	import util from '@/common/util/operateSqlite.js';
	import project from '@/common/util/project.js';
	import utils from '@/common/util/init.js'
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
				project1: {
					id: 1,
					name: "南京",
				}

			}
		},
		onPullDownRefresh() {
			console.log('refresh');

			utils.initializeDB();
			uni.stopPullDownRefresh();

		},
		onLoad() {
			// console.log('Sqlite:',Sqlite)
			// this.open();
		},
		methods: {


		}
	}
</script>
<style scoped>
	.typing-container {
		margin-top: 200rpx;
		align-items: center;
		justify-content: center;
		width: 100%;
		overflow: hidden;
		text-align: center;
		font-size: 50rpx;
	}

	.typing {
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		width: 20ch;
		animation: typing 4s steps(15) infinite;
		border-right: 2px solid black;
		/* 模拟光标 */
	}

	@keyframes typing {
		0% {
			width: 0ch;
		}

		70% {
			width: 15ch;
		}

		100% {
			width: 15ch;
		}
	}

	.typing::after {
		content: "";
		border-right: 2px solid black;
		display: inline-block;
		animation: blink 0.6s step-end infinite;
	}

	@keyframes blink {
		50% {
			border-color: transparent;
		}
	}
</style>