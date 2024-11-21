<template>
	<view class="">
		<!-- <div>{{odb}}</div> -->
		<div>
			<button type="default" @click="isOpenDatabase">判断数据库是否打开</button>
			<button type="default" @click="openDatabase">打开数据库</button>
			<button type="default" @click="closeDatabase">关闭数据库</button>
			<button type="default" @click="createChatTable">创建表</button>
			<button type="default" @click="dropTable">删除表</button>
			<button type="default" @click="transaction">执行事务</button>
			<button type="default" @click="insertChatRow">新增数据</button>
			<button type="default" @click="insertListChatRow">批量新增数据</button>
			<button type="default" @click="deleteChatRow">删除所有数据</button>
			<button type="default" @click="selectSql">查询数据</button>
		</div>
	</view>
</template>

<script>
	import Sqlite from '/common/util/operateSqlite.js'
	export default {
		data() {
			return {
				// odb:'',

				dbName: 'dianji_chat',
				dbPath: '_doc/dianji_chat.db',
				dbTable: 'dianji_chat',
				dbIsOpen: false,
				chatText: {
					id: 1,
					fromId: '123',
					toId: '321',
					content: '你好!',
					flag: 1
				},
				chatText1: [{
						id: 11,
						fromId: '123',
						toId: '321',
						content: '你好!',
						flag: 1
					},
					{
						id: 12,
						fromId: '123',
						toId: '321',
						content: '你好!',
						flag: 1
					}
				],
			}
		},
		onLoad() {
			// console.log('Sqlite:',Sqlite)
			// this.open();
		},
		methods: {
			// async open(){
			// 	let odb=await Sqlite.openSqlite();
			// 	this.odb=odb;
			// 	console.log('打开数据库成功：',odb)
			// },
			createChatTable() {
				let sql = 'CREATE TABLE if not exists ' + this.dbTable +
					' ( "id" varchar(32) NOT NULL,"content" varchar(1024),"fromId" varchar(32), "toId" varchar(32), "flag" varchar(2), PRIMARY KEY ("id"));'
				this.executeSql(sql)
			},
			openDatabase() {
				plus.sqlite.openDatabase({
					name: this.dbName,
					path: this.dbPath,
					success: function(e) {
						console.log('打开数据库成功')
					},
					fail: function(e) {
						console.log(e, '打开数据库失败')
					}
				});
			},
			isOpenDatabase() {
				let res = plus.sqlite.isOpenDatabase({
					name: this.dbName,
					path: this.dbPath
				});
				if (res) {
					console.log(res, '数据库已打开')
				} else {
					console.log(res, '数据库未打开')
				}
			},
			closeDatabase() {
				plus.sqlite.closeDatabase({
					name: this.dbName,
					success: function(e) {
						console.log(JSON.stringify(e), 'closeDatabase dianji_chat success!');
					},
					fail: function(e) {
						console.log('closeDatabase failed: ' + JSON.stringify(e));
					}
				});
			},
			insertChatRow() {
				let data = this.chatText
				data.id++
				let sql = "insert into " + this.dbTable + " values('" + data.id + "','" + data.content +
					"','" + data.fromId + "','" + data.toId + "'," + data.flag + ")";
				this.executeSql(sql)
			},
			insertListChatRow() {
				let data = this.chatText1
				let sql = '';
				for (let i = 0; i < data.length; i++) {
					sql = "insert into " + this.dbTable + " values('" + data[i].id + "','" + data[i].content +
						"','" + data[i].fromId + "','" + data[i].toId + "'," + data[i].flag + ")";
					this.executeSql(sql)
				}
			},
			deleteChatRow() {
				let sql = "delete from " + this.dbTable;
				this.executeSql(sql)
			},
			selectSql() {
				let curPage = 1
				let pageSize = 20
				let fromId = '123'
				let sql = 'select * from ' + this.dbTable + ' where fromId=' + fromId +
					' limit ' + pageSize + ' offset ' + (curPage - 1) * pageSize;
				this.executeSql(sql)
			},
			dropTable() {
				let sql = 'DROP TABLE ' + this.dbTable + ';'
				plus.sqlite.executeSql({
					name: this.dbName,
					sql: sql,
					success: function(e) {
						console.log("删除数据表成功");
					},
					fail: function(e) {
						console.log('executeSql failed: ' + JSON.stringify(e));
					}
				})
			},
			transaction() {
				plus.sqlite.transaction({
					name: this.dbName,
					operation: 'begin',
					success: function(e) {
						console.log('transaction success!');
					},
					fail: function(e) {
						console.log('transaction failed: ' + JSON.stringify(e));
					}
				});
			},
			executeSql(sql) {
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql,
					success: function(data) {
						console.log(data, '---------------')
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
			},
		}
	}
</script>

<style>
</style>