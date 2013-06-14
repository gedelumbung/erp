Ext.define("Ext.chart.Chart",{alias:"widget.chart",extend:"Ext.draw.Component",mixins:{themeManager:"Ext.chart.theme.Theme",mask:"Ext.chart.Mask",navigation:"Ext.chart.Navigation",bindable:"Ext.util.Bindable",observable:"Ext.util.Observable"},uses:["Ext.chart.series.Series"],requires:["Ext.util.MixedCollection","Ext.data.StoreManager","Ext.chart.Legend","Ext.chart.theme.Base","Ext.chart.theme.Theme","Ext.util.DelayedTask"],viewBox:false,animate:false,legend:false,insetPadding:10,background:false,constructor:function(b){var c=this,a;b=Ext.apply({},b);c.initTheme(b.theme||c.theme);if(c.gradients){Ext.apply(b,{gradients:c.gradients})}if(c.background){Ext.apply(b,{background:c.background})}if(b.animate){a={easing:"ease",duration:500};if(Ext.isObject(b.animate)){b.animate=Ext.applyIf(b.animate,a)}else{b.animate=a}}c.mixins.observable.constructor.call(c,b);if(b.enableMask){c.mixins.mask.constructor.call(c)}c.mixins.navigation.constructor.call(c);c.callParent([b])},getChartStore:function(){return this.substore||this.store},initComponent:function(){var b=this,c,a;b.callParent();b.addEvents("itemmousedown","itemmouseup","itemmouseover","itemmouseout","itemclick","itemdblclick","itemdragstart","itemdrag","itemdragend","beforerefresh","refresh");Ext.applyIf(b,{zoom:{width:1,height:1,x:0,y:0}});b.maxGutters={left:0,right:0,bottom:0,top:0};b.store=Ext.data.StoreManager.lookup(b.store);c=b.axes;b.axes=new Ext.util.MixedCollection(false,function(d){return d.position});if(c){b.axes.addAll(c)}a=b.series;b.series=new Ext.util.MixedCollection(false,function(d){return d.seriesId||(d.seriesId=Ext.id(null,"ext-chart-series-"))});if(a){b.series.addAll(a)}if(b.legend!==false){b.legend=new Ext.chart.Legend(Ext.applyIf({chart:b},b.legend))}b.on({mousemove:b.onMouseMove,mouseleave:b.onMouseLeave,mousedown:b.onMouseDown,mouseup:b.onMouseUp,click:b.onClick,dblclick:b.onDblClick,scope:b})},afterComponentLayout:function(c,a,b,e){var d=this;if(Ext.isNumber(c)&&Ext.isNumber(a)){if(c!==b||a!==e){d.curWidth=c;d.curHeight=a;d.redraw(true);d.needsRedraw=false}else{if(d.needsRedraw){d.redraw();d.needsRedraw=false}}}this.callParent(arguments)},redraw:function(c){var j=this,h=j.series.items,f=h.length,b=j.axes.items,d=b.length,a=0,g,m,l=j.chartBBox={x:0,y:0,height:j.curHeight,width:j.curWidth},k=j.legend,e;j.surface.setSize(l.width,l.height);for(g=0;g<f;g++){m=h[g];if(!m.initialized){e=j.initializeSeries(m,g,a)}else{e=m}e.onRedraw();if(Ext.isArray(m.yField)){a+=m.yField.length}else{++a}}for(g=0;g<d;g++){m=b[g];if(!m.initialized){j.initializeAxis(m)}}for(g=0;g<d;g++){b[g].processView()}for(g=0;g<d;g++){b[g].drawAxis(true)}if(k!==false&&k.visible){if(k.update||!k.created){k.create()}}j.alignAxes();if(k!==false&&k.visible){k.updatePosition()}j.getMaxGutters();j.resizing=!!c;for(g=0;g<d;g++){b[g].drawAxis()}for(g=0;g<f;g++){j.drawCharts(h[g])}j.resizing=false},afterRender:function(){var a=this;a.callParent(arguments);if(a.categoryNames){a.setCategoryNames(a.categoryNames)}a.bindStore(a.store,true);a.refresh();if(a.surface.engine==="Vml"){a.on("added",a.onAddedVml,a);a.mon(a.hierarchyEventSource,"added",a.onContainerAddedVml,a)}},onAddedVml:function(){this.needsRedraw=true},onContainerAddedVml:function(a){if(this.isDescendantOf(a)){this.needsRedraw=true}},getEventXY:function(d){var c=this,b=this.surface.getRegion(),g=d.getXY(),a=g[0]-b.left,f=g[1]-b.top;return[a,f]},onClick:function(a){this.handleClick("itemclick",a)},onDblClick:function(a){this.handleClick("itemdblclick",a)},handleClick:function(a,g){var j=this,f=j.getEventXY(g),d=j.series.items,b,h,c,k;for(b=0,h=d.length;b<h;b++){c=d[b];if(Ext.draw.Draw.withinBox(f[0],f[1],c.bbox)){if(c.getItemForPoint){k=c.getItemForPoint(f[0],f[1]);if(k){c.fireEvent(a,k)}}}}},onMouseDown:function(j){var h=this,a=h.getEventXY(j),b=h.series.items,d,g,c,f;if(h.enableMask){h.mixins.mask.onMouseDown.call(h,j)}for(d=0,g=b.length;d<g;d++){c=b[d];if(Ext.draw.Draw.withinBox(a[0],a[1],c.bbox)){if(c.getItemForPoint){f=c.getItemForPoint(a[0],a[1]);if(f){c.fireEvent("itemmousedown",f)}}}}},onMouseUp:function(j){var h=this,a=h.getEventXY(j),b=h.series.items,d,g,c,f;if(h.enableMask){h.mixins.mask.onMouseUp.call(h,j)}for(d=0,g=b.length;d<g;d++){c=b[d];if(Ext.draw.Draw.withinBox(a[0],a[1],c.bbox)){if(c.getItemForPoint){f=c.getItemForPoint(a[0],a[1]);if(f){c.fireEvent("itemmouseup",f)}}}}},onMouseMove:function(g){var j=this,d=j.getEventXY(g),c=j.series.items,a,h,b,m,k,f,l;if(j.enableMask){j.mixins.mask.onMouseMove.call(j,g)}for(a=0,h=c.length;a<h;a++){b=c[a];if(Ext.draw.Draw.withinBox(d[0],d[1],b.bbox)){if(b.getItemForPoint){m=b.getItemForPoint(d[0],d[1]);k=b._lastItemForPoint;f=b._lastStoreItem;l=b._lastStoreField;if(m!==k||m&&(m.storeItem!=f||m.storeField!=l)){if(k){b.fireEvent("itemmouseout",k);delete b._lastItemForPoint;delete b._lastStoreField;delete b._lastStoreItem}if(m){b.fireEvent("itemmouseover",m);b._lastItemForPoint=m;b._lastStoreItem=m.storeItem;b._lastStoreField=m.storeField}}}}else{k=b._lastItemForPoint;if(k){b.fireEvent("itemmouseout",k);delete b._lastItemForPoint;delete b._lastStoreField;delete b._lastStoreItem}}}},onMouseLeave:function(g){var f=this,a=f.series.items,c,d,b;if(f.enableMask){f.mixins.mask.onMouseLeave.call(f,g)}for(c=0,d=a.length;c<d;c++){b=a[c];delete b._lastItemForPoint}},delayRefresh:function(){var a=this;if(!a.refreshTask){a.refreshTask=new Ext.util.DelayedTask(a.refresh,a)}a.refreshTask.delay(a.refreshBuffer)},refresh:function(){var a=this;if(a.rendered&&a.curWidth!==undefined&&a.curHeight!==undefined){if(!a.isVisible(true)){if(!a.refreshPending){a.setShowListeners("mon");a.refreshPending=true}return}if(a.fireEvent("beforerefresh",a)!==false){a.redraw();a.fireEvent("refresh",a)}}},onShow:function(){var a=this;a.callParent(arguments);if(a.refreshPending){a.delayRefresh();a.setShowListeners("mun")}delete a.refreshPending},setShowListeners:function(b){var a=this;a[b](a.hierarchyEventSource,{scope:a,single:true,show:a.forceRefresh,expand:a.forceRefresh})},doRefresh:function(){this.setSubStore(null);this.refresh()},forceRefresh:function(a){var b=this;if(b.isDescendantOf(a)&&b.refreshPending){b.setShowListeners("mun");b.delayRefresh()}delete b.refreshPending},bindStore:function(a,b){var c=this;c.mixins.bindable.bindStore.apply(c,arguments);if(c.store&&!b){c.refresh()}},getStoreListeners:function(){var b=this.doRefresh,a=this.delayRefresh;return{refresh:b,add:a,bulkremove:a,update:a,clear:b}},setSubStore:function(a){this.substore=a},initializeAxis:function(b){var e=this,j=e.chartBBox,i=j.width,d=j.height,g=j.x,f=j.y,c=e.themeAttrs,a={chart:e};if(c){a.axisStyle=Ext.apply({},c.axis);a.axisLabelLeftStyle=Ext.apply({},c.axisLabelLeft);a.axisLabelRightStyle=Ext.apply({},c.axisLabelRight);a.axisLabelTopStyle=Ext.apply({},c.axisLabelTop);a.axisLabelBottomStyle=Ext.apply({},c.axisLabelBottom);a.axisTitleLeftStyle=Ext.apply({},c.axisTitleLeft);a.axisTitleRightStyle=Ext.apply({},c.axisTitleRight);a.axisTitleTopStyle=Ext.apply({},c.axisTitleTop);a.axisTitleBottomStyle=Ext.apply({},c.axisTitleBottom)}switch(b.position){case"top":Ext.apply(a,{length:i,width:d,x:g,y:f});break;case"bottom":Ext.apply(a,{length:i,width:d,x:g,y:d});break;case"left":Ext.apply(a,{length:d,width:i,x:g,y:d});break;case"right":Ext.apply(a,{length:d,width:i,x:i,y:d});break}if(!b.chart){Ext.apply(a,b);b=e.axes.replace(Ext.createByAlias("axis."+b.type.toLowerCase(),a))}else{Ext.apply(b,a)}b.initialized=true},alignAxes:function(){var k=this,j=k.axes,a=j.items,e,o=k.legend,f=["top","right","bottom","left"],b,g,h,q,n=k.insetPadding,d={top:n,right:n,bottom:n,left:n},m,p,l;function c(s){var r=j.findIndex("position",s);return(r<0)?null:j.getAt(r)}for(g=0,h=f.length;g<h;g++){b=f[g];m=(b==="left"||b==="right");e=c(b);if(o!==false){if(o.position===b){p=o.getBBox();d[b]+=(m?p.width:p.height)+d[b]}}if(e&&e.bbox){p=e.bbox;d[b]+=(m?p.width:p.height)}}q={x:d.left,y:d.top,width:k.curWidth-d.left-d.right,height:k.curHeight-d.top-d.bottom};k.chartBBox=q;for(g=0,h=a.length;g<h;g++){e=a[g];l=e.position;m=(l==="left"||l==="right");e.x=(l==="right"?q.x+q.width:q.x);e.y=(l==="top"?q.y:q.y+q.height);e.width=(m?q.width:q.height);e.length=(m?q.height:q.width)}},initializeSeries:function(j,m,a){var k=this,f=k.themeAttrs,e,g,o,q,p,n=[],c=(j instanceof Ext.chart.series.Series),h=0,d,b;if(!c){b={chart:k,seriesId:j.seriesId};if(f){o=f.seriesThemes;p=f.markerThemes;e=Ext.apply({},f.series);g=Ext.apply({},f.marker);b.seriesStyle=Ext.apply(e,o[a%o.length]);b.seriesLabelStyle=Ext.apply({},f.seriesLabel);b.markerStyle=Ext.apply(g,p[a%p.length]);if(f.colors){b.colorArrayStyle=f.colors}else{n=[];for(d=o.length;h<d;h++){q=o[h];if(q.fill||q.stroke){n.push(q.fill||q.stroke)}}if(n.length){b.colorArrayStyle=n}}b.seriesIdx=m;b.themeIdx=a}Ext.applyIf(b,j);j=k.series.replace(Ext.createByAlias("series."+j.type.toLowerCase(),b))}if(j.initialize){j.initialize()}j.initialized=true;return j},getMaxGutters:function(){var h=this,e=h.series.items,b,g,c,j,f=0,a=0,k=0,d=0;for(b=0,g=e.length;b<g;b++){j=e[b].getGutters();if(j){if(j.verticalAxis){k=Math.max(k,j.lower);d=Math.max(d,j.upper)}else{f=Math.max(f,j.lower);a=Math.max(a,j.upper)}}}h.maxGutters={left:f,right:a,bottom:k,top:d}},drawAxis:function(a){a.drawAxis()},drawCharts:function(a){a.triggerafterrender=false;a.drawSeries();if(!this.animate){a.fireEvent("afterrender")}},save:function(a){return Ext.draw.Surface.save(this.surface,a)},destroy:function(){Ext.destroy(this.surface);this.bindStore(null);this.callParent(arguments)}});