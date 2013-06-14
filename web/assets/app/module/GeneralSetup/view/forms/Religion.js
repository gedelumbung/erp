Ext.define("GatotKacaErp.module.GeneralSetup.view.forms.Religion",{extend:"Ext.form.Panel",alias:"widget.formreligion",id:"formreligion",border:true,autoHeight:true,title:"Religion Detail",bodyStyle:"padding: 5px; background : transparent;",labelWidth:55,width:"100%",items:[{name:"religion_id",xtype:"hidden"},{xtype:"fieldset",title:"Religion Information",defaults:{fieldAlign:"left",anchor:"100%"},items:[{fieldLabel:"Name",xtype:"textfield",emptyText:"Religion Name",flex:2,name:"religion_name"}]}],tbar:[{text:"Save",iconCls:"icon-disk",action:"save"},{text:"Reset",iconCls:"icon-error",action:"reset"}]});