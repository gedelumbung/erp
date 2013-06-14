Ext.define("Ext.grid.feature.AbstractSummary",{extend:"Ext.grid.feature.Feature",alias:"feature.abstractsummary",summaryRowCls:Ext.baseCSSPrefix+"grid-row-summary",summaryRowSelector:"."+Ext.baseCSSPrefix+"grid-row-summary",summaryRowTpl:{before:function(a,b){if(a.record.isSummary){this.summaryFeature.outputSummaryRecord(a.record,a,b);return false}},priority:1000},showSummaryRow:true,init:function(){var a=this;a.view.summaryFeature=a;a.rowTpl=a.view.self.prototype.rowTpl;a.view.addRowTpl(a.summaryRowTpl).summaryFeature=a},toggleSummaryRow:function(a){this.showSummaryRow=!!a},outputSummaryRecord:function(f,k,d){var g=k.view,a=g.rowValues,c=k.columns||g.headerCt.getGridColumns(),j=c.length,e,b,h={view:g,record:f,rowStyle:"",rowClasses:[this.summaryRowCls],itemClasses:[],recordIndex:-1,rowId:g.id+"-record-"+f.internalId,columns:c,visibleColumns:k.visibleColumns||g.headerCt.getVisibleGridColumns()};for(e=0;e<j;e++){b=c[e];b.savedRenderer=b.renderer;if(b.summaryRenderer){b.renderer=b.summaryRenderer}else{if(!b.summaryType){b.renderer=Ext.emptyFn}}if(!b.dataIndex){b.dataIndex=b.id}}g.rowValues=h;g.self.prototype.rowTpl.applyOut(h,d);g.rowValues=a;for(e=0;e<j;e++){b=c[e];b.renderer=b.savedRenderer;b.savedRenderer=null}},getSummary:function(b,c,e,d){var a=d.records;if(c){if(Ext.isFunction(c)){return b.getAggregate(c,null,a,[e])}switch(c){case"count":return a.length;case"min":return b.getMin(a,e);case"max":return b.getMax(a,e);case"sum":return b.getSum(a,e);case"average":return b.getAverage(a,e);default:return""}}},generateSummaryData:function(){var k=this,n=k.view.store,c=n.groups.items,g=n.proxy.reader,h=c.length,a=k.getGroupField(),e={},j=k.lockingPartner,d,o,f,l,q,b,p,m;if(k.remoteRoot&&g.rawData){b=true;m={};l=g.root;g.root=k.remoteRoot;g.buildExtractors(true);q=g.getRoot(g.rawData);h=q.length;if(!g.convertRecordData){g.buildExtractors()}for(d=0;d<h;++d){p={};g.convertRecordData(p,q[d]);m[p[a]]=p}g.root=l;g.buildExtractors(true)}for(d=0;d<h;++d){o=c[d];if(b||o.isDirty()||!o.hasAggregate()){if(b){f=k.populateRemoteRecord(o,m)}else{f=k.populateRecord(o)}o.commit()}else{f=o.getAggregateRecord();if(j&&!f.hasPartnerData){k.populateRecord(o);f.hasPartnerData=true}}e[o.key]=f}return e},populateRemoteRecord:function(f,d){var c=this,a=f.getAggregateRecord(true),b=d[f.key],e;a.beginEdit();for(e in b){if(b.hasOwnProperty(e)){a.set(e,b[e])}}a.endEdit(true);a.commit(true);return a},populateRecord:function(j){var f=this,g=f.view,h=g.store,d=j.getAggregateRecord(),b=g.headerCt.getGridColumns(),e=b.length,c,a,k;d.beginEdit();for(c=0;c<e;++c){a=b[c];k=a.dataIndex||a.id;d.set(k,f.getSummary(h,a.summaryType,k,j))}d.endEdit(true);d.commit();return d}});