Ext.dom.Element.override({initDD:function(c,b,d){var a=new Ext.dd.DD(Ext.id(this.dom),c,b);return Ext.apply(a,d)},initDDProxy:function(c,b,d){var a=new Ext.dd.DDProxy(Ext.id(this.dom),c,b);return Ext.apply(a,d)},initDDTarget:function(c,b,d){var a=new Ext.dd.DDTarget(Ext.id(this.dom),c,b);return Ext.apply(a,d)}});