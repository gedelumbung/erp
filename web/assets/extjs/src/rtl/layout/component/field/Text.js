Ext.define("Ext.rtl.layout.component.field.Text",{override:"Ext.layout.component.field.Text",adjustIEInputPadding:function(b){var a=this.owner;a.bodyEl.setStyle(a.getHierarchyState().rtl?"padding-left":"padding-right",this.ieInputWidthAdjustment+"px")}});