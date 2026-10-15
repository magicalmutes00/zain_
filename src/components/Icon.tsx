import type { FC, JSX } from "react";
import type { IconProps } from "react-iconly";
import ArrowRight from "react-iconly/dist/Icons/ArrowRight.mjs";
import Call from "react-iconly/dist/Icons/Call.mjs";
import ChevronDown from "react-iconly/dist/Icons/ChevronDown.mjs";
import Document from "react-iconly/dist/Icons/Document.mjs";
import Location from "react-iconly/dist/Icons/Location.mjs";
import Message from "react-iconly/dist/Icons/Message.mjs";
import Send from "react-iconly/dist/Icons/Send.mjs";
import Setting from "react-iconly/dist/Icons/Setting.mjs";
import ShieldDone from "react-iconly/dist/Icons/ShieldDone.mjs";
import TickSquare from "react-iconly/dist/Icons/TickSquare.mjs";
import TimeCircle from "react-iconly/dist/Icons/TimeCircle.mjs";
import Work from "react-iconly/dist/Icons/Work.mjs";
import TwoUsers from "react-iconly/dist/Icons/TwoUsers.mjs";
import {
  Cctv,
  Fuel,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Siren,
  Wrench,
  X,
  Zap,
} from "lucide-react";

/**
 * Iconly icons are imported per-module (not from the barrel). The barrel re-exports
 * every icon in one large module, which no bundler can tree-shake, so importing the
 * 13 icons this site actually renders from the root would ship all ~200 of them.
 */
export type IconlyName =
  | "ArrowRight"
  | "Call"
  | "ChevronDown"
  | "Document"
  | "Location"
  | "Message"
  | "Send"
  | "Setting"
  | "ShieldDone"
  | "TickSquare"
  | "TimeCircle"
  | "Work"
  | "Users";

const ICONLY_MAP: Record<IconlyName, FC<IconProps>> = {
  ArrowRight,
  Call,
  ChevronDown,
  Document,
  Location,
  Message,
  Send,
  Setting,
  ShieldDone,
  TickSquare,
  TimeCircle,
  Work,
  Users: TwoUsers,
};

/** Primary Iconly icon (verified react-iconly artwork). */
export function Iconly({ name, size = 22 }: { name: IconlyName; size?: number }) {
  const Icon = ICONLY_MAP[name];
  return (
    <span aria-hidden="true" style={{ display: "inline-flex", flex: "none" }}>
      <Icon size={size} />
    </span>
  );
}

/** Lucide fallback — only for domain semantics Iconly has no equivalent for. */
export type DomainKind = "siren" | "shield" | "zap" | "wrench" | "cctv" | "fuel";

const DOMAIN_MAP: Record<DomainKind, (p: { size: number; "aria-hidden": true }) => JSX.Element> = {
  siren: (p) => <Siren {...p} />,
  shield: (p) => <ShieldCheck {...p} />,
  zap: (p) => <Zap {...p} />,
  wrench: (p) => <Wrench {...p} />,
  cctv: (p) => <Cctv {...p} />,
  fuel: (p) => <Fuel {...p} />,
};

export function DomainIcon({ kind, size = 24 }: { kind: DomainKind; size?: number }) {
  return DOMAIN_MAP[kind]({ size, "aria-hidden": true });
}

const CONTACT_MAP: Record<"phone" | "mail" | "pin", (s: number) => JSX.Element> = {
  phone: (s) => <Phone size={s} aria-hidden="true" />,
  mail: (s) => <Mail size={s} aria-hidden="true" />,
  pin: (s) => <MapPin size={s} aria-hidden="true" />,
};

export function ContactGlyph({ kind }: { kind: "phone" | "mail" | "pin" }) {
  return CONTACT_MAP[kind](17);
}

export function MenuGlyph({ open }: { open: boolean }) {
  return open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />;
}
