import { useCallback, useEffect, useState } from "react";

type IUseNearScreenProps = {
  distance?: number;
  once?: boolean;
};

export default function useNearScreen<ITypeRef extends Element>({
  distance = 100,
  once = true,
}: IUseNearScreenProps) {
  const [isNearScreen, setIsNearScreen] = useState<boolean>(false);
  const [fromRef, setFromRef] = useState<ITypeRef | null>(null);

  const observerRef = useCallback((node: ITypeRef) => {
    setFromRef(node);
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver;
    const onChange = (entries: IntersectionObserverEntry[]) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setIsNearScreen(true);
        if (once) observer.disconnect();
      } else {
        if (!once) setIsNearScreen(false);
      }
    };

    Promise.resolve(
      typeof IntersectionObserver !== "undefined"
        ? IntersectionObserver
        : import("intersection-observer")
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: `${distance}px`,
      });
      if (fromRef) {
        observer.observe(fromRef);
      }
    });
    return () => observer && observer.disconnect();
  }, [fromRef, distance, once]);

  return { isNearScreen, observerRef };
}
