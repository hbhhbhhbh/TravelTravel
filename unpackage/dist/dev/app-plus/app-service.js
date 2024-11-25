if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  function selectInformationType$3(name, aa, bb, cc, dd) {
    if (name !== void 0) {
      if (aa !== void 0 && cc !== void 0) {
        var sql = "select * from " + name + " where " + aa + "=" + bb + " and " + cc + "=" + dd + " order by id desc";
      }
      if (aa !== void 0 && cc == void 0) {
        var sql = "select * from " + name + " where " + aa + "=" + bb + " order by id desc";
      }
      if (aa == void 0) {
        var sql = "select * from " + name + " order by id desc";
      }
      formatAppLog("log", "at common/util/BillUser.js:21", sql);
      return new Promise((resolve, reject) => {
        plus.sqlite.selectSql({
          name: "travel",
          sql,
          success(e) {
            resolve(e);
          },
          fail(e) {
            reject(e);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("错误查询");
      });
    }
  }
  function deleteInformationType$3(name, sol, qq, ww, ee) {
    if (name !== void 0) {
      if (ww !== void 0) {
        var sql = "delete from " + name + " where " + sol + '="' + qq + '" and ' + ww + "=" + ee;
      } else if (sol !== void 0) {
        var sql = "delete from " + name + " where " + sol + '="' + qq + '"';
      } else {
        var sql = "delete  from " + name;
      }
      formatAppLog("log", "at common/util/BillUser.js:54", sql);
      return new Promise((resolve, reject) => {
        plus.sqlite.executeSql({
          name: "travel",
          sql,
          success(e) {
            resolve(e);
          },
          fail(e) {
            reject(e);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("错误删除");
      });
    }
  }
  function modifyInformation$3(listName, name, cont, use, sel) {
    var sql;
    if (use == void 0) {
      sql = "update " + listName + " set " + name + '="' + cont + '"';
    } else {
      sql = "update " + listName + " set " + name + '="' + cont + '" where ' + use + '="' + sel + '"';
    }
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: "travel",
        sql,
        success(e) {
          resolve(e);
        },
        fail(e) {
          reject(e);
        }
      });
    });
  }
  function addUser$2(obj) {
    if (obj !== void 0) {
      var b = JSON.stringify(obj) == "{}";
      if (!b) {
        var userid = obj.userid || null;
        var billid = obj.billid || null;
        formatAppLog("log", "at common/util/BillUser.js:112", userid + " " + billid);
        var sql = 'insert into BillUser(userid,Billid) values("' + userid + '","' + billid + '")';
        formatAppLog("log", "at common/util/BillUser.js:115", sql);
        return new Promise((resolve, reject) => {
          plus.sqlite.executeSql({
            name: "travel",
            sql,
            success(e) {
              resolve(e);
            },
            fail(e) {
              reject(e);
            }
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          reject("错误添加");
        });
      }
    } else {
      return new Promise((resolve, reject) => {
        reject("错误添加");
      });
    }
  }
  function clear(name, sol, qq, ww, ee) {
    if (name !== void 0) {
      if (ww !== void 0) {
        var sql = "delete from " + name + " where " + sol + '="' + qq + '" and ' + ww + "=" + ee;
      } else if (sol !== void 0) {
        var sql = "delete from " + name + " where " + sol + '="' + qq + '"';
      } else {
        var sql = "delete  from " + name;
      }
      formatAppLog("log", "at common/util/BillUser.js:152", sql);
      return new Promise((resolve, reject) => {
        plus.sqlite.executeSql({
          name: "travel",
          sql,
          success(e) {
            resolve(e);
          },
          fail(e) {
            reject(e);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("错误删除");
      });
    }
  }
  const BillUser = {
    selectInformationType: selectInformationType$3,
    deleteInformationType: deleteInformationType$3,
    modifyInformation: modifyInformation$3,
    addUser: addUser$2,
    clear
  };
  function openSqlite() {
    return new Promise((resolve, reject) => {
      plus.sqlite.openDatabase({
        name: "travel",
        //数据库名称
        path: "_doc/travel.db",
        //数据库地址，uniapp推荐以下划线为开头
        success(e) {
          resolve(e);
        },
        fail(e) {
          reject(e);
        }
      });
    });
  }
  function CreateBillSQL() {
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: "travel",
        //表格创建或者打开，后面为表格结构
        sql: 'create table if not exists Bill("id" INTEGER PRIMARY KEY ,"billid" INTEGER,"projectId" INTEGER,"name" TEXT, "cnt" INTEGER, "price" INTEGER )',
        success(e) {
          resolve(e);
        },
        fail(e) {
          reject(e);
        }
      });
    });
  }
  function updateTableStructure(tableName, columnName, columnType) {
    return new Promise((resolve, reject) => {
      const sql = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`;
      plus.sqlite.executeSql({
        name: "travel",
        // 数据库名称
        sql,
        success(e) {
          resolve(`表 ${tableName} 成功添加字段 ${columnName} (${columnType})`);
        },
        fail(e) {
          reject(`更新表结构失败: ${JSON.stringify(e)}`);
        }
      });
    });
  }
  function deleteTable(tableName) {
    return new Promise((resolve, reject) => {
      const sql = `DROP TABLE IF EXISTS ${tableName}`;
      plus.sqlite.executeSql({
        name: "travel",
        // 数据库名称
        sql,
        success(e) {
          resolve(`表 ${tableName} 删除成功`);
        },
        fail(e) {
          reject(`删除表 ${tableName} 失败: ${JSON.stringify(e)}`);
        }
      });
    });
  }
  function CreateProjectSQL() {
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: "travel",
        //表格创建或者打开，后面为表格结构
        sql: 'create table if not exists project("id" INTEGER PRIMARY KEY ,"projectId" INTEGER,"projectName" TEXT )',
        success(e) {
          resolve(e);
        },
        fail(e) {
          reject(e);
        }
      });
    });
  }
  function CreateBillUserSQL() {
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: "travel",
        // 表格创建或者打开，后面为表格结构
        sql: `
				CREATE TABLE IF NOT EXISTS BillUser (
					id INTEGER PRIMARY KEY,
					userid INTEGER,
					Billid INTEGER,
					UNIQUE(userid, Billid) -- 添加唯一约束
				)
			`,
        success(e) {
          resolve(e);
        },
        fail(e) {
          reject(e);
        }
      });
    });
  }
  function CreateUserSQL() {
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: "travel",
        //表格创建或者打开，后面为表格结构
        sql: 'create table if not exists user("id" INTEGER PRIMARY KEY ,"userid" INTEGER ,"name" TEXT)',
        success(e) {
          resolve(e);
        },
        fail(e) {
          reject(e);
        }
      });
    });
  }
  function userInfoSQL() {
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: "pop",
        //表格创建或者打开，后面为表格结构
        sql: 'create table if not exists userInfo("list" INTEGER PRIMARY KEY AUTOINCREMENT,"id" TEXT,"name" TEXT,"gender" TEXT,"avatar" TEXT)',
        success(e) {
          resolve(e);
        },
        fail(e) {
          reject(e);
        }
      });
    });
  }
  function addUser$1(obj) {
    if (obj !== void 0) {
      var b = JSON.stringify(obj) == "{}";
      if (!b) {
        var id = obj.id || null;
        var name = obj.name || null;
        return new Promise((resolve, reject) => {
          plus.sqlite.executeSql({
            name: "travel",
            sql: 'insert into user(userid,name) values("' + id + '","' + name + '")',
            success(e) {
              resolve(e);
            },
            fail(e) {
              reject(e);
            }
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          reject("错误添加");
        });
      }
    } else {
      return new Promise((resolve, reject) => {
        reject("错误添加");
      });
    }
  }
  function selectInformationType$2(name, aa, bb, cc, dd) {
    if (name !== void 0) {
      if (aa !== void 0 && cc !== void 0) {
        var sql = "select * from " + name + " where " + aa + " like " + bb + " and " + cc + " like " + dd;
      }
      if (aa !== void 0 && cc == void 0) {
        var sql = "select * from " + name + " where " + aa + " like " + bb;
      }
      if (aa == void 0) {
        var sql = "select * from " + name;
      }
      formatAppLog("log", "at common/util/operateSqlite.js:203", sql);
      return new Promise((resolve, reject) => {
        plus.sqlite.selectSql({
          name: "travel",
          sql,
          success(e) {
            resolve(e);
          },
          fail(e) {
            reject(e);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("错误查询");
      });
    }
  }
  function deleteInformationType$2(name, sol, qq, ww, ee) {
    if (name !== void 0 && sol !== void 0) {
      if (ww !== void 0) {
        var sql = "delete from " + name + " where " + sol + '="' + qq + '" and ' + ww + "=" + ee;
      } else {
        var sql = "delete from " + name + " where " + sol + '="' + qq + '"';
      }
      formatAppLog("log", "at common/util/operateSqlite.js:236", sql);
      return new Promise((resolve, reject) => {
        plus.sqlite.executeSql({
          name: "travel",
          sql,
          success(e) {
            resolve(e);
          },
          fail(e) {
            reject(e);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("错误删除");
      });
    }
  }
  function modifyInformation$2(listName, name, cont, use, sel) {
    var sql;
    if (use == void 0) {
      sql = "update " + listName + " set " + name + '="' + cont + '"';
    } else {
      sql = "update " + listName + " set " + name + '="' + cont + '" where ' + use + '="' + sel + '"';
    }
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: "pop",
        sql,
        success(e) {
          resolve(e);
        },
        fail(e) {
          reject(e);
        }
      });
    });
  }
  function closeSQL(name) {
    return new Promise((resolve, reject) => {
      plus.sqlite.closeDatabase({
        name: "pop",
        success(e) {
          resolve(e);
        },
        fail(e) {
          reject(e);
        }
      });
    });
  }
  function isOpen(name, path) {
    var ss = name || "travel";
    var qq = path || "_doc/travel.db";
    var open = plus.sqlite.isOpenDatabase({
      name: ss,
      path: qq
    });
    return open;
  }
  function pullSQL(id, num) {
    return new Promise((resolve, reject) => {
      plus.sqlite.selectSql({
        name: "pop",
        sql: "select * from " + id + " order by list desc limit 15 offset " + num,
        success(e) {
          resolve(e);
        },
        fail(e) {
          reject(e);
        }
      });
    });
  }
  function dropTable() {
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: "travel",
        sql: "DROP TABLE IF EXISTS BillUser",
        // 删除 BillUser 表
        success(e) {
          formatAppLog("log", "at common/util/operateSqlite.js:337", "表 BillUser 删除成功");
          resolve(e);
        },
        fail(e) {
          formatAppLog("error", "at common/util/operateSqlite.js:341", "表删除失败:", e);
          reject(e);
        }
      });
    });
  }
  const util = {
    CreateProjectSQL,
    CreateUserSQL,
    CreateBillUserSQL,
    CreateBillSQL,
    openSqlite,
    userInfoSQL,
    addUser: addUser$1,
    selectInformationType: selectInformationType$2,
    deleteInformationType: deleteInformationType$2,
    pullSQL,
    isOpen,
    closeSQL,
    modifyInformation: modifyInformation$2,
    updateTableStructure,
    deleteTable,
    dropTable
  };
  function selectInformationType$1(name, aa, bb, cc, dd) {
    if (name !== void 0) {
      if (aa !== void 0 && cc !== void 0) {
        var sql = "select * from " + name + " where " + aa + "=" + bb + " and " + cc + "=" + dd + " order by id desc";
      }
      if (aa !== void 0 && cc == void 0) {
        var sql = "select * from " + name + " where " + aa + "=" + bb + " order by id desc";
      }
      if (aa == void 0) {
        var sql = "select * from " + name + " order by id desc";
      }
      formatAppLog("log", "at common/util/project.js:21", sql);
      return new Promise((resolve, reject) => {
        plus.sqlite.selectSql({
          name: "travel",
          sql,
          success(e) {
            resolve(e);
          },
          fail(e) {
            reject(e);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("错误查询");
      });
    }
  }
  function deleteInformationType$1(name, sol, qq, ww, ee) {
    if (name !== void 0) {
      if (ww !== void 0) {
        var sql = "delete from " + name + " where " + sol + '="' + qq + '" and ' + ww + "=" + ee;
      } else if (sol !== void 0) {
        var sql = "delete from " + name + " where " + sol + '="' + qq + '"';
      } else {
        var sql = "delete  from " + name;
      }
      formatAppLog("log", "at common/util/project.js:54", sql);
      return new Promise((resolve, reject) => {
        plus.sqlite.executeSql({
          name: "travel",
          sql,
          success(e) {
            resolve(e);
          },
          fail(e) {
            reject(e);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("错误删除");
      });
    }
  }
  function modifyInformation$1(listName, name, cont, use, sel) {
    var sql;
    if (use == void 0) {
      sql = "update " + listName + " set " + name + '="' + cont + '"';
    } else {
      sql = "update " + listName + " set " + name + '="' + cont + '" where ' + use + '="' + sel + '"';
    }
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: "travel",
        sql,
        success(e) {
          resolve(e);
        },
        fail(e) {
          reject(e);
        }
      });
    });
  }
  function addUser(obj) {
    if (obj !== void 0) {
      var b = JSON.stringify(obj) == "{}";
      if (!b) {
        var id = obj.id || null;
        var name = obj.name || null;
        formatAppLog("log", "at common/util/project.js:112", id + " " + name);
        var sql = 'insert into project(projectId,projectName) values("' + id + '","' + name + '")';
        formatAppLog("log", "at common/util/project.js:115", sql);
        return new Promise((resolve, reject) => {
          plus.sqlite.executeSql({
            name: "travel",
            sql,
            success(e) {
              resolve(e);
            },
            fail(e) {
              reject(e);
            }
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          reject("错误添加");
        });
      }
    } else {
      return new Promise((resolve, reject) => {
        reject("错误添加");
      });
    }
  }
  const project = {
    selectInformationType: selectInformationType$1,
    deleteInformationType: deleteInformationType$1,
    modifyInformation: modifyInformation$1,
    addUser
  };
  const _export_sfc = (sfc, props2) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props2) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$j = {
    data() {
      return {
        // odb:'',
        dbName: "travel",
        dbPath: "_doc/travel.db",
        dbTable: "user",
        dbIsOpen: false,
        chatText: {
          id: 1,
          fromId: "123",
          toId: "321",
          content: "你好!",
          flag: 1
        },
        project1: {
          id: 1,
          name: "南京"
        }
      };
    },
    mounted() {
      this.initializeDB();
    },
    onLoad() {
    },
    methods: {
      async initializeDB() {
        try {
          await this.isopenDB();
          await this.createBillTable();
          await this.createBillUserTable();
          await this.createProjectTable();
          await this.createUserTable();
          formatAppLog("log", "at pages/index/index.vue:57", "数据库初始化成功");
        } catch (error2) {
          formatAppLog("error", "at pages/index/index.vue:59", "数据库初始化失败：", error2);
        }
      },
      clearBillUser() {
        BillUser.clear("BillUser").then((result) => {
          uni.showToast({
            title: "数据库清除成功",
            icon: "success",
            duration: 2e3
          });
          formatAppLog("log", "at pages/index/index.vue:69", "数据库清除成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "数据库清除失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/index/index.vue:77", "数据库清除失败：", error2);
        });
      },
      dropTable() {
        util.dropTable().then((result) => {
          uni.showToast({
            title: "数据库删除成功",
            icon: "success",
            duration: 2e3
          });
          formatAppLog("log", "at pages/index/index.vue:87", "表格删除成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "数据库删除失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/index/index.vue:95", "表格删除失败：", error2);
        });
      },
      isopenDB() {
        util.openSqlite().then((result) => {
          formatAppLog("log", "at pages/index/index.vue:105", "表格创建成功：", result);
        }).catch((error2) => {
          formatAppLog("error", "at pages/index/index.vue:113", "表格创建失败：", error2);
        });
      },
      createBillTable() {
        util.CreateBillSQL().then((result) => {
          formatAppLog("log", "at pages/index/index.vue:129", "表格创建成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "表格创建失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/index/index.vue:137", "表格创建失败：", error2);
        });
      },
      createBillUserTable() {
        util.CreateBillUserSQL().then((result) => {
          formatAppLog("log", "at pages/index/index.vue:153", "表格创建成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "表格创建失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/index/index.vue:161", "表格创建失败：", error2);
        });
      },
      createUserTable() {
        util.CreateUserSQL().then((result) => {
          formatAppLog("log", "at pages/index/index.vue:177", "表格创建成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "表格创建失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/index/index.vue:185", "表格创建失败：", error2);
        });
      },
      createProjectTable() {
        util.CreateProjectSQL().then((result) => {
          formatAppLog("log", "at pages/index/index.vue:201", "Project表格成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "Project表格失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/index/index.vue:209", "Project表格失败：", error2);
        });
      },
      updateTable() {
        util.updateTableStructure("Bill", "project", "INTEGER");
      },
      deleteTable() {
        uni.showToast({
          title: "测试",
          icon: "success",
          duration: 2e3
        });
        util.deleteTable("Bill").then((result) => {
          uni.showToast({
            title: "Bill表格删除成功",
            icon: "success",
            duration: 2e3
          });
          formatAppLog("log", "at pages/index/index.vue:229", "表格创建成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "表格创建失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/index/index.vue:237", "表格创建失败：", error2);
        });
      },
      addproject(id, name) {
        const obj = this.project1;
        project.addUser(obj).then((result) => {
          uni.showToast({
            title: "Project插入成功",
            icon: "success",
            duration: 2e3
          });
          formatAppLog("log", "at pages/index/index.vue:248", "Project插入成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "Project插入失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/index/index.vue:256", "Project插入失败：", error2);
        });
      },
      selectproject() {
        project.selectInformationType("project").then((result) => {
          uni.showToast({
            title: "Project查询成功",
            icon: "success",
            duration: 2e3
          });
          formatAppLog("log", "at pages/index/index.vue:266", "Project查询成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "Project查询失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/index/index.vue:274", "Project查询失败：", error2);
        });
      },
      deleteproject() {
        project.deleteInformationType("project").then((result) => {
          uni.showToast({
            title: "Project删除成功",
            icon: "success",
            duration: 2e3
          });
          formatAppLog("log", "at pages/index/index.vue:284", "Project删除成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "Project删除失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/index/index.vue:292", "Project查询失败：", error2);
        });
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "" }, [
      vue.createCommentVNode(" <div>{{odb}}</div> "),
      vue.createElementVNode("div")
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__file", "D:/uni/travel-new/pages/index/index.vue"]]);
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$i = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code2 = this.icons.find((v) => v.font_class === this.type);
        if (code2) {
          return code2.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-d31e1c47"], ["__file", "D:/uni/travel-new/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const _sfc_main$h = {
    name: "uniCollapseItem",
    props: {
      // 列表标题
      title: {
        type: String,
        default: ""
      },
      name: {
        type: [Number, String],
        default: ""
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否显示动画,app 端默认不开启动画，卡顿严重
      showAnimation: {
        type: Boolean,
        default: false
      },
      // 是否展开
      open: {
        type: Boolean,
        default: false
      },
      // 缩略图
      thumb: {
        type: String,
        default: ""
      },
      // 标题分隔线显示类型
      titleBorder: {
        type: String,
        default: "auto"
      },
      border: {
        type: Boolean,
        default: true
      },
      showArrow: {
        type: Boolean,
        default: true
      }
    },
    data() {
      const elId = `Uni_${Math.ceil(Math.random() * 1e6).toString(36)}`;
      return {
        isOpen: false,
        isheight: null,
        height: 0,
        elId,
        nameSync: 0
      };
    },
    watch: {
      open(val) {
        this.isOpen = val;
        this.onClick(val, "init");
      }
    },
    updated(e) {
      this.$nextTick(() => {
        this.init(true);
      });
    },
    created() {
      this.collapse = this.getCollapse();
      this.oldHeight = 0;
      this.onClick(this.open, "init");
    },
    // TODO vue3
    unmounted() {
      this.__isUnmounted = true;
      this.uninstall();
    },
    mounted() {
      if (!this.collapse)
        return;
      if (this.name !== "") {
        this.nameSync = this.name;
      } else {
        this.nameSync = this.collapse.childrens.length + "";
      }
      if (this.collapse.names.indexOf(this.nameSync) === -1) {
        this.collapse.names.push(this.nameSync);
      } else {
        formatAppLog("warn", "at uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.vue:154", `name 值 ${this.nameSync} 重复`);
      }
      if (this.collapse.childrens.indexOf(this) === -1) {
        this.collapse.childrens.push(this);
      }
      this.init();
    },
    methods: {
      init(type) {
        this.getCollapseHeight(type);
      },
      uninstall() {
        if (this.collapse) {
          this.collapse.childrens.forEach((item, index2) => {
            if (item === this) {
              this.collapse.childrens.splice(index2, 1);
            }
          });
          this.collapse.names.forEach((item, index2) => {
            if (item === this.nameSync) {
              this.collapse.names.splice(index2, 1);
            }
          });
        }
      },
      onClick(isOpen2, type) {
        if (this.disabled)
          return;
        this.isOpen = isOpen2;
        if (this.isOpen && this.collapse) {
          this.collapse.setAccordion(this);
        }
        if (type !== "init") {
          this.collapse.onChange(isOpen2, this);
        }
      },
      getCollapseHeight(type, index2 = 0) {
        const views = uni.createSelectorQuery().in(this);
        views.select(`#${this.elId}`).fields({
          size: true
        }, (data) => {
          if (index2 >= 10)
            return;
          if (!data) {
            index2++;
            this.getCollapseHeight(false, index2);
            return;
          }
          this.height = data.height;
          this.isheight = true;
          if (type)
            return;
          this.onClick(this.isOpen, "init");
        }).exec();
      },
      getNvueHwight(type) {
        dom.getComponentRect(this.$refs["collapse--hook"], (option) => {
          if (option && option.result && option.size) {
            this.height = option.size.height;
            this.isheight = true;
            if (type)
              return;
            this.onClick(this.open, "init");
          }
        });
      },
      /**
       * 获取父元素实例
       */
      getCollapse(name = "uniCollapse") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-collapse-item" }, [
      vue.createCommentVNode(" onClick(!isOpen) "),
      vue.createElementVNode(
        "view",
        {
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick(!$data.isOpen)),
          class: vue.normalizeClass(["uni-collapse-item__title", { "is-open": $data.isOpen && $props.titleBorder === "auto", "uni-collapse-item-border": $props.titleBorder !== "none" }])
        },
        [
          vue.createElementVNode("view", { class: "uni-collapse-item__title-wrap" }, [
            vue.renderSlot(_ctx.$slots, "title", {}, () => [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["uni-collapse-item__title-box", { "is-disabled": $props.disabled }])
                },
                [
                  $props.thumb ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    src: $props.thumb,
                    class: "uni-collapse-item__title-img"
                  }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode(
                    "text",
                    { class: "uni-collapse-item__title-text" },
                    vue.toDisplayString($props.title),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              )
            ], true)
          ]),
          $props.showArrow ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: vue.normalizeClass([{ "uni-collapse-item__title-arrow-active": $data.isOpen, "uni-collapse-item--animation": $props.showAnimation === true }, "uni-collapse-item__title-arrow"])
            },
            [
              vue.createVNode(_component_uni_icons, {
                color: $props.disabled ? "#ddd" : "#bbb",
                size: "14",
                type: "bottom"
              }, null, 8, ["color"])
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      ),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["uni-collapse-item__wrap", { "is--transition": $props.showAnimation }]),
          style: vue.normalizeStyle({ height: ($data.isOpen ? $data.height : 0) + "px" })
        },
        [
          vue.createElementVNode("view", {
            id: $data.elId,
            ref: "collapse--hook",
            class: vue.normalizeClass(["uni-collapse-item__wrap-content", { open: $data.isheight, "uni-collapse-item--border": $props.border && $data.isOpen }])
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 10, ["id"])
        ],
        6
        /* CLASS, STYLE */
      )
    ]);
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-3d2dde9f"], ["__file", "D:/uni/travel-new/uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.vue"]]);
  const _sfc_main$g = {
    name: "uniCollapse",
    emits: ["change", "activeItem", "input", "update:modelValue"],
    props: {
      value: {
        type: [String, Array],
        default: ""
      },
      modelValue: {
        type: [String, Array],
        default: ""
      },
      accordion: {
        // 是否开启手风琴效果
        type: [Boolean, String],
        default: false
      }
    },
    data() {
      return {};
    },
    computed: {
      // TODO 兼容 vue2 和 vue3
      dataValue() {
        let value = typeof this.value === "string" && this.value === "" || Array.isArray(this.value) && this.value.length === 0;
        let modelValue = typeof this.modelValue === "string" && this.modelValue === "" || Array.isArray(this.modelValue) && this.modelValue.length === 0;
        if (value) {
          return this.modelValue;
        }
        if (modelValue) {
          return this.value;
        }
        return this.value;
      }
    },
    watch: {
      dataValue(val) {
        this.setOpen(val);
      }
    },
    created() {
      this.childrens = [];
      this.names = [];
    },
    mounted() {
      this.$nextTick(() => {
        this.setOpen(this.dataValue);
      });
    },
    methods: {
      setOpen(val) {
        let str = typeof val === "string";
        let arr = Array.isArray(val);
        this.childrens.forEach((vm, index2) => {
          if (str) {
            if (val === vm.nameSync) {
              if (!this.accordion) {
                formatAppLog("warn", "at uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue:75", "accordion 属性为 false ,v-model 类型应该为 array");
                return;
              }
              vm.isOpen = true;
            }
          }
          if (arr) {
            val.forEach((v) => {
              if (v === vm.nameSync) {
                if (this.accordion) {
                  formatAppLog("warn", "at uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue:85", "accordion 属性为 true ,v-model 类型应该为 string");
                  return;
                }
                vm.isOpen = true;
              }
            });
          }
        });
        this.emit(val);
      },
      setAccordion(self) {
        if (!this.accordion)
          return;
        this.childrens.forEach((vm, index2) => {
          if (self !== vm) {
            vm.isOpen = false;
          }
        });
      },
      resize() {
        this.childrens.forEach((vm, index2) => {
          vm.getCollapseHeight();
        });
      },
      onChange(isOpen2, self) {
        let activeItem = [];
        if (this.accordion) {
          activeItem = isOpen2 ? self.nameSync : "";
        } else {
          this.childrens.forEach((vm, index2) => {
            if (vm.isOpen) {
              activeItem.push(vm.nameSync);
            }
          });
        }
        this.$emit("change", activeItem);
        this.emit(activeItem);
      },
      emit(val) {
        this.$emit("input", val);
        this.$emit("update:modelValue", val);
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-collapse" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]);
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-3f050360"], ["__file", "D:/uni/travel-new/uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue"]]);
  const STORAGE_KEYS = {
    CURRENTITEMS: "currentItems",
    // 用户信息
    AllPerson: "AllPerson",
    // 认证令牌
    nowproject: "nowproject"
    // 应用设置
  };
  const _imports_0$1 = "/static/GoodItem/edit.png";
  const _imports_0 = "/static/GoodItem/delete.png";
  const _sfc_main$f = {
    name: "GoodItem",
    props: {
      index: {
        type: Number,
        // 父组件传入的索引，用于标识具体的卡片
        required: true
      },
      showData: {
        type: Object,
        required: true
        // 从父组件接收数据
      }
    },
    inheritAttrs: false,
    data() {
      return {
        isExpanded: false,
        loading: true,
        Persons: [],
        update: false,
        value: ["0"],
        showModal: false,
        // 控制弹窗显示
        contentHeight: "auto",
        // 动态内容高度
        formData: {
          ...this.showData
        }
      };
    },
    mounted() {
      this.selectBillUser();
    },
    methods: {
      showPer() {
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:101", "跳转");
        uni.navigateTo({
          url: "/pages/showPer/showPer"
        });
      },
      toggleModal() {
        this.showModal = !this.showModal;
      },
      submitForm() {
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:112", "提交的表单数据:", this.formData);
        this.$emit("update-item", this.index, {
          ...this.formData
        });
        this.update = true;
        this.toggleModal();
      },
      async toggleCollapse(isExpanded) {
        this.update = false;
        this.isExpanded = !this.isExpanded;
        if (this.isExpanded) {
          await this.selectBillUser();
          uni.createSelectorQuery().in(this);
          const query1 = uni.createSelectorQuery().in(this);
          query1.select(".Item-container").boundingClientRect((itemData) => {
            if (!itemData)
              return;
            formatAppLog("log", "at components/GoodItem/GoodItem.vue:141", "Item-container: " + itemData.height);
            this.contentHeight = `${this.pxToRpx(this.Persons.length * 15 + itemData.height + 20)}rpx`;
            formatAppLog("log", "at components/GoodItem/GoodItem.vue:145", "调整后的高度:", this.contentHeight);
          }).exec();
        } else {
          this.contentHeight = "auto";
        }
      },
      pxToRpx(px) {
        const screenWidth = uni.getSystemInfoSync().screenWidth;
        return 750 / screenWidth * px;
      },
      async selectBillUser() {
        this.loading = true;
        const currentItems = uni.getStorageSync(STORAGE_KEYS.CURRENTITEMS);
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:165", "GOODITEM-SELECTBILLUSER-START");
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:166", currentItems[this.index]);
        const result = await BillUser.selectInformationType("BillUser", "Billid", currentItems[this.index].id);
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:171", "nowBillPerson: ", result);
        this.Persons = [];
        for (const obj of result) {
          try {
            const result1 = await util.selectInformationType(
              "user",
              // 表名
              "id",
              // 查询字段
              `'${obj.userid}'`
              // 查询值，注意加上单引号
            );
            formatAppLog("log", "at components/GoodItem/GoodItem.vue:185", "result: ", result1);
            this.Persons.push(...result1);
          } catch (error2) {
            formatAppLog("error", "at components/GoodItem/GoodItem.vue:190", "查询用户失败:", error2);
          } finally {
            this.loading = false;
          }
        }
        this.loading = false;
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:197", "Persons: ", this.Persons);
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:198", "loading ", this.loading);
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:199", "GOODITEM-SELECTBILLUSER-END");
      },
      editPer() {
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:203", "触发增加人员");
        this.$emit("edit-per", this.index);
      },
      deleteSelf() {
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:207", this.index);
        this.$emit("delete-item", this.index);
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_collapse_item = resolveEasycom(vue.resolveDynamicComponent("uni-collapse-item"), __easycom_0$3);
    const _component_uni_collapse = resolveEasycom(vue.resolveDynamicComponent("uni-collapse"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" 卡片 "),
        vue.createElementVNode(
          "view",
          {
            class: "Item-container",
            style: vue.normalizeStyle({ height: $data.contentHeight })
          },
          [
            vue.createElementVNode("view", { class: "card" }, [
              vue.createElementVNode("view", { class: "top-bar" }, [
                vue.createElementVNode("view", { style: { "font-size": "25rpx", "width": "200rpx" } }, "名称"),
                vue.createElementVNode("view", { style: { "font-size": "25rpx", "width": "200rpx" } }, "数量"),
                vue.createElementVNode("view", { style: { "font-size": "25rpx", "width": "120rpx" } }, "价格"),
                vue.createElementVNode("image", {
                  onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleModal && $options.toggleModal(...args)),
                  src: _imports_0$1,
                  class: "set-info"
                })
              ]),
              vue.createElementVNode("view", { class: "top-bar bot-bar" }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "input-item name",
                    style: { "font-size": "25rpx", "width": "200rpx" }
                  },
                  vue.toDisplayString($props.showData.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: "input-item cnt",
                    style: { "font-size": "25rpx", "width": "200rpx" }
                  },
                  vue.toDisplayString($props.showData.cnt),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: "input-item price",
                    style: { "font-size": "25rpx", "width": "120rpx" }
                  },
                  vue.toDisplayString($props.showData.price),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("image", {
                  onClick: _cache[1] || (_cache[1] = (...args) => $options.deleteSelf && $options.deleteSelf(...args)),
                  src: _imports_0,
                  class: "set-info"
                })
              ]),
              vue.createVNode(_component_uni_collapse, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_collapse_item, {
                    class: "showPer",
                    title: "查看人员",
                    onClick: $options.toggleCollapse
                  }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("view", { class: "content" }, [
                        $data.loading ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, "加载中...")) : $data.Persons.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, "暂无人员")) : vue.createCommentVNode("v-if", true),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($data.Persons, (person, index2) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "view",
                              {
                                key: index2,
                                class: "list-item"
                              },
                              vue.toDisplayString(person.name),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick"])
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ],
          4
          /* STYLE */
        ),
        vue.createCommentVNode(" 弹窗编辑部分 "),
        $data.showModal ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "modal"
        }, [
          vue.createElementVNode("view", { class: "modal-content" }, [
            vue.createElementVNode("view", { class: "modal-header" }, [
              vue.createElementVNode("text", null, "填写内容"),
              vue.createElementVNode("view", {
                class: "close-button",
                onClick: _cache[2] || (_cache[2] = (...args) => $options.toggleModal && $options.toggleModal(...args))
              }, "×")
            ]),
            vue.createCommentVNode(" 表单内容 "),
            vue.createElementVNode(
              "form",
              {
                onSubmit: _cache[8] || (_cache[8] = vue.withModifiers((...args) => $options.submitForm && $options.submitForm(...args), ["prevent"]))
              },
              [
                vue.createElementVNode("view", { class: "form-group" }, [
                  vue.createElementVNode("text", null, "名称："),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      type: "text",
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.formData.name = $event),
                      placeholder: "请输入名称"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.formData.name]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form-group" }, [
                  vue.createElementVNode("text", null, "数量："),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      type: "number",
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.formData.cnt = $event),
                      placeholder: "请输入数量"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.formData.cnt]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form-group" }, [
                  vue.createElementVNode("text", null, "价格："),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      type: "number",
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.formData.price = $event),
                      placeholder: "请输入价格"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.formData.price]
                  ])
                ]),
                vue.createElementVNode("button", {
                  type: "button",
                  onClick: _cache[6] || (_cache[6] = (...args) => $options.submitForm && $options.submitForm(...args)),
                  class: "submit-button"
                }, "提交"),
                vue.createElementVNode("button", {
                  type: "button",
                  onClick: _cache[7] || (_cache[7] = (...args) => $options.editPer && $options.editPer(...args)),
                  class: "submit-button",
                  style: { "margin-top": "20rpx" }
                }, "增加人员")
              ],
              32
              /* NEED_HYDRATION */
            )
          ])
        ])) : vue.createCommentVNode("v-if", true)
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-c7245072"], ["__file", "D:/uni/travel-new/components/GoodItem/GoodItem.vue"]]);
  const _sfc_main$e = {
    name: "uniTh",
    options: {
      virtualHost: true
    },
    components: {},
    emits: ["sort-change", "filter-change"],
    props: {
      width: {
        type: [String, Number],
        default: ""
      },
      align: {
        type: String,
        default: "left"
      },
      rowspan: {
        type: [Number, String],
        default: 1
      },
      colspan: {
        type: [Number, String],
        default: 1
      },
      sortable: {
        type: Boolean,
        default: false
      },
      filterType: {
        type: String,
        default: ""
      },
      filterData: {
        type: Array,
        default() {
          return [];
        }
      },
      filterDefaultValue: {
        type: [Array, String],
        default() {
          return "";
        }
      }
    },
    data() {
      return {
        border: false,
        ascending: false,
        descending: false
      };
    },
    computed: {
      // 根据props中的width属性 自动匹配当前th的宽度(px)
      customWidth() {
        if (typeof this.width === "number") {
          return this.width;
        } else if (typeof this.width === "string") {
          let regexHaveUnitPx = new RegExp(/^[1-9][0-9]*px$/g);
          let regexHaveUnitRpx = new RegExp(/^[1-9][0-9]*rpx$/g);
          let regexHaveNotUnit = new RegExp(/^[1-9][0-9]*$/g);
          if (this.width.match(regexHaveUnitPx) !== null) {
            return this.width.replace("px", "");
          } else if (this.width.match(regexHaveUnitRpx) !== null) {
            let numberRpx = Number(this.width.replace("rpx", ""));
            let widthCoe = uni.getSystemInfoSync().screenWidth / 750;
            return Math.round(numberRpx * widthCoe);
          } else if (this.width.match(regexHaveNotUnit) !== null) {
            return this.width;
          } else {
            return "";
          }
        } else {
          return "";
        }
      },
      contentAlign() {
        let align = "left";
        switch (this.align) {
          case "left":
            align = "flex-start";
            break;
          case "center":
            align = "center";
            break;
          case "right":
            align = "flex-end";
            break;
        }
        return align;
      }
    },
    created() {
      this.root = this.getTable("uniTable");
      this.rootTr = this.getTable("uniTr");
      this.rootTr.minWidthUpdate(this.customWidth ? this.customWidth : 140);
      this.border = this.root.border;
      this.root.thChildren.push(this);
    },
    methods: {
      sort() {
        if (!this.sortable)
          return;
        this.clearOther();
        if (!this.ascending && !this.descending) {
          this.ascending = true;
          this.$emit("sort-change", { order: "ascending" });
          return;
        }
        if (this.ascending && !this.descending) {
          this.ascending = false;
          this.descending = true;
          this.$emit("sort-change", { order: "descending" });
          return;
        }
        if (!this.ascending && this.descending) {
          this.ascending = false;
          this.descending = false;
          this.$emit("sort-change", { order: null });
        }
      },
      ascendingFn() {
        this.clearOther();
        this.ascending = !this.ascending;
        this.descending = false;
        this.$emit("sort-change", { order: this.ascending ? "ascending" : null });
      },
      descendingFn() {
        this.clearOther();
        this.descending = !this.descending;
        this.ascending = false;
        this.$emit("sort-change", { order: this.descending ? "descending" : null });
      },
      clearOther() {
        this.root.thChildren.map((item) => {
          if (item !== this) {
            item.ascending = false;
            item.descending = false;
          }
          return item;
        });
      },
      ondropdown(e) {
        this.$emit("filter-change", e);
      },
      /**
       * 获取父元素实例
       */
      getTable(name) {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-table-th", { "table--border": $data.border }]),
        style: vue.normalizeStyle({ width: $options.customWidth + "px", "text-align": $props.align })
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-bf970acd"], ["__file", "D:/uni/travel-new/uni_modules/uni-table/components/uni-th/uni-th.vue"]]);
  const _sfc_main$d = {
    name: "TableCheckbox",
    emits: ["checkboxSelected"],
    props: {
      indeterminate: {
        type: Boolean,
        default: false
      },
      checked: {
        type: [Boolean, String],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        default: -1
      },
      cellData: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    watch: {
      checked(newVal) {
        if (typeof this.checked === "boolean") {
          this.isChecked = newVal;
        } else {
          this.isChecked = true;
        }
      },
      indeterminate(newVal) {
        this.isIndeterminate = newVal;
      }
    },
    data() {
      return {
        isChecked: false,
        isDisabled: false,
        isIndeterminate: false
      };
    },
    created() {
      if (typeof this.checked === "boolean") {
        this.isChecked = this.checked;
      }
      this.isDisabled = this.disabled;
    },
    methods: {
      selected() {
        if (this.isDisabled)
          return;
        this.isIndeterminate = false;
        this.isChecked = !this.isChecked;
        this.$emit("checkboxSelected", {
          checked: this.isChecked,
          data: this.cellData
        });
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uni-table-checkbox",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.selected && $options.selected(...args))
    }, [
      !$props.indeterminate ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["checkbox__inner", { "is-checked": $data.isChecked, "is-disable": $data.isDisabled }])
        },
        [
          vue.createElementVNode("view", { class: "checkbox__inner-icon" })
        ],
        2
        /* CLASS */
      )) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "checkbox__inner checkbox--indeterminate"
      }, [
        vue.createElementVNode("view", { class: "checkbox__inner-icon" })
      ]))
    ]);
  }
  const tableCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-25e435b1"], ["__file", "D:/uni/travel-new/uni_modules/uni-table/components/uni-tr/table-checkbox.vue"]]);
  const _sfc_main$c = {
    name: "uniTr",
    components: {
      tableCheckbox
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      keyValue: {
        type: [String, Number],
        default: ""
      }
    },
    options: {
      virtualHost: true
    },
    data() {
      return {
        value: false,
        border: false,
        selection: false,
        widthThArr: [],
        ishead: true,
        checked: false,
        indeterminate: false
      };
    },
    created() {
      this.root = this.getTable();
      this.head = this.getTable("uniThead");
      if (this.head) {
        this.ishead = false;
        this.head.init(this);
      }
      this.border = this.root.border;
      this.selection = this.root.type;
      this.root.trChildren.push(this);
      const rowData = this.root.data.find((v) => v[this.root.rowKey] === this.keyValue);
      if (rowData) {
        this.rowData = rowData;
      }
      this.root.isNodata();
    },
    mounted() {
      if (this.widthThArr.length > 0) {
        const selectionWidth = this.selection === "selection" ? 50 : 0;
        this.root.minWidth = Number(this.widthThArr.reduce((a, b) => Number(a) + Number(b))) + selectionWidth;
      }
    },
    unmounted() {
      const index2 = this.root.trChildren.findIndex((i) => i === this);
      this.root.trChildren.splice(index2, 1);
      this.root.isNodata();
    },
    methods: {
      minWidthUpdate(width) {
        this.widthThArr.push(width);
        if (this.widthThArr.length > 0) {
          const selectionWidth = this.selection === "selection" ? 50 : 0;
          this.root.minWidth = Number(this.widthThArr.reduce((a, b) => Number(a) + Number(b))) + selectionWidth;
        }
      },
      // 选中
      checkboxSelected(e) {
        let rootData = this.root.data.find((v) => v[this.root.rowKey] === this.keyValue);
        this.checked = e.checked;
        this.root.check(rootData || this, e.checked, rootData ? this.keyValue : null);
      },
      change(e) {
        this.root.trChildren.forEach((item) => {
          if (item === this) {
            this.root.check(this, e.detail.value.length > 0 ? true : false);
          }
        });
      },
      /**
       * 获取父元素实例
       */
      getTable(name = "uniTable") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_table_checkbox = vue.resolveComponent("table-checkbox");
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-table-tr" }, [
      $data.selection === "selection" ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["checkbox", { "tr-table--border": $data.border }])
        },
        [
          vue.createVNode(_component_table_checkbox, {
            checked: $data.checked,
            indeterminate: $data.indeterminate,
            disabled: $props.disabled,
            onCheckboxSelected: $options.checkboxSelected
          }, null, 8, ["checked", "indeterminate", "disabled", "onCheckboxSelected"])
        ],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]);
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-b48b3e32"], ["__file", "D:/uni/travel-new/uni_modules/uni-table/components/uni-tr/uni-tr.vue"]]);
  const _sfc_main$b = {
    name: "uniTd",
    options: {
      virtualHost: true
    },
    props: {
      width: {
        type: [String, Number],
        default: ""
      },
      align: {
        type: String,
        default: "left"
      },
      rowspan: {
        type: [Number, String],
        default: 1
      },
      colspan: {
        type: [Number, String],
        default: 1
      }
    },
    data() {
      return {
        border: false
      };
    },
    created() {
      this.root = this.getTable();
      this.border = this.root.border;
    },
    methods: {
      /**
       * 获取父元素实例
       */
      getTable() {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== "uniTable") {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(` :class="{'table--border':border}"  `),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-table-td", { "table--border": $data.border }]),
            style: vue.normalizeStyle({ width: $props.width + "px", "text-align": $props.align })
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-edae4802"], ["__file", "D:/uni/travel-new/uni_modules/uni-table/components/uni-td/uni-td.vue"]]);
  const _sfc_main$a = {
    name: "uniTable",
    options: {
      virtualHost: true
    },
    emits: ["selection-change"],
    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      // 是否有竖线
      border: {
        type: Boolean,
        default: false
      },
      // 是否显示斑马线
      stripe: {
        type: Boolean,
        default: false
      },
      // 多选
      type: {
        type: String,
        default: ""
      },
      // 没有更多数据
      emptyText: {
        type: String,
        default: "没有更多数据"
      },
      loading: {
        type: Boolean,
        default: false
      },
      rowKey: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        noData: true,
        minWidth: 0,
        multiTableHeads: []
      };
    },
    watch: {
      loading(val) {
      },
      data(newVal) {
        this.theadChildren;
        if (this.theadChildren) {
          this.theadChildren.rowspan;
        }
        this.noData = false;
      }
    },
    created() {
      this.trChildren = [];
      this.thChildren = [];
      this.theadChildren = null;
      this.backData = [];
      this.backIndexData = [];
    },
    methods: {
      isNodata() {
        this.theadChildren;
        let rowspan = 1;
        if (this.theadChildren) {
          rowspan = this.theadChildren.rowspan;
        }
        this.noData = this.trChildren.length - rowspan <= 0;
      },
      /**
       * 选中所有
       */
      selectionAll() {
        let startIndex = 1;
        let theadChildren = this.theadChildren;
        if (!this.theadChildren) {
          theadChildren = this.trChildren[0];
        } else {
          startIndex = theadChildren.rowspan - 1;
        }
        let isHaveData = this.data && this.data.length > 0;
        theadChildren.checked = true;
        theadChildren.indeterminate = false;
        this.trChildren.forEach((item, index2) => {
          if (!item.disabled) {
            item.checked = true;
            if (isHaveData && item.keyValue) {
              const row = this.data.find((v) => v[this.rowKey] === item.keyValue);
              if (!this.backData.find((v) => v[this.rowKey] === row[this.rowKey])) {
                this.backData.push(row);
              }
            }
            if (index2 > startIndex - 1 && this.backIndexData.indexOf(index2 - startIndex) === -1) {
              this.backIndexData.push(index2 - startIndex);
            }
          }
        });
        this.$emit("selection-change", {
          detail: {
            value: this.backData,
            index: this.backIndexData
          }
        });
      },
      /**
       * 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
       */
      toggleRowSelection(row, selected) {
        row = [].concat(row);
        formatAppLog("log", "at uni_modules/uni-table/components/uni-table/uni-table.vue:170", "row: " + row);
        this.trChildren.forEach((item, index2) => {
          const select = row.findIndex((v) => {
            if (typeof v === "number") {
              return v === index2 - 1;
            } else {
              return v[this.rowKey] === item.keyValue;
            }
          });
          let ischeck = item.checked;
          if (select !== -1) {
            if (typeof selected === "boolean") {
              item.checked = selected;
            } else {
              item.checked = !item.checked;
            }
            if (ischeck !== item.checked) {
              this.check(
                item.rowData || item,
                item.checked,
                item.rowData ? item.keyValue : null,
                true
              );
            }
          }
        });
        this.$emit("selection-change", {
          detail: {
            value: this.backData,
            index: this.backIndexData
          }
        });
      },
      /**
       * 用于多选表格，清空用户的选择
       */
      clearSelection() {
        let theadChildren = this.theadChildren;
        if (!this.theadChildren) {
          theadChildren = this.trChildren[0];
        }
        theadChildren.checked = false;
        theadChildren.indeterminate = false;
        this.trChildren.forEach((item) => {
          item.checked = false;
        });
        this.backData = [];
        this.backIndexData = [];
        this.$emit("selection-change", {
          detail: {
            value: [],
            index: []
          }
        });
      },
      /**
       * 用于多选表格，切换所有行的选中状态
       */
      toggleAllSelection() {
        let list = [];
        let startIndex = 1;
        let theadChildren = this.theadChildren;
        if (!this.theadChildren) {
          theadChildren = this.trChildren[0];
        } else {
          startIndex = theadChildren.rowspan - 1;
        }
        this.trChildren.forEach((item, index2) => {
          if (!item.disabled) {
            if (index2 > startIndex - 1) {
              list.push(index2 - startIndex);
            }
          }
        });
        this.toggleRowSelection(list);
      },
      /**
       * 选中\取消选中
       * @param {Object} child
       * @param {Object} check
       * @param {Object} rowValue
       */
      check(child, check, keyValue, emit) {
        let theadChildren = this.theadChildren;
        if (!this.theadChildren) {
          theadChildren = this.trChildren[0];
        }
        let childDomIndex = this.trChildren.findIndex((item, index2) => child === item);
        if (childDomIndex < 0) {
          childDomIndex = this.data.findIndex((v) => v[this.rowKey] === keyValue) + 1;
        }
        this.trChildren.filter((v) => !v.disabled && v.keyValue).length;
        if (childDomIndex === 0) {
          check ? this.selectionAll() : this.clearSelection();
          return;
        }
        if (check) {
          if (keyValue) {
            this.backData.push(child);
          }
          this.backIndexData.push(childDomIndex - 1);
        } else {
          const index2 = this.backData.findIndex((v) => v[this.rowKey] === keyValue);
          const idx = this.backIndexData.findIndex((item) => item === childDomIndex - 1);
          if (keyValue) {
            this.backData.splice(index2, 1);
          }
          this.backIndexData.splice(idx, 1);
        }
        const domCheckAll = this.trChildren.find((item, index2) => index2 > 0 && !item.checked && !item.disabled);
        if (!domCheckAll) {
          theadChildren.indeterminate = false;
          theadChildren.checked = true;
        } else {
          theadChildren.indeterminate = true;
          theadChildren.checked = false;
        }
        if (this.backIndexData.length === 0) {
          theadChildren.indeterminate = false;
        }
        if (!emit) {
          this.$emit("selection-change", {
            detail: {
              value: this.backData,
              index: this.backIndexData
            }
          });
        }
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-table-scroll", { "table--border": $props.border, "border-none": !$data.noData }])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-table", { "table--stripe": $props.stripe }]),
            style: vue.normalizeStyle({ "min-width": $data.minWidth + "px" })
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
            $data.noData ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "uni-table-loading"
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["uni-table-text", { "empty-border": $props.border }])
                },
                vue.toDisplayString($props.emptyText),
                3
                /* TEXT, CLASS */
              )
            ])) : vue.createCommentVNode("v-if", true),
            $props.loading ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 1,
                class: vue.normalizeClass(["uni-table-mask", { "empty-border": $props.border }])
              },
              [
                vue.createElementVNode("div", { class: "uni-table--loader" })
              ],
              2
              /* CLASS */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-c1ea9b5d"], ["__file", "D:/uni/travel-new/uni_modules/uni-table/components/uni-table/uni-table.vue"]]);
  function selectInformationType(name, aa, bb, cc, dd) {
    if (name !== void 0) {
      if (aa !== void 0 && cc !== void 0) {
        var sql = "select * from " + name + " where " + aa + "=" + bb + " and " + cc + "=" + dd;
      }
      if (aa !== void 0 && cc == void 0) {
        var sql = "select * from " + name + " where " + aa + "=" + bb;
      }
      if (aa == void 0) {
        var sql = "select * from " + name;
      }
      formatAppLog("log", "at common/util/Bill.js:20", sql);
      return new Promise((resolve, reject) => {
        plus.sqlite.selectSql({
          name: "travel",
          sql,
          success(e) {
            resolve(e);
          },
          fail(e) {
            reject(e);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("错误查询");
      });
    }
  }
  function deleteInformationType(name, sol, qq, ww, ee) {
    if (name !== void 0 && sol !== void 0) {
      if (ww !== void 0) {
        var sql = "delete from " + name + " where " + sol + '="' + qq + '" and ' + ww + "=" + ee;
      } else {
        var sql = "delete from " + name + " where " + sol + '="' + qq + '"';
      }
      formatAppLog("log", "at common/util/Bill.js:51", sql);
      return new Promise((resolve, reject) => {
        plus.sqlite.executeSql({
          name: "travel",
          sql,
          success(e) {
            resolve(e);
          },
          fail(e) {
            reject(e);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("错误删除");
      });
    }
  }
  function modifyInformation(obj) {
    formatAppLog("log", "at common/util/Bill.js:75", obj);
    if (obj !== void 0) {
      var b = JSON.stringify(obj) == "{}";
      if (!b) {
        var billid = obj.id || null;
        var projectId = obj.projectId || null;
        var name = obj.name || null;
        var cnt = obj.cnt || null;
        var price = obj.price;
        var sql = 'update Bill set name="' + name + '", cnt="' + cnt + '", price="' + price + '" where projectId="' + projectId + '" and id="' + billid + '"';
        formatAppLog("log", "at common/util/Bill.js:90", sql);
        return new Promise((resolve, reject) => {
          plus.sqlite.executeSql({
            name: "travel",
            sql,
            success(e) {
              resolve(e);
            },
            fail(e) {
              reject(e);
            }
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          reject("错误添加");
        });
      }
    } else {
      return new Promise((resolve, reject) => {
        reject("错误添加");
      });
    }
  }
  function addBill(obj) {
    if (obj !== void 0) {
      var b = JSON.stringify(obj) == "{}";
      if (!b) {
        var billid = obj.billid || null;
        var projectId = obj.projectId || null;
        var name = obj.name || null;
        var cnt = obj.cnt || null;
        var price = obj.price;
        var sql = 'insert into Bill(billid,projectId,name,cnt,price) values("' + billid + '","' + projectId + '","' + name + '","' + cnt + '","' + price + '")';
        formatAppLog("log", "at common/util/Bill.js:133", sql);
        return new Promise((resolve, reject) => {
          plus.sqlite.executeSql({
            name: "travel",
            sql,
            success(e) {
              resolve(e);
            },
            fail(e) {
              reject(e);
            }
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          reject("错误添加");
        });
      }
    } else {
      return new Promise((resolve, reject) => {
        reject("错误添加");
      });
    }
  }
  const Bill = {
    selectInformationType,
    deleteInformationType,
    modifyInformation,
    addBill
  };
  const _sfc_main$9 = {
    components: {
      GoodItem: __easycom_0$2
    },
    data() {
      return {
        projectItems: {
          "11": {}
        },
        projectNames: [],
        projects: [{
          projectName: "默认项目",
          id: 1
        }],
        // 项目名称
        selectedProjectIndex: 0,
        // 当前选中的项目索引
        nextId: 5,
        // 自动递增的 ID
        newProjectName: "",
        showModaleditPer: false,
        showModaledit: false,
        showModalAddProject: false,
        showModalAddBill: false,
        newItemName: "",
        newItemCnt: 1,
        newItemPrice: 0,
        updateProjectName: "",
        AllPerson: [],
        nowBillPerson: [],
        nowBillId: ""
      };
    },
    computed: {
      currentItems() {
        var _a;
        if (!this.projects.length) {
          formatAppLog("warn", "at pages/PayBill/index.vue:152", "当前项目列表为空");
          return [];
        }
        const selectedProject = ((_a = this.projects[this.selectedProjectIndex]) == null ? void 0 : _a.projectName) || "默认项目";
        formatAppLog("log", "at pages/PayBill/index.vue:156", "当前project:" + selectedProject);
        formatAppLog("log", "at pages/PayBill/index.vue:157", "看看账单：" + this.projectItems[selectedProject]);
        uni.setStorageSync(STORAGE_KEYS.CURRENTITEMS, this.projectItems[selectedProject] || []);
        return this.projectItems[selectedProject] || [];
      },
      totalPrice() {
        return this.currentItems.reduce((sum, item) => {
          return sum + Number(item.price);
        }, 0);
      }
    },
    mounted() {
      this.reloadData();
    },
    methods: {
      async reloadData() {
        try {
          formatAppLog("log", "at pages/PayBill/index.vue:179", "重新加载数据...");
          await this.selectProjects();
          await this.updateprojectBill();
          await this.selectAllPer();
          formatAppLog("log", "at pages/PayBill/index.vue:183", "数据重新加载完成");
        } catch (error2) {
          formatAppLog("error", "at pages/PayBill/index.vue:185", "重新加载数据时出错：", error2);
        }
      },
      //选中人员
      selectionChange(selectedRows) {
        formatAppLog("log", "at pages/PayBill/index.vue:190", "选中的行", selectedRows);
        const selectedRow = selectedRows.detail.index || [];
        this.nowBillPerson = selectedRow;
      },
      setDefaultSelection() {
        const selectedUserIds = this.nowBillPerson.map((person) => person.userid);
        formatAppLog("log", "at pages/PayBill/index.vue:198", "selectedUserIds ", selectedUserIds);
        const matchedDetails = this.AllPerson.map((person, index3) => ({
          person,
          index: index3
        })).filter(({
          person
        }) => selectedUserIds.includes(person.id));
        formatAppLog("log", "at pages/PayBill/index.vue:210", "matchedDetails ", matchedDetails);
        const index2 = matchedDetails.map(({
          index: index3
        }) => index3);
        formatAppLog("log", "at pages/PayBill/index.vue:218", "detail ", index2);
        this.$refs.tableRef.toggleRowSelection(index2, true);
      },
      //编辑账单人员
      async selectAllPer() {
        const result = await util.selectInformationType("user");
        formatAppLog("log", "at pages/PayBill/index.vue:226", "找出的AllPerson", result);
        this.AllPerson = result;
        uni.setStorageSync(STORAGE_KEYS.AllPerson, result);
      },
      editPer(index2) {
        this.showModaleditPer = true;
        this.selectAllPer().then(() => this.selectBillUser(index2).then(() => this.setDefaultSelection()));
      },
      async selectBillUser(index2) {
        formatAppLog("log", "at pages/PayBill/index.vue:235", this.currentItems[index2]);
        const result = await BillUser.selectInformationType("BillUser", "Billid", this.currentItems[index2].id);
        formatAppLog("log", "at pages/PayBill/index.vue:237", "当前账单: " + this.currentItems[index2] + "result: ", result);
        this.nowBillId = this.currentItems[index2].id;
        this.nowBillPerson = result;
        formatAppLog("log", "at pages/PayBill/index.vue:240", "nowBillPerson: ", result);
      },
      updateBillUserToDB() {
        formatAppLog("log", "at pages/PayBill/index.vue:244", this.nowBillPerson);
        const result = this.nowBillPerson.map((index2) => this.AllPerson[index2].id);
        formatAppLog("log", "at pages/PayBill/index.vue:248", "选中的用户id:", result);
        formatAppLog("log", "at pages/PayBill/index.vue:249", "当前账单Id:", this.nowBillId);
        const result1 = result.map((userId) => {
          return {
            userid: userId,
            // 用户 id
            billid: this.nowBillId
            // 当前账单 id
          };
        });
        BillUser.deleteInformationType("BillUser", "billid", this.nowBillId);
        formatAppLog("log", "at pages/PayBill/index.vue:259", "选中的用户与账单合成对象:", result1);
        result1.forEach((obj) => {
          BillUser.addUser(obj);
        });
        this.closeModal();
      },
      // 处理项目
      async selectProjects() {
        const result = await project.selectInformationType("project");
        if (result.length > 0)
          this.projects = result;
        formatAppLog("log", "at pages/PayBill/index.vue:270", "SELECTPROJECTS: ", this.projects);
        this.projectNames = this.projects.map(
          (project2) => `${project2.id}: ${project2.projectName}`
        );
        this.selectedProjectIndex = 0;
        formatAppLog("log", "at pages/PayBill/index.vue:275", this.projects);
      },
      handleProjectChange(e) {
        formatAppLog("log", "at pages/PayBill/index.vue:278", "e" + e);
        this.selectedProjectIndex = parseInt(e.detail.value, 10);
        uni.setStorageSync(STORAGE_KEYS.nowproject, this.projects[this.selectedProjectIndex]);
        formatAppLog("log", "at pages/PayBill/index.vue:281", "测试本地缓存", uni.getStorageSync(STORAGE_KEYS.nowproject));
        formatAppLog("log", "at pages/PayBill/index.vue:282", "切换到项目:", this.projects[this.selectedProjectIndex].projectName);
        this.updateprojectBill();
      },
      //更新Item
      handleDelete(index2) {
        this.projects[this.selectedProjectIndex].id;
        formatAppLog("log", "at pages/PayBill/index.vue:288", this.currentItems[index2]);
        Bill.deleteInformationType("Bill", "id", this.currentItems[index2].id).then(() => this.updateprojectBill());
        BillUser.deleteInformationType("BillUser", "Billid", this.currentItems[index2].id);
      },
      handleUpdate(index2, updatedItem) {
        formatAppLog("log", "at pages/PayBill/index.vue:295", "更新索引：", index2, "更新数据：", updatedItem);
        this.projects[this.selectedProjectIndex].projectName;
        Bill.modifyInformation(updatedItem).then(() => this.updateprojectBill());
      },
      //新增project内的items
      handleAdd() {
        this.showModalAddBill = true;
      },
      addBillsToDB() {
        const selectedProjectId = this.projects[this.selectedProjectIndex].id;
        const newItem = {
          billid: this.nextId++,
          projectId: selectedProjectId,
          name: this.newItemName,
          cnt: this.newItemCnt,
          price: this.newItemPrice
        };
        this.addprojectBill(newItem);
      },
      addprojectBill(newItem) {
        Bill.addBill(newItem);
        this.updateprojectBill();
        this.closeModal();
      },
      //更新项目账单
      async updateprojectBill() {
        formatAppLog("log", "at pages/PayBill/index.vue:331", "当前index: " + this.selectedProjectIndex);
        const selectedProjectId = this.projects[this.selectedProjectIndex].id;
        const selectedProject = this.projects[this.selectedProjectIndex].projectName;
        formatAppLog("log", "at pages/PayBill/index.vue:334", "当前projects:", this.projects);
        const result = await Bill.selectInformationType("Bill", "projectId", selectedProjectId);
        formatAppLog("log", "at pages/PayBill/index.vue:336", "更新项目账单： ", result);
        this.projectItems[selectedProject] = result;
      },
      //新增project
      addProject() {
        this.showModalAddProject = true;
      },
      addProjectToDB() {
        const obj = {
          id: 1,
          name: this.newProjectName
        };
        project.addUser(obj);
        this.selectProjects();
        formatAppLog("log", "at pages/PayBill/index.vue:352", "添加新项目:", this.newProjectName);
        this.closeModal();
      },
      closeModal() {
        this.showModalAddBill = false;
        this.showModaledit = false;
        this.newItemCnt = 1;
        this.newItemPrice = 0;
        this.newItemName = "";
        this.showModalAddProject = false;
        this.newProjectName = "";
        this.showModaleditPer = false;
      },
      handleSettle() {
        uni.setStorageSync(STORAGE_KEYS.nowproject, this.projects[this.selectedProjectIndex]);
        formatAppLog("log", "at pages/PayBill/index.vue:368", "当前项目的结算数据:", this.currentItems);
      },
      //编辑项目：生成弹窗，里面可以编辑也可以删除
      editProject() {
        this.showModaledit = true;
      },
      //更新项目
      updateProjectToDB() {
        const selectedProjectId = this.projects[this.selectedProjectIndex].id;
        this.projects[this.selectedProjectIndex].projectName;
        project.modifyInformation("project", "projectName", this.updateProjectName, "id", selectedProjectId);
        this.selectProjects().then(() => this.updateprojectBill());
        this.closeModal();
      },
      //删除项目
      deleteProjectToDB() {
        const selectedProjectId = this.projects[this.selectedProjectIndex].id;
        this.projects[this.selectedProjectIndex].projectName;
        project.deleteInformationType("project", "id", selectedProjectId);
        this.currentItems.forEach((obj) => {
          BillUser.deleteInformationType("BillUser", "billid", obj.id);
        });
        Bill.deleteInformationType("Bill", "projectId", selectedProjectId);
        this.selectProjects().then(() => this.updateprojectBill());
        this.closeModal();
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    var _a;
    const _component_GoodItem = resolveEasycom(vue.resolveDynamicComponent("GoodItem"), __easycom_0$2);
    const _component_uni_th = resolveEasycom(vue.resolveDynamicComponent("uni-th"), __easycom_1$2);
    const _component_uni_tr = resolveEasycom(vue.resolveDynamicComponent("uni-tr"), __easycom_2$1);
    const _component_uni_td = resolveEasycom(vue.resolveDynamicComponent("uni-td"), __easycom_3$1);
    const _component_uni_table = resolveEasycom(vue.resolveDynamicComponent("uni-table"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "main-container" }, [
      vue.createCommentVNode(" 顶部选择框和添加按钮 "),
      vue.createElementVNode("view", { class: "select-container" }, [
        $data.projects.length > 0 ? (vue.openBlock(), vue.createElementBlock("picker", {
          key: 0,
          value: $data.selectedProjectIndex,
          range: $data.projectNames,
          onChange: _cache[0] || (_cache[0] = (...args) => $options.handleProjectChange && $options.handleProjectChange(...args))
        }, [
          vue.createElementVNode(
            "view",
            { class: "picker" },
            " 当前项目：" + vue.toDisplayString(((_a = $data.projects[$data.selectedProjectIndex]) == null ? void 0 : _a.projectName) || " ss"),
            1
            /* TEXT */
          )
        ], 40, ["value", "range"])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("button", {
          class: "add-project-button",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.addProject && $options.addProject(...args))
        }, "新增项目"),
        vue.createElementVNode("button", {
          class: "add-project-button",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.editProject && $options.editProject(...args))
        }, "编辑项目")
      ]),
      vue.createElementVNode("view", { class: "total-price" }, [
        vue.createElementVNode("view", null, " 总价： "),
        vue.createElementVNode(
          "view",
          null,
          vue.toDisplayString($options.totalPrice),
          1
          /* TEXT */
        )
      ]),
      vue.createCommentVNode(" 列表 "),
      vue.createElementVNode("view", { class: "item-container" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($options.currentItems, (item, idx) => {
            return vue.openBlock(), vue.createBlock(_component_GoodItem, {
              key: item.id,
              index: idx,
              showData: item,
              onDeleteItem: $options.handleDelete,
              onUpdateItem: $options.handleUpdate,
              onEditPer: $options.editPer
            }, null, 8, ["index", "showData", "onDeleteItem", "onUpdateItem", "onEditPer"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" 底部固定按钮 "),
      vue.createElementVNode("view", { class: "fixed-button-container" }, [
        vue.createElementVNode("view", {
          class: "fixed-button",
          onClick: _cache[3] || (_cache[3] = (...args) => $options.handleSettle && $options.handleSettle(...args))
        }, "结算"),
        vue.createElementVNode("view", {
          class: "add-button",
          onClick: _cache[4] || (_cache[4] = (...args) => $options.handleAdd && $options.handleAdd(...args))
        }, "记一笔")
      ]),
      vue.createCommentVNode(" 弹窗 "),
      $data.showModalAddProject ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "modal-overlay"
      }, [
        vue.createElementVNode("view", { class: "modal-content" }, [
          vue.createElementVNode("view", { class: "modal-header" }, "添加项目"),
          vue.createElementVNode("view", { class: "modal-body" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "input",
                type: "text",
                placeholder: "请输入项目名称",
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.newProjectName = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.newProjectName]
            ])
          ]),
          vue.createElementVNode("view", { class: "modal-footer" }, [
            vue.createElementVNode("button", {
              class: "btn",
              onClick: _cache[6] || (_cache[6] = (...args) => $options.addProjectToDB && $options.addProjectToDB(...args))
            }, "确认"),
            vue.createElementVNode("button", {
              class: "btn",
              onClick: _cache[7] || (_cache[7] = (...args) => $options.closeModal && $options.closeModal(...args))
            }, "取消")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 新增账单 "),
      $data.showModalAddBill ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "modal-overlay"
      }, [
        vue.createElementVNode("view", { class: "modal-content" }, [
          vue.createElementVNode("view", { class: "modal-header" }, "添加账目"),
          vue.createElementVNode("view", { class: "modal-body" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "input",
                type: "text",
                placeholder: "请输入名称",
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.newItemName = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.newItemName]
            ]),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "input",
                type: "text",
                placeholder: "请输入数量",
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.newItemCnt = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.newItemCnt]
            ]),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "input",
                type: "text",
                placeholder: "请输入价格",
                "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.newItemPrice = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.newItemPrice]
            ])
          ]),
          vue.createElementVNode("view", { class: "modal-footer" }, [
            vue.createElementVNode("button", {
              class: "btn",
              onClick: _cache[11] || (_cache[11] = (...args) => $options.addBillsToDB && $options.addBillsToDB(...args))
            }, "确认"),
            vue.createElementVNode("button", {
              class: "btn",
              onClick: _cache[12] || (_cache[12] = (...args) => $options.closeModal && $options.closeModal(...args))
            }, "取消")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 编辑项目 "),
      $data.showModaledit ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "modal-overlay"
      }, [
        vue.createElementVNode("view", { class: "modal-content" }, [
          vue.createElementVNode("view", { class: "modal-header" }, "添加项目"),
          vue.createElementVNode("view", { class: "modal-body" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "input",
                type: "text",
                placeholder: "请输入项目名称",
                "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $data.updateProjectName = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.updateProjectName]
            ])
          ]),
          vue.createElementVNode("view", { class: "modal-footer" }, [
            vue.createElementVNode("button", {
              class: "btn",
              style: { "background-color": "red" },
              onClick: _cache[14] || (_cache[14] = (...args) => $options.deleteProjectToDB && $options.deleteProjectToDB(...args))
            }, "删除"),
            vue.createElementVNode("button", {
              class: "btn",
              style: {},
              onClick: _cache[15] || (_cache[15] = (...args) => $options.updateProjectToDB && $options.updateProjectToDB(...args))
            }, "确认"),
            vue.createElementVNode("button", {
              class: "btn",
              style: {},
              onClick: _cache[16] || (_cache[16] = (...args) => $options.closeModal && $options.closeModal(...args))
            }, "取消")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 编辑账单人员 "),
      $data.showModaleditPer ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 3,
        class: "modal-overlay"
      }, [
        vue.createElementVNode("view", { class: "modal-content" }, [
          vue.createElementVNode("view", { class: "modal-header" }, "编辑人员"),
          vue.createCommentVNode(" 人员列表 "),
          vue.createVNode(_component_uni_table, {
            ref: "tableRef",
            border: "",
            stripe: "",
            emptyText: "暂无更多数据",
            type: "selection",
            onSelectionChange: $options.selectionChange
          }, {
            default: vue.withCtx(() => [
              vue.createCommentVNode(" 表头行 "),
              vue.createVNode(_component_uni_tr, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_th, { align: "center" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("姓名")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createCommentVNode(" 表格数据行 "),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(this.AllPerson, (item, index2) => {
                  return vue.openBlock(), vue.createBlock(
                    _component_uni_tr,
                    { key: index2 },
                    {
                      default: vue.withCtx(() => [
                        vue.createVNode(
                          _component_uni_td,
                          null,
                          {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(
                                vue.toDisplayString(item.name),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["onSelectionChange"]),
          vue.createElementVNode("view", {
            class: "modal-footer",
            style: { "margin-top": "20rpx" }
          }, [
            vue.createElementVNode("button", {
              class: "btn",
              style: {},
              onClick: _cache[17] || (_cache[17] = (...args) => $options.updateBillUserToDB && $options.updateBillUserToDB(...args))
            }, "确认"),
            vue.createElementVNode("button", {
              class: "btn",
              style: {},
              onClick: _cache[18] || (_cache[18] = (...args) => $options.closeModal && $options.closeModal(...args))
            }, "取消")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesPayBillIndex = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-1fc7d2ef"], ["__file", "D:/uni/travel-new/pages/PayBill/index.vue"]]);
  const _sfc_main$8 = {
    data() {
      return {
        // odb:'',
        dbName: "travel",
        dbPath: "_doc/travel.db",
        dbTable: "user",
        dbIsOpen: false,
        chatText: {
          id: 1,
          fromId: "123",
          toId: "321",
          content: "你好!",
          flag: 1
        },
        project1: {
          id: 1,
          name: "南京"
        }
      };
    },
    onLoad() {
    },
    methods: {
      clearBillUser() {
        BillUser.clear("BillUser").then((result) => {
          uni.showToast({
            title: "数据库清除成功",
            icon: "success",
            duration: 2e3
          });
          formatAppLog("log", "at pages/sql/sql.vue:60", "数据库清除成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "数据库清除失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/sql/sql.vue:68", "数据库清除失败：", error2);
        });
      },
      dropTable() {
        util.dropTable().then((result) => {
          uni.showToast({
            title: "数据库删除成功",
            icon: "success",
            duration: 2e3
          });
          formatAppLog("log", "at pages/sql/sql.vue:78", "表格删除成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "数据库删除失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/sql/sql.vue:86", "表格删除失败：", error2);
        });
      },
      isopenDB() {
        util.openSqlite().then((result) => {
          uni.showToast({
            title: "数据库打开成功",
            icon: "success",
            duration: 2e3
          });
          formatAppLog("log", "at pages/sql/sql.vue:96", "表格创建成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "数据库打开失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/sql/sql.vue:104", "表格创建失败：", error2);
        });
      },
      createBillTable() {
        uni.showToast({
          title: "测试",
          icon: "success",
          duration: 2e3
        });
        util.CreateBillSQL().then((result) => {
          uni.showToast({
            title: "表格创建成功",
            icon: "success",
            duration: 2e3
          });
          formatAppLog("log", "at pages/sql/sql.vue:120", "表格创建成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "表格创建失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/sql/sql.vue:128", "表格创建失败：", error2);
        });
      },
      createBillUserTable() {
        uni.showToast({
          title: "测试",
          icon: "success",
          duration: 2e3
        });
        util.CreateBillUserSQL().then((result) => {
          uni.showToast({
            title: "BillUser表格创建成功",
            icon: "success",
            duration: 2e3
          });
          formatAppLog("log", "at pages/sql/sql.vue:144", "表格创建成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "表格创建失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/sql/sql.vue:152", "表格创建失败：", error2);
        });
      },
      createUserTable() {
        uni.showToast({
          title: "测试",
          icon: "success",
          duration: 2e3
        });
        util.CreateUserSQL().then((result) => {
          uni.showToast({
            title: "BillUser表格创建成功",
            icon: "success",
            duration: 2e3
          });
          formatAppLog("log", "at pages/sql/sql.vue:168", "表格创建成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "表格创建失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/sql/sql.vue:176", "表格创建失败：", error2);
        });
      },
      createProjectTable() {
        uni.showToast({
          title: "测试",
          icon: "success",
          duration: 2e3
        });
        util.CreateProjectSQL().then((result) => {
          uni.showToast({
            title: "Project表格创建成功",
            icon: "success",
            duration: 2e3
          });
          formatAppLog("log", "at pages/sql/sql.vue:192", "Project表格成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "Project表格失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/sql/sql.vue:200", "Project表格失败：", error2);
        });
      },
      updateTable() {
        util.updateTableStructure("Bill", "project", "INTEGER");
      },
      deleteTable() {
        uni.showToast({
          title: "测试",
          icon: "success",
          duration: 2e3
        });
        util.deleteTable("Bill").then((result) => {
          uni.showToast({
            title: "Bill表格删除成功",
            icon: "success",
            duration: 2e3
          });
          formatAppLog("log", "at pages/sql/sql.vue:220", "表格创建成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "表格创建失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/sql/sql.vue:228", "表格创建失败：", error2);
        });
      },
      addproject(id, name) {
        const obj = this.project1;
        project.addUser(obj).then((result) => {
          uni.showToast({
            title: "Project插入成功",
            icon: "success",
            duration: 2e3
          });
          formatAppLog("log", "at pages/sql/sql.vue:239", "Project插入成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "Project插入失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/sql/sql.vue:247", "Project插入失败：", error2);
        });
      },
      selectproject() {
        project.selectInformationType("project").then((result) => {
          uni.showToast({
            title: "Project查询成功",
            icon: "success",
            duration: 2e3
          });
          formatAppLog("log", "at pages/sql/sql.vue:257", "Project查询成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "Project查询失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/sql/sql.vue:265", "Project查询失败：", error2);
        });
      },
      deleteproject() {
        project.deleteInformationType("project").then((result) => {
          uni.showToast({
            title: "Project删除成功",
            icon: "success",
            duration: 2e3
          });
          formatAppLog("log", "at pages/sql/sql.vue:275", "Project删除成功：", result);
        }).catch((error2) => {
          uni.showToast({
            title: "Project删除失败",
            icon: "error",
            duration: 2e3
          });
          formatAppLog("error", "at pages/sql/sql.vue:283", "Project查询失败：", error2);
        });
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "" }, [
      vue.createCommentVNode(" <div>{{odb}}</div> "),
      vue.createElementVNode("div", null, [
        vue.createElementVNode("button", {
          type: "default",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.createBillTable && $options.createBillTable(...args))
        }, "新建Bill库"),
        vue.createElementVNode("button", {
          type: "default",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.isopenDB && $options.isopenDB(...args))
        }, "判断数据库是否打开"),
        vue.createElementVNode("button", {
          type: "default",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.createBillUserTable && $options.createBillUserTable(...args))
        }, "新建BillUser库"),
        vue.createElementVNode("button", {
          type: "default",
          onClick: _cache[3] || (_cache[3] = (...args) => $options.createUserTable && $options.createUserTable(...args))
        }, "新建User库"),
        vue.createElementVNode("button", {
          type: "default",
          onClick: _cache[4] || (_cache[4] = (...args) => $options.createProjectTable && $options.createProjectTable(...args))
        }, "新建Project库"),
        vue.createElementVNode("button", {
          type: "default",
          onClick: _cache[5] || (_cache[5] = (...args) => $options.updateTable && $options.updateTable(...args))
        }, "更新表结构库"),
        vue.createElementVNode("button", {
          type: "default",
          onClick: _cache[6] || (_cache[6] = (...args) => $options.deleteTable && $options.deleteTable(...args))
        }, "删除表"),
        vue.createElementVNode("button", {
          type: "default",
          onClick: _cache[7] || (_cache[7] = (...args) => $options.addproject && $options.addproject(...args))
        }, "插入数据到project"),
        vue.createElementVNode("button", {
          type: "default",
          onClick: _cache[8] || (_cache[8] = (...args) => $options.selectproject && $options.selectproject(...args))
        }, "查询project"),
        vue.createElementVNode("button", {
          type: "default",
          onClick: _cache[9] || (_cache[9] = (...args) => $options.deleteproject && $options.deleteproject(...args))
        }, "删除project"),
        vue.createElementVNode("button", {
          type: "default",
          onClick: _cache[10] || (_cache[10] = ($event) => $options.dropTable())
        }, "删除BillUser"),
        vue.createElementVNode("button", {
          type: "default",
          onClick: _cache[11] || (_cache[11] = ($event) => $options.clearBillUser())
        }, "清除BillUser")
      ])
    ]);
  }
  const PagesSqlSql = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "D:/uni/travel-new/pages/sql/sql.vue"]]);
  const icons = {
    "uicon-level": "",
    "uicon-column-line": "",
    "uicon-checkbox-mark": "",
    "uicon-folder": "",
    "uicon-movie": "",
    "uicon-star-fill": "",
    "uicon-star": "",
    "uicon-phone-fill": "",
    "uicon-phone": "",
    "uicon-apple-fill": "",
    "uicon-chrome-circle-fill": "",
    "uicon-backspace": "",
    "uicon-attach": "",
    "uicon-cut": "",
    "uicon-empty-car": "",
    "uicon-empty-coupon": "",
    "uicon-empty-address": "",
    "uicon-empty-favor": "",
    "uicon-empty-permission": "",
    "uicon-empty-news": "",
    "uicon-empty-search": "",
    "uicon-github-circle-fill": "",
    "uicon-rmb": "",
    "uicon-person-delete-fill": "",
    "uicon-reload": "",
    "uicon-order": "",
    "uicon-server-man": "",
    "uicon-search": "",
    "uicon-fingerprint": "",
    "uicon-more-dot-fill": "",
    "uicon-scan": "",
    "uicon-share-square": "",
    "uicon-map": "",
    "uicon-map-fill": "",
    "uicon-tags": "",
    "uicon-tags-fill": "",
    "uicon-bookmark-fill": "",
    "uicon-bookmark": "",
    "uicon-eye": "",
    "uicon-eye-fill": "",
    "uicon-mic": "",
    "uicon-mic-off": "",
    "uicon-calendar": "",
    "uicon-calendar-fill": "",
    "uicon-trash": "",
    "uicon-trash-fill": "",
    "uicon-play-left": "",
    "uicon-play-right": "",
    "uicon-minus": "",
    "uicon-plus": "",
    "uicon-info": "",
    "uicon-info-circle": "",
    "uicon-info-circle-fill": "",
    "uicon-question": "",
    "uicon-error": "",
    "uicon-close": "",
    "uicon-checkmark": "",
    "uicon-android-circle-fill": "",
    "uicon-android-fill": "",
    "uicon-ie": "",
    "uicon-IE-circle-fill": "",
    "uicon-google": "",
    "uicon-google-circle-fill": "",
    "uicon-setting-fill": "",
    "uicon-setting": "",
    "uicon-minus-square-fill": "",
    "uicon-plus-square-fill": "",
    "uicon-heart": "",
    "uicon-heart-fill": "",
    "uicon-camera": "",
    "uicon-camera-fill": "",
    "uicon-more-circle": "",
    "uicon-more-circle-fill": "",
    "uicon-chat": "",
    "uicon-chat-fill": "",
    "uicon-bag-fill": "",
    "uicon-bag": "",
    "uicon-error-circle-fill": "",
    "uicon-error-circle": "",
    "uicon-close-circle": "",
    "uicon-close-circle-fill": "",
    "uicon-checkmark-circle": "",
    "uicon-checkmark-circle-fill": "",
    "uicon-question-circle-fill": "",
    "uicon-question-circle": "",
    "uicon-share": "",
    "uicon-share-fill": "",
    "uicon-shopping-cart": "",
    "uicon-shopping-cart-fill": "",
    "uicon-bell": "",
    "uicon-bell-fill": "",
    "uicon-list": "",
    "uicon-list-dot": "",
    "uicon-zhihu": "",
    "uicon-zhihu-circle-fill": "",
    "uicon-zhifubao": "",
    "uicon-zhifubao-circle-fill": "",
    "uicon-weixin-circle-fill": "",
    "uicon-weixin-fill": "",
    "uicon-twitter-circle-fill": "",
    "uicon-twitter": "",
    "uicon-taobao-circle-fill": "",
    "uicon-taobao": "",
    "uicon-weibo-circle-fill": "",
    "uicon-weibo": "",
    "uicon-qq-fill": "",
    "uicon-qq-circle-fill": "",
    "uicon-moments-circel-fill": "",
    "uicon-moments": "",
    "uicon-qzone": "",
    "uicon-qzone-circle-fill": "",
    "uicon-baidu-circle-fill": "",
    "uicon-baidu": "",
    "uicon-facebook-circle-fill": "",
    "uicon-facebook": "",
    "uicon-car": "",
    "uicon-car-fill": "",
    "uicon-warning-fill": "",
    "uicon-warning": "",
    "uicon-clock-fill": "",
    "uicon-clock": "",
    "uicon-edit-pen": "",
    "uicon-edit-pen-fill": "",
    "uicon-email": "",
    "uicon-email-fill": "",
    "uicon-minus-circle": "",
    "uicon-minus-circle-fill": "",
    "uicon-plus-circle": "",
    "uicon-plus-circle-fill": "",
    "uicon-file-text": "",
    "uicon-file-text-fill": "",
    "uicon-pushpin": "",
    "uicon-pushpin-fill": "",
    "uicon-grid": "",
    "uicon-grid-fill": "",
    "uicon-play-circle": "",
    "uicon-play-circle-fill": "",
    "uicon-pause-circle-fill": "",
    "uicon-pause": "",
    "uicon-pause-circle": "",
    "uicon-eye-off": "",
    "uicon-eye-off-outline": "",
    "uicon-gift-fill": "",
    "uicon-gift": "",
    "uicon-rmb-circle-fill": "",
    "uicon-rmb-circle": "",
    "uicon-kefu-ermai": "",
    "uicon-server-fill": "",
    "uicon-coupon-fill": "",
    "uicon-coupon": "",
    "uicon-integral": "",
    "uicon-integral-fill": "",
    "uicon-home-fill": "",
    "uicon-home": "",
    "uicon-hourglass-half-fill": "",
    "uicon-hourglass": "",
    "uicon-account": "",
    "uicon-plus-people-fill": "",
    "uicon-minus-people-fill": "",
    "uicon-account-fill": "",
    "uicon-thumb-down-fill": "",
    "uicon-thumb-down": "",
    "uicon-thumb-up": "",
    "uicon-thumb-up-fill": "",
    "uicon-lock-fill": "",
    "uicon-lock-open": "",
    "uicon-lock-opened-fill": "",
    "uicon-lock": "",
    "uicon-red-packet-fill": "",
    "uicon-photo-fill": "",
    "uicon-photo": "",
    "uicon-volume-off-fill": "",
    "uicon-volume-off": "",
    "uicon-volume-fill": "",
    "uicon-volume": "",
    "uicon-red-packet": "",
    "uicon-download": "",
    "uicon-arrow-up-fill": "",
    "uicon-arrow-down-fill": "",
    "uicon-play-left-fill": "",
    "uicon-play-right-fill": "",
    "uicon-rewind-left-fill": "",
    "uicon-rewind-right-fill": "",
    "uicon-arrow-downward": "",
    "uicon-arrow-leftward": "",
    "uicon-arrow-rightward": "",
    "uicon-arrow-upward": "",
    "uicon-arrow-down": "",
    "uicon-arrow-right": "",
    "uicon-arrow-left": "",
    "uicon-arrow-up": "",
    "uicon-skip-back-left": "",
    "uicon-skip-forward-right": "",
    "uicon-rewind-right": "",
    "uicon-rewind-left": "",
    "uicon-arrow-right-double": "",
    "uicon-arrow-left-double": "",
    "uicon-wifi-off": "",
    "uicon-wifi": "",
    "uicon-empty-data": "",
    "uicon-empty-history": "",
    "uicon-empty-list": "",
    "uicon-empty-page": "",
    "uicon-empty-order": "",
    "uicon-man": "",
    "uicon-woman": "",
    "uicon-man-add": "",
    "uicon-man-add-fill": "",
    "uicon-man-delete": "",
    "uicon-man-delete-fill": "",
    "uicon-zh": "",
    "uicon-en": ""
  };
  const defineMixin = (options) => {
    return options;
  };
  const version = "3";
  {
    formatAppLog("log", "at node_modules/uview-plus/libs/config/config.js:5", `
 %c uview-plus V${version} %c https://ijry.github.io/uview-plus/ 

`, "color: #ffffff; background: #3c9cff; padding:5px 0;", "color: #3c9cff;background: #ffffff; padding:5px 0;");
  }
  const config = {
    v: version,
    version,
    // 主题名称
    type: [
      "primary",
      "success",
      "info",
      "error",
      "warning"
    ],
    // 颜色部分，本来可以通过scss的:export导出供js使用，但是奈何nvue不支持
    color: {
      "u-primary": "#2979ff",
      "u-warning": "#ff9900",
      "u-success": "#19be6b",
      "u-error": "#fa3534",
      "u-info": "#909399",
      "u-main-color": "#303133",
      "u-content-color": "#606266",
      "u-tips-color": "#909399",
      "u-light-color": "#c0c4cc",
      "up-primary": "#2979ff",
      "up-warning": "#ff9900",
      "up-success": "#19be6b",
      "up-error": "#fa3534",
      "up-info": "#909399",
      "up-main-color": "#303133",
      "up-content-color": "#606266",
      "up-tips-color": "#909399",
      "up-light-color": "#c0c4cc"
    },
    // 默认单位，可以通过配置为rpx，那么在用于传入组件大小参数为数值时，就默认为rpx
    unit: "px"
  };
  const ActionSheet = {
    // action-sheet组件
    actionSheet: {
      show: false,
      title: "",
      description: "",
      actions: [],
      index: "",
      cancelText: "",
      closeOnClickAction: true,
      safeAreaInsetBottom: true,
      openType: "",
      closeOnClickOverlay: true,
      round: 0,
      wrapMaxHeight: "600px"
    }
  };
  const Album = {
    // album 组件
    album: {
      urls: [],
      keyName: "",
      singleSize: 180,
      multipleSize: 70,
      space: 6,
      singleMode: "scaleToFill",
      multipleMode: "aspectFill",
      maxCount: 9,
      previewFullImage: true,
      rowCount: 3,
      showMore: true,
      autoWrap: false,
      unit: "px",
      stop: true
    }
  };
  const Alert = {
    // alert警告组件
    alert: {
      title: "",
      type: "warning",
      description: "",
      closable: false,
      showIcon: false,
      effect: "light",
      center: false,
      fontSize: 14
    }
  };
  const Avatar = {
    // avatar 组件
    avatar: {
      src: "",
      shape: "circle",
      size: 40,
      mode: "scaleToFill",
      text: "",
      bgColor: "#c0c4cc",
      color: "#ffffff",
      fontSize: 18,
      icon: "",
      mpAvatar: false,
      randomBgColor: false,
      defaultUrl: "",
      colorIndex: "",
      name: ""
    }
  };
  const AvatarGroup = {
    // avatarGroup 组件
    avatarGroup: {
      urls: [],
      maxCount: 5,
      shape: "circle",
      mode: "scaleToFill",
      showMore: true,
      size: 40,
      keyName: "",
      gap: 0.5,
      extraValue: 0
    }
  };
  const Backtop = {
    // backtop组件
    backtop: {
      mode: "circle",
      icon: "arrow-upward",
      text: "",
      duration: 100,
      scrollTop: 0,
      top: 400,
      bottom: 100,
      right: 20,
      zIndex: 9,
      iconStyle: {
        color: "#909399",
        fontSize: "19px"
      }
    }
  };
  const Badge = {
    // 徽标数组件
    badge: {
      isDot: false,
      value: "",
      show: true,
      max: 999,
      type: "error",
      showZero: false,
      bgColor: null,
      color: null,
      shape: "circle",
      numberType: "overflow",
      offset: [],
      inverted: false,
      absolute: false
    }
  };
  const Button = {
    // button组件
    button: {
      hairline: false,
      type: "info",
      size: "normal",
      shape: "square",
      plain: false,
      disabled: false,
      loading: false,
      loadingText: "",
      loadingMode: "spinner",
      loadingSize: 15,
      openType: "",
      formType: "",
      appParameter: "",
      hoverStopPropagation: true,
      lang: "en",
      sessionFrom: "",
      sendMessageTitle: "",
      sendMessagePath: "",
      sendMessageImg: "",
      showMessageCard: false,
      dataName: "",
      throttleTime: 0,
      hoverStartTime: 0,
      hoverStayTime: 200,
      text: "",
      icon: "",
      iconColor: "",
      color: "",
      stop: true
    }
  };
  const Calendar = {
    // calendar 组件
    calendar: {
      title: "日期选择",
      showTitle: true,
      showSubtitle: true,
      mode: "single",
      startText: "开始",
      endText: "结束",
      customList: [],
      color: "#3c9cff",
      minDate: 0,
      maxDate: 0,
      defaultDate: null,
      maxCount: Number.MAX_SAFE_INTEGER,
      // Infinity
      rowHeight: 56,
      formatter: null,
      showLunar: false,
      showMark: true,
      confirmText: "确定",
      confirmDisabledText: "确定",
      show: false,
      closeOnClickOverlay: false,
      readonly: false,
      showConfirm: true,
      maxRange: Number.MAX_SAFE_INTEGER,
      // Infinity
      rangePrompt: "",
      showRangePrompt: true,
      allowSameDay: false,
      round: 0,
      monthNum: 3
    }
  };
  const CarKeyboard = {
    // 车牌号键盘
    carKeyboard: {
      random: false
    }
  };
  const Cell = {
    // cell组件的props
    cell: {
      customClass: "",
      title: "",
      label: "",
      value: "",
      icon: "",
      disabled: false,
      border: true,
      center: false,
      url: "",
      linkType: "navigateTo",
      clickable: false,
      isLink: false,
      required: false,
      arrowDirection: "",
      iconStyle: {},
      rightIconStyle: {},
      rightIcon: "arrow-right",
      titleStyle: {},
      size: "",
      stop: true,
      name: ""
    }
  };
  const CellGroup = {
    // cell-group组件的props
    cellGroup: {
      title: "",
      border: true,
      customStyle: {}
    }
  };
  const Checkbox = {
    // checkbox组件
    checkbox: {
      name: "",
      shape: "",
      size: "",
      checkbox: false,
      disabled: "",
      activeColor: "",
      inactiveColor: "",
      iconSize: "",
      iconColor: "",
      label: "",
      labelSize: "",
      labelColor: "",
      labelDisabled: ""
    }
  };
  const CheckboxGroup = {
    // checkbox-group组件
    checkboxGroup: {
      name: "",
      value: [],
      shape: "square",
      disabled: false,
      activeColor: "#2979ff",
      inactiveColor: "#c8c9cc",
      size: 18,
      placement: "row",
      labelSize: 14,
      labelColor: "#303133",
      labelDisabled: false,
      iconColor: "#ffffff",
      iconSize: 12,
      iconPlacement: "left",
      borderBottom: false
    }
  };
  const CircleProgress = {
    // circleProgress 组件
    circleProgress: {
      percentage: 30
    }
  };
  const Code = {
    // code 组件
    code: {
      seconds: 60,
      startText: "获取验证码",
      changeText: "X秒重新获取",
      endText: "重新获取",
      keepRunning: false,
      uniqueKey: ""
    }
  };
  const CodeInput = {
    // codeInput 组件
    codeInput: {
      adjustPosition: true,
      maxlength: 6,
      dot: false,
      mode: "box",
      hairline: false,
      space: 10,
      value: "",
      focus: false,
      bold: false,
      color: "#606266",
      fontSize: 18,
      size: 35,
      disabledKeyboard: false,
      borderColor: "#c9cacc",
      disabledDot: true
    }
  };
  const Col = {
    // col 组件
    col: {
      span: 12,
      offset: 0,
      justify: "start",
      align: "stretch",
      textAlign: "left"
    }
  };
  const Collapse = {
    // collapse 组件
    collapse: {
      value: null,
      accordion: false,
      border: true
    }
  };
  const CollapseItem = {
    // collapseItem 组件
    collapseItem: {
      title: "",
      value: "",
      label: "",
      disabled: false,
      isLink: true,
      clickable: true,
      border: true,
      align: "left",
      name: "",
      icon: "",
      duration: 300,
      showRight: true
    }
  };
  const ColumnNotice = {
    // columnNotice 组件
    columnNotice: {
      text: "",
      icon: "volume",
      mode: "",
      color: "#f9ae3d",
      bgColor: "#fdf6ec",
      fontSize: 14,
      speed: 80,
      step: false,
      duration: 1500,
      disableTouch: true
    }
  };
  const CountDown = {
    // u-count-down 计时器组件
    countDown: {
      time: 0,
      format: "HH:mm:ss",
      autoStart: true,
      millisecond: false
    }
  };
  const CountTo = {
    // countTo 组件
    countTo: {
      startVal: 0,
      endVal: 0,
      duration: 2e3,
      autoplay: true,
      decimals: 0,
      useEasing: true,
      decimal: ".",
      color: "#606266",
      fontSize: 22,
      bold: false,
      separator: ""
    }
  };
  const DatetimePicker = {
    // datetimePicker 组件
    datetimePicker: {
      show: false,
      popupMode: "bottom",
      showToolbar: true,
      value: "",
      title: "",
      mode: "datetime",
      maxDate: new Date((/* @__PURE__ */ new Date()).getFullYear() + 10, 0, 1).getTime(),
      minDate: new Date((/* @__PURE__ */ new Date()).getFullYear() - 10, 0, 1).getTime(),
      minHour: 0,
      maxHour: 23,
      minMinute: 0,
      maxMinute: 59,
      filter: null,
      formatter: null,
      loading: false,
      itemHeight: 44,
      cancelText: "取消",
      confirmText: "确认",
      cancelColor: "#909193",
      confirmColor: "#3c9cff",
      visibleItemCount: 5,
      closeOnClickOverlay: false,
      defaultIndex: []
    }
  };
  const Divider = {
    // divider组件
    divider: {
      dashed: false,
      hairline: true,
      dot: false,
      textPosition: "center",
      text: "",
      textSize: 14,
      textColor: "#909399",
      lineColor: "#dcdfe6"
    }
  };
  const Empty = {
    // empty组件
    empty: {
      icon: "",
      text: "",
      textColor: "#c0c4cc",
      textSize: 14,
      iconColor: "#c0c4cc",
      iconSize: 90,
      mode: "data",
      width: 160,
      height: 160,
      show: true,
      marginTop: 0
    }
  };
  const Form = {
    // form 组件
    form: {
      model: {},
      rules: {},
      errorType: "message",
      borderBottom: true,
      labelPosition: "left",
      labelWidth: 45,
      labelAlign: "left",
      labelStyle: {}
    }
  };
  const GormItem = {
    // formItem 组件
    formItem: {
      label: "",
      prop: "",
      rules: [],
      borderBottom: "",
      labelPosition: "",
      labelWidth: "",
      rightIcon: "",
      leftIcon: "",
      required: false,
      leftIconStyle: ""
    }
  };
  const Gap = {
    // gap组件
    gap: {
      bgColor: "transparent",
      height: 20,
      marginTop: 0,
      marginBottom: 0,
      customStyle: {}
    }
  };
  const Grid = {
    // grid组件
    grid: {
      col: 3,
      border: false,
      align: "left"
    }
  };
  const GridItem = {
    // grid-item组件
    gridItem: {
      name: null,
      bgColor: "transparent"
    }
  };
  const {
    color: color$3
  } = config;
  const Icon = {
    // icon组件
    icon: {
      name: "",
      color: color$3["u-content-color"],
      size: "16px",
      bold: false,
      index: "",
      hoverClass: "",
      customPrefix: "uicon",
      label: "",
      labelPos: "right",
      labelSize: "15px",
      labelColor: color$3["u-content-color"],
      space: "3px",
      imgMode: "",
      width: "",
      height: "",
      top: 0,
      stop: false
    }
  };
  const Image = {
    // image组件
    image: {
      src: "",
      mode: "aspectFill",
      width: "300",
      height: "225",
      shape: "square",
      radius: 0,
      lazyLoad: true,
      showMenuByLongpress: true,
      loadingIcon: "photo",
      errorIcon: "error-circle",
      showLoading: true,
      showError: true,
      fade: true,
      webp: false,
      duration: 500,
      bgColor: "#f3f4f6"
    }
  };
  const IndexAnchor = {
    // indexAnchor 组件
    indexAnchor: {
      text: "",
      color: "#606266",
      size: 14,
      bgColor: "#dedede",
      height: 32
    }
  };
  const IndexList = {
    // indexList 组件
    indexList: {
      inactiveColor: "#606266",
      activeColor: "#5677fc",
      indexList: [],
      sticky: true,
      customNavHeight: 0,
      safeBottomFix: false
    }
  };
  const Input = {
    // index 组件
    input: {
      value: "",
      type: "text",
      fixed: false,
      disabled: false,
      disabledColor: "#f5f7fa",
      clearable: false,
      password: false,
      maxlength: 140,
      placeholder: null,
      placeholderClass: "input-placeholder",
      placeholderStyle: "color: #c0c4cc",
      showWordLimit: false,
      confirmType: "done",
      confirmHold: false,
      holdKeyboard: false,
      focus: false,
      autoBlur: false,
      disableDefaultPadding: false,
      cursor: -1,
      cursorSpacing: 30,
      selectionStart: -1,
      selectionEnd: -1,
      adjustPosition: true,
      inputAlign: "left",
      fontSize: "15px",
      color: "#303133",
      prefixIcon: "",
      prefixIconStyle: "",
      suffixIcon: "",
      suffixIconStyle: "",
      border: "surround",
      readonly: false,
      shape: "square",
      formatter: null
    }
  };
  const Keyboard = {
    // 键盘组件
    keyboard: {
      mode: "number",
      dotDisabled: false,
      tooltip: true,
      showTips: true,
      tips: "",
      showCancel: true,
      showConfirm: true,
      random: false,
      safeAreaInsetBottom: true,
      closeOnClickOverlay: true,
      show: false,
      overlay: true,
      zIndex: 10075,
      cancelText: "取消",
      confirmText: "确定",
      autoChange: false
    }
  };
  const Line = {
    // line组件
    line: {
      color: "#d6d7d9",
      length: "100%",
      direction: "row",
      hairline: true,
      margin: 0,
      dashed: false
    }
  };
  const LineProgress = {
    // lineProgress 组件
    lineProgress: {
      activeColor: "#19be6b",
      inactiveColor: "#ececec",
      percentage: 0,
      showText: true,
      height: 12
    }
  };
  const {
    color: color$2
  } = config;
  const Link = {
    // link超链接组件props参数
    link: {
      color: color$2["u-primary"],
      fontSize: 15,
      underLine: false,
      href: "",
      mpTips: "链接已复制，请在浏览器打开",
      lineColor: "",
      text: ""
    }
  };
  const List = {
    // list 组件
    list: {
      showScrollbar: false,
      lowerThreshold: 50,
      upperThreshold: 0,
      scrollTop: 0,
      offsetAccuracy: 10,
      enableFlex: false,
      pagingEnabled: false,
      scrollable: true,
      scrollIntoView: "",
      scrollWithAnimation: false,
      enableBackToTop: false,
      height: 0,
      width: 0,
      preLoadScreen: 1
    }
  };
  const ListItem = {
    // listItem 组件
    listItem: {
      anchor: ""
    }
  };
  const {
    color: color$1
  } = config;
  const LoadingIcon = {
    // loading-icon加载中图标组件
    loadingIcon: {
      show: true,
      color: color$1["u-tips-color"],
      textColor: color$1["u-tips-color"],
      vertical: false,
      mode: "spinner",
      size: 24,
      textSize: 15,
      text: "",
      timingFunction: "ease-in-out",
      duration: 1200,
      inactiveColor: ""
    }
  };
  const LoadingPage = {
    // loading-page组件
    loadingPage: {
      loadingText: "正在加载",
      image: "",
      loadingMode: "circle",
      loading: false,
      bgColor: "#ffffff",
      color: "#C8C8C8",
      fontSize: 19,
      iconSize: 28,
      loadingColor: "#C8C8C8",
      zIndex: 10
    }
  };
  const Loadmore = {
    // loadmore 组件
    loadmore: {
      status: "loadmore",
      bgColor: "transparent",
      icon: true,
      fontSize: 14,
      iconSize: 17,
      color: "#606266",
      loadingIcon: "spinner",
      loadmoreText: "加载更多",
      loadingText: "正在加载...",
      nomoreText: "没有更多了",
      isDot: false,
      iconColor: "#b7b7b7",
      marginTop: 10,
      marginBottom: 10,
      height: "auto",
      line: false,
      lineColor: "#E6E8EB",
      dashed: false
    }
  };
  const Modal = {
    // modal 组件
    modal: {
      show: false,
      title: "",
      content: "",
      confirmText: "确认",
      cancelText: "取消",
      showConfirmButton: true,
      showCancelButton: false,
      confirmColor: "#2979ff",
      cancelColor: "#606266",
      buttonReverse: false,
      zoom: true,
      asyncClose: false,
      closeOnClickOverlay: false,
      negativeTop: 0,
      width: "650rpx",
      confirmButtonShape: "",
      contentTextAlign: "left"
    }
  };
  const color = {
    primary: "#3c9cff",
    info: "#909399",
    default: "#909399",
    warning: "#f9ae3d",
    error: "#f56c6c",
    success: "#5ac725",
    mainColor: "#303133",
    contentColor: "#606266",
    tipsColor: "#909399",
    lightColor: "#c0c4cc",
    borderColor: "#e4e7ed"
  };
  const Navbar = {
    // navbar 组件
    navbar: {
      safeAreaInsetTop: true,
      placeholder: false,
      fixed: true,
      border: false,
      leftIcon: "arrow-left",
      leftText: "",
      rightText: "",
      rightIcon: "",
      title: "",
      bgColor: "#ffffff",
      titleWidth: "400rpx",
      height: "44px",
      leftIconSize: 20,
      leftIconColor: color.mainColor,
      autoBack: false,
      titleStyle: ""
    }
  };
  const NoNetwork = {
    // noNetwork
    noNetwork: {
      tips: "哎呀，网络信号丢失",
      zIndex: "",
      image: "data:image/png;base64,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"
    }
  };
  const NoticeBar = {
    // noticeBar
    noticeBar: {
      text: [],
      direction: "row",
      step: false,
      icon: "volume",
      mode: "",
      color: "#f9ae3d",
      bgColor: "#fdf6ec",
      speed: 80,
      fontSize: 14,
      duration: 2e3,
      disableTouch: true,
      url: "",
      linkType: "navigateTo"
    }
  };
  const Notify = {
    // notify组件
    notify: {
      top: 0,
      type: "primary",
      color: "#ffffff",
      bgColor: "",
      message: "",
      duration: 3e3,
      fontSize: 15,
      safeAreaInsetTop: false
    }
  };
  const NumberBox = {
    // 步进器组件
    numberBox: {
      name: "",
      value: 0,
      min: 1,
      max: Number.MAX_SAFE_INTEGER,
      step: 1,
      integer: false,
      disabled: false,
      disabledInput: false,
      asyncChange: false,
      inputWidth: 35,
      showMinus: true,
      showPlus: true,
      decimalLength: null,
      longPress: true,
      color: "#323233",
      buttonSize: 30,
      bgColor: "#EBECEE",
      cursorSpacing: 100,
      disableMinus: false,
      disablePlus: false,
      iconStyle: ""
    }
  };
  const NumberKeyboard = {
    // 数字键盘
    numberKeyboard: {
      mode: "number",
      dotDisabled: false,
      random: false
    }
  };
  const Overlay = {
    // overlay组件
    overlay: {
      show: false,
      zIndex: 10070,
      duration: 300,
      opacity: 0.5
    }
  };
  const Parse = {
    // parse
    parse: {
      copyLink: true,
      errorImg: "",
      lazyLoad: false,
      loadingImg: "",
      pauseVideo: true,
      previewImg: true,
      setTitle: true,
      showImgMenu: true
    }
  };
  const Picker = {
    // picker
    picker: {
      show: false,
      popupMode: "bottom",
      showToolbar: true,
      title: "",
      columns: [],
      loading: false,
      itemHeight: 44,
      cancelText: "取消",
      confirmText: "确定",
      cancelColor: "#909193",
      confirmColor: "#3c9cff",
      visibleItemCount: 5,
      keyName: "text",
      closeOnClickOverlay: false,
      defaultIndex: [],
      immediateChange: true
    }
  };
  const Popup = {
    // popup组件
    popup: {
      show: false,
      overlay: true,
      mode: "bottom",
      duration: 300,
      closeable: false,
      overlayStyle: {},
      closeOnClickOverlay: true,
      zIndex: 10075,
      safeAreaInsetBottom: true,
      safeAreaInsetTop: false,
      closeIconPos: "top-right",
      round: 0,
      zoom: true,
      bgColor: "",
      overlayOpacity: 0.5
    }
  };
  const Radio = {
    // radio组件
    radio: {
      name: "",
      shape: "",
      disabled: "",
      labelDisabled: "",
      activeColor: "",
      inactiveColor: "",
      iconSize: "",
      labelSize: "",
      label: "",
      labelColor: "",
      size: "",
      iconColor: "",
      placement: ""
    }
  };
  const RadioGroup = {
    // radio-group组件
    radioGroup: {
      value: "",
      disabled: false,
      shape: "circle",
      activeColor: "#2979ff",
      inactiveColor: "#c8c9cc",
      name: "",
      size: 18,
      placement: "row",
      label: "",
      labelColor: "#303133",
      labelSize: 14,
      labelDisabled: false,
      iconColor: "#ffffff",
      iconSize: 12,
      borderBottom: false,
      iconPlacement: "left",
      gap: "10px"
    }
  };
  const Rate = {
    // rate组件
    rate: {
      value: 1,
      count: 5,
      disabled: false,
      size: 18,
      inactiveColor: "#b2b2b2",
      activeColor: "#FA3534",
      gutter: 4,
      minCount: 1,
      allowHalf: false,
      activeIcon: "star-fill",
      inactiveIcon: "star",
      touchable: true
    }
  };
  const ReadMore = {
    // readMore
    readMore: {
      showHeight: 400,
      toggle: false,
      closeText: "展开阅读全文",
      openText: "收起",
      color: "#2979ff",
      fontSize: 14,
      textIndent: "2em",
      name: ""
    }
  };
  const Row = {
    // row
    row: {
      gutter: 0,
      justify: "start",
      align: "center"
    }
  };
  const RowNotice = {
    // rowNotice
    rowNotice: {
      text: "",
      icon: "volume",
      mode: "",
      color: "#f9ae3d",
      bgColor: "#fdf6ec",
      fontSize: 14,
      speed: 80
    }
  };
  const ScrollList = {
    // scrollList
    scrollList: {
      indicatorWidth: 50,
      indicatorBarWidth: 20,
      indicator: true,
      indicatorColor: "#f2f2f2",
      indicatorActiveColor: "#3c9cff",
      indicatorStyle: ""
    }
  };
  const Search = {
    // search
    search: {
      shape: "round",
      bgColor: "#f2f2f2",
      placeholder: "请输入关键字",
      clearabled: true,
      focus: false,
      showAction: true,
      actionStyle: {},
      actionText: "搜索",
      inputAlign: "left",
      inputStyle: {},
      disabled: false,
      borderColor: "transparent",
      searchIconColor: "#909399",
      searchIconSize: 22,
      color: "#606266",
      placeholderColor: "#909399",
      searchIcon: "search",
      margin: "0",
      animation: false,
      value: "",
      maxlength: "-1",
      height: 32,
      label: null
    }
  };
  const Section = {
    // u-section组件
    section: {
      title: "",
      subTitle: "更多",
      right: true,
      fontSize: 15,
      bold: true,
      color: "#303133",
      subColor: "#909399",
      showLine: true,
      lineColor: "",
      arrow: true
    }
  };
  const Skeleton = {
    // skeleton
    skeleton: {
      loading: true,
      animate: true,
      rows: 0,
      rowsWidth: "100%",
      rowsHeight: 18,
      title: true,
      titleWidth: "50%",
      titleHeight: 18,
      avatar: false,
      avatarSize: 32,
      avatarShape: "circle"
    }
  };
  const Slider = {
    // slider组件
    slider: {
      value: 0,
      blockSize: 18,
      min: 0,
      max: 100,
      step: 1,
      activeColor: "#2979ff",
      inactiveColor: "#c0c4cc",
      blockColor: "#ffffff",
      showValue: false,
      disabled: false,
      blockStyle: {},
      useNative: false,
      height: "2px"
    }
  };
  const StatusBar = {
    // statusBar
    statusBar: {
      bgColor: "transparent"
    }
  };
  const Steps = {
    // steps组件
    steps: {
      direction: "row",
      current: 0,
      activeColor: "#3c9cff",
      inactiveColor: "#969799",
      activeIcon: "",
      inactiveIcon: "",
      dot: false
    }
  };
  const StepsItem = {
    // steps-item组件
    stepsItem: {
      title: "",
      desc: "",
      iconSize: 17,
      error: false
    }
  };
  const Sticky = {
    // sticky组件
    sticky: {
      offsetTop: 0,
      customNavHeight: 0,
      disabled: false,
      bgColor: "transparent",
      zIndex: "",
      index: ""
    }
  };
  const Subsection = {
    // subsection组件
    subsection: {
      list: [],
      current: 0,
      activeColor: "#3c9cff",
      inactiveColor: "#303133",
      mode: "button",
      fontSize: 12,
      bold: true,
      bgColor: "#eeeeef",
      keyName: "name"
    }
  };
  const SwipeAction = {
    // swipe-action组件
    swipeAction: {
      autoClose: true
    }
  };
  const SwipeActionItem = {
    // swipeActionItem 组件
    swipeActionItem: {
      show: false,
      closeOnClick: true,
      name: "",
      disabled: false,
      threshold: 20,
      autoClose: true,
      options: [],
      duration: 300
    }
  };
  const Swiper = {
    // swiper 组件
    swiper: {
      list: [],
      indicator: false,
      indicatorActiveColor: "#FFFFFF",
      indicatorInactiveColor: "rgba(255, 255, 255, 0.35)",
      indicatorStyle: "",
      indicatorMode: "line",
      autoplay: true,
      current: 0,
      currentItemId: "",
      interval: 3e3,
      duration: 300,
      circular: false,
      previousMargin: 0,
      nextMargin: 0,
      acceleration: false,
      displayMultipleItems: 1,
      easingFunction: "default",
      keyName: "url",
      imgMode: "aspectFill",
      height: 130,
      bgColor: "#f3f4f6",
      radius: 4,
      loading: false,
      showTitle: false
    }
  };
  const SwipterIndicator = {
    // swiperIndicator 组件
    swiperIndicator: {
      length: 0,
      current: 0,
      indicatorActiveColor: "",
      indicatorInactiveColor: "",
      indicatorMode: "line"
    }
  };
  const Switch = {
    // switch
    switch: {
      loading: false,
      disabled: false,
      size: 25,
      activeColor: "#2979ff",
      inactiveColor: "#ffffff",
      value: false,
      activeValue: true,
      inactiveValue: false,
      asyncChange: false,
      space: 0
    }
  };
  const Tabbar = {
    // tabbar
    tabbar: {
      value: null,
      safeAreaInsetBottom: true,
      border: true,
      zIndex: 1,
      activeColor: "#1989fa",
      inactiveColor: "#7d7e80",
      fixed: true,
      placeholder: true
    }
  };
  const TabbarItem = {
    //
    tabbarItem: {
      name: null,
      icon: "",
      badge: null,
      dot: false,
      text: "",
      badgeStyle: "top: 6px;right:2px;"
    }
  };
  const Tabs = {
    //
    tabs: {
      duration: 300,
      list: [],
      lineColor: "#3c9cff",
      activeStyle: {
        color: "#303133"
      },
      inactiveStyle: {
        color: "#606266"
      },
      lineWidth: 20,
      lineHeight: 3,
      lineBgSize: "cover",
      itemStyle: {
        height: "44px"
      },
      scrollable: true,
      current: 0,
      keyName: "name"
    }
  };
  const Tag = {
    // tag 组件
    tag: {
      type: "primary",
      disabled: false,
      size: "medium",
      shape: "square",
      text: "",
      bgColor: "",
      color: "",
      borderColor: "",
      closeColor: "#C6C7CB",
      name: "",
      plainFill: false,
      plain: false,
      closable: false,
      show: true,
      icon: "",
      iconColor: ""
    }
  };
  const Text = {
    // text 组件
    text: {
      type: "",
      show: true,
      text: "",
      prefixIcon: "",
      suffixIcon: "",
      mode: "",
      href: "",
      format: "",
      call: false,
      openType: "",
      bold: false,
      block: false,
      lines: "",
      color: "#303133",
      size: 15,
      iconStyle: {
        fontSize: "15px"
      },
      decoration: "none",
      margin: 0,
      lineHeight: "",
      align: "left",
      wordWrap: "normal"
    }
  };
  const Textarea = {
    // textarea 组件
    textarea: {
      value: "",
      placeholder: "",
      placeholderClass: "textarea-placeholder",
      placeholderStyle: "color: #c0c4cc",
      height: 70,
      confirmType: "done",
      disabled: false,
      count: false,
      focus: false,
      autoHeight: false,
      fixed: false,
      cursorSpacing: 0,
      cursor: "",
      showConfirmBar: true,
      selectionStart: -1,
      selectionEnd: -1,
      adjustPosition: true,
      disableDefaultPadding: false,
      holdKeyboard: false,
      maxlength: 140,
      border: "surround",
      formatter: null
    }
  };
  const Toast = {
    // toast组件
    toast: {
      zIndex: 10090,
      loading: false,
      text: "",
      icon: "",
      type: "",
      loadingMode: "",
      show: "",
      overlay: false,
      position: "center",
      params: {},
      duration: 2e3,
      isTab: false,
      url: "",
      callback: null,
      back: false
    }
  };
  const Toolbar = {
    // toolbar 组件
    toolbar: {
      show: true,
      cancelText: "取消",
      confirmText: "确认",
      cancelColor: "#909193",
      confirmColor: "#3c9cff",
      title: ""
    }
  };
  const Tooltip = {
    // tooltip 组件
    tooltip: {
      text: "",
      copyText: "",
      size: 14,
      color: "#606266",
      bgColor: "transparent",
      direction: "top",
      zIndex: 10071,
      showCopy: true,
      buttons: [],
      overlay: true,
      showToast: true
    }
  };
  const Transition = {
    // transition动画组件的props
    transition: {
      show: false,
      mode: "fade",
      duration: "300",
      timingFunction: "ease-out"
    }
  };
  const Upload = {
    // upload组件
    upload: {
      accept: "image",
      extension: [],
      capture: ["album", "camera"],
      compressed: true,
      camera: "back",
      maxDuration: 60,
      uploadIcon: "camera-fill",
      uploadIconColor: "#D3D4D6",
      useBeforeRead: false,
      previewFullImage: true,
      maxCount: 52,
      disabled: false,
      imageMode: "aspectFill",
      name: "",
      sizeType: ["original", "compressed"],
      multiple: false,
      deletable: true,
      maxSize: Number.MAX_VALUE,
      fileList: [],
      uploadText: "",
      width: 80,
      height: 80,
      previewImage: true
    }
  };
  const props$6 = {
    ...ActionSheet,
    ...Album,
    ...Alert,
    ...Avatar,
    ...AvatarGroup,
    ...Backtop,
    ...Badge,
    ...Button,
    ...Calendar,
    ...CarKeyboard,
    ...Cell,
    ...CellGroup,
    ...Checkbox,
    ...CheckboxGroup,
    ...CircleProgress,
    ...Code,
    ...CodeInput,
    ...Col,
    ...Collapse,
    ...CollapseItem,
    ...ColumnNotice,
    ...CountDown,
    ...CountTo,
    ...DatetimePicker,
    ...Divider,
    ...Empty,
    ...Form,
    ...GormItem,
    ...Gap,
    ...Grid,
    ...GridItem,
    ...Icon,
    ...Image,
    ...IndexAnchor,
    ...IndexList,
    ...Input,
    ...Keyboard,
    ...Line,
    ...LineProgress,
    ...Link,
    ...List,
    ...ListItem,
    ...LoadingIcon,
    ...LoadingPage,
    ...Loadmore,
    ...Modal,
    ...Navbar,
    ...NoNetwork,
    ...NoticeBar,
    ...Notify,
    ...NumberBox,
    ...NumberKeyboard,
    ...Overlay,
    ...Parse,
    ...Picker,
    ...Popup,
    ...Radio,
    ...RadioGroup,
    ...Rate,
    ...ReadMore,
    ...Row,
    ...RowNotice,
    ...ScrollList,
    ...Search,
    ...Section,
    ...Skeleton,
    ...Slider,
    ...StatusBar,
    ...Steps,
    ...StepsItem,
    ...Sticky,
    ...Subsection,
    ...SwipeAction,
    ...SwipeActionItem,
    ...Swiper,
    ...SwipterIndicator,
    ...Switch,
    ...Tabbar,
    ...TabbarItem,
    ...Tabs,
    ...Tag,
    ...Text,
    ...Textarea,
    ...Toast,
    ...Toolbar,
    ...Tooltip,
    ...Transition,
    ...Upload
  };
  const props$5 = defineMixin({
    props: {
      // 图标类名
      name: {
        type: String,
        default: () => props$6.icon.name
      },
      // 图标颜色，可接受主题色
      color: {
        type: String,
        default: () => props$6.icon.color
      },
      // 字体大小，单位px
      size: {
        type: [String, Number],
        default: () => props$6.icon.size
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: () => props$6.icon.bold
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [String, Number],
        default: () => props$6.icon.index
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: () => props$6.icon.hoverClass
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: () => props$6.icon.customPrefix
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: () => props$6.icon.label
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: () => props$6.icon.labelPos
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: () => props$6.icon.labelSize
      },
      // label的颜色
      labelColor: {
        type: String,
        default: () => props$6.icon.labelColor
      },
      // label与图标的距离
      space: {
        type: [String, Number],
        default: () => props$6.icon.space
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: () => props$6.icon.imgMode
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: () => props$6.icon.width
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: () => props$6.icon.height
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: () => props$6.icon.top
      },
      // 是否阻止事件传播
      stop: {
        type: Boolean,
        default: () => props$6.icon.stop
      }
    }
  });
  const mpMixin = defineMixin({});
  function email(value) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
  }
  function mobile(value) {
    return /^1[23456789]\d{9}$/.test(value);
  }
  function url(value) {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value);
  }
  function date(value) {
    if (!value)
      return false;
    if (typeof value === "number") {
      if (value.toString().length !== 10 && value.toString().length !== 13) {
        return false;
      }
      return !isNaN(new Date(value).getTime());
    }
    if (typeof value === "string") {
      const numV = Number(value);
      if (!isNaN(numV)) {
        if (numV.toString().length === 10 || numV.toString().length === 13) {
          return !isNaN(new Date(numV).getTime());
        }
      }
      if (value.length < 10 || value.length > 19) {
        return false;
      }
      const dateRegex = /^\d{4}[-\/]\d{2}[-\/]\d{2}( \d{1,2}:\d{2}(:\d{2})?)?$/;
      if (!dateRegex.test(value)) {
        return false;
      }
      const dateValue = new Date(value);
      return !isNaN(dateValue.getTime());
    }
    return false;
  }
  function dateISO(value) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
  }
  function number(value) {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
  }
  function string(value) {
    return typeof value === "string";
  }
  function digits(value) {
    return /^\d+$/.test(value);
  }
  function idCard(value) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    );
  }
  function carNo(value) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
      return creg.test(value);
    }
    if (value.length === 8) {
      return xreg.test(value);
    }
    return false;
  }
  function amount(value) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
  }
  function chinese(value) {
    const reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value);
  }
  function letter(value) {
    return /^[a-zA-Z]*$/.test(value);
  }
  function enOrNum(value) {
    const reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value);
  }
  function contains(value, param) {
    return value.indexOf(param) >= 0;
  }
  function range$1(value, param) {
    return value >= param[0] && value <= param[1];
  }
  function rangeLength(value, param) {
    return value.length >= param[0] && value.length <= param[1];
  }
  function landline(value) {
    const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value);
  }
  function empty(value) {
    switch (typeof value) {
      case "undefined":
        return true;
      case "string":
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value)
          return true;
        break;
      case "number":
        if (value === 0 || isNaN(value))
          return true;
        break;
      case "object":
        if (value === null || value.length === 0)
          return true;
        for (const i in value) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value) {
    if (typeof value === "string") {
      try {
        const obj = JSON.parse(value);
        if (typeof obj === "object" && obj) {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    }
    return Object.prototype.toString.call(value) === "[object Array]";
  }
  function object(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  function code(value, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value);
  }
  function func(value) {
    return typeof value === "function";
  }
  function promise(value) {
    return object(value) && func(value.then) && func(value.catch);
  }
  function image(value) {
    const newValue = value.split("?")[0];
    const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
    return IMAGE_REGEXP.test(newValue);
  }
  function video(value) {
    const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
    return VIDEO_REGEXP.test(value);
  }
  function regExp(o) {
    return o && Object.prototype.toString.call(o) === "[object RegExp]";
  }
  const test = {
    email,
    mobile,
    url,
    date,
    dateISO,
    number,
    digits,
    idCard,
    carNo,
    amount,
    chinese,
    letter,
    enOrNum,
    contains,
    range: range$1,
    rangeLength,
    empty,
    isEmpty: empty,
    jsonString,
    landline,
    object,
    array,
    code,
    func,
    promise,
    video,
    image,
    regExp,
    string
  };
  function strip(num, precision = 15) {
    return +parseFloat(Number(num).toPrecision(precision));
  }
  function digitLength(num) {
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
  }
  function float2Fixed(num) {
    if (num.toString().indexOf("e") === -1) {
      return Number(num.toString().replace(".", ""));
    }
    const dLen = digitLength(num);
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
  }
  function checkBoundary(num) {
    {
      if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        formatAppLog("warn", "at node_modules/uview-plus/libs/function/digit.js:45", `${num} 超出了精度限制，结果可能不正确`);
      }
    }
  }
  function iteratorOperation(arr, operation) {
    const [num1, num2, ...others] = arr;
    let res = operation(num1, num2);
    others.forEach((num) => {
      res = operation(res, num);
    });
    return res;
  }
  function times(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, times);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    const baseNum = digitLength(num1) + digitLength(num2);
    const leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    return leftValue / Math.pow(10, baseNum);
  }
  function divide(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, divide);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
  }
  function round(num, ratio) {
    const base = Math.pow(10, ratio);
    let result = divide(Math.round(Math.abs(times(num, base))), base);
    if (num < 0 && result !== 0) {
      result = times(result, -1);
    }
    return result;
  }
  function range(min = 0, max = 0, value = 0) {
    return Math.max(min, Math.min(max, Number(value)));
  }
  function getPx(value, unit = false) {
    if (number(value)) {
      return unit ? `${value}px` : Number(value);
    }
    if (/(rpx|upx)$/.test(value)) {
      return unit ? `${uni.upx2px(parseInt(value))}px` : Number(uni.upx2px(parseInt(value)));
    }
    return unit ? `${parseInt(value)}px` : parseInt(value);
  }
  function sleep(value = 30) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, value);
    });
  }
  function os() {
    return uni.getSystemInfoSync().platform.toLowerCase();
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      const gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    }
    return 0;
  }
  function guid(len = 32, firstU = true, radix = null) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    const uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return `u${uuid.join("")}`;
    }
    return uuid.join("");
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      name = name.replace(/up-([a-zA-Z0-9-_]+)/g, "u-$1");
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function addStyle(customStyle, target = "object") {
    if (empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
      return customStyle;
    }
    if (target === "object") {
      customStyle = trim(customStyle);
      const styleArray = customStyle.split(";");
      const style = {};
      for (let i = 0; i < styleArray.length; i++) {
        if (styleArray[i]) {
          const item = styleArray[i].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    if (typeof customStyle === "object") {
      customStyle.forEach((val, i) => {
        const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
        string2 += `${key}:${val};`;
      });
    }
    return trim(string2);
  }
  function addUnit(value = "auto", unit = "") {
    if (!unit) {
      unit = config.unit || "px";
    }
    if (unit == "rpx" && number(String(value))) {
      value = value * 2;
    }
    value = String(value);
    return number(value) ? `${value}${unit}` : value;
  }
  function deepClone(obj) {
    if ([null, void 0, NaN, false].includes(obj))
      return obj;
    if (typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    }
    const o = array(obj) ? [] : {};
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
      }
    }
    return o;
  }
  function deepMerge$1(targetOrigin = {}, source = {}) {
    let target = deepClone(targetOrigin);
    if (typeof target !== "object" || typeof source !== "object")
      return false;
    for (const prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      if (prop in target) {
        if (source[prop] == null) {
          target[prop] = source[prop];
        } else if (typeof target[prop] !== "object") {
          target[prop] = source[prop];
        } else if (typeof source[prop] !== "object") {
          target[prop] = source[prop];
        } else if (target[prop].concat && source[prop].concat) {
          target[prop] = target[prop].concat(source[prop]);
        } else {
          target[prop] = deepMerge$1(target[prop], source[prop]);
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }
  function shallowMerge(target, source = {}) {
    if (typeof target !== "object" || typeof source !== "object")
      return false;
    for (const prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      if (prop in target) {
        if (source[prop] == null) {
          target[prop] = source[prop];
        } else if (typeof target[prop] !== "object") {
          target[prop] = source[prop];
        } else if (typeof source[prop] !== "object") {
          target[prop] = source[prop];
        } else if (target[prop].concat && source[prop].concat) {
          target[prop] = target[prop].concat(source[prop]);
        } else {
          target[prop] = shallowMerge(target[prop], source[prop]);
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }
  function error(err) {
    {
      formatAppLog("error", "at node_modules/uview-plus/libs/function/index.js:279", `uView提示：${err}`);
    }
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]") {
        throw new TypeError(
          "fillString must be String"
        );
      }
      const str = this;
      if (str.length >= maxLength)
        return String(str);
      const fillLength = maxLength - str.length;
      let times2 = Math.ceil(fillLength / fillString.length);
      while (times2 >>= 1) {
        fillString += fillString;
        if (times2 === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, formatStr = "yyyy-mm-dd") {
    let date2;
    if (!dateTime) {
      date2 = /* @__PURE__ */ new Date();
    } else if (/^\d{10}$/.test(dateTime.toString().trim())) {
      date2 = new Date(dateTime * 1e3);
    } else if (typeof dateTime === "string" && /^\d+$/.test(dateTime.trim())) {
      date2 = new Date(Number(dateTime));
    } else {
      date2 = new Date(
        typeof dateTime === "string" ? dateTime.replace(/-/g, "/") : dateTime
      );
    }
    const timeSource = {
      "y": date2.getFullYear().toString(),
      // 年
      "m": (date2.getMonth() + 1).toString().padStart(2, "0"),
      // 月
      "d": date2.getDate().toString().padStart(2, "0"),
      // 日
      "h": date2.getHours().toString().padStart(2, "0"),
      // 时
      "M": date2.getMinutes().toString().padStart(2, "0"),
      // 分
      "s": date2.getSeconds().toString().padStart(2, "0")
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const key in timeSource) {
      const [ret] = new RegExp(`${key}+`).exec(formatStr) || [];
      if (ret) {
        const beginIndex = key === "y" && ret.length === 2 ? 2 : 0;
        formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
      }
    }
    return formatStr;
  }
  function timeFrom(timestamp = null, format = "yyyy-mm-dd") {
    if (timestamp == null)
      timestamp = Number(/* @__PURE__ */ new Date());
    timestamp = parseInt(timestamp);
    if (timestamp.toString().length == 10)
      timestamp *= 1e3;
    let timer = (/* @__PURE__ */ new Date()).getTime() - timestamp;
    timer = parseInt(timer / 1e3);
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = `${parseInt(timer / 60)}分钟前`;
        break;
      case (timer >= 3600 && timer < 86400):
        tips = `${parseInt(timer / 3600)}小时前`;
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = `${parseInt(timer / 86400)}天前`;
        break;
      default:
        if (format === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = `${parseInt(timer / (86400 * 30))}个月前`;
          } else {
            tips = `${parseInt(timer / (86400 * 365))}年前`;
          }
        } else {
          tips = timeFormat(timestamp, format);
        }
    }
    return tips;
  }
  function trim(str, pos = "both") {
    str = String(str);
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    }
    if (pos == "left") {
      return str.replace(/^\s*/, "");
    }
    if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    }
    if (pos == "all") {
      return str.replace(/\s+/g, "");
    }
    return str;
  }
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    const prefix = isPrefix ? "?" : "";
    const _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (const key in data) {
      const value = data[key];
      if (["", void 0, null].indexOf(value) >= 0) {
        continue;
      }
      if (value.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value.length; i++) {
              _result.push(`${key}[${i}]=${value[i]}`);
            }
            break;
          case "brackets":
            value.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
            break;
          case "repeat":
            value.forEach((_value) => {
              _result.push(`${key}=${_value}`);
            });
            break;
          case "comma":
            let commaStr = "";
            value.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(`${key}=${commaStr}`);
            break;
          default:
            value.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
        }
      } else {
        _result.push(`${key}=${value}`);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  function toast(title, duration = 2e3) {
    uni.showToast({
      title: String(title),
      icon: "none",
      duration
    });
  }
  function type2icon(type = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type) == -1)
      type = "success";
    let iconName = "";
    switch (type) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function priceFormat(number2, decimals = 0, decimalPoint = ".", thousandsSeparator = ",") {
    number2 = `${number2}`.replace(/[^0-9+-Ee.]/g, "");
    const n = !isFinite(+number2) ? 0 : +number2;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSeparator === "undefined" ? "," : thousandsSeparator;
    const dec = typeof decimalPoint === "undefined" ? "." : decimalPoint;
    let s = "";
    s = (prec ? round(n, prec) + "" : `${Math.round(n)}`).split(".");
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, `$1${sep}$2`);
    }
    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
  }
  function getDuration(value, unit = true) {
    const valueNum = parseInt(value);
    if (unit) {
      if (/s$/.test(value))
        return value;
      return value > 30 ? `${value}ms` : `${value}s`;
    }
    if (/ms$/.test(value))
      return valueNum;
    if (/s$/.test(value))
      return valueNum > 30 ? valueNum : valueNum * 1e3;
    return valueNum;
  }
  function padZero(value) {
    return `00${value}`.slice(-2);
  }
  function formValidate(instance, event) {
    const formItem = $parent.call(instance, "u-form-item");
    const form = $parent.call(instance, "u-form");
    if (formItem && form) {
      form.validateField(formItem.prop, () => {
      }, event);
    }
  }
  function getProperty(obj, key) {
    if (typeof obj !== "object" || null == obj) {
      return "";
    }
    if (typeof key !== "string" || key === "") {
      return "";
    }
    if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      let firstObj = obj[keys[0]] || {};
      for (let i = 1; i < keys.length; i++) {
        if (firstObj) {
          firstObj = firstObj[keys[i]];
        }
      }
      return firstObj;
    }
    return obj[key];
  }
  function setProperty(obj, key, value) {
    if (typeof obj !== "object" || null == obj) {
      return;
    }
    const inFn = function(_obj, keys, v) {
      if (keys.length === 1) {
        _obj[keys[0]] = v;
        return;
      }
      while (keys.length > 1) {
        const k = keys[0];
        if (!_obj[k] || typeof _obj[k] !== "object") {
          _obj[k] = {};
        }
        keys.shift();
        inFn(_obj[k], keys, v);
      }
    };
    if (typeof key !== "string" || key === "")
      ;
    else if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      inFn(obj, keys, value);
    } else {
      obj[key] = value;
    }
  }
  function page() {
    const pages2 = getCurrentPages();
    return `/${pages2[pages2.length - 1].route || ""}`;
  }
  function pages() {
    const pages2 = getCurrentPages();
    return pages2;
  }
  function getValueByPath(obj, path) {
    const pathArr = path.split(".");
    return pathArr.reduce((acc, curr) => {
      return acc && acc[curr] !== void 0 ? acc[curr] : void 0;
    }, obj);
  }
  const index = {
    range,
    getPx,
    sleep,
    os,
    sys,
    random,
    guid,
    $parent,
    addStyle,
    addUnit,
    deepClone,
    deepMerge: deepMerge$1,
    shallowMerge,
    error,
    randomArray,
    timeFormat,
    timeFrom,
    trim,
    queryParams,
    toast,
    type2icon,
    priceFormat,
    getDuration,
    padZero,
    formValidate,
    getProperty,
    setProperty,
    page,
    pages,
    getValueByPath
    // setConfig
  };
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        // navigateBack页面后退时,回退的层数
        params: {},
        // 传递的参数
        animationType: "pop-in",
        // 窗口动画,只在APP有效
        animationDuration: 300,
        // 窗口动画持续时间,单位毫秒,只在APP有效
        intercept: false
        // 是否需要拦截
      };
      this.route = this.route.bind(this);
    }
    // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    // 整合路由参数
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = queryParams(params, false);
        return url2 += `&${query}`;
      }
      query = queryParams(params);
      return url2 += query;
    }
    // 对外的方法名称
    async route(options = {}, params = {}) {
      let mergeConfig2 = {};
      if (typeof options === "string") {
        mergeConfig2.url = this.mixinParam(options, params);
        mergeConfig2.type = "navigateTo";
      } else {
        mergeConfig2 = deepMerge$1(this.config, options);
        mergeConfig2.url = this.mixinParam(options.url, options.params);
      }
      if (mergeConfig2.url === page())
        return;
      if (params.intercept) {
        this.config.intercept = params.intercept;
      }
      mergeConfig2.params = params;
      mergeConfig2 = deepMerge$1(this.config, mergeConfig2);
      if (typeof uni.$u.routeIntercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          uni.$u.routeIntercept(mergeConfig2, resolve);
        });
        isNext && this.openPage(mergeConfig2);
      } else {
        this.openPage(mergeConfig2);
      }
    }
    // 执行路由跳转
    openPage(config2) {
      const {
        url: url2,
        type,
        delta,
        animationType,
        animationDuration
      } = config2;
      if (config2.type == "navigateTo" || config2.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration
        });
      }
      if (config2.type == "redirectTo" || config2.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config2.type == "switchTab" || config2.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config2.type == "reLaunch" || config2.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config2.type == "navigateBack" || config2.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  const mixin = defineMixin({
    // 定义每个组件都可能需要用到的外部样式以及类名
    props: {
      // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
      customStyle: {
        type: [Object, String],
        default: () => ({})
      },
      customClass: {
        type: String,
        default: ""
      },
      // 跳转的页面路径
      url: {
        type: String,
        default: ""
      },
      // 页面跳转的类型
      linkType: {
        type: String,
        default: "navigateTo"
      }
    },
    data() {
      return {};
    },
    onLoad() {
      this.$u.getRect = this.$uGetRect;
    },
    created() {
      this.$u.getRect = this.$uGetRect;
    },
    computed: {
      // 在2.x版本中，将会把$u挂载到uni对象下，导致在模板中无法使用uni.$u.xxx形式
      // 所以这里通过computed计算属性将其附加到this.$u上，就可以在模板或者js中使用uni.$u.xxx
      // 只在nvue环境通过此方式引入完整的$u，其他平台会出现性能问题，非nvue则按需引入（主要原因是props过大）
      $u() {
        return deepMerge$1(uni.$u, {
          props: void 0,
          http: void 0,
          mixin: void 0
        });
      },
      /**
       * 生成bem规则类名
       * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
       * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
       * @param {String} name 组件名称
       * @param {Array} fixed 一直会存在的类名
       * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
       * @returns {Array|string}
       */
      bem() {
        return function(name, fixed, change) {
          const prefix = `u-${name}--`;
          const classes = {};
          if (fixed) {
            fixed.map((item) => {
              classes[prefix + this[item]] = true;
            });
          }
          if (change) {
            change.map((item) => {
              this[item] ? classes[prefix + item] = this[item] : delete classes[prefix + item];
            });
          }
          return Object.keys(classes);
        };
      }
    },
    methods: {
      // 跳转某一个页面
      openPage(urlKey = "url") {
        const url2 = this[urlKey];
        if (url2) {
          route({ type: this.linkType, url: url2 });
        }
      },
      navTo(url2 = "", linkType = "navigateTo") {
        route({ type: this.linkType, url: url2 });
      },
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = {};
        this.parent = $parent.call(this, parentName);
        if (this.parent.children) {
          this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
        }
        if (this.parent && this.parentData) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
        }
      },
      // 阻止事件冒泡
      preventEvent(e) {
        e && typeof e.stopPropagation === "function" && e.stopPropagation();
      },
      // 空操作
      noop(e) {
        this.preventEvent(e);
      }
    },
    onReachBottom() {
      uni.$emit("uOnReachBottom");
    },
    beforeUnmount() {
      if (this.parent && test.array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index2) => {
          if (child === this) {
            childrenList.splice(index2, 1);
          }
        });
      }
    }
  });
  const _sfc_main$7 = {
    name: "u-icon",
    data() {
      return {};
    },
    emits: ["click"],
    mixins: [mpMixin, mixin, props$5],
    computed: {
      uClasses() {
        let classes = [];
        classes.push(this.customPrefix + "-" + this.name);
        if (this.customPrefix == "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(this.customPrefix);
        }
        if (this.color && config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: addUnit(this.size),
          lineHeight: addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: addUnit(this.top)
        };
        if (this.color && !config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.name.indexOf("/") !== -1;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? addUnit(this.width) : addUnit(this.size);
        style.height = this.height ? addUnit(this.height) : addUnit(this.size);
        return style;
      },
      // 通过图标名，查找对应的图标
      icon() {
        if (this.customPrefix !== "uicon")
          return "";
        return icons["uicon-" + this.name] || this.name;
      }
    },
    methods: {
      addStyle,
      addUnit,
      clickHandler(e) {
        this.$emit("click", this.index);
        this.stop && this.preventEvent(e);
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-icon", ["u-icon--" + _ctx.labelPos]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "u-icon__img",
          src: _ctx.name,
          mode: _ctx.imgMode,
          style: vue.normalizeStyle([$options.imgStyle, $options.addStyle(_ctx.customStyle)])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("text", {
          key: 1,
          class: vue.normalizeClass(["u-icon__icon", $options.uClasses]),
          style: vue.normalizeStyle([$options.iconStyle, $options.addStyle(_ctx.customStyle)]),
          "hover-class": _ctx.hoverClass
        }, vue.toDisplayString($options.icon), 15, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示 '),
        _ctx.label !== "" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "u-icon__label",
            style: vue.normalizeStyle({
              color: _ctx.labelColor,
              fontSize: $options.addUnit(_ctx.labelSize),
              marginLeft: _ctx.labelPos == "right" ? $options.addUnit(_ctx.space) : 0,
              marginTop: _ctx.labelPos == "bottom" ? $options.addUnit(_ctx.space) : 0,
              marginRight: _ctx.labelPos == "left" ? $options.addUnit(_ctx.space) : 0,
              marginBottom: _ctx.labelPos == "top" ? $options.addUnit(_ctx.space) : 0
            })
          },
          vue.toDisplayString(_ctx.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-1c933a9a"], ["__file", "D:/uni/travel-new/node_modules/uview-plus/components/u-icon/u-icon.vue"]]);
  const props$4 = defineMixin({
    props: {
      // 搜索框形状，round-圆形，square-方形
      shape: {
        type: String,
        default: () => props$6.search.shape
      },
      // 搜索框背景色，默认值#f2f2f2
      bgColor: {
        type: String,
        default: () => props$6.search.bgColor
      },
      // 占位提示文字
      placeholder: {
        type: String,
        default: () => props$6.search.placeholder
      },
      // 是否启用清除控件
      clearabled: {
        type: Boolean,
        default: () => props$6.search.clearabled
      },
      // 是否自动聚焦
      focus: {
        type: Boolean,
        default: () => props$6.search.focus
      },
      // 是否在搜索框右侧显示取消按钮
      showAction: {
        type: Boolean,
        default: () => props$6.search.showAction
      },
      // 右边控件的样式
      actionStyle: {
        type: Object,
        default: () => props$6.search.actionStyle
      },
      // 取消按钮文字
      actionText: {
        type: String,
        default: () => props$6.search.actionText
      },
      // 输入框内容对齐方式，可选值为 left|center|right
      inputAlign: {
        type: String,
        default: () => props$6.search.inputAlign
      },
      // input输入框的样式，可以定义文字颜色，大小等，对象形式
      inputStyle: {
        type: Object,
        default: () => props$6.search.inputStyle
      },
      // 是否启用输入框
      disabled: {
        type: Boolean,
        default: () => props$6.search.disabled
      },
      // 边框颜色
      borderColor: {
        type: String,
        default: () => props$6.search.borderColor
      },
      // 搜索图标的颜色，默认同输入框字体颜色
      searchIconColor: {
        type: String,
        default: () => props$6.search.searchIconColor
      },
      // 输入框字体颜色
      color: {
        type: String,
        default: () => props$6.search.color
      },
      // placeholder的颜色
      placeholderColor: {
        type: String,
        default: () => props$6.search.placeholderColor
      },
      // 左边输入框的图标，可以为uView图标名称或图片路径
      searchIcon: {
        type: String,
        default: () => props$6.search.searchIcon
      },
      searchIconSize: {
        type: [Number, String],
        default: () => props$6.search.searchIconSize
      },
      // 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30px"、"30px 20px"等写法
      margin: {
        type: String,
        default: () => props$6.search.margin
      },
      // 开启showAction时，是否在input获取焦点时才显示
      animation: {
        type: Boolean,
        default: () => props$6.search.animation
      },
      // 输入框的初始化内容
      modelValue: {
        type: String,
        default: () => props$6.search.value
      },
      value: {
        type: String,
        default: () => props$6.search.value
      },
      // 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档)
      maxlength: {
        type: [String, Number],
        default: () => props$6.search.maxlength
      },
      // 搜索框高度，单位px
      height: {
        type: [String, Number],
        default: () => props$6.search.height
      },
      // 搜索框左侧文本
      label: {
        type: [String, Number, null],
        default: () => props$6.search.label
      },
      // 键盘弹起时，是否自动上推页面	
      adjustPosition: {
        type: Boolean,
        default: () => true
      },
      // 键盘收起时，是否自动失去焦点	
      autoBlur: {
        type: Boolean,
        default: () => false
      }
    }
  });
  const _sfc_main$6 = {
    name: "u-search",
    mixins: [mpMixin, mixin, props$4],
    data() {
      return {
        keyword: "",
        showClear: false,
        // 是否显示右边的清除图标
        show: false,
        // 标记input当前状态是否处于聚焦中，如果是，才会显示右侧的清除控件
        focused: this.focus
        // 绑定输入框的值
        // inputValue: this.value
      };
    },
    watch: {
      keyword(nVal) {
        this.$emit("update:modelValue", nVal);
        this.$emit("change", nVal);
      },
      modelValue: {
        immediate: true,
        handler(nVal) {
          this.keyword = nVal;
        }
      }
    },
    computed: {
      showActionBtn() {
        return !this.animation && this.showAction;
      }
    },
    emits: ["clear", "search", "custom", "focus", "blur", "click", "clickIcon", "update:modelValue", "change"],
    methods: {
      addStyle,
      addUnit,
      // 目前HX2.6.9 v-model双向绑定无效，故监听input事件获取输入框内容的变化
      inputChange(e) {
        this.keyword = e.detail.value;
      },
      // 清空输入
      // 也可以作为用户通过this.$refs形式调用清空输入框内容
      clear() {
        this.keyword = "";
        this.$nextTick(() => {
          this.$emit("clear");
        });
      },
      // 确定搜索
      search(e) {
        this.$emit("search", e.detail.value);
        try {
          uni.hideKeyboard();
        } catch (e2) {
        }
      },
      // 点击右边自定义按钮的事件
      custom() {
        this.$emit("custom", this.keyword);
        try {
          uni.hideKeyboard();
        } catch (e) {
        }
      },
      // 获取焦点
      getFocus() {
        this.focused = true;
        if (this.animation && this.showAction)
          this.show = true;
        this.$emit("focus", this.keyword);
      },
      // 失去焦点
      blur() {
        setTimeout(() => {
          this.focused = false;
        }, 100);
        this.show = false;
        this.$emit("blur", this.keyword);
      },
      // 点击搜索框，只有disabled=true时才发出事件，因为禁止了输入，意味着是想跳转真正的搜索页
      clickHandler() {
        if (this.disabled)
          this.$emit("click");
      },
      // 点击左边图标
      clickIcon(e) {
        this.$emit("clickIcon", this.keyword);
        try {
          uni.hideKeyboard();
        } catch (e2) {
        }
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-search",
        onClick: _cache[6] || (_cache[6] = (...args) => $options.clickHandler && $options.clickHandler(...args)),
        style: vue.normalizeStyle([{
          margin: _ctx.margin
        }, $options.addStyle(_ctx.customStyle)])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "u-search__content",
            style: vue.normalizeStyle({
              backgroundColor: _ctx.bgColor,
              borderRadius: _ctx.shape == "round" ? "100px" : "4px",
              borderColor: _ctx.borderColor
            })
          },
          [
            _ctx.$slots.label || _ctx.label !== null ? vue.renderSlot(_ctx.$slots, "label", { key: 0 }, () => [
              vue.createElementVNode(
                "text",
                { class: "u-search__content__label" },
                vue.toDisplayString(_ctx.label),
                1
                /* TEXT */
              )
            ], true) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "u-search__content__icon" }, [
              vue.createVNode(_component_u_icon, {
                onClick: $options.clickIcon,
                size: _ctx.searchIconSize,
                name: _ctx.searchIcon,
                color: _ctx.searchIconColor ? _ctx.searchIconColor : _ctx.color
              }, null, 8, ["onClick", "size", "name", "color"])
            ]),
            vue.createElementVNode("input", {
              "confirm-type": "search",
              onBlur: _cache[0] || (_cache[0] = (...args) => $options.blur && $options.blur(...args)),
              value: $data.keyword,
              onConfirm: _cache[1] || (_cache[1] = (...args) => $options.search && $options.search(...args)),
              onInput: _cache[2] || (_cache[2] = (...args) => $options.inputChange && $options.inputChange(...args)),
              disabled: _ctx.disabled,
              onFocus: _cache[3] || (_cache[3] = (...args) => $options.getFocus && $options.getFocus(...args)),
              focus: _ctx.focus,
              maxlength: _ctx.maxlength,
              "adjust-position": _ctx.adjustPosition,
              "auto-blur": _ctx.autoBlur,
              "placeholder-class": "u-search__content__input--placeholder",
              placeholder: _ctx.placeholder,
              "placeholder-style": `color: ${_ctx.placeholderColor}`,
              class: "u-search__content__input",
              type: "text",
              style: vue.normalizeStyle([{
                textAlign: _ctx.inputAlign,
                color: _ctx.color,
                backgroundColor: _ctx.bgColor,
                height: $options.addUnit(_ctx.height)
              }, _ctx.inputStyle])
            }, null, 44, ["value", "disabled", "focus", "maxlength", "adjust-position", "auto-blur", "placeholder", "placeholder-style"]),
            $data.keyword && _ctx.clearabled && $data.focused ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "u-search__content__icon u-search__content__close",
              onClick: _cache[4] || (_cache[4] = (...args) => $options.clear && $options.clear(...args))
            }, [
              vue.createVNode(_component_u_icon, {
                name: "close",
                size: "11",
                color: "#ffffff",
                customStyle: "line-height: 12px"
              })
            ])) : vue.createCommentVNode("v-if", true)
          ],
          4
          /* STYLE */
        ),
        vue.createElementVNode(
          "text",
          {
            style: vue.normalizeStyle([_ctx.actionStyle]),
            class: vue.normalizeClass(["u-search__action", [($options.showActionBtn || $data.show) && "u-search__action--active"]]),
            onClick: _cache[5] || (_cache[5] = vue.withModifiers((...args) => $options.custom && $options.custom(...args), ["stop", "prevent"]))
          },
          vue.toDisplayString(_ctx.actionText),
          7
          /* TEXT, CLASS, STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-ed789780"], ["__file", "D:/uni/travel-new/node_modules/uview-plus/components/u-search/u-search.vue"]]);
  const props$3 = defineMixin({
    props: {
      color: {
        type: String,
        default: () => props$6.line.color
      },
      // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
      length: {
        type: [String, Number],
        default: () => props$6.line.length
      },
      // 线条方向，col-竖向，row-横向
      direction: {
        type: String,
        default: () => props$6.line.direction
      },
      // 是否显示细边框
      hairline: {
        type: Boolean,
        default: () => props$6.line.hairline
      },
      // 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px"
      margin: {
        type: [String, Number],
        default: () => props$6.line.margin
      },
      // 是否虚线，true-虚线，false-实线
      dashed: {
        type: Boolean,
        default: () => props$6.line.dashed
      }
    }
  });
  const _sfc_main$5 = {
    name: "u-line",
    mixins: [mpMixin, mixin, props$3],
    computed: {
      lineStyle() {
        const style = {};
        style.margin = this.margin;
        if (this.direction === "row") {
          style.borderBottomWidth = "1px";
          style.borderBottomStyle = this.dashed ? "dashed" : "solid";
          style.width = addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleY(0.5)";
        } else {
          style.borderLeftWidth = "1px";
          style.borderLeftStyle = this.dashed ? "dashed" : "solid";
          style.height = addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleX(0.5)";
        }
        style.borderColor = this.color;
        return deepMerge$1(style, addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-line",
        style: vue.normalizeStyle([$options.lineStyle])
      },
      null,
      4
      /* STYLE */
    );
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-bbd9963c"], ["__file", "D:/uni/travel-new/node_modules/uview-plus/components/u-line/u-line.vue"]]);
  const props$2 = defineMixin({
    props: {
      // 标题
      title: {
        type: [String, Number],
        default: () => props$6.cell.title
      },
      // 标题下方的描述信息
      label: {
        type: [String, Number],
        default: () => props$6.cell.label
      },
      // 右侧的内容
      value: {
        type: [String, Number],
        default: () => props$6.cell.value
      },
      // 左侧图标名称，或者图片链接(本地文件建议使用绝对地址)
      icon: {
        type: String,
        default: () => props$6.cell.icon
      },
      // 是否禁用cell
      disabled: {
        type: Boolean,
        default: () => props$6.cell.disabled
      },
      // 是否显示下边框
      border: {
        type: Boolean,
        default: () => props$6.cell.border
      },
      // 内容是否垂直居中(主要是针对右侧的value部分)
      center: {
        type: Boolean,
        default: () => props$6.cell.center
      },
      // 点击后跳转的URL地址
      url: {
        type: String,
        default: () => props$6.cell.url
      },
      // 链接跳转的方式，内部使用的是uView封装的route方法，可能会进行拦截操作
      linkType: {
        type: String,
        default: () => props$6.cell.linkType
      },
      // 是否开启点击反馈(表现为点击时加上灰色背景)
      clickable: {
        type: Boolean,
        default: () => props$6.cell.clickable
      },
      // 是否展示右侧箭头并开启点击反馈
      isLink: {
        type: Boolean,
        default: () => props$6.cell.isLink
      },
      // 是否显示表单状态下的必填星号(此组件可能会内嵌入input组件)
      required: {
        type: Boolean,
        default: () => props$6.cell.required
      },
      // 右侧的图标箭头
      rightIcon: {
        type: String,
        default: () => props$6.cell.rightIcon
      },
      // 右侧箭头的方向，可选值为：left，up，down
      arrowDirection: {
        type: String,
        default: () => props$6.cell.arrowDirection
      },
      // 左侧图标样式
      iconStyle: {
        type: [Object, String],
        default: () => {
          return props$6.cell.iconStyle;
        }
      },
      // 右侧箭头图标的样式
      rightIconStyle: {
        type: [Object, String],
        default: () => {
          return props$6.cell.rightIconStyle;
        }
      },
      // 标题的样式
      titleStyle: {
        type: [Object, String],
        default: () => {
          return props$6.cell.titleStyle;
        }
      },
      // 单位元的大小，可选值为large
      size: {
        type: String,
        default: () => props$6.cell.size
      },
      // 点击cell是否阻止事件传播
      stop: {
        type: Boolean,
        default: () => props$6.cell.stop
      },
      // 标识符，cell被点击时返回
      name: {
        type: [Number, String],
        default: () => props$6.cell.name
      }
    }
  });
  const _sfc_main$4 = {
    name: "u-cell",
    data() {
      return {};
    },
    mixins: [mpMixin, mixin, props$2],
    computed: {
      titleTextStyle() {
        return addStyle(this.titleStyle);
      }
    },
    emits: ["click"],
    methods: {
      addStyle,
      testEmpty: test.empty,
      // 点击cell
      clickHandler(e) {
        if (this.disabled)
          return;
        this.$emit("click", {
          name: this.name
        });
        this.openPage();
        this.stop && this.preventEvent(e);
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$1);
    const _component_u_line = resolveEasycom(vue.resolveDynamicComponent("u-line"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["u-cell", [_ctx.customClass]]),
      style: vue.normalizeStyle([$options.addStyle(_ctx.customStyle)]),
      "hover-class": !_ctx.disabled && (_ctx.clickable || _ctx.isLink) ? "u-cell--clickable" : "",
      "hover-stay-time": 250,
      onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
    }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["u-cell__body", [_ctx.center && "u-cell--center", _ctx.size === "large" && "u-cell__body--large"]])
        },
        [
          vue.createElementVNode("view", { class: "u-cell__body__content" }, [
            _ctx.$slots.icon || _ctx.icon ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "u-cell__left-icon-wrap"
            }, [
              _ctx.$slots.icon ? vue.renderSlot(_ctx.$slots, "icon", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createBlock(_component_u_icon, {
                key: 1,
                name: _ctx.icon,
                "custom-style": _ctx.iconStyle,
                size: _ctx.size === "large" ? 22 : 18
              }, null, 8, ["name", "custom-style", "size"]))
            ])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "u-cell__title" }, [
              vue.createCommentVNode(" 将slot与默认内容用if/else分开主要是因为微信小程序不支持slot嵌套传递，这样才能解决collapse组件的slot不失效问题，label暂时未用到。 "),
              _ctx.$slots.title || !_ctx.title ? vue.renderSlot(_ctx.$slots, "title", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createElementBlock(
                "text",
                {
                  key: 1,
                  class: vue.normalizeClass(["u-cell__title-text", [_ctx.required && "u-cell--required", _ctx.disabled && "u-cell--disabled", _ctx.size === "large" && "u-cell__title-text--large"]]),
                  style: vue.normalizeStyle([$options.titleTextStyle])
                },
                vue.toDisplayString(_ctx.title),
                7
                /* TEXT, CLASS, STYLE */
              )),
              vue.renderSlot(_ctx.$slots, "label", {}, () => [
                _ctx.label ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: vue.normalizeClass(["u-cell__label", [_ctx.disabled && "u-cell--disabled", _ctx.size === "large" && "u-cell__label--large"]])
                  },
                  vue.toDisplayString(_ctx.label),
                  3
                  /* TEXT, CLASS */
                )) : vue.createCommentVNode("v-if", true)
              ], true)
            ])
          ]),
          vue.renderSlot(_ctx.$slots, "value", {}, () => [
            !$options.testEmpty(_ctx.value) ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: vue.normalizeClass(["u-cell__value", [_ctx.disabled && "u-cell--disabled", _ctx.size === "large" && "u-cell__value--large"]])
              },
              vue.toDisplayString(_ctx.value),
              3
              /* TEXT, CLASS */
            )) : vue.createCommentVNode("v-if", true)
          ], true),
          _ctx.$slots["right-icon"] || _ctx.isLink ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: vue.normalizeClass(["u-cell__right-icon-wrap", [`u-cell__right-icon-wrap--${_ctx.arrowDirection}`]])
            },
            [
              _ctx.rightIcon && !_ctx.$slots["right-icon"] ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                key: 0,
                name: _ctx.rightIcon,
                "custom-style": _ctx.rightIconStyle,
                color: _ctx.disabled ? "#c8c9cc" : "info",
                size: _ctx.size === "large" ? 18 : 16
              }, null, 8, ["name", "custom-style", "color", "size"])) : vue.renderSlot(_ctx.$slots, "right-icon", { key: 1 }, void 0, true)
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true),
          _ctx.$slots["righticon"] ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 1,
              class: vue.normalizeClass(["u-cell__right-icon-wrap", [`u-cell__right-icon-wrap--${_ctx.arrowDirection}`]])
            },
            [
              vue.renderSlot(_ctx.$slots, "righticon", {}, void 0, true)
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      ),
      _ctx.border ? (vue.openBlock(), vue.createBlock(_component_u_line, { key: 0 })) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class"]);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-b4243719"], ["__file", "D:/uni/travel-new/node_modules/uview-plus/components/u-cell/u-cell.vue"]]);
  const props$1 = defineMixin({
    props: {
      // 用于滚动到指定item
      anchor: {
        type: [String, Number],
        default: () => props$6.listItem.anchor
      }
    }
  });
  const _sfc_main$3 = {
    name: "u-list-item",
    mixins: [mpMixin, mixin, props$1],
    data() {
      return {
        // 节点信息
        rect: {},
        index: 0,
        show: true,
        sys: sys()
      };
    },
    computed: {},
    inject: ["uList"],
    watch: {
      "uList.innerScrollTop"(n) {
        const preLoadScreen = this.uList.preLoadScreen;
        const windowHeight = this.sys.windowHeight;
        if (n <= windowHeight * preLoadScreen) {
          this.parent.updateOffsetFromChild(0);
        } else if (this.rect.top <= n - windowHeight * preLoadScreen) {
          this.parent.updateOffsetFromChild(this.rect.top);
        }
      }
    },
    created() {
      this.parent = {};
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.updateParentData();
        this.index = this.parent.children.indexOf(this);
        this.resize();
      },
      updateParentData() {
        this.getParentData("u-list");
      },
      resize() {
        this.queryRect(`u-list-item-${this.anchor}`).then((size) => {
          const lastChild = this.parent.children[this.index - 1];
          this.rect = size;
          const preLoadScreen = this.uList.preLoadScreen;
          const windowHeight = this.sys.windowHeight;
          if (lastChild) {
            this.rect.top = lastChild.rect.top + lastChild.rect.height;
          }
          if (size.top >= this.uList.innerScrollTop + (1 + preLoadScreen) * windowHeight)
            this.show = false;
        });
      },
      // 查询元素尺寸
      queryRect(el) {
        return new Promise((resolve) => {
          this.$uGetRect(`.${el}`).then((size) => {
            resolve(size);
          });
        });
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["u-list-item", [`u-list-item-${_ctx.anchor}`]]),
      ref: `u-list-item-${_ctx.anchor}`,
      anchor: `u-list-item-${_ctx.anchor}`
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 10, ["anchor"]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-32197ac9"], ["__file", "D:/uni/travel-new/node_modules/uview-plus/components/u-list-item/u-list-item.vue"]]);
  const props = defineMixin({
    props: {
      // 控制是否出现滚动条，仅nvue有效
      showScrollbar: {
        type: Boolean,
        default: () => props$6.list.showScrollbar
      },
      // 距底部多少时触发scrolltolower事件
      lowerThreshold: {
        type: [String, Number],
        default: () => props$6.list.lowerThreshold
      },
      // 距顶部多少时触发scrolltoupper事件，非nvue有效
      upperThreshold: {
        type: [String, Number],
        default: () => props$6.list.upperThreshold
      },
      // 设置竖向滚动条位置
      scrollTop: {
        type: [String, Number],
        default: () => props$6.list.scrollTop
      },
      // 控制 onscroll 事件触发的频率，仅nvue有效
      offsetAccuracy: {
        type: [String, Number],
        default: () => props$6.list.offsetAccuracy
      },
      // 启用 flexbox 布局。开启后，当前节点声明了display: flex就会成为flex container，并作用于其孩子节点，仅微信小程序有效
      enableFlex: {
        type: Boolean,
        default: () => props$6.list.enableFlex
      },
      // 是否按分页模式显示List，默认值false
      pagingEnabled: {
        type: Boolean,
        default: () => props$6.list.pagingEnabled
      },
      // 是否允许List滚动
      scrollable: {
        type: Boolean,
        default: () => props$6.list.scrollable
      },
      // 值应为某子元素id（id不能以数字开头）
      scrollIntoView: {
        type: String,
        default: () => props$6.list.scrollIntoView
      },
      // 在设置滚动条位置时使用动画过渡
      scrollWithAnimation: {
        type: Boolean,
        default: () => props$6.list.scrollWithAnimation
      },
      // iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只对微信小程序有效
      enableBackToTop: {
        type: Boolean,
        default: () => props$6.list.enableBackToTop
      },
      // 列表的高度
      height: {
        type: [String, Number],
        default: () => props$6.list.height
      },
      // 列表宽度
      width: {
        type: [String, Number],
        default: () => props$6.list.width
      },
      // 列表前后预渲染的屏数，1代表一个屏幕的高度，1.5代表1个半屏幕高度
      preLoadScreen: {
        type: [String, Number],
        default: () => props$6.list.preLoadScreen
      },
      // 开启自定义下拉刷新
      refresherEnabled: {
        type: Boolean,
        default: () => false
      },
      // 设置自定义下拉刷新阈值	
      refresherThreshold: {
        type: Number,
        default: () => 45
      },
      // 设置自定义下拉刷新默认样式，支持设置 black，white，none，none 表示不使用默认样式
      refresherDefaultStyle: {
        type: String,
        default: () => "black"
      },
      // 设置自定义下拉刷新区域背景颜色
      refresherBackground: {
        type: String,
        default: () => "#FFF"
      },
      // 设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发
      refresherTriggered: {
        type: Boolean,
        default: () => false
      }
    }
  });
  const _sfc_main$2 = {
    name: "u-list",
    mixins: [mpMixin, mixin, props],
    watch: {
      scrollIntoView(n) {
        this.scrollIntoViewById(n);
      }
    },
    data() {
      return {
        // 记录内部滚动的距离
        innerScrollTop: 0,
        // vue下，scroll-view在上拉加载时的偏移值
        offset: 0,
        sys: sys()
      };
    },
    computed: {
      listStyle() {
        const style = {};
        if (this.width != 0)
          style.width = addUnit(this.width);
        if (this.height != 0)
          style.height = addUnit(this.height);
        if (!style.height)
          style.height = addUnit(this.sys.windowHeight, "px");
        return deepMerge$1(style, addStyle(this.customStyle));
      }
    },
    provide() {
      return {
        uList: this
      };
    },
    created() {
      this.refs = [];
      this.children = [];
      this.anchors = [];
    },
    mounted() {
    },
    emits: [
      "scroll",
      "scrolltolower",
      "scrolltoupper",
      "refresherpulling",
      "refresherrefresh",
      "refresherrestore",
      "refresherabort"
    ],
    methods: {
      updateOffsetFromChild(top) {
        this.offset = top;
      },
      onScroll(e) {
        let scrollTop = 0;
        scrollTop = e.detail.scrollTop;
        this.innerScrollTop = scrollTop;
        this.$emit("scroll", scrollTop);
      },
      scrollIntoViewById(id) {
      },
      // 滚动到底部触发事件
      scrolltolower(e) {
        sleep(30).then(() => {
          this.$emit("scrolltolower");
        });
      },
      // 滚动到底部时触发，非nvue有效
      scrolltoupper(e) {
        sleep(30).then(() => {
          this.$emit("scrolltoupper");
          this.offset = 0;
        });
      },
      refresherpulling(e) {
        this.$emit("refresherpulling", e);
      },
      refresherrefresh(e) {
        this.$emit("refresherrefresh", e);
      },
      refresherrestore(e) {
        this.$emit("refresherrestore", e);
      },
      refresherabort(e) {
        this.$emit("refresherabort", e);
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("scroll-view", {
      class: "u-list",
      "scroll-into-view": _ctx.scrollIntoView,
      style: vue.normalizeStyle([$options.listStyle]),
      "scroll-y": _ctx.scrollable,
      "scroll-top": Number(_ctx.scrollTop),
      "lower-threshold": Number(_ctx.lowerThreshold),
      "upper-threshold": Number(_ctx.upperThreshold),
      "show-scrollbar": _ctx.showScrollbar,
      "enable-back-to-top": _ctx.enableBackToTop,
      "scroll-with-animation": _ctx.scrollWithAnimation,
      onScroll: _cache[0] || (_cache[0] = (...args) => $options.onScroll && $options.onScroll(...args)),
      onScrolltolower: _cache[1] || (_cache[1] = (...args) => $options.scrolltolower && $options.scrolltolower(...args)),
      onScrolltoupper: _cache[2] || (_cache[2] = (...args) => $options.scrolltoupper && $options.scrolltoupper(...args)),
      "refresher-enabled": _ctx.refresherEnabled,
      "refresher-threshold": _ctx.refresherThreshold,
      "refresher-default-style": _ctx.refresherDefaultStyle,
      "refresher-background": _ctx.refresherBackground,
      "refresher-triggered": _ctx.refresherTriggered,
      onRefresherpulling: _cache[3] || (_cache[3] = (...args) => $options.refresherpulling && $options.refresherpulling(...args)),
      onRefresherrefresh: _cache[4] || (_cache[4] = (...args) => $options.refresherrefresh && $options.refresherrefresh(...args)),
      onRefresherrestore: _cache[5] || (_cache[5] = (...args) => $options.refresherrestore && $options.refresherrestore(...args)),
      onRefresherabort: _cache[6] || (_cache[6] = (...args) => $options.refresherabort && $options.refresherabort(...args)),
      "scroll-anchoring": true
    }, [
      vue.createElementVNode("view", null, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ], 44, ["scroll-into-view", "scroll-y", "scroll-top", "lower-threshold", "upper-threshold", "show-scrollbar", "enable-back-to-top", "scroll-with-animation", "refresher-enabled", "refresher-threshold", "refresher-default-style", "refresher-background", "refresher-triggered"]);
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-9ad03670"], ["__file", "D:/uni/travel-new/node_modules/uview-plus/components/u-list/u-list.vue"]]);
  const keyword = vue.ref("");
  const _sfc_main$1 = {
    data() {
      return {
        keyword,
        indexList: [],
        showModal: false,
        // 控制模态框显示
        newUserName: "",
        // 新用户名称
        showModaldelete: false,
        //控制删除确认弹窗
        nowDeleteUser: ""
      };
    },
    methods: {
      async deleteUser(name) {
        this.closeDeleteModal();
        formatAppLog("log", "at pages/home/index.vue:68", "要删除的名字" + name);
        try {
          const result = await util.deleteInformationType("user", "name", name);
          formatAppLog("log", "at pages/home/index.vue:72", "用户" + name + "删除成功：");
          this.handleSearch();
        } catch (error2) {
          formatAppLog("error", "at pages/home/index.vue:75", "加载用户失败：", error2);
          uni.showToast({
            title: "加载用户失败",
            icon: "none"
          });
        }
      },
      closeDeleteModal() {
        this.showModaldelete = false;
        this.nowDeleteUser = "";
      },
      showDeleteModal(index2) {
        this.showModaldelete = true;
        this.nowDeleteUser = this.indexList[index2].name;
      },
      handleSearch() {
        this.performSearch(this.keyword);
      },
      async performSearch(keyword2) {
        try {
          var result;
          if (keyword2 == "") {
            this.loadUsers();
            return;
          } else {
            formatAppLog("log", "at pages/home/index.vue:104", "按条件搜索： " + keyword2);
            result = await util.selectInformationType("user", "name", '"' + keyword2 + '%"');
            formatAppLog("log", "at pages/home/index.vue:107", "result: ", result);
          }
          formatAppLog("log", "at pages/home/index.vue:109", "用户列表加载成功：", result);
          this.indexList = result;
        } catch (error2) {
          formatAppLog("error", "at pages/home/index.vue:112", "加载用户失败：", error2);
          uni.showToast({
            title: "加载用户失败",
            icon: "none"
          });
        }
      },
      async loadUsers() {
        try {
          const result = await util.selectInformationType("user");
          formatAppLog("log", "at pages/home/index.vue:123", "用户列表加载成功：", result);
          this.indexList = result;
          uni.setStorageSync("AllPerson", result);
        } catch (error2) {
          formatAppLog("error", "at pages/home/index.vue:127", "加载用户失败：", error2);
          uni.showToast({
            title: "加载用户失败",
            icon: "none"
          });
        }
      },
      showAddModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
        this.newUserName = "";
      },
      scrolltolower() {
        this.loadmore();
      },
      loadmore() {
        for (let i = 0; i < 30; i++) {
          this.indexList.push({
            url: this.urls[uni.$u.random(0, this.urls.length - 1)]
          });
        }
      },
      async addUserToDB() {
        if (!this.newUserName.trim()) {
          uni.showToast({
            title: "名称不能为空",
            icon: "none"
          });
          return;
        }
        const obj = {
          id: 1,
          name: this.newUserName
        };
        try {
          await util.addUser(obj);
          uni.showToast({
            title: "用户添加成功",
            icon: "success"
          });
          this.closeModal();
          this.loadUsers();
        } catch (error2) {
          formatAppLog("error", "at pages/home/index.vue:174", "添加用户失败：", error2);
          uni.showToast({
            title: "用户添加失败",
            icon: "none"
          });
        }
      }
    },
    mounted() {
      util.openSqlite();
      this.loadUsers();
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_up_search = resolveEasycom(vue.resolveDynamicComponent("up-search"), __easycom_0);
    const _component_up_cell = resolveEasycom(vue.resolveDynamicComponent("up-cell"), __easycom_1);
    const _component_up_list_item = resolveEasycom(vue.resolveDynamicComponent("up-list-item"), __easycom_2);
    const _component_up_list = resolveEasycom(vue.resolveDynamicComponent("up-list"), __easycom_3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 列表 "),
      vue.createVNode(_component_up_search, {
        placeholder: "输入搜索名字",
        modelValue: $data.keyword,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.keyword = $event),
        clearabled: true,
        "show-action": true,
        actionText: "搜索",
        onSearch: $options.handleSearch,
        onCustom: $options.handleSearch
      }, null, 8, ["modelValue", "onSearch", "onCustom"]),
      vue.createVNode(_component_up_list, {
        onScrolltolower: $options.scrolltolower
      }, {
        default: vue.withCtx(() => [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.indexList, (item, index2) => {
              return vue.openBlock(), vue.createBlock(
                _component_up_list_item,
                {
                  key: index2,
                  class: "items"
                },
                {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_up_cell, {
                      title: item.name
                    }, null, 8, ["title"]),
                    vue.createElementVNode("image", {
                      src: _imports_0,
                      style: { "margin-top": "15rpx", "height": "30rpx", "width": "30rpx", "margin-right": "35rpx" },
                      onClick: ($event) => $options.showDeleteModal(index2)
                    }, null, 8, ["onClick"])
                  ]),
                  _: 2
                  /* DYNAMIC */
                },
                1024
                /* DYNAMIC_SLOTS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      }, 8, ["onScrolltolower"]),
      vue.createCommentVNode(" 蓝色添加按钮 "),
      vue.createElementVNode("button", {
        class: "add-button",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.showAddModal && $options.showAddModal(...args))
      }, "+"),
      $data.showModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "modal-overlay"
      }, [
        vue.createElementVNode("view", { class: "modal-content" }, [
          vue.createElementVNode("view", { class: "modal-header" }, "添加用户"),
          vue.createElementVNode("view", { class: "modal-body" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "input",
                type: "text",
                placeholder: "请输入用户名称",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.newUserName = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.newUserName]
            ])
          ]),
          vue.createElementVNode("view", { class: "modal-footer" }, [
            vue.createElementVNode("button", {
              class: "btn",
              onClick: _cache[3] || (_cache[3] = (...args) => $options.addUserToDB && $options.addUserToDB(...args))
            }, "确认"),
            vue.createElementVNode("button", {
              class: "btn",
              onClick: _cache[4] || (_cache[4] = (...args) => $options.closeModal && $options.closeModal(...args))
            }, "取消")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 提示是否删除user "),
      $data.showModaldelete ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "modal-overlay"
      }, [
        vue.createElementVNode("view", { class: "modal-content" }, [
          vue.createElementVNode(
            "view",
            { class: "modal-header" },
            "确认删除" + vue.toDisplayString($data.nowDeleteUser) + "？",
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "modal-footer" }, [
            vue.createElementVNode("button", {
              class: "btn",
              onClick: _cache[5] || (_cache[5] = ($event) => $options.deleteUser($data.nowDeleteUser))
            }, "确认"),
            vue.createElementVNode("button", {
              class: "btn",
              onClick: _cache[6] || (_cache[6] = (...args) => $options.closeDeleteModal && $options.closeDeleteModal(...args))
            }, "取消")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesHomeIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-4978fed5"], ["__file", "D:/uni/travel-new/pages/home/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/PayBill/index", PagesPayBillIndex);
  __definePage("pages/sql/sql", PagesSqlSql);
  __definePage("pages/home/index", PagesHomeIndex);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/uni/travel-new/App.vue"]]);
  const { toString } = Object.prototype;
  function isArray(val) {
    return toString.call(val) === "[object Array]";
  }
  function isObject(val) {
    return val !== null && typeof val === "object";
  }
  function isDate(val) {
    return toString.call(val) === "[object Date]";
  }
  function isURLSearchParams(val) {
    return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
  }
  function forEach(obj, fn) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (let i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  }
  function deepMerge() {
    const result = {};
    function assignValue(val, key) {
      if (typeof result[key] === "object" && typeof val === "object") {
        result[key] = deepMerge(result[key], val);
      } else if (typeof val === "object") {
        result[key] = deepMerge({}, val);
      } else {
        result[key] = val;
      }
    }
    for (let i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }
  function isUndefined(val) {
    return typeof val === "undefined";
  }
  function encode(val) {
    return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  function buildURL(url2, params) {
    if (!params) {
      return url2;
    }
    let serializedParams;
    if (isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      const parts = [];
      forEach(params, (val, key) => {
        if (val === null || typeof val === "undefined") {
          return;
        }
        if (isArray(val)) {
          key = `${key}[]`;
        } else {
          val = [val];
        }
        forEach(val, (v) => {
          if (isDate(v)) {
            v = v.toISOString();
          } else if (isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(`${encode(key)}=${encode(v)}`);
        });
      });
      serializedParams = parts.join("&");
    }
    if (serializedParams) {
      const hashmarkIndex = url2.indexOf("#");
      if (hashmarkIndex !== -1) {
        url2 = url2.slice(0, hashmarkIndex);
      }
      url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url2;
  }
  function isAbsoluteURL(url2) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
  }
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? `${baseURL.replace(/\/+$/, "")}/${relativeURL.replace(/^\/+/, "")}` : baseURL;
  }
  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }
  function settle(resolve, reject, response) {
    const { validateStatus } = response.config;
    const status = response.statusCode;
    if (status && (!validateStatus || validateStatus(status))) {
      resolve(response);
    } else {
      reject(response);
    }
  }
  const mergeKeys$1 = (keys, config2) => {
    const config3 = {};
    keys.forEach((prop) => {
      if (!isUndefined(config2[prop])) {
        config3[prop] = config2[prop];
      }
    });
    return config3;
  };
  const adapter = (config2) => new Promise((resolve, reject) => {
    const fullPath = buildURL(buildFullPath(config2.baseURL, config2.url), config2.params);
    const _config = {
      url: fullPath,
      header: config2.header,
      complete: (response) => {
        config2.fullPath = fullPath;
        response.config = config2;
        try {
          if (typeof response.data === "string") {
            response.data = JSON.parse(response.data);
          }
        } catch (e) {
        }
        settle(resolve, reject, response);
      }
    };
    let requestTask;
    if (config2.method === "UPLOAD") {
      delete _config.header["content-type"];
      delete _config.header["Content-Type"];
      const otherConfig = {
        filePath: config2.filePath,
        name: config2.name
      };
      const optionalKeys = [
        "files",
        "timeout",
        "formData"
      ];
      requestTask = uni.uploadFile({ ..._config, ...otherConfig, ...mergeKeys$1(optionalKeys, config2) });
    } else if (config2.method === "DOWNLOAD") {
      if (!isUndefined(config2.timeout)) {
        _config.timeout = config2.timeout;
      }
      requestTask = uni.downloadFile(_config);
    } else {
      const optionalKeys = [
        "data",
        "method",
        "timeout",
        "dataType",
        "responseType",
        "sslVerify",
        "firstIpv4"
      ];
      requestTask = uni.request({ ..._config, ...mergeKeys$1(optionalKeys, config2) });
    }
    if (config2.getTask) {
      config2.getTask(requestTask, config2);
    }
  });
  const dispatchRequest = (config2) => adapter(config2);
  function InterceptorManager() {
    this.handlers = [];
  }
  InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected
    });
    return this.handlers.length - 1;
  };
  InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };
  InterceptorManager.prototype.forEach = function forEach2(fn) {
    this.handlers.forEach((h) => {
      if (h !== null) {
        fn(h);
      }
    });
  };
  const mergeKeys = (keys, globalsConfig, config2) => {
    const config3 = {};
    keys.forEach((prop) => {
      if (!isUndefined(config2[prop])) {
        config3[prop] = config2[prop];
      } else if (!isUndefined(globalsConfig[prop])) {
        config3[prop] = globalsConfig[prop];
      }
    });
    return config3;
  };
  const mergeConfig = (globalsConfig, config2 = {}) => {
    const method = config2.method || globalsConfig.method || "GET";
    let config3 = {
      baseURL: globalsConfig.baseURL || "",
      method,
      url: config2.url || "",
      params: config2.params || {},
      custom: { ...globalsConfig.custom || {}, ...config2.custom || {} },
      header: deepMerge(globalsConfig.header || {}, config2.header || {})
    };
    const defaultToConfig2Keys = ["getTask", "validateStatus"];
    config3 = { ...config3, ...mergeKeys(defaultToConfig2Keys, globalsConfig, config2) };
    if (method === "DOWNLOAD") {
      if (!isUndefined(config2.timeout)) {
        config3.timeout = config2.timeout;
      } else if (!isUndefined(globalsConfig.timeout)) {
        config3.timeout = globalsConfig.timeout;
      }
    } else if (method === "UPLOAD") {
      delete config3.header["content-type"];
      delete config3.header["Content-Type"];
      const uploadKeys = [
        "files",
        "filePath",
        "name",
        "timeout",
        "formData"
      ];
      uploadKeys.forEach((prop) => {
        if (!isUndefined(config2[prop])) {
          config3[prop] = config2[prop];
        }
      });
      if (isUndefined(config3.timeout) && !isUndefined(globalsConfig.timeout)) {
        config3.timeout = globalsConfig.timeout;
      }
    } else {
      const defaultsKeys = [
        "data",
        "timeout",
        "dataType",
        "responseType",
        "sslVerify",
        "firstIpv4"
      ];
      config3 = { ...config3, ...mergeKeys(defaultsKeys, globalsConfig, config2) };
    }
    return config3;
  };
  const defaults = {
    baseURL: "",
    header: {},
    method: "GET",
    dataType: "json",
    responseType: "text",
    custom: {},
    timeout: 6e4,
    sslVerify: true,
    firstIpv4: false,
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };
  var clone = function() {
    function _instanceof(obj, type) {
      return type != null && obj instanceof type;
    }
    var nativeMap;
    try {
      nativeMap = Map;
    } catch (_) {
      nativeMap = function() {
      };
    }
    var nativeSet;
    try {
      nativeSet = Set;
    } catch (_) {
      nativeSet = function() {
      };
    }
    var nativePromise;
    try {
      nativePromise = Promise;
    } catch (_) {
      nativePromise = function() {
      };
    }
    function clone2(parent, circular, depth, prototype, includeNonEnumerable) {
      if (typeof circular === "object") {
        depth = circular.depth;
        prototype = circular.prototype;
        includeNonEnumerable = circular.includeNonEnumerable;
        circular = circular.circular;
      }
      var allParents = [];
      var allChildren = [];
      var useBuffer = typeof Buffer != "undefined";
      if (typeof circular == "undefined")
        circular = true;
      if (typeof depth == "undefined")
        depth = Infinity;
      function _clone(parent2, depth2) {
        if (parent2 === null)
          return null;
        if (depth2 === 0)
          return parent2;
        var child;
        var proto;
        if (typeof parent2 != "object") {
          return parent2;
        }
        if (_instanceof(parent2, nativeMap)) {
          child = new nativeMap();
        } else if (_instanceof(parent2, nativeSet)) {
          child = new nativeSet();
        } else if (_instanceof(parent2, nativePromise)) {
          child = new nativePromise(function(resolve, reject) {
            parent2.then(function(value) {
              resolve(_clone(value, depth2 - 1));
            }, function(err) {
              reject(_clone(err, depth2 - 1));
            });
          });
        } else if (clone2.__isArray(parent2)) {
          child = [];
        } else if (clone2.__isRegExp(parent2)) {
          child = new RegExp(parent2.source, __getRegExpFlags(parent2));
          if (parent2.lastIndex)
            child.lastIndex = parent2.lastIndex;
        } else if (clone2.__isDate(parent2)) {
          child = new Date(parent2.getTime());
        } else if (useBuffer && Buffer.isBuffer(parent2)) {
          if (Buffer.from) {
            child = Buffer.from(parent2);
          } else {
            child = new Buffer(parent2.length);
            parent2.copy(child);
          }
          return child;
        } else if (_instanceof(parent2, Error)) {
          child = Object.create(parent2);
        } else {
          if (typeof prototype == "undefined") {
            proto = Object.getPrototypeOf(parent2);
            child = Object.create(proto);
          } else {
            child = Object.create(prototype);
            proto = prototype;
          }
        }
        if (circular) {
          var index2 = allParents.indexOf(parent2);
          if (index2 != -1) {
            return allChildren[index2];
          }
          allParents.push(parent2);
          allChildren.push(child);
        }
        if (_instanceof(parent2, nativeMap)) {
          parent2.forEach(function(value, key) {
            var keyChild = _clone(key, depth2 - 1);
            var valueChild = _clone(value, depth2 - 1);
            child.set(keyChild, valueChild);
          });
        }
        if (_instanceof(parent2, nativeSet)) {
          parent2.forEach(function(value) {
            var entryChild = _clone(value, depth2 - 1);
            child.add(entryChild);
          });
        }
        for (var i in parent2) {
          var attrs = Object.getOwnPropertyDescriptor(parent2, i);
          if (attrs) {
            child[i] = _clone(parent2[i], depth2 - 1);
          }
          try {
            var objProperty = Object.getOwnPropertyDescriptor(parent2, i);
            if (objProperty.set === "undefined") {
              continue;
            }
            child[i] = _clone(parent2[i], depth2 - 1);
          } catch (e) {
            if (e instanceof TypeError) {
              continue;
            } else if (e instanceof ReferenceError) {
              continue;
            }
          }
        }
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(parent2);
          for (var i = 0; i < symbols.length; i++) {
            var symbol = symbols[i];
            var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
            if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
              continue;
            }
            child[symbol] = _clone(parent2[symbol], depth2 - 1);
            Object.defineProperty(child, symbol, descriptor);
          }
        }
        if (includeNonEnumerable) {
          var allPropertyNames = Object.getOwnPropertyNames(parent2);
          for (var i = 0; i < allPropertyNames.length; i++) {
            var propertyName = allPropertyNames[i];
            var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
            if (descriptor && descriptor.enumerable) {
              continue;
            }
            child[propertyName] = _clone(parent2[propertyName], depth2 - 1);
            Object.defineProperty(child, propertyName, descriptor);
          }
        }
        return child;
      }
      return _clone(parent, depth);
    }
    clone2.clonePrototype = function clonePrototype(parent) {
      if (parent === null)
        return null;
      var c = function() {
      };
      c.prototype = parent;
      return new c();
    };
    function __objToStr(o) {
      return Object.prototype.toString.call(o);
    }
    clone2.__objToStr = __objToStr;
    function __isDate(o) {
      return typeof o === "object" && __objToStr(o) === "[object Date]";
    }
    clone2.__isDate = __isDate;
    function __isArray(o) {
      return typeof o === "object" && __objToStr(o) === "[object Array]";
    }
    clone2.__isArray = __isArray;
    function __isRegExp(o) {
      return typeof o === "object" && __objToStr(o) === "[object RegExp]";
    }
    clone2.__isRegExp = __isRegExp;
    function __getRegExpFlags(re) {
      var flags = "";
      if (re.global)
        flags += "g";
      if (re.ignoreCase)
        flags += "i";
      if (re.multiline)
        flags += "m";
      return flags;
    }
    clone2.__getRegExpFlags = __getRegExpFlags;
    return clone2;
  }();
  class Request {
    /**
    * @param {Object} arg - 全局配置
    * @param {String} arg.baseURL - 全局根路径
    * @param {Object} arg.header - 全局header
    * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
    * @param {String} arg.dataType = [json] - 全局默认的dataType
    * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。支付宝小程序不支持
    * @param {Object} arg.custom - 全局默认的自定义参数
    * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认60000。H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
    * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
    * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
    * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
    * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
    */
    constructor(arg = {}) {
      if (!isPlainObject(arg)) {
        arg = {};
        formatAppLog("warn", "at node_modules/uview-plus/libs/luch-request/core/Request.js:39", "设置全局参数必须接收一个Object");
      }
      this.config = clone({ ...defaults, ...arg });
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    /**
    * @Function
    * @param {Request~setConfigCallback} f - 设置全局默认配置
    */
    setConfig(f) {
      this.config = f(this.config);
    }
    middleware(config2) {
      config2 = mergeConfig(this.config, config2);
      const chain = [dispatchRequest, void 0];
      let promise2 = Promise.resolve(config2);
      this.interceptors.request.forEach((interceptor) => {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      this.interceptors.response.forEach((interceptor) => {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });
      while (chain.length) {
        promise2 = promise2.then(chain.shift(), chain.shift());
      }
      return promise2;
    }
    /**
    * @Function
    * @param {Object} config - 请求配置项
    * @prop {String} options.url - 请求路径
    * @prop {Object} options.data - 请求参数
    * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
    * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
    * @prop {Object} [options.header = config.header] - 请求header
    * @prop {Object} [options.method = config.method] - 请求方法
    * @returns {Promise<unknown>}
    */
    request(config2 = {}) {
      return this.middleware(config2);
    }
    get(url2, options = {}) {
      return this.middleware({
        url: url2,
        method: "GET",
        ...options
      });
    }
    post(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "POST",
        ...options
      });
    }
    put(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "PUT",
        ...options
      });
    }
    delete(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "DELETE",
        ...options
      });
    }
    options(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "OPTIONS",
        ...options
      });
    }
    upload(url2, config2 = {}) {
      config2.url = url2;
      config2.method = "UPLOAD";
      return this.middleware(config2);
    }
    download(url2, config2 = {}) {
      config2.url = url2;
      config2.method = "DOWNLOAD";
      return this.middleware(config2);
    }
  }
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    const startRGB = hexToRgb(startColor, false);
    const startR = startRGB[0];
    const startG = startRGB[1];
    const startB = startRGB[2];
    const endRGB = hexToRgb(endColor, false);
    const endR = endRGB[0];
    const endG = endRGB[1];
    const endB = endRGB[2];
    const sR = (endR - startR) / step;
    const sG = (endG - startG) / step;
    const sB = (endB - startB) / step;
    const colorArr = [];
    for (let i = 0; i < step; i++) {
      let hex = rgbToHex(`rgb(${Math.round(sR * i + startR)},${Math.round(sG * i + startG)},${Math.round(sB * i + startB)})`);
      if (i === 0)
        hex = rgbToHex(startColor);
      if (i === step - 1)
        hex = rgbToHex(endColor);
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = String(sColor).toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
      }
      if (!str) {
        return sColorChange;
      }
      return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
    }
    if (/^(rgb|RGB)/.test(sColor)) {
      const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    }
    return sColor;
  }
  function rgbToHex(rgb) {
    const _this = rgb;
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      const aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = String(hex).length == 1 ? `${0}${hex}` : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    }
    if (reg.test(_this)) {
      const aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      }
      if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  function colorToRgba(color2, alpha) {
    color2 = rgbToHex(color2);
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = String(color2).toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
      }
      return `rgba(${sColorChange.join(",")},${alpha})`;
    }
    return sColor;
  }
  const colorGradient$1 = {
    colorGradient,
    hexToRgb,
    rgbToHex,
    colorToRgba
  };
  let timeout = null;
  function debounce(func2, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func2 === "function" && func2();
    } else {
      timeout = setTimeout(() => {
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  let flag;
  function throttle(func2, wait = 500, immediate = true) {
    if (immediate) {
      if (!flag) {
        flag = true;
        typeof func2 === "function" && func2();
        setTimeout(() => {
          flag = false;
        }, wait);
      }
    } else if (!flag) {
      flag = true;
      setTimeout(() => {
        flag = false;
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  const zIndex = {
    toast: 10090,
    noNetwork: 10080,
    // popup包含popup，actionsheet，keyboard，picker的值
    popup: 10075,
    mask: 10070,
    navbar: 980,
    topTips: 975,
    sticky: 970,
    indexListSticky: 965
  };
  let platform = "none";
  platform = "vue3";
  platform = "plus";
  const platform$1 = platform;
  const http = new Request();
  let themeType = ["primary", "success", "error", "warning", "info"];
  function setConfig(configs) {
    index.shallowMerge(config, configs.config || {});
    index.shallowMerge(props$6, configs.props || {});
    index.shallowMerge(color, configs.color || {});
    index.shallowMerge(zIndex, configs.zIndex || {});
  }
  index.setConfig = setConfig;
  const $u = {
    route,
    date: index.timeFormat,
    // 另名date
    colorGradient: colorGradient$1.colorGradient,
    hexToRgb: colorGradient$1.hexToRgb,
    rgbToHex: colorGradient$1.rgbToHex,
    colorToRgba: colorGradient$1.colorToRgba,
    test,
    type: themeType,
    http,
    config,
    // uview-plus配置信息相关，比如版本号
    zIndex,
    debounce,
    throttle,
    mixin,
    mpMixin,
    props: props$6,
    ...index,
    color,
    platform: platform$1
  };
  const install = (Vue2) => {
    uni.$u = $u;
    Vue2.config.globalProperties.$u = $u;
    Vue2.mixin(mixin);
  };
  const uviewPlus = {
    install
  };
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(uviewPlus);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
