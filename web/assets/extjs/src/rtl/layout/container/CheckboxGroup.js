Ext.define("Ext.rtl.layout.container.CheckboxGroup",{override:"Ext.layout.container.CheckboxGroup",finishedLayout:function(){var a=this.owner;if((Ext.isIE6||Ext.isIE7||Ext.isIEQuirks)&&a.getHierarchyState().rtl){this.innerCt.select("."+a.groupCls).repaint()}}});