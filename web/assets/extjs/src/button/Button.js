Ext.define("Ext.button.Button",{alias:"widget.button",extend:"Ext.Component",requires:["Ext.menu.Manager","Ext.util.ClickRepeater","Ext.layout.component.Button","Ext.util.TextMetrics","Ext.util.KeyMap"],alternateClassName:"Ext.Button",isButton:true,componentLayout:"button",hidden:false,disabled:false,pressed:false,enableToggle:false,menuAlign:"tl-bl?",showEmptyMenu:false,textAlign:"center",type:"button",clickEvent:"click",preventDefault:true,handleMouseEvents:true,tooltipType:"qtip",baseCls:Ext.baseCSSPrefix+"btn",pressedCls:"pressed",overCls:"over",focusCls:"focus",menuActiveCls:"menu-active",hrefTarget:"_blank",border:true,childEls:["btnEl","btnWrap","btnInnerEl","btnIconEl"],renderTpl:['<em id="{id}-btnWrap" class="<tpl if="splitCls">{splitCls}</tpl>','<tpl if="childElCls"> {childElCls}</tpl>">','<tpl if="href">','<a id="{id}-btnEl" href="{href}" class="{btnCls}" target="{hrefTarget}"','<tpl if="tabIndex"> tabIndex="{tabIndex}"</tpl>','<tpl if="disabled"> disabled="disabled"</tpl>',' role="link">','<span id="{id}-btnInnerEl" class="{baseCls}-inner','<tpl if="childElCls"> {childElCls}</tpl>">',"{text}","</span>",'<span id="{id}-btnIconEl" class="{baseCls}-icon {iconCls}','<tpl if="childElCls"> {childElCls}</tpl>"','<tpl if="iconUrl"> style="background-image:url({iconUrl})"</tpl>>',"</span>","</a>","<tpl else>",'<button id="{id}-btnEl" type="{type}" class="{btnCls}" hidefocus="true"','<tpl if="tabIndex"> tabIndex="{tabIndex}"</tpl>','<tpl if="disabled"> disabled="disabled"</tpl>',' role="button" autocomplete="off">','<span id="{id}-btnInnerEl" class="{baseCls}-inner','<tpl if="childElCls"> {childElCls}</tpl>" style="{innerSpanStyle}">',"{text}","</span>",'<span id="{id}-btnIconEl" class="{baseCls}-icon {iconCls}','<tpl if="childElCls"> {childElCls}</tpl>"','<tpl if="iconUrl"> style="background-image:url({iconUrl})"</tpl>>',"</span>","</button>","</tpl>","</em>",'<tpl if="closable">','<a id="{id}-closeEl" href="#" class="{baseCls}-close-btn" title="{closeText}"></a>',"</tpl>"],scale:"small",allowedScales:["small","medium","large"],iconAlign:"left",arrowAlign:"right",arrowCls:"arrow",maskOnDisable:false,persistentPadding:undefined,shrinkWrap:3,frame:true,_triggerRegion:{},initComponent:function(){var a=this;a.callParent(arguments);a.addEvents("click","toggle","mouseover","mouseout","menushow","menuhide","menutriggerover","menutriggerout","textchange","iconchange");if(a.menu){a.split=true;a.menu=Ext.menu.Manager.get(a.menu);a.menu.ownerCt=a;a.menu.ownerButton=a}if(a.url){a.href=a.url}if(a.href&&!a.hasOwnProperty("preventDefault")){a.preventDefault=false}if(Ext.isString(a.toggleGroup)&&a.toggleGroup!==""){a.enableToggle=true}if(a.html&&!a.text){a.text=a.html;delete a.html}},getActionEl:function(){return this.btnEl},getFocusEl:function(){return this.useElForFocus?this.el:this.btnEl},onFocus:function(b){var a=this;a.useElForFocus=true;a.callParent(arguments);a.useElForFocus=false},onBlur:function(a){this.useElForFocus=true;this.callParent(arguments);this.useElForFocus=false},onDisable:function(){this.useElForFocus=true;this.callParent(arguments);this.useElForFocus=false},setComponentCls:function(){var b=this,a=b.getComponentCls();if(!Ext.isEmpty(b.oldCls)){b.removeClsWithUI(b.oldCls);b.removeClsWithUI(b.pressedCls)}b.oldCls=a;b.addClsWithUI(a)},getComponentCls:function(){var b=this,a=[];if(b.iconCls||b.icon){if(b.text){a.push("icon-text-"+b.iconAlign)}else{a.push("icon")}}else{if(b.text){a.push("noicon")}}if(b.pressed){a.push(b.pressedCls)}return a},beforeRender:function(){var a=this;a.callParent();a.oldCls=a.getComponentCls();a.addClsWithUI(a.oldCls);Ext.applyIf(a.renderData,a.getTemplateArgs())},onRender:function(){var c=this,d,a,b;c.doc=Ext.getDoc();c.callParent(arguments);if(c.split&&c.arrowTooltip){c.arrowEl.dom.setAttribute(c.getTipAttr(),c.arrowTooltip)}a=c.el;if(c.tooltip){c.setTooltip(c.tooltip,true)}if(c.handleMouseEvents){b={scope:c,mouseover:c.onMouseOver,mouseout:c.onMouseOut,mousedown:c.onMouseDown};if(c.split){b.mousemove=c.onMouseMove}}else{b={scope:c}}if(c.menu){c.mon(c.menu,{scope:c,show:c.onMenuShow,hide:c.onMenuHide});c.keyMap=new Ext.util.KeyMap({target:c.el,key:Ext.EventObject.DOWN,handler:c.onDownKey,scope:c})}if(c.repeat){c.mon(new Ext.util.ClickRepeater(a,Ext.isObject(c.repeat)?c.repeat:{}),"click",c.onRepeatClick,c)}else{if(b[c.clickEvent]){d=true}else{b[c.clickEvent]=c.onClick}}c.mon(a,b);if(d){c.mon(a,c.clickEvent,c.onClick,c)}Ext.ButtonToggleManager.register(c)},getTemplateArgs:function(){var c=this,b=c.getPersistentPadding(),a="";if(Math.max.apply(Math,b)>0){a="margin:"+Ext.Array.map(b,function(d){return -d+"px"}).join(" ")}return{href:c.getHref(),disabled:c.disabled,hrefTarget:c.hrefTarget,type:c.type,btnCls:c.getBtnCls(),splitCls:c.getSplitCls(),iconUrl:c.icon,iconCls:c.iconCls,text:c.text||"&#160;",tabIndex:c.tabIndex,innerSpanStyle:a}},getHref:function(){var b=this,a=b.href;return a?Ext.urlAppend(a,Ext.Object.toQueryString(Ext.apply({},b.params,b.baseParams))):false},setParams:function(a){this.params=a;this.btnEl.dom.href=this.getHref()},getSplitCls:function(){var a=this;return a.split?(a.baseCls+"-"+a.arrowCls)+" "+(a.baseCls+"-"+a.arrowCls+"-"+a.arrowAlign):""},getBtnCls:function(){return this.textAlign?this.baseCls+"-"+this.textAlign:""},setIcon:function(b){b=b||"";var c=this,a=c.btnIconEl,d=c.icon||"";c.icon=b;if(b!=d){if(a){a.setStyle("background-image",b?"url("+b+")":"");c.setComponentCls();if(c.didIconStateChange(d,b)){c.updateLayout()}}c.fireEvent("iconchange",c,d,b)}return c},setIconCls:function(b){b=b||"";var d=this,a=d.btnIconEl,c=d.iconCls||"";d.iconCls=b;if(c!=b){if(a){a.removeCls(c);a.addCls(b||"");d.setComponentCls();if(d.didIconStateChange(c,b)){d.updateLayout()}}d.fireEvent("iconchange",d,c,b)}return d},setTooltip:function(c,a){var b=this;if(b.rendered){if(!a){b.clearTip()}if(Ext.quickTipsActive&&Ext.isObject(c)){Ext.tip.QuickTipManager.register(Ext.apply({target:b.btnEl.id},c));b.tooltip=c}else{b.btnEl.dom.setAttribute(b.getTipAttr(),c)}}else{b.tooltip=c}return b},setTextAlign:function(c){var b=this,a=b.btnEl;if(a){a.removeCls(b.baseCls+"-"+b.textAlign);a.addCls(b.baseCls+"-"+c)}b.textAlign=c;return b},getTipAttr:function(){return this.tooltipType=="qtip"?"data-qtip":"title"},getRefItems:function(a){var c=this.menu,b;if(c){b=c.getRefItems(a);b.unshift(c)}return b||[]},clearTip:function(){if(Ext.quickTipsActive&&Ext.isObject(this.tooltip)){Ext.tip.QuickTipManager.unregister(this.btnEl)}},beforeDestroy:function(){var a=this;if(a.rendered){a.clearTip()}if(a.menu&&a.destroyMenu!==false){Ext.destroy(a.menu)}Ext.destroy(a.btnInnerEl,a.repeater);a.callParent()},onDestroy:function(){var a=this;if(a.rendered){a.doc.un("mouseover",a.monitorMouseOver,a);a.doc.un("mouseup",a.onMouseUp,a);delete a.doc;Ext.ButtonToggleManager.unregister(a);Ext.destroy(a.keyMap);delete a.keyMap}a.callParent()},setHandler:function(b,a){this.handler=b;this.scope=a;return this},setText:function(c){c=c||"";var b=this,a=b.text||"";if(c!=a){b.text=c;if(b.rendered){b.btnInnerEl.update(c||"&#160;");b.setComponentCls();if(Ext.isStrict&&Ext.isIE8){b.el.repaint()}b.updateLayout()}b.fireEvent("textchange",b,a,c)}return b},didIconStateChange:function(a,c){var b=Ext.isEmpty(c);return Ext.isEmpty(a)?!b:b},getText:function(){return this.text},toggle:function(c,a){var b=this;c=c===undefined?!b.pressed:!!c;if(c!==b.pressed){if(b.rendered){b[c?"addClsWithUI":"removeClsWithUI"](b.pressedCls)}b.pressed=c;if(!a){b.fireEvent("toggle",b,c);Ext.callback(b.toggleHandler,b.scope||b,[b,c])}}return b},maybeShowMenu:function(){var a=this;if(a.menu&&!a.hasVisibleMenu()&&!a.ignoreNextClick){a.showMenu(true)}},showMenu:function(b){var a=this,c=a.menu;if(a.rendered){if(a.tooltip&&Ext.quickTipsActive&&a.getTipAttr()!="title"){Ext.tip.QuickTipManager.getQuickTip().cancelShow(a.btnEl)}if(c.isVisible()){c.hide()}if(!b||a.showEmptyMenu||c.items.getCount()>0){c.showBy(a.el,a.menuAlign,(Ext.isIEQuirks||Ext.isIE6)?[-2,-2]:undefined)}}return a},hideMenu:function(){if(this.hasVisibleMenu()){this.menu.hide()}return this},hasVisibleMenu:function(){var a=this.menu;return a&&a.rendered&&a.isVisible()},onRepeatClick:function(a,b){this.onClick(b)},onClick:function(b){var a=this;if(a.preventDefault||(a.disabled&&a.getHref())&&b){b.preventDefault()}if(b.button!==0){return}if(!a.disabled){a.doToggle();a.maybeShowMenu();a.fireHandler(b)}},fireHandler:function(c){var b=this,a=b.handler;if(b.fireEvent("click",b,c)!==false){if(a){a.call(b.scope||b,b,c)}b.blur()}},doToggle:function(){var a=this;if(a.enableToggle&&(a.allowDepress!==false||!a.pressed)){a.toggle()}},onMouseOver:function(b){var a=this;if(!a.disabled&&!b.within(a.el,true,true)){a.onMouseEnter(b)}},onMouseOut:function(b){var a=this;if(!b.within(a.el,true,true)){if(a.overMenuTrigger){a.onMenuTriggerOut(b)}a.onMouseLeave(b)}},onMouseMove:function(g){var d=this,c=d.el,f=d.overMenuTrigger,h,b,a;if(d.split){h=(d.arrowAlign==="right")?g.getX()-d.getX():g.getY()-c.getY();b=d.getTriggerRegion();if(h>b.begin&&h<b.end){if(!f){d.onMenuTriggerOver(g)}}else{if(f){d.onMenuTriggerOut(g)}}}},getTriggerRegion:function(){var c=this,d=c._triggerRegion,b=c.getTriggerSize(),a=c.arrowAlign==="right"?c.getWidth():c.getHeight();d.begin=a-b;d.end=a;return d},getTriggerSize:function(){var e=this,c=e.triggerSize,b,a,d;if(c===d){b=e.arrowAlign;a=b.charAt(0);c=e.triggerSize=e.el.getFrameWidth(a)+e.getBtnWrapFrameWidth(a)+e.frameSize[b]}return c},getBtnWrapFrameWidth:function(a){return this.btnWrap.getFrameWidth(a)},onMouseEnter:function(b){var a=this;a.addClsWithUI(a.overCls);a.fireEvent("mouseover",a,b)},onMouseLeave:function(b){var a=this;a.removeClsWithUI(a.overCls);a.fireEvent("mouseout",a,b)},onMenuTriggerOver:function(b){var a=this;a.overMenuTrigger=true;a.fireEvent("menutriggerover",a,a.menu,b)},onMenuTriggerOut:function(b){var a=this;delete a.overMenuTrigger;a.fireEvent("menutriggerout",a,a.menu,b)},enable:function(a){var b=this;b.callParent(arguments);if(b.btnEl){b.btnEl.dom.disabled=false}b.removeClsWithUI("disabled");return b},disable:function(a){var b=this;b.callParent(arguments);if(b.btnEl){b.btnEl.dom.disabled=true}b.addClsWithUI("disabled");b.removeClsWithUI(b.overCls);if(b.btnInnerEl&&Ext.isIE7m){b.btnInnerEl.repaint()}return b},setScale:function(c){var a=this,b=a.ui.replace("-"+a.scale,"");if(!Ext.Array.contains(a.allowedScales,c)){throw ("#setScale: scale must be an allowed scale ("+a.allowedScales.join(", ")+")")}a.scale=c;a.setUI(b)},setUI:function(b){var a=this;if(a.scale&&!b.match(a.scale)){b=b+"-"+a.scale}a.callParent([b])},onMouseDown:function(b){var a=this;if(!a.disabled&&b.button===0){a.addClsWithUI(a.pressedCls);a.doc.on("mouseup",a.onMouseUp,a)}},onMouseUp:function(b){var a=this;if(b.button===0){if(!a.pressed){a.removeClsWithUI(a.pressedCls)}a.doc.un("mouseup",a.onMouseUp,a)}},onMenuShow:function(b){var a=this;a.ignoreNextClick=0;a.addClsWithUI(a.menuActiveCls);a.fireEvent("menushow",a,a.menu)},onMenuHide:function(b){var a=this;a.removeClsWithUI(a.menuActiveCls);a.ignoreNextClick=Ext.defer(a.restoreClick,250,a);a.fireEvent("menuhide",a,a.menu)},restoreClick:function(){this.ignoreNextClick=0},onDownKey:function(){var a=this;if(!a.disabled){if(a.menu){a.showMenu()}}},getPersistentPadding:function(){var e=this,f=e.persistentPadding,b,a,d,g,c;if(!f){f=e.self.prototype.persistentPadding=[0,0,0,0];if(!Ext.isIE){b=new Ext.button.Button({text:"test",style:"position:absolute;top:-999px;"});b.el=Ext.DomHelper.append(Ext.resetElement,b.getRenderTree(),true);b.applyChildEls(b.el);d=b.btnEl;g=b.btnInnerEl;d.setSize(null,null);a=g.getOffsetsTo(d);f[0]=a[1];f[1]=d.getWidth()-g.getWidth()-a[0];f[2]=d.getHeight()-g.getHeight()-a[1];f[3]=a[0];b.destroy();b.el.remove()}}return f}},function(){var a={},b=function(d,h){if(h){var f=a[d.toggleGroup],e=f.length,c;for(c=0;c<e;c++){if(f[c]!==d){f[c].toggle(false)}}}};Ext.ButtonToggleManager={register:function(c){if(!c.toggleGroup){return}var d=a[c.toggleGroup];if(!d){d=a[c.toggleGroup]=[]}d.push(c);c.on("toggle",b)},unregister:function(c){if(!c.toggleGroup){return}var d=a[c.toggleGroup];if(d){Ext.Array.remove(d,c);c.un("toggle",b)}},getPressed:function(f){var e=a[f],d=0,c;if(e){for(c=e.length;d<c;d++){if(e[d].pressed===true){return e[d]}}}return null}}});