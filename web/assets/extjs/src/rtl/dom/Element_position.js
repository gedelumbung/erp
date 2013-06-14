Ext.define("Ext.rtl.dom.Element_position",{override:"Ext.dom.Element",_positionTopRight:["position","top","right"],statics:{getXY:function(c){var k=document,f=k.body,b=k.documentElement,a=0,d=0,g=[0,0],j,e,i;c=Ext.getDom(c);if(c!==k&&c!==f){if(Ext.isIE){try{e=c.getBoundingClientRect();d=b.clientTop||f.clientTop;a=b.clientLeft||f.clientLeft}catch(h){e={left:0,top:0}}}else{e=c.getBoundingClientRect()}k=Ext.fly(document,"_getXY");if(Ext.rootHierarchyState.rtl){i=k.rtlGetScroll();j=Ext.Element.getViewportWidth()-e.right+i.left}else{i=k.getScroll();j=e.left+i.left}g=[Math.round(j-a),Math.round(e.top+i.top-d)]}return g},setXY:function(b,c){(b=Ext.fly(b,"_setXY")).position();var d=b.translatePoints(c),a=b.dom.style,e;a[Ext.rootHierarchyState.rtl?"left":"right"]="auto";for(e in d){if(!isNaN(d[e])){a[e]=d[e]+"px"}}}},getPositioning:function(c){var a=Ext.rootHierarchyState.rtl?"right":"left",b=this.getStyle([a,"top","position","z-index"]),d=this.dom;if(c){if(b[a]==="auto"){b[a]=(a==="left")?(d.offsetLeft+"px"):(d.offsetParent.offsetWidth-d.offsetLeft-d.offsetWidth)}if(b.top==="auto"){b.top=d.offsetTop+"px"}}return b},rtlGetLocalX:function(){var c=this,b=c.dom.offsetParent,a=c.getStyle("right");if(!a||a==="auto"){a=0}else{if(c.pxRe.test(a)){a=parseFloat(a)}else{a=c.getX();if(b){a-=Ext.fly(b,"_rtlGetLocalX").getX()}}}return a},rtlGetLocalXY:function(){var d=this,c=d.dom.offsetParent,b=d.getStyle(["right","top"]),a=b.right,e=b.top;if(!a||a==="auto"){a=0}else{if(d.pxRe.test(a)){a=parseFloat(a)}else{a=d.getX();if(c){a-=Ext.fly(c,"_rtlGetLocalXY").getX()}}}if(!e||e==="auto"){e=0}else{if(d.pxRe.test(e)){e=parseFloat(e)}else{e=d.getY();if(c){e-=Ext.Element.getY(c)}}}return[a,e]},rtlSetLocalX:function(a){var b=this.dom.style;b.left="auto";b.right=(a===null)?"auto":a+"px"},rtlSetLocalXY:function(a,c){var b=this.dom.style;b.left="auto";if(a&&a.length){c=a[1];a=a[0]}if(a===null){b.right="auto"}else{if(a!==undefined){b.right=a+"px"}}if(c===null){b.top="auto"}else{if(c!==undefined){b.top=c+"px"}}},rtlSetX:function(a,b){return this.rtlSetXY([a,this.getY()],b)},rtlSetXY:function(d,a){var c=this,e,b,f;if(!a||!c.anim){e=c.rtlTranslatePoints(d);b=c.dom.style;b.left="auto";for(f in e){if(!isNaN(e[f])){b[f]=e[f]+"px"}}}else{if(!Ext.isObject(a)){a={}}c.animate(Ext.applyIf({to:{x:d[0],y:d[1]}},a))}return c},rtlSetY:function(b,a){return this.rtlSetXY([this.getX(),b],a)},rtlTranslatePoints:function(a,c){var b=this.rtlTranslateXY(a,c);return{right:b.x,top:b.y}},rtlTranslateXY:function(i,g){var f=this,l=f.getStyle(f._positionTopRight),b=l.position=="relative",k=parseFloat(l.right),h=parseFloat(l.top),m=f.getXY(),d=f.dom,j,e,c,a;if(typeof i!=="number"){g=i[1];i=i[0]}if(isNaN(k)){j=document;e=j.body;if(d===e){k=0}else{a=d.offsetParent;c=(a&&a!==e&&a!==j.documentElement)?a.scrollWidth:Ext.Element.getViewportWidth();k=c-d.offsetLeft-f.getWidth()}}if(isNaN(h)){h=b?0:f.dom.offsetTop}k=(typeof i=="number")?i-m[0]+k:undefined;h=(typeof g=="number")?g-m[1]+h:undefined;return{x:k,y:h}},setX:function(a,b){return Ext.rootHierarchyState.rtl?this.rtlSetX(a,b):this.callParent(arguments)},setXY:function(b,a){return Ext.rootHierarchyState.rtl?this.rtlSetXY(b,a):this.callParent(arguments)},setY:function(b,a){return Ext.rootHierarchyState.rtl?this.rtlSetY(b,a):this.callParent(arguments)},translatePoints:function(a,b){return Ext.rootHierarchyState.rtl?this.rtlTranslatePoints(a,b):this.callParent(arguments)},translateXY:function(a,b){return Ext.rootHierarchyState.rtl?this.rtlTranslateXY(a,b):this.callParent(arguments)}});