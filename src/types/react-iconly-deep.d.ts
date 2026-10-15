/**
 * react-iconly ships no per-icon type declarations, and importing from its barrel
 * (`react-iconly`) pulls the entire ~470 kB icon module into the bundle regardless
 * of which icons are used. We therefore import individual icon modules directly and
 * declare their shape here. Runtime behaviour is unchanged — only the module graph.
 */
declare module "react-iconly/dist/Icons/*.mjs" {
  import type { FC } from "react";
  import type { IconProps } from "react-iconly";

  const Icon: FC<IconProps>;
  export default Icon;
}
