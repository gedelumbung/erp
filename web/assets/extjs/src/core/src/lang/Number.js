Ext.Number=new function(){var b=this,c=(0.9).toFixed()!=="1",a=Math;Ext.apply(this,{constrain:function(g,f,e){var d=parseFloat(g);return(d<f)?f:((d>e)?e:d)},snap:function(g,e,f,h){var d;if(g===undefined||g<f){return f||0}if(e){d=g%e;if(d!==0){g-=d;if(d*2>=e){g+=e}else{if(d*2<-e){g-=e}}}}return b.constrain(g,f,h)},snapInRange:function(g,d,f,h){var e;f=(f||0);if(g===undefined||g<f){return f}if(d&&(e=((g-f)%d))){g-=e;e*=2;if(e>=d){g+=d}}if(h!==undefined){if(g>(h=b.snapInRange(h,d,f))){g=h}}return g},toFixed:c?function(f,d){d=d||0;var e=a.pow(10,d);return(a.round(f*e)/e).toFixed(d)}:function(e,d){return e.toFixed(d)},from:function(e,d){if(isFinite(e)){e=parseFloat(e)}return !isNaN(e)?e:d},randomInt:function(e,d){return a.floor(a.random()*(d-e+1)+e)}});Ext.num=function(){return b.from.apply(this,arguments)}};