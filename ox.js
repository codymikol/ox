!function t(e,i,s){function n(a,r){if(!i[a]){if(!e[a]){var h="function"==typeof require&&require;if(!r&&h)return h(a,!0);if(o)return o(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var c=i[a]={exports:{}};e[a][0].call(c.exports,function(t){var i=e[a][1][t];return n(i?i:t)},c,c.exports,t,e,i,s)}return i[a].exports}for(var o="function"==typeof require&&require,a=0;a<s.length;a++)n(s[a]);return n}({1:[function(t,e,i){e.exports=["./images/background.png","./images/cursor.png","./images/foreground.png","./images/ox.png","./data/example.json","./audio/ox.mp3"]},{}],2:[function(t,e,i){var s=t("./keyboard"),n=t("./mouse"),o=document.getElementById("canvas"),a=o.getContext("2d");o.tabIndex=1e3,o.style.outline="none",o.onkeydown=s.keyDown.bind(s),o.onkeyup=s.keyUp.bind(s),o.onmousemove=n.onMove.bind(n),o.onmousedown=n.onDown.bind(n),o.onmouseup=n.onUp.bind(n),o.style.cursor="none",o.oncontextmenu=function(){return!1},e.exports=a},{"./keyboard":6,"./mouse":9}],3:[function(t,e,i){window.onload=function(){this.ox={canvas:t("./canvas").canvas,context:t("./canvas"),images:t("./loader").images,audio:t("./loader").audio,data:t("./loader").data,keyboard:t("./keyboard"),mouse:t("./mouse"),scenes:t("./scenesManager"),entities:t("./entitiesManager"),save:t("./localStorage"),loop:t("./gameLoop"),preloader:t("./loader"),spawn:t("./entitiesManager").spawn},ox.scenes.set("loading"),ox.loop.init()}},{"./canvas":2,"./entitiesManager":4,"./gameLoop":5,"./keyboard":6,"./loader":7,"./localStorage":8,"./mouse":9,"./scenesManager":10}],4:[function(t,e,i){var s=t("../entities"),n=[],o=[],a=[],r=function(t,e){if(!s[t])throw new Error("Entity ["+t+"] does not exist and cannot be spawned.");var i=e||{};for(var o in s[t])i[o]=s[t][o];return i.disable=h.bind(i),i.enable=u.bind(i),i.id=n.length,i.type=t,n.push(i),i.init&&i.init(),i.enable(),i},h=function(){a.indexOf(this.id)>0&&a.splice(a.indexOf(this.id),1),o.indexOf(this.id)>0&&o.splice(o.indexOf(this.id),1)},u=function(){this.update&&o.push(this.id),this.draw&&a.push(this.id)},c=function(){n.splice(0,n.length),o.splice(0,o.length),a.splice(0,a.length)};e.exports={current:n,list:s,toDraw:a,toUpdate:o,spawn:r,clear:c}},{"../entities":11}],5:[function(t,e,i){var s=t("./entitiesManager"),n=s.toDraw,o=s.toUpdate,a=t("./scenesManager"),r=t("./canvas");e.exports={speed:1,dt:0,step:1/60,lastDelta:new Date,now:new Date,calculateDelta:function(){this.lastDelta=this.now,this.now=new Date,this.dt+=Math.min(1,(this.now-this.lastDelta)/1e3)*this.speed},init:function(){for(a.isChanging&&(this.dt=0),this.calculateDelta();this.dt>this.step;)this.dt-=this.step,this.update(this.step);this.draw(this.dt),requestAnimationFrame(this.init.bind(this))},draw:function(){r.clearRect(0,0,r.canvas.width,r.canvas.height),a.current.draw&&a.current.draw();for(var t=0,e=n.length;e>t;t++)void 0!==s.current[n[t]]&&void 0!==s.current[n[t]].draw&&s.current[n[t]].draw()},update:function(t){a.current.update&&a.current.update(t);for(var e=0,i=o.length;i>e;e++)void 0!==s.current[o[e]]&&void 0!==s.current[o[e]].update&&s.current[o[e]].update(t)}}},{"./canvas":2,"./entitiesManager":4,"./scenesManager":10}],6:[function(t,e,i){var s=t("./scenesManager");e.exports={isPressed:{},keyDown:function(t){(32===t.keyCode||t.keyCode>=37&&t.keyCode<=40)&&t.preventDefault(),s.current.keyDown&&s.current.keyDown(this.keys[t.keyCode]),this.keyPress(t)},keyPress:function(t){this.isPressed[t.keyCode]||(s.current.keyPress&&s.current.keyPress(this.keys[t.keyCode]),this.isPressed[t.keyCode]=!0)},keyUp:function(t){s.current.keyUp&&s.current.keyUp(this.keys[t.keyCode]),this.isPressed[t.keyCode]=!1},keys:{8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"caps_lock",27:"esc",32:"spacebar",33:"page_up",34:"page_down",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",44:"print_screen",45:"insert",46:"delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"num_zero",97:"num_one",98:"num_two",99:"num_three",100:"num_four",101:"num_five",102:"num_six",103:"num_seven",104:"num_eight",105:"num_nine",106:"num_multiply",107:"num_plus",109:"num_minus",110:"num_period",111:"num_division",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",186:"semicolon",187:"plus",189:"minus",192:"grave_accent",222:"single_quote"}}},{"./scenesManager":10}],7:[function(t,e,i){e.exports={images:{},data:{},audio:{},loadImage:function(t){var e=t.slice(9,t.length),i=this;this.images[e]=new Image,this.images[e].onload=function(){i.assetsToLoad--},this.images[e].src=t},loadData:function(t){var e=t.slice(7,t.length-5),i=this,s=new XMLHttpRequest;s.onreadystatechange=function(){4===s.readyState&&200===s.status&&(i.data[e]=JSON.parse(s.responseText),i.assetsToLoad--)},s.open("GET",t),s.send()},loadAudio:function(t){var e=t.slice(8,t.length),i=this;this.audio[e]=new Audio(t),this.audio[e].oncanplaythrough=function(){i.assetsToLoad--}},load:function(t){this.assetsToLoad=t.length;for(var e=0;e<t.length;e++)t[e].indexOf("./images")>-1?this.loadImage(t[e]):t[e].indexOf("./data")>-1?this.loadData(t[e]):t[e].indexOf("./audio")>-1&&this.loadAudio(t[e])}}},{}],8:[function(t,e,i){e.exports={store:function(t,e){localStorage.setItem(t,JSON.stringify(e))},load:function(t){return JSON.parse(localStorage.getItem(t))},remove:function(t){localStorage.removeItem(t)}}},{}],9:[function(t,e,i){var s=t("./scenesManager");e.exports={x:0,y:0,isDown:!1,onMove:function(t){this.offset=ox.canvas.getBoundingClientRect(),ox.mouse.x=t.clientX-this.offset.left,ox.mouse.y=t.clientY-this.offset.top},onUp:function(t){s.current.mouseUp&&s.current.mouseUp(this.buttons[t.button]),this.isDown=!1},onDown:function(t){s.current.mouseDown&&s.current.mouseDown(this.buttons[t.button]),this.isDown=!0},buttons:{0:"left",1:"middle",2:"right"}}},{"./scenesManager":10}],10:[function(t,e,i){var s=t("./entitiesManager").clear,n=t("../scenes.js");e.exports={current:null,set:function(t){if(!n[t])throw new Error("Scene ["+t+"] does not exist!");s(),this.current=n[t],this.current.init()}}},{"../scenes.js":17,"./entitiesManager":4}],11:[function(t,e,i){e.exports={"sprite/animated":t("./entities/sprite/animated.js"),"sprite/calculateFrames":t("./entities/sprite/calculateFrames.js"),"sprite/drawSprite":t("./entities/sprite/drawSprite.js"),sprite:t("./entities/sprite.js"),timer:t("./entities/timer.js")}},{"./entities/sprite.js":12,"./entities/sprite/animated.js":13,"./entities/sprite/calculateFrames.js":14,"./entities/sprite/drawSprite.js":15,"./entities/timer.js":16}],12:[function(t,e,i){var s=t("./sprite/drawSprite"),n=t("./sprite/animated");e.exports={init:function(){this.sourceWidth=ox.images[this.source].width||1,this.sourceHeight=ox.images[this.source].height||1,this.width=this.width||this.sourceWidth,this.height=this.height||this.sourceHeight,this.x=this.x||0,this.y=this.y||0,this.animation&&n.call(this)},draw:function(){s(this.source,this.x,this.y)}}},{"./sprite/animated":13,"./sprite/drawSprite":15}],13:[function(t,e,i){var s=t("./drawSprite"),n=t("./calculateFrames"),o=function(){this.isPlaying=!0,this.isFinished=!1,"boolean"!=typeof this.loop&&(this.loop=!0),this.counter=0,this.frameRate=this.frameRate||30,this.pause=l.bind(this),this.play=d.bind(this),this.finished=c.bind(this),this.update=r.bind(this),this.draw=a.bind(this),n.call(this),this.animations?(this.animationArray=this.animations[this.animation],this.arrayCounter=0,this.frame=this.animationArray[this.arrayCounter]):this.frame=0},a=function(){s(this.source,this.x,this.y,this.width,this.height,this.frames[this.frame])},r=function(t){if(this.isPlaying){if(this.isFinished)return this.finished();this.counter+=1e3*t,this.counter>1e3/this.frameRate&&(this.counter=0,this.animations?h.call(this):u.call(this))}},h=function(){this.arrayCounter===this.animationArray.length-1?(this.loop||(this.isFinished=!0),this.frame=this.animationArray[0],this.arrayCounter=0):(this.arrayCounter++,this.frame=this.animationArray[this.arrayCounter])},u=function(){this.frame===this.frames.length-1?(this.loop||(this.isFinished=!0),this.frame=0):this.frame+=1},c=function(){this.pause(),this.callback&&this.callback()},d=function(t,e){if(e)for(var i in e)this[i]=e[i];this.animations&&(t&&(this.animation=t),this.animationArray=this.animations[this.animation],this.arrayCounter=0,this.frame=this.animationArray[this.arrayCounter]),this.isFinished=!1,this.isPlaying=!0},l=function(){this.isPlaying=!1};e.exports=o},{"./calculateFrames":14,"./drawSprite":15}],14:[function(t,e,i){e.exports=function(){var t=0,e=0;this.frames=[[0,0]];for(var i=1;i<this.sourceHeight/this.height*this.sourceWidth/this.width;i++)t<this.sourceWidth/this.width-1?t++:e<this.sourceHeight/this.height-1&&(e++,t=0),this.frames.push([t,e])}},{}],15:[function(t,e,i){e.exports=function(t,e,i,s,n,o){"number"==typeof s?ox.context.drawImage(ox.images[t],s*o[0],n*o[1],s,n,e,i,s,n):ox.context.drawImage(ox.images[t],e,i)}},{}],16:[function(t,e,i){e.exports={init:function(){this.value=0,this.target=this.target||1e3,this.callback=this.callback||function(){}},update:function(t){this.value=Math.round(this.value+1e3*t),this.value>=this.target&&(this.context?this.callback(this.context,this.value):this.callback(this.value),this.loop?this.value=0:this.disable())},restart:function(){this.value=0,this.enable()}}},{}],17:[function(t,e,i){e.exports={loading:t("./scenes/loading.js"),main:t("./scenes/main.js")}},{"./scenes/loading.js":18,"./scenes/main.js":19}],18:[function(t,e,i){e.exports={init:function(){ox.preloader.load(t("../assets")),this.barLength=ox.preloader.assetsToLoad},draw:function(){ox.context.fillStyle="black",ox.context.fillRect(0,0,ox.canvas.width,ox.canvas.height),ox.context.fillStyle="grey",ox.context.fillRect(ox.canvas.width/4,ox.canvas.height/2,ox.canvas.width/2,1),ox.context.fillStyle="grey",ox.context.fillStyle="rgb(46, 238, 245)",ox.context.fillRect(ox.canvas.width/4,ox.canvas.height/2,ox.canvas.width/2-ox.canvas.width/2*ox.preloader.assetsToLoad/this.barLength,1)},update:function(){0===ox.preloader.assetsToLoad&&ox.scenes.set("main")}}},{"../assets":1}],19:[function(t,e,i){e.exports={init:function(){this.background1=ox.spawn("sprite",{source:"background.png"}),this.background2=ox.spawn("sprite",{source:"background.png",x:640}),this.ox=ox.spawn("sprite",{source:"ox.png",x:ox.canvas.width/2,y:234,width:56,animation:"walking",frameRate:1}),this.foreground1=ox.spawn("sprite",{source:"foreground.png"}),this.foreground2=ox.spawn("sprite",{source:"foreground.png",x:640}),this.cursor=ox.spawn("sprite",{source:"cursor.png"})},update:function(t){this.cursor.x=ox.mouse.x,this.cursor.y=ox.mouse.y,this.scroll(this.background1,t),this.scroll(this.background2,t),this.scroll(this.foreground1,t),this.scroll(this.foreground2,t)},scroll:function(t,e){var i=ox.data.example.backgroundWidth;t.x-=20*e,t.x<-i&&(t.x=i)},keyDown:function(t){console.log("keyDown: "+t)},keyPress:function(t){console.log("keyPress: "+t)},keyUp:function(t){console.log("keyUp: "+t)},mouseDown:function(t){ox.audio["ox.mp3"].play(),console.log("Clicked: "+ox.mouse.x+", "+ox.mouse.y+" with "+t+" button.")},mouseUp:function(t){console.log("Released: "+ox.mouse.x+", "+ox.mouse.y+" with "+t+" button.")}}},{}]},{},[3]);
