Ext.define("Ext.view.DragZone",{extend:"Ext.dd.DragZone",containerScroll:false,constructor:function(b){var e=this,a,d,c;Ext.apply(e,b);if(!e.ddGroup){e.ddGroup="view-dd-zone-"+e.view.id}a=e.view;d=a.ownerCt;if(d){c=d.getTargetEl().dom}else{c=a.el.dom.parentNode}e.callParent([c]);e.ddel=Ext.get(document.createElement("div"));e.ddel.addCls(Ext.baseCSSPrefix+"grid-dd-wrap")},init:function(c,a,b){this.initTarget(c,a,b);this.view.mon(this.view,{itemmousedown:this.onItemMouseDown,scope:this})},onValidDrop:function(b,a,c){this.callParent();b.el.focus()},onItemMouseDown:function(b,a,d,c,f){if(!this.isPreventDrag(f,a,d,c)){this.view.focus();this.handleMouseDown(f);if(b.getSelectionModel().selectionMode=="MULTI"&&!f.ctrlKey&&b.getSelectionModel().isSelected(a)){return false}}},isPreventDrag:function(a){return false},getDragData:function(c){var a=this.view,b=c.getTarget(a.getItemSelector());if(b){return{copy:a.copy||(a.allowCopy&&c.ctrlKey),event:new Ext.EventObjectImpl(c),view:a,ddel:this.ddel,item:b,records:a.getSelectionModel().getSelection(),fromPosition:Ext.fly(b).getXY()}}},onInitDrag:function(b,g){var e=this,f=e.dragData,d=f.view,a=d.getSelectionModel(),c=d.getRecord(f.item);if(!a.isSelected(c)){a.select(c,true)}f.records=a.getSelection();e.ddel.update(e.getDragText());e.proxy.update(e.ddel.dom);e.onStartDrag(b,g);return true},getDragText:function(){var a=this.dragData.records.length;return Ext.String.format(this.dragText,a,a==1?"":"s")},getRepairXY:function(b,a){return a?a.fromPosition:false}});