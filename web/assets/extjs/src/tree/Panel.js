Ext.define("Ext.tree.Panel",{extend:"Ext.panel.Table",alias:"widget.treepanel",alternateClassName:["Ext.tree.TreePanel","Ext.TreePanel"],requires:["Ext.tree.View","Ext.selection.TreeModel","Ext.tree.Column","Ext.data.TreeStore"],viewType:"treeview",selType:"treemodel",treeCls:Ext.baseCSSPrefix+"tree-panel",deferRowRender:false,rowLines:false,lines:true,useArrows:false,singleExpand:false,ddConfig:{enableDrag:true,enableDrop:true},rootVisible:true,displayField:"text",root:null,normalCfgCopy:["displayField","root","singleExpand","useArrows","lines","rootVisible","scroll"],lockedCfgCopy:["displayField","root","singleExpand","useArrows","lines","rootVisible"],isTree:true,arrowCls:Ext.baseCSSPrefix+"tree-arrows",linesCls:Ext.baseCSSPrefix+"tree-lines",noLinesCls:Ext.baseCSSPrefix+"tree-no-lines",autoWidthCls:Ext.baseCSSPrefix+"autowidth-table",constructor:function(a){a=a||{};if(a.animate===undefined){a.animate=Ext.isDefined(this.animate)?this.animate:Ext.enableFx}this.enableAnimations=a.animate;delete a.animate;this.callParent([a])},initComponent:function(){var d=this,b=[d.treeCls],c=d.store,a;if(d.useArrows){b.push(d.arrowCls);d.lines=false}if(d.lines){b.push(d.linesCls)}else{if(!d.useArrows){b.push(d.noLinesCls)}}if(Ext.isString(c)){c=d.store=Ext.StoreMgr.lookup(c)}else{if(!c||Ext.isObject(c)&&!c.isStore){c=d.store=new Ext.data.TreeStore(Ext.apply({root:d.root,fields:d.fields,model:d.model,folderSort:d.folderSort},c))}else{if(d.root){c=d.store=Ext.data.StoreManager.lookup(c);c.setRootNode(d.root);if(d.folderSort!==undefined){c.folderSort=d.folderSort;c.sort()}}}}d.viewConfig=Ext.apply({rootVisible:d.rootVisible,animate:d.enableAnimations,singleExpand:d.singleExpand,node:c.getRootNode(),hideHeaders:d.hideHeaders},d.viewConfig);if(!d.columns){if(d.initialConfig.hideHeaders===undefined){d.hideHeaders=true}d.addCls(d.autoWidthCls);d.columns=[{xtype:"treecolumn",text:"Name",width:Ext.isIE6?"100%":10000,dataIndex:d.displayField}]}if(d.cls){b.push(d.cls)}d.cls=b.join(" ");d.callParent();a=d.getView();d.relayEvents(a,["checkchange","afteritemexpand","afteritemcollapse"]);if(!a.rootVisible&&!d.getRootNode()){d.setRootNode({expanded:true})}},bindStore:function(a){var b=this;b.store=a;b.mon(a,{load:b.onStoreLoad,rootchange:b.onRootChange,clear:b.onClear,scope:b});b.relayEvents(a,["beforeload","load"]);b.mon(a,{append:b.createRelayer("itemappend"),remove:b.createRelayer("itemremove"),move:b.createRelayer("itemmove",[0,4]),insert:b.createRelayer("iteminsert"),beforeappend:b.createRelayer("beforeitemappend"),beforeremove:b.createRelayer("beforeitemremove"),beforemove:b.createRelayer("beforeitemmove"),beforeinsert:b.createRelayer("beforeiteminsert"),expand:b.createRelayer("itemexpand",[0,1]),collapse:b.createRelayer("itemcollapse",[0,1]),beforeexpand:b.createRelayer("beforeitemexpand",[0,1]),beforecollapse:b.createRelayer("beforeitemcollapse",[0,1])});a.ownerTree=b},unbindStore:function(){var b=this,a=b.store;if(a){b.mun(a,{load:b.onStoreLoad,rootchange:b.onRootChange,clear:b.onClear,scope:b});delete a.ownerTree}},onClear:function(){this.view.onClear()},setRootNode:function(){return this.store.setRootNode.apply(this.store,arguments)},getRootNode:function(){return this.store.getRootNode()},onRootChange:function(a){this.view.setRootNode(a)},getChecked:function(){return this.getView().getChecked()},isItemChecked:function(a){return a.get("checked")},expandNode:function(b,a,d,c){return this.getView().expand(b,a,d,c||this)},collapseNode:function(b,a,d,c){return this.getView().collapse(b,a,d,c||this)},expandAll:function(f,d){var e=this,b=e.getRootNode(),c=e.enableAnimations,a=e.getView();if(b){if(!c){a.beginBulkUpdate()}b.expand(true,f,d||e);if(!c){a.endBulkUpdate()}}},collapseAll:function(f,d){var e=this,b=e.getRootNode(),c=e.enableAnimations,a=e.getView();if(b){if(!c){a.beginBulkUpdate()}d=d||e;if(a.rootVisible){b.collapse(true,f,d)}else{b.collapseChildren(true,f,d)}if(!c){a.endBulkUpdate()}}},expandPath:function(k,f,a,g,j){var d=this,c=d.getRootNode(),b=1,e=d.getView(),i,h;f=f||d.getRootNode().idProperty;a=a||"/";if(Ext.isEmpty(k)){Ext.callback(g,j||d,[false,null]);return}i=k.split(a);if(c.get(f)!=i[1]){Ext.callback(g,j||d,[false,c]);return}h=function(){if(++b===i.length){Ext.callback(g,j||d,[true,c]);return}var l=c.findChild(f,i[b]);if(!l){Ext.callback(g,j||d,[false,c]);return}c=l;c.expand(false,h)};c.expand(false,h)},selectPath:function(i,d,a,f,h){var b=this,c,g,e;d=d||b.getRootNode().idProperty;a=a||"/";g=i.split(a);e=g.pop();if(g.length>1){b.expandPath(g.join(a),d,a,function(l,k){var j=k;if(l&&k){k=k.findChild(d,e);if(k){b.getSelectionModel().select(k);Ext.callback(f,h||b,[true,k]);return}}Ext.callback(f,h||b,[false,j])},b)}else{c=b.getRootNode();if(c.getId()===e){b.getSelectionModel().select(c);Ext.callback(f,h||b,[true,c])}else{Ext.callback(f,h||b,[false,null])}}}});