import { useSyncExternalStore } from "react";

function useIsClinet() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
export default useIsClinet;