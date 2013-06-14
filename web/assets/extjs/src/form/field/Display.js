Ext.define("Ext.form.field.Display",{extend:"Ext.form.field.Base",alias:"widget.displayfield",requires:["Ext.util.Format","Ext.XTemplate"],alternateClassName:["Ext.form.DisplayField","Ext.form.Display"],fieldSubTpl:['<div id="{id}"','<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>',' class="{fieldCls}">{value}</div>',{compiled:true,disableFormats:true}],fieldCls:Ext.baseCSSPrefix+"form-display-field",htmlEncode:false,validateOnChange:false,initEvents:Ext.emptyFn,submitValue:false,isDirty:function(){return false},isValid:function(){return true},validate:function(){return true},getRawValue:function(){return this.rawValue},setRawValue:function(b){var a=this,c;b=Ext.value(b,"");a.rawValue=b;if(a.rendered){a.inputEl.dom.innerHTML=a.getDisplayValue();a.updateLayout()}return b},getDisplayValue:function(){var a=this,b=this.getRawValue(),c;if(a.renderer){c=a.renderer.call(a.scope||a,b,a)}else{c=a.htmlEncode?Ext.util.Format.htmlEncode(b):b}return c},getSubTplData:function(){var a=this.callParent(arguments);a.value=this.getDisplayValue();return a}});