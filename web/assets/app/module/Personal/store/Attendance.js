Ext.define("GatotKacaErp.module.Personal.store.Attendance",{extend:"GatotKacaErp.store.Base",model:"GatotKacaErp.module.HumanResources.model.AttendanceDetail",proxy:{type:"ajax",api:{read:BASE_URL+"human_resources/attendance/getbyemployee"},actionMethods:{read:"POST"},reader:{type:"json",root:"data",successProperty:"success",totalProperty:"total"},writer:{type:"json",writeAllFields:true,root:"data",encode:true}}});