Ext.define("Ext.data.Field",{requires:["Ext.data.Types","Ext.data.SortTypes"],alias:"data.field",isField:true,constructor:function(b){var d=this,c=Ext.data.Types,a;if(Ext.isString(b)){b={name:b}}Ext.apply(d,b);a=d.sortType;if(d.type){if(Ext.isString(d.type)){d.type=c[d.type.toUpperCase()]||c.AUTO}}else{d.type=c.AUTO}if(Ext.isString(a)){d.sortType=Ext.data.SortTypes[a]}else{if(Ext.isEmpty(a)){d.sortType=d.type.sortType}}if(!b.hasOwnProperty("convert")){d.convert=d.type.convert}else{if(!d.convert&&d.type.convert&&!b.hasOwnProperty("defaultValue")){d.defaultValue=d.type.convert(d.defaultValue)}}if(b.convert){d.hasCustomConvert=true}},dateFormat:null,dateReadFormat:null,dateWriteFormat:null,useNull:false,defaultValue:"",mapping:null,sortType:null,sortDir:"ASC",allowBlank:true,persist:true});