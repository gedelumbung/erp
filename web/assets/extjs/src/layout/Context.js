Ext.define("Ext.layout.Context",{requires:["Ext.util.Queue","Ext.layout.ContextItem","Ext.layout.Layout","Ext.fx.Anim","Ext.fx.Manager"],remainingLayouts:0,state:0,constructor:function(a){var b=this;Ext.apply(b,a);b.items={};b.layouts={};b.blockCount=0;b.cycleCount=0;b.flushCount=0;b.calcCount=0;b.animateQueue=b.newQueue();b.completionQueue=b.newQueue();b.finalizeQueue=b.newQueue();b.finishQueue=b.newQueue();b.flushQueue=b.newQueue();b.invalidateData={};b.layoutQueue=b.newQueue();b.invalidQueue=[];b.triggers={data:{},dom:{}}},callLayout:function(b,a){this.currentLayout=b;b[a](this.getCmp(b.owner))},cancelComponent:function(h,a,l){var o=this,g=h,j=!h.isComponent,b=j?g.length:1,d,c,n,m,f,r,p,q,s,e;for(d=0;d<b;++d){if(j){h=g[d]}if(l&&h.ownerCt){e=this.items[h.ownerCt.el.id];if(e){Ext.Array.remove(e.childItems,o.getCmp(h))}}if(!a){p=o.invalidQueue;n=p.length;if(n){o.invalidQueue=r=[];for(c=0;c<n;++c){q=p[c];s=q.item.target;if(s!=h&&!s.isDescendant(h)){r.push(q)}}}}f=h.componentLayout;o.cancelLayout(f);if(f.getLayoutItems){m=f.getLayoutItems();if(m.length){o.cancelComponent(m,true)}}if(h.isContainer&&!h.collapsed){f=h.layout;o.cancelLayout(f);m=f.getVisibleItems();if(m.length){o.cancelComponent(m,true)}}}},cancelLayout:function(b){var a=this;a.completionQueue.remove(b);a.finalizeQueue.remove(b);a.finishQueue.remove(b);a.layoutQueue.remove(b);if(b.running){a.layoutDone(b)}b.ownerContext=null},clearTriggers:function(f,g){var a=f.id,e=this.triggers[g?"dom":"data"],h=e&&e[a],b=(h&&h.length)||0,e,d,j,c;for(d=0;d<b;++d){c=h[d];j=c.item;e=g?j.domTriggers:j.triggers;delete e[c.prop][a]}},flush:function(){var d=this,a=d.flushQueue.clear(),c=a.length,b;if(c){++d.flushCount;for(b=0;b<c;++b){a[b].flush()}}},flushAnimations:function(){var d=this,b=d.animateQueue.clear(),a=b.length,c;if(a){for(c=0;c<a;c++){if(b[c].target.animate!==false){b[c].flushAnimations()}}Ext.fx.Manager.runner()}},flushInvalidates:function(){var g=this,a=g.invalidQueue,f=a&&a.length,b,e,d,c;g.invalidQueue=[];if(f){e=[];for(c=0;c<f;++c){b=(d=a[c]).item.target;if(!b.container.isDetachedBody){e.push(b);if(d.options){g.invalidateData[b.id]=d.options}}}g.invalidate(e,null)}},flushLayouts:function(g,a,c){var f=this,h=c?f[g].items:f[g].clear(),e=h.length,b,d;if(e){for(b=0;b<e;++b){d=h[b];if(!d.running){f.callLayout(d,a)}}f.currentLayout=null}},getCmp:function(a){return this.getItem(a,a.el)},getEl:function(b,a){var c=this.getItem(a,a);if(!c.parent){c.parent=b;if(b.children.length){b.children.push(c)}else{b.children=[c]}}return c},getItem:function(d,b){var e=b.id,a=this.items,c=a[e]||(a[e]=new Ext.layout.ContextItem({context:this,target:d,el:b}));return c},handleFailure:function(){var c=this.layouts,b,a;Ext.failedLayouts=(Ext.failedLayouts||0)+1;Ext.log("Layout run failed");for(a in c){b=c[a];if(c.hasOwnProperty(a)){b.running=false;b.ownerContext=null}}},invalidate:function(l,n){var p=this,m=!l.isComponent,e,c,a,g,k,q,o,b,h,j,f,d;for(g=0,b=m?l.length:1;g<b;++g){k=m?l[g]:l;if(k.rendered&&!k.hidden){q=p.getCmp(k);h=k.componentLayout;a=!h.ownerContext;j=(k.isContainer&&!k.collapsed)?k.layout:null;f=p.invalidateData[q.id];delete p.invalidateData[q.id];d=q.init(n,f);if(f){p.processInvalidate(f,q,"before")}if(h.beforeLayoutCycle){h.beforeLayoutCycle(q)}d=q.initContinue(d);e=c=true;if(h.getLayoutItems){h.renderChildren();o=h.getLayoutItems();if(o.length){p.invalidate(o,true)}}if(j){c=false;j.renderChildren();o=j.getVisibleItems();if(o.length){p.invalidate(o,true);e=false}}q.initDone(e,c);p.resetLayout(h,q,a);if(j){p.resetLayout(j,q,a)}q.initAnimation();if(f){p.processInvalidate(f,q,"after")}}}p.currentLayout=null},layoutDone:function(a){var b=a.ownerContext;a.running=false;if(a.isComponentLayout){if(b.measuresBox){b.onBoxMeasured()}b.setProp("done",true)}else{b.setProp("containerLayoutDone",true)}--this.remainingLayouts;++this.progressCount},newQueue:function(){return new Ext.util.Queue()},processInvalidate:function(b,e,a){if(b[a]){var d=this,c=d.currentLayout;d.currentLayout=b.layout||null;b[a](e,b);d.currentLayout=c}},queueAnimation:function(a){this.animateQueue.add(a)},queueCompletion:function(a){this.completionQueue.add(a)},queueFinalize:function(a){this.finalizeQueue.add(a)},queueFlush:function(a){this.flushQueue.add(a)},chainFns:function(a,h,f){var d=this,c=a.layout,e=h.layout,b=a[f],g=h[f];return function(i){var j=d.currentLayout;if(b){d.currentLayout=c;b.call(a.scope||a,i,a)}d.currentLayout=e;g.call(h.scope||h,i,h);d.currentLayout=j}},queueInvalidate:function(j,k){var g=this,i=[],h=g.invalidQueue,f=h.length,d,b,e,a,c;if(j.isComponent){j=g.getCmp(d=j)}else{d=j.target}j.invalid=true;while(f--){b=h[f];e=b.item.target;if(d.isDescendant(e)){return}if(e==d){if(!(a=b.options)){b.options=k}else{if(k){if(k.widthModel){a.widthModel=k.widthModel}if(k.heightModel){a.heightModel=k.heightModel}if(!(c=a.state)){a.state=k.state}else{if(k.state){Ext.apply(c,k.state)}}if(k.before){a.before=g.chainFns(a,k,"before")}if(k.after){a.after=g.chainFns(a,k,"after")}}}return}if(!e.isDescendant(d)){i.push(b)}}i.push({item:j,options:k});g.invalidQueue=i},queueItemLayouts:function(c){var a=c.isComponent?c:c.target,b=a.componentLayout;if(!b.pending&&!b.invalid&&!b.done){this.queueLayout(b)}b=a.layout;if(b&&!b.pending&&!b.invalid&&!b.done){this.queueLayout(b)}},queueLayout:function(a){this.layoutQueue.add(a);a.pending=true},removeEl:function(d,c){var e=c.id,b=d.children,a=this.items;if(b){Ext.Array.remove(b,a[e])}delete a[e]},resetLayout:function(b,c,d){var a=this;a.currentLayout=b;b.done=false;b.pending=true;b.firedTriggers=0;a.layoutQueue.add(b);if(d){a.layouts[b.id]=b;b.running=true;if(b.finishedLayout){a.finishQueue.add(b)}++a.remainingLayouts;++b.layoutCount;b.ownerContext=c;b.beginCount=0;b.blockCount=0;b.calcCount=0;b.triggerCount=0;if(!b.initialized){b.initLayout()}b.beginLayout(c)}else{++b.beginCount;if(!b.running){++a.remainingLayouts;b.running=true;if(b.isComponentLayout){c.unsetProp("done")}a.completionQueue.remove(b);a.finalizeQueue.remove(b)}}b.beginLayoutCycle(c,d)},run:function(){var c=this,b=false,a=100;c.flushInvalidates();c.state=1;c.totalCount=c.layoutQueue.getCount();c.flush();while((c.remainingLayouts||c.invalidQueue.length)&&a--){if(c.invalidQueue.length){c.flushInvalidates()}if(c.runCycle()){b=false}else{if(!b){c.flush();b=true;c.flushLayouts("completionQueue","completeLayout")}else{if(!c.invalidQueue.length){c.state=2;break}}}if(!(c.remainingLayouts||c.invalidQueue.length)){c.flush();c.flushLayouts("completionQueue","completeLayout");c.flushLayouts("finalizeQueue","finalizeLayout")}}return c.runComplete()},runComplete:function(){var a=this;a.state=2;if(a.remainingLayouts){a.handleFailure();return false}a.flush();a.flushLayouts("finishQueue","finishedLayout",true);a.flushLayouts("finishQueue","notifyOwner");a.flush();a.flushAnimations();return true},runCycle:function(){var c=this,d=c.layoutQueue.clear(),b=d.length,a;++c.cycleCount;c.progressCount=0;for(a=0;a<b;++a){c.runLayout(c.currentLayout=d[a])}c.currentLayout=null;return c.progressCount>0},runLayout:function(b){var a=this,c=a.getCmp(b.owner);b.pending=false;if(c.state.blocks){return}b.done=true;++b.calcCount;++a.calcCount;b.calculate(c);if(b.done){a.layoutDone(b);if(b.completeLayout){a.queueCompletion(b)}if(b.finalizeLayout){a.queueFinalize(b)}}else{if(!b.pending&&!b.invalid&&!(b.blockCount+b.triggerCount-b.firedTriggers)){a.queueLayout(b)}}},setItemSize:function(g,f,b){var d=g,a=1,c,e;if(g.isComposite){d=g.elements;a=d.length;g=d[0]}else{if(!g.dom&&!g.el){a=d.length;g=d[0]}}for(e=0;e<a;){c=this.get(g);c.setSize(f,b);g=d[++e]}}});