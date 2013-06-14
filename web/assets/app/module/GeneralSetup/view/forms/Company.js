Ext.define("GatotKacaErp.module.GeneralSetup.view.forms.Company",{extend:"Ext.form.Panel",requires:["GatotKacaErp.module.GeneralSetup.view.grids.Division"],alias:"widget.formcompany",id:"formcompany",border:true,autoHeight:true,layout:{type:"vbox",align:"stretch"},title:"Company Detail",bodyStyle:"padding: 5px; background : transparent;",labelWidth:55,width:"100%",items:[{name:"company_id",xtype:"hidden"},{xtype:"fieldset",title:"Company Information",defaults:{fieldAlign:"left",anchor:"100%",layout:{type:"hbox"}},items:[{xtype:"fieldcontainer",fieldLabel:"Description",combineErrors:true,hideLabel:true,beforeLabelTextTpl:REQUIRED,msgTarget:"side",layout:{type:"hbox"},defaults:{flex:1,hideLabel:false,labelWidth:77},items:[{fieldLabel:"Code",xtype:"textfield",beforeLabelTextTpl:REQUIRED,emptyText:"XX",allowBlank:false,name:"company_code",margins:"0px 5px 0px 0px"},{fieldLabel:"Parent",emptyText:"Parent Company",store:"GatotKacaErp.store.Company",name:"parent_company",displayField:"company_name",valueField:"company_id",xtype:"combo",queryMode:"local",editable:false,flex:4,action:"company"}]},{xtype:"fieldcontainer",fieldLabel:"Description",combineErrors:true,hideLabel:true,beforeLabelTextTpl:REQUIRED,msgTarget:"side",layout:{type:"hbox"},defaults:{flex:1,hideLabel:false,beforeLabelTextTpl:REQUIRED,allowBlank:false,labelWidth:77},items:[{fieldLabel:"Status",xtype:"checkboxfield",name:"company_status",checked:true,margins:"0px 5px 0px 0px"},{fieldLabel:"Name",xtype:"textfield",emptyText:"Company Name",flex:4,name:"company_name"}]},{xtype:"fieldcontainer",fieldLabel:"Workday Setting",combineErrors:true,hideLabel:true,beforeLabelTextTpl:REQUIRED,msgTarget:"side",layout:{type:"hbox"},defaults:{flex:1,hideLabel:false,allowBlank:false,beforeLabelTextTpl:REQUIRED,labelWidth:77},items:[{fieldLabel:"Fixed",xtype:"checkboxfield",name:"company_isfixed",checked:true,margins:"0px 5px 0px 0px"},{fieldLabel:"Start",emptyText:"Workday Start",store:"GatotKacaErp.store.Day",name:"workday_start",displayField:"day_name",valueField:"day_id",xtype:"combo",queryMode:"local",flex:2,editable:false,margins:"0px 5px 0px 0px"},{fieldLabel:"End",emptyText:"Workday End",store:"GatotKacaErp.store.Day",name:"workday_end",displayField:"day_name",valueField:"day_id",xtype:"combo",queryMode:"local",flex:2,editable:false}]}]},{xtype:"griddivision",flex:2}],tbar:[{text:"Save",iconCls:"icon-disk",action:"save"},{text:"Reset",iconCls:"icon-error",action:"reset"}]});