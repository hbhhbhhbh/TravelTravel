//查询获取数据库里的数据
//根据传过来的值来获取信息，我这里写了可以有两个条件来获取，都是动态的
//第一个参数为表格名，aa,bb分别为列名和列的值 ， cc,dd同前面
//传的参数按1,3,5来传，传一个，传三个，传五个参数，不能只传两个或者四个
function selectInformationType(name, aa, bb, cc, dd) {

	if (name !== undefined) {
		//第一个是表单名称，后两个参数是列表名，用来检索
		if (aa !== undefined && cc !== undefined) {
			//两个检索条件
			var sql = 'select * from ' + name + ' where ' + aa + '=' + bb + ' and ' + cc + '=' + dd +
				' order by id desc';
		}
		if (aa !== undefined && cc == undefined) {
			//一个检索条件
			var sql = 'select * from ' + name + ' where ' + aa + '=' + bb + ' order by id desc';
		}
		if (aa == undefined) {
			var sql = 'select * from ' + name + ' order by id desc';
		}
		console.log(sql);
		return new Promise((resolve, reject) => {
			plus.sqlite.selectSql({
				name: 'travel',
				sql: sql,
				success(e) {
					resolve(e);
				},
				fail(e) {
					reject(e);
				}
			})
		})
	} else {
		return new Promise((resolve, reject) => {
			reject("错误查询")
		});
	}
} //删除数据库里的数据
//参数跟上面查询获取数据一样
//传的参数按1,3,5来传，传一个，传三个，传五个参数，不能只传两个或者四个
function deleteInformationType(name, sol, qq, ww, ee) {
	if (name !== undefined) {
		//listId为表名,后面两个是列表名，检索用的
		if (ww !== undefined) {
			//两个检索条件
			var sql = 'delete from ' + name + ' where ' + sol + '="' + qq + '" and ' + ww + '=' + ee + '';
		} else if (sol !== undefined) {
			//一个检索条件
			var sql = 'delete from ' + name + ' where ' + sol + '="' + qq + '"';
		} else {
			var sql = 'delete  from ' + name + '';
		}
		console.log(sql);
		return new Promise((resolve, reject) => {
			plus.sqlite.executeSql({
				name: 'travel',
				sql: sql,
				success(e) {
					resolve(e);
				},
				fail(e) {
					reject(e);
				}
			})
		})
	} else {
		return new Promise((resolve, reject) => {
			reject("错误删除")
		});
	}
}

//修改数据表里的数据
//第一个参数为表格名，name为要修改的列名，cont为要修改为什么值，use,sel为搜索条件，分别是列名和列值
//传的参数按1,3,5来传，传一个，传三个，传五个参数，不能只传两个或者四个
function modifyInformation(listName, name, cont, use, sel) {
	//表格名，要修改地方的列名，修改后的内容，修改条件查询，列名，内容
	var sql;
	if (use == undefined) {
		sql = 'update ' + listName + ' set ' + name + '="' + cont + '"';
	} else {
		sql = 'update ' + listName + ' set ' + name + '="' + cont + '" where ' + use + '="' + sel + '"';
	}
	//where前面的是要修改的，后面的是条件，选择哪个
	return new Promise((resolve, reject) => {
		plus.sqlite.executeSql({
			name: 'travel',
			sql: sql,
			success(e) {
				resolve(e);
			},
			fail(e) {
				reject(e);
			}
		})
	})
}
//向表格里添加数据
//根据表格的列来添加信息
//因为list列我设为自动增加，所以不用添加数据
//values里是传过来要存的值，我这里是动态的，单引号加双引号拼接
function addUser(obj) {
	//判断有没有传参
	if (obj !== undefined) {
		//判断传的参是否有值
		var b = (JSON.stringify(obj) == "{}");
		if (!b) {
			//obj传来的参数对象
			var id = obj.id || null; //id
			var name = obj.name || null; //名称
			console.log(id + " " + name);
			var sql = 'insert into project(projectId,projectName) values("' + id + '","' + name +
				'")';
			console.log(sql);
			return new Promise((resolve, reject) => {
				plus.sqlite.executeSql({
					name: 'travel',
					sql: sql,
					success(e) {
						resolve(e);
					},
					fail(e) {
						reject(e);
					}
				})
			})
		} else {
			return new Promise((resolve, reject) => {
				reject("错误添加")
			})
		}
	} else {
		return new Promise((resolve, reject) => {
			reject("错误添加")
		})
	}
}

export default {
	selectInformationType,
	deleteInformationType,
	modifyInformation,
	addUser,
}