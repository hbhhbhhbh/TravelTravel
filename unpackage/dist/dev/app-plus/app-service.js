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
  function selectInformationType$4(name, aa, bb, cc, dd) {
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
          success(e2) {
            resolve(e2);
          },
          fail(e2) {
            reject(e2);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("错误查询");
      });
    }
  }
  function deleteInformationType$4(name, sol, qq, ww, ee) {
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
          success(e2) {
            resolve(e2);
          },
          fail(e2) {
            reject(e2);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("错误删除");
      });
    }
  }
  function modifyInformation$4(listName, name, cont, use, sel) {
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
        success(e2) {
          resolve(e2);
        },
        fail(e2) {
          reject(e2);
        }
      });
    });
  }
  function addUser$3(obj) {
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
            success(e2) {
              resolve(e2);
            },
            fail(e2) {
              reject(e2);
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
          success(e2) {
            resolve(e2);
          },
          fail(e2) {
            reject(e2);
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
    selectInformationType: selectInformationType$4,
    deleteInformationType: deleteInformationType$4,
    modifyInformation: modifyInformation$4,
    addUser: addUser$3,
    clear
  };
  function openSqlite() {
    return new Promise((resolve, reject) => {
      plus.sqlite.openDatabase({
        name: "travel",
        //数据库名称
        path: "_doc/travel.db",
        //数据库地址，uniapp推荐以下划线为开头
        success(e2) {
          resolve(e2);
        },
        fail(e2) {
          reject(e2);
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
        success(e2) {
          resolve(e2);
        },
        fail(e2) {
          reject(e2);
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
        success(e2) {
          resolve(`表 ${tableName} 成功添加字段 ${columnName} (${columnType})`);
        },
        fail(e2) {
          reject(`更新表结构失败: ${JSON.stringify(e2)}`);
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
        success(e2) {
          resolve(`表 ${tableName} 删除成功`);
        },
        fail(e2) {
          reject(`删除表 ${tableName} 失败: ${JSON.stringify(e2)}`);
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
        success(e2) {
          resolve(e2);
        },
        fail(e2) {
          reject(e2);
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
        success(e2) {
          resolve(e2);
        },
        fail(e2) {
          reject(e2);
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
        success(e2) {
          resolve(e2);
        },
        fail(e2) {
          reject(e2);
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
        success(e2) {
          resolve(e2);
        },
        fail(e2) {
          reject(e2);
        }
      });
    });
  }
  function addUser$2(obj) {
    if (obj !== void 0) {
      var b = JSON.stringify(obj) == "{}";
      if (!b) {
        var id = obj.id || null;
        var name = obj.name || null;
        return new Promise((resolve, reject) => {
          plus.sqlite.executeSql({
            name: "travel",
            sql: 'insert into user(userid,name) values("' + id + '","' + name + '")',
            success(e2) {
              resolve(e2);
            },
            fail(e2) {
              reject(e2);
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
  function selectInformationType$3(name, aa, bb, cc, dd) {
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
          success(e2) {
            resolve(e2);
          },
          fail(e2) {
            reject(e2);
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
          success(e2) {
            resolve(e2);
          },
          fail(e2) {
            reject(e2);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("错误删除");
      });
    }
  }
  function deleteFromBillUser(name) {
    const sql = 'DELETE FROM BillUser WHERE userid IN (SELECT id FROM user WHERE name = "' + name + '")';
    formatAppLog("log", "at common/util/operateSqlite.js:258", sql);
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: "travel",
        sql,
        success(e2) {
          formatAppLog("log", "at common/util/operateSqlite.js:264", "Deleted from BillUser table", e2);
          resolve(e2);
        },
        fail(e2) {
          formatAppLog("error", "at common/util/operateSqlite.js:268", "Failed to delete from BillUser table:", e2);
          reject(e2);
        }
      });
    });
  }
  function deleteFromUser(name) {
    const sql = 'DELETE FROM user WHERE name = "' + name + '"';
    formatAppLog("log", "at common/util/operateSqlite.js:279", sql);
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: "travel",
        sql,
        success(e2) {
          formatAppLog("log", "at common/util/operateSqlite.js:285", "Deleted from user table", e2);
          resolve(e2);
        },
        fail(e2) {
          formatAppLog("error", "at common/util/operateSqlite.js:289", "Failed to delete from user table:", e2);
          reject(e2);
        }
      });
    });
  }
  function deleteUser(name) {
    formatAppLog("log", "at common/util/operateSqlite.js:298", "Deleting data for user:", name);
    deleteFromBillUser(name).then(() => {
      return deleteFromUser(name);
    }).then(() => {
      formatAppLog("log", "at common/util/operateSqlite.js:307", "Successfully deleted user data from both tables");
    }).catch((error2) => {
      formatAppLog("error", "at common/util/operateSqlite.js:310", "Error deleting user data:", error2);
    });
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
        name: "pop",
        sql,
        success(e2) {
          resolve(e2);
        },
        fail(e2) {
          reject(e2);
        }
      });
    });
  }
  function closeSQL(name) {
    return new Promise((resolve, reject) => {
      plus.sqlite.closeDatabase({
        name: "pop",
        success(e2) {
          resolve(e2);
        },
        fail(e2) {
          reject(e2);
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
        success(e2) {
          resolve(e2);
        },
        fail(e2) {
          reject(e2);
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
        success(e2) {
          formatAppLog("log", "at common/util/operateSqlite.js:396", "表 BillUser 删除成功");
          resolve(e2);
        },
        fail(e2) {
          formatAppLog("error", "at common/util/operateSqlite.js:400", "表删除失败:", e2);
          reject(e2);
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
    addUser: addUser$2,
    selectInformationType: selectInformationType$3,
    deleteInformationType: deleteInformationType$3,
    pullSQL,
    isOpen,
    closeSQL,
    modifyInformation: modifyInformation$3,
    updateTableStructure,
    deleteTable,
    dropTable,
    deleteUser
  };
  function selectInformationType$2(name, aa, bb, cc, dd) {
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
          success(e2) {
            resolve(e2);
          },
          fail(e2) {
            reject(e2);
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
          success(e2) {
            resolve(e2);
          },
          fail(e2) {
            reject(e2);
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
        name: "travel",
        sql,
        success(e2) {
          resolve(e2);
        },
        fail(e2) {
          reject(e2);
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
        formatAppLog("log", "at common/util/project.js:112", id + " " + name);
        var sql = 'insert into project(projectId,projectName) values("' + id + '","' + name + '")';
        formatAppLog("log", "at common/util/project.js:115", sql);
        return new Promise((resolve, reject) => {
          plus.sqlite.executeSql({
            name: "travel",
            sql,
            success(e2) {
              resolve(e2);
            },
            fail(e2) {
              reject(e2);
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
    selectInformationType: selectInformationType$2,
    deleteInformationType: deleteInformationType$2,
    modifyInformation: modifyInformation$2,
    addUser: addUser$1
  };
  const utils = {
    async initializeDB() {
      try {
        await this.isopenDB();
        await this.createBillTable();
        await this.createBillUserTable();
        await this.createProjectTable();
        await this.createUserTable();
        formatAppLog("log", "at common/util/init.js:10", "数据库初始化成功");
      } catch (error2) {
        formatAppLog("error", "at common/util/init.js:12", "数据库初始化失败：", error2);
        throw error2;
      }
    },
    async isopenDB() {
      return util.openSqlite().then((result) => {
        formatAppLog("log", "at common/util/init.js:20", "数据库打开成功：", result);
        return result;
      }).catch((error2) => {
        formatAppLog("error", "at common/util/init.js:24", "数据库打开失败：", error2);
        throw error2;
      });
    },
    async createBillTable() {
      return util.CreateBillSQL().then((result) => {
        formatAppLog("log", "at common/util/init.js:32", "Bill表创建成功：", result);
        return result;
      }).catch((error2) => {
        formatAppLog("error", "at common/util/init.js:36", "Bill表创建失败：", error2);
        throw error2;
      });
    },
    async createBillUserTable() {
      return util.CreateBillUserSQL().then((result) => {
        formatAppLog("log", "at common/util/init.js:44", "BillUser表创建成功：", result);
        return result;
      }).catch((error2) => {
        formatAppLog("error", "at common/util/init.js:48", "BillUser表创建失败：", error2);
        throw error2;
      });
    },
    async createUserTable() {
      return util.CreateUserSQL().then((result) => {
        formatAppLog("log", "at common/util/init.js:56", "User表创建成功：", result);
        return result;
      }).catch((error2) => {
        formatAppLog("error", "at common/util/init.js:60", "User表创建失败：", error2);
        throw error2;
      });
    },
    async createProjectTable() {
      return util.CreateProjectSQL().then((result) => {
        formatAppLog("log", "at common/util/init.js:68", "Project表创建成功：", result);
        return result;
      }).catch((error2) => {
        formatAppLog("error", "at common/util/init.js:72", "Project表创建失败：", error2);
        throw error2;
      });
    }
  };
  const _export_sfc = (sfc, props2) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props2) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$l = {
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
      utils.initializeDB();
    },
    methods: {}
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "main-container" }, [
      vue.createElementVNode("view", { class: "typing-container" }, [
        vue.createElementVNode("span", { class: "typing" }, "HBH's Travel Tools")
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/uni/travel-new/pages/index/index.vue"]]);
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
  const _sfc_main$k = {
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
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-d31e1c47"], ["__file", "D:/uni/travel-new/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const _sfc_main$j = {
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
    updated(e2) {
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
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-3d2dde9f"], ["__file", "D:/uni/travel-new/uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.vue"]]);
  const _sfc_main$i = {
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
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-collapse" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]);
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-3f050360"], ["__file", "D:/uni/travel-new/uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue"]]);
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
    color: color$5
  } = config;
  const Icon = {
    // icon组件
    icon: {
      name: "",
      color: color$5["u-content-color"],
      size: "16px",
      bold: false,
      index: "",
      hoverClass: "",
      customPrefix: "uicon",
      label: "",
      labelPos: "right",
      labelSize: "15px",
      labelColor: color$5["u-content-color"],
      space: "3px",
      imgMode: "",
      width: "",
      height: "",
      top: 0,
      stop: false
    }
  };
  const Image$1 = {
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
    color: color$4
  } = config;
  const Link = {
    // link超链接组件props参数
    link: {
      color: color$4["u-primary"],
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
    color: color$3
  } = config;
  const LoadingIcon = {
    // loading-icon加载中图标组件
    loadingIcon: {
      show: true,
      color: color$3["u-tips-color"],
      textColor: color$3["u-tips-color"],
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
  const color$2 = {
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
      leftIconColor: color$2.mainColor,
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
  const props$7 = {
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
    ...Image$1,
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
  const props$6 = defineMixin({
    props: {
      color: {
        type: String,
        default: () => props$7.line.color
      },
      // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
      length: {
        type: [String, Number],
        default: () => props$7.line.length
      },
      // 线条方向，col-竖向，row-横向
      direction: {
        type: String,
        default: () => props$7.line.direction
      },
      // 是否显示细边框
      hairline: {
        type: Boolean,
        default: () => props$7.line.hairline
      },
      // 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px"
      margin: {
        type: [String, Number],
        default: () => props$7.line.margin
      },
      // 是否虚线，true-虚线，false-实线
      dashed: {
        type: Boolean,
        default: () => props$7.line.dashed
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
  function contains$1(value, param) {
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
        for (const i2 in value) {
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
      } catch (e2) {
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
  function image$1(value) {
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
    contains: contains$1,
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
    image: image$1,
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
    const chars2 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    const uuid = [];
    radix = radix || chars2.length;
    if (len) {
      for (let i2 = 0; i2 < len; i2++)
        uuid[i2] = chars2[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i2 = 0; i2 < 36; i2++) {
        if (!uuid[i2]) {
          r = 0 | Math.random() * 16;
          uuid[i2] = chars2[i2 == 19 ? r & 3 | 8 : r];
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
      for (let i2 = 0; i2 < styleArray.length; i2++) {
        if (styleArray[i2]) {
          const item = styleArray[i2].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    if (typeof customStyle === "object") {
      customStyle.forEach((val, i2) => {
        const key = i2.replace(/([A-Z])/g, "-$1").toLowerCase();
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
    for (const i2 in obj) {
      if (obj.hasOwnProperty(i2)) {
        o[i2] = typeof obj[i2] === "object" ? deepClone(obj[i2]) : obj[i2];
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
            for (let i2 = 0; i2 < value.length; i2++) {
              _result.push(`${key}[${i2}]=${value[i2]}`);
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
  function toast(title, duration2 = 2e3) {
    uni.showToast({
      title: String(title),
      icon: "none",
      duration: duration2
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
      for (let i2 = 1; i2 < keys.length; i2++) {
        if (firstObj) {
          firstObj = firstObj[keys[i2]];
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
      preventEvent(e2) {
        e2 && typeof e2.stopPropagation === "function" && e2.stopPropagation();
      },
      // 空操作
      noop(e2) {
        this.preventEvent(e2);
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
  const _sfc_main$h = {
    name: "u-line",
    mixins: [mpMixin, mixin, props$6],
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
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-bbd9963c"], ["__file", "D:/uni/travel-new/node_modules/uview-plus/components/u-line/u-line.vue"]]);
  const props$5 = defineMixin({
    props: {
      // 是否虚线
      dashed: {
        type: Boolean,
        default: () => props$7.divider.dashed
      },
      // 是否细线
      hairline: {
        type: Boolean,
        default: () => props$7.divider.hairline
      },
      // 是否以点替代文字，优先于text字段起作用
      dot: {
        type: Boolean,
        default: () => props$7.divider.dot
      },
      // 内容文本的位置，left-左边，center-中间，right-右边
      textPosition: {
        type: String,
        default: () => props$7.divider.textPosition
      },
      // 文本内容
      text: {
        type: [String, Number],
        default: () => props$7.divider.text
      },
      // 文本大小
      textSize: {
        type: [String, Number],
        default: () => props$7.divider.textSize
      },
      // 文本颜色
      textColor: {
        type: String,
        default: () => props$7.divider.textColor
      },
      // 线条颜色
      lineColor: {
        type: String,
        default: () => props$7.divider.lineColor
      }
    }
  });
  const _sfc_main$g = {
    name: "u-divider",
    mixins: [mpMixin, mixin, props$5],
    computed: {
      textStyle() {
        const style = {};
        style.fontSize = addUnit(this.textSize);
        style.color = this.textColor;
        return style;
      },
      // 左边线条的的样式
      leftLineStyle() {
        const style = {};
        if (this.textPosition === "left") {
          style.width = "80rpx";
        } else {
          style.flex = 1;
        }
        return style;
      },
      // 右边线条的的样式
      rightLineStyle() {
        const style = {};
        if (this.textPosition === "right") {
          style.width = "80rpx";
        } else {
          style.flex = 1;
        }
        return style;
      }
    },
    emits: ["click"],
    methods: {
      addStyle,
      // divider组件被点击时触发
      click() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_line = resolveEasycom(vue.resolveDynamicComponent("u-line"), __easycom_1$2);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-divider",
        style: vue.normalizeStyle([$options.addStyle(_ctx.customStyle)]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args))
      },
      [
        vue.createVNode(_component_u_line, {
          color: _ctx.lineColor,
          customStyle: $options.leftLineStyle,
          hairline: _ctx.hairline,
          dashed: _ctx.dashed
        }, null, 8, ["color", "customStyle", "hairline", "dashed"]),
        _ctx.dot ? (vue.openBlock(), vue.createElementBlock("text", {
          key: 0,
          class: "u-divider__dot"
        }, "●")) : _ctx.text ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "u-divider__text",
            style: vue.normalizeStyle([$options.textStyle])
          },
          vue.toDisplayString(_ctx.text),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.createVNode(_component_u_line, {
          color: _ctx.lineColor,
          customStyle: $options.rightLineStyle,
          hairline: _ctx.hairline,
          dashed: _ctx.dashed
        }, null, 8, ["color", "customStyle", "hairline", "dashed"])
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-363a2c1a"], ["__file", "D:/uni/travel-new/node_modules/uview-plus/components/u-divider/u-divider.vue"]]);
  const STORAGE_KEYS = {
    CURRENTITEMS: "currentItems",
    // 用户信息
    AllPerson: "AllPerson",
    // 认证令牌
    nowproject: "nowproject"
    // 应用设置
  };
  const _imports_0$1 = "/static/GoodItem/edit.png";
  const _imports_1 = "/static/GoodItem/delete.png";
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
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:104", "跳转");
        uni.navigateTo({
          url: "/pages/showPer/showPer"
        });
      },
      toggleModal() {
        this.showModal = !this.showModal;
      },
      submitForm() {
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:115", "提交的表单数据:", this.formData);
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
            formatAppLog("log", "at components/GoodItem/GoodItem.vue:144", "Item-container: " + itemData.height);
            this.contentHeight = `${this.pxToRpx(this.Persons.length * 15 + 132 + 20)}rpx`;
            formatAppLog("log", "at components/GoodItem/GoodItem.vue:148", "调整后的高度:", this.contentHeight);
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
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:168", "GOODITEM-SELECTBILLUSER-START");
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:169", currentItems[this.index]);
        const result = await BillUser.selectInformationType("BillUser", "Billid", currentItems[this.index].id);
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:174", "nowBillPerson: ", result);
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
            formatAppLog("log", "at components/GoodItem/GoodItem.vue:188", "result: ", result1);
            this.Persons.push(...result1);
          } catch (error2) {
            formatAppLog("error", "at components/GoodItem/GoodItem.vue:193", "查询用户失败:", error2);
          } finally {
            this.loading = false;
          }
        }
        this.loading = false;
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:200", "Persons: ", this.Persons);
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:201", "loading ", this.loading);
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:202", "GOODITEM-SELECTBILLUSER-END");
      },
      editPer() {
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:206", "触发增加人员");
        this.$emit("edit-per", this.index);
      },
      deleteSelf() {
        formatAppLog("log", "at components/GoodItem/GoodItem.vue:210", this.index);
        this.$emit("delete-item", this.index);
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_collapse_item = resolveEasycom(vue.resolveDynamicComponent("uni-collapse-item"), __easycom_0$3);
    const _component_uni_collapse = resolveEasycom(vue.resolveDynamicComponent("uni-collapse"), __easycom_1$3);
    const _component_up_divider = resolveEasycom(vue.resolveDynamicComponent("up-divider"), __easycom_2$2);
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
              vue.createElementVNode("view", {
                class: "top-bar",
                onClick: _cache[1] || (_cache[1] = (...args) => $options.toggleModal && $options.toggleModal(...args))
              }, [
                vue.createElementVNode("view", {
                  style: { "font-size": "25rpx", "width": "200rpx" },
                  class: "text"
                }, "名称"),
                vue.createElementVNode("view", {
                  style: { "font-size": "25rpx", "width": "200rpx" },
                  class: "text"
                }, "数量"),
                vue.createElementVNode("view", {
                  style: { "font-size": "25rpx", "width": "200rpx" },
                  class: "text"
                }, "价格"),
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
                    onClick: _cache[2] || (_cache[2] = (...args) => $options.toggleModal && $options.toggleModal(...args)),
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
                    onClick: _cache[3] || (_cache[3] = (...args) => $options.toggleModal && $options.toggleModal(...args)),
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
                    onClick: _cache[4] || (_cache[4] = (...args) => $options.toggleModal && $options.toggleModal(...args)),
                    style: { "font-size": "25rpx", "width": "200rpx" }
                  },
                  vue.toDisplayString($props.showData.price),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("image", {
                  onClick: _cache[5] || (_cache[5] = (...args) => $options.deleteSelf && $options.deleteSelf(...args)),
                  src: _imports_1,
                  class: "set-info"
                })
              ]),
              vue.createVNode(_component_uni_collapse, { class: "collapse" }, {
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
              vue.createElementVNode("text", { style: { "font-size": "40rpx", "margin-top": "10rpx", "color": "#014520" } }, "填写内容"),
              vue.createElementVNode("view", {
                class: "close-button",
                onClick: _cache[6] || (_cache[6] = (...args) => $options.toggleModal && $options.toggleModal(...args))
              }, "×")
            ]),
            vue.createVNode(_component_up_divider),
            vue.createCommentVNode(" 表单内容 "),
            vue.createElementVNode(
              "form",
              {
                onSubmit: _cache[12] || (_cache[12] = vue.withModifiers((...args) => $options.submitForm && $options.submitForm(...args), ["prevent"]))
              },
              [
                vue.createElementVNode("view", { class: "form-group" }, [
                  vue.createElementVNode("text", null, "名称："),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      type: "text",
                      "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.formData.name = $event),
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
                      "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.formData.cnt = $event),
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
                      "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.formData.price = $event),
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
                  onClick: _cache[10] || (_cache[10] = (...args) => $options.submitForm && $options.submitForm(...args)),
                  class: "submit-button"
                }, "提交"),
                vue.createElementVNode("button", {
                  type: "button",
                  onClick: _cache[11] || (_cache[11] = (...args) => $options.editPer && $options.editPer(...args)),
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
      ondropdown(e2) {
        this.$emit("filter-change", e2);
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
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-bf970acd"], ["__file", "D:/uni/travel-new/uni_modules/uni-table/components/uni-th/uni-th.vue"]]);
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
        this.root.minWidth = Number(this.widthThArr.reduce((a2, b) => Number(a2) + Number(b))) + selectionWidth;
      }
    },
    unmounted() {
      const index2 = this.root.trChildren.findIndex((i2) => i2 === this);
      this.root.trChildren.splice(index2, 1);
      this.root.isNodata();
    },
    methods: {
      minWidthUpdate(width) {
        this.widthThArr.push(width);
        if (this.widthThArr.length > 0) {
          const selectionWidth = this.selection === "selection" ? 50 : 0;
          this.root.minWidth = Number(this.widthThArr.reduce((a2, b) => Number(a2) + Number(b))) + selectionWidth;
        }
      },
      // 选中
      checkboxSelected(e2) {
        let rootData = this.root.data.find((v) => v[this.root.rowKey] === this.keyValue);
        this.checked = e2.checked;
        this.root.check(rootData || this, e2.checked, rootData ? this.keyValue : null);
      },
      change(e2) {
        this.root.trChildren.forEach((item) => {
          if (item === this) {
            this.root.check(this, e2.detail.value.length > 0 ? true : false);
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
  function selectInformationType$1(name, aa, bb, cc, dd) {
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
          success(e2) {
            resolve(e2);
          },
          fail(e2) {
            reject(e2);
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
          success(e2) {
            resolve(e2);
          },
          fail(e2) {
            reject(e2);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("错误删除");
      });
    }
  }
  function modifyInformation$1(obj) {
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
            success(e2) {
              resolve(e2);
            },
            fail(e2) {
              reject(e2);
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
            success(e2) {
              resolve(e2);
            },
            fail(e2) {
              reject(e2);
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
    selectInformationType: selectInformationType$1,
    deleteInformationType: deleteInformationType$1,
    modifyInformation: modifyInformation$1,
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
          formatAppLog("warn", "at pages/PayBill/index.vue:165", "当前项目列表为空");
          return [];
        }
        const selectedProject = ((_a = this.projects[this.selectedProjectIndex]) == null ? void 0 : _a.projectName) || "默认项目";
        formatAppLog("log", "at pages/PayBill/index.vue:169", "当前project:" + selectedProject);
        formatAppLog("log", "at pages/PayBill/index.vue:170", "看看账单：" + this.projectItems[selectedProject]);
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
          utils.initializeDB();
          formatAppLog("log", "at pages/PayBill/index.vue:195", "重新加载数据...");
          await this.selectProjects();
          await this.updateprojectBill();
          await this.selectAllPer();
          formatAppLog("log", "at pages/PayBill/index.vue:199", "数据重新加载完成");
        } catch (error2) {
          formatAppLog("error", "at pages/PayBill/index.vue:201", "重新加载数据时出错：", error2);
        }
      },
      //选中人员
      selectionChange(selectedRows) {
        formatAppLog("log", "at pages/PayBill/index.vue:206", "选中的行", selectedRows);
        const selectedRow = selectedRows.detail.index || [];
        this.nowBillPerson = selectedRow;
      },
      setDefaultSelection() {
        const selectedUserIds = this.nowBillPerson.map((person) => person.userid);
        formatAppLog("log", "at pages/PayBill/index.vue:214", "selectedUserIds ", selectedUserIds);
        const matchedDetails = this.AllPerson.map((person, index3) => ({
          person,
          index: index3
        })).filter(({
          person
        }) => selectedUserIds.includes(person.id));
        formatAppLog("log", "at pages/PayBill/index.vue:226", "matchedDetails ", matchedDetails);
        const index2 = matchedDetails.map(({
          index: index3
        }) => index3);
        formatAppLog("log", "at pages/PayBill/index.vue:234", "detail ", index2);
        this.$refs.tableRef.toggleRowSelection(index2, true);
      },
      //编辑账单人员
      async selectAllPer() {
        const result = await util.selectInformationType("user");
        formatAppLog("log", "at pages/PayBill/index.vue:242", "找出的AllPerson", result);
        this.AllPerson = result;
        uni.setStorageSync(STORAGE_KEYS.AllPerson, result);
      },
      editPer(index2) {
        this.showModaleditPer = true;
        this.selectAllPer().then(() => this.selectBillUser(index2).then(() => this.setDefaultSelection()));
      },
      async selectBillUser(index2) {
        formatAppLog("log", "at pages/PayBill/index.vue:251", this.currentItems[index2]);
        const result = await BillUser.selectInformationType("BillUser", "Billid", this.currentItems[index2].id);
        formatAppLog("log", "at pages/PayBill/index.vue:253", "当前账单: " + this.currentItems[index2] + "result: ", result);
        this.nowBillId = this.currentItems[index2].id;
        this.nowBillPerson = result;
        formatAppLog("log", "at pages/PayBill/index.vue:256", "nowBillPerson: ", result);
      },
      updateBillUserToDB() {
        formatAppLog("log", "at pages/PayBill/index.vue:261", this.nowBillPerson);
        const result = this.nowBillPerson.map((index2) => this.AllPerson[index2].id);
        formatAppLog("log", "at pages/PayBill/index.vue:265", "选中的用户id:", result);
        formatAppLog("log", "at pages/PayBill/index.vue:266", "当前账单Id:", this.nowBillId);
        const result1 = result.map((userId) => {
          return {
            userid: userId,
            // 用户 id
            billid: this.nowBillId
            // 当前账单 id
          };
        });
        BillUser.deleteInformationType("BillUser", "Billid", this.nowBillId);
        formatAppLog("log", "at pages/PayBill/index.vue:276", "选中的用户与账单合成对象:", result1);
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
        formatAppLog("log", "at pages/PayBill/index.vue:287", "SELECTPROJECTS: ", this.projects);
        this.projectNames = this.projects.map(
          (project2) => `${project2.id}: ${project2.projectName}`
        );
        this.selectedProjectIndex = 0;
        formatAppLog("log", "at pages/PayBill/index.vue:292", this.projects);
      },
      handleProjectChange(e2) {
        formatAppLog("log", "at pages/PayBill/index.vue:295", "e" + e2);
        this.selectedProjectIndex = parseInt(e2.detail.value, 10);
        uni.setStorageSync(STORAGE_KEYS.nowproject, this.projects[this.selectedProjectIndex]);
        formatAppLog("log", "at pages/PayBill/index.vue:298", "测试本地缓存", uni.getStorageSync(STORAGE_KEYS.nowproject));
        formatAppLog("log", "at pages/PayBill/index.vue:299", "切换到项目:", this.projects[this.selectedProjectIndex].projectName);
        this.updateprojectBill();
      },
      //更新Item
      handleDelete(index2) {
        this.projects[this.selectedProjectIndex].id;
        formatAppLog("log", "at pages/PayBill/index.vue:305", this.currentItems[index2]);
        Bill.deleteInformationType("Bill", "id", this.currentItems[index2].id).then(() => this.updateprojectBill());
        BillUser.deleteInformationType("BillUser", "Billid", this.currentItems[index2].id);
      },
      handleUpdate(index2, updatedItem) {
        formatAppLog("log", "at pages/PayBill/index.vue:312", "更新索引：", index2, "更新数据：", updatedItem);
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
        formatAppLog("log", "at pages/PayBill/index.vue:348", "当前index: " + this.selectedProjectIndex);
        const selectedProjectId = this.projects[this.selectedProjectIndex].id;
        const selectedProject = this.projects[this.selectedProjectIndex].projectName;
        formatAppLog("log", "at pages/PayBill/index.vue:351", "当前projects:", this.projects);
        const result = await Bill.selectInformationType("Bill", "projectId", selectedProjectId);
        formatAppLog("log", "at pages/PayBill/index.vue:353", "更新项目账单： ", result);
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
        formatAppLog("log", "at pages/PayBill/index.vue:369", "添加新项目:", this.newProjectName);
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
      //结算页面，开始生成账单
      handleSettle() {
        uni.setStorageSync(STORAGE_KEYS.nowproject, this.projects[this.selectedProjectIndex]);
        formatAppLog("log", "at pages/PayBill/index.vue:387", "当前项目的结算数据:", this.currentItems);
        formatAppLog("log", "at pages/PayBill/index.vue:388", "存入的project ", uni.getStorageSync(STORAGE_KEYS.nowproject));
        uni.navigateTo({
          url: "/pages/settleBill/settleBill"
        });
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
          BillUser.deleteInformationType("BillUser", "Billid", obj.id);
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
    const _component_uni_th = resolveEasycom(vue.resolveDynamicComponent("uni-th"), __easycom_1$1);
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
          vue.createElementVNode("view", {
            class: "modal-header",
            style: { "color": "#014520" }
          }, "添加项目"),
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
          vue.createElementVNode("view", {
            class: "modal-header",
            style: { "color": "#014520" }
          }, "添加账目"),
          vue.createElementVNode("view", { class: "modal-body" }, [
            vue.createElementVNode("view", { style: { "margin-top": "30rpx", "color": "#014520" } }, [
              vue.createElementVNode("text", { style: { "margin-right": "500rpx", "color": "#014520" } }, "名称"),
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
              ])
            ]),
            vue.createElementVNode("view", { style: { "margin-top": "30rpx", "color": "#014520" } }, [
              vue.createElementVNode("text", { style: { "margin-right": "500rpx" } }, "数量"),
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
              ])
            ]),
            vue.createElementVNode("view", { style: { "margin-top": "30rpx", "color": "#014520" } }, [
              vue.createElementVNode("text", { style: { "margin-right": "500rpx" } }, "价格"),
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
          vue.createElementVNode("view", {
            class: "modal-header",
            style: { "color": "#014520" }
          }, "编辑项目"),
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
          vue.createElementVNode("view", {
            class: "modal-header",
            style: { "color": "#014520" }
          }, "编辑人员"),
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
  const props$4 = defineMixin({
    props: {
      // 图标类名
      name: {
        type: String,
        default: () => props$7.icon.name
      },
      // 图标颜色，可接受主题色
      color: {
        type: String,
        default: () => props$7.icon.color
      },
      // 字体大小，单位px
      size: {
        type: [String, Number],
        default: () => props$7.icon.size
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: () => props$7.icon.bold
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [String, Number],
        default: () => props$7.icon.index
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: () => props$7.icon.hoverClass
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: () => props$7.icon.customPrefix
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: () => props$7.icon.label
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: () => props$7.icon.labelPos
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: () => props$7.icon.labelSize
      },
      // label的颜色
      labelColor: {
        type: String,
        default: () => props$7.icon.labelColor
      },
      // label与图标的距离
      space: {
        type: [String, Number],
        default: () => props$7.icon.space
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: () => props$7.icon.imgMode
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: () => props$7.icon.width
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: () => props$7.icon.height
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: () => props$7.icon.top
      },
      // 是否阻止事件传播
      stop: {
        type: Boolean,
        default: () => props$7.icon.stop
      }
    }
  });
  const _sfc_main$7 = {
    name: "u-icon",
    data() {
      return {};
    },
    emits: ["click"],
    mixins: [mpMixin, mixin, props$4],
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
      clickHandler(e2) {
        this.$emit("click", this.index);
        this.stop && this.preventEvent(e2);
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
  const props$3 = defineMixin({
    props: {
      // 搜索框形状，round-圆形，square-方形
      shape: {
        type: String,
        default: () => props$7.search.shape
      },
      // 搜索框背景色，默认值#f2f2f2
      bgColor: {
        type: String,
        default: () => props$7.search.bgColor
      },
      // 占位提示文字
      placeholder: {
        type: String,
        default: () => props$7.search.placeholder
      },
      // 是否启用清除控件
      clearabled: {
        type: Boolean,
        default: () => props$7.search.clearabled
      },
      // 是否自动聚焦
      focus: {
        type: Boolean,
        default: () => props$7.search.focus
      },
      // 是否在搜索框右侧显示取消按钮
      showAction: {
        type: Boolean,
        default: () => props$7.search.showAction
      },
      // 右边控件的样式
      actionStyle: {
        type: Object,
        default: () => props$7.search.actionStyle
      },
      // 取消按钮文字
      actionText: {
        type: String,
        default: () => props$7.search.actionText
      },
      // 输入框内容对齐方式，可选值为 left|center|right
      inputAlign: {
        type: String,
        default: () => props$7.search.inputAlign
      },
      // input输入框的样式，可以定义文字颜色，大小等，对象形式
      inputStyle: {
        type: Object,
        default: () => props$7.search.inputStyle
      },
      // 是否启用输入框
      disabled: {
        type: Boolean,
        default: () => props$7.search.disabled
      },
      // 边框颜色
      borderColor: {
        type: String,
        default: () => props$7.search.borderColor
      },
      // 搜索图标的颜色，默认同输入框字体颜色
      searchIconColor: {
        type: String,
        default: () => props$7.search.searchIconColor
      },
      // 输入框字体颜色
      color: {
        type: String,
        default: () => props$7.search.color
      },
      // placeholder的颜色
      placeholderColor: {
        type: String,
        default: () => props$7.search.placeholderColor
      },
      // 左边输入框的图标，可以为uView图标名称或图片路径
      searchIcon: {
        type: String,
        default: () => props$7.search.searchIcon
      },
      searchIconSize: {
        type: [Number, String],
        default: () => props$7.search.searchIconSize
      },
      // 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30px"、"30px 20px"等写法
      margin: {
        type: String,
        default: () => props$7.search.margin
      },
      // 开启showAction时，是否在input获取焦点时才显示
      animation: {
        type: Boolean,
        default: () => props$7.search.animation
      },
      // 输入框的初始化内容
      modelValue: {
        type: String,
        default: () => props$7.search.value
      },
      value: {
        type: String,
        default: () => props$7.search.value
      },
      // 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档)
      maxlength: {
        type: [String, Number],
        default: () => props$7.search.maxlength
      },
      // 搜索框高度，单位px
      height: {
        type: [String, Number],
        default: () => props$7.search.height
      },
      // 搜索框左侧文本
      label: {
        type: [String, Number, null],
        default: () => props$7.search.label
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
    mixins: [mpMixin, mixin, props$3],
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
      inputChange(e2) {
        this.keyword = e2.detail.value;
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
      search(e2) {
        this.$emit("search", e2.detail.value);
        try {
          uni.hideKeyboard();
        } catch (e3) {
        }
      },
      // 点击右边自定义按钮的事件
      custom() {
        this.$emit("custom", this.keyword);
        try {
          uni.hideKeyboard();
        } catch (e2) {
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
      clickIcon(e2) {
        this.$emit("clickIcon", this.keyword);
        try {
          uni.hideKeyboard();
        } catch (e3) {
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
  const props$2 = defineMixin({
    props: {
      // 标题
      title: {
        type: [String, Number],
        default: () => props$7.cell.title
      },
      // 标题下方的描述信息
      label: {
        type: [String, Number],
        default: () => props$7.cell.label
      },
      // 右侧的内容
      value: {
        type: [String, Number],
        default: () => props$7.cell.value
      },
      // 左侧图标名称，或者图片链接(本地文件建议使用绝对地址)
      icon: {
        type: String,
        default: () => props$7.cell.icon
      },
      // 是否禁用cell
      disabled: {
        type: Boolean,
        default: () => props$7.cell.disabled
      },
      // 是否显示下边框
      border: {
        type: Boolean,
        default: () => props$7.cell.border
      },
      // 内容是否垂直居中(主要是针对右侧的value部分)
      center: {
        type: Boolean,
        default: () => props$7.cell.center
      },
      // 点击后跳转的URL地址
      url: {
        type: String,
        default: () => props$7.cell.url
      },
      // 链接跳转的方式，内部使用的是uView封装的route方法，可能会进行拦截操作
      linkType: {
        type: String,
        default: () => props$7.cell.linkType
      },
      // 是否开启点击反馈(表现为点击时加上灰色背景)
      clickable: {
        type: Boolean,
        default: () => props$7.cell.clickable
      },
      // 是否展示右侧箭头并开启点击反馈
      isLink: {
        type: Boolean,
        default: () => props$7.cell.isLink
      },
      // 是否显示表单状态下的必填星号(此组件可能会内嵌入input组件)
      required: {
        type: Boolean,
        default: () => props$7.cell.required
      },
      // 右侧的图标箭头
      rightIcon: {
        type: String,
        default: () => props$7.cell.rightIcon
      },
      // 右侧箭头的方向，可选值为：left，up，down
      arrowDirection: {
        type: String,
        default: () => props$7.cell.arrowDirection
      },
      // 左侧图标样式
      iconStyle: {
        type: [Object, String],
        default: () => {
          return props$7.cell.iconStyle;
        }
      },
      // 右侧箭头图标的样式
      rightIconStyle: {
        type: [Object, String],
        default: () => {
          return props$7.cell.rightIconStyle;
        }
      },
      // 标题的样式
      titleStyle: {
        type: [Object, String],
        default: () => {
          return props$7.cell.titleStyle;
        }
      },
      // 单位元的大小，可选值为large
      size: {
        type: String,
        default: () => props$7.cell.size
      },
      // 点击cell是否阻止事件传播
      stop: {
        type: Boolean,
        default: () => props$7.cell.stop
      },
      // 标识符，cell被点击时返回
      name: {
        type: [Number, String],
        default: () => props$7.cell.name
      }
    }
  });
  const _sfc_main$5 = {
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
      clickHandler(e2) {
        if (this.disabled)
          return;
        this.$emit("click", {
          name: this.name
        });
        this.openPage();
        this.stop && this.preventEvent(e2);
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$1);
    const _component_u_line = resolveEasycom(vue.resolveDynamicComponent("u-line"), __easycom_1$2);
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
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-b4243719"], ["__file", "D:/uni/travel-new/node_modules/uview-plus/components/u-cell/u-cell.vue"]]);
  const props$1 = defineMixin({
    props: {
      // 用于滚动到指定item
      anchor: {
        type: [String, Number],
        default: () => props$7.listItem.anchor
      }
    }
  });
  const _sfc_main$4 = {
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
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["u-list-item", [`u-list-item-${_ctx.anchor}`]]),
      ref: `u-list-item-${_ctx.anchor}`,
      anchor: `u-list-item-${_ctx.anchor}`
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 10, ["anchor"]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-32197ac9"], ["__file", "D:/uni/travel-new/node_modules/uview-plus/components/u-list-item/u-list-item.vue"]]);
  const props = defineMixin({
    props: {
      // 控制是否出现滚动条，仅nvue有效
      showScrollbar: {
        type: Boolean,
        default: () => props$7.list.showScrollbar
      },
      // 距底部多少时触发scrolltolower事件
      lowerThreshold: {
        type: [String, Number],
        default: () => props$7.list.lowerThreshold
      },
      // 距顶部多少时触发scrolltoupper事件，非nvue有效
      upperThreshold: {
        type: [String, Number],
        default: () => props$7.list.upperThreshold
      },
      // 设置竖向滚动条位置
      scrollTop: {
        type: [String, Number],
        default: () => props$7.list.scrollTop
      },
      // 控制 onscroll 事件触发的频率，仅nvue有效
      offsetAccuracy: {
        type: [String, Number],
        default: () => props$7.list.offsetAccuracy
      },
      // 启用 flexbox 布局。开启后，当前节点声明了display: flex就会成为flex container，并作用于其孩子节点，仅微信小程序有效
      enableFlex: {
        type: Boolean,
        default: () => props$7.list.enableFlex
      },
      // 是否按分页模式显示List，默认值false
      pagingEnabled: {
        type: Boolean,
        default: () => props$7.list.pagingEnabled
      },
      // 是否允许List滚动
      scrollable: {
        type: Boolean,
        default: () => props$7.list.scrollable
      },
      // 值应为某子元素id（id不能以数字开头）
      scrollIntoView: {
        type: String,
        default: () => props$7.list.scrollIntoView
      },
      // 在设置滚动条位置时使用动画过渡
      scrollWithAnimation: {
        type: Boolean,
        default: () => props$7.list.scrollWithAnimation
      },
      // iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只对微信小程序有效
      enableBackToTop: {
        type: Boolean,
        default: () => props$7.list.enableBackToTop
      },
      // 列表的高度
      height: {
        type: [String, Number],
        default: () => props$7.list.height
      },
      // 列表宽度
      width: {
        type: [String, Number],
        default: () => props$7.list.width
      },
      // 列表前后预渲染的屏数，1代表一个屏幕的高度，1.5代表1个半屏幕高度
      preLoadScreen: {
        type: [String, Number],
        default: () => props$7.list.preLoadScreen
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
  const _sfc_main$3 = {
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
      onScroll(e2) {
        let scrollTop = 0;
        scrollTop = e2.detail.scrollTop;
        this.innerScrollTop = scrollTop;
        this.$emit("scroll", scrollTop);
      },
      scrollIntoViewById(id) {
      },
      // 滚动到底部触发事件
      scrolltolower(e2) {
        sleep(30).then(() => {
          this.$emit("scrolltolower");
        });
      },
      // 滚动到底部时触发，非nvue有效
      scrolltoupper(e2) {
        sleep(30).then(() => {
          this.$emit("scrolltoupper");
          this.offset = 0;
        });
      },
      refresherpulling(e2) {
        this.$emit("refresherpulling", e2);
      },
      refresherrefresh(e2) {
        this.$emit("refresherrefresh", e2);
      },
      refresherrestore(e2) {
        this.$emit("refresherrestore", e2);
      },
      refresherabort(e2) {
        this.$emit("refresherabort", e2);
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-9ad03670"], ["__file", "D:/uni/travel-new/node_modules/uview-plus/components/u-list/u-list.vue"]]);
  const _imports_0 = "/static/GoodItem/deleteWhite.png";
  const keyword = vue.ref("");
  const _sfc_main$2 = {
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
        formatAppLog("log", "at pages/home/index.vue:72", "要删除的名字" + name);
        try {
          const result = await util.deleteUser(name);
          formatAppLog("log", "at pages/home/index.vue:76", "用户" + name + "删除成功：");
          this.handleSearch();
        } catch (error2) {
          formatAppLog("error", "at pages/home/index.vue:79", "加载用户失败：", error2);
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
            formatAppLog("log", "at pages/home/index.vue:108", "按条件搜索： " + keyword2);
            result = await util.selectInformationType("user", "name", '"' + keyword2 + '%"');
            formatAppLog("log", "at pages/home/index.vue:111", "result: ", result);
          }
          formatAppLog("log", "at pages/home/index.vue:113", "用户列表加载成功：", result);
          this.indexList = result;
        } catch (error2) {
          formatAppLog("error", "at pages/home/index.vue:116", "加载用户失败：", error2);
          uni.showToast({
            title: "加载用户失败",
            icon: "none"
          });
        }
      },
      async loadUsers() {
        try {
          const result = await util.selectInformationType("user");
          formatAppLog("log", "at pages/home/index.vue:127", "用户列表加载成功：", result);
          this.indexList = result;
          uni.setStorageSync("AllPerson", result);
        } catch (error2) {
          formatAppLog("error", "at pages/home/index.vue:131", "加载用户失败：", error2);
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
        for (let i2 = 0; i2 < 30; i2++) {
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
          formatAppLog("error", "at pages/home/index.vue:178", "添加用户失败：", error2);
          uni.showToast({
            title: "用户添加失败",
            icon: "none"
          });
        }
      }
    },
    mounted() {
      utils.initializeDB();
      this.loadUsers();
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_up_search = resolveEasycom(vue.resolveDynamicComponent("up-search"), __easycom_0);
    const _component_up_cell = resolveEasycom(vue.resolveDynamicComponent("up-cell"), __easycom_1);
    const _component_up_list_item = resolveEasycom(vue.resolveDynamicComponent("up-list-item"), __easycom_2);
    const _component_up_list = resolveEasycom(vue.resolveDynamicComponent("up-list"), __easycom_3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 列表 "),
      vue.createVNode(_component_up_search, {
        style: { "background-color": "white" },
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
                      "title-style": `color:white`,
                      title: item.name
                    }, null, 8, ["title"]),
                    vue.createElementVNode("image", {
                      src: _imports_0,
                      style: { "margin-top": "13rpx", "height": "30rpx", "width": "30rpx", "margin-right": "35rpx" },
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
          vue.createElementVNode("view", {
            class: "modal-header",
            style: { "color": "#014520" }
          }, "添加用户"),
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
  const PagesHomeIndex = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-4978fed5"], ["__file", "D:/uni/travel-new/pages/home/index.vue"]]);
  function selectInformationType(name, aa, bb, cc, dd) {
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
      formatAppLog("log", "at common/util/settleBill.js:21", sql);
      return new Promise((resolve, reject) => {
        plus.sqlite.selectSql({
          name: "travel",
          sql,
          success(e2) {
            resolve(e2);
          },
          fail(e2) {
            reject(e2);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("错误查询");
      });
    }
  }
  function selectBillUser(name, aa) {
    var sql = "select * from Bill,user,BillUser where BillUser.Billid =" + aa + " and BillUser.userid=user.id and Bill.id=BillUser.Billid  order by id desc";
    formatAppLog("log", "at common/util/settleBill.js:47", sql);
    return new Promise((resolve, reject) => {
      plus.sqlite.selectSql({
        name: "travel",
        sql,
        success(e2) {
          resolve(e2);
        },
        fail(e2) {
          reject(e2);
        }
      });
    });
  }
  function deleteInformationType(name, sol, qq, ww, ee) {
    if (name !== void 0) {
      if (ww !== void 0) {
        var sql = "delete from " + name + " where " + sol + '="' + qq + '" and ' + ww + "=" + ee;
      } else if (sol !== void 0) {
        var sql = "delete from " + name + " where " + sol + '="' + qq + '"';
      } else {
        var sql = "delete  from " + name;
      }
      formatAppLog("log", "at common/util/settleBill.js:78", sql);
      return new Promise((resolve, reject) => {
        plus.sqlite.executeSql({
          name: "travel",
          sql,
          success(e2) {
            resolve(e2);
          },
          fail(e2) {
            reject(e2);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("错误删除");
      });
    }
  }
  function modifyInformation(listName, name, cont, use, sel) {
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
        success(e2) {
          resolve(e2);
        },
        fail(e2) {
          reject(e2);
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
        formatAppLog("log", "at common/util/settleBill.js:136", id + " " + name);
        var sql = 'insert into project(projectId,projectName) values("' + id + '","' + name + '")';
        formatAppLog("log", "at common/util/settleBill.js:139", sql);
        return new Promise((resolve, reject) => {
          plus.sqlite.executeSql({
            name: "travel",
            sql,
            success(e2) {
              resolve(e2);
            },
            fail(e2) {
              reject(e2);
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
  const settleBill = {
    selectInformationType,
    deleteInformationType,
    modifyInformation,
    addUser,
    selectBillUser
  };
  /*!
   * html2canvas 1.4.1 <https://html2canvas.hertzen.com>
   * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
   * Released under MIT License
   */
  /*! *****************************************************************************
      Copyright (c) Microsoft Corporation.
  
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
  
      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** */
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e2) {
          reject(e2);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e2) {
          reject(e2);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f2, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e2) {
          op = [6, e2];
          y = 0;
        } finally {
          f2 = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  var Bounds = (
    /** @class */
    function() {
      function Bounds2(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
      }
      Bounds2.prototype.add = function(x, y, w, h) {
        return new Bounds2(this.left + x, this.top + y, this.width + w, this.height + h);
      };
      Bounds2.fromClientRect = function(context, clientRect) {
        return new Bounds2(clientRect.left + context.windowBounds.left, clientRect.top + context.windowBounds.top, clientRect.width, clientRect.height);
      };
      Bounds2.fromDOMRectList = function(context, domRectList) {
        var domRect = Array.from(domRectList).find(function(rect) {
          return rect.width !== 0;
        });
        return domRect ? new Bounds2(domRect.left + context.windowBounds.left, domRect.top + context.windowBounds.top, domRect.width, domRect.height) : Bounds2.EMPTY;
      };
      Bounds2.EMPTY = new Bounds2(0, 0, 0, 0);
      return Bounds2;
    }()
  );
  var parseBounds = function(context, node) {
    return Bounds.fromClientRect(context, node.getBoundingClientRect());
  };
  var toCodePoints$1 = function(str) {
    var codePoints = [];
    var i2 = 0;
    var length = str.length;
    while (i2 < length) {
      var value = str.charCodeAt(i2++);
      if (value >= 55296 && value <= 56319 && i2 < length) {
        var extra = str.charCodeAt(i2++);
        if ((extra & 64512) === 56320) {
          codePoints.push(((value & 1023) << 10) + (extra & 1023) + 65536);
        } else {
          codePoints.push(value);
          i2--;
        }
      } else {
        codePoints.push(value);
      }
    }
    return codePoints;
  };
  var fromCodePoint$1 = function() {
    var codePoints = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      codePoints[_i] = arguments[_i];
    }
    if (String.fromCodePoint) {
      return String.fromCodePoint.apply(String, codePoints);
    }
    var length = codePoints.length;
    if (!length) {
      return "";
    }
    var codeUnits = [];
    var index2 = -1;
    var result = "";
    while (++index2 < length) {
      var codePoint = codePoints[index2];
      if (codePoint <= 65535) {
        codeUnits.push(codePoint);
      } else {
        codePoint -= 65536;
        codeUnits.push((codePoint >> 10) + 55296, codePoint % 1024 + 56320);
      }
      if (index2 + 1 === length || codeUnits.length > 16384) {
        result += String.fromCharCode.apply(String, codeUnits);
        codeUnits.length = 0;
      }
    }
    return result;
  };
  var chars$2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var lookup$2 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
  for (var i$2 = 0; i$2 < chars$2.length; i$2++) {
    lookup$2[chars$2.charCodeAt(i$2)] = i$2;
  }
  var chars$1$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var lookup$1$1 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
  for (var i$1$1 = 0; i$1$1 < chars$1$1.length; i$1$1++) {
    lookup$1$1[chars$1$1.charCodeAt(i$1$1)] = i$1$1;
  }
  var decode$1 = function(base642) {
    var bufferLength = base642.length * 0.75, len = base642.length, i2, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base642[base642.length - 1] === "=") {
      bufferLength--;
      if (base642[base642.length - 2] === "=") {
        bufferLength--;
      }
    }
    var buffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined" && typeof Uint8Array.prototype.slice !== "undefined" ? new ArrayBuffer(bufferLength) : new Array(bufferLength);
    var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);
    for (i2 = 0; i2 < len; i2 += 4) {
      encoded1 = lookup$1$1[base642.charCodeAt(i2)];
      encoded2 = lookup$1$1[base642.charCodeAt(i2 + 1)];
      encoded3 = lookup$1$1[base642.charCodeAt(i2 + 2)];
      encoded4 = lookup$1$1[base642.charCodeAt(i2 + 3)];
      bytes[p++] = encoded1 << 2 | encoded2 >> 4;
      bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
      bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
  };
  var polyUint16Array$1 = function(buffer) {
    var length = buffer.length;
    var bytes = [];
    for (var i2 = 0; i2 < length; i2 += 2) {
      bytes.push(buffer[i2 + 1] << 8 | buffer[i2]);
    }
    return bytes;
  };
  var polyUint32Array$1 = function(buffer) {
    var length = buffer.length;
    var bytes = [];
    for (var i2 = 0; i2 < length; i2 += 4) {
      bytes.push(buffer[i2 + 3] << 24 | buffer[i2 + 2] << 16 | buffer[i2 + 1] << 8 | buffer[i2]);
    }
    return bytes;
  };
  var UTRIE2_SHIFT_2$1 = 5;
  var UTRIE2_SHIFT_1$1 = 6 + 5;
  var UTRIE2_INDEX_SHIFT$1 = 2;
  var UTRIE2_SHIFT_1_2$1 = UTRIE2_SHIFT_1$1 - UTRIE2_SHIFT_2$1;
  var UTRIE2_LSCP_INDEX_2_OFFSET$1 = 65536 >> UTRIE2_SHIFT_2$1;
  var UTRIE2_DATA_BLOCK_LENGTH$1 = 1 << UTRIE2_SHIFT_2$1;
  var UTRIE2_DATA_MASK$1 = UTRIE2_DATA_BLOCK_LENGTH$1 - 1;
  var UTRIE2_LSCP_INDEX_2_LENGTH$1 = 1024 >> UTRIE2_SHIFT_2$1;
  var UTRIE2_INDEX_2_BMP_LENGTH$1 = UTRIE2_LSCP_INDEX_2_OFFSET$1 + UTRIE2_LSCP_INDEX_2_LENGTH$1;
  var UTRIE2_UTF8_2B_INDEX_2_OFFSET$1 = UTRIE2_INDEX_2_BMP_LENGTH$1;
  var UTRIE2_UTF8_2B_INDEX_2_LENGTH$1 = 2048 >> 6;
  var UTRIE2_INDEX_1_OFFSET$1 = UTRIE2_UTF8_2B_INDEX_2_OFFSET$1 + UTRIE2_UTF8_2B_INDEX_2_LENGTH$1;
  var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH$1 = 65536 >> UTRIE2_SHIFT_1$1;
  var UTRIE2_INDEX_2_BLOCK_LENGTH$1 = 1 << UTRIE2_SHIFT_1_2$1;
  var UTRIE2_INDEX_2_MASK$1 = UTRIE2_INDEX_2_BLOCK_LENGTH$1 - 1;
  var slice16$1 = function(view, start, end) {
    if (view.slice) {
      return view.slice(start, end);
    }
    return new Uint16Array(Array.prototype.slice.call(view, start, end));
  };
  var slice32$1 = function(view, start, end) {
    if (view.slice) {
      return view.slice(start, end);
    }
    return new Uint32Array(Array.prototype.slice.call(view, start, end));
  };
  var createTrieFromBase64$1 = function(base642, _byteLength) {
    var buffer = decode$1(base642);
    var view32 = Array.isArray(buffer) ? polyUint32Array$1(buffer) : new Uint32Array(buffer);
    var view16 = Array.isArray(buffer) ? polyUint16Array$1(buffer) : new Uint16Array(buffer);
    var headerLength = 24;
    var index2 = slice16$1(view16, headerLength / 2, view32[4] / 2);
    var data = view32[5] === 2 ? slice16$1(view16, (headerLength + view32[4]) / 2) : slice32$1(view32, Math.ceil((headerLength + view32[4]) / 4));
    return new Trie$1(view32[0], view32[1], view32[2], view32[3], index2, data);
  };
  var Trie$1 = (
    /** @class */
    function() {
      function Trie2(initialValue, errorValue, highStart, highValueIndex, index2, data) {
        this.initialValue = initialValue;
        this.errorValue = errorValue;
        this.highStart = highStart;
        this.highValueIndex = highValueIndex;
        this.index = index2;
        this.data = data;
      }
      Trie2.prototype.get = function(codePoint) {
        var ix;
        if (codePoint >= 0) {
          if (codePoint < 55296 || codePoint > 56319 && codePoint <= 65535) {
            ix = this.index[codePoint >> UTRIE2_SHIFT_2$1];
            ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
            return this.data[ix];
          }
          if (codePoint <= 65535) {
            ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET$1 + (codePoint - 55296 >> UTRIE2_SHIFT_2$1)];
            ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
            return this.data[ix];
          }
          if (codePoint < this.highStart) {
            ix = UTRIE2_INDEX_1_OFFSET$1 - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH$1 + (codePoint >> UTRIE2_SHIFT_1$1);
            ix = this.index[ix];
            ix += codePoint >> UTRIE2_SHIFT_2$1 & UTRIE2_INDEX_2_MASK$1;
            ix = this.index[ix];
            ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
            return this.data[ix];
          }
          if (codePoint <= 1114111) {
            return this.data[this.highValueIndex];
          }
        }
        return this.errorValue;
      };
      return Trie2;
    }()
  );
  var chars$3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var lookup$3 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
  for (var i$3 = 0; i$3 < chars$3.length; i$3++) {
    lookup$3[chars$3.charCodeAt(i$3)] = i$3;
  }
  var base64$1 = "KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==";
  var LETTER_NUMBER_MODIFIER = 50;
  var BK = 1;
  var CR$1 = 2;
  var LF$1 = 3;
  var CM = 4;
  var NL = 5;
  var WJ = 7;
  var ZW = 8;
  var GL = 9;
  var SP = 10;
  var ZWJ$1 = 11;
  var B2 = 12;
  var BA = 13;
  var BB = 14;
  var HY = 15;
  var CB = 16;
  var CL = 17;
  var CP = 18;
  var EX = 19;
  var IN = 20;
  var NS = 21;
  var OP = 22;
  var QU = 23;
  var IS = 24;
  var NU = 25;
  var PO = 26;
  var PR = 27;
  var SY = 28;
  var AI = 29;
  var AL = 30;
  var CJ = 31;
  var EB = 32;
  var EM = 33;
  var H2 = 34;
  var H3 = 35;
  var HL = 36;
  var ID = 37;
  var JL = 38;
  var JV = 39;
  var JT = 40;
  var RI$1 = 41;
  var SA = 42;
  var XX = 43;
  var ea_OP = [9001, 65288];
  var BREAK_MANDATORY = "!";
  var BREAK_NOT_ALLOWED$1 = "×";
  var BREAK_ALLOWED$1 = "÷";
  var UnicodeTrie$1 = createTrieFromBase64$1(base64$1);
  var ALPHABETICS = [AL, HL];
  var HARD_LINE_BREAKS = [BK, CR$1, LF$1, NL];
  var SPACE$1 = [SP, ZW];
  var PREFIX_POSTFIX = [PR, PO];
  var LINE_BREAKS = HARD_LINE_BREAKS.concat(SPACE$1);
  var KOREAN_SYLLABLE_BLOCK = [JL, JV, JT, H2, H3];
  var HYPHEN = [HY, BA];
  var codePointsToCharacterClasses = function(codePoints, lineBreak2) {
    if (lineBreak2 === void 0) {
      lineBreak2 = "strict";
    }
    var types = [];
    var indices = [];
    var categories = [];
    codePoints.forEach(function(codePoint, index2) {
      var classType = UnicodeTrie$1.get(codePoint);
      if (classType > LETTER_NUMBER_MODIFIER) {
        categories.push(true);
        classType -= LETTER_NUMBER_MODIFIER;
      } else {
        categories.push(false);
      }
      if (["normal", "auto", "loose"].indexOf(lineBreak2) !== -1) {
        if ([8208, 8211, 12316, 12448].indexOf(codePoint) !== -1) {
          indices.push(index2);
          return types.push(CB);
        }
      }
      if (classType === CM || classType === ZWJ$1) {
        if (index2 === 0) {
          indices.push(index2);
          return types.push(AL);
        }
        var prev = types[index2 - 1];
        if (LINE_BREAKS.indexOf(prev) === -1) {
          indices.push(indices[index2 - 1]);
          return types.push(prev);
        }
        indices.push(index2);
        return types.push(AL);
      }
      indices.push(index2);
      if (classType === CJ) {
        return types.push(lineBreak2 === "strict" ? NS : ID);
      }
      if (classType === SA) {
        return types.push(AL);
      }
      if (classType === AI) {
        return types.push(AL);
      }
      if (classType === XX) {
        if (codePoint >= 131072 && codePoint <= 196605 || codePoint >= 196608 && codePoint <= 262141) {
          return types.push(ID);
        } else {
          return types.push(AL);
        }
      }
      types.push(classType);
    });
    return [indices, types, categories];
  };
  var isAdjacentWithSpaceIgnored = function(a2, b, currentIndex, classTypes) {
    var current = classTypes[currentIndex];
    if (Array.isArray(a2) ? a2.indexOf(current) !== -1 : a2 === current) {
      var i2 = currentIndex;
      while (i2 <= classTypes.length) {
        i2++;
        var next = classTypes[i2];
        if (next === b) {
          return true;
        }
        if (next !== SP) {
          break;
        }
      }
    }
    if (current === SP) {
      var i2 = currentIndex;
      while (i2 > 0) {
        i2--;
        var prev = classTypes[i2];
        if (Array.isArray(a2) ? a2.indexOf(prev) !== -1 : a2 === prev) {
          var n = currentIndex;
          while (n <= classTypes.length) {
            n++;
            var next = classTypes[n];
            if (next === b) {
              return true;
            }
            if (next !== SP) {
              break;
            }
          }
        }
        if (prev !== SP) {
          break;
        }
      }
    }
    return false;
  };
  var previousNonSpaceClassType = function(currentIndex, classTypes) {
    var i2 = currentIndex;
    while (i2 >= 0) {
      var type = classTypes[i2];
      if (type === SP) {
        i2--;
      } else {
        return type;
      }
    }
    return 0;
  };
  var _lineBreakAtIndex = function(codePoints, classTypes, indicies, index2, forbiddenBreaks) {
    if (indicies[index2] === 0) {
      return BREAK_NOT_ALLOWED$1;
    }
    var currentIndex = index2 - 1;
    if (Array.isArray(forbiddenBreaks) && forbiddenBreaks[currentIndex] === true) {
      return BREAK_NOT_ALLOWED$1;
    }
    var beforeIndex = currentIndex - 1;
    var afterIndex = currentIndex + 1;
    var current = classTypes[currentIndex];
    var before = beforeIndex >= 0 ? classTypes[beforeIndex] : 0;
    var next = classTypes[afterIndex];
    if (current === CR$1 && next === LF$1) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (HARD_LINE_BREAKS.indexOf(current) !== -1) {
      return BREAK_MANDATORY;
    }
    if (HARD_LINE_BREAKS.indexOf(next) !== -1) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (SPACE$1.indexOf(next) !== -1) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (previousNonSpaceClassType(currentIndex, classTypes) === ZW) {
      return BREAK_ALLOWED$1;
    }
    if (UnicodeTrie$1.get(codePoints[currentIndex]) === ZWJ$1) {
      return BREAK_NOT_ALLOWED$1;
    }
    if ((current === EB || current === EM) && UnicodeTrie$1.get(codePoints[afterIndex]) === ZWJ$1) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (current === WJ || next === WJ) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (current === GL) {
      return BREAK_NOT_ALLOWED$1;
    }
    if ([SP, BA, HY].indexOf(current) === -1 && next === GL) {
      return BREAK_NOT_ALLOWED$1;
    }
    if ([CL, CP, EX, IS, SY].indexOf(next) !== -1) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (previousNonSpaceClassType(currentIndex, classTypes) === OP) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (isAdjacentWithSpaceIgnored(QU, OP, currentIndex, classTypes)) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (isAdjacentWithSpaceIgnored([CL, CP], NS, currentIndex, classTypes)) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (isAdjacentWithSpaceIgnored(B2, B2, currentIndex, classTypes)) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (current === SP) {
      return BREAK_ALLOWED$1;
    }
    if (current === QU || next === QU) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (next === CB || current === CB) {
      return BREAK_ALLOWED$1;
    }
    if ([BA, HY, NS].indexOf(next) !== -1 || current === BB) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (before === HL && HYPHEN.indexOf(current) !== -1) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (current === SY && next === HL) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (next === IN) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (ALPHABETICS.indexOf(next) !== -1 && current === NU || ALPHABETICS.indexOf(current) !== -1 && next === NU) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (current === PR && [ID, EB, EM].indexOf(next) !== -1 || [ID, EB, EM].indexOf(current) !== -1 && next === PO) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (ALPHABETICS.indexOf(current) !== -1 && PREFIX_POSTFIX.indexOf(next) !== -1 || PREFIX_POSTFIX.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (
      // (PR | PO) × ( OP | HY )? NU
      [PR, PO].indexOf(current) !== -1 && (next === NU || [OP, HY].indexOf(next) !== -1 && classTypes[afterIndex + 1] === NU) || // ( OP | HY ) × NU
      [OP, HY].indexOf(current) !== -1 && next === NU || // NU ×	(NU | SY | IS)
      current === NU && [NU, SY, IS].indexOf(next) !== -1
    ) {
      return BREAK_NOT_ALLOWED$1;
    }
    if ([NU, SY, IS, CL, CP].indexOf(next) !== -1) {
      var prevIndex = currentIndex;
      while (prevIndex >= 0) {
        var type = classTypes[prevIndex];
        if (type === NU) {
          return BREAK_NOT_ALLOWED$1;
        } else if ([SY, IS].indexOf(type) !== -1) {
          prevIndex--;
        } else {
          break;
        }
      }
    }
    if ([PR, PO].indexOf(next) !== -1) {
      var prevIndex = [CL, CP].indexOf(current) !== -1 ? beforeIndex : currentIndex;
      while (prevIndex >= 0) {
        var type = classTypes[prevIndex];
        if (type === NU) {
          return BREAK_NOT_ALLOWED$1;
        } else if ([SY, IS].indexOf(type) !== -1) {
          prevIndex--;
        } else {
          break;
        }
      }
    }
    if (JL === current && [JL, JV, H2, H3].indexOf(next) !== -1 || [JV, H2].indexOf(current) !== -1 && [JV, JT].indexOf(next) !== -1 || [JT, H3].indexOf(current) !== -1 && next === JT) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (KOREAN_SYLLABLE_BLOCK.indexOf(current) !== -1 && [IN, PO].indexOf(next) !== -1 || KOREAN_SYLLABLE_BLOCK.indexOf(next) !== -1 && current === PR) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (ALPHABETICS.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (current === IS && ALPHABETICS.indexOf(next) !== -1) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (ALPHABETICS.concat(NU).indexOf(current) !== -1 && next === OP && ea_OP.indexOf(codePoints[afterIndex]) === -1 || ALPHABETICS.concat(NU).indexOf(next) !== -1 && current === CP) {
      return BREAK_NOT_ALLOWED$1;
    }
    if (current === RI$1 && next === RI$1) {
      var i2 = indicies[currentIndex];
      var count = 1;
      while (i2 > 0) {
        i2--;
        if (classTypes[i2] === RI$1) {
          count++;
        } else {
          break;
        }
      }
      if (count % 2 !== 0) {
        return BREAK_NOT_ALLOWED$1;
      }
    }
    if (current === EB && next === EM) {
      return BREAK_NOT_ALLOWED$1;
    }
    return BREAK_ALLOWED$1;
  };
  var cssFormattedClasses = function(codePoints, options) {
    if (!options) {
      options = { lineBreak: "normal", wordBreak: "normal" };
    }
    var _a = codePointsToCharacterClasses(codePoints, options.lineBreak), indicies = _a[0], classTypes = _a[1], isLetterNumber = _a[2];
    if (options.wordBreak === "break-all" || options.wordBreak === "break-word") {
      classTypes = classTypes.map(function(type) {
        return [NU, AL, SA].indexOf(type) !== -1 ? ID : type;
      });
    }
    var forbiddenBreakpoints = options.wordBreak === "keep-all" ? isLetterNumber.map(function(letterNumber, i2) {
      return letterNumber && codePoints[i2] >= 19968 && codePoints[i2] <= 40959;
    }) : void 0;
    return [indicies, classTypes, forbiddenBreakpoints];
  };
  var Break = (
    /** @class */
    function() {
      function Break2(codePoints, lineBreak2, start, end) {
        this.codePoints = codePoints;
        this.required = lineBreak2 === BREAK_MANDATORY;
        this.start = start;
        this.end = end;
      }
      Break2.prototype.slice = function() {
        return fromCodePoint$1.apply(void 0, this.codePoints.slice(this.start, this.end));
      };
      return Break2;
    }()
  );
  var LineBreaker = function(str, options) {
    var codePoints = toCodePoints$1(str);
    var _a = cssFormattedClasses(codePoints, options), indicies = _a[0], classTypes = _a[1], forbiddenBreakpoints = _a[2];
    var length = codePoints.length;
    var lastEnd = 0;
    var nextIndex = 0;
    return {
      next: function() {
        if (nextIndex >= length) {
          return { done: true, value: null };
        }
        var lineBreak2 = BREAK_NOT_ALLOWED$1;
        while (nextIndex < length && (lineBreak2 = _lineBreakAtIndex(codePoints, classTypes, indicies, ++nextIndex, forbiddenBreakpoints)) === BREAK_NOT_ALLOWED$1) {
        }
        if (lineBreak2 !== BREAK_NOT_ALLOWED$1 || nextIndex === length) {
          var value = new Break(codePoints, lineBreak2, lastEnd, nextIndex);
          lastEnd = nextIndex;
          return { value, done: false };
        }
        return { done: true, value: null };
      }
    };
  };
  var FLAG_UNRESTRICTED = 1 << 0;
  var FLAG_ID = 1 << 1;
  var FLAG_INTEGER = 1 << 2;
  var FLAG_NUMBER = 1 << 3;
  var LINE_FEED = 10;
  var SOLIDUS = 47;
  var REVERSE_SOLIDUS = 92;
  var CHARACTER_TABULATION = 9;
  var SPACE = 32;
  var QUOTATION_MARK = 34;
  var EQUALS_SIGN = 61;
  var NUMBER_SIGN = 35;
  var DOLLAR_SIGN = 36;
  var PERCENTAGE_SIGN = 37;
  var APOSTROPHE = 39;
  var LEFT_PARENTHESIS = 40;
  var RIGHT_PARENTHESIS = 41;
  var LOW_LINE = 95;
  var HYPHEN_MINUS = 45;
  var EXCLAMATION_MARK = 33;
  var LESS_THAN_SIGN = 60;
  var GREATER_THAN_SIGN = 62;
  var COMMERCIAL_AT = 64;
  var LEFT_SQUARE_BRACKET = 91;
  var RIGHT_SQUARE_BRACKET = 93;
  var CIRCUMFLEX_ACCENT = 61;
  var LEFT_CURLY_BRACKET = 123;
  var QUESTION_MARK = 63;
  var RIGHT_CURLY_BRACKET = 125;
  var VERTICAL_LINE = 124;
  var TILDE = 126;
  var CONTROL = 128;
  var REPLACEMENT_CHARACTER = 65533;
  var ASTERISK = 42;
  var PLUS_SIGN = 43;
  var COMMA = 44;
  var COLON = 58;
  var SEMICOLON = 59;
  var FULL_STOP = 46;
  var NULL = 0;
  var BACKSPACE = 8;
  var LINE_TABULATION = 11;
  var SHIFT_OUT = 14;
  var INFORMATION_SEPARATOR_ONE = 31;
  var DELETE = 127;
  var EOF = -1;
  var ZERO = 48;
  var a = 97;
  var e = 101;
  var f = 102;
  var u = 117;
  var z = 122;
  var A = 65;
  var E = 69;
  var F = 70;
  var U = 85;
  var Z = 90;
  var isDigit = function(codePoint) {
    return codePoint >= ZERO && codePoint <= 57;
  };
  var isSurrogateCodePoint = function(codePoint) {
    return codePoint >= 55296 && codePoint <= 57343;
  };
  var isHex = function(codePoint) {
    return isDigit(codePoint) || codePoint >= A && codePoint <= F || codePoint >= a && codePoint <= f;
  };
  var isLowerCaseLetter = function(codePoint) {
    return codePoint >= a && codePoint <= z;
  };
  var isUpperCaseLetter = function(codePoint) {
    return codePoint >= A && codePoint <= Z;
  };
  var isLetter = function(codePoint) {
    return isLowerCaseLetter(codePoint) || isUpperCaseLetter(codePoint);
  };
  var isNonASCIICodePoint = function(codePoint) {
    return codePoint >= CONTROL;
  };
  var isWhiteSpace = function(codePoint) {
    return codePoint === LINE_FEED || codePoint === CHARACTER_TABULATION || codePoint === SPACE;
  };
  var isNameStartCodePoint = function(codePoint) {
    return isLetter(codePoint) || isNonASCIICodePoint(codePoint) || codePoint === LOW_LINE;
  };
  var isNameCodePoint = function(codePoint) {
    return isNameStartCodePoint(codePoint) || isDigit(codePoint) || codePoint === HYPHEN_MINUS;
  };
  var isNonPrintableCodePoint = function(codePoint) {
    return codePoint >= NULL && codePoint <= BACKSPACE || codePoint === LINE_TABULATION || codePoint >= SHIFT_OUT && codePoint <= INFORMATION_SEPARATOR_ONE || codePoint === DELETE;
  };
  var isValidEscape = function(c1, c2) {
    if (c1 !== REVERSE_SOLIDUS) {
      return false;
    }
    return c2 !== LINE_FEED;
  };
  var isIdentifierStart = function(c1, c2, c3) {
    if (c1 === HYPHEN_MINUS) {
      return isNameStartCodePoint(c2) || isValidEscape(c2, c3);
    } else if (isNameStartCodePoint(c1)) {
      return true;
    } else if (c1 === REVERSE_SOLIDUS && isValidEscape(c1, c2)) {
      return true;
    }
    return false;
  };
  var isNumberStart = function(c1, c2, c3) {
    if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
      if (isDigit(c2)) {
        return true;
      }
      return c2 === FULL_STOP && isDigit(c3);
    }
    if (c1 === FULL_STOP) {
      return isDigit(c2);
    }
    return isDigit(c1);
  };
  var stringToNumber = function(codePoints) {
    var c = 0;
    var sign = 1;
    if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
      if (codePoints[c] === HYPHEN_MINUS) {
        sign = -1;
      }
      c++;
    }
    var integers = [];
    while (isDigit(codePoints[c])) {
      integers.push(codePoints[c++]);
    }
    var int = integers.length ? parseInt(fromCodePoint$1.apply(void 0, integers), 10) : 0;
    if (codePoints[c] === FULL_STOP) {
      c++;
    }
    var fraction = [];
    while (isDigit(codePoints[c])) {
      fraction.push(codePoints[c++]);
    }
    var fracd = fraction.length;
    var frac = fracd ? parseInt(fromCodePoint$1.apply(void 0, fraction), 10) : 0;
    if (codePoints[c] === E || codePoints[c] === e) {
      c++;
    }
    var expsign = 1;
    if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
      if (codePoints[c] === HYPHEN_MINUS) {
        expsign = -1;
      }
      c++;
    }
    var exponent = [];
    while (isDigit(codePoints[c])) {
      exponent.push(codePoints[c++]);
    }
    var exp = exponent.length ? parseInt(fromCodePoint$1.apply(void 0, exponent), 10) : 0;
    return sign * (int + frac * Math.pow(10, -fracd)) * Math.pow(10, expsign * exp);
  };
  var LEFT_PARENTHESIS_TOKEN = {
    type: 2
    /* LEFT_PARENTHESIS_TOKEN */
  };
  var RIGHT_PARENTHESIS_TOKEN = {
    type: 3
    /* RIGHT_PARENTHESIS_TOKEN */
  };
  var COMMA_TOKEN = {
    type: 4
    /* COMMA_TOKEN */
  };
  var SUFFIX_MATCH_TOKEN = {
    type: 13
    /* SUFFIX_MATCH_TOKEN */
  };
  var PREFIX_MATCH_TOKEN = {
    type: 8
    /* PREFIX_MATCH_TOKEN */
  };
  var COLUMN_TOKEN = {
    type: 21
    /* COLUMN_TOKEN */
  };
  var DASH_MATCH_TOKEN = {
    type: 9
    /* DASH_MATCH_TOKEN */
  };
  var INCLUDE_MATCH_TOKEN = {
    type: 10
    /* INCLUDE_MATCH_TOKEN */
  };
  var LEFT_CURLY_BRACKET_TOKEN = {
    type: 11
    /* LEFT_CURLY_BRACKET_TOKEN */
  };
  var RIGHT_CURLY_BRACKET_TOKEN = {
    type: 12
    /* RIGHT_CURLY_BRACKET_TOKEN */
  };
  var SUBSTRING_MATCH_TOKEN = {
    type: 14
    /* SUBSTRING_MATCH_TOKEN */
  };
  var BAD_URL_TOKEN = {
    type: 23
    /* BAD_URL_TOKEN */
  };
  var BAD_STRING_TOKEN = {
    type: 1
    /* BAD_STRING_TOKEN */
  };
  var CDO_TOKEN = {
    type: 25
    /* CDO_TOKEN */
  };
  var CDC_TOKEN = {
    type: 24
    /* CDC_TOKEN */
  };
  var COLON_TOKEN = {
    type: 26
    /* COLON_TOKEN */
  };
  var SEMICOLON_TOKEN = {
    type: 27
    /* SEMICOLON_TOKEN */
  };
  var LEFT_SQUARE_BRACKET_TOKEN = {
    type: 28
    /* LEFT_SQUARE_BRACKET_TOKEN */
  };
  var RIGHT_SQUARE_BRACKET_TOKEN = {
    type: 29
    /* RIGHT_SQUARE_BRACKET_TOKEN */
  };
  var WHITESPACE_TOKEN = {
    type: 31
    /* WHITESPACE_TOKEN */
  };
  var EOF_TOKEN = {
    type: 32
    /* EOF_TOKEN */
  };
  var Tokenizer = (
    /** @class */
    function() {
      function Tokenizer2() {
        this._value = [];
      }
      Tokenizer2.prototype.write = function(chunk) {
        this._value = this._value.concat(toCodePoints$1(chunk));
      };
      Tokenizer2.prototype.read = function() {
        var tokens = [];
        var token = this.consumeToken();
        while (token !== EOF_TOKEN) {
          tokens.push(token);
          token = this.consumeToken();
        }
        return tokens;
      };
      Tokenizer2.prototype.consumeToken = function() {
        var codePoint = this.consumeCodePoint();
        switch (codePoint) {
          case QUOTATION_MARK:
            return this.consumeStringToken(QUOTATION_MARK);
          case NUMBER_SIGN:
            var c1 = this.peekCodePoint(0);
            var c2 = this.peekCodePoint(1);
            var c3 = this.peekCodePoint(2);
            if (isNameCodePoint(c1) || isValidEscape(c2, c3)) {
              var flags = isIdentifierStart(c1, c2, c3) ? FLAG_ID : FLAG_UNRESTRICTED;
              var value = this.consumeName();
              return { type: 5, value, flags };
            }
            break;
          case DOLLAR_SIGN:
            if (this.peekCodePoint(0) === EQUALS_SIGN) {
              this.consumeCodePoint();
              return SUFFIX_MATCH_TOKEN;
            }
            break;
          case APOSTROPHE:
            return this.consumeStringToken(APOSTROPHE);
          case LEFT_PARENTHESIS:
            return LEFT_PARENTHESIS_TOKEN;
          case RIGHT_PARENTHESIS:
            return RIGHT_PARENTHESIS_TOKEN;
          case ASTERISK:
            if (this.peekCodePoint(0) === EQUALS_SIGN) {
              this.consumeCodePoint();
              return SUBSTRING_MATCH_TOKEN;
            }
            break;
          case PLUS_SIGN:
            if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
              this.reconsumeCodePoint(codePoint);
              return this.consumeNumericToken();
            }
            break;
          case COMMA:
            return COMMA_TOKEN;
          case HYPHEN_MINUS:
            var e1 = codePoint;
            var e2 = this.peekCodePoint(0);
            var e3 = this.peekCodePoint(1);
            if (isNumberStart(e1, e2, e3)) {
              this.reconsumeCodePoint(codePoint);
              return this.consumeNumericToken();
            }
            if (isIdentifierStart(e1, e2, e3)) {
              this.reconsumeCodePoint(codePoint);
              return this.consumeIdentLikeToken();
            }
            if (e2 === HYPHEN_MINUS && e3 === GREATER_THAN_SIGN) {
              this.consumeCodePoint();
              this.consumeCodePoint();
              return CDC_TOKEN;
            }
            break;
          case FULL_STOP:
            if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
              this.reconsumeCodePoint(codePoint);
              return this.consumeNumericToken();
            }
            break;
          case SOLIDUS:
            if (this.peekCodePoint(0) === ASTERISK) {
              this.consumeCodePoint();
              while (true) {
                var c = this.consumeCodePoint();
                if (c === ASTERISK) {
                  c = this.consumeCodePoint();
                  if (c === SOLIDUS) {
                    return this.consumeToken();
                  }
                }
                if (c === EOF) {
                  return this.consumeToken();
                }
              }
            }
            break;
          case COLON:
            return COLON_TOKEN;
          case SEMICOLON:
            return SEMICOLON_TOKEN;
          case LESS_THAN_SIGN:
            if (this.peekCodePoint(0) === EXCLAMATION_MARK && this.peekCodePoint(1) === HYPHEN_MINUS && this.peekCodePoint(2) === HYPHEN_MINUS) {
              this.consumeCodePoint();
              this.consumeCodePoint();
              return CDO_TOKEN;
            }
            break;
          case COMMERCIAL_AT:
            var a1 = this.peekCodePoint(0);
            var a2 = this.peekCodePoint(1);
            var a3 = this.peekCodePoint(2);
            if (isIdentifierStart(a1, a2, a3)) {
              var value = this.consumeName();
              return { type: 7, value };
            }
            break;
          case LEFT_SQUARE_BRACKET:
            return LEFT_SQUARE_BRACKET_TOKEN;
          case REVERSE_SOLIDUS:
            if (isValidEscape(codePoint, this.peekCodePoint(0))) {
              this.reconsumeCodePoint(codePoint);
              return this.consumeIdentLikeToken();
            }
            break;
          case RIGHT_SQUARE_BRACKET:
            return RIGHT_SQUARE_BRACKET_TOKEN;
          case CIRCUMFLEX_ACCENT:
            if (this.peekCodePoint(0) === EQUALS_SIGN) {
              this.consumeCodePoint();
              return PREFIX_MATCH_TOKEN;
            }
            break;
          case LEFT_CURLY_BRACKET:
            return LEFT_CURLY_BRACKET_TOKEN;
          case RIGHT_CURLY_BRACKET:
            return RIGHT_CURLY_BRACKET_TOKEN;
          case u:
          case U:
            var u1 = this.peekCodePoint(0);
            var u2 = this.peekCodePoint(1);
            if (u1 === PLUS_SIGN && (isHex(u2) || u2 === QUESTION_MARK)) {
              this.consumeCodePoint();
              this.consumeUnicodeRangeToken();
            }
            this.reconsumeCodePoint(codePoint);
            return this.consumeIdentLikeToken();
          case VERTICAL_LINE:
            if (this.peekCodePoint(0) === EQUALS_SIGN) {
              this.consumeCodePoint();
              return DASH_MATCH_TOKEN;
            }
            if (this.peekCodePoint(0) === VERTICAL_LINE) {
              this.consumeCodePoint();
              return COLUMN_TOKEN;
            }
            break;
          case TILDE:
            if (this.peekCodePoint(0) === EQUALS_SIGN) {
              this.consumeCodePoint();
              return INCLUDE_MATCH_TOKEN;
            }
            break;
          case EOF:
            return EOF_TOKEN;
        }
        if (isWhiteSpace(codePoint)) {
          this.consumeWhiteSpace();
          return WHITESPACE_TOKEN;
        }
        if (isDigit(codePoint)) {
          this.reconsumeCodePoint(codePoint);
          return this.consumeNumericToken();
        }
        if (isNameStartCodePoint(codePoint)) {
          this.reconsumeCodePoint(codePoint);
          return this.consumeIdentLikeToken();
        }
        return { type: 6, value: fromCodePoint$1(codePoint) };
      };
      Tokenizer2.prototype.consumeCodePoint = function() {
        var value = this._value.shift();
        return typeof value === "undefined" ? -1 : value;
      };
      Tokenizer2.prototype.reconsumeCodePoint = function(codePoint) {
        this._value.unshift(codePoint);
      };
      Tokenizer2.prototype.peekCodePoint = function(delta) {
        if (delta >= this._value.length) {
          return -1;
        }
        return this._value[delta];
      };
      Tokenizer2.prototype.consumeUnicodeRangeToken = function() {
        var digits2 = [];
        var codePoint = this.consumeCodePoint();
        while (isHex(codePoint) && digits2.length < 6) {
          digits2.push(codePoint);
          codePoint = this.consumeCodePoint();
        }
        var questionMarks = false;
        while (codePoint === QUESTION_MARK && digits2.length < 6) {
          digits2.push(codePoint);
          codePoint = this.consumeCodePoint();
          questionMarks = true;
        }
        if (questionMarks) {
          var start_1 = parseInt(fromCodePoint$1.apply(void 0, digits2.map(function(digit) {
            return digit === QUESTION_MARK ? ZERO : digit;
          })), 16);
          var end = parseInt(fromCodePoint$1.apply(void 0, digits2.map(function(digit) {
            return digit === QUESTION_MARK ? F : digit;
          })), 16);
          return { type: 30, start: start_1, end };
        }
        var start = parseInt(fromCodePoint$1.apply(void 0, digits2), 16);
        if (this.peekCodePoint(0) === HYPHEN_MINUS && isHex(this.peekCodePoint(1))) {
          this.consumeCodePoint();
          codePoint = this.consumeCodePoint();
          var endDigits = [];
          while (isHex(codePoint) && endDigits.length < 6) {
            endDigits.push(codePoint);
            codePoint = this.consumeCodePoint();
          }
          var end = parseInt(fromCodePoint$1.apply(void 0, endDigits), 16);
          return { type: 30, start, end };
        } else {
          return { type: 30, start, end: start };
        }
      };
      Tokenizer2.prototype.consumeIdentLikeToken = function() {
        var value = this.consumeName();
        if (value.toLowerCase() === "url" && this.peekCodePoint(0) === LEFT_PARENTHESIS) {
          this.consumeCodePoint();
          return this.consumeUrlToken();
        } else if (this.peekCodePoint(0) === LEFT_PARENTHESIS) {
          this.consumeCodePoint();
          return { type: 19, value };
        }
        return { type: 20, value };
      };
      Tokenizer2.prototype.consumeUrlToken = function() {
        var value = [];
        this.consumeWhiteSpace();
        if (this.peekCodePoint(0) === EOF) {
          return { type: 22, value: "" };
        }
        var next = this.peekCodePoint(0);
        if (next === APOSTROPHE || next === QUOTATION_MARK) {
          var stringToken = this.consumeStringToken(this.consumeCodePoint());
          if (stringToken.type === 0) {
            this.consumeWhiteSpace();
            if (this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
              this.consumeCodePoint();
              return { type: 22, value: stringToken.value };
            }
          }
          this.consumeBadUrlRemnants();
          return BAD_URL_TOKEN;
        }
        while (true) {
          var codePoint = this.consumeCodePoint();
          if (codePoint === EOF || codePoint === RIGHT_PARENTHESIS) {
            return { type: 22, value: fromCodePoint$1.apply(void 0, value) };
          } else if (isWhiteSpace(codePoint)) {
            this.consumeWhiteSpace();
            if (this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
              this.consumeCodePoint();
              return { type: 22, value: fromCodePoint$1.apply(void 0, value) };
            }
            this.consumeBadUrlRemnants();
            return BAD_URL_TOKEN;
          } else if (codePoint === QUOTATION_MARK || codePoint === APOSTROPHE || codePoint === LEFT_PARENTHESIS || isNonPrintableCodePoint(codePoint)) {
            this.consumeBadUrlRemnants();
            return BAD_URL_TOKEN;
          } else if (codePoint === REVERSE_SOLIDUS) {
            if (isValidEscape(codePoint, this.peekCodePoint(0))) {
              value.push(this.consumeEscapedCodePoint());
            } else {
              this.consumeBadUrlRemnants();
              return BAD_URL_TOKEN;
            }
          } else {
            value.push(codePoint);
          }
        }
      };
      Tokenizer2.prototype.consumeWhiteSpace = function() {
        while (isWhiteSpace(this.peekCodePoint(0))) {
          this.consumeCodePoint();
        }
      };
      Tokenizer2.prototype.consumeBadUrlRemnants = function() {
        while (true) {
          var codePoint = this.consumeCodePoint();
          if (codePoint === RIGHT_PARENTHESIS || codePoint === EOF) {
            return;
          }
          if (isValidEscape(codePoint, this.peekCodePoint(0))) {
            this.consumeEscapedCodePoint();
          }
        }
      };
      Tokenizer2.prototype.consumeStringSlice = function(count) {
        var SLICE_STACK_SIZE = 5e4;
        var value = "";
        while (count > 0) {
          var amount2 = Math.min(SLICE_STACK_SIZE, count);
          value += fromCodePoint$1.apply(void 0, this._value.splice(0, amount2));
          count -= amount2;
        }
        this._value.shift();
        return value;
      };
      Tokenizer2.prototype.consumeStringToken = function(endingCodePoint) {
        var value = "";
        var i2 = 0;
        do {
          var codePoint = this._value[i2];
          if (codePoint === EOF || codePoint === void 0 || codePoint === endingCodePoint) {
            value += this.consumeStringSlice(i2);
            return { type: 0, value };
          }
          if (codePoint === LINE_FEED) {
            this._value.splice(0, i2);
            return BAD_STRING_TOKEN;
          }
          if (codePoint === REVERSE_SOLIDUS) {
            var next = this._value[i2 + 1];
            if (next !== EOF && next !== void 0) {
              if (next === LINE_FEED) {
                value += this.consumeStringSlice(i2);
                i2 = -1;
                this._value.shift();
              } else if (isValidEscape(codePoint, next)) {
                value += this.consumeStringSlice(i2);
                value += fromCodePoint$1(this.consumeEscapedCodePoint());
                i2 = -1;
              }
            }
          }
          i2++;
        } while (true);
      };
      Tokenizer2.prototype.consumeNumber = function() {
        var repr = [];
        var type = FLAG_INTEGER;
        var c1 = this.peekCodePoint(0);
        if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
          repr.push(this.consumeCodePoint());
        }
        while (isDigit(this.peekCodePoint(0))) {
          repr.push(this.consumeCodePoint());
        }
        c1 = this.peekCodePoint(0);
        var c2 = this.peekCodePoint(1);
        if (c1 === FULL_STOP && isDigit(c2)) {
          repr.push(this.consumeCodePoint(), this.consumeCodePoint());
          type = FLAG_NUMBER;
          while (isDigit(this.peekCodePoint(0))) {
            repr.push(this.consumeCodePoint());
          }
        }
        c1 = this.peekCodePoint(0);
        c2 = this.peekCodePoint(1);
        var c3 = this.peekCodePoint(2);
        if ((c1 === E || c1 === e) && ((c2 === PLUS_SIGN || c2 === HYPHEN_MINUS) && isDigit(c3) || isDigit(c2))) {
          repr.push(this.consumeCodePoint(), this.consumeCodePoint());
          type = FLAG_NUMBER;
          while (isDigit(this.peekCodePoint(0))) {
            repr.push(this.consumeCodePoint());
          }
        }
        return [stringToNumber(repr), type];
      };
      Tokenizer2.prototype.consumeNumericToken = function() {
        var _a = this.consumeNumber(), number2 = _a[0], flags = _a[1];
        var c1 = this.peekCodePoint(0);
        var c2 = this.peekCodePoint(1);
        var c3 = this.peekCodePoint(2);
        if (isIdentifierStart(c1, c2, c3)) {
          var unit = this.consumeName();
          return { type: 15, number: number2, flags, unit };
        }
        if (c1 === PERCENTAGE_SIGN) {
          this.consumeCodePoint();
          return { type: 16, number: number2, flags };
        }
        return { type: 17, number: number2, flags };
      };
      Tokenizer2.prototype.consumeEscapedCodePoint = function() {
        var codePoint = this.consumeCodePoint();
        if (isHex(codePoint)) {
          var hex = fromCodePoint$1(codePoint);
          while (isHex(this.peekCodePoint(0)) && hex.length < 6) {
            hex += fromCodePoint$1(this.consumeCodePoint());
          }
          if (isWhiteSpace(this.peekCodePoint(0))) {
            this.consumeCodePoint();
          }
          var hexCodePoint = parseInt(hex, 16);
          if (hexCodePoint === 0 || isSurrogateCodePoint(hexCodePoint) || hexCodePoint > 1114111) {
            return REPLACEMENT_CHARACTER;
          }
          return hexCodePoint;
        }
        if (codePoint === EOF) {
          return REPLACEMENT_CHARACTER;
        }
        return codePoint;
      };
      Tokenizer2.prototype.consumeName = function() {
        var result = "";
        while (true) {
          var codePoint = this.consumeCodePoint();
          if (isNameCodePoint(codePoint)) {
            result += fromCodePoint$1(codePoint);
          } else if (isValidEscape(codePoint, this.peekCodePoint(0))) {
            result += fromCodePoint$1(this.consumeEscapedCodePoint());
          } else {
            this.reconsumeCodePoint(codePoint);
            return result;
          }
        }
      };
      return Tokenizer2;
    }()
  );
  var Parser = (
    /** @class */
    function() {
      function Parser2(tokens) {
        this._tokens = tokens;
      }
      Parser2.create = function(value) {
        var tokenizer = new Tokenizer();
        tokenizer.write(value);
        return new Parser2(tokenizer.read());
      };
      Parser2.parseValue = function(value) {
        return Parser2.create(value).parseComponentValue();
      };
      Parser2.parseValues = function(value) {
        return Parser2.create(value).parseComponentValues();
      };
      Parser2.prototype.parseComponentValue = function() {
        var token = this.consumeToken();
        while (token.type === 31) {
          token = this.consumeToken();
        }
        if (token.type === 32) {
          throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
        }
        this.reconsumeToken(token);
        var value = this.consumeComponentValue();
        do {
          token = this.consumeToken();
        } while (token.type === 31);
        if (token.type === 32) {
          return value;
        }
        throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
      };
      Parser2.prototype.parseComponentValues = function() {
        var values = [];
        while (true) {
          var value = this.consumeComponentValue();
          if (value.type === 32) {
            return values;
          }
          values.push(value);
          values.push();
        }
      };
      Parser2.prototype.consumeComponentValue = function() {
        var token = this.consumeToken();
        switch (token.type) {
          case 11:
          case 28:
          case 2:
            return this.consumeSimpleBlock(token.type);
          case 19:
            return this.consumeFunction(token);
        }
        return token;
      };
      Parser2.prototype.consumeSimpleBlock = function(type) {
        var block = { type, values: [] };
        var token = this.consumeToken();
        while (true) {
          if (token.type === 32 || isEndingTokenFor(token, type)) {
            return block;
          }
          this.reconsumeToken(token);
          block.values.push(this.consumeComponentValue());
          token = this.consumeToken();
        }
      };
      Parser2.prototype.consumeFunction = function(functionToken) {
        var cssFunction = {
          name: functionToken.value,
          values: [],
          type: 18
          /* FUNCTION */
        };
        while (true) {
          var token = this.consumeToken();
          if (token.type === 32 || token.type === 3) {
            return cssFunction;
          }
          this.reconsumeToken(token);
          cssFunction.values.push(this.consumeComponentValue());
        }
      };
      Parser2.prototype.consumeToken = function() {
        var token = this._tokens.shift();
        return typeof token === "undefined" ? EOF_TOKEN : token;
      };
      Parser2.prototype.reconsumeToken = function(token) {
        this._tokens.unshift(token);
      };
      return Parser2;
    }()
  );
  var isDimensionToken = function(token) {
    return token.type === 15;
  };
  var isNumberToken = function(token) {
    return token.type === 17;
  };
  var isIdentToken = function(token) {
    return token.type === 20;
  };
  var isIdentWithValue = function(token, value) {
    return isIdentToken(token) && token.value === value;
  };
  var nonFunctionArgSeparator = function(token) {
    return token.type !== 31 && token.type !== 4;
  };
  var parseFunctionArgs = function(tokens) {
    var args = [];
    var arg = [];
    tokens.forEach(function(token) {
      if (token.type === 4) {
        if (arg.length === 0) {
          throw new Error("Error parsing function args, zero tokens for arg");
        }
        args.push(arg);
        arg = [];
        return;
      }
      if (token.type !== 31) {
        arg.push(token);
      }
    });
    if (arg.length) {
      args.push(arg);
    }
    return args;
  };
  var isEndingTokenFor = function(token, type) {
    if (type === 11 && token.type === 12) {
      return true;
    }
    if (type === 28 && token.type === 29) {
      return true;
    }
    return type === 2 && token.type === 3;
  };
  var isLength = function(token) {
    return token.type === 17 || token.type === 15;
  };
  var isLengthPercentage = function(token) {
    return token.type === 16 || isLength(token);
  };
  var parseLengthPercentageTuple = function(tokens) {
    return tokens.length > 1 ? [tokens[0], tokens[1]] : [tokens[0]];
  };
  var ZERO_LENGTH = {
    type: 17,
    number: 0,
    flags: FLAG_INTEGER
  };
  var FIFTY_PERCENT = {
    type: 16,
    number: 50,
    flags: FLAG_INTEGER
  };
  var HUNDRED_PERCENT = {
    type: 16,
    number: 100,
    flags: FLAG_INTEGER
  };
  var getAbsoluteValueForTuple = function(tuple, width, height) {
    var x = tuple[0], y = tuple[1];
    return [getAbsoluteValue(x, width), getAbsoluteValue(typeof y !== "undefined" ? y : x, height)];
  };
  var getAbsoluteValue = function(token, parent) {
    if (token.type === 16) {
      return token.number / 100 * parent;
    }
    if (isDimensionToken(token)) {
      switch (token.unit) {
        case "rem":
        case "em":
          return 16 * token.number;
        case "px":
        default:
          return token.number;
      }
    }
    return token.number;
  };
  var DEG = "deg";
  var GRAD = "grad";
  var RAD = "rad";
  var TURN = "turn";
  var angle = {
    name: "angle",
    parse: function(_context, value) {
      if (value.type === 15) {
        switch (value.unit) {
          case DEG:
            return Math.PI * value.number / 180;
          case GRAD:
            return Math.PI / 200 * value.number;
          case RAD:
            return value.number;
          case TURN:
            return Math.PI * 2 * value.number;
        }
      }
      throw new Error("Unsupported angle type");
    }
  };
  var isAngle = function(value) {
    if (value.type === 15) {
      if (value.unit === DEG || value.unit === GRAD || value.unit === RAD || value.unit === TURN) {
        return true;
      }
    }
    return false;
  };
  var parseNamedSide = function(tokens) {
    var sideOrCorner = tokens.filter(isIdentToken).map(function(ident) {
      return ident.value;
    }).join(" ");
    switch (sideOrCorner) {
      case "to bottom right":
      case "to right bottom":
      case "left top":
      case "top left":
        return [ZERO_LENGTH, ZERO_LENGTH];
      case "to top":
      case "bottom":
        return deg(0);
      case "to bottom left":
      case "to left bottom":
      case "right top":
      case "top right":
        return [ZERO_LENGTH, HUNDRED_PERCENT];
      case "to right":
      case "left":
        return deg(90);
      case "to top left":
      case "to left top":
      case "right bottom":
      case "bottom right":
        return [HUNDRED_PERCENT, HUNDRED_PERCENT];
      case "to bottom":
      case "top":
        return deg(180);
      case "to top right":
      case "to right top":
      case "left bottom":
      case "bottom left":
        return [HUNDRED_PERCENT, ZERO_LENGTH];
      case "to left":
      case "right":
        return deg(270);
    }
    return 0;
  };
  var deg = function(deg2) {
    return Math.PI * deg2 / 180;
  };
  var color$1 = {
    name: "color",
    parse: function(context, value) {
      if (value.type === 18) {
        var colorFunction = SUPPORTED_COLOR_FUNCTIONS[value.name];
        if (typeof colorFunction === "undefined") {
          throw new Error('Attempting to parse an unsupported color function "' + value.name + '"');
        }
        return colorFunction(context, value.values);
      }
      if (value.type === 5) {
        if (value.value.length === 3) {
          var r = value.value.substring(0, 1);
          var g = value.value.substring(1, 2);
          var b = value.value.substring(2, 3);
          return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), 1);
        }
        if (value.value.length === 4) {
          var r = value.value.substring(0, 1);
          var g = value.value.substring(1, 2);
          var b = value.value.substring(2, 3);
          var a2 = value.value.substring(3, 4);
          return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), parseInt(a2 + a2, 16) / 255);
        }
        if (value.value.length === 6) {
          var r = value.value.substring(0, 2);
          var g = value.value.substring(2, 4);
          var b = value.value.substring(4, 6);
          return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), 1);
        }
        if (value.value.length === 8) {
          var r = value.value.substring(0, 2);
          var g = value.value.substring(2, 4);
          var b = value.value.substring(4, 6);
          var a2 = value.value.substring(6, 8);
          return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), parseInt(a2, 16) / 255);
        }
      }
      if (value.type === 20) {
        var namedColor = COLORS[value.value.toUpperCase()];
        if (typeof namedColor !== "undefined") {
          return namedColor;
        }
      }
      return COLORS.TRANSPARENT;
    }
  };
  var isTransparent = function(color2) {
    return (255 & color2) === 0;
  };
  var asString = function(color2) {
    var alpha = 255 & color2;
    var blue = 255 & color2 >> 8;
    var green = 255 & color2 >> 16;
    var red = 255 & color2 >> 24;
    return alpha < 255 ? "rgba(" + red + "," + green + "," + blue + "," + alpha / 255 + ")" : "rgb(" + red + "," + green + "," + blue + ")";
  };
  var pack = function(r, g, b, a2) {
    return (r << 24 | g << 16 | b << 8 | Math.round(a2 * 255) << 0) >>> 0;
  };
  var getTokenColorValue = function(token, i2) {
    if (token.type === 17) {
      return token.number;
    }
    if (token.type === 16) {
      var max = i2 === 3 ? 1 : 255;
      return i2 === 3 ? token.number / 100 * max : Math.round(token.number / 100 * max);
    }
    return 0;
  };
  var rgb = function(_context, args) {
    var tokens = args.filter(nonFunctionArgSeparator);
    if (tokens.length === 3) {
      var _a = tokens.map(getTokenColorValue), r = _a[0], g = _a[1], b = _a[2];
      return pack(r, g, b, 1);
    }
    if (tokens.length === 4) {
      var _b = tokens.map(getTokenColorValue), r = _b[0], g = _b[1], b = _b[2], a2 = _b[3];
      return pack(r, g, b, a2);
    }
    return 0;
  };
  function hue2rgb(t1, t2, hue) {
    if (hue < 0) {
      hue += 1;
    }
    if (hue >= 1) {
      hue -= 1;
    }
    if (hue < 1 / 6) {
      return (t2 - t1) * hue * 6 + t1;
    } else if (hue < 1 / 2) {
      return t2;
    } else if (hue < 2 / 3) {
      return (t2 - t1) * 6 * (2 / 3 - hue) + t1;
    } else {
      return t1;
    }
  }
  var hsl = function(context, args) {
    var tokens = args.filter(nonFunctionArgSeparator);
    var hue = tokens[0], saturation = tokens[1], lightness = tokens[2], alpha = tokens[3];
    var h = (hue.type === 17 ? deg(hue.number) : angle.parse(context, hue)) / (Math.PI * 2);
    var s = isLengthPercentage(saturation) ? saturation.number / 100 : 0;
    var l = isLengthPercentage(lightness) ? lightness.number / 100 : 0;
    var a2 = typeof alpha !== "undefined" && isLengthPercentage(alpha) ? getAbsoluteValue(alpha, 1) : 1;
    if (s === 0) {
      return pack(l * 255, l * 255, l * 255, 1);
    }
    var t2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
    var t1 = l * 2 - t2;
    var r = hue2rgb(t1, t2, h + 1 / 3);
    var g = hue2rgb(t1, t2, h);
    var b = hue2rgb(t1, t2, h - 1 / 3);
    return pack(r * 255, g * 255, b * 255, a2);
  };
  var SUPPORTED_COLOR_FUNCTIONS = {
    hsl,
    hsla: hsl,
    rgb,
    rgba: rgb
  };
  var parseColor = function(context, value) {
    return color$1.parse(context, Parser.create(value).parseComponentValue());
  };
  var COLORS = {
    ALICEBLUE: 4042850303,
    ANTIQUEWHITE: 4209760255,
    AQUA: 16777215,
    AQUAMARINE: 2147472639,
    AZURE: 4043309055,
    BEIGE: 4126530815,
    BISQUE: 4293182719,
    BLACK: 255,
    BLANCHEDALMOND: 4293643775,
    BLUE: 65535,
    BLUEVIOLET: 2318131967,
    BROWN: 2771004159,
    BURLYWOOD: 3736635391,
    CADETBLUE: 1604231423,
    CHARTREUSE: 2147418367,
    CHOCOLATE: 3530104575,
    CORAL: 4286533887,
    CORNFLOWERBLUE: 1687547391,
    CORNSILK: 4294499583,
    CRIMSON: 3692313855,
    CYAN: 16777215,
    DARKBLUE: 35839,
    DARKCYAN: 9145343,
    DARKGOLDENROD: 3095837695,
    DARKGRAY: 2846468607,
    DARKGREEN: 6553855,
    DARKGREY: 2846468607,
    DARKKHAKI: 3182914559,
    DARKMAGENTA: 2332068863,
    DARKOLIVEGREEN: 1433087999,
    DARKORANGE: 4287365375,
    DARKORCHID: 2570243327,
    DARKRED: 2332033279,
    DARKSALMON: 3918953215,
    DARKSEAGREEN: 2411499519,
    DARKSLATEBLUE: 1211993087,
    DARKSLATEGRAY: 793726975,
    DARKSLATEGREY: 793726975,
    DARKTURQUOISE: 13554175,
    DARKVIOLET: 2483082239,
    DEEPPINK: 4279538687,
    DEEPSKYBLUE: 12582911,
    DIMGRAY: 1768516095,
    DIMGREY: 1768516095,
    DODGERBLUE: 512819199,
    FIREBRICK: 2988581631,
    FLORALWHITE: 4294635775,
    FORESTGREEN: 579543807,
    FUCHSIA: 4278255615,
    GAINSBORO: 3705462015,
    GHOSTWHITE: 4177068031,
    GOLD: 4292280575,
    GOLDENROD: 3668254975,
    GRAY: 2155905279,
    GREEN: 8388863,
    GREENYELLOW: 2919182335,
    GREY: 2155905279,
    HONEYDEW: 4043305215,
    HOTPINK: 4285117695,
    INDIANRED: 3445382399,
    INDIGO: 1258324735,
    IVORY: 4294963455,
    KHAKI: 4041641215,
    LAVENDER: 3873897215,
    LAVENDERBLUSH: 4293981695,
    LAWNGREEN: 2096890111,
    LEMONCHIFFON: 4294626815,
    LIGHTBLUE: 2916673279,
    LIGHTCORAL: 4034953471,
    LIGHTCYAN: 3774873599,
    LIGHTGOLDENRODYELLOW: 4210742015,
    LIGHTGRAY: 3553874943,
    LIGHTGREEN: 2431553791,
    LIGHTGREY: 3553874943,
    LIGHTPINK: 4290167295,
    LIGHTSALMON: 4288707327,
    LIGHTSEAGREEN: 548580095,
    LIGHTSKYBLUE: 2278488831,
    LIGHTSLATEGRAY: 2005441023,
    LIGHTSLATEGREY: 2005441023,
    LIGHTSTEELBLUE: 2965692159,
    LIGHTYELLOW: 4294959359,
    LIME: 16711935,
    LIMEGREEN: 852308735,
    LINEN: 4210091775,
    MAGENTA: 4278255615,
    MAROON: 2147483903,
    MEDIUMAQUAMARINE: 1724754687,
    MEDIUMBLUE: 52735,
    MEDIUMORCHID: 3126187007,
    MEDIUMPURPLE: 2473647103,
    MEDIUMSEAGREEN: 1018393087,
    MEDIUMSLATEBLUE: 2070474495,
    MEDIUMSPRINGGREEN: 16423679,
    MEDIUMTURQUOISE: 1221709055,
    MEDIUMVIOLETRED: 3340076543,
    MIDNIGHTBLUE: 421097727,
    MINTCREAM: 4127193855,
    MISTYROSE: 4293190143,
    MOCCASIN: 4293178879,
    NAVAJOWHITE: 4292783615,
    NAVY: 33023,
    OLDLACE: 4260751103,
    OLIVE: 2155872511,
    OLIVEDRAB: 1804477439,
    ORANGE: 4289003775,
    ORANGERED: 4282712319,
    ORCHID: 3664828159,
    PALEGOLDENROD: 4008225535,
    PALEGREEN: 2566625535,
    PALETURQUOISE: 2951671551,
    PALEVIOLETRED: 3681588223,
    PAPAYAWHIP: 4293907967,
    PEACHPUFF: 4292524543,
    PERU: 3448061951,
    PINK: 4290825215,
    PLUM: 3718307327,
    POWDERBLUE: 2967529215,
    PURPLE: 2147516671,
    REBECCAPURPLE: 1714657791,
    RED: 4278190335,
    ROSYBROWN: 3163525119,
    ROYALBLUE: 1097458175,
    SADDLEBROWN: 2336560127,
    SALMON: 4202722047,
    SANDYBROWN: 4104413439,
    SEAGREEN: 780883967,
    SEASHELL: 4294307583,
    SIENNA: 2689740287,
    SILVER: 3233857791,
    SKYBLUE: 2278484991,
    SLATEBLUE: 1784335871,
    SLATEGRAY: 1887473919,
    SLATEGREY: 1887473919,
    SNOW: 4294638335,
    SPRINGGREEN: 16744447,
    STEELBLUE: 1182971135,
    TAN: 3535047935,
    TEAL: 8421631,
    THISTLE: 3636451583,
    TOMATO: 4284696575,
    TRANSPARENT: 0,
    TURQUOISE: 1088475391,
    VIOLET: 4001558271,
    WHEAT: 4125012991,
    WHITE: 4294967295,
    WHITESMOKE: 4126537215,
    YELLOW: 4294902015,
    YELLOWGREEN: 2597139199
  };
  var backgroundClip = {
    name: "background-clip",
    initialValue: "border-box",
    prefix: false,
    type: 1,
    parse: function(_context, tokens) {
      return tokens.map(function(token) {
        if (isIdentToken(token)) {
          switch (token.value) {
            case "padding-box":
              return 1;
            case "content-box":
              return 2;
          }
        }
        return 0;
      });
    }
  };
  var backgroundColor = {
    name: "background-color",
    initialValue: "transparent",
    prefix: false,
    type: 3,
    format: "color"
  };
  var parseColorStop = function(context, args) {
    var color2 = color$1.parse(context, args[0]);
    var stop = args[1];
    return stop && isLengthPercentage(stop) ? { color: color2, stop } : { color: color2, stop: null };
  };
  var processColorStops = function(stops, lineLength) {
    var first = stops[0];
    var last = stops[stops.length - 1];
    if (first.stop === null) {
      first.stop = ZERO_LENGTH;
    }
    if (last.stop === null) {
      last.stop = HUNDRED_PERCENT;
    }
    var processStops = [];
    var previous = 0;
    for (var i2 = 0; i2 < stops.length; i2++) {
      var stop_1 = stops[i2].stop;
      if (stop_1 !== null) {
        var absoluteValue = getAbsoluteValue(stop_1, lineLength);
        if (absoluteValue > previous) {
          processStops.push(absoluteValue);
        } else {
          processStops.push(previous);
        }
        previous = absoluteValue;
      } else {
        processStops.push(null);
      }
    }
    var gapBegin = null;
    for (var i2 = 0; i2 < processStops.length; i2++) {
      var stop_2 = processStops[i2];
      if (stop_2 === null) {
        if (gapBegin === null) {
          gapBegin = i2;
        }
      } else if (gapBegin !== null) {
        var gapLength = i2 - gapBegin;
        var beforeGap = processStops[gapBegin - 1];
        var gapValue = (stop_2 - beforeGap) / (gapLength + 1);
        for (var g = 1; g <= gapLength; g++) {
          processStops[gapBegin + g - 1] = gapValue * g;
        }
        gapBegin = null;
      }
    }
    return stops.map(function(_a, i3) {
      var color2 = _a.color;
      return { color: color2, stop: Math.max(Math.min(1, processStops[i3] / lineLength), 0) };
    });
  };
  var getAngleFromCorner = function(corner, width, height) {
    var centerX = width / 2;
    var centerY = height / 2;
    var x = getAbsoluteValue(corner[0], width) - centerX;
    var y = centerY - getAbsoluteValue(corner[1], height);
    return (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
  };
  var calculateGradientDirection = function(angle2, width, height) {
    var radian = typeof angle2 === "number" ? angle2 : getAngleFromCorner(angle2, width, height);
    var lineLength = Math.abs(width * Math.sin(radian)) + Math.abs(height * Math.cos(radian));
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    var halfLineLength = lineLength / 2;
    var yDiff = Math.sin(radian - Math.PI / 2) * halfLineLength;
    var xDiff = Math.cos(radian - Math.PI / 2) * halfLineLength;
    return [lineLength, halfWidth - xDiff, halfWidth + xDiff, halfHeight - yDiff, halfHeight + yDiff];
  };
  var distance = function(a2, b) {
    return Math.sqrt(a2 * a2 + b * b);
  };
  var findCorner = function(width, height, x, y, closest) {
    var corners = [
      [0, 0],
      [0, height],
      [width, 0],
      [width, height]
    ];
    return corners.reduce(function(stat, corner) {
      var cx = corner[0], cy = corner[1];
      var d = distance(x - cx, y - cy);
      if (closest ? d < stat.optimumDistance : d > stat.optimumDistance) {
        return {
          optimumCorner: corner,
          optimumDistance: d
        };
      }
      return stat;
    }, {
      optimumDistance: closest ? Infinity : -Infinity,
      optimumCorner: null
    }).optimumCorner;
  };
  var calculateRadius = function(gradient, x, y, width, height) {
    var rx = 0;
    var ry = 0;
    switch (gradient.size) {
      case 0:
        if (gradient.shape === 0) {
          rx = ry = Math.min(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
        } else if (gradient.shape === 1) {
          rx = Math.min(Math.abs(x), Math.abs(x - width));
          ry = Math.min(Math.abs(y), Math.abs(y - height));
        }
        break;
      case 2:
        if (gradient.shape === 0) {
          rx = ry = Math.min(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
        } else if (gradient.shape === 1) {
          var c = Math.min(Math.abs(y), Math.abs(y - height)) / Math.min(Math.abs(x), Math.abs(x - width));
          var _a = findCorner(width, height, x, y, true), cx = _a[0], cy = _a[1];
          rx = distance(cx - x, (cy - y) / c);
          ry = c * rx;
        }
        break;
      case 1:
        if (gradient.shape === 0) {
          rx = ry = Math.max(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
        } else if (gradient.shape === 1) {
          rx = Math.max(Math.abs(x), Math.abs(x - width));
          ry = Math.max(Math.abs(y), Math.abs(y - height));
        }
        break;
      case 3:
        if (gradient.shape === 0) {
          rx = ry = Math.max(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
        } else if (gradient.shape === 1) {
          var c = Math.max(Math.abs(y), Math.abs(y - height)) / Math.max(Math.abs(x), Math.abs(x - width));
          var _b = findCorner(width, height, x, y, false), cx = _b[0], cy = _b[1];
          rx = distance(cx - x, (cy - y) / c);
          ry = c * rx;
        }
        break;
    }
    if (Array.isArray(gradient.size)) {
      rx = getAbsoluteValue(gradient.size[0], width);
      ry = gradient.size.length === 2 ? getAbsoluteValue(gradient.size[1], height) : rx;
    }
    return [rx, ry];
  };
  var linearGradient = function(context, tokens) {
    var angle$1 = deg(180);
    var stops = [];
    parseFunctionArgs(tokens).forEach(function(arg, i2) {
      if (i2 === 0) {
        var firstToken = arg[0];
        if (firstToken.type === 20 && firstToken.value === "to") {
          angle$1 = parseNamedSide(arg);
          return;
        } else if (isAngle(firstToken)) {
          angle$1 = angle.parse(context, firstToken);
          return;
        }
      }
      var colorStop = parseColorStop(context, arg);
      stops.push(colorStop);
    });
    return {
      angle: angle$1,
      stops,
      type: 1
      /* LINEAR_GRADIENT */
    };
  };
  var prefixLinearGradient = function(context, tokens) {
    var angle$1 = deg(180);
    var stops = [];
    parseFunctionArgs(tokens).forEach(function(arg, i2) {
      if (i2 === 0) {
        var firstToken = arg[0];
        if (firstToken.type === 20 && ["top", "left", "right", "bottom"].indexOf(firstToken.value) !== -1) {
          angle$1 = parseNamedSide(arg);
          return;
        } else if (isAngle(firstToken)) {
          angle$1 = (angle.parse(context, firstToken) + deg(270)) % deg(360);
          return;
        }
      }
      var colorStop = parseColorStop(context, arg);
      stops.push(colorStop);
    });
    return {
      angle: angle$1,
      stops,
      type: 1
      /* LINEAR_GRADIENT */
    };
  };
  var webkitGradient = function(context, tokens) {
    var angle2 = deg(180);
    var stops = [];
    var type = 1;
    var shape = 0;
    var size = 3;
    var position2 = [];
    parseFunctionArgs(tokens).forEach(function(arg, i2) {
      var firstToken = arg[0];
      if (i2 === 0) {
        if (isIdentToken(firstToken) && firstToken.value === "linear") {
          type = 1;
          return;
        } else if (isIdentToken(firstToken) && firstToken.value === "radial") {
          type = 2;
          return;
        }
      }
      if (firstToken.type === 18) {
        if (firstToken.name === "from") {
          var color2 = color$1.parse(context, firstToken.values[0]);
          stops.push({ stop: ZERO_LENGTH, color: color2 });
        } else if (firstToken.name === "to") {
          var color2 = color$1.parse(context, firstToken.values[0]);
          stops.push({ stop: HUNDRED_PERCENT, color: color2 });
        } else if (firstToken.name === "color-stop") {
          var values = firstToken.values.filter(nonFunctionArgSeparator);
          if (values.length === 2) {
            var color2 = color$1.parse(context, values[1]);
            var stop_1 = values[0];
            if (isNumberToken(stop_1)) {
              stops.push({
                stop: { type: 16, number: stop_1.number * 100, flags: stop_1.flags },
                color: color2
              });
            }
          }
        }
      }
    });
    return type === 1 ? {
      angle: (angle2 + deg(180)) % deg(360),
      stops,
      type
    } : { size, shape, stops, position: position2, type };
  };
  var CLOSEST_SIDE = "closest-side";
  var FARTHEST_SIDE = "farthest-side";
  var CLOSEST_CORNER = "closest-corner";
  var FARTHEST_CORNER = "farthest-corner";
  var CIRCLE = "circle";
  var ELLIPSE = "ellipse";
  var COVER = "cover";
  var CONTAIN = "contain";
  var radialGradient = function(context, tokens) {
    var shape = 0;
    var size = 3;
    var stops = [];
    var position2 = [];
    parseFunctionArgs(tokens).forEach(function(arg, i2) {
      var isColorStop = true;
      if (i2 === 0) {
        var isAtPosition_1 = false;
        isColorStop = arg.reduce(function(acc, token) {
          if (isAtPosition_1) {
            if (isIdentToken(token)) {
              switch (token.value) {
                case "center":
                  position2.push(FIFTY_PERCENT);
                  return acc;
                case "top":
                case "left":
                  position2.push(ZERO_LENGTH);
                  return acc;
                case "right":
                case "bottom":
                  position2.push(HUNDRED_PERCENT);
                  return acc;
              }
            } else if (isLengthPercentage(token) || isLength(token)) {
              position2.push(token);
            }
          } else if (isIdentToken(token)) {
            switch (token.value) {
              case CIRCLE:
                shape = 0;
                return false;
              case ELLIPSE:
                shape = 1;
                return false;
              case "at":
                isAtPosition_1 = true;
                return false;
              case CLOSEST_SIDE:
                size = 0;
                return false;
              case COVER:
              case FARTHEST_SIDE:
                size = 1;
                return false;
              case CONTAIN:
              case CLOSEST_CORNER:
                size = 2;
                return false;
              case FARTHEST_CORNER:
                size = 3;
                return false;
            }
          } else if (isLength(token) || isLengthPercentage(token)) {
            if (!Array.isArray(size)) {
              size = [];
            }
            size.push(token);
            return false;
          }
          return acc;
        }, isColorStop);
      }
      if (isColorStop) {
        var colorStop = parseColorStop(context, arg);
        stops.push(colorStop);
      }
    });
    return {
      size,
      shape,
      stops,
      position: position2,
      type: 2
      /* RADIAL_GRADIENT */
    };
  };
  var prefixRadialGradient = function(context, tokens) {
    var shape = 0;
    var size = 3;
    var stops = [];
    var position2 = [];
    parseFunctionArgs(tokens).forEach(function(arg, i2) {
      var isColorStop = true;
      if (i2 === 0) {
        isColorStop = arg.reduce(function(acc, token) {
          if (isIdentToken(token)) {
            switch (token.value) {
              case "center":
                position2.push(FIFTY_PERCENT);
                return false;
              case "top":
              case "left":
                position2.push(ZERO_LENGTH);
                return false;
              case "right":
              case "bottom":
                position2.push(HUNDRED_PERCENT);
                return false;
            }
          } else if (isLengthPercentage(token) || isLength(token)) {
            position2.push(token);
            return false;
          }
          return acc;
        }, isColorStop);
      } else if (i2 === 1) {
        isColorStop = arg.reduce(function(acc, token) {
          if (isIdentToken(token)) {
            switch (token.value) {
              case CIRCLE:
                shape = 0;
                return false;
              case ELLIPSE:
                shape = 1;
                return false;
              case CONTAIN:
              case CLOSEST_SIDE:
                size = 0;
                return false;
              case FARTHEST_SIDE:
                size = 1;
                return false;
              case CLOSEST_CORNER:
                size = 2;
                return false;
              case COVER:
              case FARTHEST_CORNER:
                size = 3;
                return false;
            }
          } else if (isLength(token) || isLengthPercentage(token)) {
            if (!Array.isArray(size)) {
              size = [];
            }
            size.push(token);
            return false;
          }
          return acc;
        }, isColorStop);
      }
      if (isColorStop) {
        var colorStop = parseColorStop(context, arg);
        stops.push(colorStop);
      }
    });
    return {
      size,
      shape,
      stops,
      position: position2,
      type: 2
      /* RADIAL_GRADIENT */
    };
  };
  var isLinearGradient = function(background) {
    return background.type === 1;
  };
  var isRadialGradient = function(background) {
    return background.type === 2;
  };
  var image = {
    name: "image",
    parse: function(context, value) {
      if (value.type === 22) {
        var image_1 = {
          url: value.value,
          type: 0
          /* URL */
        };
        context.cache.addImage(value.value);
        return image_1;
      }
      if (value.type === 18) {
        var imageFunction = SUPPORTED_IMAGE_FUNCTIONS[value.name];
        if (typeof imageFunction === "undefined") {
          throw new Error('Attempting to parse an unsupported image function "' + value.name + '"');
        }
        return imageFunction(context, value.values);
      }
      throw new Error("Unsupported image type " + value.type);
    }
  };
  function isSupportedImage(value) {
    return !(value.type === 20 && value.value === "none") && (value.type !== 18 || !!SUPPORTED_IMAGE_FUNCTIONS[value.name]);
  }
  var SUPPORTED_IMAGE_FUNCTIONS = {
    "linear-gradient": linearGradient,
    "-moz-linear-gradient": prefixLinearGradient,
    "-ms-linear-gradient": prefixLinearGradient,
    "-o-linear-gradient": prefixLinearGradient,
    "-webkit-linear-gradient": prefixLinearGradient,
    "radial-gradient": radialGradient,
    "-moz-radial-gradient": prefixRadialGradient,
    "-ms-radial-gradient": prefixRadialGradient,
    "-o-radial-gradient": prefixRadialGradient,
    "-webkit-radial-gradient": prefixRadialGradient,
    "-webkit-gradient": webkitGradient
  };
  var backgroundImage = {
    name: "background-image",
    initialValue: "none",
    type: 1,
    prefix: false,
    parse: function(context, tokens) {
      if (tokens.length === 0) {
        return [];
      }
      var first = tokens[0];
      if (first.type === 20 && first.value === "none") {
        return [];
      }
      return tokens.filter(function(value) {
        return nonFunctionArgSeparator(value) && isSupportedImage(value);
      }).map(function(value) {
        return image.parse(context, value);
      });
    }
  };
  var backgroundOrigin = {
    name: "background-origin",
    initialValue: "border-box",
    prefix: false,
    type: 1,
    parse: function(_context, tokens) {
      return tokens.map(function(token) {
        if (isIdentToken(token)) {
          switch (token.value) {
            case "padding-box":
              return 1;
            case "content-box":
              return 2;
          }
        }
        return 0;
      });
    }
  };
  var backgroundPosition = {
    name: "background-position",
    initialValue: "0% 0%",
    type: 1,
    prefix: false,
    parse: function(_context, tokens) {
      return parseFunctionArgs(tokens).map(function(values) {
        return values.filter(isLengthPercentage);
      }).map(parseLengthPercentageTuple);
    }
  };
  var backgroundRepeat = {
    name: "background-repeat",
    initialValue: "repeat",
    prefix: false,
    type: 1,
    parse: function(_context, tokens) {
      return parseFunctionArgs(tokens).map(function(values) {
        return values.filter(isIdentToken).map(function(token) {
          return token.value;
        }).join(" ");
      }).map(parseBackgroundRepeat);
    }
  };
  var parseBackgroundRepeat = function(value) {
    switch (value) {
      case "no-repeat":
        return 1;
      case "repeat-x":
      case "repeat no-repeat":
        return 2;
      case "repeat-y":
      case "no-repeat repeat":
        return 3;
      case "repeat":
      default:
        return 0;
    }
  };
  var BACKGROUND_SIZE;
  (function(BACKGROUND_SIZE2) {
    BACKGROUND_SIZE2["AUTO"] = "auto";
    BACKGROUND_SIZE2["CONTAIN"] = "contain";
    BACKGROUND_SIZE2["COVER"] = "cover";
  })(BACKGROUND_SIZE || (BACKGROUND_SIZE = {}));
  var backgroundSize = {
    name: "background-size",
    initialValue: "0",
    prefix: false,
    type: 1,
    parse: function(_context, tokens) {
      return parseFunctionArgs(tokens).map(function(values) {
        return values.filter(isBackgroundSizeInfoToken);
      });
    }
  };
  var isBackgroundSizeInfoToken = function(value) {
    return isIdentToken(value) || isLengthPercentage(value);
  };
  var borderColorForSide = function(side) {
    return {
      name: "border-" + side + "-color",
      initialValue: "transparent",
      prefix: false,
      type: 3,
      format: "color"
    };
  };
  var borderTopColor = borderColorForSide("top");
  var borderRightColor = borderColorForSide("right");
  var borderBottomColor = borderColorForSide("bottom");
  var borderLeftColor = borderColorForSide("left");
  var borderRadiusForSide = function(side) {
    return {
      name: "border-radius-" + side,
      initialValue: "0 0",
      prefix: false,
      type: 1,
      parse: function(_context, tokens) {
        return parseLengthPercentageTuple(tokens.filter(isLengthPercentage));
      }
    };
  };
  var borderTopLeftRadius = borderRadiusForSide("top-left");
  var borderTopRightRadius = borderRadiusForSide("top-right");
  var borderBottomRightRadius = borderRadiusForSide("bottom-right");
  var borderBottomLeftRadius = borderRadiusForSide("bottom-left");
  var borderStyleForSide = function(side) {
    return {
      name: "border-" + side + "-style",
      initialValue: "solid",
      prefix: false,
      type: 2,
      parse: function(_context, style) {
        switch (style) {
          case "none":
            return 0;
          case "dashed":
            return 2;
          case "dotted":
            return 3;
          case "double":
            return 4;
        }
        return 1;
      }
    };
  };
  var borderTopStyle = borderStyleForSide("top");
  var borderRightStyle = borderStyleForSide("right");
  var borderBottomStyle = borderStyleForSide("bottom");
  var borderLeftStyle = borderStyleForSide("left");
  var borderWidthForSide = function(side) {
    return {
      name: "border-" + side + "-width",
      initialValue: "0",
      type: 0,
      prefix: false,
      parse: function(_context, token) {
        if (isDimensionToken(token)) {
          return token.number;
        }
        return 0;
      }
    };
  };
  var borderTopWidth = borderWidthForSide("top");
  var borderRightWidth = borderWidthForSide("right");
  var borderBottomWidth = borderWidthForSide("bottom");
  var borderLeftWidth = borderWidthForSide("left");
  var color = {
    name: "color",
    initialValue: "transparent",
    prefix: false,
    type: 3,
    format: "color"
  };
  var direction = {
    name: "direction",
    initialValue: "ltr",
    prefix: false,
    type: 2,
    parse: function(_context, direction2) {
      switch (direction2) {
        case "rtl":
          return 1;
        case "ltr":
        default:
          return 0;
      }
    }
  };
  var display = {
    name: "display",
    initialValue: "inline-block",
    prefix: false,
    type: 1,
    parse: function(_context, tokens) {
      return tokens.filter(isIdentToken).reduce(
        function(bit, token) {
          return bit | parseDisplayValue(token.value);
        },
        0
        /* NONE */
      );
    }
  };
  var parseDisplayValue = function(display2) {
    switch (display2) {
      case "block":
      case "-webkit-box":
        return 2;
      case "inline":
        return 4;
      case "run-in":
        return 8;
      case "flow":
        return 16;
      case "flow-root":
        return 32;
      case "table":
        return 64;
      case "flex":
      case "-webkit-flex":
        return 128;
      case "grid":
      case "-ms-grid":
        return 256;
      case "ruby":
        return 512;
      case "subgrid":
        return 1024;
      case "list-item":
        return 2048;
      case "table-row-group":
        return 4096;
      case "table-header-group":
        return 8192;
      case "table-footer-group":
        return 16384;
      case "table-row":
        return 32768;
      case "table-cell":
        return 65536;
      case "table-column-group":
        return 131072;
      case "table-column":
        return 262144;
      case "table-caption":
        return 524288;
      case "ruby-base":
        return 1048576;
      case "ruby-text":
        return 2097152;
      case "ruby-base-container":
        return 4194304;
      case "ruby-text-container":
        return 8388608;
      case "contents":
        return 16777216;
      case "inline-block":
        return 33554432;
      case "inline-list-item":
        return 67108864;
      case "inline-table":
        return 134217728;
      case "inline-flex":
        return 268435456;
      case "inline-grid":
        return 536870912;
    }
    return 0;
  };
  var float = {
    name: "float",
    initialValue: "none",
    prefix: false,
    type: 2,
    parse: function(_context, float2) {
      switch (float2) {
        case "left":
          return 1;
        case "right":
          return 2;
        case "inline-start":
          return 3;
        case "inline-end":
          return 4;
      }
      return 0;
    }
  };
  var letterSpacing = {
    name: "letter-spacing",
    initialValue: "0",
    prefix: false,
    type: 0,
    parse: function(_context, token) {
      if (token.type === 20 && token.value === "normal") {
        return 0;
      }
      if (token.type === 17) {
        return token.number;
      }
      if (token.type === 15) {
        return token.number;
      }
      return 0;
    }
  };
  var LINE_BREAK;
  (function(LINE_BREAK2) {
    LINE_BREAK2["NORMAL"] = "normal";
    LINE_BREAK2["STRICT"] = "strict";
  })(LINE_BREAK || (LINE_BREAK = {}));
  var lineBreak = {
    name: "line-break",
    initialValue: "normal",
    prefix: false,
    type: 2,
    parse: function(_context, lineBreak2) {
      switch (lineBreak2) {
        case "strict":
          return LINE_BREAK.STRICT;
        case "normal":
        default:
          return LINE_BREAK.NORMAL;
      }
    }
  };
  var lineHeight = {
    name: "line-height",
    initialValue: "normal",
    prefix: false,
    type: 4
    /* TOKEN_VALUE */
  };
  var computeLineHeight = function(token, fontSize2) {
    if (isIdentToken(token) && token.value === "normal") {
      return 1.2 * fontSize2;
    } else if (token.type === 17) {
      return fontSize2 * token.number;
    } else if (isLengthPercentage(token)) {
      return getAbsoluteValue(token, fontSize2);
    }
    return fontSize2;
  };
  var listStyleImage = {
    name: "list-style-image",
    initialValue: "none",
    type: 0,
    prefix: false,
    parse: function(context, token) {
      if (token.type === 20 && token.value === "none") {
        return null;
      }
      return image.parse(context, token);
    }
  };
  var listStylePosition = {
    name: "list-style-position",
    initialValue: "outside",
    prefix: false,
    type: 2,
    parse: function(_context, position2) {
      switch (position2) {
        case "inside":
          return 0;
        case "outside":
        default:
          return 1;
      }
    }
  };
  var listStyleType = {
    name: "list-style-type",
    initialValue: "none",
    prefix: false,
    type: 2,
    parse: function(_context, type) {
      switch (type) {
        case "disc":
          return 0;
        case "circle":
          return 1;
        case "square":
          return 2;
        case "decimal":
          return 3;
        case "cjk-decimal":
          return 4;
        case "decimal-leading-zero":
          return 5;
        case "lower-roman":
          return 6;
        case "upper-roman":
          return 7;
        case "lower-greek":
          return 8;
        case "lower-alpha":
          return 9;
        case "upper-alpha":
          return 10;
        case "arabic-indic":
          return 11;
        case "armenian":
          return 12;
        case "bengali":
          return 13;
        case "cambodian":
          return 14;
        case "cjk-earthly-branch":
          return 15;
        case "cjk-heavenly-stem":
          return 16;
        case "cjk-ideographic":
          return 17;
        case "devanagari":
          return 18;
        case "ethiopic-numeric":
          return 19;
        case "georgian":
          return 20;
        case "gujarati":
          return 21;
        case "gurmukhi":
          return 22;
        case "hebrew":
          return 22;
        case "hiragana":
          return 23;
        case "hiragana-iroha":
          return 24;
        case "japanese-formal":
          return 25;
        case "japanese-informal":
          return 26;
        case "kannada":
          return 27;
        case "katakana":
          return 28;
        case "katakana-iroha":
          return 29;
        case "khmer":
          return 30;
        case "korean-hangul-formal":
          return 31;
        case "korean-hanja-formal":
          return 32;
        case "korean-hanja-informal":
          return 33;
        case "lao":
          return 34;
        case "lower-armenian":
          return 35;
        case "malayalam":
          return 36;
        case "mongolian":
          return 37;
        case "myanmar":
          return 38;
        case "oriya":
          return 39;
        case "persian":
          return 40;
        case "simp-chinese-formal":
          return 41;
        case "simp-chinese-informal":
          return 42;
        case "tamil":
          return 43;
        case "telugu":
          return 44;
        case "thai":
          return 45;
        case "tibetan":
          return 46;
        case "trad-chinese-formal":
          return 47;
        case "trad-chinese-informal":
          return 48;
        case "upper-armenian":
          return 49;
        case "disclosure-open":
          return 50;
        case "disclosure-closed":
          return 51;
        case "none":
        default:
          return -1;
      }
    }
  };
  var marginForSide = function(side) {
    return {
      name: "margin-" + side,
      initialValue: "0",
      prefix: false,
      type: 4
      /* TOKEN_VALUE */
    };
  };
  var marginTop = marginForSide("top");
  var marginRight = marginForSide("right");
  var marginBottom = marginForSide("bottom");
  var marginLeft = marginForSide("left");
  var overflow = {
    name: "overflow",
    initialValue: "visible",
    prefix: false,
    type: 1,
    parse: function(_context, tokens) {
      return tokens.filter(isIdentToken).map(function(overflow2) {
        switch (overflow2.value) {
          case "hidden":
            return 1;
          case "scroll":
            return 2;
          case "clip":
            return 3;
          case "auto":
            return 4;
          case "visible":
          default:
            return 0;
        }
      });
    }
  };
  var overflowWrap = {
    name: "overflow-wrap",
    initialValue: "normal",
    prefix: false,
    type: 2,
    parse: function(_context, overflow2) {
      switch (overflow2) {
        case "break-word":
          return "break-word";
        case "normal":
        default:
          return "normal";
      }
    }
  };
  var paddingForSide = function(side) {
    return {
      name: "padding-" + side,
      initialValue: "0",
      prefix: false,
      type: 3,
      format: "length-percentage"
    };
  };
  var paddingTop = paddingForSide("top");
  var paddingRight = paddingForSide("right");
  var paddingBottom = paddingForSide("bottom");
  var paddingLeft = paddingForSide("left");
  var textAlign = {
    name: "text-align",
    initialValue: "left",
    prefix: false,
    type: 2,
    parse: function(_context, textAlign2) {
      switch (textAlign2) {
        case "right":
          return 2;
        case "center":
        case "justify":
          return 1;
        case "left":
        default:
          return 0;
      }
    }
  };
  var position = {
    name: "position",
    initialValue: "static",
    prefix: false,
    type: 2,
    parse: function(_context, position2) {
      switch (position2) {
        case "relative":
          return 1;
        case "absolute":
          return 2;
        case "fixed":
          return 3;
        case "sticky":
          return 4;
      }
      return 0;
    }
  };
  var textShadow = {
    name: "text-shadow",
    initialValue: "none",
    type: 1,
    prefix: false,
    parse: function(context, tokens) {
      if (tokens.length === 1 && isIdentWithValue(tokens[0], "none")) {
        return [];
      }
      return parseFunctionArgs(tokens).map(function(values) {
        var shadow = {
          color: COLORS.TRANSPARENT,
          offsetX: ZERO_LENGTH,
          offsetY: ZERO_LENGTH,
          blur: ZERO_LENGTH
        };
        var c = 0;
        for (var i2 = 0; i2 < values.length; i2++) {
          var token = values[i2];
          if (isLength(token)) {
            if (c === 0) {
              shadow.offsetX = token;
            } else if (c === 1) {
              shadow.offsetY = token;
            } else {
              shadow.blur = token;
            }
            c++;
          } else {
            shadow.color = color$1.parse(context, token);
          }
        }
        return shadow;
      });
    }
  };
  var textTransform = {
    name: "text-transform",
    initialValue: "none",
    prefix: false,
    type: 2,
    parse: function(_context, textTransform2) {
      switch (textTransform2) {
        case "uppercase":
          return 2;
        case "lowercase":
          return 1;
        case "capitalize":
          return 3;
      }
      return 0;
    }
  };
  var transform$1 = {
    name: "transform",
    initialValue: "none",
    prefix: true,
    type: 0,
    parse: function(_context, token) {
      if (token.type === 20 && token.value === "none") {
        return null;
      }
      if (token.type === 18) {
        var transformFunction = SUPPORTED_TRANSFORM_FUNCTIONS[token.name];
        if (typeof transformFunction === "undefined") {
          throw new Error('Attempting to parse an unsupported transform function "' + token.name + '"');
        }
        return transformFunction(token.values);
      }
      return null;
    }
  };
  var matrix = function(args) {
    var values = args.filter(function(arg) {
      return arg.type === 17;
    }).map(function(arg) {
      return arg.number;
    });
    return values.length === 6 ? values : null;
  };
  var matrix3d = function(args) {
    var values = args.filter(function(arg) {
      return arg.type === 17;
    }).map(function(arg) {
      return arg.number;
    });
    var a1 = values[0], b1 = values[1];
    values[2];
    values[3];
    var a2 = values[4], b2 = values[5];
    values[6];
    values[7];
    values[8];
    values[9];
    values[10];
    values[11];
    var a4 = values[12], b4 = values[13];
    values[14];
    values[15];
    return values.length === 16 ? [a1, b1, a2, b2, a4, b4] : null;
  };
  var SUPPORTED_TRANSFORM_FUNCTIONS = {
    matrix,
    matrix3d
  };
  var DEFAULT_VALUE = {
    type: 16,
    number: 50,
    flags: FLAG_INTEGER
  };
  var DEFAULT = [DEFAULT_VALUE, DEFAULT_VALUE];
  var transformOrigin = {
    name: "transform-origin",
    initialValue: "50% 50%",
    prefix: true,
    type: 1,
    parse: function(_context, tokens) {
      var origins = tokens.filter(isLengthPercentage);
      if (origins.length !== 2) {
        return DEFAULT;
      }
      return [origins[0], origins[1]];
    }
  };
  var visibility = {
    name: "visible",
    initialValue: "none",
    prefix: false,
    type: 2,
    parse: function(_context, visibility2) {
      switch (visibility2) {
        case "hidden":
          return 1;
        case "collapse":
          return 2;
        case "visible":
        default:
          return 0;
      }
    }
  };
  var WORD_BREAK;
  (function(WORD_BREAK2) {
    WORD_BREAK2["NORMAL"] = "normal";
    WORD_BREAK2["BREAK_ALL"] = "break-all";
    WORD_BREAK2["KEEP_ALL"] = "keep-all";
  })(WORD_BREAK || (WORD_BREAK = {}));
  var wordBreak = {
    name: "word-break",
    initialValue: "normal",
    prefix: false,
    type: 2,
    parse: function(_context, wordBreak2) {
      switch (wordBreak2) {
        case "break-all":
          return WORD_BREAK.BREAK_ALL;
        case "keep-all":
          return WORD_BREAK.KEEP_ALL;
        case "normal":
        default:
          return WORD_BREAK.NORMAL;
      }
    }
  };
  var zIndex$1 = {
    name: "z-index",
    initialValue: "auto",
    prefix: false,
    type: 0,
    parse: function(_context, token) {
      if (token.type === 20) {
        return { auto: true, order: 0 };
      }
      if (isNumberToken(token)) {
        return { auto: false, order: token.number };
      }
      throw new Error("Invalid z-index number parsed");
    }
  };
  var time = {
    name: "time",
    parse: function(_context, value) {
      if (value.type === 15) {
        switch (value.unit.toLowerCase()) {
          case "s":
            return 1e3 * value.number;
          case "ms":
            return value.number;
        }
      }
      throw new Error("Unsupported time type");
    }
  };
  var opacity = {
    name: "opacity",
    initialValue: "1",
    type: 0,
    prefix: false,
    parse: function(_context, token) {
      if (isNumberToken(token)) {
        return token.number;
      }
      return 1;
    }
  };
  var textDecorationColor = {
    name: "text-decoration-color",
    initialValue: "transparent",
    prefix: false,
    type: 3,
    format: "color"
  };
  var textDecorationLine = {
    name: "text-decoration-line",
    initialValue: "none",
    prefix: false,
    type: 1,
    parse: function(_context, tokens) {
      return tokens.filter(isIdentToken).map(function(token) {
        switch (token.value) {
          case "underline":
            return 1;
          case "overline":
            return 2;
          case "line-through":
            return 3;
          case "none":
            return 4;
        }
        return 0;
      }).filter(function(line) {
        return line !== 0;
      });
    }
  };
  var fontFamily = {
    name: "font-family",
    initialValue: "",
    prefix: false,
    type: 1,
    parse: function(_context, tokens) {
      var accumulator = [];
      var results = [];
      tokens.forEach(function(token) {
        switch (token.type) {
          case 20:
          case 0:
            accumulator.push(token.value);
            break;
          case 17:
            accumulator.push(token.number.toString());
            break;
          case 4:
            results.push(accumulator.join(" "));
            accumulator.length = 0;
            break;
        }
      });
      if (accumulator.length) {
        results.push(accumulator.join(" "));
      }
      return results.map(function(result) {
        return result.indexOf(" ") === -1 ? result : "'" + result + "'";
      });
    }
  };
  var fontSize = {
    name: "font-size",
    initialValue: "0",
    prefix: false,
    type: 3,
    format: "length"
  };
  var fontWeight = {
    name: "font-weight",
    initialValue: "normal",
    type: 0,
    prefix: false,
    parse: function(_context, token) {
      if (isNumberToken(token)) {
        return token.number;
      }
      if (isIdentToken(token)) {
        switch (token.value) {
          case "bold":
            return 700;
          case "normal":
          default:
            return 400;
        }
      }
      return 400;
    }
  };
  var fontVariant = {
    name: "font-variant",
    initialValue: "none",
    type: 1,
    prefix: false,
    parse: function(_context, tokens) {
      return tokens.filter(isIdentToken).map(function(token) {
        return token.value;
      });
    }
  };
  var fontStyle = {
    name: "font-style",
    initialValue: "normal",
    prefix: false,
    type: 2,
    parse: function(_context, overflow2) {
      switch (overflow2) {
        case "oblique":
          return "oblique";
        case "italic":
          return "italic";
        case "normal":
        default:
          return "normal";
      }
    }
  };
  var contains = function(bit, value) {
    return (bit & value) !== 0;
  };
  var duration = {
    name: "duration",
    initialValue: "0s",
    prefix: false,
    type: 1,
    parse: function(context, tokens) {
      return tokens.filter(isDimensionToken).map(function(token) {
        return time.parse(context, token);
      });
    }
  };
  var boxShadow = {
    name: "box-shadow",
    initialValue: "none",
    type: 1,
    prefix: false,
    parse: function(context, tokens) {
      if (tokens.length === 1 && isIdentWithValue(tokens[0], "none")) {
        return [];
      }
      return parseFunctionArgs(tokens).map(function(values) {
        var shadow = {
          color: 255,
          offsetX: ZERO_LENGTH,
          offsetY: ZERO_LENGTH,
          blur: ZERO_LENGTH,
          spread: ZERO_LENGTH,
          inset: false
        };
        var c = 0;
        for (var i2 = 0; i2 < values.length; i2++) {
          var token = values[i2];
          if (isIdentWithValue(token, "inset")) {
            shadow.inset = true;
          } else if (isLength(token)) {
            if (c === 0) {
              shadow.offsetX = token;
            } else if (c === 1) {
              shadow.offsetY = token;
            } else if (c === 2) {
              shadow.blur = token;
            } else {
              shadow.spread = token;
            }
            c++;
          } else {
            shadow.color = color$1.parse(context, token);
          }
        }
        return shadow;
      });
    }
  };
  var paintOrder = {
    name: "paint-order",
    initialValue: "normal",
    prefix: false,
    type: 1,
    parse: function(_context, tokens) {
      var DEFAULT_VALUE2 = [
        0,
        1,
        2
        /* MARKERS */
      ];
      var layers = [];
      tokens.filter(isIdentToken).forEach(function(token) {
        switch (token.value) {
          case "stroke":
            layers.push(
              1
              /* STROKE */
            );
            break;
          case "fill":
            layers.push(
              0
              /* FILL */
            );
            break;
          case "markers":
            layers.push(
              2
              /* MARKERS */
            );
            break;
        }
      });
      DEFAULT_VALUE2.forEach(function(value) {
        if (layers.indexOf(value) === -1) {
          layers.push(value);
        }
      });
      return layers;
    }
  };
  var webkitTextStrokeColor = {
    name: "-webkit-text-stroke-color",
    initialValue: "currentcolor",
    prefix: false,
    type: 3,
    format: "color"
  };
  var webkitTextStrokeWidth = {
    name: "-webkit-text-stroke-width",
    initialValue: "0",
    type: 0,
    prefix: false,
    parse: function(_context, token) {
      if (isDimensionToken(token)) {
        return token.number;
      }
      return 0;
    }
  };
  var CSSParsedDeclaration = (
    /** @class */
    function() {
      function CSSParsedDeclaration2(context, declaration) {
        var _a, _b;
        this.animationDuration = parse(context, duration, declaration.animationDuration);
        this.backgroundClip = parse(context, backgroundClip, declaration.backgroundClip);
        this.backgroundColor = parse(context, backgroundColor, declaration.backgroundColor);
        this.backgroundImage = parse(context, backgroundImage, declaration.backgroundImage);
        this.backgroundOrigin = parse(context, backgroundOrigin, declaration.backgroundOrigin);
        this.backgroundPosition = parse(context, backgroundPosition, declaration.backgroundPosition);
        this.backgroundRepeat = parse(context, backgroundRepeat, declaration.backgroundRepeat);
        this.backgroundSize = parse(context, backgroundSize, declaration.backgroundSize);
        this.borderTopColor = parse(context, borderTopColor, declaration.borderTopColor);
        this.borderRightColor = parse(context, borderRightColor, declaration.borderRightColor);
        this.borderBottomColor = parse(context, borderBottomColor, declaration.borderBottomColor);
        this.borderLeftColor = parse(context, borderLeftColor, declaration.borderLeftColor);
        this.borderTopLeftRadius = parse(context, borderTopLeftRadius, declaration.borderTopLeftRadius);
        this.borderTopRightRadius = parse(context, borderTopRightRadius, declaration.borderTopRightRadius);
        this.borderBottomRightRadius = parse(context, borderBottomRightRadius, declaration.borderBottomRightRadius);
        this.borderBottomLeftRadius = parse(context, borderBottomLeftRadius, declaration.borderBottomLeftRadius);
        this.borderTopStyle = parse(context, borderTopStyle, declaration.borderTopStyle);
        this.borderRightStyle = parse(context, borderRightStyle, declaration.borderRightStyle);
        this.borderBottomStyle = parse(context, borderBottomStyle, declaration.borderBottomStyle);
        this.borderLeftStyle = parse(context, borderLeftStyle, declaration.borderLeftStyle);
        this.borderTopWidth = parse(context, borderTopWidth, declaration.borderTopWidth);
        this.borderRightWidth = parse(context, borderRightWidth, declaration.borderRightWidth);
        this.borderBottomWidth = parse(context, borderBottomWidth, declaration.borderBottomWidth);
        this.borderLeftWidth = parse(context, borderLeftWidth, declaration.borderLeftWidth);
        this.boxShadow = parse(context, boxShadow, declaration.boxShadow);
        this.color = parse(context, color, declaration.color);
        this.direction = parse(context, direction, declaration.direction);
        this.display = parse(context, display, declaration.display);
        this.float = parse(context, float, declaration.cssFloat);
        this.fontFamily = parse(context, fontFamily, declaration.fontFamily);
        this.fontSize = parse(context, fontSize, declaration.fontSize);
        this.fontStyle = parse(context, fontStyle, declaration.fontStyle);
        this.fontVariant = parse(context, fontVariant, declaration.fontVariant);
        this.fontWeight = parse(context, fontWeight, declaration.fontWeight);
        this.letterSpacing = parse(context, letterSpacing, declaration.letterSpacing);
        this.lineBreak = parse(context, lineBreak, declaration.lineBreak);
        this.lineHeight = parse(context, lineHeight, declaration.lineHeight);
        this.listStyleImage = parse(context, listStyleImage, declaration.listStyleImage);
        this.listStylePosition = parse(context, listStylePosition, declaration.listStylePosition);
        this.listStyleType = parse(context, listStyleType, declaration.listStyleType);
        this.marginTop = parse(context, marginTop, declaration.marginTop);
        this.marginRight = parse(context, marginRight, declaration.marginRight);
        this.marginBottom = parse(context, marginBottom, declaration.marginBottom);
        this.marginLeft = parse(context, marginLeft, declaration.marginLeft);
        this.opacity = parse(context, opacity, declaration.opacity);
        var overflowTuple = parse(context, overflow, declaration.overflow);
        this.overflowX = overflowTuple[0];
        this.overflowY = overflowTuple[overflowTuple.length > 1 ? 1 : 0];
        this.overflowWrap = parse(context, overflowWrap, declaration.overflowWrap);
        this.paddingTop = parse(context, paddingTop, declaration.paddingTop);
        this.paddingRight = parse(context, paddingRight, declaration.paddingRight);
        this.paddingBottom = parse(context, paddingBottom, declaration.paddingBottom);
        this.paddingLeft = parse(context, paddingLeft, declaration.paddingLeft);
        this.paintOrder = parse(context, paintOrder, declaration.paintOrder);
        this.position = parse(context, position, declaration.position);
        this.textAlign = parse(context, textAlign, declaration.textAlign);
        this.textDecorationColor = parse(context, textDecorationColor, (_a = declaration.textDecorationColor) !== null && _a !== void 0 ? _a : declaration.color);
        this.textDecorationLine = parse(context, textDecorationLine, (_b = declaration.textDecorationLine) !== null && _b !== void 0 ? _b : declaration.textDecoration);
        this.textShadow = parse(context, textShadow, declaration.textShadow);
        this.textTransform = parse(context, textTransform, declaration.textTransform);
        this.transform = parse(context, transform$1, declaration.transform);
        this.transformOrigin = parse(context, transformOrigin, declaration.transformOrigin);
        this.visibility = parse(context, visibility, declaration.visibility);
        this.webkitTextStrokeColor = parse(context, webkitTextStrokeColor, declaration.webkitTextStrokeColor);
        this.webkitTextStrokeWidth = parse(context, webkitTextStrokeWidth, declaration.webkitTextStrokeWidth);
        this.wordBreak = parse(context, wordBreak, declaration.wordBreak);
        this.zIndex = parse(context, zIndex$1, declaration.zIndex);
      }
      CSSParsedDeclaration2.prototype.isVisible = function() {
        return this.display > 0 && this.opacity > 0 && this.visibility === 0;
      };
      CSSParsedDeclaration2.prototype.isTransparent = function() {
        return isTransparent(this.backgroundColor);
      };
      CSSParsedDeclaration2.prototype.isTransformed = function() {
        return this.transform !== null;
      };
      CSSParsedDeclaration2.prototype.isPositioned = function() {
        return this.position !== 0;
      };
      CSSParsedDeclaration2.prototype.isPositionedWithZIndex = function() {
        return this.isPositioned() && !this.zIndex.auto;
      };
      CSSParsedDeclaration2.prototype.isFloating = function() {
        return this.float !== 0;
      };
      CSSParsedDeclaration2.prototype.isInlineLevel = function() {
        return contains(
          this.display,
          4
          /* INLINE */
        ) || contains(
          this.display,
          33554432
          /* INLINE_BLOCK */
        ) || contains(
          this.display,
          268435456
          /* INLINE_FLEX */
        ) || contains(
          this.display,
          536870912
          /* INLINE_GRID */
        ) || contains(
          this.display,
          67108864
          /* INLINE_LIST_ITEM */
        ) || contains(
          this.display,
          134217728
          /* INLINE_TABLE */
        );
      };
      return CSSParsedDeclaration2;
    }()
  );
  var parse = function(context, descriptor, style) {
    var tokenizer = new Tokenizer();
    var value = style !== null && typeof style !== "undefined" ? style.toString() : descriptor.initialValue;
    tokenizer.write(value);
    var parser = new Parser(tokenizer.read());
    switch (descriptor.type) {
      case 2:
        var token = parser.parseComponentValue();
        return descriptor.parse(context, isIdentToken(token) ? token.value : descriptor.initialValue);
      case 0:
        return descriptor.parse(context, parser.parseComponentValue());
      case 1:
        return descriptor.parse(context, parser.parseComponentValues());
      case 4:
        return parser.parseComponentValue();
      case 3:
        switch (descriptor.format) {
          case "angle":
            return angle.parse(context, parser.parseComponentValue());
          case "color":
            return color$1.parse(context, parser.parseComponentValue());
          case "image":
            return image.parse(context, parser.parseComponentValue());
          case "length":
            var length_1 = parser.parseComponentValue();
            return isLength(length_1) ? length_1 : ZERO_LENGTH;
          case "length-percentage":
            var value_1 = parser.parseComponentValue();
            return isLengthPercentage(value_1) ? value_1 : ZERO_LENGTH;
          case "time":
            return time.parse(context, parser.parseComponentValue());
        }
        break;
    }
  };
  var elementDebuggerAttribute = "data-html2canvas-debug";
  var getElementDebugType = function(element) {
    var attribute = element.getAttribute(elementDebuggerAttribute);
    switch (attribute) {
      case "all":
        return 1;
      case "clone":
        return 2;
      case "parse":
        return 3;
      case "render":
        return 4;
      default:
        return 0;
    }
  };
  var isDebugging = function(element, type) {
    var elementType = getElementDebugType(element);
    return elementType === 1 || type === elementType;
  };
  var ElementContainer = (
    /** @class */
    /* @__PURE__ */ function() {
      function ElementContainer2(context, element) {
        this.context = context;
        this.textNodes = [];
        this.elements = [];
        this.flags = 0;
        if (isDebugging(
          element,
          3
          /* PARSE */
        )) {
          debugger;
        }
        this.styles = new CSSParsedDeclaration(context, window.getComputedStyle(element, null));
        if (isHTMLElementNode(element)) {
          if (this.styles.animationDuration.some(function(duration2) {
            return duration2 > 0;
          })) {
            element.style.animationDuration = "0s";
          }
          if (this.styles.transform !== null) {
            element.style.transform = "none";
          }
        }
        this.bounds = parseBounds(this.context, element);
        if (isDebugging(
          element,
          4
          /* RENDER */
        )) {
          this.flags |= 16;
        }
      }
      return ElementContainer2;
    }()
  );
  var base64 = "AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=";
  var chars$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var lookup$1 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
  for (var i$1 = 0; i$1 < chars$1.length; i$1++) {
    lookup$1[chars$1.charCodeAt(i$1)] = i$1;
  }
  var decode = function(base642) {
    var bufferLength = base642.length * 0.75, len = base642.length, i2, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base642[base642.length - 1] === "=") {
      bufferLength--;
      if (base642[base642.length - 2] === "=") {
        bufferLength--;
      }
    }
    var buffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined" && typeof Uint8Array.prototype.slice !== "undefined" ? new ArrayBuffer(bufferLength) : new Array(bufferLength);
    var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);
    for (i2 = 0; i2 < len; i2 += 4) {
      encoded1 = lookup$1[base642.charCodeAt(i2)];
      encoded2 = lookup$1[base642.charCodeAt(i2 + 1)];
      encoded3 = lookup$1[base642.charCodeAt(i2 + 2)];
      encoded4 = lookup$1[base642.charCodeAt(i2 + 3)];
      bytes[p++] = encoded1 << 2 | encoded2 >> 4;
      bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
      bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
  };
  var polyUint16Array = function(buffer) {
    var length = buffer.length;
    var bytes = [];
    for (var i2 = 0; i2 < length; i2 += 2) {
      bytes.push(buffer[i2 + 1] << 8 | buffer[i2]);
    }
    return bytes;
  };
  var polyUint32Array = function(buffer) {
    var length = buffer.length;
    var bytes = [];
    for (var i2 = 0; i2 < length; i2 += 4) {
      bytes.push(buffer[i2 + 3] << 24 | buffer[i2 + 2] << 16 | buffer[i2 + 1] << 8 | buffer[i2]);
    }
    return bytes;
  };
  var UTRIE2_SHIFT_2 = 5;
  var UTRIE2_SHIFT_1 = 6 + 5;
  var UTRIE2_INDEX_SHIFT = 2;
  var UTRIE2_SHIFT_1_2 = UTRIE2_SHIFT_1 - UTRIE2_SHIFT_2;
  var UTRIE2_LSCP_INDEX_2_OFFSET = 65536 >> UTRIE2_SHIFT_2;
  var UTRIE2_DATA_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_2;
  var UTRIE2_DATA_MASK = UTRIE2_DATA_BLOCK_LENGTH - 1;
  var UTRIE2_LSCP_INDEX_2_LENGTH = 1024 >> UTRIE2_SHIFT_2;
  var UTRIE2_INDEX_2_BMP_LENGTH = UTRIE2_LSCP_INDEX_2_OFFSET + UTRIE2_LSCP_INDEX_2_LENGTH;
  var UTRIE2_UTF8_2B_INDEX_2_OFFSET = UTRIE2_INDEX_2_BMP_LENGTH;
  var UTRIE2_UTF8_2B_INDEX_2_LENGTH = 2048 >> 6;
  var UTRIE2_INDEX_1_OFFSET = UTRIE2_UTF8_2B_INDEX_2_OFFSET + UTRIE2_UTF8_2B_INDEX_2_LENGTH;
  var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 65536 >> UTRIE2_SHIFT_1;
  var UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_1_2;
  var UTRIE2_INDEX_2_MASK = UTRIE2_INDEX_2_BLOCK_LENGTH - 1;
  var slice16 = function(view, start, end) {
    if (view.slice) {
      return view.slice(start, end);
    }
    return new Uint16Array(Array.prototype.slice.call(view, start, end));
  };
  var slice32 = function(view, start, end) {
    if (view.slice) {
      return view.slice(start, end);
    }
    return new Uint32Array(Array.prototype.slice.call(view, start, end));
  };
  var createTrieFromBase64 = function(base642, _byteLength) {
    var buffer = decode(base642);
    var view32 = Array.isArray(buffer) ? polyUint32Array(buffer) : new Uint32Array(buffer);
    var view16 = Array.isArray(buffer) ? polyUint16Array(buffer) : new Uint16Array(buffer);
    var headerLength = 24;
    var index2 = slice16(view16, headerLength / 2, view32[4] / 2);
    var data = view32[5] === 2 ? slice16(view16, (headerLength + view32[4]) / 2) : slice32(view32, Math.ceil((headerLength + view32[4]) / 4));
    return new Trie(view32[0], view32[1], view32[2], view32[3], index2, data);
  };
  var Trie = (
    /** @class */
    function() {
      function Trie2(initialValue, errorValue, highStart, highValueIndex, index2, data) {
        this.initialValue = initialValue;
        this.errorValue = errorValue;
        this.highStart = highStart;
        this.highValueIndex = highValueIndex;
        this.index = index2;
        this.data = data;
      }
      Trie2.prototype.get = function(codePoint) {
        var ix;
        if (codePoint >= 0) {
          if (codePoint < 55296 || codePoint > 56319 && codePoint <= 65535) {
            ix = this.index[codePoint >> UTRIE2_SHIFT_2];
            ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
            return this.data[ix];
          }
          if (codePoint <= 65535) {
            ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET + (codePoint - 55296 >> UTRIE2_SHIFT_2)];
            ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
            return this.data[ix];
          }
          if (codePoint < this.highStart) {
            ix = UTRIE2_INDEX_1_OFFSET - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH + (codePoint >> UTRIE2_SHIFT_1);
            ix = this.index[ix];
            ix += codePoint >> UTRIE2_SHIFT_2 & UTRIE2_INDEX_2_MASK;
            ix = this.index[ix];
            ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
            return this.data[ix];
          }
          if (codePoint <= 1114111) {
            return this.data[this.highValueIndex];
          }
        }
        return this.errorValue;
      };
      return Trie2;
    }()
  );
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }
  var Prepend = 1;
  var CR = 2;
  var LF = 3;
  var Control = 4;
  var Extend = 5;
  var SpacingMark = 7;
  var L = 8;
  var V = 9;
  var T = 10;
  var LV = 11;
  var LVT = 12;
  var ZWJ = 13;
  var Extended_Pictographic = 14;
  var RI = 15;
  var toCodePoints = function(str) {
    var codePoints = [];
    var i2 = 0;
    var length = str.length;
    while (i2 < length) {
      var value = str.charCodeAt(i2++);
      if (value >= 55296 && value <= 56319 && i2 < length) {
        var extra = str.charCodeAt(i2++);
        if ((extra & 64512) === 56320) {
          codePoints.push(((value & 1023) << 10) + (extra & 1023) + 65536);
        } else {
          codePoints.push(value);
          i2--;
        }
      } else {
        codePoints.push(value);
      }
    }
    return codePoints;
  };
  var fromCodePoint = function() {
    var codePoints = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      codePoints[_i] = arguments[_i];
    }
    if (String.fromCodePoint) {
      return String.fromCodePoint.apply(String, codePoints);
    }
    var length = codePoints.length;
    if (!length) {
      return "";
    }
    var codeUnits = [];
    var index2 = -1;
    var result = "";
    while (++index2 < length) {
      var codePoint = codePoints[index2];
      if (codePoint <= 65535) {
        codeUnits.push(codePoint);
      } else {
        codePoint -= 65536;
        codeUnits.push((codePoint >> 10) + 55296, codePoint % 1024 + 56320);
      }
      if (index2 + 1 === length || codeUnits.length > 16384) {
        result += String.fromCharCode.apply(String, codeUnits);
        codeUnits.length = 0;
      }
    }
    return result;
  };
  var UnicodeTrie = createTrieFromBase64(base64);
  var BREAK_NOT_ALLOWED = "×";
  var BREAK_ALLOWED = "÷";
  var codePointToClass = function(codePoint) {
    return UnicodeTrie.get(codePoint);
  };
  var _graphemeBreakAtIndex = function(_codePoints, classTypes, index2) {
    var prevIndex = index2 - 2;
    var prev = classTypes[prevIndex];
    var current = classTypes[index2 - 1];
    var next = classTypes[index2];
    if (current === CR && next === LF) {
      return BREAK_NOT_ALLOWED;
    }
    if (current === CR || current === LF || current === Control) {
      return BREAK_ALLOWED;
    }
    if (next === CR || next === LF || next === Control) {
      return BREAK_ALLOWED;
    }
    if (current === L && [L, V, LV, LVT].indexOf(next) !== -1) {
      return BREAK_NOT_ALLOWED;
    }
    if ((current === LV || current === V) && (next === V || next === T)) {
      return BREAK_NOT_ALLOWED;
    }
    if ((current === LVT || current === T) && next === T) {
      return BREAK_NOT_ALLOWED;
    }
    if (next === ZWJ || next === Extend) {
      return BREAK_NOT_ALLOWED;
    }
    if (next === SpacingMark) {
      return BREAK_NOT_ALLOWED;
    }
    if (current === Prepend) {
      return BREAK_NOT_ALLOWED;
    }
    if (current === ZWJ && next === Extended_Pictographic) {
      while (prev === Extend) {
        prev = classTypes[--prevIndex];
      }
      if (prev === Extended_Pictographic) {
        return BREAK_NOT_ALLOWED;
      }
    }
    if (current === RI && next === RI) {
      var countRI = 0;
      while (prev === RI) {
        countRI++;
        prev = classTypes[--prevIndex];
      }
      if (countRI % 2 === 0) {
        return BREAK_NOT_ALLOWED;
      }
    }
    return BREAK_ALLOWED;
  };
  var GraphemeBreaker = function(str) {
    var codePoints = toCodePoints(str);
    var length = codePoints.length;
    var index2 = 0;
    var lastEnd = 0;
    var classTypes = codePoints.map(codePointToClass);
    return {
      next: function() {
        if (index2 >= length) {
          return { done: true, value: null };
        }
        var graphemeBreak = BREAK_NOT_ALLOWED;
        while (index2 < length && (graphemeBreak = _graphemeBreakAtIndex(codePoints, classTypes, ++index2)) === BREAK_NOT_ALLOWED) {
        }
        if (graphemeBreak !== BREAK_NOT_ALLOWED || index2 === length) {
          var value = fromCodePoint.apply(null, codePoints.slice(lastEnd, index2));
          lastEnd = index2;
          return { value, done: false };
        }
        return { done: true, value: null };
      }
    };
  };
  var splitGraphemes = function(str) {
    var breaker = GraphemeBreaker(str);
    var graphemes = [];
    var bk;
    while (!(bk = breaker.next()).done) {
      if (bk.value) {
        graphemes.push(bk.value.slice());
      }
    }
    return graphemes;
  };
  var testRangeBounds = function(document2) {
    var TEST_HEIGHT = 123;
    if (document2.createRange) {
      var range2 = document2.createRange();
      if (range2.getBoundingClientRect) {
        var testElement = document2.createElement("boundtest");
        testElement.style.height = TEST_HEIGHT + "px";
        testElement.style.display = "block";
        document2.body.appendChild(testElement);
        range2.selectNode(testElement);
        var rangeBounds = range2.getBoundingClientRect();
        var rangeHeight = Math.round(rangeBounds.height);
        document2.body.removeChild(testElement);
        if (rangeHeight === TEST_HEIGHT) {
          return true;
        }
      }
    }
    return false;
  };
  var testIOSLineBreak = function(document2) {
    var testElement = document2.createElement("boundtest");
    testElement.style.width = "50px";
    testElement.style.display = "block";
    testElement.style.fontSize = "12px";
    testElement.style.letterSpacing = "0px";
    testElement.style.wordSpacing = "0px";
    document2.body.appendChild(testElement);
    var range2 = document2.createRange();
    testElement.innerHTML = typeof "".repeat === "function" ? "&#128104;".repeat(10) : "";
    var node = testElement.firstChild;
    var textList = toCodePoints$1(node.data).map(function(i2) {
      return fromCodePoint$1(i2);
    });
    var offset = 0;
    var prev = {};
    var supports = textList.every(function(text, i2) {
      range2.setStart(node, offset);
      range2.setEnd(node, offset + text.length);
      var rect = range2.getBoundingClientRect();
      offset += text.length;
      var boundAhead = rect.x > prev.x || rect.y > prev.y;
      prev = rect;
      if (i2 === 0) {
        return true;
      }
      return boundAhead;
    });
    document2.body.removeChild(testElement);
    return supports;
  };
  var testCORS = function() {
    return typeof new Image().crossOrigin !== "undefined";
  };
  var testResponseType = function() {
    return typeof new XMLHttpRequest().responseType === "string";
  };
  var testSVG = function(document2) {
    var img = new Image();
    var canvas = document2.createElement("canvas");
    var ctx = canvas.getContext("2d");
    if (!ctx) {
      return false;
    }
    img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
    try {
      ctx.drawImage(img, 0, 0);
      canvas.toDataURL();
    } catch (e2) {
      return false;
    }
    return true;
  };
  var isGreenPixel = function(data) {
    return data[0] === 0 && data[1] === 255 && data[2] === 0 && data[3] === 255;
  };
  var testForeignObject = function(document2) {
    var canvas = document2.createElement("canvas");
    var size = 100;
    canvas.width = size;
    canvas.height = size;
    var ctx = canvas.getContext("2d");
    if (!ctx) {
      return Promise.reject(false);
    }
    ctx.fillStyle = "rgb(0, 255, 0)";
    ctx.fillRect(0, 0, size, size);
    var img = new Image();
    var greenImageSrc = canvas.toDataURL();
    img.src = greenImageSrc;
    var svg = createForeignObjectSVG(size, size, 0, 0, img);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, size, size);
    return loadSerializedSVG$1(svg).then(function(img2) {
      ctx.drawImage(img2, 0, 0);
      var data = ctx.getImageData(0, 0, size, size).data;
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, size, size);
      var node = document2.createElement("div");
      node.style.backgroundImage = "url(" + greenImageSrc + ")";
      node.style.height = size + "px";
      return isGreenPixel(data) ? loadSerializedSVG$1(createForeignObjectSVG(size, size, 0, 0, node)) : Promise.reject(false);
    }).then(function(img2) {
      ctx.drawImage(img2, 0, 0);
      return isGreenPixel(ctx.getImageData(0, 0, size, size).data);
    }).catch(function() {
      return false;
    });
  };
  var createForeignObjectSVG = function(width, height, x, y, node) {
    var xmlns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(xmlns, "svg");
    var foreignObject = document.createElementNS(xmlns, "foreignObject");
    svg.setAttributeNS(null, "width", width.toString());
    svg.setAttributeNS(null, "height", height.toString());
    foreignObject.setAttributeNS(null, "width", "100%");
    foreignObject.setAttributeNS(null, "height", "100%");
    foreignObject.setAttributeNS(null, "x", x.toString());
    foreignObject.setAttributeNS(null, "y", y.toString());
    foreignObject.setAttributeNS(null, "externalResourcesRequired", "true");
    svg.appendChild(foreignObject);
    foreignObject.appendChild(node);
    return svg;
  };
  var loadSerializedSVG$1 = function(svg) {
    return new Promise(function(resolve, reject) {
      var img = new Image();
      img.onload = function() {
        return resolve(img);
      };
      img.onerror = reject;
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
    });
  };
  var FEATURES = {
    get SUPPORT_RANGE_BOUNDS() {
      var value = testRangeBounds(document);
      Object.defineProperty(FEATURES, "SUPPORT_RANGE_BOUNDS", { value });
      return value;
    },
    get SUPPORT_WORD_BREAKING() {
      var value = FEATURES.SUPPORT_RANGE_BOUNDS && testIOSLineBreak(document);
      Object.defineProperty(FEATURES, "SUPPORT_WORD_BREAKING", { value });
      return value;
    },
    get SUPPORT_SVG_DRAWING() {
      var value = testSVG(document);
      Object.defineProperty(FEATURES, "SUPPORT_SVG_DRAWING", { value });
      return value;
    },
    get SUPPORT_FOREIGNOBJECT_DRAWING() {
      var value = typeof Array.from === "function" && typeof window.fetch === "function" ? testForeignObject(document) : Promise.resolve(false);
      Object.defineProperty(FEATURES, "SUPPORT_FOREIGNOBJECT_DRAWING", { value });
      return value;
    },
    get SUPPORT_CORS_IMAGES() {
      var value = testCORS();
      Object.defineProperty(FEATURES, "SUPPORT_CORS_IMAGES", { value });
      return value;
    },
    get SUPPORT_RESPONSE_TYPE() {
      var value = testResponseType();
      Object.defineProperty(FEATURES, "SUPPORT_RESPONSE_TYPE", { value });
      return value;
    },
    get SUPPORT_CORS_XHR() {
      var value = "withCredentials" in new XMLHttpRequest();
      Object.defineProperty(FEATURES, "SUPPORT_CORS_XHR", { value });
      return value;
    },
    get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
      var value = !!(typeof Intl !== "undefined" && Intl.Segmenter);
      Object.defineProperty(FEATURES, "SUPPORT_NATIVE_TEXT_SEGMENTATION", { value });
      return value;
    }
  };
  var TextBounds = (
    /** @class */
    /* @__PURE__ */ function() {
      function TextBounds2(text, bounds) {
        this.text = text;
        this.bounds = bounds;
      }
      return TextBounds2;
    }()
  );
  var parseTextBounds = function(context, value, styles, node) {
    var textList = breakText(value, styles);
    var textBounds = [];
    var offset = 0;
    textList.forEach(function(text) {
      if (styles.textDecorationLine.length || text.trim().length > 0) {
        if (FEATURES.SUPPORT_RANGE_BOUNDS) {
          var clientRects = createRange(node, offset, text.length).getClientRects();
          if (clientRects.length > 1) {
            var subSegments = segmentGraphemes(text);
            var subOffset_1 = 0;
            subSegments.forEach(function(subSegment) {
              textBounds.push(new TextBounds(subSegment, Bounds.fromDOMRectList(context, createRange(node, subOffset_1 + offset, subSegment.length).getClientRects())));
              subOffset_1 += subSegment.length;
            });
          } else {
            textBounds.push(new TextBounds(text, Bounds.fromDOMRectList(context, clientRects)));
          }
        } else {
          var replacementNode = node.splitText(text.length);
          textBounds.push(new TextBounds(text, getWrapperBounds(context, node)));
          node = replacementNode;
        }
      } else if (!FEATURES.SUPPORT_RANGE_BOUNDS) {
        node = node.splitText(text.length);
      }
      offset += text.length;
    });
    return textBounds;
  };
  var getWrapperBounds = function(context, node) {
    var ownerDocument = node.ownerDocument;
    if (ownerDocument) {
      var wrapper = ownerDocument.createElement("html2canvaswrapper");
      wrapper.appendChild(node.cloneNode(true));
      var parentNode = node.parentNode;
      if (parentNode) {
        parentNode.replaceChild(wrapper, node);
        var bounds = parseBounds(context, wrapper);
        if (wrapper.firstChild) {
          parentNode.replaceChild(wrapper.firstChild, wrapper);
        }
        return bounds;
      }
    }
    return Bounds.EMPTY;
  };
  var createRange = function(node, offset, length) {
    var ownerDocument = node.ownerDocument;
    if (!ownerDocument) {
      throw new Error("Node has no owner document");
    }
    var range2 = ownerDocument.createRange();
    range2.setStart(node, offset);
    range2.setEnd(node, offset + length);
    return range2;
  };
  var segmentGraphemes = function(value) {
    if (FEATURES.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
      var segmenter = new Intl.Segmenter(void 0, { granularity: "grapheme" });
      return Array.from(segmenter.segment(value)).map(function(segment) {
        return segment.segment;
      });
    }
    return splitGraphemes(value);
  };
  var segmentWords = function(value, styles) {
    if (FEATURES.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
      var segmenter = new Intl.Segmenter(void 0, {
        granularity: "word"
      });
      return Array.from(segmenter.segment(value)).map(function(segment) {
        return segment.segment;
      });
    }
    return breakWords(value, styles);
  };
  var breakText = function(value, styles) {
    return styles.letterSpacing !== 0 ? segmentGraphemes(value) : segmentWords(value, styles);
  };
  var wordSeparators = [32, 160, 4961, 65792, 65793, 4153, 4241];
  var breakWords = function(str, styles) {
    var breaker = LineBreaker(str, {
      lineBreak: styles.lineBreak,
      wordBreak: styles.overflowWrap === "break-word" ? "break-word" : styles.wordBreak
    });
    var words = [];
    var bk;
    var _loop_1 = function() {
      if (bk.value) {
        var value = bk.value.slice();
        var codePoints = toCodePoints$1(value);
        var word_1 = "";
        codePoints.forEach(function(codePoint) {
          if (wordSeparators.indexOf(codePoint) === -1) {
            word_1 += fromCodePoint$1(codePoint);
          } else {
            if (word_1.length) {
              words.push(word_1);
            }
            words.push(fromCodePoint$1(codePoint));
            word_1 = "";
          }
        });
        if (word_1.length) {
          words.push(word_1);
        }
      }
    };
    while (!(bk = breaker.next()).done) {
      _loop_1();
    }
    return words;
  };
  var TextContainer = (
    /** @class */
    /* @__PURE__ */ function() {
      function TextContainer2(context, node, styles) {
        this.text = transform(node.data, styles.textTransform);
        this.textBounds = parseTextBounds(context, this.text, styles, node);
      }
      return TextContainer2;
    }()
  );
  var transform = function(text, transform2) {
    switch (transform2) {
      case 1:
        return text.toLowerCase();
      case 3:
        return text.replace(CAPITALIZE, capitalize);
      case 2:
        return text.toUpperCase();
      default:
        return text;
    }
  };
  var CAPITALIZE = /(^|\s|:|-|\(|\))([a-z])/g;
  var capitalize = function(m, p1, p2) {
    if (m.length > 0) {
      return p1 + p2.toUpperCase();
    }
    return m;
  };
  var ImageElementContainer = (
    /** @class */
    function(_super) {
      __extends(ImageElementContainer2, _super);
      function ImageElementContainer2(context, img) {
        var _this = _super.call(this, context, img) || this;
        _this.src = img.currentSrc || img.src;
        _this.intrinsicWidth = img.naturalWidth;
        _this.intrinsicHeight = img.naturalHeight;
        _this.context.cache.addImage(_this.src);
        return _this;
      }
      return ImageElementContainer2;
    }(ElementContainer)
  );
  var CanvasElementContainer = (
    /** @class */
    function(_super) {
      __extends(CanvasElementContainer2, _super);
      function CanvasElementContainer2(context, canvas) {
        var _this = _super.call(this, context, canvas) || this;
        _this.canvas = canvas;
        _this.intrinsicWidth = canvas.width;
        _this.intrinsicHeight = canvas.height;
        return _this;
      }
      return CanvasElementContainer2;
    }(ElementContainer)
  );
  var SVGElementContainer = (
    /** @class */
    function(_super) {
      __extends(SVGElementContainer2, _super);
      function SVGElementContainer2(context, img) {
        var _this = _super.call(this, context, img) || this;
        var s = new XMLSerializer();
        var bounds = parseBounds(context, img);
        img.setAttribute("width", bounds.width + "px");
        img.setAttribute("height", bounds.height + "px");
        _this.svg = "data:image/svg+xml," + encodeURIComponent(s.serializeToString(img));
        _this.intrinsicWidth = img.width.baseVal.value;
        _this.intrinsicHeight = img.height.baseVal.value;
        _this.context.cache.addImage(_this.svg);
        return _this;
      }
      return SVGElementContainer2;
    }(ElementContainer)
  );
  var LIElementContainer = (
    /** @class */
    function(_super) {
      __extends(LIElementContainer2, _super);
      function LIElementContainer2(context, element) {
        var _this = _super.call(this, context, element) || this;
        _this.value = element.value;
        return _this;
      }
      return LIElementContainer2;
    }(ElementContainer)
  );
  var OLElementContainer = (
    /** @class */
    function(_super) {
      __extends(OLElementContainer2, _super);
      function OLElementContainer2(context, element) {
        var _this = _super.call(this, context, element) || this;
        _this.start = element.start;
        _this.reversed = typeof element.reversed === "boolean" && element.reversed === true;
        return _this;
      }
      return OLElementContainer2;
    }(ElementContainer)
  );
  var CHECKBOX_BORDER_RADIUS = [
    {
      type: 15,
      flags: 0,
      unit: "px",
      number: 3
    }
  ];
  var RADIO_BORDER_RADIUS = [
    {
      type: 16,
      flags: 0,
      number: 50
    }
  ];
  var reformatInputBounds = function(bounds) {
    if (bounds.width > bounds.height) {
      return new Bounds(bounds.left + (bounds.width - bounds.height) / 2, bounds.top, bounds.height, bounds.height);
    } else if (bounds.width < bounds.height) {
      return new Bounds(bounds.left, bounds.top + (bounds.height - bounds.width) / 2, bounds.width, bounds.width);
    }
    return bounds;
  };
  var getInputValue = function(node) {
    var value = node.type === PASSWORD ? new Array(node.value.length + 1).join("•") : node.value;
    return value.length === 0 ? node.placeholder || "" : value;
  };
  var CHECKBOX = "checkbox";
  var RADIO = "radio";
  var PASSWORD = "password";
  var INPUT_COLOR = 707406591;
  var InputElementContainer = (
    /** @class */
    function(_super) {
      __extends(InputElementContainer2, _super);
      function InputElementContainer2(context, input) {
        var _this = _super.call(this, context, input) || this;
        _this.type = input.type.toLowerCase();
        _this.checked = input.checked;
        _this.value = getInputValue(input);
        if (_this.type === CHECKBOX || _this.type === RADIO) {
          _this.styles.backgroundColor = 3739148031;
          _this.styles.borderTopColor = _this.styles.borderRightColor = _this.styles.borderBottomColor = _this.styles.borderLeftColor = 2779096575;
          _this.styles.borderTopWidth = _this.styles.borderRightWidth = _this.styles.borderBottomWidth = _this.styles.borderLeftWidth = 1;
          _this.styles.borderTopStyle = _this.styles.borderRightStyle = _this.styles.borderBottomStyle = _this.styles.borderLeftStyle = 1;
          _this.styles.backgroundClip = [
            0
            /* BORDER_BOX */
          ];
          _this.styles.backgroundOrigin = [
            0
            /* BORDER_BOX */
          ];
          _this.bounds = reformatInputBounds(_this.bounds);
        }
        switch (_this.type) {
          case CHECKBOX:
            _this.styles.borderTopRightRadius = _this.styles.borderTopLeftRadius = _this.styles.borderBottomRightRadius = _this.styles.borderBottomLeftRadius = CHECKBOX_BORDER_RADIUS;
            break;
          case RADIO:
            _this.styles.borderTopRightRadius = _this.styles.borderTopLeftRadius = _this.styles.borderBottomRightRadius = _this.styles.borderBottomLeftRadius = RADIO_BORDER_RADIUS;
            break;
        }
        return _this;
      }
      return InputElementContainer2;
    }(ElementContainer)
  );
  var SelectElementContainer = (
    /** @class */
    function(_super) {
      __extends(SelectElementContainer2, _super);
      function SelectElementContainer2(context, element) {
        var _this = _super.call(this, context, element) || this;
        var option = element.options[element.selectedIndex || 0];
        _this.value = option ? option.text || "" : "";
        return _this;
      }
      return SelectElementContainer2;
    }(ElementContainer)
  );
  var TextareaElementContainer = (
    /** @class */
    function(_super) {
      __extends(TextareaElementContainer2, _super);
      function TextareaElementContainer2(context, element) {
        var _this = _super.call(this, context, element) || this;
        _this.value = element.value;
        return _this;
      }
      return TextareaElementContainer2;
    }(ElementContainer)
  );
  var IFrameElementContainer = (
    /** @class */
    function(_super) {
      __extends(IFrameElementContainer2, _super);
      function IFrameElementContainer2(context, iframe) {
        var _this = _super.call(this, context, iframe) || this;
        _this.src = iframe.src;
        _this.width = parseInt(iframe.width, 10) || 0;
        _this.height = parseInt(iframe.height, 10) || 0;
        _this.backgroundColor = _this.styles.backgroundColor;
        try {
          if (iframe.contentWindow && iframe.contentWindow.document && iframe.contentWindow.document.documentElement) {
            _this.tree = parseTree(context, iframe.contentWindow.document.documentElement);
            var documentBackgroundColor = iframe.contentWindow.document.documentElement ? parseColor(context, getComputedStyle(iframe.contentWindow.document.documentElement).backgroundColor) : COLORS.TRANSPARENT;
            var bodyBackgroundColor = iframe.contentWindow.document.body ? parseColor(context, getComputedStyle(iframe.contentWindow.document.body).backgroundColor) : COLORS.TRANSPARENT;
            _this.backgroundColor = isTransparent(documentBackgroundColor) ? isTransparent(bodyBackgroundColor) ? _this.styles.backgroundColor : bodyBackgroundColor : documentBackgroundColor;
          }
        } catch (e2) {
        }
        return _this;
      }
      return IFrameElementContainer2;
    }(ElementContainer)
  );
  var LIST_OWNERS = ["OL", "UL", "MENU"];
  var parseNodeTree = function(context, node, parent, root) {
    for (var childNode = node.firstChild, nextNode = void 0; childNode; childNode = nextNode) {
      nextNode = childNode.nextSibling;
      if (isTextNode(childNode) && childNode.data.trim().length > 0) {
        parent.textNodes.push(new TextContainer(context, childNode, parent.styles));
      } else if (isElementNode(childNode)) {
        if (isSlotElement(childNode) && childNode.assignedNodes) {
          childNode.assignedNodes().forEach(function(childNode2) {
            return parseNodeTree(context, childNode2, parent, root);
          });
        } else {
          var container = createContainer(context, childNode);
          if (container.styles.isVisible()) {
            if (createsRealStackingContext(childNode, container, root)) {
              container.flags |= 4;
            } else if (createsStackingContext(container.styles)) {
              container.flags |= 2;
            }
            if (LIST_OWNERS.indexOf(childNode.tagName) !== -1) {
              container.flags |= 8;
            }
            parent.elements.push(container);
            childNode.slot;
            if (childNode.shadowRoot) {
              parseNodeTree(context, childNode.shadowRoot, container, root);
            } else if (!isTextareaElement(childNode) && !isSVGElement(childNode) && !isSelectElement(childNode)) {
              parseNodeTree(context, childNode, container, root);
            }
          }
        }
      }
    }
  };
  var createContainer = function(context, element) {
    if (isImageElement(element)) {
      return new ImageElementContainer(context, element);
    }
    if (isCanvasElement(element)) {
      return new CanvasElementContainer(context, element);
    }
    if (isSVGElement(element)) {
      return new SVGElementContainer(context, element);
    }
    if (isLIElement(element)) {
      return new LIElementContainer(context, element);
    }
    if (isOLElement(element)) {
      return new OLElementContainer(context, element);
    }
    if (isInputElement(element)) {
      return new InputElementContainer(context, element);
    }
    if (isSelectElement(element)) {
      return new SelectElementContainer(context, element);
    }
    if (isTextareaElement(element)) {
      return new TextareaElementContainer(context, element);
    }
    if (isIFrameElement(element)) {
      return new IFrameElementContainer(context, element);
    }
    return new ElementContainer(context, element);
  };
  var parseTree = function(context, element) {
    var container = createContainer(context, element);
    container.flags |= 4;
    parseNodeTree(context, element, container, container);
    return container;
  };
  var createsRealStackingContext = function(node, container, root) {
    return container.styles.isPositionedWithZIndex() || container.styles.opacity < 1 || container.styles.isTransformed() || isBodyElement(node) && root.styles.isTransparent();
  };
  var createsStackingContext = function(styles) {
    return styles.isPositioned() || styles.isFloating();
  };
  var isTextNode = function(node) {
    return node.nodeType === Node.TEXT_NODE;
  };
  var isElementNode = function(node) {
    return node.nodeType === Node.ELEMENT_NODE;
  };
  var isHTMLElementNode = function(node) {
    return isElementNode(node) && typeof node.style !== "undefined" && !isSVGElementNode(node);
  };
  var isSVGElementNode = function(element) {
    return typeof element.className === "object";
  };
  var isLIElement = function(node) {
    return node.tagName === "LI";
  };
  var isOLElement = function(node) {
    return node.tagName === "OL";
  };
  var isInputElement = function(node) {
    return node.tagName === "INPUT";
  };
  var isSVGElement = function(node) {
    return node.tagName === "svg";
  };
  var isBodyElement = function(node) {
    return node.tagName === "BODY";
  };
  var isCanvasElement = function(node) {
    return node.tagName === "CANVAS";
  };
  var isImageElement = function(node) {
    return node.tagName === "IMG";
  };
  var isIFrameElement = function(node) {
    return node.tagName === "IFRAME";
  };
  var isTextareaElement = function(node) {
    return node.tagName === "TEXTAREA";
  };
  var isSelectElement = function(node) {
    return node.tagName === "SELECT";
  };
  var isSlotElement = function(node) {
    return node.tagName === "SLOT";
  };
  var ROMAN_UPPER = {
    integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
    values: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
  };
  var ARMENIAN = {
    integers: [
      9e3,
      8e3,
      7e3,
      6e3,
      5e3,
      4e3,
      3e3,
      2e3,
      1e3,
      900,
      800,
      700,
      600,
      500,
      400,
      300,
      200,
      100,
      90,
      80,
      70,
      60,
      50,
      40,
      30,
      20,
      10,
      9,
      8,
      7,
      6,
      5,
      4,
      3,
      2,
      1
    ],
    values: [
      "Ք",
      "Փ",
      "Ւ",
      "Ց",
      "Ր",
      "Տ",
      "Վ",
      "Ս",
      "Ռ",
      "Ջ",
      "Պ",
      "Չ",
      "Ո",
      "Շ",
      "Ն",
      "Յ",
      "Մ",
      "Ճ",
      "Ղ",
      "Ձ",
      "Հ",
      "Կ",
      "Ծ",
      "Խ",
      "Լ",
      "Ի",
      "Ժ",
      "Թ",
      "Ը",
      "Է",
      "Զ",
      "Ե",
      "Դ",
      "Գ",
      "Բ",
      "Ա"
    ]
  };
  var HEBREW = {
    integers: [
      1e4,
      9e3,
      8e3,
      7e3,
      6e3,
      5e3,
      4e3,
      3e3,
      2e3,
      1e3,
      400,
      300,
      200,
      100,
      90,
      80,
      70,
      60,
      50,
      40,
      30,
      20,
      19,
      18,
      17,
      16,
      15,
      10,
      9,
      8,
      7,
      6,
      5,
      4,
      3,
      2,
      1
    ],
    values: [
      "י׳",
      "ט׳",
      "ח׳",
      "ז׳",
      "ו׳",
      "ה׳",
      "ד׳",
      "ג׳",
      "ב׳",
      "א׳",
      "ת",
      "ש",
      "ר",
      "ק",
      "צ",
      "פ",
      "ע",
      "ס",
      "נ",
      "מ",
      "ל",
      "כ",
      "יט",
      "יח",
      "יז",
      "טז",
      "טו",
      "י",
      "ט",
      "ח",
      "ז",
      "ו",
      "ה",
      "ד",
      "ג",
      "ב",
      "א"
    ]
  };
  var GEORGIAN = {
    integers: [
      1e4,
      9e3,
      8e3,
      7e3,
      6e3,
      5e3,
      4e3,
      3e3,
      2e3,
      1e3,
      900,
      800,
      700,
      600,
      500,
      400,
      300,
      200,
      100,
      90,
      80,
      70,
      60,
      50,
      40,
      30,
      20,
      10,
      9,
      8,
      7,
      6,
      5,
      4,
      3,
      2,
      1
    ],
    values: [
      "ჵ",
      "ჰ",
      "ჯ",
      "ჴ",
      "ხ",
      "ჭ",
      "წ",
      "ძ",
      "ც",
      "ჩ",
      "შ",
      "ყ",
      "ღ",
      "ქ",
      "ფ",
      "ჳ",
      "ტ",
      "ს",
      "რ",
      "ჟ",
      "პ",
      "ო",
      "ჲ",
      "ნ",
      "მ",
      "ლ",
      "კ",
      "ი",
      "თ",
      "ჱ",
      "ზ",
      "ვ",
      "ე",
      "დ",
      "გ",
      "ბ",
      "ა"
    ]
  };
  var createAdditiveCounter = function(value, min, max, symbols, fallback, suffix) {
    if (value < min || value > max) {
      return createCounterText(value, fallback, suffix.length > 0);
    }
    return symbols.integers.reduce(function(string2, integer, index2) {
      while (value >= integer) {
        value -= integer;
        string2 += symbols.values[index2];
      }
      return string2;
    }, "") + suffix;
  };
  var createCounterStyleWithSymbolResolver = function(value, codePointRangeLength, isNumeric, resolver) {
    var string2 = "";
    do {
      if (!isNumeric) {
        value--;
      }
      string2 = resolver(value) + string2;
      value /= codePointRangeLength;
    } while (value * codePointRangeLength >= codePointRangeLength);
    return string2;
  };
  var createCounterStyleFromRange = function(value, codePointRangeStart, codePointRangeEnd, isNumeric, suffix) {
    var codePointRangeLength = codePointRangeEnd - codePointRangeStart + 1;
    return (value < 0 ? "-" : "") + (createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, isNumeric, function(codePoint) {
      return fromCodePoint$1(Math.floor(codePoint % codePointRangeLength) + codePointRangeStart);
    }) + suffix);
  };
  var createCounterStyleFromSymbols = function(value, symbols, suffix) {
    if (suffix === void 0) {
      suffix = ". ";
    }
    var codePointRangeLength = symbols.length;
    return createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, false, function(codePoint) {
      return symbols[Math.floor(codePoint % codePointRangeLength)];
    }) + suffix;
  };
  var CJK_ZEROS = 1 << 0;
  var CJK_TEN_COEFFICIENTS = 1 << 1;
  var CJK_TEN_HIGH_COEFFICIENTS = 1 << 2;
  var CJK_HUNDRED_COEFFICIENTS = 1 << 3;
  var createCJKCounter = function(value, numbers, multipliers, negativeSign, suffix, flags) {
    if (value < -9999 || value > 9999) {
      return createCounterText(value, 4, suffix.length > 0);
    }
    var tmp = Math.abs(value);
    var string2 = suffix;
    if (tmp === 0) {
      return numbers[0] + string2;
    }
    for (var digit = 0; tmp > 0 && digit <= 4; digit++) {
      var coefficient = tmp % 10;
      if (coefficient === 0 && contains(flags, CJK_ZEROS) && string2 !== "") {
        string2 = numbers[coefficient] + string2;
      } else if (coefficient > 1 || coefficient === 1 && digit === 0 || coefficient === 1 && digit === 1 && contains(flags, CJK_TEN_COEFFICIENTS) || coefficient === 1 && digit === 1 && contains(flags, CJK_TEN_HIGH_COEFFICIENTS) && value > 100 || coefficient === 1 && digit > 1 && contains(flags, CJK_HUNDRED_COEFFICIENTS)) {
        string2 = numbers[coefficient] + (digit > 0 ? multipliers[digit - 1] : "") + string2;
      } else if (coefficient === 1 && digit > 0) {
        string2 = multipliers[digit - 1] + string2;
      }
      tmp = Math.floor(tmp / 10);
    }
    return (value < 0 ? negativeSign : "") + string2;
  };
  var CHINESE_INFORMAL_MULTIPLIERS = "十百千萬";
  var CHINESE_FORMAL_MULTIPLIERS = "拾佰仟萬";
  var JAPANESE_NEGATIVE = "マイナス";
  var KOREAN_NEGATIVE = "마이너스";
  var createCounterText = function(value, type, appendSuffix) {
    var defaultSuffix = appendSuffix ? ". " : "";
    var cjkSuffix = appendSuffix ? "、" : "";
    var koreanSuffix = appendSuffix ? ", " : "";
    var spaceSuffix = appendSuffix ? " " : "";
    switch (type) {
      case 0:
        return "•" + spaceSuffix;
      case 1:
        return "◦" + spaceSuffix;
      case 2:
        return "◾" + spaceSuffix;
      case 5:
        var string2 = createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
        return string2.length < 4 ? "0" + string2 : string2;
      case 4:
        return createCounterStyleFromSymbols(value, "〇一二三四五六七八九", cjkSuffix);
      case 6:
        return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, 3, defaultSuffix).toLowerCase();
      case 7:
        return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, 3, defaultSuffix);
      case 8:
        return createCounterStyleFromRange(value, 945, 969, false, defaultSuffix);
      case 9:
        return createCounterStyleFromRange(value, 97, 122, false, defaultSuffix);
      case 10:
        return createCounterStyleFromRange(value, 65, 90, false, defaultSuffix);
      case 11:
        return createCounterStyleFromRange(value, 1632, 1641, true, defaultSuffix);
      case 12:
      case 49:
        return createAdditiveCounter(value, 1, 9999, ARMENIAN, 3, defaultSuffix);
      case 35:
        return createAdditiveCounter(value, 1, 9999, ARMENIAN, 3, defaultSuffix).toLowerCase();
      case 13:
        return createCounterStyleFromRange(value, 2534, 2543, true, defaultSuffix);
      case 14:
      case 30:
        return createCounterStyleFromRange(value, 6112, 6121, true, defaultSuffix);
      case 15:
        return createCounterStyleFromSymbols(value, "子丑寅卯辰巳午未申酉戌亥", cjkSuffix);
      case 16:
        return createCounterStyleFromSymbols(value, "甲乙丙丁戊己庚辛壬癸", cjkSuffix);
      case 17:
      case 48:
        return createCJKCounter(value, "零一二三四五六七八九", CHINESE_INFORMAL_MULTIPLIERS, "負", cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
      case 47:
        return createCJKCounter(value, "零壹貳參肆伍陸柒捌玖", CHINESE_FORMAL_MULTIPLIERS, "負", cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
      case 42:
        return createCJKCounter(value, "零一二三四五六七八九", CHINESE_INFORMAL_MULTIPLIERS, "负", cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
      case 41:
        return createCJKCounter(value, "零壹贰叁肆伍陆柒捌玖", CHINESE_FORMAL_MULTIPLIERS, "负", cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
      case 26:
        return createCJKCounter(value, "〇一二三四五六七八九", "十百千万", JAPANESE_NEGATIVE, cjkSuffix, 0);
      case 25:
        return createCJKCounter(value, "零壱弐参四伍六七八九", "拾百千万", JAPANESE_NEGATIVE, cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
      case 31:
        return createCJKCounter(value, "영일이삼사오육칠팔구", "십백천만", KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
      case 33:
        return createCJKCounter(value, "零一二三四五六七八九", "十百千萬", KOREAN_NEGATIVE, koreanSuffix, 0);
      case 32:
        return createCJKCounter(value, "零壹貳參四五六七八九", "拾百千", KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
      case 18:
        return createCounterStyleFromRange(value, 2406, 2415, true, defaultSuffix);
      case 20:
        return createAdditiveCounter(value, 1, 19999, GEORGIAN, 3, defaultSuffix);
      case 21:
        return createCounterStyleFromRange(value, 2790, 2799, true, defaultSuffix);
      case 22:
        return createCounterStyleFromRange(value, 2662, 2671, true, defaultSuffix);
      case 22:
        return createAdditiveCounter(value, 1, 10999, HEBREW, 3, defaultSuffix);
      case 23:
        return createCounterStyleFromSymbols(value, "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");
      case 24:
        return createCounterStyleFromSymbols(value, "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");
      case 27:
        return createCounterStyleFromRange(value, 3302, 3311, true, defaultSuffix);
      case 28:
        return createCounterStyleFromSymbols(value, "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン", cjkSuffix);
      case 29:
        return createCounterStyleFromSymbols(value, "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス", cjkSuffix);
      case 34:
        return createCounterStyleFromRange(value, 3792, 3801, true, defaultSuffix);
      case 37:
        return createCounterStyleFromRange(value, 6160, 6169, true, defaultSuffix);
      case 38:
        return createCounterStyleFromRange(value, 4160, 4169, true, defaultSuffix);
      case 39:
        return createCounterStyleFromRange(value, 2918, 2927, true, defaultSuffix);
      case 40:
        return createCounterStyleFromRange(value, 1776, 1785, true, defaultSuffix);
      case 43:
        return createCounterStyleFromRange(value, 3046, 3055, true, defaultSuffix);
      case 44:
        return createCounterStyleFromRange(value, 3174, 3183, true, defaultSuffix);
      case 45:
        return createCounterStyleFromRange(value, 3664, 3673, true, defaultSuffix);
      case 46:
        return createCounterStyleFromRange(value, 3872, 3881, true, defaultSuffix);
      case 3:
      default:
        return createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
    }
  };
  var PseudoElementType;
  (function(PseudoElementType2) {
    PseudoElementType2[PseudoElementType2["BEFORE"] = 0] = "BEFORE";
    PseudoElementType2[PseudoElementType2["AFTER"] = 1] = "AFTER";
  })(PseudoElementType || (PseudoElementType = {}));
  var CacheStorage = (
    /** @class */
    function() {
      function CacheStorage2() {
      }
      CacheStorage2.getOrigin = function(url2) {
        var link = CacheStorage2._link;
        if (!link) {
          return "about:blank";
        }
        link.href = url2;
        link.href = link.href;
        return link.protocol + link.hostname + link.port;
      };
      CacheStorage2.isSameOrigin = function(src) {
        return CacheStorage2.getOrigin(src) === CacheStorage2._origin;
      };
      CacheStorage2.setContext = function(window2) {
        CacheStorage2._link = window2.document.createElement("a");
        CacheStorage2._origin = CacheStorage2.getOrigin(window2.location.href);
      };
      CacheStorage2._origin = "about:blank";
      return CacheStorage2;
    }()
  );
  var Vector = (
    /** @class */
    function() {
      function Vector2(x, y) {
        this.type = 0;
        this.x = x;
        this.y = y;
      }
      Vector2.prototype.add = function(deltaX, deltaY) {
        return new Vector2(this.x + deltaX, this.y + deltaY);
      };
      return Vector2;
    }()
  );
  var lerp = function(a2, b, t) {
    return new Vector(a2.x + (b.x - a2.x) * t, a2.y + (b.y - a2.y) * t);
  };
  var BezierCurve = (
    /** @class */
    function() {
      function BezierCurve2(start, startControl, endControl, end) {
        this.type = 1;
        this.start = start;
        this.startControl = startControl;
        this.endControl = endControl;
        this.end = end;
      }
      BezierCurve2.prototype.subdivide = function(t, firstHalf) {
        var ab = lerp(this.start, this.startControl, t);
        var bc = lerp(this.startControl, this.endControl, t);
        var cd = lerp(this.endControl, this.end, t);
        var abbc = lerp(ab, bc, t);
        var bccd = lerp(bc, cd, t);
        var dest = lerp(abbc, bccd, t);
        return firstHalf ? new BezierCurve2(this.start, ab, abbc, dest) : new BezierCurve2(dest, bccd, cd, this.end);
      };
      BezierCurve2.prototype.add = function(deltaX, deltaY) {
        return new BezierCurve2(this.start.add(deltaX, deltaY), this.startControl.add(deltaX, deltaY), this.endControl.add(deltaX, deltaY), this.end.add(deltaX, deltaY));
      };
      BezierCurve2.prototype.reverse = function() {
        return new BezierCurve2(this.end, this.endControl, this.startControl, this.start);
      };
      return BezierCurve2;
    }()
  );
  var isBezierCurve = function(path) {
    return path.type === 1;
  };
  var BoundCurves = (
    /** @class */
    /* @__PURE__ */ function() {
      function BoundCurves2(element) {
        var styles = element.styles;
        var bounds = element.bounds;
        var _a = getAbsoluteValueForTuple(styles.borderTopLeftRadius, bounds.width, bounds.height), tlh = _a[0], tlv = _a[1];
        var _b = getAbsoluteValueForTuple(styles.borderTopRightRadius, bounds.width, bounds.height), trh = _b[0], trv = _b[1];
        var _c = getAbsoluteValueForTuple(styles.borderBottomRightRadius, bounds.width, bounds.height), brh = _c[0], brv = _c[1];
        var _d = getAbsoluteValueForTuple(styles.borderBottomLeftRadius, bounds.width, bounds.height), blh = _d[0], blv = _d[1];
        var factors = [];
        factors.push((tlh + trh) / bounds.width);
        factors.push((blh + brh) / bounds.width);
        factors.push((tlv + blv) / bounds.height);
        factors.push((trv + brv) / bounds.height);
        var maxFactor = Math.max.apply(Math, factors);
        if (maxFactor > 1) {
          tlh /= maxFactor;
          tlv /= maxFactor;
          trh /= maxFactor;
          trv /= maxFactor;
          brh /= maxFactor;
          brv /= maxFactor;
          blh /= maxFactor;
          blv /= maxFactor;
        }
        var topWidth = bounds.width - trh;
        var rightHeight = bounds.height - brv;
        var bottomWidth = bounds.width - brh;
        var leftHeight = bounds.height - blv;
        var borderTopWidth2 = styles.borderTopWidth;
        var borderRightWidth2 = styles.borderRightWidth;
        var borderBottomWidth2 = styles.borderBottomWidth;
        var borderLeftWidth2 = styles.borderLeftWidth;
        var paddingTop2 = getAbsoluteValue(styles.paddingTop, element.bounds.width);
        var paddingRight2 = getAbsoluteValue(styles.paddingRight, element.bounds.width);
        var paddingBottom2 = getAbsoluteValue(styles.paddingBottom, element.bounds.width);
        var paddingLeft2 = getAbsoluteValue(styles.paddingLeft, element.bounds.width);
        this.topLeftBorderDoubleOuterBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 / 3, bounds.top + borderTopWidth2 / 3, tlh - borderLeftWidth2 / 3, tlv - borderTopWidth2 / 3, CORNER.TOP_LEFT) : new Vector(bounds.left + borderLeftWidth2 / 3, bounds.top + borderTopWidth2 / 3);
        this.topRightBorderDoubleOuterBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + topWidth, bounds.top + borderTopWidth2 / 3, trh - borderRightWidth2 / 3, trv - borderTopWidth2 / 3, CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 / 3, bounds.top + borderTopWidth2 / 3);
        this.bottomRightBorderDoubleOuterBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - borderRightWidth2 / 3, brv - borderBottomWidth2 / 3, CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 / 3, bounds.top + bounds.height - borderBottomWidth2 / 3);
        this.bottomLeftBorderDoubleOuterBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 / 3, bounds.top + leftHeight, blh - borderLeftWidth2 / 3, blv - borderBottomWidth2 / 3, CORNER.BOTTOM_LEFT) : new Vector(bounds.left + borderLeftWidth2 / 3, bounds.top + bounds.height - borderBottomWidth2 / 3);
        this.topLeftBorderDoubleInnerBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 * 2 / 3, bounds.top + borderTopWidth2 * 2 / 3, tlh - borderLeftWidth2 * 2 / 3, tlv - borderTopWidth2 * 2 / 3, CORNER.TOP_LEFT) : new Vector(bounds.left + borderLeftWidth2 * 2 / 3, bounds.top + borderTopWidth2 * 2 / 3);
        this.topRightBorderDoubleInnerBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + topWidth, bounds.top + borderTopWidth2 * 2 / 3, trh - borderRightWidth2 * 2 / 3, trv - borderTopWidth2 * 2 / 3, CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 * 2 / 3, bounds.top + borderTopWidth2 * 2 / 3);
        this.bottomRightBorderDoubleInnerBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - borderRightWidth2 * 2 / 3, brv - borderBottomWidth2 * 2 / 3, CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 * 2 / 3, bounds.top + bounds.height - borderBottomWidth2 * 2 / 3);
        this.bottomLeftBorderDoubleInnerBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 * 2 / 3, bounds.top + leftHeight, blh - borderLeftWidth2 * 2 / 3, blv - borderBottomWidth2 * 2 / 3, CORNER.BOTTOM_LEFT) : new Vector(bounds.left + borderLeftWidth2 * 2 / 3, bounds.top + bounds.height - borderBottomWidth2 * 2 / 3);
        this.topLeftBorderStroke = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 / 2, bounds.top + borderTopWidth2 / 2, tlh - borderLeftWidth2 / 2, tlv - borderTopWidth2 / 2, CORNER.TOP_LEFT) : new Vector(bounds.left + borderLeftWidth2 / 2, bounds.top + borderTopWidth2 / 2);
        this.topRightBorderStroke = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + topWidth, bounds.top + borderTopWidth2 / 2, trh - borderRightWidth2 / 2, trv - borderTopWidth2 / 2, CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 / 2, bounds.top + borderTopWidth2 / 2);
        this.bottomRightBorderStroke = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - borderRightWidth2 / 2, brv - borderBottomWidth2 / 2, CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 / 2, bounds.top + bounds.height - borderBottomWidth2 / 2);
        this.bottomLeftBorderStroke = blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 / 2, bounds.top + leftHeight, blh - borderLeftWidth2 / 2, blv - borderBottomWidth2 / 2, CORNER.BOTTOM_LEFT) : new Vector(bounds.left + borderLeftWidth2 / 2, bounds.top + bounds.height - borderBottomWidth2 / 2);
        this.topLeftBorderBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left, bounds.top, tlh, tlv, CORNER.TOP_LEFT) : new Vector(bounds.left, bounds.top);
        this.topRightBorderBox = trh > 0 || trv > 0 ? getCurvePoints(bounds.left + topWidth, bounds.top, trh, trv, CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width, bounds.top);
        this.bottomRightBorderBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh, brv, CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width, bounds.top + bounds.height);
        this.bottomLeftBorderBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left, bounds.top + leftHeight, blh, blv, CORNER.BOTTOM_LEFT) : new Vector(bounds.left, bounds.top + bounds.height);
        this.topLeftPaddingBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2, bounds.top + borderTopWidth2, Math.max(0, tlh - borderLeftWidth2), Math.max(0, tlv - borderTopWidth2), CORNER.TOP_LEFT) : new Vector(bounds.left + borderLeftWidth2, bounds.top + borderTopWidth2);
        this.topRightPaddingBox = trh > 0 || trv > 0 ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width - borderRightWidth2), bounds.top + borderTopWidth2, topWidth > bounds.width + borderRightWidth2 ? 0 : Math.max(0, trh - borderRightWidth2), Math.max(0, trv - borderTopWidth2), CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2, bounds.top + borderTopWidth2);
        this.bottomRightPaddingBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - borderLeftWidth2), bounds.top + Math.min(rightHeight, bounds.height - borderBottomWidth2), Math.max(0, brh - borderRightWidth2), Math.max(0, brv - borderBottomWidth2), CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2, bounds.top + bounds.height - borderBottomWidth2);
        this.bottomLeftPaddingBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2, bounds.top + Math.min(leftHeight, bounds.height - borderBottomWidth2), Math.max(0, blh - borderLeftWidth2), Math.max(0, blv - borderBottomWidth2), CORNER.BOTTOM_LEFT) : new Vector(bounds.left + borderLeftWidth2, bounds.top + bounds.height - borderBottomWidth2);
        this.topLeftContentBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 + paddingLeft2, bounds.top + borderTopWidth2 + paddingTop2, Math.max(0, tlh - (borderLeftWidth2 + paddingLeft2)), Math.max(0, tlv - (borderTopWidth2 + paddingTop2)), CORNER.TOP_LEFT) : new Vector(bounds.left + borderLeftWidth2 + paddingLeft2, bounds.top + borderTopWidth2 + paddingTop2);
        this.topRightContentBox = trh > 0 || trv > 0 ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width + borderLeftWidth2 + paddingLeft2), bounds.top + borderTopWidth2 + paddingTop2, topWidth > bounds.width + borderLeftWidth2 + paddingLeft2 ? 0 : trh - borderLeftWidth2 + paddingLeft2, trv - (borderTopWidth2 + paddingTop2), CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width - (borderRightWidth2 + paddingRight2), bounds.top + borderTopWidth2 + paddingTop2);
        this.bottomRightContentBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - (borderLeftWidth2 + paddingLeft2)), bounds.top + Math.min(rightHeight, bounds.height + borderTopWidth2 + paddingTop2), Math.max(0, brh - (borderRightWidth2 + paddingRight2)), brv - (borderBottomWidth2 + paddingBottom2), CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width - (borderRightWidth2 + paddingRight2), bounds.top + bounds.height - (borderBottomWidth2 + paddingBottom2));
        this.bottomLeftContentBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 + paddingLeft2, bounds.top + leftHeight, Math.max(0, blh - (borderLeftWidth2 + paddingLeft2)), blv - (borderBottomWidth2 + paddingBottom2), CORNER.BOTTOM_LEFT) : new Vector(bounds.left + borderLeftWidth2 + paddingLeft2, bounds.top + bounds.height - (borderBottomWidth2 + paddingBottom2));
      }
      return BoundCurves2;
    }()
  );
  var CORNER;
  (function(CORNER2) {
    CORNER2[CORNER2["TOP_LEFT"] = 0] = "TOP_LEFT";
    CORNER2[CORNER2["TOP_RIGHT"] = 1] = "TOP_RIGHT";
    CORNER2[CORNER2["BOTTOM_RIGHT"] = 2] = "BOTTOM_RIGHT";
    CORNER2[CORNER2["BOTTOM_LEFT"] = 3] = "BOTTOM_LEFT";
  })(CORNER || (CORNER = {}));
  var getCurvePoints = function(x, y, r1, r2, position2) {
    var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
    var ox = r1 * kappa;
    var oy = r2 * kappa;
    var xm = x + r1;
    var ym = y + r2;
    switch (position2) {
      case CORNER.TOP_LEFT:
        return new BezierCurve(new Vector(x, ym), new Vector(x, ym - oy), new Vector(xm - ox, y), new Vector(xm, y));
      case CORNER.TOP_RIGHT:
        return new BezierCurve(new Vector(x, y), new Vector(x + ox, y), new Vector(xm, ym - oy), new Vector(xm, ym));
      case CORNER.BOTTOM_RIGHT:
        return new BezierCurve(new Vector(xm, y), new Vector(xm, y + oy), new Vector(x + ox, ym), new Vector(x, ym));
      case CORNER.BOTTOM_LEFT:
      default:
        return new BezierCurve(new Vector(xm, ym), new Vector(xm - ox, ym), new Vector(x, y + oy), new Vector(x, y));
    }
  };
  var calculateBorderBoxPath = function(curves) {
    return [curves.topLeftBorderBox, curves.topRightBorderBox, curves.bottomRightBorderBox, curves.bottomLeftBorderBox];
  };
  var calculateContentBoxPath = function(curves) {
    return [
      curves.topLeftContentBox,
      curves.topRightContentBox,
      curves.bottomRightContentBox,
      curves.bottomLeftContentBox
    ];
  };
  var calculatePaddingBoxPath = function(curves) {
    return [
      curves.topLeftPaddingBox,
      curves.topRightPaddingBox,
      curves.bottomRightPaddingBox,
      curves.bottomLeftPaddingBox
    ];
  };
  var TransformEffect = (
    /** @class */
    /* @__PURE__ */ function() {
      function TransformEffect2(offsetX, offsetY, matrix2) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.matrix = matrix2;
        this.type = 0;
        this.target = 2 | 4;
      }
      return TransformEffect2;
    }()
  );
  var ClipEffect = (
    /** @class */
    /* @__PURE__ */ function() {
      function ClipEffect2(path, target) {
        this.path = path;
        this.target = target;
        this.type = 1;
      }
      return ClipEffect2;
    }()
  );
  var OpacityEffect = (
    /** @class */
    /* @__PURE__ */ function() {
      function OpacityEffect2(opacity2) {
        this.opacity = opacity2;
        this.type = 2;
        this.target = 2 | 4;
      }
      return OpacityEffect2;
    }()
  );
  var isTransformEffect = function(effect) {
    return effect.type === 0;
  };
  var isClipEffect = function(effect) {
    return effect.type === 1;
  };
  var isOpacityEffect = function(effect) {
    return effect.type === 2;
  };
  var equalPath = function(a2, b) {
    if (a2.length === b.length) {
      return a2.some(function(v, i2) {
        return v === b[i2];
      });
    }
    return false;
  };
  var transformPath = function(path, deltaX, deltaY, deltaW, deltaH) {
    return path.map(function(point, index2) {
      switch (index2) {
        case 0:
          return point.add(deltaX, deltaY);
        case 1:
          return point.add(deltaX + deltaW, deltaY);
        case 2:
          return point.add(deltaX + deltaW, deltaY + deltaH);
        case 3:
          return point.add(deltaX, deltaY + deltaH);
      }
      return point;
    });
  };
  var StackingContext = (
    /** @class */
    /* @__PURE__ */ function() {
      function StackingContext2(container) {
        this.element = container;
        this.inlineLevel = [];
        this.nonInlineLevel = [];
        this.negativeZIndex = [];
        this.zeroOrAutoZIndexOrTransformedOrOpacity = [];
        this.positiveZIndex = [];
        this.nonPositionedFloats = [];
        this.nonPositionedInlineLevel = [];
      }
      return StackingContext2;
    }()
  );
  var ElementPaint = (
    /** @class */
    function() {
      function ElementPaint2(container, parent) {
        this.container = container;
        this.parent = parent;
        this.effects = [];
        this.curves = new BoundCurves(this.container);
        if (this.container.styles.opacity < 1) {
          this.effects.push(new OpacityEffect(this.container.styles.opacity));
        }
        if (this.container.styles.transform !== null) {
          var offsetX = this.container.bounds.left + this.container.styles.transformOrigin[0].number;
          var offsetY = this.container.bounds.top + this.container.styles.transformOrigin[1].number;
          var matrix2 = this.container.styles.transform;
          this.effects.push(new TransformEffect(offsetX, offsetY, matrix2));
        }
        if (this.container.styles.overflowX !== 0) {
          var borderBox = calculateBorderBoxPath(this.curves);
          var paddingBox2 = calculatePaddingBoxPath(this.curves);
          if (equalPath(borderBox, paddingBox2)) {
            this.effects.push(new ClipEffect(
              borderBox,
              2 | 4
              /* CONTENT */
            ));
          } else {
            this.effects.push(new ClipEffect(
              borderBox,
              2
              /* BACKGROUND_BORDERS */
            ));
            this.effects.push(new ClipEffect(
              paddingBox2,
              4
              /* CONTENT */
            ));
          }
        }
      }
      ElementPaint2.prototype.getEffects = function(target) {
        var inFlow = [
          2,
          3
          /* FIXED */
        ].indexOf(this.container.styles.position) === -1;
        var parent = this.parent;
        var effects = this.effects.slice(0);
        while (parent) {
          var croplessEffects = parent.effects.filter(function(effect) {
            return !isClipEffect(effect);
          });
          if (inFlow || parent.container.styles.position !== 0 || !parent.parent) {
            effects.unshift.apply(effects, croplessEffects);
            inFlow = [
              2,
              3
              /* FIXED */
            ].indexOf(parent.container.styles.position) === -1;
            if (parent.container.styles.overflowX !== 0) {
              var borderBox = calculateBorderBoxPath(parent.curves);
              var paddingBox2 = calculatePaddingBoxPath(parent.curves);
              if (!equalPath(borderBox, paddingBox2)) {
                effects.unshift(new ClipEffect(
                  paddingBox2,
                  2 | 4
                  /* CONTENT */
                ));
              }
            }
          } else {
            effects.unshift.apply(effects, croplessEffects);
          }
          parent = parent.parent;
        }
        return effects.filter(function(effect) {
          return contains(effect.target, target);
        });
      };
      return ElementPaint2;
    }()
  );
  var parseStackTree = function(parent, stackingContext, realStackingContext, listItems) {
    parent.container.elements.forEach(function(child) {
      var treatAsRealStackingContext = contains(
        child.flags,
        4
        /* CREATES_REAL_STACKING_CONTEXT */
      );
      var createsStackingContext2 = contains(
        child.flags,
        2
        /* CREATES_STACKING_CONTEXT */
      );
      var paintContainer = new ElementPaint(child, parent);
      if (contains(
        child.styles.display,
        2048
        /* LIST_ITEM */
      )) {
        listItems.push(paintContainer);
      }
      var listOwnerItems = contains(
        child.flags,
        8
        /* IS_LIST_OWNER */
      ) ? [] : listItems;
      if (treatAsRealStackingContext || createsStackingContext2) {
        var parentStack = treatAsRealStackingContext || child.styles.isPositioned() ? realStackingContext : stackingContext;
        var stack = new StackingContext(paintContainer);
        if (child.styles.isPositioned() || child.styles.opacity < 1 || child.styles.isTransformed()) {
          var order_1 = child.styles.zIndex.order;
          if (order_1 < 0) {
            var index_1 = 0;
            parentStack.negativeZIndex.some(function(current, i2) {
              if (order_1 > current.element.container.styles.zIndex.order) {
                index_1 = i2;
                return false;
              } else if (index_1 > 0) {
                return true;
              }
              return false;
            });
            parentStack.negativeZIndex.splice(index_1, 0, stack);
          } else if (order_1 > 0) {
            var index_2 = 0;
            parentStack.positiveZIndex.some(function(current, i2) {
              if (order_1 >= current.element.container.styles.zIndex.order) {
                index_2 = i2 + 1;
                return false;
              } else if (index_2 > 0) {
                return true;
              }
              return false;
            });
            parentStack.positiveZIndex.splice(index_2, 0, stack);
          } else {
            parentStack.zeroOrAutoZIndexOrTransformedOrOpacity.push(stack);
          }
        } else {
          if (child.styles.isFloating()) {
            parentStack.nonPositionedFloats.push(stack);
          } else {
            parentStack.nonPositionedInlineLevel.push(stack);
          }
        }
        parseStackTree(paintContainer, stack, treatAsRealStackingContext ? stack : realStackingContext, listOwnerItems);
      } else {
        if (child.styles.isInlineLevel()) {
          stackingContext.inlineLevel.push(paintContainer);
        } else {
          stackingContext.nonInlineLevel.push(paintContainer);
        }
        parseStackTree(paintContainer, stackingContext, realStackingContext, listOwnerItems);
      }
      if (contains(
        child.flags,
        8
        /* IS_LIST_OWNER */
      )) {
        processListItems(child, listOwnerItems);
      }
    });
  };
  var processListItems = function(owner, elements) {
    var numbering = owner instanceof OLElementContainer ? owner.start : 1;
    var reversed = owner instanceof OLElementContainer ? owner.reversed : false;
    for (var i2 = 0; i2 < elements.length; i2++) {
      var item = elements[i2];
      if (item.container instanceof LIElementContainer && typeof item.container.value === "number" && item.container.value !== 0) {
        numbering = item.container.value;
      }
      item.listValue = createCounterText(numbering, item.container.styles.listStyleType, true);
      numbering += reversed ? -1 : 1;
    }
  };
  var parseStackingContexts = function(container) {
    var paintContainer = new ElementPaint(container, null);
    var root = new StackingContext(paintContainer);
    var listItems = [];
    parseStackTree(paintContainer, root, root, listItems);
    processListItems(paintContainer.container, listItems);
    return root;
  };
  var parsePathForBorder = function(curves, borderSide) {
    switch (borderSide) {
      case 0:
        return createPathFromCurves(curves.topLeftBorderBox, curves.topLeftPaddingBox, curves.topRightBorderBox, curves.topRightPaddingBox);
      case 1:
        return createPathFromCurves(curves.topRightBorderBox, curves.topRightPaddingBox, curves.bottomRightBorderBox, curves.bottomRightPaddingBox);
      case 2:
        return createPathFromCurves(curves.bottomRightBorderBox, curves.bottomRightPaddingBox, curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox);
      case 3:
      default:
        return createPathFromCurves(curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox, curves.topLeftBorderBox, curves.topLeftPaddingBox);
    }
  };
  var parsePathForBorderDoubleOuter = function(curves, borderSide) {
    switch (borderSide) {
      case 0:
        return createPathFromCurves(curves.topLeftBorderBox, curves.topLeftBorderDoubleOuterBox, curves.topRightBorderBox, curves.topRightBorderDoubleOuterBox);
      case 1:
        return createPathFromCurves(curves.topRightBorderBox, curves.topRightBorderDoubleOuterBox, curves.bottomRightBorderBox, curves.bottomRightBorderDoubleOuterBox);
      case 2:
        return createPathFromCurves(curves.bottomRightBorderBox, curves.bottomRightBorderDoubleOuterBox, curves.bottomLeftBorderBox, curves.bottomLeftBorderDoubleOuterBox);
      case 3:
      default:
        return createPathFromCurves(curves.bottomLeftBorderBox, curves.bottomLeftBorderDoubleOuterBox, curves.topLeftBorderBox, curves.topLeftBorderDoubleOuterBox);
    }
  };
  var parsePathForBorderDoubleInner = function(curves, borderSide) {
    switch (borderSide) {
      case 0:
        return createPathFromCurves(curves.topLeftBorderDoubleInnerBox, curves.topLeftPaddingBox, curves.topRightBorderDoubleInnerBox, curves.topRightPaddingBox);
      case 1:
        return createPathFromCurves(curves.topRightBorderDoubleInnerBox, curves.topRightPaddingBox, curves.bottomRightBorderDoubleInnerBox, curves.bottomRightPaddingBox);
      case 2:
        return createPathFromCurves(curves.bottomRightBorderDoubleInnerBox, curves.bottomRightPaddingBox, curves.bottomLeftBorderDoubleInnerBox, curves.bottomLeftPaddingBox);
      case 3:
      default:
        return createPathFromCurves(curves.bottomLeftBorderDoubleInnerBox, curves.bottomLeftPaddingBox, curves.topLeftBorderDoubleInnerBox, curves.topLeftPaddingBox);
    }
  };
  var parsePathForBorderStroke = function(curves, borderSide) {
    switch (borderSide) {
      case 0:
        return createStrokePathFromCurves(curves.topLeftBorderStroke, curves.topRightBorderStroke);
      case 1:
        return createStrokePathFromCurves(curves.topRightBorderStroke, curves.bottomRightBorderStroke);
      case 2:
        return createStrokePathFromCurves(curves.bottomRightBorderStroke, curves.bottomLeftBorderStroke);
      case 3:
      default:
        return createStrokePathFromCurves(curves.bottomLeftBorderStroke, curves.topLeftBorderStroke);
    }
  };
  var createStrokePathFromCurves = function(outer1, outer2) {
    var path = [];
    if (isBezierCurve(outer1)) {
      path.push(outer1.subdivide(0.5, false));
    } else {
      path.push(outer1);
    }
    if (isBezierCurve(outer2)) {
      path.push(outer2.subdivide(0.5, true));
    } else {
      path.push(outer2);
    }
    return path;
  };
  var createPathFromCurves = function(outer1, inner1, outer2, inner2) {
    var path = [];
    if (isBezierCurve(outer1)) {
      path.push(outer1.subdivide(0.5, false));
    } else {
      path.push(outer1);
    }
    if (isBezierCurve(outer2)) {
      path.push(outer2.subdivide(0.5, true));
    } else {
      path.push(outer2);
    }
    if (isBezierCurve(inner2)) {
      path.push(inner2.subdivide(0.5, true).reverse());
    } else {
      path.push(inner2);
    }
    if (isBezierCurve(inner1)) {
      path.push(inner1.subdivide(0.5, false).reverse());
    } else {
      path.push(inner1);
    }
    return path;
  };
  var paddingBox = function(element) {
    var bounds = element.bounds;
    var styles = element.styles;
    return bounds.add(styles.borderLeftWidth, styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth), -(styles.borderTopWidth + styles.borderBottomWidth));
  };
  var contentBox = function(element) {
    var styles = element.styles;
    var bounds = element.bounds;
    var paddingLeft2 = getAbsoluteValue(styles.paddingLeft, bounds.width);
    var paddingRight2 = getAbsoluteValue(styles.paddingRight, bounds.width);
    var paddingTop2 = getAbsoluteValue(styles.paddingTop, bounds.width);
    var paddingBottom2 = getAbsoluteValue(styles.paddingBottom, bounds.width);
    return bounds.add(paddingLeft2 + styles.borderLeftWidth, paddingTop2 + styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth + paddingLeft2 + paddingRight2), -(styles.borderTopWidth + styles.borderBottomWidth + paddingTop2 + paddingBottom2));
  };
  var calculateBackgroundPositioningArea = function(backgroundOrigin2, element) {
    if (backgroundOrigin2 === 0) {
      return element.bounds;
    }
    if (backgroundOrigin2 === 2) {
      return contentBox(element);
    }
    return paddingBox(element);
  };
  var calculateBackgroundPaintingArea = function(backgroundClip2, element) {
    if (backgroundClip2 === 0) {
      return element.bounds;
    }
    if (backgroundClip2 === 2) {
      return contentBox(element);
    }
    return paddingBox(element);
  };
  var calculateBackgroundRendering = function(container, index2, intrinsicSize) {
    var backgroundPositioningArea = calculateBackgroundPositioningArea(getBackgroundValueForIndex(container.styles.backgroundOrigin, index2), container);
    var backgroundPaintingArea = calculateBackgroundPaintingArea(getBackgroundValueForIndex(container.styles.backgroundClip, index2), container);
    var backgroundImageSize = calculateBackgroundSize(getBackgroundValueForIndex(container.styles.backgroundSize, index2), intrinsicSize, backgroundPositioningArea);
    var sizeWidth = backgroundImageSize[0], sizeHeight = backgroundImageSize[1];
    var position2 = getAbsoluteValueForTuple(getBackgroundValueForIndex(container.styles.backgroundPosition, index2), backgroundPositioningArea.width - sizeWidth, backgroundPositioningArea.height - sizeHeight);
    var path = calculateBackgroundRepeatPath(getBackgroundValueForIndex(container.styles.backgroundRepeat, index2), position2, backgroundImageSize, backgroundPositioningArea, backgroundPaintingArea);
    var offsetX = Math.round(backgroundPositioningArea.left + position2[0]);
    var offsetY = Math.round(backgroundPositioningArea.top + position2[1]);
    return [path, offsetX, offsetY, sizeWidth, sizeHeight];
  };
  var isAuto = function(token) {
    return isIdentToken(token) && token.value === BACKGROUND_SIZE.AUTO;
  };
  var hasIntrinsicValue = function(value) {
    return typeof value === "number";
  };
  var calculateBackgroundSize = function(size, _a, bounds) {
    var intrinsicWidth = _a[0], intrinsicHeight = _a[1], intrinsicProportion = _a[2];
    var first = size[0], second = size[1];
    if (!first) {
      return [0, 0];
    }
    if (isLengthPercentage(first) && second && isLengthPercentage(second)) {
      return [getAbsoluteValue(first, bounds.width), getAbsoluteValue(second, bounds.height)];
    }
    var hasIntrinsicProportion = hasIntrinsicValue(intrinsicProportion);
    if (isIdentToken(first) && (first.value === BACKGROUND_SIZE.CONTAIN || first.value === BACKGROUND_SIZE.COVER)) {
      if (hasIntrinsicValue(intrinsicProportion)) {
        var targetRatio = bounds.width / bounds.height;
        return targetRatio < intrinsicProportion !== (first.value === BACKGROUND_SIZE.COVER) ? [bounds.width, bounds.width / intrinsicProportion] : [bounds.height * intrinsicProportion, bounds.height];
      }
      return [bounds.width, bounds.height];
    }
    var hasIntrinsicWidth = hasIntrinsicValue(intrinsicWidth);
    var hasIntrinsicHeight = hasIntrinsicValue(intrinsicHeight);
    var hasIntrinsicDimensions = hasIntrinsicWidth || hasIntrinsicHeight;
    if (isAuto(first) && (!second || isAuto(second))) {
      if (hasIntrinsicWidth && hasIntrinsicHeight) {
        return [intrinsicWidth, intrinsicHeight];
      }
      if (!hasIntrinsicProportion && !hasIntrinsicDimensions) {
        return [bounds.width, bounds.height];
      }
      if (hasIntrinsicDimensions && hasIntrinsicProportion) {
        var width_1 = hasIntrinsicWidth ? intrinsicWidth : intrinsicHeight * intrinsicProportion;
        var height_1 = hasIntrinsicHeight ? intrinsicHeight : intrinsicWidth / intrinsicProportion;
        return [width_1, height_1];
      }
      var width_2 = hasIntrinsicWidth ? intrinsicWidth : bounds.width;
      var height_2 = hasIntrinsicHeight ? intrinsicHeight : bounds.height;
      return [width_2, height_2];
    }
    if (hasIntrinsicProportion) {
      var width_3 = 0;
      var height_3 = 0;
      if (isLengthPercentage(first)) {
        width_3 = getAbsoluteValue(first, bounds.width);
      } else if (isLengthPercentage(second)) {
        height_3 = getAbsoluteValue(second, bounds.height);
      }
      if (isAuto(first)) {
        width_3 = height_3 * intrinsicProportion;
      } else if (!second || isAuto(second)) {
        height_3 = width_3 / intrinsicProportion;
      }
      return [width_3, height_3];
    }
    var width = null;
    var height = null;
    if (isLengthPercentage(first)) {
      width = getAbsoluteValue(first, bounds.width);
    } else if (second && isLengthPercentage(second)) {
      height = getAbsoluteValue(second, bounds.height);
    }
    if (width !== null && (!second || isAuto(second))) {
      height = hasIntrinsicWidth && hasIntrinsicHeight ? width / intrinsicWidth * intrinsicHeight : bounds.height;
    }
    if (height !== null && isAuto(first)) {
      width = hasIntrinsicWidth && hasIntrinsicHeight ? height / intrinsicHeight * intrinsicWidth : bounds.width;
    }
    if (width !== null && height !== null) {
      return [width, height];
    }
    throw new Error("Unable to calculate background-size for element");
  };
  var getBackgroundValueForIndex = function(values, index2) {
    var value = values[index2];
    if (typeof value === "undefined") {
      return values[0];
    }
    return value;
  };
  var calculateBackgroundRepeatPath = function(repeat, _a, _b, backgroundPositioningArea, backgroundPaintingArea) {
    var x = _a[0], y = _a[1];
    var width = _b[0], height = _b[1];
    switch (repeat) {
      case 2:
        return [
          new Vector(Math.round(backgroundPositioningArea.left), Math.round(backgroundPositioningArea.top + y)),
          new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(backgroundPositioningArea.top + y)),
          new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(height + backgroundPositioningArea.top + y)),
          new Vector(Math.round(backgroundPositioningArea.left), Math.round(height + backgroundPositioningArea.top + y))
        ];
      case 3:
        return [
          new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top)),
          new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top)),
          new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top)),
          new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top))
        ];
      case 1:
        return [
          new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y)),
          new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y)),
          new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y + height)),
          new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y + height))
        ];
      default:
        return [
          new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.top)),
          new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.top)),
          new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top)),
          new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top))
        ];
    }
  };
  var SMALL_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  var SAMPLE_TEXT = "Hidden Text";
  var FontMetrics = (
    /** @class */
    function() {
      function FontMetrics2(document2) {
        this._data = {};
        this._document = document2;
      }
      FontMetrics2.prototype.parseMetrics = function(fontFamily2, fontSize2) {
        var container = this._document.createElement("div");
        var img = this._document.createElement("img");
        var span = this._document.createElement("span");
        var body = this._document.body;
        container.style.visibility = "hidden";
        container.style.fontFamily = fontFamily2;
        container.style.fontSize = fontSize2;
        container.style.margin = "0";
        container.style.padding = "0";
        container.style.whiteSpace = "nowrap";
        body.appendChild(container);
        img.src = SMALL_IMAGE;
        img.width = 1;
        img.height = 1;
        img.style.margin = "0";
        img.style.padding = "0";
        img.style.verticalAlign = "baseline";
        span.style.fontFamily = fontFamily2;
        span.style.fontSize = fontSize2;
        span.style.margin = "0";
        span.style.padding = "0";
        span.appendChild(this._document.createTextNode(SAMPLE_TEXT));
        container.appendChild(span);
        container.appendChild(img);
        var baseline = img.offsetTop - span.offsetTop + 2;
        container.removeChild(span);
        container.appendChild(this._document.createTextNode(SAMPLE_TEXT));
        container.style.lineHeight = "normal";
        img.style.verticalAlign = "super";
        var middle = img.offsetTop - container.offsetTop + 2;
        body.removeChild(container);
        return { baseline, middle };
      };
      FontMetrics2.prototype.getMetrics = function(fontFamily2, fontSize2) {
        var key = fontFamily2 + " " + fontSize2;
        if (typeof this._data[key] === "undefined") {
          this._data[key] = this.parseMetrics(fontFamily2, fontSize2);
        }
        return this._data[key];
      };
      return FontMetrics2;
    }()
  );
  var Renderer = (
    /** @class */
    /* @__PURE__ */ function() {
      function Renderer2(context, options) {
        this.context = context;
        this.options = options;
      }
      return Renderer2;
    }()
  );
  var MASK_OFFSET = 1e4;
  (function(_super) {
    __extends(CanvasRenderer, _super);
    function CanvasRenderer(context, options) {
      var _this = _super.call(this, context, options) || this;
      _this._activeEffects = [];
      _this.canvas = options.canvas ? options.canvas : document.createElement("canvas");
      _this.ctx = _this.canvas.getContext("2d");
      if (!options.canvas) {
        _this.canvas.width = Math.floor(options.width * options.scale);
        _this.canvas.height = Math.floor(options.height * options.scale);
        _this.canvas.style.width = options.width + "px";
        _this.canvas.style.height = options.height + "px";
      }
      _this.fontMetrics = new FontMetrics(document);
      _this.ctx.scale(_this.options.scale, _this.options.scale);
      _this.ctx.translate(-options.x, -options.y);
      _this.ctx.textBaseline = "bottom";
      _this._activeEffects = [];
      _this.context.logger.debug("Canvas renderer initialized (" + options.width + "x" + options.height + ") with scale " + options.scale);
      return _this;
    }
    CanvasRenderer.prototype.applyEffects = function(effects) {
      var _this = this;
      while (this._activeEffects.length) {
        this.popEffect();
      }
      effects.forEach(function(effect) {
        return _this.applyEffect(effect);
      });
    };
    CanvasRenderer.prototype.applyEffect = function(effect) {
      this.ctx.save();
      if (isOpacityEffect(effect)) {
        this.ctx.globalAlpha = effect.opacity;
      }
      if (isTransformEffect(effect)) {
        this.ctx.translate(effect.offsetX, effect.offsetY);
        this.ctx.transform(effect.matrix[0], effect.matrix[1], effect.matrix[2], effect.matrix[3], effect.matrix[4], effect.matrix[5]);
        this.ctx.translate(-effect.offsetX, -effect.offsetY);
      }
      if (isClipEffect(effect)) {
        this.path(effect.path);
        this.ctx.clip();
      }
      this._activeEffects.push(effect);
    };
    CanvasRenderer.prototype.popEffect = function() {
      this._activeEffects.pop();
      this.ctx.restore();
    };
    CanvasRenderer.prototype.renderStack = function(stack) {
      return __awaiter(this, void 0, void 0, function() {
        var styles;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              styles = stack.element.container.styles;
              if (!styles.isVisible())
                return [3, 2];
              return [4, this.renderStackContent(stack)];
            case 1:
              _a.sent();
              _a.label = 2;
            case 2:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CanvasRenderer.prototype.renderNode = function(paint) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (contains(
                paint.container.flags,
                16
                /* DEBUG_RENDER */
              )) {
                debugger;
              }
              if (!paint.container.styles.isVisible())
                return [3, 3];
              return [4, this.renderNodeBackgroundAndBorders(paint)];
            case 1:
              _a.sent();
              return [4, this.renderNodeContent(paint)];
            case 2:
              _a.sent();
              _a.label = 3;
            case 3:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CanvasRenderer.prototype.renderTextWithLetterSpacing = function(text, letterSpacing2, baseline) {
      var _this = this;
      if (letterSpacing2 === 0) {
        this.ctx.fillText(text.text, text.bounds.left, text.bounds.top + baseline);
      } else {
        var letters = segmentGraphemes(text.text);
        letters.reduce(function(left, letter2) {
          _this.ctx.fillText(letter2, left, text.bounds.top + baseline);
          return left + _this.ctx.measureText(letter2).width;
        }, text.bounds.left);
      }
    };
    CanvasRenderer.prototype.createFontStyle = function(styles) {
      var fontVariant2 = styles.fontVariant.filter(function(variant) {
        return variant === "normal" || variant === "small-caps";
      }).join("");
      var fontFamily2 = fixIOSSystemFonts(styles.fontFamily).join(", ");
      var fontSize2 = isDimensionToken(styles.fontSize) ? "" + styles.fontSize.number + styles.fontSize.unit : styles.fontSize.number + "px";
      return [
        [styles.fontStyle, fontVariant2, styles.fontWeight, fontSize2, fontFamily2].join(" "),
        fontFamily2,
        fontSize2
      ];
    };
    CanvasRenderer.prototype.renderTextNode = function(text, styles) {
      return __awaiter(this, void 0, void 0, function() {
        var _a, font, fontFamily2, fontSize2, _b, baseline, middle, paintOrder2;
        var _this = this;
        return __generator(this, function(_c) {
          _a = this.createFontStyle(styles), font = _a[0], fontFamily2 = _a[1], fontSize2 = _a[2];
          this.ctx.font = font;
          this.ctx.direction = styles.direction === 1 ? "rtl" : "ltr";
          this.ctx.textAlign = "left";
          this.ctx.textBaseline = "alphabetic";
          _b = this.fontMetrics.getMetrics(fontFamily2, fontSize2), baseline = _b.baseline, middle = _b.middle;
          paintOrder2 = styles.paintOrder;
          text.textBounds.forEach(function(text2) {
            paintOrder2.forEach(function(paintOrderLayer) {
              switch (paintOrderLayer) {
                case 0:
                  _this.ctx.fillStyle = asString(styles.color);
                  _this.renderTextWithLetterSpacing(text2, styles.letterSpacing, baseline);
                  var textShadows = styles.textShadow;
                  if (textShadows.length && text2.text.trim().length) {
                    textShadows.slice(0).reverse().forEach(function(textShadow2) {
                      _this.ctx.shadowColor = asString(textShadow2.color);
                      _this.ctx.shadowOffsetX = textShadow2.offsetX.number * _this.options.scale;
                      _this.ctx.shadowOffsetY = textShadow2.offsetY.number * _this.options.scale;
                      _this.ctx.shadowBlur = textShadow2.blur.number;
                      _this.renderTextWithLetterSpacing(text2, styles.letterSpacing, baseline);
                    });
                    _this.ctx.shadowColor = "";
                    _this.ctx.shadowOffsetX = 0;
                    _this.ctx.shadowOffsetY = 0;
                    _this.ctx.shadowBlur = 0;
                  }
                  if (styles.textDecorationLine.length) {
                    _this.ctx.fillStyle = asString(styles.textDecorationColor || styles.color);
                    styles.textDecorationLine.forEach(function(textDecorationLine2) {
                      switch (textDecorationLine2) {
                        case 1:
                          _this.ctx.fillRect(text2.bounds.left, Math.round(text2.bounds.top + baseline), text2.bounds.width, 1);
                          break;
                        case 2:
                          _this.ctx.fillRect(text2.bounds.left, Math.round(text2.bounds.top), text2.bounds.width, 1);
                          break;
                        case 3:
                          _this.ctx.fillRect(text2.bounds.left, Math.ceil(text2.bounds.top + middle), text2.bounds.width, 1);
                          break;
                      }
                    });
                  }
                  break;
                case 1:
                  if (styles.webkitTextStrokeWidth && text2.text.trim().length) {
                    _this.ctx.strokeStyle = asString(styles.webkitTextStrokeColor);
                    _this.ctx.lineWidth = styles.webkitTextStrokeWidth;
                    _this.ctx.lineJoin = !!window.chrome ? "miter" : "round";
                    _this.ctx.strokeText(text2.text, text2.bounds.left, text2.bounds.top + baseline);
                  }
                  _this.ctx.strokeStyle = "";
                  _this.ctx.lineWidth = 0;
                  _this.ctx.lineJoin = "miter";
                  break;
              }
            });
          });
          return [
            2
            /*return*/
          ];
        });
      });
    };
    CanvasRenderer.prototype.renderReplacedElement = function(container, curves, image2) {
      if (image2 && container.intrinsicWidth > 0 && container.intrinsicHeight > 0) {
        var box = contentBox(container);
        var path = calculatePaddingBoxPath(curves);
        this.path(path);
        this.ctx.save();
        this.ctx.clip();
        this.ctx.drawImage(image2, 0, 0, container.intrinsicWidth, container.intrinsicHeight, box.left, box.top, box.width, box.height);
        this.ctx.restore();
      }
    };
    CanvasRenderer.prototype.renderNodeContent = function(paint) {
      return __awaiter(this, void 0, void 0, function() {
        var container, curves, styles, _i, _a, child, image2, image2, iframeRenderer, canvas, size, _b, fontFamily2, fontSize2, baseline, bounds, x, textBounds, img, image2, url2, fontFamily2, bounds;
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              this.applyEffects(paint.getEffects(
                4
                /* CONTENT */
              ));
              container = paint.container;
              curves = paint.curves;
              styles = container.styles;
              _i = 0, _a = container.textNodes;
              _c.label = 1;
            case 1:
              if (!(_i < _a.length))
                return [3, 4];
              child = _a[_i];
              return [4, this.renderTextNode(child, styles)];
            case 2:
              _c.sent();
              _c.label = 3;
            case 3:
              _i++;
              return [3, 1];
            case 4:
              if (!(container instanceof ImageElementContainer))
                return [3, 8];
              _c.label = 5;
            case 5:
              _c.trys.push([5, 7, , 8]);
              return [4, this.context.cache.match(container.src)];
            case 6:
              image2 = _c.sent();
              this.renderReplacedElement(container, curves, image2);
              return [3, 8];
            case 7:
              _c.sent();
              this.context.logger.error("Error loading image " + container.src);
              return [3, 8];
            case 8:
              if (container instanceof CanvasElementContainer) {
                this.renderReplacedElement(container, curves, container.canvas);
              }
              if (!(container instanceof SVGElementContainer))
                return [3, 12];
              _c.label = 9;
            case 9:
              _c.trys.push([9, 11, , 12]);
              return [4, this.context.cache.match(container.svg)];
            case 10:
              image2 = _c.sent();
              this.renderReplacedElement(container, curves, image2);
              return [3, 12];
            case 11:
              _c.sent();
              this.context.logger.error("Error loading svg " + container.svg.substring(0, 255));
              return [3, 12];
            case 12:
              if (!(container instanceof IFrameElementContainer && container.tree))
                return [3, 14];
              iframeRenderer = new CanvasRenderer(this.context, {
                scale: this.options.scale,
                backgroundColor: container.backgroundColor,
                x: 0,
                y: 0,
                width: container.width,
                height: container.height
              });
              return [4, iframeRenderer.render(container.tree)];
            case 13:
              canvas = _c.sent();
              if (container.width && container.height) {
                this.ctx.drawImage(canvas, 0, 0, container.width, container.height, container.bounds.left, container.bounds.top, container.bounds.width, container.bounds.height);
              }
              _c.label = 14;
            case 14:
              if (container instanceof InputElementContainer) {
                size = Math.min(container.bounds.width, container.bounds.height);
                if (container.type === CHECKBOX) {
                  if (container.checked) {
                    this.ctx.save();
                    this.path([
                      new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79),
                      new Vector(container.bounds.left + size * 0.16, container.bounds.top + size * 0.5549),
                      new Vector(container.bounds.left + size * 0.27347, container.bounds.top + size * 0.44071),
                      new Vector(container.bounds.left + size * 0.39694, container.bounds.top + size * 0.5649),
                      new Vector(container.bounds.left + size * 0.72983, container.bounds.top + size * 0.23),
                      new Vector(container.bounds.left + size * 0.84, container.bounds.top + size * 0.34085),
                      new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79)
                    ]);
                    this.ctx.fillStyle = asString(INPUT_COLOR);
                    this.ctx.fill();
                    this.ctx.restore();
                  }
                } else if (container.type === RADIO) {
                  if (container.checked) {
                    this.ctx.save();
                    this.ctx.beginPath();
                    this.ctx.arc(container.bounds.left + size / 2, container.bounds.top + size / 2, size / 4, 0, Math.PI * 2, true);
                    this.ctx.fillStyle = asString(INPUT_COLOR);
                    this.ctx.fill();
                    this.ctx.restore();
                  }
                }
              }
              if (isTextInputElement(container) && container.value.length) {
                _b = this.createFontStyle(styles), fontFamily2 = _b[0], fontSize2 = _b[1];
                baseline = this.fontMetrics.getMetrics(fontFamily2, fontSize2).baseline;
                this.ctx.font = fontFamily2;
                this.ctx.fillStyle = asString(styles.color);
                this.ctx.textBaseline = "alphabetic";
                this.ctx.textAlign = canvasTextAlign(container.styles.textAlign);
                bounds = contentBox(container);
                x = 0;
                switch (container.styles.textAlign) {
                  case 1:
                    x += bounds.width / 2;
                    break;
                  case 2:
                    x += bounds.width;
                    break;
                }
                textBounds = bounds.add(x, 0, 0, -bounds.height / 2 + 1);
                this.ctx.save();
                this.path([
                  new Vector(bounds.left, bounds.top),
                  new Vector(bounds.left + bounds.width, bounds.top),
                  new Vector(bounds.left + bounds.width, bounds.top + bounds.height),
                  new Vector(bounds.left, bounds.top + bounds.height)
                ]);
                this.ctx.clip();
                this.renderTextWithLetterSpacing(new TextBounds(container.value, textBounds), styles.letterSpacing, baseline);
                this.ctx.restore();
                this.ctx.textBaseline = "alphabetic";
                this.ctx.textAlign = "left";
              }
              if (!contains(
                container.styles.display,
                2048
                /* LIST_ITEM */
              ))
                return [3, 20];
              if (!(container.styles.listStyleImage !== null))
                return [3, 19];
              img = container.styles.listStyleImage;
              if (!(img.type === 0))
                return [3, 18];
              image2 = void 0;
              url2 = img.url;
              _c.label = 15;
            case 15:
              _c.trys.push([15, 17, , 18]);
              return [4, this.context.cache.match(url2)];
            case 16:
              image2 = _c.sent();
              this.ctx.drawImage(image2, container.bounds.left - (image2.width + 10), container.bounds.top);
              return [3, 18];
            case 17:
              _c.sent();
              this.context.logger.error("Error loading list-style-image " + url2);
              return [3, 18];
            case 18:
              return [3, 20];
            case 19:
              if (paint.listValue && container.styles.listStyleType !== -1) {
                fontFamily2 = this.createFontStyle(styles)[0];
                this.ctx.font = fontFamily2;
                this.ctx.fillStyle = asString(styles.color);
                this.ctx.textBaseline = "middle";
                this.ctx.textAlign = "right";
                bounds = new Bounds(container.bounds.left, container.bounds.top + getAbsoluteValue(container.styles.paddingTop, container.bounds.width), container.bounds.width, computeLineHeight(styles.lineHeight, styles.fontSize.number) / 2 + 1);
                this.renderTextWithLetterSpacing(new TextBounds(paint.listValue, bounds), styles.letterSpacing, computeLineHeight(styles.lineHeight, styles.fontSize.number) / 2 + 2);
                this.ctx.textBaseline = "bottom";
                this.ctx.textAlign = "left";
              }
              _c.label = 20;
            case 20:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CanvasRenderer.prototype.renderStackContent = function(stack) {
      return __awaiter(this, void 0, void 0, function() {
        var _i, _a, child, _b, _c, child, _d, _e, child, _f, _g, child, _h, _j, child, _k, _l, child, _m, _o, child;
        return __generator(this, function(_p) {
          switch (_p.label) {
            case 0:
              if (contains(
                stack.element.container.flags,
                16
                /* DEBUG_RENDER */
              )) {
                debugger;
              }
              return [4, this.renderNodeBackgroundAndBorders(stack.element)];
            case 1:
              _p.sent();
              _i = 0, _a = stack.negativeZIndex;
              _p.label = 2;
            case 2:
              if (!(_i < _a.length))
                return [3, 5];
              child = _a[_i];
              return [4, this.renderStack(child)];
            case 3:
              _p.sent();
              _p.label = 4;
            case 4:
              _i++;
              return [3, 2];
            case 5:
              return [4, this.renderNodeContent(stack.element)];
            case 6:
              _p.sent();
              _b = 0, _c = stack.nonInlineLevel;
              _p.label = 7;
            case 7:
              if (!(_b < _c.length))
                return [3, 10];
              child = _c[_b];
              return [4, this.renderNode(child)];
            case 8:
              _p.sent();
              _p.label = 9;
            case 9:
              _b++;
              return [3, 7];
            case 10:
              _d = 0, _e = stack.nonPositionedFloats;
              _p.label = 11;
            case 11:
              if (!(_d < _e.length))
                return [3, 14];
              child = _e[_d];
              return [4, this.renderStack(child)];
            case 12:
              _p.sent();
              _p.label = 13;
            case 13:
              _d++;
              return [3, 11];
            case 14:
              _f = 0, _g = stack.nonPositionedInlineLevel;
              _p.label = 15;
            case 15:
              if (!(_f < _g.length))
                return [3, 18];
              child = _g[_f];
              return [4, this.renderStack(child)];
            case 16:
              _p.sent();
              _p.label = 17;
            case 17:
              _f++;
              return [3, 15];
            case 18:
              _h = 0, _j = stack.inlineLevel;
              _p.label = 19;
            case 19:
              if (!(_h < _j.length))
                return [3, 22];
              child = _j[_h];
              return [4, this.renderNode(child)];
            case 20:
              _p.sent();
              _p.label = 21;
            case 21:
              _h++;
              return [3, 19];
            case 22:
              _k = 0, _l = stack.zeroOrAutoZIndexOrTransformedOrOpacity;
              _p.label = 23;
            case 23:
              if (!(_k < _l.length))
                return [3, 26];
              child = _l[_k];
              return [4, this.renderStack(child)];
            case 24:
              _p.sent();
              _p.label = 25;
            case 25:
              _k++;
              return [3, 23];
            case 26:
              _m = 0, _o = stack.positiveZIndex;
              _p.label = 27;
            case 27:
              if (!(_m < _o.length))
                return [3, 30];
              child = _o[_m];
              return [4, this.renderStack(child)];
            case 28:
              _p.sent();
              _p.label = 29;
            case 29:
              _m++;
              return [3, 27];
            case 30:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CanvasRenderer.prototype.mask = function(paths) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(this.canvas.width, 0);
      this.ctx.lineTo(this.canvas.width, this.canvas.height);
      this.ctx.lineTo(0, this.canvas.height);
      this.ctx.lineTo(0, 0);
      this.formatPath(paths.slice(0).reverse());
      this.ctx.closePath();
    };
    CanvasRenderer.prototype.path = function(paths) {
      this.ctx.beginPath();
      this.formatPath(paths);
      this.ctx.closePath();
    };
    CanvasRenderer.prototype.formatPath = function(paths) {
      var _this = this;
      paths.forEach(function(point, index2) {
        var start = isBezierCurve(point) ? point.start : point;
        if (index2 === 0) {
          _this.ctx.moveTo(start.x, start.y);
        } else {
          _this.ctx.lineTo(start.x, start.y);
        }
        if (isBezierCurve(point)) {
          _this.ctx.bezierCurveTo(point.startControl.x, point.startControl.y, point.endControl.x, point.endControl.y, point.end.x, point.end.y);
        }
      });
    };
    CanvasRenderer.prototype.renderRepeat = function(path, pattern, offsetX, offsetY) {
      this.path(path);
      this.ctx.fillStyle = pattern;
      this.ctx.translate(offsetX, offsetY);
      this.ctx.fill();
      this.ctx.translate(-offsetX, -offsetY);
    };
    CanvasRenderer.prototype.resizeImage = function(image2, width, height) {
      var _a;
      if (image2.width === width && image2.height === height) {
        return image2;
      }
      var ownerDocument = (_a = this.canvas.ownerDocument) !== null && _a !== void 0 ? _a : document;
      var canvas = ownerDocument.createElement("canvas");
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
      var ctx = canvas.getContext("2d");
      ctx.drawImage(image2, 0, 0, image2.width, image2.height, 0, 0, width, height);
      return canvas;
    };
    CanvasRenderer.prototype.renderBackgroundImage = function(container) {
      return __awaiter(this, void 0, void 0, function() {
        var index2, _loop_1, this_1, _i, _a, backgroundImage2;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              index2 = container.styles.backgroundImage.length - 1;
              _loop_1 = function(backgroundImage3) {
                var image2, url2, _c, path, x, y, width, height, pattern, _d, path, x, y, width, height, _e, lineLength, x0, x1, y0, y1, canvas, ctx, gradient_1, pattern, _f, path, left, top_1, width, height, position2, x, y, _g, rx, ry, radialGradient_1, midX, midY, f2, invF;
                return __generator(this, function(_h) {
                  switch (_h.label) {
                    case 0:
                      if (!(backgroundImage3.type === 0))
                        return [3, 5];
                      image2 = void 0;
                      url2 = backgroundImage3.url;
                      _h.label = 1;
                    case 1:
                      _h.trys.push([1, 3, , 4]);
                      return [4, this_1.context.cache.match(url2)];
                    case 2:
                      image2 = _h.sent();
                      return [3, 4];
                    case 3:
                      _h.sent();
                      this_1.context.logger.error("Error loading background-image " + url2);
                      return [3, 4];
                    case 4:
                      if (image2) {
                        _c = calculateBackgroundRendering(container, index2, [
                          image2.width,
                          image2.height,
                          image2.width / image2.height
                        ]), path = _c[0], x = _c[1], y = _c[2], width = _c[3], height = _c[4];
                        pattern = this_1.ctx.createPattern(this_1.resizeImage(image2, width, height), "repeat");
                        this_1.renderRepeat(path, pattern, x, y);
                      }
                      return [3, 6];
                    case 5:
                      if (isLinearGradient(backgroundImage3)) {
                        _d = calculateBackgroundRendering(container, index2, [null, null, null]), path = _d[0], x = _d[1], y = _d[2], width = _d[3], height = _d[4];
                        _e = calculateGradientDirection(backgroundImage3.angle, width, height), lineLength = _e[0], x0 = _e[1], x1 = _e[2], y0 = _e[3], y1 = _e[4];
                        canvas = document.createElement("canvas");
                        canvas.width = width;
                        canvas.height = height;
                        ctx = canvas.getContext("2d");
                        gradient_1 = ctx.createLinearGradient(x0, y0, x1, y1);
                        processColorStops(backgroundImage3.stops, lineLength).forEach(function(colorStop) {
                          return gradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                        });
                        ctx.fillStyle = gradient_1;
                        ctx.fillRect(0, 0, width, height);
                        if (width > 0 && height > 0) {
                          pattern = this_1.ctx.createPattern(canvas, "repeat");
                          this_1.renderRepeat(path, pattern, x, y);
                        }
                      } else if (isRadialGradient(backgroundImage3)) {
                        _f = calculateBackgroundRendering(container, index2, [
                          null,
                          null,
                          null
                        ]), path = _f[0], left = _f[1], top_1 = _f[2], width = _f[3], height = _f[4];
                        position2 = backgroundImage3.position.length === 0 ? [FIFTY_PERCENT] : backgroundImage3.position;
                        x = getAbsoluteValue(position2[0], width);
                        y = getAbsoluteValue(position2[position2.length - 1], height);
                        _g = calculateRadius(backgroundImage3, x, y, width, height), rx = _g[0], ry = _g[1];
                        if (rx > 0 && ry > 0) {
                          radialGradient_1 = this_1.ctx.createRadialGradient(left + x, top_1 + y, 0, left + x, top_1 + y, rx);
                          processColorStops(backgroundImage3.stops, rx * 2).forEach(function(colorStop) {
                            return radialGradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                          });
                          this_1.path(path);
                          this_1.ctx.fillStyle = radialGradient_1;
                          if (rx !== ry) {
                            midX = container.bounds.left + 0.5 * container.bounds.width;
                            midY = container.bounds.top + 0.5 * container.bounds.height;
                            f2 = ry / rx;
                            invF = 1 / f2;
                            this_1.ctx.save();
                            this_1.ctx.translate(midX, midY);
                            this_1.ctx.transform(1, 0, 0, f2, 0, 0);
                            this_1.ctx.translate(-midX, -midY);
                            this_1.ctx.fillRect(left, invF * (top_1 - midY) + midY, width, height * invF);
                            this_1.ctx.restore();
                          } else {
                            this_1.ctx.fill();
                          }
                        }
                      }
                      _h.label = 6;
                    case 6:
                      index2--;
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              };
              this_1 = this;
              _i = 0, _a = container.styles.backgroundImage.slice(0).reverse();
              _b.label = 1;
            case 1:
              if (!(_i < _a.length))
                return [3, 4];
              backgroundImage2 = _a[_i];
              return [5, _loop_1(backgroundImage2)];
            case 2:
              _b.sent();
              _b.label = 3;
            case 3:
              _i++;
              return [3, 1];
            case 4:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CanvasRenderer.prototype.renderSolidBorder = function(color2, side, curvePoints) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          this.path(parsePathForBorder(curvePoints, side));
          this.ctx.fillStyle = asString(color2);
          this.ctx.fill();
          return [
            2
            /*return*/
          ];
        });
      });
    };
    CanvasRenderer.prototype.renderDoubleBorder = function(color2, width, side, curvePoints) {
      return __awaiter(this, void 0, void 0, function() {
        var outerPaths, innerPaths;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (!(width < 3))
                return [3, 2];
              return [4, this.renderSolidBorder(color2, side, curvePoints)];
            case 1:
              _a.sent();
              return [
                2
                /*return*/
              ];
            case 2:
              outerPaths = parsePathForBorderDoubleOuter(curvePoints, side);
              this.path(outerPaths);
              this.ctx.fillStyle = asString(color2);
              this.ctx.fill();
              innerPaths = parsePathForBorderDoubleInner(curvePoints, side);
              this.path(innerPaths);
              this.ctx.fill();
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CanvasRenderer.prototype.renderNodeBackgroundAndBorders = function(paint) {
      return __awaiter(this, void 0, void 0, function() {
        var styles, hasBackground, borders, backgroundPaintingArea, side, _i, borders_1, border;
        var _this = this;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              this.applyEffects(paint.getEffects(
                2
                /* BACKGROUND_BORDERS */
              ));
              styles = paint.container.styles;
              hasBackground = !isTransparent(styles.backgroundColor) || styles.backgroundImage.length;
              borders = [
                { style: styles.borderTopStyle, color: styles.borderTopColor, width: styles.borderTopWidth },
                { style: styles.borderRightStyle, color: styles.borderRightColor, width: styles.borderRightWidth },
                { style: styles.borderBottomStyle, color: styles.borderBottomColor, width: styles.borderBottomWidth },
                { style: styles.borderLeftStyle, color: styles.borderLeftColor, width: styles.borderLeftWidth }
              ];
              backgroundPaintingArea = calculateBackgroundCurvedPaintingArea(getBackgroundValueForIndex(styles.backgroundClip, 0), paint.curves);
              if (!(hasBackground || styles.boxShadow.length))
                return [3, 2];
              this.ctx.save();
              this.path(backgroundPaintingArea);
              this.ctx.clip();
              if (!isTransparent(styles.backgroundColor)) {
                this.ctx.fillStyle = asString(styles.backgroundColor);
                this.ctx.fill();
              }
              return [4, this.renderBackgroundImage(paint.container)];
            case 1:
              _a.sent();
              this.ctx.restore();
              styles.boxShadow.slice(0).reverse().forEach(function(shadow) {
                _this.ctx.save();
                var borderBoxArea = calculateBorderBoxPath(paint.curves);
                var maskOffset = shadow.inset ? 0 : MASK_OFFSET;
                var shadowPaintingArea = transformPath(borderBoxArea, -maskOffset + (shadow.inset ? 1 : -1) * shadow.spread.number, (shadow.inset ? 1 : -1) * shadow.spread.number, shadow.spread.number * (shadow.inset ? -2 : 2), shadow.spread.number * (shadow.inset ? -2 : 2));
                if (shadow.inset) {
                  _this.path(borderBoxArea);
                  _this.ctx.clip();
                  _this.mask(shadowPaintingArea);
                } else {
                  _this.mask(borderBoxArea);
                  _this.ctx.clip();
                  _this.path(shadowPaintingArea);
                }
                _this.ctx.shadowOffsetX = shadow.offsetX.number + maskOffset;
                _this.ctx.shadowOffsetY = shadow.offsetY.number;
                _this.ctx.shadowColor = asString(shadow.color);
                _this.ctx.shadowBlur = shadow.blur.number;
                _this.ctx.fillStyle = shadow.inset ? asString(shadow.color) : "rgba(0,0,0,1)";
                _this.ctx.fill();
                _this.ctx.restore();
              });
              _a.label = 2;
            case 2:
              side = 0;
              _i = 0, borders_1 = borders;
              _a.label = 3;
            case 3:
              if (!(_i < borders_1.length))
                return [3, 13];
              border = borders_1[_i];
              if (!(border.style !== 0 && !isTransparent(border.color) && border.width > 0))
                return [3, 11];
              if (!(border.style === 2))
                return [3, 5];
              return [4, this.renderDashedDottedBorder(
                border.color,
                border.width,
                side,
                paint.curves,
                2
                /* DASHED */
              )];
            case 4:
              _a.sent();
              return [3, 11];
            case 5:
              if (!(border.style === 3))
                return [3, 7];
              return [4, this.renderDashedDottedBorder(
                border.color,
                border.width,
                side,
                paint.curves,
                3
                /* DOTTED */
              )];
            case 6:
              _a.sent();
              return [3, 11];
            case 7:
              if (!(border.style === 4))
                return [3, 9];
              return [4, this.renderDoubleBorder(border.color, border.width, side, paint.curves)];
            case 8:
              _a.sent();
              return [3, 11];
            case 9:
              return [4, this.renderSolidBorder(border.color, side, paint.curves)];
            case 10:
              _a.sent();
              _a.label = 11;
            case 11:
              side++;
              _a.label = 12;
            case 12:
              _i++;
              return [3, 3];
            case 13:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CanvasRenderer.prototype.renderDashedDottedBorder = function(color2, width, side, curvePoints, style) {
      return __awaiter(this, void 0, void 0, function() {
        var strokePaths, boxPaths, startX, startY, endX, endY, length, dashLength, spaceLength, useLineDash, multiplier, numberOfDashes, minSpace, maxSpace, path1, path2, path1, path2;
        return __generator(this, function(_a) {
          this.ctx.save();
          strokePaths = parsePathForBorderStroke(curvePoints, side);
          boxPaths = parsePathForBorder(curvePoints, side);
          if (style === 2) {
            this.path(boxPaths);
            this.ctx.clip();
          }
          if (isBezierCurve(boxPaths[0])) {
            startX = boxPaths[0].start.x;
            startY = boxPaths[0].start.y;
          } else {
            startX = boxPaths[0].x;
            startY = boxPaths[0].y;
          }
          if (isBezierCurve(boxPaths[1])) {
            endX = boxPaths[1].end.x;
            endY = boxPaths[1].end.y;
          } else {
            endX = boxPaths[1].x;
            endY = boxPaths[1].y;
          }
          if (side === 0 || side === 2) {
            length = Math.abs(startX - endX);
          } else {
            length = Math.abs(startY - endY);
          }
          this.ctx.beginPath();
          if (style === 3) {
            this.formatPath(strokePaths);
          } else {
            this.formatPath(boxPaths.slice(0, 2));
          }
          dashLength = width < 3 ? width * 3 : width * 2;
          spaceLength = width < 3 ? width * 2 : width;
          if (style === 3) {
            dashLength = width;
            spaceLength = width;
          }
          useLineDash = true;
          if (length <= dashLength * 2) {
            useLineDash = false;
          } else if (length <= dashLength * 2 + spaceLength) {
            multiplier = length / (2 * dashLength + spaceLength);
            dashLength *= multiplier;
            spaceLength *= multiplier;
          } else {
            numberOfDashes = Math.floor((length + spaceLength) / (dashLength + spaceLength));
            minSpace = (length - numberOfDashes * dashLength) / (numberOfDashes - 1);
            maxSpace = (length - (numberOfDashes + 1) * dashLength) / numberOfDashes;
            spaceLength = maxSpace <= 0 || Math.abs(spaceLength - minSpace) < Math.abs(spaceLength - maxSpace) ? minSpace : maxSpace;
          }
          if (useLineDash) {
            if (style === 3) {
              this.ctx.setLineDash([0, dashLength + spaceLength]);
            } else {
              this.ctx.setLineDash([dashLength, spaceLength]);
            }
          }
          if (style === 3) {
            this.ctx.lineCap = "round";
            this.ctx.lineWidth = width;
          } else {
            this.ctx.lineWidth = width * 2 + 1.1;
          }
          this.ctx.strokeStyle = asString(color2);
          this.ctx.stroke();
          this.ctx.setLineDash([]);
          if (style === 2) {
            if (isBezierCurve(boxPaths[0])) {
              path1 = boxPaths[3];
              path2 = boxPaths[0];
              this.ctx.beginPath();
              this.formatPath([new Vector(path1.end.x, path1.end.y), new Vector(path2.start.x, path2.start.y)]);
              this.ctx.stroke();
            }
            if (isBezierCurve(boxPaths[1])) {
              path1 = boxPaths[1];
              path2 = boxPaths[2];
              this.ctx.beginPath();
              this.formatPath([new Vector(path1.end.x, path1.end.y), new Vector(path2.start.x, path2.start.y)]);
              this.ctx.stroke();
            }
          }
          this.ctx.restore();
          return [
            2
            /*return*/
          ];
        });
      });
    };
    CanvasRenderer.prototype.render = function(element) {
      return __awaiter(this, void 0, void 0, function() {
        var stack;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (this.options.backgroundColor) {
                this.ctx.fillStyle = asString(this.options.backgroundColor);
                this.ctx.fillRect(this.options.x, this.options.y, this.options.width, this.options.height);
              }
              stack = parseStackingContexts(element);
              return [4, this.renderStack(stack)];
            case 1:
              _a.sent();
              this.applyEffects([]);
              return [2, this.canvas];
          }
        });
      });
    };
    return CanvasRenderer;
  })(Renderer);
  var isTextInputElement = function(container) {
    if (container instanceof TextareaElementContainer) {
      return true;
    } else if (container instanceof SelectElementContainer) {
      return true;
    } else if (container instanceof InputElementContainer && container.type !== RADIO && container.type !== CHECKBOX) {
      return true;
    }
    return false;
  };
  var calculateBackgroundCurvedPaintingArea = function(clip, curves) {
    switch (clip) {
      case 0:
        return calculateBorderBoxPath(curves);
      case 2:
        return calculateContentBoxPath(curves);
      case 1:
      default:
        return calculatePaddingBoxPath(curves);
    }
  };
  var canvasTextAlign = function(textAlign2) {
    switch (textAlign2) {
      case 1:
        return "center";
      case 2:
        return "right";
      case 0:
      default:
        return "left";
    }
  };
  var iOSBrokenFonts = ["-apple-system", "system-ui"];
  var fixIOSSystemFonts = function(fontFamilies) {
    return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent) ? fontFamilies.filter(function(fontFamily2) {
      return iOSBrokenFonts.indexOf(fontFamily2) === -1;
    }) : fontFamilies;
  };
  (function(_super) {
    __extends(ForeignObjectRenderer, _super);
    function ForeignObjectRenderer(context, options) {
      var _this = _super.call(this, context, options) || this;
      _this.canvas = options.canvas ? options.canvas : document.createElement("canvas");
      _this.ctx = _this.canvas.getContext("2d");
      _this.options = options;
      _this.canvas.width = Math.floor(options.width * options.scale);
      _this.canvas.height = Math.floor(options.height * options.scale);
      _this.canvas.style.width = options.width + "px";
      _this.canvas.style.height = options.height + "px";
      _this.ctx.scale(_this.options.scale, _this.options.scale);
      _this.ctx.translate(-options.x, -options.y);
      _this.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized (" + options.width + "x" + options.height + " at " + options.x + "," + options.y + ") with scale " + options.scale);
      return _this;
    }
    ForeignObjectRenderer.prototype.render = function(element) {
      return __awaiter(this, void 0, void 0, function() {
        var svg, img;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              svg = createForeignObjectSVG(this.options.width * this.options.scale, this.options.height * this.options.scale, this.options.scale, this.options.scale, element);
              return [4, loadSerializedSVG(svg)];
            case 1:
              img = _a.sent();
              if (this.options.backgroundColor) {
                this.ctx.fillStyle = asString(this.options.backgroundColor);
                this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale);
              }
              this.ctx.drawImage(img, -this.options.x * this.options.scale, -this.options.y * this.options.scale);
              return [2, this.canvas];
          }
        });
      });
    };
    return ForeignObjectRenderer;
  })(Renderer);
  var loadSerializedSVG = function(svg) {
    return new Promise(function(resolve, reject) {
      var img = new Image();
      img.onload = function() {
        resolve(img);
      };
      img.onerror = reject;
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
    });
  };
  if (typeof window !== "undefined") {
    CacheStorage.setContext(window);
  }
  const _sfc_main$1 = {
    data() {
      return {
        currentDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        // 当前日期
        items: [{
          name: "臭豆腐",
          qty: 1,
          price: 15
        }],
        single: "",
        imageSrc: [],
        // 存储图片路径
        nowBills: [],
        showBills: [],
        userPriceMap: /* @__PURE__ */ new Map(),
        isshooting: false,
        BillUsers: []
      };
    },
    computed: {
      userPriceArray() {
        return Array.from(this.userPriceMap.entries()).map(([userid, value]) => ({
          userid,
          ...value
        }));
      },
      totalAmount() {
        return this.nowBills.reduce((sum, item) => sum + item.price, 0).toFixed(1);
      },
      Date() {
        const today = /* @__PURE__ */ new Date();
        const formattedDate = today.toLocaleDateString("zh-CN");
        formatAppLog("log", "at pages/settleBill/settleBill.vue:127", formattedDate);
        return formattedDate;
      }
    },
    mounted() {
      this.load();
    },
    methods: {
      formatId(id) {
        return String(id).padStart(5, "0");
      },
      async load() {
        this.nowBills = await uni.getStorageSync(STORAGE_KEYS.CURRENTITEMS);
        formatAppLog("log", "at pages/settleBill/settleBill.vue:142", "初始化project:", this.nowBills);
        const result = [];
        for (const [index2, item] of this.nowBills.entries()) {
          let billItem = {
            index: index2,
            name: item.name,
            cnt: item.cnt,
            price: item.price,
            total: item.price,
            color: "black"
            // 默认设置为 black
          };
          const persons = await settleBill.selectBillUser("BillUser", item.id);
          if (persons.length === 0) {
            billItem.color = "red";
          }
          result.push(billItem);
        }
        this.showBills = result;
        formatAppLog("log", "at pages/settleBill/settleBill.vue:168", this.showBills);
        this.computePerPrice();
      },
      async computePerPrice() {
        for (const obj of this.nowBills) {
          try {
            const result = await settleBill.selectBillUser("BillUser", obj.id);
            formatAppLog("log", "at pages/settleBill/settleBill.vue:179", "userBill", result);
            result.forEach((item) => {
              const existingUser = this.userPriceMap.get(item.userid);
              if (existingUser) {
                const updatedPrice = existingUser.price + item.price / result.length;
                formatAppLog("log", "at pages/settleBill/settleBill.vue:188", "price: ", updatedPrice);
                this.userPriceMap.set(item.userid, {
                  price: updatedPrice,
                  name: existingUser.name
                  // 保留原来的名字
                });
              } else {
                this.userPriceMap.set(item.userid, {
                  price: item.price / result.length,
                  name: item.name
                  // 设置名字
                });
              }
              formatAppLog(
                "log",
                "at pages/settleBill/settleBill.vue:202",
                `${item.userid}: ${JSON.stringify(this.userPriceMap.get(item.userid))}`
              );
            });
          } catch (error2) {
            formatAppLog("error", "at pages/settleBill/settleBill.vue:207", "Error fetching bill user:", error2);
          }
        }
        formatAppLog("log", "at pages/settleBill/settleBill.vue:212", "Final userPriceMap:", JSON.stringify([...this.userPriceMap.entries()]));
      },
      closeModal() {
        formatAppLog("log", "at pages/settleBill/settleBill.vue:217", "关闭模态框");
      },
      chooseImage() {
        uni.chooseImage({
          count: 1,
          // 限制只能选择一张图片
          sourceType: ["album"],
          // 仅允许从相册选择
          success: (res) => {
            formatAppLog("log", "at pages/settleBill/settleBill.vue:225", "图片路径:", res.tempFilePaths[0]);
            const filePath = res.tempFilePaths[0];
            this.imageSrc = [];
            this.imageSrc.push(filePath.startsWith("file://") ? filePath : `file://${filePath}`);
          },
          fail: (err) => {
            formatAppLog("error", "at pages/settleBill/settleBill.vue:234", "选择图片失败:", err);
          }
        });
        formatAppLog("log", "at pages/settleBill/settleBill.vue:237", this.imageSrc);
      },
      previewImg(current) {
        uni.previewImage({
          current: "current",
          urls: this.imageSrc,
          indicator: none
        });
      },
      //保存图片
      saveClick() {
        const pages2 = getCurrentPages();
        const currentPage = pages2[pages2.length - 1];
        const currentWebview = currentPage.$getAppWebview();
        const windowHeight = plus.screen.resolutionHeight;
        const windowWidth = plus.screen.resolutionWidth;
        formatAppLog("log", "at pages/settleBill/settleBill.vue:256", `当前屏幕分辨率：宽=${windowWidth}px, 高=${windowHeight}px`);
        let scrollTop = 0;
        const captureStep = () => {
          formatAppLog("log", "at pages/settleBill/settleBill.vue:266", currentWebview);
          setTimeout(() => {
            const tempBitmap = new plus.nativeObj.Bitmap("temp_screenshot");
            currentWebview.draw(
              tempBitmap,
              () => {
                scrollTop += windowHeight;
                if (scrollTop < contentHeight) {
                  captureStep();
                } else {
                  formatAppLog("log", "at pages/settleBill/settleBill.vue:282", "长截图完成");
                }
              },
              (error2) => {
                formatAppLog("error", "at pages/settleBill/settleBill.vue:286", "截屏失败:", error2);
              }
            );
          }, 200);
        };
        captureStep();
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "paybill-container",
        ref: "paybillContainer"
      },
      [
        vue.createCommentVNode(" 标题 "),
        vue.createElementVNode("view", { class: "header" }, [
          vue.createElementVNode("text", { class: "title" }, "PayBill"),
          vue.createElementVNode("text", { class: "subtitle" })
        ]),
        vue.createCommentVNode(" 可插入图片区域 "),
        vue.createCommentVNode(' <button v-if="imageSrc.length<=0&&!isshooting" type="primary" @click="chooseImage">可选择上传图片</button>\r\n		<image @click="chooseImage" v-for="item in imageSrc" :src="item" class="image-placeholder">\r\n		</image> '),
        vue.createCommentVNode(" 单号和日期 "),
        vue.createElementVNode("view", { class: "info" }, [
          vue.createElementVNode("view", { class: "info-line" }, [
            vue.createElementVNode("text", null, "NO:"),
            $data.nowBills.length > 0 ? (vue.openBlock(), vue.createElementBlock(
              "text",
              { key: 0 },
              vue.toDisplayString($options.formatId($data.nowBills[0].projectId)),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true)
          ]),
          vue.createElementVNode("view", { class: "info-line" }, [
            vue.createElementVNode("text", null, "Date:"),
            vue.createCommentVNode(' <uni-datetime-picker style="margin-left:300rpx;" type="date" :clear-icon="false" v-model="single"\r\n					@maskClick="maskClick" /> '),
            vue.createElementVNode(
              "view",
              null,
              vue.toDisplayString($options.Date),
              1
              /* TEXT */
            )
          ])
        ]),
        vue.createCommentVNode(" 商品列表 "),
        vue.createElementVNode("view", { class: "table" }, [
          vue.createElementVNode("view", { class: "table-header" }, [
            vue.createElementVNode("text", { class: "table-cell" }, "NO"),
            vue.createElementVNode("text", { class: "table-cell" }, "Item"),
            vue.createElementVNode("text", { class: "table-cell" }, "QTY"),
            vue.createElementVNode("text", { class: "table-cell" }, "Price"),
            vue.createElementVNode("text", { class: "table-cell" }, "Total")
          ]),
          vue.createElementVNode("view", { class: "table-body" }, [
            $data.showBills.length > 0 ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              vue.renderList($data.showBills, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    class: "table-row",
                    key: index2,
                    style: vue.normalizeStyle({ color: item.color })
                  },
                  [
                    vue.createElementVNode(
                      "text",
                      { class: "table-cell" },
                      vue.toDisplayString(index2 + 1),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "table-cell" },
                      vue.toDisplayString(item.name),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "table-cell" },
                      vue.toDisplayString(item.cnt),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "table-cell" },
                      vue.toDisplayString(item.price.toFixed(1)),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "table-cell" },
                      vue.toDisplayString(item.total),
                      1
                      /* TEXT */
                    )
                  ],
                  4
                  /* STYLE */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ])
        ]),
        vue.createCommentVNode(" 总计 "),
        vue.createElementVNode("view", { class: "total-section" }, [
          vue.createElementVNode("view", { class: "total-line" }, [
            vue.createElementVNode("text", {
              class: "total-title",
              style: { "font-size": "70rpx" }
            }, "Total"),
            vue.createElementVNode(
              "text",
              {
                class: "total-amount",
                style: { "margin-right": "50rpx", "display": "flex", "align-items": "center", "justify-content": "center" }
              },
              vue.toDisplayString($options.totalAmount) + " ¥",
              1
              /* TEXT */
            )
          ])
        ]),
        vue.createElementVNode("view", { class: "total-section" }, [
          vue.createElementVNode("view", { class: "total-line" }, [
            vue.createElementVNode("text", {
              class: "total-title",
              style: { "font-size": "70rpx" }
            }, "Average"),
            vue.createElementVNode(
              "text",
              {
                class: "total-amount",
                style: { "margin-right": "50rpx", "display": "flex", "align-items": "center", "justify-content": "center" }
              },
              vue.toDisplayString(($options.totalAmount / $options.userPriceArray.length).toFixed(1)) + " ¥",
              1
              /* TEXT */
            )
          ])
        ]),
        vue.createCommentVNode(" 人员信息 "),
        vue.createElementVNode("view", { class: "person-section" }, [
          vue.createElementVNode("view", { class: "person-line" }, [
            vue.createElementVNode("text", { class: "person-title" }, "Person"),
            vue.createElementVNode("text", {
              class: "person-title",
              style: { "margin-left": "400rpx" }
            }, "Price")
          ]),
          vue.createElementVNode("view", { class: "person-line" }, [
            $options.userPriceArray.length > 0 ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              vue.renderList($options.userPriceArray, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "table-row",
                  key: index2
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "person-value" },
                    vue.toDisplayString(item.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    {
                      class: "person-value",
                      style: { "margin-right": "50rpx" }
                    },
                    vue.toDisplayString(item.price.toFixed(1)),
                    1
                    /* TEXT */
                  )
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ])
        ]),
        vue.createCommentVNode(' <button v-if="!isshooting" @click="saveClick()" style="position: fixed;bottom:0; width:90%">保存为图片</button> ')
      ],
      512
      /* NEED_PATCH */
    );
  }
  const PagesSettleBillSettleBill = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-02643f65"], ["__file", "D:/uni/travel-new/pages/settleBill/settleBill.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/PayBill/index", PagesPayBillIndex);
  __definePage("pages/sql/sql", PagesSqlSql);
  __definePage("pages/home/index", PagesHomeIndex);
  __definePage("pages/settleBill/settleBill", PagesSettleBillSettleBill);
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
      for (let i2 = 0, l = obj.length; i2 < l; i2++) {
        fn.call(null, obj[i2], i2, obj);
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
    for (let i2 = 0, l = arguments.length; i2 < l; i2++) {
      forEach(arguments[i2], assignValue);
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
        } catch (e2) {
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
        for (var i2 in parent2) {
          var attrs = Object.getOwnPropertyDescriptor(parent2, i2);
          if (attrs) {
            child[i2] = _clone(parent2[i2], depth2 - 1);
          }
          try {
            var objProperty = Object.getOwnPropertyDescriptor(parent2, i2);
            if (objProperty.set === "undefined") {
              continue;
            }
            child[i2] = _clone(parent2[i2], depth2 - 1);
          } catch (e2) {
            if (e2 instanceof TypeError) {
              continue;
            } else if (e2 instanceof ReferenceError) {
              continue;
            }
          }
        }
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(parent2);
          for (var i2 = 0; i2 < symbols.length; i2++) {
            var symbol = symbols[i2];
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
          for (var i2 = 0; i2 < allPropertyNames.length; i2++) {
            var propertyName = allPropertyNames[i2];
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
    setConfig(f2) {
      this.config = f2(this.config);
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
    for (let i2 = 0; i2 < step; i2++) {
      let hex = rgbToHex(`rgb(${Math.round(sR * i2 + startR)},${Math.round(sG * i2 + startG)},${Math.round(sB * i2 + startB)})`);
      if (i2 === 0)
        hex = rgbToHex(startColor);
      if (i2 === step - 1)
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
        for (let i2 = 1; i2 < 4; i2 += 1) {
          sColorNew += sColor.slice(i2, i2 + 1).concat(sColor.slice(i2, i2 + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i2 = 1; i2 < 7; i2 += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i2, i2 + 2)}`));
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
  function rgbToHex(rgb2) {
    const _this = rgb2;
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      const aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i2 = 0; i2 < aColor.length; i2++) {
        let hex = Number(aColor[i2]).toString(16);
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
        for (let i2 = 0; i2 < aNum.length; i2 += 1) {
          numHex += aNum[i2] + aNum[i2];
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
        for (let i2 = 1; i2 < 4; i2 += 1) {
          sColorNew += sColor.slice(i2, i2 + 1).concat(sColor.slice(i2, i2 + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i2 = 1; i2 < 7; i2 += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i2, i2 + 2)}`));
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
    index.shallowMerge(props$7, configs.props || {});
    index.shallowMerge(color$2, configs.color || {});
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
    props: props$7,
    ...index,
    color: color$2,
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
