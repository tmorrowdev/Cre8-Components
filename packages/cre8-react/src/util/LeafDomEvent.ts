export interface cre8DomEvent<E extends EventTarget, CT extends EventTarget = E> extends Event {
    currentTarget: CT;
    target: E;
}
