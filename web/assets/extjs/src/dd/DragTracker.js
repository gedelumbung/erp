Ext.define("Ext.dd.DragTracker",{uses:["Ext.util.Region"],mixins:{observable:"Ext.util.Observable"},active:false,trackOver:false,tolerance:5,autoStart:false,constructor:function(a){var b=this;Ext.apply(b,a);b.addEvents("mouseover","mouseout","mousedown","mouseup","mousemove","beforedragstart","dragstart","dragend","drag");b.dragRegion=new Ext.util.Region(0,0,0,0);if(b.el){b.initEl(b.el)}b.mixins.observable.constructor.call(b);if(b.disabled){b.disable()}},initEl:function(a){var b=this;b.el=Ext.get(a);b.handle=Ext.get(b.delegate);b.delegate=b.handle?undefined:b.delegate;if(!b.handle){b.handle=b.el}b.mon(b.handle,{mousedown:b.onMouseDown,delegate:b.delegate,scope:b});if(b.trackOver||b.overCls){b.mon(b.handle,{mouseover:b.onMouseOver,mouseout:b.onMouseOut,delegate:b.delegate,scope:b})}},disable:function(){this.disabled=true},enable:function(){this.disabled=false},destroy:function(){this.clearListeners();delete this.el},onMouseOver:function(c,b){var a=this;if(!a.disabled){if(Ext.EventManager.contains(c)||a.delegate){a.mouseIsOut=false;if(a.overCls){a.el.addCls(a.overCls)}a.fireEvent("mouseover",a,c,a.delegate?c.getTarget(a.delegate,b):a.handle)}}},onMouseOut:function(b){var a=this;if(a.mouseIsDown){a.mouseIsOut=true}else{if(a.overCls){a.el.removeCls(a.overCls)}a.fireEvent("mouseout",a,b)}},onMouseDown:function(d,c){var b=this,a;if(b.disabled||d.dragTracked){return}b.dragTarget=b.delegate?c:b.handle.dom;b.startXY=b.lastXY=d.getXY();b.startRegion=Ext.fly(b.dragTarget).getRegion();if(b.fireEvent("mousedown",b,d)===false||b.fireEvent("beforedragstart",b,d)===false||b.onBeforeStart(d)===false){return}b.mouseIsDown=true;d.dragTracked=true;a=b.el.dom;if(Ext.isIE&&a.setCapture){a.setCapture()}if(b.preventDefault!==false){d.preventDefault()}Ext.getDoc().on({scope:b,mouseup:b.onMouseUp,mousemove:b.onMouseMove,selectstart:b.stopSelect});if(b.autoStart){b.timer=Ext.defer(b.triggerStart,b.autoStart===true?1000:b.autoStart,b,[d])}},onMouseMove:function(f,d){var b=this,c=f.getXY(),a=b.startXY;f.preventDefault();b.lastXY=c;if(!b.active){if(Math.max(Math.abs(a[0]-c[0]),Math.abs(a[1]-c[1]))>b.tolerance){b.triggerStart(f)}else{return}}if(b.fireEvent("mousemove",b,f)===false){b.onMouseUp(f)}else{b.onDrag(f);b.fireEvent("drag",b,f)}},onMouseUp:function(b){var a=this;a.mouseIsDown=false;if(a.mouseIsOut){a.mouseIsOut=false;a.onMouseOut(b)}b.preventDefault();if(Ext.isIE&&document.releaseCapture){document.releaseCapture()}a.fireEvent("mouseup",a,b);a.endDrag(b)},endDrag:function(d){var b=this,c=Ext.getDoc(),a=b.active;c.un("mousemove",b.onMouseMove,b);c.un("mouseup",b.onMouseUp,b);c.un("selectstart",b.stopSelect,b);b.clearStart();b.active=false;if(a){b.onEnd(d);b.fireEvent("dragend",b,d)}delete b._constrainRegion;delete Ext.EventObject.dragTracked},triggerStart:function(b){var a=this;a.clearStart();a.active=true;a.onStart(b);a.fireEvent("dragstart",a,b)},clearStart:function(){var a=this.timer;if(a){clearTimeout(a);delete this.timer}},stopSelect:function(a){a.stopEvent();return false},onBeforeStart:function(a){},onStart:function(a){},onDrag:function(a){},onEnd:function(a){},getDragTarget:function(){return this.dragTarget},getDragCt:function(){return this.el},getConstrainRegion:function(){var a=this;if(a.constrainTo){if(a.constrainTo instanceof Ext.util.Region){return a.constrainTo}if(!a._constrainRegion){a._constrainRegion=Ext.fly(a.constrainTo).getViewRegion()}}else{if(!a._constrainRegion){a._constrainRegion=a.getDragCt().getViewRegion()}}return a._constrainRegion},getXY:function(a){return a?this.constrainModes[a](this,this.lastXY):this.lastXY},getOffset:function(c){var b=this.getXY(c),a=this.startXY;return[b[0]-a[0],b[1]-a[1]]},constrainModes:{point:function(b,d){var c=b.dragRegion,a=b.getConstrainRegion();if(!a){return d}c.x=c.left=c[0]=c.right=d[0];c.y=c.top=c[1]=c.bottom=d[1];c.constrainTo(a);return[c.left,c.top]},dragTarget:function(c,f){var b=c.startXY,e=c.startRegion.copy(),a=c.getConstrainRegion(),d;if(!a){return f}e.translateBy(f[0]-b[0],f[1]-b[1]);if(e.right>a.right){f[0]+=d=(a.right-e.right);e.left+=d}if(e.left<a.left){f[0]+=(a.left-e.left)}if(e.bottom>a.bottom){f[1]+=d=(a.bottom-e.bottom);e.top+=d}if(e.top<a.top){f[1]+=(a.top-e.top)}return f}}});