!function(){var e,t,n={lazy:!0,fireevent:"click",autoplay:!1,autoscale:!1,type:void 0,attributes:void 0};(t=e||(e={})).CONTAINER="data-dlightbox-container",t.INITIALIZER="data-dlightbox",t.ID="data-id",t.TYPE="data-type",t.DATA="data",t.CACHED="data-cached";var i=e,s={OPEN:"dlightbox:open",CLOSE:"dlightbox:close",CHANGE:"dlightbox:change"};class o{static getSpinner(){return o.lbSpinner||(o.lbSpinner=new o),o.lbSpinner}get element(){return this._element}showSpinner(e){this._element&&(this._element.ariaLabel=e||"",this._element.classList.remove("error"),this._element.style.display="")}hideSpinner(){this._element&&(this._element.ariaLabel="",this._element.classList.remove("error"),this._element.style.display="none")}constructor(){this.generateSpinner=()=>{const e=document.createElement("div"),t=document.createElement("div"),n=document.createElement("div");e.id="lightbox-spinner",e.classList.add("lightbox-spinner"),t.classList.add("lightbox-spinner-front"),n.classList.add("lightbox-spinner-back");for(let e=1;e<4;e++)t.append(document.createElement("div")),n.append(document.createElement("div")),t.children[e-1].classList.add(`lightbox-spinner-ball${e}`,"front"),n.children[e-1].classList.add(`lightbox-spinner-ball${e}`,"back");return e.append(t,n),e},this._element=this.generateSpinner()}}var r,a,l=o,d=class{get element(){return this._element}get config(){return this._config}get attributes(){return this._attributes}get isSelected(){return this._isSelected}get loaded(){return this._loaded}set loaded(e){this._loaded=e}get spinner(){return this._spinner}set isSelected(e){this._isSelected=e}set element(e){this._element=e}get resourceUrl(){return this._resourceUrl}buildElement(){}isElementBuilt(){return!!this.element&&!!Object.values(this.element.attributes).map((e=>e.nodeValue)).includes(this.resourceUrl)}open(){this.loaded&&this.isElementBuilt()?this.element.style.display="":this.buildElement()}close(){this.abortDownloadingUnloadedNode(),this.spinner.hideSpinner(),this.element.style.display="none",this.isSelected=!1}constructor(e,t,n){this.abortDownloadingUnloadedNode=()=>{if(this.spinner.element.classList.remove("error"),!this.loaded&&""!=this.element.getAttribute("src"))return this.element.setAttribute("src",""),void this.element.remove()},this.setCommonAttributes=()=>{if(this.element&&this.attributes)for(const{name:e,value:t}of this.attributes)!Object.keys(this.config).find((t=>t===e))&&t&&this.element.setAttribute(e,t)},this._resourceUrl=e,this._attributes=t,this._config=n,this._isSelected=!1,this._element=null,this._loaded=!1,this._spinner=l.getSpinner(),this.config.lazy||this.buildElement()}};(a=r||(r={})).IMAGE="image",a.VIDEO="video",a.EMBED="embed";var h=r,c=["jpg","png","gif","bmp","svg"],m=["mp4","ogg","webm"],b=["youtube","dailymotion","vimeo"],u=(e,t)=>{for(const{name:n,value:s}of t){const t=n.replace(`${i.DATA}-`,"");if(""!==s&&null!=s&&Object.keys(e).includes(t)){let n=s;n="true"===(null==s?void 0:s.toLocaleLowerCase())||"false"===(null==s?void 0:s.toLocaleLowerCase())?"true"===(null==s?void 0:s.toLocaleLowerCase()):s,n=/^[0-9]+$/.test(n)?Number(n):n,e={...e,[t]:n}}}return e},p=class extends d{buildElement(){const e=document.createElement("iframe");var t;e.hidden=!0,this.element=e,this.spinner.showSpinner(),this.setCommonAttributes(),e.setAttribute("style",`\n    ${(t=this.config.autoscale)?"width: 100%":"width: 55vw"};\n    ${t?"height: calc(100vw - 55vw)":"height: calc(50vw - 20vw)"};\n    ${Number.isInteger(t)?`max-width: ${t}px`:""};\n    ${Number.isInteger(t)?`max-height: calc(${t}px - calc(${t>=300?"300px":`${t}px`} / 2.2))`:""};\n    `),e.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",e.setAttribute("tabindex","0"),e.setAttribute(i.CACHED,this.resourceUrl),e.setAttribute("frameborder","0"),e.allowFullscreen=!0,e.classList.add("dlightbox-embed"),e.style.display="none";let n="";n=(e=>{const t=b.find((t=>e.includes(t)));return"youtube"===t?`https://www.youtube.com/embed/${e.substring(e.lastIndexOf("/watch?v=")+9)}`:"daylimotion"===t?`https://www.dailymotion.com/embed/video/${e.substring(e.lastIndexOf("/")+1)}`:"vimeo"===t?`https://player.vimeo.com/video/${e.substring(e.lastIndexOf("/")+1)}`:""})(this.resourceUrl),""!==n&&this.config.autoplay&&(n+="?autoplay=1"),e.src=""===n?this.resourceUrl:n,e.onload=()=>{this.loaded=!0,this.isSelected&&(e.classList.add("lightbox-shadow"),this.spinner.hideSpinner(),e.hidden=!1,e.style.display="")},e.onerror=()=>{this.loaded=!1,this.element.remove(),this.spinner.showSpinner("Error on loading iframe"),this.spinner.element.classList.add("error")}}open(){if(!this.config.autoplay)return this.isElementBuilt()?(this.element.classList.add("lightbox-shadow"),void(this.element.style.display="")):(this.buildElement(),void(this.element.style.display=""));this.buildElement()}close(){this.abortDownloadingUnloadedNode(),this.spinner.hideSpinner(),this.loaded=!1,this.element.classList.remove("lightbox-shadow"),this.element.style.display="none",this.isSelected=!1}constructor(e,t,n){super(e,t,n),this.abortDownloadingUnloadedNode=()=>{this.loaded||""!=this.element.getAttribute("src")||this.element.remove()}}},g=class extends d{buildElement(){const e=document.createElement("img");var t;e.hidden=!0,this.element=e,this.setCommonAttributes(),e.setAttribute("style",(!0===(t=this.config.autoscale)?"width: 100%":!1===t?"width: auto; max-width: inherit":`max-width: ${t}px`)+";"),e.classList.add("dlightbox-image"),this.spinner.showSpinner(),e.src=this.resourceUrl,e.onerror=()=>{this.loaded=!1,""!=this.element.getAttribute("src")&&(this.spinner.showSpinner("Error on loading image"),this.spinner.element.classList.add("error"))},e.onload=()=>{this.spinner.hideSpinner(),this.loaded=!0,e.classList.add("lightbox-shadow"),e.hidden=!1}}constructor(e,t,n){super(e,t,n)}},x=class extends d{buildElement(){const e=document.createElement("video");var t;e.setAttribute("tabindex","0"),e.hidden=!0,this.element=e,this.setCommonAttributes(),e.setAttribute("style",`\n    ${(t=this.config.autoscale)?"width: 100%":"width: auto; max-width: inherit"};\n    ${Number.isInteger(t)?`width: inherit; max-width: ${t}px`:""};\n    `),e.setAttribute(i.CACHED,this.resourceUrl),e.controls=!0,e.classList.add("dlightbox-video"),this.spinner.showSpinner();const n=document.createElement("source");n.src=this.resourceUrl,e.addEventListener("click",(e=>e.stopPropagation())),e.append(n),n.onerror=()=>{this.loaded=!1,this.spinner.showSpinner("Error on loading video"),this.spinner.element.classList.add("error")},e.oncanplay=()=>{this.loaded=!0,""!=this.element.getAttribute("src")&&(this.spinner.hideSpinner(),e.classList.add("lightbox-shadow"),e.hidden=!1,this.config.autoplay&&this.isSelected&&e.play())}}open(){this.loaded&&this.isElementBuilt()?(this.element.style.display="",this.config.autoplay&&this.element.play()):this.buildElement()}close(){this.abortDownloadingUnloadedNode(),this.spinner.hideSpinner(),this.element.style.display="none",this.isSelected=!1,this.element.pause()}constructor(e,t,n){super(e,t,n)}},v=class{get lightbox(){return this._lightbox}get next(){return this._next}get prev(){return this._prev}set next(e){this._next=e}set prev(e){this._prev=e}getLightBoxType(e,t,n){var s;const o=null!==(s=e.getAttribute("src")||e.getAttribute("href")||e.getAttribute(i.INITIALIZER))&&void 0!==s?s:"";var r,a;const l=null!==(a=null!==(r=e.getAttribute(i.TYPE))&&void 0!==r?r:n.type)&&void 0!==a?a:null;if(""===o)throw new Error("An element resource from a data-dlightbox list is invalid");return l===h.VIDEO||"video"==e.localName||m.some((e=>-1!==o.indexOf(e)))?new x(o,t,n):l===h.IMAGE||"img"==e.localName||c.some((e=>-1!==o.indexOf(e)))?new g(o,t,n):(l===h.EMBED||b.some((e=>-1!==o.indexOf(e))),new p(o,t,n))}constructor(e,t,n){this.id=Number(e.getAttribute(i.ID));const s={...n,...u(n,t)};this._lightbox=this.getLightBoxType(e,t,s),this._next=null,this._prev=null}},f=class{get config(){return this._config}get elements(){return this._elements}get bindings(){return this._bindedElements}listen(e,t){this.mediaElement.addEventListener(e,t)}addNodeEventListeners(e){if("length"in e){if(!e.hasOwnProperty("elements")){if(e.length!==this.elementCount)throw new Error(`You must provide a set of ${this.elementCount} elements!`);return this.bindElements([...e].map((e=>e))),void this._bindedElements.push({elements:[...e].map((e=>e)),fireevent:this.config.fireevent})}}else if(!e.hasOwnProperty("elements")){if(1!==this.elementCount)throw new Error(`You must provide a set of ${this.elementCount} elements!`);return this.bindElements([e]),void this._bindedElements.push({elements:[e],fireevent:this.config.fireevent})}const{elements:t,fireevent:n}=e;this.bindElements(t,n),this._bindedElements.push({elements:t,fireevent:n})}bindElements(e,t){e.forEach((e=>{e.addEventListener(null!=t?t:this.config.fireevent,this.nodeListener),"click"==t&&e.addEventListener("keydown",this.nodeListener)}))}removeNodeEventListeners(){this.destroyContainer();for(const{elements:e,fireevent:t}of this._bindedElements)e.forEach((e=>{e.removeEventListener(null!=t?t:this.config.fireevent,this.nodeListener),"click"==t&&e.removeEventListener("keydown",this.nodeListener)}))}createContainer(){this.container=document.createElement("div"),document.body.addEventListener("keydown",this.closeContainerBodyEvent),this.container.classList.add("lightbox-container"),this.container.setAttribute("tabindex","-1"),this.mediaElement.setAttribute("tabindex","0"),this.mediaElement.classList.add("lightbox-container__media"),this.mediaElement.append(this.spinner.element);const e=document.createElement("div");if(e.classList.add("lightbox-container__close"),e.setAttribute("tabindex","0"),e.addEventListener("keydown",(({key:e})=>{"Enter"===e&&this.destroyContainer()})),this.container.prepend(e),this.elementCount>1){const e=document.createElement("div"),t=document.createElement("div");e.classList.add("lightbox-container__next-arrow"),t.classList.add("lightbox-container__prev-arrow"),e.setAttribute("tabindex","0"),t.setAttribute("tabindex","0"),this.container.addEventListener("keydown",(({key:n})=>{"Tab"===n&&document.activeElement===e&&setTimeout((()=>t.focus()),0)})),e.addEventListener("click",(e=>this.next(e))),t.addEventListener("click",(e=>this.prev(e))),e.addEventListener("keydown",(e=>{"Enter"===e.key&&this.next(e)})),t.addEventListener("keydown",(e=>{"Enter"===e.key&&this.prev(e)})),this.modal.getModal().addEventListener("keydown",this.nextArrowModalEvent),this.modal.getModal().addEventListener("keydown",this.prevArrowModalEvent),this.container.prepend(t),this.container.append(this.mediaElement),this.container.append(e)}else{const t=document.createElement("div");t.tabIndex=0,this.container.append(t),e.addEventListener("keydown",(({key:e})=>{"Tab"===e&&setTimeout((()=>this.mediaElement.focus()),0)})),this.container.prepend(this.mediaElement)}setTimeout((()=>this.container.focus()),0)}destroyContainer(){this.container&&(this.modal.getModal().classList.remove("lightbox-modal-open"),this.mediaElement.classList.remove("lightbox-container__media-open"),setTimeout((()=>{var e;this.mediaElement.blur(),document.body.removeAttribute("tabindex"),this.selectedBox.lightbox.close(),this.container.remove(),this.modal.getModal().remove(),document.body.removeEventListener("keydown",this.closeContainerBodyEvent),this.modal.getModal().removeEventListener("keydown",this.nextArrowModalEvent),this.modal.getModal().removeEventListener("keydown",this.prevArrowModalEvent),null===(e=this.mediaElement)||void 0===e||e.dispatchEvent(this.events.get(s.CLOSE)),this.container=null}),200))}getLightBoxById(e){return this.lightboxList.lookupById(e)}openContainer(e=this.lightboxList.head){var t;if(document.getElementById("dragon-lightbox-modal"))return;document.body.setAttribute("tabindex","-1"),this.spinner.element.classList.remove("error");const n=Number.isInteger(e)?this.getLightBoxById(e):e;if(!(n.lightbox instanceof d))throw new Error("Invalid lightbox");const i=this.modal.getModal();this.createContainer(),setTimeout((()=>{this.modal.getModal().classList.add("lightbox-modal-open"),this.mediaElement.classList.add("lightbox-container__media-open")}),0),n.lightbox.open(),this.mediaElement.append(n.lightbox.element),i.append(this.container),i.append(this.container),document.body.prepend(i),this.selectedBox.lightbox.isSelected=!1,this.selectedBox=n,this.selectedBox.lightbox.isSelected=!0,null===(t=this.mediaElement)||void 0===t||t.dispatchEvent(this.events.get(s.OPEN))}appendMediaElement(e){[...this.mediaElement.children].some((t=>t===e))||this.mediaElement.append(e)}openLightBox(e,t){const n=e;setTimeout((()=>{this.mediaElement.classList.remove("lightbox-type__closed-"+(t?"left":"right"))}),100),this.mediaElement.classList.add("lightbox-type__closed-"+(t?"left":"right")),n.lightbox.open(),this.appendMediaElement(e.lightbox.element),this.selectedBox=t?n.prev:n.next}closeLightBox(e){e.lightbox.close()}next(e){var t;null==e||e.stopPropagation(),null==e||e.target.blur(),this.closeLightBox(this.selectedBox),this.selectedBox===this.lightboxList.tail?(this.openLightBox(this.lightboxList.head,!0),this.selectedBox=this.lightboxList.head,this.selectedBox.lightbox.isSelected=!0):(this.openLightBox(this.selectedBox.next,!0),this.selectedBox=this.selectedBox.next,this.selectedBox.lightbox.isSelected=!0),null===(t=this.mediaElement)||void 0===t||t.dispatchEvent(this.events.get(s.CHANGE))}prev(e){var t;null==e||e.stopPropagation(),null==e||e.target.blur(),this.closeLightBox(this.selectedBox),this.selectedBox===this.lightboxList.head?(this.openLightBox(this.lightboxList.tail,!1),this.selectedBox=this.lightboxList.tail,this.selectedBox.lightbox.isSelected=!0):(this.openLightBox(this.selectedBox.prev,!1),this.selectedBox=this.selectedBox.prev,this.selectedBox.lightbox.isSelected=!0),null===(t=this.mediaElement)||void 0===t||t.dispatchEvent(this.events.get(s.CHANGE))}constructor(e,t,n){if(this._bindedElements=[],this.nodeListener=e=>{var t;if("keydown"==e.type&&"Enter"!=e.key)return;const n=e.target.getAttribute(i.ID),s=this.getLightBoxById(Number(n));this.openContainer(s),null===(t=document.getElementById("lightbox-container__hidden-tabindex"))||void 0===t||t.focus()},this.closeContainerBodyEvent=e=>{this.container&&"Escape"===e.key&&this.destroyContainer()},this.nextArrowModalEvent=e=>{this.container&&"ArrowRight"===e.key&&this.next(e)},this.prevArrowModalEvent=e=>{this.container&&"ArrowLeft"===e.key&&this.prev(e)},this.buildCustomEvents=e=>{const t=new Map;for(const n of Object.values(s))t.set(n,new CustomEvent(n,e));return t},this.container=null,this.id=w._instances.size,this.mediaElement=document.createElement("div"),this._config=t,this.modal=new class{getModal(){var e;return this.modal||(this.modal=this.buildModal(),null===(e=this.modal)||void 0===e||e.addEventListener("click",(()=>this.container.destroyContainer()))),this.modal}buildModal(){document.body.classList.add("overflow-hidden");const e=document.createElement("div");return e.id="dragon-lightbox-modal",e.classList.add("lightbox-modal"),e.prepend((e=>{const t=document.createElement("style");return t.innerText=`.overflow-hidden {overflow-y:hidden !important;}.lightbox-modal {display:flex;justify-content:center;z-index:1000;width:100%;height:100vh;position:absolute;top:0;left:0;background-color:rgba(0,0,0,.87);transition:opacity .2s ease-in;transition-property:transform, opacity;opacity:0;}.lightbox-modal-open {opacity:1;}${(e=>`.lightbox-container {display:flex;width:100%;align-items:center;justify-content:center;overflow-x:hidden;}.lightbox-shadow {filter:drop-shadow(0 0 15px black);}.lightbox-container__media {${Number.isInteger(e.autoscale)?`width:${e.autoscale}px`:"width:80%"};max-height:90vh;width:100%;max-width:80%;display:flex;justify-content:center;align-items:center;transition:transform .2s ease-in;transform:scale(.7);}.lightbox-container__media>* {transition:.1s ease-in;transition-property:transform, opacity;transform:translateX(0px);opacity:1;}.lightbox-type__closed-left>* {transition:none;opacity:0;transform:translateX(100px);}.lightbox-type__closed-right>* {transition:none;opacity:0;transform:translateX(-100px);}.lightbox-container__media-open {transform:scale(1);}.lightbox-container__media:focus {outline:none;}.lightbox-container__media:focus>*:not(img, video) {filter:drop-shadow(0 0 5px white);}.lightbox-container__next-arrow,.lightbox-container__prev-arrow {width:10%;height:3em;position:relative;margin-bottom:1rem;transform:scale(.8);opacity:.8;transition:transform .3s;}.lightbox-container__next-arrow:focus,.lightbox-container__prev-arrow:focus,.lightbox-container__close:focus {outline:none;transform:scale(1.2);opacity:1;}.lightbox-container__prev-arrow:focus {transform:scale(-1.2);}.lightbox-container__prev-arrow {transform:scale(-.8);}.lightbox-container__next-arrow:hover,.lightbox-container__prev-arrow:hover {opacity:1;cursor:pointer;}.lightbox-container__next-arrow::after,.lightbox-container__next-arrow::before,.lightbox-container__prev-arrow::after,.lightbox-container__prev-arrow::before {content:'';width:3px;height:30px;position:absolute;background-color:white;transform-origin:bottom left;transform:rotate(-40deg);top:-4.3px;left:calc(50% + 10%);border-radius:2px;}.lightbox-container__next-arrow::before,.lightbox-container__prev-arrow::before {top:22px;transform-origin:top left;transform:rotate(40deg);}.lightbox-container__close {width:20px;height:20px;position:relative;position:absolute;top:2rem;right:1.5rem;opacity:.8;transition:transform .3s;}.lightbox-container__close:hover {cursor:pointer;opacity:1;}.lightbox-container__close::after,.lightbox-container__close::before {content:'';width:3px;height:20px;position:absolute;left:50%;background-color:white;transform:rotate(-45deg);border-radius:2px;}.lightbox-container__close::before {transform:rotate(45deg);}#lightbox-container__hidden-tabindex {opacity:0;position:absolute;top:0;}@media (max-width:560px) {.lightbox-container__next-arrow,.lightbox-container__prev-arrow {position:absolute;top:80vh;transform:scale(.6) translateX(3rem);}.lightbox-container__prev-arrow {transform:scale(-.6) translateX(3rem);}.lightbox-container__media {max-width:100%;max-height:70vh;}.lightbox-container__close:focus {transform:none;opacity:.8;}.lightbox-container__next-arrow:focus {transform:scale(.6) translateX(3rem);opacity:.8;}.lightbox-container__prev-arrow:focus {transform:scale(-.6) translateX(3rem);opacity:.8;}}@media (hover:none) {.lightbox-container>[class*=arrow] {opacity:.8}}`)(e)}.dlightbox-image {max-height:inherit;max-width:unset;object-fit:contain;width:inherit;}.dlightbox-video {max-height:inherit;max-width:unset;object-fit:contain;}.dlightbox-embed {max-height:inherit;max-width:unset;}@media (max-width:560px) {.dlightbox-video, .dlightbox-embed {width:100%}.dlightbox-embed {height:calc(100vw - 20vw)}}.lightbox-spinner {width:15vw;height:15vw;position:relative;}.lightbox-spinner>.lightbox-spinner-back,.lightbox-spinner>.lightbox-spinner-front {border-radius:50%;width:100%;height:100%;position:relative;display:flex;align-items:center;justify-content:space-between;}.lightbox-spinner>.lightbox-spinner-front {position:absolute;}.lightbox-spinner>.lightbox-spinner-back {z-index:-1;}.lightbox-spinner>.lightbox-spinner-front>*,.lightbox-spinner>.lightbox-spinner-back>* {max-width:15px;max-height:15px;}.lightbox-spinner-back>.back {width:14%;height:14%;background-color:white;border-radius:50%;animation:expand .5s ease-in infinite;}.lightbox-spinner-front>.front {width:15%;border-radius:50%;height:15%;background-color:white;animation:blink .5s ease-in infinite;}.lightbox-spinner.error>.lightbox-spinner-back>.back,.lightbox-spinner.error>.lightbox-spinner-front>.front {background-color:red;animation:none;}.lightbox-spinner.error>.lightbox-spinner-back>.back {animation:none;transform:scale(2);opacity:.4;}@keyframes blink {0% {transform:scale(.4);opacity:0;}20% {transform:scale(.7);opacity:.3;}100% {transform:scale(1.2);opacity:0;}}@keyframes expand {0% {transform:scale(1);opacity:0;}20% {transform:scale(2);opacity:.4;}100% {transform:scale(2.4);opacity:0;}}.lightbox-spinner-ball1.back,.lightbox-spinner-ball1.front {animation-delay:0s !important;}.lightbox-spinner-ball2.back,.lightbox-spinner-ball2.front {animation-delay:.16s !important;}.lightbox-spinner-ball3.back,.lightbox-spinner-ball3.front {animation-delay:.32s !important;}`,t})(this.container.config)),1==this.container.elements.length||(e.addEventListener("touchstart",(({touches:e})=>this.lastTabPos=e[0].screenX)),e.addEventListener("touchmove",(({touches:e})=>this.container.mediaElement.style.transform=`translateX(${e[0].screenX-this.lastTabPos}px)`)),e.addEventListener("touchend",(({changedTouches:e})=>{const t=e[0].screenX;this.container.mediaElement.style.transform="",Math.abs(t-this.lastTabPos)<100||(t>this.lastTabPos?this.container.prev():this.container.next())}))),e}constructor(e){this.lastTabPos=0,this.modal=null,this.container=e}}(this),this.spinner=l.getSpinner(),this.elementCount=e.length,this.lightboxList=new class{setElementsId(e){const t=[...Array(e.length).keys()];return e.forEach((e=>{e.hasAttribute(i.ID)&&t.splice(Number(e.getAttribute(i.ID)),1)})),e.filter((e=>!e.hasAttribute(i.ID))).forEach(((e,n)=>e.setAttribute(i.ID,String(t[n])))),e}lookupByIndex(e){let t=this.head;for(let n=0;n<e;n++)t=t.next;return t}lookupById(e){let t=this.head;for(;t.id!==e;)t=t.next;return t}constructor(e,t){this.elements=this.setElementsId(e.map((e=>e.element))),this.head=new v(this.elements[0],e[0].attributes,t),this.head.prev=null;let n=this.head;for(let i=1;i<e.length;i++)n.next=new v(this.elements[i],e[i].attributes,t),n.prev=this.lookupByIndex(i-2),n=n.next;this.size=e.length,n.prev=this.lookupByIndex(this.size-2),this.tail=n}}(e,this.config),this.selectedBox=this.lightboxList.head,this.selectedBox.lightbox.isSelected=!0,this._elements=this.lightboxList.elements,this.events=this.buildCustomEvents({detail:{config:this.config,count:this.elementCount,id:this.id,elements:this.elements,selectedBox:{resourceUrl:this.selectedBox.lightbox.resourceUrl,element:this.selectedBox.lightbox.element,attributes:this.selectedBox.lightbox.attributes}}}),!n){const e={elements:this.elements,fireevent:t.fireevent};this.addNodeEventListeners(e)}}};class y{get instances(){return y._instances}create(e,t){if("string"!=typeof e[0]&&!Array.isArray(e[0]))throw new Error("Invalid type");const s=Array.isArray(e[0])||Array.isArray(e)?[e]:[[e]],o=new Array;for(const[e,t]of s){var r;const n=document.createElement("div"),s=null!=t?t:null;var a;s&&s.find((e=>e.name===i.TYPE))&&n.setAttribute(i.TYPE,null!==(a=null===(r=s.find((e=>e.name===i.TYPE)))||void 0===r?void 0:r.value)&&void 0!==a?a:""),n.setAttribute("data-dlightbox",String(e)),o.push({element:n,attributes:s})}const l=t?{...n,...t}:n,d=new f(o,l,!0);return y.createInstanceObject(d)}autoinit(){const e=document.querySelectorAll(`[${i.CONTAINER}]`),t=document.querySelectorAll(`[${i.INITIALIZER}]:not([${i.CONTAINER}]>[${i.INITIALIZER}])`),n=(e,t)=>{let n=this.getConfig(e);n.attributes=this.getAttributes(e),n={...n,...this.getConfig(e,n.attributes)};const i=new f(t,n);y.createInstanceObject(i)};for(const t of e)n(t,Array.from(t.children).map((e=>({element:e,attributes:this.getAttributes(e)}))));for(const e of t)n(e,[{element:e,attributes:this.getAttributes(e)}])}constructor(){this.getConfig=(e,t)=>{const i=n,s=t||Object.values(e.attributes).map((e=>({name:e.name,value:e.nodeValue})));return u(i,s)},this.getAttributes=e=>{const t=[];if(!e.attributes)return t;for(const{name:n,nodeValue:s}of Object.values(e.attributes)){const e=n.replace(`${i.DATA}-`,"");t.push({name:e,value:null!=s?s:""})}return t},y._instances=new Map,this.autoinit()}}y.createInstanceObject=e=>{const t={open:e.openContainer.bind(e),close:e.destroyContainer.bind(e),remove:()=>y.removeInstanceObject(e),bind:e.addNodeEventListeners.bind(e),listen:e.listen.bind(e),elements:e.elements,bindings:e.bindings};return y._instances.set(0==y._instances.size?0:[...y._instances.keys()][y._instances.size-1]+1,t),t},y.removeInstanceObject=e=>{e.removeNodeEventListeners.call(e),y._instances.delete(e.id)};var w=y;window.dragonLightBox={create:(new w).create,instances:w._instances}}();