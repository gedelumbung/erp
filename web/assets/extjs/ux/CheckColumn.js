Ext.define("Ext.ux.CheckColumn",{extend:"Ext.grid.column.Column",alias:"widget.checkcolumn",stopSelection:true,tdCls:Ext.baseCSSPrefix+"grid-cell-checkcolumn",constructor:function(){this.addEvents("beforecheckchange","checkchange");this.callParent(arguments)},processEvent:function(g,i,m,b,h,d,c,n){var f=this,l=g==="keydown"&&d.getKey(),a=g=="mousedown";if(a||(l==d.ENTER||l==d.SPACE)){var j=f.dataIndex,k=!c.get(j);if(f.fireEvent("beforecheckchange",f,b,k)!==false){c.set(j,k);f.fireEvent("checkchange",f,b,k);if(a){d.stopEvent()}if(!f.stopSelection){i.selModel.selectByPosition({row:b,column:h})}return false}else{return !f.stopSelection}}else{return f.callParent(arguments)}},renderer:function(b){var c=Ext.baseCSSPrefix,a=[c+"grid-checkheader"];if(b){a.push(c+"grid-checkheader-checked")}return'<div class="'+a.join(" ")+'">&#160;</div>'}});