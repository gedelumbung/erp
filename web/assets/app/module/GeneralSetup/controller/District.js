Ext.define("GatotKacaErp.module.GeneralSetup.controller.District",{extend:"GatotKacaErp.controller.Base",views:["GatotKacaErp.module.GeneralSetup.view.District"],store:"GatotKacaErp.module.GeneralSetup.store.District",fmSelector:"formdistrict",init:function(){var b=this;var a=b.getStore(b.store);b.getStore("GatotKacaErp.module.GeneralSetup.store.District");b.getStore("GatotKacaErp.store.Country");b.getStore("GatotKacaErp.store.Province");a.addListener("load",b.onStoreLoad,b);b.loadStore(a);b.control({"formdistrict button[action=reset]":{click:b.resetForm},"formdistrict button[action=save]":{click:b.save},"griddistrict  button[action=refresh]":{click:b.reloadStore},"griddistrict textfield[action=search]":{keypress:b.search},griddistrict:{itemclick:b.viewDetail,itemcontextmenu:b.showContextMenu}});b.callParent(arguments)},reloadStore:function(){this.loadStore(this.store)},search:function(d,a,c){var b=this;if(a.ENTER==a.getKey()){b.loadStore(b.store,{query:d.getValue()})}},viewDetail:function(d,c,h,a,b,g){var f=this;var e=f.getForm(f.fmSelector);f.ajaxRequest(BASE_URL+"district/getbyid",{district_id:c.data.district_id},function(i){e.setValues(i.data[0]);f.loadStore("GatotKacaErp.store.Country",{query:c.data.country_name},function(){e.findField("district_country").setValue(i.data[0].country_id)});f.loadStore("GatotKacaErp.store.Province",{country_id:c.data.country_id},function(){e.findField("district_province").setValue(i.data[0].province_id)})})},save:function(b,a,e){var d=this;var c=b.up("form").getForm();if(c.isValid()){d.ajaxRequest(BASE_URL+"district/save",{district:Ext.JSON.encode(c.getValues())},function(f){d.showMessage({title:"SERVER MESSAGE",msg:f.msg,icon:Ext.MessageBox.INFO,buttons:Ext.MessageBox.OK});d.getStore(d.store).removeAll();d.reloadStore();d.resetForm()})}else{d.showMessage({title:"ERROR MESSAGE",msg:"Form is not valid",icon:Ext.MessageBox.WARNING,buttons:Ext.MessageBox.OK})}},resetForm:function(){var a=this.getForm(this.fmSelector);a.reset()}});