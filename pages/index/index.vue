<template>
	<view style="display: flex; justify-content: center; /* 水平居中 */">
		<GoodItem></GoodItem>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import GoodItem from '../../components/GoodItem/GoodItem.vue';
const list = ref([
	{
		text: '点赞',
		color: 'blue',
		fontSize: 28
	},
	{
		text: '分享'
	},
	{
		text: '评论'
	}
]);

const show = ref(true);
</script>
