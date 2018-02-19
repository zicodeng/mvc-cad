export interface Subject {
    registerObserver(observer: Observer): void;
    removeObserver(observer: Observer): void;
    notifyAll(): void;
}

export interface Observer {
    notify(): void;
}
