Ext.Loader=new function(){var k=this,b=Ext.ClassManager,w=Ext.Class,e=Ext.Function.flexSetter,p=Ext.Function.alias,a=Ext.Function.pass,d=Ext.Function.defer,g=Ext.Array.erase,i=typeof window=="undefined",q=i&&(typeof require=="function"),m=i&&typeof system!="undefined"&&system.program.search(/jsdb/)!==-1,t=(typeof phantom!="undefined"&&phantom.fs),o=["extend","mixins","requires"],y={},n=[],c=/\/\.\//g,f=/\./g,j=0;Ext.apply(k,{isInHistory:y,history:n,config:{enabled:false,scriptChainDelay:false,disableCaching:true,disableCachingParam:"_dc",garbageCollect:false,paths:{Ext:"."},preserveScripts:true,scriptCharset:undefined},setConfig:function(B,C){if(Ext.isObject(B)&&arguments.length===1){Ext.merge(k.config,B);if("paths" in B){Ext.app.collectNamespaces(B.paths)}}else{k.config[B]=(Ext.isObject(C))?Ext.merge(k.config[B],C):C;if(B==="paths"){Ext.app.collectNamespaces(C)}}return k},getConfig:function(B){if(B){return k.config[B]}return k.config},setPath:e(function(B,C){k.config.paths[B]=C;Ext.app.namespaces[B]=true;j++;return k}),addClassPathMappings:function(C){var B;if(j==0){k.config.paths=C}else{for(B in C){k.config.paths[B]=C[B]}}j++;return k},getPath:function(B){var D="",E=k.config.paths,C=k.getPrefix(B);if(C.length>0){if(C===B){return E[C]}D=E[C];B=B.substring(C.length+1)}if(D.length>0){D+="/"}return D.replace(c,"/")+B.replace(f,"/")+".js"},getPrefix:function(C){var E=k.config.paths,D,B="";if(E.hasOwnProperty(C)){return C}for(D in E){if(E.hasOwnProperty(D)&&D+"."===C.substring(0,D.length+1)){if(D.length>B.length){B=D}}}return B},isAClassNameWithAKnownPrefix:function(B){var C=k.getPrefix(B);return C!==""&&C!==B},require:function(D,C,B,E){if(C){C.call(B)}},syncRequire:function(){},exclude:function(B){return{require:function(E,D,C){return k.require(E,D,C,B)},syncRequire:function(E,D,C){return k.syncRequire(E,D,C,B)}}},onReady:function(E,D,F,B){var C;if(F!==false&&Ext.onDocumentReady){C=E;E=function(){Ext.onDocumentReady(C,D,B)}}E.call(D)}});var s=[],u={},x={},v={},r={},z=[],A=[],h={},l=function(B,C){return C.priority-B.priority};Ext.apply(k,{documentHead:typeof document!="undefined"&&(document.head||document.getElementsByTagName("head")[0]),isLoading:false,queue:s,isClassFileLoaded:u,isFileLoaded:x,readyListeners:z,optionalRequires:A,requiresMap:h,numPendingFiles:0,numLoadedFiles:0,hasFileLoadError:false,classNameToFilePathMap:v,scriptsLoading:0,syncModeEnabled:false,scriptElements:r,refreshQueue:function(){var F=s.length,C,E,B,D;if(!F&&!k.scriptsLoading){return k.triggerReady()}for(C=0;C<F;C++){E=s[C];if(E){D=E.requires;if(D.length>k.numLoadedFiles){continue}for(B=0;B<D.length;){if(b.isCreated(D[B])){g(D,B,1)}else{B++}}if(E.requires.length===0){g(s,C,1);E.callback.call(E.scope);k.refreshQueue();break}}}return k},injectScriptElement:function(B,I,F,K,D){var J=document.createElement("script"),G=false,C=k.config,H=function(){if(!G){G=true;J.onload=J.onreadystatechange=J.onerror=null;if(typeof C.scriptChainDelay=="number"){d(I,C.scriptChainDelay,K)}else{I.call(K)}k.cleanupScriptElement(J,C.preserveScripts===false,C.garbageCollect)}},E=function(L){d(F,1,K);k.cleanupScriptElement(J,C.preserveScripts===false,C.garbageCollect)};J.type="text/javascript";J.onerror=E;D=D||C.scriptCharset;if(D){J.charset=D}if("addEventListener" in J){J.onload=H}else{if("readyState" in J){J.onreadystatechange=function(){if(this.readyState=="loaded"||this.readyState=="complete"){H()}}}else{J.onload=H}}J.src=B;(k.documentHead||document.getElementsByTagName("head")[0]).appendChild(J);return J},removeScriptElement:function(B){if(r[B]){k.cleanupScriptElement(r[B],true,!!k.getConfig("garbageCollect"));delete r[B]}return k},cleanupScriptElement:function(D,C,E){var F;D.onload=D.onreadystatechange=D.onerror=null;if(C){Ext.removeNode(D);if(E){for(F in D){try{if(F!="src"){D[F]=null}delete D[F]}catch(B){}}}}return k},loadScript:function(K){var E=k.getConfig(),D=typeof K=="string",C=D?K:K.url,G=!D&&K.onError,H=!D&&K.onLoad,J=!D&&K.scope,I=function(){k.numPendingFiles--;k.scriptsLoading--;if(G){G.call(J,"Failed loading '"+C+"', please verify that the file exists")}if(k.numPendingFiles+k.scriptsLoading===0){k.refreshQueue()}},F=function(){k.numPendingFiles--;k.scriptsLoading--;if(H){H.call(J)}if(k.numPendingFiles+k.scriptsLoading===0){k.refreshQueue()}},B;k.isLoading=true;k.numPendingFiles++;k.scriptsLoading++;B=E.disableCaching?(C+"?"+E.disableCachingParam+"="+Ext.Date.now()):C;r[C]=k.injectScriptElement(B,F,I)},loadScriptFile:function(C,J,H,M,B){if(x[C]){return k}var E=k.getConfig(),N=C+(E.disableCaching?("?"+E.disableCachingParam+"="+Ext.Date.now()):""),D=false,L,F,K,G="";M=M||k;k.isLoading=true;if(!B){K=function(){H.call(M,"Failed loading '"+C+"', please verify that the file exists",B)};r[C]=k.injectScriptElement(N,J,K,M)}else{if(typeof XMLHttpRequest!="undefined"){L=new XMLHttpRequest()}else{L=new ActiveXObject("Microsoft.XMLHTTP")}try{L.open("GET",N,false);L.send(null)}catch(I){D=true}F=(L.status===1223)?204:(L.status===0&&((self.location||{}).protocol=="file:"||(self.location||{}).protocol=="ionp:"))?200:L.status;D=D||(F===0);if(D&&!t){H.call(k,"Failed loading synchronously via XHR: '"+C+"'; It's likely that the file is either being loaded from a different domain or from the local file system whereby cross origin requests are not allowed due to security reasons. Use asynchronous loading with Ext.require instead.",B)}else{if((F>=200&&F<300)||(F===304)||t){if(!Ext.isIE){G="\n//@ sourceURL="+C}Ext.globalEval(L.responseText+G);J.call(M)}else{H.call(k,"Failed loading synchronously via XHR: '"+C+"'; please verify that the file exists. XHR status code: "+F,B)}}L=null}},syncRequire:function(){var B=k.syncModeEnabled;if(!B){k.syncModeEnabled=true}k.require.apply(k,arguments);if(!B){k.syncModeEnabled=false}k.refreshQueue()},require:function(T,K,E,G){var M={},D={},J=[],V=[],S=[],C=[],I,U,O,N,B,H,R,Q,P,L,F;if(G){G=(typeof G==="string")?[G]:G;for(Q=0,L=G.length;Q<L;Q++){B=G[Q];if(typeof B=="string"&&B.length>0){J=b.getNamesByExpression(B);for(P=0,F=J.length;P<F;P++){M[J[P]]=true}}}}T=(typeof T==="string")?[T]:(T?T:[]);if(K){if(K.length>0){I=function(){var X=[],W,Y;for(W=0,Y=C.length;W<Y;W++){X.push(b.get(C[W]))}return K.apply(this,X)}}else{I=K}}else{I=Ext.emptyFn}E=E||Ext.global;for(Q=0,L=T.length;Q<L;Q++){N=T[Q];if(typeof N=="string"&&N.length>0){V=b.getNamesByExpression(N);F=V.length;for(P=0;P<F;P++){R=V[P];if(M[R]!==true){C.push(R);if(!b.isCreated(R)&&!D[R]){D[R]=true;S.push(R)}}}}}if(S.length>0){if(!k.config.enabled){throw new Error("Ext.Loader is not enabled, so dependencies cannot be resolved dynamically. Missing required class"+((S.length>1)?"es":"")+": "+S.join(", "))}}else{I.call(E);return k}U=k.syncModeEnabled;if(!U){s.push({requires:S.slice(),callback:I,scope:E})}L=S.length;for(Q=0;Q<L;Q++){H=S[Q];O=k.getPath(H);if(U&&u.hasOwnProperty(H)){if(!u[H]){k.numPendingFiles--;k.removeScriptElement(O);delete u[H]}}if(!u.hasOwnProperty(H)){u[H]=false;v[H]=O;k.numPendingFiles++;k.loadScriptFile(O,a(k.onFileLoaded,[H,O],k),a(k.onFileLoadError,[H,O],k),k,U)}}if(U){I.call(E);if(L===1){return b.get(H)}}return k},onFileLoaded:function(I,C){var F=u[I];k.numLoadedFiles++;u[I]=true;x[C]=true;if(!F){k.numPendingFiles--}if(k.numPendingFiles===0){k.refreshQueue()}if(!k.syncModeEnabled&&k.numPendingFiles===0&&k.isLoading&&!k.hasFileLoadError){var K=[],B=[],J,E,H,D,G;for(E=0,H=s.length;E<H;E++){J=s[E].requires;for(D=0,G=J.length;D<G;D++){if(u[J[D]]){K.push(J[D])}}}if(K.length<1){return}K=Ext.Array.filter(Ext.Array.unique(K),function(L){return !h.hasOwnProperty(L)},k);if(K.length<1){return}for(E=0,H=K.length;E<H;E++){B.push(v[K[E]])}throw new Error("The following classes are not declared even if their files have been loaded: '"+K.join("', '")+"'. Please check the source code of their corresponding files for possible typos: '"+B.join("', '"))}},onFileLoadError:function(D,C,B,E){k.numPendingFiles--;k.hasFileLoadError=true;throw new Error("[Ext.Loader] "+B)},addUsedClasses:function(D){var B,C,E;if(D){D=(typeof D=="string")?[D]:D;for(C=0,E=D.length;C<E;C++){B=D[C];if(typeof B=="string"&&!Ext.Array.contains(A,B)){A.push(B)}}}return k},triggerReady:function(){var B,C=A;if(k.isLoading){k.isLoading=false;if(C.length!==0){C=C.slice();A.length=0;k.require(C,k.triggerReady,k);return k}}Ext.Array.sort(z,l);while(z.length&&!k.isLoading){B=z.shift();B.fn.call(B.scope)}return k},onReady:function(E,D,F,B){var C;if(F!==false&&Ext.onDocumentReady){C=E;E=function(){Ext.onDocumentReady(C,D,B)}}if(!k.isLoading){E.call(D)}else{z.push({fn:E,scope:D,priority:(B&&B.priority)||0})}},historyPush:function(B){if(B&&u.hasOwnProperty(B)&&!y[B]){y[B]=true;n.push(B)}return k}});Ext.disableCacheBuster=function(C,D){var B=new Date();B.setTime(B.getTime()+(C?10*365:-1)*24*60*60*1000);B=B.toGMTString();document.cookie="ext-cache=1; expires="+B+"; path="+(D||"/")};if(i){if(q){Ext.apply(k,{syncModeEnabled:true,setPath:e(function(B,C){C=require("fs").realpathSync(C);k.config.paths[B]=C;return k}),loadScriptFile:function(C,E,F,D,B){require(C);E.call(D)}})}else{if(m){Ext.apply(k,{syncModeEnabled:true,loadScriptFile:function(C,E,F,D,B){load(C);E.call(D)}})}}}Ext.require=p(k,"require");Ext.syncRequire=p(k,"syncRequire");Ext.exclude=p(k,"exclude");Ext.onReady=function(D,C,B){k.onReady(D,C,true,B)};w.registerPreprocessor("loader",function(B,T,C,Q){Ext.classSystemMonitor&&Ext.classSystemMonitor(B,"Ext.Loader#loaderPreprocessor",arguments);var S=this,K=[],M,E=b.getName(B),P,O,I,F,N,L,R,D,J;for(P=0,I=o.length;P<I;P++){L=o[P];if(T.hasOwnProperty(L)){R=T[L];if(typeof R=="string"){K.push(R)}else{if(R instanceof Array){for(O=0,F=R.length;O<F;O++){N=R[O];if(typeof N=="string"){K.push(N)}}}else{if(typeof R!="function"){for(O in R){if(R.hasOwnProperty(O)){N=R[O];if(typeof N=="string"){K.push(N)}}}}}}}}if(K.length===0){return}var H=[],G;if(E){h[E]=K;D=k.requiredByMap||(k.requiredByMap={});for(P=0,I=K.length;P<I;P++){M=K[P];(D[M]||(D[M]=[])).push(E)}G=function(U){H.push(U);if(h[U]){if(Ext.Array.contains(h[U],E)){throw new Error("Deadlock detected while loading dependencies! '"+E+"' and '"+H[1]+"' mutually require each other. Path: "+H.join(" -> ")+" -> "+H[0])}for(P=0,I=h[U].length;P<I;P++){G(h[U][P])}}};G(E)}k.require(K,function(){for(P=0,I=o.length;P<I;P++){L=o[P];if(T.hasOwnProperty(L)){R=T[L];if(typeof R=="string"){T[L]=b.get(R)}else{if(R instanceof Array){for(O=0,F=R.length;O<F;O++){N=R[O];if(typeof N=="string"){T[L][O]=b.get(N)}}}else{if(typeof R!="function"){for(var U in R){if(R.hasOwnProperty(U)){N=R[U];if(typeof N=="string"){T[L][U]=b.get(N)}}}}}}}}Q.call(S,B,T,C)});return false},true,"after","className");b.registerPostprocessor("uses",function(D,C,E){Ext.classSystemMonitor&&Ext.classSystemMonitor(C,"Ext.Loader#usesPostprocessor",arguments);var B=E.uses;if(B){k.addUsedClasses(B)}});b.onCreated(k.historyPush)};if(Ext._classPathMetadata){Ext.Loader.addClassPathMappings(Ext._classPathMetadata);Ext._classPathMetadata=null}(function(){var a=document.getElementsByTagName("script"),b=a[a.length-1],d=b.src,c=d.substring(0,d.lastIndexOf("/")+1),e=Ext.Loader;if(d.indexOf("/platform/core/src/class/")!=-1){c=c+"../../../../extjs/"}else{if(d.indexOf("/core/src/class/")!=-1){c=c+"../../../"}}e.setConfig({enabled:true,disableCaching:(/[?&](?:cache|disableCacheBuster)\b/i.test(location.search)||/(^|[ ;])ext-cache=1/.test(document.cookie))?false:true,paths:{Ext:c+"src"}})})();Ext._endTime=new Date().getTime();if(Ext._beforereadyhandler){Ext._beforereadyhandler()};