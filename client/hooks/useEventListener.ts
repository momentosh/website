import { useEffect, useRef } from "react";

type EventListenerOptions = AddEventListenerOptions | boolean;

export const useEventListener = <
  K extends keyof WindowEventMap,
  T extends HTMLElement = HTMLDivElement
>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: React.RefObject<T>,
  options?: EventListenerOptions
) => {
  const savedHandler = useRef<(event: WindowEventMap[K]) => void>(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement: T | Window = element?.current || window;
    if (!(targetElement && targetElement.addEventListener)) return;

    const eventListener = (event: WindowEventMap[K]) =>
      savedHandler.current?.(event);

    targetElement.addEventListener(
      eventName,
      eventListener as EventListener,
      options
    );

    return () => {
      targetElement.removeEventListener(
        eventName,
        eventListener as EventListener,
        options
      );
    };
  }, [eventName, element, options]);
};
