Ext.define("GatotKacaErp.module.GeneralSetup.store.District",{extend:"GatotKacaErp.store.Base",model:"GatotKacaErp.model.District",primary:"district_id",initial:"district_name",proxy:{type:"ajax",api:{read:BASE_URL+"district/getlist",destroy:BASE_URL+"district/delete"},actionMethods:{read:"POST"},extraParams:{status:"all"},reader:{type:"json",root:"data",successProperty:"success",totalProperty:"total"},writer:{type:"json",writeAllFields:true,root:"data",encode:true}}});