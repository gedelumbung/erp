Ext.define("GatotKacaErp.module.Utilities.store.UserRole",{extend:"GatotKacaErp.store.Base",model:"GatotKacaErp.module.Utilities.model.UserRole",proxy:{type:"ajax",api:{read:BASE_URL+"utilities/role/getlist"},actionMethods:{read:"POST"},reader:{type:"json",root:"data",successProperty:"success",totalProperty:"total"},writer:{type:"json",writeAllFields:true,root:"data",encode:true}}});