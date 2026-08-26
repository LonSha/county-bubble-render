(function(){
  var DB_NAME='BubbleDialogueAvatars',DB_VERSION=4,ST_AV='avatars',ST_CF='config';
  var AVATAR_V2_CHARS=['兰叶','孙翌童','庞咏萱','张子薇','文素','李南星','林闻夏','柳青','汤加琳','珞珈','胡静','让娜','赵雅琴','金晶晶','陈晓北','黄淑仪'];
  var cMap={},cIdx=0;
  function gc(name){
    if(cMap[name])return cMap[name];
    cIdx=(cIdx%8)+1;
    cMap[name]=cIdx;
    return cIdx;
  }

  function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

  function hex2rgba(h,a){
    var r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);
    return'rgba('+r+','+g+','+b+','+a+')';
  }

  function decodeHtmlEntities(html){
    var textarea=document.createElement('textarea');
    textarea.innerHTML=html;
    return textarea.value;
  }

  function getHtmlEmbedToken(index){
    return '@@DC_HTML_EMBED_'+index+'@@';
  }

  function getInlineHtmlToken(index){
    return '@@DC_INLINE_HTML_'+index+'@@';
  }

  function restoreInlineHtmlTokens(text, inlineHtmlTokens){
    text=String(text==null?'':text);
    inlineHtmlTokens=Array.isArray(inlineHtmlTokens)?inlineHtmlTokens:[];
    return text.replace(/@@DC_INLINE_HTML_(\d+)@@/g,function(_,idx){
      idx=parseInt(idx,10);
      return idx>=0&&idx<inlineHtmlTokens.length?inlineHtmlTokens[idx]:'';
    });
  }

  function normalizeSourceText(rawHtml){
    return decodeHtmlEntities(rawHtml||'')
      .replace(/\u00a0/g,' ')
      .replace(/\r\n?/g,'\n')
      .replace(/<\/?(now_plot|content)\b[^>]*>/gi,'');
  }

  function stripBubbleLineHtmlWrappers(line){
    var current=String(line==null?'':line).trim();
    if(!current) return '';

    var htmlTagWrapperPattern=/^<([a-z][\w:-]*)(?:\s[^<>]*?)?>([\s\S]*)<\/\1>$/i;
    var inlineTokenWrapperPattern=/^(@@DC_INLINE_HTML_(\d+)@@)([\s\S]*)(@@DC_INLINE_HTML_(\d+)@@)$/;
    var bubbleLinePattern=/^@bubble:/;
    var maxDepth=12;

    for(var depth=0;depth<maxDepth;depth++){
      if(bubbleLinePattern.test(current)) break;

      var next=current;
      var htmlMatch=current.match(htmlTagWrapperPattern);
      if(htmlMatch){
        next=String(htmlMatch[2]||'').trim();
      }else{
        var tokenMatch=current.match(inlineTokenWrapperPattern);
        if(tokenMatch&&tokenMatch[2]===tokenMatch[5]){
          next=String(tokenMatch[3]||'').trim();
        }
      }

      if(next===current) break;
      current=next;
    }

    return current;
  }

  function protectInlineHtml(rawHtml){
    var tokens=[];
    var htmlCommentOrTagPattern=new RegExp('(?:'+'<!'+'--[\\s\\S]*?--'+'>)|(?:<\\/?[a-z][\\w:-]*(?:\\s[^<>]*?)?>)','gi');
    rawHtml=rawHtml||'';
    if(!rawHtml)return {text:'',tokens:tokens};
    rawHtml=rawHtml.replace(htmlCommentOrTagPattern,function(match){
      var token=getInlineHtmlToken(tokens.length);
      tokens.push(match);
      return token;
    });
    return {text:rawHtml,tokens:tokens};
  }

  function buildBubbleDetectionLine(line){
    var cleaned=String(line==null?'':line);
    var htmlCommentPattern=new RegExp('<!'+'--[\\s\\S]*?--'+'>','g');
    if(!cleaned) return '';

    var previous='';
    var maxDepth=12;
    for(var depth=0;depth<maxDepth&&cleaned!==previous;depth++){
      previous=cleaned;
      cleaned=cleaned.replace(/@@DC_INLINE_HTML_\d+@@/g,'');
      cleaned=cleaned.replace(htmlCommentPattern,'');
      cleaned=cleaned.replace(/<\/?[a-z][\w:-]*(?:\s[^<>]*?)?>/gi,'');
      cleaned=stripBubbleLineHtmlWrappers(cleaned);
    }

    return cleaned.replace(/\s+/g,' ').trim();
  }

  function protectHtmlFences(rawHtml){
    var embeds=[];
    rawHtml=rawHtml||'';
    if(!rawHtml)return {text:'',embeds:embeds};
    rawHtml=rawHtml.replace(/`{3,}\s*(html|htm|xhtml)\s*([\s\S]*?)`{3,}/gi,function(_,lang,inner){
      var token=getHtmlEmbedToken(embeds.length);
      embeds.push((inner||'').replace(/^\s+|\s+$/g,''));
      return '\n'+token+'\n';
    });
    return {text:rawHtml,embeds:embeds};
  }

  /* ── 通用块级 HTML 保护 ──
     检测由其他正则预先替换生成的完整块级 HTML 结构（如 <style>...<div>...</div>），
     将其整体替换为 @@DC_HTML_EMBED_N@@ token，避免被旁白渲染逻辑破坏。
     在 normalizeSourceText 之后、protectInlineHtml 之前调用。 */
  function protectBlockHtml(text, embeds){
    text=text||'';
    if(!text)return text;
    embeds=Array.isArray(embeds)?embeds:[];

    var lines=text.split('\n');
    var result=[];
    var i=0;

    while(i<lines.length){
      var line=lines[i];
      var trimmed=line.trim();

      /* 检测块级 HTML 的起始：以 <style 开头，或以块级元素标签开头且该行不含 @bubble: */
      var isBlockStart=false;
      if(/^<style[\s>]/i.test(trimmed)){
        isBlockStart=true;
      }else if(/^<(div|section|article|aside|header|footer|nav|main|table|form|fieldset|figure|details|dialog)[\s>]/i.test(trimmed)
               && !/@bubble:/i.test(trimmed)){
        /* 额外检查：如果这个块级标签在同一行内就闭合了，且行很短，可能只是简单的行内使用，不保护 */
        var selfClosedMatch=trimmed.match(/^<([a-z]+)[\s>][\s\S]*<\/\1\s*>$/i);
        if(!selfClosedMatch || trimmed.length>200){
          isBlockStart=true;
        }
      }

      if(!isBlockStart){
        result.push(line);
        i++;
        continue;
      }

      /* 收集块级 HTML 块：追踪标签嵌套深度 */
      var blockLines=[line];
      var depth=0;
      var openTagPattern=/<(style|div|section|article|aside|header|footer|nav|main|table|form|fieldset|figure|details|dialog)[\s>]/gi;
      var closeTagPattern=/<\/(style|div|section|article|aside|header|footer|nav|main|table|form|fieldset|figure|details|dialog)\s*>/gi;

      /* 计算当前行的深度变化 */
      var opens=(line.match(openTagPattern)||[]).length;
      var closes=(line.match(closeTagPattern)||[]).length;
      depth+=opens-closes;
      i++;

      /* 如果第一行就闭合了（depth<=0），检查后续是否紧跟更多块级内容 */
      if(depth<=0){
        /* 看下一行是否也是块级标签开头（如 <style> 后紧跟 <div>） */
        while(i<lines.length){
          var nextTrimmed=lines[i].trim();
          if(!nextTrimmed){
            /* 空行：如果后面还有块级标签，继续收集；否则停止 */
            var lookahead=i+1;
            while(lookahead<lines.length && !lines[lookahead].trim()) lookahead++;
            if(lookahead<lines.length && /^<(style|div|section|article|aside|header|footer|nav|main|table|form|fieldset|figure|details|dialog)[\s>]/i.test(lines[lookahead].trim())){
              blockLines.push(lines[i]);
              i++;
              continue;
            }
            break;
          }
          if(/^<(style|div|section|article|aside|header|footer|nav|main|table|form|fieldset|figure|details|dialog)[\s>]/i.test(nextTrimmed)){
            blockLines.push(lines[i]);
            openTagPattern.lastIndex=0;
            closeTagPattern.lastIndex=0;
            opens=(lines[i].match(/<(style|div|section|article|aside|header|footer|nav|main|table|form|fieldset|figure|details|dialog)[\s>]/gi)||[]).length;
            closes=(lines[i].match(/<\/(style|div|section|article|aside|header|footer|nav|main|table|form|fieldset|figure|details|dialog)\s*>/gi)||[]).length;
            depth+=opens-closes;
            i++;
            if(depth>0) break; /* 进入嵌套追踪模式 */
          }else{
            break;
          }
        }
      }

      /* 如果还有未闭合的标签，继续收集直到闭合，然后再检查后续块级标签 */
      var maxScan=500; /* 安全上限，防止无限循环 */
      var scanned=0;
      var keepScanning=true;
      while(keepScanning && scanned<maxScan){
        /* 收集直到当前深度归零 */
        while(depth>0 && i<lines.length && scanned<maxScan){
          blockLines.push(lines[i]);
          opens=(lines[i].match(/<(style|div|section|article|aside|header|footer|nav|main|table|form|fieldset|figure|details|dialog)[\s>]/gi)||[]).length;
          closes=(lines[i].match(/<\/(style|div|section|article|aside|header|footer|nav|main|table|form|fieldset|figure|details|dialog)\s*>/gi)||[]).length;
          depth+=opens-closes;
          i++;
          scanned++;
        }
        /* 深度归零后，检查后续是否紧跟更多块级标签 */
        keepScanning=false;
        if(depth<=0 && i<lines.length){
          var peekIdx=i;
          /* 跳过空行 */
          while(peekIdx<lines.length && !lines[peekIdx].trim()) peekIdx++;
          if(peekIdx<lines.length && /^<(style|div|section|article|aside|header|footer|nav|main|table|form|fieldset|figure|details|dialog)[\s>]/i.test(lines[peekIdx].trim())){
            /* 收集中间的空行 */
            while(i<peekIdx){ blockLines.push(lines[i]); i++; }
            /* 收集这个新的块级标签行 */
            blockLines.push(lines[i]);
            opens=(lines[i].match(/<(style|div|section|article|aside|header|footer|nav|main|table|form|fieldset|figure|details|dialog)[\s>]/gi)||[]).length;
            closes=(lines[i].match(/<\/(style|div|section|article|aside|header|footer|nav|main|table|form|fieldset|figure|details|dialog)\s*>/gi)||[]).length;
            depth+=opens-closes;
            i++;
            scanned++;
            keepScanning=true; /* 继续追踪这个新块 */
          }
        }
      }

      /* 最终验证：收集到的块至少包含一个闭合标签，才认为是有效的块级 HTML */
      var blockContent=blockLines.join('\n');
      var hasCloseTag=/<\/(style|div|section|article|aside|header|footer|nav|main|table|form|fieldset|figure|details|dialog)\s*>/i.test(blockContent);

      if(hasCloseTag && blockLines.length>=1){
        /* 有效的块级 HTML 结构，替换为 embed token */
        var token=getHtmlEmbedToken(embeds.length);
        embeds.push(blockContent);
        result.push(token);
      }else{
        /* 不是有效的块级结构，保持原样 */
        for(var b=0;b<blockLines.length;b++){
          result.push(blockLines[b]);
        }
      }
    }

    return result.join('\n');
  }

  function extractSourceText(rawHtml){
    return (rawHtml||'')
      .replace(/\r\n?/g,'\n')
      .split(/\n/)
      .map(function(line){
        return stripBubbleLineHtmlWrappers(line);
      })
      .join('\n')
      .replace(/([^\n])\s*(@bubble:)/g,function(_,prefix,marker){
        return prefix+'\n'+marker;
      })
      .replace(/(^@bubble:[^\n]*\])\s*([^\s\n][^\n]*)/gm,function(_,bubble,trailing){
        return bubble+'\n'+trailing;
      });
  }

  function encodeUtf8Base64(text){
    try{return btoa(unescape(encodeURIComponent(text||'')));}
    catch(e){return '';}
  }

  function decodeUtf8Base64(text){
    try{return decodeURIComponent(escape(atob(text||'')));}
    catch(e){return '';}
  }

  function isHtmlFenceLang(lang){
    return /^(html|htm|xhtml)$/i.test((lang||'').trim());
  }

  function buildHtmlEmbedPlaceholder(source){
    return '<div class="dc-html-embed" data-html-b64="'+encodeUtf8Base64(source)+'"></div>';
  }

  function normalizeHtmlEmbedSource(source){
    var normalized=source||'';
    if(!normalized)return '';
    return normalized.replace(/<q\b[^>]*>/gi,'').replace(/<\/q>/gi,'');
  }

  var HOST_BRIDGE_GLOBAL_ALIASES={
    '$':['$','jQuery'],
    'jQuery':['jQuery','$'],
    'getChatMessages':['getChatMessages'],
    'getCurrentMessageId':['getCurrentMessageId'],
    'getContext':['getContext','SillyTavern.getContext'],
    'SillyTavern':['SillyTavern'],
    'toastr':['toastr','SillyTavern.toastr'],
    'eventSource':['eventSource','SillyTavern.eventSource'],
    'event_types':['event_types','SillyTavern.event_types'],
    'power_user':['power_user','SillyTavern.power_user'],
    'chat':['chat','SillyTavern.chat'],
    'chat_metadata':['chat_metadata','SillyTavern.chat_metadata'],
    'extension_settings':['extension_settings','SillyTavern.extension_settings'],
    'characters':['characters','SillyTavern.characters'],
    'this_chid':['this_chid','SillyTavern.this_chid'],
    'selected_group':['selected_group','SillyTavern.selected_group'],
    'eventOn':['eventOn','SillyTavern.eventOn'],
    'getButtonEvent':['getButtonEvent','SillyTavern.getButtonEvent'],
    'callGenericPopup':['callGenericPopup','SillyTavern.callGenericPopup'],
    'Popup':['Popup','SillyTavern.Popup'],
    'executeSlashCommands':['executeSlashCommands','SillyTavern.executeSlashCommands'],
    'renderExtensionTemplateAsync':['renderExtensionTemplateAsync','SillyTavern.renderExtensionTemplateAsync'],
    'Generate':['Generate','SillyTavern.Generate'],
    'activateSendButtons':['activateSendButtons','SillyTavern.activateSendButtons'],
    'deactivateSendButtons':['deactivateSendButtons','SillyTavern.deactivateSendButtons'],
    'BubbleCG':['BubbleCG']
  };

  function buildHtmlEmbedBridgeConfig(messageText){
    return {
      messageText:messageText||'',
      globalAliases:HOST_BRIDGE_GLOBAL_ALIASES
    };
  }

  function buildHtmlEmbedScriptDataUrl(code){
    return 'data:text/javascript;charset=utf-8;base64,'+encodeUtf8Base64(code||'');
  }

  function buildHtmlEmbedSrcdoc(source, context){
    var raw=normalizeHtmlEmbedSource(source).trim();
    if(!raw)return '';
    if(!/<(?:!doctype|html|body|head)\b/i.test(raw)){
      raw='<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><style>html,body{margin:0;padding:0;background:transparent;}</style></head><body>'+raw+'</body></html>';
    }
    context=context||{};
    var bridgeConfigB64=encodeUtf8Base64(JSON.stringify(buildHtmlEmbedBridgeConfig(context.messageText||'')));
    var bridgeScriptCode='(function(){try{var bridgeConfig=(function(text){try{return JSON.parse(decodeURIComponent(escape(atob(text||""))));}catch(e){return {};}})("'+bridgeConfigB64+'");var fallbackMessage=typeof bridgeConfig.messageText==="string"?bridgeConfig.messageText:"";var globalAliases=bridgeConfig&&bridgeConfig.globalAliases?bridgeConfig.globalAliases:{};function listAncestorWindows(){var list=[];var current=window.parent;var guard=0;while(current&&guard<12){list.push(current);try{if(!current.parent||current.parent===current)break;current=current.parent;}catch(e){break;}guard++;}return list;}var ancestorWindows=listAncestorWindows();function resolvePathOn(target,path){if(!target||!path)return null;var parts=String(path).split(".");var owner=null;var current=target;for(var i=0;i<parts.length;i++){if(current==null)return null;owner=current;current=current[parts[i]];}return{owner:owner,value:current};}function resolveHostValue(paths){paths=Array.isArray(paths)?paths:[];for(var p=0;p<paths.length;p++){for(var w=0;w<ancestorWindows.length;w++){try{var resolved=resolvePathOn(ancestorWindows[w],paths[p]);if(resolved&&resolved.value!==undefined&&resolved.value!==null){return typeof resolved.value==="function"?resolved.value.bind(resolved.owner||ancestorWindows[w]):resolved.value;}}catch(e){}}}return undefined;}function findAncestorElementById(id){for(var w=0;w<ancestorWindows.length;w++){try{var doc=ancestorWindows[w].document;if(!doc)continue;var el=Document.prototype.getElementById.call(doc,id);if(el)return el;}catch(e){}}return null;}function findAncestorSelector(selector,all){for(var w=0;w<ancestorWindows.length;w++){try{var doc=ancestorWindows[w].document;if(!doc)continue;if(all){var list=Document.prototype.querySelectorAll.call(doc,selector);if(list&&list.length)return list;}else{var el=Document.prototype.querySelector.call(doc,selector);if(el)return el;}}catch(e){}}return all?Document.prototype.querySelectorAll.call(document,".__dc-host-bridge-empty__"):null;}function patchDocumentBridge(doc){if(!doc||doc.__dcHtmlEmbedPatched)return;var originalGetElementById=function(id){return Document.prototype.getElementById.call(doc,id);};doc.getElementById=function(id){var direct=originalGetElementById(id);if(direct)return direct;return findAncestorElementById(id);};var originalQuerySelector=function(selector){return Document.prototype.querySelector.call(doc,selector);};doc.querySelector=function(selector){var direct=originalQuerySelector(selector);if(direct)return direct;return findAncestorSelector(selector,false);};var originalQuerySelectorAll=function(selector){return Document.prototype.querySelectorAll.call(doc,selector);};doc.querySelectorAll=function(selector){var direct=originalQuerySelectorAll(selector);if(direct&&direct.length)return direct;return findAncestorSelector(selector,true);};doc.__dcHtmlEmbedPatched=true;}function createDollarBridge(){if(window.__dcDollarBridge)return window.__dcDollarBridge;var bridge;if(typeof Proxy==="function"){bridge=new Proxy(function(){},{apply:function(target,thisArg,args){var hostDollar=resolveHostValue(globalAliases.$||["$","jQuery"]);if(typeof args[0]==="function"){if(typeof hostDollar==="function")return hostDollar(args[0]);if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",args[0],{once:true});else args[0]();return null;}if(typeof hostDollar==="function")return hostDollar.apply(null,args);return null;},get:function(target,prop){if(prop==="then")return undefined;var hostDollar=resolveHostValue(globalAliases.$||["$","jQuery"]);if(hostDollar&&prop in hostDollar)return hostDollar[prop];return target[prop];},set:function(target,prop,value){var hostDollar=resolveHostValue(globalAliases.$||["$","jQuery"]);if(hostDollar&&(typeof hostDollar==="object"||typeof hostDollar==="function")){hostDollar[prop]=value;return true;}target[prop]=value;return true;}});}else{bridge=function(arg){var hostDollar=resolveHostValue(globalAliases.$||["$","jQuery"]);if(typeof arg==="function"){if(typeof hostDollar==="function")return hostDollar(arg);if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",arg,{once:true});else arg();return null;}if(typeof hostDollar==="function")return hostDollar.apply(null,arguments);return null;};}window.__dcDollarBridge=bridge;return bridge;}function defineGlobalBridge(name,paths){if(name==="$"||name==="jQuery")return;if(name in window&&window[name]!==undefined&&window[name]!==null)return;Object.defineProperty(window,name,{configurable:true,enumerable:false,get:function(){if(name==="getCurrentMessageId"){var idFn=resolveHostValue(paths);if(typeof idFn==="function")return idFn;return function(){return "__dc_html_embed__";};}if(name==="getChatMessages"){var msgFn=resolveHostValue(paths);if(typeof msgFn==="function")return msgFn;return function(){return fallbackMessage?[{message:fallbackMessage}]:[];};}return resolveHostValue(paths);},set:function(value){Object.defineProperty(window,name,{value:value,writable:true,configurable:true,enumerable:true});}});}patchDocumentBridge(document);for(var docIdx=0;docIdx<ancestorWindows.length;docIdx++){try{patchDocumentBridge(ancestorWindows[docIdx].document);}catch(e){}}window.$=createDollarBridge();window.jQuery=window.$;var bridgeNames=Object.keys(globalAliases);for(var i=0;i<bridgeNames.length;i++)defineGlobalBridge(bridgeNames[i],globalAliases[bridgeNames[i]]);if(typeof window.getCurrentMessageId!=="function"){window.getCurrentMessageId=function(){return "__dc_html_embed__";};}if(typeof window.getChatMessages!=="function"){window.getChatMessages=function(){return fallbackMessage?[{message:fallbackMessage}]:[];};}window.__dcHostBridge={config:bridgeConfig,resolve:function(path){return resolveHostValue([path]);},findById:findAncestorElementById,query:function(selector){return findAncestorSelector(selector,false);},queryAll:function(selector){return findAncestorSelector(selector,true);}};}catch(e){console.warn("dc html embed bridge failed",e);}})();';
    var resizeScriptCode='(function(){function report(){try{var doc=document.documentElement;var body=document.body;var h=Math.max(doc?doc.scrollHeight:0,body?body.scrollHeight:0,body?body.offsetHeight:0,120);if(window.frameElement){window.frameElement.style.height=h+"px";}}catch(e){}}function bind(){report();if(typeof ResizeObserver==="function"){try{var ro=new ResizeObserver(report);if(document.documentElement)ro.observe(document.documentElement);if(document.body)ro.observe(document.body);}catch(e){}}else{setInterval(report,500);}window.addEventListener("load",report);setTimeout(report,60);setTimeout(report,220);}if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",bind,{once:true});}else{bind();}})();';
    var bridgeScriptUrl=buildHtmlEmbedScriptDataUrl(bridgeScriptCode);
    var resizeScriptUrl=buildHtmlEmbedScriptDataUrl(resizeScriptCode);
    if(typeof DOMParser!=="function"){
      return raw+'<scr'+'ipt src="'+bridgeScriptUrl+'"></scr'+'ipt><scr'+'ipt src="'+resizeScriptUrl+'"></scr'+'ipt>';
    }
    try{
      var parsed=new DOMParser().parseFromString(raw,'text/html');
      if(!parsed||!parsed.documentElement)return raw;
      var html=parsed.documentElement;
      var head=parsed.head;
      var body=parsed.body;
      if(!head){
        head=parsed.createElement('head');
        if(html.firstChild) html.insertBefore(head, html.firstChild);
        else html.appendChild(head);
      }
      if(!body){
        body=parsed.createElement('body');
        html.appendChild(body);
      }
      var bridgeScript=parsed.createElement('script');
      bridgeScript.setAttribute('src', bridgeScriptUrl);
      if(head.firstChild) head.insertBefore(bridgeScript, head.firstChild);
      else head.appendChild(bridgeScript);
      var resizeScript=parsed.createElement('script');
      resizeScript.setAttribute('src', resizeScriptUrl);
      body.appendChild(resizeScript);
      return '<!DOCTYPE html>'+html.outerHTML;
    }catch(e){
      console.warn('dc html embed srcdoc build failed',e);
      return raw+'<scr'+'ipt src="'+bridgeScriptUrl+'"></scr'+'ipt><scr'+'ipt src="'+resizeScriptUrl+'"></scr'+'ipt>';
    }
  }

  function hydrateHtmlEmbeds(root, messageText){
    var embeds=root.querySelectorAll('.dc-html-embed[data-html-b64]');
    for(var i=0;i<embeds.length;i++){
      var host=embeds[i];
      var htmlSource=decodeUtf8Base64(host.getAttribute('data-html-b64')||'');
      if(!htmlSource.trim()){
        host.remove();
        continue;
      }
      var frame=document.createElement('iframe');
      frame.className='dc-html-iframe';
      frame.setAttribute('scrolling','no');
      frame.setAttribute('loading','lazy');
      frame.style.height='120px';
      frame.srcdoc=buildHtmlEmbedSrcdoc(htmlSource,{messageText:messageText||''});
      host.innerHTML='';
      host.appendChild(frame);
    }
  }

  /* 从 IndexedDB 读头像 blob url */
  function getAvatar(charId,name){
    return new Promise(function(ok){
      if(!name){ok(null);return;}
      try{
        var r=indexedDB.open(DB_NAME,DB_VERSION);
        r.onsuccess=function(e){
          var db=e.target.result;
          if(!db.objectStoreNames.contains(ST_AV)){ok(null);return;}
          var tx=db.transaction(ST_AV,'readonly');
          var key=(charId||'_global_')+'__'+name;
          var g=tx.objectStore(ST_AV).get(key);
          g.onsuccess=function(){
            var record=g.result;
            if(!record){ok(null);return;}
            if(record.imageBlob){ok(URL.createObjectURL(record.imageBlob));return;}
            if(record.sourceUrl&&record.sourceUrl!=='null'&&record.sourceUrl.indexOf('http')===0){
              fetch(record.sourceUrl).then(function(resp){return resp.ok?resp.blob():null;}).then(function(blob){
                if(!blob){ok(null);return;}
                record.imageBlob=blob;record.fileSize=blob.size;record.mimeType=blob.type||record.mimeType;record.updatedAt=Date.now();
                try{var wTx=db.transaction(ST_AV,'readwrite');wTx.objectStore(ST_AV).put(record);}catch(_){}
                ok(URL.createObjectURL(blob));
              }).catch(function(){ok(null);});
              return;
            }
            ok(null);
          };
          g.onerror=function(){ok(null);};
        };
        r.onerror=function(){ok(null);};
      }catch(e){ok(null);}
    });
  }

  /* 从 IndexedDB 读 V2 头像 blob url */
  function getAvatarV2(charId,name){
    return new Promise(function(ok){
      if(!name){ok(null);return;}
      try{
        var r=indexedDB.open(DB_NAME,DB_VERSION);
        r.onsuccess=function(e){
          var db=e.target.result;
          if(!db.objectStoreNames.contains(ST_AV)){ok(null);return;}
          var tx=db.transaction(ST_AV,'readonly');
          var store=tx.objectStore(ST_AV);
          var key=(charId||'_global_')+'__'+name;
          var req=store.get(key);
          req.onsuccess=function(){
            var rec=req.result;
            if(!rec||!rec.sourceUrl2){ok(null);return;}
            if(rec.imageBlob2){
              var url2=URL.createObjectURL(rec.imageBlob2);
              ok(url2);return;
            }
            fetch(rec.sourceUrl2).then(function(res){return res.blob();}).then(function(blob){
              try{
                var tx2=db.transaction(ST_AV,'readwrite');
                var store2=tx2.objectStore(ST_AV);
                var rec2=Object.assign({},rec,{imageBlob2:blob,updatedAt:Date.now()});
                store2.put(rec2);
              }catch(e){}
              ok(URL.createObjectURL(blob));
            }).catch(function(){ok(null);});
          };
          req.onerror=function(){ok(null);};
        };
        r.onerror=function(){ok(null);};
      }catch(e){ok(null);}
    });
  }

  /* 切换头像版本 */
  function toggleAvatarVersion(charId,name,v2Key){
    var useV2=sessionStorage.getItem(v2Key)==='1';
    var imgs=document.querySelectorAll('.dc-msg-avatar img');
    Array.prototype.forEach.call(imgs,function(img){
      var avDiv=img.parentElement;
      if(!avDiv)return;
      var msg=avDiv.closest('.dc-msg');
      if(!msg||msg.dataset.name!==name)return;
      if(useV2){
        if(!img.dataset.v2){
          getAvatarV2(charId,name).then(function(v2url){
            if(v2url){
              img.dataset.v2=v2url;
              img.src=v2url;
            }
          });
        }else{
          img.src=img.dataset.v2;
        }
      }else{
        if(img.dataset.v1) img.src=img.dataset.v1;
      }
    });
  }

  /* 从 IndexedDB mood_avatars store 读差分头像 blob url */
  function getMoodAvatarUrl(charId,name,moodId){
    return new Promise(function(ok){
      if(!name||!moodId){ok(null);return;}
      try{
        var r=indexedDB.open(DB_NAME,DB_VERSION);
        r.onsuccess=function(e){
          var db=e.target.result;
          if(!db.objectStoreNames.contains('mood_avatars')){ok(null);return;}
          var tx=db.transaction('mood_avatars','readonly');
          var key=(charId||'_global_')+'__'+name+'__'+moodId;
          var g=tx.objectStore('mood_avatars').get(key);
          g.onsuccess=function(){
            var record=g.result;
            if(!record){ok(null);return;}
            if(record.imageBlob){ok(URL.createObjectURL(record.imageBlob));return;}
            if(record.sourceUrl&&record.sourceUrl!=='null'&&record.sourceUrl.indexOf('http')===0){
              fetch(record.sourceUrl).then(function(resp){return resp.ok?resp.blob():null;}).then(function(blob){
                if(!blob){ok(null);return;}
                record.imageBlob=blob;record.fileSize=blob.size;record.mimeType=blob.type||record.mimeType;record.updatedAt=Date.now();
                try{var wTx=db.transaction('mood_avatars','readwrite');wTx.objectStore('mood_avatars').put(record);}catch(_){}
                ok(URL.createObjectURL(blob));
              }).catch(function(){ok(null);});
              return;
            }
            ok(null);
          };
          g.onerror=function(){ok(null);};
        };
        r.onerror=function(){ok(null);};
      }catch(e){ok(null);}
    });
  }

  /* 从 IndexedDB config 读单个 key */
  function getConfigVal(key){
    return new Promise(function(ok){
      try{
        var r=indexedDB.open(DB_NAME,DB_VERSION);
        r.onsuccess=function(e){
          var db=e.target.result;
          if(!db.objectStoreNames.contains(ST_CF)){ok(null);return;}
          var tx=db.transaction(ST_CF,'readonly');
          var g=tx.objectStore(ST_CF).get(key);
          g.onsuccess=function(){ok(g.result?g.result.value:null);};
          g.onerror=function(){ok(null);};
        };
        r.onerror=function(){ok(null);};
      }catch(e){ok(null);}
    });
  }

  var FONT_CACHE_PREFIX='bubbleDialogueFontCache:';
  var STYLE_CACHE_KEY='bubbleDialogueStyleSnapshot';
  var REMOTE_FONT_TIMEOUT=8000;
  var BUILTIN_FONT_OPTIONS=[
    {id:'noto-sans-sc',name:'Noto Sans SC',family:'Noto Sans SC',type:'builtin'},
    {id:'source-han-sans-sc',name:'Source Han Sans SC',family:'Source Han Sans SC',type:'builtin'},
    {id:'noto-serif-sc',name:'Noto Serif SC',family:'Noto Serif SC',type:'builtin'},
    {id:'source-han-serif-sc',name:'Source Han Serif SC',family:'Source Han Serif SC',type:'builtin'},
    {id:'lxgw-wenkai',name:'LXGW WenKai',family:'LXGW WenKai',type:'builtin'},
    {id:'fira-code',name:'Fira Code',family:'Fira Code',type:'builtin'}
  ];
  var DEFAULT_MOOD_COLOR_GROUPS=[
    {id:'mood-joy',color:'#f59e0b',words:['开心','欢喜','欣喜','愉悦','满足','幸福','甜蜜','狂喜','兴奋','雀跃','畅快','陶醉','得意','骄傲','自豪','自信']},
    {id:'mood-anger',color:'#ef4444',words:['愤怒','暴怒','气愤','愤慨','暴躁','怨恨','敌意','恼火','窝火','生气','烦躁','烦闷']},
    {id:'mood-sad',color:'#3b82f6',words:['难过','伤心','心酸','忧伤','惆怅','失落','低落','沮丧','悲伤','心痛','悲痛','痛苦','委屈','不甘','失望','受伤','孤独','寂寞','落寞']},
    {id:'mood-anxious',color:'#eab308',words:['焦虑','紧张','不安','忐忑','担忧','慌张','焦躁','害怕','恐惧','惊恐','畏惧','胆怯','心慌','警惕','戒备']},
    {id:'mood-calm',color:'#22c55e',words:['平静','淡然','冷静','沉稳','从容','坦然','淡定','温馨','舒畅','惬意','温暖','欣慰','释然','感动','感恩']},
    {id:'mood-shy',color:'#06b6d4',words:['害羞','尴尬','窘迫','难堪','困惑','迷茫','疑惑','纠结','犹豫','无奈','无语']},
    {id:'mood-disgust',color:'#8b5cf6',words:['厌恶','嫌弃','鄙视','反感','排斥','抗拒','不屑','冷淡','冷漠','疏离','麻木']},
    {id:'mood-love',color:'#ec4899',words:['喜欢','爱慕','迷恋','倾慕','宠溺','依恋','心动','认真']}
  ];
  var MOOD_COLOR_GROUPS=DEFAULT_MOOD_COLOR_GROUPS;
  var MOOD_COLOR_MAP={};

  function rebuildMoodColorMap(){
    var map={};
    for(var i=0;i<MOOD_COLOR_GROUPS.length;i++){
      var group=MOOD_COLOR_GROUPS[i];
      for(var j=0;j<group.words.length;j++) map[group.words[j]]={color:group.color,id:group.id};
    }
    MOOD_COLOR_MAP=map;
  }
  rebuildMoodColorMap();

  function loadMoodConfig(){
    return getConfigVal('mood_config').then(function(raw){
      if(!raw) return;
      try{
        var cfg=JSON.parse(raw);
        if(cfg&&Array.isArray(cfg.groups)&&cfg.groups.length){
          MOOD_COLOR_GROUPS=cfg.groups;
          rebuildMoodColorMap();
        }
      }catch(e){
        /* 解析失败，保持默认值 */
      }
    }).catch(function(){
      /* 读取失败，保持默认值 */
    });
  }

  function clampNumber(value,min,max){
    if(!Number.isFinite(value)) return min;
    return Math.min(Math.max(value,min),max);
  }

  function buildFontStack(family,fallbackStack){
    family=typeof family==='string'?family.trim():'';
    return family?'"'+family.replace(/"/g,'\\"')+'",'+fallbackStack:fallbackStack;
  }

  function escapeHtmlAttr(value){
    return String(value==null?'':value)
      .replace(/&/g,'&amp;')
      .replace(/"/g,'&quot;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;');
  }

  function getCurrentCharId(){
    function tryGetContext(target){
      try{
        if(target&&target.SillyTavern&&typeof target.SillyTavern.getContext==='function'){
          return target.SillyTavern.getContext();
        }
      }catch(e){}
      return null;
    }

    function tryGetChid(target){
      try{
        if(target&&typeof target.this_chid!=='undefined'&&target.this_chid!==null){
          return target.this_chid;
        }
      }catch(e){}
      return undefined;
    }

    try{
      var localContext=tryGetContext(window);
      var parentContext=window.parent&&window.parent!==window?tryGetContext(window.parent):null;
      var chid=(localContext&&localContext.characterId!=null)?localContext.characterId
        :(parentContext&&parentContext.characterId!=null)?parentContext.characterId
        :tryGetChid(window);
      if(chid==null&&window.parent&&window.parent!==window){
        chid=tryGetChid(window.parent);
      }
      return chid!=null?String(chid):'';
    }catch(e){
      return '';
    }
  }

  function isInnerThoughtText(text){
    return /^\*.+\*$/.test((text||'').trim());
  }

  function getMoodRenderState(mood){
    var entry=MOOD_COLOR_MAP[(mood||'').trim()];
    if(!entry) return null;
    return {color:entry.color,background:hex2rgba(entry.color,0.15),id:entry.id};
  }

  function normalizeRemoteFontConfig(payload){
    var fonts=Array.isArray(payload&&payload.fonts)?payload.fonts:[];
    var normalized=[];
    for(var i=0;i<fonts.length;i++){
      var item=fonts[i]||{};
      var family=typeof item.family==='string'?item.family.trim():'';
      var name=typeof item.name==='string'?item.name.trim():family;
      var url=typeof item.url==='string'?item.url.trim():'';
      var type=item.type==='file'?'file':item.type==='css'?'css':'';
      var format=typeof item.format==='string'?item.format.trim():'';
      var id=typeof item.id==='string'&&item.id.trim()?item.id.trim():'remote-font-'+i;
      if(!family||!name||!url||!type) continue;
      normalized.push({id:id,name:name,family:family,url:url,type:type,format:format});
    }
    return normalized;
  }

  function getFontCacheKey(url){
    return FONT_CACHE_PREFIX+(url||'');
  }

  function readCachedFontConfig(url){
    if(!url) return [];
    try{
      var raw=localStorage.getItem(getFontCacheKey(url));
      if(!raw) return [];
      var parsed=JSON.parse(raw);
      return Array.isArray(parsed&&parsed.fonts)?parsed.fonts:[];
    }catch(e){
      return [];
    }
  }

  function writeCachedFontConfig(url,fonts){
    if(!url) return;
    try{
      localStorage.setItem(getFontCacheKey(url),JSON.stringify({version:'1.0',savedAt:Date.now(),fonts:fonts||[]}));
    }catch(e){
      // ignore cache errors
    }
  }

  function ensureRemoteFontResources(fonts){
    fonts=Array.isArray(fonts)?fonts:[];
    var head=document.head||document.getElementsByTagName('head')[0];
    if(!head) return;

    for(var i=0;i<fonts.length;i++){
      var font=fonts[i];
      if(font.type!=='css'||!font.url) continue;
      var links=head.querySelectorAll('link[data-dc-font-url]');
      var exists=false;
      for(var j=0;j<links.length;j++){
        if(links[j].getAttribute('data-dc-font-url')===font.url){ exists=true; break; }
      }
      if(!exists){
        var link=document.createElement('link');
        link.rel='stylesheet';
        link.href=font.url;
        link.setAttribute('data-dc-font-url',font.url);
        head.appendChild(link);
      }
    }

    var fileFonts=fonts.filter(function(font){return font.type==='file'&&font.url&&font.family;});
    if(!fileFonts.length) return;
    var styleEl=document.getElementById('dcRemoteFontFaceStyle');
    if(!styleEl){
      styleEl=document.createElement('style');
      styleEl.id='dcRemoteFontFaceStyle';
      head.appendChild(styleEl);
    }
    var rules=fileFonts.map(function(font){
      var formatPart=font.format?" format('"+font.format.replace(/'/g,"\\'")+"')":'';
      return "@font-face{font-family:'"+font.family.replace(/'/g,"\\'")+"';src:url('"+font.url.replace(/'/g,"\\'")+"')"+formatPart+";font-display:swap;}";
    }).join('');
    if(styleEl.textContent!==rules) styleEl.textContent=rules;
  }

  function fetchRemoteFontConfig(url){
    return new Promise(function(resolve,reject){
      if(!url){ resolve([]); return; }
      var timer=setTimeout(function(){ reject(new Error('字体配置拉取超时')); },REMOTE_FONT_TIMEOUT);
      fetch(url,{method:'GET',cache:'no-store'}).then(function(response){
        if(!response.ok) throw new Error('HTTP '+response.status);
        return response.json();
      }).then(function(payload){
        var fonts=normalizeRemoteFontConfig(payload);
        writeCachedFontConfig(url,fonts);
        resolve(fonts);
      }).catch(function(err){
        reject(err);
      }).finally(function(){
        clearTimeout(timer);
      });
    });
  }

  function ensureFontResources(cfg){
    cfg=cfg||{};
    var fontConfigUrl=typeof cfg.style_fontConfigUrl==='string'?cfg.style_fontConfigUrl.trim():'';
    if(!fontConfigUrl) return Promise.resolve(BUILTIN_FONT_OPTIONS.slice());
    return fetchRemoteFontConfig(fontConfigUrl).then(function(remoteFonts){
      ensureRemoteFontResources(remoteFonts);
      return BUILTIN_FONT_OPTIONS.concat(remoteFonts);
    }).catch(function(err){
      var cachedFonts=readCachedFontConfig(fontConfigUrl);
      if(cachedFonts.length){
        ensureRemoteFontResources(cachedFonts);
        return BUILTIN_FONT_OPTIONS.concat(cachedFonts);
      }
      console.warn('远程字体加载失败:',fontConfigUrl,err);
      return BUILTIN_FONT_OPTIONS.slice();
    });
  }

  function loadLocalFonts(){
    return new Promise(function(resolve){
      try{
        var r=indexedDB.open(DB_NAME,DB_VERSION);
        r.onsuccess=function(e){
          var db=e.target.result;
          if(!db.objectStoreNames.contains('local_fonts')){resolve([]);return;}
          var tx=db.transaction('local_fonts','readonly');
          var store=tx.objectStore('local_fonts');
          var all=store.getAll();
          all.onsuccess=function(){
            var fonts=all.result||[];
            var head=document.head||document.getElementsByTagName('head')[0];
            if(!head||!fonts.length){resolve(fonts);return;}
            var styleEl=document.getElementById('dcLocalFontFaceStyle');
            if(!styleEl){
              styleEl=document.createElement('style');
              styleEl.id='dcLocalFontFaceStyle';
              head.appendChild(styleEl);
            }
            var rules=[];
            for(var i=0;i<fonts.length;i++){
              var font=fonts[i];
              if(!font.fontBlob||!font.family) continue;
              var blobUrl=URL.createObjectURL(font.fontBlob);
              var formatPart=font.format?" format('"+font.format+"')":'';
              rules.push("@font-face{font-family:'"+font.family.replace(/'/g,"\\'")+"';src:url('"+blobUrl+"')"+formatPart+";font-display:swap;}");
            }
            styleEl.textContent=rules.join('');
            resolve(fonts);
          };
          all.onerror=function(){resolve([]);};
        };
        r.onerror=function(){resolve([]);};
      }catch(e){resolve([]);}
    });
  }

  function loadCssFontSources(){
    return getConfigVal('style_cssFontUrls').then(function(raw){
      var sources=[];
      try{sources=JSON.parse(raw||'[]');}catch(e){sources=[];}
      var head=document.head||document.getElementsByTagName('head')[0];
      if(!head||!sources.length) return;
      for(var i=0;i<sources.length;i++){
        var src=sources[i];
        if(!src||!src.url) continue;
        var links=head.querySelectorAll('link[data-dc-css-font-url]');
        var exists=false;
        for(var j=0;j<links.length;j++){
          if(links[j].getAttribute('data-dc-css-font-url')===src.url){exists=true;break;}
        }
        if(!exists){
          var link=document.createElement('link');
          link.rel='stylesheet';
          link.href=src.url;
          link.setAttribute('data-dc-css-font-url',src.url);
          head.appendChild(link);
        }
      }
    }).catch(function(){});
  }

  function readStyleConfigCache(){
    try{
      var raw=localStorage.getItem(STYLE_CACHE_KEY);
      if(!raw) return {};
      var parsed=JSON.parse(raw);
      return parsed&&typeof parsed==='object'?parsed:{};
    }catch(e){
      return {};
    }
  }

  function getStyleConfig(){
    var defaults={
      style_dialogueFontSize:14.5,
      style_narrationFontSize:14,
      style_dialogueSpacing:10,
      style_textColorMode:'global',
      style_globalTextColor:'#d9d9d9',
      style_markdownMode:'basic',
      style_dialogueFontWeight:400,
      style_narrationFontWeight:400,
      style_nameFontWeight:800,
      style_narrationBgColor:'#ffffff',
      style_narrationBgOpacity:0.04,
      style_avatarSize:48,
      style_narrationIndent:20,
      style_narrationFontFamily:'Noto Sans SC',
      style_dialogueFontFamily:'Noto Serif SC',
      style_nameFontFamily:'Noto Serif SC',
      style_fontConfigUrl:'',
      style_narrationBorderRadius:4,
      style_avatarShape:'rounded',
      style_thoughtSuffixGap:6,
      style_thoughtSuffixOffsetY:5,
      style_narrationTextIndent:2,
      style_narrationLineHeight:1.75,
      style_narrationPaddingRight:16
    };
    var numericKeys={
      style_dialogueFontSize:true,
      style_narrationFontSize:true,
      style_dialogueSpacing:true,
      style_dialogueFontWeight:true,
      style_narrationFontWeight:true,
      style_nameFontWeight:true,
      style_narrationBgOpacity:true,
      style_avatarSize:true,
      style_narrationIndent:true,
      style_narrationBorderRadius:true,
      style_thoughtSuffixGap:true,
      style_thoughtSuffixOffsetY:true,
      style_narrationTextIndent:true,
      style_narrationLineHeight:true,
      style_narrationPaddingRight:true
    };
    var intKeys={
      style_dialogueSpacing:true,
      style_dialogueFontWeight:true,
      style_narrationFontWeight:true,
      style_nameFontWeight:true,
      style_avatarSize:true,
      style_narrationIndent:true,
      style_narrationBorderRadius:true,
      style_thoughtSuffixGap:true,
      style_thoughtSuffixOffsetY:true,
      style_narrationPaddingRight:true
    };
    var keys=Object.keys(defaults);
    var cached=readStyleConfigCache();

    function normalizeStyleValue(key,val,fallback){
      var base=fallback===undefined?defaults[key]:fallback;
      if(val===null||val===undefined||val==='') return base;
      if(numericKeys[key]){
        var parsed=intKeys[key]?parseInt(val,10):parseFloat(val);
        return Number.isFinite(parsed)?parsed:base;
      }
      return val;
    }

    var cfg={};
    for(var c=0;c<keys.length;c++){
      var cacheKey=keys[c];
      cfg[cacheKey]=normalizeStyleValue(cacheKey,cached[cacheKey],defaults[cacheKey]);
    }

    return Promise.all(keys.map(function(key){
      return getConfigVal(key).then(function(val){
        return [key,val];
      });
    })).then(function(entries){
      for(var i=0;i<entries.length;i++){
        var key=entries[i][0];
        var val=entries[i][1];
        cfg[key]=normalizeStyleValue(key,val,cfg[key]);
      }
      return cfg;
    });
  }

  /* 名字渲染：第1字大号染色，第3字小号染色，其余小号默认色 */
  function renderName(name, colorClass){
    var html='';
    for(var i=0;i<name.length;i++){
      var ch=esc(name[i]);
      if(i===0){
        html+='<span class="dc-ch '+colorClass+'">'+ch+'</span>';
      }else if(i===2){
        html+='<span class="dc-cs '+colorClass+'">'+ch+'</span>';
      }else{
        html+='<span class="dc-cn">'+ch+'</span>';
      }
    }
    return html;
  }

  /* Markdown 基础模式：粗体、斜体、删除线 */
  function mdBasic(text, inlineHtmlTokens){
    text=esc(text);
    text=text.replace(/\*\*(.+?)\*\*/g,function(_,g1){return '<strong>'+g1+'</strong>';});
    text=text.replace(/\*(.+?)\*/g,function(_,g1){return '<em>'+g1+'</em>';});
    text=text.replace(/~~(.+?)~~/g,function(_,g1){return '<del>'+g1+'</del>';});
    text=text.replace(/`([^`]+)`/g,function(_,g1){return '<code>'+g1+'</code>';});
    return restoreInlineHtmlTokens(text, inlineHtmlTokens);
  }

  /* Markdown 完整模式 */
  function mdFull(lines, inlineHtmlTokens){
    var html='';
    var inCode=false,codeBuf=[];
    var inTable=false,tableBuf=[];
    var inList=false,listType='',listBuf=[];

    function flushList(){
      if(!listBuf.length)return;
      var tag=listType==='ol'?'ol':'ul';
      html+='<'+tag+'>'+listBuf.join('')+'</'+tag+'>';
      listBuf=[];inList=false;listType='';
    }
    function flushTable(){
      if(!tableBuf.length)return;
      html+='<table>';
      for(var t=0;t<tableBuf.length;t++){
        if(t===1)continue; /* skip separator row */
        var cells=tableBuf[t].split('|').map(function(c){return c.trim();}).filter(function(c){return c!=='';});
        var tag=t===0?'th':'td';
        var tr='<tr>';
        for(var c=0;c<cells.length;c++) tr+='<'+tag+'>'+mdInline(cells[c])+'</'+tag+'>';
        tr+='</tr>';
        html+=tr;
      }
      html+='</table>';
      tableBuf=[];inTable=false;
    }

    function mdInline(text){
      text=esc(text);
      text=text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,function(_,alt,src){return '<img src="'+src+'" alt="'+alt+'"/>';});
      text=text.replace(/\[([^\]]+)\]\(([^)]+)\)/g,function(_,label,href){return '<a href="'+href+'" target="_blank" rel="noopener noreferrer">'+label+'</a>';});
      text=text.replace(/\*\*(.+?)\*\*/g,function(_,g1){return '<strong>'+g1+'</strong>';});
      text=text.replace(/\*(.+?)\*/g,function(_,g1){return '<em>'+g1+'</em>';});
      text=text.replace(/~~(.+?)~~/g,function(_,g1){return '<del>'+g1+'</del>';});
      text=text.replace(/`([^`]+)`/g,function(_,g1){return '<code>'+g1+'</code>';});
      return restoreInlineHtmlTokens(text, inlineHtmlTokens);
    }

    var codeFencePattern=new RegExp('^'+String.fromCharCode(96)+'{3}');
    for(var i=0;i<lines.length;i++){
      var line=lines[i];
      /* 代码块 */
      if(codeFencePattern.test(line)){
        if(inCode){codeBuf.push('</code></pre>');html+=codeBuf.join('\n');codeBuf=[];inCode=false;}
        else{flushList();flushTable();inCode=true;codeBuf=['<pre><code>'];}
        continue;
      }
      if(inCode){codeBuf.push(esc(line));continue;}

      var trimmed=line.trim();
      if(!trimmed){flushList();flushTable();continue;}

      /* 表格检测 */
      if(trimmed.indexOf('|')!==-1){
        if(!inTable&&trimmed.match(/^\|.*\|$/)){
          flushList();
          inTable=true;tableBuf=[trimmed];continue;
        }
        if(inTable){
          if(trimmed.match(/^\|[\s\-:|]+\|$/)){tableBuf.push(trimmed);continue;}
          if(trimmed.match(/^\|.*\|$/)){tableBuf.push(trimmed);continue;}
          else{flushTable();}
        }
      }else if(inTable){flushTable();}

      /* 标题 */
      var hm=trimmed.match(/^(#{1,6})\s+(.+)$/);
      if(hm){flushList();var lvl=hm[1].length;html+='<h'+lvl+'>'+mdInline(hm[2])+'</h'+lvl+'>';continue;}

      /* 分割线 */
      if(trimmed.match(/^(-{3,}|\*{3,}|_{3,})$/)){flushList();html+='<hr/>';continue;}

      /* 引用 */
      if(trimmed.match(/^>\s?/)){flushList();html+='<blockquote>'+mdInline(trimmed.replace(/^>\s?/,''))+'</blockquote>';continue;}

      /* 无序列表 */
      var ulm=trimmed.match(/^[-*+]\s+(.+)$/);
      if(ulm){
        if(inList&&listType!=='ul'){flushList();}
        inList=true;listType='ul';
        listBuf.push('<li>'+mdInline(ulm[1])+'</li>');continue;
      }
      /* 有序列表 */
      var olm=trimmed.match(/^\d+\.\s+(.+)$/);
      if(olm){
        if(inList&&listType!=='ol'){flushList();}
        inList=true;listType='ol';
        listBuf.push('<li>'+mdInline(olm[1])+'</li>');continue;
      }

      flushList();
      html+='<p>'+mdInline(trimmed)+'</p>';
    }
    if(inCode){codeBuf.push('</code></pre>');html+=codeBuf.join('\n');}
    flushList();flushTable();
    return html;
  }

  function renderRichText(text, inlineHtmlTokens){
    return restoreInlineHtmlTokens(esc(text), inlineHtmlTokens);
  }

  function renderNarration(lines, markdownMode, htmlEmbeds, inlineHtmlTokens){
    var tick=String.fromCharCode(96);
    var codeFenceLinePattern=new RegExp('^'+tick+'{3,}\\s*([a-z0-9_-]+)?\\s*$','i');
    var embedTokenPattern=/^@@DC_HTML_EMBED_(\d+)@@$/;
    var parts=[];
    var textBuf=[];
    var htmlBuf=[];
    var inHtmlFence=false;
    htmlEmbeds=Array.isArray(htmlEmbeds)?htmlEmbeds:[];

    function flushText(){
      if(!textBuf.length)return;
      if(markdownMode==='full'){
        parts.push(mdFull(textBuf, inlineHtmlTokens));
      }else{
        parts.push(textBuf.map(function(l){return '<p>'+mdBasic(l, inlineHtmlTokens)+'</p>';}).join(''));
      }
      textBuf=[];
    }

    for(var i=0;i<lines.length;i++){
      var line=lines[i];
      var embedMatch=line.trim().match(embedTokenPattern);
      if(embedMatch){
        flushText();
        parts.push(buildHtmlEmbedPlaceholder(htmlEmbeds[parseInt(embedMatch[1],10)]||''));
        continue;
      }
      var fenceMatch=line.trim().match(codeFenceLinePattern);
      if(fenceMatch){
        var fenceLang=(fenceMatch[1]||'').toLowerCase();
        if(inHtmlFence){
          parts.push(buildHtmlEmbedPlaceholder(htmlBuf.join('\n')));
          htmlBuf=[];
          inHtmlFence=false;
        }else if(isHtmlFenceLang(fenceLang)){
          flushText();
          inHtmlFence=true;
        }else{
          textBuf.push(line);
        }
        continue;
      }
      if(inHtmlFence){
        htmlBuf.push(line);
      }else{
        textBuf.push(line);
      }
    }

    if(inHtmlFence){
      parts.push(buildHtmlEmbedPlaceholder(htmlBuf.join('\n')));
    }
    flushText();
    return parts.join('');
  }

  function getDialogueLineHeight(fontSize, spacing){
    var safeFontSize=Number.isFinite(fontSize)?fontSize:14.5;
    var safeSpacing=Number.isFinite(spacing)?spacing:10;
    var computed=Math.max(safeFontSize*1.35,safeFontSize+safeSpacing);
    return Math.round(computed*100)/100;
  }

  function scheduleFrameTask(callback, delay){
    var safeDelay=Number.isFinite(delay)?delay:0;
    var runner=function(){ setTimeout(callback, safeDelay); };
    if(typeof requestAnimationFrame==='function'){
      requestAnimationFrame(runner);
      return;
    }
    setTimeout(callback, safeDelay);
  }

  function scheduleAvatarEnhancement(root,colorMode,globalColor){
    scheduleFrameTask(function(){
      loadAvatarsAndColors(root,colorMode,globalColor);
    }, 60);
  }

  var bubbleRenderBooted=false;
  var bubbleRenderSourceObserver=null;
  var bubbleRenderWatchLogTimer=null;
  var bubbleRenderStableTimer=null;
  var bubbleRenderWatchStartedAt=0;
  var bubbleRenderLastMutationAt=0;
  var bubbleRenderLastSignature='';
  var bubbleRenderBootRetryCount=0;
  var BUBBLE_RENDER_STABLE_MS=3000;
  var BUBBLE_RENDER_WATCH_LOG_MS=1000;
  var BUBBLE_RENDER_BOOT_RETRY_MS=180;
  var BUBBLE_RENDER_BOOT_MAX_RETRIES=20;

  function readBubbleRenderSourceValue(sourceEl){
    if(!sourceEl)return '';
    return String(sourceEl.value||sourceEl.textContent||'');
  }

  function buildBubbleRenderSourceSignature(sourceEl){
    var rawValue=readBubbleRenderSourceValue(sourceEl);
    return [rawValue.length, rawValue].join('::');
  }

  function analyzeBubbleRenderSourceState(sourceEl){
    var sourceRaw=readBubbleRenderSourceValue(sourceEl);
    /* === SceneInfo Environment Parser === */
var _dcSceneMatch=sourceRaw.match(/<SceneInfo>([\s\S]*?)<\/SceneInfo>/);
var _dcSceneData={time:'',weather:'',date:'',location:''};
if(_dcSceneMatch){
  var _si=_dcSceneMatch[1];
  var _tm=_si.match(/时间[：:]\s*(.+)/);if(_tm)_dcSceneData.time=_tm[1].trim();
  var _wm=_si.match(/天气[：:]\s*(.+)/);if(_wm)_dcSceneData.weather=_wm[1].trim();
  var _dm=_si.match(/日期[：:]\s*(.+)/);if(_dm)_dcSceneData.date=_dm[1].trim();
  var _lm=_si.match(/地点[：:]\s*(.+)/);if(_lm)_dcSceneData.location=_lm[1].trim();
}
if(!_dcSceneData.time||!_dcSceneData.location){
  var _lines=sourceRaw.split('\n').slice(0,10);
  for(var _li=0;_li<_lines.length;_li++){
    var _ln=_lines[_li].trim();
    if(!_dcSceneData.location&&_ln.match(/^地点[：:]/))_dcSceneData.location=_ln.replace(/^地点[：:]\s*/,'');
    if(!_dcSceneData.time&&_ln.match(/^时间[：:]/))_dcSceneData.time=_ln.replace(/^时间[：:]\s*/,'');
  }
}
function _dcGetTod(t){
  if(!t)return 'day';
  var h=12;
  var m=t.match(/(\d{1,2})[:：](\d{1,2})/);
  if(m)h=parseInt(m[1]);
  else if(t.match(/(\d{1,2})\s*[时点]/))h=parseInt(t.match(/(\d{1,2})\s*[时点]/)[1]);
  if(h>=5&&h<7)return 'dawn';
  if(h>=7&&h<10)return 'morning';
  if(h>=10&&h<14)return 'noon';
  if(h>=14&&h<17)return 'afternoon';
  if(h>=17&&h<19)return 'dusk';
  if(h>=19&&h<22)return 'evening';
  if(h>=22||h<2)return 'night';
  return 'latenight';
}
var _dcTod=_dcGetTod(_dcSceneData.time);
if(_dcTod==='day'){
  var _tw=_dcSceneData.time;
  if(/凌晨|深夜/.test(_tw))_dcTod='latenight';
  else if(/清晨|早晨|早上|上午/.test(_tw))_dcTod='morning';
  else if(/中午|正午/.test(_tw))_dcTod='noon';
  else if(/下午/.test(_tw))_dcTod='afternoon';
  else if(/傍晚|黄昏/.test(_tw))_dcTod='dusk';
  else if(/晚上|夜/.test(_tw))_dcTod='evening';
}
var _dcWeatherExclude=['杨小雪','白晓雪','苏雨','云伊','陈思雨','郭雨瑶','赵诗晴','韩冰娇','沈漾','沈幼楚','林听晚','沈静宜','温若宁','海霖','夏祈','赵小满','赵自由'];
var _dcWeather='';
if(_dcSceneData.weather){
  var _w=_dcSceneData.weather;
  if(/雨.*暴|暴.*雨|雷暴|暴雨|狂风暴雨/.test(_w))_dcWeather='storm';
  else if(/雨|阵雨|小雨|中雨|细雨/.test(_w))_dcWeather='rain';
  else if(/雪|飘雪|小雪|大雪/.test(_w))_dcWeather='snow';
  else if(/雾|大雾|薄雾|雾霾/.test(_w))_dcWeather='fog';
}
if(!_dcWeather){
  var _fullText=sourceRaw.substring(0,2000);
  var _cleanText=_fullText;
  for(var _ei=0;_ei<_dcWeatherExclude.length;_ei++){
    _cleanText=_cleanText.replace(new RegExp(_dcWeatherExclude[_ei],'g'),'');
  }
  if(/外面下着(大|暴)雨|暴雨|雷雨/.test(_cleanText))_dcWeather='storm';
  else if(/下着雨|雨点|雨水|淋雨|小雨|细雨/.test(_cleanText))_dcWeather='rain';
  else if(/飘雪|雪花|下雪|积雪/.test(_cleanText))_dcWeather='snow';
  else if(/大雾|薄雾|雾气|迷雾/.test(_cleanText))_dcWeather='fog';
}
var _dcSeason='';
if(_dcSceneData.date){
  var _dm2=_dcSceneData.date.match(/(\d{1,2})月/);
  if(_dm2){
    var _month=parseInt(_dm2[1]);
    if(_month>=3&&_month<=5)_dcSeason='spring';
    else if(_month>=6&&_month<=8)_dcSeason='summer';
    else if(_month>=9&&_month<=11)_dcSeason='autumn';
    else _dcSeason='winter';
  }
}
var _dcEnvData={tod:_dcTod,weather:_dcWeather,season:_dcSeason,location:_dcSceneData.location};
/* === Post-render IIFE === */
(function(){
  var _retry=0;
  function _runAll(){
    var root=document.querySelector('.dc-root');
    if(!root||!root.children.length){
      if(_retry++<50)setTimeout(_runAll,200);
      return;
    }
    /* Apply env data */
    if(_dcEnvData.tod)root.setAttribute('data-timeofday',_dcEnvData.tod);
    if(_dcEnvData.weather)root.setAttribute('data-weather',_dcEnvData.weather);
    if(_dcEnvData.season)root.setAttribute('data-season',_dcEnvData.season);
    /* Build CHAR_THEMES: auto fallback + manual per-character design */
    var CHAR_THEMES={};
    var _ai=0;
    if(typeof CHAR_COLOR_MAP!=='undefined'){
      for(var _cn in CHAR_COLOR_MAP){
        CHAR_THEMES[_cn]={c:CHAR_COLOR_MAP[_cn],a:0,e:0};
        _ai++;
      }
    }
    /* Manual override: each character's accent(a) and entrance(e) based on personality */
    /* a: 0=solid(强势/直接) 1=gradient(温柔/复杂) 2=dashed(脆弱/逃避) 3=glow(神秘/耀眼) 4=inner(克制/内敛) */
    /* e: 0=translateY+scale(沉稳) 1=translateX(怯/隐秘) 2=translateY-down(权威) 3=scale-bounce(活泼) 4=blur(神秘/飘渺) */
    var _tm={
      '丁曼红':{a:4,e:2,d:0.38,t:'cubic-bezier(0.33,1,0.68,1)',dl:0},
      '云伊':{a:2,e:1,d:0.42,t:'cubic-bezier(0.25,0.46,0.45,0.94)',dl:0.02},
      '伦欣桐':{a:0,e:0,d:0.45,t:'ease-out',dl:0},
      '兰叶':{a:1,e:0,d:0.40,t:'ease-out',dl:0.01},
      '兰心':{a:3,e:4,d:0.52,t:'ease-out',dl:0.03},
      '刘予安':{a:0,e:2,d:0.32,t:'cubic-bezier(0.33,1,0.68,1)',dl:0},
      '刘波':{a:0,e:3,d:0.38,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.04},
      '刘祈音':{a:0,e:2,d:0.34,t:'cubic-bezier(0.33,1,0.68,1)',dl:0},
      '刘恩泽':{a:2,e:1,d:0.40,t:'cubic-bezier(0.25,0.46,0.45,0.94)',dl:0.02},
      '吴海文':{a:1,e:0,d:0.42,t:'ease-out',dl:0.01},
      '周灵':{a:2,e:4,d:0.55,t:'ease-out',dl:0.05},
      '周语彤':{a:0,e:1,d:0.36,t:'cubic-bezier(0.25,0.46,0.45,0.94)',dl:0.02},
      '唐蜜':{a:3,e:3,d:0.42,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.03},
      '夏祈':{a:2,e:4,d:0.50,t:'ease-out',dl:0.06},
      '孙琦':{a:1,e:0,d:0.38,t:'ease-out',dl:0},
      '孙瑞希':{a:1,e:3,d:0.40,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.02},
      '孙翌童':{a:3,e:4,d:0.48,t:'ease-out',dl:0.04},
      '孙苑清':{a:1,e:0,d:0.40,t:'ease-out',dl:0.01},
      '安春生':{a:3,e:0,d:0.45,t:'ease-out',dl:0.02},
      '安琳':{a:0,e:2,d:0.36,t:'cubic-bezier(0.33,1,0.68,1)',dl:0},
      '庞咏萱':{a:1,e:3,d:0.44,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.03},
      '庞颖':{a:4,e:0,d:0.42,t:'ease-out',dl:0.01},
      '张子薇':{a:0,e:1,d:0.34,t:'cubic-bezier(0.25,0.46,0.45,0.94)',dl:0},
      '张薇薇':{a:3,e:4,d:0.50,t:'ease-out',dl:0.04},
      '文澜':{a:2,e:4,d:0.52,t:'ease-out',dl:0.03},
      '文素':{a:2,e:1,d:0.40,t:'cubic-bezier(0.25,0.46,0.45,0.94)',dl:0.02},
      '文素（大）':{a:2,e:4,d:0.54,t:'ease-out',dl:0.04},
      '文茜':{a:4,e:1,d:0.38,t:'cubic-bezier(0.25,0.46,0.45,0.94)',dl:0.01},
      '文馨':{a:1,e:3,d:0.42,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.02},
      '文鸢':{a:0,e:3,d:0.36,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.03},
      '方敏':{a:1,e:0,d:0.38,t:'ease-out',dl:0},
      '明香香':{a:3,e:3,d:0.38,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.04},
      '智允':{a:2,e:4,d:0.55,t:'ease-out',dl:0.07},'罗可可':{a:1,e:3,d:0.38,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.02},
      '朱玥':{a:4,e:0,d:0.42,t:'ease-out',dl:0.01},
      '李南星':{a:1,e:3,d:0.40,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.02},
      '杨小雪':{a:2,e:1,d:0.42,t:'cubic-bezier(0.25,0.46,0.45,0.94)',dl:0.03},
      '林墨':{a:4,e:0,d:0.46,t:'ease-out',dl:0.01},
      '林安安':{a:3,e:3,d:0.40,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.03},
      '林安安（小马）':{a:3,e:3,d:0.42,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.02},
      '林沐宜':{a:4,e:2,d:0.38,t:'cubic-bezier(0.33,1,0.68,1)',dl:0.01},
      '林闻夏':{a:2,e:1,d:0.38,t:'cubic-bezier(0.25,0.46,0.45,0.94)',dl:0.02},
      '柳青':{a:1,e:3,d:0.40,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.03},
      '江静屿':{a:0,e:2,d:0.30,t:'cubic-bezier(0.33,1,0.68,1)',dl:0},
      '汤倩':{a:2,e:1,d:0.40,t:'cubic-bezier(0.25,0.46,0.45,0.94)',dl:0.03},
      '汤加琳':{a:1,e:0,d:0.40,t:'ease-out',dl:0},
      '沈幼楚':{a:4,e:0,d:0.50,t:'ease-out',dl:0.02},
      '沈漾':{a:1,e:0,d:0.38,t:'ease-out',dl:0},
      '沈静宜':{a:4,e:2,d:0.36,t:'cubic-bezier(0.33,1,0.68,1)',dl:0.01},
      '沛涵':{a:2,e:1,d:0.42,t:'cubic-bezier(0.25,0.46,0.45,0.94)',dl:0.04},
      '洪欣彤':{a:3,e:3,d:0.40,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.03},
      '海霖':{a:3,e:3,d:0.42,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.02},
      '淑静':{a:4,e:0,d:0.44,t:'ease-out',dl:0.01},
      '温若宁':{a:1,e:0,d:0.40,t:'ease-out',dl:0},
      '源丽萍':{a:0,e:2,d:0.34,t:'cubic-bezier(0.33,1,0.68,1)',dl:0},
      '独孤春儿':{a:2,e:4,d:0.54,t:'ease-out',dl:0.05},
      '珞曼':{a:4,e:0,d:0.42,t:'ease-out',dl:0.01},
      '珞珈':{a:1,e:1,d:0.38,t:'cubic-bezier(0.25,0.46,0.45,0.94)',dl:0.02},
      '珞花':{a:3,e:4,d:0.48,t:'ease-out',dl:0.04},
      '男人':{a:0,e:0,d:0.36,t:'ease-out',dl:0},
      '白晓雪':{a:2,e:1,d:0.44,t:'cubic-bezier(0.25,0.46,0.45,0.94)',dl:0.03},
      '祝佩玲':{a:4,e:2,d:0.38,t:'cubic-bezier(0.33,1,0.68,1)',dl:0.01},
      '祝绝响':{a:3,e:4,d:0.48,t:'ease-out',dl:0.04},
      '胡静':{a:0,e:2,d:0.34,t:'cubic-bezier(0.33,1,0.68,1)',dl:0},
      '芍药':{a:0,e:0,d:0.40,t:'ease-out',dl:0},
      '苏晚棠':{a:2,e:1,d:0.42,t:'cubic-bezier(0.25,0.46,0.45,0.94)',dl:0.03},
      '苏紫宁':{a:1,e:1,d:0.38,t:'cubic-bezier(0.25,0.46,0.45,0.94)',dl:0.02},
      '苏雨':{a:1,e:0,d:0.38,t:'ease-out',dl:0},
      '荣柔柔':{a:3,e:0,d:0.42,t:'ease-out',dl:0.02},
      '萧容鱼':{a:4,e:0,d:0.44,t:'ease-out',dl:0.01},
      '董世青':{a:0,e:2,d:0.32,t:'cubic-bezier(0.33,1,0.68,1)',dl:0},
      '裴姝权':{a:2,e:4,d:0.50,t:'ease-out',dl:0.05},
      '让娜':{a:1,e:3,d:0.42,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.03},
      '许愿':{a:1,e:3,d:0.40,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.02},
      '许明薇':{a:4,e:0,d:0.46,t:'ease-out',dl:0.02},
      '贺玲':{a:3,e:3,d:0.38,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.04},
      '赵小满':{a:2,e:3,d:0.40,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.03},
      '赵自由':{a:0,e:0,d:0.44,t:'ease-out',dl:0},
      '赵诗晴':{a:0,e:2,d:0.34,t:'cubic-bezier(0.33,1,0.68,1)',dl:0},
      '赵雅琴':{a:4,e:2,d:0.38,t:'cubic-bezier(0.33,1,0.68,1)',dl:0.01},
      '那可':{a:3,e:4,d:0.50,t:'ease-out',dl:0.04},
      '郭雨瑶':{a:1,e:3,d:0.40,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.02},
      '金宁':{a:1,e:3,d:0.38,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.02},
      '金晶晶':{a:1,e:0,d:0.36,t:'ease-out',dl:0},
      '阳灿':{a:3,e:1,d:0.44,t:'cubic-bezier(0.25,0.46,0.45,0.94)',dl:0.02},
      '陈书婷':{a:2,e:1,d:0.42,t:'cubic-bezier(0.25,0.46,0.45,0.94)',dl:0.03},
      '陈思雨':{a:1,e:3,d:0.40,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.02},
      '陈晓北':{a:1,e:0,d:0.40,t:'ease-out',dl:0},
      '陈浩':{a:2,e:1,d:0.40,t:'cubic-bezier(0.25,0.46,0.45,0.94)',dl:0.03},
      '陈莹莹':{a:0,e:2,d:0.34,t:'cubic-bezier(0.33,1,0.68,1)',dl:0},
      '雅陶':{a:3,e:3,d:0.42,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.03},
      '韦青青':{a:0,e:3,d:0.38,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.02},
      '韩冰娇':{a:3,e:2,d:0.36,t:'cubic-bezier(0.33,1,0.68,1)',dl:0.01},
      '韩姐':{a:3,e:2,d:0.36,t:'cubic-bezier(0.33,1,0.68,1)',dl:0.01},
      '韩真真':{a:3,e:4,d:0.50,t:'ease-out',dl:0.04},
      '马琪':{a:0,e:2,d:0.36,t:'cubic-bezier(0.33,1,0.68,1)',dl:0.01},
      '马青青':{a:1,e:3,d:0.42,t:'cubic-bezier(0.34,1.56,0.64,1)',dl:0.02},
      '魏莱':{a:3,e:4,d:0.52,t:'ease-out',dl:0.05},
      '黄淑仪':{a:1,e:0,d:0.38,t:'ease-out',dl:0},
      '黎昭':{a:0,e:2,d:0.32,t:'cubic-bezier(0.33,1,0.68,1)',dl:0}
    }
    for(var _tn in _tm){
      if(CHAR_THEMES[_tn]){CHAR_THEMES[_tn].a=_tm[_tn].a;CHAR_THEMES[_tn].e=_tm[_tn].e;}
      else{
        var _tc=(typeof CHAR_COLOR_MAP!=='undefined'&&CHAR_COLOR_MAP[_tn])?CHAR_COLOR_MAP[_tn]:'#b0b0b0';
        CHAR_THEMES[_tn]={c:_tc,a:_tm[_tn].a,e:_tm[_tn].e};
      }
    }
    /* Apply per-character themes with per-character animation params */
    var msgs=root.querySelectorAll('.dc-msg');
    for(var i=0;i<msgs.length;i++){
      var msg=msgs[i];
      var nameEl=msg.querySelector('.dc-msg-name');
      if(!nameEl)continue;
      var name=nameEl.textContent.replace(/^[「『【]/,'').replace(/[」』】]$/,'').trim();
      var theme=CHAR_THEMES[name];
      if(!theme)continue;
      msg.style.setProperty('--dc-char-glow',theme.c);
      msg.style.setProperty('--dc-char-accent',theme.c);
      msg.style.setProperty('--dc-char-ring',theme.c);
      msg.classList.add('dc-acc-'+theme.a);
      msg.classList.add('dc-ent-'+theme.e);
      /* Per-character animation timing: unique duration/easing per character */
      var d=theme.d||0.4;
      var t=theme.t||'ease-out';
      var dl=(theme.dl!==undefined)?theme.dl:0;
      msg.style.animationDuration=d+'s';
      msg.style.animationTimingFunction=t;
      msg.style.animationDelay=dl+'s';
    }
    /* Mood border */
    var moodColors={'生气':'#f47b67','不屑':'#7878a0','紧张':'#f0b43c','不安':'#6496ff','开心':'#5ddc8c','平静':'#98a0b0','惊讶':'#e78bff','害羞':'#f4a8b8','悲伤':'#6888a8','得意':'#f0c060'};
    for(var mi=0;mi<msgs.length;mi++){
      var moodEl=msgs[mi].querySelector('.dc-mood-label');
      if(!moodEl)continue;
      var mood=moodEl.textContent.trim();
      if(moodColors[mood])msgs[mi].setAttribute('data-mood',mood);
    }
    /* Consecutive merge */
    var prevName='';
    for(var ci=0;ci<msgs.length;ci++){
      var ne=msgs[ci].querySelector('.dc-msg-name');
      if(!ne)continue;
      var cn=ne.textContent.trim();
      if(cn===prevName)msgs[ci].classList.add('dc-msg-cont');
      prevName=cn;
    }
    /* Mood ambient */
    var moodCount={};
    var moodMsgs=root.querySelectorAll('.dc-msg[data-mood]');
    for(var mi2=0;mi2<moodMsgs.length;mi2++){
      var md=moodMsgs[mi2].getAttribute('data-mood');
      moodCount[md]=(moodCount[md]||0)+1;
    }
    var dominant='',max=0;
    for(var mk in moodCount){if(moodCount[mk]>max){max=moodCount[mk];dominant=mk;}}
    if(dominant&&moodMsgs.length>3)root.setAttribute('data-dominant-mood',dominant);
    /* Progress bar */
    var pbar=document.createElement('div');
    pbar.className='dc-progress-bar';
    pbar.style.width='0%';
    document.body.appendChild(pbar);
    window.addEventListener('scroll',function(){
      var sc=window.scrollY;
      var dh=document.documentElement.scrollHeight-window.innerHeight;
      pbar.style.width=(dh>0?(sc/dh*100):0)+'%';
    });
    /* Mood heat bar */
    if(dominant){
      var hbar=document.createElement('div');
      hbar.className='dc-mood-bar';
      hbar.style.background=moodColors[dominant]||'#888';
      hbar.style.height=Math.min(100,max/moodMsgs.length*100)+'%';
      document.body.appendChild(hbar);
    }
    /* Particle weather */
    if(_dcEnvData.weather){
      var w=_dcEnvData.weather;
      if(w==='rain'||w==='storm'){
        var count=w==='storm'?80:55;
        var windDeg=w==='storm'?(8+Math.random()*6):(3+Math.random()*4);
        var windX=windDeg*15;
        for(var ri=0;ri<count;ri++){
          var p=document.createElement('div');
          p.className='dc-particle dc-p-rain dc-p-wind';
          p.style.left=Math.random()*100+'%';
          p.style.width=(1+Math.random())+'px';
          var h=12+Math.random()*22;
          p.style.height=h+'px';
          p.style.animationDuration=(0.4+Math.random()*0.5)+'s';
          p.style.animationDelay=(Math.random()*2)+'s';
          p.style.opacity=0.3+Math.random()*0.4;
          p.style.setProperty('--wind-deg',windDeg+'deg');
          p.style.setProperty('--wind-x',(windX+Math.random()*20-10)+'px');
          root.appendChild(p);
          /* Ground splash for ~20% of rain particles */
          if(Math.random()<0.2){
            (function(sp,left){
              sp.className='dc-particle dc-p-splash';
              sp.style.left=left+'%';
              sp.style.animationDuration=(0.3+Math.random()*0.2)+'s';
              sp.style.animationDelay=(parseFloat(p.style.animationDelay)+parseFloat(p.style.animationDuration))+'s';
              root.appendChild(sp);
            })(document.createElement('div'),parseFloat(p.style.left));
          }
        }
        if(w==='storm'){
          var lt=document.createElement('div');
          lt.className='dc-lightning';
          document.body.appendChild(lt);
          function _flash(){
            var seq=[1,0,0.5,0,0.3,0];
            var delays=[0,80,200,320,450,600];
            for(var si2=0;si2<seq.length;si2++){
              (function(op,dl){setTimeout(function(){lt.style.opacity=op;},dl);})(seq[si2],delays[si2]);
            }
            var nextGap=2000+Math.random()*6000;
            if(Math.random()<0.3)nextGap=500+Math.random()*1500;
            setTimeout(_flash,nextGap);
          }
          setTimeout(_flash,1500+Math.random()*2500);
        }
      }else if(w==='snow'){
        /* Snow accumulation ground */
        var snowGround=document.createElement('div');
        snowGround.className='dc-snow-ground';
        root.appendChild(snowGround);
        setTimeout(function(){snowGround.style.height='24px';},1000);
        for(var si=0;si<45;si++){
          var sp=document.createElement('div');
          var isHex=Math.random()<0.4;
          sp.className='dc-particle '+(isHex?'dc-p-snow-hex':'dc-p-snow');
          sp.style.left=Math.random()*100+'%';
          var sz=3+Math.random()*5;
          sp.style.width=sz+'px';
          sp.style.height=sz+'px';
          sp.style.animationDuration=(3+Math.random()*4)+'s';
          sp.style.animationDelay=(Math.random()*5)+'s';
          sp.style.opacity=0.4+Math.random()*0.5;
          sp.style.setProperty('--drift',(Math.random()*40-20)+'px');
          var snowRot=720*(Math.random()<0.5?1:-1);
          sp.style.setProperty('--snow-rot',snowRot+'deg');
          root.appendChild(sp);
        }
      }else if(w==='fog'){
        for(var fi=0;fi<8;fi++){
          var fp=document.createElement('div');
          var layer=fi<3?'back':(fi<6?'mid':'front');
          fp.className='dc-particle dc-p-fog dc-p-fog-'+layer;
          var fsz=200+Math.random()*300;
          fp.style.width=fsz+'px';
          fp.style.height=fsz+'px';
          fp.style.top=Math.random()*80+'%';
          fp.style.animationDuration=(layer==='back'?(30+Math.random()*15):(layer==='mid'?(20+Math.random()*12):(14+Math.random()*8)))+'s';
          fp.style.animationDelay=(Math.random()*10)+'s';
          root.appendChild(fp);
        }
      }
    }
    /* Cinematic mode */
    var tensionCount=0,totalMood=0;
    for(var cmi=0;cmi<moodMsgs.length;cmi++){
      var cm=moodMsgs[cmi].getAttribute('data-mood');
      if(cm==='生气'||cm==='不屑'||cm==='紧张'||cm==='不安')tensionCount++;
      totalMood++;
    }
    if(totalMood>5&&tensionCount/totalMood>0.35){
      root.classList.add('dc-cinema-on');
      var lt2=document.createElement('div');lt2.className='dc-letterbox-t';
      var lb=document.createElement('div');lb.className='dc-letterbox-b';
      var vg=document.createElement('div');vg.className='dc-vignette';
      document.body.appendChild(lt2);
      document.body.appendChild(lb);
      document.body.appendChild(vg);
    }
    /* Scene background */
    if(_dcEnvData.location){
      var loc=_dcEnvData.location;
      var type='';
      if(/教室|课堂|学校/.test(loc))type='classroom';
      else if(/街道|马路|路上/.test(loc))type='street';
      else if(/天台|屋顶/.test(loc))type='rooftop';
      else if(/卧室|房间|宿舍/.test(loc))type='bedroom';
      else if(/公园|草地|花园/.test(loc))type='park';
      else if(/河边|河岸|湖边|江边/.test(loc))type='river';
      else if(/食堂|餐厅|饭堂/.test(loc))type='cafeteria';
      else if(/医院|诊所/.test(loc))type='hospital';
      else if(/夜.*街|夜市/.test(loc))type='nightstreet';
      if(type){
        var canvas=document.createElement('div');
        canvas.className='dc-scene-canvas dc-scene-'+type;
        root.insertBefore(canvas,root.firstChild);
      }
    }
  }
  setTimeout(_runAll,300);
})();
    
    
    
    var protectedResult=protectHtmlFences(sourceRaw);
    var normalizedSource=normalizeSourceText(protectedResult.text);
    normalizedSource=protectBlockHtml(normalizedSource, protectedResult.embeds);
    var inlineHtmlResult=protectInlineHtml(normalizedSource);
    var extractedSource=extractSourceText(inlineHtmlResult.text);
    var lines=extractedSource.split(/\n/);
    var bubbleSourceCount=(sourceRaw.match(/@bubble:/g)||[]).length;
    var bubbleCandidateCount=0;
    var visibleTextCount=0;
    var pollutedLineCount=0;
    var preview=[];

    for(var i=0;i<lines.length;i++){
      var rawLine=String(lines[i]||'');
      var trimmedLine=rawLine.trim();
      var detectionLine=buildBubbleDetectionLine(rawLine);
      if(trimmedLine&&preview.length<6){
        preview.push(trimmedLine);
      }
      if(trimmedLine&&/@@DC_INLINE_HTML_\d+@@/.test(trimmedLine)){
        pollutedLineCount++;
      }
      if(!detectionLine) continue;
      visibleTextCount++;
      if(/^@bubble:/.test(detectionLine)){
        bubbleCandidateCount++;
      }
    }

    var parseReady=bubbleSourceCount>0
      ? bubbleCandidateCount>0
      : (visibleTextCount>0||normalizedSource.trim().length===0);

    return {
      sourceLength:sourceRaw.length,
      normalizedLength:normalizedSource.length,
      extractedLength:extractedSource.length,
      bubbleSourceCount:bubbleSourceCount,
      bubbleCandidateCount:bubbleCandidateCount,
      visibleTextCount:visibleTextCount,
      pollutedLineCount:pollutedLineCount,
      parseReady:parseReady,
      waitingReason:!parseReady
        ? (bubbleSourceCount>0?'bubble-markers-not-ready':'visible-text-not-ready')
        : '',
      preview:preview
    };
  }

  function stopBubbleRenderWatchers(){
    if(bubbleRenderSourceObserver){
      bubbleRenderSourceObserver.disconnect();
      bubbleRenderSourceObserver=null;
    }
    if(bubbleRenderWatchLogTimer){
      clearInterval(bubbleRenderWatchLogTimer);
      bubbleRenderWatchLogTimer=null;
    }
    if(bubbleRenderStableTimer){
      clearTimeout(bubbleRenderStableTimer);
      bubbleRenderStableTimer=null;
    }
  }

  function logBubbleRenderWatchStatus(stage){
    var now=Date.now();
    var watchElapsed=bubbleRenderWatchStartedAt?now-bubbleRenderWatchStartedAt:0;
    var idleElapsed=bubbleRenderLastMutationAt?now-bubbleRenderLastMutationAt:0;
    // console.log('[BubbleRenderWatch] '+stage+' | 监听时长='+(watchElapsed/1000).toFixed(1)+'s | 距上次变化='+(idleElapsed/1000).toFixed(1)+'s | 稳定阈值='+(BUBBLE_RENDER_STABLE_MS/1000).toFixed(1)+'s');
  }

  function scheduleStableBubbleRender(){
    if(bubbleRenderBooted)return;
    if(bubbleRenderStableTimer){
      clearTimeout(bubbleRenderStableTimer);
      bubbleRenderStableTimer=null;
    }
    bubbleRenderStableTimer=setTimeout(function(){
      bubbleRenderStableTimer=null;
      if(bubbleRenderBooted)return;
      logBubbleRenderWatchStatus('内容稳定，开始渲染');
      stopBubbleRenderWatchers();
      scheduleBubbleRenderBoot();
    }, BUBBLE_RENDER_STABLE_MS);
  }

  function markBubbleRenderSourceChanged(reason, sourceEl){
    if(bubbleRenderBooted)return;
    var nextSignature=buildBubbleRenderSourceSignature(sourceEl);
    if(nextSignature===bubbleRenderLastSignature&&reason!=='initial')return;
    bubbleRenderLastSignature=nextSignature;
    bubbleRenderLastMutationAt=Date.now();
    // console.log('[BubbleRenderWatch] 检测到源内容变化：'+reason+' | 内容长度='+readBubbleRenderSourceValue(sourceEl).length);
    scheduleStableBubbleRender();
  }

  function startBubbleRenderWhenStable(){
    if(bubbleRenderBooted)return;
    var sourceEl=document.getElementById('dcSource');
    if(!sourceEl){
      console.warn('[BubbleRenderWatch] 未找到 #dcSource，无法开始稳定监听');
      return;
    }
    stopBubbleRenderWatchers();
    bubbleRenderBootRetryCount=0;
    bubbleRenderWatchStartedAt=Date.now();
    bubbleRenderLastMutationAt=bubbleRenderWatchStartedAt;
    bubbleRenderLastSignature='';
    // console.log('[BubbleRenderWatch] 已开始监听源内容稳定性，连续 3 秒无变化后渲染');
    bubbleRenderWatchLogTimer=setInterval(function(){
      logBubbleRenderWatchStatus('监听中');
    }, BUBBLE_RENDER_WATCH_LOG_MS);
    bubbleRenderSourceObserver=new MutationObserver(function(){
      markBubbleRenderSourceChanged('MutationObserver', sourceEl);
    });
    bubbleRenderSourceObserver.observe(sourceEl,{characterData:true,childList:true,subtree:true});
    markBubbleRenderSourceChanged('initial', sourceEl);
  }

  function bootBubbleRender(){
    if(bubbleRenderBooted)return;
    var sourceEl=document.getElementById('dcSource');
    var sourceRawPreview=sourceEl?String(sourceEl.value||sourceEl.textContent||''):'';
    var sourceState=analyzeBubbleRenderSourceState(sourceEl);
    // console.log('[BubbleRender] 开始执行最终渲染');
    // console.log('[BubbleRender] 渲染入口源摘要',{
    //   sourceTag:sourceEl&&sourceEl.tagName?sourceEl.tagName.toLowerCase():'',
    //   sourceLength:sourceRawPreview.length,
    //   sourcePreview:sourceRawPreview.split(/\n/).slice(0,6),
    //   parseReady:sourceState.parseReady,
    //   bubbleSourceCount:sourceState.bubbleSourceCount,
    //   bubbleCandidateCount:sourceState.bubbleCandidateCount,
    //   visibleTextCount:sourceState.visibleTextCount,
    //   pollutedLineCount:sourceState.pollutedLineCount,
    //   retryCount:bubbleRenderBootRetryCount
    // });
    if(!sourceState.parseReady){
      if(bubbleRenderBootRetryCount>=BUBBLE_RENDER_BOOT_MAX_RETRIES){
        bubbleRenderBooted=true;
        console.warn('[BubbleRender] 源内容在重试上限后仍未进入可解析状态，回退执行最终渲染', sourceState);
      }else{
        bubbleRenderBootRetryCount++;
        console.warn('[BubbleRender] 源内容尚未进入可解析状态，延后重试', {
          retryCount:bubbleRenderBootRetryCount,
          maxRetries:BUBBLE_RENDER_BOOT_MAX_RETRIES,
          retryDelay:BUBBLE_RENDER_BOOT_RETRY_MS,
          waitingReason:sourceState.waitingReason,
          preview:sourceState.preview
        });
        scheduleFrameTask(bootBubbleRender, BUBBLE_RENDER_BOOT_RETRY_MS);
        return;
      }
    }else{
      bubbleRenderBooted=true;
    }
    // console.log('[BubbleRender] 渲染使用的源状态', sourceState);
    getStyleConfig().then(function(cfg){
      return Promise.all([
        ensureFontResources(cfg),
        loadLocalFonts(),
        loadCssFontSources(),
        loadMoodConfig()
      ]).then(function(){
        processText(cfg);
      });
    }).catch(function(err){
      console.warn('Bubble 渲染初始化失败:',err);
      processText();
    });
  }

  function scheduleBubbleRenderBoot(){
    scheduleFrameTask(bootBubbleRender, 120);
  }

  /* ====== 主处理函数（同步，确保立即渲染） ====== */
  function processText(cfg){
    var root=document.getElementById('dcRoot');
    if(!root)return;

    cfg=cfg||{};
    var cfgDialogueFontSize=Number.isFinite(cfg.style_dialogueFontSize)?cfg.style_dialogueFontSize:14.5;
    var cfgNarrationFontSize=Number.isFinite(cfg.style_narrationFontSize)?cfg.style_narrationFontSize:14;
    var cfgDialogueSpacing=Number.isFinite(cfg.style_dialogueSpacing)?cfg.style_dialogueSpacing:10;
    var cfgTextColorMode=cfg.style_textColorMode||'global';
    var cfgGlobalTextColor=cfg.style_globalTextColor||'#d9d9d9';
    var cfgMarkdownMode=cfg.style_markdownMode||'basic';
    var cfgDialogueFontWeight=Number.isFinite(cfg.style_dialogueFontWeight)?cfg.style_dialogueFontWeight:400;
    var cfgNarrationFontWeight=Number.isFinite(cfg.style_narrationFontWeight)?cfg.style_narrationFontWeight:400;
    var cfgNameFontWeight=Number.isFinite(cfg.style_nameFontWeight)?cfg.style_nameFontWeight:800;
    var cfgNarrationBgColor=cfg.style_narrationBgColor||'#ffffff';
    var cfgNarrationBgOpacity=clampNumber(cfg.style_narrationBgOpacity,0,1);
    var cfgAvatarSize=clampNumber(cfg.style_avatarSize,36,88);
    var cfgNarrationIndent=clampNumber(cfg.style_narrationIndent,0,120);
    var cfgNarrationFontFamily=cfg.style_narrationFontFamily||'Noto Sans SC';
    var cfgDialogueFontFamily=cfg.style_dialogueFontFamily||'Noto Serif SC';
    var cfgNameFontFamily=cfg.style_nameFontFamily||'Noto Serif SC';
    var cfgDialogueLineHeight=getDialogueLineHeight(cfgDialogueFontSize,cfgDialogueSpacing);
    var cfgNarrationBackground=hex2rgba(cfgNarrationBgColor,cfgNarrationBgOpacity);
    var cfgNarrationFontStack=buildFontStack(cfgNarrationFontFamily,'"Source Han Sans SC",sans-serif');
    var cfgDialogueFontStack=buildFontStack(cfgDialogueFontFamily,'"Source Han Serif SC",serif');
    var cfgNameFontStack=buildFontStack(cfgNameFontFamily,'"Source Han Serif SC",serif');
    var cfgNarrationBorderRadius=clampNumber(Number.isFinite(cfg.style_narrationBorderRadius)?cfg.style_narrationBorderRadius:0,0,24);
    var cfgAvatarShape=cfg.style_avatarShape||'rounded';
    var cfgAvatarShapeRadius=cfgAvatarShape==='circle'?'50%':cfgAvatarShape==='square'?'0px':'8px';
    var cfgThoughtSuffixGap=clampNumber(Number.isFinite(cfg.style_thoughtSuffixGap)?cfg.style_thoughtSuffixGap:6,0,24);
    var cfgThoughtSuffixOffsetY=clampNumber(Number.isFinite(cfg.style_thoughtSuffixOffsetY)?cfg.style_thoughtSuffixOffsetY:5,-24,24);
    var cfgNarrationTextIndent=clampNumber(Number.isFinite(cfg.style_narrationTextIndent)?cfg.style_narrationTextIndent:0,0,4);
    var cfgNarrationLineHeight=Number.isFinite(cfg.style_narrationLineHeight)?cfg.style_narrationLineHeight:1.75;
    var cfgNarrationPaddingRight=clampNumber(Number.isFinite(cfg.style_narrationPaddingRight)?cfg.style_narrationPaddingRight:16,0,120);

    var sourceEl=document.getElementById('dcSource');
    var sourceRaw=sourceEl?(sourceEl.value||sourceEl.textContent||''):'';
    var protectedResult=protectHtmlFences(sourceRaw);
    var normalizedSource=normalizeSourceText(protectedResult.text);
    normalizedSource=protectBlockHtml(normalizedSource, protectedResult.embeds);
    var inlineHtmlResult=protectInlineHtml(normalizedSource);
    var htmlEmbeds=protectedResult.embeds;
    var inlineHtmlTokens=inlineHtmlResult.tokens;
    var raw=extractSourceText(inlineHtmlResult.text);
    var lines=raw.split(/\n/);
    var html='';
    var narrBuf=[];
    var debugSummary={
      sourceLength:sourceRaw.length,
      normalizedLength:normalizedSource.length,
      extractedLength:raw.length,
      totalLines:lines.length,
      bubbleMatches:0,
      narrationLines:0,
      emptyLines:0,
      previews:lines.slice(0,8),
      lineDiagnostics:[]
    };

    function flushNarr(){
      if(!narrBuf.length)return;
      var narrContent=renderNarration(narrBuf,cfgMarkdownMode,htmlEmbeds,inlineHtmlTokens);
      html+='<div class="dc-narration-block" style="font-size:'+cfgNarrationFontSize+'px;color:'+cfgGlobalTextColor+';opacity:0.88;font-weight:'+cfgNarrationFontWeight+';background:'+cfgNarrationBackground+';padding:6px '+cfgNarrationPaddingRight+'px 6px '+cfgNarrationIndent+'px;border-radius:'+cfgNarrationBorderRadius+'px;line-height:'+cfgNarrationLineHeight+';--dc-text-indent:'+cfgNarrationTextIndent+'em;">'+narrContent+'</div>';
      narrBuf=[];
    }

    for(var i=0;i<lines.length;i++){
      var sourceLine=lines[i];
      var line=sourceLine.trim();
      var detectionLine=buildBubbleDetectionLine(sourceLine);
      var matchType='';
      if(!line){
        debugSummary.emptyLines++;
        if(debugSummary.lineDiagnostics.length<12){
          debugSummary.lineDiagnostics.push({index:i,sourceLine:sourceLine,trimmedLine:line,detectionLine:detectionLine,matched:false,matchType:'empty'});
        }
        narrBuf.push('');
        continue;
      }

      var nm,charName,mood,tx,m;
      var hasBracketWrapper=false;

      /* 第1优先级：三段含 [] — @bubble:角色名|情绪|[台词] */
      m=detectionLine.match(/^@bubble:([^|]+)\|([^|]*)\|\[(.+?)\]$/);
      if(m){
        matchType='triple_bracket';
        charName=m[1].trim();
        nm=charName.toLowerCase();
        mood=m[2].trim();
        tx=m[3].trim();
        hasBracketWrapper=true;
      }
      /* 第2优先级：三段无 [] — @bubble:角色名|情绪|台词 */
      if(!m){
        m=detectionLine.match(/^@bubble:([^|]+)\|([^|]*)\|([^|]+)$/);
        if(m){
          matchType='triple_plain';
          charName=m[1].trim();
          nm=charName.toLowerCase();
          mood=m[2].trim();
          tx=m[3].trim();
        }
      }
      /* 第3优先级：旧四段兼容（含 []）— @bubble:别名|角色名|情绪|[台词] */
      if(!m){
        m=detectionLine.match(/^@bubble:([^|]+)\|([^|]+)\|([^|]*)\|\[(.+?)\]$/);
        if(m){
          matchType='legacy_quad_bracket';
          charName=m[2].trim();
          nm=charName.toLowerCase();
          mood=m[3].trim();
          tx=m[4].trim();
          hasBracketWrapper=true;
        }
      }
      /* 第4优先级：旧四段兼容（无 []）— @bubble:别名|角色名|情绪|台词 */
      if(!m){
        m=detectionLine.match(/^@bubble:([^|]+)\|([^|]+)\|([^|]*)\|(.+)$/);
        if(m){
          matchType='legacy_quad_plain';
          charName=m[2].trim();
          nm=charName.toLowerCase();
          mood=m[3].trim();
          tx=m[4].trim();
        }
      }

      if(debugSummary.lineDiagnostics.length<12){
        debugSummary.lineDiagnostics.push({
          index:i,
          sourceLine:sourceLine,
          trimmedLine:line,
          detectionLine:detectionLine,
          matched:!!m,
          matchType:matchType,
          charName:m?charName:'',
          mood:m?mood:'',
          textPreview:m?String(tx||'').slice(0,80):''
        });
      }

      if(m){
        debugSummary.bubbleMatches++;
        flushNarr();
        var ci=gc(nm);
        var ini=esc(charName.charAt(0)||'?');
        var avatarRadius=cfgAvatarShapeRadius;
        var avatarPlaceholderFont=Math.max(16,Math.round(cfgAvatarSize*0.38));
        var av='<div class="dc-msg-avatar-ph dc-bg'+ci+'" style="font-size:'+avatarPlaceholderFont+'px;border-radius:'+avatarRadius+';">'+ini+'</div>';
        var nameHtml=renderName(charName,'dc-c'+ci);
        var moodHtml='';
        var moodState=getMoodRenderState(mood);
        var msgMoodGroup=moodState?moodState.id:'';
        if(mood){
          var moodStyle=moodState?' style="color:'+moodState.color+';background:'+moodState.background+';"':'';
          var moodGroupClass=moodState?' '+moodState.id:'';
          var moodGroupAttr=moodState?' data-mood-group="'+moodState.id+'"':'';
          moodHtml='<span class="dc-msg-mood dc-mood'+ci+moodGroupClass+'" data-mood-mapped="'+(moodState?'1':'0')+'"'+moodGroupAttr+moodStyle+'>'+esc(mood)+'</span>';
        }

        var textColor=cfgGlobalTextColor;
        var isInnerThought=hasBracketWrapper&&isInnerThoughtText(tx);
        var displayTx=isInnerThought?tx.replace(/^\*|\*$/g,''):tx;
        var quoteChar=isInnerThought?'\uFF0A':'\u201D';
        var quoteClass='dc-msg-quote dc-c'+ci+(isInnerThought?' dc-msg-quote-thought':'');
        var msgPaddingLeft=cfgAvatarSize+24;
        html+='<div class="dc-msg" data-name="'+escapeHtmlAttr(nm)+'" data-ci="'+ci+'" data-thought="'+(isInnerThought?'1':'0')+'" data-mood-group="'+msgMoodGroup+'" style="padding-left:'+msgPaddingLeft+'px;min-height:'+Math.max(56,cfgAvatarSize+4)+'px;">';
        html+='<div class="dc-msg-avatar" data-name="'+escapeHtmlAttr(nm)+'" style="width:'+cfgAvatarSize+'px;height:'+cfgAvatarSize+'px;border-radius:'+avatarRadius+';">'+av+'</div>';
        html+='<div class="dc-msg-header"><span class="dc-msg-name" data-ci="'+ci+'" style="color:'+cfgGlobalTextColor+';font-weight:'+cfgNameFontWeight+';">'+nameHtml+'</span>'+moodHtml+'</div>';
        var textContentClass='dc-msg-text-content'+(isInnerThought?' dc-msg-text-content-thought':'');
        var quoteStyle=isInnerThought?' style="margin-left:'+cfgThoughtSuffixGap+'px;top:'+cfgThoughtSuffixOffsetY+'px;"':'';
        html+='<div class="dc-msg-text" style="font-size:'+cfgDialogueFontSize+'px;line-height:'+cfgDialogueLineHeight+'px;color:'+textColor+';font-weight:'+cfgDialogueFontWeight+';"><span class="'+textContentClass+'">'+renderRichText(displayTx, inlineHtmlTokens)+'</span><span class="'+quoteClass+'"'+quoteStyle+'>'+quoteChar+'</span></div>';
        html+='</div>';
      }else{
        debugSummary.narrationLines++;
        narrBuf.push(sourceLine);
      }
    }
    flushNarr();
    root.innerHTML=html;
    debugSummary.renderedBubbleNodes=root.querySelectorAll('.dc-msg').length;
    debugSummary.renderedNarrationNodes=root.querySelectorAll('.dc-narration-block').length;
    debugSummary.renderedHtmlPreview=html.slice(0,800);
    // console.log('[BubbleRender] 渲染结构摘要',debugSummary);
    var narrationBlocks=root.querySelectorAll('.dc-narration-block');
    for(var n=0;n<narrationBlocks.length;n++) narrationBlocks[n].style.fontFamily=cfgNarrationFontStack;
    var nameEls=root.querySelectorAll('.dc-msg-name');
    for(var k=0;k<nameEls.length;k++) nameEls[k].style.fontFamily=cfgNameFontStack;
    var textEls=root.querySelectorAll('.dc-msg-text');
    for(var t=0;t<textEls.length;t++) textEls[t].style.fontFamily=cfgDialogueFontStack;
    hydrateHtmlEmbeds(root,sourceRaw);
    scheduleAvatarEnhancement(root,cfgTextColorMode,cfgGlobalTextColor);
    // console.log('[BubbleRender] 渲染完成，旁白与气泡已落地');
  }

  async function loadAvatarsAndColors(root,colorMode,globalColor){
    var charId=getCurrentCharId()||'_global_';
    var fallbackCharId='_global_';

    var msgs=root.querySelectorAll('.dc-msg');
    for(var i=0;i<msgs.length;i++){
      var msg=msgs[i];
      var name=msg.dataset.name;
      if(!name)continue;

      var moodGroup=msg.dataset.moodGroup||'';
      var avatarUrl=null;
      if(moodGroup){
        avatarUrl=await getMoodAvatarUrl(charId,name,moodGroup);
      }
      if(!avatarUrl){
        avatarUrl=await getAvatar(charId,name);
      }
      if(!avatarUrl&&charId!==fallbackCharId&&moodGroup){
        avatarUrl=await getMoodAvatarUrl(fallbackCharId,name,moodGroup);
      }
      if(!avatarUrl&&charId!==fallbackCharId){
        avatarUrl=await getAvatar(fallbackCharId,name);
      }
      if(avatarUrl){
        var avDiv=msg.querySelector('.dc-msg-avatar');
        if(avDiv){
          var v2Key='avatarV2_'+charId+'__'+name;
          var useV2=sessionStorage.getItem(v2Key)==='1';
          var hasV2=AVATAR_V2_CHARS.indexOf(name)>=0;
          avDiv.innerHTML='<img src="'+avatarUrl+'" alt="'+escapeHtmlAttr(name)+'" data-v1="'+avatarUrl+'"/>';
          if(useV2&&hasV2){
            getAvatarV2(charId,name).then(function(v2u){
              if(v2u){
                var im=avDiv.querySelector('img');
                if(im){im.src=v2u;im.dataset.v2=v2u;}
              }
            });
          }
          if(hasV2){
            var flipBtn=document.createElement('button');
            flipBtn.className='dc-avatar-flip';
            flipBtn.innerHTML='↻';
            flipBtn.title='点击切换头像';
            flipBtn.onclick=(function(btnName,btnCharId,btnV2Key){
              return function(ev){
                ev.stopPropagation();
                ev.preventDefault();
                var cur=sessionStorage.getItem(btnV2Key)==='1';
                if(cur){
                  sessionStorage.removeItem(btnV2Key);
                }else{
                  sessionStorage.setItem(btnV2Key,'1');
                }
                toggleAvatarVersion(btnCharId,btnName,btnV2Key);
              };
            })(name,charId,v2Key);
            avDiv.appendChild(flipBtn);
          }
          avDiv.removeAttribute('data-v2-loaded');
        }
      }

      var colorKey='color_'+charId+'__'+name;
      var customColor=await getConfigVal(colorKey);
      if(!customColor&&charId!==fallbackCharId){
        customColor=await getConfigVal('color_'+fallbackCharId+'__'+name);
      }
      if(typeof CHAR_COLOR_MAP==='undefined')CHAR_COLOR_MAP={'丁曼红':'#a06080','云伊':'#b0d0f0','伦欣桐':'#50c878','兰叶':'#c87060','兰心':'#c8b0d0','刘予安':'#f47070','刘恩泽':'#c8a0c0','刘祈音':'#e8855a','刘福堂':'#8a7a6a','吴海文':'#70c0a0','周灵':'#8898b0','周语彤':'#d63384','唐蜜':'#f0a050','夏祈':'#9eb8c8','孙琦':'#7eb8a0','孙瑞希':'#e870a0','孙翌童':'#f4a847','孙苑清':'#b0b8c8','安春生':'#e8a890','安琳':'#e8a0a8','庞咏萱':'#f490a8','庞颖':'#c8a080','张子薇':'#ff6b6b','张薇薇':'#e0c0a0','文澜':'#b8c4e8','文素':'#d0b890','文茜':'#c8b8a0','文馨':'#e0e0ff','文鸢':'#f48060','方敏':'#f4b8a0','明香香':'#ff6b35','智允':'#d0c0b0','朱城':'#9a8a7a','罗可可':'#f0a0c0','朱清':'#c06080','朱玥':'#88c8a8','李南星':'#f0b232','杨小雪':'#c8d8e8','林听晚':'#a0b8d8','林墨':'#98b8a0','林安安':'#ff9ecd','林沐宜':'#a0c0a8','林葭':'#80a890','林见夏':'#e87060','林野':'#88a080','林闻夏':'#b0a8c0','柳青':'#f47b67','江静屿':'#7090c0','汤倩':'#a8a0c0','汤加琳':'#ffb86c','沈幼楚':'#a8c8e8','沈漾':'#a8d0e0','沈静宜':'#8a9db0','沛涵':'#d0a8b8','洪欣彤':'#ff80c0','海霖':'#80a0a8','淑静':'#b8b8a0','温若宁':'#c8b8d8','源丽萍':'#d09050','独孤春儿':'#e8f0a0','珞曼':'#a08090','珞珈':'#f0d090','珞花':'#c87ea0','白晓雪':'#e8e0d0','祝佩玲':'#b07860','祝叶谷':'#c89860','祝绝响':'#c8a090','胡静':'#c4956a','芍药':'#a8a890','苏晚棠':'#e8a0c0','苏紫宁':'#b88cf0','苏雨':'#6ab0a8','荣柔柔':'#e8b8d0','萧容鱼':'#d4a0a0','董世青':'#8a6a5a','裴姝权':'#c898d8','让娜':'#e8e0c0','让娜·库兹涅佐娃':'#e8e0c0','许愿':'#e8c878','许愿/许愿姬':'#e8c878','许愿姬':'#e8c878','许明薇':'#a89080','贺玲':'#f47860','赵小满':'#f0c080','赵自由':'#688090','赵诗晴':'#d8a080','赵雅琴':'#d0a060','那可':'#9888a0','郭雨瑶':'#a8c0e8','金宁':'#c8a050','金晶晶':'#ff9a76','阳灿':'#f4a090','陈书婷':'#8a8090','陈思雨':'#5ec8a8','陈晓北':'#a8d8a8','陈莹莹':'#d8a8c8','雅陶':'#a89070','韦青青':'#7eb050','韩冰娇':'#7eb8da','韩真真':'#d07070','马琪':'#a070a0','马青青':'#f0c060','魏莱':'#c0c0e0','陈浩':'#c0a870','黄淑仪':'#e8a87c','黎昭':'#90b8d0'};
      var charHex=customColor||CHAR_COLOR_MAP[name];
      if(charHex){
        var chs=msg.querySelectorAll('.dc-ch,.dc-cs');
        for(var j=0;j<chs.length;j++) chs[j].style.color=charHex;
        var moodEl=msg.querySelector('.dc-msg-mood');
        if(moodEl&&moodEl.getAttribute('data-mood-mapped')!=='1'){
          moodEl.style.color=charHex;
          if(charHex.charAt(0)==='#') moodEl.style.background=hex2rgba(charHex,0.15);
        }
        var ph=msg.querySelector('.dc-msg-avatar-ph');
        if(ph) ph.style.background=charHex;
        var qt=msg.querySelector('.dc-msg-quote');
        if(qt) qt.style.color=charHex;
        var avDiv2=msg.querySelector('.dc-msg-avatar');
        if(avDiv2) avDiv2.style.borderColor=charHex;
        var accent=document.createElement('div');
        accent.className='dc-msg-accent';
        accent.style.background=charHex;
        msg.appendChild(accent);
        var textEl2=msg.querySelector('.dc-msg-text');
        if(textEl2) textEl2.style.color=hex2rgba(charHex,0.92);
      }

      if(colorMode==='character'&&!charHex){
        var charColor=customColor||globalColor;
        var textEl=msg.querySelector('.dc-msg-text');
        if(textEl) textEl.style.color=charColor;
      }
    }
  }

  if(document.readyState==='complete'||document.readyState==='interactive'){
    startBubbleRenderWhenStable();
  }else{
    document.addEventListener('DOMContentLoaded', startBubbleRenderWhenStable, { once:true });
    window.addEventListener('load', startBubbleRenderWhenStable, { once:true });
  }
})();