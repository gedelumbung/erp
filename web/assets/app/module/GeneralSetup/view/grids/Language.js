Ext.define("GatotKacaErp.module.GeneralSetup.view.grids.Language",{extend:"Ext.grid.Panel",store:"GatotKacaErp.module.GeneralSetup.store.Language",requires:["Ext.ux.CheckColumn"],alias:"widget.gridlanguage",id:"gridlanguage",layout:{type:"fit"},bodyStyle:"background : transparent",title:"Language List",border:true,columns:[{xtype:"rownumberer",width:"11%"},{text:"Name",dataIndex:"language_name",width:"70%"},{text:"Active?",dataIndex:"language_status",width:"17%",xtype:"checkcolumn",processEvent:function(){return false}}],tbar:[{fieldLabel:"Search",xtype:"textfield",enableKeyEvents:true,labelWidth:55,width:"100%",action:"search"}],bbar:["->",{text:"Refresh",xtype:"button",iconCls:"icon-arrow_refresh",action:"refresh"}]});