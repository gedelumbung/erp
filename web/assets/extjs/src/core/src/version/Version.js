(function(){var a="4.2.0",b;Ext.Version=b=Ext.extend(Object,{constructor:function(c){var e,d;if(c instanceof b){return c}this.version=this.shortVersion=String(c).toLowerCase().replace(/_/g,".").replace(/[\-+]/g,"");d=this.version.search(/([^\d\.])/);if(d!==-1){this.release=this.version.substr(d,c.length);this.shortVersion=this.version.substr(0,d)}this.shortVersion=this.shortVersion.replace(/[^\d]/g,"");e=this.version.split(".");this.major=parseInt(e.shift()||0,10);this.minor=parseInt(e.shift()||0,10);this.patch=parseInt(e.shift()||0,10);this.build=parseInt(e.shift()||0,10);return this},toString:function(){return this.version},valueOf:function(){return this.version},getMajor:function(){return this.major||0},getMinor:function(){return this.minor||0},getPatch:function(){return this.patch||0},getBuild:function(){return this.build||0},getRelease:function(){return this.release||""},isGreaterThan:function(c){return b.compare(this.version,c)===1},isGreaterThanOrEqual:function(c){return b.compare(this.version,c)>=0},isLessThan:function(c){return b.compare(this.version,c)===-1},isLessThanOrEqual:function(c){return b.compare(this.version,c)<=0},equals:function(c){return b.compare(this.version,c)===0},match:function(c){c=String(c);return this.version.substr(0,c.length)===c},toArray:function(){return[this.getMajor(),this.getMinor(),this.getPatch(),this.getBuild(),this.getRelease()]},getShortVersion:function(){return this.shortVersion},gt:function(){return this.isGreaterThan.apply(this,arguments)},lt:function(){return this.isLessThan.apply(this,arguments)},gtEq:function(){return this.isGreaterThanOrEqual.apply(this,arguments)},ltEq:function(){return this.isLessThanOrEqual.apply(this,arguments)}});Ext.apply(b,{releaseValueMap:{dev:-6,alpha:-5,a:-5,beta:-4,b:-4,rc:-3,"#":-2,p:-1,pl:-1},getComponentValue:function(c){return !c?0:(isNaN(c)?this.releaseValueMap[c]||c:parseInt(c,10))},compare:function(g,f){var d,e,c;g=new b(g).toArray();f=new b(f).toArray();for(c=0;c<Math.max(g.length,f.length);c++){d=this.getComponentValue(g[c]);e=this.getComponentValue(f[c]);if(d<e){return -1}else{if(d>e){return 1}}}return 0}});Ext.apply(Ext,{versions:{},lastRegisteredVersion:null,setVersion:function(d,c){Ext.versions[d]=new b(c);Ext.lastRegisteredVersion=Ext.versions[d];return this},getVersion:function(c){if(c===undefined){return Ext.lastRegisteredVersion}return Ext.versions[c]},deprecate:function(c,e,f,d){if(b.compare(Ext.getVersion(c),e)<1){f.call(d)}}});Ext.setVersion("core",a)}());