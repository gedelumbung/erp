Ext.define("GatotKacaErp.module.HumanResources.store.CareerHistory",{extend:"GatotKacaErp.store.Base",model:"GatotKacaErp.module.HumanResources.model.CareerHistory",primary:"career_id",initial:"career_refno",proxy:{type:"ajax",api:{read:BASE_URL+"human_resources/employee/getcareer",destroy:BASE_URL+"human_resources/employee/deletecareer"},actionMethods:{read:"POST"},reader:{type:"json",root:"data",successProperty:"success",totalProperty:"total"},writer:{type:"json",writeAllFields:true,root:"data",encode:true}}});