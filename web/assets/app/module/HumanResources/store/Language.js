Ext.define("GatotKacaErp.module.HumanResources.store.Language",{extend:"GatotKacaErp.store.Base",model:"GatotKacaErp.module.HumanResources.model.Language",primary:"language_id",initial:"language_lname",proxy:{type:"ajax",api:{read:BASE_URL+"human_resources/employee/getlanguage",destroy:BASE_URL+"human_resources/employee/deletelanguage"},actionMethods:{read:"POST"},reader:{type:"json",root:"data",successProperty:"success",totalProperty:"total"},writer:{type:"json",writeAllFields:true,root:"data",encode:true}}});