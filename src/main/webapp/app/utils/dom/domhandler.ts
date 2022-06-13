import { Injectable } from '@angular/core';

@Injectable()
export class DomHandler {
  public static zindex = 1000;

  private calculatedScrollbarWidth: number | null = null;

  private calculatedScrollbarHeight: number | null = null;

  private browser: any;

  public addClass(element: any, className: string): void {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ' + className;
    }
  }

  public addMultipleClasses(element: any, className: string): void {
    if (element.classList) {
      const styles: string[] = className.split(' ');
      for (let i = 0; i < styles.length; i++) {
        element.classList.add(styles[i]);
      }
    } else {
      const styles: string[] = className.split(' ');
      for (let i = 0; i < styles.length; i++) {
        element.className += ' ' + styles[i];
      }
    }
  }

  public removeClass(element: any, className: string): void {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }
  /* eslint-disable */
  public hasClass(element: any, className: string): boolean {
    if (element.classList) {
      return element.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }
  }

  public siblings(element: any): any {
    return Array.prototype.filter.call(element.parentNode.children, (child: any) => {
      return child !== element;
    });
  }

  public find(element: any, selector: string): any[] {
    return Array.from(element.querySelectorAll(selector));
  }

  public findSingle(element: any, selector: string): any {
    return element.querySelector(selector);
  }

  public index(element: any): number {
    const children = element.parentNode.childNodes;
    let num = 0;
    for (let i = 0; i < children.length; i++) {
      if (children[i] === element) {
        return num;
      }
      if (children[i].nodeType === 1) {
        num++;
      }
    }
    return -1;
  }

  public indexWithinGroup(element: any, attributeName: string): number {
    const children = element.parentNode.childNodes;
    let num = 0;
    for (let i = 0; i < children.length; i++) {
      if (children[i] === element) {
        return num;
      }
      if (children[i].attributes && children[i].attributes[attributeName] && children[i].nodeType === 1) {
        num++;
      }
    }
    return -1;
  }

  public relativePosition(element: any, target: any): void {
    const elementDimensions = element.offsetParent
      ? { width: element.offsetWidth, height: element.offsetHeight }
      : this.getHiddenElementDimensions(element);
    const targetHeight = target.offsetHeight;
    const targetWidth = target.offsetWidth;
    const targetOffset = target.getBoundingClientRect();
    const viewport = this.getViewport();
    let top, left;

    if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
      top = -1 * elementDimensions.height;
      if (targetOffset.top + top < 0) {
        top = 0;
      }
    } else {
      top = targetHeight;
    }
    if (targetOffset.left + elementDimensions.width > viewport.width) {
      left = targetWidth - elementDimensions.width;
    } else {
      left = 0;
    }

    element.style.top = top + 'px';
    element.style.left = left + 'px';
  }

  public relativePositionLegacy(element: any, target1: any, target2: any): void {
    const elementDimensions = element.offsetParent
      ? { width: element.offsetWidth, height: element.offsetHeight }
      : this.getHiddenElementDimensions(element);
    const targetHeight = target1.offsetHeight;
    const mb = window.getComputedStyle(target2).marginBottom;
    const target2Height = target2.offsetHeight + (mb ? parseInt(mb, 10) : 0);
    const targetWidth = target1.offsetWidth;
    const targetOffset = target1.getBoundingClientRect();
    const viewport = this.getViewport();
    let top, left;

    if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
      top = -1 * elementDimensions.height;
      if (targetOffset.top + top < 0) {
        top = 0;
      }
    } else {
      top = targetHeight + target2Height;
    }
    if (targetOffset.left + elementDimensions.width > viewport.width) {
      left = targetWidth - elementDimensions.width;
    } else {
      left = 0;
    }

    element.style.top = top + 'px';
    element.style.left = left + 'px';
  }

  public absolutePosition(element: any, target: any): void {
    const elementDimensions = element.offsetParent
      ? { width: element.offsetWidth, height: element.offsetHeight }
      : this.getHiddenElementDimensions(element);
    const elementOuterHeight = elementDimensions.height;
    const elementOuterWidth = elementDimensions.width;
    const targetOuterHeight = target.offsetHeight;
    const targetOuterWidth = target.offsetWidth;
    const targetOffset = target.getBoundingClientRect();
    const windowScrollTop = this.getWindowScrollTop();
    const windowScrollLeft = this.getWindowScrollLeft();
    const viewport = this.getViewport();
    let top, left;

    if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
      top = targetOffset.top + windowScrollTop - elementOuterHeight;
      if (top < 0) {
        top = 0 + windowScrollTop;
      }
    } else {
      top = targetOuterHeight + targetOffset.top + windowScrollTop;
    }

    if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width) {
      left = targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth;
    } else {
      left = targetOffset.left + windowScrollLeft;
    }

    element.style.top = top + 'px';
    element.style.left = left + 'px';
  }

  public getHiddenElementOuterHeight(element: any): number {
    element.style.visibility = 'hidden';
    element.style.display = 'block';
    const elementHeight = element.offsetHeight;
    element.style.display = 'none';
    element.style.visibility = 'visible';

    return elementHeight;
  }

  public getHiddenElementOuterWidth(element: any): number {
    element.style.visibility = 'hidden';
    element.style.display = 'block';
    const elementWidth = element.offsetWidth;
    element.style.display = 'none';
    element.style.visibility = 'visible';

    return elementWidth;
  }

  public getHiddenElementDimensions(element: any): any {
    const dimensions: any = {};
    element.style.visibility = 'hidden';
    element.style.display = 'block';
    dimensions.width = element.offsetWidth;
    dimensions.height = element.offsetHeight;
    element.style.display = 'none';
    element.style.visibility = 'visible';

    return dimensions;
  }

  public scrollInView(container: any, item: any): void {
    const borderTopValue: string = getComputedStyle(container).getPropertyValue('borderTopWidth');
    const borderTop: number = borderTopValue ? parseFloat(borderTopValue) : 0;
    const paddingTopValue: string = getComputedStyle(container).getPropertyValue('paddingTop');
    const paddingTop: number = paddingTopValue ? parseFloat(paddingTopValue) : 0;
    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const offset = itemRect.top + document.body.scrollTop - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
    const scroll = container.scrollTop;
    const elementHeight = container.clientHeight;
    const itemHeight = this.getOuterHeight(item);

    if (offset < 0) {
      container.scrollTop = scroll + offset;
    } else if (offset + itemHeight > elementHeight) {
      container.scrollTop = scroll + offset - elementHeight + itemHeight;
    }
  }

  public fadeIn(element: any, duration: number): void {
    element.style.opacity = 0;

    let last = +new Date();
    let opacity = 0;
    const tick = (): void => {
      opacity = +element.style.opacity.replace(',', '.') + (new Date().getTime() - last) / duration;
      element.style.opacity = opacity;
      last = +new Date();
    };

    tick();
  }

  public fadeOut(element: any, ms: any): void {
    let opacity = 1;
    const interval = 50,
      duration = ms,
      gap = interval / duration;

    const fading = setInterval(() => {
      opacity = opacity - gap;

      if (opacity <= 0) {
        opacity = 0;
        clearInterval(fading);
      }

      element.style.opacity = opacity;
    }, interval);
  }

  public getWindowScrollTop(): number {
    const doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  }

  public getWindowScrollLeft(): number {
    const doc = document.documentElement;
    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  }

  public matches(element: any, selector: string): boolean {
    const p = Element.prototype;
    let f = p['matches'] || p.webkitMatchesSelector;
    if (!f) {
      f = (s): boolean => {
        const elements: any[] = Array.from(document.querySelectorAll(s));
        return elements.includes(this);
      };
    }
    return f.call(element, selector);
  }

  public getOuterWidth(el: any, margin?: any): number {
    let width = el.offsetWidth;

    if (margin) {
      const style = getComputedStyle(el);
      const ml = style.marginLeft || '0';
      const mr = style.marginRight || '0';
      width += parseFloat(ml) + parseFloat(mr);
    }

    return width;
  }

  public getHorizontalPadding(el: any): number {
    const style = getComputedStyle(el);
    const pl = style.paddingLeft || '0';
    const pr = style.paddingRight || '0';
    return parseFloat(pl) + parseFloat(pr);
  }

  public getHorizontalMargin(el: any): number {
    const style = getComputedStyle(el);
    const ml = style.marginLeft || '0';
    const mr = style.marginRight || '0';
    return parseFloat(ml) + parseFloat(mr);
  }

  public innerWidth(el: any): number {
    let width = el.offsetWidth;
    const style = getComputedStyle(el);
    const pl = style.paddingLeft || '0';
    const pr = style.paddingRight || '0';
    width += parseFloat(pl) + parseFloat(pr);
    return width;
  }

  public width(el: any): number {
    let width = el.offsetWidth;
    const style = getComputedStyle(el);
    const pl = style.paddingLeft || '0';
    const pr = style.paddingRight || '0';
    width -= parseFloat(pl) + parseFloat(pr);
    return width;
  }

  public getInnerHeight(el: any): number {
    let height = el.offsetHeight;
    const style = getComputedStyle(el);
    const pt = style.paddingTop || '0';
    const pb = style.paddingBottom || '0';
    height += parseFloat(pt) + parseFloat(pb);
    return height;
  }

  public getOuterHeight(el: any, margin?: any): number {
    let height = el.offsetHeight;

    if (margin) {
      const style = getComputedStyle(el);
      const mt = style.marginTop || '0';
      const mb = style.marginBottom || '0';
      height += parseFloat(mt) + parseFloat(mb);
    }

    return height;
  }

  public getHeight(el: any): number {
    let height = el.offsetHeight;
    const style = getComputedStyle(el);
    const pt = style.paddingTop || '0';
    const pb = style.paddingBottom || '0';
    const btw = style.borderTopWidth || '0';
    const bbw = style.borderBottomWidth || '0';
    height -= parseFloat(pt) + parseFloat(pb) + parseFloat(btw) + parseFloat(bbw);

    return height;
  }

  public getWidth(el: any): number {
    let width = el.offsetWidth;
    const style = getComputedStyle(el);
    const pl = style.paddingLeft || '0';
    const pr = style.paddingRight || '0';
    const blw = style.borderLeftWidth || '0';
    const brw = style.borderRightWidth || '0';
    width -= parseFloat(pl) + parseFloat(pr) + parseFloat(blw) + parseFloat(brw);

    return width;
  }

  public getViewport(): any {
    const win = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      w = win.innerWidth || e.clientWidth || g.clientWidth,
      h = win.innerHeight || e.clientHeight || g.clientHeight;

    return { width: w, height: h };
  }

  public getOffset(el: any): any {
    const rect = el.getBoundingClientRect();

    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft,
    };
  }

  public replaceElementWith(element: any, replacementElement: any): any {
    const parentNode = element.parentNode;
    if (!parentNode) {
      throw `Can't replace element`;
    }
    return parentNode.replaceChild(replacementElement, element);
  }

  getUserAgent(): string {
    return navigator.userAgent;
  }

  isIE(): boolean {
    const ua = window.navigator.userAgent;

    const msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return true;
    }

    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
      return true;
    }

    const edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return true;
    }

    // other browser
    return false;
  }

  appendChild(element: any, target: any): void {
    if (this.isElement(target)) {
      target.appendChild(element);
    } else if (target.el && target.el.nativeElement) {
      target.el.nativeElement.appendChild(element);
    } else {
      throw 'Cannot append ' + target + ' to ' + element;
    }
  }

  removeChild(element: any, target: any): void {
    if (this.isElement(target)) {
      target.removeChild(element);
    } else if (target.el && target.el.nativeElement) {
      target.el.nativeElement.removeChild(element);
    } else {
      throw 'Cannot remove ' + element + ' from ' + target;
    }
  }

  isElement(obj: any): boolean {
    return typeof HTMLElement === 'object'
      ? obj instanceof HTMLElement
      : obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
  }

  calculateScrollbarWidth(): number {
    if (this.calculatedScrollbarWidth !== null) {
      return this.calculatedScrollbarWidth;
    }

    const scrollDiv = document.createElement('div');
    scrollDiv.className = 'ui-scrollbar-measure';
    document.body.appendChild(scrollDiv);

    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    this.calculatedScrollbarWidth = scrollbarWidth;

    return scrollbarWidth;
  }

  calculateScrollbarHeight(): number {
    if (this.calculatedScrollbarHeight !== null) {
      return this.calculatedScrollbarHeight;
    }

    const scrollDiv = document.createElement('div');
    scrollDiv.className = 'ui-scrollbar-measure';
    document.body.appendChild(scrollDiv);

    const scrollbarHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight;
    document.body.removeChild(scrollDiv);

    this.calculatedScrollbarWidth = scrollbarHeight;

    return scrollbarHeight;
  }

  invokeElementMethod(element: any, methodName: string, args?: any[]): void {
    const params = args ? args : [];
    element[methodName](...params);
  }
  clearSelection(): void {
    const selection: Selection = window.getSelection() || new Selection();
    if (selection) {
      if (selection.empty) {
        selection.empty();
      } else if (selection.rangeCount > 0 && selection.getRangeAt(0).getClientRects().length > 0) {
        selection.removeAllRanges();
      }
    }
    //  else if (document['selection'] && document['selection'].empty) {
    //   try {
    //     document['selection'].empty();
    //   } catch (error) {
    //     // ignore IE bug
    //   }
    // }
  }

  getBrowser(): any {
    if (!this.browser) {
      const matched = this.resolveUserAgent();
      this.browser = {};

      if (matched.browser) {
        this.browser[matched.browser] = true;
        this.browser['version'] = matched.version;
      }

      if (this.browser['chrome']) {
        this.browser['webkit'] = true;
      } else if (this.browser['webkit']) {
        this.browser['safari'] = true;
      }
    }

    return this.browser;
  }

  resolveUserAgent(): any {
    const ua = navigator.userAgent.toLowerCase();
    const match =
      /(chrome)[ /]([\w.]+)/.exec(ua) ||
      /(webkit)[ /]([\w.]+)/.exec(ua) ||
      /(opera)(?:.*version|)[ /]([\w.]+)/.exec(ua) ||
      /(msie) ([\w.]+)/.exec(ua) ||
      (ua.includes('compatible') && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) ||
      [];

    return {
      browser: match[1] || '',
      version: match[2] || '0',
    };
  }

  isInteger(value: any): boolean {
    if (Number.isInteger) {
      return Number.isInteger(value);
    } else {
      return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    }
  }

  isHidden(element: HTMLElement): boolean {
    return element.offsetParent === null;
  }

  public isAndroid(): boolean {
    return /(android)/i.test(navigator.userAgent);
  }
}
