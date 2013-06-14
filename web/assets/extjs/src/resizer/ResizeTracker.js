Ext.define("Ext.resizer.ResizeTracker",{extend:"Ext.dd.DragTracker",dynamic:true,preserveRatio:false,constrainTo:null,proxyCls:Ext.baseCSSPrefix+"resizable-proxy",constructor:function(b){var d=this,c,a,e;if(!b.el){if(b.target.isComponent){d.el=b.target.getEl()}else{d.el=b.target}}this.callParent(arguments);if(d.preserveRatio&&d.minWidth&&d.minHeight){c=d.minWidth/d.el.getWidth();a=d.minHeight/d.el.getHeight();if(a>c){d.minWidth=d.el.getWidth()*a}else{d.minHeight=d.el.getHeight()*c}}if(d.throttle){e=Ext.Function.createThrottled(function(){Ext.resizer.ResizeTracker.prototype.resize.apply(d,arguments)},d.throttle);d.resize=function(g,h,f){if(f){Ext.resizer.ResizeTracker.prototype.resize.apply(d,arguments)}else{e.apply(null,arguments)}}}},onBeforeStart:function(a){this.startBox=this.target.getBox()},getDynamicTarget:function(){var a=this,b=a.target;if(a.dynamic){return b}else{if(!a.proxy){a.proxy=a.createProxy(b)}}a.proxy.show();return a.proxy},createProxy:function(c){var b,a=this.proxyCls,d;if(c.isComponent){b=c.getProxy().addCls(a)}else{d=Ext.getBody();if(Ext.scopeResetCSS){d=Ext.getBody().createChild({cls:Ext.resetCls})}b=c.createProxy({tag:"div",cls:a,id:c.id+"-rzproxy"},d)}b.removeCls(Ext.baseCSSPrefix+"proxy-el");return b},onStart:function(a){this.activeResizeHandle=Ext.get(this.getDragTarget().id);if(!this.dynamic){this.resize(this.startBox,{horizontal:"none",vertical:"none"})}},onDrag:function(a){if(this.dynamic||this.proxy){this.updateDimensions(a)}},updateDimensions:function(r,l){var s=this,c=s.activeResizeHandle.region,f=s.getOffset(s.constrainTo?"dragTarget":null),j=s.startBox,g,o=0,t=0,i,p,a=0,v=0,u,m=f[0]<0?"right":"left",q=f[1]<0?"down":"up",h,b,d,n,k;c=s.convertRegionName(c);switch(c){case"south":t=f[1];b=2;break;case"north":t=-f[1];v=-t;b=2;break;case"east":o=f[0];b=1;break;case"west":o=-f[0];a=-o;b=1;break;case"northeast":t=-f[1];v=-t;o=f[0];h=[j.x,j.y+j.height];b=3;break;case"southeast":t=f[1];o=f[0];h=[j.x,j.y];b=3;break;case"southwest":o=-f[0];a=-o;t=f[1];h=[j.x+j.width,j.y];b=3;break;case"northwest":t=-f[1];v=-t;o=-f[0];a=-o;h=[j.x+j.width,j.y+j.height];b=3;break}d={width:j.width+o,height:j.height+t,x:j.x+a,y:j.y+v};i=Ext.Number.snap(d.width,s.widthIncrement);p=Ext.Number.snap(d.height,s.heightIncrement);if(i!=d.width||p!=d.height){switch(c){case"northeast":d.y-=p-d.height;break;case"north":d.y-=p-d.height;break;case"southwest":d.x-=i-d.width;break;case"west":d.x-=i-d.width;break;case"northwest":d.x-=i-d.width;d.y-=p-d.height}d.width=i;d.height=p}if(d.width<s.minWidth||d.width>s.maxWidth){d.width=Ext.Number.constrain(d.width,s.minWidth,s.maxWidth);if(a){d.x=j.x+(j.width-d.width)}}else{s.lastX=d.x}if(d.height<s.minHeight||d.height>s.maxHeight){d.height=Ext.Number.constrain(d.height,s.minHeight,s.maxHeight);if(v){d.y=j.y+(j.height-d.height)}}else{s.lastY=d.y}if(s.preserveRatio||r.shiftKey){g=s.startBox.width/s.startBox.height;n=Math.min(Math.max(s.minHeight,d.width/g),s.maxHeight);k=Math.min(Math.max(s.minWidth,d.height*g),s.maxWidth);if(b==1){d.height=n}else{if(b==2){d.width=k}else{u=Math.abs(h[0]-this.lastXY[0])/Math.abs(h[1]-this.lastXY[1]);if(u>g){d.height=n}else{d.width=k}if(c=="northeast"){d.y=j.y-(d.height-j.height)}else{if(c=="northwest"){d.y=j.y-(d.height-j.height);d.x=j.x-(d.width-j.width)}else{if(c=="southwest"){d.x=j.x-(d.width-j.width)}}}}}}if(t===0){q="none"}if(o===0){m="none"}s.resize(d,{horizontal:m,vertical:q},l)},getResizeTarget:function(a){return a?this.target:this.getDynamicTarget()},resize:function(c,e,a){var b=this,d=b.getResizeTarget(a);d.setBox(c);if(b.originalTarget&&(b.dynamic||a)){b.originalTarget.setBox(c)}},onEnd:function(a){this.updateDimensions(a,true);if(this.proxy){this.proxy.hide()}},convertRegionName:function(a){return a}});