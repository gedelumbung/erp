Ext.define("Ext.chart.Highlight",{requires:["Ext.fx.Anim"],highlight:false,highlightCfg:{fill:"#fdd","stroke-width":5,stroke:"#f55"},constructor:function(a){if(a.highlight&&(typeof a.highlight!=="boolean")){this.highlightCfg=Ext.merge({},this.highlightCfg,a.highlight)}},highlightItem:function(j){if(!j){return}var f=this,i=j.sprite,a=Ext.merge({},f.highlightCfg,f.highlight),d=f.chart.surface,c=f.chart.animate,b,h,g,e;if(!f.highlight||!i||i._highlighted){return}if(i._anim){i._anim.paused=true}i._highlighted=true;if(!i._defaults){i._defaults=Ext.apply({},i.attr);h={};g={};for(b in a){if(!(b in i._defaults)){i._defaults[b]=d.availableAttrs[b]}h[b]=i._defaults[b];g[b]=a[b];if(Ext.isObject(a[b])){h[b]={};g[b]={};Ext.apply(i._defaults[b],i.attr[b]);Ext.apply(h[b],i._defaults[b]);for(e in i._defaults[b]){if(!(e in a[b])){g[b][e]=h[b][e]}else{g[b][e]=a[b][e]}}for(e in a[b]){if(!(e in g[b])){g[b][e]=a[b][e]}}}}i._from=h;i._to=g;i._endStyle=g}if(c){i._anim=new Ext.fx.Anim({target:i,from:i._from,to:i._to,duration:150})}else{i.setAttributes(i._to,true)}},unHighlightItem:function(){if(!this.highlight||!this.items){return}var h=this,g=h.items,f=g.length,a=Ext.merge({},h.highlightCfg,h.highlight),c=h.chart.animate,e=0,d,b,j;for(;e<f;e++){if(!g[e]){continue}j=g[e].sprite;if(j&&j._highlighted){if(j._anim){j._anim.paused=true}d={};for(b in a){if(Ext.isObject(j._defaults[b])){d[b]=Ext.apply({},j._defaults[b])}else{d[b]=j._defaults[b]}}if(c){j._endStyle=d;j._anim=new Ext.fx.Anim({target:j,to:d,duration:150})}else{j.setAttributes(d,true)}delete j._highlighted}}},cleanHighlights:function(){if(!this.highlight){return}var d=this.group,c=this.markerGroup,b=0,a;for(a=d.getCount();b<a;b++){delete d.getAt(b)._defaults}if(c){for(a=c.getCount();b<a;b++){delete c.getAt(b)._defaults}}}});