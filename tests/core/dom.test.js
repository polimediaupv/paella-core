import { DomClass, createElement, createElementWithHtmlText } from 'paella-core/js/core/dom';

describe('createElement', () => {
    test('default element is a div', () => {
        const a = createElement({});
        expect(a instanceof HTMLDivElement).toBeTruthy();
    });

    test('element with parent', () => {
        const parent = createElement({});
        const child = createElement({parent});

        expect(parent.children[0]).toBe(child);
    });
});

describe('createElementWithHtmlText', () => {    
    test('create a span element', () => {    
        const a = createElementWithHtmlText("<span>test</span>");
        expect(a instanceof HTMLSpanElement).toBe(true);
    });

    test('check boundary errors', () => {
        const a = createElementWithHtmlText();
        expect(a).toBeUndefined();        

        const b = createElementWithHtmlText("");
        expect(b).toBeUndefined();

        const c = createElementWithHtmlText("<");
        expect(c).toBeUndefined();
    });

    test('element with parent', () => {
        const parent = createElement({});
        const child = createElementWithHtmlText("<span>test</span>", parent);

        expect(parent.children[0]).toBe(child);
    });
});


describe('DomClass', () => {

    test('constructor', () => {
        const player = {};
        const domA = new DomClass(player,{});
        const domB = new DomClass(player,{tag:'span',attributes:{"width":"100px"},children:"",parent:null});

        expect(domA.player).toBe(player)
        expect(domB.element instanceof HTMLSpanElement).toBe(true)
        expect(domB.parent).toBeNull();
    });


    test('check tag getter', () => {
        const player = {};
        const domA = new DomClass(player,{tag:'div'});

        expect(domA.div).toBe(domA.element);
    });    

    test('check visibility', () => {
        const player = {};
        const domA = new DomClass(player,{});

        domA.hide();
        expect(domA.element.style.display).toBe("none");
        domA.show();
        expect(domA.element.style.display).toBe("block");

        expect(domA.isVisible).toBe(true);
    });

    test('check attributes', () => {
        const player = {};
        const domA = new DomClass(player,{});

        domA.setAttribute("id", "id")
        expect(domA.element.getAttribute("id")).toBe("id");
    });

    test('check set/removeParent', () => {
        const player = {};
        const domA = new DomClass(player,{});
        const domB = new DomClass(player,{tag:'span',attributes:{"width":"100px"},children:"",parent:null});

        domA.setParent(domB.element);
        expect(domA.parent).toBe(domB.element)

        domA.removeFromParent()
        expect(domA.parent).toBeNull()
    });

});
